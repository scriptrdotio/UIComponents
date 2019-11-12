# Angular Dygraphs Chart 
 
  Angular component for displaying big historical data.
  
  It can take static value or be synced to a Real-time Communication. 


## Requirements:
  
  AngularJS v1.5.6+
    
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  dygraphs v2.1.0
 
## Getting started:

  Include angular JS  in your application.

  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  Include Dygraphs modules
   
  ```html
    <script src="/UIComponents/dashboard/frontend/components/dygraphs/dygraphs-2.1.0.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/dygraphs/angular-dygraphs.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/dygraphs/dygraphs.js"></script>
  ```
  
  Include wsProvider, httpProvider and dataService for calling backend API's
  
  ```html
    <script src="/UIComponents/wsProvider.js"></script>
    <script src="/UIComponents/httpProvider.js"></script>
    <script src="/UIComponents/dataService.js"></script>
  ```
  
  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  
  Add "WsClient", "HttpClient", "DataService", "Dygraphs" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "DataService" "Dygraphs"])
  ```
  
  
## Options 
 check the options [here](./properties.md).

## Component usage:

scriptr-dygraphs is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
 <scriptr-dygraphs
					
		data='[[1519312895840,10,26,16,20],[1519312896840,11,25,16,20],[1519312897840,10,26,16,20],[1519312898840,11,25,15,20],[1519312899840,10,26,16,21]]'
		grid-text-family='Source Sans Pro'
		x1-axis-label-font-size='12'
		x1-axis-label-width='40'
		y2-axis-label-width='40'
		y-axis-label-width='40'
		y2-axis-label-font-size='12'
		y-axis-label-font-size='12'
		independent-ticks='independent'
		colors-mapping='[{"labels":"Y1","colors":"#ad7fa8","axisSelection":"y","unit":"%"},{"labels":"Y2","colors":"#FCC717","axisSelection":"y","unit":"X"},{"labels":"Y3","colors":"#38B9D6","axisSelection":"y","unit":"Hz"},{"labels":"Y4","colors":"#1DBC68","axisSelection":"y","unit":"%"}]'
		show-legend='true'
		legend-position='bottom'
		draw-x1-axis='true'
		draw-y-axis='true'
		draw-y2-axis='false'
		custom-goals='[{"goal-line-colors":"#f0f0f0","goals":null}]'
		events='["2010-02-02"]'
		event-line-colors='["#ffffff"]'
		x1-axis-line-color='#e9b96e'
		y-axis-line-color='#ef2929'
		y2-axis-line-color='#000000'
		x1-axis-line-width='1'
		y-axis-line-width='1'
		y2-axis-line-width='1'
		y-axis-include-zero='false'
		y2-axis-include-zero='false'
		y-axis-labels-kmb='false'
		y2-axis-labels-kmb='false'
		show-range-selector='true'
		range-selector-alpha='0.6'
		range-selector-background-line-width='1'
		range-selector-background-stroke-color='#808080'
		range-selector-foreground-line-width='1'
		range-selector-foreground-stroke-color='#000000'
		range-selector-height='40'
		range-selector-plot-fill-color='#A7B1C4'
		range-selector-plot-fill-gradient-color='#FFFFFF'
		range-selector-plot-line-width='1.5'
		range-selector-plot-stroke-color='#808FAB'
		x1-draw-grid='true'
		y-draw-grid='true'
		y2-draw-grid='false'
		x1-grid-line-color='#000000'
		y-grid-line-color='#000000'
		y2-grid-line-color='#000000'
		x1-grid-line-width='1'
		y-grid-line-width='1'
		y2-grid-line-width='1'
		x1-axis-label='Label1'
		y-axis-label='Label2'
		y2-axis-label=''
                           		>
 ```
 
 Example where data is called from backend
 
 ```html
     <scriptr-dygraphs
		
		fetch-data-interval='300'
		transport='https'
		grid-text-family='Source Sans Pro'
		x1-axis-label-font-size='12'
		x1-axis-label-width='40'
		y2-axis-label-width='40'
		y-axis-label-width='40'
		y2-axis-label-font-size='12'
		y-axis-label-font-size='12'
		independent-ticks='independent'
		colors-mapping='[{"labels":"Y1","colors":"#ad7fa8","axisSelection":"y","unit":"%"},{"labels":"Y2","colors":"#FCC717","axisSelection":"y","unit":"X"},{"labels":"Y3","colors":"#38B9D6","axisSelection":"y","unit":"Hz"},{"labels":"Y4","colors":"#1DBC68","axisSelection":"y","unit":"%"}]'
		show-legend='true'
		legend-position='bottom'
		draw-x1-axis='true'
		draw-y-axis='true'
		draw-y2-axis='false'
		custom-goals='[{"goal-line-colors":"#f0f0f0","goals":null}]'
		events='["2010-02-02"]'
		event-line-colors='["#ffffff"]'
		x1-axis-line-color='#e9b96e'
		y-axis-line-color='#ef2929'
		y2-axis-line-color='#000000'
		x1-axis-line-width='1'
		y-axis-line-width='1'
		y2-axis-line-width='1'
		y-axis-include-zero='false'
		y2-axis-include-zero='false'
		y-axis-labels-kmb='false'
		y2-axis-labels-kmb='false'
		show-range-selector='true'
		range-selector-alpha='0.6'
		range-selector-background-line-width='1'
		range-selector-background-stroke-color='#808080'
		range-selector-foreground-line-width='1'
		range-selector-foreground-stroke-color='#000000'
		range-selector-height='40'
		range-selector-plot-fill-color='#A7B1C4'
		range-selector-plot-fill-gradient-color='#FFFFFF'
		range-selector-plot-line-width='1.5'
		range-selector-plot-stroke-color='#808FAB'
		x1-draw-grid='true'
		y-draw-grid='true'
		y2-draw-grid='false'
		x1-grid-line-color='#000000'
		y-grid-line-color='#000000'
		y2-grid-line-color='#000000'
		x1-grid-line-width='1'
		y-grid-line-width='1'
		y2-grid-line-width='1'
		x1-axis-label='Label1'
		y-axis-label='Label2'
		y2-axis-label=''
		http-method='GET'
		api='UIComponents/dashboard/frontend/examples/dygraphs/getDygraphsData'
                                  		on-format-data='vm.lineFormatData7'
                           		>
  ```
 REST API example:
  
  ```javascript
  return [[1519312895840,3,26,16,20],[1519312896840,1,25,16,20],[1519312897840,0,26,16,20],[1519312898840,14,25,15,20],[1519312899840,10,26,16,21]];
  ``` 
  
  
  
  