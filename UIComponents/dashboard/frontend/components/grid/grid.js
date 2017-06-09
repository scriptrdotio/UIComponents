agGrid.initialiseAgGridWithAngular1(angular);
angular.module('Grid', ['agGrid', 'ui.bootstrap']);

angular
  .module("Grid")
  .component(
    'scriptrGrid',
    {
      bindings : {

        "onLoad" : "&onLoad",

        "columnsDefinition" : "<columnsDefinition",

        "enableServerSideSorting" : "<?", // Note that Client side sorting & filtering does not make sense in virtual paging and is just not supported, only Server side sorting & filtering is supported

        "enableServerSideFilter" : "<?",

        "enableColResize" : "<?",
        
        "enableDeleteRow" : "<?",
        
        "enableAddRow" : "<?",

        "cellEditable" : "<?",
        
        "enableClientSideSorting": "<?", // client-side sorting

        "api" : "@", // restApi 

        "onInsertRowScript" : "@",
        
        "onDeleteRowScript" : "@",
        
        "transport" : "@", //"http" or "wss" or "publish"

        "enableClientSideFilter" : "<?",

        "rowModelType" : "@", // rowModelType can be set to "pagination" or "virtual" (infinite scrolling)

        "rowModelSelection" : "@", //"multiple" or "single"

        "rowDeselection" : "<?",
        
        "onSelectionChanged": "&?",
        
        "rowData" : "<?",
        
        "suppressFilter": "<?",
        
        "gridHeight" : "@",

        /** pagination properties **/
        "paginationPageSize" : "<?", // In virtual paging context means how big each page in our page cache will be, default is 100

        /** virtual paging properties **/
        "paginationOverflowSize" : "<?", // how many extra blank rows to display to the user at the end of the dataset, which sets the vertical scroll and then allows the grid to request viewing more rows of data. default is 1, ie show 1 row.

         /** virtual paging properties **/
        "maxConcurrentDatasourceRequests" : "<?", // how many server side requests to send at a time. if user is scrolling lots, then the requests are throttled down 

        /** virtual paging properties **/
        "paginationInitialRowCount" : "<?",// how many rows to initially show in the grid. having 1 shows a blank row, so it looks like the grid is loading from the users perspective (as we have a spinner in the first col)

         /** virtual paging properties **/
        "maxPagesInCache" : "<?", // how many pages to store in cache. default is undefined, which allows an infinite sized cache, pages are never purged. this should be set for large data to stop your browser from getting full of data
        "apiParams" : "<?",
        
        "onFormatData" : "&",
        
        "onCellValueChanged" : "&",
        
        "msgTag" : "@",
        
        "class" : "@",
          
        "defaultCellRenderer": "&",  
        
        "onGridReady" : "&"
      },

      templateUrl : '/UIComponents/dashboard/frontend/components/grid/grid.html',
      controller : function($scope, $window, $uibModal, $timeout, dataService) {

        var self = this;
        
        self.broadcastData = null;
        
        this.dataSource = {
          getRows : function(params) {
            if(self.broadcastData != null){
                if(self.broadcastData.api != null){
                  var api = self.broadcastData.api
                }else{
                  var api = self.api
                }
                if(self.broadcastData.params != null){
                    self.apiParams = self.broadcastData.params
                }
                if(self.broadcastData.transport != null){
                  var transport = self.broadcastData.transport
                }else{
                  var transport = self.transport
                }
              }else{
                var api = self.api;
                var apiParams = APIParams;
                var transport = self.transport;
              }
              var APIParams = self.buildParams(params)
              var tmp = null;
              if(typeof self.onFormatData() == "function"){
                  tmp = function(data){ 
                  return self.onFormatData()(data); // Or we can have it as self.onFormatData({"data":data}) and pass it in the on-format-update as: vm.callback(data)
                }
              }
              dataService.getGridData(api, APIParams, transport, tmp).then(
                function(data, response) {
                  if (data && data.documents) {
                    var rowsData = data.documents;
                    var count = parseInt(data.count);

                    params.successCallback(self.cleanRows(rowsData), count);
                    self.gridOptions.api.sizeColumnsToFit();

                    // if there's no rows to be shown, disbale the next button
                    if(rowsData == null || rowsData.length == 0){
                      var el = angular.element( document.querySelector( '#btNext' ) );
                      el.attr('disabled', 'true');
                    }
                  } else {
                    params.failCallback();
                    if(self.gridOptions.rowModelType == "virtual"){
                        self.gridOptions.api.showNoRowsOverlay();
                    }
                  }
                }, function(err) {
                  console.log("reject", err);
                });
          }
        }
        
        this.cleanRows = function(rows){
          if(!Array.isArray(rows)){
            rows = [rows];
          }
          var fieldExist = false;
          for(var i = 0; i < rows.length; i++){
            for(row in rows[i]){
              if(row != "key"){
                fieldExist = false;
                for (var n = 0; n < self.gridOptions.columnDefs.length; n++){
                  if(row == self.gridOptions.columnDefs[n].field){
                    fieldExist = true;
                    break;
                  }
                }
                if(!fieldExist){
                  delete rows[i][row];
                }
              }
            }
          }
          return rows;
        }
        
        // Get data from backend
        this._createNewDatasource = function() {
          this.gridOptions.api.setDatasource(this.dataSource);
        }
        
		// set a numeric filter model for each numerical column
        for(var i = 0; i < this.columnsDefinition.length; i++){
          if(this.columnsDefinition[i].hasOwnProperty("type") && this.columnsDefinition[i]["type"] == "numeric"){
            this.columnsDefinition[i].filter = "number";
          }
        }


        this.$onInit = function() {
          this.gridOptions = {
            angularCompileRows: true,
            enableSorting: (typeof this.enableClientSideSorting != 'undefined')? this.enableClientSideSorting : true,
            enableServerSideSorting : (typeof this.enableServerSideSorting != 'undefined')? this.enableServerSideSorting : true,
            enableServerSideFilter : (typeof this.enableServerSideFilter != 'undefined') ? this.enableServerSideFilter : true,
            enableColResize : (typeof this.enableColResize != 'undefined') ? this.enableColResize : false,
            enableFilter : (typeof this.enableFilter != 'undefined') ? this.enableFilter : true,
            columnDefs : this.columnsDefinition,
            editType : 'fullRow',    
            rowData: (this.rowData)? this.rowData : null,
            rowModelType :(this.rowModelType)? this.rowModelType : (this.rowData)? "" : "virtual",
            rowSelection : (this.rowModelSelection) ? this.rowModelSelection : "multiple",
            paginationPageSize : (this.paginationPageSize) ? this.paginationPageSize : 50,
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><i class="fa fa-spinner fa-spin fa-fw fa-2x"></i> Please wait while your rows are loading</span>',
            defaultColDef : {
              filterParams : {
                apply : true
              },
              suppressFilter: (typeof this.suppressFilter != 'undefined')? this.suppressFilter : false,
              editable : (typeof this.cellEditable != 'undefined')? this.cellEditable : true,
              cellRenderer : (typeof this.defaultCellRenderer() == 'function')? this.defaultCellRenderer() : null  
            },
            onSelectionChanged: function() {
              if(self.onSelectionChanged != null && typeof self.onSelectionChanged() == "function"){
              	 return self.onSelectionChanged()(self.gridOptions);
              }
            },
            onRowValueChanged : function(event) { // used for adding/editing a row 
           //    self.oldEditedValue = event.oldValue;
           //    self.editedColumn = event.colDef.field;
           //    self.editedChildIndex = event.node.childIndex || event.node.id;
               if(self.onCellValueChanged != null && typeof self.onCellValueChanged() == "function"){
                  self.onCellValueChanged()(self.gridOptions);
               }
               if(self.gridOptions.rowModelType == "pagination" || self.gridOptions.rowModelType == "virtual"){
                 if(self.api){
                   self._saveData(event);
                 }else{
                   self.undoChanges();
                   self.showAlert("danger", "No script defined for cell edit");
                 }
               }
            },
            onGridReady : function(event) {
              console.log('the grid is now ready');
              if(typeof self.onGridReady() == "function"){
             	 self.onGridReady()(self);
              }
              // set "Contains" in the column drop down filter to "StartWith" as it is not supported in document query 
              event.api.filterManager.availableFilters.text.CONTAINS = "startsWith";
              if(typeof self.rowData == 'undefined' || self.rowData == null || (self.rowData && self.rowData.length ==0)){
                 if(self.api){
             	 	self._createNewDatasource();
                 }else{
                   event.api.setRowData([]);
                 }
              }else{
                event.api.sizeColumnsToFit();
              }
            },
            onGridSizeChanged: function(event){
              self.gridOptions.api.sizeColumnsToFit();
            }

         };
         this.gridHeight = (this.gridHeight) ? this.gridHeight : "500";
         this.style = {};
         this.style["height"] = this.gridHeight+"px";
         this.style["clear"] = "left";
         this.style["width"] = "100%";
         this.transport = (this.transport) ? this.transport : "wss";
         this.enableDeleteRow =  (this.enableDeleteRow == true) ? false : true;
         this.enableAddRow =  (this.enableAddRow == true) ? false : true;
         this.enableClientSideFilter =  (this.enableClientSideFilter == true) ? false : true;
         this.enableServerSideFilter =  (this.enableServerSideFilter == true) ? false : true;
          
         if(self.msgTag){
           dataService.subscribe(this.onWebSocketCall, self.msgTag);
         }
          
         $scope.$on("updateGridData", function(event, broadcastData) {
            self.broadcastData = broadcastData;
		 	self._createNewDatasource();
        })
         
        }
        
        this.closeAlert = function() {
          this.show = false;
        };

        this.showAlert = function(type, content) {
           self.message = {
             "type" : type,
             "content" : content
           }
           self.showError = true;
           $timeout(function(){
             self.showError = false;
           }, 5000);
        }

        this._saveData = function(event){
          if(event.data && event.data.key){
            var params = event.data;
            params.action = "edit";
            dataService.gridHelper(self.api, params).then(
              function(data, response) {
                if (data && data.status == "success") {
                   self.showAlert("success", "Row(s) updated successfuly");
                } else {
                  self.undoChanges();
                  if(data && data.errorDetail){
                    self.showAlert("danger", data.errorDetail);
                  }else{
                    self.showAlert("danger", "An error has occured");
                  }
                }
              },
              function(err) {
                console.log("reject", err);
                self.showAlert("danger", "An error has occured");
              });
          }else{
            var params = event.data;
            params.action = "add";
            dataService.gridHelper(self.api, event.data).then(
               function(data, response) {
                if (data && data.status == "success") {
				  self.showAlert("success", "Row(s) Added successfuly");
                } else {
                  self.undoChanges();
                  if(data && data.errorDetail){
                    self.showAlert("danger", data.errorDetail);
                  }else{
                    self.showAlert("danger", "An error has occured");
                  }
                }
              },
              function(err) {
                console.log("reject", err);
                self.showAlert("danger", "An error has occured");
              });
          }
        }

        this.onAddRow = function(){
           var newRow = {};
          
          // Create a json object to save new row fields 
           for (var n = 0; n < self.gridOptions.columnDefs.length; n++){
              newRow[self.gridOptions.columnDefs[n].field] = "";
           }

           self.gridOptions.api.insertItemsAtIndex(0, [newRow]);
           self.gridOptions.api.setFocusedCell(0, self.gridOptions.columnDefs[0].field);

           self.gridOptions.api.startEditingCell({
              rowIndex: 0,
              colKey: self.gridOptions.columnDefs[0].field,
              charPress: self.gridOptions.columnDefs[0].field
          });
        }
        
        
       this.openConfirmationPopUp = function(){
           var modalInstance = $uibModal.open({
               controller: 'PopupCont',
               templateUrl: '/UIComponents/dashboard/frontend/components/grid/popup.html',
               resolve: {
                   grid: function () {
                       return self;
                   }
               }
           });
       } 
        
        this.onRemoveRow = function(key) {
          if(self.gridOptions.rowModelType == "pagination" || self.gridOptions.rowModelType == "virtual"){
            if(self.api){
              var selectedNodes = self.gridOptions.api.getSelectedNodes();
              var selectedKeys = [];
              for(var i = 0; i < selectedNodes.length; i++){
                selectedKeys.push(selectedNodes[i].data.key);
              }
              if(selectedKeys.length > 0){
                dataService.gridHelper(self.api, {keys : selectedKeys, action: "delete"}).then(
                  function(data, response) {
                    if (data && data.status == "success") {
                      var selectedNodes = self.gridOptions.api.getSelectedNodes();
                      self.gridOptions.api.removeItems(selectedNodes);
                      self.showAlert("success", "Row(s) deleted successfuly");
                    } else {
                      if(data && data.errorDetail){
                        self.showAlert("danger", data.errorDetail);
                      }else{
                        self.showAlert("danger", "An error has occured");
                      }
                    }
                  },
                  function(err) {
                    console.log("reject", err);
                    self.showAlert("danger", "An error has occured");
                  });
              }
            }else{
 				self.showAlert("danger", "No script defined for delete row");
            }
          }else{
            var selectedNodes = self.gridOptions.api.getSelectedNodes();
            self.gridOptions.api.removeItems(selectedNodes);
          }
        }
        
        
        this.onWebSocketCall = function(data){
          if(data && data.action){
              if(data.action == "add"){
                  var rows = data.result;
                  for(var i = 0; i < rows.length; i++){  
                      var newRow = {};
                      // Create a json object to save new row fields 
                      for (var n = 0; n < self.gridOptions.columnDefs.length; n++){
                          for(row in rows[i]){
                              if(typeof self.gridOptions.columnDefs[n].field != "undefined"){
                                  if(self.gridOptions.columnDefs[n].field == row){
                                      newRow[self.gridOptions.columnDefs[n].field] = rows[i][row];
                                      break;
                                  }else{
                                      newRow[self.gridOptions.columnDefs[n].field] = "";
                                  }
                              }
                          }
                      }
                      var firstRow = self.gridOptions.api.getRenderedNodes()[0];
                      if(!firstRow.data.key){
                          firstRow.data.key = rows[i].key;
                      }else{
                          newRow["key"] = rows[i].key;
                          self.gridOptions.api.insertItemsAtIndex(0, [newRow]);
                      }
                  }
              }else if(data.action == "edit"){
              // Searches for the edited row and updates it
                if(self.gridOptions.rowModelType == "pagination"){
                    var rows = data.result;  
                    for(var x = 0; x < rows.length; x++){  
                        var rowKey = rows[x].key;
                        self.gridOptions.api.forEachNode(function(node) {
                            if (node.data.key == rowKey) {
                                var index = node.childIndex;
                                var model = self.gridOptions.api.getModel();
                                var node = [ model.getRow(index) ][0];
                                node.data = self.cleanRows(rows[x])[0];
                                node.data.key = rowKey;
                                self.gridOptions.api.refreshView();
                            }
                        });
                        var firstRow = self.gridOptions.api.getRenderedNodes()[0];
                        if(!firstRow.data.key){
                            firstRow.data.key = rowKey;
                        }
                    }
                }else{
                self.gridOptions.api.refreshVirtualPageCache();
              }
            }else if(data.action == "delete"){
              var keys = data.result;
              if(self.gridOptions.rowModelType == "pagination"){ 
                for(var i = 0; i < keys.length; i++){ 
                  self.gridOptions.api.forEachNode(function(node) {
                    if (node.data.key == keys[i]) {
                      var index = node.childIndex;
                      var model = self.gridOptions.api.getModel();
                      var node = [ model.getRow(index) ];
                      self.gridOptions.api.removeItems(node);
                    }
                  });
                }
              }else{
                self.gridOptions.api.refreshVirtualPageCache();
              }
            }
          }else{
            if(data && data.errorDetail){
              self.showAlert("danger", data.errorDetail);
            }else{
              self.showAlert("danger", "An error has occured");
            }
          }
        }
        
        this.undoChanges = function(data){
          if(self.oldEditedValue){ // undo field rename
            self.gridOptions.api.forEachNode(function(node) {
              if (node.childIndex == self.editedChildIndex || node.id == self.editedChildIndex) {
                node.setSelected(true, true);
              }
            });
            var selectedNode = self.gridOptions.api.getSelectedNodes()[0];
            selectedNode.data[self.editedColumn] = self.oldEditedValue;
            self.gridOptions.api.refreshView();
          }else{ // undo insert row
            self.gridOptions.api.forEachNode(function(node) {
              if(self.gridOptions.rowModelType == "pagination"){
                if (node.childIndex == 0) {
                  node.setSelected(true, true);
                  var selectedNode = self.gridOptions.api.getSelectedNodes();
                  self.gridOptions.api.removeItems(selectedNode);
                }
              }else{
                self.gridOptions.api.refreshVirtualPageCache();
              }
            });
          }
        }
        
        this.onFilterChanged = function() {
          this.gridOptions.enableServerSideFilter = false;
          this.gridOptions.api.setQuickFilter(this.quickFilterValue);
          this.gridOptions.enableServerSideFilter = true;
        }

        this.buildParams = function(params) {
          var queryFilter = this.gridOptions.quickFilterText;
          var columnName = null;
          var type = null;
          var pageNumber = params.endRow / this.gridOptions.paginationPageSize;
          if (params.sortModel && params.sortModel.length > 0) {
            var sort = params.sortModel[0].sort;
            var sortingColumnName = params.sortModel[0].colId;
            type = (this.gridOptions.api.getColumnDef(sortingColumnName).type) ? this.gridOptions.api.getColumnDef(sortingColumnName).type : null;
          }
          if (params.filterModel) {
            for (p in params.filterModel) {
              queryFilter = params.filterModel[p].filter;
              var queryType = params.filterModel[p].type;
              var filterColumnName = p;
              type = (this.gridOptions.api
                      .getColumnDef(filterColumnName).type) ? this.gridOptions.api
                .getColumnDef(filterColumnName).type
              : null;
            }
          }
          var APIParams = {
            "resultsPerPage" : this.gridOptions.paginationPageSize,
            "pageNumber" : pageNumber
          }
          if (sortingColumnName) {
            APIParams["sortingColumnName"] = sortingColumnName;
          }
          if (filterColumnName) {
            APIParams["filterColumnName"] = filterColumnName;
          }
          if (sort) {
            APIParams["sort"] = sort;
          }
          if (type) {
            APIParams["sortType"] = type;
          }
          if (queryFilter) {
            APIParams["queryFilter"] = queryFilter;
          }
          if (queryType) {
            APIParams["queryType"] = queryType;
          }
          APIParams["startRow"] = params.startRow;
          APIParams["endRow"] = params.endRow;
          if(this.apiParams){
            for(var param in this.apiParams){
                 APIParams[param] = this.apiParams[param];
            }
          }
          return APIParams;
        }
        
      }
    });

  angular
    .module('Grid')
    .service("dataService", function(httpClient, wsClient, $q) {
      
      this.subscribe = function(callback, tag){
        wsClient.onReady.then(function() {
          wsClient.subscribe(tag, callback.bind(self));
        });
      }
    
      this.gridHelper = function(api, params){
        var d = $q.defer(); 
        wsClient
          .call(api, params, "grid").then(function(data, response){
          d.resolve(data, response)
        }, function(err) {
          d.reject(err)
        });
        return d.promise;
      }
      
      
      this.getGridData = function(api, params, transport, formatterFnc) {
        
        var d = $q.defer(); 
        var self = this;
        if(transport == "https"){
          httpClient
            .get(api, params).then(function(data, response){
              if(formatterFnc /**Check if function also*/){
                data = formatterFnc(data);
              }
              if(data && data.documents && data.documents.length != 0){
                var data = {"documents": data.documents, "count": data.count}
                d.resolve(data, response)
              }else{
                d.resolve(null, response)
              }
          }, function(err) {
            d.resolve(null);
            d.reject(err);
          });
          return d.promise;
       } else if(transport == "wss"){
             if(api && typeof api != 'undefined'){
                wsClient.onReady.then(function() {
                  wsClient
                    .call(api, params, "grid").then(function(data, response) {
                     if(formatterFnc /**Check if function also*/){
                        data = formatterFnc(data);
                      }
                      if(data && data.documents && data.documents.length != 0){
                          var data = {"documents": data.documents, "count": data.count}
                          d.resolve(data, response)
                      }else{
                          d.resolve(null, response)
                      }
                    }, function(err) {
                      d.resolve(null);
                      d.reject(err);
                    }
                  ); 
                }); 
                return d.promise;
             }else{
                wsClient.onReady.then(function() {
                wsClient.publish(params, "publish").then(function(data, response) {
                  if(data && data.documents && data.documents.length != 0){
                    var data = {"documents": data.documents, "count": data.count}
                    d.resolve(data, response)
                  }else{
                    d.resolve(null, response);
                  }
                }, function(err) {
                    d.resolve(null);
                    d.reject(err);
                  }
                );
              }); 
              return d.promise;
          }
      }
    }
      
});


angular.module('Grid').controller('PopupCont', ['$scope','$uibModalInstance',function ($scope, $uibModalInstance) {
            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };
             $scope.onRemoveRow = function () {
                console.log("deleting..");
                this.$resolve.grid.onRemoveRow();
                $uibModalInstance.dismiss('cancel'); 
            };
            
            
        }]);




