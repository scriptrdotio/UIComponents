angular
      .module('HttpClient', [ 'ngCookies' ])
      .provider(
      		'httpClient',
            function httpClientProvider() {
                var _baseUrl = "https://example.scriptrapps.io";
	            var _token = null;
	            var _restUrl = "";

	            this.setBaseUrl = function(textString) {
		            _baseUrl = textString;
		            console.log(_baseUrl)
	            };

	            this.setToken = function(textString) {
		            _token = textString;
		            console.log(_token)
	            };

	            var _buildUrl = function(scriptName) {
		            _restUrl = _baseUrl + "/" + scriptName;
		            console.log(_restUrl)
	            };

	            this.$get = [
	                  "$cookies",
	                  "$q",
	                  "$http",
	                  function wsFactory($cookies, $q, $http) {

		                  if ($cookies.get("token")) {
			                  _token = $cookies.get("token");
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

		                  var httpRequest = function(scriptName, config) {

			                  var d = $q.defer();
			                  // Build base rest Url
			                  _buildUrl(scriptName);

			                  config["url"] = _restUrl;

			                  config["headers"] = setDefaultObject(
			                        config["headers"], "Authorization", "Bearer "
			                              + _token);

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
							                              if (data.result.statusCode == "200"
							                                    && data.result.status == "success") {
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
				                              }
			                              }, function(err) {
				                              d.reject(err);
			                              });
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

		                     post : function(scriptName, data, headers) {
			                     var config = {
				                     "method" : "POST"
			                     };
			                     config["data"] = data;

			                     if (headers) {
				                     config["headers"] = headers;
			                     }

			                     config["headers"] = setDefaultObject(
			                           config["headers"], "Content-Type",
			                           "application/json");

			                     return httpRequest(scriptName, config);
		                     }
		                  };
		                  return methods;
	                  }];
            });
