## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  gauge-value     | 75	 | Sets the value of the gauge. | int | NO
  custom-sectors  | [{color : "#A3CD3B", lo : 0, hi : 25}, { color : "#FF4A43", lo : 25, hi : 100 }] | array of objects with color, hi, lo attributes. | [] of objects | NO
  value-font-color     | '#999'	 | color of the value text. | string | NO
  min       | 0    | 	minimum value.		| float | NO
  max       | 100    | 	maximum value.	| float | NO
  title-font-color       | #aaa    | 	color of the title text.	| string | NO
  title-font-family       | null    | 	font-family of the title text.	| string | NO
  title-position       | 'above'    | 	"above" or "below" the gauge.	| string | NO
  value-font-family       | null    | 	font-family of the value text.	| string | NO
  relative-gauge-size       | null    | 	true if the gauge has to grow with the container.	| bool | NO
  value-min-font-size       | null    | 	absolute minimum font size for the value.	| int | NO
  title-min-font-size       | null    | 	absolute minimum font size for the title.	| int | NO
  label-min-font-size       | null    | 	absolute minimum font size for the label.	| int | NO
  min-label-min-font-size       | null    | 	absolute minimum font size for the minimum label.	| int | NO
  max-label-min-font-size       | null    | 	absolute minimum font size for the maximum label.	| int | NO
  gauge-width-scale       | null    | 	width of the gauge element.	| float | NO
  shadow-vertical-offset       | null    | 	how much is shadow offset from top.	| int | NO
  level-colors       | null    | 	array of strings, colors of indicator, from lower to upper, in hex format.	| [] of objects | NO
  no-gradient       | null    | 	true to use sector-based color change, false to use gradual color change.	| bool | NO
  start-animation-time       | null    | 	length of initial load animation.	| string | NO
  refresh-animation-time       | null    | 	length of refresh animation.	| string | NO
  donut       | null    | 	turn the gauge into a full circle donut.	| bool | NO
  donut-start-angle       | null    | 	angle to start from when in donut mode.	| int | NO
  reverse       | null    | 	if true, max and min are swapped (with max appearing on the left, min on the right).	| bool | NO
  decimals       | null    | 	quantity of decimal numbers to show.	| int | NO
  symbol       | null    | 	unit of measure that will be appended to value.	| string | NO
  format-number       | null    | 	whether to format numbers.	| bool | NO
  human-friendly       | null    | 	true to show shorthand big numbers (300K instead of 300XXX).	| bool | NO
  human-friendly-decimal       | null    | 	number of decimal places for our human friendly number to contain.	| int | NO
  on-animation-end       | null    | 	function applied after animation is done.	| function | NO
  pointer       | null    | show value pointer.	| bool | NO
  hide-min-max       | false    | 	hide min and max values.	| bool | NO
  hide-value       | false    | 	hide value text.	| bool | NO
  show-inner-shadow       | true    | 	show/hide inner shadow.	| bool | NO
  gauge-color       | '#e9e9e9'    | 	background color of gauge element.	| string | NO
  shadow-size       | 0    | 	 inner shadow size.	| int | NO
  shadow-opacity       | 0    | 	shadow opacity, values 0 ~ 1.	| float | NO
  label       | '% full'    | 	 text to show below value.	| string | NO
  label-font-color       | '#666'    | 	 color of label under the value.	| string | NO
  start-animation-type       | 'linear'    | 	 type of initial animation (linear, >, <, <>, bounce).	| string | NO
  refresh-animation-type      | 'linear'    | 	 type of refresh animation (linear, >, <, <>, bounce).	| string | NO
  counter      | true    | 	 increase numbers one by one. | bool | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  
  