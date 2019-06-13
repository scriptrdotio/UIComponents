var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {		
  return $window._; // assumes underscore has already been loaded on the page		
}]);

angular
      .module('WsClient', [ 'ngWebSocket', 'ngCookies', 'underscore'])
      .provider(
            'wsClient',
            function wsClientProvider() {
              
                var self = this;

	            var _baseUrl = "wss://api.scriptrapps.io/";
	            var _publishChannel = null;
	            var _subscribeChannel = null;
	            var _token = null;
	            var _socketUrl = null;
	            var _socketSession = null;

	            // Keep all pending requests here until they get responses
	            var callbacks = {};
	            // Create a unique callback ID to map requests to responses
	            var currentCallbackId = 0;

	            /** This section for subscribe* */
	            var currentSubscriberId = 0;
	            var subscribersRegistry = {};

	            

	            /** This section for subscribe* */
	            this.setBaseUrl = function(textString) {
		            _baseUrl = textString;
	            };

	            this.setPublishChannel = function(textString) {
		            _publishChannel = textString;
	            };

	            this.setSubscribeChannel = function(textString) { //Or array
                    console.log(textString)
                    _subscribeChannel = textString;
	            };
                
                
              
                this.getSubscribeChannel = function() {
		           return _subscribeChannel;
	            };

	            this.setToken = function(textString) {
		            _token = textString;
	            };

	            var _buildSocketUrl = function() {
		            _socketUrl = _baseUrl + ((_token) ? ( "/" + _token) : (""));
	            }

	            // This creates a new callback ID for a request
	            var _getCallbackId = function(prefix) {
		            currentCallbackId += 1;
		            if (currentCallbackId > 10000) {
			            currentCallbackId = 0;
		            }
		            return currentCallbackId;
	            }

	            var _getPublishId = function(callbackId, prefix) {
		            return _socketSession + "-"
		                  + ((prefix) ? (prefix + "_" + callbackId) : callbackId);
	            }

	            var _getRequestCallId = function(callbackId, prefix) {
		            return (prefix) ? (prefix + "_" + callbackId) : callbackId;
	            }

	            var _getResponseCallId = function(callbackId, prefix) {
		            return _socketSession + "-"
		                  + ((prefix) ? (prefix + "_" + callbackId) : callbackId);
	            }

	            this.$get = [
	                  "$websocket",
	                  "$cookies",
	                  "$q",
	                  "$rootScope",
                      "_",
	                  function wsFactory($websocket, $cookies, $q, $rootScope, _) {

		                  // In case we have a cookie with a token, update the token
		                  if ($cookies.get("token")) {
			                  this.setToken($cookies.get("token"));
		                  }

		                  _buildSocketUrl();

		                  // Open a WebSocket connection
		                  var dataStream = $websocket(_socketUrl);

		                  var msg = {};
		                  var ready = $q.defer();
		                  var error = $q.defer();
		                  var close = $q.defer();

		                  // On open of the socket connection, if subscribeChannel available subscribe to read messages received on this channel
		                  dataStream.onOpen(function() {
			                	subscribe(_subscribeChannel)
		                  });

		                  // Whenever a message is received over socket pass it to the callbackHandler to execute callbacks if any
		                  dataStream
		                        .onMessage(function(message) {
			                        try {
				                        var data = JSON.parse(message.data);
                                        console.log("Received message data from websocket: ", data);
				                        if (data.result == "connected.") {
					                        _socketSession = data.id;
					                        if(ready) {
						                        ready.resolve();
					                        }
                                        } if(data.status == "failure" && data.statusCode == "429") {
                                            if($("body").find(".alert-transport").length == 0) {
                                            $("body").append("<div class=\"alert alert-danger alert-dismissable alert-transport\" style=\"position: absolute; z-index: 1000; top: 0; width: 600px; left: 30%; text-align: center\">You have reached you requests rate limit. For more info check the <a href=\"https://www.scriptr.io/documentation#documentation-ratelimitingRateLimiting\" target=\"blank\">documentation.</a><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button></div>")
                                            }
                                         	console.error("You have reached your requests rate limit. For more info check the documentation. https://www.scriptr.io/documentation#documentation-ratelimitingRateLimiting")   
                                        }
                                        msg["data"] = data;
				                        callbackHandler(data);
				                        subscriberHandler(data);
			                        } catch (e) {
				                        console
				                              .log(
				                                    "Error when parsing message received over socket",
				                                    message, e)
			                        }
		                        });

		                  dataStream.onClose(function(e) {
			                  console.log("Socket Closed", e);
			                  close.resolve(e)
			                  console.log("Trying to reconnect closed socket.")
                              //Try to re-open socket
			                  dataStream.reconnect(); // TODO: Make it incremental timed retiral based on status code 
		                  });

		                  dataStream.onError(function(e) {
			                  console.log("Socket Error", e);
			                  error.resolve();
		                  });
                          
                          var subscribe = function(channels) {
                              if (channels) {
                               if(typeof channels == "string") {
                                  dataStream.send(JSON.stringify({
				                     "method" : "Subscribe",
				                     "params" : {
					                     "channel" : channels
				                     }
				                  }));
                               } else if(channels.constructor.name == "Array") {
                                   for(var i =0; i < channels.length; i++) {
                                     dataStream.send(JSON.stringify({
				                     "method" : "Subscribe",
				                     "params" : {
					                     "channel" : channels[i]
				                     }
				                  }));
                                 } 
                               }
			                  }
                          }
                          
                          var unsubscribe = function(channels) {
                              if (channels) {
                               if(typeof channels == "string") {
                                  dataStream.send(JSON.stringify({
				                     "method" : "Unsubscribe",
				                     "params" : {
					                     "channel" : channels
				                     }
				                  }));
                               } else if(channels.constructor.name == "Array") {
                                   for(var i =0; i < channels.length; i++) {
                                     dataStream.send(JSON.stringify({
				                     "method" : "Unscubscribe",
				                     "params" : {
					                     "channel" : channels[i]
				                     }
				                  }));
                                 } 
                               }
			                  }
                          }

		                  // Check if message received has a registered callback in our registry
		                  var callbackHandler = function(data) {
			                  // Get the message callback id
			                  var callbackId = data.id;
			                  if (callbackId && callbacks.hasOwnProperty(callbackId)) {
				                  console.log("Execute registered call back for received socket message.", callbacks[callbackId]);
				                  $rootScope.$apply(callbacks[callbackId].cb.resolve(data.result));
				                  delete callbacks[callbackId];
			                  } else {
				                  console
				                        .log("No callbacks registerd for received socket message.");
			                  }
		                  }

		                  var subscriberHandler = function(data) {
			                  // Get the message callback id
			                  var subscriberId = data.id;
                            
                            
                              if(subscriberId && subscribersRegistry.hasOwnProperty("subscribeToAll")){
                                
                                  console.log("Execute registered call back for received socket message.", subscribersRegistry["subscribeToAll"]);
                                  var registeredSubscriptions =  subscribersRegistry["subscribeToAll"];
                                  for(var i = 0; i< registeredSubscriptions.length; i++) {
                                    registeredSubscriptions[i].cb(data.result);
                                  }
                                
                              } else if (subscriberId && subscribersRegistry.hasOwnProperty(subscriberId)) {
                                
				                  console.log("Execute registered call back for received socket message.", subscribersRegistry[subscriberId]);
				                  // $rootScope.$apply(subscribersRegistry[subscriberId].cb.resolve(data.result));
                                  var registeredSubscriptions =  subscribersRegistry[subscriberId];
                                  for(var i = 0; i< registeredSubscriptions.length; i++) {
                                    registeredSubscriptions[i].cb(data.result);
                                  }
				                  
			                  } else {
				                  console.log("No subscribers registerd for received socket message.");
			                  }
		                  }

		                  // properties/methods that will be available in controller when passed the provider
		                  var methods = {

		                     getMessage : function(){ return msg;},

		                     getStatus : function() {
			                     return dataStream.readyState;
		                     },

		                     subscribe : function(prefix, callback, id) {
			                     if (_subscribeChannel) {
                                     var callback = {
				                        time : new Date(),
				                        cb : callback
				                     };
                                     if(id) {callback["id"] = id;}
                                     if(!subscribersRegistry[prefix]) {
                                       subscribersRegistry[prefix] = [callback];
                                     } else {
                                        subscribersRegistry[prefix].push(callback)
                                     }
				                     
			                     }
		                     },
                              
                            unsubscribe : function(prefix, callback, id) {
                                if(!prefix) {
                                    console.log("prefix is mandatory to unsubscribe.")
                                    return;
                                }
                                 console.log("---", subscribersRegistry[prefix])
			                     if (_subscribeChannel) {
                                    if(prefix && !callback && !id) {
                                        subscribersRegistry[prefix] = []
                                    } else {
                                        var entry = {}
                                        if(callback) {
                                            entry["cb"] = callback;
                                        }
                                        if(id) {
                                            entry["id"] = id;
                                        }
                                       subscribersRegistry[prefix] =  _.difference(subscribersRegistry[prefix], _.where(subscribersRegistry[prefix],entry));
                                    }
				                     
			                     }
                                console.log("+++",subscribersRegistry[prefix])
		                     },

		                     publish : function(message, prefix, overridenPubChannel) {
                                 var publishingChannel = _publishChannel;
                                 if(overridenPubChannel) publishingChannel = overridenPubChannel;
			                     if (publishingChannel) {
				                     var defer = $q.defer();

				                     // Pass publisher id
				                     var callbackId = _getCallbackId();

				                     var id = _getPublishId(callbackId, prefix);
				                     callbacks[id] = {
				                        time : new Date(),
				                        cb : defer
				                     };

				                     message["id"] = id;
				                     console
				                           .log('Sending publish message', message);
				                     dataStream.send({
				                        "method" : "Publish",
				                        "params" : {
				                           "channel" : publishingChannel,
				                           "message" : JSON.stringify(message)
				                        }
				                     });
				                     return defer.promise;
			                     } else {
				                     console
				                           .log(
				                                 "No channel is defined, message won't be sent.",
				                                 message)
			                     }
		                     },

		                     call : function(scriptName, params, prefix) {
			                     var defer = $q.defer();
			                     var request = {
			                        "method" : scriptName,
			                        "params" : {
				                        "body" : JSON.stringify(params)
			                        }
			                     };

			                     var callbackId = _getCallbackId();
			                     var trackId = _getResponseCallId(callbackId, prefix);
                               
			                     callbacks[trackId] = {
			                        time : new Date(),
			                        cb : defer
			                     };

			                     request["id"] = _getRequestCallId(callbackId, prefix);
			                     console.log('Sending call api request over socket.', request);
                               
			                     dataStream.send(request);
			                     return defer.promise;
		                     },
                            
                             updateSubscriptionChannel : function(channel){
                                 if(self.getSubscribeChannel()){
                                      unsubscribe(self.getSubscribeChannel())   
                                 }
                                 self.setSubscribeChannel(channel);
                                 subscribe(channel)
                             },
                            
                             updatePublishingChannel : function(channel){
                                    self.setPublishChannel(channel);
                             },

		                     closeSocket : function(force) {
			                     if (force) {
				                     dataStream.close(force);
			                     } else {
				                     dataStream.close(false);
			                     }
		                     },

		                     onReady : ready.promise,
		                     onError : error.promise,
		                     onClose : close.promise

		                  };

		                  return methods;
	                  } ]
            });
