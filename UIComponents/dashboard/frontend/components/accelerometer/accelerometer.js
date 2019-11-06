angular.module('Accelerometer', []);

angular
  .module('Accelerometer')
  .component(
     'scriptrAccelerometer',
     {
  
      bindings : {
         "data" : "<?",
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
      controller: function(httpClient, wsClient, $scope, $interval, dataService) {
        
        var self = this;
          
        this.$onInit = function() {
              if(this.data) {
                if(this.data.x){
                    this.data.x = (this.data.x > 20) ? 20 : (this.data.x < -20) ? -20 : this.data.x; 
                    this.xLine = "scaleX("+Math.round(this.data.x)+")";
                } 
           		if(this.data.y){
                     this.data.y = (this.data.y > 20) ? 20 : (this.data.y < -20) ? -20 : this.data.y; 
                     this.yLine = "scaleY("+Math.round(this.data.y)+")";
                } 
            	if(this.data.z) this.angle = "rotateZ("+ Math.round(this.data.z) + "deg )"; 
              }
            
              this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
              initDataService(this.transport);
        }
        var initDataService = function(transport) {
            if((transport == "wss" && (this.api || this.msgTag)) || (transport == "https" && this.api)) {
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
            } else {
                $scope.$emit("waiting-for-data");
                $scope.$on("update-data", function(event, data) {
                    if(data && data[self.serviceTag])
                        self.consumeData(data[self.serviceTag]);
                    else
                        self.consumeData(data);
                });
            }
          }
        
         this.$onDestroy = function() {
         	if(self.msgTag) {
            	wsClient.unsubscribe(self.msgTag, null, $scope.$id);
            }
            
            if(self.refreshTimer){
                $interval.cancel( self.refreshTimer );
            }
        }

          this.consumeData = function(data, response) {
            if(typeof self.onFormatData() == "function"){
              data = self.onFormatData()(data);
            }
           //var obj = computeQuaternionFromEulers(data["GYR_X"], data["GYR_Y"], data["GYR_Z"])
           //var obj = { x: data["Acc_X"], y: data["Acc_Y"], z: data["Acc_Z"]}
           // var obj = {x: 10, y: 100, z: 30}
           //console.log(obj)
              
            data.x = (data.x > 20) ? 20 : (data.x < -20) ? -20 : data.x; 
            data.y = (data.y > 20) ? 20 : (data.y < -20) ? -20 : data.y;   
              
            this.xLine = "scaleX("+Math.round(data.x)+")";
            this.yLine = "scaleY("+Math.round(data.y)+")";
            this.angle = "rotateZ("+ Math.round(data.z) + "deg )"; 
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