angular
      .module('HttpClient', [ 'ngCookies' ])
      .provider(
      		'httpClient',
            function httpClientProvider() {
                var _baseUrl = "";
	            var _token = null;
	            var _restUrl = "";
	            
	            var _renewTokenApi = "login/api/renewToken"; // default api to renew token
	            var _tokenExpiry = null;
	            var _tokenExpiryInterval = 1500000; // used to determine after how much from the current time to renew the token. The value is in ms and it should be set relative to the token expiry time
	            var _tokenUpdateInProgress = false; // used to lock the renew of token so no two concurrent calls update it at the same time
	            var _cookies = {}; //JSON object to keep track of cookies in the session
	            
	            var self = this;

	            this.setBaseUrl = function(textString) {
		            _baseUrl = textString;
		            console.log(_baseUrl)
	            };
	            
	            this.setToken = function(textString) {
		            _token = textString;
		            console.log(_token)
	            };
	            
	            this.setRenewTokenApi = function(api) {
		            if (api && api != "")
			            _renewTokenApi = api;
	            };
	            
	            this.getRenewTokenApi = function() {
		            return _renewTokenApi;
	            };
	            
	            this.setTokenExpiry = function(tokenExpiry) {
		            _tokenExpiry = tokenExpiry;
	            };
	            
	            this.setTokenExpiryInterval = function(tokenExpiryInterval) {
		            _tokenExpiryInterval = tokenExpiryInterval;
	            };
	            
	            this.setCookies = function(name, value){
		        	_cookies[name] = value;
		        };
	            
	            var _buildUrl = function(scriptName) {
		            _restUrl = _baseUrl + "/" + scriptName;
		            console.log(_restUrl)
	            };
	            
	            var _isTokenExpired = function() {
		            var expiryDate = new Date(_tokenExpiry);
		            var currentDate = new Date();
		            if (expiryDate.getTime() - currentDate.getTime() <= _tokenExpiryInterval
		                  && !_tokenUpdateInProgress) {
			            return true;
		            }
		            return false;
	            };
	            
	            this.$get = [
	                  "$cookies",
	                  "$q",
	                  "$http",
	                  function wsFactory($cookies, $q, $http) {

		                  if ($cookies.get("token")) {
			                  _token = $cookies.get("token");
		                  }
		                  
		                  if ($cookies.get("tokenExpiry")) {
			                  this.setTokenExpiry($cookies.get("tokenExpiry"));
		                  }
		                  
		                  if ($cookies.get("user")) {
		                	  this.setCookies("user", $cookies.get("user"));
		                  }
		                  
		                  if ($cookies.get("lang")) {
		                	  this.setCookies("lang", $cookies.get("lang"));
		                  }
		                  
		                  var setDefaultObject = function(obj, key, value) {
			                  if (!obj || !obj[key]) {
				                  if (!obj) {
					                  obj = {};
				                  }
				                  obj[key] = value;
			                  }
			                  return obj;
		                  }
		                  
		                  var renewToken = function() {
			                  var d = $q.defer();
			                  // Build base rest Url
			                  _buildUrl(self.getRenewTokenApi());
			                  config["url"] = _restUrl;
			                  if (_token) {
				                  config["headers"] = setDefaultObject(
				                        config["headers"], "Authorization",
				                        "Bearer " + _token);
			                  }
			                  config["params"] = {
				                  "token" : _token
			                  };
                              
                              d = httpCall(d, config);
			                  return d.promise;
		                  }
                          
                          var httpCall = function(d, config){
                              $http(config)
                                  .then(
                                  function(response) {
                                      if (response.data
                                          && response.data.response) {
                                          var data = response.data.response;
                                          if (data.metadata.statusCode == "200"
                                              && data.metadata.status == "success") {
                                              if (data.result
                                                  && data.result.metadata) {
                                                  // Check for nested scriptr response
                                                  if (data.result.metadata.status == "success") {
                                                      d.resolve(
                                                          data.result.result,
                                                          response);
                                                  } else {
                                                      d
                                                          .reject(
                                                          data.result.metadata,
                                                          response);
                                                  }
                                              } else {// No Nested scriptr response
                                                  d.resolve(data.result,
                                                            response);
                                              }
                                          } else {// Not a success, logical failure
                                              d.reject(data.metadata,
                                                       response);
                                          }
                                      } else { // It's not a scriptr structure response, resolve and let caller handle the data
                                          console
                                              .debug(
                                              "Not the excpected scriptr response format",
                                              response)
                                          d.resolve(response);
                                      }
                                  },
                                  function(err) {
                                      console.log("ERROR", err)
                                      if (err.status == "429") {
                                          if ($("body").find(
                                              ".alert-transport").length == 0) {
                                              $("body")
                                                  .append(
                                                  "<div class=\"alert alert-danger alert-dismissable alert-transport\" style=\"position: absolute; z-index: 1000; top: 0; width: 600px; left: 30%; text-align: center\">You have reached you requests rate limit. For more info check the <a href=\"https://www.scriptr.io/documentation#documentation-ratelimitingRateLimiting\" target=\"blank\">documentation.</a><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button></div>")
                                          }
                                          console
                                              .error("You have reached your requests rate limit. For more info check the documentation. https://www.scriptr.io/documentation#documentation-ratelimitingRateLimiting")
                                      }
                                      if (err.data && err.data.response
                                          && err.data.response.metadata)
                                          d
                                              .reject(err.data.response.metadata);
                                      else
                                          d.reject(err);
                                  });
                              return d;
                          }
		                  
		                  var httpRequest = function(scriptName, config) {
			                  // update the token and token expiry values in case they were renewed through ws calls
			                  if ($cookies.get("token")) {
				                  _token = $cookies.get("token");
			                  }
			                  if ($cookies.get("tokenExpiry")) {
				                  self.setTokenExpiry($cookies.get("tokenExpiry"));
			                  }
			                  var d = $q.defer();
			                  // Build base rest Url
			                  _buildUrl(scriptName);
			                  config["url"] = _restUrl;
			                  if (_token) {
				                  config["headers"] = setDefaultObject(
				                        config["headers"], "Authorization",
				                        "Bearer " + _token);
			                  }
                              d = httpCall(d, config);
                              
			                  // check if token is about to expire
			                  if (_isTokenExpired()) {
			                  	_tokenUpdateInProgress = true;
				                  renewToken()
				                        .then(
				                              function(data, response) {
					                              var date = new Date();
					                              date
					                                    .setTime(date.getTime()
					                                          + (parseInt(data["expiry"]) * 1000));
					                              $cookies.put('token', data.token,
					                                    {
					                                       'path' : '/',
					                                       'secure' : true,
					                                       'expires' : date
					                                             .toUTCString()
					                                    });
					                              $cookies.put('tokenExpiry', date
					                                    .toUTCString(), {
					                                 'path' : '/',
					                                 'secure' : true,
					                                 'expires' : date.toUTCString()
					                              });
					                              if (_cookies["user"]) {
						                              $cookies.put('user', _cookies["user"], {
						                                 'path' : '/',
						                                 'secure' : true,
						                                 'expires' : date
						                                       .toUTCString()
						                              });
					                              }
					                              if (_cookies["lang"]) {
						                              $cookies.put('lang', _cookies["lang"], {
						                                 'path' : '/',
						                                 'secure' : true,
						                                 'expires' : date
						                                       .toUTCString()
						                              });
					                              }
					                              self.setToken(data.token);
					                              self.setTokenExpiry(date
					                                    .toUTCString());
				                              },
				                              function(err) {
					                              console
					                                    .log(
					                                          "Failed to renew token",
					                                          err);
				                              });
			                  }
			                  return d.promise;
		                  };
		                  var methods = {
		                     get : function(scriptName, params) {
			                     var config = {
				                     "method" : "GET"
			                     };
			                     config.params = params;
			                     return httpRequest(scriptName, config);
		                     },

		                     post : function(scriptName, data, headers, hasAttachments) {
			                     var config = {
				                     "method" : "POST"
			                     };
			                     config["data"] = data;

			                     if (headers) {
				                     config["headers"] = headers;
			                     }

                                 if(!headers || !headers["Content-Type"]) {
                                     config["headers"] = setDefaultObject(
			                        	config["headers"], "Content-Type", "application/json");
                                 }
                                 
                                 if(hasAttachments) {
                                    config["headers"]["Content-Type"] =  undefined;
      							 	config["transformRequest"]= angular.identity
                                 }
			                     return httpRequest(scriptName, config);
		                     },
		                     
		                     updateToken: function(token) {
		                     	self.setToken(token);
		                     },
		                     
		                     updateCookies: function(name, value){
		                    	 self.setCookies(name, value);
		                     }
		                  };
		                  return methods;
	                  }]; 
            });
