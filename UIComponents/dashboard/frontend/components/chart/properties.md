
## Options:

| Option        | Default value   | Description   | Required   | Line & Area | Bar | Donut
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
  data     | undefined	 |series data. | Required in case of static data | *  |  * | *
  type  | undefined | There are 4 types of charts (line, bar, area and donut). | YES | *  |  * | *
  xkey     | 'y'	 | The name of the data record attribute that contains x-values. | Line, Area & Bar | *  |  * | 
  ykeys       | ["a"]    | // A list of names of data record attributes that contain y-values. | Line, Area & Bar | *  |  * | 
  labels       | ["Series A"]   | 	// Labels for the ykeys -- will be displayed when you hover over the chart. |  Line & Bar | *  |  * | 
  colors       | ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"]    | 	Specify the color of each graph Successively	| NO | *  |  * | *
  donut-label-color       | '#666'    | 	Donut label color. | NO	|   |   | *
  donut-background-color       | '#ffffff'    | 	Donut Label Color. | NO	|   |   | *
  donut-colors       | ["#38B9D6", "#1DBC68", "#CC5464", "#FCC717", "#E90088"]    | 	 Donut Colors.	| NO |   |  | *
  donut-formatter       | 'currency'    | 	 can either be a string for a filter name (eg. 'currency') or a reference to a scope function.	| NO |   |   | *
  line-width | undefined | Width of the series lines, in pixels. | NO | *  |  | 
  point-size | undefined | Diameter of the series points, in pixels. | NO | *  |  | 
  point-fill-colors | undefined | Colors for the series points. By default uses the same values as lineColors. | NO | *  |  | 
  point-stroke-colors | undefined | Colors for the outlines of the series points. (#ffffff by default). | NO | *  |  | 
  ymax | undefined | Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]. | NO | *  |  * | 
  ymin | undefined | Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins. | NO | *  |  * | 
  smooth | undefined | Set to false to disable line smoothing. | NO | *  |  | 
  units | undefined | Width of the series lines, in pixels. | NO | *  |  * | 
  post-units | undefined |Set to a string value (eg: '%') to add a label suffix all y-labels. | NO | *  |  * | 
  pre-units | undefined | Set to a string value (eg: '$') to add a label prefix all y-labels. | NO | *  |  * | 
  xlabels | undefined | Sets the x axis labelling interval. By default the interval will be automatically computed. The following are valid interval strings. "decade", "year", "month", "week", "day", "hour", "30min", "15min", "10min", "5min", "minute", "30sec", "15sec", "10sec", "5sec", "second"| NO | *  |  | 
  xlabel-angle | undefined | The angle in degrees from horizontal to draw x-axis labels.  | NO | *  |  * | 
  goals | undefined | A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0] | NO | *  |  * | 
  goal-stroke-width | undefined | Width, in pixels, of the goal lines. | NO | *  |  * | 
  goal-line-colors | undefined | Array of color values to use for the goal line colors. If you list fewer colors here than you have lines in goals, then the values will be cycled. | NO | *  |  * | 
  events | undefined | A list of x-values to draw as vertical 'event' lines on the chart. events: ['2012-01-01', '2012-02-01', '2012-03-01'] | NO | *  |  * | 
  event-stroke-width | undefined | Width, in pixels, of the event lines. | NO | *  |  * | 
  event-line-colors | undefined | Array of color values to use for the event line colors. If you list fewer colors here than you have lines in events, then the values will be cycled. | NO | *  |  * | 
  continuous-line | undefined | When set to false (the default), all null and undefined values in a data series will be ignored and lines will be drawn spanning them. When set to true, null values will break the line and undefined values will be spanned. Note that in v0.5.0, this setting will be removed and the behaviour will be to break lines at null values. | NO | *  |  | 
  axes | undefined | Set to false to disable drawing the x and y axes. | NO | *  |  * | 
  grid | undefined | Set to false to disable drawing the horizontal grid lines. | NO | *  |  * | 
  grid-stroke-width | undefined | Set the stoke width of the grid line.If not set, default: 0.5 | NO | *  |  * | 
  grid-line-color |undefined | Set the color of the grid line.  If not set, default: #aaa| NO | *  |  * | 
  grid-text-color | undefined | Set the color of the axis labels (default: #888). | NO | *  |  * | 
  grid-text-size | undefined | Set the point size of the axis labels (default: 12). | NO | *  |  * | 
  grid-text-family | undefined | Set the font family of the axis labels (default: sans-serif). | NO | *  |  * | 
  grid-text-weight | undefined | Set the font weight of the axis labels (default: normal). | NO | *  |  * | 
  fill-opacity | undefined | Change the opacity of the area fill colour. Accepts values between 0.0 (for completely transparent) and 1.0 (for completely opaque). | NO | *  |  | 
  resize | true | Set to true to enable automatic resizing when the containing element resizes. (default: false). This has a significant performance impact, so is disabled by default. | NO | *  |  * | *
  behave-like-line | undefined | Set to true to overlay the areas on top of each other instead of stacking them. | NO | *  |  | 
  stacked | undefined | Set to true to draw bars stacked vertically | NO |   |  * | 
  horizontal | false | set to true to draw bars horizontally | NO |  | * | |
  show-legend | true | set to false if you want to hide legend | NO | * | * | *|
  legend-type | hover | set to right if you want to display legend to the right | NO | * | * | * |
  hide-hover | always | When show-legend is true and legend-type is not "right" Set to false to always show a hover legend. Set to true or 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend. | NO | *  |  * | 
  hover-callback | undefined | Provide a function on this option to generate custom hover legends when parseTime is false. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return "sin(" + row.x + ") = " + row.y} | NO | *  |  * | 
  parse-time | undefined | Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series. | NO | *  |  * | 
  xlabel-format | undefined | A function that accepts Date objects and formats them for display as x-axis labels. Overrides the default formatter chosen by the automatic labeller or the xLabels option. function (x) { return x.toString(); } | NO | *  |  | 
  ylabel-format | undefined | 	A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; } | NO | *  |  * | 
  date-format | undefined | If parse-time is not true, you can pass a function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }| NO | *  | * |
  xdate-moment-format | "DD-MM-YYYY HH:mm:ss" | If parse-time is true, and no xlabel-formart or date-format was passed. We use the xdate-moment-format to parse the date using the moment library | NO | * |* | |
  api | undefined | Name of the api to get data | Required if getting data from backend | *  |  * | *
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO | * | * | *
  transport |  'wss'     | 	Method used to call api (can take "https" or "wss").	 | NO | *  |  * | *
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		 | NO     | *  |  * | *
  api-params  | null      | 	Api parameters.  	| NO		 | *  |  * | *