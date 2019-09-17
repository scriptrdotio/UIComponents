angular.module('ToggleSwitch', ['toggle-switch']);

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
                   
                  "api" : "@",
                 
                  "switchStatus" : "<?",
                 
                  "onLabel" : "@",
                  
                  "offLabel" : "@",

                  "knobLabel" : "@",
                   
                  "isDisabled" : "<?",

                  "msgTag" : "@",

                  "apiParams" : "<?",
                   
                  "onSwitchChange" : "&", 
                   
                  "publishApiParams": "<?",  
                   
                  "enableResize": "<?",
                 
                  "onFormatData" : "&",
                   "transport": "@",

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
                       this.enableResize = (typeof this.enableResize != "undefined") ? this.enableResize : true;
                       
                       this.class = this.type + " " + this.size;
                       
                     	console.log(this.transport);
                       this.transport = (this.transport) ? this.transport : "wss";
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       
                       this.style = {};
                       angular.element($window).on('resize', function() {
                           if (self.timeoutId != null) {
                           	$timeout.cancel(self.timeoutId);
                         	}
                        	 return self.timeoutId = $timeout(self.resize, 100);
                        });

		               initDataService(this.api, self.apiParams, this.transport);

	               }
                   
                   this.$onDestroy = function() {
                       console.log("destory toggle switch")
                       angular.element($window).off('resize');
                       if(self.msgTag){
                           wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                       }
                   }
                   
                   this.publishData = function(){
                       if(!this.isDisabled){
                           if(typeof this.onSwitchChange() == "function"){
                               this.onSwitchChange()(self.switchStatus);
                           } 
                           if(typeof self.publishApiParams == 'undefined'){
                               self.publishApiParams = {};
                           }
                           self.publishApiParams["value"] = this.switchStatus;
                           initDataService(self.api, self.publishApiParams, self.transport);  
                       }
                   }
                   
                   self.resize = function(){
                       if(self.enableResize){
                           self.timeoutId = null;
                           self.style["margin-top"] = ($element.parent().outerHeight(true)/2) - ($element.outerHeight(true)/2);
                       }
                   }
                  
                  this.$postLink = function() {
                       $timeout(self.resize,100);
                       if (self.timeoutId != null) {
                       	$timeout.cancel(self.timeoutId);
                     	}
                    	self.timeoutId = $timeout(self.resize, 100);
                  }   
                  
                  

	                var initDataService = function(api, params, transport) {
		               dataService.getData(transport, self.api, self.apiParams, self.useWindowParams, self.msgTag, self.consumeData.bind(self), self.fetchDataInterval, $scope.$id);

                            if(self.fetchDataInterval && !self.refreshTimer) {
                                //Assuming this is success
                                self.refreshTimer = $interval(
                                    function(){
                                        initDataService(self.transport)
                                    }, self.fetchDataInterval * 1000);
                            }
	               }
                   
	              this.consumeData = function(data, response) {
                       if(typeof this.onFormatData() == "function"){
                         data = this.onFormatData()(data);
                       }
                       var status = data.status;
                       var disabled = data.disabled;
                       if(status == true || status == false || status == "true" || status == "false"){
                           this.switchStatus = data;
                       }
                       if(typeof disabled != 'undefined'){
                         this.isDisabled = disabled;
                       }
	               }
               }
            });
