# Angular Gauge 
 
  Angular component for displaying meter gauge visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:
  
  Underscore JS
  
  JQuery
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  Bootstrap JS
  
  Notifications CSS/JS
  
  Gauge Modules
  
## Getting started:

  Include angular JS with angular-gauge.js in your application, as well as the raphael.js and justgage.js directives.

  Include JQuery (ensure it is loaded before the angular.js)

  ```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```

  Include underscore JS

  ```html
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  ```

  Include angular JS  in your application.
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  Include Gauge modules
   
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/justgage/1.2.2/justgage.min.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/gauge/angular.gauge.min.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/gauge/gauge.js"></script>
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
  
  Add "WsClient", "HttpClient", "Gauge" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "Gauge"])
  ```
  
## Options 
 check the options [here](./properties.md).
 
## Component usage:

scriptr-gauge is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
 <scriptr-gauge 
        data='50'>
 </scriptr-gauge>
 ```
 
 Example where data is called from backend
 
 ```html
     <scriptr-gauge 
                transport='wss' 
                msg-tag="gauge" 
                title="Title"
                title-font-color="#aaa"
                api='UIComponents/dashboard/frontend/examples/gauge/getGaugeVal'
                title-position="above"
                hide-inner-shadow="false"
                shadow-vertical-offset="3"
                shadow-opacity="0.2"
                pointer="true"
                value-font-color="#aff542"
                hide-inner-shadow="false"
                start-animation-type="bounce"
                refresh-animation-type="bounce"
                relative-gauge-size="true"
                on-format-data="vm.callback"
    </scriptr-gauge>
  ```
  
  REST API example:
  
  ```javascript
   var value =  Math.floor((Math.random() * 100) + 10); 

   var publishResponse = function(channel, data, request) {
      var message = {"result": data};

      //Add a default id to identify the message published over the socket
      message["id"] = "gauge";
      publish(channel, message);
   }

   publishResponse("responseChannel", value, request);

   //Return data when someone calls api over websocket or http
   return value;
  ```
  Each gauge application subscribed to "responseChannel" with msg-tag = "gauge" gets updated everytime a rest api is called. 


