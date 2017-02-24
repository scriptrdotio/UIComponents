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
      
        "onSelect" : "<?",
      
        "expandLevel" : "@",
      
        "initialSelection" : "@",
      
        "apiParams" : "<?",
      
        "transport" : "@",
      
        "api" : "@",
      
        "onFormatData" : "&"
      
    },
    templateUrl: "/UIComponents/dashboard/frontend/components/searchBox/searchBox.html",
    controller: function(wsClient, httpClient) {
      
         var self = this;
      
         self.treeDataSet = false;
      
     	 this.iconExpand = (this.iconExpand) ? this.iconExpand : null;
      
      	 this.$onInit = function() {
           
           this.iconLeaf = (this.iconLeaf) ? this.iconLeaf : "icon-file  glyphicon glyphicon-file  fa fa-file";
           this.iconExpand = (this.iconExpand) ? this.iconExpand : "icon-plus  glyphicon glyphicon-plus  fa fa-plus";
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
           var params = {};
           params[self.paramName] = searchValue;
           
           if(self.apiParams){
             for(var param in self.apiParams){
                 params[param] = self.apiParams[param];
             }
           }
           
           if (transport == "wss") {
             wsClient.onReady.then(function() {
               // Subscribe to socket messages with id chart
               wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
               if(self.api) {
                 wsClient.call(self.api, params, self.msgTag)
                   .then(function(data, response) {
                   self.consumeData(data)
                 });
               }
             });
           }else {
                if (transport == "https" && self.api) {
                    httpClient
                      .get(self.api, params)
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
           if(typeof self.onFormatData() == "function"){
             data = self.onFormatData()(data);
           }
           console.log("display tree");
           this.treeData = data;
           this.treeDataSet = true;
           
         }
    }
});