var menuItems = {
  "mainMenu": "col1",
  "col1": [
    {"id":"4", "iconClass":"fa fa-globe", "label": "Users Management", "route":"#/usermanagement", "active":"true"},
    {"id":"5","iconClass":"fa fa-dashboard","label":"Listing","route":"#/load", "active":"false", "sub": "col3"},
    {"id":"2", "iconClass":"fa fa-bell-o", "label": "Notifications", "route": "#/notif","active":"false"},
    {"id":"3", "iconClass":"fa fa-cogs", "label": "Generic Rule", "route" : "#/gr","active":"false"}
  ],
  "col3": [
    {"id":"6", "iconClass":"fa fa-dashboard", "label":"Logs", "route":"#/logs", "active":"false"},
    {"id":"7", "iconClass":"fa fa-line-chart", "label": "Historical", "route":"#/hist", "active":"false"},
    {"id":"8", "iconClass":"fa fa-ticket", "label":"Tickets", "route":"#/tickets", "active":"false"}
  ]
};
var headerItems = {
  "logo": "https://blog.scriptr.io/wp-content/uploads/2016/10/logo-1.png",
  "items": [
    {"icon": "fa fa-ticket", "label": "", "route":"#/header1", "class": "pull-left"},
    {"icon": "fa fa-ticket", "label": "", "route":"#/header2", "class": "pull-left"},
    {"icon": "fa fa-ticket", "label": "", "route":"#/header3", "class": "pull-left"}
  ],
  "logout": {"route":"#/logout"}
};

var routingItems = {
  "params": [
    {"route": "usermanagement", "template": "/UIComponents/layout/frontend/examples/app/groups.html"},
    {"route": "logout", "template": "/login/view/logout.html"}
  ],
  "otherwiseOption" : {"template": ""}
};
