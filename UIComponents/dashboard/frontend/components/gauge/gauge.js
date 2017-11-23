angular.module('Gauge', [ 'frapontillo.gage' ]);

angular
      .module('Gauge')
      .component(
            'scriptrGauge',
            {

               bindings : {

                  "onLoad" : "&onLoad",

                  "api" : "@",

                  "transport" : "@",

                  "msgTag" : "@",

                  "apiParams" : "<?",

                  "valueFontColor" : "@", // color of the value text (string)

                  "min" : "@", // minimum value (float)

                  "max" : "@", // maximum value (float)

                  "hideMinMax" : "@", // hide min and max values (bool)

                  "hideValue" : "@", // hide value text (bool)

                  "showInnerShadow" : "<?", // show inner shadow

                  "gaugeColor" : "@", // background color of gauge element (string)

                  "gaugeValue" : "<?", //value to show (float)
                  "data" : "<?",
                  
                  "customSectors": "<?", // array of objects with color, hi, lo attributes ([ of object])

                  "shadowSize" : "@", // inner shadow size (int)

                  "shadowOpacity" : "@", // shadow opacity, values 0 ~ 1 (int)

                  "label" : "@", // text to show below value (string)

                  "labelFontColor" : "@", // color of label under the value (string)

                  "startAnimationType" : "@", // type of initial animation (linear, >, <, <>, bounce) (string)

                  "refreshAnimationType" : "@", // type of refresh animation (linear, >, <, <>, bounce) (string)
                 
                   /** Title removed in latest justgage revision 1.2.9
                 /** "title" : "@", // gauge title text
                 
                  "titleFontColor" : "@", // color of the title text
                 
                  "titleFontFamily" : "@", // font-family of the title text
                 
                  "titlePosition" : "@", // "above" or "below" the gauge 
                  "titleMinFontSize" : "@", // absolute minimum font size for the title
                  **/ 
                 
                  "valueFontFamily" : "@", // font-family of the value text (string)
                 
                  "relativeGaugeSize" : "@", // true if the gauge has to grow with the container (bool)
                 
                  "valueMinFontSize" : "@", // absolute minimum font size for the value (int)
                  
                 
                  "hideMinMax" : "@",
                 
                  "labelMinFontSize" : "@", // absolute minimum font size for the label
                 
                  "minLabelMinFontSize" : "@", // absolute minimum font size for the minimum label
                 
                  "maxLabelMinFontSize" : "@", // absolute minimum font size for the maximum label
                 
                  "gaugeWidthScale" : "@", // width of the gauge element (float)
                 
                  "shadowVerticalOffset" : "@", // how much is shadow offset from top (int)
                 
                  "levelColors" : "@", // array of strings, colors of indicator, from lower to upper, in hex format (string[])
                 
                  "noGradient" : "@", // true to use sector-based color change, false to use gradual color change (bool)
                 
                  "startAnimationTime" : "@", // length of initial load animation (int)
                 
                  "refreshAnimationTime" : "@", // length of refresh animation (int)
                 
                  "donut" : "@", // turn the gauge into a full circle donut (bool)
                 
                  "donutStartAngle" : "@", // angle to start from when in donut mode (int)
                 
                  "reverse" : "@", // if true, max and min are swapped (with max appearing on the left, min on the right) boolean
                 
                  "decimals" : "@", // quantity of decimal numbers to show (int)
                 
                  "symbol" : "@", // unit of measure that will be appended to value (string)
                 
                  "formatNumber" : "@", // whether to format numbers (bool)
                 
                  "humanFriendly" : "@", // true to show shorthand big numbers (300K instead of 300XXX) bool
                 
                  "humanFriendlyDecimal" : "@", // number of decimal places for our human friendly number to contain (int)
                 
                  "textRenderer" : "&", // function applied before rendering text (func)
                 
                  "onAnimationEnd" : "&", // function applied after animation is done (func)
                 
                  "pointer" : "<?", // show value pointer
                 
                  "onFormatData" : "&",
                 
                  "heightUnit" : "@",

                  "counter" : "@", // increase numbers one by one (bool)
                  "width": "@", //  gauge width in % (int)
                  "height": "@", // gauge height in px (int)
                 

               },
               templateUrl : '/UIComponents/dashboard/frontend/UIComponents/Components/gauge/gauge.html',
               controller : function($scope, httpClient, wsClient) {

	               var self = this;

	               this.$onInit = function() {
	               	
		             this.gaugeValue = (this.gaugeValue) ? this.gaugeValue : ((this.data) ? this.data : 0 );
		               
                     this.heightUnit = (this.heightUnit) ? this.heightUnit : "px";
		               this.customSectors = (this.customSectors) ? this.customSectors
		                     : {  percents: true,
                                  ranges: [{
                                    color : "#A3CD3B",
                                    lo : 0,
                                    hi : 25
                                  },{
                                    color : "#FF4A43",
                                    lo : 25,
                                    hi : 100
                                  }]
                                };
		               this.valueFontColor = (this.valueFontColor) ? this.valueFontColor
		                     : "#999";
		               this.min = (this.min) ? this.min : 0;
		               this.max = (this.max) ? this.max : 100;
		               this.hideMinMax = (this.hideMinMax) ? this.hideMinMax
		                     : false;
		               this.hideValue = (this.hideValue) ? this.hideValue : false;
		               this.gaugeColor = (this.gaugeColor) ? this.gaugeColor
		                     : "#e9e9e9";
		               this.shadowSize = (this.shadowSize) ? this.shadowSize : 0;
		               this.label = (this.label) ? this.label : "";
		               this.labelFontColor = (this.labelFontColor) ? this.labelFontColor
		                     : "#666";
		               this.startAnimationType = (this.startAnimationType) ? this.startAnimationType
		                     : "linear";
		               this.refreshAnimationType = (this.refreshAnimationType) ? this.refreshAnimationType
		                     : "linear";
		               this.counter = (this.counter) ? this.counter : true;

		               this.transport = (this.transport) ? this.transport : "wss";
		               this.msgTag = (this.msgTag) ? this.msgTag : null;
                     
                      //this.width = (this.width) ? this.width : 50;
                      //this.height = (this.height) ? this.height : 300;

		               initDataService(this.transport);

	               }
                   
                            
                this.$onDestroy = function() {
                    console.log("destory gauge")
                    if(self.msgTag){
                        wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                    }
                }
                  
	               var initDataService = function(transport) {
		               if (transport == "wss") {
			               wsClient.onReady.then(function() {
				               // Subscribe to socket messages with id chart
				               if(self.msgTag){
                                 wsClient.subscribe(self.msgTag, self.consumeData.bind(self), $scope.$id);  
                               }
				               if(self.api) {
                                  wsClient.call(self.api, self.apiParams, self.msgTag)
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
			               if (transport == "https" && self.api) {
				               httpClient
				                     .get(self.api, self.apiParams)
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

	              this.consumeData = function(data, response) {
                       if(typeof this.onFormatData() == "function"){
                         data = this.onFormatData()(data);
                       }
                       data = parseInt(data);
                       if(typeof data == "number" && data.toString() != "NaN"){
                         data = data;
                       }else{
                         data = 0;
                       }
		               this.gaugeValue = data;
	               }
               }
            });
