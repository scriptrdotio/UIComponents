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
                   
                  "resize": "<?",

                  "api" : "@",
                 
                  "switchStatus" : "<?",
                 
                  "onLabel" : "@",
                  
                  "offLabel" : "@",

                  "knobLabel" : "@",
                   
                  "isDisabled" : "<?",

                  "msgTag" : "@",

                  "apiParams" : "<?",
                   
                  "onSwitchChange" : "&", 
                   
                  "publishApi": "@",   
                 
                  "onFormatData" : "&"

               },
               templateUrl : '/UIComponents/dashboard/frontend/components/toggleSwitch/toggle_switch.html',
               controller : function($scope, $element, $window, $timeout, httpClient, wsClient) {

	               var self = this;

	               this.$onInit = function() {
                     
                       this.switchStatus = (typeof this.switchStatus != "undefined") ? this.switchStatus : false;
                       this.onLabel = (typeof this.onLabel != "undefined") ? this.onLabel : "on";
                       this.offLabel = (typeof this.offLabel != "undefined") ? this.offLabel : "off";
                       this.knobLabel = (typeof this.knobLabel != "undefined") ? this.knobLabel : "";
                       this.disabled = (typeof this.isDisabled != "undefined") ? this.isDisabled : false;
                       this.type = (typeof this.type != "undefined") ? this.type : "switch-success";
                       this.size = (typeof this.size != "undefined") ? this.size : "switch-large";
                       this.resize = (typeof this.resize != "undefined") ? this.resize : true;
                       
                       this.class = this.type + " " + this.size;
                       
                     
                       this.transport = (this.transport) ? this.transport : "wss";
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       
                       this.style = {};
                       angular.element($window).on('resize', resize);

		               initDataService(this.api, self.apiParams, this.transport);

	               }
                   
                   this.publishData = function(){
                       if(typeof this.onSwitchChange() == "function"){
                           this.onSwitchChange()(self.switchStatus);
                       } 
                       if(typeof self.publishApiParams == 'undefined'){
                           self.publishApiParams = {};
                       }
                       self.publishApiParams["value"] = this.switchStatus;
                       initDataService(self.publishApi, self.publishApiParams, self.transport);
                   }
                   
                   var resize = function(){
                       if(self.resize){
                           self.style["margin-top"] = ($element.parent().height()/2) - ($element.parent().position().top/2) - ($element.height()/2);
                       }
                   }

                   this.$postLink = function() {
                       $timeout(resize,100);
                   }    

	                var initDataService = function(api, params, transport) {
		               if (transport == "wss") {
			               wsClient.onReady.then(function() {
				               // Subscribe to socket messages with id chart
                               
				               wsClient.subscribe(self.msgTag, self.consumeData.bind(self), $scope.$id);
				               if(api) {
                                  wsClient.call(api, params, self.msgTag)
                                   .then(
                                    function(data, response) {
                                       self.consumeData(data)
                                   },
                                   function(err) {
                                    console.log( "reject published promise", err);
                                    self.consumeData();
                                  });
				               }
				               
			               });
		               } else {
			               if (transport == "https" && api) {
                               if(self.httpsMethod == "post"){
				               httpClient
				                     .post(api, params)
				                     .then(
				                           function(data, response) {
					                           self.consumeData(data)
				                           },
				                           function(err) {
					                           console
					                                 .log(
					                                       "reject published promise",
					                                       err);
				                           });
                           }else{
                               httpClient
				                     .get(api, params)
				                     .then(
				                           function(data, response) {
					                           self.consumeData(data)
				                           },
				                           function(err) {
					                           console
					                                 .log(
					                                       "reject published promise",
					                                       err);
				                           });
                           }
			               }
		               }
	               }
                   
	              this.consumeData = function(data, response) {
                       if(typeof this.onFormatData() == "function"){
                         data = this.onFormatData()(data);
                       }
                       if(data == true || data == false || data == "true" || data == "false"){
                           this.switchStatus = data;
                       }
	               }
               }
            });
