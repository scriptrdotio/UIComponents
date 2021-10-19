angular.module('Display', ['ComponentsCommon', 'DataService']);

angular
  .module('Display')
  .component(
     'scriptrDisplaycount',
     {
  
      bindings : {
          
  		"transport": "@",
        "api" : "@",
        "msgTag" : "@",
        "httpMethod": "@",
        "apiParams" : "<?",
        "onFormatData" : "&",
        "fetchDataInterval": "@",
        "useWindowParams": "@",
        "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed

        "widgetLayout": "@",//vertical, horozontal
        "data": "<?",  
        "dataFailureMessage": "@",
        "stalledDataMessage": "@",
        "invalidData": "@",
        "loadingMessage": "@",
               
        "borderSize": "@",
        "borderRadius": "@",
        "borderColor": "@",          
        
        "valueCellSize": "@",
        "valueFontFamily": "@",            
        "valueFontSize": "@",    
        "valueFontWeight": "@",   
        "valueTextColor": "@",                   
        "valueBackgroundColor": "@",    
        "valueBackgroundColors": "<?",  
        "valueTextAlignment": "@",
        "valueVerticalAlignment": "@",  //values: top, bottom, center
        "valueTextTransform": "@",
        "colorAcrossComponent": "@",                 
          
        "message": "@",     
        "messageFontFamily": "@",            
        "messageFontSize": "@",                      
        "messageFontWeight": "@",         
        "messageTextColor": "@",                   
        "messageBackgroundColor": "@",
        "messagePosition": "@", //top or bottom with respect to the value in case of vertical display default bottom, left or right with respect to the value in case horizontal display default "right"
        "messageTextTransform": "@",
        "messageTextAlignment": "@", 
        "messageVerticalAlignment": "@", //values: top, bottom, center
          
        "backgroundImage": "@",
        "backgroundPosition": "@",  
        "backgroundColor": "@",
        "backgroundSize": "@",
        "backgroundRepeat": "@",
        
        "icon": "@",
          
        "unit": "@",
          
        "infoFontFamily": "@",
        "infoFontSize": "@",                      
        "infoFontWeight": "@",         
        "infoTextColor": "@",                   
        "infoBackgroundColor": "@",
        "infoTextTransform": "@",
        "infoTextAlignment": "@",
        "infoMarginTop": "@",
          
        "info": "@"
          
        },
        templateUrl:'/UIComponents/dashboard/frontend/components/displayCount/displayCount.html',
        controller: function($translate,$rootScope, $scope, httpClient, wsClient, $element, $window, $timeout, $interval, $window, dataService) {
            var self = this;
            self.rerenderVal=null;
            this.$onInit = function() {
                $translate.use($rootScope.lang);
                this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/display-data-bg.svg";
                this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data";
                this.hasData = (this.value != null && this.value != "") ?  true : false;
                this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                this.widgetLayout = (this.widgetLayout=="vertical") ? this.widgetLayout : "horizontal";
                //this.data = (this.data) ? (isNaN(this.data) ? "0": this.data) : "0";
                //this.message = (this.message) ? this.message : "Items";
                this.borderSize = (this.borderSize) ? this.borderSize : "1";
                this.borderRadius = (this.borderRadius) ? this.borderRadius : "0";
                this.borderColor = (this.borderColor) ? this.borderColor : "#d7d7d7";
                
                this.backgroundColor = (this.backgroundColor) ? this.backgroundColor : "#009ABB";  
                this.backgroundImage = this.backgroundImage ? this.backgroundImage : "";
                this.backgroundPosition = (this.backgroundPosition) ? this.backgroundPosition : "right bottom"; 
                this.backgroundSize = (this.backgroundSize) ? this.backgroundSize : "auto"; 
                this.backgroundRepeat = (this.backgroundRepeat) ? this.backgroundRepeat : "no-repeat"; 
               
                
                this.valueCellSize = (this.valueCellSize) ? this.valueCellSize : "";   
                this.valueFontFamily = (this.valueFontFamily) ? this.valueFontFamily : "";             
                this.valueFontSize = (this.valueFontSize) ? this.valueFontSize : "42";             
                this.valueFontWeight = (this.valueFontWeight) ? this.valueFontWeight : "";             
                this.valueTextColor = (this.valueTextColor) ? this.valueTextColor : "#ffffff";             
                this.valueTextAlignment = (this.valueTextAlignment && this.valueTextAlignment == "right") ? "flex-end" : ( (this.valueTextAlignment && this.valueTextAlignment == "left") ? "flex-start" : "center"); 
                this.valueVerticalAlignment = (this.valueVerticalAlignment && this.valueVerticalAlignment == "bottom") ? "flex-end" : ( (this.valueVerticalAlignment && this.valueVerticalAlignment == "top") ? "flex-start" : "center"); 
                this.valueBackgroundColor = (this.valueBackgroundColor) ? this.valueBackgroundColor : "";  
                 this.valueTextTransform = this.valueTextTransform ? this.valueTextTransform : "";
                
                this.unit = this.unit ? this.unit : "";
                
                this.messageFontFamily = (this.messageFontFamily) ? this.messageFontFamily : "";             
                this.messageFontSize = (this.messageFontSize) ? this.messageFontSize : "18";             
                this.messageFontWeight = (this.messageFontWeight) ? this.messageFontWeight : "";             
                this.messageTextColor = (this.messageTextColor) ? this.messageTextColor : "#686868";             
                this.messageBackgroundColor = (this.messageBackgroundColor) ? this.messageBackgroundColor : "transparent";  
                
                if(this.widgetLayout == "vertical") {
                    this._messagePosition = (this.messagePosition && this.messagePosition  == "top") ? this.messagePosition : "bottom";
                } else {
                    this._messagePosition = (this.messagePosition && this.messagePosition  == "left") ? this.messagePosition : "right";
                }
                
                this.messageTextTransform = this.messageTextTransform ? this.messageTextTransform : "";
                this.messageTextAlignment = (this.messageTextAlignment && this.messageTextAlignment == "right") ? "flex-end" : ( (this.messageTextAlignment && this.messageTextAlignment == "left") ? "flex-start" : "center"); 
                this.messageVerticalAlignment = (this.messageVerticalAlignment && this.messageVerticalAlignment == "bottom") ? "flex-end" : ( (this.messageVerticalAlignment && this.messageVerticalAlignment == "top") ? "flex-start" : "center"); 
                
                this.infoFontFamily = (this.infoFontFamily) ? this.infoFontFamily : "";             
                this.infoFontSize = (this.infoFontSize) ? this.infoFontSize : "18";             
                this.infoFontWeight = (this.infoFontWeight) ? this.infoFontWeight : "";             
                this.infoTextColor = (this.infoTextColor) ? this.infoTextColor : "#686868";             
                this.infoBackgroundColor = (this.infoBackgroundColor) ? this.infoBackgroundColor : "";  
                this.infoTextTransform = this.infoTextTransform ? this.infoTextTransform : "";
                this.infoTextAlignment = (this.infoTextAlignment) ? this.infoTextAlignment : "center"; 
                this.infoMarginTop = this.infoMarginTop ? this.infoMarginTop : 0;
                this.info = this.info ? this.info : "";
                
                this.valueStyle = { 
                    'background' : this.valueBackgroundColor, 
                    'font-family' : this.valueFontFamily, 
                    'font-weight' : this.valueFontWeight, 
                    'color' : this.valueTextColor, 
                    'justify-content' : this.valueTextAlignment,
                    'align-items': this.valueVerticalAlignment,
                    'font-size' : this.valueFontSize +'px',
                    'text-transform': this.valueTextTransform
                }
                
 
                this.messageStyle = {
                    'background': this.messageBackgroundColor,
                    'font-weight' : this.messageFontWeight,
                    'font-size' : this.messageFontSize +'px',
                    'font-family' : this.messageFontFamily,
                    'color' : this.messageTextColor,
                    'justify-content' : this.messageTextAlignment,
                    'align-items':  this.messageVerticalAlignment,
                    'text-transform': this.messageTextTransform
                }
                
                if(this.widgetLayout == "horizontal") {
                    if(this.valueCellSize == "small") {
                        this.messageStyle["flex"] = "3"
                    } else if(this.valueCellSize == "medium") {
                         this.messageStyle["flex"] = "1"
                    } else if(this.valueCellSize == "large") {
                        this.valueStyle["flex"] = "3"
                    } 
                }
                
                
                this.containerStyle = {
                    'border' : this.borderSize+"px solid "+this.borderColor,
                    'background-color' : this.backgroundColor,
                    'background-image': "url(\'"+this.backgroundImage+"\')",
                    'background-repeat': this.backgroundRepeat,
                    'background-position': this.backgroundPosition,
                    'border-radius': this.borderRadius,
                    'background-size': this.backgroundSize
                }
                
                
                this.infoStyle = {
                    'background':  this.infoBackgroundColor,
                    'font-weight': this.infoFontWeight,
                    'font-size': this.infoFontSize +"px",
                    'font-family': this.infoFontFamily,
                    'color': this.infoTextColor,
                    'text-align': this.infoTextAlignment,
                    'text-transform': this.infoTextTransform,
                    'margin-top': this.infoMarginTop+"px"
                }
                
                
                this.rerender();
                //end 
                this.transport = (this.transport) ? this.transport : null;
                this.msgTag = (this.msgTag) ? this.msgTag : null;
                this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
                this.colorAcrossComponent = (this.colorAcrossComponent) ? this.colorAcrossComponent : "false";
                this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;
                this.style = {};
            }
            this.findBackgroundColor =function(s){
                var match=null;
                if(typeof s.value === 'string' && s.valueBackgroundColors){
                    match=_.find(s.valueBackgroundColors,function(e){
                        return e.value==s.value;
                    });
                }else if(typeof s.value === 'number' && s.valueBackgroundColors){
                    match=_.find(s.valueBackgroundColors.slice().reverse(),function(e){
                        return s.value>=e.value;
                    });
                }
                if(match!=null){
                    if(self.colorAcrossComponent=="true")
                        self.containerStyle["background-color"] = match.color;
                    else
                    	self.valueStyle["background-color"] = match.color;                    	
                    self.valueBackgroundColor=match.color;
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
                            else if(!self.serviceTag)
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
                    self.dataFailureMessage = $translate.instant(this.dataFailureMessage)
                    if(self.value) {
                        self.stalledData = true;
                        self.stalledDataMessage = $translate.instant(this.stalledDataMessage)
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
                            self.stalledDataMessage = $translate.instant(this.stalledDataMessage)
                        }
                    } else {
                        self.noResults = true;
                        if(self.value != null) {
                            self.stalledData = true;
                        } 
                        self.stalledDataMessage = $translate.instant(this.stalledDataMessage)
                    }
                }
            }
        }
    });
