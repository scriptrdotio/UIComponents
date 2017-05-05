angular
  .module("SearchBox", [ 'angularBootstrapNavTree' ])
  .component(
  'scriptrSearchbox',
  {
    bindings : {
      
        "treeControl" : "<?",
      
        "treeData" : "<?",
      
        "searchText": "@",
      
        "iconLeaf" : "@",
      
        "paramName" : "@",
      
        "iconExpand" : "@",
      
        "iconCollapse" : "@",
      
        "onSelect" : "<?",
      
        "expandLevel" : "@",
      
        "initialSelection" : "@",
      
        "apiParams" : "<?",
      
        "loadTree" : "<?",
      
        "treeSearchCriteria" : "@",
      
        "transport" : "@",
      
        "api" : "@",
      
        "onFormatData" : "&"
      
    },
    templateUrl: "/UIComponents/dashboard/frontend/components/searchBox/searchBox.html",
    controller: function(wsClient, httpClient) {
      
         var self = this;
      
     	 this.iconExpand = (this.iconExpand) ? this.iconExpand : null;
      
      	 this.$onInit = function() {
           
           this.iconLeaf = (this.iconLeaf && this.iconLeaf != "$ctrl.iconLeaf") ? this.iconLeaf : "icon-file  glyphicon glyphicon-file  fa fa-file";
           this.iconExpand = (this.iconExpand && this.iconExpand != "$ctrl.iconExpand") ? this.iconExpand : "icon-plus  glyphicon glyphicon-plus  fa fa-plus";
           this.iconCollapse = (this.iconCollapse && this.iconCollapse != "$ctrl.iconCollapse") ? this.iconCollapse : "icon-minus glyphicon glyphicon-minus fa fa-minus";
           
           this.paramName = (this.paramName) ? this.paramName : "criteria";
           
           this.searchText = (this.searchText) ? this.searchText : "Type to search";
           
           this.treeData = (this.treeData) ? this.treeData : [];
           this.iconLeaf = (this.iconLeaf) ? this.iconLeaf : null;
           this.transport = (this.transport) ? this.transport : "wss";
           
           if(this.loadTree){
             this.searching = true;
             initDataService(this.transport, this.searchValue);
           }
         }
         
         this.onFilterChanged = function() {
           console.log("submit");
           if(this.searchValue != null && this.searchValue != ""){
                this.searchValue = this.treeSearchCriteria; 
                this.searching = true;
        	   initDataService(this.transport, this.searchValue);
           }
        }
         
        
         
         var initDataService = function(transport, searchValue) {
           var params = {};
           params[self.paramName] = searchValue || self.treeSearchCriteria;
           
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
                 },
                 function(err) {
                    console.log( "reject published promise", err);
                    self.consumeData();
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
                        self.consumeData();  
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
           if(typeof data == "object" && data.length > 0){
             this.treeData = data;
             this.noResults = false;
           }else{
             this.treeData = [];
             this.noResults = true;
           }
           this.searching = false;
         }
    }
});