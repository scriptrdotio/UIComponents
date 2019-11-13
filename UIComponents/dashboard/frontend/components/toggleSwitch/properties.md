## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  switch-status  | false       | 	switch status.  					| NO
  knob-label  | ""       | 	Knob label.  					| NO
  on-label  | ""       | 	On label.  					| NO
  off-label  | ""       | 	Off label.  					| NO
  on-switch-change | undefined | Callback function to be called after switch status changed | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO 
 