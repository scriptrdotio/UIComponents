angular.module('ToggleSwitch', ['DataService', 'toggle-switch']);

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
                  "switchStatus" : "<?",
                  "onLabel" : "@",
                  "offLabel" : "@",
                  "knobLabel" : "@",
                  "isDisabled" : "<?",
                  "onSwitchChange" : "&", 
                   
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
               controller : function($scope, $element, $window, $timeout, httpClient, wsClient,dataService) {

	               var self = this;

	               this.$onInit = function() {
                     
                       this.switchStatus = (typeof this.switchStatus != "undefined") ? this.switchStatus : false;
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
                   
                   this.$onDestroy = function() {
                       if(self.msgTag){
                           wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                       }
                       
                       if(self.refreshTimer){
                            $interval.cancel( self.refreshTimer );
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
                           dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));
                       }
                   }
                  
                  this.$postLink = function() {
                      //Load initial state of toggle switch
                      initDataService(this.transport);
                      
                      if(this.data && !this.api) {
                          self.timeout = false; 
                          $timeout(function() {
                              if(self.timeout == false) {
                                self.consumeData(self.data);
                              }
                           }, 2000)
                       }else{
                           self.timeout = true;
                       }
                  }   

	              var initDataService = function(transport) {
		               if((transport == "wss" && (this.api || this.msgTag)) || (transport == "https" && this.api)) {
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
                        } else {
                            $scope.$emit("waiting-for-data");
                            $scope.$on("update-data", function(event, data) {
                                if(data[self.serviceTag])
                                    self.consumeData(data[self.serviceTag]);
                                else
                                    self.consumeData(data);
                            });
                        }
				  }
                   
	              this.consumeData = function(data, response) {
                       self.timeout = true;  
                       if(typeof this.onFormatData() == "function"){
                         data = this.onFormatData()(data, self);
                       }
                       var status = data.status;
                       var disabled = data.disabled;
                       if(status == true|| status == "true"){
                           self.switchStatus = true;
                       }
                       
                       if(status == false|| status == "false"){
                           self.switchStatus = false;
                       }
                      
                       if(typeof disabled != 'undefined'){
                         self.isDisabled = disabled;
                       }
	               }
               }
            });
