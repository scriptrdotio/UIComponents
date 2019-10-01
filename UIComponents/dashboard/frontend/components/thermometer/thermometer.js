angular.module('Thermometer', ['angularThermometer']);

angular
      .module('Thermometer')
      .component(
            'scriptrThermometer',
            {

               bindings : {
                  
                  "onLoad" : "&onLoad",

                  "api" : "@",
                 
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
                   
                  "fetchDataInterval": "@",

                  "useWindowParams": "@"
                   
               },
               templateUrl : '/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
               controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval, dataService) {

	               var self = this;
                   self.showSelectStream = self.api ? false: true;

	               this.$onInit = function() {
                       
	               	  this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                      this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;
              		  this.customSectors = (this.customSectors && this.customSectors.length > 0) ? this.customSectors : [{"color": "#CC5464", "lo": 0, "hi": 30}, {"color": "#FCC717", "lo": 30, "hi": 60}, {"color": "#38B9D6", "lo": 60, "hi": 90}];

                       //remove empty objects from the array
                       if(this.customSectors)
                      	 	this.customSectors = _.reject(this.customSectors, _.isEmpty);
                       
                       this.outOfRangeColor = this.outOfRangeColor ? this.outOfRangeColor : "#E90088";
                       
                       //this.value = (this.value) ? ((this.value > 100) ? 100 : this.value) : ((this.data) ? this.data : 0 );
                       
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
                       this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
                       
                       this.style = {};
                       angular.element($window).on('resize', function() {
                           if (self.timeoutId != null) {
                               $timeout.cancel(self.timeoutId);
                           }
                           return self.timeoutId = $timeout(self.resize, 100);
                       });
                       
                       this.consumeData(this.data);

                       initDataService(this.transport);

	               }
                   
                   self.resize = function(){
                       self.timeoutId = null;
                       self.style["margin-left"] = (($element.parent().outerWidth(true)/2) - 50);
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
                          data = this.onFormatData()(data, self);
                      }
                      if(data != null){
                          this.noResults = false;
                          this.value = parseFloat(data);
                          this.mercuryColor = this.evaluateColor(data);
                      }else{
                          this.noResults = true;
                      }
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
