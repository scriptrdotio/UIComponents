# Angular SearchBox 
 
  Angular component for displaying search box bar visualization.
  
## Requirements:

  Bootstrap
  
  AngularJS v1.5.6+
  
  abn_tree.css
  
  abn_tree_directive.js
  
  wsProvider.js
  
  httpProvider.js
  
  SearchBox.js
  
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
     
  Include abn_tree_directive.js and abn_tree.css
  
  ```html
   <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/searchBox/abn_tree.css">
    <script src="/UIComponents/dashboard/frontend/components/searchBox/abn_tree_directive.js"></script>
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
  
  Include searchBox.js as a component
  
  ```html
    <script src="/UIComponents/dashboard/frontend/components/searchBox/searchBox.js"></script>
  ```
  
  Add "WsClient", "HttpClient", "SearchBox" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "HttpClient", "SearchBox"])
  ```
  
## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  tree-control  | null | Initialize tree-control as an empty json object to use tree controller functions| NO
  on-select     | null	 | Function that will be called whenever a branch is selected | NO
  icon-leaf     | "icon-file  glyphicon glyphicon-file  fa fa-file" | Bootstrap class | NO
  icon-expand     | "icon-plus  glyphicon glyphicon-plus  fa fa-plus" |  Bootstrap class | NO
  icon-collapse   | "icon-minus glyphicon glyphicon-minus fa fa-minus" | Bootstrap class | NO
  expand-level    | "1" |  Tree expanded level by default. | NO
  initial-selection     | null | Selected element by default | NO
  param-name | "criteria" | Parameter name | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  api-params  | null       | 	api parameters.  					| NO
  
  
## Component usage:

scriptr-searchbox is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static
  
Example:

 ```html
    <scriptr-searchbox
                     api='UIComponents/dashboard/frontend/examples/searchBox/getFile'
                     tree-control="vm.my_tree"  
                     api-params='{"id" : "45645612"}'  
                     on-select="vm.onSelect"
    </scriptr-searchbox>
  ```


