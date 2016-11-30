angular
      .module('Layout')
      .component(
            'headerTop',
            {
               bindings : {
	               headerItems : '<headerItems',
                   user: '<user'
               },
               templateUrl : '/UIComponents/layout/frontend/components/header/header.html',
               controllerAs : 'vm',
               controller : function($scope, _) {
	               var vm = this;

	               this.$onInit = function() {
		               this.getHeaderData(this.menuItems);
		               console.log("menu items json: " + this.menuItems);
	               };

	               this.getMenuData = function(data) {
		               this.menuCols = [ data.mainMenu ];
		               // menu is initially expanded
		               this.menuColsExpansionClass = [ 'md' ];
		               this.menuItems = data;
	               };

               }
            });