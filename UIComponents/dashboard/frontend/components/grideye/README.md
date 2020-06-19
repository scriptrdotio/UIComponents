# Angular Grideye 
 
  Angular component for displaying heat grid visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:
  
  JQuery
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  Bootstrap JS
  
  Notifications CSS/JS
  
  p5.js
  
  Grideye Modules
  
## Getting started:

  Include angular JS with angular-p5.js and cell.js in your application, as well as the grideye.js directives.

  Include JQuery (ensure it is loaded before the angular.js)

  ```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```

  Include angular JS  in your application.
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  
  Include p5.js in your application.
  
  ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.js"></script>
  ```
  
  Include Grideye modules
   
  ```html
    <script src="/UIComponents/dashboard/frontend/components/grideye/angular-p5.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/grideye/cell.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/grideye/grideye.js"></script>
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
  
  Add "WsClient", "HttpClient", "Grideye" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "Grideye"])
  ```
  
## Options 
 check the options [here](./properties.md).
 
## Component usage:

scriptr-grideye is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
 <scriptr-grideye 
        data='[
        10,30,90,90,30,20,20,10,
        10,30,90,60,90,30,30,20,
        20,30,90,60,30,90,30,20,
        20,30,90,60,20,30,90,30,
        20,30,90,60,20,30,90,30,
        20,30,90,60,30,90,30,20,
        10,30,90,60,90,30,30,10,
        10,30,90,90,30,20,20,10,
    ]'>
 </scriptr-grideye>
 ```
 
 Example where data is called from backend
 
 ```html
     <scriptr-grideye 
                transport='https' 
                msg-tag="grideye" 
                api='UIComponents/dashboard/frontend/examples/grideye/getGrideyeVal'
                on-format-data="vm.callback"
    </scriptr-grideye>
  ```
  
  REST API example:
  
  ```javascript
   var value =  [
        10,30,90,90,30,20,20,10,
        10,30,90,60,90,30,30,20,
        20,30,90,60,30,90,30,20,
        20,30,90,60,20,30,90,30,
        20,30,90,60,20,30,90,30,
        20,30,90,60,30,90,30,20,
        10,30,90,60,90,30,30,10,
        10,30,90,90,30,20,20,10,
    ]; 

    var body = request.body ? request.body : ((request.rawBody) ? request.rawBody : request.parameters);
    var requestParams = typeof(body) == "string" ? JSON.parse(body) : body;

    var publishResponse = function(channel, data, request) {
       var message = {"result": data};
       if(body && body.id) {
         message["id"] = body.id;
       } else {
         //Add a default id to identify the message published over the socket
          message["id"] = "grideye";
       }
       publish(channel, message);
    }

    publishResponse("responseChannel", value, request);

    return value;
  ```
  Each grideye application subscribed to "responseChannel" with msg-tag = "grideye" gets updated everytime a rest api is called. 


