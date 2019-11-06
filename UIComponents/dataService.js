angular.module('DataService', [])
      .provider(
      		'dataService',
            function dataServiceProvider() {
	            var self = this;
                
                this._sendRequestApi = function($q, httpClient, wsClient, $location, request, consumerFnc) {

                    var params = {};
                    var apiParams= (request.apiParams) ? request.apiParams : {};

                    if (request.useWindowParams && request.useWindowParams == "true") {
                        params = angular.merge(apiParams,$location.search())
                    } else {
                        params = angular.copy(apiParams);
                    }
                    if (request.transport == "wss") {
                        wsClient.onReady.then(function () {
                            // Subscribe to socket messages with widget id
                            if (request.msgTag) {
                                wsClient.subscribe(request.msgTag, consumerFnc, request.widgetId);
                            }
                            if (request.api) {
                                wsClient.call(request.api, params, request.msgTag)
                                    .then(function (data, response) {
                                    consumerFnc(data)
                                },
                                          function (err) {
                                    console.log("reject published promise", err);
                                    consumerFnc();
                                });
                            }
                        });
                    } else {
                        if (request.transport == "https" && request.api) {
                             if(request.httpMethod == "POST") {
                                 httpClient
                                     .post(request.api, params)
                                     .then(
                                     function (data, response) {
                                         if (typeof consumerFnc == "function") consumerFnc(data)
                                     },
                                     function (err) {
                                         if (typeof consumerFnc == "function") consumerFnc(err)
                                     });
                                 
                             } else { //default to get
                                httpClient
                                .get(request.api, params)
                                .then(
                                function (data, response) {
                                    consumerFnc(data)
                                },
                                function (err) {
                                    console.log("reject published promise", err);
                                });
                            } 
                            
                        }
                    }
                }
                
	            this.$get = [
	                  "$q", "httpClient", "wsClient", "$location",
	                  function dataServiceFactory($q, httpClient, wsClient, $location) {
		                  var methods = {
		                    scriptrRequest: function (request, consumerFnc) {
                                 self._sendRequestApi($q, httpClient, wsClient, $location, request, consumerFnc);
                            }
		                  };
		                  return methods;
	                  }];
            });
