angular.module("Imagemap", ['ui-leaflet', 'ComponentsCommon', 'DataService', 'schemaForm', "angular-underscore/filters", "pascalprecht.translate"]);
angular.module('Imagemap').constant(
  "zoneDetails", {
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
    "msgTag": "@",
    "onFormatData": "&",
    "fetchDataInterval": "@",
    "useWindowParams": "@",
    "serviceTag": "@", // Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed
    "heatmap": "<?",
    "data": "<?",
    "width": "@",
    "height": "@",
    "minZoom": "@",
    "maxZoom": "@",
    "imageUrl": "@",
    "imageRatio": "@",
    "heatmapOptions": "<?",
    "markersData": "<?", // object of objects with key and: lat, lng,// group(optional), icon(url, unit}
    "volatileMarkers": "@",
    "showMarkers": "<?",
    "markersConfig": "<?", //markersApi @, markersApiTransport @, markersApiParams <?, markersApiHttpMethod
    "enableDrag": "<?", //True/false
    "dragConfig": "<?",//dragApi @, dragApiTransport @, dragApiParams <?, dragApiHttpMethod @,
    "enableDraw": "<?", // True/false to activate control of drawing over map
    "drawConfig": "<?" //updateZonesApi, getZonesApi, updateZonesApiTransport, getZonesApiTransport,updateZonesApiParams, getZonesApiParams, updateZonesApiHttpMethod, getZonesApiHttpMethod
  },
  templateUrl: '/UIComponents/dashboard/frontend/components/imagemap/imagemap.html',
  controller: function ($scope, httpClient, wsClient, $interval, dataService, $timeout, $window, $element, leafletData, leafletBoundsHelpers, leafletLayerHelpers, leafletControlHelpers, $uibModal, zoneDetails) {
    var self = this;
    self.$onInit = function () {
      self.msgTag = (self.msgTag) ? self.msgTag : null;
      self.useWindowParams = (self.useWindowParams) ? self.useWindowParams : "true";
      self.icon = (self.icon) ? self.icon : '//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/imagemap-bg.svg';

      self.heatmap = (self.heatmap) ? self.heatmap : false;
      self.cw = $element.parent().width();
      self.ch = $element.parent().height();

      self.minZoom = (self.minZoom) ? parseInt(self.minZoom) : 0;
      self.maxZoom = (self.maxZoom) ? parseInt(self.maxZoom) : 3;

      self.imageRatio = (self.imageRatio) ? parseFloat(self.imageRatio) : 1;
      self.width = (self.width) ? (parseInt(self.width) * self.imageRatio) : 500;
      self.height = (self.height) ? (parseInt(self.height) * self.imageRatio) : 500;

      self.zonesList = [];
      self.zonesIncrement = 0;
      self.editedZoneId = "";

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
          tmp.icon.html = self.buildMarkerHtml(tmp,  markerValue);
          self.markers[theMarker.key] =  tmp;
        }
      }

      // timer needs to be one second in order to wait not only for the
      // map to load but also the markers to load
      setTimeout(function () {
        leafletData.getMap(self.id).then(function (map) {
          map.invalidateSize(false);
          /*
			 * leafletData.getLayers().then(function(baselayers) { if(self.enableDraw) {
			 * var drawnItems = baselayers.overlays.draw; map.on('draw:created',
			 * function (e) { var layer = e.layer; drawnItems.addLayer(layer);
			 * console.log(".... " + JSON.stringify(layer.toGeoJSON())); }); }
			 * });
			 */
        });
      }, 1000);

      $scope.$on('leafletDirectiveMarker.'+self.id+'.dragend', function(event, args){
        console.log(args.leafletObject._latlng); 
        // self.updateMarker(args.modelName, args.model.lng, args.model.lat)
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


      
      // add draw layer in case enabled
      if (true) {
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
      }
      
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

    
    self.$postLink = function () {
      self.timeoutId = $timeout(self.resize.bind(self), 100);
      angular.element($window).on('resize', self.onResize);
      if (self.enableDraw)
        self.initDrawDataService();
      if (self.showMarkers) { // Fetch data from the backend
        self.initDataService();
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
			 * if (self.markersData == null) { self.noResults = true; }
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
    
    self.saveAllZones = function (e) {
    	//prepare data to save to the backend
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
        //send data to the backend to be saved
        self.updateDrawDataService(requestData);

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

    self.updateMarker = function (id, lng, lat) {

      if (self.enableDrag) {
        var requestInfo = {
          "api": self.dragConfig.dragApi,
          "transport": self.dragConfig.dragApiTransport,
          "msgTag": self.msgTag,
          "apiParams": angular.merge({
            xAxis: lng,
            yAxis: lat,
            id: id
          }, self.dragConfig.dragApiParams),
          "useWindowParams": self.useWindowParams,
          "httpMethod": self.dragConfig.dragApiHttpMethod,
          "widgetId": $scope.$id
        };
        dataService.scriptrRequest(requestInfo);
      }
    };

    self.updateDrawDataService = function (req) {
      var requestInfo = {
        "api": self.drawConfig.updateZonesApi,
        "transport": self.drawConfig.updateZonesApiTransport,
        "msgTag": self.msgTag,
        "apiParams": angular.merge(req, self.drawConfig.updateZonesApiParams),
        "useWindowParams": self.useWindowParams,
        "httpMethod": self.drawConfig.updateZonesApiHttpMethod,
        "widgetId": $scope.$id
      };
      dataService.scriptrRequest(requestInfo, self.consumeUpdateDrawData.bind(self));
    };

    self.initDrawDataService = function () {
      var requestInfo = {
        "api": self.drawConfig.getZonesApi,
        "transport": self.drawConfig.getZonesApiTransport,
        "msgTag": self.msgTag,
        "apiParams": self.drawConfig.getZonesApiParams,
        "useWindowParams": self.useWindowParams,
        "httpMethod": self.drawConfig.getZonesApiHttpMethod,
        "widgetId": $scope.$id
      };
      dataService.scriptrRequest(requestInfo, self.consumeDrawData.bind(self));


    };

    self.buildMarkerHtml = function(theMarker, markerValue) {
      var html = "<div class='"+ ((theMarker.class) ? theMarker.class : "") +" marker-pin'><div class='marker-content'>";

      if(theMarker.icon && theMarker.icon.iconUrl ) {
        html +="<img class='markerImg' src='" + theMarker.icon.iconUrl + "'/>";
      }

      html +="<span class='indicator-value'>" + ((markerValue)? markerValue : "?") + ((theMarker.icon && theMarker.icon.unit) ?  ("<br/>(" + theMarker.icon.unit + ")" )  : "") + "</span>";

      html += "</div></div>";
      return html;
    }

    self.initDataService = function () {
      var requestInfo = {
        "api": self.markersConfig.markersApi,
        "transport": self.markersConfig.markersApiTransport,
        "msgTag": self.msgTag,
        "apiParams": self.markersConfig.markersApiParams,
        "useWindowParams": self.useWindowParams,
        "httpMethod": self.markersConfig.markersApiHttpMethod,
        "widgetId": $scope.$id
      };
      dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));
      if (self.fetchDataInterval && !self.refreshTimer) {
        // Assuming this is success
        self.refreshTimer = $interval(
          function () {
            self.initDataService()
          }, self.fetchDataInterval * 1000);
      }
    };

    self.consumeUpdateDrawData = function (data) {
    	//TODO: display a message that the data was successfully saved to the backend
    };
    
    self.openModal = function(model){
    	
    	 /** ****** */
        var modalInstance = $uibModal.open({
          animation: true,
          component: 'mapModalComponent',
          size: 'md',
          scope: $scope,
          resolve: {
            widget: function () {
              return {
                "label": "Zone Properties",
                "model": model,
                "schema": angular.copy(zoneDetails.schema),
                "form": angular.copy(zoneDetails.form)
              }
            }
          }
        });
        modalInstance.result.then(function (dataModel) {
          if (dataModel != "cancel") {
            for (var x = 0; x < self.zonesList.length; x++) {
              if (self.zonesList[x].id == self.editedZoneId) {
                var oldId = self.zonesList[x].id;
                self.zonesList[x].id = dataModel.identifier;
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
          }
        }, function () {
          console.info('modal-component for widget update dismissed at: ' + new Date());
        });
        /** ****** */
    }
    
    self.consumeDrawData = function (data) {
      if (self.enableDraw) {
        leafletData.getMap(self.id).then(function (map) {
          self.drawnItems = new L.FeatureGroup();

          for (var key in data) {
            var jsonData = JSON.parse(data[key]);
            var layer = new L.GeoJSON(jsonData);
            jsonData.id = key;
            self.zonesList.push(jsonData);
            // map.addLayer(layer);
            leafletLayerHelpers.safeAddLayer(map, layer);
            layer.getLayers()[0].getElement().setAttribute("identifier", key);
            layer.addEventListener('contextmenu', function(e){
              // alert(4444);
            	var id = e.target.getLayers()[0].getElement().getAttribute("identifier");
            	self.editedZoneId = id;
            	var model = {};
                var inUseIdentifiers = _.pluck(self.zonesList, "id");
                model.identifier = id;
                model.inUseIdentifiers = inUseIdentifiers;
            	self.openModal(model);
						});
            self.drawnItems.addLayer(layer.getLayers()[0]);
            /*
            var jsonData = {"type":"Feature","properties":{},"geometry":{"type":"Circle","coordinates":[100,51.53]}};
            var layer = new L.GeoJSON(jsonData);
            jsonData.id = "11111";
            self.zonesList.push(jsonData);
            // map.addLayer(layer);
            leafletLayerHelpers.safeAddLayer(map, layer);
            layer.getLayers()[0].getElement().setAttribute("identifier", key);
            layer.addEventListener('contextmenu', function(e){
              // alert(4444);
            	var id = e.target.getLayers()[0].getElement().getAttribute("identifier");
            	self.editedZoneId = id;
            	var model = {};
                var inUseIdentifiers = _.pluck(self.zonesList, "id");
                model.identifier = id;
                model.inUseIdentifiers = inUseIdentifiers;
            	self.openModal(model);
						});
            
            self.drawnItems.addLayer(layer.getLayers()[0]);
            */
           
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
                for (var x = 0; x < self.zonesList.length; x++) {
                  if (self.zonesList[x].id == layerId) {
                    self.zonesList.splice(x, 1);
                    break;
                  }
                }
              }
            });
          });

          map.on('draw:created', function (e) {
            var type = e.layerType,
              layer = e.layer;

            layer.addEventListener('contextmenu', function(e){
              // alert(4444);
            	var id = e.target.getElement().getAttribute("identifier");
            	self.editedZoneId = id;
            	var model = {};
            	var inUseIdentifiers = _.pluck(self.zonesList, "id");
            	model.identifier = id;
            	model.inUseIdentifiers = inUseIdentifiers;
            	self.openModal(model);
            });
            
            if (type === 'marker') {
              layer.bindPopup('A popup!');
            }

            self.drawnItems.addLayer(layer);
            console.log(".... " + JSON.stringify(layer.toGeoJSON()));
            var zoneEntry = layer.toGeoJSON();
            var inUseIdentifiers = _.pluck(self.zonesList, "id");
            do {
              self.zonesIncrement++;
              var defaultIdentifier = "Zone_" + self.zonesIncrement;
            } while (inUseIdentifiers.indexOf(defaultIdentifier) > -1)
            	zoneEntry.id = defaultIdentifier;
            self.zonesList.push(zoneEntry);
            self.editedZoneId = defaultIdentifier;
            layer.getElement().setAttribute("identifier", defaultIdentifier);
            var model = {};
            model.identifier = defaultIdentifier;
            model.inUseIdentifiers = inUseIdentifiers;
            self.openModal(model);
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
        	var newmarkers = {};
        	 self.markersData = data;
        	 for (var i = 0; i < self.markersData.length; i++) {
        		 var theMarker = self.markersData[i];
        		 var key = theMarker.key;
        		 var value = theMarker.value;
        		 var volatile = Boolean(theMarker.volatile);
        		 var draggable = theMarker.draggable;
        		 var iconUrl = (theMarker.icon && theMarker.icon.url) ? theMarker.icon.url : "";
        		 var iconUnit = (theMarker.icon && theMarker.icon.unit) ? theMarker.icon.unit : "";
        		 var clss = (theMarker.class) ? theMarker.class : "";
        		 var group = theMarker.group;
        		 var lat = theMarker.lat;
        		 var lng = theMarker.lng;
        		 var tmp = {};
        		 
        		 if(volatile || (!volatile && (!self.markers || !self.markers[key]))){
        			 if(lat!=null && lng!=null){
            			 tmp = {
    	                  lat: lat,
    	                  lng: lng,
    	                  icon: {
    	                    className: 'custom-div-icon',
    	                    type: 'div',
    	                    html: "<div class='marker-pin'><div class='marker-content'><span class='indicator-value'>" + value + "</span></div></div>",
    	                    iconSize: [90, 90],
    	                    iconAnchor: [0, 0],
    	                    popupAnchor: [15, -30]
    	                  }
    	                };
        			 }
        			 if (draggable && (draggable == "true" || draggable == true)) {
        				 tmp["draggable"] = true;
        			 }
    				 tmp.icon["iconUrl"] = iconUrl;
    				 tmp.icon["unit"] = iconUnit;
    				 tmp.icon["class"] = clss;
    				 tmp.icon.html = self.buildMarkerHtml( tmp,  value);
        		 }else{
        			 tmp = self.markers[key];
        			 if(tmp!=null){
        				 tmp.icon.html =  self.buildMarkerHtml(tmp, value);
        			 }
        		 }
        		 newmarkers[theMarker.key] = tmp;
        	 }
        	 self.markers = newmarkers;
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