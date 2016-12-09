angular.module('Odometer', ['ui.odometer']);

angular
  .module('Odometer')
  .component('scriptrOdometer', {
  
      bindings : {
        
       "onLoad": "&onLoad",
        
        "api": "@",
        
        "theme": "@",
        
        "duration": "@",
        
        "animation": "@",
        
        "provider": "@",
        
        "subscriberId": "@",
        
        "apiData": "<?"
        
      },
      templateUrl: 'odometer.html',
      controller: function($scope, httpClient, wsClient) {
        
       var self = this;
        
       _setDefaultValues(self); 
        
       this.config = {};
        
       this.$onInit = function() {
         this.config = {
           duration: (this.duration)? this.duration : 1000,
           animation: (this.animation)? this.animation : "count",
           theme: (this.theme)? this.theme : "car",
         }
         this.odometerOptions = this.config;
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
         self.mileageValue = data;
       }
       
       function _setDefaultValues(self){
         if(!self.subscriberId) self.subscriberId = "odometer";
         if(!self.provider) self.provider = "http";
         
       }
     }
   });