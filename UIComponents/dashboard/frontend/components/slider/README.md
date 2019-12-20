# Angular Slider 
 
  Angular component for displaying Slider visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  Underscore

  JQuery

  AngularJS v1.5.6+
  
  Slider Components
  
  Bootstrap JS
  
  Notifications
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
## Getting started:

  Include Underscore
  
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  ```

  Include JQuery
  
  ```html
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```

  Include angular JS
  
  ```html
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
    <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```

  Include Slider Component
   
  ```html
    <link href="//cdnjs.cloudflare.com/ajax/libs/angularjs-slider/6.2.2/rzslider.css" media="all" rel="stylesheet" type="text/css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/angularjs-slider/6.2.2/rzslider.min.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/slider/slider.js"></script>
  ```

  Include Bootstrap JS
  
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"></script>
  ```
    
  Include Notifications
  
  ```html
    <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/common/notifications.css">
    <script src="/UIComponents/dashboard/frontend/components/common/notifications.js"></script>
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
  
  Add "WsClient", "HttpClient", "Chart" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "Slider"])
  ```
  
## Options 
 check the options [here](./properties.md).


  
## Component usage:

scriptr-slider is an element component. you will just have to add it in your html view and add its relevant options.

Example

 ```html
  <scriptr-slider
	transport='wss'
	api='UIComponents/dashboard/frontend/examples/slider/getSliderVal'
	publish-api='UIComponents/dashboard/frontend/examples/slider/publishSliderVal'
	boxLabel='Slider'
	min='2'
	enable-resize='true'
	floor='0'
	min-limit='1'
	max-limit='9'
	ceil='10'
	step='1'
	vertical='false'
	show-ticks='true'
	theme='scriptr-slider'
        on-format-data='vm.sliderFormatData4'
  >                  
  </scriptr-slider>
  ```


