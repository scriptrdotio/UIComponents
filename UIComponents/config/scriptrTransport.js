var wssConfig = ["wsClientProvider",function (wsClientProvider) {
  wsClientProvider.setToken("RTg2MTczN0ZDRTpzY3JpcHRyOkEzM0UyNDdDQUZCQzYxQjM0NURDM0Y2NDc0OTlGMTIx");
  wsClientProvider.setPublishChannel("requestChannel");
  wsClientProvider.setSubscribeChannel("responseChannel");
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
  httpClientProvider.setBaseUrl("https://marv1.scriptrapps.io");
  httpClientProvider.setToken("RTg2MTczN0ZDRTpzY3JpcHRyOkEzM0UyNDdDQUZCQzYxQjM0NURDM0Y2NDc0OTlGMTIx");
}]