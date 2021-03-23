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
                  
                  "height" : "@"
                   
               },
               templateUrl : '/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
               controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval, dataService) {

	               var self = this;
                   self.showSelectStream = self.api ? false: true;

	               this.$onInit = function() {
                       
                      this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/thermometer-bg.svg";
                      this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data"; 
                      this.hasData = (!isNaN(parseFloat(this.value)) && isFinite(this.value)) ?  true : false;
	               	  this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                      this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;
              		  this.customSectors = (this.customSectors && this.customSectors.length > 0) ? this.customSectors : [{"color": "#CC5464", "lo": 0, "hi": 30}, {"color": "#FCC717", "lo": 30, "hi": 60}, {"color": "#38B9D6", "lo": 60, "hi": 90}];

                       //remove empty objects from the array
                       if(this.customSectors)
                      	 	this.customSectors = _.reject(this.customSectors, _.isEmpty);
                       
                       this.outOfRangeColor = this.outOfRangeColor ? this.outOfRangeColor : "#E90088";
                       
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
                       
                       this.transport = (this.transport) ? this.transport : null;
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
                       
                       this.style = {};
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
                           $scope.$on("update-data", function(event, data) {
                               if(data == null) { //typeOf data == 'undefined' || data === null
                                   if(self.value == null) {
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
                          self.dataFailureMessage = "Failed to fetch data.";
                          if(self.value != null) {
                              self.stalledData = true;
                              self.dataFailureMessage = "Failed to update data.";
                          }
                      } else {
                          if(typeof this.onFormatData() == "function"){
                              data = self.onFormatData()(data, self);
                          }
                          if(data != null){
                              data = parseFloat(data);
                              if(!isNaN(data) && isFinite(data)){
                                  self.mercuryColor = self.evaluateColor(data);
                                  self.value = (data > self.mercuryMax) ? self.mercuryMax : data;
                                  self.percent = parseInt((data - self.minSectorValue) * self.height / (self.mercuryMax - self.minSectorValue));
                                  self.hasData = true;
                                  self.noResults = false;
                              	  self.stalledData = false;
                                  self.timeout = true;  
                              } else {
                                  self.noResults = true;
                                  if(self.value != null) {
                                      self.stalledData = true;
                                  } 
                                  self.dataFailureMessage = "Failed to update data, invalid data format.";
                              }
                          } else{
                              self.noResults = true;
                              if(self.value != null) { ////typeOf value !== 'undefined' || data !== null
                             	  self.stalledData = true;
                         	  } 
                          }
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
