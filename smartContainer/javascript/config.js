var login = {
   redirectTarget: "/smartContainer/html/index.html",
   expiry:6,
   loginTarget: "/smartContainer/html/login.html",
   anonymousToken:"TzgzNTA4NkQxOA=="
};

var wssConfig = ["wsClientProvider",function (wsClientProvider) {
    wsClientProvider.setToken("TzgzNTA4NkQxOA==");
    wsClientProvider.setPublishChannel("requestChannel");
    wsClientProvider.setSubscribeChannel("responseChannel");
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
    httpClientProvider.setBaseUrl("https://kitchen-sink.scriptrapps.io");
    httpClientProvider.setToken("TzgzNTA4NkQxOA==");
}]
