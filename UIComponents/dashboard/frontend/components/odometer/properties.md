## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  odometer-value | 0 | Set a static value for Odometer | NO
  theme     | 'car'	 |Specify the theme (if you have more than one theme css file on the page). | NO
  duration     | 3000	 |Change how long the javascript expects the CSS animation to take. | NO
  animation     | 'count'	 | Count is a simpler animation method which just increments the value,use it when you're looking for something more subtle. | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  