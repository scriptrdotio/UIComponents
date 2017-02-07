angular
  .module("Map")
  .component(
  'scriptrMap',
  {
    transclude: true,
    bindings : { //TODO bind an id to use with ngMap in case we need to put multiple maps on page
      	"sourcesInfo": "<?",
      	"clusteredView": "<?", //boolean, if we render a cluster view for conglomerate markers or not
        "clusteredZoomMax": "<?", //Max zoom of map where cluster view is rendered
        "clusterZoom": "<?", //The zoom of map when clusteredView is true and clustered map is rendered
        "detailedZoomMin" : "<?", //Ignored with clusteredView = true, set when no cluster view
      	"focusedMarkerZoom": "<?", //Zoom when focusing on a single marker
        "pathStrokeOpacity": "@",
        "pathStrokeWeight": "@",
        "maxAssetPoints": "@", // Number of tracked positions per asset per map instance, do not set if infinite
        "defaultCenter": "@", //Map default center
        "trackedAsset": "@",
        "summaryIcons": "<?",
        
        "assetsData": "<?",
      	"api" : "@",
      	"apiParams" : "@",
        "msgTag": "@",
      	"onFormatData" : "&",
      
         //TODO the below attributes, currently use without geofence
        "geofenceManager": "<?", //True to show the geofence drawing manage icons or not
      	"apiGeofence": "<?",
        "apiGeofenceParams": "<?",
        "msgTagGeofence": "<?",
    },
    templateUrl : '/UIComponents/dashboard/frontend/components/map/map.html',
    
    controllerAs : "vm",

    controller : function($scope, $rootElement, $location, $sce,
                           $compile, $timeout, $interval, $controller, NgMap,
                           defaultConstants, wsClient) {

      var vm = this;
      
      // On load, get latest 500 data points saved in db
      this.$onInit = function() {
          vm.pathStrokeOpacity = (vm.pathStrokeOpacity) ? vm.pathStrokeOpacity : 0;
          vm.pathStrokeWeight = (vm.pathStrokeWeight) ? vm.pathStrokeWeight : 5;
        
          vm.maxAssetPoints = (vm.maxAssetPoints) ? vm.maxAssetPoints : 100;
          vm.defaultcenter = (vm.defaultcenter) ? vm.defaultcenter : "40.7053111,-74.258188";
          vm.trackedAsset = (vm.trackedAsset) ? vm.trackedAsset : null;
        
        
          vm.geofenceManager = (vm.geofenceManager) ? vm.geofenceManager : false;
        
          $scope.$parent.summaryIcons = {};
          if(vm.summaryIcons) {
             angular.forEach(vm.summaryIcons, function(value, key) {
                $scope.$parent.summaryIcons[key] = $sce.trustAsHtml(value);
            });
          }
        
         if(!vm.trackedAsset) {
           vm.showDetailedMap = false;
         } else {
           vm.showDetailedMap = true;
           vm.clusteredView = false;
         }
          // If a specific map is tracked do not use clustering
        
         if(vm.clusteredView) {
           if(!vm.clusteredZoomMax) {
           		vm.clusteredZoomMax = 11;
           }
           vm.detailedZoomMin =  (vm.clusteredZoomMax < 20) ? (vm.clusteredZoomMax + 1) : vm.clusteredZoomMax;
           if(!vm.clusterZoom) {
           		vm.clusterZoom = 3;
            }
         } else { //No clustered View check the detailed zoom min
           if(!vm.detailedZoomMin) {
            	vm.detailedZoomMin = 0;
           }
           //By default set as if we are viewing all TODO: check if we are tracking a single asset
           vm.detailedmapzoom = vm.detailedZoomMin;
         }
        //Set the focus when showing a single asset
        if(!vm.focusedMarkerZoom || (vm.clusteredView && vm.focusedMarkerZoom < vm.clusteredZoomMax)) {
           vm.focusedMarkerZoom = (vm.detailedZoomMin < 18) ? (vm.detailedZoomMin + 3) : vm.detailedZoomMin;
         } 
        	
         //This should be move to a parent component
      	 loadMapData();
         
         //Should use default one if not available
         vm.sourcesInfo = vm.sourcesInfo;//mapConstants.sourceAssetIcon;
        
        
        
        $scope.$on("mapFoucsOnMarker", function(event, data) {
			vm.focusOnAsset(data)
        });
      }

      //Load asset Icons per source
      var sourcesInfo = null;
      
      vm.sources = {}; // "Stream", "Simulator"
      vm.assets = {};
      
      vm.selectedAsset = "all";
      
      vm.markerClusterer = null;

      vm._hiddenAssets = {};

      
      vm.assetsKeys = [];
      
      vm.mapcenter = null;
      
      vm.infoWindow = null;
      
      vm.dynMarkers = [];
      
      
      
      //Load initial map assets from api or from passed data and subscribe to channel messages to add newly published assets to map
      var loadMapData =  function() {
          	wsClient.onReady.then(function() {
              if(vm.api) {
           		    vm.apiParams =  (vm.apiParams) ? vm.apiParams : {};
             	   	wsClient.call(vm.api, vm.apiParams).then(function(data, response) {
                      if(typeof self.onFormatData() == "function"){
                        data = self.onFormatData()(data);
                      }
                    vm.processAssets(data);
                    console.log("api call "+ vm.api +" response returned", data)
                  }, function(err) {
                    vm.callError = JSON.stringify(error)
                    console.log("api call "+ vm.apiParams +" reject call promise", err);
                  });
              }
              if(vm.msgTag) {
            	 wsClient.subscribe(vm.msgTag, vm.processAssets)
              }
              
          });
        
          if(vm.assetsData) {
          	 console.log("static assets data", vm.assetsData);
             vm.processAssets(vm.assetsData);
          }
       
      };

      //Call when receiving a new asset, or a set of assets
      vm.processAssets = function(data) {
        var assets = data;
       // var id = data.id;
        var process = function(assets) {
          if (!vm.trackedAsset || vm.trackedAsset == key) {
              // Loop on assets
              for (var key in assets) {
                if (assets.hasOwnProperty(key)) {
                    console.log(key, assets[key]);
                    vm.pushAssets(key, assets[key])
                  }
                }
          } else {
               if (assets.hasOwnProperty(vm.trackedAsset)) {
                 vm.pushAssets(vm.trackedAsset, assets[vm.trackedAsset])
               }
             }
          vm.renderAssets();
          if(vm.clusteredView && !vm.trackedAsset)  {
            vm.renderClusterer();
          }
        };
        
        if (vm.clusteredView && !vm.markerClusterer && !vm.trackedAsset) {
          NgMap
            .getMap({
            id : 'clustered' //TODO: figure out another thing then id, or pass id as a param
          })
            .then(
            function(map) {
              if (!vm.markerClusterer) {
                vm.buildClusterer(map);
              }
             process(assets);
            });
        } else {
          process(assets)
        }
    };
      
     vm.buildClusterer = function(map) {
        vm.markerClusterer = new MarkerClusterer(
          map,
          vm.dynMarkers,
          {
            maxZoom :  vm.clusteredZoomMax,
            imagePath : 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m',
            minimumClusterSize : -1,
            gridSize : 50,
            averageCenter : true
          });
      };
      
      //Render all assets
      var rerenderAllAssets = function() {
        vm.selectedAsset = "all";
        vm.renderAssets();
      };

      // Render markers assets
      vm.renderAssets = function() {
        console.log("Render New Assets.")
        if (vm.selectedAsset == "all") {
          vm.showAllAssets();
        } else { // Remove displaying single asset on select
          vm.displayedAssets = {};
          vm.displayedAssets[vm.selectedAsset] = vm.assets[vm.selectedAsset];
        }
      };

      //Render marker clusters
      vm.renderClusterer = function() {
          console.log("Render clusterer.")
          vm.markerClusterer.resetViewport(true);
          vm.markerClusterer.clearMarkers();
          vm.markerClusterer.addMarkers(vm.dynMarkers, false);
          vm.markerClusterer.repaint();
      };

      // Show all assets
      vm.showAllAssets = function() {
        vm.displayedAssets = angular.copy(vm.assets, {})
      };

      // Change map on zoom threshold
      vm.onClusteredZoomChanged = function() {
        if (!vm.trackedAsset) {
          NgMap.getMap({
            id : 'clustered'
          }).then(function(map) {
            if (map.getZoom() > vm.detailedZoomMin) {
              vm.showDetailedMap = true;
              vm.mapcenter = map.getCenter();
              vm.detaileddmapzoom = vm.detailedZoomMin;
            } else {
              vm.showDetailedMap = false;
              if(vm.markerClusterer) 
                vm.markerClusterer.setMap(map);
              rerenderAllAssets();
            }
          });
        }
      }

      //Change map on zoom threshold
      vm.onDetailedZoomChanged = function() {
        if (!vm.trackedAsset && vm.clusteredView == true) {
          NgMap.getMap({
            id : 'detailed'
          }).then(function(map) {
            if (map.getZoom() <=  vm.clusteredZoomMax) {
              vm.showDetailedMap = false;
              vm.clusterZoom =  vm.clusteredZoomMax;
              rerenderAllAssets();
            } else {
              vm.showDetailedMap = true;
            }
          });
        }
      };

      
      
      // Add an asset marker point to map
      // Example of pushed of asset trips: {"tripId":[{"lat":"51.650359051036","long":"-0.055656842290684",....},
      // "source":{"value":"stream"}}],"source":"stream","order":["0"]}
      // Push an array of sources with asssets with multiple marker points to map
      // Data format of asset trips: {"tripId":[{"lat":"40.792300000000004","long":"-73.95045",...},{}],
      // "tripId2":[{},{}], "source":"simulator","order":[tripId1, tripId2]}
      vm.pushAssets = function(assetId, trips) {
        var assetSource = trips.source;
        var key = assetSource + "_" + assetId;

        // console.log("asset: " + key + " -> " + assets[key]);
        //Latest Marker for this asset on map
        var prevLatestMarker = null;
        if (!vm.assets[key]) { //No assets with this key alreat drawn on map
          instantiateAsset(key);
          //NEED TO KEEP THIS IN CASE NEW ASSET
          vm.assets[key]["pathColor"] = generateHexColor();
        } else { //There is already a map marker for this asset
          var markers = vm.assets[key]["markers"];
          prevLatestMarker = markers[markers.length - 1];
        }

        var assetModel = null;
        var assetMake = null;

        //Asset Trips
        var tripsOrder = trips.order;

        // Loop on asset trips
        for (var t = tripsOrder.length - 1; t >= 0; t--) {
          var tripKey = tripsOrder[t];
          if (trips.hasOwnProperty(tripKey)) {
            var trip = trips[tripKey];

            // Define trip points icons Colors
            var tripStrokeColor = generateHexColor();
            var tripFillColor = generateHexColor();

            // Loop on trips points
            for (var i = trip.length - 1; i >= 0; i--) {
              var tripPoint = trip[i];

              var tripMarker = {
                "position" : ("" + tripPoint.lat + "," + tripPoint.long)
              };
              tripMarker.title = "Source" + ": " + assetSource + ", Asset" + ": "
                + assetId + ", trip: " + tripKey + ".";
              
              tripMarker.source = assetSource;
              
              tripMarker.assetId = assetId; // asset id
              
              tripMarker.assetKey = key; // source + assetId
              tripMarker.tripKey = tripKey;
              
              tripMarker.details = tripPoint;

              assetModel = (tripMarker.details && tripMarker.details.model) ? tripMarker.details.model.value
              : "";
              assetMake = (tripMarker.details && tripMarker.details.make) ? tripMarker.details.make.value
              : "";
              tripMarker.label = buildAssetLabel(assetMake, assetModel, assetId);

              //If Asset doesn't exist on map yet
              if (!prevLatestMarker && prevLatestMarker == null) {
                tripMarker.id = key + "-" + tripKey + "-" + i;
                tripMarker.pointRef = i;
                tripMarker.strokeColor = tripStrokeColor;
                tripMarker.fillColor = tripFillColor;
              } else {
                if (tripKey == prevLatestMarker.tripKey) {
                  tripMarker.id = key + "-" + tripKey + "-"
                    + ((prevLatestMarker.pointRef) + 1);
                  tripMarker.pointRef = ((prevLatestMarker.pointRef) + 1);
                  tripMarker.strokeColor = prevLatestMarker.strokeColor;
                  tripMarker.fillColor = prevLatestMarker.fillColor;
                  // Change previous Marker icon to a small trip point
                  vm.assets[key]["markers"][markers.length - 1].icon = buildTripIcon(
                    6, 0.8, 0.8, prevLatestMarker.strokeColor,
                    prevLatestMarker.fillColor);
                } else {
                  // Change previous Marker icon to a Large trip point marking it as last point in trip
                  vm.assets[key]["markers"][markers.length - 1].icon = buildTripIcon(
                    10, 1, 1, prevLatestMarker.strokeColor,
                    prevLatestMarker.fillColor);
                }
              }

              if (t == 0 && i == 0) { //Reached last point in asset trip & last point in current trip
                tripMarker.icon = (vm.sourcesInfo && vm.sourcesInfo[assetSource] && vm.sourcesInfo[assetSource]["icon"]) ? vm.sourcesInfo[assetSource]["icon"]
                : defaultConstants.sourceIcon["default"];
                vm.assets[key]["latestMarker"] = tripMarker;
              } else {
                if (i == 0) { //Reached last point in trip
                  tripMarker.icon = buildTripIcon(10, 1, 1, tripStrokeColor,
                                                  tripFillColor)
                } else {
                  tripMarker.icon = buildTripIcon(6, 0.8, 0.8, tripStrokeColor,
                                                  tripFillColor);
                }
              }

              controlVehicleTrips(key); //TODO: MFE maybe this won't be needed anymore

              addMarkerToMap(key, tripMarker, tripPoint);
              
             
              if (vm.mapcenter == null) {
                vm.mapcenter = tripMarker.position;
              }
            } //End looping on asset's trip's points
          }// End check for Availble tripKey in trips
        }//End looping on asset's trips
        addAssetToSourceList(assetSource, key, tripMarker.label);
      };

      //Check asset source, and push asset to appropriate source to display it in its source list box
      var addAssetToSourceList = function(assetSource, assetKey,
                                           label) {
        if (!vm.sources[assetSource]) {
          vm.sources[assetSource] = [ {
            "key" : assetKey,
            "label" : label
          } ];
        } else {
          //if(vm.sources[assetSource].indexOf(assetKey) == -1) {
          if (_.findWhere(vm.sources[assetSource], {
            "key" : assetKey
          }) == undefined)
            vm.sources[assetSource].push({
              "key" : assetKey,
              "label" : label
            });
          //}
        }
      };

      //Add asset marker trip point to asset markers
      var addMarkerToMap = function(key, newMarker, tripPoint) {
        //Push to assets
        vm.assets[key]["markers"].push(newMarker);
        vm.assets[key]["path"].push([ tripPoint.lat,
                                     tripPoint.long ]);
        if (!vm.trackedAsset) {
          //Keep track for clusterer view as a marker Object not as JSON
          var dynMkr = angular.copy(newMarker, {});
          dynMkr.position = new google.maps.LatLng(tripPoint.lat,
                                                   tripPoint.long);
          var tmp = new google.maps.Marker(dynMkr);
          vm.dynMarkers.push(tmp);
        }
      };

      //Control the asset markers trip points limits if maxAssetPoints defined, remove first pushed marker when limit reached
      var controlVehicleTrips = function(key) {
        if(vm.maxAssetPoints) {
          if (vm.assets[key]["markers"].length > vm.maxAssetPoints) {
          	vm.assets[key]["markers"].shift();
          }
        }
      };

      var instantiateAsset = function(assetKey) {
        vm.assets[assetKey] = {
          "markers" : [],
          "path" : [],
          "pathColor" : "",
          "latestMarker" : {},
          "strokeOpacity" : vm.pathStrokeOpacity,
          "strokeWeight" : vm.pathStrokeWeight,
          "pathIcon" : [ {
            icon : {
              path : 'M 0,-1 0,1',
              strokeOpacity : 1,
              scale : 4
            },
            offset : '0',
            repeat : '20px'
          } ]
        };
      };

      //Build normal trip marker point
      var buildTripIcon = function(scale, fillOpacity,
                                    strokeWeight, tripStrokeColor, tripFillColor) {
        var tripicon = {
          path : google.maps.SymbolPath.CIRCLE,
          fillOpacity : fillOpacity,
          strokeWeight : strokeWeight,
          scale : scale,
          strokeColor : tripStrokeColor,
          fillColor : tripFillColor
        }
        return tripicon;
      };

      //Build asset label
      var buildAssetLabel = function(make, model, assetId) {
        var assetLabel = (make) ? (make + " ") : "";
        assetLabel += (model) ? (model + "-") : "";
        assetLabel += assetId;
        return assetLabel;
      };


      //Focus on asset when selected from list box, on when clicked on its marker on map
      //Close all info windows, redraw map with only asset trips tracked
      //If all assets are selected redraw all assets
      vm.focusOnAsset = function(assetKey) {
        vm.selectedAsset = assetKey;
        vm.showDetailedMap = true;
        if (vm.infoWindow != null) {
          vm.infoWindow.close();
        }
        if (vm.selectedAsset == "all") {
          vm.detailedmapzoom = vm.detailedZoomMin;
          vm.searchText = '';
        } else {
          vm.searchText = vm.assets[assetKey].latestMarker.label;
          vm.mapcenter = vm.assets[vm.selectedAsset].latestMarker.position;
          vm.detailedmapzoom = vm.focusedMarkerZoom;
        }
        vm.renderAssets();
      };

      //Show asset info in an info window
      vm.showAssetInfo = function(event, assetKey, tripKey, id) {
        vm.focusOnAsset(assetKey);
        var markerEl = this;
        NgMap.getMap({
          id : 'detailed' //TODO: MAke id parametrable or change selector if possible
        }).then(
          function(map) {
            //Open info window
            $scope.$parent.marker = _.findWhere(
              vm.assets[assetKey]["markers"], {
                "id" : id
              })
            var infoWindow = "infoWindowTemplate_"
            + $scope.$parent.marker.source;
            
            $scope.map = map;
            $scope.map.showInfoWindow(event, infoWindow, markerEl);
            //Keep track of opened info window
            vm.infoWindow = map.infoWindows[infoWindow];
          });
      };

      var generateHexColor = function() {
        var col = Math.floor(Math.random() * 16777215)
        .toString(16)
        return shadeColor2('#' + col, 0);
      };

      //Percent is a value betwein -1.0, 1.0. <0 to darken, >0 to lighten an hex color
      var shadeColor2 = function(color, percent) {
        var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0
        : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
        return "#"
          + (0x1000000 + (Math.round((t - R) * p) + R)
             * 0x10000 + (Math.round((t - G) * p) + G)
             * 0x100 + (Math.round((t - B) * p) + B))
          .toString(16).slice(1);
      };

      vm.isEmptyObject = function(obj) {
        return (Object.keys(obj).length == 0);
      };
      
      
      
      vm.assetsFences = [];
      vm.drawingControl = ["rectangle"];
      vm.drawingOptions = {position: 'TOP_CENTER',drawingModes:['rectangle']}

      vm.overlaySettings = {"fillColor": "#444", "fillOpacity": 0.2, "strokeWeight": 3, "strokeColor": "#ff8c00", "clickable": true, "zIndex": 1, "editable": true};

      vm.setupDrawingManager = function() {
        vm.assetsFences = [];
        //Invoke
        $scope.invoke("telematics/api/getVehicleGeofence", {
           "vehicleId": vm.selectedAsset
        }, "main-getgeofence_"+vm.selectedAsset);

        //By Default hide rect drawing mode
        hideRectDrawingMode();

        //TODO: Put a loading on get & remove when response received
      };


      vm.drawGeofence = function(bounds) {
         if(bounds != null) {
           NgMap.getMap({id:'detailed'}).then(function(map) {
              var props = {};
              props["fillColor"] = vm.overlaySettings["fillColor"];
              props["fillOpacity"] = vm.overlaySettings["fillOpacity"];
              props["strokeWeight"] = vm.overlaySettings["strokeWeight"];
              props["strokeColor"] = vm.overlaySettings["strokeColor"];
              props["clickable"] = vm.overlaySettings["clickable"];
              props["zIndex"] = vm.overlaySettings["zIndex"];
              props["editable"] = vm.overlaySettings["editable"];
              props["map"] = map;
              props["bounds"] = JSON.parse(bounds);
              var rectangle = new google.maps.Rectangle(props);
              vm.assetsFences.push({assetId: vm.selectedAsset, assetFence: rectangle});
            });
            //TODO: Remove loading
         } else {
           showRectDrawingMode();
           //TODO: Remove loading
         }
         $('[data-toggle="tooltip"]').tooltip(); 

        $(".gmnoprint").each(function(){ //Add classes to drawing manager to override css
              // ID the Hand button
              newObj = $(this).find("[title='Stop drawing']");
              newObj.attr('class', 'btnStop');
              // ID the Rectangle Button
              newObj = $(this).find("[title='Draw a rectangle']");
              newObj.attr('id', 'btnRectangle');
          });


      }

      var showRectDrawingMode = function() {
         vm.drawingOptions = {position: 'TOP_CENTER',drawingModes:["rectangle"]};
      }

      var hideRectDrawingMode = function() {
        vm.drawingOptions = {position: 'TOP_CENTER',drawingModes:[]};
      }

      vm.onMapOverlayCompleted = function(e){
        hideRectDrawingMode();
        vm.assetsFences.push({assetId: vm.selectedAsset, assetFence: e.overlay});

        if(vm.drawingMessagesTimeout) {
            $timeout.cancel(vm.drawingMessagesTimeout);
        }

        vm.drawingMessages = "Do not forget to save your geofence before selecting another vehicle."
        vm.drawingMessagesTimeout = $timeout(function () { vm.drawingMessages = null }, 5000); 
      };

      vm.focusVehicle = function() {
        if(vm.selectedAsset) {
          vm.mapcenter = vm.assets[vm.selectedAsset].latestMarker.position
        }
      }

      vm.drawingMessages = null;
      vm.drawingMessagesTimeout = null;

      vm.focusGeofence = function() {
         var fenceOverlay =  _.findWhere(vm.assetsFences, {"assetId": vm.selectedAsset});
         if(fenceOverlay) {
            vm.mapcenter = fenceOverlay.assetFence.getBounds().getCenter()
         } else {
            if(vm.drawingMessagesTimeout) {
                $timeout.cancel(vm.drawingMessagesTimeout);
            }
           vm.drawingMessages = "No geofence has been defined yet for selected vehicle."
           vm.drawingMessagesTimeout = $timeout(function () { vm.drawingMessages = null }, 5000);  
         }
      }

      vm.removeGeofence = function() {
        var fenceOverlay =  _.findWhere(vm.assetsFences, {"assetId": vm.selectedAsset});
        //substract fence
        if(fenceOverlay) {
          vm.assetsFences = _.without(vm.assetsFences, fenceOverlay);
          $scope.invoke("telematics/api/removeVehicleGeofence", {
               "vehicleId": vm.selectedAsset,
            }, "main-removegeofence_"+vm.selectedAsset);
            fenceOverlay.assetFence.setMap(null);
        }
        showRectDrawingMode();
      };

      vm.hideAllGeofences = function() {
        _.every(vm.assetsFences, function(fenceOverlay) {
            fenceOverlay.assetFence.setMap(null);
            return true;
        });
      };

      vm.saveGeofence = function() {
         var fenceOverlay =  _.findWhere(vm.assetsFences, {"assetId": vm.selectedAsset});
        if(fenceOverlay) {
           $scope.invoke("telematics/api/saveVehicleGeofence", {
               "vehicleId": vm.selectedAsset,
               "bounds": JSON.stringify(fenceOverlay.assetFence.getBounds())
            }, "main-savegeofence_"+vm.selectedAsset);
        } else {

        }
      }
	
   }
});
