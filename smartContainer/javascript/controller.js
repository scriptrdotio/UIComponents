myApp.controller('menuCtrl', function($scope, $timeout, httpClient, headerItemsJson, menuItemsJson, $window, $location, mapConstants) {
    var vm = this;

    var gagesProperties = "[\"fuelRate\",\"coolantTemperature\",\"speed\",\"voltage\",\"rssi\",\"snr\"]";

    vm.headerItems = headerItemsJson;
    vm.user = (atob(document.cookie.split("=")[1]).split(":")[1])
    vm.menuItems = menuItemsJson;

    vm.selectedItem = function(selected){
        vm.selectedObjectKey = selected.originalObject.key;
        vm.selectedObjectId = selected.originalObject.id;
        $scope.$broadcast('mapFoucsOnMarker', selected.originalObject.key);
        vm.updateAllData(selected.originalObject.id);
    }

    vm.startDateOnSetTime = function(date){
        vm.startDate = date.toString();
        if(vm.startDate != null && vm.endtDate != null){
            var params = {
                vehicleId: vm.vehicleId,
                properties: gagesProperties,
                timeframe: "{\"start\": \""+vm.startDate+"\",\"end\":  \""+vm.endDate+"\"}"
            }
            vm.getData(params);
        }
    }
    vm.endDateOnSetTime = function(date){
        vm.endDate = date.toString();
        if(vm.startDate != null && vm.endDate != null){
            var params = {
                vehicleId: vm.vehicleId,
                properties: gagesProperties,
                timeframe: "{\"start\": \""+vm.startDate+"\",\"end\":  \""+vm.endDate+"\"}"
            }
            vm.getData(params);
        }
    }

    vm.sources = mapConstants.sources;
    vm.icons = mapConstants.infoWindows.icons;

    vm.showAssetDashboard = function(id) {
        vm.showDashboard = true;  
        $timeout(function() {
                 $scope.$broadcast('menu:openMenuBasedOnRoute', null);  
               }, 1000)
        
    //    vm.updateAllData(id);
    }
    
    vm.logsColDef = [
        {headerName: "Timestamp", field: "timestamp"},
        {headerName: "State", field: "state", cellRenderer: function (params) {  
            return vm.stateCellRenderer(params);
        }},
        {headerName: "By", field: "by", cellRenderer: function (params) {  
            return vm.byCellRenderer(params);
        }},
       {headerName: "Tampered with", field: "tampered", cellRenderer: function (params) {  
            return vm.tamperedCellRenderer(params);
        }}
    ] 
    
    vm.stateCellRenderer = function(param){
        if(param.value.value == true){
            return vm.icons.idLOCKED
        }else{
            return vm.icons.idUNLOCKED
        }
    }
    
      vm.byCellRenderer = function(param){
            return '<span>' + param.value.value+ '</span>'
    } 
      
    vm.tamperedCellRenderer = function(param){
        if(param.value.value == true){
            return vm.icons.idTAMPERED
        }else{
            return vm.icons.idUNTAMPERED
        }
    }  
    
    vm.logsFormatData = function(data){
        if(data && vm.selectedObjectId){
          var lock = data[vm.selectedObjectId]["0"];;
          return {documents: lock, count: lock.length}  
        }
    }

    vm.onSelectAsset = function(data){
        vm.selectedObject = data;
        $scope.$broadcast('angucomplete-alt:changeInput', "mapList", data);
    }

    vm.updateAllData = function(id){
        vm.vehicleId = id;
        vm.getData({lockId: vm.vehicleId});
        vm.gridParams = {"id": vm.vehicleId};
        $scope.$broadcast('updateGridData', {params: vm.gridParams});
    }

    vm.onHeaderItemClick = function(item){
        if(item.label == "Components"){
            $window.open('/Components/html/index.html', '_blank');
        }
    }

    vm.onMenuItemClick = function(){
        vm.showDashboard = false; 
        if(vm.selectedObjectKey){
            $scope.$broadcast('mapFoucsOnMarker', vm.selectedObjectKey);
        } 
    }

    vm.getData = function(params){
        httpClient
            .get("locks/api/getBatteryData", params)
            .then(
            function(data, response) {
                if(data){
                    vm.batteryChart = data;
                }

            },
            function(err) {
                console
                    .log(
                    "reject published promise",
                    err);
            });
    }

    vm.listCallback = function(data){
        vm.tripsData = [
            {
                "key" : "all",
                "name" : "All"
            }
        ];
        var assets = data;
        for (var key in assets) {
            if (assets.hasOwnProperty(key)) {
                console.log(key, assets[key]);
                vm.pushAssets(key, assets[key])
            }
        }
        return vm.tripsData;
    }
    vm.pushAssets = function(assetId, trips) {

        var assetSource = trips.source;
        var key = assetSource + "_" + assetId;

        var assetModel = null;
        var assetMake = null;

        //Asset Trips
        var tripsOrder = trips.order;

        // Loop on asset trips
        for (var t = tripsOrder.length - 1; t >= 0; t--) {
            var tripKey = tripsOrder[t];
            if (trips.hasOwnProperty(tripKey)) {
                var trip = trips[tripKey];

                // Loop on trips points
                for (var i = trip.length - 1; i >= 0; i--) {
                    var tripPoint = trip[i];

                    var tripMarker = {};

                    tripMarker.tripKey = tripKey;

                    tripMarker.details = tripPoint;

                    assetModel = (tripMarker.details && tripMarker.details.model) ? tripMarker.details.model.value : "";
                    assetMake = (tripMarker.details && tripMarker.details.make) ? tripMarker.details.make.value : "";
                    tripMarker.label = vm.buildAssetLabel(assetMake, assetModel, assetId);


                } //End looping on asset's trip's points
            }// End check for Availble tripKey in trips
        }//End looping on asset's trips
        vm.addAssetToSourceList(assetSource, assetId, key, tripMarker.label);
    };

    vm.addAssetToSourceList = function(assetSource, assetId, assetKey, label) {

        vm.tripsData.push({
            "key" : assetKey,
            "name" : label,
            "id" : assetId
        });

    };

    vm.buildAssetLabel = function(make, model, assetId) {
        var assetLabel = (make) ? (make + " ") : "";
        assetLabel += (model) ? (model + "-") : "";
        assetLabel += assetId;
        return assetLabel;
    }

    /* *********************** Tickets *************************/

    vm.myCellRenderer  = function(params){
        return '<div><a target="_blank" href="https://support.zoho.com'+params.value+'">https://support.zoho.com'+params.value+'</a></div>'
    }

    vm.colDef = [
        {headerName: "Id", field: "id", editable : false},
        {headerName: "Subject", field: "subject", editable : false},
        {headerName: "Status", field: "status", cellEditor: "select",
         cellEditorParams: {
             values: ["On hold", "Open", "Escalated", "Closed"]
         }},
        {headerName: "Creation Date", field: "creationDate", editable : false},
        {headerName: "URI", field: "uri", editable : false, cellRenderer: function (params) {  
            return vm.myCellRenderer(params);
        }
        }]

    vm.ticketsCallback = function(data){
        var ticketsData = [];
        var rows = [];
        try{
            rows = JSON.parse(data).response.result.Cases.row;
            for(var i = 0 ; i < rows.length; i++){
                var row =   JSON.parse(data).response.result.Cases.row[i].fl;
                var ticketData = {}
                for(var k = 0; k < row.length;k++){
                    var content = row[k].content;
                    switch(row[k].val){
                        case "Subject":
                            ticketData["subject"]  = content;
                            break;
                        case "URI":
                            ticketData["uri"]  = content;
                            break;
                        case "Ticket Id":
                            ticketData["id"] = content;
                            break;
                        case "Status":
                            ticketData["status"] = content;
                            break;
                        case "Created Time":
                            ticketData["creationDate"] = content;
                            break;
                        case "Contact Name":
                            ticketData["contactName"] = content;
                            break;
                        case "CASEID":
                            ticketData["caseId"] = content;
                            break;
                    }
                }
                ticketsData.push(ticketData);
            }
            return {"documents" : ticketsData , count: ticketsData.length}
        }catch(e){
            console.log(e);
        }
    }
});

