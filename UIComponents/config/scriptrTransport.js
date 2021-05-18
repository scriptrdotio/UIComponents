var wssConfig = ["wsClientProvider",function (wsClientProvider) {
  wsClientProvider.setBaseUrl("wss://<subdomain>.scriptrapps.io");  // Cluster rest api, default is "wss://api.scriptrapps.io/";
  wsClientProvider.setToken("<anonymous_token>"); //Needs to be configured if no login thus no cookie to retrive token from
  wsClientProvider.setPublishChannel("requestChannel");
  wsClientProvider.setSubscribeChannel("responseChannel");
  //wsClientProvider.setQueueingInterval(700);  //Set Queuing Interval, in ms, how much to wait between requests sent over socket connection, default is 100ms
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
  httpClientProvider.setBaseUrl("https://<subdomain>.scriptrapps.io");
  httpClientProvider.setToken("<anonymous_token>");
  //httpClientProvider.setRenewTokenApi("<renew_token_interval>"); //In case you don't want to use default one under login module login/api/renewToken
  //httpClientProvider.setTokenRenewInterval(600000); //in ms, If time remaining for token to expiry is less than this value a renewToken will be invoked. i.e 600000 we will try to renew token before 10 minutes of its expiry. Set it to > than token lifetime time to never renew.
}]
