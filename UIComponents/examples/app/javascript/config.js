var login = {
   redirectTarget: "/UIComponents/examples/app/dashboard.html",
   expiry:1,
   anonymousToken:"UjkyNTI2OTk1RQ=="
};

var menuItems = {
  "mainMenu": "col1",
  "col1": [
    {"id":"4", "iconClass":"fa fa-globe", "label": "dashboard", "route":"#/main", "active":"true"},
    {"id":"6","iconClass":"fa fa-dashboard","label":"Listing","route":"#/load", "active":"false"},
    {"id":"5","iconClass":"fa fa-dashboard","label":"Denied Destinations","route":"#/deniedDestinations", "active":"false"},
    {"id":"2", "iconClass":"fa fa-bell-o", "label": "Groups Management", "route": "#/groups","active":"false"},
    {"id":"3", "iconClass":"fa fa-cogs", "label": "Generic Rule", "route": "#/gr","active":"false"}
  ]
};

var headerItems = {
  "logo": "//www.dcgroup.com/~dcgroupc/images/logo.jpg",
  "items": [
    {"icon": "fa fa-ticket", "label": "", "route":"#/logout", "class": "pull-left"},
    {"icon": "fa fa-ticket", "label": "", "route":"#/logout", "class": "pull-left"},
    {"icon": "fa fa-ticket", "label": "", "route":"#/logout", "class": "pull-left"}
  ],
  "logout": {"route":"#/logout"}
};

var routingItems = {
  "params": [
    {"route": "main", "template": "/UIComponents/examples/app/views/main.html"},
    {"route": "deniedDestinations", "template": "/UIComponents/examples/app/views/deniedDestinations.html"},
    {"route": "groups", "template": "/UIComponents/examples/app/views/groups.html"},
    {"route": "logout", "template": "/UIComponents/layout/frontend/examples/app/logout.html"}
  
  ],
  "otherwiseOption" : {"template": "/"}
};
