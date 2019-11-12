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
    <script src="/UIComponents/dashboard/frontend/components/chart/chart.js"></script>
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
  
## Options 
 check the options [here](./properties.md).


  
## Component usage:

scriptr-chart is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

 ```html
   <scriptr-chart
          type='line'
          transport="wss"
          msg-tag="chartline"
          ykeys='["a", "b"]'
          xkey='y'
          labels='["Serie A", "Serie B"]'   
          date-format="vm.dateFormat"
          line-width="20"
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
          labels='["Serie A", "Serie B"]'   
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
	    { y: "2008", a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: "2009", a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: "2010", a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: "2011", a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: "2012", a: Math.floor((Math.random() * 100) + 1), b: Math.floor((Math.random() * 100) + 1) }];


	// data for line, bar, and area charts
	var dataline = [{ y: (new Date().getTime()), a: Math.floor((Math.random() * 100) + 1), b: Math.floor((Math.random() * 100) + 1) },
	    { y: (new Date().getTime()), a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: (new Date().getTime()), a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: (new Date().getTime()), a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: (new Date().getTime()), a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: (new Date().getTime()), a: Math.floor((Math.random() * 100) + 1),  b: Math.floor((Math.random() * 100) + 1) },
	    { y: (new Date().getTime()), a: Math.floor((Math.random() * 100) + 1), b: Math.floor((Math.random() * 100) + 1) }];

	// data for donut chart
	var donutdata = [{label: "Download Sales", value: Math.floor((Math.random() * 100) + 1) }, {label: "In-Store Sales",value: 	        Math.floor((Math.random() * 100) + 1) }, {label: "Mail-Order Sales", value: Math.floor((Math.random() * 100) + 1) }];

	publishResponse("responseChannel", data, request, "chart");

	publishResponse("responseChannel", dataline, request, "chartline");
	publishResponse("responseChannel", donutdata, request, "donut");

	return data;

```
  Each chart application subscribed to "responseChannel" with msg-tag "chart" or "chartline" or "donut" gets updated everytime a rest api is called. 

please refer to https://angular-morris.io/ for more info

