angular.module('Management').component('groupContainer', {
   template: "<div></div>",
   controller : function($scope, _) {
	   var self = this;
	   self.isLoading = true;
	   $scope.$on('editGroup', function(event, data) {
		   console.log(data); // 'Some data'
		   $scope.$broadcast('loadGroupDetails', data);
	   });
     
     	$scope.$on('addGroup', function(event, data) {
		   $scope.$broadcast('loadGroupDetails', {});
	   });
   },
   bindings: {
     'title': '@title'
   }
});