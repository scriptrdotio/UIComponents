
angular.module('angularThermometer',[]).directive('tgThermometerVertical', function() {
	
	return {
		  restrict: 'E',
          require: 'ngModel',
          scope: {            
               size: '@',
               height: '@', 
               ticks: "<?",
               percent: "@",
               colors: "<?",
               max: "@",
               cols: "@",
               value: '@',
               unit: '@',
               sectors: "<?"
          },
          templateUrl: '/UIComponents/dashboard/frontend/UIComponents/Components/thermometer/tg_thermometer_vertical.html'
	}

});


 

