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
            if(this.resetCode != null){
                $("#reset-password-form-wrap").show();
            }else{
                $("#login-wrap").show();
            }
            if(this.element.find("#langSelect") != null){
                this.element.find("#langSelect").val(this.defaultLang);
                this.element.find("#langSelect").on("change", jQuery.proxy(this.changeLanguage,this));
            }
        }, this));
        
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
            this.switchForm('login-wrap', 'forgot-password-wrap');
        }, this));
        this.element.find('#back_to_login_anchor').on('click', jQuery.proxy(function(e) {
            this.switchForm('forgot-password-wrap', 'login-wrap');
        }, this));
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
                var errorMessageDiv = 	this.element.find("#errorMessage");
                if(data.response.metadata.status == "success"){ //script could fail for unexpected reasons.
                    if(data.response.result.metadata && data.response.result.metadata.status == "success"){
                        localStorage.user = JSON.stringify(data.response.result.result.user);
                        location.href= this.redirectTarget;
                    }else{
                        this.hideLoading();
                        errorMessageDiv.removeClass("hide");
                        errorMessageDiv.text($.i18n('invalid-login-credentials'));
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
                var errorMessageDiv = this.element.find("#errorMessage");
                var successMessageDiv = this.element.find("#successMessage");
                if (data.response.metadata.status == "success") { //script could fail for unexpected reasons.
                    if (data.response.result.status == "success") {
                        this.hideLoading("ForgotPass");
                        successMessageDiv.removeClass("hide");
                        successMessageDiv.text($.i18n('forgot-password-success-msg'));
                        setTimeout(function() {
                            successMessageDiv.addClass("hide");
                        }, 5000);
                    } else {
                        this.hideLoading("ForgotPass");
                        errorMessageDiv.removeClass("hide");
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
                var errorMessageDiv = 	this.element.find("#errorMessage");
                var successMessageDiv = 	this.element.find("#successMessage");
                if(data.response.metadata.status == "success"){ //script could fail for unexpected reasons.
                    if(data.response.result.status == "success"){
                        this.hideLoading("ResetPassword");
                        successMessageDiv.removeClass("hide");
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
        this.animateSwitchForm(source_form, target_form);
    },
    animateSwitchForm: function(wrap_from, wrap_to) {
        $('#' + wrap_from).fadeOut(function() {
            $('#' + wrap_to).fadeIn(500);
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
