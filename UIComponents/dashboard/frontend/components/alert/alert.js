angular.module('Alert', ['angular-scriptrui','ComponentsCommon', 'DataService', 'slickCarousel']);

angular
  .module('Alert')
  .component(
     'scriptrAlert',
     {
  
      bindings : {
          "data": "<?",
          "type": "@",
          "icon": "@",
          "transport": "@",
          "loadingMessage": "@",
          "api" : "@",
          "msgTag" : "@",
          "httpMethod": "@",
          "apiParams" : "<?",
          "onFormatData" : "&",
          "fetchDataInterval": "@",
          "useWindowParams": "@",
          "serviceTag": "@",
		  "wrapperClass": "@",
		  "enabled": "@",
		  "draggable": "@",
		  "autoplaySpeed": "@",
		  "infinite": "@",
		  "slidesToShow": "@",
		  "slidesToScroll": "@",
		  "autoPlay": "@",
		  "initOnload": "@",
		  "arrows": "@", //boolean. Prev/Next Arrows
		  "prevArrow": "@", //string (html|jQuery selector) | object (DOM node|jQuery object)
		  "nextArrow": "@", //string (html|jQuery selector) | object (DOM node|jQuery object)
		  "dots": "@", //boolean. show dots
		  "dotsClass": "@", //default 'slick-dots'
		  "fade": "@", //boolean
		  "pauseOnFocus": "@", //Pause Autoplay On Focus
		  "pauseOnHover": "@", //Pause Autoplay On Hover
		  "pauseOnDotsHover": "@", //Pause Autoplay when a dot is hovered,
		  "responsive": "<?", //object containing responsive breakpoints
		  "speed": "@", //Slide/Fade animation speed. Default: 300
		  "swipe": "@" //enable swiping
	  },
      templateUrl:'/UIComponents/dashboard/frontend/components/alert/alert.html',
      controller: function(httpClient, wsClient,dataService,$scope,$interval, $window, $element, $timeout) {
         var self = this;
          
         this.$onInit = function() {
            this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/alert-bg.svg";
            this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data";           
            this.hasData = (this.data && this.data.values && this.data.values.length > 0) ?  true : false;
            this.title = (this.title) ? this.title : "Alerts";
			this.titleIcon = (this.titleIcon) ? this.titleIcon : null;
            //this.data = (this.data) ? this.data : "Waiting for info...";
			this.slickConfig = {};
            if(this.draggable){
                this.slickConfig["draggable"] = this.draggable == "false" ? false : true;   
            }
            if(this.autoPlay){
                this.slickConfig["autoplay"] = this.autoPlay == "false" ? false : true;   
            }
            if(this.autoplaySpeed){
                this.slickConfig["autoplaySpeed"] = this.autoplaySpeed;   
            }
			if(this.responsive){
				this.slickConfig["responsive"] = this.responsive;
			}
            if(this.infinite){
				this.slickConfig["infinite"] = this.infinite == "false" ? false : true;
			}
			if(this.arrows){
				this.slickConfig["arrows"] = this.arrows == "false" ? false : true;
			}
			if(this.prevArrow){
				this.slickConfig["prevArrow"] = this.prevArrow;
			}
			if(this.nextArrow){
				this.slickConfig["nextArrow"] = this.nextArrow;
			}
			if(this.dots){
				this.slickConfig["dots"] = this.dots == "false" ? false : true;
			}
			if(this.dotsClass){
				this.slickConfig["dotsClass"] = this.dotsClass;
			}
			if(this.fade){
				this.slickConfig["fade"] = this.fade == "false" ? false : true;
			}
			if(this.pauseOnFocus){
				this.slickConfig["pauseOnFocus"] = this.pauseOnFocus;
			}
			if(this.pauseOnHover){
				this.slickConfig["pauseOnHover"] = this.pauseOnHover;
			}
			if(this.pauseOnDotsHover){
				this.slickConfig["pauseOnDotsHover"] = this.pauseOnDotsHover;
			}
			if(this.speed){
				this.slickConfig["speed"] = this.speed;
			}
			if(this.swipe){
				this.slickConfig["swipe"] = this.swipe == "false" ? false : true;
			}
      	 }
         
          this.$postLink = function () {
              
            self.timeoutId = $timeout(self.resize.bind(self), 100);
            angular.element($window).on('resize', self.onResize);
            
            if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                initDataService(this.transport);
            } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                $scope.$watch(function( $scope ) {
                    // wait for the timeout
                    if($scope.$ctrl.data){
                        return $scope.$ctrl.data
                    }
                },function(newVal, oldVal){
                	if(JSON.stringify(newVal) != JSON.stringify(oldVal) || !self.hasData){
                        self.consumeData(newVal);
                    }
                });
            } else { //Listen on update-data event to build data
                 $scope.$on("update-data", function(event, data) {
                     if(data == null) { //typeOf data == 'undefined' || data === null
                          if(!self.values || self.values == null || self.values.length == 0) {
                              self.noResults = true;
                          } 
                      } else {
                         if(data[self.serviceTag])
                             self.consumeData(data[self.serviceTag]);
                         else if(!self.serviceTag)
                             self.consumeData(data);
                     }  
                 });

                 $scope.$emit("waiting-for-data");
             }
        }
         
		this.calculateNotificationsDisplay = function() {
            if($element.parent().innerWidth() < 240) {
                self.usePopover = true;
            } else {
                self.usePopover = false;
            }
        }   
        
        this.onResize = function() {
            if (self.timeoutId != null) {
                $timeout.cancel(self.timeoutId);
            }
            self.timeoutId = $timeout(self.resize.bind(self), 100);
        }
        
        this.resize = function() {
            this.calculateNotificationsDisplay();
        }
        
        this.$onDestroy = function() {
            console.log("destory alert", self.msgTag, $scope.$id);
            if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
            
            if(self.refreshTimer) {
                $interval.cancel( self.refreshTimer );
            }
            
            if (self.timeoutId != null) {
               $timeout.cancel(self.timeoutId);
           }
            
            angular.element($window).off('resize', self.onResize);
        }

        var initDataService = function(transport) {
             var requestInfo = {
                 "api": self.api,
                 "transport": transport,
                 "msgTag": self.msgTag,
                 "apiParams": self.apiParams,
                 "useWindowParams": self.useWindowParams,
                 "httpMethod": self.httpMethod,
                 "widgetId": $scope.$id
             };
            dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));

            if(self.fetchDataInterval && !self.refreshTimer) {
                //Assuming this is success
                self.refreshTimer = $interval(
                    function(){
                        initDataService(self.transport)
                    }, self.fetchDataInterval * 1000);
            }

        }              

        this.consumeData = function(data, response) {
             if(data.status && data.status == "failure") {
                 self.noResults = true;
                 self.dataFailureMessage = "Failed to fetch data.";
                 if(self.values && self.values.length > 0) {
                     self.stalledData = true;
                     self.dataFailureMessage = "Failed to update data.";
                 }
             } else {
                 if(typeof self.onFormatData() == "function"){
                     data = self.onFormatData()(data, self);
                 }
                 if(data != null) {
				 	console.log("typeof data:", typeof data);
                     if(typeof data == "object"){  
                         if(data && data != null){
							 console.log(data.constructor);
							 if(data.title){
                             	self.title = data.title.value;
								if(data.title.icon)
									self.titleIcon = data.title.icon;
							 }
							 self.values = data.values;
							 //backward compatibility
							 if(!data.values && data.message){
							 	self.values = [{"message": data.message, "type": (data.type || "INFO")}];
							 }
                             self.hasData = true;
                             self.noResults = false;
                             self.stalledData = false;
                         }  else {
                             self.noResults = true;
							 if(self.values && self.values.length > 0) {
							 	self.stalledData = true;
							 }
                             self.dataFailureMessage = "Failed to update data, invalid data format.";
                         }
                     } else {
                         self.values = [{"message": data}];
                         self.hasData = true;
                         self.noResults = false;
                         self.stalledData = false;
                     } 
                    
                 } else {
                     self.noResults = true;
                     if(self.values && self.values.length > 0) {
                         self.stalledData = true;
                     } 
                     self.dataFailureMessage = "Failed to update data, invalid data format.";
                 }
             }
            
        }
        }
	});
