/**
	login widget that gives you instant scriptr device/user login form
	you just need a form with two inputs. Check ../test/login.html
    
    Requires:
    jQuery 1.9.1 +  https://code.jquery.com/jquery-1.9.1.js
 	jQuery UI 1.9.1 +  https://code.jquery.com/ui/1.9.1/jquery-ui.js
 	jQuery cookie plugin  https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
    Bootstrap 3 https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
    Bootstrap validator https://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.3/js/bootstrapValidator.min.js
**/


$.widget( "scriptr.loginWidget", {
  	//relative path to home page
  	redirectTarget :"home.html",
  	expiry:1,
  	anonymousToken:null,
   	_create: function() {
		
	if(window.location.protocol != "https:") {
  		window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
	}
		
     	if(this.options.redirectTarget){
          this.redirectTarget = this.options.redirectTarget;
        }
        if(this.options.expiry){
  			this.expiry = this.options.expiry;
		}
      
      	if(this.options.anonymousToken){
        	this.anonymousToken = this.options.anonymousToken;  
        }
      	
      	$.scriptr.authorization({
          onTokenValid:jQuery.proxy(function(){
            location.href=  this.redirectTarget;
			},this),
          onTokenInvalid:function(){
            	//stay on the page
          }
        });
      		
      this.element.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            id: {
                validators: {
                    notEmpty: {
                        message: 'username is required.'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'Password is required.'
                    }
                }
            }
        }
    }).on('error.validator.bv', function(e, data) {
            // $(e.target)    --> The field element
            // data.bv        --> The BootstrapValidator instance
            // data.field     --> The field name
            // data.element   --> The field element
            // data.validator --> The current validator name

            data.element
                .data('bv.messages')
                // Hide all the messages
                .find('.help-block[data-bv-for="' + data.field + '"]').hide()
                // Show only message associated with current validator
                .filter('[data-bv-validator="' + data.validator + '"]').show();
        });
    
    ;
      
    this.element.find("button").on("click",jQuery.proxy(this.login,this));
        this.element.find("#login").on("keypress",jQuery.proxy(function(e) {
        if (e.keyCode == 13) { 
			this.login();	
      	}
     },this)) ;
      
     this.element.find("#password").on("keypress",jQuery.proxy(function(e) {
        if (e.keyCode == 13) { 
			this.login();	
      	}
     },this)) ;
      
      
	},
  	login:function(){
      	this.element.data('bootstrapValidator').validate();
      	if(!this.element.data('bootstrapValidator').isValid()){
          return;
        }
      
       this.showLoading();

      
      
      	var login = this.element.find("#id").val();
        var password=  this.element.find("#password").val();
          
        var parameters = {"id" : login, "password" : password ,"expiry" : "" + this.expiry,"auth_token":this.anonymousToken};
        $.ajax({
				type: "POST",
				url: "https://"+ document.location.hostname + "/modules/login/login",
				data: parameters,
          		dataType: 'json',
				success: jQuery.proxy(function(data) {
                  	this.element.data('bootstrapValidator').resetForm();
					var errorMessageDiv = 	this.element.find("#errorMessage");
                  	if(data.response.metadata.status == "success"){ //script could fail for unexpected reasons.
                      if(data.response.result.metadata.status == "success"){
                          location.href= this.redirectTarget;
                      }else{
                          this.hideLoading();
                        

                          errorMessageDiv.removeClass("hide");

                          if(data.response.result.metadata.errorCode == "INVALID_USER" || data.response.result.metadata.errorCode == "INVALID_SIGNATURE" || data.response.result.metadata.errorCode == "USER_SUSPENDED"){
                            	
                             errorMessageDiv.text("Invalid Username or password.");
                           }else{
                              errorMessageDiv.text("An internal error occured.");
                           }	
	                       setTimeout(function() {
                              errorMessageDiv.addClass("hide");
                           }, 5000);
                       }
                    }else{
                          errorMessageDiv.removeClass("hide");
                           errorMessageDiv.text("An internal error occured.");
                       setTimeout(function() {
                              errorMessageDiv.addClass("hide");
                           }, 5000);
                    }
                   },this), error:jQuery.proxy(function(){
                            this.hideLoading();
							var errorMessageDiv = 	this.element.find("#errorMessage");
			    			errorMessageDiv.removeClass("hide");
             	            errorMessageDiv.text("An internal error occured.");
                    		setTimeout(function() {
                              errorMessageDiv.addClass("hide");
                           }, 5000);
                
                },this)	
					
			
			});
      },
  
  	  showLoading:function(){
        this.element.find("#submitBtn").hide();
        this.element.find("#loadingDiv").css("display", "");
        
      },
  	  hideLoading:function(){
        this.element.find("#submitBtn").show();
        this.element.find("#loadingDiv").css("display", "none");
      }
  
}
        
);

