angular.module('Dygraphs', ['angular-dygraphs']);

angular
  .module('Dygraphs')
  .component(
     'scriptrDygraphs',
     {
  
      bindings : {
          "onLoad" : "&onLoad",
          "api": "@",
          "transport" : "@",
          "msgTag" : "@",
          "apiParams" : "<?",
          "onFormatData" : "&",
          "resize": "<?",
          "data": "<?",
          "legend": '<?',
          "drawX1Axis": "@",
          "drawYAxis": "@",
          "drawY2Axis": "@",
          "colors": "<?",           
          "x1AxisLabelFontSize": "@",
          "yAxisLabelFontSize": "@",
          "y2AxisLabelFontSize": "@",
          "yAxisLabelsKmb": "@",
          "y2AxisLabelsKmb": "@",     
          "x1AxisLabelWidth": "@",
          "yAxisLabelWidth": "@",
          "y2AxisLabelWidth": "@",
          "x1AxisLineColor": "@",
          "yAxisLineColor": "@",
          "y2AxisLineColor": "@",
          "x1AxisLineWidth": "@",
          "yAxisLineWidth": "@",
          "y2AxisLineWidth": "@",
          "x1AxisTickSize": "@",
          "yAxisTickSize": "@",
          "y2AxisTickSize": "@",
          "yAxisIncludeZero": "@",
          "y2AxisIncludeZero": "@",
          "x1AxisLabel": "@",
          "yAxisLabel": "@",
          "y2AxisLabel": "@",
          "showRangeSelector": "@",
          "rangeSelectorAlpha": "@",
          "rangeSelectorBackgroundLineWidth": "@",
          "rangeSelectorBackgroundStrokeColor": "@",
          "rangeSelectorForegroundLineWidth": "@",
          "rangeSelectorForegroundStrokeColor": "@",
          "rangeSelectorHeight": "@",
          "rangeSelectorPlotFillColor": "@",
          "rangeSelectorPlotFillGradientColor": "@",
          "rangeSelectorPlotLineWidth": "@",
          "rangeSelectorPlotStrokeColor": "@",
          "goals": "<?", 
          "goalLineColors": "<?",
          "events": "<?", 
          "eventLineColors": "<?",          
          "legendPosition": "@",
          "showLegend": "@" ,
          "x1DrawGrid": "@",
          "yDrawGrid": "@",          
          "y2DrawGrid": "@",
          "x1GridLineColor": "@",
          "yGridLineColor": "@",
          "y2GridLineColor": "@",
          "x1GridLineWidth": "@",          
          "yGridLineWidth": "@",          
          "y2GridLineWidth": "@",
          "legendLabels": "<?",          
          "independentTicks": "@",
          "legendMapping": "<?",
          "customGoals": "<?",
          "colorsMapping": "<?",
          "fetchDataInterval": "@",
          "useWindowParams": "@",
          //functional data
        //   "useFunctional": "<?",
        //   "functionalDataType": "@",//scattered , range
        //   "calculateFunction": "@",          
        //   "scatteredXdata": "<?",
        //   "rangeMin": "<?",
        //   "rangeMax": "<?",
        //   "rangeStep": "<?",
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/dygraphs/dygraphs.html',
      controller: function($rootScope, httpClient, wsClient, $scope, $timeout, $interval, $window, dataService) {
        
         var self = this;
         this.$onInit = function() {
             
             //if functional data call function
             
             
             //this.evalFuncionalData();
             
              this._apiParams = (this.apiParams) ?  angular.copy(this.apiParams) : [];
             if(typeof this.api == 'undefined' && typeof this.msgTag == 'undefined' && ((this.data && this.data.length == 0) || this.data == null)){
               this.noResults = true;
             }
             
             //Set axes options
           	 this.options = {};
           	 this.options.axes = {};  
              //Appending dummy data 
             this.options.series = {};
             
             
             //Initialize defaults
             this.drawX1Axis = (this.drawX1Axis) ? JSON.parse(this.drawX1Axis) : true;
             this.drawYAxis = (this.drawYAxis) ? JSON.parse(this.drawYAxis) : true;
             this.drawY2Axis = (this.drawY2Axis) ? JSON.parse(this.drawY2Axis) : true;
			
             this.colors = (this.colors) ? this.colors : ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"];  

             if(this.colorsMapping && this.showLegend && this.showLegend == "true"){
                 this.colors = _.pluck(this.colorsMapping, "colors");
                 this.legendLabels = ["x"];
                 this.legendLabels = this.legendLabels.concat(_.pluck(this.colorsMapping, "labels"));
                 
                 this.legendMapping = ["X"];
                 this.legendMapping = this.legendMapping.concat(_.pluck(this.colorsMapping, "axisSelection"));
                 this.legendUnitsMapping = _.pluck(this.colorsMapping, "unit");
                 for(var i = 1; i < this.legendLabels.length; i++){
                     if(this.legendUnitsMapping[i-1] && this.legendUnitsMapping[i-1] != "")
                         this.legendLabels[i] = this.legendLabels[i] + " (" + this.legendUnitsMapping[i-1] + ")";
                 }
                  
                 this.legendLabels = (this.legendLabels) ? this.legendLabels : ["X", "Y1", "Y2", "Y3", "Y4"];   
                 console.log("labels",  this.legendLabels)
                 this.legendMapping = (this.legendMapping) ? this.legendMapping : ["x", "y", "y", "y2", "y2"];  

                 for(var v=0; v < this.legendLabels.length; v++){
                     var labelValue = this.legendLabels[v];
                     if(v!=0){
                         if(this.legendMapping[v]=="y2" && this.drawY2Axis){
                             if(labelValue){
                                 this.options.series[labelValue] = {"axis":this.legendMapping[v]};
                             }else{
                                 this.options.series["Y" + v] = {"axis":this.legendMapping[v]};
                             }
                         }
                     }
                 }
             }
             
            
             
             
             //Legend Labels
             if(this.legendLabels && this.legendLabels!=""){
	             this.options.labels = this.legendLabels;
             }
             
             this.customGoals = (this.customGoals) ? _.reject(this.customGoals, function(item) {return (item.goals === "" || item.goals == null)}) : [];
             this.goalLineColors = _.pluck(this.customGoals, "goal-line-colors");
             this.goals = _.pluck(this.customGoals, "goals");             

             this.events = (this.events) ? this.events : [];   
             this.eventLineColors = (this.eventLineColors) ? this.eventLineColors : ["#ffffff"];   
             
             this.x1AxisLabelFontSize = (this.x1AxisLabelFontSize) ? JSON.parse(this.x1AxisLabelFontSize) : 14;
             this.yAxisLabelFontSize = (this.yAxisLabelFontSize) ? JSON.parse(this.yAxisLabelFontSize) : 14;
             this.y2AxisLabelFontSize = (this.y2AxisLabelFontSize) ? JSON.parse(this.y2AxisLabelFontSize) : 14;
             
             this.yAxisLabelsKmb = (this.yAxisLabelsKmb) ? JSON.parse(this.yAxisLabelsKmb) : false;                
             this.y2AxisLabelsKmb = (this.y2AxisLabelsKmb) ? JSON.parse(this.y2AxisLabelsKmb) : false;
             
             this.x1AxisLabelWidth = (this.x1AxisLabelWidth) ? JSON.parse(this.x1AxisLabelWidth) : 60;
             this.yAxisLabelWidth = (this.yAxisLabelWidth) ? JSON.parse(this.yAxisLabelWidth) : 250;
             this.y2AxisLabelWidth = (this.y2AxisLabelWidth) ? JSON.parse(this.y2AxisLabelWidth) : 50;

             this.x1AxisLineColor = (this.x1AxisLineColor) ? this.x1AxisLineColor : "#000000";
             this.yAxisLineColor = (this.yAxisLineColor) ? this.yAxisLineColor : "#000000";
             this.y2AxisLineColor = (this.y2AxisLineColor) ? this.y2AxisLineColor : "#000000";  
             
             this.showLegend = (this.showLegend) ? JSON.parse(this.showLegend) : true;               
             
             this.x1AxisLabel = (this.x1AxisLabel) ? this.x1AxisLabel : "";
             this.yAxisLabel = (this.yAxisLabel) ? this.yAxisLabel : "";
             this.y2AxisLabel = (this.y2AxisLabel) ? this.y2AxisLabel : ""; 
             
             this.x1AxisLineWidth = (this.x1AxisLineWidth) ? JSON.parse(this.x1AxisLineWidth) : 0.3;
             this.yAxisLineWidth = (this.yAxisLineWidth) ? JSON.parse(this.yAxisLineWidth) : 0.3;
             this.y2AxisLineWidth = (this.y2AxisLineWidth) ? JSON.parse(this.y2AxisLineWidth) : 0.3;
             
             this.x1AxisTickSize = (this.x1AxisTickSize) ? JSON.parse(this.x1AxisTickSize) : 3;
             this.yAxisTickSize = (this.yAxisTickSize) ? JSON.parse(this.yAxisTickSize) : 3;
             this.y2AxisTickSize = (this.y2AxisTickSize) ? JSON.parse(this.y2AxisTickSize) : 3;             
             
             this.yAxisIncludeZero = (this.yAxisIncludeZero) ? JSON.parse(this.yAxisIncludeZero) : false;   
             this.y2AxisIncludeZero = (this.y2AxisIncludeZero) ? JSON.parse(this.y2AxisIncludeZero) : false;
             
             this.showRangeSelector = (this.showRangeSelector) ? JSON.parse(this.showRangeSelector) : false;   
             this.rangeSelectorAlpha = (this.rangeSelectorAlpha) ? JSON.parse(this.rangeSelectorAlpha) : 0.6;   
             this.rangeSelectorBackgroundLineWidth = (this.rangeSelectorBackgroundLineWidth) ? JSON.parse(this.rangeSelectorBackgroundLineWidth) : 1;   
             this.rangeSelectorBackgroundStrokeColor = (this.rangeSelectorBackgroundStrokeColor) ? this.rangeSelectorBackgroundStrokeColor : "#808080";   
             this.rangeSelectorForegroundLineWidth = (this.rangeSelectorForegroundLineWidth) ? JSON.parse(this.rangeSelectorForegroundLineWidth) : 1;   
             this.rangeSelectorForegroundStrokeColor = (this.rangeSelectorForegroundStrokeColor) ? this.rangeSelectorForegroundStrokeColor : "#000000";   
             this.rangeSelectorHeight = (this.rangeSelectorHeight) ? JSON.parse(this.rangeSelectorHeight) : 40;   
             this.rangeSelectorPlotFillColor = (this.rangeSelectorPlotFillColor) ? this.rangeSelectorPlotFillColor : "#A7B1C4";   
             this.rangeSelectorPlotFillGradientColor = (this.rangeSelectorPlotFillGradientColor) ? this.rangeSelectorPlotFillGradientColor : "#FFFFFF";   
             this.rangeSelectorPlotLineWidth = (this.rangeSelectorPlotLineWidth) ? JSON.parse(this.rangeSelectorPlotLineWidth) : 1.5;   
             this.rangeSelectorPlotStrokeColor = (this.rangeSelectorPlotStrokeColor) ? this.rangeSelectorPlotStrokeColor : "#808FAB";   

             this.x1DrawGrid = (this.x1DrawGrid) ? JSON.parse(this.x1DrawGrid) : true;   
             this.yDrawGrid = (this.yDrawGrid) ? JSON.parse(this.yDrawGrid) : true;   
             this.y2DrawGrid = (this.y2DrawGrid) ? JSON.parse(this.y2DrawGrid) : false;                
             this.x1GridLineColor = (this.x1GridLineColor) ? this.x1GridLineColor : "#000000";                
             this.yGridLineColor = (this.yGridLineColor) ? this.yGridLineColor : "#000000";                
             this.y2GridLineColor = (this.y2GridLineColor) ? this.y2GridLineColor : "#000000";                             
             this.x1GridLineWidth = (this.x1GridLineWidth) ? JSON.parse(this.x1GridLineWidth) : 0.3;             
             this.yGridLineWidth = (this.yGridLineWidth) ? JSON.parse(this.yGridLineWidth) : 0.3;             
             this.y2GridLineWidth = (this.y2GridLineWidth) ? JSON.parse(this.y2GridLineWidth) : 0.3;                          
             this.xDrawGrid = (this.xDrawGrid) ? JSON.parse(this.xDrawGrid) : true;  
             this.independentTicks = (this.independentTicks) ? this.independentTicks : "y-primary";   
             
             
             //Set Axis Labels
             if(this.x1AxisLabel && this.x1AxisLabel!="")
	             this.options.xlabel = this.x1AxisLabel;
	         if(this.yAxisLabel && this.yAxisLabel!="")
    	         this.options.ylabel = this.yAxisLabel;
             if(this.y2AxisLabel && this.y2AxisLabel!="")
	             this.options.y2label = this.y2AxisLabel;   
             
             
             this.options.yRangePad = "10"
             //Set x-axis options
             this.options.axes.x = {};
             this.options.axes.x.drawAxis = JSON.parse(this.drawX1Axis);
             this.options.axes.x.axisLabelFontSize = JSON.parse(this.x1AxisLabelFontSize);
             this.options.axes.x.axisLabelWidth = JSON.parse(this.x1AxisLabelWidth);
             this.options.axes.x.axisLineColor = this.x1AxisLineColor;
             this.options.axes.x.axisLineWidth = JSON.parse(this.x1AxisLineWidth);             
             this.options.axes.x.axisTickSize = JSON.parse(this.x1AxisTickSize);  
             
           	 //Format x-axis as date, use default formatting to be comforme to Onset
             this.options.axes.x.independentTicks = true;  
             this.options.axes.x.ticker = Dygraph.dateTicker
             /**
                 this.options.xValueParser = function(date) {
                     if(self.timeZone){
                         return moment(date).utcOffset(self.timeZone).format("YYYY-MM-DD kk:mm");
                     }
                    return moment(date).format("YYYY-MM-DD kk:mm");
                 }
           
             this.options.labelsUTC = true;
             **/
             this.options.axes.x.axisLabelFormatter = function(d, gran, opts) {
                 return Dygraph.dateAxisLabelFormatter(new Date(d), gran, opts);
             }   
             
             
             //Set y-axis options
             this.options.axes.y = {};
             this.options.axes.y.drawAxis = JSON.parse(this.drawYAxis);
             this.options.axes.y.axisLabelFontSize = JSON.parse(this.yAxisLabelFontSize);
             if($(window).innerWidth() <= 480){
                 this.options.axes.y.axisLabelWidth = 40;
             }else{
                 this.options.axes.y.axisLabelWidth = JSON.parse(this.yAxisLabelWidth);             
             }
             this.options.axes.y.axisLineColor = this.yAxisLineColor;     
             this.options.axes.y.axisLineWidth = JSON.parse(this.yAxisLineWidth);  
             this.options.axes.y.axisTickSize = JSON.parse(this.yAxisTickSize);                                       
             this.options.axes.y.includeZero = JSON.parse(this.yAxisIncludeZero);              
             this.options.axes.y.labelsKMB = JSON.parse(this.yAxisLabelsKmb);      
             
             //Hardcode not passed as param
             
             var digitsAfterDecimal = 4; 
             this.options.digitsAfterDecimal = digitsAfterDecimal;
             
             var formatYAxisValues = function(y,digitsAfterDecimal) {
                 var shift = Math.pow(10, digitsAfterDecimal);
                 return Math.round(y * shift) / shift;
             }
             
             this.options.axes.y.ticker = Dygraph.numericLinearTicks
             this.options.axes.y.axisLabelFormatter =  function(y) {
                 return formatYAxisValues(y,digitsAfterDecimal)
             }
			
             //Set y2-axis options
             this.options.axes.y2 = {};
             this.options.axes.y2.drawAxis = JSON.parse(this.drawY2Axis);             
             this.options.axes.y2.axisLabelFontSize = JSON.parse(this.y2AxisLabelFontSize);
             if($(window).innerWidth() <= 480){
                 this.options.axes.y2.axisLabelWidth = 40;
             }else{
                 this.options.axes.y2.axisLabelWidth = JSON.parse(this.yAxisLabelWidth);             
             }
             this.options.axes.y2.axisLineColor = this.y2AxisLineColor;  
             this.options.axes.y2.axisLineWidth = JSON.parse(this.y2AxisLineWidth);     
             this.options.axes.y2.axisTickSize = JSON.parse(this.y2AxisTickSize);                                       
             this.options.axes.y2.includeZero = JSON.parse(this.y2AxisIncludeZero);      
             this.options.axes.y2.labelsKMB = JSON.parse(this.y2AxisLabelsKmb);   
             this.options.axes.y2.ticker = Dygraph.numericLinearTicks
             
             
             this.options.axes.y2.axisLabelFormatter =  function(y2) {
                  return formatYAxisValues(y2,digitsAfterDecimal)
             } 

             //Set Range Selector Data
             this.options.showRangeSelector = JSON.parse(this.showRangeSelector);
             this.options.rangeSelectorAlpha = JSON.parse(this.rangeSelectorAlpha);
             this.options.rangeSelectorBackgroundLineWidth = JSON.parse(this.rangeSelectorBackgroundLineWidth);
             this.options.rangeSelectorBackgroundStrokeColor = this.rangeSelectorBackgroundStrokeColor;
             this.options.rangeSelectorForegroundLineWidth = JSON.parse(this.rangeSelectorForegroundLineWidth);
             this.options.rangeSelectorForegroundStrokeColor = this.rangeSelectorForegroundStrokeColor;
             this.options.rangeSelectorHeight = JSON.parse(this.rangeSelectorHeight);
             this.options.rangeSelectorPlotFillColor = this.rangeSelectorPlotFillColor;
             this.options.rangeSelectorPlotFillGradientColor = this.rangeSelectorPlotFillGradientColor;
             this.options.rangeSelectorPlotLineWidth = JSON.parse(this.rangeSelectorPlotLineWidth);
             this.options.rangeSelectorPlotStrokeColor = this.rangeSelectorPlotStrokeColor;
             
             //line colors
             this.options.colors = this.colors;             
             //Legend
             if(this.showLegend){
                 this.options.showLabelsOnHighlight = true;
                 this.options.legend = "always";
             }else{
                 this.options.showLabelsOnHighlight = false;
           		 this.options.hideOverlayOnMouseOut = true;
             }
             this.options.legendPosition = (this.legendPosition) ? this.legendPosition : "top";
             
             //Grid
             this.options.axes.x.drawGrid = JSON.parse(this.x1DrawGrid);             
             this.options.axes.y.drawGrid = JSON.parse(this.yDrawGrid);             
             this.options.axes.y2.drawGrid = JSON.parse(this.y2DrawGrid);             
             this.options.axes.x.gridLineColor = this.x1GridLineColor;
             this.options.axes.y.gridLineColor = this.yGridLineColor; 
             this.options.axes.y2.gridLineColor = this.y2GridLineColor;             
             this.options.axes.x.gridLineWidth = JSON.parse(this.x1GridLineWidth);             
             this.options.axes.y.gridLineWidth = JSON.parse(this.yGridLineWidth);             
             this.options.axes.y2.gridLineWidth = JSON.parse(this.y2GridLineWidth);                          
             if(this.independentTicks == "y-primary"){
                 this.options.axes.y.independentTicks = true;             
                 this.options.axes.y2.independentTicks = false;           
             }else if(this.independentTicks == "y2-primary"){
                 this.options.axes.y.independentTicks = false;
                 this.options.axes.y2.independentTicks = true;
             }else if(this.independentTicks == "independent"){
                 this.options.axes.y.independentTicks = true;
                 this.options.axes.y2.independentTicks = true;
             }
        	
            
             
             this.options.goals = (this.goals) ? this.goals : [];   
             this.options.goalLineColors = (this.goalLineColors) ? this.goalLineColors : ["#ffffff"];   

             this.options.events = (this.events) ? this.events : [];   
             this.options.eventLineColors = (this.eventLineColors) ? this.eventLineColors : ["#ffffff"];   
        
             //Usually, when Dygraphs encounters a missing value in a data series, it interprets this as a gap and draws it as such. If, instead, the missing values represents an x-value for which only a different series has data, then you'll want to connect the dots by setting this to true. To explicitly include a gap with this option set, use a value of NaN.
             this.options.connectSeparatedPoints = true;
             
             
             //this.data = JSON.parse(this.data);
             this.resize = (this.resize) ? this.resize : true;
             this.transport = (this.transport) ? this.transport : "wss";
		     this.msgTag = (this.msgTag) ? this.msgTag : null;
             this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
             
             this.fetchDataInterval = (this.fetchDataInterval) ? parseInt(this.fetchDataInterval) : null;

             //Initially!!
             this.delta = false;
             
             
             
             angular.element($window).on('resize', function() {
                 if($(window).innerWidth() <= 480){
                     self.options.axes.y2.axisLabelWidth = 40;
                     self.options.axes.y.axisLabelWidth = 40;
                 }else{
                     self.options.axes.y2.axisLabelWidth = JSON.parse(self.y2AxisLabelWidth);
                     self.options.axes.y.axisLabelWidth = JSON.parse(self.yAxisLabelWidth);
                 }
             });
           
       }
         
        //  this.evalFuncionalData=function(){
        //      if(!self.useFunctional){
        //          return;
        //      }
             
        //      var d = new Date();
        //      var functionName="dygraphFn"+d.getMilliseconds();
        //      eval(functionName+ " = " + self.calculateFunction);
             
        //      var x=[];
             
        //      if(self.functionalDataType=="scattered"){
        //          x=self.scatteredXdata
        //      }else if(self.functionalDataType=="range"){
        //          var arr=[];
        //          var i=0;
        //             for (i=self.rangeMin; i <= self.rangeMax; i=i+ self.rangeStep){
		// 				arr.push(i);
        //             }
        //          x=arr;
        //      }
        //      var res=[];
        //      x.forEach(function(element){
        //          var row=[element]
        //          var y=window[functionName](element);
        //          if (y.length > 0) {
        //             for (var j = 0; j < y.length; j++) {
        //               row.push(y[j]);
        //             }
        //           } else {
        //             row.push(y);
        //           }
        //          res.push(row);
        //      });
             
        //      self.data=res;
        //      this.consumeData(self.data);
             
        //  }
         
         this.$postLink = function () {
           initDataService(this.transport);
           // apply 2 seconds delay for static data  
           if(this.data && !this.api) {
              self.timeout = false; 
         	  $timeout(function() {
                self.consumeData(self.data);
                //   if(!self.useFunctional){
                //       self.consumeData(self.data);
                //   }
                 
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
           },function(newVal){
               if(newVal){
                //    if(!self.useFunctional){
                //        self.datas = newVal;
                //    self.noResults = false;
                //    }
                   self.datas = newVal;
               self.noResults = false;
                   
               }
           });
        }

        this.$onDestroy = function() {
            console.log("destory chart", self.msgTag, $scope.$id);
            if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
            
            if(self.refreshTimer) {
                $interval.cancel( self.refreshTimer );
            }
              	
        }
        
        var initDataService = function(transport) {
           dataService.getData(transport, self.api, self.apiParams, self.useWindowParams, self.msgTag, self.consumeData.bind(self), self.fetchDataInterval, $scope.$id);
                
                if(self.fetchDataInterval && !self.refreshTimer) {
                    //Assuming this is success
                    self.refreshTimer = $interval(
                        function(){
                            initDataService(self.transport)
                        }, self.fetchDataInterval * 1000);
                }
          };
          
          
          this.consumeData = function(data, response) {
              console.log(data);
              if(typeof data == "object" && data.timeZone){
                  self.timeZone = data.timeZone;
                  self.options.offset =  data.timeZone;
                  data = data.data;
              }
            self.timeout = true;   
            if(typeof self.onFormatData() == "function"){
              data = self.onFormatData()(data);
            }
            if(data && data.length > 0 && typeof data == "object"){
              if(this.fetchDataInterval && this.fetchDataInterval > 0 && this.datas && this.delta) {
                    this.datas = this.datas.concat(data)
              } else {
                  this.datas = data;
                  this.noResults = false;
              }
            }else{
              if((this.api && data && data.length == 0) && (!this.datas || (this.datas && this.datas.length == 0))) {
                  this.datas = [];
                  this.noResults = true;
              }
            }
              console.log("datas",this.datas);
          }
        }
	});
