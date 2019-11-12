  ## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  message     | Items	 | The Value Label. | string | NO
  widget-layout     | horizontal	 | Layout is horizontal or vertical. | string | NO
  border-size     | 1	 | The Border width. | int | NO
  border-color     | #d7d7d7	 | The Border Color. | string | NO
  number-font-family     | Arial	 | The Value Font Family. | string | NO
  number-font-size     | 42	 | The Value Font Size in pixel. | string | NO
  number-cell-size     | null	 | The Value Cell Size in pixel. | string | NO
  number-font-weight     | 600	 | The Value Font weight. | string | NO
  number-text-color     | #ffffff	 | The Value Text Color. | string | NO
  number-background-color     | #ff8c00	 | The Value Background Default Color. | string | NO
  number-background-colors     | null	 | The Value Background Colors array used to define a background for each range of values , example value [{"value":10,"color":"#ef2929"},{"value":20,"color":"#729fcf"},{"value":30,"color":"#8ae234"}]. | string | NO
  number-text-alignment     | center	 | The Value Alignment in the box. | string | NO
  message-font-family     | Arial	 | The Label Font Family. | string | NO
  message-font-size     | 18	 | The Label Font Size in pixel. | string | NO
  message-cell-size     | null	 | The Label Cell Size in pixel. | string | NO
  message-font-weight     | 600	 | The Label Font weight. | string | NO
  message-text-color     | #686868	 | The Label Text Color. | string | NO
  message-background-color     | white	 | The Label Background Default Color. | string | NO
  message-text-alignment     | center	 | The Label Alignment in the box. | string | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
  