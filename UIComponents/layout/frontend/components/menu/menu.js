angular
      .module('Layout')
      .component(
            'menu',
            {
               bindings : {
	               menuItems : '<menuItems'
               },
               templateUrl : '/UIComponents/layout/frontend/components/menu/menu.html',
               controllerAs : 'vm',
               controller : function($scope, _, $timeout, $location, $route) {
	               var vm = this;
                 
                   vm.currentRoute = null;

	               this.$onInit = function() {
		               this.getMenuData(this.menuItems);
                       if($route.current && $route.current.$$route) {
                         vm.currentRoute =  "#"+$route.current.$$route.originalPath;
                       }
                       $scope.$on('$routeChangeStart', function(next, current) { 
                         console.log("next", next);
                         if(current) {
                            console.log("current", current.$$route);
                         	vm.currentRoute =  "#"+current.$$route.originalPath;
                         } else {
                           console.log("Missing route definition")
                         }
 					   });

	               };

                   this.$postLink = function() {
                     $timeout(function () {
                        //DOM has finished rendering
                        angular.element('.isSelected').trigger("click"); //MFE: do not use trigger handler as the ng-href will be prevented and only ng-click executed.
                    });
                      
                   };
	               this.getMenuData = function(data) {
		               this.menuCols = [ data.mainMenu ];
		               // menu is initially expanded
		               this.menuColsExpansionClass = [ 'md' ];
		               this.menuItems = data;
                     
                      
	               };

	               // method that checks if the current menu item has a sub menu
	               this.checkIfHasSubMenu = function(col) {
		               if (typeof this.menuItems[col] != 'undefined'
		                     && this.menuItems[col] != null) {
			               for (var i = 0; i < this.menuItems[col].length; i++) {
				               var item = this.menuItems[col][i];
				               if (typeof item.sub != 'undefined'
				                     && item.sub != null)
					               return true;
			               }
		               }
		               return false;
	               };

	               this.route = function(item, event, column) {
		               console.log(item)
		               if (typeof item.sub != undefined && item.sub != null) {
			               if (this.menuCols.indexOf(item.sub) == -1) {
				               // case of opening a sub-menu
				               // push the sub-menu of the selected element to this.menuCols array
				               this.menuCols.push(item.sub);
				               // collapse all sub-menus already opened
				               for (var i = 0; i < this.menuColsExpansionClass.length; i++)
					               this.menuColsExpansionClass[i] = 'sm';
				               // check if the sub-menu's children have sub-menus in order to know if the class of the sub-menu is sm or md
				               // if(this.checkIfHasSubMenu(item.sub))
				               // this.menuColsExpansionClass.push('sm');
				               // else{
				               this.menuColsExpansionClass.push('md');
				               // }
				               // prevent routing in this case and just open the sub-menu
				               // event.preventDefault();
			               } else {
				               // case of collapsing the sub-menu
				               var indx = this.menuCols.indexOf(item.sub);
				               this.menuCols.splice(indx, this.menuCols.length
				                     - indx);
				               this.menuColsExpansionClass.splice(indx,
				                     this.menuColsExpansionClass.length - indx);
				               // expand the new last column in the menu
				               this.menuColsExpansionClass[this.menuColsExpansionClass.length - 1] = "md";
				               // prevent routing in this case and just close the sub-menu
				               // event.preventDefault();
				               this.revertActiveSelectionClass(item.sub);
			               }
		               } else {
			               // doesn't have sub-menu, then change css of this menu bar to be md not sm
			               var colIndex = this.menuCols.indexOf(column);
			               if (colIndex != -1) {
				               // close other opened sub menus if they exist beyond the current column
				               var menuColsLength = this.menuCols.length;
				               for (var i = colIndex + 1; i < menuColsLength; i++) {
					               this.revertActiveSelectionClass(this.menuCols[i]);
					               // this.menuCols.splice(i, 1);
					               // this.menuColsExpansionClass.splice(i, 1);
				               }
				               this.menuCols.splice(colIndex + 1,
				                     this.menuCols.length - (colIndex + 1));
				               this.menuColsExpansionClass.splice(colIndex + 1,
				                     this.menuColsExpansionClass.length
				                           - (colIndex + 1));
				               if (this.menuColsExpansionClass.length > colIndex)
					               this.menuColsExpansionClass[colIndex] = 'md';
			               }
		               }
		               //update active class of selected element
		               for (var i = 0; i < this.menuItems[column].length; i++) {
			               if (this.menuItems[column][i].id == item.id) {
				               if (this.menuItems[column][i].active == "false")
					               this.menuItems[column][i].active = "true";
			               } else {
				               if (this.menuItems[column][i].active == "true")
					               this.menuItems[column][i].active = "false";
			               }
		               }
	               };

	               this.revertActiveSelectionClass = function(colIndex) {
		               for (var i = 0; i < this.menuItems[colIndex].length; i++) {
			               if (i == 0)
				               this.menuItems[colIndex][i].active = "true";
			               else if (this.menuItems[colIndex][i].active == "true")
				               this.menuItems[colIndex][i].active = "false";
		               }
	               };
               }
            });