# Angular Odometer 
 
  Angular component for displaying odometer gauge visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:
  
  underscore-min.js
  
  AngularJS v1.5.6+
  
  Odometer 
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  Bootstrap JS
  
  Notifications CSS/JS
  
## Getting started:

  Include Underscore
  
  ```html
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  ```
  
  Include angular JS
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  
  Include wsProvider, httpProvider and dataService for calling backend API's
  
  ```html
    <script src="/UIComponents/wsProvider.js"></script>
    <script src="/UIComponents/httpProvider.js"></script>
    <script src="/UIComponents/dataService.js"></script>
  ```
  
  Include bootstrap
  
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"></script>
  ```
  
  Include notifications
  
  ```html
    <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/common/notifications.css">
    <script src="/UIComponents/dashboard/frontend/components/common/notifications.js"></script>
  ```
     
  Include a default theme CSS
  
  ```html
  <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/odometer/odometer.car.css">
  ```
     
  Include Odometer modules
   
  ```html
  <script src="/UIComponents/dashboard/frontend/components/odometer/odometer.min.js"></script>
  <script src="/UIComponents/dashboard/frontend/components/odometer/angular.odometer.min.js"></script>
  <script src="/UIComponents/dashboard/frontend/components/odometer/odometer.js"></script>
  ```
  
  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  
  Add "WsClient", "HttpClient", "Odometer" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "HttpClient", "Odometer"])
  ```
  
 ## Options 
 check the options [here](./properties.md).
  
## Component usage:

scriptr-odometer is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

 ```html
     <scriptr-odometer
           odometer-value="54151">        
    </scriptr-odometer>
  ```
  
Example where data is called from backend

 ```html
    <scriptr-odometer
        transport='wss'
        api='UIComponents/dashboard/frontend/examples/odometer/getOdometerVal'
        theme='car'
        msg-tag='odometer'
        animation='count'
        duration='1000'> 
      </scriptr-odometer>
  ```
  
  REST API example:
  
  ```javascript
   var value =  Math.floor((Math.random() * 100) + 10); 

   var publishResponse = function(channel, data, request) {
      var message = {"result": data};

      //Add a default id to identify the message published over the socket
      message["id"] = "odometer";
      publish(channel, message);
   }

   publishResponse("responseChannel", value, request);

   //Return data when someone calls api over websocket or http
   return value;
  ```
  Each odometer application subscribed to "responseChannel" with msg-tag = "odometer" gets updated everytime a rest api is called. 

