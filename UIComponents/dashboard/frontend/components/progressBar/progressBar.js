angular.module('ProgressBar', [ 'ngAnimate', 'ngSanitize', 'ui.bootstrap' ]);

angular
  .module('ProgressBar')
  .component(
     'scriptrProgressbar',
     {
  
      bindings : {
        
        "onLoad" : "&onLoad",
        
        "value" : "@", // The current value of progress bar.
        "data": "@",
        
        "type" : "@", // Bootstrap style type. Possible values are 'success', 'info', 'warning', and, 'danger' to use Bootstrap's pre-existing styling, or any desired custom suffix.
        
        "max" : "@", //  A number that specifies the total value of bars that is required.
        
        "title" : "@", // Title to use as label (for accessibility).
        
        "class" : "@",
        
        "animate": "<?", // Whether bars use transitions to achieve the width change.
        
        "stacked" : "<?", // Array of objects representing multiple stacked progress bars
        
        "api": "@", // Name of the api to call backend data.
        
        "transport" : "@", // 	method used to call api (can take "https" or "wss").
        
        "msgTag" : "@", // Subscribe to socket messages with tag name.
        
        "apiParams" : "<?", // api parameters. 
        
        "onFormatData" : "&" // Callback function to be called after data is returned from backend 
        
      },
      templateUrl: '/UIComponents/dashboard/frontend/components/progressBar/progressBar.html',
      controller: function($scope, httpClient, wsClient) {
        
         var self = this;

         this.$onInit = function() {
           
           this.value = (this.value) ? this.value : ((this.data) ? this.data : 0 );
           
           this.transport = (this.transport) ? this.transport : "wss";
		   this.msgTag = (this.msgTag) ? this.msgTag : null;

           initDataService(this.transport);
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
                    .then(function(data, response) {
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
                    console
                      .log(
                      "reject published promise",
                      err);
                  });
              }
            }
          }
        
        
        this.$onDestroy = function() {
            console.log("destory Progress bar")
             if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
        }
          this.consumeData = function(data, response) {
             if(typeof self.onFormatData() == "function"){
               data = self.onFormatData()(data);
             }
             this.value = Math.round(data);
          }
        }
	});
