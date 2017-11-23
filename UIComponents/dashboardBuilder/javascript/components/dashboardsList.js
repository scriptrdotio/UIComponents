angular
  .module('DashboardBuilder')
  .component(
  'dashboardsList',
  {
    bindings : {
      dashboard: "<"
    },
    templateUrl: '/UIComponents/dashboardBuilder/javascript/UIComponents/Components/dashboardsList.html',
    controller: function($scope, $timeout, $sce, $window, httpClient, wsClient, $cookies, config, $uibModal, scriptrService, $route, $routeParams, $q, _) {
      
      this.wsClient = wsClient;
      var self = this;
      self.acls;  
            
      this.$onInit = function() {
        self.loading = true;  
        self.showPanelMsg = false;  
          
        self.users = [{
          code : "anonymous",
          icon : "fa fa-group"    
        }];
          
        this.urlParams = [];
        this.transport = angular.copy(config.transport);
        this.frmGlobalOptions = {
          "destroyStrategy" : "remove",
          "formDefaults": {"feedback": true}
        }
        
        var scriptName = $routeParams.scriptName;
        if(scriptName) {
          this.openEditor(scriptName);
        }
      }  
      
      this.$postLink = function() {
        scriptrService.loadDashboards({}).then(
          function(data, response) {
            if(data && data.documents){
              self.customDashboards = data.documents;
              self.loading = false;
              if(data.documents.length == 0){
                  self.noDashboards = true;
              }  
            }else{
              console.log("No dashboard found.");
              self.loading = false;  
            }
          },
          function(err) {
            self.loading = false;    
            console
              .log(
              "reject published promise",
              err);
          });    
      }

      this.deleteDashboardConfirmation = function(path, name){
        var modalInstance = $uibModal.open({
               controller: 'PopupCont',
               templateUrl: '/UIComponents/dashboardBuilder/javascript/UIComponents/Components/deletePopup.html',
               resolve: {
                   dashboard: function () {
                       return self;
                   },
                   path: function () {
                       return path;
                   },
                   name: function () {
                       return name;
                   }
               }
           });  
      }
      
      this.deleteDashboard = function(path){
        var params = {
          "path" : path,
          "name" : name
        }

        self = this;
       
         scriptrService.deleteDashboard(params).then(
          function(data, response) {
            console.log("Delete success.");
            if(data && data.documents){
                self.customDashboards = data.documents;
                if(data.documents.length == 0){
                    self.noDashboards = true;
                }else{
                    self.noDashboards = false;
                } 
           	     self.showMsg("success", "The dashboard has been deleted successfully.");
            }else{
                if(data && data.errorDetail){
                    self.showMsg("danger", data.errorDetail);
                }else{
                    self.showMsg("danger", "An error has occured");
                }
            }
          },
          function(err) {
            self.showMsg("danger", "An error has occured");
            console
              .log(
              "reject published promise",
              err);
          });
      }
      
      

      this.renameDashboard = function(scriptName, newScriptName){
          
          var d = $q.defer();
         console.log(scriptName, newScriptName)
         if(scriptName != newScriptName) {
            var params = {
              "scriptName" : scriptName,
              "newScriptName" : newScriptName
            }
            var self = this;
             console.log(params)
            scriptrService.renameDashboard
              (params)
              .then(
              function(data, response) {
                if(data && data.documents){
                    self.customDashboards = data.documents;
                    if(data.documents.length == 0){
                        self.noDashboards = true;
                    }else{
                        self.noDashboards = false;
                    } 
                    d.resolve();
                     self.showMsg("success", "The dashboard has been renamed successfully.");
                }else{
                    d.reject()
                    if(data && data.errorDetail){
                        self.showMsg("danger", data.errorDetail);
                    }else{
                        self.showMsg("danger", "An error has occured");
                    }
                }
              },
              function(err) {
                  d.reject()
                self.showMsg("danger", err.data.response.metadata.errorDetail);
                console
                  .log(
                  "reject published promise",
                  err);
              });
             
              return d.promise;
         }
          
      }
      
      this.closeAlert = function() {
         this.show = false;
      };
      
      this.showAlert = function(type, content) {
         this.closeAlert();
         this.message = {
           "type": type,
           "content": content
         }
         this.show = true
      }
      
      this.closeMsg = function() {
          this.showPanelMsg = false;
      };

      this.showMsg = function(type, content) {
          this.closeMsg(); 
          this.message = {
              "type": type,
              "content": content
          }
          this.showPanelMsg = true;
      }
       
      this.openEditor = function(scriptName){
        this.model = {"scriptName": scriptName};
        var self = this;
        scriptrService.getScript(this.model).then(
          function(data, response) {
            self.postLoadScript(scriptName, data);
          }, function(err) {
            console.error("reject", err);
          });
      }
}});


// Please note that the close and dismiss bindings are from $uibModalInstance.
angular.module('DashboardBuilder').controller('PopupCont', ['$scope','$uibModalInstance',function ($scope, $uibModalInstance) {
    $scope.name =  $scope.$resolve.name;
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.ondeleteDashboard = function () {
        this.$resolve.dashboard.deleteDashboard(this.$resolve.path);
        $uibModalInstance.dismiss('cancel'); 
    };            
}]);

