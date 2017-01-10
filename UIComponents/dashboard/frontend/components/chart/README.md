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

| Option        | Default value   | Description   | Required   | Line & Area | Bar | Donut
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
  data     | undefined	 |series data. | Required in case of static data
  type  | undefined | There are 4 types of charts (line, bar, area and donut). | YES
  xkey     | 'y'	 | The name of the data record attribute that contains x-values. | NO
  ykeys       | ["a"]    | // A list of names of data record attributes that contain y-values. | NO
  labels       | ["Series A"]   | 	// Labels for the ykeys -- will be displayed when you hover over the chart. | NO
  colors       | ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"]    | 	Specify the color of each graph Successively	| NO
  donut-label-color       | '#666'    | 	Donut label color. | NO	
  donut-background-color       | '#ffffff'    | 	Donut Label Color. | NO	
  donut-colors       | ["#38B9D6", "#1DBC68", "#CC5464", "#FCC717", "#E90088"]    | 	 Donut Colors.	| NO
  donut-formatter       | 'currency'    | 	 can either be a string for a filter name (eg. 'currency') or a reference to a scope function.	| NO
  lineWidth | undefined | Width of the series lines, in pixels. | NO
  pointSize | undefined | Diameter of the series points, in pixels. | NO
  pointFillColors | undefined | Colors for the series points. By default uses the same values as lineColors. | NO
  pointStrokeColors | undefined | Colors for the outlines of the series points. (#ffffff by default). | NO
  ymax | undefined | Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]. | NO
  ymin | undefined | Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins. | NO
  smooth | undefined | Set to false to disable line smoothing. | NO
  hideHover | undefined | Set to false to always show a hover legend. Set to true or 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend. | NO
  hoverCallback | undefined | Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return "sin(" + row.x + ") = " + row.y} | NO
  parseTime | undefined | Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series. | NO
  units | undefined | Width of the series lines, in pixels. | NO
  postUnits | undefined |Set to a string value (eg: '%') to add a label suffix all y-labels. | NO
  preUnits | undefined | Set to a string value (eg: '$') to add a label prefix all y-labels. | NO
  xlabels | undefined | Sets the x axis labelling interval. By default the interval will be automatically computed. The following are valid interval strings. "decade", "year", "month", "week", "day", "hour", "30min", "15min", "10min", "5min", "minute", "30sec", "15sec", "10sec", "5sec", "second"| NO
  xlabelAngle | undefined | The angle in degrees from horizontal to draw x-axis labels.  | NO
  xlabelFormat | undefined | A function that accepts Date objects and formats them for display as x-axis labels. Overrides the default formatter chosen by the automatic labeller or the xLabels option. function (x) { return x.toString(); } | NO
  ylabelFormat | undefined | 	A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; } | NO
  goals | undefined | A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0] | NO
  goalStrokeWidth | undefined | Width, in pixels, of the goal lines. | NO
  goalLineColors | undefined | Array of color values to use for the goal line colors. If you list fewer colors here than you have lines in goals, then the values will be cycled. | NO
  events | undefined | A list of x-values to draw as vertical 'event' lines on the chart. events: ['2012-01-01', '2012-02-01', '2012-03-01'] | NO
  eventStrokeWidth | undefined | Width, in pixels, of the event lines. | NO
  eventLineColors | undefined | Array of color values to use for the event line colors. If you list fewer colors here than you have lines in events, then the values will be cycled. | NO
  continuousLine | undefined | When set to false (the default), all null and undefined values in a data series will be ignored and lines will be drawn spanning them. When set to true, null values will break the line and undefined values will be spanned. Note that in v0.5.0, this setting will be removed and the behaviour will be to break lines at null values. | NO
  axes | undefined | Set to false to disable drawing the x and y axes. | NO
  grid | undefined | Set to false to disable drawing the horizontal grid lines. | NO
  gridTextColor | undefined | Set the color of the axis labels (default: #888). | NO
  gridTextSize | undefined | Set the point size of the axis labels (default: 12). | NO
  gridTextFamily | undefined | Set the font family of the axis labels (default: sans-serif). | NO
  gridTextWeight | undefined | Set the font weight of the axis labels (default: normal). | NO
  fillOpacity | undefined | Change the opacity of the area fill colour. Accepts values between 0.0 (for completely transparent) and 1.0 (for completely opaque). | NO
  resize | undefined | Set to true to enable automatic resizing when the containing element resizes. (default: false). This has a significant performance impact, so is disabled by default. | NO
  behaveLikeLine | undefined | Set to true to overlay the areas on top of each other instead of stacking them. | NO
  dateFormat | undefined | A function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }| NO
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



