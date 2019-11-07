# Angular Plotly 
 
  Angular component for displaying plotly 3d surface and windrose visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap.css
  
  Bootstrap font-awesome
  
  Underscore
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js

  plotly.js

  angular-plotly

## Getting started:
  Include angular JS  in your application.

  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  Include Plotly modules
   
  ```html
    <script src="/UIComponents/dashboard/frontend/components/plotly/angular-plotly.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/plotly/plotly.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/plotly/windrose.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/plotly/3dsurface.js"></script>
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
  Add "WsClient", "HttpClient", "DataService", "Plotly" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "DataService" "Plotly"])
  ```
## Component options:
  Plotly Module contains two components 3dsurface and windrose.
### 3DSurface options

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
 title | "" | Title to be shown on the plotted chart | string | NO
 xaxis | "" | X axis label | string | NO
 yaxis | "" | Y axis label | string | NO
 zaxis | "" | Z axis label | string | NO
 barTitle |  "" | Bar Title to be shown on the right side bar | string | NO
 barThickness | 20 | Right side bar thickness | number | NO
 showBar | true | set true to show the right side bar | boolean | NO
 displaylogo | false | set true to display plotly logo | boolean | NO
 showModeBar | false | Set true to show the options bar in the top of the chart | boolean | NO
 modeBarButtonsToRemove | [] | Array of options to remove from the options bar | array | NO
 colorScale | [[0,"#c64dff"],[1,"#1dbc68"]] | Array of heat colors | array | NO
 contours | {"z":{"show":true,"usecolormap":true,"highlightcolor":"#38b9d6","project":{"z":true}},"x":{"show":false,"usecolormap":true,"highlightcolor":"#c64dff","project":{"x":false}},"y":{"show":false,"usecolormap":true,"highlightcolor":"#e90088","project":{"y":false}}} | Object to config the projection | object | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO


### Component usage:

scriptr-three-d-surface is an element component. you will just have to add it in your html view and add its relevant options.

Example 

```html
<scriptr-three-d-surface
										transport='https'
										api='UIComponents/dashboard/frontend/examples/plotly/get3dSurfaceData'
										data='{"x":[5,8,9,11,17,18,22,25,29,40,45],"y":[1,4,19,20,22,29,34,50,55,60,70],"z":[[94406,102226,100476,104180,95610,101533,102925,101269,99009,92350,104448],[93445,104218,103759,96438,97964,92475,98259,95060,96552,91771,100263],[92525,103953,103434,100673,92664,92543,90106,90020,91159,92297,98877],[104631,94803,97843,100977,90526,102190,101738,101019,95238,99732,93036],[94836,93296,90879,94323,94635,91338,93995,94928,90520,99140,98669],[103672,103768,102159,102392,99864,93895,95896,97644,93341,96207,98995],[91065,103743,101070,92035,102096,104144,103583,98755,101781,100802,98260],[96269,94443,93042,98596,94341,94682,90108,92787,103789,96213,100077],[92990,90872,103253,92603,92238,100841,99683,90743,97936,103678,102659],[95751,100822,92947,91383,92458,103821,97929,94826,90563,94954,100669],[90740,102921,97082,95820,91951,100666,99549,90632,103519,91803,99903]]}'
										title='3D'
										xaxis='Temperature'
										yaxis='Humidity'
										zaxis='Pressure'
										show-bar='true'
										bar-title='Pressure'
										bar-thickness='20'
										color-scale-wrapper='[{"priority":0,"color":"#c64dff"},{"priority":1,"color":"#1dbc68"}]'
										color-scale='[[0,"#c64dff"],[1,"#1dbc68"]]'
										contours='{"z":{"show":true,"usecolormap":true,"highlightcolor":"#38b9d6","project":{"z":true}},"x":{"show":false,"usecolormap":true,"highlightcolor":"#c64dff","project":{"x":false}},"y":{"show":false,"usecolormap":true,"highlightcolor":"#e90088","project":{"y":false}}}'
										mode-bar-buttons-to-remove-wrapper='{"toImage":true,"tableRotation":true,"orbitRotation":true,"resetCameraDefault3d":true,"resetCameraLastSave3d":true,"hoverClosest3d":true,"pan3d":true,"zoom3d":true}'
										show-mode-bar='false'
										displaylogo='false'
                           		>
```
### Windrose options    
| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
 showLegend | "true" | Set true to show the legend | string | NO
 speedUnit | "m/h" | wind speed unit | string | NO
 fontSize | "12" | Font size | string | NO
 customRanges | [{"color": "#CC5464", "lo": 0, "hi": 2}, {"color": "#FCC717", "lo": 2, "hi": 4}, {"color": "#38B9D6", "lo": 4, "hi": 6}, {"color": "#1DBC68", "lo": 6, "hi": 8}, {"color": "#E90088", "lo": 8, "hi": 10}, {"color": "#ffac47", "lo": 10, "hi": 20}] | wind speed ranges and range's colors | array | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
    
### Component usage:

scriptr-windrose is an element component. you will just have to add it in your html view and add its relevant options.

Example 

```html
<scriptr-windrose
										transport='wss'
										data-type='raw'
										schema-for='windrose'
										data-format='windrose'
										speed-unit='km/h'
										fetch-data-interval='300'
										boxLabel='Wind Rose'
										data='{"data": [{"direction": "E", "speeds": [2, 3, 15, 17]},{"direction": "ESE", "speeds": [24, 8, 4]},{"direction": "SSE", "speeds": [2.5, 7, 16]},{"direction": "S", "speeds": [3, 8, 2, 1, 9, 11]},{"direction": "SSW", "speeds": [13, 3, 7.5, 8]},{"direction": "WSW", "speeds": [21, 14, 9]},{"direction": "W", "speeds": [7, 0, 8, 9, 15, 19, 11]},{"direction": "WNW", "speeds": [4, 17, 21]},{"direction": "NNW", "speeds": [14, 7]},{"direction": "N", "speeds": [20, 0, 5, 9, 7]},{"direction": "NNE", "speeds": [1, 0.5, 6.5]},{"direction": "ENE", "speeds": [3.5, 30, 15]}]}'
                                  		on-format-data='vm.windroseFormatData2'
                           		>
                                
                                   
 
 
          
                    
                                </scriptr-windrose>    
```