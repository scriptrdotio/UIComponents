# Angular Date Time Picker 
 
  Angular component for displaying progress date visualization.
  
## Requirements:

  Bootstrap
  
  JQuery
  
  Bootstrap.js
  
  AngularJS v1.5.6+
  
  Moment.js
  
  dateTimeInput.js
  
  datetimepicker.css
  
  datetimepicker_directive.js
  
  datetimepicker.templates.js
  
  datetimepicker.js
  
## Getting started:

  Include  bootstrap.css as well as the datetimepicker.css
   
  ```html
     <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
     <link rel="stylesheet" href="/UIComponents/dashboard/frontend/components/datetimepicker/datetimepicker.css">
  ```
  
  Include  JQuery and Bootstrap.js
   
  ```html
     <script src="//code.jquery.com/jquery-1.12.4.js"></script>
     <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  ```

  Include angular JS in your application with moment.js.
  
  ```html
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js" crossorigin="anonymous"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/locale/de.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/locale/zh-cn.js"></script>
  ```
  
    Include Date Time Picker Modules
  
  ```html
    <script type="text/javascript" src="/UIComponents/dashboard/frontend/components/datetimepicker/datetimepicker_directive.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-bootstrap-datetimepicker/1.1.3/js/datetimepicker.templates.min.js"></script>
    <script type="text/javascript" src="/UIComponents/dashboard/frontend/components/datetimepicker/dateTimeInput.js"></script>
    <script type="text/javascript" src="/UIComponents/dashboard/frontend/components/datetimepicker/datetimepicker.js"></script>
  ```
  
  Add "DateTimePicker" to your app module's dependency
  
  ```javascript
  angular.module("myApp", ["Thermometer"])
  ```
  
## Options:

 check the options [here](./properties.md).
  
## Component usage:

scriptr-date-time-picker is an element component. you will just have to add it in your html view and add its relevant options.

Example where data is static

 ```html
     <scriptr-date-time-picker
         type="range"
         start-date-config="{ startView:'day', minView:'day' }"
         end-date-config="{ startView:'day', minView:'day' }"
         date-helper="vm.dateHelper"      
         start-date-label="date 1"     
         end-date-label="date 2" 
         start-date-on-set-time="vm.startDateOnSetTime"
         end-date-on-set-time="vm.endDateOnSetTime"
                  >
  </scriptr-date-time-picker>
  ```
  