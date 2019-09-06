angular.module('plotly', ['angularPlotly']);

angular
    .module('plotly')
    .component(
        'scriptrPlotly',
        {

            bindings : {
				
                "fetchPeriod": "@",
                
                "displayMetricValue" : "@",
                   
        	    "displayMetricParam" : "@",
                
                "defaultMetricValue" : "@",
                   
                "defaultMetricParam" : "@",
                   
                "availableUnits": "<?",
                
                "isScaled": "@",
                
                "fetchFromDateParam" : "@",
                
                "fetchFromDateValue" : "@",
                
                "fetchToDateParam" : "@",
                
                "fetchToDateValue" : "@",
                
                "fetchDataInterval" : "@",
                
                "onLoad" : "&onLoad",

                "api" : "@",

                "retrievedData" : "<?",
                
                "customRanges": "<?",
                
                "layout" : "<?",
                
                "options" : "<?",

                "transport" : "@",
                
                "showLegend" : "@",
                
                "fontSize" : "@",
                
                "msgTag" : "@",

                "apiParams" : "<?",

                "onFormatData" : "&"
            },
            templateUrl : '/UIComponents/dashboard/frontend/components/plotly/plotly.html',
            controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval,dataService) {

                var self = this;
                this.directions = ["N", "NNE", "ENE", "E", "ESE", "SSE", "S", "SSW", "WSW", "W", "WNW", "NNW"];
                this.speedUnit = "m/s";
                this.noResults = false;
                this.showSelectStream = self.api ? false: true;
		
                this.$onInit = function() {
                    console.log("on init started")
               	  this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                    
                    if(this.apiParams && this.apiParams.streams && this.apiParams.streams.length < 2)
                        this.showSelectStream = true;
                    
                    this.plotCustomRanges = (this.customRanges && this.customRanges.length > 0) ? this.customRanges :  [{"color": "#00476b", "lo": 0, "hi": 2}, {"color": "#005487", "lo": 2, "hi": 4}, {"color": "#006699", "lo": 4, "hi": 6}, {"color": "#0082b5", "lo": 6, "hi": 8}, {"color": "#0294c1", "lo": 8, "hi": 10}, {"color": "#06a9ce", "lo": 10, "hi": 20}];
                    
                    this.fetchFromDateParam = (this.fetchFromDateParam) ? this.fetchFromDateParam : "from_date";
                    this.fetchToDateParam = (this.fetchToDateParam) ? this.fetchToDateParam : "to_date";

                    this.fetchToDateValue = (this.fetchToDateValue) ? this.fetchToDateValue : null;
                    this.fetchFromDateValue = (this.fetchFromDateValue) ? this.fetchFromDateValue : null;


                    if(this.fetchFromDateValue) {
                        this._apiParams[this.fetchFromDateParam] = this.fetchFromDateValue
                    }

                    if(this.fetchToDateValue) {
                        this._apiParams[this.fetchToDateParam] = this.fetchToDateValue
                    }
                    
                    this.displayMetricParam = (this.displayMetricParam) ? this.displayMetricParam : "display_metric";
             
              		this.displayMetricValue = $rootScope.currentDashboardUnit;//(this.displayMetricValue) ? this.displayMetricValue : null;
              
                    this.defaultMetricParam = (this.defaultMetricParam) ? this.defaultMetricParam : "default_metric";
             
              		this.defaultMetricValue = (this.defaultMetricValue) ? this.defaultMetricValue : null;
                    
                    this.retrievedData = this.retrievedData ? this.retrievedData : [];
                    
                    this.staticData = angular.copy(this.retrievedData);
                    this.data = angular.copy(this.retrievedData);
                    
                    //Run only if we have a default and display metric that do not match
                    if((!this.isScaled || this.isScaled == "false") && this.defaultMetricValue && this.displayMetricValue && (this.defaultMetricValue != this.displayMetricValue) && (this.availableUnits && Object.keys(this.availableUnits).length >= 2)) {
                       	this.runMetricTransformation();
                    }
                    
                    this.showLegend = this.showLegend ? this.showLegend : "false";
                    
                    this.fontSize = this.fontSize ? this.fontSize : "12";
                    this.layout = {
                        title: '',
                        font: {size: this.fontSize},
                        radialaxis: {ticksuffix: '%'},
                        orientation: 270
                    };
                    
                    //get highest value in ranges
                    this.maxRange = _.max(_.pluck(this.plotCustomRanges, "hi"));
                    
                    this.listOfMinRanges = _.pluck(this.plotCustomRanges, "lo");
                    this.listOfMaxRanges = _.pluck(this.plotCustomRanges, "hi");
                    this.listOfColors = _.pluck(this.plotCustomRanges, "color");
                    //color corresponding to values greater than the highest value published by user
                    this.listOfColors.push("#10c3e0");
                    if(!this.isScaled || this.isScaled == "false")
                        this.speedUnit =  (this.availableUnits) ? this.availableUnits[this.displayMetricValue] : ((this.speedUnit) ? this.speedUnit : "");
                    else
                        this.speedUnit =  (this.availableUnits) ? this.availableUnits["scaled"] : ((this.speedUnit) ? this.speedUnit : "");
                    
                    this.style = {};
                    angular.element($window).on('resize', self.scheduleResize);
                    console.log("before initDataService");
                   
                    self.initDataService(this.transport);
                }
                
                self.resize = function(){
                    self.timeoutId = null;
                    if($window.matchMedia($rootScope.mobileBreakPoint).matches) {
                        self.style["height"] = "300";
                    	self.style["width"] = $element.parent()[0].clientWidth;
                    } else {
                        if(!(self.showLegend != null && self.showLegend == "true")) {
                             self.style["height"] = $element.parent()[0].clientHeight;
                    		 self.style["width"] = $element.parent()[0].clientWidth;
                        } else {
                            //self.style["height"] = $element.parent()[0].clientHeight;
                            console.log($element.find(".plotly-chart-legend"));
                    	//self.style["width"] = $element.parent()[0].clientWidth - $element.find(".plotly-chart-legend").clientHeight - 10;
                        //Might happen due to timeout order
                            if(self.style["width"] <= 0 ) {
                                self.style["width"] = $element.parent()[0].clientWidth 
                            }
                        }
                     
                        
                        
                    }
                    
                    self.layout.width = 
                        width: self.style["width"];
                    self.layout.height = 
                        width: self.style["height"];
                }
                
                 this.runMetricTransformation = function() {
                     if(this.defaultMetricValue != "si"){
                         var from_unit = this.availableUnits["us"];
                         var to_unit =  this.availableUnits["si"];
                     }else{
                         var from_unit = this.availableUnits["si"];
                         var to_unit =  this.availableUnits["us"];
                     }    

                     var conversionFunction = getConversionFunction(from_unit, to_unit);
                     //Transform the low higgh values of sector 
                     if(this.plotCustomRanges){
                         for(var x=0; x<this.plotCustomRanges.length; x++){
                             var lo = this.plotCustomRanges[x].lo;
                             var hi = this.plotCustomRanges[x].hi;

                             if(typeof conversionFunction == "function"){
                                 var low = conversionFunction(lo);
                                 this.plotCustomRanges[x].lo = (Number.isInteger(parseFloat(low)) ? low : parseFloat(low).toFixed(2));
                                 var high = conversionFunction(hi);
                                 this.plotCustomRanges[x].hi = (Number.isInteger(parseFloat(high)) ? high : parseFloat(high).toFixed(2));
                             }
                         }
                     }
                 }

                this.$postLink = function () {
                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }
                    self.timeoutId = $timeout(self.resize, 100);
                    $scope.$watch(function( $scope ) {
                        return $scope.$ctrl.retrievedData
                    },function(newData){
                        self.retrievedData = newData;
                    });
                }
                
                this.$onDestroy = function() {
                    angular.element($window).off('resize', self.scheduleResize);
                    console.log("destory wind rose")
                    if(self.msgTag){
                        wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                    }
                     if(self.refreshTimer)
              			$interval.cancel( self.refreshTimer );
                }
                
                self.scheduleResize = function() {
                        if (self.timeoutId != null) {
                            $timeout.cancel(self.timeoutId);
                        }
                        return self.timeoutId = $timeout(self.resize, 100);
          		}

                self.initDataService = function(transport) {
                    console.log("initDataService called")
                    dataService.getData(transport, self.api, self.apiParams, self.useWindowParams, self.msgTag, self.consumeData.bind(self), self.fetchDataInterval, $scope.$id);

                    if (self.fetchDataInterval && !self.refreshTimer) {
                        //Assuming this is success
                        self.refreshTimer = $interval(
                            function () {
                                self.initDataService(self.transport)
                            }, self.fetchDataInterval * 1000);
                    }
                }

                this.consumeData = function(data, response) {
                    console.log("consumeData called",data)
                    if(_.isEqual(this.retrievedData.data, this.staticData))
                        this.retrievedData = [];
                    
                    if(typeof this.onFormatData() == "function"){
                        data = this.onFormatData()(data);
                        console.log("data after format",data)
                    }
                    if(data && data.data && data.data.length > 0){
                        if(this.fetchDataInterval && this.fetchDataInterval > 0 && this.retrievedData && this.retrievedData.length > 0 && this.delta) {
                            for(var i = 0; i < data.data.length; i++){
                               this.retrievedData[i]["speeds"] = this.retrievedData[i]["speeds"].concat(data.data[i]["speeds"]); 
                               this.retrievedData[i]["dates"] = this.retrievedData[i]["dates"].concat(data.data[i]["dates"]); 
                            }
                        } else {
                            this.retrievedData = data.data;
                        }
                        if(data.latestDate)
                        	this.latestRetrievedDataDate = data.latestDate
                        this.buildWindRoseData();
                    }else{
                        if((this.api && data.length == 0) && (!this.retrievedData || (this.retrievedData && this.retrievedData.length == 0))) {
                            this.retrievedData = [];
                            this.noResults = true;
                        }
                    }
                    console.log(this.retrievedData)
                }
                
                this.buildWindRoseData = function(){
                    var speedsArrays = _.pluck(self.retrievedData, "speeds");
                    self.totalSpeeds = 0;
                    for(var i = 0; i < speedsArrays.length; i++){
                        self.totalSpeeds += speedsArrays[i].length;
                    }
                    
                    if(self.totalSpeeds == 0)
                        self.noResults = true;
                    else
                        self.noResults = false;
                    
                    //get percentage of each direction per speed range
                    self.speedRangeDirectionObj = {};
                    for(var i = 0; i < self.listOfMinRanges.length; i++){
                        self.speedRangeDirectionObj[self.listOfMinRanges[i] + "-" + self.listOfMaxRanges[i]] = [];
                    }
                    
                    self.speedRangeDirectionObj[">=" + self.maxRange] = [];
                    
                    for(var i = 0; self.retrievedData && i < self.retrievedData.length; i++){
                        var direction = self.retrievedData[i].direction;
                        var speeds = self.retrievedData[i].speeds;
                        
                        //get percentage of speeds falling in each range for the current direction
                        for(var j = 0; j < self.plotCustomRanges.length; j++){
                            var customRange = this.plotCustomRanges[j];
                        	 var numberOfSpeedsPerRange = _.filter(speeds, function(speed){
                                return (speed >= customRange.lo && speed < customRange.hi);
                            }).length;
                                
                            self.speedRangeDirectionObj[self.plotCustomRanges[j].lo + "-" + self.plotCustomRanges[j].hi].push({"direction": direction, "percentage": (numberOfSpeedsPerRange/self.totalSpeeds)*100});
                        }
                        
						var maxRange = self.maxRange;
                        //percentage of speeds above maximum for the current direction
                        var numberOfSpeedsAboveMax = _.filter(speeds, function(speed){
                            return (speed >= maxRange);
                        }).length;
                        self.speedRangeDirectionObj[">=" + self.maxRange].push({"direction": direction, "percentage": (numberOfSpeedsAboveMax/self.totalSpeeds)*100});
                    }
                    
                    //re-calculate the percentages to be accumulated over each other
                    var keys = Object.keys(self.speedRangeDirectionObj);
                    var firstRangeKey = Object.keys(self.speedRangeDirectionObj)[0];
                    var firstRangeValue = self.speedRangeDirectionObj[firstRangeKey];
                    var previousValue = JSON.parse(JSON.stringify(self.speedRangeDirectionObj))[firstRangeKey];
                    
                    for(var i = 0; i < keys.length; i++){
                        var key = keys[i];
                        var value = self.speedRangeDirectionObj[key];
                        if(key != firstRangeKey){
                            for(var j = 0; j < value.length; j++){
                                previousValue[j].percentage = value[j].percentage + previousValue[j].percentage;
                                if(value[j].percentage != 0)
                                    value[j].percentage = previousValue[j].percentage;
                            }
                            self.speedRangeDirectionObj[key] = value;
                        }
                    }
                    
                    self.data = [];
                    keys = Object.keys(self.speedRangeDirectionObj);
                    for(var i = keys.length - 1; i >= 0; i--){
                        var percentages = _.pluck(self.speedRangeDirectionObj[keys[i]], "percentage");
                        var name = keys[i];
                        var color = self.listOfColors[i];
                        var tmp = {
                            "r": percentages,
                            "t": self.directions,
                            "name": name + " " + self.speedUnit,
                            "marker": {"color": color},
                            "type": "area",
                            "showlegend": false//self.showLegend ? (self.showLegend == "true") : true
                        }
                        self.data.push(tmp);
                    }
                }
            }
        });
