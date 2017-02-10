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

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  gauge-value     | 75	 | Sets the value of the gauge. | int | NO
  custom-sectors  | [{color : "#A3CD3B", lo : 0, hi : 25}, { color : "#FF4A43", lo : 25, hi : 100 }] | array of objects with color, hi, lo attributes. | NO
  value-font-color     | '#999'	 | color of the value text. | NO
  min       | 0    | 	minimum value.		| NO
  max       | 100    | 	maximum value.	| NO
  title-font-color       | #aaa    | 	color of the title text.	| NO
  title-font-family       | null    | 	font-family of the title text.	| NO
  title-position       | 'above'    | 	"above" or "below" the gauge.	| NO
  value-font-family       | null    | 	font-family of the value text.	| NO
  relative-gauge-size       | null    | 	true if the gauge has to grow with the container.	| NO
  value-min-font-size       | null    | 	absolute minimum font size for the value.	| NO
  title-min-font-size       | null    | 	absolute minimum font size for the title.	| NO
  label-min-font-size       | null    | 	absolute minimum font size for the label.	| NO
  min-label-min-font-size       | null    | 	absolute minimum font size for the minimum label.	| NO
  max-label-min-font-size       | null    | 	absolute minimum font size for the maximum label.	| NO
  gauge-width-scale       | null    | 	width of the gauge element.	| NO
  shadow-vertical-offset       | null    | 	how much is shadow offset from top.	| NO
  level-colors       | null    | 	array of strings, colors of indicator, from lower to upper, in hex format.	| NO
  no-gradient       | null    | 	true to use sector-based color change, false to use gradual color change.	| NO
  start-animation-time       | null    | 	length of initial load animation.	| NO
  refresh-animation-time       | null    | 	length of refresh animation.	| NO
  donut       | null    | 	turn the gauge into a full circle donut.	| NO
  donut-start-angle       | null    | 	angle to start from when in donut mode.	| NO
  reverse       | null    | 	if true, max and min are swapped (with max appearing on the left, min on the right).	| NO
  decimals       | null    | 	quantity of decimal numbers to show.	| NO
  symbol       | null    | 	unit of measure that will be appended to value.	| NO
  format-number       | null    | 	whether to format numbers.	| NO
  human-friendly       | null    | 	true to show shorthand big numbers (300K instead of 300XXX).	| NO
  human-friendly-decimal       | null    | 	number of decimal places for our human friendly number to contain.	| NO
  min-txt       | null    | 	maximum value.	| NO
  max-txt       | null    | 	maximum value.	| NO
  on-animation-end       | null    | 	maximum value.	| NO
  pointer       | null    | 	maximum value.	| NO
  pointerOptions       | null    | 	maximum value.	| NO
  hide-min-max       | false    | 	hide min and max values.	| NO
  hide-value       | false    | 	hide value text.	| NO
  hide-inner-shadow       | true    | 	hide inner shadow.	| NO
  gauge-color       | '#e9e9e9'    | 	background color of gauge element.	| NO
  show-inner-shadow       | false    | 	true to display inner shadow.	| NO
  shadow-size       | 0    | 	 inner shadow size.	| NO
  shadow-opacity       | 0    | 	shadow opacity, values 0 ~ 1.	| NO
  label       | '% full'    | 	 text to show below value.	| NO
  label-font-color       | '#666'    | 	 color of label under the value.	| NO
  start-animation-type       | 'linear'    | 	 type of initial animation (linear, >, <, <>, bounce).	| NO
  refresh-animation-type      | 'linear'    | 	 type of refresh animation (linear, >, <, <>, bounce).	| NO
  counter      | true    | 	 increase numbers one by one. | NO
  api | undefined | Name of the API to get data | Required if getting data from backend | NO
  on-format-data | null | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | NO
  api-params  | null      | 	api parameters.  					| NO
  
  
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


