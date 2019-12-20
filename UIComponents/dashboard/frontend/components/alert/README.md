# Angular Alert 
 
  Angular component for displaying Alert Msg.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap
  
  Underscore JS
  
  JQuery
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  Bootstrap JS
  
  Notifications CSS/JS
  
## Getting started:

  Include bootstrap
   
  ```html
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="//use.fontawesome.com/3d61d6959e.js"></script>
  ```

  Include JQuery (ensure it is loaded before the angular.js)
  
  ```html
   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```

  Include underscore JS
  
  ```html
   <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  ```

  Include angular JS
  
  ```html
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular-mocks.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
      <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```

  Include alert modules
   
  ```html
	<script src="/UIComponents/dashboard/frontend/components/alert/ngScriptrAlert.js"></script>
    <script src="/UIComponents/dashboard/frontend/components/alert/alert.js"></script>
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
  
  Add "WsClient", "HttpClient", "Alert" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "Alert"])
  ```
  
## Options 
 check the options [here](./properties.md).


  
## Component usage:

scriptr-alert is an element component. you will just have to add it in your html view and add its relevant options.

Example

 ```html
    <scriptr-alert
        transport='wss'
        boxLabel='Alert'
        api="UIComponents/dashboard/frontend/examples/alert/getAlerts"
        msg-tag='alert'
        boxHeader='false'
        data='{"data":"Contextual Message.", "type": "INFO"}'
        showHeader='false'
        type='info'
        on-format-data='vm.alertFormatData1'
        >
    </scriptr-alert>
  ```


