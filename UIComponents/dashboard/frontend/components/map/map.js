myApp.controller("MainMapCtrl", function($scope, $rootElement, WS, $location, $sce, $compile, $timeout, $interval, $controller, NgMap, mapConstants) {
  angular.extend(this, $controller('ScriptrRTController', {$scope: $scope}));
  
  var vm = this;
  var markerClusterer = null;
  var pathStrokeOpacity = 0;
  var pathStrokeWeight = 5;
  var max_asset_points = 500; //Number of tracked positions per asset per map instance
  
  vm.sources = {}; //"Stream", "Simulator"
  vm.assets = {};
  vm._hiddenAssets = {};
  vm.selectedAsset = "all";
  vm.marker = {}; //contains data used in info window on click of a map marker
  vm.assetsKeys = [];
  vm.mapcenter = null;
  vm.defaultcenter = "40.7053111,-74.258188";
  vm.clusteredmapzoom = 3;
  vm.detailedmapzoom = 12
  vm.infoWindow = null;
  vm.dynMarkers = [];
  vm.trackedAsset = $location.search()["vehicleId"]; 
  
  
  //If a specific map is tracked do not use clustering
  vm.draw= (!vm.trackedAsset) ? false : true;
  
  //Load SVG Icons from constants
  vm.infoWd = {"icons": {}};
  vm.sourcesLabels = mapConstants.sourcesLabels
  angular.forEach(mapConstants.infoWindows.icons, function(value, key) {
    vm.infoWd.icons[key] = $sce.trustAsHtml(value);
  });
  
  //On load, get latest 500 data points saved in db
  vm.init = function() {
    $scope.invoke("telematics/api/getLatestTrips", {
      "timeframe": "this_1_years",  //timeframe: "{end: .toIsoString(),start: .toIsoString()}"
      "limit": "100"
    }, "main-map");
    $scope.invoke("telematics/api/stream/getLatestTrips", {
      "timeframe": "this_1_years",  //timeframe: "{end: .toIsoString(),start: .toIsoString()}"
      "limit": "100"
    }, "main-map");
  };
  
  //Load asset Icons per source
  var sourcesAssetIcons = mapConstants.sourceAssetIcon;
  
  //Handle data when received over socket connection
  $scope.handleData = function(widgetId, data) {
    var asset = ""
    if(widgetId == "map") {
      console.log("socket data: ", data.result);
      var assets = data.result;
      var callBack = function(assets) {
        //Loop on assets
        for (var key in assets) {
          if (assets.hasOwnProperty(key)) {
            if(!vm.trackedAsset || vm.trackedAsset == key) {
              vm.pushAssets(key, assets[key])
            }
          }
        }
        vm.renderAssets();
        vm.renderClusterer();
      };
      if(!markerClusterer && !vm.trackedAsset) {
        NgMap.getMap({id:'clustered'}).then(function(map) {
          if(!markerClusterer) {
            markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {maxZoom: 12, imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m', minimumClusterSize: -1, gridSize: 50, averageCenter: true});
          }
          callBack(assets);
        });
      } else {
        callBack(assets)
      }
      //Added this timer to start rendering
      console.log("Assets ", vm.assets)
      console.log("Assets per sources ", vm.sources)
    }
    if(widgetId == "live") {
      console.log("socket live data: ", data);
      var assets = data.result;
      var callback = function(assets) {
        //Loop on single asset
          for (var key in assets) {
            if (assets.hasOwnProperty(key)) {
              if(!vm.trackedAsset || vm.trackedAsset == key) {
                vm.pushPoint(key, assets[key]);
              }
            }
          }
          vm.renderAssets();
          vm.renderClusterer();
      }
      if(!markerClusterer  && !vm.trackedAsset) {
        NgMap.getMap({id:'clustered'}).then(function(map) {
          if(!markerClusterer) {
            markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {maxZoom: 12, imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m', minimumClusterSize: -1, gridSize: 50, averageCenter: true});
          }
          callback(assets);
        });
      } else {
        //Loop on single
        callback(assets);
      }
    }
  };
  
  //Render assets
  vm.renderAssets = function() {
    console.log("Render New Assets.")
    if(vm.selectedAsset == "all") {
      vm.showAllAssets();
    } else { //Remove displaying single asset on select
      vm.displayedAssets = {};
      vm.displayedAssets[vm.selectedAsset] = vm.assets[vm.selectedAsset];
    }
    
  };
  
  vm.renderClusterer = function() {
    if(!vm.trackedAsset) {
      console.log("Render clusterer.")
      markerClusterer.resetViewport(true);
      markerClusterer.clearMarkers();
      markerClusterer.addMarkers(vm.dynMarkers, false);
      markerClusterer.repaint();
    }
  };
  
  //Show all assets
  vm.showAllAssets = function() {
    vm.displayedAssets = angular.copy(vm.assets, {})
  };
  
  //Change map on zoom threshold
  vm.onClusteredZoomChanged = function() {
    if(!vm.trackedAsset) {
      NgMap.getMap({id:'clustered'}).then(function(map) {
        if( map.getZoom() > 12 ){
          vm.draw = true;
          vm.mapcenter = map.getCenter();
          vm.detaileddmapzoom= 12;
        } else {
          vm.draw = false;
          rerenderAllAssets();
        }
      });
    }
  }
  
  //Change map on zoom threshold
  vm.onDetailedZoomChanged = function() {
    if(!vm.trackedAsset) {
      NgMap.getMap({id:'detailed'}).then(function(map) {
        if( map.getZoom() <= 11 ){
          vm.draw = false;
          vm.clusteredmapzoom= 11;
          rerenderAllAssets();
        } else {
          vm.draw = true;
        }
      });
    }
  };
  
  // Add an asset marker point to map
  // Example of pushed of asset trips: {"tripId":[{"lat":"51.650359051036","long":"-0.055656842290684",....},
  // "source":{"value":"stream"}}],"source":"stream","order":["0"]}
  vm.pushPoint = function(assetId, trips) {
    var assetSource = trips.source;
    var key = assetSource +"_"+assetId;
    
    var prevLatestMarker = null;
    if(vm.assets[key]) {
      var markers =  vm.assets[key]["markers"];
      prevLatestMarker = markers[markers.length - 1];
    } else {
      instantiateAsset(key);
    }
    
    var assetModel = null;
    var assetMake = null;
    
    //Asset trip Key
    var tripKey = trips.order[0]; 
    var tripPoint = trips[tripKey][0];
    var newMarker = {"position": (""+ tripPoint.lat +"," + tripPoint.long)};
    
    newMarker.title = "Source" +": " + assetSource + ", Asset" +": " + assetId + ", trip: " +tripKey + ".";
    newMarker.source = assetSource;
    newMarker.plate = assetId;
    newMarker.assetKey = key; //Source+plate
    newMarker.tripKey = tripKey;
    newMarker.details = tripPoint;
    
    assetModel = (newMarker.details && newMarker.details.model) ? newMarker.details.model.value : "";
    assetMake = (newMarker.details && newMarker.details.make) ? newMarker.details.make.value : "";
    newMarker.label = buildAssetLabel(assetMake, assetModel, assetId);
    
	//New point should be the latest asset marker on map
    newMarker.icon = sourcesAssetIcons[assetSource];
    
    if(prevLatestMarker && tripKey == prevLatestMarker.tripKey) {
      newMarker.id =  key + "-" + tripKey + "-" +  ((prevLatestMarker.pointRef)+1);
      newMarker.pointRef = ((prevLatestMarker.pointRef)+1);
      newMarker.strokeColor = prevLatestMarker.strokeColor;
      newMarker.fillColor = prevLatestMarker.fillColor;
      //Change previous Marker icon
      vm.assets[key]["markers"][markers.length - 1].icon = buildTripIcon(6, 0.8, 0.8, prevLatestMarker.strokeColor, prevLatestMarker.fillColor);
    } else { //It is a new trip, assuming a new key
      newMarker.id = key + "-" + tripKey + "-" +  0;
      newMarker.pointRef = 0;
      newMarker.strokeColor = generateHexColor();
      newMarker.fillColor = generateHexColor();
      if(prevLatestMarker) {
        vm.assets[key]["markers"][markers.length - 1].icon = buildTripIcon(10, 1, 1, prevLatestMarker.strokeColor, prevLatestMarker.fillColor);  
      }
    }
    
    vm.assets[key]["latestMarker"] = newMarker;
    
    addAssetToSourceList(assetSource, key, newMarker.label);
    controlVehicleTrips(key);
   	addMarkerToMap(key, newMarker, tripPoint);
  };
  
  //Push an array of sources with asssets with multiple marker points to map
  //Data format of asset trips: {"tripId":[{"lat":"40.792300000000004","long":"-73.95045",...},{}],
  //"tripId2":[{},{}], "source":"simulator","order":[tripId1, tripId2]}
  vm.pushAssets= function(assetId, trips) {
    var assetSource = trips.source
    var key = assetSource +"_"+assetId;
    //console.log("asset: " + key + " -> " + assets[key]);
    if(!vm.assets[key]) {
      instantiateAsset(key);
    } 
    //Asset Trips
    var tripsOrder = trips.order;
    var assetModel = null;
    var assetMake = null;
    //Loop on asset trips
    for(var t=tripsOrder.length - 1;   t >= 0; t--) {
      var tripKey = tripsOrder[t];
      if (trips.hasOwnProperty(tripKey)) {
        var trip = trips[tripKey];
        vm.assets[key]["pathColor"] = generateHexColor();
        //Define trip points icons Colors
        var tripStrokeColor = generateHexColor();
        var tripFillColor = generateHexColor();
        //Loop on trips points
        for(var i =  trip.length -1; i >= 0; i--) {
          var tripPoint = trip[i];
          
          var tripMarker = {"position": (""+ tripPoint.lat +"," + tripPoint.long)};
          tripMarker.title = "Source" +": " + assetSource + ", Asset" +": " + assetId + ", trip: " +tripKey + ".";
          tripMarker.source = assetSource;
          tripMarker.plate = assetId; //plate number
          tripMarker.assetKey = key; //source + assetId
          tripMarker.tripKey = tripKey;
          tripMarker.details = tripPoint;
          
          assetModel = (tripMarker.details && tripMarker.details.model) ? tripMarker.details.model.value : "";
          assetMake = (tripMarker.details && tripMarker.details.make) ? tripMarker.details.make.value : "";
          tripMarker.label = buildAssetLabel(assetMake, assetModel, assetId);
         
          tripMarker.id = key + "-" + tripKey + "-" +i;
          tripMarker.pointRef = i;
          tripMarker.strokeColor = tripStrokeColor;
          tripMarker.fillColor = tripFillColor;
          
          if(t == 0 && i == 0) { //Reached last point in asset last trip
            tripMarker.icon = sourcesAssetIcons[assetSource];
            vm.assets[key]["latestMarker"] = tripMarker;
          } else {
            if(i == 0) { //Reached last point in trip
              tripMarker.icon = buildTripIcon(10, 1, 1, tripStrokeColor, tripFillColor)
            } else {
              tripMarker.icon =  buildTripIcon(6, 0.8, 0.8, tripStrokeColor, tripFillColor);
            }
          }
          
          controlVehicleTrips(key);
          addMarkerToMap(key, tripMarker, tripPoint); 
          
          if(vm.mapcenter == null) {
            vm.mapcenter = tripMarker.position;
            vm.mapzoom = "12"
          }
        }
      }
    }
    addAssetToSourceList(assetSource, key, tripMarker.label);
  };
  
    
   //Check asset source, and push asset to appropriate source to display it in its source list box
  var addAssetToSourceList = function(assetSource, assetKey, label) {
    if(!vm.sources[assetSource]) {
      vm.sources[assetSource] = [{"key": assetKey, "label": label}];
    } else {
      //if(vm.sources[assetSource].indexOf(assetKey) == -1) {
      if(_.findWhere(vm.sources[assetSource], {"key": assetKey}) == undefined )
        vm.sources[assetSource].push({"key": assetKey, "label": label});
      //}
    }
  };
  
  //Add asset marker trip point to asset markers
  var addMarkerToMap = function(key, newMarker, tripPoint) {
   //Push to assets
    vm.assets[key]["markers"].push(newMarker);
    vm.assets[key]["path"].push([tripPoint.lat, tripPoint.long]);
    if(!vm.trackedAsset) {
      	//Keep track for clusterer view as a marker Object not as JSON
      	var dynMkr = angular.copy(newMarker, {});
      	dynMkr.position = new google.maps.LatLng(tripPoint.lat, tripPoint.long);
    	var tmp =new google.maps.Marker(dynMkr);
    	vm.dynMarkers.push(tmp);
    }
  };
 
  //Control the asset markers trip points limits, remove first pushed marker when limit reached
  var controlVehicleTrips = function(key) {
    if(vm.assets[key]["markers"].length > max_asset_points) {
      	vm.assets[key]["markers"].shift();
    }
  };
  
  var instantiateAsset = function(assetKey) {
    vm.assets[assetKey] = {"markers": [], "path": [], "pathColor": "", "latestMarker": {}, "strokeOpacity":  pathStrokeOpacity, "strokeWeight": 	pathStrokeWeight, "pathIcon": [{icon: {path: 'M 0,-1 0,1',strokeOpacity: 1,scale: 4},offset: '0',repeat: '20px'}]};
  };
  
  //Build normal trip marker point
  var buildTripIcon = function(scale, fillOpacity, strokeWeight, tripStrokeColor, tripFillColor ) {
    var tripicon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillOpacity: fillOpacity,
      strokeWeight: strokeWeight,
      scale: scale,
      strokeColor:  tripStrokeColor,
      fillColor:  tripFillColor
    }
    return tripicon;
  };
  
  //Build asset label
  var buildAssetLabel = function(make, model, plate) {
    var assetLabel = (make) ? (make + " ") : "";
    assetLabel += (model) ? (model + "-") : "";
    assetLabel += plate;
    return assetLabel;
  };
  
  
  //Render all assets
  var rerenderAllAssets = function() {
    vm.selectedAsset = "all";
    vm.renderAssets();
  };
  
  //Focus on asset when selected from list box, on when clicked on its marker on map
  //Close all info windows, redraw map with only asset trips tracked
  //If all assets are selected redraw all assets
  vm.focusOnAsset = function(assetKey) {
    vm.selectedAsset =  assetKey;
    vm.draw = true;
    if(vm.infoWindow != null) {
      vm.infoWindow.close();
    }
    if(vm.selectedAsset == "all") {
      vm.detailedmapzoom = 12;
      vm.searchText = '';
    } else {
      vm.searchText = vm.assets[assetKey].latestMarker.label;
      vm.mapcenter = vm.assets[vm.selectedAsset].latestMarker.position;
      vm.detailedmapzoom = 15;
    }
    vm.renderAssets();
  };
  
  //Show asset info in an info window
  vm.showAssetInfo = function(event, assetKey, tripKey, id) {
    vm.focusOnAsset(assetKey);
    var markerEl = this;
    NgMap.getMap({id:'detailed'}).then(function(map) {
      //Open info window
      vm.marker = _.findWhere(vm.assets[assetKey]["markers"], {"id": id})
      var infoWindow = "infoWindowTemplate_"+vm.marker.source;
                              
      map.showInfoWindow(event, infoWindow, markerEl);
      //Keep track of opened info window
      vm.infoWindow = map.infoWindows[infoWindow];
    });
  };
  
  vm.showAssetDashboard = function(plate) {
    $("#dashboard-iframe")[0].src = "/telematics/html/dashboard.html?vehicleId="+plate;
    $('#loadImg').show();
    $('#dashboard-iframe').hide();
    $('#dashboard').on('hidden.bs.modal', function () {
      $("#dashboard-iframe")[0].src = "";
    })
    $('#dashboard').modal();
  };
  
  var generateHexColor = function () {
    var col = Math.floor(Math.random()*16777215).toString(16)
    return shadeColor2('#'+col, 0);
  };
  
  //Percent is a value betwein -1.0, 1.0. <0 to darken, >0 to lighten an hex color
  var shadeColor2 = function (color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  };
  
  vm.isEmptyObject = function(obj) {
    return (Object.keys(obj).length == 0); 
  };
});
