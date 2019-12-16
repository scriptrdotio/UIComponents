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
         type: '@', //info, warning, success, error
    },
    template: '<div class="alert alert-{{type}} scriptr-alert" role="alert"><span ng-bind="msg"></span></div>',
    replace: true
  }
});
