# Angular List 
 
  Angular component for displaying list visualization.
  
  It can take static values or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap
  
  AngularJS v1.5.6+
  
  Angular List Modules
  
  wsProvider.js
  
  httpProvider.js
  
## Getting started:

  Include bootstrap
   
  ```html
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  ```

  Include angular JS
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```

  Include List module
   
  ```html
     <script src="/UIComponents/dashboard/frontend/components/list/angucomplete.alt.js"></script>
     <script src="/UIComponents/dashboard/frontend/components/list/autocomplete.js"></script>
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
  
  Add "WsClient", "HttpClient", "List" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "HttpClient", "List"])
  ```
  
 ## Options 
 check the options [here](./properties.md).
 
## Component usage:

scriptr-autocomplete is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
 <scriptr-autocomplete
          placeholder="Search countries"
          pause="400"
          search-fields="name"
          title-field="name"
          minlength="0"
          text-searching="Searching..."
          transport="https"
          on-format-data="vm.callback"
          local-data='
                  [{"name": "Afghanistan", "code": "AF"},
    			  {"name": "Aland Islands", "code": "AX"},
    			  {"name": "Albania", "code": "AL"},
                  {"name": "Lebanon", "code": "LB"}
                 ]'                
          input-class="form-control form-control-small">
    </scriptr-autocomplete>
  ```
  
  Example where data is called from backend
  
  ```html
   <scriptr-autocomplete
          placeholder="Search countries"
          pause="400"
          search-fields="name"
          title-field="name"
          minlength="0"
          text-searching="Searching..."
          transport="https"
          on-format-data="vm.callback"
          api="UIComponents/dashboard/frontend/examples/list/getCountries"
          input-class="form-control form-control-small">
    </scriptr-autocomplete>
  ```
