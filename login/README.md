# Login Module

## About Login Module:
 
  The login module adds the functionality required to authenticate the application , depends on the regesterd users in the system
## Requirements:
  Scriptr Underscore module
## Add Users to the system
  - login to your scriptr IDE
  - click on the tools menu and navigate to data explorer
  - click on Users tab in the left pane
  - Add, Remove, Edit the system users
## Add the Module to your app
  - click on install module button in the bottme left corner of your IDE screen
  - click on  **Add Custom Module from GitHub**
  - Enter the following info
  -- Owner *scriptrdotio*
  -- Repository *UIComponents*
  -- Path *UIComponents/login*
  -- Branch *master*
  -- Destination Folder *login* , or other specific folder
## Configure the module
  there is two configuration files , API configurations , Constants
  - navigate to ./view/javascript/config.js
  - confige the apis locations 
  - navigate to ./view/javascript/constants.js
  - config the constants
    - appTitle is the title shown in the browser tab
    - login.background is the background image of the login pages
    - login.logo is the logo image to be used
    - login.poweredBy is the link to scriptr.io logo 
