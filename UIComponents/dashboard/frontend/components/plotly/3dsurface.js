

angular
    .module('Plotly')
    .component(
        'scriptrThreeDSurface',
        {

            bindings: {

                "onLoad": "&onLoad",

                "api": "@",

                "data": "<?",

                "layout": "<?",

                "options": "<?",

                "transport": "@",

                "msgTag": "@",

                "apiParams": "<?",

                "onFormatData": "&",

                "fetchDataInterval": "@",
                //extras
                "title": "@",
                //"width": "<?",
                //"height": "<?",
                "xaxis": "@",
                "yaxis": "@",
                "zaxis": "@",
                "barTitle": "@",
                "barThickness": "<?",
                "showBar": "<?",
                "displaylogo": "<?",
                "showModeBar": "<?",
                "modeBarButtonsToRemove": "<?",
                "colorScale": "<?",
                "contours": "<?",


            },
            templateUrl: '/UIComponents/dashboard/frontend/components/plotly/3dsurface.html',
            controller: function ($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval, dataService) {

                var self = this;

                self.$onInit = function () {
                    console.log("on init started",this)
                    self._apiParams = (self.apiParams) ? angular.copy(self.apiParams) : [];
                    self.data = self.data ? self.data : [];
                    //self.width = self.width ? self.width : 400;
                    //self.height = self.height ? self.height :400;
                    self.contours = self.contours ? self.contours :{};
                    self.modeBarButtonsToRemove = self.modeBarButtonsToRemove ? self.modeBarButtonsToRemove :[];
                    self.options = self.options ? self.options :{
                         displayModeBar: self.showModeBar, 
                         modeBarButtonsToRemove: self.modeBarButtonsToRemove, 
                         displaylogo: self.displaylogo,
                    };
                    console.log(self.options);
                    self.staticData = angular.copy(self.data);
                    self.transformedData = angular.copy(self.data);
                    angular.element($window).on('resize', self.scheduleResize);
                    self.style={};
                    self.layout = self.layout ? self.layout :{
                        title: self.title,
                        autosize: false,
                        scene: {
                            xaxis: { title: self.xaxis },
                            yaxis: { title: self.yaxis },
                            zaxis: { title: self.zaxis },
                        },
                    };
                     self.transformedData=[{
                        showscale:self.showBar,
                        colorscale:self.colorScale,
                        colorbar: {
                          title: self.barTitle,
                          thickness:self.barThickness
                        },
                        contours:self.contours,
                        z: self.staticData.z,
                        x: self.staticData.x,
                        y: self.staticData.y,
                        type: 'surface'
                      }];

                    

                    self.initDataService(self.transport);
                }

                self.resize = function () {
                    console.log("resize called")
                  
                            self.layout.height = $element.parent()[0].clientHeight;
                            self.layout.width = $element.parent()[0].clientWidth;
              

                }

                self.$postLink = function () {
                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }
                    self.timeoutId = $timeout(self.resize, 300);
                    $scope.$watch(function ($scope) {
                        return $scope.$ctrl.data
                    }, function (newData) {
                        self.data = newData;
                    });

                    if (self.data) {
                        self.timeout = false;
                        $timeout(function () {
                            self.consumeData(self.data);
                        }, 200)
                    }
                }

                self.$onDestroy = function () {
                    angular.element($window).off('resize', self.scheduleResize);
                    if (self.msgTag) {
                        wsClient.unsubscribe(self.msgTag, null, $scope.$id);
                    }
                    if (self.refreshTimer)
                        $interval.cancel(self.refreshTimer);
                }

                self.scheduleResize = function () {
                    console.log("scheduleResize called")
                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }
                    return self.timeoutId = $timeout(self.resize, 100);
                }

                self.initDataService = function (transport) {
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

               self.consumeData = function (data, response) {
                    console.log("consumeData called", data)
                    if(data && data.x && data.y && data.z){
                        self.transformedData=[{
                        showscale:self.showBar,
                        colorscale:self.colorScale,
                        colorbar: {
                          title: self.barTitle,
                          thickness:self.barThickness
                        },
                        contours:self.contours,
                        z: data.z,
                        x: data.x,
                        y: data.y,
                        type: 'surface'
                      }];
                    
                     console.log("transformedData called", self.transformedData)
                    }

                    

                }


            }
        });
