const __gridBuildKey__ = function(keys, model) {
    var columnsDefinition= [];
    _.forEach(keys, function(entry){
        var tmp = {headerName: entry, field: entry}
        columnsDefinition.push(tmp)
    });
    if(columnsDefinition.length > 0){
        model["columns-definition"]  = JSON.stringify(columnsDefinition)
    } else {
        model["columns-definition"]  = null;
    }
    
}
const __dygraphsChartBuildKey__ = function(ykeys, model) {
   var defaultColors = [ "#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088", "#1B1B1B", "#2243B6", "#299617", "#FF3855", "#FFDB00", "#AF6E4D", "#5946B2", "#FF9966", "#FF007C", "#BFAFB2", "#5DADEC", "#A7F432", "#FA5B3D", "#A83731", "#9C51B6", "#EE34D2", "#0A7E8C", "#FFD12A", "#76D7EA", "#84DE02"];
        var oldColorsMapping = {};
        var colorsMapping = model["colors-mapping"];
        for(var c=0; c<colorsMapping.length; c++){
            if(colorsMapping[c].ykeys)
                oldColorsMapping[colorsMapping[c].ykeys] = {"labels": colorsMapping[c].labels, "colors": colorsMapping[c].colors, "axisSelection": colorsMapping[c].axisSelection, "unit": colorsMapping[c].unit};
        }
        var newMapping = [];
        for (var i=0; i<ykeys.length; i++){
            if(oldColorsMapping[ykeys[i]]){
                newMapping.push({"ykeys": ykeys[i], "labels": oldColorsMapping[ykeys[i]]["labels"], "colors": oldColorsMapping[ykeys[i]]["colors"], "axisSelection": oldColorsMapping[ykeys[i]]["axisSelection"], "unit": oldColorsMapping[ykeys[i]]["unit"]});
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
                newMapping.push({"ykeys": ykeys[i], "labels": ykeys[i], "colors": !selectedColorFound ? defaultColors[t] : defaultColors[0], "axisSelection": "y", "unit": ""});    
            }
        }
        if(newMapping.length == 0)
            newMapping = [{}];
        model["colors-mapping"] = newMapping;
        var legendMappingValue = '[\"x\",';
        var legendLabelsValue = '[\"X\",';
        for (var i=0; i<ykeys.length; i++){
            legendMappingValue += '\"y\"' + ((i < ykeys.length - 1)? " , ":"");
            legendLabelsValue += '\"' + (ykeys[i]) + '\"' + ((i < ykeys.length - 1)?" , ":"");
        }
        model["legend-labels"] = legendLabelsValue + "]";
        model["legend-mapping"] = legendMappingValue + "]"; 
}

const __morrisChartBuildKeys__ = function(ykeys, model){

        var defaultColors = [ "#CC5464", "#FCC717", "#38B9D6", "#1DBC68", "#E90088", "#1B1B1B", "#2243B6", "#299617", "#FF3855", "#FFDB00", "#AF6E4D", "#5946B2", "#FF9966", "#FF007C", "#BFAFB2", "#5DADEC", "#A7F432", "#FA5B3D", "#A83731", "#9C51B6", "#EE34D2", "#0A7E8C", "#FFD12A", "#76D7EA", "#84DE02"];
        var oldColorsMapping = {};
        var colorsMapping = model["yconfig"];
        for(var c=0; c<colorsMapping.length; c++){
            if(colorsMapping[c].key)
                oldColorsMapping[colorsMapping[c].key] = {"label": colorsMapping[c].label, "color": colorsMapping[c].color, "unit": colorsMapping[c].unit}; 
        }
        var newMapping = [];
        for (var i=0; i < ykeys.length; i++){
            if(oldColorsMapping[ykeys[i]]){
                newMapping.push({"key": ykeys[i], "label": oldColorsMapping[ykeys[i]]["label"], "color": oldColorsMapping[ykeys[i]]["color"], "unit": oldColorsMapping[ykeys[i]]["unit"]}); 
            }else{
                for(var t=0; t<defaultColors.length; t++){
                    var selectedColorFound = false;
                    var currentColor = defaultColors[t];
                    for(var h=0; h<newMapping.length; h++){
                        var newMappingColor = newMapping[h].color;
                        if(newMappingColor == currentColor){
                            selectedColorFound = true;
                            break;
                        }
                    }
                    if(!selectedColorFound){
                        break;
                    }
                }
                newMapping.push({"key": ykeys[i], "label": ykeys[i], "color": !selectedColorFound ? defaultColors[t] : defaultColors[0], "unit": ""});  
            }
        }
        if(newMapping.length == 0)
            newMapping = [{}];
        model["yconfig"] = newMapping;
        model["xkey"] = "creationDate"    
}

