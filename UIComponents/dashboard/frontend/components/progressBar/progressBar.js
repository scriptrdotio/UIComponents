angular.module('ProgressBar', [ 'ngAnimate', 'ngSanitize', 'ui.bootstrap' ]);

angular
  .module('ProgressBar')
  .component(
     'scriptrProgressbar',
     {
  
      bindings : {
        
        "onLoad" : "&onLoad",
        
        "value" : "@",
        
        "type" : "@",
        
        "max" : "@",
        
        "title" : "@",
        
        "animate": "<?",
        
        "stacked" : "<?",
        
        "api": "@",
        
        "transport" : "@",
        
        "msgTag" : "@",
        
        "apiParams" : "<?",
        
        "onFormatData" : "&"
        
      },
      templateUrl: '/UIComponents/dashboard/frontend/components/progressBar/progressBar.html',
      controller: function(httpClient, wsClient) {
        
         var self = this;

         this.$onInit = function() {
           
           this.value = (this.value) ? this.value : "0";
           
           this.transport = (this.transport) ? this.transport : "wss";
		   this.msgTag = (this.msgTag) ? this.msgTag : null;

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
                    if(typeof self.onFormatData() == "function"){
                       data = self.onFormatData()(data);
                    }
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
             this.value = Math.round(data);
          }
        }
	});
