# Angular Display Count 
 
  Angular component for displaying Value visualization.
  
  It can take static value or be synced to a Real-time Communication. 


## Requirements:
  
  AngularJS v1.5.6+
    
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
    
## Getting started:

  Include angular JS  in your application.

  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  Include Display Count modules
   
  ```html
    <script src="/UIComponents/dashboard/frontend/components/displayCount/displayCount.js"></script>
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
  
  Add "WsClient", "HttpClient", "DataService", "DisplayCount" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "DataService" "DisplayCount"])
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
  