myApp.controller('NotificationCtrl', function($scope, httpClient, headerItemsJson, menuItemsJson) {
    var vm = this;
    vm.headerItems = headerItemsJson;
    vm.user = (atob(document.cookie.split("=")[1]).split(":")[1])
    vm.menuItems = menuItemsJson;
    vm.params = {} 

    httpClient
        .get("nucleo/api/getNotificationsSettings", null)
        .then(
        function(data, response) {
            if(data && (data.emails || data.mobiles)){
                var emailsArray = JSON.parse(data.emails);
                var mobilesArray = JSON.parse(data.mobiles);
                if(typeof emailsArray == "string") emailsArray = [emailsArray];
                if(typeof mobilesArray == "string") mobilesArray = [mobilesArray];
                vm.emails= emailsArray;
                vm.mobiles = mobilesArray;
            }else{
                vm.emails = [];
                vm.mobiles = [];
            }
            console.log('SUCCESS');
        },
        function(err) {
            console.log('ERROR');
        });

    vm.buildParams = function(){
        var emailsArray = [];
        var mobilesArray = [];
        for(var i = 0; i < vm.emails.length; i++){
            emailsArray.push(vm.emails[i]["text"]);
        }
        for(var i = 0; i < vm.mobiles.length; i++){
            mobilesArray.push(vm.mobiles[i]["text"]);
        }
        vm.params["emails"] = emailsArray;
        vm.params["mobiles"] = mobilesArray;
    } 

});
