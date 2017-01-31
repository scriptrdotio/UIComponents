angular.module('myApp').controller('DashboardCtrl', ['$scope', '$timeout',
	function($scope, $timeout) {
		this.gridsterOptions = {
			margins: [20, 20],
			columns: 4,
			draggable: {
				handle: 'h3'
			}
		};
      
      this.dashboard = {
				id: '1',
				name: 'Home',
				widgets: [{
					col: 0,
					row: 0,
					sizeY: 4,
					sizeX: 4,
					name: "Widget 1"
				}]};

		

		$scope.clear = function() {
			this.dashboard.widgets = [];
		};

		$scope.addWidget = function() {
			this.dashboard.widgets.push({
				name: "New Widget",
				sizeX: 1,
				sizeY: 1
			});
		};
	}
])

.controller('CustomWidgetCtrl', ['$scope', '$modal', '$compile', '$element',
	function($scope, $modal, $compile, $element) {

		$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		$scope.openSettings = function(widget) {
			$modal.open({
				scope: $scope,
				templateUrl: 'view/settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
		};
        
        
        $scope.addChart = function(widget) {
          
          var chart = angular.element(document.createElement('scriptr-chart'));
          chart.attr("type","bar");
          chart.attr("stacked","true");
          chart.attr("xkey","y");
          chart.attr("ykeys","[\"a\", \"b\"]");
          chart.attr("labels","[\"Serie A\", \"Serie B\"]");
          chart.attr("transport","wss");
          chart.attr("api","UIComponents/dashboard/frontend/examples/chart/getChartData");
          chart.attr("msg-tag","chart");
          
          var el = $compile( chart )( $scope );
		  $element.append( el );
          console.log(widget)
          $scope.$watch('widget', function() {
            console.log("ddd")
            $compile( chart )( $scope );
          }, true)
			
		};

	}
])

.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
	function($scope, $timeout, $rootScope, $modalInstance, widget) {
		$scope.widget = widget;

		$scope.form = {
			name: widget.name,
			sizeX: widget.sizeX,
			sizeY: widget.sizeY,
			col: widget.col,
			row: widget.row
		};

		$scope.sizeOptions = [{
			id: '1',
			name: '1'
		}, {
			id: '2',
			name: '2'
		}, {
			id: '3',
			name: '3'
		}, {
			id: '4',
			name: '4'
		}];

		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		$scope.remove = function() {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
			$modalInstance.close();
		};

		$scope.submit = function() {
			angular.extend(widget, $scope.form);
			$modalInstance.close(widget);
		};

	}
])

// helper code
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
});
