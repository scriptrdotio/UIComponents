# Angular Gauge 
 
  Angular component for displaying meter gauge visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:
  
  AngularJS v1.5.6+
  
  Gauge Modules
  
  wsProvider.js
  
  httpProvider.js
  
## Getting started:

  Include angular JS with angular-gauge.js in your application, as well as the raphael.js and justgage.js directives.

  Include angular JS
  
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
  
  Include wsProvider and httpProvider for calling backend API's
  
  ```html
    <script src="/UIComponents/wsProvider.js"></script>
    <script src="/UIComponents/httpProvider.js"></script>
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
        gauge-value='50'>
 </scriptr-gauge>
 ```
 
 Example where data is called from backend
 
 ```html
     <scriptr-gauge 
              transport='wss' 
              msg-tag="gauge" 
              api='UIComponents/dashboard/frontend/examples/gauge/getGaugeVal'
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


