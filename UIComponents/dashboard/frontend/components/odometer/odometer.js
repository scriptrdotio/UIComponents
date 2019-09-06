angular.module('Odometer', [ 'ui.odometer' ]);

angular
    .module('Odometer')
    .component(
      'scriptrOdometer',
      {

        bindings : {

         "onLoad" : "&onLoad",

          "api" : "@",
            
          "enableResize": "<?",  

          "theme" : "@",

          "duration" : "@",

          "animation" : "@",

          "transport" : "@",
          
          "odometerValue" : "<?",
          "data": "<?",

          "msgTag" : "@",

          "apiParams" : "<?",
          
          "size": "<?",
          
          "onFormatData" : "&",
          
          "fetchDataInterval": "@",
            
          "useWindowParams": "@"

        },
        templateUrl: '/UIComponents/dashboard/frontend/components/odometer/odometer.html',
        controller: function($scope, httpClient, wsClient, $element, $window, $timeout, $interval, dataService) {

           var self = this;

           this.$onInit = function() {
             this.config = {
               duration: (this.duration) ? this.duration : 1000,
               animation: (this.animation) ? this.animation : "count",
               theme: (this.theme) ? this.theme : "car",
             }
             this.odometerOptions = this.config;
             this.odometerValue = (this.odometerValue) ? this.odometerValue : ((this.data) ? this.data : 0 );
             this.size = (this.size) ? this.size : 1;
             this.enableResize = (typeof this.enableResize != 'undefined') ? this.enableResize : true;  
             
             this.style = {};
             this.style["font-size"] = this.size+"em";

             angular.element($window).on('resize', function() {
                if (self.timeoutId != null) {
                	$timeout.cancel(self.timeoutId);
              	}
             	 return self.timeoutId = $timeout(self.resize, 100);
             });
 
             this.transport = (this.transport) ? this.transport : "wss";
             this.msgTag = (this.msgTag) ? this.msgTag : null;
             this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";

             initDataService(this.transport);
           }
           
           self.resize = function(){
                self.timeoutId = null;
                if(self.enableResize){
                  self.style["margin-top"] = ($element.parent().outerHeight(true)/2) - ($element.outerHeight(true)/2);  
                }
          }
           
           this.$postLink = function() {
                $timeout(self.resize,100);
                if (self.timeoutId != null) {
                	$timeout.cancel(self.timeoutId);
              	}
             	self.timeoutId = $timeout(self.resize, 100);
           }

           
          this.$onDestroy = function() {
            angular.element($window).off('resize');
             if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
              
             if(self.refreshTimer){
                  $interval.cancel( self.refreshTimer );
             }
             console.log("destroy odometer");
          }
          
          var initDataService = function(transport) {
                dataService.getData(transport, self.api, self.apiParams, self.useWindowParams, self.msgTag, self.consumeData.bind(self), self.fetchDataInterval, $scope.$id);
                
                if(self.fetchDataInterval && !self.refreshTimer) {
                    //Assuming this is success
                    self.refreshTimer = $interval(
                        function(){
                            initDataService(self.transport)
                        }, self.fetchDataInterval * 1000);
                }
                
                
            }

            this.consumeData = function(data, response) {
               if(typeof self.onFormatData() == "function"){
                 data = self.onFormatData()(data);
               }
              this.odometerValue = data;
            }
        }
      });
