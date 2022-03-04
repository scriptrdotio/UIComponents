## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  draw-x1-axis     | true	 | Show the X1 Axis. | boolean | NO
  draw-y-axis     | true	 | Show the Y Axis. | boolean | NO
  draw-y2-axis     | true	 | Show the Y2 Axis. | boolean | NO
  colors     | ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"]	 | Data Sets Colors. | array | NO
  x1-axis-label-font-size     | 14	 | X1 label font size in px | int | NO
  y-axis-label-font-size     | 14	 | Y label font size in px | int | NO
  y2-axis-label-font-size     | 14	 | Y2 label font size in px | int | NO
  y-axis-labels-kmb     | false	 | Y labels Kmb | boolean | NO
  y2-axis-labels-kmb     | false	 | Y2 labels Kmb | boolean | NO
  x1-axis-label-width     | 60	 | X1 label width in px | int | NO
  y-axis-label-width     | 250	 | Y label width in px | int | NO
  y2-axis-label-width     | 50	 | Y2 label width in px | int | NO
  x1-axis-line-color     | #000000	 | X1 Axis line color | string | NO
  y-axis-line-color     | #000000	 | Y Axis line color | string | NO
  y2-axis-line-color     | #000000	 | Y2 Axis line color | string | NO
  x1-axis-line-width     |  0.3	 | X1 line width in px | float | NO
  y-axis-line-width     |  0.3	 | Y line width in px | float | NO
  y2-axis-line-width     |  0.3	 | Y2 line width in px | float | NO
  x1-axis-tick-size     |  3	 | X1 tick size in px | float | NO
  y-axis-tick-size     |  3	 | Y tick size in px | float | NO
  y2-axis-tick-size     |  3  | Y2 tick size in px | float | NO
  x1-axis-label     | ""	 | X1 Axis label | string | NO
  y-axis-label     | "	 | Y Axis label | string | NO
  y2-axis-label     | "	 | Y2 Axis label | string | NO
  y-axis-inclde-zero     | false	 | Y Axis include zero | boolean | NO
  y2-axis-inclde-zero     | false	 | Y2 Axis include zero | boolean | NO
  show-range-selector     | false	 | Show Range Selector | boolean | NO
  range-selector-alpha     | 0.6	 | Range Selector Alpha. | float | NO
  range-selector-background-line-width     | 1	 | width in px. | float | NO
  range-selector-background-stroke-color     | #808080	 | color value. | string | NO
  range-selector-foreground-line-width     | 1	 | width in px. | float | NO
  range-selector-foreground-stroke-color     | #000000	 | color value. | string | NO
  range-selector-height     | 40	 | Height in px. | float | NO
  range-selector-plot-fill-color     | #A7B1C4	 | color value. | string | NO
  range-selector-plot-fill-gradient-color     | #ffffff	 | color value. | string | NO
  range-selector-plot-line-width     | 1.5	 | width in px. | float | NO
  range-selector-plot-stroke-color     | #808FAB	 | color value. | string | NO
  show-legend     | false	 | show chart legend. | boolean | NO
  legend-position     | top	 | The legend position (top,bottom,left,right). | string | NO
  x1-draw-grid     | true	 | draw grid on the X1 Axis | boolean | NO
  y-draw-grid     | true	 | draw grid on the Y Axis | boolean | NO
  y2-draw-grid     | false	 | draw grid on the Y2 Axis | boolean | NO
  x1-grid-line-color     | #000000	 | grid on the X1 Axis line color | string | NO
  y-grid-line-color     | #000000	 | grid on the Y Axis line color | string | NO
  y2-grid-line-color     | #000000	 | grid on the Y2 Axis line color | string | NO
  x1-grid-line-width     | 0.3	 | grid on the X1 Axis line width in px | float | NO
  y-grid-line-width     | 0.3	 | grid on the Y Axis line width in px | float | NO
  y2-grid-line-width     | 0.3	 | grid on the Y2 Axis line width in px | float | NO
  legend-labels     | ["x"]	 | The Legend Labels to show. | array | NO
  independent-ticks     | y-primary	 | independent ticks . | string | NO
  legend-mapping     | ["X"]	 | The Legend Labels mappings. | array | NO
  custom-goals     | null	 | Array of goals and goal line color, size, label ex: [{"goal-line-colors":"#f0f0f0","goals":1, "label":"test", size: "1"}]. | array | NO
  custom-events     | null	 |  Array of events and event line color ex: [{"event-line-colors":"#cccccc","events":"20-03-2008"}]. | array | NO
  colors-mapping     | null	 | Map colors values to colors option. Contains the info each series available in the graph data. labels, colors, axisSelection (y1 or y2) , unit, annotations (default annotations configuration of the annotations to be shown on this series: (name, cssClass, width, height, tickHeight, tickWidth, tickColor, shortText or icon, attachAtBottom. For more info Check Annotations property reference in https://dygraphs.com/annotations.html). ex: [{"labels":"Temperature", "colors":"#ad7fa8", "axisSelection":"y2", "annotations":{"name": "temperature", "cssClass": "annotationsClass", "width": "32", "height": "32" ,"tickHeight":"10", "tickWidth":"2", "icon": "http://s3.amazonaws.com/scriptr-cdn/common/images/marker-container.png"}},{"labels":"Humidity","colors":"#FCC717","axisSelection":"y","unit":"X","annotations":{"name": "humidity", "cssClass": "annotationsClass", "width": "32", "height": "32", "attachAtBottom": "true"}},{"labels":"Pressure","colors":"#38B9D6","axisSelection":"y"},{"labels":"Battery","colors":"#1DBC68","axisSelection":"y","unit":"%"}]. Note: In scriptr, Annotations are stored by name instead of series. The serie is defined by the labels value, and from the annotations config the fetched annotation series will be retrieved. | array | NO
  connect-separated-points     | true	 | Connect the points if there is gaps ,gaps comes from null Y values. | boolean | NO
  draw-points     | true	 | Drow the points over the chart line. | boolean | NO
  point-size     | 3	 | The point size in px. | float | NO
  stroke-width     | 1	 | The stroke line width in px, set to 0 if you want to draw scattered points on the chart | float | NO 
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
  fill-graph | false | Should the area underneath the graph be filled? This may be set on a per-series basis. | boolean | NO
  stacked-graph | false | If set, stack series on top of one another rather than drawing them independently. The first series specified in the input data will wind up on top of the chart and the last will be on bottom. NaN values are drawn as white areas without a line on top, see stackedGraphNaNFill for details. | boolean | NO
  stacked-graph-naN-fill | all | Controls handling of NaN values inside a stacked graph. NaN values are interpolated/extended for stacking purposes, but the actual point value remains NaN in the legend display. Valid option values are "all" (interpolate internally, repeat leftmost and rightmost value as needed), "inside" (interpolate internally only, use zero outside leftmost and rightmost value), and "none" (treat NaN as zero everywhere). | string | NO
 digits-after-decimal| 4 | format the y values on axis and in legend to have a fixed decimal point (by Default 4) | Integer | NO
 x1-legend-label |  | When set display a label before the x series value in legend | String | NO
 toggle-series-visibility | false | When set to true a checkbox bar with series shows on top of graph to toggle each serie visibility on chart | Boolean | NO
 toggleSeriesVisibility | false | if true the widget show a bar at the top to toggle the visibility of available series (labels from custom-goals is displayed in the bar) | boolean | NO 
on-point-click | null | Callback function when a series point is clicked. function(e, point, $uibModal, $element) e: the event object for the click point: the point that was clicked, & the uibModal service, and the dygraphs component html element | function | NO
legend-formatter | null | Set this to supply a custom formatter for the legend. Type: function(data): string. If not supplied a default legend formatter is available which will concat the label and the unit if any from the colors-mapping entries to build the legends of the series| function | NO
annotations | null | An array of objects defining the annotations to add to the graph. Check Annotations property reference https://dygraphs.com/annotations.html to see all the supported properties. 1 extra property is "name", which contains the stored column name or sensor to which belong the annotation. ex: [{name: "temperature", x: 1643924696056, shortText: "L", text: "annotation coldest"},{name: "humidity", x: 1643924702056, shortText: "L", text: "annotation coldest"}] | array | NO
annotation-service-tag | null | Used with the event update-annotations-data to set/update the annotations to display, if not available we fallback to serivceTag, if not there all the data passed to event will be considered the annotations to set on graph | String | NO
on-annotation-click | null | Function to be called on annotation click with arguments annotation, point, dygraph, event, self, $uibModal, $element | function | NO
on-annotation-dbl-click |  null | Function to be called on annotation double click with arguments annotation, point, dygraph, event, self, $uibModal, $element | function | NO
on-annotation-mouse-over |  null | Function to be called on annotation mouseover with arguments annotation, point, dygraph, event, self, $uibModal, $element | function | NO
on-annotation-mouse-out |  null | Function to be called on annotation mouseout with arguments annotation, point, dygraph, event, self, $uibModal, $element | function | NO
annotation-tooltip-formatter |  null | Function allows to set the properties of the annotation tooltip to display. arguments: annotation Object, & $element which is the scriptr dygraphs object element. It should return an object ex: return {"content": Handlebars.compile("<article><p class='noteText'>{{text}}</p><p class='noteOwner'>By: {{lastModifiedBy}}</p><article>")(annotation), "placement": "auto bottom", "trigger": "click", "container": $element.parent().parent() | function | NO
y-axis-value-range |  null | Explicitly set the vertical range of the graph to [low, high]. This may be set on a per-axis basis to define each y-axis separately. If either limit is unspecified, it will be calculated automatically (e.g. [null, 30] to automatically calculate just the lower bound)
Type: Array of two numbers
Default: Full range of the input is shown | array | NO
y2-axis-value-range |  null | Explicitly set the vertical range of the graph to [low, high]. This may be set on a per-axis basis to define each y-axis separately. If either limit is unspecified, it will be calculated automatically (e.g. [null, 30] to automatically calculate just the lower bound)
Type: Array of two numbers
Default: Full range of the input is shown | array | NO


  
  
