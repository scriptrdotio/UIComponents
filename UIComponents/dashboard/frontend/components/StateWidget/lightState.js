angular.module('StateWidget',[]);

angular
  .module('StateWidget')
  .component(
     'lightState',
     {
  
      bindings : {
        "data": "@",
        "size": "@", // "small", "medium", "large"
        "shadow": "@", // "true", "false"
        "threeDimensional": "@", //"true", false
        "api": "@",
        "transport" : "@",
        "msgTag" : "@",
        "apiParams" : "<?",
        "onFormatData" : "&"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/StateWidget/lightState.html',
      controller: function(httpClient, wsClient) {
        
         var self = this;
          
         this.$onInit = function() {
            if(this.data)
            	this.consumeData(this.data) 
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
            
            if(typeof data == "string"){
                self.color = data;
            }
        }
        }
	});
