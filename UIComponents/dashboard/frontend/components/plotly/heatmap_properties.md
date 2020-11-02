### Heatmap options

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
 trace-config | { "showscale" : true,"colorscale" : [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']],"colorScaleWrapper": [{"priority":0,"color":"#c64dff"},{"priority":1,"color":"#1dbc68"}],"colorbar" :  {"outlinecolor":"#E2E913","bgcolor" :"rgba(0,0,0,0)","ticks":'outside',"tickcolor":'#C8CE1B',"showticklabels" : true,"title":{"text":'',"font":{"family":'Times New Roman',"size":15,"color":'#C8CE1B'},"side":"top"},},"hoverinfo":"x+y+z","hoverongaps" : false,"hoverlabel" : {"bgcolor":'#C8CE1B'},} |configuration object of the traces | object | NO
 options | {"displayModeBar": false,"modeBarButtonsToRemove":[], "displaylogo": false,"modeBarButtonsToRemoveWrapper":{"toImage": true,"hoverClosestCartesian": true,"toggleSpikelines": true,"pan2d": true,"zoom2d": true,"resetScale2d":true,"select2d":true,"lasso2d":true,            "hoverCompareCartesian":true,"autoScale2d":true,"zoomOut2d":true,"zoomIn2d":true},"scrollZoom":false,"editable":false,"staticPlot":false},| options configuration | object | NO
 layout-config |{"title":"The default of the graph","margin":{"l":140,"r":40,"b":50,"t":80 },"xaxis":{"showline": false,"title":"The title of xaxis","ticks":"outside","dtick": 0,"tickcolor":'rgb(102, 102, 102)',"side":"bottom" },"yaxis":{"showline": false,"title":"The title of yaxis","ticks":"outside","dtick": 0,"tickcolor":'rgb(102, 102, 102)',"side":"left"}} | configuration of the layout | object | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
  
  For more info, visit the following links if you wish to add more attributes to the above objects :
**traces-config** : <https://plotly.com/javascript/reference/heatmap/>
**layout-config** : <https://plotly.com/javascript/reference/layout/>
**options** : <https://plotly.com/javascript/configuration-options/>

