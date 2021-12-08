angular.module('Chart', [ 'angular.morris', 'ComponentsCommon', 'DataService' ]);

/**
 * Donut chart with resize set to true. after some actions, 
 * it is cleared from the dom. after this, resizing the browser will trigger a series of errors in the console.
 * Error: Invalid value for attribute transform="matrix(NaN,NaN,NaN,NaN,0,0)"
 * Temporary solution, override the resize handler
 * For more info check: https://github.com/morrisjs/morris.js/issues/420
 *
 */
angular.element(document).ready(function () {
    
    
    Morris.Line.prototype.resizeHandler = function () {

        clearTimeout(this.timeoutId);
        var chart=this;
        this.timeoutId = setTimeout(function(){
            if (chart.el && chart.el.width() > 0 && chart.el.height() > 0) {
            
                chart.raphael.setSize(chart.el.width(), chart.el.height()-8);
                chart.redraw();
            }
       
            
        }, 600);
        return this;
    };
    Morris.Donut.prototype.resizeHandler = function () {
        this.timeoutId = null;
        if (this.el && this.el.width() > 0 && this.el.height() > 0) {
            this.raphael.setSize(this.el.width(), this.el.height());
            return this.redraw();
        }
        else return null;
    };
    
    Morris.Donut.prototype.setData = function (data) {
        var row;
        this.data = data;
        this.values = (function () {
            var _i, _len, _ref, _results;
            _ref = this.data;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                row = _ref[_i];
                _results.push(parseFloat(row.value));
            }
            return _results;
        }).call(this);
        if (this.el && this.el.width() > 0 && this.el.height() > 0) {
            return this.redraw();
        }
        else return null;
    };
    
    
    
});

