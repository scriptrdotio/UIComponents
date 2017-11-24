<script type='text/x-handlebars-template' id="barChart-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
            <scriptr-chart
               type='bar'
               stacked='true'
               xkey='y'
               ykeys='["a", "b"]'
               labels='["Serie A", "Serie B"]'   
               transport="wss"
               msg-tag="chart"
               on-format-data="vm.callback"
               data='[ { y: "2006", a: 100, b: 90 },
                     { y: "2007", a: 75,  b: 65 },
                     { y: "2008", a: 50,  b: 40 },
                     { y: "2009", a: 75,  b: 65 },
                     { y: "2010", a: 50,  b: 40 },
                     { y: "2011", a: 75,  b: 65 },
                     { y: "2012", a: 100, b: 90 }]'>
    </scriptr-chart>
    </div>           
</script>

<script type='text/x-handlebars-template' id="areaChart-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
            <scriptr-chart
               type="area"     
               ykeys='["a", "b"]'
               xkey='y'
               labels='["Serie A", "Serie B"]'    
               transport="https"
               msg-tag="chart"
               xlabel-angle="45"
               colors='["#cfc"]'
               point-size="2"   
               line-width="20"
               goals="[1.0, -1.0]"
               data='[ { y: "2006", a: 100, b: 90 },
                     { y: "2007", a: 75,  b: 65 },
                     { y: "2008", a: 50,  b: 40 },
                     { y: "2009", a: 75,  b: 65 },
                     { y: "2010", a: 50,  b: 40 },
                     { y: "2011", a: 75,  b: 65 },
                     { y: "2012", a: 100, b: 90 }]'
               hover-callback="vm.hoverCallback"
               on-format-data="vm.callback">          
    </scriptr-chart>  
    </div>
</script>

<script type='text/x-handlebars-template' id="lineChart-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
           <scriptr-chart
               type='line'
               transport="wss"
               msg-tag="chartline"
               ykeys='["a", "b"]'
               xkey='y'
               labels='["Serie A", "Serie B"]'   
               date-format="vm.dateFormat"
               line-width="20"
               on-format-data="vm.callback"
               colors='["#FCC717", "#E90088"]'
               data='[ { y: "2006", a: 100, b: 90 },
                     { y: "2007", a: 75,  b: 65 },
                     { y: "2008", a: 50,  b: 40 },
                     { y: "2009", a: 75,  b: 65 },
                     { y: "2010", a: 50,  b: 40 },
                     { y: "2011", a: 75,  b: 65 },
                     { y: "2012", a: 100, b: 90 }]'>
    </scriptr-chart>
    </div>
</script>

<script type='text/x-handlebars-template' id="donutChart-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
          <scriptr-chart
               type='donut'
               transport="wss"
               background-color="#eee"
               colors='["#cfc","#ddd", "#fcd"]'
               label-color="#abcdef"
               labels='["line A"]'
               on-format-data="vm.callback"
               data='[{label: "Cranes", value: 20 }, {label: "Drillers", value: 30}, {label: "Blasters", value: 50}]'
               msg-tag="donut">         
    </scriptr-chart>  
    </div>
</script>

<script type='text/x-handlebars-template' id="gauge-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
          <scriptr-gauge 
               transport='wss' 
               msg-tag="gauge" 
               title="Title"
               title-font-color="#aaa"
               gauge-value='50'
               title-position="above"
               hide-inner-shadow="false"
               shadow-vertical-offset="3"
               shadow-opacity="0.2"
               pointer="true"
               value-font-color="#aff542"
               hide-inner-shadow="false"
               start-animation-type="bounce"
               refresh-animation-type="bounce"
               relative-gauge-size="true"
               on-format-data="vm.callback">
    </scriptr-gauge>
    </div>
</script>

<script type='text/x-handlebars-template' id="speedometer-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
          <scriptr-speedometer
                     min-value=0
                     max-value=10000
                     gauge-radius="140"
                     tick-space-maj-val=1000
                     tick-space-min-val=100
                     gauge-units='ms'
                     on-format-data="vm.callback"
                     needle-val='1700'>
    </scriptr-speedometer>
    </div>
</script>

<script type='text/x-handlebars-template' id="thermometer-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	<scriptr-thermometer
                     value="28"  
                     sectors="[0, 25, 50, 75, 100]"       
                     max="100"    
                     unit="°F"       
                     height="500px"
                     on-format-data="vm.callback"
                     height="220"
                     >
    <scriptr-thermometer> 
    </div>
</script>

<script type='text/x-handlebars-template' id="odometer-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	<scriptr-odometer
                  transport='wss'
                  odometer-value='57800'
                  theme='car'
                  size="4"
                  msg-tag='odometer'
                  animation='count'
                  on-format-data="vm.callback"
                  duration='1000'> 
    </scriptr-odometer> 
    </div>
</script>

<script type='text/x-handlebars-template' id="progressBar-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	<scriptr-progressbar
    				 on-format-data="vm.callback"
                     class="progress-striped"                
                     stacked='[
                              {
                              value : 50,
                              type : "success",
                              title : "bar1"
                              },
                              {
                              value : 70,
                              type : "warning",
                              title : "bar2",
                              class:"progress-striped active"
                              }
                              ]'>
    </scriptr-progressbar>
    </div>
