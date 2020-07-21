angular.module("Imagemap", ['leaflet-directive', 'ComponentsCommon', 'DataService']);
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

        "data" : "<?",
        "width": "@",
        "height": "@",
        "minZoom": "@",
        "maxZoom": "@",
        "imageUrl": "@",
        "markersData": "<?" //object of objects with key and: lat, lng, group(optional), icon(url, unit} 
        
    },
    templateUrl : '/UIComponents/dashboard/frontend/components/imagemap/imagemap.html',
    controller : function($scope, httpClient, wsClient, $interval, dataService, $timeout, $window, $element, leafletData, leafletBoundsHelpers) {
        var self = this;
        
        self.$onInit = function(){
            self.minZoom = (self.minZoom)? parseInt(self.minZoom) : 0;
            self.maxZoom = (self.maxZoom)? parseInt(self.maxZoom) : 3;
            self.width = (self.width)? parseInt(self.width) : 500;
            self.height = (self.height)? parseInt(self.height) : 500;
            
            self.maxBounds = leafletBoundsHelpers.createBoundsFromArray([[self.width, 0], [0, self.height]]);
            console.log(self.width, self.height);
            self.transport = (self.transport) ? self.transport : null;
            self.msgTag = (self.msgTag) ? self.msgTag : null;
            self.useWindowParams = (self.useWindowParams) ? self.useWindowParams : "true";
            
            self.icon = (self.icon)? self.icon : '//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/imagemap-bg.svg';
            
            self.defaults = {
                crs: 'Simple',
                maxZoom: self.maxZoom
            };
            self.center = {
                lat: 0,
                lng: 0,
                zoom: 0
            };
            self.maxBounds = self.maxBounds;
            self.imageUrl='//s3.amazonaws.com/scriptr-cdn/compagno/HVAC-system-7.png';
            self.layers = {
                baselayers: {
                    myLayer: {
                        name: 'My Layer',
                        type: 'imageOverlay',
                        url: self.imageUrl,
                        bounds: [[self.width, 0], [0, self.height]],
                        layerParams: {
                            showOnSelector: false,
                            noWrap: true,
                        }
                    }
                }
            };
            
            //timer needs to be one second in order to wait not only for the map to load but also the markers to load
            setTimeout(function(){
                leafletData.getMap().then(function(map) {
                    console.log('invalidating size');
                    map.invalidateSize(false);
                });
            }, 1000);
            
            $scope.$on('leafletDirectiveMarker.dragend', function(event, args){
                console.log(args.leafletObject._latlng); 
            });
            
            if(self.markersData){
                
                self.markers = {};
                for(var i = 0; i < self.markersData.length; i++){
                    var theMarker = self.markersData[i];
                    self.markers[theMarker.key] = {
                        lat: theMarker.lat, 
                        lng: theMarker.lng,
                        draggable: theMarker.draggable,
                        group: theMarker.group,
                        icon: {
                        	className: 'custom-div-icon',
                            type: 'div',
                            iconUrl: theMarker.icon.url,
                            unit: theMarker.icon.unit,
                            html: "<div style='background-color:#96c0d0;' class='marker-pin'><div class='markerContent'><img width='32px' height='32px' class='markerImg' src='" + theMarker.icon.url + "'/><span class='indicator-value' style='right: 0px;'>" + ((self.data[theMarker.key])? self.data[theMarker.key] : "?") + " " + theMarker.icon.unit + "</span></div></div>",
                            iconSize: [90, 120],
                            iconAnchor: [0, 0],
                            popupAnchor:  [15, -30]
                        },
                    };
                    
                    
                }
            }
        }
        
        self.$postLink = function() {
            console.log('entered post function')
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
                    if (data == null) { //typeOf data == 'undefined' || data === null
                        /*if (self.gaugeValue == null) {
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
                    self.data = data;
                    
                    console.log('consuming data');
                    
                    if(self.markers){
                        var dataKeys = Object.keys(data);
                        for(var i = 0; i < dataKeys.length; i++){
                            var dataKey = dataKeys[i];
                            if(self.markers[dataKey]){
                                self.markers[dataKey].icon.html = "<div style='background-color:#96c0d0;' class='marker-pin'><div class='markerContent'><img width='32px' height='32px' class='markerImg' src='" + self.markers[dataKey].icon.iconUrl + "'/><span class='indicator-value' style='right: 0px;'>" + data[dataKey] + " " + self.markers[dataKey].icon.unit + "</span></div></div>";
                            }
                        }
                    }else{
                        console.log('no markers')
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