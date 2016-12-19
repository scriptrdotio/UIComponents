angular.module('DatePicker', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

angular
  .module('DatePicker')
  .component('scriptrDatePicker',
             
     {
             
      bindings : {

          "onLoad" : "&onLoad",
        
          "toggleMin" : "<?",
        
          "tomorrowClass" : "@",
        
          "afterTomorrowClass" : "@",
        
          "showWeeks" : "<?"

      },

      templateUrl: '/UIComponents/dashboard/frontend/components/datePicker/datePicker.html',
      controller: function() {
  
      var self = this;
  
  	  this.$onInit = function() {
         self.dt = new Date();
         self.options = {
          customClass: getDayClass,
          minDate: new Date(),
        };
        self.options.showWeeks = (typeof self.showWeeks != 'undefined') ? self.showWeeks : true;
        self.options.minDate = (self.toggleMin == true) ? new Date() : null;
        self.tomorrowClass = (self.tomorrowClass) ? self.tomorrowClass : '';
        self.afterTomorrowClass = (self.afterTomorrowClass) ? self.afterTomorrowClass : '';
      }
      
      // clear selected date
      self.clear = function() {
        self.dt = null;
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }
	
      // set date  
      self.setDate = function(year, month, day) {
        self.dt = new Date(year, month, day);
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date(tomorrow);
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      self.events = [
        {
          date: tomorrow,
          status: self.tomorrowClass
        },
        {
          date: afterTomorrow,
          status: self.afterTomorrowClass
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < self.events.length; i++) {
            var currentDay = new Date(self.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return self.events[i].status;
            }
          }
        }

        return '';
      }
    }
});