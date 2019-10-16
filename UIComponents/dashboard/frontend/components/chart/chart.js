angular.module('Chart', [ 'angular.morris' ]);

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
        
        "resize": "<?",
        
        "data": "<?",
        
        "type" : "@",
        
        "xkey" : "@",
        "yconfig" : "<?",
        
        "ykeys" : "<?",
         
        "stacked": "<?",
        
        "labels" : "<?",
        
        "colors" : "<?",
        
        "api": "@",
        
        "transport" : "@",
        
        "msgTag" : "@",
        
        "apiParams" : "<?",
        
        "onFormatData" : "&",
          
        "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed
        
          
        "lineWidth": "@", 
        "pointSize": "@",
        "pointFillColors" : "@", 
        "pointStrokeColors" : "@", 
        "ymax" : "@", 
        "ymin": "@", 
        "smooth": "@", 
        "hideHover": "@",
        "parseTime": "@", 
        "units": "@", 
        "postUnits": "@", 
        "preUnits": "@", 
        
        "xlabels": "@", 
        "xlabelAngle": "<?", 
        "goals": "@", 
        "goalStrokeWidth": "@",
        "goalLineColors": "@", 
        "goalsconfig" : "<?",
        "events": "@", 
        "eventStrokeWidth": "@", 
        "eventLineColors": "@", 
        "eventconfig" : "<?",
          
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
        "fetchDataInterval": "@",
        "useWindowParams": "@",
          
        "showLegend": "@",
        "legendType": "@" //"hover", "right"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/chart/chart.html',
      controller: function(httpClient, wsClient, $scope, $timeout, $interval, dataService) {
        
         var self = this;
        
         this.$onInit = function() {
             
             if(typeof this.api == 'undefined' && typeof this.msgTag == 'undefined' && ((this.data && this.data.length == 0) || this.data == null)){
               this.noResults = true;
             }
             
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
             this.hideHover = (this.hideHover) ? this.hideHover : "auto";
             
             if(this.showLegend && this.showLegend == "true") {
                 if(this.legendType && this.legendType == "right") {
                     this.hideHover = "always";
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
                     this.hoverCallback = function (index, options, content, row) {
                            if(self.datas) {
                                if(row && row.date){
                                    $scope.$ctrl.legendDate = row[self.xkey];
                                }
                                 _.mapObject(row, function(val, key) {
                                    var index = _.findIndex($scope.$ctrl.legendStructure, {"key": (self.type != "donut" ? key : val)});

                                    if(index != -1){
                                        $scope.$ctrl.legendStructure[index]["value"] = (self.type == "donut") ? content : val;
                                        var element = document.getElementById("value_"+index+"_"+self.ref)
                                        var dateElement = document.getElementById("date_" + self.ref);
                                        if(element)
                                            element.innerHTML = (self.type == "donut") ? content : val;
                                        if(self.type != "donut" && dateElement)
                                            dateElement.innerHTML = row[self.xkey];
                                    }
                                });
                            }
                        }
                 } else {
                      if(this.legendType && this.legendType == "hover") {
                          console.log("Legend type", this.legendType)
                      }
                 }
             } 
       }
         
         this.$postLink = function () {
           initDataService(this.transport);
           $scope.$emit("waiting-for-data");
           // apply 2 seconds delay for static data  
           if(this.data && !this.api) {
              self.timeout = false; 
         	  $timeout(function() {
                 if(self.timeout == false)
                 	self.consumeData(self.data);
               }, 2000)
           }else{
               self.timeout = true;
           }
             
           // set datas info when data is changed  
           $scope.$watch(function( $scope ) {
               // wait for the timeout
               if(($scope.$ctrl.data && self.timeout == true)){
                  return $scope.$ctrl.data
               }
           },function(newVal, oldVal){
               if(newVal){
                   self.consumeData(newVal);
               }
           });
         	  
        }

        this.$onDestroy = function() {
            console.log("destory chart", self.msgTag, $scope.$id);
            if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
            
            if(self.refreshTimer){
                $interval.cancel( self.refreshTimer );
            }
        }
        
        var initDataService = function(transport) {
            if(transport) {
                dataService.getData(transport, self.api, self.apiParams, self.useWindowParams, self.msgTag, self.consumeData.bind(self), self.fetchDataInterval, $scope.$id);
                
                if(self.fetchDataInterval && !self.refreshTimer) {
                    //Assuming this is success
                    self.refreshTimer = $interval(
                        function(){
                            initDataService(self.transport)
                        }, self.fetchDataInterval * 1000);
                }
            } else {
                $scope.$on("update-data", function(event, data) {
                    if(data[self.serviceTag])
                        self.consumeData(data[self.serviceTag]);
                    else
                        self.consumeData(data);
                });
            }
            
          }

          this.consumeData = function(data, response) {
            self.timeout = true;   
            if(typeof self.onFormatData() == "function"){
              data = self.onFormatData()(data);
            }
            if(data && data.length > 0 && typeof data == "object"){
              this.datas = data;
              this.noResults = false;
            }else{
              this.datas = [];
              this.noResults = true;
            }
          }
        }
	});
