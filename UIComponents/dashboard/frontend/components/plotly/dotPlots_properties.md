### dotPlots options

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
 plot_bgcolor | 'rgb(254, 247, 234)' | Plot's background color | string | NO
 paper_bgcolor | 'rgb(254, 247, 234)' | Paper's background color | string | NO
 showgrid | false | Set true to show a grid chart | boolean | NO
 displaylogo | false | set true to display plotly logo | boolean | NO
 showModeBar | false | Set true to show the options bar in the top of the chart | boolean | NO
 modeBarButtonsToRemove | [] | Array of options to remove from the options bar | array | NO
 marker | {"name":"trace1","color": "rgba(156, 165, 196, 0.95)","line": {"color": "rgba(156, 165, 196, 1.0)","width": "1"},"symbol": "circle","size": "16"} | The configuration of the traces | object | NO
 layout-config |{"title":"The default of the graph","margin":{"l":140,"r":40,"b":50,"t":80},"xaxis":{"showline": true,"showgrid":false,"title":"The title of xaxis","linecolor":"rgb(204, 204, 204)","ticks":"outside","autotick": false,"dtick": 10,"tickcolor":'rgb(102, 102, 102)'},"yaxis":{"showline": true,"showgrid":false,"title":"The title of yaxis","linecolor":"rgb(204, 204, 204)","ticks":"outside","autotick": false,"dtick": 0,tickcolor":'rgb(102, 102, 102)'},"hovermode": 'closest',"legend":{"font":{"size":10},yanchor":"top","y":0.99,"xanchor":"left","x":0.01,"orientation":"v"}}| configuration object of the layout | object | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO
  fetch-data-interval |  null     | 	the refresh interval in case of https transport.	 | int | NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO
