angular.module('Management').component('groupsContainer', {
   template: '<div><h5 class="box-title text-uppercase fntmontessart">{{vm.title}}</h5><groups-list></groups-list><group-details></group-details></div>',
   transclude: true,
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
   controllerAs: 'vm',
   bindings: {
     'title': '@title'
   }
});