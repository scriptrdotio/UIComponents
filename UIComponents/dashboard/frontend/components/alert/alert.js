angular.module('Alert', ['angular-scriptrui','DataService']);

angular
  .module('Alert')
  .component(
     'scriptrAlert',
     {
  
      bindings : {
        "data": "<?",
        "type": "@",  
        "api": "@",
        "transport" : "@",
        "msgTag" : "@",
        "apiParams" : "<?",
        "onFormatData" : "&"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/alert/alert.html',
      controller: function(httpClient, wsClient,dataService,$scope) {
        
         var self = this;
          
         this.$onInit = function() {
            this.type = (this.type) ? this.type : "info";
            this.data = (this.data) ? this.data : "Waiting for info...";
             
            if(this.data) {
                this.consumeData(this.data);
            }
      	 }
         
          this.$postLink = function () {
             initDataService(this.transport);
          }

        var initDataService = function(transport) {
           dataService.getData(transport, self.api, self.apiParams, self.useWindowParams, self.msgTag, self.consumeData.bind(self), self.fetchDataInterval, $scope.$id);

        }              

        this.consumeData = function(data, response) {
            if(typeof self.onFormatData() == "function"){
                data = self.onFormatData()(data);
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
