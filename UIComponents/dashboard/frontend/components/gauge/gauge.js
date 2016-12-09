angular.module('Gauge', ['frapontillo.gage']);

angular
  .module('Gauge')
  .component('scriptrGauge', {
  
      bindings : {
        
       "onLoad": "&onLoad",
        
        "api": "@",
        
        "provider": "@",
        
        "subscriberId": "@",
        
        "apiData": "<?",
        
        "valueFontColor": "@",
        
        "min": "@",
        
        "max": "@",
        
        "hideMinMax": "@",
        
        "hideValue": "@",
        
        "hideInnerShadow": "@",
        
        "gaugeColor": "@",
        
        "showInnerShadow": "@",
        
        "shadowSize": "@",
        
        "shadowOpacity": "@",
        
        "label": "@",
        
        "labelFontColor": "@",
        
        "startAnimationType": "@",
        
        "refreshAnimationType": "@",
        
        "counter": "@"
        
      },
      templateUrl: 'gauge.html',
      controller: function($scope, httpClient, wsClient) {
        
       var self = this;
        
       this.onFilterChanged = function($scope) {
     	  this.fuelValue = 10;
      }
        
       _setDefaultValues(self); 
      
       this.$onInit = function() {
         $scope.fuelValue = 1;
         $scope.customSectors= (this.customSectors)? this.customSectors : [{color: "#A3CD3B", lo: 0, hi: 25}, {color: "#FF4A43", lo: 25, hi: 100}];
         $scope.valueFontColor = (this.valueFontColor)? this.valueFontColor : "#999";
         $scope.min = (this.min)? this.min : 0;
         $scope.max = (this.max)? this.max : 100;
         $scope.hideMinMax = (this.hideMinMax)? this.hideMinMax : false;
         $scope.hideValue = (this.hideValue)? this.hideValue : false;
         $scope.hideInnerShadow = (this.hideInnerShadow)? this.hideInnerShadow : true;
         $scope.gaugeColor = (this.gaugeColor)? this.gaugeColor : "#e9e9e9";
         $scope.showInnerShadow = (this.showInnerShadow)? this.showInnerShadow : false;
         $scope.shadowSize = (this.shadowSize)? this.shadowSize : 0;
         $scope.shadowOpacity = (this.shadowOpacity)? this.shadowOpacity : 0;
         $scope.label = (this.label)? this.label : "% full";
         $scope.labelFontColor = (this.labelFontColor)? this.labelFontColor : "#666";
         $scope.startAnimationType = (this.startAnimationType)? this.startAnimationType : "linear";
         $scope.refreshAnimationType = (this.refreshAnimationType)? this.refreshAnimationType : "linear";
         $scope.counter = (this.counter)? this.counter : true;
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
         $scope.fuelValue = data;
       }
       
       function _setDefaultValues(self){
         if(!self.subscriberId) self.subscriberId = "gauge";
         if(!self.provider) self.provider = "http";
         
       }
     }
   });