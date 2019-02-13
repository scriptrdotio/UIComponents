angular.module('Thermometer', ['angularThermometer']);

angular
      .module('Thermometer')
      .component(
            'scriptrThermometer',
            {

               bindings : {
                   
                  "availableUnits": "<?",

                  "onLoad" : "&onLoad",

                  "api" : "@",
                 
                  "value" : "<?",
                   
                  "data" : "<?",
                 
                  "step" : "<?", 
                   
                  "customSectors": "<?",
                   
                  "outOfRangeColor": "@",
                   
                  "ticks": "<?", 
                   
                  "percent": "@", 
                   
                  "unit" : "@",
                  
                  "height" : "@",

                  "transport" : "@",

                  "msgTag" : "@",

                  "apiParams" : "<?",
                 
                  "onFormatData" : "&",
                   
                  "fetchDataInterval" : "@"
                   
                   
               },
               templateUrl : '/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
               controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval) {

	               var self = this;
                   self.showSelectStream = self.api ? false: true;

	               this.$onInit = function() {
                       
	               	  this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                      this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;
              
              		  this.customSectors = (this.customSectors && this.customSectors.length > 0) ? this.customSectors : [{"color": "#005588", "lo": 0, "hi": 30}, {"color": "#aa241d", "lo": 30, "hi": 60}, {"color": "#ffa500", "lo": 60, "hi": 90}];

                       //remove empty objects from the array
                       if(this.customSectors)
                      	 	this.customSectors = _.reject(this.customSectors, _.isEmpty);
                       
                       this.outOfRangeColor = this.outOfRangeColor ? this.outOfRangeColor : "#5fc100";
                       
                       this.value = (this.value) ? ((this.value > 100) ? 100 : this.value) : ((this.data) ? this.data : 0 );
                       
                       this.thermoUnit =  (this.unit) ? this.unit : "°C";
                       
                       this.height = (this.height) ? this.height : "100";
                                              
                       this.mercuryColor = this.evaluateColor(this.value);
                       
                       this.step = (this.step) ? this.step : "30";
                       
                       var lowestTick = this.getLowestTick();
                       var highestTick = this.getHighestTick();
                       
                       var tick = parseInt(lowestTick);
                       this.sectors = [];
                       this.sectors.push(tick);
                       while(tick < highestTick){
                           tick += parseInt(this.step);
                           this.sectors.push(tick);
                       }
                       
                       this.sectors = (this.sectors) ? this.sectors : [0, 30, 60, 90];
                       
                       this.mercuryMax = _.max(this.sectors);
                       this.minSectorValue = _.min(this.sectors);

                       this.ticks = [];
                       for(var i = 0; i < this.sectors.length; i++){
                           var obj = {};
                           obj["tick"] = this.sectors[i];
                           obj["percent"] = (this.sectors[i] - this.minSectorValue) * this.height / (this.mercuryMax - this.minSectorValue);
                           this.ticks.push(obj);
                       }
                       
                       this.transport = (this.transport) ? this.transport : "wss";
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       
                       this.style = {};
                       angular.element($window).on('resize', function() {
                           if (self.timeoutId != null) {
                               $timeout.cancel(self.timeoutId);
                           }
                           return self.timeoutId = $timeout(self.resize, 500);
                       });
                       
		               initDataService(this.transport);

	               }
                   
                   self.resize = function(){
                       self.timeoutId = null;
                       self.style["margin-top"] = !self.noResults ? (($element.parent().outerHeight(true)/2) - $($element.find(".tg-thermometer")).innerHeight()/2) : 0; 
                       self.style["margin-left"] = !self.noResults ? (($element.parent().outerWidth(true)/2) - 50) : 0;
                   }
                   
                   this.$postLink = function () {
                       $timeout(self.resize,100);
                       if (self.timeoutId != null) {
                           $timeout.cancel(self.timeoutId);
                       }
                       self.timeoutId = $timeout(self.resize, 100);
                       $scope.$watch(function( $scope ) {
                               return $scope.$ctrl.value
                       },function(newVal){
                           if(!isNaN(parseFloat(newVal)) && isFinite(newVal)){
                               newVal = (newVal > $scope.$ctrl.mercuryMax) ? $scope.$ctrl.mercuryMax : newVal;
                               self.percent = parseInt((newVal - $scope.$ctrl.minSectorValue) * $scope.$ctrl.height / ($scope.$ctrl.mercuryMax - $scope.$ctrl.minSectorValue));
                           }
                       });
                   }
                   
                   this.$onDestroy = function() {
                       if(self.msgTag){
                           wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                       }
                       
                       if(self.refreshTimer){
                        	$interval.cancel( self.refreshTimer );
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
                                  wsClient.call(self.api, self._apiParams, self.msgTag)
                                   .then(function(data, response) {
                                      self.showSelectStream = false;
                                      if(self.fetchDataInterval && !self.refreshTimer) {
                                            //Assuming this is success
                                            self.refreshTimer = $interval(
                                                function(){
                                                    initDataService.bind(self)(transport)
                                                }, self.fetchDataInterval * 1000);
                                        }
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
				                     .get(self.api, self._apiParams)
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
                      if(data != null){
                          this.noResults = false;
                          this.value = parseFloat(data);
                          this.mercuryColor = this.evaluateColor(data);
                      }else{
                          this.noResults = true;
                      }
                      self.style["margin-top"] = !self.noResults ? (($element.parent().outerHeight(true)/2) - $($element.find(".tg-thermometer")).innerHeight()/2) : 0; 
                       self.style["margin-left"] = !self.noResults ? (($element.parent().outerWidth(true)/2) - 50) : 0;
	               },
                      
                      
                   this.evaluateColor = function(data) {
                     var color = self.outOfRangeColor;
                     _.some(self.customSectors, function(obj){ if( obj.lo <= data &&  data <= obj.hi) {color = obj.color; return true;} });
                      return color;
                   },
                      
                   this.getLowestTick = function(){
                      return _.min(_.pluck(this.customSectors, "lo"));
                   },
                      
                   this.getHighestTick = function(){
                      return _.max(_.pluck(this.customSectors, "hi"));
                   }
               }
            });
