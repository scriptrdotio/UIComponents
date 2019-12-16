

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
                    
                    
                    this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/3dsurface-bg.svg";
                       
                    this.hasData = (this.transformedData != null  && this.transformedData.length > 0) ?  true : false;
                    
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
                    //self.staticData = angular.copy(self.data);
                    //self.transformedData = angular.copy(self.data);
                    angular.element($window).on('resize', self.onResize);
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
                }

                self.resize = function () {
                    self.layout.height =  $element.parent().height();
                    self.layout.width = $element.parent().width();
                    self.calculateNotificationsDisplay()
                }
                
                this.calculateNotificationsDisplay = function() {
                    if($element.parent().innerWidth() < 240) {
                        self.usePopover = true;
                    } else {
                        self.usePopover = false;
                    }
                }   

                self.$postLink = function () {
                    self.timeoutId = $timeout(self.resize.bind(self), 100);
                    angular.element($window).on('resize', self.onResize);
                   
                    if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                        initDataService(this.transport);
                    } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                        $scope.$watch(function( $scope ) {
                            // wait for the timeout
                            if($scope.$ctrl.data){
                                return $scope.$ctrl.data
                            }
                        },function(newVal, oldVal){
                            if(JSON.stringify(newVal)){
                                self.consumeData(newVal);
                            }
                        });
                    } else { 
                       //Listen on update-data event to build data
                       $scope.$on("update-data", function(event, data) {
                             if(data == null){
                                 if(self.transformedData == null || self.transformedData.length == 0) {
                                     self.noResults = true;
                                 } 
                             } else {
                                  if(data[self.serviceTag])
                                    self.consumeData(data[self.serviceTag]);
                                else
                                    self.consumeData(data);
                             } 
                        });
                        
                      $scope.$emit("waiting-for-data");
            		}
                }

                self.$onDestroy = function () {
                    if (self.msgTag) {
                        wsClient.unsubscribe(self.msgTag, null, $scope.$id);
                    }
                    if (self.refreshTimer)
                        $interval.cancel(self.refreshTimer);
                    
                    if (self.timeoutId != null) {
                       console.log("timeout inside destroy")
                       $timeout.cancel(self.timeoutId);
                   }
                   
                   angular.element($window).off('resize', self.onResize);
                }

                self.onResize = function () {
                    if (self.timeoutId != null) {
                        $timeout.cancel(self.timeoutId);
                    }
                    return self.timeoutId = $timeout(self.resize, 100);
                }

                initDataService = function (transport) {
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

               self.consumeData = function (data, response) {
                   
                    if(data.status && data.status == "failure") {
                         self.noResults = true;
                         self.dataFailureMessage = "Failed to fetch data.";
                         if(self.transformedData && self.transformedData.length > 0) {
                             self.stalledData = true;
                             self.dataFailureMessage = "Failed to update data.";
                         }
                    } else {
                        if(typeof this.onFormatData() == "function"){
                            data = this.onFormatData()(data);
                        }
                        if(data != null) {
                         if(typeof data == "object" && data.x != null && Array.isArray(data.x) && data.y !=null && Array.isArray(data.y) && data.z != null && Array.isArray(data.z)) { 
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

                              	  self.hasData = true;
                                  self.noResults = false;
                                  self.stalledData = false;
                           } else {
                               self.noResults = true;
                               if(self.transformedData != null  && self.transformedData.length > 0) {
                                  self.stalledData = true;
                                } 
                                self.dataFailureMessage = "Failed to update data, invalid data format.";
                           }
                        } else {
                            self.noResults = true;
                             if(self.transformedData != null  && self.transformedData.length > 0) {
                                self.stalledData = true;
                            } 
                            self.dataFailureMessage = "Failed to update data, no data returned.";
                        } 
                    }
                }


            }
        });
