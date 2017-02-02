angular
  .module("SearchBox", [ 'angularBootstrapNavTree' ])
  .component(
  'scriptrSearchbox',
  {
    bindings : {
      
        "treeControl" : "<?",
      
        "treeData" : "<?",
      
        "iconLeaf" : "@",
      
        "paramName" : "@",
      
        "iconExpand" : "@",
      
        "iconCollapse" : "@",
      
        "onSelect" : "&",
      
        "expandLevel" : "@",
      
        "initialSelection" : "@",
      
        "transport" : "@",
      
        "api" : "@",
      
        "onFormatData" : "&"
      
    },
    templateUrl: "/UIComponents/dashboard/frontend/components/searchBox/searchBox.html",
    controller: function(wsClient, httpClient) {
      
         var self = this;
      
     	 this.iconExpand = (this.iconExpand) ? this.iconExpand : null;
      
      	 this.$onInit = function() {
           
           this.iconLeaf = (this.iconLeaf) ? this.iconLeaf : "icon-file  glyphicon glyphicon-file  fa fa-file";
           this.iconExpand = (this.iconExpand) ? this.iconExpand : "iicon-plus  glyphicon glyphicon-plus  fa fa-plus";
           this.iconCollapse = (this.iconCollapse) ? this.iconCollapse : "icon-minus glyphicon glyphicon-minus fa fa-minus";
           
           this.paramName = (this.paramName) ? this.paramName : "criteria";
           
           this.treeData = (this.treeData) ? this.treeData : [];
           this.iconLeaf = (this.iconLeaf) ? this.iconLeaf : null;
           this.transport = (this.transport) ? this.transport : "wss";
         }
         
         this.onFilterChanged = function() {
           console.log("submit");
           if(this.searchValue != null && this.searchValue != ""){
        	   initDataService(this.transport, this.searchValue);
           }
        }
         
         var initDataService = function(transport, searchValue) {
           if (transport == "wss") {
             wsClient.onReady.then(function() {
               // Subscribe to socket messages with id chart
               wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
               if(self.api) {
                 var params = {};
                 params[self.paramName] = searchValue;
                 wsClient.call(self.api, params, self.msgTag)
                   .then(function(data, response) {
                   self.consumeData(data)
                 });
               }
             });
           }else {
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
           if(typeof self.onFormatData() == "function"){
             data = self.onFormatData()(data);
           }
           console.log("display tree");
           this.treeData = data;
           
         }
    }
});