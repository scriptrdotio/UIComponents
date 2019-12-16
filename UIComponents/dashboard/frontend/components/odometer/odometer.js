angular.module('Odometer', [ 'ui.odometer', 'ComponentsCommon', 'DataService' ]);

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
               
              this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/odometer-bg.svg";
                       
             this.hasData = (!isNaN(parseFloat(this.odometerValue)) && isFinite(this.odometerValue)) ?  true : false;
             
             this.config = {
               duration: (this.duration) ? this.duration : 1000,
               animation: (this.animation) ? this.animation : "count",
               theme: (this.theme) ? this.theme : "car",
             }
             this.odometerOptions = this.config;
             //this.odometerValue = (this.odometerValue) ? this.odometerValue : ((this.data) ? this.data : 0 );
             this.size = (this.size) ? this.size : 1;
             this.enableResize = (typeof this.enableResize != 'undefined') ? this.enableResize : true;  
             
             this.style = {};
             this.style["font-size"] = this.size+"em";

             this.transport = (this.transport) ? this.transport : null;
             this.msgTag = (this.msgTag) ? this.msgTag : null;
             this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
           }
           
           
           this.onResize = function() {
               if (self.timeoutId != null) {
                   $timeout.cancel(self.timeoutId);
               }
               self.timeoutId = $timeout(self.resize.bind(self), 100);
           }
           
           self.resize = function(){
                self.timeoutId = null;
                if(self.enableResize){
                      self.style["margin-top"] = ($element.parent().outerHeight()/2) - ($element.outerHeight()/2);  
                }
               
               self.calculateNotificationsDisplay();
          }
           
          this.calculateNotificationsDisplay = function() {
                if($element.parent().innerWidth() < 240) {
                    self.usePopover = true;
                } else {
                    self.usePopover = false;
                }

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
                       //Listen on update-data event to build data
                       $scope.$on("update-data", function(event, data) {
                             if(data == null) { //typeOf data == 'undefined' || data === null
                                   if(self.odometerValue == null) {
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
                   if(self.odometerValue) {
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
                          self.odometerValue = data;
                          
                          self.hasData = true;
                          self.noResults = false;
                          self.stalledData = false;
                       }else{
                           self.noResults = true;
                           if(self.odometerValue != null) {
                               self.stalledData = true;
                           } 
                       		self.dataFailureMessage = "Failed to update data, invalid data format.";
                   	   }
                  } else {
                      self.noResults = true;
                      if(self.odometerValue != null) {
                          self.stalledData = true;
                      } 
                      self.dataFailureMessage = "Failed to update data, invalid data format."
                      console.log(e);
                  }

               }
            }
        }
      });
