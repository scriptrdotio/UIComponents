angular.module('Gauge', [ 'frapontillo.gage' ,'ComponentsCommon', 'DataService']);

angular
      .module('Gauge')
      .component(
            'scriptrGauge',
            {

               bindings : {

                  "onLoad" : "&onLoad",
                  "icon": "@",
                   
                  "transport": "@",
                  "api" : "@",
                  "msgTag" : "@",
                  "httpMethod": "@",
                  "apiParams" : "<?",
                  "onFormatData" : "&",
                  "fetchDataInterval": "@",
                  "useWindowParams": "@",
                  "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed



                  "valueFontColor" : "@", // color of the value text (string)

                  "min" : "@", // minimum value (float)

                  "max" : "@", // maximum value (float)

                  "hideMinMax" : "@", // hide min and max values (bool)

                  "hideValue" : "@", // hide value text (bool)

                  "showInnerShadow" : "<?", // show inner shadow

                  "gaugeColor" : "@", // background color of gauge element (string)

                  "gaugeValue" : "<?", //value to show (float)
                  "data" : "<?",
                  
                  "customSectors": "<?", // array of objects with color, hi, lo attributes ([ of object])

                  "shadowSize" : "@", // inner shadow size (int)

                  "shadowOpacity" : "@", // shadow opacity, values 0 ~ 1 (int)

                  "label" : "@", // text to show below value (string)

                  "labelFontColor" : "@", // color of label under the value (string)

                  "startAnimationType" : "@", // type of initial animation (linear, >, <, <>, bounce) (string)

                  "refreshAnimationType" : "@", // type of refresh animation (linear, >, <, <>, bounce) (string)
                 
                   /** Title removed in latest justgage revision 1.2.9 **/ 
                  "title" : "@", // gauge title text
                 
                  "titleFontColor" : "@", // color of the title text
                   
                  "titleBackgroundColor": "@",
                   
                  "titleMargin": "@",
                   
                  "titleFontWeight": "@", // weight of the title's font
                   
                  "titleShadow": "@", 
                 
                  "titleFontFamily" : "@", // font-family of the title text
                 
                  "titlePosition" : "@", // "left", "center", or "right"
                   
                  "titleFontSize" : "@", // absolute minimum font size for the title
                   
                  "titleTextTransform": "@",
                   
                  "titlePadding": "@",
                   
                  "titleHeight": "@",
                 
                  "valueFontFamily" : "@", // font-family of the value text (string)
                 
                  "relativeGaugeSize" : "@", // true if the gauge has to grow with the container (bool)
                 
                  "valueMinFontSize" : "@", // absolute minimum font size for the value (int)
                 
                  "hideMinMax" : "@",
                 
                  "labelMinFontSize" : "@", // absolute minimum font size for the label
                 
                  "minLabelMinFontSize" : "@", // absolute minimum font size for the minimum label
                 
                  "maxLabelMinFontSize" : "@", // absolute minimum font size for the maximum label
                 
                  "gaugeWidthScale" : "@", // width of the gauge element (float)
                 
                  "shadowVerticalOffset" : "@", // how much is shadow offset from top (int)
                 
                  "levelColors" : "@", // array of strings, colors of indicator, from lower to upper, in hex format (string[])
                 
                  "noGradient" : "@", // true to use sector-based color change, false to use gradual color change (bool)
                 
                  "startAnimationTime" : "@", // length of initial load animation (int)
                 
                  "refreshAnimationTime" : "@", // length of refresh animation (int)
                 
                  "donut" : "@", // turn the gauge into a full circle donut (bool)
                 
                  "donutStartAngle" : "@", // angle to start from when in donut mode (int)
                 
                  "reverse" : "@", // if true, max and min are swapped (with max appearing on the left, min on the right) boolean
                 
                  "decimals" : "@", // quantity of decimal numbers to show (int)
                 
                  "symbol" : "@", // unit of measure that will be appended to value (string)
                 
                  "formatNumber" : "@", // whether to format numbers (bool)
                 
                  "humanFriendly" : "@", // true to show shorthand big numbers (300K instead of 300XXX) bool
                 
                  "humanFriendlyDecimal" : "@", // number of decimal places for our human friendly number to contain (int)
                 
                  "textRenderer" : "&", // function applied before rendering text (func)
                 
                  "onAnimationEnd" : "&", // function applied after animation is done (func)
                 
                  "pointer" : "<?", // show value pointer

                  "counter" : "@", // increase numbers one by one (bool)
               },
               templateUrl : '/UIComponents/dashboard/frontend/components/gauge/gauge.html',
               controller : function($scope, httpClient, wsClient, $interval, dataService, $timeout, $window, $element) {

	               var self = this;

	               this.$onInit = function() {
	               	   
                       //if(this.data)
		               //this.gaugeValue = (this.gaugeValue) ? this.gaugeValue : ((this.data) ? this.data : 0 );
		               
                       this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/gauge-bg.svg";
                       
                      this.hasData = (!isNaN(parseFloat(this.gaugeValue)) && isFinite(this.gaugeValue)) ?  true : false;
                       
		               this.customSectors = (this.customSectors) ? this.customSectors : {  percents: true, ranges: []};
		               this.valueFontColor = (this.valueFontColor) ? this.valueFontColor
		                     : "#999";
		               this.min = (this.min) ? this.min : 0;
		               this.max = (this.max) ? this.max : 100;
		               this.hideMinMax = (this.hideMinMax) ? this.hideMinMax
		                     : false;
		               this.hideValue = (this.hideValue) ? this.hideValue : false;
		               this.gaugeColor = (this.gaugeColor) ? this.gaugeColor
		                     : "#e9e9e9";
		               this.shadowSize = (this.shadowSize) ? this.shadowSize : 0;
		               this.label = (this.label) ? this.label : "";
		               this.labelFontColor = (this.labelFontColor) ? this.labelFontColor
		                     : "#666";
		               this.startAnimationType = (this.startAnimationType) ? this.startAnimationType
		                     : "linear";
		               this.refreshAnimationType = (this.refreshAnimationType) ? this.refreshAnimationType
		                     : "linear";
		               this.counter = (this.counter) ? this.counter : true;

		               this.transport = (this.transport) ? this.transport : null;
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
                       this.relativeGaugeSize = true;
                       
                       //title attributes
                       this.titleFontSize = this.titleFontSize ? this.titleFontSize : "17px";
                       this.titlePosition = this.titlePosition ? this.titlePosition : "center";
                       this.titleFontFamily = this.titleFontFamily ? this.titleFontFamily : "";
                       this.titleFontColor = this.titleFontColor ? this.titleFontColor : "#000";
                       this.titleShadow = this.titleShadow ? this.titleShadow : "";
                       this.titleFontWeight = this.titleFontWeight ? this.titleFontWeight : "bold";
                       this.titleBackgroundColor = this.titleBackgroundColor ? this.titleBackgroundColor : "";
                       this.titleTextTransform = this.titleTextTransform ? this.titleTextTransform : "capitalize";
                       this.titlePadding = this.titlePadding ? this.titlePadding : "10px";
                       this.titleHeight = this.titleHeight ? this.titleHeight : "40px";
                       this.titleMargin = this.titleMargin ? this.titleMargin : "0";
	               }
                   
                 this.$postLink = function () {
                     
                   	self.timeoutId = $timeout(self.resize.bind(self), 100);
                    angular.element($window).on('resize', self.onResize);
                   	if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                        initDataService(this.transport);
                    } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                        $scope.$watch(function( $scope ) {
                            // wait for the timeout
                            if( (!isNaN(parseFloat($scope.$ctrl.data)) && isFinite($scope.$ctrl.data)) ){
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
                             if(data == null) { //typeOf data == 'undefined' || data === null
                                   if(self.gaugeValue == null) {
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

                this.calculateNotificationsDisplay = function() {
                    if($element.parent() && $element.parent().innerWidth() < 240) {
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
                         self.noResults = true;
                         self.dataFailureMessage = "Failed to fetch data.";
                         if(self.gaugeValue) {
                             self.stalledData = true;
                             self.dataFailureMessage = "Failed to update data.";
                         }
                    } else {
                        if(typeof self.onFormatData() == "function"){
                          data = self.onFormatData()(data, self);
                        }
						if(data != null){
                            data = parseFloat(data);
                            if(!isNaN(data) && isFinite(data)){
                                self.gaugeValue = data;
                                
                                self.hasData = true;
                                self.noResults = false;
                                self.stalledData = false;
                            } else {
                                  self.noResults = true;
                                  if(self.gaugeValue != null) {
                                      self.stalledData = true;
                                  } 
                                  self.dataFailureMessage = "Failed to update data, invalid data format.";
                              }
                        } else {
                            self.noResults = true;
                            if(self.gaugeValue != null) {
                                 self.stalledData = true;
                             } 
                            self.dataFailureMessage = "Failed to update data, invalid data format.";
                            console.log(e);
                        }
                        
                    }
               }
            }
 });
