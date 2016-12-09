angular.module('Speedometer', ['meterGauge']);

angular
  .module('Speedometer')
  .component('scriptrSpeedometer', {
  
      bindings : {
        
        "onLoad": "&onLoad",
        
        "gaugeRadius": "<?",
        
        "theme": "@",
        
        "minVal": "<?",
        
        "maxVal": "<?",
        
        "needleVal": "<?",
        
        "tickSpaceMinVal": "<?",
        
        "tickSpaceMajVal": "<?",
        
        "gaugeUnits": "@",
        
        "tickColMaj":"@",
        
        "tickColMin": "@",
        
        "outerEdgeCol": "@",
        
        "pivotCol": "@",
        
        "innerCol": "@",
        
        "unitsLabelCol": "@",
        
        "tickLabelCol": "@",
        
        "needleCol": "@",
        
        "defaultFonts": "@",
        
        "api": "@",
        
        "provider": "@",
        
        "subscriberId": "@",
        
        "apiData": "<?"
        
      },
      templateUrl: 'speedometer.html',
      controller: function($scope, httpClient, wsClient) {
        
       var self = this;
        
       _setDefaultValues(self); 
        
       this.rpmTheme = {
         gaugeRadius: 120,
         minVal: 0,
         maxVal: 1000,
         needleVal: 0,
         tickSpaceMinVal: 10,
         tickSpaceMajVal: 100,
         gaugeUnits: "kmh",
         tickColMaj: '#0194D9',
         tickColMin: '#999999',
         outerEdgeCol: '#ffffff',
         pivotCol: '#434A54',
         innerCol: '#ffffff',
         unitsLabelCol: '#0194d9',
         tickLabelCol: '#656D78',
         needleCol: '#0194d9',
         defaultFonts: ''
       }
       
       this.speedTheme = {
         gaugeRadius: 120,
         minVal: 0,
         maxVal: 220,
         needleVal: 0,
         tickSpaceMinVal: 10,
         tickSpaceMajVal: 20,
         gaugeUnits: "kmh",
         tickColMaj: '#C64DFF',
         tickColMin: '#999999',
         outerEdgeCol: '#f4f4f4',
         pivotCol: '#434a54',
         innerCol: '#ffffff',
         unitsLabelCol: '#C64DFF',
         tickLabelCol: '#656D78',
         needleCol: '#C64DFF',
         defaultFonts: ''
       }
       
       this.$onInit = function() {
          if(this.theme == "speed"){
              this.classic = this.speedTheme;
          }else if(this.theme == "rpm"){
              this.classic = this.rpmTheme;
          }
         // override theme
         this.classic.gaugeRadius = (this.gaugeRadius)? this.gaugeRadius : this.classic.gaugeRadius,
         this.classic.minVal= (this.minVal)? this.minVal : this.classic.minVal,
         this.classic.maxVal= (this.maxVal)? this.maxVal : this.classic.maxVal,
         this.classic.needleVal= (this.needleVal)? Math.round(this.needleVal) : Math.round(this.classic.needleVal),
         this.classic.tickSpaceMinVal= (this.tickSpaceMinVal)? this.tickSpaceMinVal : this.classic.tickSpaceMinVal,
         this.classic.tickSpaceMajVal= (this.tickSpaceMajVal)? this.tickSpaceMajVal : this.classic.tickSpaceMajVal,
         this.classic.gaugeUnits= (this.gaugeUnits)? this.gaugeUnits : this.classic.gaugeUnits,
         this.classic.tickColMaj=(this.tickColMaj)? this.tickColMaj : this.classic.tickColMaj,
         this.classic.tickColMin= (this.tickColMin)? this.tickColMin : this.classic.tickColMin,
         this.classic.outerEdgeCol=(this.outerEdgeCol)? this.outerEdgeCol : this.classic.outerEdgeCol,
         this.classic.pivotCol=(this.pivotCol)? this.pivotCol : this.classic.pivotCol,
         this.classic.innerCol=(this.innerCol)? this.innerCol : this.classic.innerCol,
         this.classic.unitsLabelCol=(this.unitsLabelCol)? this.unitsLabelCol : this.classic.unitsLabelCol,
         this.classic.tickLabelCol=(this.tickLabelCol)? this.tickLabelCol : this.classic.tickLabelCol,
         this.classic.needleCol=(this.needleCol)? this.needleCol : this.classic.needleCol,
         this.classic.defaultFonts=(this.defaultFonts)? this.defaultFonts : this.classic.defaultFonts
       }
       
       wsClient.onReady.then(function(){ 
            //Subscribe to socket messages with id chart
            wsClient.subscribe(self.subscriberId, consumeData);
         
           if(self.provider == "http"){
              httpClient
                .get(self.api, self.apiData).then(function(data, response){
                  consumeData(data)
              }, function(err) {
                  console.log("reject published promise", err);
              });
     	   }
            
           if(self.provider == "webSocketCall"){
              wsClient.call(self.api, self.apiData, "speedometer").then(function(data, response){
                consumeData(data)
              });
           }
         
           if(self.provider == "publish"){
              wsClient.publish(self.apiData, "speedometer").then(
                function(data, response) {
                  consumeData(data);
                },
                function(err) {
                  vm.subscribeError = JSON.stringify(error);
                  console.log("reject published promise", err);
                }
             ); 
           }
       })
       
       var consumeData = function(data, response){
         var needleVal = data;
         self.classic.needleVal = Math.round(needleVal);
       }
       
       function _setDefaultValues(self){
         if(!self.subscriberId) self.subscriberId = "speedometer";
         if(!self.provider) self.provider = "http";
         
       }
     }
   });