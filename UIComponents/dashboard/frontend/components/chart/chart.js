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
        
        "ykeys" : "<?",
         
        "stacked": "<?",
        
        "labels" : "<?",
        
        "colors" : "<?",
        
        "api": "@",
        
        "transport" : "@",
        
        "msgTag" : "@",
        
        "apiParams" : "<?",
        
        "onFormatData" : "&",
        
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
        "events": "@", 
        "eventStrokeWidth": "@", 
        "eventLineColors": "@", 
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
        "ylabelFormat": "&?"
       
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/chart/chart.html',
      controller: function(httpClient, wsClient, $scope, $timeout) {
        
         var self = this;
        
         this.$onInit = function() {
             
             if(typeof this.api == 'undefined' && typeof this.msgTag == 'undefined' && ((this.data && this.data.length == 0) || this.data == null)){
               this.noResults = true;
             }
            
           	 //this.type = (this.type) ? this.type : "line";
           
             this.colors = (this.colors) ? this.colors : ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"];
             this.stacked = (this.stacked) ? this.stacked : false;
             this.resize = (this.resize) ? this.resize : true;
             
             // donut config
             this.labelColor = (this.labelColor) ? this.labelColor : "#eee";
             this.backgroundColor = (this.backgroundColor) ? this.backgroundColor : "#fff";
         
             this.transport = (this.transport) ? this.transport : "wss";
		     this.msgTag = (this.msgTag) ? this.msgTag : null;
           
           	 console.log(this.type, this.xlabelAngle)
       }
         
         this.$postLink = function () {
           initDataService(this.transport);
           // apply 2 seconds delay for static data  
           if(this.data && !this.api) {
              self.timeout = false; 
         	  $timeout(function() {
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
           },function(newVal){
               if(newVal){
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
        }
        
        var initDataService = function(transport) {
            if (transport == "wss") {
              wsClient.onReady.then(function() {
                // Subscribe to socket messages with id chart
                if(self.msgTag){
                    wsClient.subscribe(self.msgTag, self.consumeData.bind(self), $scope.$id);  
                }
                if(self.api) {
                  wsClient.call(self.api, self.apiParams, self.msgTag)
                    .then(
                    function(data, response) {
                     self.consumeData(data)
                  },
                  function(err) {
                      console.log( "reject published promise", err);
                      self.consumeData();
                    });
                }

              });
            } else {
              if (transport == "https" && self.api) {
              httpClient
                  .get(self.api, self.apiParams)
                  .then(
                  function(data, response) {
                    self.consumeData(data)
                  },
                  function(err) {
                    console.log( "reject published promise", err);
                    self.consumeData();
                  });
              }
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
