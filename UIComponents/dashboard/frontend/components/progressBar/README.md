# Angular ProgressBar 
 
  Angular component for displaying progress bar visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap
  
  AngularJS v1.5.6+
  
  Angular Animate 
  
  Angular Sanitize
  
  wsProvider.js
  
  httpProvider.js
  
  ProgressBar.js
  
## Getting started:

  Include bootstrap
  
  ```html
  <link href="//netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  ```
  
  Include angular JS with Angular Cookies in your application, as well as the Angular Websocket.
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
   
  Include  Angular UI Bootstrap
   
  ```html
  <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-2.5.0.js"></script>
  ```
     
  Include Angular Animate, Angular Sanitize and ProgressBar.js component
  
  ```html
   <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-animate.js"></script>
   <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-sanitize.js"></script>
   <script src="/UIComponents/dashboard/frontend/components/progressBar/progressBar.js"></script>
   ```
  
  Include wsProvider and httpProvider for calling backend API's
  
  ```html
    <script src="/UIComponents/wsProvider.js"></script>
    <script src="/UIComponents/httpProvider.js"></script>
  ```
  
  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  
  Add "WsClient", "HttpClient", "ProgressBar" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "HttpClient", "ProgressBar"])
  ```
  
 ## Options 
 check the options [here](./properties.md).
  
## Component usage:

scriptr-progressbar is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

 ```html
     <scriptr-progressbar
                 type="danger"
                 max="100"
                 animate="true"
                 title="bar 90"
                 value="90"
                 class="progress-striped active">
      </scriptr-progressbar>
  ```
  
Example where data is called from backend

 ```html
     <scriptr-progressbar
                 type="danger"
                 max="100"
                 animate="true"
                 title="bar 90"
                 api="UIComponents/dashboard/frontend/examples/progressBar/getProgressBarVal"
                 class="progress-striped active">
     </scriptr-progressbar>
  ```
  
  REST API example:
  
  ```javascript
   var value =  Math.floor((Math.random() * 100) + 10); 

   var publishResponse = function(channel, data, request) {
      var message = {"result": data};

      //Add a default id to identify the message published over the socket
      message["id"] = "progressbar";
      publish(channel, message);
   }

   publishResponse("responseChannel", value, request);

   //Return data when someone calls api over websocket or http
   return value;
  ```
  Each ProgressBar application subscribed to "responseChannel" with msg-tag = "progressbar" gets updated everytime a rest api is called. 

