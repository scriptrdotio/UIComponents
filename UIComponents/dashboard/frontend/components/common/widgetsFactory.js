angular
  .module('ComponentsCommon').factory('wdgFactory', function () {
    return {
        
        useNotificationPopover: function(element) {
            if(element && element.parent() && element.parent.innerWidth != null && element.parent().innerWidth() < 240) {
              return true; 
            } else {
               return false;
            }
        }
    };
});