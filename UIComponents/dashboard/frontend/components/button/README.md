# Angular Button 
 
  Angular component for displaying Button visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap
  
  AngularJS v1.5.6+
  
  JQuery
  
  chart Modules
  
  wsProvider.js
  
  httpProvider.js
  
## Getting started:

  Include bootstrap
   
  ```html
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="//use.fontawesome.com/3d61d6959e.js"></script>
  ```

  Include angular JS
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```

  Include JQuery
  
  ```html
   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  ```

  Include accelerometer modules
   
  ```html

    <script src="/UIComponents/dashboard/frontend/components/button/button.js"></script>
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
  
  Add "WsClient", "HttpClient", "Chart" to your app module's dependency
  
  ```
  angular.module("myApp", ["WsClient", "HttpClient", "Button"])
  ```
  
## Options 
 check the options [here](./properties.md).


  
## Component usage:

scriptr-chart is an element component. you will just have to add it in your html view and add its relevant options.

Example

 ```html
   <scriptr-button
										transport='https'
										boxLabel='Button'
										type='btn-success'
										enable-resize='true'
										label='Click'
										data='Click'
										boxHeader='false'
                           		>
                                
                                
                                   
 
 
          
                    
                                </scriptr-button>


