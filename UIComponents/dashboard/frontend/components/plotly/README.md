# Angular Plotly 
 
  Angular component for displaying plotly 3d surface and windrose visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap.css
  
  Bootstrap font-awesome
  
  Underscore
  
  JQuery
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js

  plotly-latest.min.js

  plotly.js

  angular-plotly.js
  
  windrose.js or 3dsurface.js

## Getting started:
  Include Bootstrap CSS
  
  ```html
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  ```

  Include Bootstrap font-awesome
  
  ```html
    <script src="//use.fontawesome.com/3d61d6959e.js"></script>
  ```
  
  Include Underscore
  
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  ```
  
  Include JQuery
  
  ```html
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```
  
  Include angular JS  in your application.
  
  ```html
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
    <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```

  Include Plotly modules
   
  ```html
    <script src="//cdn.plot.ly/plotly-latest.min.js"></script>
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
  
  Include Bootstrap JS
  
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"></script>
  ```
  
  Include Notifications CSS/JS
  
  ```html
    <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/common/notifications.css">
    <script src="/UIComponents/dashboard/frontend/components/common/notifications.js"></script>
  ```
  
  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  Add "WsClient", "HttpClient", "Plotly" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "DataService" "Plotly"])
  ```
## Component options:
  Plotly Module contains two components 3dsurface and windrose.
### 3DSurface options
check the options [here](./3dsurface_properties.md).

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
</scriptr-three-d-surface>
```
### Windrose options    
check the options [here](./windrose_properties.md).
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
