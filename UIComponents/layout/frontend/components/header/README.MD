# Angular Header 
 
  Angular directive for displaying header info in the dashboard.
  
  It shows logo and user info and options. 

## Requirements:

  Bootstrap.css
  
  Bootstrap font-awesome
    
  Underscore
  
  AngularJS v1.5.6+
  
## Getting started:

  Include styles
  
   ```html
    <link rel="stylesheet" href="/UIComponents/layout/frontend/components/header/header.css">
  ```

  Include underscore and angular JS
  
  ```html
  <script src="/UIComponents/layout/frontend/components/header/header.js"></script>
  ```
## Options:

| Option        | Default value   | Description   | Required   |
| ------------- |:-------------:|:-------------:|:-------------:|
  headerItems | [] | Array of the header items | yes
  class | "" | css classes string | no
  user | {} | Object contains at least login value and the user groups | yes
  onHeaderItemClick | "" | function to handle the header Item click event| yes
## Sample: 
```html
<header-top class="" user="vm.user" on-header-item-click="vm.onHeaderItemClick" header-items="vm.headerItems"></header-top>

```

## Options Samples
```javascript

var headerItems = {
    "logo": "https://i.ibb.co/TmfS643/logo-450.png",
    "items": [],
    "subitems": [
        {"id":"1", "iconClass":"fa fa-bell", "label": "Notification Settings", "route":"#/notifications", "active":"false"},
        {"id":"2", "iconClass":"fa fa-bell", "label": "Change Password", "route":"#/changePassword", "active":"false"} 
    ], 
    "logout": {"icon": "fa fa-sign-out", "label": "Logout", "route":"#/logout"},
  "appname":"CxC App Factory"
};

var user={"name":"admin","login":"admin","groups":["admin","editor"]};

```
