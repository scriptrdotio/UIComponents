# Angular Imagemap 
 
  Angular component for displaying data using markers on a map.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:
  
  JQuery
  
  AngularJS v1.5.6+
  
  wsProvider.js
  
  httpProvider.js
  
  dataService.js
  
  Bootstrap JS
  
  Notifications CSS/JS
  
  leaflet.js
  
  angular-leaflet-directive.js
  
  leaflet.markercluster.js
  
  Imagemap Modules
  
## Getting started:

  Include angular JS with leaflet.js, angular-leaflet-directive.js and leaflet.markercluster.js in your application, as well as the imagemap.js directives.

  Include JQuery (ensure it is loaded before the angular.js)

  ```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```

  Include angular JS  in your application.
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  
  Include leaflet js and css in your application.
  
  ```html
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-leaflet-directive/0.10.0/angular-leaflet-directive.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/leaflet.markercluster.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.Default.css">
  ```
  
  Include Imagemap modules
   
  ```html
    <script src="/UIComponents/dashboard/frontend/components/imagemap/imagemap.js"></script>
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
  
  Add "WsClient", "HttpClient", "Imagemap" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "Imagemap"])
  ```
  
## Options 
 check the options [here](./properties.md).
 
## Component usage:

scriptr-imagemap is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
 <scriptr-imagemap 
        data='{temperature: 30, pressure: 12}'>
 </scriptr-imagemap>
 ```
 
 Example where data is called from backend
 
 ```html
     <scriptr-imagemap 
                transport='https' 
                msg-tag="imagemap" 
                api='UIComponents/dashboard/frontend/examples/imagemap/getImagemapData'
                on-format-data="vm.callback"
    </scriptr-imagemap>
  ```
  
  REST API example:
  
  ```javascript
    var value =  {
        temperature: 10,
        pressure: 35,
        co2: 60
    }; 

    var body = request.body ? request.body : ((request.rawBody) ? request.rawBody : request.parameters);
    var requestParams = typeof(body) == "string" ? JSON.parse(body) : body;

    var publishResponse = function(channel, data, request) {
       var message = {"result": data};
       if(body && body.id) {
         message["id"] = body.id;
       } else {
         //Add a default id to identify the message published over the socket
          message["id"] = "imagemap";
       }
       publish(channel, message);
    }

    publishResponse("responseChannel", value, request);

    return value;
  ```
  Each imagemap application subscribed to "responseChannel" with msg-tag = "imagemap" gets updated everytime a rest api is called. 


