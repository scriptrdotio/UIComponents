## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  tree-control  | null | Initialize tree-control as an empty json object to use tree controller functions| NO
  on-select     | null	 | Function that will be called whenever a branch is selected | NO
  icon-leaf     | "icon-file  glyphicon glyphicon-file  fa fa-file" | Bootstrap class | NO
  icon-expand     | "icon-plus  glyphicon glyphicon-plus  fa fa-plus" |  Bootstrap class | NO
  icon-collapse   | "icon-minus glyphicon glyphicon-minus fa fa-minus" | Bootstrap class | NO
  expand-level    | "1" |  Tree expanded level by default. | NO
  initial-selection     | null | Selected element by default | NO
  param-name | "criteria" | Parameter name | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  api-params  | null       | 	api parameters.  					| NO
  