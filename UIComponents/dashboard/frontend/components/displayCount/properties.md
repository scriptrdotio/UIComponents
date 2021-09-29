  ## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  message     | Items	 | The Value Label. | string | NO
  widget-layout     | horizontal	 | Layout is horizontal or vertical. | string | NO
  border-size     | 1	 | The Border width. | int | NO
  border-color     | #d7d7d7	 | The Border Color. | string | NO
  border-radius     | 0	 | The Border Color. | string | NO
  background-color     | #009ABB	 | the container background color | string | NO
  background-image |null | the container background image | string | NO
  background-position |right bottom | the container background position | string | NO
  background-size |auto | the container background size | string | NO
  background-repeat |no-repeat | the container background image repeat | string | NO
  value-cell-size     | null	 | The Value Cell Size in pixel. | string | NO
  value-font-family     | null	 | The Value Font Family. | string | NO
  value-font-size     | 42	 | The Value Font Size in pixel. | number | NO
  value-font-weight     | null	 | The Value Font weight. | string | NO
  value-text-color     | #ffffff	 | The Value Text Color. | string | NO
  value-text-alignment | center	 | One of: right, left, center | string | NO
  value-vertical-alignment | center	 | One of: top, bottom, center | string | NO
  value-background-color     | #ff8c00	 | The Value Background Default Color. | string | NO
  value-background-colors     | null	 | The Value Background Colors array used to define a background for each range of values , example value [{"value":10,"color":"#ef2929"},{"value":20,"color":"#729fcf"},{"value":30,"color":"#8ae234"}]. | string | NO
  unit | null   | sting to display next to the value. ex: % | string | NO
  message-font-family     | 	 | The Label Font Family. | string | NO
  message-font-size     | 18	 | The Label Font Size in pixel. | string | NO
  message-font-weight     |  | The Label Font weight. | string | NO
  message-text-color     | #686868	 | The Label Text Color. | string | NO
  message-background-color     | white	 | The Label Background Default Color. | string | NO
  message-position | bottom or right | Position of message top/bottom in widget-layout vertical, right/left in widget-layout horizontal | string | NO
  message-text-alignment     | center	 | The Label Alignment in the box one of: right, left, center. | string | NO
  message-vertical-alignment     | center	 | The Label Alignment in the box one of: top, bottom, center. | string | NO

  info  | 	 | Text to display under value | string | NO     
  info-font-family     | 	 | The info Font Family. | string | NO
  info-font-size     | 18	 | The info Font Size in pixel. | string | NO
  info-font-weight     |  | The info Font weight. | string | NO
  info-text-color     | #686868	 | The info Text Color. | string | NO
  info-background-color     | 	 | The info Background Default Color. | string | NO
  info-text-transform | bottom or right | applies a text-transform style to info text| string | NO
  info-text-alignment     | center	 | The info text Alignment in the box one of: right, left, center. | string | NO
  info-margin-top     | center	 | The info margin from value in px | string | NO           
  
  
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
  