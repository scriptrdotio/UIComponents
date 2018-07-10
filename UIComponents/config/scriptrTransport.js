var wssConfig = ["wsClientProvider",function (wsClientProvider) {
  wsClientProvider.setBaseUrl("wss://<subdomain>.scriptrapps.io");  
  wsClientProvider.setToken("<anonymous_token>");
  wsClientProvider.setPublishChannel("requestChannel");
  wsClientProvider.setSubscribeChannel("responseChannel");
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
  httpClientProvider.setBaseUrl("https://<subdomain>.scriptrapps.io");
  httpClientProvider.setToken("<anonymous_token>");
}]