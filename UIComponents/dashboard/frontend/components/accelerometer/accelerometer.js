angular.module('Accelerometer', []);

angular
  .module('Accelerometer')
  .component(
     'scriptrAccelerometer',
     {
  
      bindings : {
         "data" : "<?",
      	 "api" : "@",
         "transport" : "@",
 		 "msgTag" : "@",
		 "apiParams" : "<?",
         "onFormatData" : "&"
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/accelerometer/accelerometer.html',
      controller: function(httpClient, wsClient) {
        
        var self = this;
          
           this.$onInit = function() {
               initDataService(this.transport)
           }
        var initDataService = function(transport) {
            if (transport == "wss") {
              wsClient.onReady.then(function() {
                // Subscribe to socket messages with id chart
                wsClient.subscribe(self.msgTag, self.consumeData.bind(self));
                if(self.api) {
                  wsClient.call(self.api, self.apiParams, self.msgTag)
                    .then(function(data, response) {
                    self.consumeData(data)
                  });
                }

              });
            } else {
              if (transport == "https" && self.api) {
              httpClient
                  .get(self.api, self.apiParams)
                  .then(
                  function(data, response) {
                    self.consumeData(data)
                  },
                  function(err) {
                    console
                      .log(
                      "reject published promise",
                      err);
                  });
              }
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
