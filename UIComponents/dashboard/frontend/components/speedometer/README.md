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
  
  ```javascript
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
  tick-col-maj      |  "#C64DFF" | 	sets colour of the major tick.  					| NO		 
  tick-col-min      | "#999999" | 	sets colour of the sub tick.						| NO		 
  outer-edge-col    | "#f4f4f4" | 	sets the colour of outer circle of the gauge.  				| NO 		
  pivot-col        | "#434a54" |	sets colour of the pivot. | NO  									 
  inner-col        | 	"#ffffff" | sets colour of inner body of the gauge. 				| NO	 
  units-label-col   | "#C64DFF" |  	sets colour of units label.  					| NO			 
  tick-label-col    | "#656D78" |	sets colour of labels of the ticks.			| NO				 
  needle-col       | 	"#C64DFF" | sets colour of the needle.  		| NO						 
  default-fonts    | undefined |	sets the default fonts in gauge.						     | NO
  api             | undefined | 	Name of the api to call backend data. | 					 Required if calling data from backend
  transport       | 	undefined | method used to call api (can take "https" or "wss").		| NO 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  msg-tag          | undefined | 	Subscribe to socket messages with tag name.		     | NO
  api-params      | undefined   | 	api parameters. | NO  					
  
  
## Component usage:

scriptr-speedometer is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

  ```html
   <scriptr-speedometer
      needle-val="50">
  </scriptr-speedometer>
  ```
  
  Example where data is called from backend
  
  ```html
    <scriptr-speedometer
     api="UIComponents/dashboard/frontend/examples/speedometer/getSpeedometerVal"
     msg-tag="speedometer">
  </scriptr-speedometer>
  ```
  
  REST API example:
  
  ```javascript
   var value =  Math.floor((Math.random() * 100) + 10); 

   var publishResponse = function(channel, data, request) {
      var message = {"result": data};

      //Add a default id to identify the message published over the socket
      message["id"] = "speedometer";
      publish(channel, message);
   }

   publishResponse("responseChannel", value, request);

   //Return data when someone calls api over websocket or http
   return value;
  ```
  Each speedometer application subscribed to "responseChannel" with msg-tag = "speedometer" gets updated everytime a rest api is called. 
