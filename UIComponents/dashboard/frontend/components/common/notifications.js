angular.module('ComponentsCommon', ['ui.bootstrap', 'pascalprecht.translate']);

angular
  .module('ComponentsCommon')
  .component(
     'scriptrNotifications',
     {
  
      bindings : {
        "hasData": "<?",
        "noResults": "<?",
        "stalledData": "<?",
        "usePopover": "<?",
        "loadingMessage": "@",
        "failureMessage": "<?",
        "actionMessage": "<?",
        "actionSuccess": "<?",
        "icon": "<?"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/common/notifications.html',
      controller: function($translate, $rootScope, $scope) {
         var self = this;
          
         this.$onInit = function() {
		 $translate.use($rootScope.lang);
      	 }
         
          this.$postLink = function () {
            
        }

                      

        
        }
	});
