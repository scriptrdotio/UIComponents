# Angular Menu 
 
  Angular directive for displaying menu info in the dashboard.

## Requirements:

  Bootstrap.css
  
  Bootstrap font-awesome
    
  Underscore
  
  AngularJS v1.5.6+
  
## Getting started:

  Include styles
  
   ```html
    
    <link rel="stylesheet" href="/UIComponents/layout/frontend/components/menu/menu.css">  
  ```

  Include underscore and angular JS
  
  ```html
  
    <script src="/UIComponents/layout/frontend/components/menu/menu.js"></script>
  ```
## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  headerItems | [] | Array of the header items | yes
  user | {} | Object contains at least login value and the user groups | yes
  onHeaderItemClick | "" | function to handle the header Item click event| yes
## Sample: 
```html
<menu class="menu-wrap" user="vm.user" on-menu-item-click="vm.onMenuItemClick" menu-items="vm.menuItems"></menu>

```

## Options Samples
```javascript

var menuItems = {
  "mainMenu": "menu1",
  "menu1": [
    { "id": "1", "iconClass": "fa fa-fw fa-map", "label": "Map", "route": "#/map", "active": "true",roles:["admin"] },
    { "id": "2", "iconClass": "fa fa-fw fa-sliders", "label": "Dashboard", "route": "#/dashboard-home", "active": "false" },
    { "id": "2", "iconClass": "fa fa-fw fa-file", "label": "Reports", "route": "#/reports", "active": "false" ,roles:["admin"]},
    { "id": "2", "iconClass": "fa fa-fw fa-warning", "label": "Alerts", "route": "#/alerts", "active": "false" },
    { "id": "2", "iconClass": "fa fa-fw fa-info-circle", "label": "Info", "route": "#/info", "active": "false" },
  ]
};

var user={"name":"admin","login":"admin","groups":["admin","editor"]};

```
