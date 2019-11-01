# Angular Map 
 
  Angular component for displaying map's visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap.css
  
  Bootstrap font-awesome
  
  google fonts
  
  Map.css
  
  Underscore
  
  AngularJS v1.5.6+
  
  Ng-map
  
  Map component 
  
  Simulator Constants
  
  markerClusterer.js
  
  wsProvider.js
  
  httpProvider.js
  
  
  
## Getting started:

  Include styles
  
   ```html
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href="//fonts.googleapis.com/css?family=Josefin+Sans|Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/map/map.css">
  ```

  Include underscore and angular JS
  
  ```html
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  Include Map modules
   
  ```html
    <script src="//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&libraries=drawing"></script>
    <script src="//rawgit.com/allenhwkim/angularjs-google-maps/master/build/scripts/ng-map.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/map/map.js"></script>
    <script src="/UIComponents/dashboard/frontend/examples/map/simulatorConstants.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/map/markerClusterer.js"></script>
    
  ```
  
  Include wsProvider for calling backend API's
  
  ```html
    <script src="/UIComponents/wsProvider.js"></script>
  ```
  
  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  
  Add "WsClient", "Map" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "Map"])
  ```
  
## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  default-center | 0 | Map default center, "lat,long" | NO
  sources-info     | null	 | Specify the icon sources for map markers | NO
  summary-icons     | null	 | Specify the info-window icons. | YES
  clustered-view     | true	 | Set to true to enable cluster view | NO
  cluster-zoom     | 3	 | The zoom of map when clusteredView is true and clustered map is rendered | NO
  cluster-styles     | [{"url":"https://googlemaps.github.io/js-marker-clusterer/images/m1.png","width":53,"height":53,"anchor":[0,0],"textColor":"#ffffff","textSize":10,"iconAnchor":[15,48]}]	 | Array of clusterers styles to config the background, position, font and text of the clusterers  | NO
  heatmap     | false	 | set True to show the Heat Map | NO
  bounce     | true	 | set True to bounce | NO
  heat-map-weight     | 40	 | heat map weight | NO
  heat-map-opacity     | 0.8	 | heat map opacity | NO
  heat-map-radius     | 40	 | heat map radius | NO
  heat-map-gradient     | ["rgba(0, 255, 255, 0)","rgba(0, 255, 255, 1)","rgba(0, 191, 255, 1)","rgba(0, 127, 255, 1)","rgba(0, 63, 255, 1)"]	 | heat map gradient | NO
  simple-sources-info     | [{"source":"simulator","label":"Carvoyant","url":"http://icons.iconarchive.com/icons/graphicloads/flat-finance/32/lock-icon.png"}]	 | simple sources array of objects, object contain the source, its label, the pin icon url | NO
  resize     | false	 | Set true to enable resize | NO
  clustered-zoom-max     | 11	 | clustered zoom max | NO
  detailed-zoom-min     | 0	 | detailed zoom min | NO
  max-asset-points     | 100	 | max asset points | NO
  marker-info-window     | true	 | set true to show the marker info window | NO
  source-info-window     | [{}]	 | array of marker specific info windows per marker source | NO
  dashboard-data-handler     | false	 | Set true to make this component as the dashboard data handler | NO
  path-stroke-opacity     | 0	 | Path Stroke Opacity | NO
  path-stroke-weight     | 5	 | Path Stroke Weight | NO
  clustered     | true	 | Set to true to enable cluster view | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO 
  
## Component usage:

scriptr-map is an element component. you will just have to add it in your html view and add its relevant options.
  
