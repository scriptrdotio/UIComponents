angular.module('MyApp', ['WsClient', 'HttpClient', 'Layout', 'slickCarousel', 'Gauge', 'Chart', 'Speedometer', 'Thermometer', 'Odometer', 'Accelerometer', 'Grid', 'ToggleSwitch', 'Slider', 'Map', 'Button', 'ProgressBar', 'ngSanitize', 'ngRoute', 'ngMaterial', 'ui.codemirror', 'ui.bootstrap']);

angular.module('MyApp')
	.config(wssConfig)
    .config(httpsConfig)
    .constant("routingJson",  routingItems)
	.constant("headerItems",  headerItems)
	.config(function($routeProvider, routingJson){
    for(var i = 0; i < routingJson.params.length; i++){
        $routeProvider
            .when("/" + routingJson.params[i].route,
                  {
            templateUrl: routingJson.params[i].template
        })
    }
}); 