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

                  "apiData" : "@",

                  "valueFontColor" : "@",

                  "min" : "@",

                  "max" : "@",

                  "hideMinMax" : "@",

                  "hideValue" : "@",

                  "hideInnerShadow" : "@",

                  "gaugeColor" : "@",

                  "showInnerShadow" : "@",
                 
                  "gaugeValue" : "@",

                  "shadowSize" : "@",

                  "shadowOpacity" : "@",

                  "label" : "@",

                  "labelFontColor" : "@",

                  "startAnimationType" : "@",

                  "refreshAnimationType" : "@",

                  "counter" : "@"

               },
               templateUrl : 'gauge.html',
               controller : function(httpClient, wsClient) {

	               var self = this;

	               this.$onInit = function() {
		               this.gaugeValue = (this.gaugeValue) ? this.gaugeValue : 0;
		               this.customSectors = (this.customSectors) ? this.customSectors
		                     : [ {
		                        color : "#A3CD3B",
		                        lo : 0,
		                        hi : 25
		                     }, {
		                        color : "#FF4A43",
		                        lo : 25,
		                        hi : 100
		                     } ];
		               this.valueFontColor = (this.valueFontColor) ? this.valueFontColor
		                     : "#999";
		               this.min = (this.min) ? this.min : 0;
		               this.max = (this.max) ? this.max : 100;
		               this.hideMinMax = (this.hideMinMax) ? this.hideMinMax
		                     : false;
		               this.hideValue = (this.hideValue) ? this.hideValue : false;
		               this.hideInnerShadow = (this.hideInnerShadow) ? this.hideInnerShadow
		                     : true;
		               this.gaugeColor = (this.gaugeColor) ? this.gaugeColor
		                     : "#e9e9e9";
		               this.showInnerShadow = (this.showInnerShadow) ? this.showInnerShadow
		                     : false;
		               this.shadowSize = (this.shadowSize) ? this.shadowSize : 0;
		               this.shadowOpacity = (this.shadowOpacity) ? this.shadowOpacity
		                     : 0;
		               this.label = (this.label) ? this.label : "% full";
		               this.labelFontColor = (this.labelFontColor) ? this.labelFontColor
		                     : "#666";
		               this.startAnimationType = (this.startAnimationType) ? this.startAnimationType
		                     : "linear";
		               this.refreshAnimationType = (this.refreshAnimationType) ? this.refreshAnimationType
		                     : "linear";
		               this.counter = (this.counter) ? this.counter : true;

		               this.transport = (this.transport) ? this.transport : "wss";
		               this.msgTag = (this.msgTag) ? this.msgTag : null;

		               initDataService(this.transport);

	               }

	               var initDataService = function(transport) {
		               if (transport == "wss") {
			               wsClient.onReady.then(function() {
				               // Subscribe to socket messages with id chart
				               wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
				               if(self.api) {
                                  wsClient.call(self.api, self.apiData, self.msgTag)
                                   .then(function(data, response) {
                                       self.consumeData(data)
                                   });
				               }
				               
			               });
		               } else {
			               if (transport == "http" && self.api) {
				               httpClient
				                     .get(self.api, self.apiData)
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
		               this.gaugeValue = data;
	               }
               }
            });
