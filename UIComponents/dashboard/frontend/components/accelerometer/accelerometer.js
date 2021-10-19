angular.module('Accelerometer', ['ComponentsCommon', 'DataService']);

angular
  .module('Accelerometer')
  .component(
     'scriptrAccelerometer',
     {
  
      bindings : {
          "data" : "<?",
          "icon": "@",
          "loadingMessage": "@",
          "transport": "@",
          "api" : "@",
          "msgTag" : "@",
          "httpMethod": "@",
          "apiParams" : "<?",
          "onFormatData" : "&",
          "fetchDataInterval": "@",
          "useWindowParams": "@",
          "serviceTag": "@"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/accelerometer/accelerometer.html',
      controller: function(httpClient, wsClient, $scope, $interval, $window, $element, dataService, $timeout) {
        
        var self = this;
          
        this.$onInit = function() {
             /**if(this.data) {
                if(this.data.x){
                    this.data.x = (this.data.x > 20) ? 20 : (this.data.x < -20) ? -20 : this.data.x; 
                    this.xLine = "scaleX("+Math.round(this.data.x)+")";
                } 
           		if(this.data.y){
                     this.data.y = (this.data.y > 20) ? 20 : (this.data.y < -20) ? -20 : this.data.y; 
                     this.yLine = "scaleY("+Math.round(this.data.y)+")";
                } 
            	if(this.data.z) this.angle = "rotateZ("+ Math.round(this.data.z) + "deg )"; 
              }**/
              
              this.loadingMessage = (this.loadingMessage) ? this.loadingMessage : "Waiting for data";
              this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/accelerometer-bg.svg";
                       
              this.hasData = ((!isNaN(self.xLine) && isFinite(self.xLine)) && (!isNaN(self.yLine) && isFinite(self.yLine)) && (!isNaN(self.zLine) && isFinite(self.zLine)))  ?  true : false;
                              
              this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
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
                    if(JSON.stringify(newVal)){
                        self.consumeData(newVal);
                    }
                });
            } else { //Listen on update-data event to build data
                $scope.$on("update-data", function(event, data) {
                   if(data == null) { //typeOf data == 'undefined' || data === null
                       if(self.xLine == null && self.yLine == null && self.zLine == null) {
                           self.noResults = true;
                       } 
                   } else  {
                        if(data[self.serviceTag]) 
                            self.consumeData(data[self.serviceTag]);
                        else if(!self.serviceTag)
                            self.consumeData(data);
                    } 
                });

                $scope.$emit("waiting-for-data");
            }
        }
         
        this.onResize = function() {
            if (self.timeoutId != null) {
                $timeout.cancel(self.timeoutId);
            }
            self.timeoutId = $timeout(self.resize.bind(self), 100);
        }
        
        this.resize =  function() {
            this.calculateNotificationsDisplay();
        }
        
		this.calculateNotificationsDisplay = function() {
            if($element.parent().innerWidth() < 240) {
                self.usePopover = true;
            } else {
                self.usePopover = false;
            }

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
        
         this.$onDestroy = function() {
         	if(self.msgTag) {
            	wsClient.unsubscribe(self.msgTag, null, $scope.$id);
            }
            
            if(self.refreshTimer){
                $interval.cancel( self.refreshTimer );
            }
             
            if (self.timeoutId != null) {
               $timeout.cancel(self.timeoutId);
            }
             
           angular.element($window).off('resize', self.onResize);
        }

          this.consumeData = function(data, response) {
             if(data.status && data.status == "failure") {
                  self.noResults = true;
                  self.dataFailureMessage = "Failure to fetch data.";
                  if(self.xLine && this.yLine && this.angle) {
                      self.stalledData = true;
                      self.dataFailureMessage = "Failure to update data.";
                  } 
              } else {
                  
                  if(typeof self.onFormatData() == "function"){
                      data = self.onFormatData()(data, self);
                  }
                  if(data != null){
                      var x = parseFloat(data.x);
                      var y = parseFloat(data.y);
                      var z = parseFloat(data.z);
                      if(data && (!isNaN(x) && isFinite(x)) && (!isNaN(y) && isFinite(y)) && (!isNaN(z) && isFinite(z))) {
                          data.x = (data.x > 20) ? 20 : (data.x < -20) ? -20 : data.x; 
                          data.y = (data.y > 20) ? 20 : (data.y < -20) ? -20 : data.y;   

                          self.xLine = "scaleX("+Math.round(x)+")";
                          self.yLine = "scaleY("+Math.round(y)+")";
                          self.angle = "rotateZ("+ Math.round(z) + "deg )"; 
                          
                          self.hasData = true;
                          self.noResults = false;
                          self.stalledData = false;
                       }else{
                           self.noResults = true;
                           if(self.xLine != null && self.yLine  != null && self.angle != null ) {
                               self.stalledData = true;
                           } 
                       	   self.dataFailureMessage = "Failed to update data, invalid data format.";
                   	   }
                  } else {
                      self.noResults = true;
                      if(self.xLine != null && self.yLine  != null && self.angle != null ) {
                          self.stalledData = true;
                  	  } 
                      self.dataFailureMessage = "Failed to update data, invalid data format.";
                  }
                  
               }
          }
 
          var makeQuat = function(x,y,z,w)//simple utitlity to make quaternion object
          {
              return  {"x":x,"y":y,"z":z,"w":w};
          }

          var  degToRad  = function(deg)// Degree-to-Radian conversion
          {
              return deg * Math.PI / 180; 
          }       

          //Alpha around Z axis, beta around X axis and gamma around Y axis intrinsic local space  


          var computeQuaternionFromEulers = function(alpha,beta,gamma)
          {
              var x = degToRad(beta) ; // beta value
              var y = degToRad(gamma) ; // gamma value
              var z = degToRad(alpha) ; // alpha value

              //precompute to save on processing time
              var cX = Math.cos( x/2 );
              var cY = Math.cos( y/2 );
              var cZ = Math.cos( z/2 );
              var sX = Math.sin( x/2 );
              var sY = Math.sin( y/2 );
              var sZ = Math.sin( z/2 );

              var w = cX * cY * cZ - sX * sY * sZ;
              var x = sX * cY * cZ - cX * sY * sZ;
              var y = cX * sY * cZ + sX * cY * sZ;
              var z = cX * cY * sZ + sX * sY * cZ;

              return makeQuat(x,y,z,w);	  
          }

        }
	});