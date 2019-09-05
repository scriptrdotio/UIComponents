angular.module('DataService', []).service(
    "scriptrDataStore",
    function(httpClient, wsClient, $location) {
        
        this.getData = function(transport, api, apiParams, useWindowParams, msgTag,  consumerFnc, fetchDataInterval, id) {
              
             var params = {};
             if(useWindowParams == "true") {
                  params = angular.merge($location.search(), apiParams)
              } else {
                  params = angular.copy(apiParams);
              }
              if (transport == "wss") {
                  wsClient.onReady.then(function() {
                    // Subscribe to socket messages with id chart
                    if(msgTag){
                        wsClient.subscribe(msgTag, consumerFnc, id);  
                    }
                    if(api) {
                        wsClient.call(api, params, msgTag)
                          .then(function(data, response) {
                          consumerFnc(data)
                        },
                        function(err) {
                          console.log( "reject published promise", err);
                          consumerFnc();
                        });
                    }

                  });
              } else {
                if (transport == "https" && api) {
                    httpClient
                      .get(api, params)
                      .then(
                      function(data, response) {
                        consumerFnc(data)
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
    });
