# Angular Display Count 
 
  Angular component for displaying Value visualization.
  
  It can take static value or be synced to a Real-time Communication. 


## Requirements:
  
  Bootstrap CSS
  
  Underscore JS
  
  JQuery
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  Bootstrap JS
  
  Notifications CSS/JS
  
    
## Getting started:

  Include JQuery (ensure it is loaded before the angular.js)

  ```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```

  Include underscore JS

  ```html
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  ```

  Include angular JS  in your application.
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  Include Display Count modules
   
  ```html
    <script src="/UIComponents/dashboard/frontend/components/displayCount/displayCount.js"></script>
    <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/displayCount/count.css">
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
  
  Add "WsClient", "HttpClient", "DisplayCount" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "DisplayCount"])
  ```
  
    ## Options 
     check the options [here](./properties.md).
 
  ## Component usage:

scriptr-displaycount is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
 <scriptr-displaycount 
              data="11" 
              message="Cars"  
              widget-layout="vertical">
        </scriptr-displaycount>
 ```
 
 Example where data is called from backend
 
 ```html
     <scriptr-displaycount 
     		  message="Cars"
              transport="wss"        
              widget-layout="vertical"
              api="UIComponents/dashboard/frontend/examples/displayCount/getCount">
        </scriptr-displaycount>
  ```
 REST API example:
  
  ```javascript
   var value =  Math.floor((Math.random() * 100) + 10); 
   return value;
  ``` 
  