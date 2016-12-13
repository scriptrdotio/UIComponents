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
        
        "labels" : "<?",
        
        "lineColors" : "@",
        
        "api": "@",
        
        "transport" : "@",
        
        "msgTag" : "@",
        
        "apiData" : "<?"
        
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
             this.lineColors = (this.lineColors) ? this.lineColors : ["#FFC916"]
             
             // donut config
             this.donutLabelColor = (this.donutLabelColor) ? this.donutLabelColor : "#000000";
             this.donutBackgroundColor = (this.donutBackgroundColor) ? this.donutBackgroundColor : "#ffffff";
             this.donutColors = (this.donutColors) ? this.donutColors : ["#31C0BE","#c7254e","#98a0d3"];
             this.donutFormatter = (this.donutFormatter) ? this.donutFormatter : "currency";
         
             this.transport = (this.transport) ? this.transport : "wss";
		     this.msgTag = (this.msgTag) ? this.msgTag : null;
           
             initDataService(this.transport);
         }

        var initDataService = function(transport) {
            if (transport == "wss") {
              wsClient.onReady.then(function() {
                // Subscribe to socket messages with id chart
                wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
                if(self.api) {
                  wsClient.call(self.api, self.apiData, self.msgTag)
                    .then(function(data, response) {
                    self.consumeData(data)
                  });
                }

              });
            } else {
              if (transport == "http" && self.api) {
                httpClient
                  .get(self.api, self.apiData)
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
