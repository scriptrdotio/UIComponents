# Angular Odometer 
 
  Angular component for displaying odometer gauge visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:
  
  AngularJS v1.5.6+
  
  Odometer 
  
  wsProvider.js
  
  httpProvider.js
  
## Getting started:

  Include angular JS with angular-odometer.js in your application, as well as the odometer.js and the default theme CSS file

  Include angular JS
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  Include Odometer modules
   
  ```html
  <script src="/UIComponents/dashboard/frontend/components/odometer/odometer.min.js"></script>
  <script src="/UIComponents/dashboard/frontend/components/odometer/angular.odometer.min.js"></script>
  <script src="/UIComponents/dashboard/frontend/components/odometer/odometer.js"></script>
  ```
  
  Include a default theme CSS
  ```html
  <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/odometer/odometer.car.css">
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
  
  Add "WsClient", "HttpClient", "Odometer" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "HttpClient", "Odometer"])
  ```
  
## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  odometer-value | 0 | Set a static value for Odometer | NO
  theme     | 'car'	 |Specify the theme (if you have more than one theme css file on the page). | NO
  duration     | 3000	 |Change how long the javascript expects the CSS animation to take. | NO
  animation     | 'count'	 | Count is a simpler animation method which just increments the value,use it when you're looking for something more subtle. | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  
  
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

