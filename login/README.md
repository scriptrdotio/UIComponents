# Login Module

## About Login Module: 
  The login module adds the functionality required to authenticate the application , depends on the regesterd users in the system
## Requirements:
  Bootstrap
  
  AngularJS v1.5.6+
  
  JQuery
  
  Scriptr Underscore module
## Add Subdomain
  - login to your scriptr IDE
  - under your user name click account>subdomain
  - enter a subdomain to access login page 
## Add Users to the system
  - login to your scriptr IDE
  - click on the tools menu and navigate to data explorer
  - click on Users tab in the left pane
  - Add at least 1 user to login
## Add the Module to your app
  - click on install module button in the bottom left corner of your IDE screen
  - click on  **Add Custom Module from GitHub**
  - Enter the following info
    - Owner **scriptrdotio**
    - Repository **UIComponents**
    - Path **login**
    - Branch **master**
    - Destination Folder **login** , or other specific folder
## Configure the module
  there are two configuration files: config.js, constants.js
  - navigate to ./view/javascript/config.js
  - config the apis paths 
  - config the redirect paths 
  - navigate to ./login/entities/config
  	- mail fromName is the email sender when sending a forgot password email
  - navigate to ./view/javascript/constants.js
  - config the constants
    - appTitle is the title shown in the browser tab
    - login.background is the background image of the login pages
    - login.logo is the logo image to be used
    - login.poweredBy is the link to scriptr.io logo 
## sample config file
```javascript
var config = {
   redirect: "/apps/carwash/view/index.html",
   loginPage: "/login/view/login.html"
}

var login = {
   loginApi: "/login/api/login",
   validateTokenApi: "/login/api/validateToken",
   validateTokenInterval:30 //in seconds if not set it will default to 30. Sets the interval over which we will call validateTokenApi to check if the token is still valid. This is needed for static pages who don't pass by providers httpClient & wsClient.

};

var forgotPassword = {
    forgotPasswordApi: "/login/api/forgotPassword",
}

var resetPassword = {
    resetPasswordApi: "/login/api/resetPassword",
}


```

## sample constants file
the module depends on angular so we use angular constants

```javascript
myApp.constant("constants", {
  appTitle: "App",
  login: {
    "background": '', 
    "logo": '//scriptr-cdn.s3.amazonaws.com/carwash/images/powered-by-scriptr.png',
    "poweredBy": '//scriptr-cdn.s3.amazonaws.com/carwash/images/powered-by-scriptr.png'
  }
})
```

## sample usage in applications

```
<!-- login includes -->
    <script src="/login/view/javascript/authorization.js"></script>
    <script src="/login/view/javascript/config.js"></script>
```

```
<script type="text/javascript"> 
          
          var authorization  = $.scriptr.authorization(
              {
                  onTokenValid: function(){ }, 
                  loginPage: config.loginPage,
                  validateTokenApi: login.validateTokenApi,
                  validateTokenInterval: login.validateTokenInterval
              }
          );

          angular.module('myApp').controller('myAppCtrl', function($rootScope, $scope, constants, $sce, wsClient, httpClient) {
            
            wsClient.onInvalidAuthentication.then(function(e) {
                authorization.onTokenInvalid() 
            });
              
            httpClient.onInvalidAuthentication.then(function(e) {
                authorization.onTokenInvalid() 
            });
         });
          
     	
    </script>
```

