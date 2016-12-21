# Angular Chart 
 
  Angular component for displaying meter chart visualization.
  
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

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  data     | undefined	 |series data. | Required in case of static data
  type  | line | There are 4 types of charts (line, bar, area and donut). | NO
  xkey     | 'y'	 | The name of the data record attribute that contains x-values. | NO
  ykeys       | ["a"]    | // A list of names of data record attributes that contain y-values. | NO
  labels       | ["Series A"]   | 	// Labels for the ykeys -- will be displayed when you hover over the chart. | NO
  colors       | ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"]    | 	Specify the color of each graph Successively	| NO
  donut-label-color       | '#666'    | 	Donut label color. | NO	
  donut-background-color       | '#ffffff'    | 	Donut Label Color. | NO	
  donut-colors       | ["#38B9D6", "#1DBC68", "#CC5464", "#FCC717", "#E90088"]    | 	 Donut Colors.	| NO
  donut-formatter       | 'currency'    | 	 can either be a string for a filter name (eg. 'currency') or a reference to a scope function.	| NO
  api | undefined | Name of the api to get data | Required if getting data from backend
  transport |  'wss'     | 	Method used to call api (can take "http" or "wss").	 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		 | NO    
  api-params  | null      | 	Api parameters.  	| NO				
  
  
## Component usage:

scriptr-chart is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

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
 Example where data is called from backend
 
 ```html
    <scriptr-chart
        type='bar'
        stacked='true'
        xkey='y'
	ykeys='["a", "b"]'
        transport="wss"
        msg-tag="chart"
        api='UIComponents/dashboard/frontend/examples/chart/getChartData'>
    </scriptr-chart>
    ```
    
    REST API example:
  
  ```javascript
   	var requestParams = request.body;

	var publishResponse = function(channel, data, request, id) {
	   var message = {"result": data};
	   if(request.body && request.body.id) {
	     message["id"] = request.body.id;
	   } else {
	     if(!id) {
		id = "gauge"
	     }
	     //Add a default id to identify the message published over the socket
	      message["id"] = id;
	   }
	   publish(channel, message);
	}

	// data for line, bar, and area charts
	var data = [{ y: "2006", a: Math.floor((Math.random() * 100) + 1), b: Math.floor((Math.random() * 100) + 1) },
	    { y: "2007", a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: "2008", a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) }];

	// data for donut chart
	var donutdata = [{label: "Download Sales", value: Math.floor((Math.random() * 100) + 1) }, {label: "In-Store Sales",value: 		Math.floor((Math.random() * 100) + 1) }, {label: "Mail-Order Sales", value: Math.floor((Math.random() * 100) + 1) }];

	publishResponse("responseChannel", data, request, "chart");

	publishResponse("responseChannel", donutdata, request, "donut");

	return data;

  ```
  Each chart application subscribed to "responseChannel" with msg-tag "chart" or "donut" or "gauge" gets updated everytime a rest api is called. 



