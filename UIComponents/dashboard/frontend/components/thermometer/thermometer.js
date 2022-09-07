angular.module('Thermometer', ['angularThermometer', 'ComponentsCommon', 'DataService']);

angular
      .module('Thermometer')
      .component(
            'scriptrThermometer',
            {

               bindings : {
                  
                  "onLoad" : "&onLoad",
                   
                  "transport": "@",
                  "api" : "@",
                  "msgTag" : "@",
                  "httpMethod": "@",
                  "apiParams" : "<?",
                  "onFormatData" : "&",
                  "fetchDataInterval": "@",
        		  "useWindowParams": "@",
                  "serviceTag": "@",
                 
                  "data" : "<?",

                  "step" : "<?", 
                  "loadingMessage": "@", 
                  "customSectors": "<?",
                   
                  "outOfRangeColor": "@",
                   
                  "ticks": "<?",
                  "icon": "@",
                   
                  "percent": "@", 
                   
                  "unit" : "@",
                  
                  "height" : "@",
                   
                  "decimals" : "@", // quantity of decimal numbers to show (int)
                   
                   "applyConversion": "<?",
                   "conversion": "&",
                   "conversionUnit": "@",
                   "resetDataOnConsume": "<?",
                   
                   "displayValue": "<?",
                   
               },
               templateUrl : '/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
               controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval, dataService) {

	               var self = this;
                   self.showSelectStream = self.api ? false: true;

	               this.$onInit = function() {
                       
                      this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/thermometer-bg.svg";
                      
                      this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data";
                      this.stalledDataMessage = (this.stalledDataMessage) ? this.stalledDataMessage : "No data available.";
                      this.dataFailureMessage = (this.dataFailureMessage) ? this.dataFailureMessage : "Failed to fetch data.";
                      this.invalidData = (this.invalidData) ? this.invalidData : "Invalid data format.";

                      this.hasData = (!isNaN(parseFloat(this.value)) && isFinite(this.value)) ?  true : false;
	               	 this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                      this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;
              		  
                       
                       this.outOfRangeColor = this.outOfRangeColor ? this.outOfRangeColor : "#E90088";
                       
                       this.applyConversion =  (this.applyConversion && this.applyConversion == true) ? true : false ;
                       this.step = (self.step) ? self.step : "30";
                       
                       this.height = (this.height) ? this.height : "100";
                       this.decimals = (this.decimals) ? this.decimals : "2";
                       
                       this.customSectors = (this.customSectors && this.customSectors.length > 0) ?  _.reject(this.customSectors, _.isEmpty) : [{"color": "#CC5464", "lo": 0, "hi": 30}, {"color": "#FCC717", "lo": 30, "hi": 60}, {"color": "#38B9D6", "lo": 60, "hi": 90}];
                       
                       this.evaluateTicksSectorsUnitStep()
                       
                       this.transport = (this.transport) ? this.transport : null;
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
                       
                       this.style = {};
	               }
                   
                   this.evaluateTicksSectorsUnitStep = function() {
                       
                       if(self.applyConversion  && self.applyConversion == true && self.conversion() && typeof self.conversion() == "function") {
                           this.thermoUnit =  (self.conversionUnit) ? self.conversionUnit : "°F";
                           this._step =  self.conversion()(this.step)
                           self._customSectors = _.map(self.customSectors, function(entry){
                               var tmp = JSON.parse(JSON.stringify(entry))
                               tmp.lo = self.conversion()(entry.lo);
                               tmp.hi = self.conversion()(entry.hi);
                               return tmp;
                           });
                           if(self.value || JSON.stringify(self.value)) {
                              self.beforeConversionValue = self.value;
                              self.value = self.conversion()(self.value).toFixed(self.decimals);
                           }
                           		
                  	   } else {
                           self._customSectors = JSON.parse(JSON.stringify(self.customSectors))
                           self.thermoUnit =  (self.unit) ? self.unit : "°C";
                           this._step = this.step;
                           if((self.value || JSON.stringify(self.value)) && (self.beforeConversionValue && JSON.stringify(self.beforeConversionValue))) {
                               self.value =  self.beforeConversionValue;
                           }
                       }
                       self.calculateTics();                       
                       self.calculateDataVariants(self.value)
                   }
                   
                   this.calculateTics = function(){
                        var lowestTick = this.getLowestTick();
                       var highestTick = this.getHighestTick();
                       
                       var tick = parseInt(lowestTick);
                       this.sectors = [];
                       this.sectors.push(tick);
                       while(tick < highestTick){
                           tick += parseInt(this._step);
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
                   }
                   
                   this.onResize = function() {
                        if (self.timeoutId != null) {
                            $timeout.cancel(self.timeoutId);
                        }
                        self.timeoutId = $timeout(self.resize.bind(self), 100);
                   }
                   
                   self.resize = function(){
                       self.timeoutId = null;
                       self.style["margin-left"] = (($element.parent().outerWidth(true)/2) - 50);
                       self.calculateNotificationsDisplay();
                   }
                   
                   this.$postLink = function () {
                      self.timeoutId = $timeout(self.resize.bind(self), 100);
                      angular.element($window).on('resize', self.onResize);
                       
                      $scope.$watch(function( $scope ) {
                          // wait for the timeout
                          if($scope.$ctrl.applyConversion){
                              return $scope.$ctrl.applyConversion
                          }
                      },function(newVal, oldVal){
                          if(JSON.stringify(newVal) != JSON.stringify(oldVal)){
                              self.evaluateTicksSectorsUnitStep()
                          }
                      });
                       
                      if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                          initDataService(this.transport);
                      } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                          $scope.$watch(function( $scope ) {
                              // wait for the timeout
                              if($scope.$ctrl.data){
                                  return $scope.$ctrl.data
                              }
                          },function(newVal, oldVal){
                              if(JSON.stringify(newVal) != JSON.stringify(oldVal) || !self.hasData){
                                  self.consumeData(newVal);
                              }
                          });
                      } else {  
                           $scope.$on("update-data", function(event, data) {
                               if(data == null) { //typeOf data == 'undefined' || data === null
                                   if(self.value == null) {
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

                this.calculateNotificationsDisplay = function() {
                    if($element.parent().innerWidth() < 240) {
                        self.usePopover = true;
                    } else {
                        self.usePopover = false;
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
                        console.log("timeout inside destroy")
                        $timeout.cancel(self.timeoutId);
                    }
                    
                    angular.element($window).off('resize', self.onResize);
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
                      if(data.status && data.status == "failure") {
                          this.noResults = true;
                          self.dataMessage = this.dataFailureMessage;
                          if(self.value != null) {
                              self.stalledData = true;
                              self.dataMessage = this.dataFailureMessage;
                          }
                      } else {
                          if(typeof this.onFormatData() == "function"){
                              data = self.onFormatData()(data, self, $rootScope);
                          }
                          if(data != null){
                              data = parseFloat(data);
                              if(!isNaN(data) && isFinite(data)){
                                  self.beforeConversionValue = data;
                                  if(self.applyConversion && typeof self.conversion() == "function") {
                                      data = self.conversion()(data).toFixed(self.decimals);
                                  }
                                  self.calculateTics();
                                  self.calculateDataVariants(data);
                                  self.hasData = true;
                                  self.noResults = false;
                              	  self.stalledData = false;
                                  self.timeout = true;  
                              } else {
                                  self.noResults = true;
                                  if(self.resetDataOnConsume) {
                                      self.value =  undefined;
                                      self.stalledData = false;
                                  } else {
                                      if(self.value != null) {
                                          self.stalledData = true;
                                      } 
                                  }
                                  self.dataMessage = this.invalidData;
                              }
                          } else{
                        	  if(self.resetDataOnConsume) {
                        		  self.value =  undefined;
                        		  self.noResults = true;
                        		  self.stalledData = false;
                        	  } else {
	                              self.noResults = true;
	                              if(self.value != null) { ////typeOf value !== 'undefined' || data !== null
	                             	  self.stalledData = true;
	                         	  } 
                        	  }
                              self.dataMessage = this.stalledDataMessage;
                        	  
                          }
                     }
                 }, 
                      
                      
                   this.calculateDataVariants = function(data) {
                	 var copyData = angular.copy(data);
                      self.mercuryColor = self.evaluateColor(copyData);
                      self.value = (copyData > self.mercuryMax) ? self.mercuryMax : copyData;
                      self.percent = parseInt((copyData - self.minSectorValue) * self.height / (self.mercuryMax - self.minSectorValue));
                   }  
                  
                   this.evaluateColor = function(data) {
                     var color = self.outOfRangeColor;
                     _.some(self._customSectors, function(obj){ if( obj.lo <= data &&  data <= obj.hi) {color = obj.color; return true;} });
                      return color;
                   },
                      
                   this.getLowestTick = function(){
                      return _.min(_.pluck(this._customSectors, "lo"));
                   },
                      
                   this.getHighestTick = function(){
                      return _.max(_.pluck(this._customSectors, "hi"));
                   }
               }
            });
