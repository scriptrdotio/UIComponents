## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
min-limit       | 1    | 	Minimum sliding limit.		| NO 
max-limit       | 9    | 	Maximum sliding limit .		| NO 
floor       | 0    | 	Minimum displayed limit .		| NO 
ceil       | 10    | 	Maximum displayed limit .		| NO 
step       | 1    | 	Sliding Step .		| NO 
vertical       | false    | 	Set true to show vertical slider.		| NO 
theme       | undefined    | 	Css styling class .		| NO 
show-ticks       | false    |  Set true to show ticks .		| NO 
api       | undefined    | 	Name .		| NO 
 api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  use-window-params |  null     | 	If true the widget will merge the defined api-params with the params passed in the URL query params	 | boolean | NO 
