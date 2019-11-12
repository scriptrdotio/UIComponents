## Options:

| Option        | Default value   | Description   | Example  |  Required
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|
  columns-definition       | undefined  | 	Series of data (Each column in the grid is defined using a column definition). | [{headerName: "Make", field: "name"},{headerName: "Model", field: "model"},{headerName: "Price", field: "price", type: "numeric"}] | YES
  row-data         | undefined     | You pass row data to the grid. | [{name: "Toyota", model: "Celica", price: 35000},{name: "Ford", model: "Mondeo", price: 32000},{name: "Porsche", model: "Boxter", price: 72000}]  | Required if service-api is undefined
  enable-client-side-Sorting     | true	 |Turn sorting on for the grid. | true  | NO
  enable-server-side-sorting  | true | Turn on server side filter. | true  | NO
  enable-client-side-filter     | true	 | turn on client side filter. | true  | NO
  enable-server-side-filter     | true	 | turn on client side filter. | true  | NO
  enable-add-row    | true	 | turn on add row. | true  | NO
  enable-delete-row | true	 | turn on delete row. | false  | NO
  supress-filter | true	 | turn off column plugged in filter. | false  | NO
  cell-editable | true | Turn on cell editing | true  | NO
  grid-height | 500 | Set grid height |  400 | NO
  enable-col-resize       | false    | Enable column resize. |  true | NO
  row-model-type       | "virtual"   | 	The supported ways are "virtual" and "pagination" for only non-static data	| pagination  | NO
  row-model-selection       | "multiple"    | Set to either 'single' or 'multiple' in case of backend data. 	|  signle | NO
  pagination-page-size       | 50    | 	Number of rows per page.	| 10  | NO
  api       | undefined | Name of the api to call backend data |  UIComponents/dashboard/frontend/examples/grid/getCarsInfo | NO
  on-format-data | undefined | Callback function to be called after data is returned from backend |   | NO
  on-cell-value-changed | null | function to be called on cell editing |   | NO
  on-selection-changed | null | function to be called on cell selection |   | NO
  transport |  'wss'     | 	Method used to call api (can take "https" or "wss").	 |   | NO
  msg-tag   | null      | 	Subscribe to socket messages with tag name.		 | grid-live  | NO    
  api-params  | null      | 	Api parameters.  					|   | NO
  