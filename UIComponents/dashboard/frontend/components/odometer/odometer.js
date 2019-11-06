angular.module('Odometer', [ 'ui.odometer' ]);

angular
    .module('Odometer')
    .component(
      'scriptrOdometer',
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
          "enableResize": "<?",  
          "theme" : "@",
          "duration" : "@",
          "animation" : "@",
          "odometerValue" : "<?",
          "data": "<?",
          "size": "<?"

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
 
             this.transport = (this.transport) ? this.transport : null;
             this.msgTag = (this.msgTag) ? this.msgTag : null;
             this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";

             initDataService(this.transport);
           }
           
           self.resize = function(){
                self.timeoutId = null;
                if(self.enableResize){
                      self.style["margin-top"] = ($element.parent().outerHeight()/2) - ($element.outerHeight()/2);  
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
              this.odometerValue = data;
            }
        }
      });
