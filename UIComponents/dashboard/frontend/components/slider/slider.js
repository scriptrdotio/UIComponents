angular.module('Slider', [ 'rzModule' ]);

angular
      .module('Slider')
      .component(
            'scriptrSlider',
            {

               bindings : {

                "onLoad" : "&onLoad",
                   
                "theme": "@",
                   
                "id": "@",   

                "min" : "<?",

                "max" : "<?",
                   
                "floor": "<?",
                "ceil": "<?", //defaults to rz-slider-model
                "step": "<?",
                "precision": "<?",
                "minLimit": "<?",
                "maxLimit": "<?",
                "minRange": "<?",
                "maxRange": "<?",
                "pushRange": "<?",
                "id": "<?",
                "translate": "<?",
                "getLegend": "<?",
                "stepsArray": "<?",
                "bindIndexForStepsArray": "<?",
                "draggableRange": "<?",
                "draggableRangeOnly": "<?",
                "showSelectionBar": "<?",
                "showSelectionBarEnd": "<?",
                "showSelectionBarFromValue": "<?",
                "hidePointerLabels": "<?",
                "hideLimitLabels": "<?",
                "autoHideLimitLabels": "<?", // true
                "readOnly": "<?",
                "isDisabled": "<?",
                "interval": "<?", // 350
                "showTicks": "<?",
                "showTicksValues": "<?",
                "ticksArray": "<?",
                "ticksTooltip": "<?",
                "ticksValuesTooltip": "<?",
                "vertical": "<?",
                "getSelectionBarColor": "&",
                "getTickColor": "<?",
                "getPointerColor": "<?",
                "keyboardSupport": "<?", //true
                "scale": "<?", // 1
                "enforceStep": "<?", // true
                "enforceRange": "<?",
                "noSwitching": "<?",
                "onlyBindHandles": "<?",
                "onStart": "&",
                "onChange": "&",
                "onEnd": "&",
                "rightToLeft": "<?",
                "boundPointerLabels": "<?", //true
                "mergeRangeLabelsIfSame": "<?",
                "customTemplateScope": "<?",
                "logScale": "<?",
                "customValueToPosition": "<?",
                "customPositionToValue": "<?",
                "selectionBarGradient": "<?",
                "ariaLabel": "<?",
                "ariaLabelledBy": "<?",
                "ariaLabelHigh": "<?",
                "ariaLabelledByHigh": "<?",
                   
                   
                "enableResize" : "<?",   
                   
                "transport": "@",
                "api" : "@",
                "msgTag" : "@",
                "httpMethod": "@",
               	"apiParams" : "<?",
                "onFormatData" : "&",
                "fetchDataInterval": "@",
                "useWindowParams": "@",
                "serviceTag": "@",

                "actionTransport" : "@",
                "actionApi" : "@",
                "actionApiParams": "<?",  
                "actionUseWindowParams": "@",
                "actionHttpMethod": "@",
               },
               templateUrl : '/UIComponents/dashboard/frontend/components/slider/slider.html',
               controller : function($scope, $element, $window, $timeout, httpClient, wsClient,dataService) {

	               var self = this;

	               this.$onInit = function() {
                       
                       this.min = (this.min) ? this.min : null;
                       this.max = (this.max) ? this.max : null;
                       this.theme = (this.theme) ? this.theme : "";
                       
                       this.options = {}
                       
                       this.options.id = (typeof this.id != 'undefined')? this.id : null;
                       this.options.floor = (typeof this.floor != 'undefined')? this.floor : 0;
                       this.options.ceil = (typeof this.ceil != 'undefined')? this.ceil : 10;
                       this.options.step = (typeof this.step != 'undefined')? this.step : 1;
                       this.options.precision= (typeof this.precision != 'undefined')? this.precision : 0;
                       this.options.minLimit= (typeof this.minLimit != 'undefined')? this.minLimit : null;
                       this.options.maxLimit= (typeof this.maxLimit != 'undefined')? this.maxLimit : null;
                       this.options.minRange= (typeof this.minRange != 'undefined')? this.minRange : null;
                       this.options.maxRange=(typeof this.maxRange != 'undefined')? this.maxRange : null;
                       this.options.pushRange= (typeof this.pushRange != 'undefined')? this.pushRange : false;
                       this.options.translate=(typeof this.translate != 'undefined')? this.translate : null;
                       this.options.getLegend=(typeof this.getLegend != 'undefined')? this.getLegend : null;
                       this.options.stepsArray=(typeof this.stepsArray != 'undefined')? this.stepsArray : null;
                       this.options.bindIndexForStepsArray=(typeof this.bindIndexForStepsArray != 'undefined')? this.bindIndexForStepsArray : false;
                       this.options.draggableRange=(typeof this.draggableRange != 'undefined')? this.draggableRange : false;
                       this.options.draggableRangeOnly=(typeof this.draggableRangeOnly != 'undefined')? this.draggableRangeOnly : false;
                       this.options.showSelectionBar = (typeof this.showSelectionBar != 'undefined')? this.showSelectionBar : false;
                       this.options.showSelectionBarEnd = (typeof this.showSelectionBarEnd != 'undefined')? this.showSelectionBarEnd : false;
                       this.options.showSelectionBarFromValue = (typeof this.showSelectionBarFromValue != 'undefined')? this.showSelectionBarFromValue : null;
                       this.options.hidePointerLabels= (typeof this.hidePointerLabels != 'undefined')? this.hidePointerLabels : false;
                       this.options.hideLimitLabels= (typeof this.hideLimitLabels != 'undefined')? this.hideLimitLabels : false;
                       this.options.autoHideLimitLabels= (typeof this.autoHideLimitLabels != 'undefined')? this.autoHideLimitLabels : true;
                       this.options.readOnly= (typeof this.readOnly != 'undefined')? this.readOnly : false;
                       this.options.disabled=(typeof this.isDisabled != 'undefined')? this.isDisabled : false;
                       this.options.interval= (typeof this.interval != 'undefined')? this.interval : 350;
                       this.options.showTicks=(typeof this.showTicks != 'undefined')? this.showTicks : false;
                       this.options.showTicksValues=(typeof this.showTicksValues != 'undefined')? this.showTicksValues : false;
                       this.options.ticksArray=(typeof this.ticksArray != 'undefined')? this.ticksArray : null;
                       this.options.ticksTooltip=(typeof this.ticksTooltip != 'undefined')? this.ticksTooltip : null;
                       this.options.ticksValuesTooltip=(typeof this.ticksValuesTooltip != 'undefined')? this.ticksValuesTooltip : null;
                       this.options.vertical=(typeof this.vertical != 'undefined')? this.vertical : false;
                       this.options.getSelectionBarColor=(typeof this.getSelectionBarColor() == 'function')? this.getSelectionBarColor() : null;
                       this.options.getTickColor=(typeof this.getTickColor != 'undefined')? this.getTickColor : null;
                       this.options.getPointerColor=(typeof this.getPointerColor != 'undefined')? this.getPointerColor : null;
                       this.options.keyboardSupport=(typeof this.keyboardSupport != 'undefined')? this.keyboardSupport : true;
                       this.options.scale=(typeof this.scale != 'undefined')? this.scale : 1;
                       this.options.enforceStep=(typeof this.enforceStep != 'undefined')? this.enforceStep : false;
                       this.options.enforceRange=(typeof this.enforceRange != 'undefined')? this.enforceRange : false;
                       this.options.noSwitching=(typeof this.noSwitching != 'undefined')? this.noSwitching : false;
                       this.options.onlyBindHandles = (typeof this.onlyBindHandles != 'undefined')? this.onlyBindHandles : null;
                       this.options.onStart = (typeof this.onStart() != 'function')? this.onStart : null;
                       this.options.onChange = (typeof this.onChange() != 'function')? this.onChange : null;
                       this.options.onEnd= this.publishData;
                       this.options.rightToLeft= (typeof this.rightToLeft != 'undefined')? this.rightToLeft : false;
                       this.options.boundPointerLabels= (typeof this.boundPointerLabels != 'undefined')? this.boundPointerLabels : true;
                       this.options.mergeRangeLabelsIfSame= (typeof this.mergeRangeLabelsIfSame != 'undefined')? this.mergeRangeLabelsIfSame : false;
                       this.options.customTemplateScope=(typeof this.customTemplateScope != 'undefined')? this.customTemplateScope : null;
                       this.options.logScale= (typeof this.logScale != 'undefined')? this.logScale : false;
                       this.options.customValueToPosition=(typeof this.customValueToPosition != 'undefined')? this.customValueToPosition : null;
                       this.options.customPositionToValue=(typeof this.customPositionToValue != 'undefined')? this.customPositionToValue : null;
                       this.options.selectionBarGradient=(typeof this.selectionBarGradient != 'undefined')? this.selectionBarGradient : null;
                       this.options.ariaLabel=(typeof this.ariaLabel != 'undefined')? this.ariaLabel : null;
                       this.options.ariaLabelledBy=(typeof this.ariaLabelledBy != 'undefined')? this.ariaLabelledBy : null;
                       this.options.ariaLabelHigh=(typeof this.ariaLabelHigh != 'undefined')? this.ariaLabelHigh : null;
                       this.options.ariaLabelledByHigh=(typeof this.ariaLabelledByHigh != 'undefined')? this.ariaLabelledByHigh : null;
                       
                       this.transport = (this.transport) ? this.transport : null;
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       this.enableResize = (typeof this.enableResize != 'undefined') ? this.enableResize : true;
                       this.actionParams = (this.actionParams != "undefined") ? this.actionParams : ((this.apiParams) ? this.apiParams : {});
                       this.style = {};

                       $timeout(function() {
                          $scope.$broadcast('reCalcViewDimensions');
                          $scope.$broadcast('rzSliderForceRender');
                       }, 2000)

	               }
                   
                   this.$postLink = function() {
                       initDataService(this.transport);
                       
                       if(this.data && !this.api) {
                            self.timeout = false; 
                            $timeout(function() {
                                if(self.timeout == false) {
                                    self.consumeData(self.data);
                                }
                            }, 2000);
                        } else {
                            self.timeout = true;
                        }
                   }
                   
                   this.publishData = function(sliderId, modelValue, highValue, pointerType){
                       if(typeof self.onEnd() == "function"){
                           self.onEnd()(sliderId, modelValue, highValue, pointerType); 
                       }
                       if(typeof self.actionApiParams == 'undefined'){
                           self.actionApiParams = {};
                       }
                       if(sliderId){
                           self.actionApiParams["sliderId"] = sliderId;
                       }
                       if(modelValue){
                           self.actionApiParams["modelValue"] = modelValue;
                       }
                       if(highValue){
                           self.actionApiParams["highValue"] = highValue;
                       }
                       if(pointerType){
                           self.actionApiParams["pointerType"] = pointerType;
                       }
                       
                       var requestInfo = {
                           "api": (self.actionApi) ? self.actionApi : self.api,
                           "transport": (self.actionTransport) ? (self.actionTransport) : self.transport,
                           "apiParams": self.actionApiParams,
                           "useWindowParams": (self.actionUseWindowParams) ? self.actionUseWindowParams : self.useWindowParams,
                           "httpMethod": (self.actionHttpMethod) ? self.actionHttpMethod : self.httpMehtod
                       };
                       dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));
                   }
                   
                  this.$onDestroy = function() {
                      if(self.msgTag){
                          wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
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
                       if(typeof this.onFormatData() == "function"){
                         data = this.onFormatData()(data, self);
                       }
                       data = parseInt(data);
                       if(typeof data == "number" && data.toString() != "NaN"){
                         data = data;
                         this.min = data;  
                       }else{
                         data = 0;
                       }
	               }
               }
            });
