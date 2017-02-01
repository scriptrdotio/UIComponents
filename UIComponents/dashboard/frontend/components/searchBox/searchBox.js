angular
  .module("SearchBox", [])
  .component(
  'scriptrSearchbox',
  {
    bindings : {
      
        "transport" : "@",
      
        "api" : "@",
      
        "onFormatData" : "&"
      
    },
    templateUrl: "/UIComponents/dashboard/frontend/components/searchBox/searchBox.html",
    controller: function(wsClient, httpClient) {
      
         var self = this;
      
      	 this.$onInit = function() {
           this.my_data = [];
           this.transport = (this.transport) ? this.transport : "wss";
         }
         
         this.onFilterChanged = function() {
           console.log("submit");
           initDataService(this.transport, this.searchValue);
        }
         
         var initDataService = function(transport, searchValue) {
           if (transport == "wss") {
             wsClient.onReady.then(function() {
               // Subscribe to socket messages with id chart
               wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
               if(self.api) {
                 wsClient.call(self.api, searchValue, self.msgTag)
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
                        if(typeof self.onFormatData() == "function"){
                           data = self.onFormatData()(data);
                        }
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
           if(typeof self.onFormatData() == "function"){
             data = self.onFormatData()(data);
           }
           console.log("display tree");
           this.my_data = data;
           
         }
    }
});