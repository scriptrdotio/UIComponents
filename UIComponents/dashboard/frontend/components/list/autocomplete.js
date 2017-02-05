angular
  .module("List",[ "angucomplete-alt" ])
  .component(
  'scriptrAutocomplete',
  {
    bindings : {
      
		"placeholder": "@",	//Placeholder text for the search field.
      
        "maxlength": "@",	//Maxlength attribute for the search field.
      
        "pause": "@",	//The time to wait (in milliseconds) before searching when the user enters new characters.
      
        "selectedObject": "<?",	//Either an object in your scope or callback function. If you set an object, it will be passed to the directive with '=' sign but it is actually one-way-bound data. So, setting it from your scope has no effect on input string. If you set a callback, it gets called when selection is made. To get attributes of the input from which the assignment was made, use this.$parent.$index within your function.
       
        "selectedObjectData": "<?",	//A second parameter which will be passed to selected-object. Only works when using selected-object.
        
        "titleField": "@",	//The name of the field in the JSON objects returned back that should be used for displaying the title in the autocomplete list. Note, if you want to combine fields together, you can comma separate them here (e.g. for a first and last name combined). If you want to access nested field, use dot to connect attributes (e.g. name.first).
        
        "descriptionField": "@",	//The name of the field in the JSON objects returned back that should be used for displaying the description in the autocomplete list.
        
        "imageField": "@",	//The name of the field in the JSON objects returned back that should be used for displaying an image in the autocomplete list. example	No	@	pic
         
        "minlength": "@",	//The minimum length of string required before searching. example. If set to 0, it shows all items. It works both local and remote but is intended to use with local data. If used with remote API, it needs to return all items when query parameter is empty string.	
        
        "inputName": "@",	//Name for input field. This is required when you use field-required.
        
        "inputClass": "@",	//The classes to use for styling the input box.
        
        "matchClass": "@",	//If it is assigned, matching part of title is highlighted with given class style.
        
        "localData": "<?",	//The local data variable to use from your controller. Should be an array of objects.
      
        "searchFields": "@",	//The fields from your local data to search on (comma separate them). Each field can contain dots for accessing nested attribute.
      
        "clearSelected": "@",	//To clear out input field upon selecting an item, set this attribute to true. 
      
        "overrideSuggestions": "@",	//To override suggestions and set the value in input field to selectedObject. 
      
        "fieldRequired": "@",	//Set field to be required. Requirement for this to work is that this directive needs to be in a form and you need to provide input-name. Default class name is "autocomplete-required".
      
        "fieldRequiredClass": "@",	//Set custom class name for required.	
      
        "textSearching": "@",	//Custom string to show when search is in progress. Set this to 'false' prevents text to show up.	
      
        "textNoResults": "@",	//Custom string to show when there is no match. Set this to 'false' prevents text to show up.	
      
        "initialValue": "@",	//Initial value for component. If string, the internal model is set to the string value, if an object, the title-field attribute is used to parse the correct title for the view, and the internal model is set to the object.
        "inputChanged": "&",	//A callback function that is called when input field is changed. To get attributes of the input from which the assignment was made, use this.$parent.$index within your function.
      
        "autoMatch": "@",	//Allows for auto selecting an item if the search text matches a search results attributes exactly.
      
        "focusIn": "&",	//A function or expression to be called when input field gets focused.
      
        "focusOut": "&",	//A function or expression to be called when input field lose focus.
      
        "disableInput": "@",	//A model to control disable/enable of input field.
      
        "focusFirst": "@",	//Automatically select the first match from the result list.
      
        "fieldTabindex": "@",	//Setting the tabindex attribute on the input field.
      
        "parseInput":"&",	//A function or expression to parse input string before comparing into search process.
      
        "localSearch": "&",	//A function that search local data. It should take a input string and an array of items as arguments and returns an array of matched items. 
      
        "transport" : "@",
      
        "api" : "@",
      
        "onFormatData" : "&"
      
    },
    templateUrl: "/UIComponents/dashboard/frontend/components/list/autocomplete.html",
    controller: function(wsClient, httpClient) {
      
         var self = this;
      
      	 this.$onInit = function() {
           
           this.localData = (this.localData) ? this.localData : [];
           this.fieldRequired = (typeof this.fieldRequired != 'undefined') ? this.fieldRequired : false;
           this.textSearching = (typeof this.textSearching != 'undefined') ? this.textSearching : false;
           
           this.transport = (this.transport) ? this.transport : "wss";
           
           initDataService(this.transport);
         }
         
         var initDataService = function(transport) {
           if (transport == "wss") {
             wsClient.onReady.then(function() {
               // Subscribe to socket messages with id chart
               wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
               if(self.api) {
                 wsClient.call(self.api, self.apiParams, self.msgTag)
                   .then(function(data, response) {
                   self.consumeData(data)
                 });
               }
             });
           }else {
                if (transport == "https" && self.api) {
                    httpClient
                      .get(self.api, self.apiParams)
                      .then(
                      function(data, response) {
                        self.consumeData(data)
                      },
                      function(err) {
                        console
                          .log(
                          "reject published promise",
                          err);
                      });
                }
              }
         }
         
         this.consumeData = function(data, response) {
           if(typeof this.onFormatData() == "function"){
             data = this.onFormatData()(data);
           }
           this.localData = data;
         }
    }
});