var underscore = angular.module("underscore", []);
underscore.factory("_", ["$window", function($window) {		
  return $window._; // assumes underscore has already been loaded on the page		
}]);



angular.module("DashboardBuilder", ["underscore", "schemaForm", "Accelerometer", "IFrame", "Button", "Slider", "ToggleSwitch", "ACL", "Grid", "Map", "Message", "xeditable", "ui.bootstrap", "ngRoute", "slickCarousel", "ngAnimate", "ngSanitize", "WsClient", "HttpClient", "DataService", "Chart", "gridster","DashboardBuilder", "Gauge", "Speedometer", "Odometer", "SearchBox", "ngMaterial", "ngMessages", "material.svgAssetsCache", "Thermometer", "ProgressBar", "angularSpectrumColorpicker", "angular-underscore/filters", "pascalprecht.translate", "ui.select", "ui.codemirror",  "Dygraphs", "mgcrea.ngStrap", "mgcrea.ngStrap.modal", "mgcrea.ngStrap.select", "Display", "Plotly", "MetricBox"]);