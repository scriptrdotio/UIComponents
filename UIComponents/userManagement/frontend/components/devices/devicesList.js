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
      
    this.$onInit = function() {
        $scope.$on("reloadDevicesList", function(event, data) {
            self.listDevices()
        })
    }
    
    this.listDevices = function() {
      managementService.listDevices().then(
        function(data, response) {
          self.isLoading = false;
          if(data.status == "failure") {
             self.setAlert(data.errorDetail, "danger")
          } else {
            self.devices = _.flatten(_.pluck(data, "id"));
          }
          console.log("resolve", data)
        },
        function(err) {
          self.isLoading = false;
          self.setAlert(JSON.stringify(err), "danger")
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
             self.setAlert(data.errorDetail, "danger")
          } else {
            if(data.status == "success") {
              self.devices = angular.copy(_.reject(self.devices, function(device){ return device == deviceId; }));
              console.log(self.devices);
              self.setAlert("Device deleted successfully", "success")
            }
          }
          console.log("resolve", data)
        },
        function(err) {
          self.isLoading = false;
          self.setAlert(JSON.stringify(err), "danger")
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
    
    this.setAlert = function(message, type) {
        self.message = {"content": message, "type": type};
    }
    
    this.closeAlert = function() {
        self.message = null;
    }
  }
});
