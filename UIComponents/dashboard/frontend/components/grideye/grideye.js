angular.module('Grideye', ['angular-p5','ComponentsCommon', 'DataService']);
angular.module('Grideye').component('scriptrGrideye',{
    bindings: {
        "onLoad" : "&onLoad",   
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
        "customSectors": "<?", // array of objects with color, hi, lo attributes ([ of object])
		"width": "@", //  gauge width in % (int)
        "height": "@", // gauge height in px (int)
        "minTemperature" : "@", // minimum value (float)
        "maxTemperature" : "@", // maximum value (float)
        "gridXCount": "@", //number of grid columns (int)
        "gridYCount": "@", //number of grid rows (int)
        
    },
    templateUrl : '/UIComponents/dashboard/frontend/components/grideye/grideye.html',
    controller : function($scope, httpClient, wsClient, $interval, dataService, $timeout, $window, $element, p5) {
        var self = this;
        this.cells = [];
        this.$onInit = function(){
            this.minTemperature = (this.minTemperature)? this.minTemperature: 0;
            this.maxTemperature = (this.maxTemperature)? this.maxTemperature: 100;
            this.temperatureSection = (this.maxTemperature - this.minTemperature) / 4;
            this.gridXCount = (this.gridXCount)? parseInt(this.gridXCount) : 8;
            this.gridYCount = (this.gridYCount)? parseInt(this.gridYCount) : 8;
            this.width = $element[0].parentElement.clientWidth;
            this.height = $element[0].parentElement.clientHeight;
            this.square_width = this.width / this.gridXCount;
            this.square_height = this.height / this.gridYCount;
            
            this.customSectors = (this.customSectors) ? this.customSectors : {
                ranges: [{
                    color: "#00FF00", //green
                    lo: this.minTemperature,
                    hi: this.temperatureSection
                }, {
                    color: "#FFFF00", //yellow
                    lo: this.temperatureSection,
                    hi: this.temperatureSection * 2
                }, {
                    color: "#FFA000", //orange
                    lo: this.temperatureSection * 2,
                    hi: this.temperatureSection * 3
                }, {
                    color: "#FF0000", //red
                    lo: this.temperatureSection * 3,
                    hi: this.maxTemperature
                }]
            };
            
            for(var i = 0; i < this.customSectors.ranges.length; i++){
                if(!this.customSectors.ranges[i].hi){
                    this.customSectors.ranges[i].hi = this.temperatureSection * (i + 1);
                }
                if(!this.customSectors.ranges[i].lo){
                    this.customSectors.ranges[i].lo = this.customSectors.ranges[i].hi - this.temperatureSection;
                }
            }
            
            this.transport = (this.transport) ? this.transport : null;
            this.msgTag = (this.msgTag) ? this.msgTag : null;
            this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
			console.log($element);
            this.canvas = new p5(sketch, 'scriptrgrideye');
        }
        
        this.$postLink = function() {
            self.timeoutId = $timeout(self.resize.bind(self), 100);
            angular.element($window).on('resize', self.onResize);
            if ((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) { //Fetch data from backend
                initDataService(this.transport);
            } else if (self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                $scope.$watch(function($scope) {
                    // wait for the timeout
                    if ($scope.$ctrl.data) {
                        return $scope.$ctrl.data
                    }
                }, function(newVal, oldVal) {
                    if (JSON.stringify(newVal)) {
                        self.consumeData(newVal);
                    }
                });
            } else {
                //Listen on update-data event to build data
                $scope.$on("update-data", function(event, data) {
                    if (data == null) { //typeOf data == 'undefined' || data === null
                        /*if (self.gaugeValue == null) {
                            self.noResults = true;
                        }*/
                    } else {
                        if (data[self.serviceTag]){
                            self.consumeData(data[self.serviceTag]);
                        }else{
                            self.consumeData(data);
                        }
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
            
            self.width = $element[0].parentElement.clientWidth;
            self.height = $element[0].parentElement.clientHeight;
            self.square_width = self.width / self.gridXCount;
            self.square_height = self.height / self.gridYCount;
            self.canvas.setup();
        }
        
        this.resize = function() {
            
            self.calculateNotificationsDisplay();
        }
        
        this.calculateNotificationsDisplay = function() {
            if ($element.parent() && $element.parent().innerWidth() < 240) {
                self.usePopover = true;
            } else {
                self.usePopover = false;
            }
        }
        this.$onDestroy = function() {
            if (self.msgTag) {
                wsClient.unsubscribe(self.msgTag, null, $scope.$id);
            }

            if (self.refreshTimer) {
                $interval.cancel(self.refreshTimer);
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
            if (self.fetchDataInterval && !self.refreshTimer) {
                //Assuming this is success
                self.refreshTimer = $interval(
                    function() {
                        initDataService(self.transport)
                    }, self.fetchDataInterval * 1000);
            }
        }
        this.consumeData = function(data, response) {
            if (data.status && data.status == "failure") {
                self.noResults = true;
                self.dataFailureMessage = "Failed to fetch data.";
            } else {
                if (typeof self.onFormatData() == "function") {
                    data = self.onFormatData()(data, self);
                }
                if (data != null) {
                    console.log('received data');
                    console.log(data);
                    if (data.length > 0) {

                        self.hasData = true;
                        self.noResults = false;
                        self.stalledData = false;
                        self.canvas.updateData(data);
                    } else {
                        self.noResults = true;
                        self.dataFailureMessage = "Failed to update data, invalid data format.";
                    }
                } else {
                    self.noResults = true;
                    self.dataFailureMessage = "Failed to update data, invalid data format.";
                    console.log(e);
                }

            }
        }
        
        var sketch =  function (p5) {
            var randChanges = [];
            var randChangeSpeed = .1;
            var noData = false;
            p5.setup = function(){
                p5.createCanvas(self.width, self.height);
                p5.frameRate(30); //optimize (could be parametered)
                if(!self.data){
                    self.data = [];
                    /*
                    for (var i = 0; i < (self.gridXCount * self.gridYCount); i++) {
                        var randTemp = p5.random(0, 100);
                        if (i > 0) {
                            randTemp = self.data[i - 1];
                            randTemp += p5.random(-5, 5);
                        }
                        self.data.push(randTemp);
                    }*/
                    noData = true;
                }else{
                    noData = false;
                }
                
                self.cells = [];
                for(var i = 0; i < (self.gridXCount * self.gridYCount); i++){
                    var xIndex = i % self.gridXCount;
                    var yIndex = Math.floor(i / self.gridXCount);
                    var x = xIndex * self.square_width;
                    var y = yIndex * self.square_height;
                    var cell = new Cell(x, y, self.square_width, self.square_height, self.data[i]);
                    cell.setTempColors(self.customSectors);
                    self.cells.push(cell);
                }
                /*
                for(var i = 0; i < (self.gridXCount * self.gridYCount); i++){
                    randChanges.push(-randChangeSpeed);
                }*/
                p5.show();
            };

            p5.updateData = function(data) {
                /*if(noData && !data){
                    
                    for (var i = 0; i < self.data.length; i++) {
                        self.data[i] += randChanges[i];
                        if (self.data[i] >= 100) {
                            randChanges[i] = -randChangeSpeed;
                        } else if (self.data[i] <= 0) {
                            randChanges[i] = randChangeSpeed;
                        }
                    }
                }else*/ 
                if(data){
                    self.data = data;
                    noData = false;
                }
                for (var i = 0; i < self.cells.length; i++) {
                    self.cells[i].update(self.data[i]);
                }
                p5.show();
            }

            //function that draws the grid in the canvas
            p5.show = function() {
                for (var i = 0; i < self.cells.length; i++) {
                    self.cells[i].show(p5);	
                }
            }
        }
        
    }
});