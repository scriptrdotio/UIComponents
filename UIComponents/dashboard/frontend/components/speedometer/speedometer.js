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
      templateUrl: '/UIComponents/dashboard/frontend/components/speedometer/speedometer.html',
      controller: function(httpClient, wsClient) {
        
         var self = this;

         this.$onInit = function() {
           
            if(this.theme == "speed" || typeof this.theme == 'undefined'){
                 this.gaugeRadius = (this.gaugeRadius)? this.gaugeRadius : 150;
                 this.minValue = (this.minValue)? this.minValue : 0;
                 this.maxValue = (this.maxValue)? this.maxValue : 220;
                 this.needleVal= (this.needleVal)? Math.round(this.needleVal) : 0;
                 this.tickSpaceMinVal= (this.tickSpaceMinVal)? this.tickSpaceMinVal : 10;
                 this.tickSpaceMajVal= (this.tickSpaceMajVal)? this.tickSpaceMajVal : 20;
                 this.gaugeUnits= (this.gaugeUnits)? this.gaugeUnits : "kmh";
                 this.tickColMaj=(this.tickColMaj)? this.tickColMaj : '#C64DFF';
                 this.tickColMin= (this.tickColMin)? this.tickColMin : '#999999';
                 this.outerEdgeCol=(this.outerEdgeCol)? this.outerEdgeCol : '#f4f4f4';
                 this.pivotCol=(this.pivotCol)? this.pivotCol : '#434a54';
                 this.innerCol=(this.innerCol)? this.innerCol : '#ffffff';
                 this.unitsLabelCol=(this.unitsLabelCol)? this.unitsLabelCol : '#C64DFF';
                 this.tickLabelCol=(this.tickLabelCol)? this.tickLabelCol : '#656D78';
                 this.needleCol=(this.needleCol)? this.needleCol : '#C64DFF';
                 this.defaultFonts=(this.defaultFonts)? this.defaultFonts : '';
            }else if(this.theme == "rpm"){
                this.gaugeRadius = (this.gaugeRadius)? this.gaugeRadius : 120;
                 this.minValue= (this.minValue)? this.minValue : 0;
                 this.maxValue= (this.maxValue)? this.maxValue : 1000;
                 this.needleVal= (this.needleVal)? Math.round(this.needleVal) : 0;
                 this.tickSpaceMinVal= (this.tickSpaceMinVal)? this.tickSpaceMinVal : 10;
                 this.tickSpaceMajVal= (this.tickSpaceMajVal)? this.tickSpaceMajVal : 100;
                 this.gaugeUnits= (this.gaugeUnits)? this.gaugeUnits : "kmh";
                 this.tickColMaj=(this.tickColMaj)? this.tickColMaj : '#0194D9';
                 this.tickColMin= (this.tickColMin)? this.tickColMin : '#999999';
                 this.outerEdgeCol=(this.outerEdgeCol)? this.outerEdgeCol : '#ffffff';
                 this.pivotCol=(this.pivotCol)? this.pivotCol : '#434A54';
                 this.innerCol=(this.innerCol)? this.innerCol : '#ffffff';
                 this.unitsLabelCol=(this.unitsLabelCol)? this.unitsLabelCol : '#0194d9';
                 this.tickLabelCol=(this.tickLabelCol)? this.tickLabelCol : '#656D78';
                 this.needleCol=(this.needleCol)? this.needleCol : '#0194d9',
                 this.defaultFonts=(this.defaultFonts)? this.defaultFonts : '';
            }
           
           this.transport = (this.transport) ? this.transport : "wss";
		   this.msgTag = (this.msgTag) ? this.msgTag : null;

           initDataService(this.transport);
         }

        var initDataService = function(transport) {
            if (transport == "wss") {
              	wsClient.onReady.then(function() {
                // Subscribe to socket messages with id chart
                wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
                if(self.api) {
                  wsClient.call(self.api, self.apiParams, self.msgTag)
                    .then(function(data, response) {
                    self.consumeData(data)
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
            this.needleVal = Math.round(data);
          }
        }
	});
