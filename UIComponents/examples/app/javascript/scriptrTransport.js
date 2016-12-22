var wssConfig = ["wsClientProvider",function (wsClientProvider) {
  wsClientProvider.setToken("UjkyNTI2OTk1RTpkZW1vOkI1RTM5RjIyQTdCMDMyMjg2QzJBNDM2NDEzMzUyRTQw");
  wsClientProvider.setPublishChannel("requestChannel");
  wsClientProvider.setSubscribeChannel("responseChannel");
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
  httpClientProvider.setBaseUrl("https://workshop.scriptrapps.io");
  httpClientProvider.setToken("SDk0N0EwOEM4MTpkZXZpY2UyOjQ2RkIxQUIzRUIwMjRFQjBGQ0RFOTFDOUQ4OTdFRjg4");
}]