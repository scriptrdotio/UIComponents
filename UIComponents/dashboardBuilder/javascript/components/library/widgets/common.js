const __onRadioButtonChangeForLayout__ = function (modelValue, form, model) {
    if(model['legend-type'] =='form')
        model["layout-config"] = angular.copy(model["layout-config-form"]);
    else if(model['legend-type'] =='json')
        model["layout-config"] = angular.copy(model["json-config"]);
};

const __onRadioButtonChangeForTraces__ = function (modelValue, form, model){
    if( model["traces-config-form"]["colorScaleWrapper"] != null){
        var arr = [];
        model["traces-config-form"]["colorScaleWrapper"].forEach(function (element) {
            var inArr = [];
            inArr[0] = element.priority;
            inArr[1] = element.color;
            arr.push(inArr);
        });
        model["traces-config-form"]["colorscale"] = arr;
    }
    if(model['legend-type'] =='form')
        model["traces-config"] = angular.copy(model["traces-config-form"]);
    else if(model['legend-type'] =='json')
        model["traces-config"] = angular.copy(model["json-config"]);
};