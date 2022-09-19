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
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    console.log("name:"+name+", results : "+results+" "+window.location.href)
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}

$.widget( "scriptr.loginWidget", {
    _create: function() {
        var self = this;
        this.resend = false;
        if(window.location.protocol != "https:") {
            window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
        this.urlLang = $.urlParam("lang");
        this.defaultLang = this.urlLang != null ? this.urlLang : "en";
        $.i18n().locale = this.defaultLang;
        
        this.resetCode = $.urlParam("resetCode");
        
        if(this.options.redirectTarget){
            this.redirectTarget = this.options.redirectTarget;
        }
        
         if(this.options.redirectResetTarget){
            this.redirectResetTarget = this.options.redirectResetTarget;
        }
        if(this.options.expiry){
            this.expiry = this.options.expiry;
        }
        if(this.options.loginApi){
            this.loginApi = this.options.loginApi;  
        }
        if(this.options.registerApi){
            this.registerApi = this.options.registerApi;  
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
        
        if (this.options.forgotPasswordApi) {
            this.forgotPasswordApi = this.options.forgotPasswordApi;
        }
        
        if(this.options.resetPasswordApi){
            this.resetPasswordApi = this.options.resetPasswordApi;  
        }
        
        $(document).ready(jQuery.proxy(function() {
            this.verified = $.urlParam("verified");
            $("#verification-success-div").hide();
            
			$(".signin_block").hide();
            
            if(this.resetCode != null){
            	this.id = $.urlParam("id");
                if(this.id != null){
                    this.element.find("#id").val(this.id);
                    this.element.find("#id").prop("disabled", true);
                }
                
                $("#reset-password-form-wrap").show();
                
                onLoad("reset-password-form-wrap");        

            }else{
                $("#login-wrap").show();
                $(".mobile_view").find("#login-wrap").show()
            }
            if(this.verified){
                // show verification message
                $("#verification-success-div").show();
            }
            if(this.element.find("#langSelect") != null){
                this.element.find("#langSelect").val(this.defaultLang);
                this.element.find("#langSelect").on("change", jQuery.proxy(this.changeLanguage,this));
            }
        }, this));
        /* mobile's */
        $("#signup_anchor").click(function(){
            $("#login-wrap").hide();
            $("#registration-form-wrap").show();            
            
            $(".mobile_view").find("#login-wrap").hide()
            $(".mobile_view").find("#registration-form-wrap").show();            
            
            $(".signup_block").hide();
            $(".signin_block").show();
        });
        $("#signin_anchor").click(function(){
            $("#login-wrap").show();
            $("#registration-form-wrap").hide();
            
            $(".mobile_view").find("#login-wrap").show()
            $(".mobile_view").find("#registration-form-wrap").hide();
            $(".signin_block").hide();
            $(".signup_block").show();
        });
        
        /* registration form */
         $('#registerForm').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                register_firstName: {
                    validators: {
                        notEmpty: {
                            message: 'register-first-name-required-error'
                        }
                    }
                },
                register_lastName: {
                    validators: {
                        notEmpty: {
                            message: 'register-last-name-required-error'
                        }
                    }
                },
                register_phone: {
                    validators: {
                        notEmpty: {
                            message: 'register-phone-required-error'
                        },
                        regexp: {
                            regexp: /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/i,
                            message: 'register-phone-validation-error'//'register-phone-required-error'
                        }
                    }
                },
                register_email: {
                    validators: {
                        notEmpty: {
                            message: 'register-email-required-error'
                        },
                        emailAddress: {
                            message: 'register-email-validation-error'//'register-email-required-error'
                        }
                    }
                },
                register_password: {
                    validators: {
                        notEmpty: {
                            message: 'register-password-required-error'
                        }
                    }
                },
                register_confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: 'register-confirm-password-required-error'
                        },
                        identical: {
                            field: 'register_password',
                            message: 'confirm-password-error'
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
            var el = data.element
                .data('bv.messages')
            // Hide all the messages
                .find('.help-block[data-bv-for="' + data.field + '"]').hide()
            // Show only message associated with current validator
                .filter('[data-bv-validator="' + data.validator + '"]');
            //translate error message before showing field
            el[0].innerText = $.i18n(el[0].innerText);
            el.show();
        });
        /* end of  registration form */
        
        $('#loginForm').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                id: {
                    validators: {
                        notEmpty: {
                            message: 'username-required-error'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'password-required-error'
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
            var el = data.element
                .data('bv.messages')
            // Hide all the messages
                .find('.help-block[data-bv-for="' + data.field + '"]').hide()
            // Show only message associated with current validator
                .filter('[data-bv-validator="' + data.validator + '"]');
            //translate error message before showing field
            el[0].innerText = $.i18n(el[0].innerText);
            el.show();
        });
        
        $('#forgotPassForm').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'email-required-error'
                        },
                        regexp: {
                            regexp: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                            message: 'email-invalid-error'
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
            var el = data.element
                .data('bv.messages')
            // Hide all the messages
                .find('.help-block[data-bv-for="' + data.field + '"]').hide()
            // Show only message associated with current validator
                .filter('[data-bv-validator="' + data.validator + '"]');
            //translate error message before showing field
            el[0].innerText = $.i18n(el[0].innerText);
            el.show();
        });
        
        $('#resetPassForm').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                 id: {
                    validators: {
                        notEmpty: {
                            message: 'empty-username-error'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'empty-password-error'
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: 'confirm-password-empty'
                        },
                        identical: {
                            field: 'password',
                            message: 'confirm-password-error'
                        }
                    }
                 },
            }
        }).on('error.validator.bv', function(e, data) {
            // $(e.target)    --> The field element
            // data.bv        --> The BootstrapValidator instance
            // data.field     --> The field name
            // data.element   --> The field element
            // data.validator --> The current validator name
            var el = data.element
                .data('bv.messages')
            // Hide all the messages
                .find('.help-block[data-bv-for="' + data.field + '"]').hide()
            // Show only message associated with current validator
                .filter('[data-bv-validator="' + data.validator + '"]');
            //translate error message before showing field
            el[0].innerText = $.i18n(el[0].innerText);
            el.show();
        });
        
        
        
        this.element.find("#submitForgotPassBtn").on("click",jQuery.proxy(this.forgotPassword,this));
        this.element.find("#submitBtn").on("click",jQuery.proxy(this.login,this));
        this.element.find("#submitResetPasswordBtn").on("click",jQuery.proxy(this.resetPassword,this));
        this.element.find("#submitRegBtn").on("click",jQuery.proxy(this.register,this));
        
        /* if resend verification email link is requested */
        //this.element.find("#verification_email_anchor").on("click",jQuery.proxy(function(e){
        $("#verification_email_anchor").on("click",jQuery.proxy(function(e){
        	// set resend flag and call register functions
            //alert("alert");
            this.resend = true;
            this.register();
        },this));
        
         this.element.find('#back_to_login_anchor').on('click', jQuery.proxy(function(e) {
            this.switchForm('forgot-password-wrap', 'login-wrap');
        }, this));
        
        /* register form handling enter */
        $('#registerForm').on('keypress', jQuery.proxy(function(e) {
            e.stopImmediatePropagation();
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) { 
                e.preventDefault();
                this.register();
            }
        }, this));
        
        $('#loginForm').on('keypress', jQuery.proxy(function(e) {
            e.stopImmediatePropagation();
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) { 
                e.preventDefault();
                this.login();
            }
        }, this));
        
        $('#forgotPassForm').on('keypress', jQuery.proxy(function(e) {
            e.stopImmediatePropagation();
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) { 
                e.preventDefault();
                this.forgotPassword();
            }
        }, this));
        
        $('#resetPassForm').on('keypress', jQuery.proxy(function(e) {
            e.stopImmediatePropagation();
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) { 
                e.preventDefault();
                this.resetPassword();
            }
        }, this));

        this.element.find('#forgot_password_anchor').on('click', jQuery.proxy(function(e) {
            // store email before switching and resetting the forms 
            //var email = $('#loginForm #id').val()
            this.switchForm('login-wrap', 'forgot-password-wrap');
            // carry the username to forgot password
            //$("#forgotPassForm #email").val(email)
        }, this));
        this.element.find('#back_to_login_anchor').on('click', jQuery.proxy(function(e) {
            this.switchForm('forgot-password-wrap', 'login-wrap');
        }, this));
    },
    
    register:function(){
        var validator = $('#registerForm').data('bootstrapValidator');
        validator.validate();
        if(!validator.isValid()){
            return;
        }
        this.showLoading();
        var fname 	= $("#register_firstName").val();//this.element.find("#register_firstName").val();
        var lname	= $("#register_lastName").val();//this.element.find("#register_lastName").val();
      	var phone	= $("#register_phone").val();//this.element.find("#register_phone").val();
        var email	= $("#register_email").val();//this.element.find("#register_email").val();
        var password= $("#register_password").val();//this.element.find("#register_password").val();
        
        var resend = false
        // if clicked by resend
        if(this.resend){
            resend = true
        }
        var parameters = {"fname" : fname,"lname":lname,"phone":phone,"email":email, "password" : password, "resend":resend};
        
        console.log("location : "+document.location.hostname + this.registerApi)
        console.log("parameters : "+JSON.stringify(parameters))
        
        $.ajax({
            type: "POST",
            url: "https://"+ document.location.hostname + this.registerApi,
            data: parameters,
            dataType: 'json',
            success: jQuery.proxy(function(data) {
                validator.resetForm();

                $('#verification-error-div').hide();//verification-success
                $('#duplicate-error-div').hide();
                $('#verification-success').hide();
                $('#errorMessage').removeClass("hide");//.hide();
                
                if(data.response.metadata.status == "success"){ //script could fail for unexpected reasons.
                    if(data.response.result && data.response.result.status == "success"){
                        // if verification was resent show message
                        $("#verification-success").show();
                        
                        $("#registerForm-title").hide()
                        $("#registerForm").hide()
                        /*if(data.response.result.message == "REGISTRATION_SUCCESS"){
                            //localStorage.user = JSON.stringify(data.response.result.result.user);
                            location.href= this.redirectTarget;
                        }*/
                        
                    }else{
                        if(data.response.result && data.response.result.errorCode == "VERIFICATION_PENDING"){
                            console.log("verification pending")
                            // show verification message 
                            $('#verification-error-div').show();
                            $("#registerForm").scrollTop( 0 );
                        }else if(data.response.result && data.response.result.errorCode == "DUPLICATE_USER"){
                            // show duplicate user message
                            $('#duplicate-error-div').show();
                            $("#registerForm").scrollTop( 0 );
                        }
                    }
                }else{
                    console.log("failed 2")
                }
            },this), error:jQuery.proxy(function(){
                this.hideLoading();
                var errorMessageDiv = 	this.element.find("#errorMessage");
                errorMessageDiv.removeClass("hide");
                errorMessageDiv.text($.i18n('INTERNAL_ERROR'));
                setTimeout(function() {
                    errorMessageDiv.addClass("hide");
                }, 5000);
            },this)	
        });
        
        
    },
    login:function(){
        var validator = $('#loginForm').data('bootstrapValidator');
        validator.validate();
        if(!validator.isValid()){
            return;
        }
        this.showLoading();
        var login = this.element.find("#id").val();
        var password=  this.element.find("#password").val();
      	var langSelect=  this.element.find("#langSelect") ? this.element.find("#langSelect").val() : null;
        var parameters = {"id" : login, "password" : password, "langSelect" : langSelect};
        $.ajax({
            type: "POST",
            url: "https://"+ document.location.hostname + this.loginApi,
            data: parameters,
            dataType: 'json',
            success: jQuery.proxy(function(data) {
                validator.resetForm();
                var errorMessageDiv = $("#errorMessage");//this.element.find("#errorMessage");
                if(data.response.metadata.status == "success"){ //script could fail for unexpected reasons.
                    if(data.response.result.metadata && data.response.result.metadata.status == "success"){
                        localStorage.user = JSON.stringify(data.response.result.result.user);
                        location.href= this.redirectTarget;
                    }else{
                        this.hideLoading();
                        errorMessageDiv.show();
                        errorMessageDiv.removeClass("hide");
                        errorMessageDiv.text($.i18n('invalid-login-credentials'));
                        setTimeout(function() {
                            errorMessageDiv.addClass("hide");
                            errorMessageDiv.hide();
                        }, 5000);
                    }
                }else{
                    errorMessageDiv.show();
                    errorMessageDiv.removeClass("hide");
                    errorMessageDiv.text($.i18n('INTERNAL_ERROR'));
                    setTimeout(function() {
                        errorMessageDiv.addClass("hide");
                        errorMessageDiv.hide();
                    }, 5000);
                }
            },this), error:jQuery.proxy(function(){
                this.hideLoading();
                var errorMessageDiv = 	this.element.find("#errorMessage");
                errorMessageDiv.removeClass("hide");
                errorMessageDiv.text($.i18n('INTERNAL_ERROR'));
                setTimeout(function() {
                    errorMessageDiv.addClass("hide");
                }, 5000);
            },this)	
        });
    },
    forgotPassword: function() {
        var validator = $('#forgotPassForm').data('bootstrapValidator');
        validator.validate();
        if(!validator.isValid()){
            return;
        }
        this.showLoading("ForgotPass");
        var email = this.element.find("#email").val();
        var parameters = { "email": email }
        $.ajax({
            type: "POST",
            url: "https://" + document.location.hostname + this.forgotPasswordApi,
            data: parameters,
            dataType: 'json',
            success: jQuery.proxy(function(data) {
                validator.resetForm();
                var errorMessageDiv = $("#forgot-password-wrap #errorMessage");
                var successMessageDiv = $("#forgot-password-wrap #successMessage");
                if (data.response.metadata.status == "success") { //script could fail for unexpected reasons.
                    if (data.response.result.status == "success") {
                        this.hideLoading("ForgotPass");
                        successMessageDiv.removeClass("hide");
                        successMessageDiv.show();
                        successMessageDiv.text($.i18n('forgot-password-success-msg'));
                        setTimeout(function() {
                            successMessageDiv.addClass("hide");
                        }, 5000);
                    } else {
                        this.hideLoading("ForgotPass");
                        errorMessageDiv.removeClass("hide");
                        errorMessageDiv.show();
                        errorMessageDiv.text($.i18n(data.response.result.errorCode));
                        setTimeout(function() {
                            errorMessageDiv.text($.i18n('INTERNAL_ERROR'));
                            errorMessageDiv.addClass("hide");
                        }, 5000);
                    }
                } else {
                    errorMessageDiv.removeClass("hide");
                    errorMessageDiv.text($.i18n('INTERNAL_ERROR'));
                    setTimeout(function() {
                        errorMessageDiv.addClass("hide");
                    }, 5000);
                }
            }, this),
            error: jQuery.proxy(function() {
                this.hideLoading("ForgotPass");
                var errorMessageDiv = this.element.find("#errorMessage");
                errorMessageDiv.removeClass("hide");
                errorMessageDiv.text($.i18n('INTERNAL_ERROR'));
                setTimeout(function() {
                    errorMessageDiv.addClass("hide");
                }, 5000);
            }, this)
        });
    },
    resetPassword:function(){
        var validator = $('#resetPassForm').data('bootstrapValidator');
        validator.validate();
        if(!validator.isValid()){
            return;
        }
        this.showLoading("ResetPassword");
        var id = this.element.find("#id").val();
        var password = this.element.find("#password").val();
        var resetCode = $.urlParam("resetCode");
        var parameters = {"id" : id, "resetCode": resetCode, "password": password };
        var self = this;
        $.ajax({
            type: "POST",
            url: "https://"+ document.location.hostname + this.resetPasswordApi,
            data: parameters,
            dataType: 'json',
            success: jQuery.proxy(function(data) {
                validator.resetForm();
                var errorMessageDiv = 	$("#reset-password-form-wrap #errorMessage");
                var successMessageDiv = 	$("#reset-password-form-wrap #successMessage");
                if(data.response.metadata.status == "success"){ //script could fail for unexpected reasons.
                    if(data.response.result.status == "success"){
                        this.hideLoading("ResetPassword");
                        successMessageDiv.removeClass("hide");
                        //successMessageDiv.show();
                        successMessageDiv.text($.i18n('reset-password-success-msg'));
                        setTimeout(function() {
                            successMessageDiv.addClass("hide");
                            location.href= self.redirectResetTarget;
                        }, 5000);
                    }else{
                        this.hideLoading("ResetPassword");
                        errorMessageDiv.removeClass("hide");
                        errorMessageDiv.text($.i18n(data.response.result.errorCode));
                        setTimeout(function() {
                            errorMessageDiv.addClass("hide");
                        }, 5000);
                    }
                }else{
                    errorMessageDiv.removeClass("hide");
                    errorMessageDiv.text($.i18n('INTERNAL_ERROR'));
                    setTimeout(function() {
                        errorMessageDiv.addClass("hide");
                    }, 5000);
                }
            },this), error:jQuery.proxy(function(){
                this.hideLoading("ResetPassword");
                var errorMessageDiv = 	this.element.find("#errorMessage");
                errorMessageDiv.removeClass("hide");
                errorMessageDiv.text($.i18n('INTERNAL_ERROR'));
                setTimeout(function() {
                    errorMessageDiv.addClass("hide");
                }, 5000);
            },this)	
        });
    },
    switchForm: function(source_form, target_form) {
    	var validator = $('#' + source_form).find('form').data('bootstrapValidator');
        validator.resetForm();
        
        $('#' + source_form).find('input').val('');
        $('.mobile_view').find('#' + source_form).find('input').val('');
        this.animateSwitchForm(source_form, target_form);
    },
    animateSwitchForm: function(wrap_from, wrap_to) {
        $('#' + wrap_from).fadeOut(function() {
            $('#' + wrap_to).fadeIn(500);
        });
        $('.mobile_view').find('#' + wrap_from).fadeOut(function() {
            $('.mobile_view').find('#' + wrap_to).fadeIn(500);
        });
    },
    showLoading:function(id){
        id = id || "";
        this.element.find("#submit" + id + "Btn").hide();
        this.element.find("#loadingDiv").css("display", "");
    },
    hideLoading:function(id){
        id = id || "";
        this.element.find("#submit" + id + "Btn").show();
        this.element.find("#loadingDiv").css("display", "none");
    },
    changeLanguage: function(){
        var lang = this.element.find("#langSelect").val();
        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?lang=" + lang;
    }
});
