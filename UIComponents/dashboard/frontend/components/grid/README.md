# Angular Grid 
 
  Angular component for displaying grid visualization.
  
  It can take static values or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap
  
  AngularJS v1.5.6+
  
  Grid Modules
  
  wsProvider.js
  
  httpProvider.js
  
## Getting started:

  Include bootstrap
   
  ```html
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script src="https://use.fontawesome.com/3d61d6959e.js"></script>
    <link href="//fonts.googleapis.com/css?family=Josefin+Sans|Montserrat" rel="stylesheet">
  ```

  Include angular JS
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```
  
  Include wsProvider and httpProvider for calling backend API's
  
  ```html
    <script src="/UIComponents/wsProvider.js"></script>
    <script src="/UIComponents/httpProvider.js"></script>
  ```

  Include Grid module + Component
   
  ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/ag-grid/6.4.2/ag-grid.js?ignore=notused36"></script>
    <script src="/UIComponents/dashboard/frontend/components/grid/grid.js"></script>
  ```

  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  
  Add "WsClient", "HttpClient", "Grid" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "HttpClient", "Grid"])
  ```
  
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
  
  
## Service API Behaviour:

The expected params sent from the grid are:

 *  @param filterColumnName (name, model, price)
 *  @param resultsPerPage (50)
 *  @param pageNumber (2)
 *  @param sort (asc, desc)
 *  @param sortType (numeric)
 *  @param queryFilter (criteria)
 *  @param queryType (startsWith, endsWith, contains, equals, notEquals)
 *  @param sortingColumnName (name, model, price)
 *  @param filterColumnName (name, model, price)
 *  @param action (add, edit, delete)
 
If action param is sent, the api should first check the action type (add, edit, delete) and serve the request.
In case action param is not sent the api should return the expected data to the grid.

Example:
 ```javascript
  if(action){
     if(action == "add"){
       // TODO    
     }else if(action == "edit"){
       // TODO 
     }else if(action == "delete){
       // TODO
     }
  }else{
   return  {
		"count": "500",
		"documents": [
			{
				"key": "C91918B97B1EAA7A97D8435611452666",
				"name": "Toyota",
				"model": "Celica",
				"price": "35000"
			},
			{
				"key": "DC2BEB691E480C22886AEC708D5A19A5",
				"name": "Ford",
				"model": "Mondeo",
				"price": "32000"
			}
			]
     }
  }
 
 
```


## Publishing data:

If a msg-tag is passed, the grid will subscribe to a channel filtered with this message tag.
Hence the api is able to publish data whenever an action is sent.

example:
 ```javascript
  if(action){
     if(action == "add"){
       // TODO
      var message = {"result": {result : [{
				"key": "C91918B97B1EAA7A97D8435611452666",
				"name": "Ford",
				"model": "Mondeo",
				"price": "32000"
			}], action: "add"}, "id" : "grid"};
      publish("responseChannel", message);
     }else if(action == "edit"){
       // TODO
      var message = {"result": {result : [{
				"key": "C91918B97B1EAA7A97D8435611452666",
				"name": "Toyota",
				"model": "Celica",
				"price": "35000"
			}], action: "edit"}, "id" : "grid"};
      publish("responseChannel", message);
     }else if(action == "delete){
       // TODO
      var message = {"result": {result : ["485C005C470AE61EAFC93438F45A3AC6","956BF85C765057E98C56C3A87926CD35"], action: "delete"}, "id" : "grid"};
      publish("responseChannel", message);
     }
  }
 
 
```
  
  
## Service API Response:
 
 The expected returned data structure from a service API is as follows:
   ```javascript
  {
		"count": "500",
		"documents": [
			{
				"key": "C91918B97B1EAA7A97D8435611452666",
				"name": "Toyota",
				"model": "Celica",
				"price": "35000"
			},
			{
				"key": "DC2BEB691E480C22886AEC708D5A19A5",
				"name": "Ford",
				"model": "Mondeo",
				"price": "32000"
			}
			]
}
```
## Component usage:

scriptr-grid is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
   <scriptr-grid columns-definition='[
          {headerName: "Make", field: "name"},
          {headerName: "Model", field: "model"},
          {headerName: "Price", field: "price", type: "numeric"}]' 
           enable-sorting='true'
           cell-editable='true'
           
           enable-client-side-filter='true'
           enable-server-side-filter='true' 
           enable-server-side-sorting='true'
           row-model-selection='single'
           pagination-page-size='50'
           transport='http' 
           api='UIComponents/dashboard/frontend/examples/grid/getCarsInfo'>
  </scriptr-grid>
  ```
  
  Example where data is called from backend
  
  ```html
  <scriptr-grid
           columns-definition= "vm.colDef" 
           row-model-type='pagination'
           enable-sorting='true'
           cell-editable='true'
           enable-client-filter='true'
           enable-server-side-filter='false' 
           enable-server-side-sorting='false'
           row-model-selection='multiple'
           pagination-page-size='50'
           transport='http' 
           service-api='telematics/zohoTicketing/api/listDeviceTickets'
           api-params='{"id" : "253831"}'
           on-cell-value-changed-script='telematics/zohoTicketing/api/updateTicketStatus'
           on-format-data="vm.callback">
  </scriptr-grid>
  ```
