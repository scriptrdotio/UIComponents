# Angular List 
 
  Angular component for displaying list visualization.
  
  It can take static values or be synced to a Real-time Communication. 

## Requirements:

  Bootstrap
  
  AngularJS v1.5.6+
  
  Angular List Modules
  
  wsProvider.js
  
  httpProvider.js
  
## Getting started:

  Include bootstrap
   
  ```html
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  ```

  Include angular JS
  
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js"></script>
  <script src="//cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
  ```

  Include List module
   
  ```html
     <script src="/UIComponents/dashboard/frontend/components/list/angucomplete.alt.js"></script>
     <script src="/UIComponents/dashboard/frontend/components/list/autocomplete.js"></script>
  ```

  Include wsProvider and httpProvider for calling backend API's
  
  ```html
    <script src="/UIComponents/wsProvider.js"></script>
    <script src="/UIComponents/httpProvider.js"></script>
  ```
  
  Include scriptrTransport for configuration
  
  ```html
    <script src="/UIComponents/config/scriptrTransport.js"></script>
  ```
  
  Add "WsClient", "HttpClient", "List" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["WsClient", "HttpClient", "List"])
  ```
  
### Description of attributes
| Attribute | Description | Required | Example  |
| :------------- |:-------------| :-----:| :-----|
| placeholder | Placeholder text for the search field. [example](https://ghiden.github.io/angucomplete-alt/#example1) | No | Search members |
| maxlength | Maxlength attribute for the search field. [example](https://ghiden.github.io/angucomplete-alt/#example1) | No | 25 |
| pause | The time to wait (in milliseconds) before searching when the user enters new characters. [example](https://ghiden.github.io/angucomplete-alt/#example1) | No | 400 |
| selected-object | Either an object in your scope or callback function. If you set an object, it will be passed to the directive with '=' sign but it is actually one-way-bound data. So, setting it from your scope has no effect on input string. If you set a callback, it gets called when selection is made. To get attributes of the input from which the assignment was made, use this.$parent.$index within your function. [example](https://ghiden.github.io/angucomplete-alt/#example1) | Yes | selectedObject or objectSelectedCallback |
| selected-object-data | A second parameter which will be passed to selected-object.  Only works when using selected-object. | No | row |
| remote-url | The remote URL to hit to query for results in JSON. angucomplete will automatically append the search string on the end of this, so it must be a GET request. [example](https://ghiden.github.io/angucomplete-alt/#example5) | No | http://myserver.com/api/users/find?searchstr= |
| remote-url-data-field | The name of the field in the JSON object returned back that holds the Array of objects to be used for the autocomplete list. [example](https://ghiden.github.io/angucomplete-alt/#example5) | No | results |
| title-field | The name of the field in the JSON objects returned back that should be used for displaying the title in the autocomplete list. Note, if you want to combine fields together, you can comma separate them here (e.g. for a first and last name combined). If you want to access nested field, use dot to connect attributes (e.g. name.first). [example](https://ghiden.github.io/angucomplete-alt/#example1) | Yes | firstName,lastName |
| description-field | The name of the field in the JSON objects returned back that should be used for displaying the description in the autocomplete list. [example](https://ghiden.github.io/angucomplete-alt/#example6) | No | twitterUsername |
| image-field | The name of the field in the JSON objects returned back that should be used for displaying an image in the autocomplete list. [example](https://ghiden.github.io/angucomplete-alt/#example2) | No | pic |
| minlength | The minimum length of string required before searching. [example](https://ghiden.github.io/angucomplete-alt/#example1). If set to 0, it shows all items. It works both local and remote but is intended to use with local data. If used with remote API, it needs to return all items when query parameter is empty string. | No | 3 |
| input-name | Name for input field. This is required when you use field-required. | No |  |
| input-class | The classes to use for styling the input box. [example](https://ghiden.github.io/angucomplete-alt/#example1) | No | form-control |
| match-class | If it is assigned, matching part of title is highlighted with given class style. [example](https://ghiden.github.io/angucomplete-alt/#example6) | No |  highlight |
| local-data | The local data variable to use from your controller. Should be an array of objects. [example](https://ghiden.github.io/angucomplete-alt/#example1) | No | countriesList |
| local-search | A function that search local data. It should take a input string and an array of items as arguments and returns an array of matched items. [example](https://ghiden.github.io/angucomplete-alt/#example2) | No |  localSearch |
| search-fields | The fields from your local data to search on (comma separate them). Each field can contain dots for accessing nested attribute. [example](https://ghiden.github.io/angucomplete-alt/#example1) | No |  title,description |
| remote-url-request-formatter | A function that takes a query string and returns parameter(s) for GET. It should take the query string as argument and returns a key-value object. [example](https://ghiden.github.io/angucomplete-alt/#example5) | No | Suppose if you need to send a query keyword and a timestamp to search API, you can write a function like this in the parent scope. $scope.dataFormatFn = function(str) { return {q: str, timestamp: +new Date()}; } |
| remote-url-request-with-credentials | A boolean that accepts parameters with credentials. | No | true or false |
| remote-url-response-formatter | A function on the scope that will modify raw response from remote API before it is rendered in the drop-down.  Useful for adding data that may not be available from the API.  The specified function must return the object in the format that angucomplete understands. | No | addImageUrlToObject |
| remote-url-error-callback | A callback funciton to handle error response from $http.get | No | httpErrorCallbackFn |
| remote-api-handler | This gives a way to fully delegate handling of remote search API. This function takes user input string and timeout promise, and it needs to return a promise. For example, if your search API is based on POST, you can use this function to create your own http handler. See example below | No | |
| clear-selected | To clear out input field upon selecting an item, set this attribute to true. [example](https://ghiden.github.io/angucomplete-alt/#example3) | No | true |
| override-suggestions | To override suggestions and set the value in input field to selectedObject. [example](https://ghiden.github.io/angucomplete-alt/#example4) | No | true |
| field-required | Set field to be required. Requirement for this to work is that this directive needs to be in a form and you need to provide input-name. Default class name is "autocomplete-required". [example](https://ghiden.github.io/angucomplete-alt/#example8). | No | a variable holding true/false |
| field-required-class | Set custom class name for required. | No | "match" |
| text-searching | Custom string to show when search is in progress. Set this to 'false' prevents text to show up. | No | "Searching for items..." |
| text-no-results | Custom string to show when there is no match. Set this to 'false' prevents text to show up. | No | "Not found" |
| initial-value | Initial value for component. If string, the internal model is set to the string value, if an object, the title-field attribute is used to parse the correct title for the view, and the internal model is set to the object. [example](https://ghiden.github.io/angucomplete-alt/#example9) | No | myInitialValue (object/string) |
| input-changed | A callback function that is called when input field is changed. To get attributes of the input from which the assignment was made, use this.$parent.$index within your function. [example](https://ghiden.github.io/angucomplete-alt/#example10) |  No |inputChangedFn |
| auto-match | Allows for auto selecting an item if the search text matches a search results attributes exactly. [example](https://ghiden.github.io/angucomplete-alt/#example11) |  No | true |
| focus-in | A function or expression to be called when input field gets focused. [example](https://ghiden.github.io/angucomplete-alt/#example12) | No | focusIn() |
| focus-out | A function or expression to be called when input field lose focus. [example](https://ghiden.github.io/angucomplete-alt/#example12) | No | focusOut() |
| disable-input | A model to control disable/enable of input field. [example page](https://ghiden.github.io/angucomplete-alt/#example13) | No | disableInput |
| focus-first | Automatically select the first match from the result list. |  No | true |
| parse-input | A function or expression to parse input string before comparing into search process. |  No | parseInput() |
| field-tabindex | Setting the tabindex attribute on the input field. |  No | field-tabindex="25" |
| api | Name of the API to get data | Required if getting data from backend | NO |
| on-format-data | Callback function to be called after data is returned from backend | NO |
  
 
## Component usage:

scriptr-autocomplete is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

```html
 <scriptr-autocomplete
          placeholder="Search countries"
          pause="400"
          search-fields="name"
          title-field="name"
          minlength="0"
          text-searching="Searching..."
          transport="https"
          on-format-data="vm.callback"
          local-data='
                  [{"name": "Afghanistan", "code": "AF"},
    			  {"name": "Aland Islands", "code": "AX"},
    			  {"name": "Albania", "code": "AL"},
                  {"name": "Lebanon", "code": "LB"}
                 ]'                
          input-class="form-control form-control-small">
    </scriptr-autocomplete>
  ```
  
  Example where data is called from backend
  
  ```html
   <scriptr-autocomplete
          placeholder="Search countries"
          pause="400"
          search-fields="name"
          title-field="name"
          minlength="0"
          text-searching="Searching..."
          transport="https"
          on-format-data="vm.callback"
          api="UIComponents/dashboard/frontend/examples/list/getCountries"
          input-class="form-control form-control-small">
    </scriptr-autocomplete>
  ```
