agGrid.initialiseAgGridWithAngular1(angular);
angular.module("myGrid",[]).controller("exampleCtrl",["$scope","$http" , function($scope,  $http) {
   var columnDefs = [
        {headerName: "Make", field: "name"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price", type: "numeric"}
    ];
   var resultsPerPage = 2;
  
   $scope.gridOptions = {
    enableServerSideSorting: true,
    enableColResize: true,
    paginationPageSize: resultsPerPage,
    enableFilter: true,
    columnDefs: columnDefs,
    defaultColDef: {
       editable: true,
    },
    rowModelType: 'pagination',
    rowSelection: 'multiple',
    onCellValueChanged: function(event) {
      callAPI("updateCar", null, null, event);
    },
    onGridReady: function(event) {
      createNewDatasource();
    }
   };
  
  function createNewDatasource() {
    var dataSource = {
      getRows: function (params) {
        var pageNumber = params.endRow / resultsPerPage;
        if(params.sortModel.length > 0){
          var sort = params.sortModel[0].sort;
          var sortByColId = params.sortModel[0].colId;
          var type = ($scope.gridOptions.api.getColumnDef(sortByColId).type)? $scope.gridOptions.api.getColumnDef(sortByColId).type : null;
        }
        callAPI("getCars", params, {"resultsPerPage": resultsPerPage, "pageNumber": pageNumber, "columnName" : sortByColId, "sort": sort, "type": type});
      }
    };
    $scope.gridOptions.api.setDatasource(dataSource);
  }

   function callAPI(api, params, APIParams, event){
    var url = "./api/"+api+"?";
    for(param in APIParams){
      url += param+"="+APIParams[param]+"&";
    }
    $http({
      method : "GET",
      url : url,
      params: (event && event.data) ? event.data : {}
    }).then(function mySucces(response) {
        if(response.data.response.result.result && response.data.response.result.result.count){
          var rowsData = response.data.response.result.result.documents;
          var count = parseInt(response.data.response.result.result.count);
          params.successCallback(rowsData, count);
        }else{
          console.log("Document updated");
        }
    }, function myError(response) {
      $scope.myData = response.statusText;
    });
  }
  
  var newCount = 1;
  
  function createNewRowData() {
      var newData = {
          name: "Toyota " + newCount,
          model: "Celica " + newCount,
          price: 35000 + (newCount * 17),
          zombies: 'Headless',
          style: 'Little',
          clothes: 'Airbag'
      };
      newCount++;
      return newData;
  }
  $scope.addItems = function() {
    var newItems = [createNewRowData()];
    $scope.gridOptions.api.addItems(newItems);
  }

  function onInsertRowAt2() {
      var newItem = createNewRowData();
      gridOptions.api.insertItemsAtIndex(2, [newItem]);
  }

  function onRemoveSelected() {
      var selectedNodes = gridOptions.api.getSelectedNodes();
      gridOptions.api.removeItems(selectedNodes);
  }

}]);