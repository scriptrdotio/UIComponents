angular.module('Alert', ['angular-scriptrui','DataService']);

angular
  .module('Alert')
  .component(
     'scriptrAlert',
     {
  
      bindings : {
        "data": "<?",
        "type": "@",  
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
      controller: function(httpClient, wsClient,dataService,$scope) {
        
         var self = this;
          
         this.$onInit = function() {
            this.type = (this.type) ? this.type : "info";
            this.data = (this.data) ? this.data : "Waiting for info...";
      	 }
         
          this.$postLink = function () {
             initDataService(this.transport);
             if(this.data) {
                this.consumeData(this.data);
             }
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
                data = self.onFormatData()(data, self);
            }
            if(typeof data == "object"){  
                if(data && data.data && typeof data.data == "string"){
                    this.message = data.data;
                }  
                if(data && data.type){
                    this.type = data.type;  
                }
            }
            if(typeof data == "string"){
                this.message = data;
            }
        }
        }
	});
