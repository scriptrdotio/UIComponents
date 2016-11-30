angular.module('Management').service(
      "managementService",
      function(httpClient) {
        
          this.listUsers = function() {
		      return httpClient
		            .get("UIComponents/userManagement/backend/api/users/listUsers");
	      }
          this.deleteUser = function(id) {
		      return httpClient.post(
		            "UIComponents/userManagement/backend/api/users/deleteUser", {
			            "id" : id
		            });
	      }
          this.getUser = function(id) {
		      return httpClient.get(
		            "UIComponents/userManagement/backend/api/users/getUser", {
			            id : id
		            });
	      }
          this.saveUser = function(data) {
		      return httpClient.post(
		            "UIComponents/userManagement/backend/api/users/saveUser", data)
	      }
          
	      this.listDevices = function() {
		      return httpClient
		            .get("UIComponents/userManagement/backend/api/devices/listDevices");
	      }
          this.deleteDevice = function(id) {
		      return httpClient.post(
		            "UIComponents/userManagement/backend/api/devices/deleteDevice", {
			            "id" : id
		            });
	      }
          this.getDevice = function(id) {
		      return httpClient.get(
		            "UIComponents/userManagement/backend/api/devices/getDevice", {
			            id : id
		            });
	      }
          this.saveDevice = function(data) {
		      return httpClient.post(
		            "UIComponents/userManagement/backend/api/devices/saveDevice", data)
	      }
          this.generateToken = function(id) {
		      return httpClient.post(
		            "UIComponents/userManagement/backend/api/devices/generateToken", {"id": id})
	      }
          
          this.renewToken = function(id, token) {
		      return httpClient.post(
		            "UIComponents/userManagement/backend/api/devices/renewToken", {"id": id, "token": token})
	      }
          
          
	      this.listGroups = function() {
		      return httpClient
		            .get("UIComponents/userManagement/backend/api/groups/listGroups");
	      }
          
          this.deleteGroup = function(id) {
            return httpClient.post(
              "UIComponents/userManagement/backend/api/groups/deleteGroup", {
                "groupName" : id
              });
	      }
          this.getGroup = function(id) {
            return httpClient.get(
                "UIComponents/userManagement/backend/api/groups/getGroup", {
                  id : id
                });
          }
          this.saveGroup = function(data) {
              return httpClient.post(
		            "UIComponents/userManagement/backend/api/groups/saveGroup", data)
          }
      });