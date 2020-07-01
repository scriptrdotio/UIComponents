//merged with login.js

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
$.widget( "scriptr.forgotPasswordWidget", {
    _create: function() {
        if(window.location.protocol != "https:") {
            window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
        if(this.options.redirectTarget){
            this.redirectTarget = this.options.redirectTarget;
        }
        if(this.options.forgotPasswordApi){
            this.forgotPasswordApi = this.options.forgotPasswordApi;  
        }
        
        this.element.bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required'
                        },
                         emailAddress: {
                            message: 'The value is not a valid email address'
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
        this.element.find("button").on("click",jQuery.proxy(this.forgotPassword,this));
        this.element.find("#submit").on("keypress",jQuery.proxy(function(e) {
            if (e.keyCode == 13) { 
                this.forgotPassword();	
            }
        },this)) ;
        this.element.find("#email").on("keypress",jQuery.proxy(function(e) {
            if (e.keyCode == 13) { 
                this.forgotPassword();	
            }
        },this)) ;
    },
    forgotPassword:function(){
        this.element.data('bootstrapValidator').validate();
        if(!this.element.data('bootstrapValidator').isValid()){
            return;
        }
        this.showLoading();
        var email = this.element.find("#email").val();
        var parameters = {"email" : email} 
        $.ajax({
            type: "POST",
            url: "https://"+ document.location.hostname + this.forgotPasswordApi,
            data: parameters,
            dataType: 'json',
            success: jQuery.proxy(function(data) {
                this.element.data('bootstrapValidator').resetForm();
                var errorMessageDiv = 	this.element.find("#errorMessage");
                var successMessageDiv = 	this.element.find("#successMessage");
                if(data.response.metadata.status == "success"){ //script could fail for unexpected reasons.
                    if(data.response.result.status == "success"){
                        this.hideLoading();
                        successMessageDiv.removeClass("hide");
                        successMessageDiv.text("An email message has been sent to the provided email address with instructions on how to reset your password.");
                        setTimeout(function() {
                            successMessageDiv.addClass("hide");
                        }, 5000);
                    }else{
                        this.hideLoading();
                        errorMessageDiv.removeClass("hide");
                        errorMessageDiv.text(data.response.result.errorDetail);
                        setTimeout(function() {
                            errorMessageDiv.text("");
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
});
