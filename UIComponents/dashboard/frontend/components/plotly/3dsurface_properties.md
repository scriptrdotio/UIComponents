### 3DSurface options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
 traces-config |{ "showscale" : true,"contours": {"z": {"show": true,"usecolormap": true, "highlightcolor": "#38b9d6" "project": { "z": true } },"x": {"show": false,"usecolormap": true,"highlightcolor": "#c64dff","project": { "x": false }},"y": {"show": false,"usecolormap": true,"highlightcolor": "#e90088","project": { "y": false }}},"colorscale" : [[0,"#c64dff"],[1,"#1dbc68"]],"colorScaleWrapper": [{"priority":0,"color":"#c64dff"},{"priority":1,"color":"#1dbc68"}],"colorbar" :{"outlinecolor":"#E2E913","bgcolor" :"rgba(0,0,0,0)","ticks":'outside',"tickcolor":'#C8CE1B',"showticklabels" : true,"title":{"text":'',"font":{"family":'Times New Roman',"size":15,"color":'#C8CE1B'},"side":"top"},},"hoverinfo":"x+y+z","hoverongaps" : false,"hoverlabel" : {"bgcolor":'#C8CE1B'},} | Trace Configuration | object | NO
 layout-config |{"title":"The default of the graph","margin":{"l":5,"r":5,"b":5,"t":5},"autosize":false,"scene": {"xaxis": { "title": "Temperature" },"yaxis": { "title":"Humidity" },"zaxis": { "title": "Pressure" },},} |configuration of the layout | object | NO
 options | {"displayModeBar": false,"modeBarButtonsToRemove":[], "displaylogo": false,"modeBarButtonsToRemoveWrapper": {"toImage": true,"tableRotation": true,"orbitRotation": true,"resetCameraDefault3d": true,"resetCameraLastSave3d": true,"hoverClosest3d": true,"pan3d": true,"zoom3d": true},"scrollZoom":true,"staticPlot":false} | options configuration | object | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
  
For more info, visit the following links if you wish to add more attributes to the above objects :
**traces-config** : <https://plotly.com/javascript/reference/surface/>
**layout-config** : <https://plotly.com/javascript/reference/layout/>
**options** : <https://plotly.com/javascript/configuration-options/>
  
