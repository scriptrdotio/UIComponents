# Angular Chart 
 
  Angular component for displaying meter chart visualization.
  
  It can take static value or be synced to a Real-time Communication. 

## Requirements:
  
  AngularJS v1.5.6+
  
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

  Include Chart modules
   
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael-min.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
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
  angular.module("myApp", ["WsClient", "HttpClient", "Chart"])
  ```
  
## Options:

| Option        | Default value   | Description   |
| ------------- |:-------------:|:-------------:|
  data     | undefined	 |series data.
  type  | line | There are 4 types of charts (line, bar, area and donut).
  xkey     | 'y'	 | The name of the data record attribute that contains x-values.
  ykeys       | ["a"]    | // A list of names of data record attributes that contain y-values.
  labels       | ["Series A"]   | 	// Labels for the ykeys -- will be displayed when you hover over the chart.
  colors       | ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"]    | 	Specify the color of each graph Successively	
  donut-label-color       | '#666'    | 	Donut label color.	
  donut-background-color       | '#ffffff'    | 	Donut Label Color.	
  donut-colors       | ["#38B9D6", "#1DBC68", "#CC5464", "#FCC717", "#E90088"]    | 	 Donut Colors.	
  donut-formatter       | 'currency'    | 	 can either be a string for a filter name (eg. 'currency') or a reference to a scope function.	
  transport |  'wss'     | 	Method used to call api (can take "http" or "wss").	 
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     
  api-params  | null      | 	Api parameters.  					
  
  
## Componenet usage:

scriptr-chart is an element component. you will just have to add it in your html view and add its relevant options.

 ```html
    <scriptr-chart
        type='line'
        transport="wss"
        msg-tag="chart"
        xkey='y'
		ykeys='["a", "b"]'
		labels='["Serie A", "Serie B"]'
		colors='["#FCC717", "#E90088"]'
        data='[ { y: "2006", a: 100, b: 90 },
                { y: "2007", a: 75,  b: 65 },
                { y: "2008", a: 50,  b: 40 },
                { y: "2009", a: 75,  b: 65 },
                { y: "2010", a: 50,  b: 40 },
                { y: "2011", a: 75,  b: 65 },
                { y: "2012", a: 100, b: 90 }]'>
    </scriptr-chart>
  ```
