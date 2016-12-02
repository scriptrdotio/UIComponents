angular
  .module("Grid")
  .component(
  'scriptrGrid',
  {
    bindings : {
      
      "onLoad": "&onLoad",
      
      "columnsDefinition" : "<columnsDefinition",
      
      "enableServerSideSorting" : "<?", // Note that Client side sorting & filtering does not make sense in virtual paging and is just not supported, only Server side sorting & filtering is supported
      
      "enableServerSideFilter" : "<?",
      
      "enableColResize" : "<?",
      
      "enableFilter" : "<?",
      
      "rowModelType": "<?", // rowModelType can be set to "pagination" or "virtual" (infinite scrolling)
      
      "rowModelSelection": "<?", //"multiple" or "single"
      
      "rowDeselection": "<?",
      
      /** pagination properties **/
      "paginationPageSize": "<?", // In virtual paging context means how big each page in our page cache will be, default is 100
      
      /** virtual paging properties **/
      "enableServerSideFilter": "<?", 
      
      /** virtual paging properties **/
      "paginationOverflowSize": "<?", // how many extra blank rows to display to the user at the end of the dataset, which sets the vertical scroll and then allows the grid to request viewing more rows of data. default is 1, ie show 1 row.
      
       /** virtual paging properties **/
      "maxConcurrentDatasourceRequests": "<?", // how many server side requests to send at a time. if user is scrolling lots, then the requests are throttled down 
       
      /** virtual paging properties **/
      "paginationInitialRowCount" : "<?",// how many rows to initially show in the grid. having 1 shows a blank row, so it looks like the grid is loading from the users perspective (as we have a spinner in the first col)
      
       /** virtual paging properties **/
      "maxPagesInCache" : "<?", // how many pages to store in cache. default is undefined, which allows an infinite sized cache, pages are never purged. this should be set for large data to stop your browser from getting full of data
    },
    
    templateUrl : '/UIComponents/dashboard/frontend/components/grid/grid.html',
    controller : function($scope, dataService) {
      
      var self = this;
      
      this.gridOptions = {};
      
      this.dataSource = {
        getRows : function(params) {
          var APIParams = self.buildParams(params)
          var dataResponse = dataService.getGridData(APIParams).then(
          function(data, response) {
            if (data && data.documents && data.count) {
              var rowsData = data.documents;
              var count = parseInt(data.count);
              params.successCallback(rowsData, count);
            } else {
              params.failCallback();
            }
          }, function(err) {
            console.log("reject", err);
          });
        }
      }
     
     
      
      this.$onInit = function() {
        this.gridOptions = {
          enableServerSideSorting : (this.enableServerSideSorting)? this.enableServerSideSorting : true,
          enableServerSideFilter : (this.enableServerSideFilter) ? this.enableServerSideFilter : true,
          enableColResize : (this.enableColResize) ? this.enableColResize : true,
          enableFilter : (this.enableFilter) ? this.enableFilter : true,
          columnDefs : this.columnsDefinition,
          rowModelType :(this.rowModelType)? this.rowModelType : "pagination",
          rowSelection : (this.rowModelSelection) ? this.rowModelSelection : "multiple",
          paginationPageSize : (this.paginationPageSize) ? this.paginationPageSize : 50,
          defaultColDef : {
            filterParams : {
              apply : true
            },
            editable : true
          },
          onCellValueChanged : function(event) {
             callAPI("setCarsInfo", null, null, event);
          },
          onGridReady : function(event) {
            console.log('the grid is now ready');
            self._createNewDatasource();
          },
          
        };
      }

      // Get data from backend
      this._createNewDatasource = function() {
        this.gridOptions.api.setDatasource(this.dataSource);
      }
      
      // add a specific row upon WebSocket call
      function addItemsWebSocketCall(rowData) {
        this.gridOptions.api.addItems(rowData);
      }
      // remove a specific row upon WebSocket call
      function onRemoveRowWebSocketCall(key) {
        this.gridOptions.api.forEachNode(function(node) {
          if (node.data.key == key) {
            var index = node.id;
            var model = this.gridOptions.api.getModel();
            var node = [ model.getRow(index) ];
            this.gridOptions.api.removeItems(node);
          }
        })
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
        if (params.sortModel.length > 0) {
          var sort = params.sortModel[0].sort;
          var sortingColumnName = params.sortModel[0].colId;
          type = (this.gridOptions.api
                  .getColumnDef(sortingColumnName).type) ? this.gridOptions.api
            .getColumnDef(sortingColumnName).type
          : null;
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
        return APIParams;
      }
    }
  });
