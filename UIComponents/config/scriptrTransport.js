var wssConfig = ["wsClientProvider",function (wsClientProvider) {
  wsClientProvider.setToken("VzUwRURDNDQ2MQ==");
  wsClientProvider.setPublishChannel("requestChannel");
  wsClientProvider.setSubscribeChannel("responseChannel");
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
  httpClientProvider.setBaseUrl("https://component.scriptrapps.io");
  httpClientProvider.setToken("VzUwRURDNDQ2MQ==");
}]