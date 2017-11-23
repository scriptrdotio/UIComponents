angular.module('Message', ['angular-scriptrui']);

angular
  .module('Message')
  .component(
     'scriptrDisplaybox',
     {
  
      bindings : {
        "data": "@",
        "type": "@",  
        "api": "@",
        "transport" : "@",
        "msgTag" : "@",
        "apiParams" : "<?",
        "onFormatData" : "&"
      },
      templateUrl:'/UIComponents/dashboard/frontend/UIComponents/Components/message/message.html',
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
                  },
                  function(err) {
                    console
                      .log(
                      "reject published promise",
                      err);
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
            if(typeof data == "object"){  
                if(data && data.data && typeof data.data == "string"){
                    this.data = data.data;
                }  
                if(data && data.type){
                    this.type = data.type;  
                }
            }
            if(typeof data == "string"){
                this.data = data;
            }
        }
        }
	});
