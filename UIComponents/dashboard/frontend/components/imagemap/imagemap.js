angular.module("Imagemap", ['ui-leaflet', 'ComponentsCommon', 'DataService']);
angular.module('Imagemap').component('scriptrImagemap',{
    bindings: {
        "onLoad" : "&onLoad",   
        "transport": "@",
        "api" : "@",
        "msgTag" : "@",
        "httpMethod": "@",
        "apiParams" : "<?",
        "onFormatData" : "&",
        "fetchDataInterval": "@",
        "useWindowParams": "@",
        "serviceTag": "@", //Service Tag is use on the update-data event, as a key to retrieve from the data. If not available all passed data will be consumed
        "heatmap": "<?",
        "dynamicMarkers": "@", 
      	"draggableMarkers": "@", 
	    "dragApi":"@",
        "data" : "<?",
        "width": "@",
        "height": "@",
        "minZoom": "@",
        "maxZoom": "@",
        "imageUrl": "@",
        "imageRatio": "@",
        "heatmapOptions": "<?",
        "markersData": "<?", //object of objects with key and: lat, lng, group(optional), icon(url, unit} 
        
        "draw": "<?", //True/false to activate control of drawing over map
        "drawApi": "<?" // api to load, save drawing data
    },
    templateUrl : '/UIComponents/dashboard/frontend/components/imagemap/imagemap.html',
    controller : function($scope, httpClient, wsClient, $interval, dataService, $timeout, $window, $element, leafletData, leafletBoundsHelpers, leafletLayerHelpers, leafletControlHelpers) {
        var self = this;
        self.$onInit = function(){
            self.transport = (self.transport) ? self.transport : null;
            self.msgTag = (self.msgTag) ? self.msgTag : null;
            self.useWindowParams = (self.useWindowParams) ? self.useWindowParams : "true";
            self.icon = (self.icon)? self.icon : '//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/imagemap-bg.svg';
            
            self.heatmap =  (self.heatmap) ? self.heatmap : false;
            self.cw = $element.parent().width();
            self.ch = $element.parent().height();
            
            //var iw = (self.width)? parseInt(self.width) : 500;
            //var ih = (self.height)? parseInt(self.height) : 500;
            //var maxZoom = Math.ceil( Math.log( (self.cw/iw > self.ch/ih ? iw/self.cw : ih/self.ch) ) / Math.log(2) );
            
            self.minZoom = (self.minZoom)? parseInt(self.minZoom) : 0;
            self.maxZoom = (self.maxZoom)? parseInt(self.maxZoom) : 3;
            
            self.imageRatio = (self.imageRatio)? parseFloat(self.imageRatio) : 1;
            self.width = (self.width)? (parseInt(self.width) * self.imageRatio) : 500;
            self.height = (self.height)? (parseInt(self.height) * self.imageRatio) : 500;
            
            self.id = "imagemap-"+$scope.$id;
           
            if(self.markersData){
                self.markers = {};
                for(var i = 0; i < self.markersData.length; i++){
                    var theMarker = self.markersData[i];
                    var markerValue = ((self.data[theMarker.key])? self.data[theMarker.key] : null);
                    var tmp = {
                        lat: theMarker.lat * self.imageRatio, 
                        lng: theMarker.lng * self.imageRatio, 
                        icon: {
                            className: 'custom-div-icon',
                            type: 'div',
                            html: "<div class='marker-pin'><div class='marker-content'><span class='indicator-value'>" + ((markerValue)? markerValue : "?") + "</span></div></div>",
                            iconAnchor: [0, 0],
                            popupAnchor:  [15, -30]
                        },
                    };
                    if(theMarker.draggable && (theMarker.draggable == "true" || theMarker.draggable == true)) {
                        tmp["draggable"] =  true;
                    }
                    if(theMarker.group) {
                        tmp["group"] =  theMarker.group;
                    }
                    if(theMarker.icon && theMarker.icon.url) {
                        tmp.icon["iconUrl"] = theMarker.icon.url;
                    }
                    if(theMarker.icon && theMarker.icon.unit) {
                        tmp.icon["unit"] = theMarker.icon.unit;
                    }
                    if(theMarker.class) {
                        tmp["class"] = theMarker.class;
                    }
                    tmp.icon.html = buildMarkerHtml(tmp,  markerValue);
                    self.markers[theMarker.key] =  tmp;
                }
            }
            
            //timer needs to be one second in order to wait not only for the map to load but also the markers to load
            setTimeout(function(){
                leafletData.getMap(self.id).then(function(map) {
                    map.invalidateSize(false);
                    leafletData.getLayers().then(function(baselayers) {
                      if(self.draw) {
                          var drawnItems = baselayers.overlays.draw;
                          map.on('draw:created', function (e) {
                            var layer = e.layer;
                            drawnItems.addLayer(layer);
                            console.log(JSON.stringify(layer.toGeoJSON()));
                          });
                      }
                      
                   });
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
            
            self.imageUrl= (self.imageUrl) ? self.imageUrl : '//s3.amazonaws.com/scriptr-cdn/compagno/HVAC-system-7.png';
            
            self.layers = {
                baselayers: {
                    myLayer: {
                        name: 'Base Layer',
                        type: 'imageOverlay',
                        url: self.imageUrl,
                        bounds: [[self.height, 0], [0, self.width]],
                        layerParams: {
                            showOnSelector: false,
                            noWrap: true,
                        }
                    }
                }
            }
            self.layers.overlays = {};
            
            if(self.draw) { //Show draw controls
                self.controls =  {
                    draw: {}
                };
              
                self.layers.overlays["draw"] = {
                    name: 'draw',
                    type: 'group',
                    visible: true,
                    layerParams: {
                        showOnSelector: false
                    }
                }
            }
            
            if(self.heatmap) { //Show heatmap layer
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
                        layerOptions: _heatmapOptions ,
                        visible: true
                };
            }
            
            self.maxBounds = leafletBoundsHelpers.createBoundsFromArray([[self.height, 0], [0, self.width]]);
        }
        self.$postLink = function() {
            self.timeoutId = $timeout(self.resize.bind(self), 100);
            angular.element($window).on('resize', self.onResize);
            if ((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) { //Fetch data from backend
                initDataService(this.transport);
            } else if (self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                $scope.$watch(function($scope) {
                    // wait for the timeout
                    if ($scope.$ctrl.data) {
                        return $scope.$ctrl.data
                    }
                }, function(newVal, oldVal) {
                    if (JSON.stringify(newVal)) {
                        self.consumeData(newVal);
                    }
                }, true);
            } else {
                //Listen on update-data event to build data
                $scope.$on("update-data", function(event, data) {
                    if (data == null) { 
                        /*if (self.markersData == null) {
                            self.noResults = true;
                        }*/
                    } else {
                        if (data[self.serviceTag]){
                            self.consumeData(data[self.serviceTag]);
                        }else{
                            self.consumeData(data);
                        }
                    }
                });
                $scope.$emit("waiting-for-data");
            }
        }
        self.onResize = function() {
            if (self.timeoutId != null) {
                $timeout.cancel(self.timeoutId);
            }
            self.timeoutId = $timeout(self.resize.bind(self), 100);
        }
        self.resize = function() {
            self.cw = $element.parent().width();
            self.ch = $element.parent().height();
            self.calculateNotificationsDisplay();
        }
        self.calculateNotificationsDisplay = function() {
            if ($element.parent() && $element.parent().innerWidth() < 240) {
                self.usePopover = true;
            } else {
                self.usePopover = false;
            }
        }
        self.$onDestroy = function() {
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
        }
        
        var updateMarker = function(id, lng, lat) {
          if(self.draggableMarkers){
            var requestInfo = {
                "api": self.dragApi,
                "transport": self.transport,
                "msgTag": self.msgTag,
                "apiParams": {xAxis: lng, yAxis: lat, id: id},
                "useWindowParams": self.useWindowParams,
                "httpMethod": self.httpMethod,
                "widgetId": $scope.$id
            };
            dataService.scriptrRequest(requestInfo);
          }
        }
        
        var buildMarkerHtml = function(theMarker, markerValue) {
            var html = "<div class='"+ ((theMarker.class) ? theMarker.class : "") +" marker-pin'><div class='marker-content'>";
            
            if(theMarker.icon && theMarker.icon.iconUrl ) {
                html +="<img class='markerImg' src='" + theMarker.icon.iconUrl + "'/>";
            }
            
            html +="<span class='indicator-value'>" + ((markerValue)? markerValue : "?") + ((theMarker.icon && theMarker.icon.unit) ?  ("<br/>(" + theMarker.icon.unit + ")" )  : "") + "</span>";
           
            html += "</div></div>";
            return html;
        }
        
        var initDataService = function(transport) {
            var requestInfo = {
                "api": self.api,
                "transport": transport,
                "msgTag": self.msgTag,
                "apiParams": self.apiParams,
                "useWindowParams": self.useWindowParams,
                "httpMethod": self.httpMethod,
                "widgetId": $scope.$id
            };
            dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));
            if (self.fetchDataInterval && !self.refreshTimer) {
                //Assuming this is success
                self.refreshTimer = $interval(
                    function() {
                        initDataService(self.transport)
                    }, self.fetchDataInterval * 1000);
            }
        }
        
        
        self.consumeData = function(data, response) {
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
                   
                    if(!self.heatmap){
                        if(self.dynamicMarkers){
                            self.markers = {};
                            self.markersData = data;
                            for(var i = 0; i < self.markersData.length; i++){
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
                                        popupAnchor:  [15, -30]
                                    },
                                };
                                if(theMarker.draggable && (theMarker.draggable == "true" || theMarker.draggable == true)) {
                                    tmp["draggable"] =  true;
                                }
                                if(theMarker.icon && theMarker.icon.url) {
                                    tmp.icon["iconUrl"] = theMarker.icon.url;
                                }
                                if(theMarker.icon && theMarker.icon.unit) {
                                    tmp.icon["unit"] = theMarker.icon.unit;
                                }
                                if(theMarker.icon && theMarker.icon.unit && theMarker.icon.url ) {
                                    tmp.icon.html = "<div class='marker-pin'><div class='marker-content'><img class='markerImg' src='" + theMarker.icon.url + "'/><span class='indicator-value'>" + theMarker.key + " " + theMarker.icon.unit + "</span></div></div>"
                                }

                                  self.markers[theMarker.key] = tmp;
                              }                          
                            }else{
                              var dataKeys = Object.keys(data);
                              for(var i = 0; i < dataKeys.length; i++){
                                  var dataKey = dataKeys[i];
                                  if(self.markers[dataKey]){
                                      var tmp = buildMarkerHtml( self.markers[dataKey],  data[dataKey]);
                                      self.markers[dataKey].icon.html = buildMarkerHtml( self.markers[dataKey],  data[dataKey]);
                                  }
                              }
                        }
                    }else{
                     	leafletData.getMap(self.id).then(function(map) {
                            if(self.heatLayer) {
                                leafletLayerHelpers.safeRemoveLayer(map, self.heatLayer);
                            }
                            
                            _data = _.map(data, function(entry){ return [entry[0]*self.imageRatio, entry[1]*self.imageRatio, entry[2]]})
                            self.heatLayerInfo["data"] = _data
                            self.heatLayer = leafletLayerHelpers.createLayer(self.heatLayerInfo)
                            try {
                                leafletLayerHelpers.safeAddLayer(map, self.heatLayer);
                            }catch(e){
                                console.error(e);
                                setTimeout(function(){
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
        }
    }
});
