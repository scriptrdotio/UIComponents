const __SPEEDOMETER__ = {
    "name": "speedometer",
    "label": "Speedometer",
    "class": "scriptr-speedometer",
    "commonData": true,
    "show": true,
    "defaults": {
        "transport": "wss",
        "boxLabel": "Speedometer",
        "on-format-data": "return data;",
        "data": 45,
        "msg-tag": "speedometer"
        //     ,"api" : "UIComponents/dashboard/frontend/examples/speedometer/getSpeedometerVal"
    },
    "box": {
        sizeX: 3,
        sizeY: 5,
        minSizeX: 2,
        minSizeY: 4
    },
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/speedometer.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "min/max",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["min-value",
                                "max-value"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                "tick-space-maj-val",
                                "tick-space-min-val"]
                        }]
                }]
            },
            {
                title: "Format",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-4",
                            "items": ["tick-col-maj",
                                "outer-edge-col",
                                "needle-col",
                                {
                                    "key":"default-fonts",
                                    "type": 'strapselect',
                                    "placeholder": " ",
                                    "titleMap": [{
                                        "value": "Arial",
                                        "name": "Arial"
                                    }, {
                                        "value": "Helvetica",
                                        "name": "Helvetica"
                                    }, {
                                        "value": "Times New Roman",
                                        "name": "Times New Roman"
                                    }, {
                                        "value": "Courier New",
                                        "name": "Courier New"
                                    }, {
                                        "value": "Courier",
                                        "name": "Courier"
                                    }, {
                                        "value": "Verdana",
                                        "name": "Verdana"
                                    }, {
                                        "value": "Georgia",
                                        "name": "Georgia"
                                    }, {
                                        "value": "Palatino",
                                        "name": "Palatino"
                                    }, {
                                        "value": "Garamond",
                                        "name": "Garamond"
                                    }, {
                                        "value": "Bookman",
                                        "name": "Bookman"
                                    }, {
                                        "value": "Comic Sans MS",
                                        "name": "Comic Sans MS"
                                    }, {
                                        "value": "Trebuchet MS",
                                        "name": "Trebuchet MS"
                                    }, {
                                        "value": "Arial Black",
                                        "name": "Arial Black"
                                    }, {
                                        "value": "Impact",
                                        "name": "Impact"
                                    }, {
                                        "value": "Sans-Serif",
                                        "name": "Sans-Serif"
                                    }, {
                                        "value": "Source Sans Pro",
                                        "name": "Source Sans Pro"
                                    }]
                            }
                        ]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-4",
                            "items": ["tick-col-min",
                                "inner-col",
                                "gauge-units"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-4",
                            "items": ["tick-label-col",
                                "pivot-col",
                                "units-label-col"]
                        }]
                }]
            }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "data": {
                "title": "Static data",
                "type": "number",
                "description": "Sets the value of needle to be pointed."
            },
            "min-value": {
                "title": "Minimum Value",
                "type": "number",
                "description": "Minimum value to be shown in gauge scale.",
                "default": 0
            },
            "max-value": {
                "title": "Maximum Value",
                "type": "number",
                "description": "Maximum value to be shown in gauge scale.",
                "default": 220
            },

            "tick-space-min-val": {
                "title": "Minor Tick Space Value",
                "type": "number",
                "description": "Space between the major ticks of the gauge.",
                "default": 10
            },
            "tick-space-maj-val": {
                "title": "Major Tick Space Value",
                "type": "number",
                "description": "Space between the sub ticks of the gauge.",
                "default": 20
            },
            "gauge-units": {
                "title": "Gauge Units",
                "type": "string",
                "description": "Unit of the values to be shown(ex. Kmph,%)."
            },
            "tick-col-maj": {
                "title": "Tick Major Color",
                "type": "string",
                "description": "Sets color of the major tick.",
                "format": "color",
                "default": "#C64DFF"
            },
            "tick-col-min": {
                "title": "Tick Minor Color",
                "type": "string",
                "format": "color",
                "description": "Sets color of the sub tick.",
                "default": "#999999"
            },
            "outer-edge-col": {
                "title": "Outer Edge color",
                "type": "string",
                "description": "Sets the color of outer circle of the gauge.",
                "format": "color",
                "default": "#f4f4f4"
            },
            "pivot-col": {
                "title": "Pivot color",
                "type": "string",
                "description": "Sets color of the pivot.",
                "format": "color",
                "default": "#434a54"
            },
            "inner-col": {
                "title": "Inner color",
                "type": "string",
                "description": "Sets color of inner body of the gauge.",
                "format": "color",
                "default": "#fff"
            },
            "units-label-col": {
                "title": "Units Label Colour",
                "type": "string",
                "description": "Sets color of units label.",
                "format": "color",
                "default": "#C64DFF"
            },
            "tick-label-col": {
                "title": "Tick Label Colour",
                "type": "string",
                "description": "Sets color of labels of the ticks.",
                "format": "color",
                "default": "#656D78"
            },
            "needle-col": {
                "title": "Needle Colour",
                "type": "string",
                "description": "Sets color of the needle.",
                "format": "color",
                "default": "#C64DFF"
            },
            "default-fonts": {
                "title": "Default Fonts",
                "type": "string",
                "description": "Sets the default fonts in gauge.",
                "default": "Source Sans Pro",
               
            }
        },
        "required": []
    }
};