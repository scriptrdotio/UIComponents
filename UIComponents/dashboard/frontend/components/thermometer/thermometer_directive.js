
angular.module('angularThermometer',[]).directive('tgThermometerVertical', function() {
	
	return {
		  restrict: 'E',
          require: 'ngModel',
          scope: {
               height: '@', 
               ticks: '<?',
               percent: '@',
               value: '@',
               unit: '@',
               sectors: '<?',
               mercuryColor: '<?'
          },
          templateUrl: '/UIComponents/dashboard/frontend/components/thermometer/tg_thermometer_vertical.html'
	}

});


 

