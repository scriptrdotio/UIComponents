angular.module('Button', ['ngAnimate', 'angularPromiseButtons', 'ui.bootstrap', 'ComponentsCommon', 'DataService']);

angular
    .module('Button')
    .component(
    'scriptrButton',
    {

        bindings : {
            
            "size": "@",
            "isDisabled": "<?",
            "label" : "@",
            "type" : "@",
            "onButtonclick" : "&",
            "onSuccess": "&",
            "onFailure": "&",
            
            "data": "<?",
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
            "actionHttpMethod": "@",

        },
        templateUrl : '/UIComponents/dashboard/frontend/components/button/button.html',
        controller : function($scope, $q, $element, $window, $timeout, httpClient, wsClient,dataService, $interval) {

            var self = this;

            this.$onInit = function() {
                
                
               this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/button-bg.svg";
                       
               this.hasData = (this.label != null && this.label != "") ?  true : false;
                
                //For backward compatibility 
                if(this.label && !this.data) {
                    this.data = {"label": this.label}
                } else if(this.data && this.data.label) {
                    this.label = null;
                } 
                
                //this.label = (this.label) ? this.label : "Click";
                
                
                this.transport = (this.transport) ? this.transport : null;
                this.actionParams = (this.actionParams != "undefined") ? this.actionParams : ((this.apiParams) ? this.apiParams : {});
                this.msgTag = (this.msgTag) ? this.msgTag : null;
                this.type = (this.type) ? this.type : "btn-success";
                this.size = (this.size) ? this.size : "";
                this.class = this.type + " " + this.size;
                
                this.style = {};
                
            }
            
             this.$postLink = function() {
                 
                self.timeoutId = $timeout(self.resize.bind(self), 100);
                angular.element($window).on('resize', self.onResize);
                 
                if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                    initDataService(this.transport);
                } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                    $scope.$watch(function( $scope ) {
                        // wait for the timeout
                        if($scope.$ctrl.data){
                            return $scope.$ctrl.data
                        }
                    },function(newVal, oldVal){
                        if(JSON.stringify(newVal)){
                            self.consumeData(newVal);
                        }
                    });
                } else {
                    //Listen on update-data event to build data
                    $scope.$on("update-data", function(event, data) {
                        if(data == null) {
                            if(self.label == null  || self.label == "") {
                                 self.noResults = true;
                            }
                        } else {
                            if(data[self.serviceTag])
                                self.consumeData(data[self.serviceTag]);
                            else
                                self.consumeData(data);
                        } 
                    });
                    $scope.$emit("waiting-for-data");
                }
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
            
            
            this.consumeData = function(data, response) {
                  if(data && data.status && data.status == "failure") {
                      self.noResults = true;
                      self.dataFailureMessage = "Failed to load button label.";
                      if(self.label) {
                          self.stalledData = true;
                          self.dataFailureMessage = "Failed to update button label.";
                      } 
                   } else {
                       if(typeof self.onFormatData() == "function"){
                           data = self.onFormatData()(data, self);
                       }	
                       if(data != null) {
                          if(typeof data == "object"  && data.hasOwnProperty("label")) {
                               self.label = data.label;
                               self.hasData = true;
                               self.noResults = false;
                               self.stalledData = false;
                           } else {
                               self.noResults = true;
                               if(self.label != null && self.label != "") {
                                   self.stalledData = true;
                               } 
                               self.dataFailureMessage = "Failed to update data, invalid data format.";
                           }
                       } else {
                           self.noResults = true;
                           if(self.label != null  && self.label != "") {
                               self.stalledData = true;
                           } 
                           self.dataFailureMessage = "Failed to update data, invalid data format.";

                       }
	              }
             }
            
            
            self.click = function (transport) {
                if(!self.isDisabled){
                    var requestInfo = {
                        "api": (self.actionApi) ? self.actionApi : self.api,
                        "transport": (self.actionTransport) ? (self.actionTransport) : self.transport,
                        "apiParams": self.actionApiParams,
                        "useWindowParams": (self.actionUseWindowParams) ? self.actionUseWindowParams : self.useWindowParams,
                        "httpMethod": (self.actionHttpMethod) ? self.actionHttpMethod : self.httpMehtod
                    };
                    dataService.scriptrRequest(requestInfo, self.onClickCallback.bind(self));
                }
            }
            
            
            self.onClickCallback = function(data, response) {
                if(data.status && data.status == "failure") {
                    self.actionSuccess = false;
                    self.actionMessage = data.errorDetail || "Click action failed.";
                } else { 
                    self.actionSuccess = true;
                    self.actionMessage = data.successMessage || "Click action succeeded.";
                }
                $timeout(function() {
                    self.actionSuccess = null;
                    self.actionMessage = null;
                }, 10000);
           }

            
        }
    });
