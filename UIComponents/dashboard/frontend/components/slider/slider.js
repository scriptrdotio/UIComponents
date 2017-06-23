angular.module('Slider', [ 'rzModule' ]);

angular
      .module('Slider')
      .component(
            'scriptrSlider',
            {

               bindings : {

                "onLoad" : "&onLoad",
                   
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
                   
                "publishApi": "@",   
                   
                "api": "@",   
                   
                "transport": "@",   
                   
                "msgTag" : "@",

                "apiParams" : "<?",
                   
                "publishApiParams" : "<?",   
                   
                "onFormatData" : "&"

                 

               },
               templateUrl : '/UIComponents/dashboard/frontend/components/slider/slider.html',
               controller : function($scope, $element, $window, $timeout, httpClient, wsClient) {

	               var self = this;

	               this.$onInit = function() {
                       
                       this.min = (this.min) ? this.min : null;
                       this.max = (this.max) ? this.max : null;
                       
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
                       this.options.id=(typeof this.id != 'undefined')? this.id : null;
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
                       this.options.onEnd= publishData;
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
                       
                       this.transport = (this.transport) ? this.transport : "wss";
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                       
                       this.style = {};
                       angular.element($window).on('resize', function() {
                           if (self.timeoutId != null) {
                           	$timeout.cancel(self.timeoutId);
                         	}
                        	 return self.timeoutId = $timeout(self.resize, 100);
                        });

		               initDataService(this.api, self.apiParams, this.transport);

	               }
                   
                   var publishData = function(sliderId, modelValue, highValue, pointerType){
                       if(typeof self.onEnd() == "function"){
                           self.onEnd()(sliderId, modelValue, highValue, pointerType); 
                       }
                       if(typeof self.publishApiParams == 'undefined'){
                           self.publishApiParams = {};
                       }
                       if(sliderId){
                           self.publishApiParams["sliderId"] = sliderId;
                       }
                       if(modelValue){
                           self.publishApiParams["modelValue"] = modelValue;
                       }
                       if(highValue){
                           self.publishApiParams["highValue"] = highValue;
                       }
                       if(pointerType){
                           self.publishApiParams["pointerType"] = pointerType;
                       }
                       initDataService(self.api, self.publishApiParams, self.transport);
                   }
                   
                   self.resize = function(){
                       self.timeoutId = null;
                  		self.style["margin-top"] = ($element.parent().outerHeight(true)/2) - ($element.outerHeight(true)/2);
                 }
                  
                  this.$postLink = function() {
                       $timeout(self.resize,100);
                       if (self.timeoutId != null) {
                       	$timeout.cancel(self.timeoutId);
                     	}
                    	self.timeoutId = $timeout(self.resize, 100);
                  }    

                            
                  this.$onDestroy = function() {
                      console.log("destory slider")
                      angular.element($window).off('resize');
                      if(self.msgTag){
                          wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                      }
                  }
                  
	               var initDataService = function(api, params, transport) {
		               if (transport == "wss") {
			               wsClient.onReady.then(function() {
				               // Subscribe to socket messages with id chart
                               if(self.msgTag){
                                 wsClient.subscribe(self.msgTag, self.consumeData.bind(self), $scope.$id);  
                               }
				               if(api) {
                                  wsClient.call(api, params, self.msgTag)
                                   .then(
                                    function(data, response) {
                                       self.consumeData(data)
                                   },
                                   function(err) {
                                    console.log( "reject published promise", err);
                                    self.consumeData();
                                  });
				               }
				               
			               });
		               } else {
			               if (transport == "https" && api) {
                               if(self.httpsMethod == "post"){
				               httpClient
				                     .post(api, params)
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
                           }else{
                               httpClient
				                     .get(api, params)
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
	               }

	              this.consumeData = function(data, response) {
                       if(typeof this.onFormatData() == "function"){
                         data = this.onFormatData()(data);
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
