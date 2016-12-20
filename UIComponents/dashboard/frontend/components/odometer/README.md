# Angular Speedometer 
 
  Angular component for displaying meter gauge/odometer gauge visualization.
  
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
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "Odometer"])
  ```
  
## Options:

| Option        | Value   | Description   |
| ------------- |:-------------:|:-------------:|
  theme     | 'car'	 |Specify the theme (if you have more than one theme css file on the page).
  duration     | 3000	 |Change how long the javascript expects the CSS animation to take.
  animation     | 'count'	 | Count is a simpler animation method which just increments the value,use it when you're looking for something more subtle.
  api       | 'getOdometerValue'    | 	Name of the api to call backend data (Optional).					 
  transport |  'http'     | 	method used to call api (can take "http" or "wss") (Optional).		 
  msg-tag   | 'odometer'      | 	Subscribe to socket messages with tag name (Optional).		     
  api-params  | '{data : params}'       | 	api parameters (Optional).  					
  
  
## Componenet usage:

scriptr-odometer is an element component. you will just have to add it in your html view and add its relevant options.

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
