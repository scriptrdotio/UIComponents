angular.module('ComponentsCommon', ['ui.bootstrap']);

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
      controller: function($scope) {
         var self = this;
          
         this.$onInit = function() {

      	 }
         
          this.$postLink = function () {
            
        }

                      

        
        }
	});
