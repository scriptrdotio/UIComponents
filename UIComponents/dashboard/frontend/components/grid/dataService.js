angular.module('Grid').service(
  "dataService",
  function(httpClient, $q) {

    this.getGridData = function(params) {
      var d = $q.defer(); 
      httpClient
        .get("UIComponents/userManagement/backend/api/devices/listDevices", params).then(function(data, response){
        var data = {"documents": data, "count": data.length}
        d.resolve(data, response)
      }, function(err) {
        d.reject(err)
      });
      return d.promise;
    }
});