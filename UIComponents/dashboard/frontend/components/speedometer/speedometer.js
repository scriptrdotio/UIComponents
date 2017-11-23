angular.module('Speedometer', [ 'meterGauge' ]);

angular
  .module('Speedometer')
  .component(
     'scriptrSpeedometer',
     {
  
      bindings : {
          
        "onLoad" : "&onLoad",
        
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
        
        "defaultFonts" : "@",
        
        "api": "@",
        
        "transport" : "@",
        
        "msgTag" : "@",
        
        "apiParams" : "<?",
        
        "onFormatData" : "&"
        
      },
      templateUrl: '/UIComponents/dashboard/frontend/UIComponents/Components/speedometer/speedometer.html',
      controller: function(httpClient, wsClient, $element, $window, $scope, $compile, $timeout) {
        
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
             
             
             
             this.transport = (this.transport) ? this.transport : "wss";
             this.msgTag = (this.msgTag) ? this.msgTag : null;
         }
         
         
        this.calculateGaugeRadius = function(){
            self.timeoutId = null;
            var h = $element.parent().height();
            var w = $element.parent().width();
            //gaugeRadius = (w >= h) ? ((h / 2) - 20) : ((w / 2) - 20)
            if(h == 0) {
                self.speedoConfig.gaugeRadius = (w / 2);
            } else {
                self.speedoConfig.gaugeRadius = (w >= h) ? ((h / 2)) : ((w / 2))
            }
        }
        
        this.$postLink = function() {
      	  $timeout(function() {
      		  console.log("Calc")
      		  if(!self.gaugeRadius) {
      			  self.calculateGaugeRadius();
      			  console.log("Gauge Size", self.speedoConfig.gaugeRadius)
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
      	  
            
            
           // initDataService(this.transport);
        }
         
        this.$onDestroy = function() {
            if(!this.gaugeRadius) angular.element($window).off('resize');
            if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
            console.log("destory speedo")
        }
        
        this.renderGauge = function() {
           angular.element($element).html("")
           this.speedo = angular.element(document.createElement("meter-gauge"));
           this.speedo.attr("gaugeconfig", JSON.stringify(this.speedoConfig));
           var el = $compile( this.speedo )( $scope );
           angular.element($element).append( el );
        }

        var initDataService = function(transport) {
            console.log("Gauge Size", self.speedoConfig.gaugeRadius)
            if (transport == "wss") {
              	wsClient.onReady.then(function() {
                // Subscribe to socket messages with id chart
                if(self.msgTag){
                    wsClient.subscribe(self.msgTag, self.consumeData.bind(self), $scope.$id);  
                }
                if(self.api) {
                  wsClient.call(self.api, self.apiParams, self.msgTag)
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
