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
		               this.getHeaderData(this.user, this.headerItems);
		               console.log("menu items json: " + this.menuItems);
	               };

	               this.getHeaderData = function(user, headerData) {
                     this.user = user;
                     this.isLogout = headerData.logout;
                     this.logo = headerData.logo;
                     this.items = headerData.items;
	               };

               }
            });