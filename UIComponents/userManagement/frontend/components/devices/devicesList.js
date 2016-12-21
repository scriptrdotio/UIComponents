angular.module('Management')
  .component('devicesList', {
  bindings: {
    title: '<title',
    devices: '<devices',
    message: '@message',
    onDelete: '&',
    onUpdate: '&'
  },
  templateUrl: '/UIComponents/userManagement/frontend/components/devices/devicesList.html',
  controller: function($scope, _ , managementService){
    var self = this;
    self.isLoading = true;
    this.listDevices = function() {
      managementService.listDevices().then(
        function(data, response) {
          self.isLoading = false;
          if(data.status == "failure") {
            self.message =  data.errorDetail
          } else {
            self.devices = _.flatten(_.pluck(data, "id"));
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
    this.deleteDevice = function(id) {
      var self = this;
      var deviceId = id;
      managementService.deleteDevice(id).then(
        function(data, response) {
          self.isLoading = false;
          if(data && data.status == "failure") {
            self.message =  data.errorDetail
          } else {
            if(data.status == "success") {
              self.devices = angular.copy(_.reject(self.devices, function(device){ return device == deviceId; }));
              console.log(self.devices);
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
    
    this.editDevice = function(id) {
      $scope.$emit('editDevice', {
        "id": id 
      });
    },
      
    this.addDevice =  function() {
       $scope.$emit('addDevice');
    }
  }
});
