### Windrose options    
| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
 showLegend | "true" | Set true to show the legend | string | NO
 speedUnit | "m/h" | wind speed unit | string | NO
 fontSize | "12" | Font size | string | NO
 customRanges | [{"color": "#CC5464", "lo": 0, "hi": 2}, {"color": "#FCC717", "lo": 2, "hi": 4}, {"color": "#38B9D6", "lo": 4, "hi": 6}, {"color": "#1DBC68", "lo": 6, "hi": 8}, {"color": "#E90088", "lo": 8, "hi": 10}, {"color": "#ffac47", "lo": 10, "hi": 20}] | wind speed ranges and range's colors | array | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
    