var http = require("http");

function callApi(url, params){
    if(!url){
      return {
        status:"failure",
        errorCode:"INVALID_URI"
      }
    }
  
  	if(!params) {
      params = {};
    }
  
    var res = http.request({
      url: url,
      "params": params
    });
  
    return res.body;
}