const __onQueryChange__ = function (modelValue, form, model) {
    var query =  [];
    var ykeys = [];
    var uniqueSensors = [];
    _.forEach(modelValue, function(entry, index) {
        if(entry.sensor && entry.sensor.length > 0 && entry.device) {
             var device = entry.device;
            _.forEach(entry.sensor, function(sensor){
                var tmp = device + "-" + sensor;
                if(ykeys.indexOf(tmp) == -1) {
                    ykeys.push(tmp);
                }
                if(uniqueSensors.indexOf(sensor) == -1){
                    uniqueSensors.push(sensor);
                }
            })
            query.push({"sensor": entry.sensor, "device": entry.device});
        }
    });
    model["api-params"] = JSON.stringify({"query": query, "format": model["data-format"] })
    if(model["data-format"] == "line" || model["data-format"] == "area" || model["data-format"] == "bar") {
        __morrisChartBuildKeys__(ykeys, model);
    }
    if(model["data-format"] == "dygraphs") {
        __dygraphsChartBuildKey__(ykeys, model);
    }
    if(model["data-format"] == "grid") {
        __gridBuildKey__(uniqueSensors, model);
    }
}

const __onDevicesChange__ = function (modelValue, form, model) {
    model.query[form.key[1]].sensor = null;
  
    if(model["multiple-data-points"] == "true" ) {
        model["api"] = JSON.parse(window.localStorage["devicesModel"])["devicesAttributesHistoryApi"];
    } else {
        model["api"] =JSON.parse(window.localStorage["devicesModel"])["devicesAttributesLatestApi"];
    }
    model["transport"] = "https";
    
}

