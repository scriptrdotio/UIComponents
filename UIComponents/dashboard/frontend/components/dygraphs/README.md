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
  
## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  draw-x1-axis     | true	 | Show the X1 Axis. | boolean | NO
  draw-y-axis     | true	 | Show the Y Axis. | boolean | NO
  draw-y2-axis     | true	 | Show the Y2 Axis. | boolean | NO
  colors     | ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"]	 | Data Sets Colors. | array | NO
  x1-axis-label-font-size     | 14	 | X1 label font size in px | int | NO
  y-axis-label-font-size     | 14	 | Y label font size in px | int | NO
  y2-axis-label-font-size     | 14	 | Y2 label font size in px | int | NO
  y-axis-labels-kmb     | false	 | Y labels Kmb | boolean | NO
  y2-axis-labels-kmb     | false	 | Y2 labels Kmb | boolean | NO
  x1-axis-label-width     | 60	 | X1 label width in px | int | NO
  y-axis-label-width     | 250	 | Y label width in px | int | NO
  y2-axis-label-width     | 50	 | Y2 label width in px | int | NO
  x1-axis-line-color     | #000000	 | X1 Axis line color | string | NO
  y-axis-line-color     | #000000	 | Y Axis line color | string | NO
  y2-axis-line-color     | #000000	 | Y2 Axis line color | string | NO
  x1-axis-line-width     |  0.3	 | X1 line width in px | float | NO
  y-axis-line-width     |  0.3	 | Y line width in px | float | NO
  y2-axis-line-width     |  0.3	 | Y2 line width in px | float | NO
  x1-axis-tick-size     |  3	 | X1 tick size in px | float | NO
  y-axis-tick-size     |  3	 | Y tick size in px | float | NO
  y2-axis-tick-size     |  3  | Y2 tick size in px | float | NO
  x1-axis-label     | ""	 | X1 Axis label | string | NO
  y-axis-label     | "	 | Y Axis label | string | NO
  y2-axis-label     | "	 | Y2 Axis label | string | NO
  y-axis-inclde-zero     | false	 | Y Axis include zero | boolean | NO
  y2-axis-inclde-zero     | false	 | Y2 Axis include zero | boolean | NO
  show-range-selector     | false	 | Show Range Selector | boolean | NO
  range-selector-alpha     | 0.6	 | Range Selector Alpha. | float | NO
  range-selector-background-line-width     | 1	 | width in px. | float | NO
  range-selector-background-stroke-color     | #808080	 | color value. | string | NO
  range-selector-foreground-line-width     | 1	 | width in px. | float | NO
  range-selector-foreground-stroke-color     | #000000	 | color value. | string | NO
  range-selector-height     | 40	 | Height in px. | float | NO
  range-selector-plot-fill-color     | #A7B1C4	 | color value. | string | NO
  range-selector-plot-fill-gradient-color     | #ffffff	 | color value. | string | NO
  range-selector-plot-line-width     | 1.5	 | width in px. | float | NO
  range-selector-plot-stroke-color     | #808FAB	 | color value. | string | NO
  show-legend     | false	 | show chart legend. | boolean | NO
  legend-position     | top	 | The legend position (top,bottom,left,right). | string | NO
  x1-draw-grid     | true	 | draw grid on the X1 Axis | boolean | NO
  y-draw-grid     | true	 | draw grid on the Y Axis | boolean | NO
  y2-draw-grid     | false	 | draw grid on the Y2 Axis | boolean | NO
  x1-grid-line-color     | #000000	 | grid on the X1 Axis line color | string | NO
  y-grid-line-color     | #000000	 | grid on the Y Axis line color | string | NO
  y2-grid-line-color     | #000000	 | grid on the Y2 Axis line color | string | NO
  x1-grid-line-width     | 0.3	 | grid on the X1 Axis line width in px | float | NO
  y-grid-line-width     | 0.3	 | grid on the Y Axis line width in px | float | NO
  y2-grid-line-width     | 0.3	 | grid on the Y2 Axis line width in px | float | NO
  legend-labels     | ["x"]	 | The Legend Labels to show. | array | NO
  independent-ticks     | y-primary	 | independent ticks . | string | NO
  legend-mapping     | ["X"]	 | The Legend Labels mappings. | array | NO
  custom-goals     | null	 | Array of goals and goal line color ex: [{"goal-line-colors":"#f0f0f0","goals":1}]. | array | NO
  custom-events     | null	 |  Array of events and event line color ex: [{"event-line-colors":"#cccccc","events":"20-03-2008"}]. | array | NO
  colors-mapping     | null	 | Map colors values to colors option. | array | NO
  connect-separated-points     | true	 | Connect the points if there is gaps ,gaps comes from null Y values. | boolean | NO
  draw-points     | true	 | Drow the points over the chart line. | boolean | NO
  point-size     | 3	 | The point size in px. | float | NO
  stroke-width     | 1	 | The stroke line width in px, set to 0 if you want to draw scattered points on the chart | float | NO 
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
  

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
  
  
  
  