## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  percent | 0 | The current value of thermometer (0 to 100). | NO
  size      | null | Set the size (small or big). | NO
  height     | 220	 | Set the height. | NO
  sectors | [0, 25, 50, 75, 100] | Array of integer values | NO
  colors | ["#2196F3", "#8BC34A", "#F44336"]  | sector-based color change
  max | 100 | Set maximum value | No
  unit | °C | Set unit | No
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  apply-conversion  | false       | 	in case available the conversion function supplied in conversion will be applied to sectors, ticks & steps etc and the displayed value| NO
  conversion | null | a function which will be used to convert sectors lo & hi, steps, ticks calc, values when apply-conversion is true | NO
  conversion-unit | null | the unit to display next to the value and ticks when apply-conversion is true | NO
  decimals | 2 | how many decimals to display on value and ticks | NO
 