angular.module('ACL', ['ui.bootstrap', 'List']);

angular
    .module('ACL')
    .component(
    'scriptrAcl',
    {
        bindings : {

            "users" : "<?",
            
            "defaultSetObject" : "<?",
            
            "onSave" : "&"

        },
        templateUrl: '/UIComponents/dashboard/frontend/UIComponents/Components/ACL/ACL.html',
        controller: function($uibModal) {
            
            var self = this;
            
            this.$onInit = function(){
                console.log("$onInit initialized");
                self.accessType = (self.users.length == 1 && self.users[0].code == "anonymous") ? "Anonymous access" : "Restricted access";
            } 
            
            this.$postLink = function(){
                console.log("$postLink initialized");
            }

            this.openModal = function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: 'lg',
                    component: 'aclPopup',
                    resolve: {
                        widget: function () {
                            return {
                                "parent" : self,
                                "users":  self.users,
                                "defaultSetObject":  self.defaultSetObject,
                                "onSave": self.onSave
                        }
                      }
                   }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log("selectedItem: " +selectedItem);
                }, function () {
                });
            }
        }
    });


angular
  .module('ACL')
  .component('aclPopup', 
  {
    bindings: {
      resolve: '<',
      users: '<?',
      defaultSetObject : "<?",  
      close: '&',
      dismiss: '&'
    },
    templateUrl: '/UIComponents/dashboard/frontend/UIComponents/Components/ACL/myModalContent.html',
    controller: function ($scope, $sce) {
        
      var self = this;
      self.listScope;  
        
      this.$onInit = function(){
         self.users = self.resolve.widget.users;
         self.defaultSetObject = self.resolve.widget.defaultSetObject;
         self.popoverContent = $sce.trustAsHtml('<span style=\'color: #323232;\'><strong>Scriptr.io provides the following predefined groups:</strong><div class=\'mt10 mb5\'><i class=\'fa fa-caret-right text-primary\'></i> authenticated represents anyone with a valid token.</div><div class=\'mb5\'><i class=\'fa fa-caret-right text-primary\'></i> anonymous represents everyone.</div><div class=\'mb5\'><i class=\'fa fa-caret-right text-primary\'></i> nobody represents no one.</div></span>');
      }   
        
      this.onSelect = function(user){
          self.resolve["modalScope"] = this;
          if(user.originalObject[this.titleField] == "anonymous"){
             this.disableInput = true; 
             this.hideObjects = true;
             self.showMsg = true;
          }
      }
      
      this.removeAnonymousAccess = function(){
           self.showMsg = false;
           self.resolve["modalScope"].disableInput = false; 
           self.resolve["modalScope"].hideObjects = false; 
           var anonymous = [{
            code : "anonymous",
            icon : "fa fa-group"    
           }];
           $scope.$broadcast('angucomplete-alt:addObjectToList', self.id, anonymous);
      }
      
      this.addAnonymousAccess = function(){
           self.showMsg = false;
           self.resolve["modalScope"].disableInput = false; 
           self.resolve["modalScope"].hideObjects = false;
           
           var objs = [];
           for(var i = 0; i < self.resolve["modalScope"].objects.length; i++){
               if(self.resolve["modalScope"].objects[i].code != "anonymous"){
                   objs.push(self.resolve["modalScope"].objects[i]);
               }
           }
           $scope.$broadcast('angucomplete-alt:addObjectToList', self.id, objs);
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
      
      this.updateFileACL = function(){
          
          if(!self.listScope){
             self.listScope = $scope.$broadcast('angucomplete-alt:getSetObjects', self.id); 
          }
          var listCtrl = self.listScope.targetScope.$$childTail.$ctrl;
          if(typeof self.resolve.widget.onSave() == "function"){
              var acls = [];
              if(typeof listCtrl.objects == 'undefined') listCtrl.objects = self.resolve["modalScope"].objects;
              if(listCtrl.objects.length > 0){
                  var objs = listCtrl.objects;
              }else{
                  var objs = self.resolve.widget.defaultSetObject;
              }
              for(var i = 0; i < objs.length; i++){
                  acls.push(objs[i].code);
              }
              listCtrl.showList = false;
              self.resolve.widget.onSave()(acls).then(
                 function(data, response) {
                     listCtrl.showList = true;
                     self.showAlert("success", "The Access Control List is saved successfully.");
                     self.resolve.widget.parent.users = listCtrl.objects;
                     self.resolve.widget.parent.accessType = (listCtrl.objects.length == 1 && listCtrl.objects[0].code == "anonymous") ? "Anonymous access" : "Restricted access";
                     console.log("success");
              },
              function(err) {
                  listCtrl.showList = true;  
                  self.showMsg("danger", err.data.response.metadata.errorDetail);
                console.log("reject", err);
              });
          }
          
      }
        
      this.onCancel = function (myForm) {
        this.dismiss({$value: 'cancel'});
        console.log("Dissmisseddd");
      };

    }
});
