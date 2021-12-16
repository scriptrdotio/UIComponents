angular
    .module('Layout')
    .component(
    'collapsibleMenu',
    {
        bindings : {
            headerItems : '<headerItems',
            menuItems: '<menuItems',
            preferredLanguage : '@',
            user: '<?',
            onHeaderItemClick : "&",
            onChangeLanguage : "&"
        },
        templateUrl : '/UIComponents/layout/frontend/components/collapsibleMenu/collapsibleMenu.html',
        controller : function($scope, $route, $element, $window, defaultLogo, constants, $cookies, $translate) {
            var self = this;
            this.$onInit = function() {
                
                this.windowWidth = $window.innerWidth;
              	if(this.windowWidth >= 992)
                  	this.webVersion = true;
              	else
                  	this.webVersion = false;
                
                this.items = this.menuItems && this.menuItems != null ? this.menuItems[this.menuItems.mainMenu] : [];
                
                if($route.current && $route.current.$$route && this.items.length > 0) {
                    this.currentRoute =  $route.current.$$route.originalPath == "/" ? this.items[0].route : "#"+$route.current.$$route.originalPath;
                }else{
                    this.currentRoute = this.items[0].route;
                }
                this.languages = (constants.languages) ? constants.languages : null;
                this.appname =  (this.headerItems && this.headerItems.appname) ?  this.headerItems.appname : "";
                this.user = (this.user) ? this.user : null;
                this.subitems = (this.headerItems && this.headerItems.subitems) ?  this.headerItems.subitems : null;
                this.logo = (this.headerItems && this.headerItems.logo) ?  this.headerItems.logo : defaultLogo;
                this.caretlabel =  (this.headerItems && this.headerItems.caretlabel) ?  this.headerItems.caretlabel : null;
                this.logout = (this.headerItems && this.headerItems.logout) ?   this.headerItems.logout : null;
                this.rolesOrder = (this.headerItems && this.headerItems.rolesOrder) ?   this.headerItems.rolesOrder : null;
                if(this.user) {
                    this.setPrimaryRole();
                } else {
                    this.primaryRole = "Anonymous";
                    this.caretlabel = "anonymous";
                }
                
                $scope.$on('$routeChangeStart', function(angularEvent, next, current) { 
                    console.log("next", next);
                    if(next && next.$$route && next.$$route.originalPath != "") {
                        console.log("current", next.$$route);
                        self.currentRoute =  "#"+next.$$route.originalPath;
                        /** var list = document.getElementsByTagName("a");
                             for (var i = 0; i < list.length; i++){
                                  if(list[i].getAttribute("route") == this.currentRoute){
                                    list[i].className = list[i].className = "selected";
                                  }else{
                                     list[i].className = list[i].className = "";
                                  }
                              }**/
                    } else {
                        console.log("Missing route definition");
                        //angularEvent.preventDefault();
                    }
                });
            };
            
            this.setPrimaryRole = function(){
                var groups = self.user.groups;
                if (groups == null) {
                    groups = [];
                } else if (typeof groups == 'string') {
                    groups = [ self.user.groups ];
                }
                
                if(!this.rolesOrder) {
                    this.primaryRole = groups[0];
                } else {
                    for(var i = 0; i < this.rolesOrder.length; i++){
                        if(groups.indexOf(this.rolesOrder[i]) > -1){
                            this.primaryRole = this.rolesOrder[i]
                            break;
                        }
                    }
                }
            };
            
            this.onItemClick = function(item){
                if(self.onHeaderItemClick(item) && typeof self.onHeaderItemClick(item) == "function"){
                    self.onHeaderItemClick()(item);
                }
            };
            
            this.onChangeLang = function(item){
                if(self.onChangeLanguage && typeof self.onChangeLanguage == "function") {
                    self.onChangeLanguage()(item.value);
                }
            };
            
            /*
                   this.$postLink = function() {
                     var list = document.getElementsByTagName("a");
                     for (var i = 0; i < list.length; i++){
                       if(list[i].getAttribute("route") == this.currentRoute){
                         list[i].className = list[i].className = "selected";
                       }else{
                         list[i].className = list[i].className = "";
                       }
                     }
     			   }
                   */
            
            this.toggleMenu = function(event){
                this.hideLanguageMenu();
                this.hideProfileMenu();
                angular.element($element).find("#mobile-menu").toggleClass('btn-open').toggleClass('btn-close');
                $('body').toggleClass('noScroll');
                angular.element($element).find(".overlay-menu").fadeToggle(200,function(){
                    angular.element($element).find(".menu-opened").toggleClass('open');
                });
                //angular.element($element).find(".menu-opened").toggleClass('open');
            };
            
            this.hideMenu = function() {
                if(angular.element($element).find("#mobile-menu").hasClass("btn-close")) {
                    //angular.element($element).find("#mobile-menu").removeClass('btn-close').addClass('btn-open');
                	//$('body').removeClass('noScroll');
                    angular.element($element).find("#mobile-menu").toggleClass('btn-close').toggleClass('btn-open');
                    $('body').toggleClass('noScroll');
               		angular.element($element).find(".overlay-menu").fadeOut(200);
                }
            };
            
            this.hideLanguageMenu = function() {
                angular.element($element).find(".overlay-language").fadeOut(200);
            };
            
            this.hideProfileMenu = function() {
                angular.element($element).find(".overlay-profile").fadeOut(200);
            };
            
            this.toggleProfileMenu = function() {
                this.hideMenu();
                this.hideLanguageMenu();
                angular.element($element).find(".overlay-profile").fadeToggle(200);
            };
            
            this.toggleLanguageMenu = function() {
                this.hideMenu();
                this.hideProfileMenu();
                angular.element($element).find(".overlay-language").fadeToggle(200);
            };
            
            this.inGroup = function(roles){
                //No roles are required for menu entry
                if(!roles || roles.length == 0) 
                    return true;
                //If roles is required for user but no user defined, or no groups for user
                if(roles && roles.length > 0 && (!self.user || (self.user && !self.user.groups))) 
                    return false;
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
            };
            
            this.checkIfSelected = function(item) {
                if(item["subitems"]){
                    for(var i = 0; i < item["subitems"].length; i++) {
                        if((self.currentRoute).includes(item["subitems"][i].route))
                            return true;
                    }
                    return false;
                }else{
                    if((self.currentRoute).includes(item.route))
                        return true;
                }
                return false;
            };
        }
    });