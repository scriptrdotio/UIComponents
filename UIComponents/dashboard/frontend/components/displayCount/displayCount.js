angular.module('Display', ['ComponentsCommon', 'DataService']);

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
        "icon": "@",
        "loadingMessage": "@",
          
          "transport": "@",
          "api" : "@",
          "msgTag" : "@",
          "httpMethod": "@",
          "apiParams" : "<?",
          "onFormatData" : "&",
          "fetchDataInterval": "@",
          "useWindowParams": "@",
          "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed
                
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/displayCount/displayCount.html',
      controller: function($scope, httpClient, wsClient, $element, $window, $timeout, $interval, $window, dataService) {
        
         var self = this;
          self.rerenderVal=null;
          self.isLoading = false;
          
         this.$onInit = function() {
             
            this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/display-data-bg.svg";
                       
            this.hasData = (this.value != null && this.value != "") ?  true : false;
            this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data";
            this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
            this.widgetLayout = (this.widgetLayout=="vertical") ? this.widgetLayout : "horizontal";
            //this.data = (this.data) ? (isNaN(this.data) ? "0": this.data) : "0";
            //this.message = (this.message) ? this.message : "Items";
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
             
             
            this.numberStyle = { 
                'background' : this.numberBackgroundColor, 
                'font-family' : this.numberFontFamily, 
                'font-weight' : this.numberFontWeight, 
                'color' : this.numberTextColor, 
                'text-align' : this.numberTextAlignment 
           }
             
             this.rerender();
             
             //end 
             
             this.transport = (this.transport) ? this.transport : null;
             this.msgTag = (this.msgTag) ? this.msgTag : null;

             this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
             this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;
  			 this.style = {};
      	 }
         
         this.findBackgroundColor =function(s){
             var match=null;
             if(typeof s.value === 'string' && s.numberBackgroundColors){
                 match=_.find(s.numberBackgroundColors,function(e){
                     return e.value==s.value;
                 });
             }else if(typeof s.value === 'number' && s.numberBackgroundColors){
                 match=_.find(s.numberBackgroundColors.slice().reverse(),function(e){
                     return s.value>=e.value;
                 });
             }
             if(match!=null){
                 self.numberStyle.background = match.color;
                 self.numberBackgroundColor=match.color;
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
                     if(data == null) {
                         if( self.value == null) {
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

         this.onResize = function() {
                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }
                    self.timeoutId = $timeout(self.resize.bind(self), 100);
         }
         
         this.resize = function() {
           this.calculateNotificationsDisplay();
         }

         this.calculateNotificationsDisplay = function() {
             if($element.parent().innerWidth() < 240) {
                 self.usePopover = true;
             } else {
                 self.usePopover = false;
             }

         }   
         this.$onDestroy = function() {
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
                 if(self.value) {
                     self.stalledData = true;
                     self.dataFailureMessage = "Failed to update data.";
                 }
             } else {
                 if(typeof self.onFormatData() == "function"){
                     data = self.onFormatData()(data, self);
                 }	
                 if(data != null) {
                     if(typeof data == "object" && data.value != null){  
                         self.value = data.value;
                         if(data.message){
                             self.message = data.message;
                         } 
                         self.rerender();
                         self.hasData = true;
                         self.noResults = false;
                         self.stalledData = false;
                     } else {
                         self.noResults = true;
                         if(self.value != null) {
                             self.stalledData = true;
                         } 
                         self.dataFailureMessage = "Failed to update data, no data returned.";
                     }
                 } else {
                     self.noResults = true;
                     if(self.value != null) {
                         self.stalledData = true;
                     } 
                     self.dataFailureMessage = "Failed to update data.";
                 }
             }
            
          }
        }
	});