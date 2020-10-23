angular
    .module('Plotly')
    .component(
        'scriptrScatter',
        {

            bindings: {

                "onLoad": "&onLoad",
                "data": "<?",
                "customRanges": "<?",
                "layout": "<?",
                "options": "<?",
                
                "showLegend": "@",
                "title":"@",
                "xaxis": "@",
                "yaxis": "@",
                "fontSize": "@",
                "showModeBar": "<?",
                "modeBarButtonsToRemove": "<?",
                //"colorScale": "<?",
                "color": "@",
                "series":"@",

                "transport": "@",
                "api": "@",
                "msgTag": "@",
                "httpMethod": "@",
                "apiParams": "<?",
                "onFormatData": "&",
                "fetchDataInterval": "@",
                "useWindowParams": "@",
                "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed
            },
            templateUrl: '/UIComponents/dashboard/frontend/components/plotly/scatter.html',
            controller: function ($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval, dataService) {

                var self = this;

                this.noResults = false;
                this.showSelectStream = self.api ? false : true;

                this.$onInit = function () {
                    this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/wind-rose-bg.svg";
                    this.hasData = (this.transformedData != null && this.transformedData.length > 0) ? true : false;
                    this._apiParams = (this.apiParams) ? angular.copy(this.apiParams) : [];
                    this.plotCustomRanges = (this.customRanges && this.customRanges.length > 0) ? this.customRanges : [{ x: [1, 2, 3, 4], y: [12, 9, 15, 12], mode: 'markers', type: 'scatter' }, { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'markers', type: 'scatter' }];

                    //this.staticData = angular.copy(this.data);
                    //this.transformedData = angular.copy(this.data);

                    this.showLegend = this.showLegend ? this.showLegend : "true";

                    // show or hide modebar and buttons 
                    self.modeBarButtonsToRemove = self.modeBarButtonsToRemove ? self.modeBarButtonsToRemove : [];
                    self.options = self.options ? self.options : {
                        displayModeBar: self.showModeBar,
                        modeBarButtonsToRemove: self.modeBarButtonsToRemove,
                        displaylogo: self.displaylogo,
                    };

                    this.fontSize = this.fontSize ? this.fontSize : "12";
                    /*this.layout = {
                        title: 'humidity heat',
                        font: { size: this.fontSize },
                    };*/
                    
                    //this.data.marker.color = self.color;

                    this.style = {};
                }

                this.onResize = function () {
                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }
                    self.timeoutId = $timeout(self.resize.bind(self), 100);
                }

                self.resize = function () {
                    self.timeoutId = null;
                    if ($window.matchMedia($rootScope.mobileBreakPoint).matches) {
                        self.style["height"] = "300";
                        //self.style["width"] = $element.parent().innerWidth();
                    } else {
                        if (!(self.showLegend != null && self.showLegend == "true")) {
                            var height = $element.parent().innerHeight();
                            var width = $element.parent().innerWidth();
                            if (width < height) {
                                self.style["width"] = width
                            } else {
                                self.style["height"] = height;
                            }

                        } else {
                            var height = $element.parent().innerHeight() - 10;
                            var width = $element.parent().innerWidth() - $element.find(".plotly-chart-legend").outerWidth(true) - 10;
                            if (width < height) {
                                self.style["width"] = width;
                                self.style["height"] = width;
                            } else {
                                self.style["height"] = height;
                                self.style["width"] = height
                            }
                        }
                    }

                    self.layout = {
                        title: this.title?this.title:'',//'self layout title',
                        font: { size: self.fontSize },
                        radialaxis: { ticksuffix: '%' },
                        orientation: 270,
                        width: self.style["width"],
                        height: self.style["height"],
                        xaxis: { title: self.xaxis },
                        yaxis: { title: self.yaxis },
                        
                        margin: {
                            l: 50,
                            r: 15,
                            b: 50,
                            t: 50,
                        },
                        
                    };
                    self.calculateNotificationsDisplay()
                }

                this.calculateNotificationsDisplay = function () {
                    if ($element.parent().innerWidth() < 240) {
                        self.usePopover = true;
                    } else {
                        self.usePopover = false;
                    }

                }

                this.$postLink = function () {
                    self.timeoutId = $timeout(self.resize.bind(self), 100);
                    angular.element($window).on('resize', self.onResize);

                    if ((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                        initDataService(this.transport);
                    } else if (self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                        $scope.$watch(function ($scope) {
                            // wait for the timeout
                            if ($scope.$ctrl.data) {
                                return $scope.$ctrl.data
                            }
                        }, function (newVal, oldVal) {
                            if (JSON.stringify(newVal)) {
                                self.consumeData(newVal);
                            }
                        });
                    } else {
                        //Listen on update-data event to build data
                        $scope.$on("update-data", function (event, data) {
                            if (data == null) {
                                if (self.transformedData == null || self.transformedData.length == 0) {
                                    self.noResults = true;
                                }
                            } else {
                                if (data[self.serviceTag])
                                    self.consumeData(data[self.serviceTag]);
                                else
                                    self.consumeData(data);
                            }
                        });

                        $scope.$emit("waiting-for-datas");
                    }

                }

                this.$onDestroy = function () {

                    if (self.msgTag) {
                        wsClient.unsubscribe(self.msgTag, null, $scope.$id);
                    }
                    if (self.refreshTimer)
                        $interval.cancel(self.refreshTimer);

                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }

                    angular.element($window).off('resize', self.onResize);
                }

                var initDataService = function (transport) {
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
                            function () {
                                initDataService(self.transport)
                            }, self.fetchDataInterval * 1000);
                    }

                }

                this.consumeData = function (data, response) {

                    if (data.status && data.status == "failure") {
                        self.noResults = true;
                        self.dataFailureMessage = "Failed to fetch data.";
                        if (self.transformedData && self.transformedData.length > 0) {
                            self.stalledData = true;
                            self.dataFailureMessage = "Failed to update data.";
                        }
                    } else {
                        if (typeof self.onFormatData() == "function") {
                            data = self.onFormatData()(data, self);
                        }
                        if (data != null) {
                        	self.transformedData = []
                            for (var subdata = 0; subdata < data.length; subdata++) {
                                if (typeof data[subdata] == "object" && data[subdata].x != null && Array.isArray(data[subdata].x) && data[subdata].y != null && Array.isArray(data[subdata].y)) {
                                    self.transformedData.push({
                                        //showscale: self.showBar,

                                        x: data[subdata].x,
                                        y: data[subdata].y,
                                        type: 'scatter',
                                        mode: 'markers',

                                        /*marker: {
                                            color: ((data[subdata].color != null) ? data[subdata].color : '#ff0000')// 
                                        }*/
                                    });
                                   	self.hasData = true;
                          			self.noResults = false;
                          			self.stalledData = false;
                                }
                                else {
                                    self.noResults = true;
                                    if (self.transformedData != null && self.transformedData.length > 0) {
                                        self.stalledData = true;
                                    }
                                    self.dataFailureMessage = "Failed to update data, invalid data format.";
                                }
                            }

                        } else {
                            self.noResults = true;
                            if (self.transformedData != null && self.transformedData.length > 0) {
                                self.stalledData = true;
                            }
                            self.dataFailureMessage = "Failed to update data, no data returned.";
                        }
                    }
                }

                this.buildScatterData = function () {

                }
            }
        })