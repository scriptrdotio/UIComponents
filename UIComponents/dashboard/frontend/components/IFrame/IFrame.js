angular.module('IFrame', []);

angular
    .module('IFrame')
    .component(
    'scriptrIframe',
    {

        bindings : {
            
            link : "@"

        },
        templateUrl : '/UIComponents/dashboard/frontend/UIComponents/Components/IFrame/IFrame.html',
        controller : function($scope, $sce, $q, $element, $window, $timeout) {

            var self = this;

            this.$onInit = function() {
            }

            this.$postLink = function() {
            }
            
            this.trustSrc = function(link){
              return $sce.trustAsResourceUrl(link);
            }
        }
    });
