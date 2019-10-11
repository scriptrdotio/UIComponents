angular.module('Display', []);

angular
  .module('Display')
  .component(
     'scriptrDisplaycount',
     {
  
      bindings : {
        "widgetLayout": "@",//vertical, horozontal
        "data": "<?",  
        "message": "@",            
        "borderSize": "@",
        "borderColor": "@",          
        "numberFontFamily": "@",            
        "numberFontSize": "@",    
        "numberCellSize": "@",  
        "numberFontWeight": "@",         
        "numberTextColor": "@",                   
        "numberBackgroundColor": "@",    
        "numberBackgroundColors": "<?",  
        "numberTextAlignment": "@",    
        "messageFontFamily": "@",            
        "messageFontSize": "@",                      
        "messageFontWeight": "@",         
        "messageTextColor": "@",                   
        "messageBackgroundColor": "@",  
        "messageTextAlignment": "@",              
        "api": "@",
        "enableResize": "<?",            
        "transport" : "@",
        "msgTag" : "@",
        "apiParams" : "<?",
        "onFormatData" : "&",
        "fetchDataInterval": "@",
        "useWindowParams": "@"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/displayCount/displayCount.html',
      controller: function($scope, httpClient, wsClient, $element, $window, $timeout, $interval, $window, dataService) {
        
         var self = this;
          self.rerenderVal=null;
          self.isLoading = false;
          
         this.$onInit = function() {
            this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
            this.widgetLayout = (this.widgetLayout=="vertical") ? this.widgetLayout : "horizontal";
            this.data = (this.data) ? (isNaN(this.data) ? "0": this.data) : "0";
            this.message = (this.message) ? this.message : "Items";
            this.borderSize = (this.borderSize) ? this.borderSize : "1";
            this.numberCellSize = (this.numberCellSize) ? this.numberCellSize : "";             
            this.borderColor = (this.borderColor) ? this.borderColor : "#d7d7d7";
            this.numberFontFamily = (this.numberFontFamily) ? this.numberFontFamily : "Arial";             
            this.numberFontSize = (this.numberFontSize) ? this.numberFontSize : "42";             
            this.numberFontWeight = (this.numberFontWeight) ? this.numberFontWeight : "600";             
            this.numberTextColor = (this.numberTextColor) ? this.numberTextColor : "#ffffff";             
            this.numberTextAlignment = (this.numberTextAlignment) ? this.numberTextAlignment : "center";  
            this.numberBackgroundColor = (this.numberBackgroundColor) ? this.numberBackgroundColor : "#ff8c00";  
            this.messageFontFamily = (this.messageFontFamily) ? this.messageFontFamily : "Arial";             
            this.messageFontSize = (this.messageFontSize) ? this.messageFontSize : "18";             
            this.messageFontWeight = (this.messageFontWeight) ? this.messageFontWeight : "600";             
            this.messageTextColor = (this.messageTextColor) ? this.messageTextColor : "#686868";             
            this.messageBackgroundColor = (this.messageBackgroundColor) ? this.messageBackgroundColor : "white";                          
            this.messageTextAlignment = (this.messageTextAlignment) ? this.messageTextAlignment : "center";       
             
             this.rerender();
             
             //end 
 
            this.enableResize = (typeof this.enableResize != 'undefined') ? this.enableResize : true;  
              angular.element($window).on('resize', function() {
                if (self.timeoutId != null) { 
                	$timeout.cancel(self.timeoutId);
              	}
             	 return self.timeoutId = $timeout(self.resize, 100);
             });
             this.transport = (this.transport) ? this.transport : "wss";
             this.msgTag = (this.msgTag) ? this.msgTag : null;

             this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
             this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;
  			 this.style = {};
      	 }
         
         this.findBackgroundColor =function(s){
             var match=null;
             if(typeof s.data === 'string'){
                 match=_.find(s.numberBackgroundColors,function(e){
                     return e.value==s.data;
                 });
             }else if(typeof s.data === 'number'){
                 match=_.find(s.numberBackgroundColors.reverse(),function(e){
                     return s.data>=e.value;
                 });
             }
             if(match!=null){
                 s.numberBackgroundColor=match.color;
             }
             
            
         }
         this.rerender=function(){
             self.rerenderVal=false;
             $timeout(function(){
                   self.findBackgroundColor(self);
                 self.rerenderVal=true;
             },100);
         }
         
         this.$postLink = function () {
             $timeout(self.resize,100);
             if (self.timeoutId != null) {
                 $timeout.cancel(self.timeoutId);
             }
             self.timeoutId = $timeout(self.resize, 100);
             initDataService(this.transport);
         }
         
         this.$onDestroy = function() {
             if(self.msgTag){
                 wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
             }
             
             if(self.refreshTimer) {
                $interval.cancel( self.refreshTimer );
            }
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
            self.data = data;
            if(typeof data == "object"){  
                if(data && data.data && typeof data.data == "string"){
                    self.data = data.data;
                }  
            }
            if(typeof data == "string"){
				self.data = data
            }
            
            self.rerender();
        }
        }
	});