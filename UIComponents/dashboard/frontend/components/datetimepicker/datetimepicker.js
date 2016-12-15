angular.module('DateTimePicker', []);

angular
      .module('DateTimePicker')
      .component(
            'dateTimePicker',
            {

               bindings : {

                  

               },
               templateUrl : '/UIComponents/dashboard/frontend/components/datetimepicker/datetimepicker.html',
               controller : function(httpClient, wsClient) {

                 var self = this;
                 this.validViews = ['year', 'month', 'day', 'hour', 'minute'];
                 this.selectable = true;
                 $scope.config = {
                   datetimePicker: {
                     startView: 'year'
                   },
                   configureOnConfig: {
                     startView: 'year',
                     configureOn: 'config-changed'
                   },
                   renderOnConfig: {
                     startView: 'year',
                     renderOn: 'valid-dates-changed'
                   }
                 }
                
				checkboxOnTimeSet = function(){
              		this.data.checked = false;
            	}
  
  				inputOnTimeSet = function(newDate){
  					// If you are not using jQuery or bootstrap.js,
                    // this will throw an error.
                    // However, can write this function to take any
                    // action necessary once the user has selected a
                    // date/time using the picker
                    $log.info(newDate);
                    $('#dropdown3').dropdown('toggle');
              }

				getLocale = function (){
                  return moment.locale();
                }
                
                setLocale = function(newLocale){
                  moment.locale(newLocale);
                }
                
                guardianOnSetTime = function($index, guardian, newDate, oldDate){
                  angular.element('#guardian' + $index).dropdown('toggle');
                }
                
                beforeRender = function($dates){
                  var index = Math.ceil($dates.length / 2);
                  $dates[index].selectable = false;
                }
                
                configFunction = function(){
                  return {startView: 'month'};
                }
                
                changeConfig = function(){
                  var newIndex = validViews.indexOf(this.config.configureOnConfig.startView) + 1;
                  console.log(newIndex);
                  if (newIndex >= validViews.length) {
                    newIndex = 0;
                  }
                  this.config.configureOnConfig.startView = validViews[newIndex];
                  this.$broadcast('config-changed');
                }
                
                renderOnBeforeRender = function($dates){
                  angular.forEach($dates, function (dateObject) {
                    dateObject.selectable = selectable;
                  });
                }
                
                renderOnClick = function(){
                  selectable = (!selectable);
      				$scope.$broadcast('valid-dates-changed');
                }
                
                startDateOnSetTime = function(){
                  $scope.$broadcast('start-date-changed');
                }
                
                endDateOnSetTime = function(){
                  $scope.$broadcast('end-date-changed');
                }
                
                startDateBeforeRender = function($dates){
                  if ($scope.dateRangeEnd) {
                    var activeDate = moment($scope.dateRangeEnd);

                    $dates.filter(function (date) {
                      return date.localDateValue() >= activeDate.valueOf()
                    }).forEach(function (date) {
                      date.selectable = false;
                    })
                  }
                }

                endDateBeforeRender = function($view, $dates){
                  if ($scope.dateRangeStart) {
                        var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

                        $dates.filter(function (date) {
                          return date.localDateValue() <= activeDate.valueOf()
                        }).forEach(function (date) {
                          date.selectable = false;
                        })
                      }
                    }

                }
	               /*this.$onInit = function() {

	               }

	               var initDataService = function(transport) {
		               if (transport == "wss") {
			               wsClient.onReady.then(function() {
				               // Subscribe to socket messages with id chart
				               wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
				               if(self.api) {
                                  wsClient.call(self.api, self.apiData, self.msgTag)
                                   .then(function(data, response) {
                                       self.consumeData(data)
                                   });
				               }
				               
			               });
		               } else {
			               if (transport == "http" && self.api) {
				               httpClient
				                     .get(self.api, self.apiData)
				                     .then(
				                           function(data, response) {
					                           self.consumeData(data)
				                           },
				                           function(err) {
					                           console
					                                 .log(
					                                       "reject published promise",
					                                       err);
				                           });
			               }
		               }
	               }

	              this.consumeData = function(data, response) {
		               this.gaugeValue = data;
	               }*/
            });
