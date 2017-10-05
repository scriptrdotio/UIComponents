
angular.module('angularThermometer',[]).directive('tgThermometerVertical', function() {
	
	return {
		  restrict: 'E',
          require: 'ngModel',
          scope: {            
               size: '@',
               height: '@', 
               ticks: "<?",
               percent: "@",
               max: "@",
               value: '@',
               unit: '@',
               sectors: "<?"
          },
          templateUrl: '/UIComponents/dashboard/frontend/components/thermometer/tg_thermometer_vertical.html'
	}

});


 

