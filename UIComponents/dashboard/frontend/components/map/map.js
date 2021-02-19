angular.module('Map', ['ngMap', 'ToggleSwitch', 'ui.bootstrap', 'schemaForm', "ngAnimate", "ngSanitize", "angular-underscore/filters", "pascalprecht.translate", "ngMessages", 'ComponentsCommon', 'DataService']);


//"underscore","btford.markdown", "ngSanitize",   "ui.codemirror", 
angular
  .module("Map")
  .constant(
        "geofenceDetails",
        {
            "form": [  {
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [
                               {"key": "identifier",
                                validationMessage: {
                                      "unique": 'Identifier already taken'
                                    },
                                    $validators: {
                                      "unique": function(modelValue, viewValue, model, form) {
                                        if (model["inUseIdentifiers"].indexOf(modelValue) != -1) {
                                          return false;
                                        }
                                        return true
                                      }
                                    }
                               }
                         ]
            			},
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [
                                {
                                    key: "properties",
                                    title: "Geofence Properties",
                                    startEmpty: true,
                                    "items": [
                                          {
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [
                                              {
                                                "type": "section",
                                                "htmlClass": "col-xs-6",
                                                "items": [{
                                                    key: "properties[].key"
                                                }]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-6",
                                                "items": [{
                                                    key: "properties[].value"
                                                }]
                                        	}
                                            ]}
                                        ]
                                }
                            ]
                         }
                        ],
            "schema": {
                "type": "object",
                "title": "Schema",
                "properties": {
                    "identifier": {
                        "title": "Identifier",
                        "type": "string",
                	},
                    "properties": {
                        "type": "array",
                        "default": [],
                        "items": {
                            "type": "object",
                            "properties": {
                                "key": {
                                    "title": "Key",
                                    "type": "string"
                                },
                                "value": {
                                    "title": "Value",
                                    "type": "string"
                                }
                            }
                        }
                    }
        },
        "required": []
    }})
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
        "focusedMarkerZoom": "<?", //Zoom level when focusing on a single marker
        "pathStrokeOpacity": "@",
        "pathStrokeWeight": "@",
        "maxAssetPoints": "<?", // Number of tracked positions per asset per map instance, do not set if infinite
        "defaultCenter": "@", //Map default center, "lat,long"
        "trackedAsset": "@", //Show only this asset, not clickable
        "selectedTrackedAsset": "@", 
        "summaryIcons": "<?", //MFE: Check what to do with this in dashboard builder
        
        "assetsData": "<?",
        
        "heatMapWeight": "@",
        "heatMapRadius": "@",
        "heatMapOpacity": "@",
        "heatMapGradient": "<?",
        "setMarkerIcon" : "&",
        "onSelectAsset" : "&",
        "clusterStyles" : "<?",
      
         //TODO the below attributes, currently use without geofence
        "geofenceManager": "<?", //True to show the geofence drawing manage icons or not
        "geofenceData": "<?",
        
        
        
        "heatmap" : "<?",
        "bounce" : "<?",
        "markerInfoWindow": "<?", //On marker click show info window
        "markerHoverWindow": "<?", //On marker hover show hover window
        "customDefaultInfoWindow": "@", //id of custom default info window
        "clickOutsideCloseInfoWindow": "<?",
        "mapFitBounds": "<?",
        
        
        "data": "<?",
        "transport": "@",
        "api" : "@",
        "msgTag" : "@",
        "httpMethod": "@",
        "apiParams" : "<?",
        "onFormatData" : "&",
        "useWindowParams": "@",
        "serviceTag": "@",
        "fetchDataInterval": "@",
        
         "renderOnlyClickedAsset": "<?", //Default true, to remove the display of the markers except the clicked marker
        
         "onBuildAssetTitle": "&?" //To set the title on the hover of the marker
        
    },
    templateUrl : '/UIComponents/dashboard/frontend/components/map/map.html',
    
    controller : function($scope, $rootElement, $location, $sce,
                           $compile, $timeout, $interval, $controller, NgMap,
                           defaultConstants, wsClient, httpClient, dataService, $uibModal, $element, geofenceDetails) {

      
      var self = this;
      
      // On load, get latest 500 data points saved in db
      self.$onInit = function() {
          var self = this;
          
          self._renderOnlyClickedAsset = (typeof self.renderOnlyClickedAsset !== 'undefined') ? self.renderOnlyClickedAsset : true;
          self.transport = (self.transport) ? self.transport : "wss";
          self.$wdgid = $scope.$id;
          self.pathStrokeOpacity = (self.pathStrokeOpacity) ? self.pathStrokeOpacity : 0;
          self.pathStrokeWeight = (self.pathStrokeWeight) ? self.pathStrokeWeight : 5;
        
          self.maxAssetPoints = (self.maxAssetPoints) ? self.maxAssetPoints : 100;
          self.defaultcenter = (self.defaultCenter) ? self.defaultCenter : null;
          self.trackedAsset = (self.trackedAsset) ? self.trackedAsset : null;
          self.clusterStyles = (self.clusterStyles) ? self.clusterStyles : [ ];
        
          self.geofenceManager = (self.geofenceManager) ? self.geofenceManager : false;
        
          $scope.$parent.summaryIcons = {};
          if(self.summaryIcons) {
             angular.forEach(self.summaryIcons, function(value, key) {
                $scope.$parent.summaryIcons[key] = $sce.trustAsHtml(value);
            });
          }
        
         if(!self.trackedAsset) {
           self.showDetailedMap = false;
         } else {
           self.showDetailedMap = true;
           self.clusteredView = false;
         }
          // If a specific map is tracked do not use clustering
        
         if(self.clusteredView) {
           if(!self.clusteredZoomMax) {
           		self.clusteredZoomMax = 11;
           }
           self.detailedZoomMin =  (self.clusteredZoomMax < 20) ? (self.clusteredZoomMax + 1) : self.clusteredZoomMax;
           if(!self.clusterZoom) {
           		self.clusterZoom = 3;
            }
         } else { //No clustered View check the detailed zoom min
           if(!self.detailedZoomMin) {
            	self.detailedZoomMin = 0;
           }
           //By default set as if we are viewing all TODO: check if we are tracking a single asset
           self.detailedmapzoom = self.detailedZoomMin;
         }
        //Set the focus when showing a single asset
        if(!self.focusedMarkerZoom || (self.clusteredView && self.focusedMarkerZoom < self.clusteredZoomMax)) {
           self.focusedMarkerZoom = (self.detailedZoomMin < 18) ? (self.detailedZoomMin + 3) : self.detailedZoomMin;
         } 

         if(self.selectedTrackedAsset) {
             self.showDetailedMap = true;
             self.detailedmapzoom = self.detailedZoomMin
         }
          
         //This should be move to a parent component
      	 loadMapData();
          
         
         //Should use default one if not available
         self.sourcesInfo = self.sourcesInfo;//mapConstants.sourceAssetIcon;
        
        
        self.markerInfoWindow = (typeof self.markerInfoWindow != "undefined") ? self.markerInfoWindow : true;
		  self.markerHoverWindow = (typeof self.markerHoverWindow != "undefined") ? self.markerHoverWindow : false;
		  self.clickOutsideCloseInfoWindow = (typeof self.clickOutsideCloseInfoWindow != "undefined") ? self.clickOutsideCloseInfoWindow : false;
        
        self.mapFitBounds = (typeof self.mapFitBounds != "undefined") ? self.mapFitBounds : true;
       
        self.bounds = null;
        if(self.mapFitBounds)
			self.bounds = new google.maps.LatLngBounds();

        //Focus on selected asset
        $scope.$on("mapFoucsOnMarker", function(event, data) {
			self.focusOnAsset(data)
        });
          
          
        $scope.$on("mapRemoveAssets", function(event, data) {
			self.removeAssets(data)
        });
          
          
        //Show info window of asset 
        $scope.$on("mapShowInfoWindowOnMarker", function(event, data) {
            var marker = self.assets[data]["latestMarker"];
			self.showAssetInfo(null, null, marker, data, null, marker.id)
        });
          
        //Show info window of asset 
        $scope.$on("mapRerender", function(event) {
           	rerenderAllAssets();
            
            if (self.clusteredView) {
                self.showDetailedMap = false;
            	self.clusterZoom =  self.clusteredZoomMax;
                NgMap
                    .getMap({
                    id : 'clustered-'+self.$wdgid //TODO: figure out another thing then id, or pass id as a param
                })
                    .then(
                    function(map) {
                        map.setCenter(self.bounds.getCenter());
        			    map.fitBounds(self.bounds);
                    }, function(e) {
                        
               });
            } else {
                 NgMap
                    .getMap({
                    id : 'detailed-'+self.$wdgid //TODO: figure out another thing then id, or pass id as a param
                })
                    .then(
                    function(map) {
                        map.setCenter(self.bounds.getCenter());
        			    map.fitBounds(self.bounds);
                    }, function(e) {
                        
               });
            }

        });
          
        self.switchStatus = (self.heatmap === false || self.heatmap === true) ?  self.heatmap : false;
        $scope.$on('mapInitialized', function(event, map) {
              self.map = map;
              if(self.switchStatus == true && self.heatmap){
                  heatmap = new google.maps.visualization.HeatmapLayer({
                      data: _.toArray(self.heatMap),
                      radius: self.heatMapRadius,
                      gradient: self.heatMapGradient,
                      opacity: self.heatMapOpacity   
                  });
                  heatmap.setMap(self.map);
              }else{
                  if(typeof heatmap != 'undefined'){
                       heatmap.setMap(null);
                  }
              }
            if(self.geofenceManager) {
            	self.attachGeofencesToMap(map);
            }
            
            if(self.selectedTrackedAsset && self.showDetailedMap == true) {
                 $timeout(function() {
                 	if(self.selectedTrackedMarker)
                        self.showAssetInfo(null, null, self.selectedTrackedMarker, self.selectedTrackedMarker.assetKey, self.selectedTrackedMarker.tripKey, self.selectedTrackedMarker.id)
                 },1000);
             }
          });  
          
          
          //Load geofence
          if(self.geofenceManager) {
              self.geofencesIncrement = 0;
              self.geofenceMenuDisplayed = false;
              if(!self.geofencesLoaded) {
                  self.loadGeofences();
              }

              google.maps.event.addDomListener(document ,"click", function(e) {
                  if (self.geofenceMenuDisplayed == true) {
                      menuBox = $element.find(".geofence-menu")[0]
                      menuBox.style.display = "none";
                      self.geofenceMenuDisplayed = false;
                  }
              });
          }
      }
      
      this.$onDestroy = function() {
          if(self.msgTag){
              wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
          }
          if(self.refreshTimer){
              $interval.cancel( self.refreshTimer );
          }
      }

      //Load asset Icons per source
      var sourcesInfo = null;
      
      self.sources = {}; // "Stream", "Simulator"
      self.assets = {};
      
      self.selectedAsset = "all";
      
      self.markerClusterer = null;

      self._hiddenAssets = {};

      
      self.assetsKeys = [];
      
      self.mapcenter = null;
      
      self.infoWindow = null;
      
      self.dynMarkers = {}//[];
        
      // heat map    
      self.heatMap = {};
      self.heatMapRadius =  (self.heatMapRadius) ? self.heatMapRadius : 40;
      self.heatMapOpacity = (self.heatMapOpacity) ? self.heatMapOpacity : 0.8;   
      self.heatMapGradient = (self.heatMapGradient) ? self.heatMapGradient : [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
          ];  
      
      
      
      //Load initial map assets from api or from passed data and subscribe to channel messages to add newly published assets to map
      var loadMapData =  function() {
          initDataService(self.transport);
        
          if(self.assetsData) {
          	 //console.log("static assets data", self.assetsData);
             self.processAssets(self.assetsData);
          } else if(self.data) {
         	 //console.log("static assets data", self.data);
             self.processAssets(self.data);
          }
       
      };
        
     
      var initDataService = function(transport) {
          if((transport == "wss" && (self.api || self.msgTag)) || (transport == "https" && self.api)) {
              var requestInfo = {
                  "api": self.api,
                  "transport": transport,
                  "msgTag": self.msgTag,
                  "apiParams": self.apiParams,
                  "useWindowParams": self.useWindowParams,
                  "httpMethod": self.httpMethod,
                  "widgetId": $scope.$id
              };
              dataService.scriptrRequest(requestInfo, self.processAssets.bind(self));

              if(self.fetchDataInterval && !self.refreshTimer) {
                  //Assuming this is success
                  self.refreshTimer = $interval(
                      function(){
                          initDataService(self.transport)
                      }, self.fetchDataInterval * 1000);
              }
          } else {
              $scope.$emit("waiting-for-data");
              $scope.$on("update-data", function(event, data) {
                  if(data) {
                      if(data[self.serviceTag])
                          self.processAssets(data[self.serviceTag]);
                      else
                          self.processAssets(data);
                  }
              });
          }

      }
        
      self.removeAssets = function(assets) {
         for (var key in assets) {
             if (assets.hasOwnProperty(key)) {
                 var assetKey  = buildAssetKey(key, assets[key]);
				 delete self.assets[assetKey];
                 delete self.displayedAssets[assetKey];
				 delete self.dynMarkers[assetKey];
                 self.markerClusterer.clearMarkers();
          		 self.markerClusterer.addMarkers( _.toArray(self.dynMarkers), false);
          		 self.markerClusterer.repaint();
             }
         }
         
     }

      //Call when receiving a new asset, or a set of assets
      self.processAssets = function(data) {
        if(self.onFormatData && typeof self.onFormatData() == "function"){
           data = self.onFormatData()(data);
        }
        var assets = data;
       // var id = data.id;
        var process = function(assets, mapId) {
          if (!self.trackedAsset || self.trackedAsset == key) {
              // Loop on assets
              for (var key in assets) {
                if (assets.hasOwnProperty(key)) {
                    //console.log(key, assets[key]);
                    self.pushAssets(key, assets[key])
                  }
                }
          } else {
               if (assets.hasOwnProperty(self.trackedAsset)) {
                 self.pushAssets(self.trackedAsset, assets[self.trackedAsset])
               }
          }
          if(!self.heatmap && !self.swithcStatus) {
              self.renderAssets();
              if(self.clusteredView && !self.trackedAsset && !self.selectedTrackedAsset)  {
                self.renderClusterer();
              }
          }
          if(self.mapFitBounds && self.bounds)  {
          	NgMap
            .getMap({
            	id : mapId //TODO: figure out another thing then id, or pass id as a param
          	})
            .then(
            	function(map) { 
                   if(!self.mapcenter)  {
            			self.mapcenter = self.bounds.getCenter().lat()+","+self.bounds.getCenter().lng();
                        map.setCenter(self.bounds.getCenter());
                    	map.fitBounds(self.bounds);
                    }
          	})
          }   
        };
        
        if (self.clusteredView && !self.markerClusterer && !self.trackedAsset && !self.selectedTrackedAsset) {
          NgMap
            .getMap({
            id : 'clustered-'+self.$wdgid //TODO: figure out another thing then id, or pass id as a param
          })
            .then(
            function(map) {
              if (!self.markerClusterer) {
                self.buildClusterer(map);
              }
             process(assets, ("clustered"+'-'+self.$wdgid));
             if(self.switchStatus == true && self.heatmap){
                self.activateHeatMap(true);
             }
            }, function(e) {
              console.log("Clusterer Map error", e)
            });
        } else {
          process(assets, ("detailed"+'-'+self.$wdgid))
          if(self.switchStatus == true && self.heatmap){
          	self.activateHeatMap(true);
            
          }
        }
    };
        
   self.activateHeatMap = function(switchStatus){
       if(switchStatus == true){
           heatmap = new google.maps.visualization.HeatmapLayer({
               data: _.toArray(self.heatMap),
               radius: self.heatMapRadius,
               gradient: self.heatMapGradient,
               opacity: self.heatMapOpacity   
           });
           heatmap.setMap(self.map);
           self.showDetailedMap = false;
           self.markerClusterer.clearMarkers();
           self.markerClusterer.repaint();
       }else{
           if(typeof heatmap != 'undefined'){
               heatmap.setMap(null);
               self.showDetailedMap = false;
               self.renderClusterer();
           }
       }
     }   
      
     self.buildClusterer = function(map) {
         //console.log(self.clusterStyles);
        self.markerClusterer = new MarkerClusterer(
          map,
          _.toArray(self.dynMarkers),
          {
            maxZoom :  self.clusteredZoomMax,
            imagePath : 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m',
            minimumClusterSize : -1,
            gridSize : 50,
            averageCenter : true,
              styles:self.clusterStyles
          });
      };
      
      //Render all assets
      var rerenderAllAssets = function() {
        self.selectedAsset = "all";
        self.renderAssets();
      };

      // Render markers assets
      self.renderAssets = function() {
        console.log("Render New Assets.")
        if (self.selectedAsset == "all") {
          self.showAllAssets();
        } else { // Remove displaying single asset on select
          if(self._renderOnlyClickedAsset) {
              self.displayedAssets = {};
          	  self.displayedAssets[self.selectedAsset] = self.assets[self.selectedAsset];
          } else {
              self.showAllAssets();
          }
        }
      };

      //Render marker clusters
      self.renderClusterer = function() {
          console.log("Render clusterer.")
          self.markerClusterer.resetViewport(true);
          self.markerClusterer.clearMarkers();
          self.markerClusterer.addMarkers( _.toArray(self.dynMarkers), false);
          self.markerClusterer.repaint();
      };

      // Show all assets
      self.showAllAssets = function() {
        self.displayedAssets = angular.copy(self.assets, {})
      };

      // Change map on zoom threshold
      self.onClusteredZoomChanged = function() {
        if (!self.trackedAsset && !self.selectedTrackedAsset && !self.heatmap && !self.switchStatus) {
          NgMap.getMap({
            id : 'clustered-'+self.$wdgid
          }).then(function(map) {
              self.map = map;
              if (map.getZoom() >= self.detailedZoomMin) {
                  self.showDetailedMap = true;
                  self.mapcenter = map.getCenter();
                  self.detailedmapzoom = self.detailedZoomMin;
              } else {
              	self.showDetailedMap = false;
              	if(self.markerClusterer) 
                	self.markerClusterer.setMap(map);
              	rerenderAllAssets();
            }
          });
        }
      }

      //Change map on zoom threshold
      self.onDetailedZoomChanged = function() {
        if (!self.trackedAsset && !self.selectedTrackedAsset && self.clusteredView == true && !self.heatmap && !self.switchStatus) {
          NgMap.getMap({
            id : 'detailed-'+self.$wdgid
          }).then(function(map) {
            self.map = map;  
            if (map.getZoom() <=  self.clusteredZoomMax) {
              self.showDetailedMap = false;
              self.clusterZoom =  self.clusteredZoomMax;
              rerenderAllAssets();
            } else {
              self.showDetailedMap = true;
            }
          });
        }
      };
      
      var buildAssetKey = function(assetId, trips) {
         return trips.source + "_" + assetId;
      }
      // Add an asset marker point to map
      // Example of pushed of asset trips: {"tripId":[{"lat":{"value": "51.650359051036","long": {"value":"-0.055656842290684",....},
      // "source":{"value":"stream"}}],"source":"stream","order":["0"]}
      // Push an array of sources with asssets with multiple marker points to map
      // Data format of asset trips: {"tripId":[{"lat":"{"value": "40.792300000000004"},"long": {"value": "-73.95045"},...},{}],
      // "tripId2":[{},{}], "source":"simulator","order":[tripId1, tripId2]}
      self.pushAssets = function(assetId, trips) {
        var assetSource = trips.source;
        var key = assetSource + "_" + assetId;

        // console.log("asset: " + key + " -> " + assets[key]);
        var isNewAsset = false;
        //Latest Marker for this asset on map
        var prevLatestMarker = null;
        if (!self.assets[key]) { //No assets with this key alreat drawn on map
          self.instantiateAsset(key);
          //NEED TO KEEP THIS IN CASE NEW ASSET
          self.assets[key]["pathColor"] = generateHexColor();
        } else { //There is already a map marker for this asset
          var markers = self.assets[key]["markers"];
          prevLatestMarker = markers[markers.length - 1];
        }

        var assetModel = null;
        var assetMake = null;

        //Asset Trips
        var tripsOrder = trips.order;

        // Loop on asset trips
       if(tripsOrder){      
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
                "position" : ("" + tripPoint.lat.value + "," + tripPoint.long.value)
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
              tripMarker.display = buildAssetLabel(assetMake, assetModel, assetId, tripPoint);

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
                  self.assets[key]["markers"][markers.length - 1].icon = buildTripIcon(
                    6, 0.8, 0.8, prevLatestMarker.strokeColor,
                    prevLatestMarker.fillColor);
                } else {
                  // Change previous Marker icon to a Large trip point marking it as last point in trip
                  self.assets[key]["markers"][markers.length - 1].icon = buildTripIcon(
                    10, 1, 1, prevLatestMarker.strokeColor,
                    prevLatestMarker.fillColor);
                }
              }

              if (t == 0 && i == 0) { //Reached last point in asset trip & last point in current trip
                tripMarker.icon = (self.sourcesInfo && self.sourcesInfo[assetSource] && self.sourcesInfo[assetSource]["icon"]) ? self.sourcesInfo[assetSource]["icon"]
                : defaultConstants.sourceIcon["default"];
                self.assets[key]["latestMarker"] = tripMarker;
              } else {
                if (i == 0) { //Reached last point in trip
                  tripMarker.icon = buildTripIcon(10, 1, 1, tripStrokeColor,
                                                  tripFillColor)
                } else {
                  tripMarker.icon = buildTripIcon(6, 0.8, 0.8, tripStrokeColor,
                                                  tripFillColor);
                }
              }
              
             if(self.setMarkerIcon && typeof self.setMarkerIcon() == "function"){
                  tripMarker = self.setMarkerIcon()(tripPoint, tripMarker);
             }
              
              self.controlVehicleTrips(key); //TODO: MFE maybe this won't be needed anymore

              self.addMarkerToMap(key, tripMarker, tripPoint);
              
              if(self.bounds) {
               	self.bounds.extend(new google.maps.LatLng(tripPoint.lat.value, tripPoint.long.value));
              } else if (self.mapcenter == null) {
                self.mapcenter = tripMarker.position;
              }
            } //End looping on asset's trip's points
          }// End check for Availble tripKey in trips
        }//End looping on asset's trips
       }// End condition
        self.addAssetToSourceList(assetSource, key, tripMarker.display);
      };

      //Check asset source, and push asset to appropriate source to display it in its source list box
      self.addAssetToSourceList = function(assetSource, assetKey,
                                           label) {
        if (!self.sources[assetSource]) {
          self.sources[assetSource] = [ {
            "key" : assetKey,
            "label" : label
          } ];
        } else {
          //if(self.sources[assetSource].indexOf(assetKey) == -1) {
          if (_.findWhere(self.sources[assetSource], {
            "key" : assetKey
          }) == undefined)
            self.sources[assetSource].push({
              "key" : assetKey,
              "label" : label
            });
          //}
        }
      };

      //Add asset marker trip point to asset markers
        self.addMarkerToMap = function(key, newMarker, tripPoint) {
            //Push to assets
            if(self.bounce && (tripPoint.bounce && (tripPoint.bounce.value == "true" || tripPoint.bounce.value == true))) {
                newMarker.animation = google.maps.Animation.BOUNCE;
            }  
            
                self.assets[key]["markers"].push(newMarker);
                self.assets[key]["path"].push([ tripPoint.lat.value, tripPoint.long.value ]);
            
            	
            	if(self.selectedTrackedAsset == newMarker.assetId) {
                  	self.selectedTrackedMarker = newMarker;
              	}
            	
            	if(self.selectedAsset == key) {
                    $scope.$parent.marker = newMarker
                   // $scope.$apply()
                }
			if (!self.trackedAsset) {  
                //Keep track for clusterer view as a marker Object not as JSON
                var dynMkr = angular.copy(newMarker, {});
                dynMkr.position = new google.maps.LatLng(tripPoint.lat.value, tripPoint.long.value);
                var tmp = new google.maps.Marker(dynMkr);
                self.dynMarkers[key] = tmp;
                
                var heatmap = {};
                heatmap.location = dynMkr.position;
                heatmap.weight = (self.heatMapWeight) ? self.heatMapWeight : 40;
                self.heatMap[key] = heatmap;  
            }
        };

      //Control the asset markers trip points limits if maxAssetPoints defined, remove first pushed marker when limit reached
      self.controlVehicleTrips = function(key) {
        if(self.maxAssetPoints) {
          if (self.assets[key]["markers"].length >= self.maxAssetPoints) {
          	self.assets[key]["markers"].shift();
            self.assets[key]["path"].shift();
          }
        }
      };

      self.instantiateAsset = function(assetKey) {
        self.assets[assetKey] = {
          "markers" : [],
          "path" : [],
          "pathColor" : "",
          "latestMarker" : {},
          "strokeOpacity" : self.pathStrokeOpacity,
          "strokeWeight" : self.pathStrokeWeight,
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
      var buildAssetLabel = function(make, model, assetId, tripPoint) {
        if(self.onBuildAssetTitle && typeof self.onBuildAssetTitle() == "function") {
            return self.onBuildAssetTitle()(tripPoint);
        } else {
            var assetLabel = (make) ? (make + " ") : "";
            assetLabel += (model) ? (model + "-") : "";
            assetLabel += assetId;
            return assetLabel;
        }
        
      };


      /** [04/02/2020] Nad: close info window (when click on map UIComponents/dashboard/frontend/components/map/map.html L.39) */
      self.hideinfoWindow = function(){
        if(self.clickOutsideCloseInfoWindow) {
        		if (self.infoWindow != null) {
          		self.infoWindow.close();
        		}
        } else {
        		return;
        }
        
      };

      //Focus on asset when selected from list box, on when clicked on its marker on map
      //Close all info windows, redraw map with only asset trips tracked
      //If all assets are selected redraw all assets
      self.focusOnAsset = function(assetKey, marker, onHover) {
        if(self.onSelectAsset && typeof self.onSelectAsset() == "function"){
            self.onSelectAsset()(marker, onHover);
        }
        self.selectedAsset = assetKey;
        //console.log("selectedAsset", self.selectedAsset)
        //console.log("markerInfoWindow", self.markerInfoWindow)
        self.showDetailedMap = true;
        if (self.infoWindow != null) {
          self.infoWindow.close();
        }
        if (self.selectedAsset == "all") {
          self.detailedmapzoom = self.detailedZoomMin;
          self.searchText = '';
        } else {
          self.searchText = self.assets[assetKey].latestMarker.display;
          if(onHover!==true) {// si click, pas hover
            self.mapcenter = self.assets[self.selectedAsset].latestMarker.position;
            self.detailedmapzoom = self.focusedMarkerZoom;
          }
        }
        //self.renderAssets(); //MFE: do not hide remaining asset on focus
      };

      //Show asset info in an info window
      self.showAssetInfo = function(event, eventName, marker, assetKey, tripKey, id) {
        if(eventName == "mouseover" && self.markerHoverWindow == false) {
            return;
         }
        console.log("Show assetInfo assetKey", assetKey)
        self.selectedAsset = assetKey;
        self.focusOnAsset(assetKey, marker,  (eventName == "mouseover"));
        var markerEl = (event) ? this : null;
        //console.log("self.$wdgid", self.$wdgid);
        NgMap.getMap({
          id : 'detailed-'+self.$wdgid //TODO: MAke id parametrable or change selector if possible
        }).then(
          function(map) {
            //Open info window
            $scope.$parent.marker = marker/**_.findWhere(
              self.assets[assetKey]["markers"], {
                "id" : id
              })**/
            //In case marker wasn't click markerEl = this would be null
            markerEl = (markerEl) ? markerEl : _.findWhere(map.markers, {data: marker.id})
            var infoWindow = "infoWindowTemplate_"+ $scope.$parent.marker.source;
            //console.log("Info window", infoWindow)
            //console.log("self.markerInfoWindow", self.markerInfoWindow)
            //console.log("$scope.map.infoWindows", map.infoWindows)
            $scope.map = map;
            if(self.markerInfoWindow) {
                if($scope.map.infoWindows[infoWindow]) {
                 	$scope.map.showInfoWindow(event, infoWindow, markerEl);
                 	//Keep track of opened info window
                 	self.infoWindow = $scope.map.infoWindows[infoWindow];
              } else if(self.customDefaultInfoWindow && $scope.map.infoWindows[self.customDefaultInfoWindow]){
                 	$scope.map.showInfoWindow(event, self.customDefaultInfoWindow, markerEl);
                 	//Keep track of opened info window
                 	self.infoWindow = $scope.map.infoWindows[self.customDefaultInfoWindow];
              } else {
                    $scope.marker = marker;
                	var infoWindow = 'infoWindowTemplate_default_'+self.$wdgid
                	$scope.map.showInfoWindow(event, infoWindow, markerEl);
                	self.infoWindow = $scope.map.infoWindows[infoWindow];
              }
           }


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

      self.isEmptyObject = function(obj) {
        return (Object.keys(obj).length == 0);
      };
      
      
      
      self.drawingControl = ["rectangle", "circle", "polygon"];
      self.drawingOptions = {position: 'TOP_CENTER',drawingModes:['rectangle', 'circle', 'polygon']}
      self.geoFencesList = [];
      self.geofencesVisible = true;

      self.overlaySettings = {"fillColor": "#444", "fillOpacity": 0.2, "strokeWeight": 3, "strokeColor": "#ff8c00", "clickable": true, "zIndex": 1, "editable": true, "draggable": true};

        
      //Load the stored geofences
      self.loadGeofences = function() {
          
          
           if(self.geofenceData["api-params"]) {
                self.geofenceData["api-params"]["assetId"] = self.selectedAsset;
            } else {
                self.geofenceData["api-params"] =  {"assetId": self.selectedAsset};
            }

        
            var requestInfo = {
                "api": self.geofenceData["load-api"],
                "transport": self.geofenceData.transport || self.transport,
                "apiParams": self.geofenceData["api-params"],
                "useWindowParams": self.geofenceData["use-window-params"],
                "httpMethod": self.geofenceData["http-method"],
                "widgetId": $scope.$id
            };
          
           dataService.scriptrRequest(requestInfo, self.consumeLoadedGeofences.bind(self));

        //TODO: Put a loading on get & remove when response received
     };
        
      
      self.consumeLoadedGeofences = function(geofences) {
           self.geofencesLoaded = true;
          
          _.each(geofences, function(overlayData) {
              drawGeofence(overlayData, null)
          });
          
          NgMap.getMap({id:'detailed-'+self.$wdgid}).then(function(map) {
                 self.attachGeofencesToMap(map)
          });
             
          NgMap.getMap({id:'clustered-'+self.$wdgid}).then(function(map) {
              	 self.attachGeofencesToMap(map)
          });
         
      }
      
      
      self.attachGeofencesToMap = function(map) {
          _.each(self.geoFencesList, function(overlayData) {
              overlayData.overlayInstance.setMap(map);
          })
      }

      var drawGeofence = function(overlayInfo, map) {
          var props = {};
          props["fillColor"] = self.overlaySettings["fillColor"];
          props["fillOpacity"] = self.overlaySettings["fillOpacity"];
          props["strokeWeight"] = self.overlaySettings["strokeWeight"];
          props["strokeColor"] = self.overlaySettings["strokeColor"];
          props["clickable"] = self.overlaySettings["clickable"];
          props["zIndex"] = self.overlaySettings["zIndex"];
          props["editable"] = self.overlaySettings["editable"];
          props["draggable"] = self.overlaySettings["draggable"];
          if(map) {
              props["map"] = map;
          }
          var overlayData = (typeof overlayInfo == "string" ) ? JSON.parse(overlayInfo) : overlayInfo;
          var type = overlayData.type;
          var overlay = null;
          if(type == "rectangle") {
              props["bounds"] = overlayData.overlay.bounds;
              overlay = new google.maps.Rectangle(props);
          }

          if(type == "circle") {
              props["center"] = overlayData.overlay.center;
              props["radius"] = overlayData.overlay.radius;
              overlay = new google.maps.Circle(props);
          }

          if(type == "polygon") {
              props["path"] = overlayData.overlay.path;
              overlay = new google.maps.Polygon(props);
          }

          delete overlayData.overlay;
          delete overlayData.type; 
          if(overlay)
              self.setupOverlay(overlay, type, overlayData.dataModel);
      }
     
      var buildGeofenceEntry = function(geofence, type, props) {
         if(type == "circle") {
             return {"dataModel": props, "type": "circle", "overlay": {"radius": geofence.getRadius(), "center": geofence.getCenter()}, "overlayInstance": geofence};
         }
         
         if(type == "rectangle") {
            return {"dataModel": props, "type": "rectangle", "overlay": {"bounds": geofence.getBounds()}, "overlayInstance": geofence};
         }
         
         if(type == "polygon") {
             return {"dataModel": props, "type": "polygon", "overlay": {"path": geofence.getPath().getArray()}, "overlayInstance": geofence};
         }
         
         return;
     }
     self.createLocalGeofence =  function(geofence, type, props) {
         var geofenceEntry = buildGeofenceEntry(geofence, type, props);
         if(geofenceEntry) {
             self.geoFencesList.push(geofenceEntry);
             //console.log("Push to list: ", self.geoFencesList)
         }
         self.reminderToSave();
     }
     

     self.updateLocalGeofence =  function(toUpdateIdentifier, geofence) {
         _.each(self.geoFencesList, function(item, index, list){
             if(toUpdateIdentifier === item["dataModel"]["identifier"]) {
                 var geofenceEntry = buildGeofenceEntry(geofence, item.type, geofence.get("dataModel"));
                 if(geofenceEntry) {
                     list[index] = geofenceEntry;
                     //console.log("Push to list: ", self.geoFencesList)
                 }
             }
         })
         self.reminderToSave();
     }
        
      self.onMapOverlayCompleted = function(e){
        self.setupOverlay(e.overlay, e.type);
      } 

      self.setupOverlay = function(overlay, type, props) {
        //if no id passed to setup Generate default unique geofence identifier. PS: Unicity is validated client side per map
        var properties = {};
          
        //Generate default identifier and make sure it is unique
        var inUseIdentifiers = _.pluck(_.pluck(self.geoFencesList, "dataModel"), "identifier");
        do {
          self.geofencesIncrement++;
          var defaultIdentifier = "Geofence_" + self.geofencesIncrement;
        } while(inUseIdentifiers.indexOf(defaultIdentifier) > -1)
            
        var properties = (props && props.identifier) ? props :{"identifier": defaultIdentifier};
        overlay.set("dataModel",properties);
            
        self.createLocalGeofence(overlay, type, properties);
          
        //Edit Geofence, properties, in case newly created
        if(!props || !props.identifier) {
            self.rightClickedOverlay = overlay; //setup as right clicked and click on edit
            self.editSelectedGeofenceSettings();
        }
        
        self.disableContextMenuListener = null;
        
        google.maps.event.addListener(overlay, "mouseover", function(e) {
         	self.disableContextMenuListener = google.maps.event.addDomListener(document, "contextmenu", function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation(); 
                return false;
            })
         
        });
          
       google.maps.event.addListener(overlay, "mouseout", function(e) {
            if(self.disableContextMenuListener) {
                google.maps.event.removeListener( self.disableContextMenuListener);
            }
        });
          

        google.maps.event.addListener(overlay, "rightclick", function(e) {
          self.rightClickedOverlay = this;
          for (prop in e) {
            if (e[prop] instanceof MouseEvent) {
              mouseEvt = e[prop];
              var left = mouseEvt.clientX;
              var top = mouseEvt.clientY;
              menuBox = $element.find(".geofence-menu");
              menuBox.attr("style", 'left: '+left +'px; top:'+ top + 'px; display: block;');
              mouseEvt.preventDefault();
              self.geofenceMenuDisplayed = true;
            }
          }
          return false;
        });
          
        var updateOverlay = function(overlay) {
            var identifier = overlay.get("dataModel")["identifier"];
            self.updateLocalGeofence(identifier, overlay)
        }
        
        if(type == "circle") {
            google.maps.event.addListener(overlay, "center_changed", function() {
             	updateOverlay(this);
            });
            
            google.maps.event.addListener(overlay, "radius_changed", function() {
                updateOverlay(this);
            });
        }
          
          
        if(type == "rectangle") {
            google.maps.event.addListener(overlay, "bounds_changed", function() {
             	updateOverlay(this);
            });
        }

      };
        
        
     self.editSelectedGeofenceSettings = function() {
        var beforeUpdateIdentifier = null;
        if(self.rightClickedOverlay.get("dataModel"))
        	beforeUpdateIdentifier = self.rightClickedOverlay.get("dataModel")["identifier"];
         
        var inUseIdentifiers = _.pluck(_.pluck(self.geoFencesList, "dataModel"), "identifier");
        
        var model = {};
        if(self.rightClickedOverlay.get("dataModel")) {
           model = self.rightClickedOverlay.get("dataModel") 
        }
         
        model["inUseIdentifiers"] = _.filter(inUseIdentifiers, function(id) {return id != beforeUpdateIdentifier});
         
        var modalInstance = $uibModal.open({
              animation: true,
              component: 'mapModalComponent',
       		  size: 'md',
          	  scope: $scope,
              resolve: {
                widget: function () {
                  return {
                    "label":  "Geofence Properties",
                    "model": model ,
                    "schema": angular.copy(geofenceDetails.schema),
                    "form": angular.copy(geofenceDetails.form)
                  }
                }
              }
            });
            modalInstance.result.then(function (dataModel) {
              if(dataModel != "cancel") {
                  delete dataModel["inUseIdentifiers"];
                  self.rightClickedOverlay.set("dataModel", dataModel);
                  self.updateLocalGeofence(beforeUpdateIdentifier, self.rightClickedOverlay);
              } 
            }, function () {
                 console.info('modal-component for widget update dismissed at: ' + new Date());
            });
      }

     
      self.removeSelectedGeofence = function() {
          if(self.rightClickedOverlay.get("dataModel")) {
              var identifier = self.rightClickedOverlay.get("dataModel")["identifier"];
              self.geoFencesList = _.filter(self.geoFencesList, function(item, index, list){
                  return identifier != item["dataModel"]["identifier"]
              })
          }
          self.rightClickedOverlay.setMap(null);
          
          self.reminderToSave();
      }
      

      self.drawingMessages = null;
      self.drawingMessagesTimeout = null;

      self.clearAllGeofences = function() {
        _.each(self.geoFencesList, function(geofence) {
            geofence.overlayInstance.setMap(null);
        });
        self.geoFencesList = [];
        self.reminderToSave();
      };
        
      self.hideShowGeofences = function() {
          var geofenceData = _.map(self.geoFencesList, function(item) {
              return item.overlayInstance.setVisible(!self.geofencesVisible);
          })
          self.geofencesVisible = !self.geofencesVisible;
      }

      self.saveAllGeofences = function() {
       // var copyGeofenceList = angular.copy(self.geoFencesList);
        var geofenceData = _.map(self.geoFencesList, function(item) {
            return {"dataModel": item.dataModel, "overlay": item.overlay, "type": item.type}
        })
        
        if(self.geofenceData["api-params"]) {
            self.geofenceData["api-params"]["geofences"] = geofenceData;
        } else {
            self.geofenceData["api-params"] =  {"geofences": geofenceData};
        }
          
        
            var requestInfo = {
                "api": self.geofenceData["save-api"],
                "transport": self.geofenceData.transport || self.transport,
                "apiParams": self.geofenceData["api-params"],
                "useWindowParams": self.geofenceData["use-window-params"],
                "httpMethod": self.geofenceData["http-method"],
                "widgetId": $scope.$id
            };
            dataService.scriptrRequest(requestInfo, function(data) {
                self.drawingMessages = JSON.stringify(data);
                self.drawingMessagesTimeout = $timeout(function () { self.drawingMessages = null }, 5000);  
            });
      }
      
     self.reminderToSave = function() {
         self.drawingMessages = "Do not forget to save your changes, once you are done defining your geofences.";
         self.drawingMessagesTimeout = $timeout(function () { self.drawingMessages = null }, 5000);  
     }
      
     var showRectDrawingMode = function() {
         self.drawingOptions = {position: 'TOP_CENTER',drawingModes:["rectangle", "circle", "polygon"]};
      }

      var hideRectDrawingMode = function() {
        self.drawingOptions = {position: 'TOP_CENTER',drawingModes:[]};
      }
	
   }
}).constant("defaultConstants", {
  sourceIcon : {
    "default": {
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAoCAMAAAA1+gEjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM5Q0JGQjdENzVBNTExRTY4RDczRThCNDhCQkVDQ0REIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM5Q0JGQjdFNzVBNTExRTY4RDczRThCNDhCQkVDQ0REIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzlDQkZCN0I3NUE1MTFFNjhENzNFOEI0OEJCRUNDREQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzlDQkZCN0M3NUE1MTFFNjhENzNFOEI0OEJCRUNDREQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4YqnkxAAAAY1BMVEUAAAD///8fitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitItkdU7mdhJoNpXp91ztuOBveaPxemdzOur0+652vHH4vTV6ffj8Pnx+Pz////2ehAtAAAAEXRSTlMAABAgMEBQYHCAj5+vv8/f7/4ucL8AAAFeSURBVBgZfcEBYqIwFEXRP1FBEUtuVEAa5O1/lY0iFrTOOfaU7Stuqn1mL9zO88vvnM1sKpaqjT3l3NTdVdK1q7nJ7SEnqa+aXGuS3O4yIHxr7jsAmSXOQ+i11AfwzswKIOpVBAozB9RKYmAUopIacLYFBiWnYxwdz0oGYGsHqJX0dBp19EpqOJiHTknNoNFAraQDb0CU1DDXSIqAAZJ6QsOkCfSSAAMGKdLqxOikligNgAFRioQTk1MgShGwEi5SZClKFzhYDmcpshSlM2zNeYiSoNWoBUkRWJnt4SwpcNHoQpB0htLMVkArXaMm8Sq1wMaSPdBpqQMOdrPyQKO5hmRjdzuSY6dJdyQ52MhV3IS6izF2deBuZQ8b3hX2VPLKO3tynheZzWQslbZQMOdXtuAqZrb2Ys2v0t5smXhn70oeMvuD++KusD+tPcmXfZADfm2fFJDZZ2VhC//+5wfrMULZDg3JQwAAAABJRU5ErkJggg=="  	
    }
  }
}).component('mapModalComponent', 
  {
    bindings: {
        
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    templateUrl: '/UIComponents/dashboard/frontend/components/map/modalContent.html',
    controller: function ($scope) {
        
        var self=this;
        this.$onInit = function () {

            this.widget = this.resolve.widget;
            $scope.$broadcast('schemaFormRedraw')

            this.frmGlobalOptions = {
              "destroyStrategy" : "remove",
              "formDefaults": {"feedback": false}
            }
            
            if(this.widget) {
                if(this.widget.schema) {
                  this.schema =  angular.copy(this.widget.schema)
                } 
                if(this.widget.form) {
                   this.form =   angular.copy(this.widget.form)
                }

                this.model =  (this.widget.model) ?  angular.copy(this.widget.model) : {}
         	 }

      };
        

      this.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        // Then we check if the form is valid
        if (form.$valid) {
          this.close({$value: this.model});
        } 
      };

      this.onCancel = function (myForm) {
        this.schema = {};
        this.form = {}
        this.dismiss({$value: 'cancel'});
        console.log("Dissmissed")
      };

    }
});