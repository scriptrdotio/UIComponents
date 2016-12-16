angular.module('DatePicker', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

angular
  .module('DatePicker')
  .component('scriptrDatePicker',
             
     {
             
      bindings : {

          "onLoad" : "&onLoad",
        
          "toggleMin" : "<?",
        
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
        self.options.showWeeks = (typeof this.showWeeks != 'undefined') ? this.showWeeks : true;
        self.options.minDate = (this.toggleMin == true) ? new Date() : null;
      }
             
      self.clear = function() {
        self.dt = null;
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }
	
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
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
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