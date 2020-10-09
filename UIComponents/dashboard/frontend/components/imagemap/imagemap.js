angular.module("Imagemap", ['ui-leaflet', 'ComponentsCommon', 'DataService', 'schemaForm', "angular-underscore/filters", "pascalprecht.translate"]);
angular.module('Imagemap').constant(
  "geofenceDetails", {
    "form": [{
      "type": "section",
      "htmlClass": "col-xs-12",
      "items": [{
        "key": "identifier",
        validationMessage: {
          "unique": 'Identifier already taken'
        },
        $validators: {
          "unique": function (modelValue, viewValue, model, form) {
            if (model["inUseIdentifiers"].indexOf(modelValue) != -1) {
              return false;
            }
            return true
          }
        }
      }]
    }],
    "schema": {
      "type": "object",
      "title": "Schema",
      "properties": {
        "identifier": {
          "title": "Identifier",
          "type": "string",
        }
      },
      "required": []
    }
  }).component('scriptrImagemap', {
  bindings: {
    "onLoad": "&onLoad",
    "api": "@",
    "apiTransport": "@",
    "apiParams": "<?",
    "apiHttpMethod": "@",
    "msgTag": "@",
    "onFormatData": "&",
    "fetchDataInterval": "@",
    "useWindowParams": "@",
    "serviceTag": "@", // Service Tag is use on the update-data event, as a
    // key to retrieve from the data. If not available
    // all passed data will be consumed
    "heatmap": "<?",
    "dynamicMarkers": "@",
    "draggableMarkers": "@",
    "dragApi": "@",
    "dragApiTransport": "@",
    "dragApiParams": "<?",
    "dragApiHttpMethod": "@",
    "data": "<?",
    "width": "@",
    "height": "@",
    "minZoom": "@",
    "maxZoom": "@",
    "imageUrl": "@",
    "imageRatio": "@",
    "heatmapOptions": "<?",
    "markersData": "<?", // object of objects with key and: lat, lng,
    // group(optional), icon(url, unit}
    "draw": "<?", // True/false to activate control of drawing over map
    "updateDrawApi": "@", // api to load, save drawing data
    "updateDrawApiTransport": "@", // api to load, save drawing data
    "updateDrawApiParams": "<?",
    "updateDrawHttpMethod": "@",
    "getDrawApi": "@", // api to load, save drawing data
    "getDrawApiTransport": "@", // api to load, save drawing data
    "getDrawApiParams": "<?",
    "getDrawApiHttpMethod": "@"
  },
  templateUrl: '/UIComponents/dashboard/frontend/components/imagemap/imagemap.html',
  controller: function ($scope, httpClient, wsClient, $interval, dataService, $timeout, $window, $element, leafletData, leafletBoundsHelpers, leafletLayerHelpers, leafletControlHelpers, $uibModal, geofenceDetails) {
    var self = this;
    self.$onInit = function () {
      self.apiTransport = (self.apiTransport) ? self.apiTransport : null;
      self.msgTag = (self.msgTag) ? self.msgTag : null;
      self.useWindowParams = (self.useWindowParams) ? self.useWindowParams : "true";
      self.icon = (self.icon) ? self.icon : '//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/imagemap-bg.svg';

      self.heatmap = (self.heatmap) ? self.heatmap : false;
      self.cw = $element.parent().width();
      self.ch = $element.parent().height();

      // var iw = (self.width)? parseInt(self.width) : 500;
      // var ih = (self.height)? parseInt(self.height) : 500;
      // var maxZoom = Math.ceil( Math.log( (self.cw/iw > self.ch/ih ?
      // iw/self.cw : ih/self.ch) ) / Math.log(2) );

      self.minZoom = (self.minZoom) ? parseInt(self.minZoom) : 0;
      self.maxZoom = (self.maxZoom) ? parseInt(self.maxZoom) : 3;

      self.imageRatio = (self.imageRatio) ? parseFloat(self.imageRatio) : 1;
      self.width = (self.width) ? (parseInt(self.width) * self.imageRatio) : 500;
      self.height = (self.height) ? (parseInt(self.height) * self.imageRatio) : 500;

      self.geoFencesList = [];
      self.geofencesIncrement = 0;
      self.editedGeofenceId = "";

      self.id = "imagemap-" + $scope.$id;

      if(self.markersData){
        self.markers = {};
        for(var i = 0; i < self.markersData.length; i++){
          var theMarker = self.markersData[i];
          var markerValue = ((self.data[theMarker.key])? self.data[theMarker.key] : null);
          var theMarker = self.markersData[i];
          var tmp = {
            lat: theMarker.lat * self.imageRatio, 
            lng: theMarker.lng * self.imageRatio, 
            icon: {
              className: 'custom-div-icon',
              type: 'div',
              html: "<div class='marker-pin'><div class='marker-content'><span class='indicator-value'>" + ((markerValue)? markerValue : "?") + "</span></div></div>",
              iconAnchor: [0, 0],
              popupAnchor: [15, -30]
            },
          };
          if (theMarker.draggable && (theMarker.draggable == "true" || theMarker.draggable == true)) {
            tmp["draggable"] = true;
          }
          if (theMarker.group) {
            tmp["group"] = theMarker.group;
          }
          if (theMarker.icon && theMarker.icon.url) {
            tmp.icon["iconUrl"] = theMarker.icon.url;
          }
          if (theMarker.icon && theMarker.icon.unit) {
            tmp.icon["unit"] = theMarker.icon.unit;
          }
          if(theMarker.class) {
            tmp["class"] = theMarker.class;
          }
          tmp.icon.html = buildMarkerHtml(tmp,  markerValue);
          self.markers[theMarker.key] =  tmp;
        }
      }

      // timer needs to be one second in order to wait not only for the
      // map to load but also the markers to load
      setTimeout(function () {
        leafletData.getMap(self.id).then(function (map) {
          map.invalidateSize(false);
          /*
           * leafletData.getLayers().then(function(baselayers) {
           * if(self.draw) { var drawnItems =
           * baselayers.overlays.draw; map.on('draw:created', function
           * (e) { var layer = e.layer; drawnItems.addLayer(layer);
           * console.log(".... " + JSON.stringify(layer.toGeoJSON()));
           * }); } });
           */
        });
      }, 1000);

      //if(self.draggableMarkers!=null && self.draggableMarkers){
      $scope.$on('leafletDirectiveMarker.'+self.id+'.dragend', function(event, args){
        console.log(args.leafletObject._latlng); 
        // updateMarker(args.modelName, args.model.lng, args.model.lat)
      });
      // }


      self.defaults = {
        crs: L.CRS.Simple,
        maxZoom: self.maxZoom
      };
      self.center = {
        lat: 0,
        lng: 0,
        zoom: self.minZoom
      };


      self.imageUrl = (self.imageUrl) ? self.imageUrl : '//s3.amazonaws.com/scriptr-cdn/compagno/HVAC-system-7.png';


      self.layers = {
        baselayers: {
          myLayer: {
            name: 'Base Layer',
            type: 'imageOverlay',
            url: self.imageUrl,
            bounds: [
              [self.height, 0],
              [0, self.width]
            ],
            layerParams: {
              showOnSelector: false,
              noWrap: true,
            }
          }
        }
      }
      self.layers.overlays = {};
      // add draw layer in case enabled

      if (self.heatmap) {
        var _heatmapDefaultOptions = {
          minOpacity: 0.05,
          maxZoom: 0,
          radius: 30,
          blur: 15,
          max: 1.0,
          gradient: {
            0.1: 'blue',
            0.6: 'lime',
            1: 'red'
          }
        }
        var _heatmapOptions = (self.heatmapOptions) ? (_.extend(_heatmapDefaultOptions, self.heatmapOptions)) : _heatmapDefaultOptions;
        self.heatLayerInfo = {
          name: 'Heat Map',
          type: 'heat',
          layerOptions: _heatmapOptions,
          visible: true
        };
      }
      self.maxBounds = leafletBoundsHelpers.createBoundsFromArray([
        [self.height, 0],
        [0, self.width]
      ]);
    };

    self.saveAllGeofences = function (e) {
      var layers = self.drawnItems.getLayers();
      var requestData = [];
      for (var x = 0; x < layers.length; x++) {
        var layer = layers[x];
        var geoJSON = layer.toGeoJSON();
        var obj = {
          "type": geoJSON.geometry.type,
          "coordinates": geoJSON.geometry.coordinates
        };
        requestData[layer.getElement().getAttribute("identifier")] = obj;
      }
      updateDrawDataService(requestData);

    };

    self.$postLink = function () {
      self.timeoutId = $timeout(self.resize.bind(self), 100);
      angular.element($window).on('resize', self.onResize);
      if ((self.getDrawApiTransport == "wss" || self.getDrawApiTransport == "https") && self.draw && self.getDrawApi != null)

        initDrawDataService();
      if ((self.apiTransport == "wss" && (self.api || self.msgTag)) || (self.apiTransport == "https" && self.api)) { // Fetch
        // data
        // from
        // backend
        initDataService();
      } else if (self.data != null) { // set datas info when data binding
        // is changed, this allows the user
        // to change the data through a
        // parent controller
        $scope.$watch(function ($scope) {
          // wait for the timeout
          if ($scope.$ctrl.data) {
            return $scope.$ctrl.data
          }
        }, function (newVal, oldVal) {
          if (JSON.stringify(newVal)) {
            self.consumeData(newVal);
          }
        }, true);
      } else {
        // Listen on update-data event to build data
        $scope.$on("update-data", function (event, data) {
          if (data == null) {
            /*
             * if (self.markersData == null) { self.noResults =
             * true; }
             */
          } else {
            if (data[self.serviceTag]) {
              self.consumeData(data[self.serviceTag]);
            } else {
              self.consumeData(data);
            }
          }
        });
        $scope.$emit("waiting-for-data");
      }
    };
    self.onResize = function () {
      if (self.timeoutId != null) {
        $timeout.cancel(self.timeoutId);
      }
      self.timeoutId = $timeout(self.resize.bind(self), 100);
    };
    self.resize = function () {
      self.cw = $element.parent().width();
      self.ch = $element.parent().height();
      self.calculateNotificationsDisplay();
    };
    self.calculateNotificationsDisplay = function () {
      if ($element.parent() && $element.parent().innerWidth() < 240) {
        self.usePopover = true;
      } else {
        self.usePopover = false;
      }
    };
    self.$onDestroy = function () {
      if (self.msgTag) {
        wsClient.unsubscribe(self.msgTag, null, $scope.$id);
      }
      if (self.refreshTimer) {
        $interval.cancel(self.refreshTimer);
      }
      if (self.timeoutId != null) {
        $timeout.cancel(self.timeoutId);
      }
      angular.element($window).off('resize', self.onResize);
    };

    var updateMarker = function (id, lng, lat) {

      if (self.draggableMarkers) {
        var requestInfo = {
          "api": self.dragApi,
          "transport": self.dragApiTransport,
          "msgTag": self.msgTag,
          "apiParams": angular.merge({
            xAxis: lng,
            yAxis: lat,
            id: id
          }, self.dragApiParams),
          "useWindowParams": self.useWindowParams,
          "httpMethod": self.dragApiHttpMethod,
          "widgetId": $scope.$id
        };
        dataService.scriptrRequest(requestInfo);
      }
    };

    var updateDrawDataService = function (req) {
      var requestInfo = {
        "api": self.updateDrawApi,
        "transport": self.updateDrawApiTransport,
        "msgTag": self.msgTag,
        "apiParams": angular.merge(req, self.updateDrawApiParams),
        "useWindowParams": self.useWindowParams,
        "httpMethod": self.updateDrawApiHttpMethod,
        "widgetId": $scope.$id
      };
      dataService.scriptrRequest(requestInfo, self.consumeUpdateDrawData.bind(self));
    };

    var initDrawDataService = function () {

      var requestInfo = {
        "api": self.getDrawApi,
        "transport": self.getDrawApiTransport,
        "msgTag": self.msgTag,
        "apiParams": self.getDrawApiParams,
        "useWindowParams": self.useWindowParams,
        "httpMethod": self.getDrawApiHttpMethod,
        "widgetId": $scope.$id
      };
      dataService.scriptrRequest(requestInfo, self.consumeDrawData.bind(self));


    };

    var buildMarkerHtml = function(theMarker, markerValue) {
      var html = "<div class='"+ ((theMarker.class) ? theMarker.class : "") +" marker-pin'><div class='marker-content'>";

      if(theMarker.icon && theMarker.icon.iconUrl ) {
        html +="<img class='markerImg' src='" + theMarker.icon.iconUrl + "'/>";
      }

      html +="<span class='indicator-value'>" + ((markerValue)? markerValue : "?") + ((theMarker.icon && theMarker.icon.unit) ?  ("<br/>(" + theMarker.icon.unit + ")" )  : "") + "</span>";

      html += "</div></div>";
      return html;
    }

    var initDataService = function () {
      var requestInfo = {
        "api": self.api,
        "transport": self.apiTransport,
        "msgTag": self.msgTag,
        "apiParams": self.apiParams,
        "useWindowParams": self.useWindowParams,
        "httpMethod": self.apiHttpMethod,
        "widgetId": $scope.$id
      };
      dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));
      if (self.fetchDataInterval && !self.refreshTimer) {
        // Assuming this is success
        self.refreshTimer = $interval(
          function () {
            initDataService()
          }, self.fetchDataInterval * 1000);
      }
    };

    self.consumeUpdateDrawData = function (data) {
    };
    
    self.consumeDrawData = function (data) {
      if (self.draw) {
        leafletData.getMap(self.id).then(function (map) {
          self.drawnItems = new L.FeatureGroup();

          for (var key in data) {
            var jsonData = JSON.parse(data[key]);
            var layer = new L.GeoJSON(jsonData);
            jsonData.id = key;
            self.geoFencesList.push(jsonData);
            //map.addLayer(layer);
            leafletLayerHelpers.safeAddLayer(map, layer);
            layer.getLayers()[0].getElement().setAttribute("identifier", key);
            self.drawnItems.addLayer(layer.getLayers()[0]);
          }
          map.addLayer(self.drawnItems);
          var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
              polyline: {
                metric: true
              },
              polygon: {
                allowIntersection: false,
                showArea: true,
                drawError: {
                  color: '#b00b00',
                  timeout: 1000
                },
                shapeOptions: {
                  color: '#bada55'
                }
              },
              circle: {
                shapeOptions: {
                  color: '#662d91'
                }
              },
              marker: false
            },
            edit: {
              featureGroup: self.drawnItems,
              remove: true
            }
          });
          map.addControl(drawControl);

          map.on('draw:deletestop', function (e) {});

          map.on('draw:deleted', function (e) {
            var layers = e.layers;
            layers.eachLayer(function (layer) {
              // do whatever you want, most likely save back to db
              self.drawnItems.removeLayer(layer);
              var layerId = layer.getElement().getAttribute("identifier")
              if(layerId!=null){
                for (var x = 0; x < self.geoFencesList.length; x++) {
                  if (self.geoFencesList[x].id == layerId) {
                    self.geoFencesList.splice(x, 1);
                    break;
                  }
                }
              }
            });
          });

          map.on('draw:created', function (e) {
            var type = e.layerType,
              layer = e.layer;

            if (type === 'marker') {
              layer.bindPopup('A popup!');
            }

            self.drawnItems.addLayer(layer);
            console.log(".... " + JSON.stringify(layer.toGeoJSON()));
            var geoFenceEntry = layer.toGeoJSON();
            var inUseIdentifiers = _.pluck(self.geoFencesList, "id");
            do {
              self.geofencesIncrement++;
              var defaultIdentifier = "Geofence_" + self.geofencesIncrement;
            } while (inUseIdentifiers.indexOf(defaultIdentifier) > -1)
              geoFenceEntry.id = defaultIdentifier;
            self.geoFencesList.push(geoFenceEntry);
            self.editedGeofenceId = defaultIdentifier;
            layer.getElement().setAttribute("identifier", defaultIdentifier);

            var model = {};
            model.identifier = defaultIdentifier;
            model.inUseIdentifiers = inUseIdentifiers;
            /** ****** */
            var modalInstance = $uibModal.open({
              animation: true,
              component: 'mapModalComponent',
              size: 'md',
              scope: $scope,
              resolve: {
                widget: function () {
                  return {
                    "label": "Geofence Properties",
                    "model": model,
                    "schema": angular.copy(geofenceDetails.schema),
                    "form": angular.copy(geofenceDetails.form)
                  }
                }
              }
            });
            modalInstance.result.then(function (dataModel) {
              if (dataModel != "cancel") {
                for (var x = 0; x < self.geoFencesList.length; x++) {
                  if (self.geoFencesList[x].id == self.editedGeofenceId) {
                    var oldId = self.geoFencesList[x].id;
                    self.geoFencesList[x].id = dataModel.identifier;
                    var layers = self.drawnItems.getLayers();
                    for (var i = 0; i < layers.length; i++) {
                      if (layers[i]._layers==null && layers[i].getElement().getAttribute("identifier") == oldId) {
                        layers[i].getElement().setAttribute("identifier", dataModel.identifier);
                        break;
                      }
                    }
                    break;
                  }
                }
                // delete dataModel["inUseIdentifiers"];
                // self.rightClickedOverlay.set("dataModel", dataModel);
                // self.updateLocalGeofence(beforeUpdateIdentifier,
                // self.rightClickedOverlay);
              }
            }, function () {
              console.info('modal-component for widget update dismissed at: ' + new Date());
            });
            /** ****** */
          });

        });
      }
    };

    self.consumeData = function (data, response) {
      if (data.status && data.status == "failure") {
        self.noResults = true;
        self.dataFailureMessage = "Failed to fetch data.";
      } else {
        if (typeof self.onFormatData() == "function") {
          data = self.onFormatData()(data, self);
        }
        if (data) {
          self.hasData = true;
          self.noResults = false;
          self.stalledData = false;

          if (!self.heatmap) {
            if (self.dynamicMarkers) {
              self.markers = {};
              self.markersData = data;
              for (var i = 0; i < self.markersData.length; i++) {
                var theMarker = self.markersData[i];
                var tmp = {
                  lat: theMarker.lat,
                  lng: theMarker.lng,
                  icon: {
                    className: 'custom-div-icon',
                    type: 'div',
                    html: "<div class='marker-pin'><div class='marker-content'><span class='indicator-value'>" + theMarker.key + "</span></div></div>",
                    iconSize: [90, 90],
                    iconAnchor: [0, 0],
                    popupAnchor: [15, -30]
                  }
                };
                if (theMarker.draggable && (theMarker.draggable == "true" || theMarker.draggable == true)) {
                  tmp["draggable"] = true;
                }
                if (theMarker.icon && theMarker.icon.url) {
                  tmp.icon["iconUrl"] = theMarker.icon.url;
                }
                if (theMarker.icon && theMarker.icon.unit) {
                  tmp.icon["unit"] = theMarker.icon.unit;
                }
                if (theMarker.icon && theMarker.icon.unit && theMarker.icon.url) {
                  tmp.icon.html = "<div class='marker-pin'><div class='marker-content'><img class='markerImg' src='" + theMarker.icon.url + "'/><span class='indicator-value'>" + theMarker.key + " " + theMarker.icon.unit + "</span></div></div>"
                }

                self.markers[theMarker.key] = tmp;
              }
            } else {
              var dataKeys = Object.keys(data);
              for (var i = 0; i < dataKeys.length; i++) {
                var dataKey = dataKeys[i];
                if (self.markers[dataKey]) {
                  var tmp = buildMarkerHtml( self.markers[dataKey],  data[dataKey]);
                                      self.markers[dataKey].icon.html = buildMarkerHtml( self.markers[dataKey],  data[dataKey]);
                }
              }
            }
          } else {
            leafletData.getMap(self.id).then(function (map) {
              if (self.heatLayer) {
                leafletLayerHelpers.safeRemoveLayer(map, self.heatLayer);
              }

              _data = _.map(data, function (entry) {
                return [entry[0] * self.imageRatio, entry[1] * self.imageRatio, entry[2]]
              })
              self.heatLayerInfo["data"] = _data
              self.heatLayer = leafletLayerHelpers.createLayer(self.heatLayerInfo)
              try {
                leafletLayerHelpers.safeAddLayer(map, self.heatLayer);
              } catch (e) {
                console.error(e);
                setTimeout(function () {
                  leafletLayerHelpers.safeAddLayer(map, self.heatLayer);
                }, 1000);
              }

            });

          }
        } else {
          self.noResults = true;
          self.dataFailureMessage = "Failed to update data, invalid data format.";
          console.log(e);
        }
      }
    };
  }
}).constant("defaultConstants", {
  sourceIcon: {
    "default": {
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAoCAMAAAA1+gEjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM5Q0JGQjdENzVBNTExRTY4RDczRThCNDhCQkVDQ0REIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM5Q0JGQjdFNzVBNTExRTY4RDczRThCNDhCQkVDQ0REIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzlDQkZCN0I3NUE1MTFFNjhENzNFOEI0OEJCRUNDREQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzlDQkZCN0M3NUE1MTFFNjhENzNFOEI0OEJCRUNDREQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4YqnkxAAAAY1BMVEUAAAD///8fitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitIfitItkdU7mdhJoNpXp91ztuOBveaPxemdzOur0+652vHH4vTV6ffj8Pnx+Pz////2ehAtAAAAEXRSTlMAABAgMEBQYHCAj5+vv8/f7/4ucL8AAAFeSURBVBgZfcEBYqIwFEXRP1FBEUtuVEAa5O1/lY0iFrTOOfaU7Stuqn1mL9zO88vvnM1sKpaqjT3l3NTdVdK1q7nJ7SEnqa+aXGuS3O4yIHxr7jsAmSXOQ+i11AfwzswKIOpVBAozB9RKYmAUopIacLYFBiWnYxwdz0oGYGsHqJX0dBp19EpqOJiHTknNoNFAraQDb0CU1DDXSIqAAZJ6QsOkCfSSAAMGKdLqxOikligNgAFRioQTk1MgShGwEi5SZClKFzhYDmcpshSlM2zNeYiSoNWoBUkRWJnt4SwpcNHoQpB0htLMVkArXaMm8Sq1wMaSPdBpqQMOdrPyQKO5hmRjdzuSY6dJdyQ52MhV3IS6izF2deBuZQ8b3hX2VPLKO3tynheZzWQslbZQMOdXtuAqZrb2Ys2v0t5smXhn70oeMvuD++KusD+tPcmXfZADfm2fFJDZZ2VhC//+5wfrMULZDg3JQwAAAABJRU5ErkJggg=="
    }
  }
}).component('mapModalComponent', {
  bindings: {

    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: '/UIComponents/dashboard/frontend/components/imagemap/modalContent.html',
  controller: function ($scope) {

    var self = this;
    this.$onInit = function () {

      this.widget = this.resolve.widget;
      $scope.$broadcast('schemaFormRedraw')

      this.frmGlobalOptions = {
        "destroyStrategy": "remove",
        "formDefaults": {
          "feedback": false
        }
      }

      if (this.widget) {
        if (this.widget.schema) {
          this.schema = angular.copy(this.widget.schema)
        }
        if (this.widget.form) {
          this.form = angular.copy(this.widget.form)
        }

        this.model = (this.widget.model) ? angular.copy(this.widget.model) : {}
      }

    };


    this.onSubmit = function (form) {
      // First we broadcast an event so all fields validate themselves
      $scope.$broadcast('schemaFormValidate');
      // Then we check if the form is valid
      if (form.$valid) {
        this.close({
          $value: this.model
        });
      }
    };

    this.onCancel = function (myForm) {
      this.schema = {};
      this.form = {}
      this.dismiss({
        $value: 'cancel'
      });
      console.log("Dissmissed")
    };

  }
});