var config = {
   redirect: "/UIComponents/dashboardBuilder/index.html",
   loginPage: "/login/view/login.html"
}

var login = {
   loginApi: "/login/api/login",
   registerApi:"/login/api/register",
   validateTokenApi: "/login/api/validateToken",
   validateTokenInterval:30 //in seconds. Sets the interval over which we will call validateTokenApi to check if the token is still valid. This is needed for static pages who don't pass by providers httpClient & wsClient
};

var forgotPassword = {
    forgotPasswordApi: "/login/api/forgotPassword",
}

var resetPassword = {
    resetPasswordApi: "/login/api/resetPassword",
}

