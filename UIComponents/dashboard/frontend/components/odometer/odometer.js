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
          
          "onFormatData" : "&"

        },
        templateUrl: '/UIComponents/dashboard/frontend/UIComponents/Components/odometer/odometer.html',
        controller: function($scope, httpClient, wsClient, $element, $window, $timeout) {

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
            console.log("destory odometer")
          }
            var initDataService = function(transport) {
              if (transport == "wss") {
                  wsClient.onReady.then(function() {
                    // Subscribe to socket messages with id chart
                    if(self.msgTag){
                        wsClient.subscribe(self.msgTag, self.consumeData.bind(self), $scope.$id);  
                    }
                    if(self.api) {
                        wsClient.call(self.api, self.apiParams, self.msgTag)
                          .then(function(data, response) {
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
              this.odometerValue = data;
            }
        }
      });
