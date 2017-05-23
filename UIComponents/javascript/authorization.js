/**
 Authorization Widget 
  Call it at the beginning of your page as follows to detect whether or not you have a scriptr session or not. You'll also need to get the token to make calls to scriptr. check ../test/home.html
 usage example : 
 
 var authorization = $.scriptr.authorizationWidget({onTokenValid:function(){} , onTokenInvalid:function(){} })
 var token = authorization.getToken();
 var authorizationHeader = authorization.getAuthorizationHeader();
 
 
 Requires : 
 jQuery 1.9.1 +  https://code.jquery.com/jquery-1.9.1.js
 jQuery UI 1.9.1 +  https://code.jquery.com/ui/1.9.1/jquery-ui.js
 jQuery cookie plugin  https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
 
**/

$.widget( "scriptr.authorization", {
 	
   token:null,
   loginPage:"/modules/login/login.html",
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
  		this.validateToken();    
  		
      
    },
  
  	/**
     Returns the header that you'll use to sign requests to scriptr.
    
    **/
  
    getAuthorizationHeader:function(){
      	return {"authorization":"Bearer " + this.token};
    },
  
   /**
     Returns the user that is currently authorized.
    
    **/
    
    getUser:function(){
      	return this.user;
    },
	
  /**
  *	
  *	validates the bearer token at the first load and every 20 seconds the page is open.it calls onTokenValid when the token is detected as   * valid and it calls onTokenInvalid whenever a token is detected to be invalid
  **/
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
				url: "https://"+ document.location.hostname + "/m/validateToken",
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
  	
  	/**Event that is fired whenever a token is detected to be invalid **/
    onTokenInvalid :function(){
     	location.href= this.loginPage;
    },
  	/**
    	Event that is fired whenever a token is detected to be valid
    **/
    onTokenValid:function(){
      
    },
  	
    logout:function(){
    	$.removeCookie('token',{'path':'/'});
      	this.onTokenInvalid();
    }
  
});
