## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  custom-sectors  | [{color : "#00FF00", lo : 0, hi : 25}, { color : "#FFFF00", lo : 25, hi : 50 }, { color : "#FFA000", lo : 50, hi : 75 }, { color : "#FF0000", lo : 27, hi : 100 }] | array of objects with color, hi, lo attributes. | [] of objects | NO
  min-temperature       | 0    | 	minimum temperature value.		| float | NO
  max-temperature       | 100    | 	maximum temperature value.	| float | NO
  grid-x-count       | 8    | 	number of grid columns.	| int | NO
  grid-y-count       | 8    | 	number of grid rows.	| int | NO
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO