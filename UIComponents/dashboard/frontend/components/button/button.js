angular.module('Button', ['ngAnimate', 'angularPromiseButtons']);

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
            
            "data": "@",
            "transport": "@",
            "api" : "@",
            "msgTag" : "@",
            "httpMethod": "@",
            "apiParams" : "<?",
            "onFormatData" : "&",
            "useWindowParams": "@",
            "serviceTag": "@",

            "actionTransport" : "@",
            "actionApi" : "@",
            "actionApiParams": "<?",  
            "actionUseWindowParams": "@",
            "actionHttpMethod": "@",

        },
        templateUrl : '/UIComponents/dashboard/frontend/components/button/button.html',
        controller : function($scope, $q, $element, $window, $timeout, httpClient, wsClient,dataService) {

            var self = this;

            this.$onInit = function() {
                
                this.label = (this.label) ? this.label : "Click";
                
                
                this.transport = (this.transport) ? this.transport : null;
                this.actionParams = (this.actionParams != "undefined") ? this.actionParams : ((this.apiParams) ? this.apiParams : {});
                this.msgTag = (this.msgTag) ? this.msgTag : null;
                this.type = (this.type) ? this.type : "btn-success";
                this.size = (this.size) ? this.size : "";
                this.class = this.type + " " + this.size;
                
                this.style = {};
                
            }
            
             this.$postLink = function() {
                //Load initial data
                initDataService(this.transport); 

                if(this.data && !this.api) {
                    self.timeout = false; 
                    $timeout(function() {
                        if(self.timeout == false) {
                            self.consumeData(self.data);
                        }
                    }, 2000);
                } else {
                    self.timeout = true;
                }
            }     
            
            self.call = function (transport) {
                
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
               if (data.msg == 'SUCCESS') {
                   if (typeof self.onSuccess() == "function") {
                       self.onSuccess()(self);
                   }
               } else {
                   if (typeof self.onFailure() == "function") {
                       self.onFailure()(self);
                   }
               }
               self.consumeData(data);
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
                         if(data && data[self.serviceTag])
                            self.consumeData(data[self.serviceTag]);
                        else
                            self.consumeData(data);
                    });
                }
            }
                  
            
            this.$onDestroy = function() {
            	if(self.msgTag){
                    wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                }
                
                if(self.refreshTimer){
                    $interval.cancel( self.refreshTimer );
                }
            }
            
            
             this.consumeData = function(data, response) {
                 self.timeout = true;   
                 if(typeof this.onFormatData() == "function"){
                     data = this.onFormatData()(data, self);
                 }
             }
            
            self.click = function () {
                if(typeof this.onButtonclick() == "function"){
                    this.onButtonclick()(self);
                } 
                var requestInfo = {
                    "api": (self.actionApi) ? self.actionApi : self.api,
                    "transport": (self.actionTransport) ? (self.actionTransport) : self.transport,
                    "apiParams": self.actionApiParams,
                    "useWindowParams": (self.actionUseWindowParams) ? self.actionUseWindowParams : self.useWindowParams,
                    "httpMethod": (self.actionHttpMethod) ? self.actionHttpMethod : self.httpMehtod
                };
                dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));
            };

            
        }
    });
