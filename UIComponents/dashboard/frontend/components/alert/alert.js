angular.module('Alert', ['angular-scriptrui','ComponentsCommon', 'DataService']);

angular
  .module('Alert')
  .component(
     'scriptrAlert',
     {
  
      bindings : {
        "data": "<?",
        "type": "@",
        "icon": "@",
        "transport": "@",
          "api" : "@",
          "msgTag" : "@",
          "httpMethod": "@",
          "apiParams" : "<?",
          "onFormatData" : "&",
          "fetchDataInterval": "@",
          "useWindowParams": "@",
          "serviceTag": "@"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/alert/alert.html',
      controller: function(httpClient, wsClient,dataService,$scope,$interval, $window, $element, $timeout) {
         var self = this;
          
         this.$onInit = function() {
            this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/alert-bg.svg";
                       
            this.hasData = (this.message != null && this.message != "") ?  true : false;
            this.type = (this.type) ? this.type : "info";
            //this.data = (this.data) ? this.data : "Waiting for info...";
      	 }
         
          this.$postLink = function () {
              
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
            } else { //Listen on update-data event to build data
                 $scope.$on("update-data", function(event, data) {
                     if(data == null) { //typeOf data == 'undefined' || data === null
                          if(self.message == null || self.message == "") {
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
         
		this.calculateNotificationsDisplay = function() {
            if($element.parent().innerWidth() < 240) {
                self.usePopover = true;
            } else {
                self.usePopover = false;
            }
        }   
        
        this.onResize = function() {
            if (self.timeoutId != null) {
                $timeout.cancel(self.timeoutId);
            }
            self.timeoutId = $timeout(self.resize.bind(self), 100);
        }
        
        this.resize = function() {
            this.calculateNotificationsDisplay();
        }
        
        this.$onDestroy = function() {
            console.log("destory alert", self.msgTag, $scope.$id);
            if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
            
            if(self.refreshTimer) {
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
                 if(self.message) {
                     self.stalledData = true;
                     self.dataFailureMessage = "Failed to update data.";
                 }
             } else {
                 if(typeof self.onFormatData() == "function"){
                     data = self.onFormatData()(data, self);
                 }
                 if(data != null) {
                     if(typeof data == "object"){  
                         if(data && data.value && typeof data.value != null){
                             self.message = data.value;
                             self.hasData = true;
                             self.noResults = false;
                             self.stalledData = false;
                         }  else {
                             self.noResults = true;
                             if(self.message != null && self.message != "") {
                                 self.stalledData = true;
                             } 
                             self.dataFailureMessage = "Failed to update data, invalid data format.";
                         }
                         if(data && data.type){
                             self.type = data.type;  
                         }
                     } else {
                         self.message = data;
                         self.hasData = true;
                         self.noResults = false;
                         self.stalledData = false;
                     } 
                    
                 } else {
                     self.noResults = true;
                     if(self.message != null && self.message != "") {
                         self.stalledData = true;
                     } 
                     self.dataFailureMessage = "Failed to update data, invalid data format.";
                 }
             }
            
        }
        }
	});
