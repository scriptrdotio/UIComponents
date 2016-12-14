angular.module('Odometer', [ 'ui.odometer' ]);

angular
    .module('Odometer')
    .component(
      'scriptrOdometer',
      {

        bindings : {

         "onLoad" : "&onLoad",

          "api" : "@",

          "theme" : "@",

          "duration" : "@",

          "animation" : "@",

          "transport" : "@",

          "msgTag" : "@",

          "apiData" : "<?",
          
          "size": "<?"

        },
        templateUrl: '/UIComponents/dashboard/frontend/components/odometer/odometer.html',
        controller: function(httpClient, wsClient) {

           var self = this;

           this.$onInit = function() {
             this.config = {
               duration: (this.duration) ? this.duration : 1000,
               animation: (this.animation) ? this.animation : "count",
               theme: (this.theme) ? this.theme : "car",
             }
             this.odometerOptions = this.config;
             
             this.size = (this.size) ? this.size : 1;

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
                        wsClient.call(self.api, self.apiData, self.msgTag)
                          .then(function(data, response) {
                          self.consumeData(data)
                        });
                    }

                  });
              } else {
                if (transport == "https" && self.api) {
                    httpClient
                      .get(self.api, self.apiData)
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
              this.odometerValue = data;
            }
        }
      });
