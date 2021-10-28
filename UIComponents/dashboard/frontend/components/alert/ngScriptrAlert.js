/**
 * Display box to show messages
 * Depends on bootstrap CSS.
**/
angular.module('angular-scriptrui', []).directive('ngScriptrAlert', function() {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {                        // Isolate scope
         msg: '=ngModel',
         type: '@', //info, warning, success, error,
		 time: '@',
		 title: '@'
    },
    template: '<div class="alert alert-{{type}} scriptr-alert" role="alert"><span ng-if="time" class="time">{{time}}</span><span ng-bind="msg" class="message"></span></div>',
    replace: true
  }
});
