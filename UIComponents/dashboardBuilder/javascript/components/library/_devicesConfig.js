const __onQueryChange__ = function (modelValue, form, model) {
    console.log(modelValue)
}
const __onDevicesChange__ = function (modelValue, form, model) {
    var historicalCharts = ["dygraphs", "line", "bar", "area", "windrose", "d3surface"];
    if(historicalCharts.indexOf(model["type"]) > -1 ) {
        model["api"] = "app/api/getDeviceSensorsHistory";
    } else {
        model["api"] = "app/api/getDeviceSensorsLatest";
    }
    model["transport"] = "https";
}
const __onAttributesChange__ = function(modelValue, form, model, scope) {
    var sensors =  _.pluck(modelValue, "id");

    //Build Y keys
    var ykeys = [];
	_.forEach(model["query"], function(entry) {
      _.forEach(entry.sensor, function(sensor) {
            var tmp = entry.device + "-" + sensor;
            if(ykeys.indexOf(tmp) == -1) {
                ykeys.push(tmp);
            }
      })
	});
    
    
    if(model["type"] == "line" || model["type"] == "area" || model["type"] == "bar") {
        var defaultColors = [ "#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088", "#1B1B1B", "#2243B6", "#299617", "#FF3855", "#FFDB00", "#AF6E4D", "#5946B2", "#FF9966", "#FF007C", "#BFAFB2", "#5DADEC", "#A7F432", "#FA5B3D", "#A83731", "#9C51B6", "#EE34D2", "#0A7E8C", "#FFD12A", "#76D7EA", "#84DE02"];
        var oldColorsMapping = {};
        var colorsMapping = model["yconfig"];
        for(var c=0; c<colorsMapping.length; c++){
            if(colorsMapping[c].key)
                oldColorsMapping[colorsMapping[c].key] = {"label": colorsMapping[c].label, "color": colorsMapping[c].color, "unit": colorsMapping[c].unit}; 
        }
        var newMapping = [];
        for (var i=0; i<modelValue.length; i++){
            if(oldColorsMapping[modelValue[i].value]){
                newMapping.push({"key": modelValue[i].value, "label": oldColorsMapping[modelValue[i].value]["label"], "color": oldColorsMapping[modelValue[i].value]["color"], "unit": oldColorsMapping[modelValue[i].value]["unit"]}); 
            }else{
                for(var t=0; t<defaultColors.length; t++){
                    var selectedColorFound = false;
                    var currentColor = defaultColors[t];
                    for(var h=0; h<newMapping.length; h++){
                        var newMappingColor = newMapping[h].colors;
                        if(newMappingColor == currentColor){
                            selectedColorFound = true;
                            break;
                        }
                    }
                    if(!selectedColorFound){
                        break;
                    }
                }
                newMapping.push({"key": modelValue[i].value, "label": modelValue[i].name, "color": !selectedColorFound ? defaultColors[t] : defaultColors[0], "unit": ""});    
            }
        }
        if(newMapping.length == 0)
            newMapping = [{}];
        model["yconfig"] = newMapping;
        model["xkey"] = "creationDate"
    }
    if(model["type"] == "dygraphs") {
        //model["on-format-data"] = 'var formattedData = [];  \r\n_.each(data, function(entry){ \r\n    var tmp = [];\r\n    tmp.push(new Date(entry[\"creationDate\"]));\r\n    _.each(entry, function(value,key){ \r\n        if(key != \"creationDate\") {\r\n            tmp.push(parseFloat(value));\r\n            formattedData.push(tmp);\r\n        }\r\n      });\r\n    \t\r\n});\r\nreturn formattedData;'
        var defaultColors = [ "#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088", "#1B1B1B", "#2243B6", "#299617", "#FF3855", "#FFDB00", "#AF6E4D", "#5946B2", "#FF9966", "#FF007C", "#BFAFB2", "#5DADEC", "#A7F432", "#FA5B3D", "#A83731", "#9C51B6", "#EE34D2", "#0A7E8C", "#FFD12A", "#76D7EA", "#84DE02"];
        var oldColorsMapping = {};
        var colorsMapping = model["colors-mapping"];
        for(var c=0; c<colorsMapping.length; c++){
            if(colorsMapping[c].ykeys)
                oldColorsMapping[colorsMapping[c].ykeys] = {"labels": colorsMapping[c].labels, "colors": colorsMapping[c].colors, "axisSelection": colorsMapping[c].axisSelection, "unit": colorsMapping[c].unit};
        }
        var newMapping = [];
        for (var i=0; i<modelValue.length; i++){
            if(oldColorsMapping[modelValue[i].value]){
                newMapping.push({"ykeys": modelValue[i].value, "labels": oldColorsMapping[modelValue[i].value]["labels"], "colors": oldColorsMapping[modelValue[i].value]["colors"], "axisSelection": oldColorsMapping[modelValue[i].value]["axisSelection"], "unit": oldColorsMapping[modelValue[i].value]["unit"]});
            }else{
                for(var t=0; t<defaultColors.length; t++){
                    var selectedColorFound = false;
                    var currentColor = defaultColors[t];
                    for(var h=0; h<newMapping.length; h++){
                        var newMappingColor = newMapping[h].colors;
                        if(newMappingColor == currentColor){
                            selectedColorFound = true;
                            break;
                        }
                    }
                    if(!selectedColorFound){
                        break;
                    }
                }
                newMapping.push({"ykeys": modelValue[i].value, "labels": modelValue[i].name, "colors": !selectedColorFound ? defaultColors[t] : defaultColors[0], "axisSelection": "y", "unit": ""});    
            }
        }
        if(newMapping.length == 0)
            newMapping = [{}];
        model["colors-mapping"] = newMapping;
        var legendMappingValue = '["x",';
        var legendLabelsValue = '["X",';
        for (var i=0; i<modelValue.length; i++){
            legendMappingValue += "'y'" + ((i < modelValue.length - 1)?' , ':'');
            legendLabelsValue += '"' + (modelValue[i].id) + '"' + ((i < modelValue.length - 1)?' , ':'');
        }
        model["legend-labels"] = legendLabelsValue + "]";
        model["legend-mapping"] = legendMappingValue + "]"; 
    }
    sensors.push("creationDate");
    model["api-params"] = JSON.stringify({"query": model.query, "format": model["data-format"] });
}
angular
    .module('DashboardBuilder')
    .constant(
    "devicesConfig",
    {
        "formTab": {
            title: "Devices",
            items: [
                { 
                    "type" : "section",
                    "htmlClass" : "row",
                    "title" : "Device",
                    "placeholder" : " ",
                    "items" : [
                        {
                            "type" : "section",
                            "htmlClass" : "col-xs-12",
                            "items": [{
                                "key": "query",
                                "title": "Select devices & corresponding attributes",
                                "startEmpty": true,
                                "onChange": __onQueryChange__,
                                "items": [{
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [
                                        {
                                            "type" : "section",
                                            "htmlClass" : "col-xs-12",
                                            "items": [
                                                {
                                                    "type" : "section",
                                                    "htmlClass" : "col-xs-6",   
                                                    "items": [
                                                        {
                                                            "key": "query[].device",
                                                            "type": 'uiselect',
                                                            "placeholder": "Select device",
                                                            "options": {
                                                                "closeOnSelect": true,
                                                                "callback": "loadDevicesCallback",
                                                                "map": {valueProperty: "id", nameProperty: "id"}
                                                            },
                                                            "onChange": __onDevicesChange__
                                                        }
                                                    ]
                                                },
                                                {
                                                    "type" : "section",
                                                    "htmlClass" : "col-xs-6",   
                                                    "items": [
                                                        {
                                                            "key": "query[].sensor",
                                                            "type": 'uiselectmultiple',
                                                            "placeholder": "Select device attributes",
                                                            "options": {
                                                                "multiple": true,
                                                                "closeOnSelect": true,
                                                                "callback": "loadDeviceSensorsCallback",
                                                                "map": {valueProperty: "value", nameProperty: "name", deviceProperty: "device"},
                                                                "filterTriggers": ["model.query.device"],
                                                                "filter": "model.query[form.key[1]].device == item.device"
                                                            },
                                                            "onChange": __onAttributesChange__
                                                        }
                                                    ]
                                                }
                                            ]
                                        }]
                                }
                                         ]
                            }
                                     ]
                        }]}]}
        ,
        "schemaFields": {
            "identifyKeys": {
                "type": "hidden"
            },
            "query": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "object",
                    "properties": {
                        "device": {
                            "title": "Device Identifier",
                            "type": "string",
                            "placeholder" : " ",
                            "description": "Select device."
                        },
                        "sensor": {
                            "type": "array",
                            "title": "Device Attributes",
                            "description": "Select your device attributes",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {"type": "string"},
                                    "device": {"type": "string"},
                                    "value": {"type": "string"},
                                    "name": {"type": "string"},
                                    "$$hashKey":   {"type": "string"}
                                }
                            }
                        }
                    }
                }
            }
        }
    }
);
/**
                        {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type" : "section",
                                        "htmlClass" : "col-xs-6",
                                        "items": [{
                                            "key": "device",
                                            "type": 'uiselect',
                                            "placeholder": "",
                                            "options": {
                                                "closeOnSelect": true,
                                                "callback": "loadDevicesCallback",
                                                "map": {valueProperty: "id", nameProperty: "id"}
                                            },
                                            "onChange": __onDevicesChange__ 
                                        }]
                                    },
                                    {
                                        "type" : "section",
                                        "htmlClass" : "col-xs-6",   
                                        "items": [
                                            {"key": "sensor",
                                            "type": 'uiselectmultiple',
                                            "placeholder": "",
                                            "options": {
                                                "multiple": true,
                                                "closeOnSelect": true,
                                                "callback": "loadDeviceSensorsCallback",
                                                "map": {valueProperty: "value", nameProperty: "name"},
                                                "filterTriggers": ["model.device"],
                                                "filter": "model.device == item.device"
                                            },
                                            "onChange": __onAttributesChange__
                                            }
                                        ]
                                    }
                                ]
                        }**/
