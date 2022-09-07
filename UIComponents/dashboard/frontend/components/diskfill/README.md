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

  Include dependencies

  ```html
 <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="//use.fontawesome.com/3d61d6959e.js"></script>
    
    <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
    
        
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    
    <!-- Adding Angular -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-route.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-cookies.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-websocket/1.0.9/angular-websocket.min.js"></script>
    
    <script src="/UIComponents/wsProvider.js"></script>
    <script src="/UIComponents/httpProvider.js"></script>
	<script src="/UIComponents/dataService.js"></script>
    
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"></script>
  	
    <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/common/notifications.css">
    <script src="/UIComponents/dashboard/frontend/components/common/notifications.js"></script>
    
     <!-- i18n -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-translate/2.18.2/angular-translate.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-translate/2.18.2/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-translate-handler-log/2.18.2/angular-translate-handler-log.js"></script>
    <!-- /i18n -->
  ```
  Include Diskfill module
   
  ```html
   <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/diskfill/diskfill.css">
   <script src="/UIComponents/dashboard/frontend/components/diskfill/diskfill.js"></script>
  ```
  
  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  
  Add "WsClient", "HttpClient", "Diskfill" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "DiskFill"])
  ```
  
    ## Options 
     check the options [here](./properties.md).
 
  ## Component usage:

scriptr-diskfill is an element component. you will just have to add it in your html view and add its relevant options.

Example

```html
 <scriptr-disk-fill 
                transport='wss' 
                msg-tag="diskfill" 
                min="0"
                max="130"
                value="30"
                unit="%"
                info="humidity"
                message-position="right"
                value-cell-size="small"
                disk-font-size="18"
                disk-font-weight="bold"
                disk-font-family="verdana"
                disk-display-value="true" 
                api='UIComponents/dashboard/frontend/examples/diskfill/getDiskFillVal'
                inner-disk-range-colors= '[{"value":10,"color":"#ef2929"},{"value":20,"color":"#729fcf"},{"value":30,"color":"#8ae234"}]'
                on-format-data="vm.callback">
      </scriptr-disk-fill>
 ```
 

 REST API example:
  
  ```javascript
   	var log = require("log");
    log.setLevel("INFO");

    var value =  Math.floor((Math.random() * 100) + 1); 

    var body = request.body ? request.body : ((request.rawBody) ? request.rawBody : request.parameters);
    var requestParams = typeof(body) == "string" ? JSON.parse(body) : body;

    var publishResponse = function(channel, data, request) {
       var message = {"result": data};
       if(body && body.id) {
         message["id"] = body.id;
       } else {
         //Add a default id to identify the message published over the socket
          message["id"] = "diskfill";
       }
       publish(channel, message);
    }

    publishResponse("responseChannel", {"value": value, "info": "Humidity"}, request);

    return {"value": value, "info": "Humidity"};
  ``` 
  