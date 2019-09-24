angular.module('Plotly', ['angularPlotly']);

angular
    .module('Plotly')
    .component(
        'scriptrWindrose',
        {

            bindings : {
                
                "onLoad" : "&onLoad",

                "api" : "@",

                "data" : "<?",
                
                "customRanges": "<?",
                
                "layout" : "<?",
                
                "options" : "<?",

                "transport" : "@",
                
                "showLegend" : "@",
                "speedUnit" : "@",
                
                "fontSize" : "@",
                
                "msgTag" : "@",

                "apiParams" : "<?",

                "onFormatData" : "&",
                
                "fetchDataInterval" : "@"
            },
            templateUrl : '/UIComponents/dashboard/frontend/components/plotly/windrose.html',
            controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval,dataService) {

                var self = this;
                this.directions = ["N", "NNE", "ENE", "E", "ESE", "SSE", "S", "SSW", "WSW", "W", "WNW", "NNW"];
                this.speedUnit =this.speedUnit ? this.speedUnit: "m/h";
                this.noResults = false;
                this.showSelectStream = self.api ? false: true;
		
                this.$onInit = function() {
                    console.log("on init started")
               	  this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                    
                    
                    this.plotCustomRanges = (this.customRanges && this.customRanges.length > 0) ? this.customRanges :  [{"color": "#00476b", "lo": 0, "hi": 2}, {"color": "#005487", "lo": 2, "hi": 4}, {"color": "#006699", "lo": 4, "hi": 6}, {"color": "#0082b5", "lo": 6, "hi": 8}, {"color": "#0294c1", "lo": 8, "hi": 10}, {"color": "#06a9ce", "lo": 10, "hi": 20}];
                    
                    this.data = this.data ? this.data : [];
                    
                    this.staticData = angular.copy(this.data);
                    this.transformedData = angular.copy(this.data);
                    
                    this.showLegend = this.showLegend ? this.showLegend : "true";
                    
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
                    
                    
                    this.speedUnit = ((this.speedUnit) ? this.speedUnit : "")
                    this.style = {};
                    angular.element($window).on('resize', self.scheduleResize);
                    
                    
                    self.initDataService(this.transport);
                }
                
                self.resize = function(){
                    console.log("resize called")
                    self.timeoutId = null;
                     if($window.matchMedia($rootScope.mobileBreakPoint).matches) {
                        self.style["height"] = "300";
                    	self.style["width"] = $element.parent()[0].clientWidth;
                    } else {
                        if(!(self.showLegend != null && self.showLegend == "true")) {
                             self.style["height"] = $element.parent()[0].clientHeight;
                    		 self.style["width"] = $element.parent()[0].clientWidth;
                        } else {
                            self.style["height"] = $element.parent()[0].clientHeight ;
                    	self.style["width"] = $element.parent()[0].clientWidth - $element.find(".plotly-chart-legend").outerWidth(true) - 10;
                        //Might happen due to timeout order
                            if(self.style["width"] <= 0 ) {
                                self.style["width"] = $element.parent()[0].clientWidth 
                            }
                        }
                     
                        
                        
                    }
                        
                    
                    self.layout = {
                        title: '',
                        font: {size: self.fontSize},
						radialaxis: {ticksuffix: '%'},
                        orientation: 270,
                        width: self.style["width"],
                        height: self.style["height"]
                    };
                }

                this.$postLink = function () {
                    if (self.timeoutId != null) {
                            $timeout.cancel(self.timeoutId);
                        }
                    self.timeoutId = $timeout(self.resize, 300);
                    $scope.$watch(function( $scope ) {
                        return $scope.$ctrl.data
                    },function(newData){
                        self.data = newData;
                    });
                    
                    if(this.data) {
                        self.timeout = false; 
                        $timeout(function() {
                            self.consumeData(self.data);
                        }, 200)
                    }
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
                    console.log("scheduleResize called")
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
                    if(_.isEqual(this.data.data, this.staticData))
                        this.data = [];
                    
                    if(typeof this.onFormatData() == "function"){
                        data = this.onFormatData()(data);
                        console.log("data after format",data)
                    }
                    if(data && data.data && data.data.length > 0){
                        if(this.fetchDataInterval && this.fetchDataInterval > 0 && this.retrievedData && this.retrievedData.length > 0 && this.delta) {
                            for(var i = 0; i < data.data.length; i++){
                               this.data[i]["speeds"] = this.data[i]["speeds"].concat(data.data[i]["speeds"]); 
                               this.data[i]["dates"] = this.data[i]["dates"].concat(data.data[i]["dates"]); 
                            }
                        } else {
                            this.data = data.data;
                        }
                        if(data.latestDate)
                        	this.latestRetrievedDataDate = data.latestDate
                        this.buildWindRoseData();
                    }else{
                        if((this.api && data.length == 0) && (!this.data || (this.data && this.data.length == 0))) {
                            this.data = [];
                            this.noResults = true;
                        }
                    }
                    console.log(this.data)
                }
                
                this.buildWindRoseData = function(){
                    var speedsArrays = _.pluck(self.data, "speeds");
                    self.totalSpeeds = 0;
                    for(var i = 0; i < speedsArrays.length; i++){
                        self.totalSpeeds += speedsArrays[i].length;
                    }
                    
                   /**MFE if(self.totalSpeeds == 0)
                        self.noResults = true;
                    else
                        self.noResults = false; **/
                    
                    //get percentage of each direction per speed range
                    self.speedRangeDirectionObj = {};
                    for(var i = 0; i < self.listOfMinRanges.length; i++){
                        self.speedRangeDirectionObj[self.listOfMinRanges[i] + "-" + self.listOfMaxRanges[i]] = [];
                    }
                    
                    self.speedRangeDirectionObj[">=" + self.maxRange] = [];
                    
                    for(var i = 0; self.data && i < self.data.length; i++){
                        var direction = self.data[i].direction;
                        var speeds = self.data[i].speeds;
                        
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
                    
                    self.transformedData = [];
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
                        self.transformedData.push(tmp);
                    }
                }
            }
        });
