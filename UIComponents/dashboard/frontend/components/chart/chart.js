angular.module('Chart', [ 'angular.morris' ]);

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
        
        "colors" : "@",
        
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
      templateUrl: '/UIComponents/dashboard/frontend/components/chart/chart.html',
      controller: function(httpClient, wsClient) {
        
         var self = this;
          
         this.$onInit = function() {
             
             this.data = (this.data) ? this.data : null;
             
           	 //this.type = (this.type) ? this.type : "line";
           
             this.colors = (this.colors) ? this.colors : ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"];
             this.stacked = (this.stacked) ? this.stacked : false;
             this.resize = (this.resize) ? this.resize : true;
             
             // donut config
             this.labelColor = (this.labelColor) ? this.labelColor : "#666";
             this.backgroundColor = (this.backgroundColor) ? this.backgroundColor : "#eee";
         
             this.transport = (this.transport) ? this.transport : "wss";
		     this.msgTag = (this.msgTag) ? this.msgTag : null;
           
           	 console.log(this.type, this.xlabelAngle)
       }
         
        this.$postLink = function () {
           initDataService(this.transport);
        }

        var initDataService = function(transport) {
            if (transport == "wss") {
              wsClient.onReady.then(function() {
                // Subscribe to socket messages with id chart
                wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
                if(self.api) {
                  wsClient.call(self.api, self.apiParams, self.msgTag)
                    .then(function(data, response) {
                    if(typeof self.onFormatData() == "function"){
                       data = self.onFormatData()(data);
                    }
                    self.consumeData(data)
                  });
                }

              });
            } else {
              if (transport == "https" && self.api) {
              httpClient
                  .get(self.api, self.apiParams)
                  .then(
                  function(data, response) {
                    if(typeof self.onFormatData() == "function"){
                       data = self.onFormatData()(data);
                    }
                    self.consumeData(data)
                  },
                  function(err) {
                    console
                      .log(
                      "reject published promise",
                      err);
                  });
              }
            }
          }

          this.consumeData = function(data, response) {
            this.data = data;
          }
        }
	});
