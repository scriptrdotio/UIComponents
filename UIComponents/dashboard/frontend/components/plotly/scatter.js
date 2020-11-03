angular
    .module('Plotly')
    .component(
    'scriptrScatter',
    {

        bindings: {

            "onLoad": "&onLoad",
            "data": "<?",
            "type" : "@",
            "options": "<?",
            "layoutConfig":"<?", 
            "tracesConfig":"<?",

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

                // show or hide modebar and buttons 
                self.options = self.options ? self.options :{
                    "displayModeBar": true,
                    "modeBarButtonsToRemove":[], 
                    "displaylogo": true,
                    "scrollZoom":false,
                    "editable":false,
                    "staticPlot":false,
                };

                this.defaultTrace ={
                    "type": "scatter",
                    "name" : "trace1",
                    "mode": 'markers',
                    "hovertemplate": "x: %{x},y:%{y},weight: %{marker.size}", 
                    "marker": {
                        "color": 'hsl(0,100,40)',
                    }
                };

                this.tracesConfig =(this.tracesConfig) ? this.tracesConfig : [];

                var defaultLayout = {
                    "title":"The title of the graph",
                    "showlegend":true,
                    "margin":{
                        "l":140,
                        "r":40,
                        "b":50,
                        "t":80
                    },
                    "xaxis":{
                        "showgrid":false,
                        "showline": true,
                        "range":[ 0.25, 8 ],
                        "title":"The title of xaxis",
                        "titlefont":{
                            "font":{
                                "color":"rgb(204, 204, 204)"
                            }
                        },
                        "tickfont":{
                            "font":{
                                "color":"rgb(102, 102, 102)"
                            }
                        },
                        "ticks":"outside"
                    },
                    "yaxis":{
                        "showgrid": false,
                        "showline": true,
                        "range":[ 0, 10 ],
                        "title":"The title of yaxis",
                        "titlefont":{
                            "font":{
                                "color":"rgb(204, 204, 204)"
                            }
                        },
                        "tickfont":{
                            "font":{
                                "color":"rgb(102, 102, 102)"
                            }
                        }
                    },
                    "hovermode": 'closest',
                    "legend":{
                        "font":{
                            "size":10
                        },
                        "yanchor":"top",
                        "xanchor":"right",
                        "orientation":"v"
                    }
                };               
                this._layout = (this.layoutConfig) ? angular.merge({}, defaultLayout, this.layoutConfig) : defaultLayout;

            }

            this.onResize = function() {
                if (self.timeoutId != null) {
                    $timeout.cancel(self.timeoutId);
                }
                self.timeoutId = $timeout(self.resize.bind(self), 100);
            }

            self.resize = function () {
                self._layout.height =  $element.parent().height();
                self._layout.width = $element.parent().width();
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
                    if (data != null && data.length>0) {
                        self.transformedData = []
                        for (var i = 0; i<data.length; i++) {
                            if(typeof data == "object" && data[i].x != null && Array.isArray(data[i].x) && data[i].y !=null && Array.isArray(data[i].y) && data[i].w !=null && Array.isArray(data[i].w)){

                                var size = data[i].w;
                                var currentTrace = (self.tracesConfig[i]) ? angular.merge({}, self.defaultTrace, self.tracesConfig[i]) : self.defaultTrace;
                                currentTrace.marker.size = size
                                self.transformedData.push(angular.merge({}, currentTrace, data[i]));

                                self.hasData = true;
                                self.noResults = false;
                                self.stalledData = false;

                            } else {
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
        }
    })