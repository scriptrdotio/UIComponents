# Angular ToggleSwitch 
 
  Angular component for displaying ToggleSwitch visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

Underscore JS
  
  Bootstrap CSS
  
  JQuery
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  Bootstrap JS
  
  Notifications CSS/JS

  ToggleSwitch modules
  
## Getting started:

  Include bootstrap
   
  ```html
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="//use.fontawesome.com/3d61d6959e.js"></script>
  ```

  Include JQuery (ensure it is loaded before the angular.js)

  ```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```

  Include underscore JS

  ```html
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  ```

  Include angular JS
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```

  Include ToggleSwitch modules
   
  ```html
    <script src="/UIComponents/dashboard/frontend/components/toggleSwitch/angular_toggle_switch.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/toggleSwitch/toggle_switch.js"></script>
  ```

  Include wsProvider, httpProvider and dataService for calling backend API's
  
  ```html
    <script src="/UIComponents/wsProvider.js"></script>
    <script src="/UIComponents/httpProvider.js"></script>
    <script src="/UIComponents/dataService.js"></script>
  ```
  
  Include Bootstrap JS
  
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"></script>
  ```
  
  Include Notifications CSS/JS
  
  ```html
    <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/common/notifications.css">
    <script src="/UIComponents/dashboard/frontend/components/common/notifications.js"></script>
  ```
  
  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  
  Add "WsClient", "HttpClient", "ToggleSwitch" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "ToggleSwitch"])
  ```
  
## Options 
 check the options [here](./properties.md).


  
## Component usage:

scriptr-toggle-switch is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
 <scriptr-toggle-switch
        data='{"state": "true"}'>
 </scriptr-toggle-switch>
 ```

Example where data is called from backend

 ```html
      <scriptr-toggle-switch
                     switch-status="false"
                     knob-label="TV"
                     is-disabled="false"
                     on-label="ON"
                     off-label="OFF"
                     on-switch-change="vm.onChange"
                     transport="wss"
                     type="switch-danger"        
                     size="switch-mini"
                     msg-tag="toggle"        
                     api="UIComponents/dashboard/frontend/examples/toggleSwitch/getToggleSwitchVal"
                     action-api="UIComponents/dashboard/frontend/examples/toggleSwitch/publishToggleSwitchVal"
                     >
      </scriptr-toggle-switch>
  ```
REST API example (getToggleSwitchVal):
  
  ```javascript
    var body = request.body ? request.body : ((request.rawBody) ? request.rawBody : request.parameters);
    var requestParams = typeof(body) == "string" ? JSON.parse(body) : body;

    if(requestParams.value)
        return { 
            state: requestParams.value, //IF sucess, if not suscces status: !request.parameters["value"]
            disabled:false 
        };
    else 
        return {"state":true, disabled:false};
  ```

REST API example (publishToggleSwitchVal):
  
  ```javascript
    var body = request.body ? request.body : ((request.rawBody) ? request.rawBody : request.parameters);
    var requestParams = typeof(body) == "string" ? JSON.parse(body) : body;

    var publishResponse = function(channel, data, request) {
       var message = {"result": data};
       if(body && body.id) {
         message["id"] = body.id;
       } else {
         //Add a default id to identify the message published over the socket
          message["id"] = "toggle";
       }
       publish(channel, message);
    }

    //publishResponse("responseChannel", {status:true,disabled:false}, request);

    return {"state": requestParams.value};
  ```

