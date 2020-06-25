## Options:

| Option        | Default value   | Description   | Type | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|:----------|
  markers-data  | null | array of objects with key, lat ,lng, draggable, group, icon.url and icon unit attributes. | [] of objects | NO
  min-zoom       | 0    | 	minimum zoom value.		| int | NO
  max-zoom       | 4    | 	maximum zoom value.	| int | NO
  width       | 571    | 	width of the image map.	| int | NO
  height       | 640    | 	height of the image map.	| int | NO
  image-url       | null    | 	background image for the map.	| string | YES
  api | null | Name of the API to get data | string | Required if getting data from backend 
  on-format-data | null | Callback function to be called after data is returned from backend | function | NO
  transport |  'wss'     | 	method used to call api (can take "https" or "wss").	 | string | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		     | string | NO
  api-params  | null      | 	api parameters.  					| object | NO