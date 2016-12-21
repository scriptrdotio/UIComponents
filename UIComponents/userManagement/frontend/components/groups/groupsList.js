angular.module('Management')
  .component('groupsList', {
  bindings: {
    title: '<title',
    groups: '<groups',
    message: '@message'
  },
  templateUrl: '/UIComponents/userManagement/frontend/components/groups/groupsList.html',
  controller: function($scope, _ , managementService){
    var self = this;
    self.isLoading = true;
    this.listGroups = function() {
      managementService.listGroups().then(
        function(data, response) {
          self.isLoading = false;
          if(data.status == "failure") {
            self.message =  data.errorDetail
          } else {
            self.groups = _.flatten(_.pluck(data, "name"));
          }
          console.log("resolve", data)
        },
        function(err) {
          self.isLoading = false;
          self.message =  JSON.stringify(err)
          console.log("reject", err);
        }
      );
    }
    this.deleteGroup = function(id) {
      var self = this;
      var groupId = id;
      managementService.deleteGroup(id).then(
        function(data, response) {
          self.isLoading = false;
          if(data && data.status == "failure") {
            self.message =  data.errorDetail
          } else {
            if(data.status == "success") {
              self.groups = angular.copy(_.reject(self.groups, function(group){ return group == groupId; }));
              console.log(self.groups);
            }
          }
          console.log("resolve", data)
        },
        function(err) {
          self.isLoading = false;
          self.message =  JSON.stringify(err)
          console.log("reject", err);
        }
      );
    }
    
    this.editGroup = function(id) {
      $scope.$emit('editGroup', {
        "id": id 
      });
    };
    
    this.addGroup =  function() {
       $scope.$emit('addGroup');
    }
  }
});
