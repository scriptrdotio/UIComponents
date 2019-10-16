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
  
  ## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  message     | Items	 | The Value Label. | string | NO
  widget-layout     | horizontal	 | Layout is horizontal or vertical. | string | NO
  border-size     | 1	 | The Border width. | int | NO
  border-color     | #d7d7d7	 | The Border Color. | string | NO
  number-font-family     | Arial	 | The Value Font Family. | string | NO
  number-font-size     | 42	 | The Value Font Size in pixel. | string | NO
  number-cell-size     | null	 | The Value Cell Size in pixel. | string | NO
  number-font-weight     | 600	 | The Value Font weight. | string | NO
  number-text-color     | #ffffff	 | The Value Text Color. | string | NO
  number-background-color     | #ff8c00	 | The Value Background Default Color. | string | NO
  number-background-colors     | null	 | The Value Background Colors array used to define a background for each range of values , example value [{"value":10,"color":"#ef2929"},{"value":20,"color":"#729fcf"},{"value":30,"color":"#8ae234"}]. | string | NO
  number-text-alignment     | center	 | The Value Alignment in the box. | string | NO
  message-font-family     | Arial	 | The Label Font Family. | string | NO
  message-font-size     | 18	 | The Label Font Size in pixel. | string | NO
  message-cell-size     | null	 | The Label Cell Size in pixel. | string | NO
  message-font-weight     | 600	 | The Label Font weight. | string | NO
  message-text-color     | #686868	 | The Label Text Color. | string | NO
  message-background-color     | white	 | The Label Background Default Color. | string | NO
  message-text-alignment     | center	 | The Label Alignment in the box. | string | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
  
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
  