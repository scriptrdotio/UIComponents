angular.module('WsClient', [ 'ngWebSocket', 'ngCookies' ]).provider(
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
		            var connect = $q.defer();
		            var ready = $q.defer();
		            var error = $q.defer();
		            var close = $q.defer();
		            var reconnect = $q.defer();

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
		            dataStream.onMessage(function(message) {
			            try {
				            var data = JSON.parse(message.data);
				            if (data.result == "connected.") {
					            _socketSession = data.id;
					            if (ready) {
						            ready.resolve();
					            }
					            if (connect) {
						            connect.resolve();
					            }
				            }
				            callbackHandler(data);
			            } catch (e) {
				            console.log("Error when parsing message", message, e)
			            }
		            });

		            dataStream.onClose(function(e) {
			            console.log("Socket Closed", e);
			            close.resolve()
			            dataStream.reconnect(); // Try to re-open socket
		            });

		            dataStream.onError(function(e) {
			            console.log("Socket Error", e);
			            error.resolve();
		            });

		            var callbackHandler = function(data) {
			            var messageObj = data;
			            console.log("Received data from websocket: ", messageObj);
			            // If an object exists with callback_id in our callbacks object, resolve it
			            var callbackId = messageObj.id; // messageObj.id.split("-")[1]
			            if (callbacks.hasOwnProperty(callbackId)) {
				            console.log(callbacks[callbackId]);
				            $rootScope.$apply(callbacks[callbackId].cb
				                  .resolve(messageObj.result));
				            delete callbacks[callbackId];
			            }
		            }

		            // properties/methods that will be available in controller when passed the provider
		            var methods = {

		               message : msg,

		               getStatus : function() {
			               return dataStream.readyState;
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
				               console.log('Sending request', message);
				               dataStream.send({
				                  "method" : "Publish",
				                  "params" : {
				                     "channel" : _publishChannel,
				                     "message" : JSON.stringify(message)
				                  }
				               });
				               return defer.promise;
			               } else {
				               console.log("No channel is deifned!")
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
			               console.log('Sending request', request);
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

		               onConnect : connect.promise,
		               onReady : ready.promise,
		               onError : error.promise,
		               onClose : close.promise,
		               onReconnect : reconnect.promise

		            };

		            return methods;
	            } ]
      })
