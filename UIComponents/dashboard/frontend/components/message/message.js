angular.module('Message', ['angular-scriptrui']);

angular
  .module('Message')
  .component(
     'scriptrDisplaybox',
     {
  
      bindings : {
        "data": "@",
        "api": "@",
        "transport" : "@",
        "msgTag" : "@",
        "apiParams" : "<?",
        "onFormatData" : "&",
        "type":"@"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/message/message.html',
      controller: function(httpClient, wsClient) {
        
         var self = this;
          
         this.$onInit = function() {
            this.data = (this.data) ? this.data : "Waiting for info...";
            this.type = (this.type) ? this.type : "info";
      	 }
         
          this.$postLink = function () {
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
            } else {
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
            if(typeof self.onFormatData() == "function"){
              data = self.onFormatData()(data);
            }
            this.data = JSON.stringify(data);
          }
        }
	});
