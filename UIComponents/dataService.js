angular.module('DataService', []).service(
    "dataService",
    function ($q, httpClient, wsClient, $location) {
        
        
        
        this.getData = function (transport, api, apiParams, useWindowParams, msgTag, consumerFnc, fetchDataInterval, id) {
            var params = {};
            if(!apiParams){
                apiParams={};
            }
            if (useWindowParams == "true") {
                params = angular.merge( apiParams,$location.search())
            } else {
                params = angular.copy(apiParams);
            }
            if (transport == "wss") {
                wsClient.onReady.then(function () {
                    // Subscribe to socket messages with id chart
                    if (msgTag) {
                        wsClient.subscribe(msgTag, consumerFnc, id);
                    }
                    if (api) {
                        wsClient.call(api, params, msgTag)
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
                if (transport == "https" && api) {
                    httpClient
                        .get(api, params)
                        .then(
                        function (data, response) {
                            consumerFnc(data)
                        },
                        function (err) {
                            console.log(
                                "reject published promise",
                                err);
                        });
                }
            }
        }
        
        this.postData = function (transport, api, apiParams, useWindowParams, msgTag, consumerFnc, id) {
            var defer = $q.defer();
            var params = {};
            if(!apiParams){
                apiParams={};
            }
            if (useWindowParams == "true") {
                params = angular.merge( apiParams,$location.search())
            } else {
                params = angular.copy(apiParams);
            }
            if (api) {
                //transport wss
                if (transport == "wss") {
                    wsClient.onReady.then(function () {
                        if (msgTag) {
                            wsClient.subscribe(msgTag, consumerFnc, id);
                        }
                        wsClient.call(api, params, msgTag)
                            .then(
                            function (data, response) {
                                if (typeof consumerFnc == "function") consumerFnc(data);
                                defer.resolve({ msg: 'SUCCESS', details: "", data: data });
                            },
                            function (err) {
                                if (typeof consumerFnc == "function") consumerFnc(err);
                                defer.resolve({ msg: 'ERROR', details: err, data: {} });
                            });
                    });
                } else if (transport == "https") {
                    httpClient
                        .post(api, params)
                        .then(
                        function (data, response) {
                            if (typeof consumerFnc == "function") consumerFnc(data)
                            defer.resolve({ msg: 'SUCCESS', details: "", data: data });
                        },
                        function (err) {
                            if (typeof consumerFnc == "function") consumerFnc(err)
                            defer.resolve({ msg: 'ERROR', details: err, data: {} });
                        });
                } else {
                }
            } else {
                defer.reject({ msg: "ERROR", details: "api is undefined", data: {} });
            }
            return defer.promise;
        }
    }
);
