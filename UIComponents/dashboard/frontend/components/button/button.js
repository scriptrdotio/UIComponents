angular.module('Button', ['ngAnimate', 'angularPromiseButtons']);

angular
    .module('Button')
    .component(
    'scriptrButton',
    {

        bindings : {
            
            "size": "@",
            
            "enableResize" : "<?",
            
            "isDisabled": "<?",
            
            "label" : "@",
            
            "type" : "@",
            
            "onButtonclick" : "&",
            
            "onSuccess": "&",
            
            "onFailure": "&",

            "api": "@",   

            "transport": "@",   

            "msgTag" : "@",

            "apiParams" : "<?",

            "onFormatData" : "&"

        },
        templateUrl : '/UIComponents/dashboard/frontend/UIComponents/Components/button/button.html',
        controller : function($scope, $q, $element, $window, $timeout, httpClient, wsClient) {

            var self = this;

            this.$onInit = function() {
                
                this.label = (this.label) ? this.label : "Publish Data";
                
                this.transport = (this.transport) ? this.transport : "wss";
                this.msgTag = (this.msgTag) ? this.msgTag : null;
                this.type = (this.type) ? this.type : "btn-success";
                this.size = (this.size) ? this.size : "";
                this.enableResize = (typeof this.enableResize != 'undefined') ? this.enableResize : true;  
                
                this.class = this.type + " " + this.size;
                
                this.style = {};
                angular.element($window).on('resize', function() {
                    if (self.timeoutId != null) {
                    	$timeout.cancel(self.timeoutId);
                  	}
                 	 return self.timeoutId = $timeout(self.resize, 100);
                 });

            }
            
            self.call = function (api, transport, params)
            {
                if(api) {
                    var defer = $q.defer();
                    if (transport == "wss") {
                        wsClient.onReady.then(function() {
                            wsClient.call(api, params, self.msgTag)
                                .then(
                                function(data, response) {
                                    if(typeof self.onSuccess() == "function"){
                                        self.onSuccess()(self);
                                    }
                                    defer.resolve({ msg: 'SUCCESS' });
                                },
                                function(err) {
                                    console.log( "reject published promise", err);
                                    if(typeof self.onFailure() == "function"){
                                        self.onFailure()(self);
                                    }
                                    defer.resolve({ msg: 'ERROR' });
                                });

                        });
                    } else {
                        if (transport == "https" && api) {
                            if(self.httpsMethod == "post"){
                                httpClient
                                    .post(api, params)
                                    .then(
                                    function(data, response) {
                                        if(typeof self.onSuccess() == "function"){
                                            self.onSuccess()(self);
                                        }
                                        defer.resolve({ msg: 'SUCCESS' });
                                    },
                                    function(err) {
                                        if(typeof self.onFailure() == "function"){
                                            self.onFailure()(self);
                                        }
                                        defer.resolve({ msg: 'ERROR' });
                                        console
                                            .log(
                                            "reject published promise",
                                            err);
                                    });
                            }else{
                                httpClient
                                    .get(api, params)
                                    .then(
                                    function(data, response) {
                                        if(typeof self.onSuccess() == "function"){
                                            self.onSuccess()(self);
                                        }
                                        defer.resolve({ msg: 'SUCCESS' });
                                    },
                                    function(err) {
                                        if(typeof self.onFailure() == "function"){
                                            self.onFailure()(self);
                                        }
                                        defer.resolve({ msg: 'ERROR' });
                                        console
                                            .log(
                                            "reject published promise",
                                            err);
                                    });
                            }
                        }
                    }
                    return defer.promise;
                }
            }
            
            this.$onDestroy = function() {
                angular.element($window).off('resize');
            }
            
            self.success = function () {
                if(typeof this.onButtonclick() == "function"){
                    this.onButtonclick()(self);
                } 
                self.successPromise = self.call(self.api, self.transport, self.apiParams);
            };

            self.resize = function(){
                if(self.enableResize){
                    self.timeoutId = null;
           			self.style["margin-top"] = ($element.parent().outerHeight(true)/2) - ($element.outerHeight(true)/2);
                }
          }
           
           this.$postLink = function() {
                $timeout(self.resize,100);
                if (self.timeoutId != null) {
                	$timeout.cancel(self.timeoutId);
              	}
             	self.timeoutId = $timeout(self.resize, 100);
           }     
        }
    });
