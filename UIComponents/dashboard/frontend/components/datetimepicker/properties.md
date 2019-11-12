## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  type | null | Choose between 'inline', 'dropDownInput' and 'range'.  | YES
  date-helper       | null    | 	Initialize tree-control as an empty json object to use tree controller functions.		| NO 
  config       | null    | 	 Configure the view of the calender. Valid views are 'year', 'month', 'day', 'hour', 'minute'.		| NO 
  on-set-time       | null    | 	Callback function to be called after setting a date.		| NO 
  start-date-config      | { startView:'day', minView:'day' } | Configure the view of the calender. Valid views are 'year', 'month', 'day', 'hour', 'minute'. (use this property when type is 'range')| NO
  end-date-config     | { startView:'day', minView:'day' }	 | Configure the view of the calender. Valid views are 'year', 'month', 'day', 'hour', 'minute'. (use this property when type is 'range') | NO
  start-date-label       | null    | 	Start Date Label.(use this property when type is 'range')		| NO 
  end-date-label       | null    | 	End Date Label. (use this property when type is 'range')		| NO 
  start-date-on-set-time       | null    | 	Callback function to be called after setting a date.(use this property when type is 'range')		| NO 
  end-date-on-set-time       | null    | 	Callback function to be called after setting a date. (use this property when type is 'range')		| NO 
  