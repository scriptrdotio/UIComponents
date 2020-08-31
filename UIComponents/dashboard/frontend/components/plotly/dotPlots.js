angular
    .module('Plotly')
    .component(
    'scriptrDotPlots',
    {

        bindings: {

            "onLoad": "&onLoad",
            "type" : "@",
            "title" : "@",
            "showLegend" : "<",
            "data" : "<?",
            "hideHover": "@",
            "hoverinfo":"<",
            "options": "<?",
            "showgrid" : "@",
            //extras
            "showModeBar": "<?",
            "modeBarButtonsToRemove": "<?",
            "layoutConfig":"<?", 
            "mode":"@",
            "paper_bgcolor" : "@",
            "plot_bgcolor" : "@",
            "tracesConfig":"<?",
            "transport": "@",
            "api" : "@",
            "hoverCallback": "&?", 
            "legendType": "@",
            "msgTag" : "@",
            "httpMethod": "@",
            "apiParams" : "<?",
            "onFormatData" : "&",// function
            "fetchDataInterval": "@",
            "useWindowParams": "@",
            "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed


        },
        templateUrl: '/UIComponents/dashboard/frontend/components/plotly/dotPlots.html',
        controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval,dataService) {

            var self = this;

            this.noResults = false;

            self.$onInit = function(){

                this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/wind-rose-bg.svg";
                self.data = self.data ? self.data : [];

                this.hasData = (this.transformedData != null  && this.transformedData.length > 0) ?  true : false;

                this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];

                //this.legendProperties =   (this.legend && this.legend.length > 0) ? this.legend : [{"color":'rgba(156, 165, 196, 0.95)', "name":"Percent of estimated voting age population"}, {"color": "rgba(204, 204, 204, 0.95)", "name":"Percent of estimated registered voters"}];
                //this.showModeBar = this.showModeBar ? this.showModeBar : true;
                //this.modeBarButtonsToRemove = this.modeBarButtonsToRemove ? this.modeBarButtonsToRemove : true;
                self.modeBarButtonsToRemove = self.modeBarButtonsToRemove ? self.modeBarButtonsToRemove :[];
                self.options = self.options ? self.options :{
                    displayModeBar: self.showModeBar, 
                    modeBarButtonsToRemove: self.modeBarButtonsToRemove, 
                    displaylogo: self.displaylogo,
                };
                this.showLegend = this.showLegend ? this.showLegend : true;
                this.paper_bgcolor = this.paper_bgcolor ? this.paper_bgcolor : 'rgb(254, 247, 234)';
                this.plot_bgcolor = this.plot_bgcolor ? this.plot_bgcolor : 'rgb(254, 247, 234)';
                this.defaultMarker ={
                    "name" : "Name of the trace",
                    "color": "rgba(156, 165, 196, 0.95)",
                    "line": {
                        "color": "rgba(156, 165, 196, 1.0)",
                        "width": "1"
                    },
                    "symbol": "circle",
                    "size": 16
                                    };
                this.tracesConfig =(this.tracesConfig) ? this.tracesConfig : this.defaultMarker;
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
                                            "showline": false,
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
                                            "y":0.99,
                                            "xanchor":"left",
                                            "x":0.01,
                                            "orientation":"v"
                                        }
                    				};
                this._layout = (this.layoutConfig) ? _.extend(defaultLayout, this.layoutConfig) : defaultLayout;
                if(this.hoverCallback) {
                  this.onHoverCallback = function (index, options, content, row) {
                    return self.hoverCallback()(index, options, content, row); 
                  	//return self.hoverCallback({index:index, options: options, content: content, row: row})
                  }
             }

             if(this.showLegend && this.showLegend == "true") {
                 if(this.legendType && this.legendType == "right") {
                     this._hideHover = "auto";
                     this.ref = $scope.$id
                     this.legendStructure = []
                     for(var i = 0; i < this.ykeys.length; i++) {
                         var tmp = {}
                         tmp["key"] = this.ykeys[i];
                         if(this.labels && this.labels[i]) 
                             tmp["label"] = this.labels[i];
                         else
                             tmp["label"] = this.ykeys[i];

                         if(this.colors && this.colors[i]) 
                             tmp["color"] = this.colors[i];
                         this.legendStructure.push(tmp);
                     }
                     
                     this.onHoverCallback = function (index, options, content, row) {
                            if(self.datas) {
                                if(row && row[$scope.$ctrl.xkey]){
                                    if(self.parseTime) {
                                           $scope.$ctrl.legendDate = self.dateFormat(row[self.xkey]);
                                    } else {
                                        $scope.$ctrl.legendDate = row[self.xkey];
                                    }  
                                }
                                 _.mapObject(row, function(val, key) {
                                    var index = _.findIndex($scope.$ctrl.legendStructure, {"key": (self.type != "donut" ? key : val)});

                                    if(index != -1){
                                        $scope.$ctrl.legendStructure[index]["value"] = (self.type == "donut") ? content : val;
                                        var element = document.getElementById("value_"+index+"_"+self.ref)
                                        if(element)
                                            element.innerHTML = (self.type == "donut") ? content : val;
                                    }
                                });
                            }
                        }
                 } else {
                      if(this.legendType && this.legendType == "hover") {
                         this._hideHover = (this.hideHover) ? this.hideHover : "auto";
                      }
                 }
             } else {
                 this._hideHover = "always";
             }
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

            this.calculateNotificationsDisplay = function() {
                if($element.parent().innerWidth() < 240) {
                    self.usePopover = true;
                } else {
                    self.usePopover = false;
                }
            }   


            this.$postLink = function () {
                self.timeoutId = $timeout(self.resize.bind(self),  100);
                angular.element($window).on('resize', self.onResize);

                if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                    initDataService(this.transport);
                } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                    $scope.$watch(function( $scope ) {
                        // wait for the timeout
                        if($scope.$ctrl.data){
                            return $scope.$ctrl.data // data from thr backend 
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

            this.$onDestroy = function() {

                if(self.msgTag){
                    wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                }
                if(self.refreshTimer)
                    $interval.cancel( self.refreshTimer );

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


            }

            self.consumeData = function(data, response) {
                if(data.status && data.status == "failure") {
                    self.noResults = true;
                    self.dataFailureMessage = "Failed to fetch data.";
                    if(self.transformedData && self.transformedData.length > 0) {

                        self.dataFailureMessage = "Failed to update data.";
                    } 
                } else {
                    if(typeof this.onFormatData() == "function"){
                        data = this.onFormatData()(data);
                    }
                    if(data != null && data.length > 0 ){
                        
                        self.transformedData = [];
                        for (var i = 0; i<data.length; i++){
                            if(typeof data == "object" && data[i].x != null && Array.isArray(data[i].x) && data[i].y !=null && Array.isArray(data[i].y)){

                                self.transformedData.push({
                                    x: data[i].x,
                                    y: data[i].y,
                                    //showlegend : self.showLegend,
                                    hoverinfo:"skip",
                                    type: 'scatter',
                                    name: (self.tracesConfig[i].name) ? self.tracesConfig[i].name : "Dot Plots Graph",
                                    mode: 'markers',
                                    marker: (self.tracesConfig[i]) ? self.tracesConfig[i] : this.defaultMarker
                                });
                            }

                        
                    }
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

                }
            }
        }
    });
