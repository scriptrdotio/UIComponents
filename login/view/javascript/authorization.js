$.widget( "scriptr.authorization", {
    token:null,
    user:null,
    _create: function() {
        if(!this.options.onTokenValid){
            this.onTokenValid = function(){ 
            }
        }else{
            this.onTokenValid = this.options.onTokenValid;
        }
        if(this.options.onTokenInvalid){
            this.onTokenInvalid = this.options.onTokenInvalid;
        }
        if(this.options.loginPage){
            this.loginPage = this.options.loginPage;
        }
        if(this.options.validateTokenApi){
            this.validateTokenApi = this.options.validateTokenApi;
        }
        this.validateToken();    
    },
    
    //Returns the header that you'll use to sign requests to scriptr.
    getAuthorizationHeader:function(){
        return {"authorization":"Bearer " + this.token};
    },
    
    //Returns the user that is currently authorized.
    getUser:function(){
        return this.user;
    },
 
  	//validates the bearer token at the first load and every 20 seconds the page is open.it calls onTokenValid when the token is detected as valid andit calls onTokenInvalid whenever a token is detected to be invalid
    validateToken:function(){
        if($.cookie('token') && $.cookie('token') != ''){
            this.token = $.cookie('token');
        }else{
            this.onTokenInvalid();
            return;
        }
        $.ajax({
            type: "POST",
            headers:this.getAuthorizationHeader(),
            url: "https://"+ document.location.hostname + this.validateTokenApi,
            dataType: 'json',
            success:jQuery.proxy(function(data){
                if(data.response.metadata.status == "success"){
                    this.user = data.response.result;
                    this.onTokenValid();
                    setTimeout(jQuery.proxy(this.validateToken,this), 20000);
                }
            },this),
            error:jQuery.proxy(function(data){
                data = JSON.parse(data.responseText);
                if(data.response.metadata.status = "failure"){
                    if(data.response.metadata.errorCode == "INVALID_TOKEN" || data.response.metadata.errorCode == "INVALID_SIGNATURE" ){
                        this.onTokenInvalid();
                    } 	
                }
            },this) 		     	
        });
    },
    
    //Event that is fired whenever a token is detected to be invalid 
    onTokenInvalid :function(){
        $.removeCookie('user',{'path':'/'});
        $.removeCookie('token',{'path':'/'});
        location.href= this.loginPage;
    },
    
    //Event that is fired whenever a token is detected to be valid
    onTokenValid:function(){
    },
    
    logout:function(){
        $.removeCookie('user',{'path':'/'});
        $.removeCookie('token',{'path':'/'});
        location.href= this.loginPage;
    }
});
