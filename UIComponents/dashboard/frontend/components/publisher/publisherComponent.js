angular.module('Publisher', []);

angular
  .module('Publisher')
  .component(
     'scriptrPublisher',
     {
  
      bindings : {
        
        "msgTag" : "@", // Subscribe to socket messages with tag name.
        
        "onFormatData" : "&" // Callback function to be called after data is returned from backend 
        
      },
      template: '<div></div>',
      controller: function(httpClient, wsClient) {
        
         var self = this;

         this.$onInit = function() {
           initDataService();
         }

         var initDataService = function() {
           wsClient.onReady.then(function() {
             // Subscribe to socket messages with id chart
             wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
           });
         }

         this.consumeData = function(data, response) {
           if(typeof self.onFormatData() == "function"){
             data = self.onFormatData()(data);
           }
           this.value = Math.round(data);
         }
      }
	});