</script>

<script type='text/x-handlebars-template' id="map-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	<scriptr-map
             bounce="true"
             heatmap="true"
             default-center="33.888630,35.495480"
             sources-info="vm.sources"
             clustered-view="true"
             cluster-zoom="8"
             path-stroke-opacity="0.5"
             path-stroke-weight="10"
             summary-icons="vm.icons"
             on-format-data="vm.callback"
             api="UIComponents/dashboard/frontend/examples/map/simulatorData"
             api-params='{"timeframe" : "this_1_years", "limit" : "20"}'
             msg-tag="everyone-main-live"
             geofence-manager="false">
    <div>
        <info-window id="infoWindowTemplate_simulator" template="/UIComponents/dashboard/frontend/examples/map/info_simulator.html" max-width="600"></info-window>
        <info-window id="infoWindowTemplate_stream" template="/UIComponents/dashboard/frontend/examples/map/info_stream.html" max-width="300"></info-window>
    </div>
    </scriptr-map>
    </div>
</script>

<script type='text/x-handlebars-template' id="accelerometer-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	<scriptr-accelerometer 
    				   on-format-data="vm.callback"	
                       transport="https"
                       api="UIComponents/dashboard/frontend/examples/accelerometer/getAccelerometerData">
    </scriptr-accelerometer>
    </div>
</script>

<script type='text/x-handlebars-template' id="grid-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	 <scriptr-grid
           on-format-data="vm.callback"
           columns-definition='[{headerName: "Name", field: "name"},{headerName: "Model", field: "model"},{headerName: "Price", field: "price", type: "numeric"}]' 
           row-data = '[{name: "Toyota", model: "Celica", price: 35000},{name: "Ford", model: "Mondeo", price: 32000},{name: "Porsche", model: "Boxter", price: 72000}]'
           enable-sorting='true'    
           enable-delete-row='true'
           grid-height="500"
           row-model-type='pagination'     
           enable-add-row='true'
           cell-editable='true'
           enable-client-side-filter='false'
           enable-server-side-filter='true' 
           enable-server-side-sorting='true'
           row-model-selection='multiple'
           pagination-page-size='5'
           transport='wss'>
    </scriptr-grid>
    </div>
</script>

<script type='text/x-handlebars-template' id="toggleSwitch-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	<scriptr-toggle-switch
                       switch-status="false"
                       knob-label="TV"
                       is-disabled="false"
                       on-label="ON"
                       off-label="OFF"
                       on-format-data="vm.callback"
                       on-switch-change="vm.onChange"
                       publish-api-params="{'id':'132'}"        
                       transport="wss"
                       type="switch-danger"        
                       size="switch-large"
                       msg-tag="toggle"        
                       api="UIComponents/dashboard/frontend/examples/toggleSwitch/getToggleSwitchVal"        
                       >
    </scriptr-toggle-switch>
    </div>
</script>

<script type='text/x-handlebars-template' id="slider-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	<scriptr-slider
                min=5    
                on-format-data="vm.callback"
                floor="0"
                ceil="10" 
                show-selection-bar="false"        
                show-selection-bar-end="true"

                >
    </scriptr-slider>
    </div>
</script>

<script type='text/x-handlebars-template' id="button-html">
<div ng-app="myApp" ng-controller="testCtrl as vm" >
	 <scriptr-button
                            type="btn-danger"
                            is-disabled="false"
                            label="Click me!"
                 		    size="large"
                            api="UIComponents/dashboard/frontend/examples/demo/script"
                            >
    </scriptr-button>
    </div>
</script>

<!-- JAVASCRIPT -->

<script type='text/x-handlebars-template' id="barChart-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Chart"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="areaChart-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Chart"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="lineChart-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Chart"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="donutChart-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Chart"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="gauge-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Gauge"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="speedometer-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Speedometer"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="thermometer-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Thermometer"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.value = 30;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="odometer-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Odometer"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="accelerometer-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Accelerometer"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="progressBar-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "ProgressBar"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="map-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Map"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="grid-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Grid"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="toggleSwitch-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "ToggleSwitch"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="slider-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Slider"])

         /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="button-js">
  var myApp= angular.module("myApp", ["WsClient", "HttpClient", "Button"])

        /* Set your Scriptr configuration to call your APIs
         var wssConfig = ["wsClientProvider",function (wsClientProvider) {
          wsClientProvider.setToken("TzgzNTA4NkQxOA==");
          wsClientProvider.setPublishChannel("requestChannel");
          wsClientProvider.setSubscribeChannel("responseChannel");
        }];

        var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
          httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
          httpClientProvider.setToken("TzgzNTA4NkQxOA==");
        }]

         angular.module('myApp').config(wssConfig)
         angular.module('myApp').config(httpsConfig)
        */

        angular.module('myApp').controller('testCtrl', function($scope) {
            var vm = this;
            vm.callback = function(data){
                console.log("data formatter");
                return data;
            }
   })
</script>

<script type='text/x-handlebars-template' id="default-css">
/** CSS **/      
</script>












