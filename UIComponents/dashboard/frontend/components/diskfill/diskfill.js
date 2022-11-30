angular.module('DiskFill', ['ComponentsCommon', 'DataService']);
angular
    .module('DiskFill')
    .component(
    'scriptrDiskFill',
    {
        bindings : {
            "onLoad" : "&onLoad",
            "icon": "@",
            "dataFailureMessage": "@",
            "stalledDataMessage": "@",
            "invalidData": "@",
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
            "data" : "<?",
            
            "resetDataOnConsume": "<?",
             
            "wrapperClass": "@",
            "borderSize": "@",
            "borderRadius": "@",
            "borderColor": "@",          

            "valueCellSize": "@", 
            "valueFontFamily": "@",            
            "valueFontSize": "@",    
            "valueFontWeight": "@",   
            "valueTextColor": "@",                   
            "valueBackgroundColor": "@",    
            "valueTextAlignment": "@",
            "valueVerticalAlignment": "@",  //values: top, bottom, center
            "valueTextTransform": "@",

            "diskFontFamily": "@",            
            "diskFontSize": "@",                      
            "diskFontWeight": "@",         
            "diskTextColor": "@",                   
            "diskBackgroundColor": "@",
            "diskPosition": "@", //left or right with respect to the value default "right"
            "diskTextTransform": "@",
            "diskTextAlignment": "@",  //values: start, end, left, center, right
            "diskTextBaseline": "@", //values: top, bottom, middle, alphabetic, hanging
            "diskDisplayValue": "<?",     //Display the value & unit if available as text in middle of disk
            "outerDiskLineWidth": "<?",
            "outerDiskColor": "@",
            "innerDiskColor": "@",
            "innerDiskRangeColors": "<?",  
            
            "unitFontFamily": "@",        
            "unitFontSize": "@",           
            "unitFontWeight": "@",        
            "unitTextColor": "@",        
            "unitBackgroundColor": "@",        
            "unitTextTransform": "@",        
            "unitTextAlignment" : "@",        
            "unitMarginBottom": "@",
            "unit": "@",
            
            "min": "<?",
            "max": "<?",
            "value": "<?",

            "backgroundColor": "@",


            "infoFontFamily": "@",
            "infoFontSize": "@",                      
            "infoFontWeight": "@",         
            "infoTextColor": "@",                   
            "infoBackgroundColor": "@",
            "infoTextTransform": "@",
            "infoTextAlignment": "@",
            "infoMarginTop": "@",
            "info": "@",
            
           
        },
        templateUrl : '/UIComponents/dashboard/frontend/components/diskfill/diskfill.html',
        controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval, dataService) {
            var self = this;
            self.showSelectStream = self.api ? false: true;
            this.$onInit = function() {
                this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/diskFill.svg";
                this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data";
                this.stalledDataMessage = (this.stalledDataMessage) ? this.stalledDataMessage : "No data available.";
                this.dataFailureMessage = (this.dataFailureMessage) ? this.dataFailureMessage : "Failed to fetch data.";
                this.invalidData = (this.invalidData) ? this.invalidData : "Invalid data format.";
                this.hasData = (!isNaN(parseFloat(this.value)) && isFinite(this.value)) ?  true : false;
                this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;
                this.transport = (this.transport) ? this.transport : null;
                this.msgTag = (this.msgTag) ? this.msgTag : null;
                this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
                
                
                
                this.borderSize = (this.borderSize) ? this.borderSize : "1";
                this.borderRadius = (this.borderRadius) ? this.borderRadius : "0";
                this.borderColor = (this.borderColor) ? this.borderColor : "#d7d7d7";
                
                this.backgroundColor = (this.backgroundColor) ? this.backgroundColor : "#ffff";  
               // this.backgroundImage = this.backgroundImage ? this.backgroundImage : "";
               // this.backgroundPosition = (this.backgroundPosition) ? this.backgroundPosition : "right bottom"; 
                //this.backgroundSize = (this.backgroundSize) ? this.backgroundSize : "auto"; 
                //this.backgroundRepeat = (this.backgroundRepeat) ? this.backgroundRepeat : "no-repeat"; 
                
                this.valueCellSize = (this.valueCellSize) ? this.valueCellSize : "medium";   
                this.valueFontFamily = (this.valueFontFamily) ? this.valueFontFamily : "";             
                this.valueFontSize = (this.valueFontSize) ? this.valueFontSize : "42";             
                this.valueFontWeight = (this.valueFontWeight) ? this.valueFontWeight : "";             
                this.valueTextColor = (this.valueTextColor) ? this.valueTextColor : "#d7d7d7";             
                this.valueTextAlignment = (this.valueTextAlignment && this.valueTextAlignment == "right") ? "flex-end" : ( (this.valueTextAlignment && this.valueTextAlignment == "left") ? "flex-start" : "center"); 
                this.valueVerticalAlignment = (this.valueVerticalAlignment && this.valueVerticalAlignment == "bottom") ? "flex-end" : ( (this.valueVerticalAlignment && this.valueVerticalAlignment == "top") ? "flex-start" : "center"); 
                this.valueBackgroundColor = (this.valueBackgroundColor) ? this.valueBackgroundColor : "";  
                this.valueTextTransform = this.valueTextTransform ? this.valueTextTransform : "";
                
                
                this.diskFontFamily = (this.diskFontFamily) ? this.diskFontFamily : "";             
                this.diskFontSize = (this.diskFontSize) ? this.diskFontSize : "18";             
                this.diskFontWeight = (this.diskFontWeight) ? this.diskFontWeight : "";             
                this.diskTextColor = (this.diskTextColor) ? this.diskTextColor : "#686868";             
                this.diskBackgroundColor = (this.diskBackgroundColor) ? this.diskBackgroundColor : "transparent";  
                
                this._diskPosition = (this.diskPosition && this.diskPosition  == "left") ? this.diskPosition : "right";
                
                this.diskTextTransform = this.diskTextTransform ? this.diskTextTransform : "";
                this.diskTextAlignment = (this.diskTextAlignment) ?  this.diskTextAlignment : "center";
                this.diskTextBaseline = (this.diskTextBaseline) ?  this.diskTextBaseline : "middle";
                
                
                self.innerDiskColor = (self.innerDiskColor) ? self.innerDiskColor : "#bebebe";
                self.outerDiskColor = (self.outerDiskColor) ? self.outerDiskColor : "#eee";
                self.outerDiskLineWidth = (self.outerDiskLineWidth) ? self.outerDiskLineWidth : 0;
                
                this.infoFontFamily = (this.infoFontFamily) ? this.infoFontFamily : "";             
                this.infoFontSize = (this.infoFontSize) ? this.infoFontSize : "18";             
                this.infoFontWeight = (this.infoFontWeight) ? this.infoFontWeight : "";             
                this.infoTextColor = (this.infoTextColor) ? this.infoTextColor : "#686868";             
                this.infoBackgroundColor = (this.infoBackgroundColor) ? this.infoBackgroundColor : "";  
                this.infoTextTransform = this.infoTextTransform ? this.infoTextTransform : "";
                this.infoTextAlignment = (this.infoTextAlignment) ? this.infoTextAlignment : "center"; 
                this.infoMarginTop = this.infoMarginTop ? this.infoMarginTop : 0;
                this.info = this.info ? this.info : "";
                
                
                this.unitFontFamily = (this.unitFontFamily) ? this.unitFontFamily : null;             
                this.unitFontSize = (this.unitFontSize) ? this.unitFontSize : null;             
                this.unitFontWeight = (this.unitFontWeight) ? this.unitFontWeight : null;             
                this.unitTextColor = (this.unitTextColor) ? this.unitTextColor : null;             
                this.unitBackgroundColor = (this.unitBackgroundColor) ? this.unitBackgroundColor : null;  
                this.unitTextTransform = this.unitTextTransform ? this.unitTextTransform : null;
                this.unitTextAlignment = (this.unitTextAlignment) ? this.unitTextAlignment : null; 
                this.unitMarginBottom = this.unitMarginBottom ? this.unitMarginBottom : null;
                this.unit = this.unit ? this.unit : "";
                
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
                
 
                this.diskStyle = {
                    'background': this.diskBackgroundColor,
                    'font-weight' : this.diskFontWeight,
                    'font-size' : this.diskFontSize +'px',
                    'font-family' : this.diskFontFamily,
                    'color' : this.diskTextColor,
                    'text-transform': this.diskTextTransform
                }
                
                if(this.valueCellSize == "small") {
                    this.diskStyle["flex"] = "3"
                } else if(this.valueCellSize == "medium") {
                    this.diskStyle["flex"] = "1"
                } else if(this.valueCellSize == "large") {
                    this.valueStyle["flex"] = "3"
                } 
                
                
                this.containerStyle = {
                    'border' : this.borderSize+"px solid "+this.borderColor,
                    'background-color' : this.backgroundColor,
                    'border-radius': this.borderRadius,
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
                
                
                 this.unitStyle = {
                    'background':  this.unitBackgroundColor,
                    'font-weight': this.unitFontWeight,
                    'font-size': (this.unitFontSize) ? (this.unitFontSize +"px") : null,
                    'font-family': this.unitFontFamily,
                    'color': this.unitTextColor,
                    'text-align': this.unitTextAlignment,
                    'text-transform': this.unitTextTransform,
                    'margin-bottom': this.unitMarginBottom+"px"
                }
                
                
                self.min = (self.min) ? self.min : 0;
                self.max = (self.max) ? self.max : 100;
                
            }
            
            
            this.renderDisk =  function(){
                 self.canvas = angular.element($element).find(".diskfill-canvas")[0];
                 if(self.canvas) {
                     self.canvas.width = $element.parent().innerWidth() - angular.element($element).find(".cell-value")[0].offsetWidth;  
                     console.debug("Self canvas width", self.canvas.width)
                     self.canvas.height = $element.parent().height(); 
                     console.debug("Self canvas height", self.canvas.height)
                    if (self.canvas.getContext){
                        var context = self.canvas.getContext('2d');
                        var centerX = self.canvas.width / 2;
                        var centerY = self.canvas.height / 2;
                        var radius = (self.canvas.height <= self.canvas.width) ? (self.canvas.height/2 - self.outerDiskLineWidth - 10) : (self.canvas.width/2 -  self.outerDiskLineWidth - 10);

                        context.beginPath();
                        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                        context.fillStyle = self.outerDiskColor;
                        context.strokeStyle =  self.outerDiskColor;
                        context.fill();
                        context.lineWidth = self.outerDiskLineWidth;
                        context.stroke();

                       // radius is   self.max,
                        if(!isNaN(self.value) && isFinite(self.value)) {
                            self.innerDiskRadius = (self.value * radius) / self.max;

                            context.beginPath();
                            context.arc(centerX, centerY, self.innerDiskRadius, 0, 2 * Math.PI, false);

                            var colorInnerDisk = self.findBackgroundColor(self.value, self.innerDiskRangeColors); 

                            context.fillStyle = (colorInnerDisk) ? colorInnerDisk : self.innerDiskColor;
                            context.strokeStyle =  (colorInnerDisk) ? colorInnerDisk : self.innerDiskColor;
                            context.fill();
                            context.lineWidth = 0;
                            context.stroke();
                            
                            if(self.diskDisplayValue) {
                                context.textAlign = this.diskTextAlignment;
                                context.textBaseline = this.diskTextBaseline;
                                context.font = self.diskFontWeight + " " + self.diskFontSize + "px " + self.diskFontFamily;
                                context.fillStyle =  self.diskTextColor;
                                context.fillText(self.value + ((self.unit) ? self.unit :""), centerX, centerY)
                            }
                        }
                    }
                 } else {
                     self.onResize()
                 }
            }
            
            
            this.findBackgroundColor =function(value, diskRangeColors){
                var match=null;
                if(typeof value === 'string' && diskRangeColors){
                    match=_.find(diskRangeColors,function(e){
                        return e.value==value;
                    });
                }else if(typeof value === 'number' && diskRangeColors){
                    match=_.find(diskRangeColors.slice().reverse(),function(e){
                        return value>=e.value;
                    });
                }
                
                if(match !=null){
                    return match.color;
                }
               	return match;
            }

            this.$postLink = function () {
                self.timeoutId = $timeout(self.resize.bind(self), 100);
                angular.element($window).on('resize', self.onResize);
                if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                    initDataService(this.transport);
                } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                    $scope.$watch(function( $scope ) {
                        // wait for the timeout
                        //if( (!isNaN(parseFloat($scope.$ctrl.data)) && isFinite($scope.$ctrl.data)) ){
                        return $scope.$ctrl.data
                        //}
                    },function(newVal, oldVal){
                        if(JSON.stringify(newVal) != JSON.stringify(oldVal) || !self.hasData){
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
            	this.renderDisk();
                this.calculateNotificationsDisplay();
            }
            this.calculateNotificationsDisplay = function() {
                if($element.parent() && $element.parent().innerWidth() < 240) {
                    self.usePopover = true;
                } else {
                    self.usePopover = false;
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
                    self.dataMessage = this.dataFailureMessage
                    if(self.innerDiskRadius) {
                        self.stalledData = true;
                        self.dataMessage = this.stalledDataMessage
                    }
                } else {
                    if(typeof self.onFormatData() == "function"){
                        data = self.onFormatData()(data, self, $rootScope);
                    }
                    if(data != null ){
                        if(typeof data == "object" && typeof data.value != "undefined" && data.value != null && !isNaN(data.value) && isFinite(data.value)){  
                            self.data = angular.copy(data);
                            self.value = self.data.value;
                            if(data.info) {
                                self.info = self.data.info;
                            }
                            self.renderDisk()
                            self.hasData = true;
                            self.noResults = false;
                            self.stalledData = false;
                        } else {
                            self.noResults = true;
                            if(self.resetDataOnConsume) {
                                self.value = null;
                                 self.noResults = true;
                            	 self.stalledData = false;
                            }else{
                                self.noResults = true;
                                if(self.value != null) {
                                    self.stalledData = true;
                                } 
                            }
                            self.dataMessage = this.invalidData;
                        }
                    } 
                    
                   if(typeof data == "undefined" || data == null || (data != null && (typeof data.value == "undefined" || data.value == null)))  {
                        if(self.resetDataOnConsume) {
                            self.value = null;
                            self.noResults = true;
                            self.stalledData = false;
                        }else{
                            self.noResults = true;
                            if(self.value != null) {
                                self.stalledData = true;
                            } 
                        }
                        self.dataMessage = this.stalledDataMessage
                    }
                }
            }
        }
        });
