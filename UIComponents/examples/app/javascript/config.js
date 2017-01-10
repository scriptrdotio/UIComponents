var login = {
   redirectTarget: "/UIComponents/examples/app/dashboard.html",
   expiry:1,
   anonymousToken:"UjkyNTI2OTk1RQ=="
};

var menuItems = {
  "mainMenu": "col1",
  "col1": [
    {"id":"1", "iconClass":"fa fa-globe", "label": "dashboard", "route":"#/main", "active":"true"},
    {"id":"2","iconClass":"fa fa-dashboard","label":"Listing","route":"#/listing", "active":"false"},
    {"id":"3","iconClass":"fa fa-dashboard","label":"Denied Destinations","route":"#/deniedDestinations", "active":"false"},
    {"id":"4", "iconClass":"fa fa-bell-o", "label": "Groups Management", "route": "#/groups","active":"false"},
    {"id":"5", "iconClass":"fa fa-cogs", "label": "Generic Rule", "route": "#/gr","active":"false"}
  ]
};

var headerItems = {
  "logo": "//www.dcgroup.com/~dcgroupc/images/logo.jpg",
  "items": [
    {"icon": "fa fa-ticket", "label": "item1", "route":"#/item1"},
    {"icon": "fa fa-ticket", "label": "item2", "route":"#/item2"},
    {"icon": "fa fa-ticket", "label": "item3", "route":"#/item3"}
  ],
  "logout": {"icon": "fa fa-sign-out", "label": "Sign out", "route":"#/logout"}
};

var routingItems = {
  "params": [
    {"route": "main", "template": "/UIComponents/examples/app/views/main.html"},
    {"route": "listing", "template": "/UIComponents/examples/app/views/listing.html"},
    {"route": "deniedDestinations", "template": "/UIComponents/examples/app/views/deniedDestinations.html"},
    {"route": "groups", "template": "/UIComponents/examples/app/views/groups.html"},
    {"route": "logout", "template": "/UIComponents/layout/frontend/examples/app/logout.html"},
    {"route": "item1", "template": "/UIComponents/layout/frontend/examples/app/item1.html"}
  
  ],
  "otherwiseOption" : {"template": "/"}
};
