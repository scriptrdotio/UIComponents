

angular
    .module('Plotly')
    .component(
        'scriptrThreeDSurface',
        {

            bindings: {

                "onLoad": "&onLoad",
                
                "data": "<?",
                "layout": "<?",
                "options": "<?",

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
                
                "transport": "@",
                "api" : "@",
                "msgTag" : "@",
                "httpMethod": "@",
                "apiParams" : "<?",
                "onFormatData" : "&",
                "fetchDataInterval": "@",
                "useWindowParams": "@",
                "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed


            },
            templateUrl: '/UIComponents/dashboard/frontend/components/plotly/3dsurface.html',
            controller: function ($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval, dataService) {

                var self = this;

                self.$onInit = function () {
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
                    self.staticData = angular.copy(self.data);
                    self.transformedData = angular.copy(self.data);
                    angular.element($window).on('resize', self.scheduleResize);
                    self.style={};
                    self.layout = self.layout ? self.layout :{
                        //title: self.title,
                        autosize: true,
                        height: $element.parent().height(),
                        width: $element.parent().width(),
                        scene: {
                            xaxis: { title: self.xaxis },
                            yaxis: { title: self.yaxis },
                            zaxis: { title: self.zaxis },
                        },
                         margin: {
                            l: 5,
                            r: 5,
                            b: 5,
                            t: 5,
                        }
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

                }

                self.resize = function () {
                    self.layout.height =  $element.parent().height();
                    self.layout.width = $element.parent().width();
                }

                self.$postLink = function () {
                    self.initDataService(this.transport);
                    if (self.timeoutId != null) {
                            $timeout.cancel(self.timeoutId);
                        }
                    self.timeoutId = $timeout(self.resize, 300);
                    $scope.$watch(function( $scope ) {
                        return $scope.$ctrl.data
                    },function(newVal){
                               if(newVal){
                           self.consumeData(newVal);
                       }
                    });
                    
                    if(this.data) {
                        self.timeout = false; 
                        $timeout(function() {
                             if(self.timeout == false) {
                                self.consumeData(self.data);
                             }
                        }, 200)
                    } else{
                        self.timeout = true;
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
                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }
                    return self.timeoutId = $timeout(self.resize, 100);
                }

                self.initDataService = function (transport) {
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

                        if (self.fetchDataInterval && !self.refreshTimer) {
                            //Assuming this is success
                            self.refreshTimer = $interval(
                                function () {
                                    self.initDataService(self.transport)
                                }, self.fetchDataInterval * 1000);
                        }
                    } else {
                        $scope.$emit("waiting-for-data");
                        $scope.$on("update-data", function(event, data) {
                            if(data[self.serviceTag])
                                self.consumeData(data[self.serviceTag]);
                            else
                                self.consumeData(data);
                        });
                    }
                }

               self.consumeData = function (data, response) {
                    self.timeout = true;
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
                    }

                    

                }


            }
        });
