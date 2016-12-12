angular
      .module('WsClient', [ 'ngWebSocket', 'ngCookies' ])
      .provider(
            'wsClient',
            function wsClientProvider() {

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

	            this.setSubscribeChannel = function(textString) {
		            _subscribeChannel = textString;
	            };

	            this.setToken = function(textString) {
		            _token = textString;
	            };

	            var _buildSocketUrl = function() {
		            _socketUrl = _baseUrl + "/" + _token;
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
	                  function wsFactory($websocket, $cookies, $q, $rootScope) {

		                  // In case we have a cookie with a token, update the token
		                  if ($cookies.get("token")) {
			                  this.setToken($cookies.get("token"));
		                  }

		                  _buildSocketUrl();

		                  // Open a WebSocket connection
		                  var dataStream = $websocket(_socketUrl);

		                  var msg = [];
		                  var ready = $q.defer();
		                  var error = $q.defer();
		                  var close = $q.defer();

		                  // On open of the socket connection, if subscribeChannel available subscribe to read messages received on this channel
		                  dataStream.onOpen(function() {
			                  if (_subscribeChannel) {
				                  dataStream.send(JSON.stringify({
				                     "method" : "Subscribe",
				                     "params" : {
					                     "channel" : _subscribeChannel
				                     }
				                  }));
			                  }
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
				                        }
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
			                  close.resolve()
			                  console.log("Trying to reconnect closed socket.")
			                  dataStream.reconnect(); // Try to re-open socket
		                  });

		                  dataStream.onError(function(e) {
			                  console.log("Socket Error", e);
			                  error.resolve();
		                  });

		                  // Check if message received has a registered callback in our registry
		                  var callbackHandler = function(data) {
			                  // Get the message callback id
			                  var callbackId = data.id;
			                  if (callbackId
			                        && callbacks.hasOwnProperty(callbackId)) {
				                  console
				                        .log(
				                              "Execute registered call back for received socket message.",
				                              callbacks[callbackId]);
				                  $rootScope.$apply(callbacks[callbackId].cb
				                        .resolve(data.result));
				                  delete callbacks[callbackId];
			                  } else {
				                  console
				                        .log("No callbacks registerd for received socket message.");
			                  }
		                  }

		                  var subscriberHandler = function(data) {
			                  // Get the message callback id
			                  var subscriberId = data.id;
			                  if (subscriberId
			                        && subscribersRegistry
			                              .hasOwnProperty(subscriberId)) {
				                  console
				                        .log(
				                              "Execute registered call back for received socket message.",
				                              subscribersRegistry[subscriberId]);
				                  // $rootScope.$apply(subscribersRegistry[subscriberId].cb.resolve(data.result));
                                  var registeredSubscriptions =  subscribersRegistry[subscriberId];
                                  for(var i = 0; i< registeredSubscriptions.length; i++) {
                                    registeredSubscriptions[i].cb(data.result);
                                  }
				                  
			                  } else {
				                  console
				                        .log("No subscribers registerd for received socket message.");
			                  }
		                  }

		                  // properties/methods that will be available in controller when passed the provider
		                  var methods = {

		                     message : msg,

		                     getStatus : function() {
			                     return dataStream.readyState;
		                     },

		                     subscribe : function(prefix, callback) {
			                     if (_subscribeChannel) {
                                     var callback = {
				                        time : new Date(),
				                        cb : callback
				                     }
                                     if(!subscribersRegistry[prefix]) {
                                       subscribersRegistry[prefix] = [callback];
                                     } else {
                                        subscribersRegistry[prefix].push(callback)
                                     }
				                     
			                     }
		                     },

		                     publish : function(message, prefix) {
			                     if (_publishChannel) {
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
				                           "channel" : _publishChannel,
				                           "message" : JSON.stringify(message)
				                        }
				                     });
				                     return defer.promise;
			                     } else {
				                     console
				                           .log(
				                                 "No channel is deifned, message won't be sent.",
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
			                     var trackId = _getResponseCallId(callbackId,
			                           prefix);
			                     callbacks[trackId] = {
			                        time : new Date(),
			                        cb : defer
			                     };

			                     request["id"] = _getRequestCallId(callbackId,
			                           prefix);
			                     console.log(
			                           'Sending call api request over socket.',
			                           request);
			                     dataStream.send(request);
			                     return defer.promise;
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
