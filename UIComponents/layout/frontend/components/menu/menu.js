angular
      .module('Layout')
      .component(
            'menu',
            {
               bindings : {
	               menuItems : '<menuItems',
                   onMenuItemClick : "&"
               },
               templateUrl : '/UIComponents/layout/frontend/components/menu/menu.html',
               controller : function($scope, _, $timeout, $location, $route) {
	               var self = this;
                 
                   this.collaspsedCols = [];
                 
	               this.$onInit = function() {
                       this.cols = [];
		               this.cols.push({
                         "key" : this.menuItems.mainMenu,
		                 "class" : "md"
                       });
                     
                       if($route.current && $route.current.$$route) {
                         this.currentRoute =  "#"+$route.current.$$route.originalPath;
                         this.openMenuBasedOnRoute();
                       }else{
                         this.currentRoute = this.menuItems[this.menuItems.mainMenu][0].route;
                       }
                     
                       $scope.$on('$routeChangeStart', function(angularEvent, next, current) { 
                         console.log("next", next);
                         if(next && next.$$route) {
                            console.log("current", next.$$route);
                            
                         	self.currentRoute =  "#"+next.$$route.originalPath;
                         } else {
                           console.log("Missing route definition");
                           angularEvent.preventDefault();
                         }
 					   });
                       $scope.$on('menu:openMenuBasedOnRoute', function(data){
                           self.openMenuBasedOnRoute();
                       })
                       $scope.$on('menu:setSelectedMenu', function(data, colIndex, liIndex){
                           self.addActiveClass(colIndex, liIndex);
                       })
	               };
                 
                  this.openMenuBasedOnRoute = function(){
                    for(menu in this.menuItems){
                      if(menu != "mainMenu"){
                        for(var i = 0; i <= this.menuItems[menu].length; i++){
                          for(row in this.menuItems[menu][i]){
                            if(this.menuItems[menu][i].route == self.currentRoute){
                               this.menuItems[menu][i].active = "true";
                               this.route(this.menuItems[menu][i], null, menu, null, null, true);
                               return;
                            }
                          }
                        }
                      }
                    }
                  }

	               this.route = function(item, event, column, colIndex, liIndex, routingBased) {
                       if(typeof self.onMenuItemClick() == "function"){
                           self.onMenuItemClick()(item);
                       }
                      var subOpened = false;
                     
                     if(routingBased){
                       
                       console.log("routing based");
                       this.collaspsedCols = [];    
                       this.getPreviousCollapsedCols(column);
                       this.collaspsedCols.push(column);
                       this.collaspsedCols.sort();
                       
                       for(var x = 0; x < this.collaspsedCols.length; x++){
                         if(this.collaspsedCols[x] != this.menuItems.mainMenu){
                            this.cols.push({
                             key : this.collaspsedCols[x],
                             class: 'md'
                           });
                         }
                       }
                       
                       // change classes
                       this.modifyColClasses();
                       
                     }else if (typeof item.sub != undefined && item.sub != null) {
                        
                         // close all columns after colIndex;
                         this.cols = this.cols.splice(0, colIndex + 1);

                         // check if sub menu already opened
                         for(var i = 0; i < this.cols.length; i++){
                           if(this.cols[i].key == item.sub){
                             subOpened = true;
                           }
                         }
                         // open column
                         if(!subOpened){
                           this.cols.push({
                             key : item.sub,
                             class: 'md'
                           });
                         }
                         // change classes
                         this.modifyColClasses();
                         // update active class of selected element
                         this.addActiveClass(colIndex, liIndex);
                        
		               } else {
                         // close all columns after colIndex;
                         this.cols = this.cols.splice(0, colIndex + 1);
                         //change classes
                         this.modifyColClasses();
                         // update active class of selected element
                         this.addActiveClass(colIndex, liIndex);
		               }
	               };
                 
                   this.getPreviousCollapsedCols = function(col){
                     
                     for(menu in this.menuItems){
                       if(menu != "mainMenu"){
                         for(var i = 0; i <= this.menuItems[menu].length; i++){
                           for(row in this.menuItems[menu][i]){
                            if(this.menuItems[menu][i].sub == col){
                              if(menu != this.menuItems.mainMenu){
                              	this.collaspsedCols.push(menu);
                              }
                              this.getPreviousCollapsedCols(menu);
                              break;
                            }
                          }
                         }
                       }
                     }
                     
                   }
                 
                   this.modifyColClasses = function(){
                       for(var i = 0; i < this.cols.length; i++){
                         if(i == this.cols.length - 1){
                           this.cols[i].class = 'md'
                         }else{
                           this.cols[i].class = 'sm'
                         }
                       }
                   }
                   
                   this.addActiveClass = function(colIndex, liIndex){
                      var list = document.getElementById(colIndex).getElementsByTagName("li");
                       for (var i = 0; i < list.length; i++){
                           if(list[i].getAttribute("index") == liIndex.toString()){
                             list[i].className = list[i].className = "active";
                           }else{
                              list[i].className = list[i].className = "";
                           }
                       }
                   }
               }
            });