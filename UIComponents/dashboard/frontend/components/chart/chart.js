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
        
        "resize" : "<?",
        
        "colors" : "@",
        
        "api": "@",
        
        "transport" : "@",
        
        "msgTag" : "@",
        
        "apiParams" : "<?"
        
      },
      templateUrl: '/UIComponents/dashboard/frontend/components/chart/chart.html',
      controller: function(httpClient, wsClient) {
        
         var self = this;
          
         this.$onInit = function() {
             
             this.data = (this.data) ? this.data : null;
             
           	 this.type = (this.type) ? this.type : "line";
           
             // bar, line, area config
             this.xkey = (this.xkey) ? this.xkey : 'y'; // The name of the data record attribute that contains x-values.
             this.ykeys = (this.ykeys) ? this.ykeys : ["a"];  // A list of names of data record attributes that contain y-values.
             this.labels = (this.labels) ? this.labels : ["Serie A"]; // Labels for the ykeys -- will be displayed when you hover over the chart.
             this.colors = (this.colors) ? this.colors : ["#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088"];
             this.stacked = (this.stacked) ? this.stacked : false;
             this.resize = (this.resize) ? this.resize : true;
             
             // donut config
             this.donutLabelColor = (this.donutLabelColor) ? this.donutLabelColor : "#666";
             this.donutBackgroundColor = (this.donutBackgroundColor) ? this.donutBackgroundColor : "#ffffff";
             this.donutColors = (this.donutColors) ? this.donutColors : ["#38B9D6", "#1DBC68", "#CC5464", "#FCC717", "#E90088"];
             this.donutFormatter = (this.donutFormatter) ? this.donutFormatter : "currency";
         
             this.transport = (this.transport) ? this.transport : "wss";
		     this.msgTag = (this.msgTag) ? this.msgTag : null;
           
            
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
