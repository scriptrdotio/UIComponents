angular.module('Thermometer', ['angularThermometer']);

angular
      .module('Thermometer')
      .component(
            'scriptrThermometer',
            {

               bindings : {

                  "onLoad" : "&onLoad",

                  "api" : "@",
                 
                  "percent" : "<?",
                 
                  "size" : "@",
                  
                  "height" : "@",

                  "transport" : "@",

                  "msgTag" : "@",

                  "apiParams" : "<?",
                 
                  "onFormatData" : "&"

               },
               templateUrl : '/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
               controller : function($scope, httpClient, wsClient) {

	               var self = this;

	               this.$onInit = function() {
                     
                       this.percent = (this.percent) ? this.percent : 0;
                     
                       this.transport = (this.transport) ? this.transport : "wss";
		               this.msgTag = (this.msgTag) ? this.msgTag : null;

		               initDataService(this.transport);

	               }
                   
                   this.$onDestroy = function() {
                       console.log("destory Thermometer")
                       if(self.msgTag){
                           wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                       }
                   }

	               var initDataService = function(transport) {
		               if (transport == "wss") {
			               wsClient.onReady.then(function() {
				               // Subscribe to socket messages with id chart
				               if(self.msgTag){
                                 wsClient.subscribe(self.msgTag, self.consumeData.bind(self), $scope.$id);  
                               }
				               if(self.api) {
                                  wsClient.call(self.api, self.apiParams, self.msgTag)
                                   .then(function(data, response) {
                                       self.consumeData(data)
                                   },
                                    function(err) {
                                      console.log( "reject published promise", err);
                                      self.consumeData();
                                    });
				               }
				               
			               });
		               } else {
			               if (transport == "https" && self.api) {
				               httpClient
				                     .get(self.api, self.apiParams)
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

	              this.consumeData = function(data, response) {
                       if(typeof this.onFormatData() == "function"){
                         data = this.onFormatData()(data);
                       }
		               this.percent = parseInt(data);
	               }
               }
            });
