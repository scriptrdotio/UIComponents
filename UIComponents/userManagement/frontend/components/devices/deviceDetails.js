angular
      .module('Management')
      .component(
            'deviceDetails',
            {
               bindings : {
                  device : '<device',
                  groups : '<groups',
                  message : '@message',
                  title : '@title'
               },
               templateUrl : '/UIComponents/userManagement/frontend/components/devices/deviceDetails.html',

               controller : function($scope, _, managementService) {
	               var self = this;
	               self.token = null;

	               self.isLoading = true;
	               var originalDevice = angular.copy(this.device);

	               this.$onInit = function() {
		               self.isUpdate = true;
		               if (self.device != null) {
			               self.isUpdate = true;
			               this.loadDevice(self.device);
		               } else {
			               self.isUpdate = false;
			               self.device = {};
		               }
	               };

	               this.generateToken = function(id) {
		               managementService.generateToken(id).then(
		                     function(data, response) {
			                     self.isLoading = false;
			                     if (data.status == "failure") {
				                     self.message = data.errorDetail
			                     } else {
				                     self.token = data;
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
			                     self.message = JSON.stringify(err)
			                     console.log("reject", err);
		                     });
	               }

	               this.renewToken = function(id, token) {
		               managementService.renewToken(id, token).then(
		                     function(data, response) {
			                     self.isLoading = false;
			                     if (data.status == "failure") {
				                     self.message = data.errorDetail
			                     } else {
				                     self.token = data;
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
			                     self.message = JSON.stringify(err)
			                     console.log("reject", err);
		                     });
	               }
	               this.loadDevice = function(id) {
		               if (id) {
			               managementService
			                     .getDevice(id)
			                     .then(
			                           function(data, response) {
				                           self.isLoading = false;
				                           if (data.status == "failure") {
					                           self.message = data.errorDetail
				                           } else {
					                           if (data.token) {
						                           self.token = data.token["apsdb.authToken"]
						                           delete data.token["apsdb.authToken"];
					                           }
                                               if(data.groups) {
                                                 if(_.isArray(data.groups)) {
                                                   data.groups = _.map(data.groups, function(group){ return {"name": group} })
                                                 } else {
                                                   data.groups = [{"name": data.groups}];
                                                 }
                                               }
					                           self.device = data
					                           originalDevice = angular
					                                 .copy(self.device);
				                           }
				                           console.log("resolve", data)
			                           }, function(err) {
				                           self.isLoading = false;
				                           self.message = JSON.stringify(err)
				                           console.log("reject", err);
			                           });
		               } else {
			               this.reset();
		               }

	               }

	               this.submit = function() {
		               var self = this;
		               var data = angular.copy(self.device);
		               data["apsdb.update"] = self.isUpdate;
		               var groups = _.pluck(data.groups, "name");
		               data["groups"] = groups;
		               managementService.saveDevice(data).then(
		                     function(data, response) {
			                     self.isLoading = false;
			                     if (data.status == "failure") {
				                     self.message = data.errorDetail
			                     } else {
				                     self.message = "Device updated successfully."
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
			                     self.message = JSON.stringify(err)
			                     console.log("reject", err);
		                     });
	               }

	               this.reset = function() {
		               this.device = angular.copy(originalDevice);
	               }

	               this.filterGroups = function($query) {
		               return _.filter(self.groups, function(group) {
			               if (group.name.toLowerCase().indexOf(
			                     $query.toLowerCase()) != -1) {
				               return group;
			               }
		               });
	               };

	               this.listGroups = function() {
		               managementService.listGroups().then(
		                     function(data, response) {
			                     if (data.status == "failure") {
				                     self.message = data.errorDetail
			                     } else {
				                     self.groups = data;
			                     }
			                     console.log("resolve", data)
		                     }, function(err) {
			                     self.isLoading = false;
			                     self.message = JSON.stringify(err)
			                     console.log("reject", err);
		                     });
	               }

	               this.isDeviceChanged = function() {
		               return !angular.equals(this.device, originalDevice);
	               }

	               $scope.$on("loadDeviceDetails", function(event, data) {
		               if (data.id) {
			               self.loadDevice(data.id);
		               } else {
			               self.device = {};
			               self.update = false;
			               originalDevice = angular.copy(this.device);
		               }

	               })
               }
            });