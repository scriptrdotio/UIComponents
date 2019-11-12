## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  value | 0 | The current value of progress bar. | NO
  type      | null | Bootstrap style type. Possible values are 'success', 'info', 'warning', and, 'danger' to use Bootstrap's pre-existing styling, or any desired custom suffix. | NO
  max     | 100	 | A number that specifies the total value of bars that is required. | NO
  animate     | true |  Whether bars use transitions to achieve the width change. | NO
  title     | true |  Title to use as label (for accessibility). | NO
  stacked     | null | Array of objects representing multiple stacked progress bars. | NO
  api       | undefined    | 	Name of the api to call backend data.		| Required if calling data from backend	 
  on-format-data | undefined | Callback function to be called after data is returned from backend | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").		 | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		| NO     
  api-params  | null       | 	api parameters.  					| NO
  