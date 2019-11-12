### 3DSurface options

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
 title | "" | Title to be shown on the plotted chart | string | NO
 xaxis | "" | X axis label | string | NO
 yaxis | "" | Y axis label | string | NO
 zaxis | "" | Z axis label | string | NO
 barTitle |  "" | Bar Title to be shown on the right side bar | string | NO
 barThickness | 20 | Right side bar thickness | number | NO
 showBar | true | set true to show the right side bar | boolean | NO
 displaylogo | false | set true to display plotly logo | boolean | NO
 showModeBar | false | Set true to show the options bar in the top of the chart | boolean | NO
 modeBarButtonsToRemove | [] | Array of options to remove from the options bar | array | NO
 colorScale | [[0,"#c64dff"],[1,"#1dbc68"]] | Array of heat colors | array | NO
 contours | {"z":{"show":true,"usecolormap":true,"highlightcolor":"#38b9d6","project":{"z":true}},"x":{"show":false,"usecolormap":true,"highlightcolor":"#c64dff","project":{"x":false}},"y":{"show":false,"usecolormap":true,"highlightcolor":"#e90088","project":{"y":false}}} | Object to config the projection | object | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
