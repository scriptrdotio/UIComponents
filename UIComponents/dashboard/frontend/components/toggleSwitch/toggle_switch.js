angular.module('ToggleSwitch', ['DataService', 'toggle-switch', 'ui.bootstrap', 'ComponentsCommon', 'DataService']);

angular
      .module('ToggleSwitch')
      .component(
            'scriptrToggleSwitch',
            {

               bindings : {

                  "onLoad" : "&onLoad",
                  "type" : "@", 
                  "size": "@", 
                  "class" : "@", 
                  "data": "<?", 
                  "switchStatus" : "<?",
                  "onLabel" : "@",
                  "offLabel" : "@",
                  "knobLabel" : "@",
                  "isDisabled" : "<?",
                  "onSwitchChange" : "&", 
                  "icon": "@",
                  "loadingMessage": "@", 
				  "transport": "@",
                  "api" : "@",
                  "msgTag" : "@",
                  "httpMethod": "@",
                  "apiParams" : "<?",
                  "onFormatData" : "&",
                  "fetchDataInterval": "@",
        		  "useWindowParams": "@",
                  "serviceTag": "@",
                   
                  "actionTransport" : "@",
                  "actionApi" : "@",
                  "actionApiParams": "<?",  
                  "actionUseWindowParams": "@",
                  "actionHttpMethod": "@"
               },
               templateUrl : '/UIComponents/dashboard/frontend/components/toggleSwitch/toggle_switch.html',
               controller : function($scope, $element, $window, $timeout, httpClient, wsClient,dataService, $interval) {

	               var self = this;

	               this.$onInit = function() {
                     
                       
                      this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/toggle-switch-bg.svg";
                      this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data"; 
               		  this.hasData = (this.switchStatus === false || this.switchStatus === true) ?  true : false;
                       
                       //For backward compatibility 
                       if((this.switchStatus === false || this.switchStatus === true) && !this.data) {
                           this.data = {"state": this.switchStatus}
                       } else if(this.data && (this.data.state === false || this.data.state === true)) {
                           this.switchStatus = null;
                       }
                    
                       this.onLabel = (typeof this.onLabel != "undefined") ? this.onLabel : "on";
                       this.offLabel = (typeof this.offLabel != "undefined") ? this.offLabel : "off";
                       this.knobLabel = (typeof this.knobLabel != "undefined") ? this.knobLabel : "";
                       this.disabled = (typeof this.isDisabled != "undefined") ? this.isDisabled : false;
                       this.type = (typeof this.type != "undefined") ? this.type : "switch-success";
                       this.size = (typeof this.size != "undefined") ? this.size : "switch-large";
                       
                       this.actionParams = (this.actionParams != "undefined") ? this.actionParams : ((this.apiParams) ? this.apiParams : {});
                       
                       this.class = this.type + " " + this.size;
                       
                       this.transport = (this.transport) ? this.transport : null;
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       
                       this.style = {};
	               }
                   
                  this.$postLink = function() {
                      
                      self.timeoutId = $timeout(self.resize.bind(self), 100);
                      angular.element($window).on('resize', self.onResize);
                      
                      if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {
                          self.timeout = true;
                          initDataService(this.transport);
                      } else {
                          self.timeout = false; 
                          if(self.data) {
                              $timeout(function() {
                                  if(self.timeout == false) {
                                      self.consumeData(self.data);
                                  }
                              }, 2000);
                          }

                          //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                          $scope.$watch(function( $scope ) {
                              // wait for the timeout
                              if(($scope.$ctrl.data && self.timeout == true)){
                                  return $scope.$ctrl.data
                              }
                          },function(newVal, oldVal){
                              if(JSON.stringify(newVal) != JSON.stringify(oldVal)){
                                  self.consumeData(newVal);
                              }
                          });

                          //Listen on update-data event to build data
                          $scope.$on("update-data", function(event, data) {
                          		if(data == null) { //No static data, and update-data returned with no data stop waiting
                                    if(self.data == null) {
                                         self.noResults = true;
                                    }
                                } else {
                                      if(data[self.serviceTag])
                                          self.consumeData(data[self.serviceTag]);
                                      else if(!self.serviceTag)
                                          self.consumeData(data);
                                }
                          });
                          $scope.$emit("waiting-for-data");
                      }
                      
                  }   
                  
                  
                   this.$onDestroy = function() {
                       if(self.msgTag){
                           wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                       }
                       
                       if(self.refreshTimer){
                            $interval.cancel( self.refreshTimer );
                        }
                       
                       if (self.timeoutId != null) {
                           $timeout.cancel(self.timeoutId);
                       }
                       
                       angular.element($window).off('resize', self.onResize);
                   }
                   
                 this.onResize = function() {
                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }
                    self.timeoutId = $timeout(self.resize.bind(self), 100);
                }
                 
                 this.resize = function() {
                       this.calculateNotificationsDisplay();
                  }
                  
                 this.calculateNotificationsDisplay = function(stalledData) {
                       if($element.parent().innerWidth() < 240) {
                           self.usePopover = true;
                       } else {
                            self.usePopover = false;
                       }
                      
                  }

	              var initDataService = function(transport) {
                           var requestInfo = {
                               "api": self.api,
                               "transport": transport,
                               "msgTag": self.msgTag,
                               "apiParams": self.apiParams,
                               "useWindowParams": self.useWindowParams,
                               "httpMethod": self.httpMethod,
                               "widgetId": $scope.$id
                           };
                           dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));

                            if(self.fetchDataInterval && !self.refreshTimer) {
                                //Assuming this is success
                                self.refreshTimer = $interval(
                                    function(){
                                        initDataService(self.transport)
                                    }, self.fetchDataInterval * 1000);
                            }
				  }
                  
                  this.consumeData = function(data, response) {
                       if(data && data.status && data.status == "failure") {
                             self.noResults = true;
                          	 self.dataFailureMessage = "Failed to load toggle state.";
                             if(self.switchStatus === false || self.switchStatus === true) {
                                 self.stalledData = true;
                                 self.dataFailureMessage =  "Failed to update toggle state.";
                             } 
                             
                         } else {
                             if(typeof self.onFormatData() == "function"){
                                 data = self.onFormatData()(data, self);
                             }
                             if(data != null) {
                                 if(typeof data == "object" && data.hasOwnProperty("state")) {
                                     var state = data.state;
                                     var getBoolean = function (value){
                                         switch(value){
                                             case true:
                                             case "true":
                                             case 1:
                                             case "1":
                                             case "on":
                                             case "yes":
                                                 return true;
                                             default: 
                                                 return false;
                                         }
                                     }
                                     
                                     self.switchStatus = getBoolean(state);
                                     
                                     self.hasData = true;
                                     self.noResults = false;
                                     self.stalledData = false;
                                     self.timeout = true; 
                                     
                                     var disabled = data.disabled;
                                     if(disabled != null){
                                         self.isDisabled = disabled;
                                     }
                                 } else {
                                     self.noResults = true;
                                     if(self.switchStatus === false || self.switchStatus === true) {
                                         self.stalledData = true;
                                         self.dataFailureMessage = "Toggle state update data is invalid.";
                                     } 
                                     self.dataFailureMessage = "Toggle state data is invalid.";
                                 }
                             } else {
                                 self.noResults = true;
                                 self.dataFailureMessage = "Failed to load toggle state.";
                                 if(self.switchStatus === false || self.switchStatus === true) {
                                     self.stalledData = true;
                                     self.dataFailureMessage = "Failed to update toggle state.";
                                 } 
                           }
	              }
               }
                  
                  
              this.publishData = function(){
                       if(!self.isDisabled){
                           if(typeof self.onSwitchChange() == "function"){
                               self.onSwitchChange()(self.switchStatus);
                           } 
                           if(typeof self.actionApiParams == 'undefined'){
                               self.actionApiParams = {};
                           }
                           self.actionApiParams["value"] = self.switchStatus;
                               
                           var requestInfo = {
                               "api": (self.actionApi) ? self.actionApi : self.api,
                               "transport": (self.actionTransport) ? (self.actionTransport) : self.transport,
                               "apiParams": self.actionApiParams,
                               "useWindowParams": (self.actionUseWindowParams) ? self.actionUseWindowParams : self.useWindowParams,
                               "httpMethod": (self.actionHttpMethod) ? self.actionHttpMethod : self.httpMehtod
                           };
                           dataService.scriptrRequest(requestInfo, self.consumeActionData.bind(self));
                       }
                   }
                  this.consumeActionData = function(data, response) {
                      if(data.status && data.status == "failure") {
                             self.actionSuccess = false;
                          	 self.actionMessage =  data.errorDetail || "Toggle action failed.";
                             self.consumeData({"state": !self.switchStatus})
                         } else { 
                              self.actionSuccess = true;
                          	  self.actionMessage =  data.successMessage || "Toggle action succeeded.";
                         }
                         $timeout(function() {
                                  self.actionSuccess = null;
                          	 	  self.actionMessage = null;
                          }, 5000);
                  }
   } 
                  
});
