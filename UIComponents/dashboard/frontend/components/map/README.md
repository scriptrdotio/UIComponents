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
  path-stroke-opacity     | 0	 | Path Stroke Opacity | NO
  path-stroke-weight     | 5	 | Path Stroke Weight | NO
  clustered     | true	 | Set to true to enable cluster view | NO
  clustered     | true	 | Set to true to enable cluster view | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  
  
## Component usage:

scriptr-map is an element component. you will just have to add it in your html view and add its relevant options.
  
Example:

 ```html
 <scriptr-map
   default-center="33.888630,35.495480"
   sources-info="vm.sources"
   clustered-view="true"
   cluster-zoom="8"
   path-stroke-opacity="0.5"
   path-stroke-weight="10"
   summary-icons="vm.icons"
   api="UIComponents/dashboard/frontend/examples/map/simulatorData"
   api-params='{"timeframe" : "this_1_years", "limit" : "20"}'
   msg-tag="everyone-main-live"
   geofence-manager="false">
 <div>
 <info-window id="infoWindowTemplate_simulator" template="/UIComponents/dashboard/frontend/examples/map/info_simulator.html" max-width="600">
 </info-window>
 <info-window id="infoWindowTemplate_stream" template="/UIComponents/dashboard/frontend/examples/map/info_stream.html" max-width="300">
 </info-window>
 </div>
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


