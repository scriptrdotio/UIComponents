# Angular Speedometer 
 
  Angular component for displaying meter gauge/speedometer gauge visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  D3.js v4.2.2
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
## Getting started:

  You will need to include angular JS and 'D3 JS' in your project to make the component work

  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  <script src="https://d3js.org/d3.v4.min.js"></script>  
  ```
  Include angular-metergauge module
   
  ```html
  <script src="/UIComponents/dashboard/frontend/components/speedometer/angular.metergauge.min.js"></script>
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
  
  Add "WsClient", "HttpClient", "Speedometer" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "Speedometer"])
  ```
  
## Options:

| Option        | Description   |
| ------------- |:-------------:|
  gauge-radius     | 	sets the size of the gauge (Optional).
  min-val          | 	Minimum value to be shown in gauge scale.                  
  max-val    	     | 	Maximum value to be shown in gauge scale. 
  needle-val       | 	Sets the value of needle to be pointed.                      
  tick-space-min-val | 	space between the major ticks of the gauge.                  
  tick-space-maj-val | 	space between the sub ticks of the gauge.  					 
  div-id           | 	sets an id for svg where gauge will be rendered (Optional).  
  gauge-units      | 	Unit of the values to be shown(ex. Kmph,%).  				 
  tick-col-maj      |  	sets colour of the major tick.  							 
  tick-col-min      | 	sets colour of the sub tick.								 
  outer-edge-col    | 	sets the colour of outer circle of the gauge.  				 		
  pivot-col        | 	sets colour of the pivot.  									 
  inner-col        | 	sets colour of inner body of the gauge. 					 
  units-label-col   | 	sets colour of units label.  								 
  tick-label-col    | 	sets colour of labels of the ticks.							 
  needle-col       | 	sets colour of the needle.  								 
  default-fonts    | 	sets the default fonts in gauge.						     
  api             | 	Name of the api to call backend data (Optional).					 
  transport       | 	method used to call api (can take "http" or "wss") (Optional).		 
  msg-tag          | 	Subscribe to socket messages with tag name (Optional).		     
  api-params         | 	api parameters (Optional).  					
  
  
## Componenet usage:

scriptr-speedometer is an element component. you will just have to add it in your html view and add its relevant options.


