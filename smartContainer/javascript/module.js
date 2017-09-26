var myApp = angular.module('myApp', ["Layout",  "WsClient", "HttpClient", "Map", "List", "Chart", "Grid", "Speedometer", "Odometer", "Gauge", "DateTimePicker", "Thermometer", "Button", "ngTagsInput", "Slider"]);

myApp
    .constant("menuItemsJson",  menuItems)
    .constant("headerItemsJson", headerItems)
    .constant("routingJson", routingItems)
    .config(httpsConfig)
    .config(wssConfig)
    .config(function($routeProvider, routingJson){
    for(var i = 0; i < routingJson.params.length; i++){
        $routeProvider
            .when("/", {
            templateUrl: '/smartContainer/html/views/map/map.html'
        })
            .when("/" + routingJson.params[i].route,
                  {
            templateUrl: routingJson.params[i].template,
            controller: routingJson.params[i].controller,
        })
    }
}); 