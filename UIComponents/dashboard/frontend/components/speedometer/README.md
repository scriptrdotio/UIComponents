# Angular Speedometer 
 
  Angular component for displaying meter gauge/speedometer gauge visualization

## Requirements:

  D3.js v4.2.2
  AngularJS v1.0.1+
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
    <script src="/UIComponents/config/scriptrTransport.js"></script>
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
  gaugeRadius     | 	sets an id for svg where gauge will be rendered (Optional).
  minVal          | 	Minimum value to be shown in gauge scale.                  
  maxVal    	  | 	Maximum value to be shown in gauge scale. 
  needleVal       | 	Sets the value of needle to be pointed.                      
  tickSpaceMinVal | 	space between the major ticks of the gauge.                  
  tickSpaceMajVal | 	space between the sub ticks of the gauge.  					 
  divID           | 	sets an id for svg where gauge will be rendered (Optional).  
  gaugeUnits      | 	Unit of the values to be shown(ex. Kmph,%).  				 
  tickColMaj      |  	sets colour of the major tick.  							 
  tickColMin      | 	sets colour of the sub tick.								 
  outerEdgeCol    | 	sets the colour of outer circle of the gauge.  				 		
  pivotCol        | 	sets colour of the pivot.  									 
  innerCol        | 	sets colour of inner body of the gauge. 					 
  unitsLabelCol   | 	sets colour of units label.  								 
  tickLabelCol    | 	sets colour of labels of the ticks.							 
  needleCol       | 	sets colour of the needle.  								 
  defaultFonts    | 	sets the default fonts in gauge.						     
  api             | 	Name of the api to call backend data.						 
  transport       | 	method used to call api (can take "http" or "wss")			 
  msgTag          | 	Subscribe to socket messages with tag name				     
  apiData         | 	api parameters  					
  
  
## Componenet usage:

scriptr-speedometer is an element component. you will just have to add it in your html view and add its relevant options.