const __onAttributesChange__ = function(modelValue, form, model, scope) {
    //var sensors =  _.pluck(modelValue, "id");
     model["transport"] = "wss"
    var query = [];
    //Build Y keys from query model
    var ykeys = [];
    var uniqueSensors = [];
    _.forEach(model["query"], function(entry, index) {
        if(index !== form.key[1]) {
            query[index] = {"sensor": entry.sensor, "device": entry.device};
            _.forEach(entry.sensor, function(sensor) {
                var tmp = entry.device + "-" + sensor;
                if(ykeys.indexOf(tmp) == -1) {
                    ykeys.push(tmp);
                }
                if(uniqueSensors.indexOf(sensor) == -1){
                    uniqueSensors.push(sensor);
                }
            })
        } else {
            var curr = {"sensor": []};
            _.forEach(modelValue, function(sensor) {
                var tmp = sensor.device + "-" + sensor.value;
                curr["sensor"].push(sensor.value);
                curr["device"] = sensor.device;
                if(ykeys.indexOf(tmp) == -1) {
                    ykeys.push(tmp);
                }
                if(uniqueSensors.indexOf(sensor.value) == -1){
                    uniqueSensors.push(sensor.value);
                }
            })
            query.push(curr)
        }
    });
    
    model["api-params"] = JSON.stringify({"query": query, "format": model["data-format"] })
    if(model["data-format"] == "line" || model["data-format"] == "area" || model["data-format"] == "bar") {
        __morrisChartBuildKeys__(ykeys, model);
    }
    if(model["data-format"] == "dygraphs") {
        __dygraphsChartBuildKey__(ykeys, model);
    }
    
     if(model["data-format"] == "grid") {
        __gridBuildKey__(uniqueSensors, model);
    }
}
angular
    .module('DashboardBuilder')
    .constant(
    "common",
    {
        "docTab": {
            title: "Documentation",
            items: [
                {
                    "type": "template",
                    "template": "<div><strong>Note:</strong> if you want to use these properities in the onFormatData Function , please note you need to use the camel case instead of the hyphen case <br/><strong>Example:</strong> if the attribute is <i>item-type</i> , use it as <i>self.itemType</i>  </div>",
                },
                {
                    "key": "docValue",
                    "type": "template",
                    "template": "<div class=\"markdown-db\"> <div btf-markdown=\"form.url\"> </div> </div>",
                    "url":"",
                    "testVal":"test"
                }
            ]
        },
        "formTab": {
            title: "Data Model",
            items: [
                {
                    "type": "tabs",
                    "selectedTabIndex": 1,
                    "htmlClass": "sub-tabs",
                    "tabs": [
                        {
                            title: "Devices",
                            "condition": "model['multiple-data-points'] == 'true'",
                            items: [
                                { 
                                    "type" : "section",
                                    "htmlClass" : "col-xs-12",
                                    "items" : [
                                        {
                                            "htmlClass": "row",
                                            "key": "query",
                                            "title": "Select devices & corresponding attributes",
                                            "startEmpty": true,
                                            "onChange": __onQueryChange__,
                                            "condition": "model['multiple-data-points'] == 'true'",
                                            "items": [{
                                                "type": "section",
                                                "htmlClass": "row",
                                                "items": [
                                                    {
                                                        "htmlClass" : "col-xs-6",   
                                                        "key": "query[].device",
                                                        "type": 'uiselect',
                                                        "placeholder": "Select device",
                                                        "options": {
                                                            "closeOnSelect": true,
                                                            "callback": "loadDevicesCallback",
                                                            "map": {valueProperty: "id", nameProperty: "id"}
                                                        },
                                                        "onChange": __onDevicesChange__
                                                    },
                                                    {
                                                        "htmlClass" : "col-xs-6",   
                                                        "key": "query[].sensor",
                                                        "type": 'uiselectmultiple',
                                                        "placeholder": "Select device attributes",
                                                        "options": {
                                                            "multiple": true,
                                                            "closeOnSelect": true,
                                                            "callback": "loadDeviceSensorsCallback",
                                                            /**"httpGet": {
                                                                "url": "testDeviceSensors",
                                                                "parameter": '{"device": model.query[form.key[1]].device}'
                                                            },**/
                                                            "map": {valueProperty: "value", nameProperty: "name", deviceProperty: "device"},
                                                            "filterTriggers": ["model.query[form.key[1]].device"],
                                                            "filter": "model.query[form.key[1]].device == item.device"
                                                        },
                                                        "onChange": __onAttributesChange__
                                                    }
                                                ]
                                            }
                                                     ]
                                        },
                                    	{
                                            "htmlClass": "row",
                                            "key": "query",
                                            "title": "Select devices & corresponding attributes",
                                            "startEmpty": false,
                                            add: null,
      										remove: null,
                                            "onChange": __onQueryChange__,
                                            "condition": "model['multiple-data-points'] == 'false'",
                                            "items": [{
                                                "type": "section",
                                                "htmlClass": "row",
                                                "items": [
                                                    {
                                                        "htmlClass" : "col-xs-6",   
                                                        "key": "query[].device",
                                                        "type": 'uiselect',
                                                        "placeholder": "Select device",
                                                        "options": {
                                                            "closeOnSelect": true,
                                                            "callback": "loadDevicesCallback",
                                                            "map": {valueProperty: "id", nameProperty: "id"}
                                                        },
                                                        "onChange": __onDevicesChange__
                                                    },
                                                    {
                                                        "htmlClass" : "col-xs-6",   
                                                        "key": "query[].sensor",
                                                        "type": 'uiselectmultiple',
                                                        "placeholder": "Select device attribute",
                                                        "options": {
                                                            "limit": 1,
                                                            "closeOnSelect": true,
                                                            "callback": "loadDeviceSensorsCallback",
                                                            "map": {valueProperty: "value", nameProperty: "name", deviceProperty: "device"},
                                                            "filterTriggers": ["model.query[form.key[1]].device"],
                                                            "filter": "model.query[form.key[1]].device == item.device"
                                                        },
                                                        "onChange": __onAttributesChange__
                                                    }
                                                ]
                                            }
                                                     ]
                                        }
                                    
                                    ]}]} //End of devices Tab
                        ,
                        {
                            "title": "Advanced",
                            "items": [
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "condition": "!model['deactivateExternalDataHandler'] || model['deactivateExternalDataHandler'] == false",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "col-xs-7",
                                        "items": [{
                                            "key": "dashboard-data-handler"
                                        }]
                                    },
                                              {
                                                  "type": "section",
                                                  "htmlClass": "col-xs-5",
                                                  "condition": "model['dashboard-data-handler'] === true", //Condition on section and not on key because of a bug in the destroy in schemaForm, needs to be here to remove fields from model
                                                  "items": [{
                                                      "key": "service-tag"
                                                  }]
                                              }
                                             ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "col-xs-6",
                                        "condition": "model['dashboard-data-handler'] === false",
                                        "items": [{
                                            "key": "transport",
                                            "placeholder": " ",
                                            "type": 'strapselect',
                                            "titleMap": [{
                                                "value": "wss",
                                                "name": "wss"
                                            }, {
                                                "value": "https",
                                                "name": "https"
                                            }]
                                        }]
                                    }, {
                                        "type": "section",
                                        "htmlClass": "col-xs-6",
                                        "condition": "model.transport == 'wss'",
                                        "items": [
                                            {
                                                "key": "msg-tag",
                                            }
                                        ]
                                    },
                                              {
                                                  "type": "section",
                                                  "htmlClass": "col-xs-6",
                                                  "condition": "model.transport == 'https'",
                                                  "items": [
                                                      {
                                                          "key": "http-method",
                                                          "type": 'strapselect',
                                                          "placeholder": " ",
                                                          "destroyStrategy": "remove",
                                                          "titleMap": [{
                                                              "value": "GET",
                                                              "name": "GET"
                                                          }]
                                                      }, {
                                                          "key": "fetch-data-interval",
                                                          "destroyStrategy": "remove"
                                                      }
                                                  ]
                                              }      
                                             ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "condition": "model['dashboard-data-handler'] === false && (model.transport == 'wss' || model.transport == 'https')",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "col-xs-6",
                                        "items": [
                                            {
                                                "key": "api"
                                            }
                                        ]
                                    }, {
                                        "type": "section",
                                        "htmlClass": "col-xs-6",
                                        "items": [
                                            {
                                                "key": "api-params"
                                            }, {
                                                "key": "use-window-params"
                                            }]
                                    }]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "col-xs-12 codemirror-small",
                                        "condition": "model['dashboard-data-handler'] === false && model['transport'] != 'wss' && model['transport'] != 'https' && model['dropdata'] !== true ",
                                        "items": [
                                            {
                                                "key": "data",
                                                "type": "codemirror",
                                                "codemirrorOptions": {
                                                    "styleActiveLine": true,
                                                    "lineNumbers": true,
                                                    "lineWrapping": true,
                                                    "autoCloseBrackets": true,
                                                    "matchBrackets": true,
                                                    "theme": "neo",
                                                    "mode": {name: "javascript", json: true},
                                                    "readOnly": false,
                                                    "autoRefresh": true
                                                },
                                                $parsers: [
                                                    function(modelValue, viewValue, model, form ) { //This is needed to cater for schemas where model value should be a number, but codemirror doesnt return but strings
                                                      if (!isNaN(modelValue) && (form.schema.type == "number" || form.schema.type == "integer")) {
                                                        return parseInt(modelValue)
                                                      }
                                                      return modelValue;
                                                    }
                                                  ],
                                                $formatters: [ //This is needed because code mirror expects a string
                                                    function(modelValue, viewValue, model, form ) {
                                                       if (!isNaN(modelValue) && (form.schema.type == "number" || form.schema.type == "integer")) {
                                                        return modelValue.toString()
                                                      }
                                                      return modelValue;
                                                    }
                                                  ]
                                            }
                                        ]
                                    }
                                             ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "col-xs-12 codemirror-small",
                                        "items": [
                                            {
                                                "key": "on-format-data",
                                                "type": "codemirror",
                                                "codemirrorOptions": {
                                                    "value": "return;",
                                                    "styleActiveLine": true,
                                                    "lineNumbers": true,
                                                    "lineWrapping": true,
                                                    "autoCloseBrackets": true,
                                                    "matchBrackets": true,
                                                    "theme": "neo",
                                                    "mode": "javascript",
                                                    "readOnly": false,
                                                    "autoRefresh": true
                                                }
                                            }
                                        ]
                                    }]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "col-xs-12",
                                        "items": [{
                                            "type": "help",
                                            "helpvalue": "<hr>"
                                        }]
                                    }]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "col-xs-12",
                                        "items": [{
                                            "type": "help",
                                            "helpvalue": "<div class=\"alert alert-info\"><ul><li>Messages published over the subscibe channel need to have the following format in order to be consumed by a widget:<ul><li>{“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”}</li></ul></li><li>A script would publish a message  over the subscribe channel as follow:<ul><li>publish(“responseChannel”, {“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”});</li></ul></li><li>Whether https or wss transport is used, Sciptr API should return the static data structure for widget initial load:<ul><li>return &lt;static data structure&gt;;</li></ul></li></ul></div>"
                                        }]
                                    }]
                                }
                            ]
                        }//End of Advanced tab
                    ]
                },
            ]
        },
        "schemaFields": {
            "dashboard-data-handler": {
                "title": "The dashboard will handle data sourcing for widget",
                "type": "boolean",
                "default": false,
                "description": "Dashboard will use the properties in its settings tab to fetch data and will relay it to the widget."
            },
            "service-tag": {
                "title": "Data tag",
                "type": "string",
                "description": "The dashboard data source will fetch data for multiple widgets. Set a data tag for the dashboard to propagate to your widget the data object with the data tag as its key. If not set all the data fetched by the dashboard will be relayed to the widget"
            },
            "api": {
                "title": "Api",
                "type": "string",
                "description": "Name of the scriptr api (script name) responsible for publishing or returning the widget data."
            },
            "api-params": {
                "title": "Api params",
                "type": "string",
                "description": "A JSON formatted object containing the parameters to be sent to the scriptr api.",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "Ex: {'id' : '599865'}"
                }
            },
            "http-method": {
                "title": "Http method",
                "type": "string",
                "description": "Method to be used when calling the scriptr api over https. Default: GET.",
                "default": "GET",
            },
            "transport": {
                "title": "Transport",
                "type": "string",
                "description": "Protocol used to call the  scriptr api. Use wss for real time communication whenever your widget needs to update its data live by consuming messages published from scriptr over the subscribe channel defined in settings."
            },
            "msg-tag": {
                "title": "Message tag",
                "type": "string",
                "description": "The dashboard widgets consume messages published over the subscribe channel defined in dashboard settings. Message tag is an identifier sent as part of the published message. The widget uses it to know which messages to consume or ignore."
            },
            "on-format-data": {
                "title": "onFormatData: function(data, widgetInstance) {",
                "default": "return data;",
                "type": "string",
                "description": "}; Callback function called to transform the data returned to widget. If no transformation is needed return data only."
            }, "use-window-params": {
                "title": "Merge Window Params",
                "type": "boolean",
                "default": false,
                "description": "Merge URL query params with the widget api params."
            },
            "fetch-data-interval": {
                "title": "Fetch Interval",
                "type": "number",
                "description": "Data update interval value in seconds.",
                "minimum": 15
            },
            "docValue": {
                "title": "docValue",
                "type": "string",
                "description": "",
            },
            "isDashboard": {
                "title": "Is dashboard?",
                "type": "hidden",
                "default": false
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
                                "type": "object"
                            }
                        }
                    }
                }
            }
        }
    }
);
