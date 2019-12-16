angular.module('Speedometer', [ 'meterGauge', 'ComponentsCommon', 'DataService' ]);

angular
  .module('Speedometer')
  .component(
     'scriptrSpeedometer',
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
          "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed
        
        "gaugeRadius" : "<?",
        
        "theme" : "@",
        
        "minValue" : "<?",
        
        "maxValue" : "<?",
        
        "needleVal" : "<?",
        "data": "<?",
        
        "tickSpaceMinVal" : "<?",
        
        "tickSpaceMajVal" : "<?",
        
        "gaugeUnits" : "@",
        
        "tickColMaj" : "@",
        
        "tickColMin" : "@",
        
        "outerEdgeCol" : "@",
        
        "pivotCol" : "@",
        
        "innerCol" : "@",
        
        "unitsLabelCol" : "@",
        
        "tickLabelCol" : "@",
        
        "needleCol" : "@",
        
        "defaultFonts" : "@"
        
      },
      templateUrl: '/UIComponents/dashboard/frontend/components/speedometer/speedometer.html',
      controller: function(httpClient, wsClient, $element, $window, $scope, $compile, $timeout, $interval, dataService) {
        
         var self = this;

         this.$onInit = function() {
            this.speedoConfig = {};
           
            this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/speedometer-bg.svg";
                       
             this.hasData = (!isNaN(parseFloat(this.speedoConfig.needleVal)) && isFinite(this.speedoConfig.needleVal)) ?  true : false;
             
            if(this.theme == "speed" || typeof this.theme == 'undefined'){
                 this.speedoConfig.gaugeRadius = (this.gaugeRadius) ? this.gaugeRadius : 150;
                 this.speedoConfig.minVal = (this.minValue)? this.minValue : 0;
                 this.speedoConfig.maxVal = (this.maxValue)? this.maxValue : 220;
                // this.speedoConfig.needleVal= (this.needleVal)? Math.round(this.needleVal) : ((this.data) ? Math.round(this.data) : 0 );
                 this.speedoConfig.tickSpaceMinVal= (this.tickSpaceMinVal)? this.tickSpaceMinVal : 10;
                 this.speedoConfig.tickSpaceMajVal= (this.tickSpaceMajVal)? this.tickSpaceMajVal : 20;
                 this.speedoConfig.gaugeUnits= (this.gaugeUnits)? this.gaugeUnits : "kmh";
                 this.speedoConfig.tickColMaj=(this.tickColMaj)? this.tickColMaj : '#C64DFF';
                 this.speedoConfig.tickColMin= (this.tickColMin)? this.tickColMin : '#999999';
                 this.speedoConfig.outerEdgeCol=(this.outerEdgeCol)? this.outerEdgeCol : '#f4f4f4';
                 this.speedoConfig.pivotCol=(this.pivotCol)? this.pivotCol : '#434a54';
                 this.speedoConfig.innerCol=(this.innerCol)? this.innerCol : '#ffffff';
                 this.speedoConfig.unitsLabelCol=(this.unitsLabelCol)? this.unitsLabelCol : '#C64DFF';
                 this.speedoConfig.tickLabelCol=(this.tickLabelCol)? this.tickLabelCol : '#656D78';
                 this.speedoConfig.needleCol=(this.needleCol)? this.needleCol : '#C64DFF';
                 this.speedoConfig.defaultFonts=(this.defaultFonts)? this.defaultFonts : '';
            }else if(this.theme == "rpm"){
                 this.speedoConfig.gaugeRadius = (this.gaugeRadius)? this.gaugeRadius : 120;
                 this.speedoConfig.minVal= (this.minValue)? this.minValue : 0;
                 this.speedoConfig.maxVal= (this.maxValue)? this.maxValue : 1000;
                 this.speedoConfig.needleVal= (this.needleVal)? Math.round(this.needleVal) : ((this.data) ? Math.round(this.data) : 0 );
                 this.speedoConfig.tickSpaceMinVal= (this.tickSpaceMinVal)? this.tickSpaceMinVal : 10;
                 this.speedoConfig.tickSpaceMajVal= (this.tickSpaceMajVal)? this.tickSpaceMajVal : 100;
                 this.speedoConfig.gaugeUnits= (this.gaugeUnits)? this.gaugeUnits : "kmh";
                 this.speedoConfig.tickColMaj=(this.tickColMaj)? this.tickColMaj : '#0194D9';
                 this.speedoConfig.tickColMin= (this.tickColMin)? this.tickColMin : '#999999';
                 this.speedoConfig.outerEdgeCol=(this.outerEdgeCol)? this.outerEdgeCol : '#ffffff';
                 this.speedoConfig.pivotCol=(this.pivotCol)? this.pivotCol : '#434A54';
                 this.speedoConfig.innerCol=(this.innerCol)? this.innerCol : '#ffffff';
                 this.speedoConfig.unitsLabelCol=(this.unitsLabelCol)? this.unitsLabelCol : '#0194d9';
                 this.speedoConfig.tickLabelCol=(this.tickLabelCol)? this.tickLabelCol : '#656D78';
                 this.speedoConfig.needleCol=(this.needleCol)? this.needleCol : '#0194d9',
                 this.speedoConfig.defaultFonts=(this.defaultFonts)? this.defaultFonts : '';
            }
             
             this.speedoConfig.speedoTag = $scope.$id
             
             
             
             this.transport = (this.transport) ? this.transport :  null;
             this.msgTag = (this.msgTag) ? this.msgTag : null;
             this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
             
             
             angular.element($window).on('resize', function() {
                if (self.timeoutId != null) {
                    $timeout.cancel(self.timeoutId);
                }
                self.timeoutId = $timeout(function() {
                    self.renderGauge();
                }, 100);
            });
         }
 
        this.calculateGaugeRadius = function(){
            var h = $element.parent().height(); 
            var w = $element.parent().width();
            if(h == 0) {
                self.speedoConfig.gaugeRadius = (w / 2);
            } else {
                self.speedoConfig.gaugeRadius = (w >= h) ? ((h / 2)) : ((w / 2))
            }
        }
        
        this.calculateNotificationsDisplay = function() {
            if($element.parent().innerWidth() < 240) {
                self.usePopover = true;
            } else {
                self.usePopover = false;
            }
        }  
        
        
        this.renderGauge = function() {
           angular.element($element).find(".speedometer-wrapper").html("");
           self.speedo = angular.element(document.createElement("meter-gauge"));
           self.calculateGaugeRadius();
           self.speedo.attr("gaugeconfig", JSON.stringify(self.speedoConfig));
           this.el = $compile( self.speedo )( $scope );
           angular.element($element).find(".speedometer-wrapper").append( this.el );
        }
        
        this.onResize = function() {
            if (self.timeoutId != null) {
                $timeout.cancel(self.timeoutId);
            }
            self.timeoutId = $timeout(self.resize.bind(self), 100);
        }
        
        this.resize =  function() {
            if(this.speedoConfig.needleVal)
            	self.renderGauge();
            self.calculateNotificationsDisplay();
        }
        
        this.$postLink = function() {
            
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
                        if(self.speedoConfig.needleVal == null) {
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
               if(self.speedoConfig.needleVal) {
                   self.stalledData = true;
                   self.dataFailureMessage = "Failed to update data.";
               }
           } else {
               if(typeof self.onFormatData() == "function"){
                   data = self.onFormatData()(data);
               }
               if(data != null){
                  data = parseFloat(data);
                  if(!isNaN(data) && isFinite(data)){
                      self.speedoConfig.needleVal = Math.round(data);
                      
                      self.hasData = true;
                      self.noResults = false;
                      self.stalledData = false;

                      self.renderGauge();
                   }else{
                       self.noResults = true;
                       if(self.speedoConfig.needleVal != null) {
                           self.stalledData = true;
                       } 
                       self.dataFailureMessage = "Failed to update data, invalid data format.";
                   }
               } else {
                   self.noResults = true;
                   if(self.speedoConfig.needleVal != null) {
                       self.stalledData = true;
                   } 
                   self.dataFailureMessage = "Failed to update data, invalid data format.";
               }

           }
          }
        }
	});
