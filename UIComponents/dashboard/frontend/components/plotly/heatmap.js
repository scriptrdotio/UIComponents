angular
    .module('Plotly')
    .component(
    'scriptrHeatmap',
    {
        bindings: {
            "onLoad": "&onLoad",
            "type" : "@",
            "data" : "<?",
            "options": "<?",
            "title" : "@",
            "layoutConfig":"<?", 
            "height" : "@",
            "hoverongaps":"<",
            "hoverinfo":"@",
            "hoverlabel":"<?",
            "showBar": "<?",
            "showModeBar": "<?",
            "modeBarButtonsToRemove": "<?",
            "colorScale": "<?",
            "showModeBar" : "@",
            "displaylogo" : "@",
            "colorBarConfig" : "<?",
            "hoverConfig" : "<?",
            "transport": "@",
            "api" : "@",
            "msgTag" : "@",
            "httpMethod": "@",
            "apiParams" : "<?",
            "onFormatData" : "&",// function
            "fetchDataInterval": "@",
            "useWindowParams": "@",
            "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed
        },
        templateUrl: '/UIComponents/dashboard/frontend/components/plotly/heatmap.html',
        controller : function($rootScope, $scope, $window, $element, $timeout, httpClient, wsClient, _, $interval,dataService) {
            var self = this;
            this.noResults = false;
            self.$onInit = function(){
                this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/wind-rose-bg.svg";
                self.data = self.data ? self.data : [];
                this.hasData = (this.transformedData != null  && this.transformedData.length > 0) ?  true : false;
                this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
                this.showBar = (this.showBar) ? this.showBar : true;
                this.showModeBar = this.showModeBar ? this.showModeBar : true;
                this.hoverinfo = (this.hoverinfo) ? this.hoverinfo : "x+y+z";
                this.hoverongaps = (this.hoverongaps) ? this.hoverongaps : false;
                this.modeBarButtonsToRemove = this.modeBarButtonsToRemove ? this.modeBarButtonsToRemove : [];
                this.displaylogo = this.displaylogo ? this.displaylogo : true;
                self.options = self.options ? self.options :{
                    displayModeBar: self.showModeBar, 
                    modeBarButtonsToRemove: self.modeBarButtonsToRemove, 
                    displaylogo: self.displaylogo,
                };
                this.colorBarConfig = this.colorBarConfig ? this.colorBarConfig :    {
                    outlinecolor:"#E2E913",
                    bgcolor :"rgba(0,0,0,0)",
                    ticks:'outside',
                    tickcolor:'#C8CE1B',
                    showticklabels : true,
                    title:{
                        text:'',
                        font:{
                            family:'Times New Roman',
                            size:15,
                            color:'#C8CE1B'
                        },
                        side:"top"
                    },
                };
                this.colorScale = (this.colorScale) ? this.colorScale : [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']];
                this.hoverlabel = (this.hoverlabel) ? this.hoverlabel : {
                    "bgcolor":'#C8CE1B'
                };
                var defaultLayout = {
                    "autosize":true,
                    "title": {},
                    "annotations" : [],
                    "showlegend": false,
                    "xaxis":{
                        "showline": false,
                        "title":"The title of xaxis",
                        "linecolor":"rgb(204, 204, 204)",
                        "ticks":"outside",
                        "dtick": 10,
                        "tickcolor":'rgb(102, 102, 102)'
                    },
                    "yaxis":{
                        "showline": true,
                        "title":"The title of yaxis",
                        "linecolor":"rgb(204, 204, 204)",
                        "ticks":"outside",
                        "autotick": false,
                        "dtick": 0,
                        "tickcolor":'rgb(102, 102, 102)'
                    }
                };
                this._layout = (this.layoutConfig) ? _.extend(defaultLayout, this.layoutConfig) : defaultLayout;
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
                    if(data != null){
                        // self.transformedData = [];
                        if(typeof data == "object" && data.x != null && Array.isArray(data.x) && data.y !=null && Array.isArray(data.y) && data.z != null && Array.isArray(data.z)){
                            self.showNumbers(data);
                            self.transformedData=[{
                                showscale:self.showBar,
                                colorscale:self.colorScale,
                                colorbar: self.colorBarConfig,
                                x: data.x,
                                y: data.y,
                                z : data.z,
                                type: 'heatmap',
                                hoverongaps: self.hoverongaps,
                                hoverinfo: self.hoverinfo,
                                hoverlabel:self.hoverlabel
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
            this.showNumbers = function(data){
                if(data != null){
                    self._layout.annotations = [];
                    for ( var i = 0; i < data.y.length; i++ ) {
                        for ( var j = 0; j < data.x.length; j++ ) {
                            var currentValue = data.z[i][j];
                            if (currentValue != 0.0) {
                                var textColor = 'white';
                            }else{
                                var textColor = 'black';
                            }
                            var result = {
                                xref: 'x1',
                                yref: 'y1',
                                x: data.x[j],
                                y: data.y[i],
                                text: data.z[i][j],
                                font: {
                                    family: 'Arial',
                                    size: 12,
                                    color: 'rgb(50, 171, 96)'
                                },
                                showarrow: false,
                                font: {
                                    color: textColor
                                }
                            };
                            self._layout.annotations.push(result);
                        }
                    }
                }
            }
        }
    });
