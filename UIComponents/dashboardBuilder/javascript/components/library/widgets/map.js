const __onSimpleSourcesInfoChange__=function (modelValue, form, model) {
    var obj ={};
    model["simple-sources-info"].forEach(function (element) {
        
        obj[element.source] = {
            label: element.label,
            icon: {
                url: element.url
            }
        };
    });
    model["sources-info"]=obj;
};

const __MAP__ = {
    "name": "map",
    "label": "Map",
    "class": "scriptr-map",
    "commonData": true,
    "show": true,
    "defaults": {
        "on-format-data": "return data;",
        "transport": "wss",
        "boxLabel": "Map",
        "clustered-view": "true",
        "cluster-zoom": 8,
        "heatmap": "false",
        "bounce": "true",
        "cluster-styles": [{

            url: "https://googlemaps.github.io/js-marker-clusterer/images/m1.png",
            width: 53,
            height: 53,
            anchor: [0, 0],
            textColor: '#ffffff',
            textSize: 10,
            iconAnchor: [15, 48]
        }],
        "heat-map-weight": 40,
        "heat-map-opacity": 0.8,
        "heat-map-radius": 40,
        "heat-map-gradient": [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ],

        "simple-sources-info": [{
            "source": "simulator",
            "label": "Carvoyant",
            "url": "http://icons.iconarchive.com/icons/graphicloads/flat-finance/32/lock-icon.png",
        }],
        "resize": "false",
        "data": '{ "253812" : { "550153" : [ { "lat" : {"value": "40.84969"}, "long" :{"value": "-73.94168"}, "bounce": {"value" : "true"}, "speed" : { "value" : "8", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "30", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.3", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2818", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "91", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.99", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "61","description" : "Received Signal Strength Indicator" } }, { "lat" :{"value": "40.84919"}, "long" : {"value": "-73.93897000000001"}, "speed": { "value" : "5", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "57", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.4","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2838", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "94", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.15", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55101"}, "make" : { "value" : "Toyota" }, "model" : { "value" : "Tacoma" },"snr" : { "value" : "9", "description" : "Signal to Noise Ratio" },"rssi" : { "value" : "48", "description" : "Received Signal StrengthIndicator" } }, { "lat" : {"value": "40.848600000000005"}, "long" :{"value": "-73.93648"}, "speed" : { "value" : "9", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "76", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.2", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2465", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "97", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.39", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "69","description" : "Received Signal Strength Indicator" } } ], "source" :"simulator", "order" : [ "550153" ] }, "253815" : { "550191" : [ { "lat": {"value": "40.80913"}, "long" : {"value": "-73.90327"}, "speed" : {"value" : "7", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "56", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.2","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2123", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "100", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.45", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55043"}, "make" : { "value" : "Saab" }, "model" : { "value" : "9-3" }, "snr" :{ "value" : "13", "description" : "Signal to Noise Ratio" }, "rssi" : {"value" : "49", "description" : "Received Signal Strength Indicator" }}, { "lat" : {"value": "40.807500000000004"}, "long" : {"value":"-73.90557000000001"}, "speed" : { "value" : "6", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "16", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.7", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "1946", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "95", "description" :"Engine Temperature" }, "voltage" : { "value" : "12.87", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55043" }, "make" : { "value" : "Saab" },"model" : { "value" : "d9-3" }, "snr" : { "value" : "13", "description" :"Signal to Noise Ratio" }, "rssi" : { "value" : "59", "description" :"Received Signal Strength Indicator" } } ], "source" : "simulator","order" : [ "550191" ] } }',
        // "api" : "UIComponents/dashboard/frontend/examples/map/simulatorData",
        "msg-tag": "everyone-main-live"
    },
    "box": {
        sizeX: 2,
        sizeY: 4,
        minSizeX: 2,
        minSizeY: 4
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/map.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Map marker",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [

                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    {
                                        "key": "bounce",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    "focused-marker-zoom",
                                    "path-stroke-opacity",

                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [

                                    "path-stroke-weight",
                                    "max-asset-points",
                                    "default-center",
                                ]
                            }
                        ]
                    },
                    {

                        "type": "section",
                        "htmlClass": "",
                        "items": [{
                            "key": "simple-sources-info",
                            "title": "Info sources",
                            "items": [{
                                "type": "section",
                                "htmlClass": "row",
                                "items": [

                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "simple-sources-info[].source",
                                            onChange: __onSimpleSourcesInfoChange__,
                                            "title": "Source",
                                            
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "simple-sources-info[].label",
                                            onChange: __onSimpleSourcesInfoChange__,
                                            "title": "Label"
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-6",
                                        "items": [{
                                            "key": "simple-sources-info[].url",
                                            onChange: __onSimpleSourcesInfoChange__,
                                            "title": "Icon URL",
                                        }]
                                    }
                                ]
                            }]
                        }]
                    }

                    /** "detailed-zoom-min", * */

                    /** , "tracked-asset"* */
                ]
            },
            {
                title: "Map Clusters",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    {
                                        "key": "clustered-view",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    "cluster-zoom",]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [


                                    "clustered-zoom-max",
                                    "detailed-zoom-min",
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": [
                                    {
                                        "key": "cluster-styles",
                                        "title": "Cluster Styles",
                                        "items": [{
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [

                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-6 col-sm-4",
                                                    "items": [{
                                                        "key": "cluster-styles[].url",
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-6 col-sm-4",
                                                    "items": [{
                                                        "key": "cluster-styles[].height",
                                                    }]
                                                }
                                                ,
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-6 col-sm-4",
                                                    "items": [{
                                                        "key": "cluster-styles[].width",
                                                    }]
                                                }
                                                ,
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-6 col-sm-4",
                                                    "items": [{
                                                        "key": "cluster-styles[].textColor",
                                                        "colorFormat": "hex3",
                                                        "spectrumOptions": {
                                                            showInput: true,
                                                            showAlpha: false,
                                                            allowEmpty: true,
                                                            showPalette: true,
                                                            preferredFormat: 'hex3',
                                                            palette: [['#fce94f', '#fcaf3e', '#e9b96e'],
                                                            ['#8ae234', '#729fcf', '#ad7fa8'],
                                                            ['#ef2929', '#888a85', '#deface']]
                                                        }

                                                    }]
                                                }
                                                ,
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-6 col-sm-4",
                                                    "items": [{
                                                        "key": "cluster-styles[].textSize",
                                                    }]
                                                }
                                                ,
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-6 col-sm-4",
                                                    "items": [{
                                                        "key": "cluster-styles[].backgroundPosition",
                                                    }]
                                                }
                                                ,
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-6 col-sm-6",
                                                    "items": [{
                                                        "key": "cluster-styles[].anchor",

                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-6 col-sm-6",
                                                    "items": [{
                                                        "key": "cluster-styles[].iconAnchor",
                                                    }]
                                                }

                                            ]
                                        }]
                                    }
                                ]
                            }]
                    }

                ]
            },
            {
                title: "Map Heat",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    {
                                        "key": "heatmap",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    "heat-map-radius",
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [


                                    "heat-map-weight",
                                    "heat-map-opacity",
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": [
                                    {
                                        "key": "heat-map-gradient",
                                        "items": [
                                            {
                                                "key": "heat-map-gradient[]",
                                                "colorFormat": "rgb",
                                                "spectrumOptions": {
                                                    showInput: true,
                                                    showAlpha: true,
                                                    allowEmpty: false,
                                                    showPalette: true,
                                                    preferredFormat: 'rgb',
                                                    palette: [['#fce94f', '#fcaf3e', '#e9b96e'],
                                                    ['#8ae234', '#729fcf', '#ad7fa8'],
                                                    ['#ef2929', '#888a85', '#deface']]
                                                }
                                            }
                                        ]
                                    }

                                ]
                            }]
                    }

                ]
            },
            {
                title: "Info Window",
                items: [
                    {
                        "key": "marker-info-window",
                        "type": "radios-inline",
                        titleMap: [
                            {
                                value: "true",
                                name: "True"
                            },
                            {
                                value: "false",
                                name: "False"
                            }]
                    },
                    {

                        "type": "section",
                        "htmlClass": "",
                        "items": ["custom-default-info-window", {
                            "key": "default-info-window",
                            "condition": "model['marker-info-window']=='true'",
                            "title": "Default Info window",
                            "items": [{
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "default-info-window.id",
                                            "title": "Identifier",
                                            "copyValueTo": ["custom-default-info-window"]
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "default-info-window.template",
                                            "title": "Template"
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "default-info-window.max-width",
                                            "title": "Max width",
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "default-info-window.max-height",
                                            "title": "Max height"
                                        }]
                                    }]
                            }]
                        }]
                    }, {

                        "type": "section",
                        "htmlClass": "",
                        "items": [{
                            "key": "source-info-window",
                            "condition": "model['marker-info-window']=='true'",
                            "title": "Info window per source",
                            "items": [{
                                "type": "section",
                                "htmlClass": "row",
                                "items": [

                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "source-info-window[].source",
                                            "title": "Source"
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "source-info-window[].template",
                                            "title": "Template"
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "source-info-window[].max-width",
                                            "title": "Max width",
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "source-info-window[].max-height",
                                            "title": "Max height"
                                        }]
                                    }]
                            }]
                        }]
                    }
                ]
            },
            /**
                        * { title: "Geofence behaviour", items: [ "geofence-manager", "api-geofence", "api-geofence-params", "msg-tag-geofence"] },
                       */
            {
                title: "Help",
                items: [{
                    "type": "help",
                    "helpvalue": "<div class=\"alert alert-info\"><h4>Map data format is as below, where: <br/> <br/>\"253831\": asset id, <br/> <br/> \"550488\": asset trip id & contains an array  of asset trip points data,  <br/> <br/>  \"order\" : [ \"550488\" ]\r\n   contains the asset's trips order <br/> <br/>and \"source\" : \"simulator\" is the asset source name.  </h4></div> <pre class=\"map-help-settings\">{\"253831\" : {\r\n      \"550488\" : [\r\n            {\r\n               \"lat\" : {\"value\": \"40.859140000000004\"},\r\n               \"long\" : {\"value\": \"-72.67528\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"6\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"57\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"0.9\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"2181\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"104\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"13.38\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"11\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"46\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            },\r\n            {\r\n               \"lat\" : {\"value\": \"40.859790000000004\"},\r\n               \"long\" : {\"value\": \"-72.67344\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"11\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"23\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"1.6\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"1498\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"87\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"13.68\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"10\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"49\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            },\r\n            {\r\n               \"lat\" : {\"value\": \"40.86056000000001\"},\r\n               \"long\" : {\"value\": \"-72.67124000000001\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"15\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"32\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"1.8\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"1323\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"91\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"14.30\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"13\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"57\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            } ],\r\n      \"source\" : \"simulator\",\r\n      \"order\" : [ \"550488\" ]\r\n   } }</pre>"
                }]
            },]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "clustered-view": {
                "title": "Clustered View",
                "type": "string",
                "description": "Render map with a cluster view for conglomerate markers or not."
            },
            "cluster-zoom": {
                "title": "Cluster Zoom",
                "type": "number",
                "description": "The initial map zoom level when clustered view is true.",
                "default": 3
            },
            "cluster-styles": {
                "title": "Cluster Styles",
                "type": "array",
                "description": "Used to style the pin clusters icons, for more info see <a href='https://googlemaps.github.io/js-marker-clusterer/docs/reference.html' target='_blank'>this</a> .",
                "default": [],
                "items": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "title": "url",
                            "type": "string"
                        },
                        "height": {
                            "title": "Height",
                            "type": "number"
                        },
                        "width": {
                            "title": "Width",
                            "type": "number",
                        },
                        "anchor": {
                            "title": "Anchor",
                            "type": "array",
                            "startEmpty": true,
                            "items": {
                                "title": "",
                                "type": "number"
                            }
                        },
                        "textColor": {
                            "title": "Text Color",
                            "type": "string",
                            "format": "color",
                        },
                        "textSize": {
                            "title": "Text Size (px)",
                            "type": "number"
                        },
                        "backgroundPosition": {
                            "title": "Background Position",
                            "type": "string"
                        },
                        "iconAnchor": {
                            "title": "Icon Anchor",
                            "startEmpty": true,
                            "type": "array",
                            "items": {
                                "title": "",
                                "type": "number"
                            }
                        }
                    }
                }
            },
            "heatmap": {
                "title": "Heat Map",
                "type": "string",
                "description": "Enable/disable heat map."
            },
            "heat-map-radius": {
                "title": "Heat Map Radius",
                "type": "number",
                "description": ""
            },
            "heat-map-weight": {
                "title": "Heat Map Weight",
                "type": "number",
                "description": ""
            },
            "heat-map-opacity": {
                "title": "Heat Map Opacity",
                "type": "number",
                "description": ""
            },
            "heat-map-gradient": {
                "title": "Heat Map Gradient",
                "type": "array",
                "description": "",
                "default": [],
                "items": {
                    "type": "string",
                    "format": "color"
                }
            },
            "bounce": {
                "title": "Bounce",
                "type": "string",
                "description": "Enable/disable bouncing."
            },
            "clustered-zoom-max": {
                "title": "Cluster Zoom Max",
                "type": "number",
                "description": "Map max zoom level with a rendered cluster view.",
                "default": 11
            },
            "focused-marker-zoom": {
                "title": "Focused marker zoom",
                "type": "number",
                "description": "Zoom level when focusing on a single marker. If not set it is equal to detailed map zoom + 3.",
            },
            "detailed-zoom-min": {
                "title": "Detailed map initial zoom",
                "type": "number",
                "description": "Ignored when clustered view true.",
                "default": 0
            },
            "max-asset-points": {
                "title": "Max marker trip points",
                "type": "string",
                "description": "Number of tracked trip points per marker, do not set if infinite.",
                "default": 100
            },
            "marker-info-window": {
                "title": "Show marker info",
                "type": "string",
                "description": "Whether to show an info window on marker click.",
                "default": "true"
            },
            "default-center": {
                "title": "Default Map Center",
                "type": "string",
                "description": "Default map center before marker(s) is/are loaded. String format lat,long.",
                "default": "40.7053111,-74.258188"
            },
            "simple-sources-info": {
                "title": "Sources Info",
                "type": "array",
                "default": [],
                "description": "",
                "items": {
                    "type": "object",
                    "properties": {
                        "source": {
                            "type": "string",
                            "description": "Info Source Type",
                            "title": "Source Type",
                        },

                        "label": {
                            "type": "string",
                            "description": "Sources Info Label",
                            "title": "Label",
                        },

                        "url": {
                            "type": "string",
                            "description": "Sources Info Icon URL",
                            "title": "Icon URL",

                        }
                    }
                }
            },
            "data": {
                "title": "Markers data",
                "type": "string",
                "description": "Static markers data",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": '{ "253812" : { "550153" : [ { "lat" : {"value": "40.84969"}, "long" :{"value": "-73.94168"}, "speed" : { "value" : "8", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "30", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.3", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2818", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "91", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.99", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "61","description" : "Received Signal Strength Indicator" } }, { "lat" :{"value": "40.84919"}, "long" : {"value": "-73.93897000000001"}, "speed": { "value" : "5", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "57", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.4","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2838", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "94", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.15", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55101"}, "make" : { "value" : "Toyota" }, "model" : { "value" : "Tacoma" },"snr" : { "value" : "9", "description" : "Signal to Noise Ratio" },"rssi" : { "value" : "48", "description" : "Received Signal StrengthIndicator" } }, { "lat" : {"value": "40.848600000000005"}, "long" :{"value": "-73.93648"}, "speed" : { "value" : "9", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "76", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.2", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2465", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "97", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.39", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "69","description" : "Received Signal Strength Indicator" } } ], "source" :"simulator", "order" : [ "550153" ] }, "253815" : { "550191" : [ { "lat": {"value": "40.80913"}, "long" : {"value": "-73.90327"}, "speed" : {"value" : "7", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "56", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.2","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2123", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "100", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.45", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55043"}, "make" : { "value" : "Saab" }, "model" : { "value" : "9-3" }, "snr" :{ "value" : "13", "description" : "Signal to Noise Ratio" }, "rssi" : {"value" : "49", "description" : "Received Signal Strength Indicator" }}, { "lat" : {"value": "40.807500000000004"}, "long" : {"value":"-73.90557000000001"}, "speed" : { "value" : "6", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "16", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.7", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "1946", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "95", "description" :"Engine Temperature" }, "voltage" : { "value" : "12.87", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55043" }, "make" : { "value" : "Saab" },"model" : { "value" : "9-3" }, "snr" : { "value" : "13", "description" :"Signal to Noise Ratio" }, "rssi" : { "value" : "59", "description" :"Received Signal Strength Indicator" } } ], "source" : "simulator","order" : [ "550191" ] } }'
                }
            },
            "path-stroke-opacity": {
                "title": "Path stroke opacity",
                "type": "number",
                "description": "Default marker trail opacity.",
                "default": 0

            },
            "path-stroke-weight": {
                "title": "Path stroke weight",
                "type": "number",
                "description": "Default marker trail stroke weight.",
                "default": 1
            },

            "custom-default-info-window": {
                "title": "Custom Default Info Windo",
                "type": "hidden"
            },
            "default-info-window": {
                "title": "Source Info Window",
                "type": "object",
                "description": "",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "Id",
                            "type": "string"
                        },
                        "template": {
                            "title": "Template",
                            "type": "string"
                        },
                        "max-width": {
                            "title": "Max width",
                            "type": "number",
                        },
                        "max-height": {
                            "title": "Max height",
                            "type": "number"
                        }
                    }
                }
            },
            "source-info-window": {
                "title": "Source Info Window",
                "type": "array",
                "default": [],
                "description": "",
                "items": {
                    "type": "object",
                    "properties": {
                        "source": {
                            "title": "Source",
                            "type": "string"
                        },
                        "template": {
                            "title": "Template",
                            "type": "string"
                        },
                        "max-width": {
                            "title": "Max width",
                            "type": "number",
                        },
                        "max-height": {
                            "title": "Max height",
                            "type": "number"
                        }
                    }
                }
            }
        },
        "required": []
    }
};