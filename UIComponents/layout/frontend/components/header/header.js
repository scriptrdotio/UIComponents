angular
      .module('Layout')
	  .constant("defaultLogo", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAAAcCAYAAACZFqbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4QThGRjcwQzA3MjExRTZCMUQyODkwMjQwNUU3QzAyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4QThGRjcxQzA3MjExRTZCMUQyODkwMjQwNUU3QzAyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzhBOEZGNkVDMDcyMTFFNkIxRDI4OTAyNDA1RTdDMDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzhBOEZGNkZDMDcyMTFFNkIxRDI4OTAyNDA1RTdDMDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4xscdBAAAFRElEQVR42uxb3XXiSgw2Oft+fTtwKlhTQaACnAouVLDwmCfgKY9hK4BbQejApAK8FeCtINwKuFL2M2d2ovkzTgJZ65yJ+TGypNFInzSTzuFwiFpq6a3pC//pdDp/tBFosfXokqufdf50ozRr3+iqNcPZT1JC4/nwi5aXqkfraOdPGY0Yr4cXnTpbikoa8zOVLdbTPGX1TetoF0g0cexos9YS7+xojAvowqOnfMyrqMSk1MEaKV1S8GXa0yiaXJ2Qu4dnsJybuvI2WGSkSlTaQOf9meLBGPZLMT9sv6KxikA1DI38YKctwOkznMfFf0Zj5+C5VHgODTxEUgDz0nDLg0UuG81cC8eg1xa8nx36JhbeQ8fvTbST5oQ+yyz8eM5jtpPhnkc4oBfd399nNHY0Drhmv1WdmOBci2ISVSs0BlC1VUtbejlVopiJhgrPf4TvpzZHpsvOApTHBmebnrhGTXql+C526LuVFhXowfF7EyWGOflm4TeA/caGezK99eOgpWKXBO9/ORpWV53S+cYSgnMYvQnaOCY88nBknU5NCT8aAPkc2bKGZSsD+Y09nDr1jGaJwCtW2xu6smsatx0Qvf6b39NYeSrwIKz2BY2uwvOaxshgGJ1uce/c4XTMawT+ahW5Eu7tKzznoVUnPWIGueYGHRjjTFhPxYaSvkshNdn0XWkyq4PtuxJknSiyrixq7XFPNd/7EMe/u7srhXuLI0YT8IoRQ2gYLjOkTJWsWA74QMUGuQfmE7GYPmGQxTuqhmA0i00qnROLvlsfHGnQt3dKGAUmO/hgMcga9DyKajGNMY0ZrvELlIajpRaAmUOIGUBlDGFTgyJj7fdjD+VVIP8Y6GjPhvRTZxKacrSeqzrWQfwHO9o4ekNiH6v2Ogt6szJgmZ6QXteWVPNVCPUu4tD+U0mxIdT9yBaGhIdcLRuWl+y9VmyafKC8DJHW79ZHo4eNSPmfqPpcirOBeGX0hT5LohnV2TPCPbUapmfmZJdI79LTu9KaiwuaOAbpXQWMrgBI90I18egSPKQH80kodaVywI7MUSl+KvoCxbdVN5hedxGlCglbwLkqfJYIe29PmhHHvtEKzr5vrBv9ccSYM5JSEpwsF6r8iycC/qnQweBAVV5pfZKXKGWqmJCmXE6gG23qApsAxzkmYBsCxM+UKjtWuwRDXHmRbrVe0z6wtRJbbFjtsOxCqu0GiRvDU2XcoOUh7nWygCxogZT5nwLye4KipQB0F4hkx74afTaFkz4pn/+F5+mV1I1iQF4hS4uBTUeEF+gfRUIqf4zcOyBTyKzDglEAeE4dzU7m13fg2EKIloyjfyjzkmrYOMZE3yJo5BbcnRtMuEGhEILhMt1WR7+otgtrerBtMk/ZGThWQoh0tUp66ZSsdJo2kHijua+3NxQZ95Hf9lEBp3XCBLQ/QivTOTeVkR3qbrf1fQ898J6mhtknFM0WVXvjqiYYfel6S05WVZE0ujVaFaVQbtfFa/s3qrIKj++voXspPHsNB+sGYNHbgDkqwX92ov1C/WKg2qByMr290UfY22DlDHBVj7gUeDCnvpVn22JC3vwdvAfglWqKVLjvSUpJ4PEUGB1LE8BGz/A6+v3kakiPbO2hNz9/gnEyQWZeuENlbhJhXl4d62F58dsscJGuA1tHKv/RKx1QHbXdpBNIS52vUutnJy1tzimazTT7tP8z0FIjVBVvpe5keupsqV4kU8/mHSs+dT/yEs/316AK2kxsxmo9pp6TDT1PveatrdrUeQoNPO/rtaZq/6/zFPrXs1WyaE0VRf8LMAAs4IRPCpl8ygAAAABJRU5ErkJggg==")
      .component(
            'headerTop',
            {
               bindings : {
	               headerItems : '<headerItems',
                   class : "@",
                   user: '<?',
                   onHeaderItemClick : "&"
               },
               templateUrl : '/UIComponents/layout/frontend/components/header/header.html',
               controller : function($scope, $route, defaultLogo) {
                   var self = this;
	               this.$onInit = function() {
                       if($route.current && $route.current.$$route) {
                         this.currentRoute =  "#"+$route.current.$$route.originalPath;
                       
                       }
                       this.logout = (this.headerItems && this.headerItems.logout) ?   this.headerItems.logout : null;
                       this.appname =  (this.headerItems && this.headerItems.appname) ?  this.headerItems.appname : "";
                       this.logo = (this.headerItems && this.headerItems.logo) ?  this.headerItems.logo : defaultLogo;
                       this.user = (this.user) ? this.user : null;
                       this.items = (this.headerItems && this.headerItems.items) ?  this.headerItems.items : null;
                       this.subitems = (this.headerItems && this.headerItems.subitems) ?  this.headerItems.subitems : null;
                       this.caretlabel =  (this.headerItems && this.headerItems.caretlabel) ?  this.headerItems.caretlabel : null;
 	               }
                   this.onItemClick = function(item){
                     if(typeof self.onHeaderItemClick(item) == "function"){
                        self.onHeaderItemClick()(item);
                     }
                   }
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
                   self.addSelectedClass = function(colIndex){
                     var list = document.getElementsByTagName("a");
                     for (var i = 0; i < list.length; i++){
                           if(list[i].getAttribute("index") == colIndex){
                             list[i].className = list[i].className = "selected";
                           }else{
                              list[i].className = list[i].className = "";
                           }
                       }
                 }
                   $scope.$on('$routeChangeStart', function(angularEvent, next, current) { 
                         console.log("next", next);
                         if(next && next.$$route) {
                            console.log("current", next.$$route);
                         	this.currentRoute =  "#"+next.$$route.originalPath;
                            var list = document.getElementsByTagName("a");
                            for (var i = 0; i < list.length; i++){
                                 if(list[i].getAttribute("route") == this.currentRoute){
                                   list[i].className = list[i].className = "selected";
                                 }else{
                                    list[i].className = list[i].className = "";
                                 }
                             }
                         } else {
                           console.log("Missing route definition");
                           angularEvent.preventDefault();
                         }
 					   });
            
               }
            });