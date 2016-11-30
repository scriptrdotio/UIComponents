angular.module('Management').component('container', {
   templateUrl : '/UIComponents/userManagement/frontend/components/devices/container.html',
   controllerAs : 'vm',
   controller : function($scope, _) {
	   var self = this;
	   self.isLoading = true;
	   $scope.$on('editDevice', function(event, data) {
		   console.log(data); // 'Some data'
		   $scope.$broadcast('loadDeviceDetails', data);
	   });
     
     	$scope.$on('addDevice', function(event, data) {
		   $scope.$broadcast('loadDeviceDetails', {});
	   });
   },
   bindings: {
     'title': '@title'
   }
});