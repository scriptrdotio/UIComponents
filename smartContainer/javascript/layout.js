var login = {
   redirectTarget: "/smartContainer/html/index.html",
   expiry:1,
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


var menuItems = {
  "mainMenu": "menu1",
  "menu1": [
    {"id":"1", "iconClass":"fa fa-globe", "label": "map", "route":"#/map", "active":"true"},
    {"id":"2", "iconClass":"fa fa-dashboard", "label": "dashboard", "route":"#/dashboard", "active":"false", "sub": "col2"},
    {"id":"1", "iconClass":"fa fa-globe", "label": "Reports", "route":"#/reports", "active":"false", "sub": "col3"},
    {"id":"1", "iconClass":"fa fa-globe", "label": "Generic Rules", "route":"#/rules", "active":"false", "sub": "col4"},
    {"id":"1", "iconClass":"fa fa-globe", "label": "Notification Rules", "route":"#/notifications", "active":"false"}  
  ],
  "col2": [
    {"id":"6", "iconClass":"fa fa-dashboard", "label":"Real Time", "route":"#/realTime", "active":"false"},
    {"id":"7", "iconClass":"fa fa-line-chart", "label": "Logs", "route":"#/logs", "active":"false"},  
    {"id":"7", "iconClass":"fa fa-line-chart", "label": "Historical", "route":"#/historical", "active":"false"},
    {"id":"8", "iconClass":"fa fa-ticket", "label":"Tickets", "route":"#/tickets", "active":"false"},
    {"id":"5", "iconClass":"fa fa-globe", "label": "Nucleo Threshold", "route":"#/threshold", "active":"false"}
  ],
  "col3": [
    {"id":"6", "iconClass":"fa fa-dashboard", "label":"Battery Level", "route":"#/batteryLevel", "active":"false"},
    {"id":"7", "iconClass":"fa fa-line-chart", "label": "High Temperature", "route":"#/highTemperature", "active":"false"},
    {"id":"8", "iconClass":"fa fa-ticket", "label":"Tampered With", "route":"#/tamperedWith", "active":"false"}
  ],
   "col4": [
    {"id":"6", "iconClass":"fa fa-dashboard", "label":"Edit lock rule", "route":"#/lockRule", "active":"false"},
    {"id":"7", "iconClass":"fa fa-line-chart", "label": "Edit temperature rule", "route":"#/temperatureRule", "active":"false"}
  ]  
}; 

var headerItems = {
  //"logo": "",
  "items": [],
  "logout": {"icon": "fa fa-sign-out", "label": "Logout", "route":"#/logout"}
};

var routingItems = {
  "params": [
    {"route": "map", "template": "/smartContainer/html/views/map/map.html"},
    {"route": "realTime", "template": "/smartContainer/html/views/dashboard/realTime.html"},
    {"route": "logs", "template": "/smartContainer/html/views/dashboard/logs.html"},  
    {"route": "historical", "template": "/smartContainer/html/views/dashboard/historical.html"},
    {"route": "tickets", "template": "/smartContainer/html/views/dashboard/tickets.html"},
    {"route": "threshold", "template": "/smartContainer/html/views/dashboard/threshold.html"},
    {"route": "notifications", "template": "/smartContainer/html/views/notifications/notifications.html", controller: "NotificationCtrl as vm"},
    {"route": "logout", "template": "/smartContainer/html/logout.html"},  
  ],
  "otherwiseOption" : {"template": "/"}
};
