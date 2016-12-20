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
  
## Options:

| Option        | Default value   | Description   |
| ------------- |:-------------:|:-------------:|
  gauge-value     | 75	 | Sets the value of the gauge.
  custom-sectors  | [{color : "#A3CD3B", lo : 0, hi : 25}, { color : "#FF4A43", lo : 25, hi : 100 }] | array of objects with color, hi, lo attributes.
  value-font-color     | '#999'	 | color of the value text.
  min       | 0    | 	minimum value.		
  max       | 100    | 	maximum value.	
  hide-min-max       | false    | 	hide min and max values.	
  hide-value       | 0    | 	hide value text.	
  hide-inner-shadow       | true    | 	hide inner shadow.	
  gauge-color       | '#e9e9e9'    | 	background color of gauge element.	
  show-inner-shadow       | false    | 	true to display inner shadow.	
  shadow-size       | 0    | 	 inner shadow size.	
  shadow-opacity       | 0    | 	shadow opacity, values 0 ~ 1.	
  label       | '% full'    | 	 text to show below value.	
  label-font-color       | '#666'    | 	 color of label under the value.	
  start-animation-type       | 'linear'    | 	 type of initial animation (linear, >, <, <>, bounce).	
  refresh-animation-type      | 'linear'    | 	 type of refresh animation (linear, >, <, <>, bounce).	
  counter      | true    | 	 increase numbers one by one.
  transport |  'wss'     | 	method used to call api (can take "http" or "wss").	 
  msg-tag   | 'gauge'      | 	Subscribe to socket messages with tag name.		     
  api-params  | '{data : params}'       | 	api parameters.  					
  
  
## Componenet usage:

scriptr-gauge is an element component. you will just have to add it in your html view and add its relevant options.

 ```html
     <scriptr-gauge 
              transport='wss' 
              msg-tag="gauge" 
              api='UIComponents/dashboard/frontend/examples/gauge/getGaugeVal'
    </scriptr-gauge>
  ```
