## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  default-center | 0 | Map default center, "lat,long" | NO
  sources-info     | null	 | Specify the icon sources for map markers | NO
  summary-icons     | null	 | Specify the info-window icons. | YES
  clustered-view     | true	 | Set to true to enable cluster view | NO
  cluster-zoom     | 3	 | The zoom of map when clusteredView is true and clustered map is rendered | NO
  cluster-styles     | [{"url":"https://googlemaps.github.io/js-marker-clusterer/images/m1.png","width":53,"height":53,"anchor":[0,0],"textColor":"#ffffff","textSize":10,"iconAnchor":[15,48]}]	 | Array of clusterers styles to config the background, position, font and text of the clusterers  | NO
  heatmap     | false	 | set True to show the Heat Map | NO
  bounce     | true	 | set True to bounce | NO
  heat-map-weight     | 40	 | heat map weight | NO
  heat-map-opacity     | 0.8	 | heat map opacity | NO
  heat-map-radius     | 40	 | heat map radius | NO
  heat-map-gradient     | ["rgba(0, 255, 255, 0)","rgba(0, 255, 255, 1)","rgba(0, 191, 255, 1)","rgba(0, 127, 255, 1)","rgba(0, 63, 255, 1)"]	 | heat map gradient | NO
  simple-sources-info     | [{"source":"simulator","label":"Carvoyant","url":"http://icons.iconarchive.com/icons/graphicloads/flat-finance/32/lock-icon.png"}]	 | simple sources array of objects, object contain the source, its label, the pin icon url | NO
  resize     | false	 | Set true to enable resize | NO
  clustered-zoom-max     | 11	 | clustered zoom max | NO
  detailed-zoom-min     | 0	 | detailed zoom min | NO
  max-asset-points     | 100	 | max asset points | NO
  marker-info-window     | true	 | set true to show the marker info window | NO
  source-info-window     | [{}]	 | array of marker specific info windows per marker source | NO
  dashboard-data-handler     | false	 | Set true to make this component as the dashboard data handler | NO
  path-stroke-opacity     | 0	 | Path Stroke Opacity | NO
  path-stroke-weight     | 5	 | Path Stroke Weight | NO
  clustered     | true	 | Set to true to enable cluster view | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO 
 