angular
  .module('Chart')
  .component(
     'scriptrChart',
     {
  
      bindings : {
        
          "onLoad" : "&onLoad",
          "loadingMessage": "@",
          "transport": "@",
          "api" : "@",
          "msgTag" : "@",
          "httpMethod": "@",
          "apiParams" : "<?",
          "onFormatData" : "&",
          "fetchDataInterval": "@",
          "useWindowParams": "@",
          "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed
          "delta": "<?",


          "resize": "<?",
          "icon": "@",
          "data": "<?",

          "type" : "@",

          "xkey" : "@",
          "yconfig" : "<?",

          "ykeys" : "<?",

          "stacked": "<?",

          "labels" : "<?",

          "colors" : "<?",

          "lineWidth": "@", 
          "pointSize": "@",
          "pointFillColors" : "@", 
          "pointStrokeColors" : "@", 
          "ymax" : "@", 
          "ymin": "@", 
          "smooth": "@", 
          "hideHover": "@",
          "parseTime": "<?", 
          "units": "@", 
          "postUnits": "@", 
          "preUnits": "@", 


          "barSize": "<?", //20
          "barSizeRatio": "<?",//0.75,
          "barGap": "<?", //3,
          "barOpacity": "<?",//1.0,
          "barRadius":"<?", //[0,0,0,0]

          "xlabels": "@", 
          "xlabelAngle": "<?", 
          "goals": "@", 
          "goalStrokeWidth": "@",
          "goalLineColors": "@", 
          "goalsconfig" : "<?",
          "events": "@", 
          "eventStrokeWidth": "@", 
          "eventsLineColors": "@", 
          "eventsconfig" : "<?",
          "dataFailureMessage": "@",
          "stalledDataMessage": "@",
          "invalidData": "@",
          "continuousLine": "@",
          "axes": "@", 
          "grid": "@", 
          "gridTextColor": "@", 
          "gridTextSize": "@", 
          "gridTextFamily": "@", 
          "gridTextWeight": "@",
          "fillOpacity": "@", 
          "resize": "@", 
          "behaveLikeLine": "@",

          //With donut
          "labelColor": "@",
          "donutFormatter": "&", 
          "backgroundColor": "@",

          "hoverCallback": "&?", 
          "dateFormat": "&?",
          "xlabelFormat": "&?", 
          "ylabelFormat": "&?",  

          "xdateMomentFormat": "@",
          "legendDateMomentFormat": "@",
          "timeZone": "@",

          "showLegend": "@",
          "legendType": "@", //"hover", "right"
          "horizontal": "@",
           
          
          "x1LegendLabel": "@",
          
          "resetDataOnConsume": "<?"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/chart/chart.html',
      controller: function($translate, httpClient,$rootScope, wsClient, $scope, $element, $timeout, $window, $interval, dataService) {
        
         var self = this;
        
         this.$onInit = function() {
             $translate.use($rootScope.lang);
             this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data";
             this.stalledDataMessage = (this.stalledDataMessage) ? this.stalledDataMessage : "No data available.";
             this.dataFailureMessage = (this.dataFailureMessage) ? this.dataFailureMessage : "Failed to fetch data.";
             this.invalidData = (this.invalidData) ? this.invalidData : "Invalid data format.";
             
             this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/"+this.type+"-chart-bg.svg";
                     
             this.hasData = (this.datas && this.datas.length > 0) ?  true : false;
             //if yconfig streatch it to individuals 
             if(self.yconfig){
                  var ykeys = [];
                  var ylabels = [];
                  var ycolors = [];
                 self.yconfig.forEach(function(e){
                     ykeys.push(e.key);
                     ylabels.push(e.label);
                     ycolors.push(e.color);
                 });
                 self.ykeys=ykeys;
                 self.labels=ylabels;
                 self.colors=ycolors;
             }
             
             //if eventConfig streatch it to individuals 
             if(self.goalsconfig){
                 self.goals=[];
                 self.goalLineColors=[];
                 self.goalsconfig.forEach(function(e){
                     self.goals.push(e.goal);
                    // self.goalStrokeWidth=e.storkeWidth;
                     self.goalLineColors.push(e.lineColor);
                 });
                
             }
             //if goalsConfig streatch it to individuals 
             if(self.eventsconfig){
                 self.events=[];
                 self.eventLineColors=[];
                 self.eventsconfig.forEach(function(e){
                     self.events.push(e.event);
                    // self.eventStrokeWidth=e.storkeWidth;
                     self.eventLineColors.push(e.lineColor);
                 });
                 
                 
             }
             
           	 //this.type = (this.type) ? this.type : "line";
           
             this.colors = (this.colors) ? this.colors : ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"];
             this.stacked = (this.stacked) ? this.stacked : false;
             this.resize = (this.resize) ? this.resize : true;
             // donut config
             this.labelColor = (this.labelColor) ? this.labelColor : "#eee";
             this.backgroundColor = (this.backgroundColor) ? this.backgroundColor : "#fff";
             this.transport = (this.transport) ? this.transport : null;
		     this.msgTag = (this.msgTag) ? this.msgTag : null;
             this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
           
             this.showLegend = (this.showLegend) ? this.showLegend : "true"; //Default is true for backward compatibility
             this.legendType = (this.legendType) ? this.legendType : "hover";
             this.horizontal = this.horizontal ? this.horizontal : "false";
             
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
                                           $scope.$ctrl.legendDate =  (self.x1LegendLabel) ? ((self.x1LegendLabel + ": ") +  self.dateFormat(row[self.xkey])) : self.dateFormat(row[self.xkey]);
                                    } else {
                                        $scope.$ctrl.legendDate = (self.x1LegendLabel) ? ((self.x1LegendLabel + ": ") + row[self.xkey]) : row[self.xkey] ;
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
            
             if(this.dateFormat) {
                this.onDateFormat = function(date) {
                    return self.dateFormat()(date);
                }
             }
             
             if(this.xlabelFormat) {
                 this.onXlabelFormat = function(date) {
                    return self.xlabelFormat()(date);
                }
             }
             
             if(this.ylabelFormat){
                 this.onYlabelFormat = function(y) {
                    return self.ylabelFormat()(y);
                }
             }
             
             if(this.parseTime) {
                this.onDateFormat = function(date) {
                    if(self.dateFormat) {
                         return self.dateFormat()(date);
                    } else {
                        try {
                            if(self.timeZone){
                                return moment(date).utcOffset(self.timeZone).format(self.xdateMomentFormat);
                            }else {
                                 return moment(date).format(self.xdateMomentFormat);
                            }

                        } catch(e) {
                             console.error("Invalid date format passed", self.xdateMomentFormat);
                             if(self.timeZone){
                                return moment(date).utcOffset(self.timeZone).format("DD-MM-YYYY HH:mm:ss");
                            } else {
                                return moment(date).format("DD-MM-YYYY HH:mm:ss");
                            }
                        }
                    }
                 	
                }
                
                this.onXlabelFormat = function(date) {
                    if(self.xlabelFormat) {
                         return self.xlabelFormat()(date);
                    } else {
                        try {
                            if(self.timeZone){
                                return moment(date).utcOffset(self.timeZone).format(self.xdateMomentFormat);
                            } else {
                                return moment(date).format(self.xdateMomentFormat);
                            }
                        } catch(e) {
                             console.error("Invalid date format passed", self.xdateMomentFormat);
                            if(self.timeZone){
                                return moment(date).utcOffset(self.timeZone).format("DD-MM-YYYY HH:mm:ss");
                            } else {
                                return moment(date).format("DD-MM-YYYY HH:mm:ss");
                            }
                        }
                    }
                }
                /**
                this.legendDateFormat = function(date) {
                 	try {
                        if(self.timeZone){
                            return moment(date).utcOffset(self.timeZone).format(self.legendDateMomentFormat);
                        }else
                            return moment(date).format(self.legendDateMomentFormat);
                    } catch(e) {
                         console.error("Invalid date format passed", self.legendDateMomentFormat);
                         return moment(date).utcOffset(self.timeZone).format("DD-MM-YYYY HH:mm:ss");
                    }
                }**/
             }
               
       }
         
         this.$postLink = function () {
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
                   if(JSON.stringify(newVal) != JSON.stringify(oldVal) || !self.hasData){
                       self.consumeData(newVal);
                   }
               });
           } else {    
               $scope.$on("update-data", function(event, data) {
                  if(data == null) {
                   		if(!self.datas || self.datas.length == 0) {
                             self.noResults = true;
                         } 
                  } else {
                       if(data[self.serviceTag])
                           self.consumeData(data[self.serviceTag]);
                       else if(!self.serviceTag)
                           self.consumeData(data);
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
       }
       
       this.resize = function() {
           if($element.parent().innerWidth() < 240) {
                self.usePopover = true;
            } else {
                self.usePopover = false;
            }
       }
         
	    
        
        this.$onDestroy = function() {
            if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
            
            if(self.refreshTimer){
                $interval.cancel( self.refreshTimer );
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
                
                if(self.fetchDataInterval && !self.refreshTimer) {
                    //Assuming this is success
                    self.refreshTimer = $interval(
                        function(){
                            initDataService(self.transport)
                        }, self.fetchDataInterval * 1000);
                }
            
          }

          this.consumeData = function(data, response) {
            if(data.status && data.status == "failure") {
                 this.noResults = true;
                 self.dataMessage = this.dataFailureMessage;
                 if(this.datas && this.datas.length > 0) {
                     this.stalledData = true;
                     self.dataMessage = this.stalledDataMessage;
                 } 
            } else {
                if(typeof self.onFormatData() == "function"){
                    data = self.onFormatData()(data, self, $rootScope);
                }
                if(data != null) {
                   if(typeof data == "object" && Array.isArray(data)){
                      if(data.length > 0) {
                          if(this.datas != null && this.delta) {
                            this.datas = this.datas.concat(data)
                          } else {
                              this.datas = angular.copy(data);
                          }
                          self.hasData = true;
                          self.noResults = false;
                          self.stalledData = false;
                      } else {
                     	  if(self.resetDataOnConsume) {
                     		  this.datas =  angular.copy(data);
                     		  self.noResults = true;
                     		  self.stalledData = false;
                     	  } else {
                     		  self.noResults = true;
                             if(self.datas != null  && self.datas.length > 0) {
                                 self.stalledData = true;
                             } 
                     	  }
                          self.dataMessage = this.stalledDataMessage;
                      }
                   } else {
                       self.noResults = true;
                       if(self.datas != null  && self.datas.length > 0) {
                          self.stalledData = true;
                        } 
                        self.dataMessage = this.invalidData;
                   }
                }else{
                    if(self.resetDataOnConsume) {
                        this.datas =  angular.copy(data);
                        self.noResults = true;
                        self.stalledData = false;
                    } else {
                        self.noResults = true;
                        if(self.datas != null  && self.datas.length > 0) {
                            self.stalledData = true;
                        } 
                    }
                    self.dataMessage = this.stalledDataMessage;
                } 
            }
          }
        }
	});
