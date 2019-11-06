angular.module('Speedometer', [ 'meterGauge' ]);

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
           
            if(this.theme == "speed" || typeof this.theme == 'undefined'){
                 this.speedoConfig.gaugeRadius = (this.gaugeRadius) ? this.gaugeRadius : 150;
                 this.speedoConfig.minVal = (this.minValue)? this.minValue : 0;
                 this.speedoConfig.maxVal = (this.maxValue)? this.maxValue : 220;
                 this.speedoConfig.needleVal= (this.needleVal)? Math.round(this.needleVal) : ((this.data) ? Math.round(this.data) : 0 );
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
         }
         
         
        this.calculateGaugeRadius = function(){
            self.timeoutId = null;
            var h = $element.parent().height();
            var w = $element.parent().width();
            if(h == 0) {
                self.speedoConfig.gaugeRadius = (w / 2);
            } else {
                self.speedoConfig.gaugeRadius = (w >= h) ? ((h / 2)) : ((w / 2))
            }
        }
        
        this.$postLink = function() {
      	  $timeout(function() {
      		  if(!self.gaugeRadius) {
      			  self.calculateGaugeRadius();
      			  angular.element($window).on('resize', function() {
                    if (self.timeoutId != null) {
                		$timeout.cancel(self.timeoutId);
              		}
                 	self.timeoutId = $timeout(self.calculateGaugeRadius, 100);
      			  });
      		  }
      		  self.renderGauge();
      		  $scope.$watch(function( $scope ) {
                    if($scope.$ctrl.needleVal){
                      self.speedoConfig.needleVal = $scope.$ctrl.needleVal;
                    }
	                 return(JSON.stringify(self.speedoConfig));
	               },function(newVal){
	               self.renderGauge()
	           });
      		  initDataService(self.transport);
      	  }, 500); 
        }
         
        this.$onDestroy = function() {
            if(!this.gaugeRadius) angular.element($window).off('resize');
            if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
            
            if(self.refreshTimer){
                  $interval.cancel( self.refreshTimer );
             }
        }
        
        this.renderGauge = function() {
           angular.element($element).html("")
           this.speedo = angular.element(document.createElement("meter-gauge"));
           this.speedo.attr("gaugeconfig", JSON.stringify(this.speedoConfig));
           var el = $compile( this.speedo )( $scope );
           angular.element($element).append( el );
        }

        var initDataService = function(transport) {
             if((transport == "wss" && (this.api || this.msgTag)) || (transport == "https" && this.api)) {
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
            } else {
                $scope.$emit("waiting-for-data");
                $scope.$on("update-data", function(event, data) {
                    if(data && data[self.serviceTag])
                        self.consumeData(data[self.serviceTag]);
                    else
                        self.consumeData(data);
                });
            }
          }

          this.consumeData = function(data, response) {
            if(typeof self.onFormatData() == "function"){
              data = self.onFormatData()(data);
            }
             data = parseInt(data);
            if(typeof data == "number" && data.toString() != "NaN"){
              data = data;
            }else{
              data = 0;
            }
            this.speedoConfig.needleVal = Math.round(data);
          }
        }
	});
