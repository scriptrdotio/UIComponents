const __GAUGE__ = {
    "name": "gauge",
    "label": "Gauge",
    "class": "scriptr-gauge",
    "commonData": true,
    "show": true,
    "defaults": {
        "transport": "wss",
        "on-format-data": "return data;",
        "boxLabel": "Gauge",
        "msg-tag": "gauge",
        //   "data" : 30,
        "api": "UIComponents/dashboard/frontend/examples/gauge/getGaugeVal"
    },
    "box": {
        sizeX: 2,
        sizeY: 4,
        minSizeX: 2,
        minSizeY: 2
    },
    "imgCls": "gauge-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/gauge.png",
    "form": [{
        "type": "tabs",
        "tabs": [
            {
                "title": "Format",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": ["symbol"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": ["value-min-font-size"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": ["value-font-color"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": [{
                                    "key": "hide-value",
                                    "type": "radios-inline",
                                    "titleMap": [{
                                        "value": "true",
                                        "name": "True"
                                    }, {
                                        "value": "false",
                                        "name": "False"
                                    }]
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
                                "helpvalue": "<hr/>"
                            }]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": ["label"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": ["label-min-font-size"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": ["label-font-color"]
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
                                "helpvalue": "<hr/>"
                            }]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [{
                                    "key": "value-font-family",
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
                                    }],
                                }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["gauge-color"]
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
                                "helpvalue": "<hr/>"
                            }]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "format-number",
                                "type": "radios-inline",
                                "titleMap": [{
                                    "value": "true",
                                    "name": "True"
                                }, {
                                    "value": "false",
                                    "name": "False"
                                }]
                            }]
                        }, {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["decimals"]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [{
                                    "key": "human-friendly",
                                    "type": "radios-inline",
                                    "titleMap": [{
                                        "value": "true",
                                        "name": "True"
                                    }, {
                                        "value": "false",
                                        "name": "False"
                                    }]
                                }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["human-friendly-decimal"]
                            }]
                    }]
            },
            {
                "title": "Min/Max",
                "items": [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                "min",
                                "min-label-min-font-size",
                                {
                                    "key": "hide-min-max",
                                    "type": "radios-inline",
                                    "titleMap": [{
                                        "value": "true",
                                        "name": "True"
                                    }, {
                                        "value": "false",
                                        "name": "False"
                                    }]
                                }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                "max",
                                "max-label-min-font-size",
                                {
                                    "key": "reverse",
                                    "type": "radios-inline",
                                    "titleMap": [{
                                        "value": "true",
                                        "name": "True"
                                    }, {
                                        "value": "false",
                                        "name": "False"
                                    }]
                                }]
                        }]
                }

                ]
            },
            {
                "title": "Sectors",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-4",
                            "items": [{
                                "key": "pointer",
                                "type": "radios-inline",
                                "titleMap": [{
                                    "value": "true",
                                    "name": "True"
                                }, {
                                    "value": "false",
                                    "name": "False"
                                }]
                            }]
                        }, {
                            "type": "section",
                            "htmlClass": "col-xs-4",
                            "items": [{
                                "key": "gauge-width-scale",
                                "step": "0.1"
                            }]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [

                            {
                                "type": "section",
                                "htmlClass": "col-xs-4",
                                "items": [{
                                    "key": "donut",
                                    "type": "radios-inline",
                                    "titleMap": [{
                                        "value": "true",
                                        "name": "True"
                                    }, {
                                        "value": "false",
                                        "name": "False"
                                    }]
                                }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-4",
                                "items": ["donut-start-angle"]
                            }

                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-4",
                                "items": [{
                                    "key": "no-gradient",
                                    "type": "radios-inline",
                                    "titleMap": [{
                                        "value": "true",
                                        "name": "True"
                                    }, {
                                        "value": "false",
                                        "name": "False"
                                    }]
                                }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-4",
                                "items": [{
                                    "key": "level-colors",
                                    "items": [{
                                        "key": "level-colors[]",
                                        "colorFormat": "hex3"
                                    }],

                                    "style": {
                                        "add": "btn-primary btn-sm pull-left"
                                    }
                                }]
                            }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-4",
                                "items": [{
                                    "key": "custom-sectors",
                                    "title": "",
                                    "items": [{
                                        "key": "custom-sectors.percents",
                                        "title": "Custom percent",
                                        "type": "radios-inline",
                                        "titleMap": [
                                            {
                                                "value": "true",
                                                "name": "True"
                                            },
                                            {
                                                "value": "false",
                                                "name": "False"
                                            }]
                                    }]
                                }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-8",
                                "items": [{
                                    "key": "custom-sectors",
                                    "title": "",
                                    "items": [{
                                        "key": "custom-sectors.ranges",
                                        "title": "Custom Ranges",
                                        "style": {
                                            "add": "btn-primary btn-sm pull-left"
                                        },
                                        "items": [{
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [

                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-3",
                                                    "items": [{
                                                        "key": "custom-sectors.ranges[].color",
                                                        "title": "color",
                                                        "colorFormat": "hex3"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-4",
                                                    "items": [{
                                                        "key": "custom-sectors.ranges[].lo"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-4",
                                                    "items": [{
                                                        "key": "custom-sectors.ranges[].hi"
                                                    }]
                                                }]
                                        }

                                        ]
                                    }]
                                }]
                            }]
                    }]
            },
            {
                "title": "shadow",
                "items": [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [{
                                "key": "show-inner-shadow",
                                "type": "radios-inline",
                                "titleMap": [{
                                    "value": "true",
                                    "name": "True"
                                }, {
                                    "value": "false",
                                    "name": "False"
                                }]
                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": ["shadow-size"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [{
                                "key": "shadow-opacity",
                                "step": "0.1"
                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": ["shadow-vertical-offset"]
                        }]
                }]
            },
            {
                "title": "Animation",
                "items": [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                {
                                    "key": "start-animation-type",
                                    "type": 'strapselect',
                                    "placeholder": " ",
                                    "titleMap": [{
                                        "value": "linear",
                                        "name": "linear"
                                    }, {
                                        "value": ">",
                                        "name": ">"
                                    }, {
                                        "value": "<",
                                        "name": "<"
                                    }, {
                                        "value": "<>",
                                        "name": "<>"
                                    }, {
                                        "value": "bounce",
                                        "name": "bounce"
                                    }]
                                },
                                {
                                    "key": "refresh-animation-type",
                                    "type": 'strapselect',
                                    "placeholder": " ",
                                    "titleMap": [{
                                        "value": "linear",
                                        "name": "linear"
                                    }, {
                                        "value": ">",
                                        "name": ">"
                                    }, {
                                        "value": "<",
                                        "name": "<"
                                    }, {
                                        "value": "<>",
                                        "name": "<>"
                                    }, {
                                        "value": "bounce",
                                        "name": "bounce"
                                    }]
                                },
                                {
                                    "key": "counter",
                                    "type": "radios-inline",
                                    "titleMap": [{
                                        "value": "true",
                                        "name": "True"
                                    }, {
                                        "value": "false",
                                        "name": "False"
                                    }]
                                }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                "start-animation-time",
                                "refresh-animation-time"]
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
                "description": "Gauge static value to show"
            },
            "value-font-color": {
                "title": "Value color",
                "type": "string",
                "default": "#999",
                "format": "color",
                "description": "Color of the gauge value text"
            },
            "min": {
                "title": "Gauge min",
                "type": "number",
                "default": 0,
                "description": "Minimum gauge value."
            },
            "max": {
                "title": "Gauge max",
                "type": "number",
                "default": 100,
                "description": "Maximum gauge value."
            },

            "hide-min-max": {
                "title": "Hide min/max",
                "type": "string",
                "default": "false",
                "description": "Select true to hide min and max values (bool)"
            },
            "hide-value": {
                "title": "Hide value",
                "type": "string",
                "default": "false",
                "description": "Select true to hide gauge value"
            },

            "show-inner-shadow": {
                "title": "Show shadow",
                "type": "string",
                "default": "false",
                "description": "Show gauge inner shadow"
            },

            "gauge-color": {
                "title": "Gauge background",
                "type": "string",
                "format": "color",
                "description": "Background color of gauge."
            },
            "custom-sectors": {
                "title": "Custom sectors",
                "type": "object",
                "properties": {
                    "percents": {
                        "title": "Percents",
                        "type": "string",
                        "default": "false",
                        "description": "Set to true for to have percent based sectors."
                    },
                    "ranges": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "color": {
                                    "title": "Sector Color",
                                    "type": "string",
                                    "format": "color"
                                },
                                "lo": {
                                    "type": "number"
                                },
                                "hi": {
                                    "type": "number"
                                }
                            }
                        }
                    }
                }
            },
            "shadow-size": {
                "title": "Shadow size",
                "type": "number",
                "default": 5,
                "description": "Gauge inner shadow size."
            },
            "shadow-opacity": {
                "title": "Shadow opacity",
                "type": "number",
                "default": 0.2,
                "description": "Shadow opacity, values 0 ~ 1",
                "minimum": 0,
                "maximum": 1
            },
            "label": {
                "title": "Label",
                "type": "string",
                "description": "Text to show below gauge value."
            },
            "label-font-color": {
                "title": "Label color",
                "type": "string",
                "description": "Color of label under the value",
                "format": "color"
            },
            "start-animation-type": {
                "title": "Start animation",
                "type": "string",
                "default": "linear",
                "description": "Select type of initial animation.",

            },
            "refresh-animation-type": {
                "title": "Refresh animation",
                "type": "string",
                "default": "linear",
                "description": "Select type of refresh animation.",

            },

            "value-font-family": {
                "title": "Gauge font family",
                "type": "string",
                "default": "Source Sans Pro",

                "description": "Font family of the gauge."
            },
            "value-min-font-size": {
                "title": "Value size",
                "type": "number",
                "default": 12,
                "description": "Minimum font size for the value."
            },
            "label-min-font-size": {
                "title": "Label size",
                "type": "number",
                "default": 12,
                "description": "Minimum font size for the label."
            },
            "min-label-min-font-size": {
                "title": "Min label size",
                "type": "number",
                "default": 12,
                "description": "Minimum font size for the minimum label."
            },
            "max-label-min-font-size": {
                "title": "Max label size",
                "type": "number",
                "default": 12,
                "description": "Minimum font size for the maximum label."
            },
            "gauge-width-scale": {
                "title": "Width scale",
                "type": "number",
                "default": 1,
                "description": "Gauge width scale."
            },
            "shadow-vertical-offset": {
                "title": "Shadow vertical offset",
                "type": "number",
                "default": 3,
                "description": "Defines how much is shadow offset from top."
            },
            "level-colors": {
                "title": "Level colors",
                "type": "array",
                "minItems": 1,
                "items": {
                    "type": "string",
                    "format": "color"
                },
                "format": "color",
                "default": ["#a9d70b", "#f9c802", "#ff0000"],
                "description": "Colors of indicator, from lower to upper."
            },
            "relative-gauge-size": {
                "title": "Relative gauge size",
                "type": "string",
                "default": "true",
                "description": "Set to true to use sector-based color change, false to use gradual color change."
            },
            "no-gradient": {
                "title": "No gradient",
                "type": "string",
                "default": "false",
                "description": "Set to true to use sector-based color change, false to use gradual color change."
            },
            "start-animation-time": {
                "title": "Start animation time",
                "type": "number",
                "default": 700,
                "description": "Duration of initial load animation in ms."
            },
            "refresh-animation-time": {
                "title": "Refresh animation time",
                "type": "number",
                "default": 700,
                "description": "Length of refresh animation in ms."
            },
            "donut": {
                "title": "Donut",
                "type": "string",
                "default": "false",
                "description": "Turn the gauge into a full circle donut."
            },
            "donut-start-angle": {
                "title": "Donut start angle",
                "type": "number",
                "default": 90,
                "description": "Angle to start from when in donut mode."
            },
            "width": {
                "title": "Width",
                "type": "number",
                "description": "Gauge width"
            },
            "height": {
                "title": "Height",
                "type": "number",
                "description": "Gauge height."
            },
            "reverse": {
                "title": "Reverse",
                "type": "string",
                "default": "false",
                "description": "Set to trueto swap max and min (with max appearing on the left, min on the right)."
            },
            "decimals": {
                "title": "Decimals",
                "type": "number",
                "default": 0,
                "description": "Quantity of decimal numbers to show."
            },
            "symbol": {
                "title": "Symbol",
                "type": "string",
                "description": "Unit of measure that will be appended to value."
            },
            "format-number": {
                "title": "Format number",
                "type": "string",
                "default": "false",
                "description": "Set to true to format numbers."
            },
            "human-friendly": {
                "title": "Human friendly",
                "type": "string",
                "default": "false",
                "description": "Set to true to show shorthand big numbers (300K instead of 300XXX)."
            },
            "human-friendly-decimal": {
                "title": "Human friendly decimals",
                "type": "number",
                "default": 0,
                "description": "Number of decimal places for our human friendly number to contain."
            },
            "pointer": {
                "title": "Pointer",
                "type": "string",
                "default": "false",
                "description": "Set to true to show value pointer."
            },

            "counter": {
                "title": "Counter",
                "type": "string",
                "default": "false",
                "description": "Set to true to increase numbers one by one."
            }
        },
        "required": ["level-colors"]
    }
};