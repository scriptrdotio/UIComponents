angular
    .module('Layout')
    .component(
    'menu',
    {
        bindings : {
            menuItems : '<menuItems',
            user: '<?',
            onMenuItemClick : "&"
        },
        templateUrl : '/UIComponents/layout/frontend/components/menu/menu.html',
        controller : function($scope, _, $timeout, $location, $route) {
            var self = this;

            this.collaspsedCols = [];

            this.$onInit = function() {
                this.initializeDefaultMenu();

                if($route.current && $route.current.$$route) {
                    this.currentRoute =  "#"+$route.current.$$route.originalPath;
                }else{
                    this.currentRoute = this.menuItems[this.menuItems.mainMenu][0].route;
                }
                
                this.setActiveMenuItem();

                $scope.$on('$routeChangeSuccess', function(angularEvent, next, current) { 
                    console.log("next", next);
                    if(next && next.$$route) {
                        console.log("current", next.$$route);

                        self.currentRoute =  "#"+next.$$route.originalPath;
                        self.setActiveMenuItem();
                    } else {
                        console.log("Missing route definition");
                        //angularEvent.preventDefault();
                    }
                });
            };

            this.$postLink = function () {
                $scope.$watch(function( $scope ) {
                    if(($scope.$ctrl.currentRoute)){
                        return $scope.$ctrl.currentRoute
                    }
                },function(newVal){
                    if(newVal){
                        if(newVal == "#/") self.currentRoute = this.menuItems[this.menuItems.mainMenu][0].route;
                        self.openMenuBasedOnRoute();
                    }
                });
            }

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

            this.inGroup = function(roles){
                if(self.user && self.user.groups){
                    var groups = self.user.groups;
                    if (self.user.groups == null) {
                        groups = [];
                    } else if (typeof self.user.groups == 'string') {
                        groups = [ self.user.groups ];
                    }
                    var inRole = false;
                    if(roles){
                        for(var i = 0; i < roles.length; i++){
                            if(groups.indexOf(roles[i]) > -1){
                                inRole = true;
                                break
                            }
                        } 
                    }else{
                        inRole = true;
                    }
                    return inRole; 
                }
            }

            this.route = function(item, event, column, colIndex, liIndex, routingBased) {
                if(typeof self.onMenuItemClick() == "function"){
                    self.onMenuItemClick()(item);
                }
                var subOpened = false;
                if(routingBased){
                    
                    this.collaspsedCols = [];    
                    this.getPreviousCollapsedCols(column);
                    this.collaspsedCols.push(column);
                    this.collaspsedCols.sort();

                    this.initializeDefaultMenu();

                    for(var x = 0; x < this.collaspsedCols.length; x++){
                        if(this.collaspsedCols[x] != this.menuItems.mainMenu){
                            if(this.collaspsedCols[x] != this.cols[x].key){
                                this.cols.push({
                                    key : this.collaspsedCols[x],
                                    class: 'md'
                                }); 
                            } 
                        }
                    }
                    // change classes
                    this.modifyColClasses();
                    // update active class of selected element
                    this.addActiveClass(this.cols.length -1, this.getSelectedRowInCol(this.cols[this.cols.length -1].key));

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

            this.initializeDefaultMenu = function(){
                this.cols = [];
                this.cols.push({
                    "key" : this.menuItems.mainMenu,
                    "class" : "md"
                });
            }

            this.getSelectedRowInCol = function(menu){
                for(var i = 0; i < this.menuItems[menu].length; i++){
                    if(this.menuItems[menu][i].route == self.currentRoute){
                        return i
                    }
                }  
            }

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
                var col = document.getElementById(colIndex);
                if(col){
                    var list = col.getElementsByTagName("li");
                    for (var i = 0; i < list.length; i++){
                        if(list[i].getAttribute("index") == liIndex.toString()){
                            list[i].className = "active";
                        }else{
                            list[i].className = "";
                        }
                    }
                }
            }
            
            this.setActiveMenuItem = function(){
                var self = this;
                _.forEach(this.menuItems[this.menuItems.mainMenu], function(item, idx){
                    if(item.route && item.route == self.currentRoute)
                        item.active = "true";
                    else if(item.routes){
                        var isFound = false;
                        _.forEach(item.routes, function(route, idx){
                            if(self.currentRoute.indexOf(route) != -1){
                                isFound = true;
                                item.active = "true";
                            }
                        });
                        if(!isFound)
                            item.active = "false";
                    }else{
                        item.active = "false";
                    }
                });
            }
        }
    });