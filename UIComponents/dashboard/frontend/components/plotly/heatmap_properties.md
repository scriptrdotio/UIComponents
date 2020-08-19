### dotPlots options

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
 title | "Heatmap" | Title to be shown on the plotted chart | string | NO
 showBar | true | Determines whether or not a colorbar is displayed for this trace. | string | NO
 colorScale | [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']] | Array of heat colors | array | NO
 displaylogo | false | set true to display plotly logo | boolean | NO
 showModeBar | false | Set true to show the options bar in the top of the chart | boolean | NO
 modeBarButtonsToRemove | [] | Array of options to remove from the options bar | array | NO
 hoverlabel | { bgcolor:'#C8CE1B'} | background color of the hover labels | object | NO
 hoverinfo | all | Determines what information appear on hover | string | NO 
 hoverongaps | false | Determines whether or not gaps are shown or hover | string | NO 
 color-bar-config | {"thickness":20,"ticks":"outside","tickcolor":'#C8CE1B',"title":{"text":"heatmap","side":"top"}} | Bar Configuration | NO
 color-scale | [[0,"#c64dff"],[1,"#1dbc68"]] | Array of heat colors | NO 
 layout-config | {"title":"The default of the graph","margin":{"l":140,"r":40,"b":50,"t":80},"xaxis":{"showline": false,"title":"The title of xaxis","ticks":"outside","dtick": 0,"tickcolor":'rgb(102, 102, 102)',"side":"bottom"},"yaxis":{"showline": false,"title":"The title of yaxis","ticks":"outside","dtick": 0,"tickcolor":'rgb(102, 102, 102)',"side":"left"}} | the layout configuration | object | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
