angular.module('Thermometer', ['angularThermometer']);

angular
      .module('Thermometer')
      .component(
            'scriptrThermometer',
            {

               bindings : {

                  "onLoad" : "&onLoad",

                  "api" : "@",
                 
                  "value" : "<?",
                   
                  "data" : "<?",
                 
                  "size" : "@",
                   
                  "sectors" : "<?", 
                   
                  "colors": "<?", 
                   
                  "ticks": "<?", 
                   
                  "percent": "@", 
                   
                  "cols": "@", 
                   
                  "max" : "<?", 
                   
                  "unit" : "@",
                  
                  "height" : "@",

                  "transport" : "@",

                  "msgTag" : "@",

                  "apiParams" : "<?",
                 
                  "onFormatData" : "&"

               },
               templateUrl : '/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
               controller : function($scope, $window, $element, $timeout, httpClient, wsClient) {

	               var self = this;

	               this.$onInit = function() {
                     
                       this.value = (this.value) ? (this.value > 100) ? 100 : this.value : ((this.data) ? this.data : 0 );
                       
                       this.unit = (this.unit) ? this.unit : "°C";
                       
                       this.max = (this.max) ? this.max : 100;
                       
                       this.height = (this.height) ? this.height+"px" : "92%",
                       
                       this.colors = (this.colors) ? this.colors : ["#2196F3", "#8BC34A", "#F44336"];
                       
                       this.cols = this.colors.toString();
                       
                       this.sectors = (this.sectors) ? this.sectors : [0, 25, 50, 75, 100];
                       this.ticks = [];
                       for(var i = 0; i < this.sectors.length; i++){
                           if(this.sectors[i] < this.max && this.sectors[i] >= 0){
                               var obj = {};
                               obj["tick"] = this.sectors[i];
                               obj["percent"] = parseInt(this.sectors[i] * 100 / this.max);
                               this.ticks.push(obj);
                           }
                       }
                     
                       this.transport = (this.transport) ? this.transport : "wss";
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       
                       this.style = {};
                       angular.element($window).on('resize', function() {
                           if (self.timeoutId != null) {
                               $timeout.cancel(self.timeoutId);
                           }
                           return self.timeoutId = $timeout(self.resize, 100);
                       });

		               initDataService(this.transport);

	               }
                   
                   self.resize = function(){
                       self.timeoutId = null;
                       self.style["margin-top"] = ($element.parent().outerHeight(true)/2) - ($element.outerHeight(true)/2);
                       self.style["margin-left"] = ($element.parent().outerWidth(true)/2) - 50;
                   }
                   
                   this.$postLink = function () {
                       $scope.$watch(function( $scope ) {
                           if(($scope.$ctrl.value)){
                               return $scope.$ctrl.value
                           }
                       },function(newVal){
                           if(newVal){
                               newVal = (newVal > $scope.$ctrl.max) ? $scope.$ctrl.max : newVal;
                               self.percent = parseInt(newVal * 100 / $scope.$ctrl.max);
                           }
                       });
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
		               this.value = parseInt(data);
	               }
               }
            });
