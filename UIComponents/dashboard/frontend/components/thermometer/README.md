# Angular Thermometer 
 
  Angular component for displaying progress Thermometer visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  JQuery
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  Bootstrap JS
  
  Notifications CSS/JS

  Thermometer CSS/modules
  
## Getting started:

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

  Include Thermometer CSS/modules
   
  ```html
    <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/thermometer/style.css">
    <script src="/UIComponents/dashboard/frontend/components/thermometer/thermometer_directive.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/thermometer/thermometer.js"></script>
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
  
  Add "WsClient", "HttpClient", "Thermometer" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "HttpClient", "Thermometer"])
  ```
 ## Options 
 check the options [here](./properties.md).  
 
  
## Component usage:

scriptr-thermometer is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

 ```html
      <scriptr-thermometer
                         percent="36"  
                         height="220"
              >
           <scriptr-thermometer>  
  ```
  
Example where data is called from backend

 ```html
     <scriptr-thermometer
                       api="UIComponents/dashboard/frontend/examples/thermometer/getThermometerValue"      
                       size="small"       
                       height="120"
            >
         <scriptr-thermometer>  
  ```
  
  REST API example:
  
  ```javascript
   var value = Math.floor((Math.random() * 100) + 1);

   var publishResponse = function(channel, data, request) {
      var message = {"result": data};

      //Add a default id to identify the message published over the socket
      message["id"] = "thermometer";
      publish(channel, message);
   }

   publishResponse("responseChannel", value, request);

   //Return data when someone calls api over websocket or http
   return value;
  ```
  Each Thermometer application subscribed to "responseChannel" with msg-tag = "thermometer" gets updated everytime a rest api is called. 