Example:

 ```html
<scriptr-map
										transport='wss'
										boxLabel='Map'
										clustered-view='true'
										cluster-zoom='8'
										heatmap='false'
										bounce='true'
										cluster-styles='[{"url":"https://googlemaps.github.io/js-marker-clusterer/images/m1.png","width":53,"height":53,"anchor":[0,0],"textColor":"#ffffff","textSize":10,"iconAnchor":[15,48]}]'
										heat-map-weight='40'
										heat-map-opacity='0.8'
										heat-map-radius='40'
										heat-map-gradient='["rgba(0, 255, 255, 0)","rgba(0, 255, 255, 1)","rgba(0, 191, 255, 1)","rgba(0, 127, 255, 1)","rgba(0, 63, 255, 1)"]'
										simple-sources-info='[{"source":"simulator","label":"Carvoyant","url":"http://icons.iconarchive.com/icons/graphicloads/flat-finance/32/lock-icon.png"}]'
										resize='false'
										data='{"253812":{"550153":[{"lat":{"value":"40.84969"},"long":{"value":"-73.94168"},"bounce":{"value":"true"},"speed":{"value":"8","description":"Maximum Speed Recorded (since the previous reading)"},"fuel":{"value":"30","description":"Percentage of Fuel Remaining"},"fuelRate":{"value":"1.3","description":"Rate of FuelConsumption"},"rpm":{"value":"2818","description":"EngineSpeed"},"coolantTemperature":{"value":"91","description":"Engine Temperature"},"voltage":{"value":"13.99","description":"Battery Voltage"},"status":{"value":"RUNNING"},"address":{},"mileage":{"value":"55101"},"make":{"value":"Toyota"},"model":{"value":"Tacoma"},"snr":{"value":"11","description":"Signal to Noise Ratio"},"rssi":{"value":"61","description":"Received Signal Strength Indicator"}},{"lat":{"value":"40.84919"},"long":{"value":"-73.93897000000001"},"speed":{"value":"5","description":"Maximum Speed Recorded (since theprevious reading)"},"fuel":{"value":"57","description":"Percentage of Fuel Remaining"},"fuelRate":{"value":"1.4","description":"Rate of Fuel Consumption"},"rpm":{"value":"2838","description":"Engine Speed"},"coolantTemperature":{"value":"94","description":"Engine Temperature"},"voltage":{"value":"13.15","description":"Battery Voltage"},"status":{"value":"RUNNING"},"address":{},"mileage":{"value":"55101"},"make":{"value":"Toyota"},"model":{"value":"Tacoma"},"snr":{"value":"9","description":"Signal to Noise Ratio"},"rssi":{"value":"48","description":"Received Signal StrengthIndicator"}},{"lat":{"value":"40.848600000000005"},"long":{"value":"-73.93648"},"speed":{"value":"9","description":"Maximum Speed Recorded (since the previous reading)"},"fuel":{"value":"76","description":"Percentage of Fuel Remaining"},"fuelRate":{"value":"1.2","description":"Rate of FuelConsumption"},"rpm":{"value":"2465","description":"EngineSpeed"},"coolantTemperature":{"value":"97","description":"Engine Temperature"},"voltage":{"value":"13.39","description":"Battery Voltage"},"status":{"value":"RUNNING"},"address":{},"mileage":{"value":"55101"},"make":{"value":"Toyota"},"model":{"value":"Tacoma"},"snr":{"value":"11","description":"Signal to Noise Ratio"},"rssi":{"value":"69","description":"Received Signal Strength Indicator"}}],"source":"simulator","order":["550153"]},"253815":{"550191":[{"lat":{"value":"40.80913"},"long":{"value":"-73.90327"},"speed":{"value":"7","description":"Maximum Speed Recorded (since theprevious reading)"},"fuel":{"value":"56","description":"Percentage of Fuel Remaining"},"fuelRate":{"value":"1.2","description":"Rate of Fuel Consumption"},"rpm":{"value":"2123","description":"Engine Speed"},"coolantTemperature":{"value":"100","description":"Engine Temperature"},"voltage":{"value":"13.45","description":"Battery Voltage"},"status":{"value":"RUNNING"},"address":{},"mileage":{"value":"55043"},"make":{"value":"Saab"},"model":{"value":"9-3"},"snr":{"value":"13","description":"Signal to Noise Ratio"},"rssi":{"value":"49","description":"Received Signal Strength Indicator"}},{"lat":{"value":"40.807500000000004"},"long":{"value":"-73.90557000000001"},"speed":{"value":"6","description":"Maximum Speed Recorded (since the previous reading)"},"fuel":{"value":"16","description":"Percentage of Fuel Remaining"},"fuelRate":{"value":"1.7","description":"Rate of FuelConsumption"},"rpm":{"value":"1946","description":"EngineSpeed"},"coolantTemperature":{"value":"95","description":"Engine Temperature"},"voltage":{"value":"12.87","description":"Battery Voltage"},"status":{"value":"RUNNING"},"address":{},"mileage":{"value":"55043"},"make":{"value":"Saab"},"model":{"value":"d9-3"},"snr":{"value":"13","description":"Signal to Noise Ratio"},"rssi":{"value":"59","description":"Received Signal Strength Indicator"}}],"source":"simulator","order":["550191"]}}'
										msg-tag='everyone-main-live'
										clustered-zoom-max='11'
										detailed-zoom-min='0'
										max-asset-points='100'
										marker-info-window='true'
										default-center='40.7053111,-74.258188'
										path-stroke-opacity='0'
										path-stroke-weight='1'
										source-info-window='[{}]'
										dashboard-data-handler='false'
										http-method='GET'
										use-window-params='false'
										isDashboard='false'
										boxHeader='true'
                                  		on-format-data='vm.mapFormatData2'
                           		>
                                
                                   
 
 
          
                    
                        		 <info-window id="infoWindowTemplate_" template="" max-width="" max-height="">
                                 </info-window>
                                </scriptr-map>
  ```
  
 ## Service API Response:
 
 The expected returned data structure from a service API is as follows:
   ```javascript
  {
   "253812" : {
      "550153" : [
            {
               "lat" : {"value": "40.84969"},
               "long" : {"value": "-73.94168"},
               "speed" : {
                  "value" : "8",
                  "description" : "Maximum Speed Recorded (since the previous reading)"
               },
               "fuel" : {
                  "value" : "30",
                  "description" : "Percentage of Fuel Remaining"
               },
               "fuelRate" : {
                  "value" : "1.3",
                  "description" : "Rate of Fuel Consumption"
               },
               "rpm" : {
                  "value" : "2818",
                  "description" : "Engine Speed"
               },
               "coolantTemperature" : {
                  "value" : "91",
                  "description" : "Engine Temperature"
               },
               "voltage" : {
                  "value" : "13.99",
                  "description" : "Battery Voltage"
               },
               "status" : {
	               "value" : "RUNNING"
               },
               "address" : {},
               "mileage" : {
	               "value" : "55101"
               },
               "make" : {
	               "value" : "Toyota"
               },
               "model" : {
	               "value" : "Tacoma"
               },
               "snr" : {
                  "value" : "11",
                  "description" : "Signal to Noise Ratio"
               },
               "rssi" : {
                  "value" : "61",
                  "description" : "Received Signal Strength Indicator"
               }
            },
            {
               "lat" : {"value": "40.84919"},
               "long" : {"value": "-73.93897000000001"},
               "speed" : {
                  "value" : "5",
                  "description" : "Maximum Speed Recorded (since the previous reading)"
               },
               "fuel" : {
                  "value" : "57",
                  "description" : "Percentage of Fuel Remaining"
               },
               "fuelRate" : {
                  "value" : "1.4",
                  "description" : "Rate of Fuel Consumption"
               },
               "rpm" : {
                  "value" : "2838",
                  "description" : "Engine Speed"
               },
               "coolantTemperature" : {
                  "value" : "94",
                  "description" : "Engine Temperature"
               },
               "voltage" : {
                  "value" : "13.15",
                  "description" : "Battery Voltage"
               },
               "status" : {
	               "value" : "RUNNING"
               },
               "address" : {},
               "mileage" : {
	               "value" : "55101"
               },
               "make" : {
	               "value" : "Toyota"
               },
               "model" : {
	               "value" : "Tacoma"
               },
               "snr" : {
                  "value" : "9",
                  "description" : "Signal to Noise Ratio"
               },
               "rssi" : {
                  "value" : "48",
                  "description" : "Received Signal Strength Indicator"
               }
            },
            {
               "lat" : {"value": "40.848600000000005"},
               "long" : {"value": "-73.93648"},
               "speed" : {
                  "value" : "9",
                  "description" : "Maximum Speed Recorded (since the previous reading)"
               },
               "fuel" : {
                  "value" : "76",
                  "description" : "Percentage of Fuel Remaining"
               },
               "fuelRate" : {
                  "value" : "1.2",
                  "description" : "Rate of Fuel Consumption"
               },
               "rpm" : {
                  "value" : "2465",
                  "description" : "Engine Speed"
               },
               "coolantTemperature" : {
                  "value" : "97",
                  "description" : "Engine Temperature"
               },
               "voltage" : {
                  "value" : "13.39",
                  "description" : "Battery Voltage"
               },
               "status" : {
	               "value" : "RUNNING"
               },
               "address" : {},
               "mileage" : {
	               "value" : "55101"
               },
               "make" : {
	               "value" : "Toyota"
               },
               "model" : {
	               "value" : "Tacoma"
               },
               "snr" : {
                  "value" : "11",
                  "description" : "Signal to Noise Ratio"
               },
               "rssi" : {
                  "value" : "69",
                  "description" : "Received Signal Strength Indicator"
               }
            } ],
      "source" : "simulator",
      "order" : [ "550153" ]
   }
 }
```


