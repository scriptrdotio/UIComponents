  ## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  border-size     | 1	 | The Border width. | int | NO
  border-color     | #d7d7d7	 | The Border Color. | string | NO
  border-radius     | 0	 | The Border Color. | string | NO
  background-color     | #009ABB	 | the container background color | string | NO
  value-cell-size     | medium	 | The Value Cell Size in pixel. | string | NO
  value-font-family     | null	 | The Value Font Family. | string | NO
  value-font-size     | 42	 | The Value Font Size in pixel. | number | NO
  value-font-weight     | null	 | The Value Font weight. | string | NO
  value-text-color     | #ffffff	 | The Value Text Color. | string | NO
  value-text-alignment | center	 | One of: right, left, center | string | NO
  value-text-transform | | applies a text-transform style to value text| string | NO
  value-vertical-alignment | center	 | One of: top, bottom, center | string | NO
  value-background-color     | 	 | The Value Background Default Color. | string | NO
  color-accross-component   | false | Change the message & value background color based on ranges | string | NO
  unit | null   | sting to display next to the value. ex: % | string | NO
  disk-display-value   | false	 | show/hide the disk Label. | string | NO
  disk-font-family     | 	 | Disk Label Font Family. | string | NO
  disk-font-family     | 	 | Disk Label Font Family. | string | NO
  disk-font-size     | 18	 | Disk Label Font Size in pixel. | string | NO
  disk-font-weight     |  | Disk Label Font weight. | string | NO
  disk-text-color     | #686868	 | Disk Label Text Color. | string | NO
  disk-background-color     | 	 | Disk Label Background Default Color. | string | NO
  disk-position | right | Position of message right/left | string | NO
  disk-text-alignment     | center	 | Disk Label Alignment in the box one of: start, end, left, center, right| string | NO
  disk-text-baseline     | center	 | Disk Label Alignment in the box one of: top, bottom, middle, alphabetic, hanging | string | NO
  disk-text-transform | | applies a text-transform style to Disk text| string | NO
  outer-disk-line-width | 0  | outer disk border width | string | NO
  outer-disk-color | #bebebe  | outer disk color fill| string | NO
  inner-disk-color | #eee | inner disk color fill| string | NO
  inner-disk-range-colors     | 	 | The Inner disk Background Colors array used to define inner circle color fill  for each range of values , example value [{"value":10,"color":"#ef2929"},{"value":20,"color":"#729fcf"},{"value":30,"color":"#8ae234"}]. | string | NO
  info  | 	 | Text to display under value | string | NO     
  info-font-family     | 	 | The info Font Family. | string | NO
  info-font-size     | 18	 | The info Font Size in pixel. | string | NO
  info-font-weight     |  | The info Font weight. | string | NO
  info-text-color     | #686868	 | The info Text Color. | string | NO
  info-background-color     | 	 | The info Background Default Color. | string | NO
  info-text-transform | bottom or right | applies a text-transform style to info text| string | NO
  info-text-alignment     | center	 | The info text Alignment in the box one of: right, left, center. | string | NO
  info-margin-top     | center	 | The info margin from value in px | string | NO 
  min       | 0    | 	minimum disk radial value.		| float | NO
  max       | 100    | 	maximum disk radial value.	| float | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
  
