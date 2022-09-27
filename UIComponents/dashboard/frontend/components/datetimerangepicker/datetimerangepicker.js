angular.module("DateTimeRangePicker", ["ngMessages", "ngRoute", "daterangepicker"]);
angular.module("DateTimeRangePicker").component("scriptrDateTimeRangePicker", {
	"bindings": {
		"onDateFilterSelectCallback": "&", //callback function to handle selected date
    	"startDate": "<?", //moment date
        "endDate": "<?", //moment date
        "minDate": "<?", //moment date. (Date or string) The earliest date a user may select.
        "maxDate": "<?", //moment date.  (Date or string) The latest date a user may select.
        "applyClass": "@",
        "applyLabel": "@",
        "fromLabel": "@",
        "toLabel": "@",
        "cancelLabel": "@",
        "format": "@", //format of the date
        "customRangeLabel": "@",
        "ranges": "<?",
        "maxSpan": "@", // The maximum span between the selected start and end dates.
        "enableTimePicker": "@", //boolean to enable timepicker or not,
        "singleDatePicker": "@", //to select only one date instead of range
        "alignment": "@", //('left'/'right'/'center') Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to.
        "showWeekNumbers": "@", //(true/false) Show localized week numbers at the start of each week on the calendars.
        "showISOWeekNumbers": "@", //(true/false) Show ISO week numbers at the start of each week on the calendars.
        "timePickerIncrement": "@", //(number) Increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30).
        "timePicker24Hour": "@", //(true/false) Use 24-hour instead of 12-hour times, removing the AM/PM selection.
        "timePickerSeconds": "@", //(true/false) Show seconds in the timePicker.
        "showCustomRangeLabel": "@", // (true/false) Displays "Custom Range" at the end of the list of predefined ranges, when the ranges option is used
        "buttonClasses": "@", //(string) CSS class names that will be added to both the apply and cancel buttons.
		"applyButtonClasses": "@", //(string) CSS class names that will be added only to the apply button.	
        "cancelButtonClasses": "@", //(string) CSS class names that will be added only to the cancel button.
        "icon": "@",
        "showDropdowns": "@",
        "linkedCalendars": "@"
    },
    "templateUrl": "/UIComponents/dashboard/frontend/components/datetimerangepicker/datetimerangepicker.html",
    "controller": function($rootScope, $scope, $route, $routeParams, $location) {
        
        this.$onInit = function() {
        	var self = this;
            this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/images/calendar.svg";
        	this.startDate = this.startDate ;//|| moment().subtract(1, "days");
            this.endDate = this.endDate ;//|| moment();
            this.minDate = this.minDate || moment().subtract(1, "years").format("YYYY-MM-DD HH:mm:ss");
            this.maxDate = this.maxDate || moment().format("YYYY-MM-DD HH:mm:ss");
            this.applyClass = this.applyClass || "btn-green";
            this.applyLabel = this.applyLabel || "Apply";
            this.fromLabel = this.fromLabel || "From";
            this.toLabel = this.toLabel || "To";
            this.cancelLabel = this.cancelLabel || "Cancel";
            this.customRangeLabel = this.customRangeLabel || "Custom Range";
            this.isSimple = this.isSimple || "true";
            this.enableTimePicker = this.enableTimePicker == "true" ? true : false;
            this.singleDatePicker = this.singleDatePicker == "true" ? true : false;
            this.showWeekNumbers = this.showWeekNumbers == "true" ? true : false;
            this.showISOWeekNumbers = this.showISOWeekNumbers == "true" ? true : false;
            this.timePicker24Hour = this.timePicker24Hour == "true" ? true : false;
            this.timePickerSeconds = this.timePickerSeconds == "true" ? true : false;
            this.showCustomRangeLabel = this.showCustomRangeLabel == "true" ? true : false;
            this.showDropdowns = this.showDropdowns == "true" ? true : false;
            this.linkedCalendars =  this.linkedCalendars == "false" ? false : true;
            
            this.dateFilter = {
                startDate: this.startDate,
                endDate: this.endDate
            };
        
            this.dateFilterOptions = {
            	applyButtonClasses: this.applyButtonClasses,
            	showCustomRangeLabel: this.showCustomRangeLabel,
            	timePicker24Hour: this.timePicker24Hour,
                timePickerSeconds: this.timePickerSeconds,
            	showISOWeekNumbers: this.showISOWeekNumbers,
            	showWeekNumbers: this.showWeekNumbers,
            	singleDatePicker : this.singleDatePicker,
                showDropdowns: this.showDropdowns,
                timePicker: this.enableTimePicker,
                linkedCalendars: this.linkedCalendars,
                locale: {
                    applyClass: this.applyClass,
                    applyLabel: this.applyLabel,
                    fromLabel: this.fromLabel,
                    toLabel: this.toLabel,
                    cancelLabel: this.cancelLabel,
                    customRangeLabel: this.customRangeLabel
                }
            };
            
            if(this.format){
                this.dateFilterOptions.locale.format = this.format;
            }
            if(this.ranges){
            	this.dateFilterOptions.ranges = this.ranges;
            }
            if(this.maxSpan){
            	this.dateFilterOptions.maxSpan = {
                	days: parseInt(this.maxSpan)
                };
            }
            if(this.alignment){
            	this.dateFilterOptions.opens = this.alignment;
            }
            if(this.timePickerIncrement){
            	this.dateFilterOptions.timePickerIncrement = parseInt(this.timePickerIncrement);
            }
            if(this.buttonClasses){
            	this.dateFilterOptions.buttonClasses = this.buttonClasses;
            }
            if(this.applyButtonClasses){
            	this.dateFilterOptions.applyButtonClasses = this.applyButtonClasses;
            }
            if(this.cancelButtonClasses){
            	this.dateFilterOptions.cancelButtonClasses = this.cancelButtonClasses;
            }

            $scope.$watch('$ctrl.dateFilter', function(newDate) {
                console.log('New date set: ', newDate);
                if(typeof self.onDateFilterSelectCallback() == "function"){
                    self.onDateFilterSelectCallback()(newDate, self);
                }
            }, false);
        };
        
    }
})