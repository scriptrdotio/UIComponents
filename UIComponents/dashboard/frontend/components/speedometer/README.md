# Angular Speedometer 
 
  Angular component for displaying meter gauge/speedometer gauge visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:
  
  AngularJS v1.5.6+
  
  Metergauge
  
  D3.js v4.2.2
  
  wsProvider.js
  
  httpProvider.js
  
## Getting started:

  You will need to include angular JS and 'D3 JS' in your project to make the component work

  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  Include angular-metergauge module and D3.js
   
  ```html
  <script src="https://d3js.org/d3.v4.min.js"></script>  
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

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  gauge-radius     | 120 |	sets the size of the gauge. | NO
  min-val          | 0 | 	Minimum value to be shown in gauge scale. | NO                 
  max-val    	     | 220 |	Maximum value to be shown in gauge scale. | NO
  needle-val       | 	0 | Sets the value of needle to be pointed.  | NO                    
  tick-space-min-val | 10 |	space between the major ticks of the gauge.    | NO              
  tick-space-maj-val | 20 |	space between the sub ticks of the gauge.  	| NO				 
  gauge-units      | "kmh"| 	Unit of the values to be shown(ex. Kmph,%).  				 | NO
  tick-col-maj      |  	sets colour of the major tick.  							 
  tick-col-min      | 	sets colour of the sub tick.								 
  outer-edge-col    | 	sets the colour of outer circle of the gauge.  				 		
  pivot-col        | 	sets colour of the pivot.  									 
  inner-col        | 	sets colour of inner body of the gauge. 					 
  units-label-col   | 	sets colour of units label.  								 
  tick-label-col    | 	sets colour of labels of the ticks.							 
  needle-col       | 	sets colour of the needle.  								 
  default-fonts    | 	sets the default fonts in gauge.						     
  api             | 	Name of the api to call backend data.					 
  transport       | 	method used to call api (can take "http" or "wss").		 
  msg-tag          | 	Subscribe to socket messages with tag name.		     
  api-params         | 	api parameters.  					
  
  
## Componenet usage:

scriptr-speedometer is an element component. you will just have to add it in your html view and add its relevant options.

  ```html
   <scriptr-speedometer
      needle-val="50">
  </scriptr-speedometer>
  ```
