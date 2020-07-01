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
    _create: function() {
        var self = this;
        if(window.location.protocol != "https:") {
            window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
        if(this.options.redirectTarget){
            this.redirectTarget = this.options.redirectTarget;
        }
        if(this.options.expiry){
            this.expiry = this.options.expiry;
        }
        if(this.options.loginApi){
            this.loginApi = this.options.loginApi;  
        }
        $.scriptr.authorization({
            validateTokenApi: this.options.validateTokenApi,
            onTokenValid:jQuery.proxy(function(){
                location.href=  this.redirectTarget;
            },this),
            onTokenInvalid:function(){
                //stay on the page
            }
        });
        
        //added from forgot password
        if (this.options.forgotPasswordApi) {
            this.forgotPasswordApi = this.options.forgotPasswordApi;
        }
        
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
        this.element.find("#submitForgotPassBtn").on("click",jQuery.proxy(this.forgotPassword,this));
        this.element.find("#submitBtn").on("click",jQuery.proxy(this.login,this));
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
        this.element.find("#email").on("keypress",jQuery.proxy(function(e) {
            if (e.keyCode == 13) { 
                this.forgotPassword();	
            }
        },this)) ;
        this.element.find('#forgot_password_anchor').on('click', jQuery.proxy(function(e) {
            this.switchForm('login-wrap', 'forgot-password-wrap');
        }, this));
        this.element.find('#back_to_login_anchor').on('click', jQuery.proxy(function(e) {
            this.switchForm('forgot-password-wrap', 'login-wrap');
        }, this));
    },
    login:function(){
        this.element.data('bootstrapValidator').validate();
        if(!this.element.data('bootstrapValidator').isValid()){
            return;
        }
        this.showLoading();
        var login = this.element.find("#id").val();
        var password=  this.element.find("#password").val();
        var parameters = {"id" : login, "password" : password ,"expiry" : "" + this.expiry};
        $.ajax({
            type: "POST",
            url: "https://"+ document.location.hostname + this.loginApi,
            data: parameters,
            dataType: 'json',
            success: jQuery.proxy(function(data) {
                this.element.data('bootstrapValidator').resetForm();
                var errorMessageDiv = 	this.element.find("#errorMessage");
                if(data.response.metadata.status == "success"){ //script could fail for unexpected reasons.
                    if(data.response.result.metadata && data.response.result.metadata.status == "success"){
                        localStorage.user = JSON.stringify(data.response.result.result.user);
                        location.href= this.redirectTarget;
                    }else{
                        this.hideLoading();
                        errorMessageDiv.removeClass("hide");
                        errorMessageDiv.text("Invalid Username or password.");
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
    forgotPassword: function() {
        this.element.data('bootstrapValidator').validate();
        if (!this.element.data('bootstrapValidator').isValid()) {
            return;
        }
        this.showLoading();
        var email = this.element.find("#email").val();
        var parameters = { "email": email }
        $.ajax({
            type: "POST",
            url: "https://" + document.location.hostname + this.forgotPasswordApi,
            data: parameters,
            dataType: 'json',
            success: jQuery.proxy(function(data) {
                this.element.data('bootstrapValidator').resetForm();
                var errorMessageDiv = this.element.find("#errorMessage");
                var successMessageDiv = this.element.find("#successMessage");
                if (data.response.metadata.status == "success") { //script could fail for unexpected reasons.
                    if (data.response.result.status == "success") {
                        this.hideLoading();
                        successMessageDiv.removeClass("hide");
                        successMessageDiv.text("An email message has been sent to the provided email address with instructions on how to reset your password.");
                        setTimeout(function() {
                            successMessageDiv.addClass("hide");
                        }, 5000);
                    } else {
                        this.hideLoading();
                        errorMessageDiv.removeClass("hide");
                        errorMessageDiv.text(data.response.result.errorDetail);
                        setTimeout(function() {
                            errorMessageDiv.text("");
                            errorMessageDiv.addClass("hide");
                        }, 5000);
                    }
                } else {
                    errorMessageDiv.removeClass("hide");
                    errorMessageDiv.text("An internal error occured.");
                    setTimeout(function() {
                        errorMessageDiv.addClass("hide");
                    }, 5000);
                }
            }, this),
            error: jQuery.proxy(function() {
                this.hideLoading();
                var errorMessageDiv = this.element.find("#errorMessage");
                errorMessageDiv.removeClass("hide");
                errorMessageDiv.text("An internal error occured.");
                setTimeout(function() {
                    errorMessageDiv.addClass("hide");
                }, 5000);
            }, this)
        });
    },
    switchForm: function(source_form, target_form) {
        this.animateSwitchForm(source_form, target_form);
        switch (target_form) {
            case 'login-wrap':
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
                break;
            case 'forgot-password-wrap':
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
                break;
        }
    },
    animateSwitchForm: function(wrap_from, wrap_to) {
        $('#' + wrap_from).fadeOut(function() {
            $('#' + wrap_to).fadeIn(500);
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
