angular.module('DateTimePicker', ['ui.bootstrap.datetimepicker', 'ui.dateTimeInput']);

angular
      .module('DateTimePicker')
      .component(
            'scriptrDateTimePicker',
            {

               bindings : {
                 
                "type" : "@", 
                 
                "config" : "<?",
                 
                "dateHelper" : "<?", 
                 
                "date" : "@", 
                 
                "startDateConfig" : "<?",
                 
                "endDateConfig" : "<?",
                 
                "startDateLabel" : "@",
                 
                "endDateLabel" : "@",
                 
                "onSetTime" : "&",
                 
                "startDateClass" : "@",
                 
                "endDateClass" : "@",
                 
                "startDateOnSetTime" : "&",
                 
                "endDateOnSetTime" : "&",
                   
                 "layout": "@" //horizontal or vertical, default verticl for bwc
                
                  

               },
               templateUrl : '/UIComponents/dashboard/frontend/components/datetimepicker/datetimepicker.html',
               controller : function($scope, $log) {
                 
                  var self = this;

                  var validViews = ['year', 'month', 'day', 'hour', 'minute'];
                  var selectable = true;
                  this.configuration = {};
                  var dateHelp;

                  $scope.controllerName = 'demoController';

                  /* Bindable functions
                         -----------------------------------------------*/
                  $scope.endDateBeforeRender = endDateBeforeRender
                  $scope.endDateOnSetTime = endDateOnSetTime
                  $scope.onSetTime = onSetTime
                  $scope.getLocale = getLocale;
                  $scope.setLocale = setLocale;
                  $scope.startDateBeforeRender = startDateBeforeRender
                  $scope.startDateOnSetTime = startDateOnSetTime
                  
                  this.$onInit = function() {
                    this.configuration = (this.config) ? this.config : { dropdownSelector: '#dropdown', startView:'day', minView:'day' };
                      
                    this._layout = (this.layout) ? this.layout : "vertical";
                    if(this.type != "range"){
                      if(typeof this.config != 'undefined'){
                        this.configuration["dropdownSelector"] = "#dropdown";
                      }
                    }else {
                      this.startConfig = (this.startDateConfig) ? this.startDateConfig : { dropdownSelector: '#dropdownStart', renderOn : 'end-date-changed', startView:'day', minView:'day' };
                      this.endConfig = (this.endDateConfig) ? this.endDateConfig : { dropdownSelector: '#dropdownEnd', renderOn : 'start-date-changed', startView:'day', minView:'day' };
                      if(typeof this.startDateConfig != 'undefined'){
                      	this.startConfig["dropdownSelector"] = "#dropdownStart";
                        this.startConfig["renderOn"] = 'end-date-changed';
                      }
                      if(typeof this.endDateConfig != 'undefined'){
                      	this.endConfig["dropdownSelector"] = "#dropdownEnd"; 
                        this.endConfig["renderOn"] = 'start-date-changed';
                      }
                    }
                    if (this.dateHelper != null) {
                      if (angular.isObject(this.dateHelper)) {
                        dateHelp = this.dateHelper;
                        dateHelp.getDate = self.getDate;
                        dateHelp.getDateRangeStart = self.getDateRangeStart;
                        dateHelp.getDateRangeEnd = self.getDateRangeEnd;
                      }
                    }
                  }

                  moment.locale('en');
                 
                  self.getDate = function(){
                    console.log(self.date);
                    return self.date;
                  }
                  
                  self.getDateRangeStart = function(){
                    console.log(self.dateRangeStart);
                    return self.dateRangeStart;
                  }
                     
                  self.getDateRangeEnd = function(){
                    console.log(self.dateRangeEnd);
                    return self.dateRangeEnd;
                  }
                  
                  function onSetTime () {
                    if(typeof self.onSetTime() == "function"){
                      data = self.onSetTime()(self.date);
                    }
                  }

                  function getLocale () {
                    return moment.locale();
                  }

                  function setLocale (newLocale) {
                    moment.locale(newLocale);
                  }

                  function startDateOnSetTime () {
                    $scope.$broadcast('start-date-changed');
                    if(typeof self.startDateOnSetTime() == "function"){
                      data = self.startDateOnSetTime()(self.dateRangeStart);
                    }
                  }

                  function endDateOnSetTime () {
                    $scope.$broadcast('end-date-changed');
                    if(typeof self.endDateOnSetTime() == "function"){
                      data = self.endDateOnSetTime()(self.dateRangeEnd);
                    }
                  }

                  function startDateBeforeRender ($dates) {
                    if (self.dateRangeEnd) {
                      var activeDate = moment(self.dateRangeEnd);

                      $dates.filter(function (date) {
                        return date.localDateValue() >= activeDate.valueOf()
                      }).forEach(function (date) {
                        date.selectable = false;
                      })
                    }
                  }

                  function endDateBeforeRender ($view, $dates) {
                    if (self.dateRangeStart) {
                      var activeDate = moment(self.dateRangeStart).subtract(1, $view).add(1, 'minute');

                      $dates.filter(function (date) {
                        return date.localDateValue() <= activeDate.valueOf()
                      }).forEach(function (date) {
                        date.selectable = false;
                      })
                    }
                  }

                }
            });
