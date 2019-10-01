const __LINE_DYGRAPH__ = {
    "name": "line",
    "label": "Line Chart",
    "class": "scriptr-dygraphs",
    "commonData": true,
    "show": true,
    "defaults": {
        "type": "line",
        "on-format-data": "return data;",
        "data-type": "raw",
        "data-format": "dygraphs",
        "schema-for": "line",
        "display-metric-param": "display_metric",
        "fetch-data-interval": 300, //in seconds
        "boxLabel": "Line Chart",
        "boxBorder": true,
        "transport": "wss",
        "data": "[[1519312895840,10,26,16,20],[1519312896840,11,25,16,20],[1519312897840,10,26,16,20],[1519312898840,11,25,15,20],[1519312899840,10,26,16,21]]",
        "grid-text-family": "Source Sans Pro",
        "x1-axis-label-font-size": 12,
        "x1-axis-label-width": 40,
        "y2-axis-label-width": 40,
        "y-axis-label-width": 40,
        "y2-axis-label-font-size": 12,
        "y-axis-label-font-size": 12,
        "independent-ticks": "independent",
        "colors-mapping": [{ "labels": "Y1", "colors": "##CC546", "axisSelection": "y" }, { "labels": "Y2", "colors": "#FCC717", "axisSelection": "y" }, { "labels": "Y3", "colors": "#38B9D6", "axisSelection": "y" }, { "labels": "Y4", "colors": "#1DBC68", "axisSelection": "y" }],
        "use-functional":false,
        "functional-data-type":"scattered",
        "scattered-xdata": "[1,2,3,4,5,6,7,8,9,10]",
        "range-min": "1",
        "range-max": "10",
        "range-step": "1",
        "calculate-function": "function(x) {return x;}",

    },
    "box": {
        sizeX: 6,
        sizeY: 5,
        minSizeX: 4,
        minSizeY: 3
    },
    "imgSrc": "//s3.amazonaws.com/scriptr-cdn/uicomponents/dashboard-builder/images/dygraphs-line.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "X",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [{
                            
                            key: "draw-x1-axis",
                            
                        }, "x1-axis-label", "x1-axis-label-font-size"]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [{
                            "key": "x1-axis-line-color",
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
                        },
                        {
                            "key": "x1-axis-line-width",
                            "step": "1"
                        },
                            "x1-axis-label-width"]
                    }
                    ]
                }]
            },
            {
                title: "Y",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [{
                            
                            key: "draw-y-axis",
                            
                        }, "y-axis-label", "y-axis-label-font-size", "y-axis-label-width"
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [{
                            "key": "y-axis-line-color",
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
                        },
                        {
                            "key": "y-axis-line-width",
                            "step": "1"
                        },
                        {
                            type: "radios-inline",
                            key: "y-axis-include-zero",
                            titleMap: [{
                                value: "true",
                                name: "Yes"
                            }, {
                                value: "false",
                                name: "No"
                            }]
                        },
                        {
                            
                            key: "y-axis-labels-kmb",
                            
                        }]
                    }]
                }
                ]
            },
            {
                title: "Y2",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [{
                            type: "radios-inline",
                            key: "draw-y2-axis",
                            titleMap: [{
                                value: "true",
                                name: "Yes"
                            }, {
                                value: "false",
                                name: "No"
                            }]
                        }, "y2-axis-label", "y2-axis-label-font-size", "y2-axis-label-width"
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [{
                            "key": "y2-axis-line-color",
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
                        },
                        {
                            "key": "y2-axis-line-width",
                            "step": "1"
                        },
                        {
                            type: "radios-inline",
                            key: "y2-axis-include-zero",
                            titleMap: [{
                                value: "true",
                                name: "Yes"
                            }, {
                                value: "false",
                                name: "No"
                            }]
                        },
                        {
                            
                            key: "y2-axis-labels-kmb",
                            
                        }]
                    }]
                }]
            },
            {
                title: "Functional Data",

                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [

                            {
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": [
                                    { key: "use-functional" },
                                    {
                                        type: "radios-inline",
                                        key: "functional-data-type",
                                        condition: " model['use-functional'] ",
                                        titleMap: [{
                                            value: "scattered",
                                            name: "Scattered"
                                        }, {
                                            value: "range",
                                            name: "Range"
                                        }]
                                    },
                                    {
                                        key: "scattered-xdata",
                                        condition: " model['use-functional'] && (model['functional-data-type']=='scattered') "

                                    },
                                    {
                                        key: "range-min",
                                        condition: " model['use-functional'] && (model['functional-data-type']=='range') ",
                                        "htmlClass": "col-xs-12 col-sm-4",

                                    },
                                    {
                                        key: "range-max",
                                        condition: " model['use-functional'] && (model['functional-data-type']=='range') ",
                                        "htmlClass": "col-xs-12 col-sm-4"
                                    },
                                    {
                                        key: "range-step",
                                        condition: " model['use-functional'] && (model['functional-data-type']=='range') ",
                                        "htmlClass": "col-xs-12 col-sm-4"
                                    },
                                    {
                                        key: "calculate-function",
                                        condition: " model['use-functional'] ",
                                        "type": "codemirror",
                                        "codemirrorOptions": {
                                            value: "return",
                                            styleActiveLine: true,
                                            lineNumbers: true,
                                            lineWrapping: true,
                                            autoCloseBrackets: true,
                                            matchBrackets: true,
                                            theme: "neo",
                                            mode: "javascript",
                                            readOnly: false,
                                            autoRefresh: true
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            {
                title: "Legend",
                items: [
                    {
                        key: "show-legend",
                       
                    },
                    {

                        "type": "section",
                        "htmlClass": "",
                        "items": [{
                            "condition": "model['show-legend'] =='true'",
                            "key": "colors-mapping",
                            "title": "Legend Details",
                            "items": [{
                                "condition": "model['show-legend'] =='true'",
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "condition": "model['show-legend'] =='true'",
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "key": "colors-mapping[].labels",
                                            "title": "Legend Label"
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "condition": "model['show-legend'] =='true'",
                                            "key": "colors-mapping[].colors",
                                            "title": "Color",
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
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "condition": "model['show-legend'] =='true'",
                                            "key": "colors-mapping[].unit",
                                            "title": "Legend unit"
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-3",
                                        "items": [{
                                            "condition": "model['show-legend'] =='true'",
                                            "key": "colors-mapping[].axisSelection",
                                            "title": "Legend Axis",
                                            "notitle": false,
                                            "type": "strapselect",
                                            "titleMap": [{
                                                "value": "y",
                                                "name": "Y"
                                            }, {
                                                "value": "y2",
                                                "name": "Y2"
                                            }]
                                        }]
                                    }
                                ]
                            }]
                        }]
                    }
                ]
            },
            {
                title: "Grid",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-4",
                        "items": [{
                            type: "radios-inline",
                            key: "x1-draw-grid",
                            titleMap: [{
                                value: "true",
                                name: "Yes"
                            }, {
                                value: "false",
                                name: "No"
                            }]
                        }, {
                            "key": "x1-grid-line-color",
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
                        },
                        {
                            "key": "x1-grid-line-width",
                            "step": "1"
                        }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-4",
                        "items": [{
                            type: "radios-inline",
                            key: "y-draw-grid",
                            titleMap: [{
                                value: "true",
                                name: "Yes"
                            }, {
                                value: "false",
                                name: "No"
                            }]
                        }, {
                            "key": "y-grid-line-color",
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
                        },
                        {
                            "key": "y-grid-line-width",
                            "step": "1"
                        }

                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-4",
                        "items": [
                            {
                                type: "radios-inline",
                                key: "y2-draw-grid",
                                titleMap: [{
                                    value: "true",
                                    name: "Yes"
                                }, {
                                    value: "false",
                                    name: "No"
                                }]
                            }, {
                                "key": "y2-grid-line-color",
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
                            },
                            {
                                "key": "y2-grid-line-width",
                                "step": "1"
                            }

                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [{
                            "key": "independent-ticks",
                            "notitle": false,
                            "type": "strapselect",
                            "titleMap": [{
                                "value": "y-primary",
                                "name": "Ticks are aligned. Y is primary"
                            },
                            {
                                "value": "y2-primary",
                                "name": "Ticks are aligned. Y2 is primary"
                            },
                            {
                                "value": "independent",
                                "name": "Ticks are not aligned"
                            }]
                        }]
                    }
                    ]
                }]
            }, {
                title: "Slider",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                type: "radios-inline",
                                key: "show-range-selector",
                                titleMap: [{
                                    value: "true",
                                    name: "Yes"
                                }, {
                                    value: "false",
                                    name: "No"
                                }
                                ]
                            }, "range-selector-alpha", "range-selector-background-line-width",
                            {
                                "key": "range-selector-background-stroke-color",
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
                            }, "range-selector-foreground-line-width"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "key": "range-selector-foreground-stroke-color",
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
                            }, "range-selector-height",
                            {
                                "key": "range-selector-plot-fill-color",
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
                            },
                            {
                                "key": "range-selector-plot-fill-gradient-color",
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
                            },
                            {
                                "key": "range-selector-plot-line-width",
                                "step": "0.1"
                            }, {
                                "key": "range-selector-plot-stroke-color",
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
                        }]
                }]
            },
            {
                title: "Goals",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "key": "custom-goals",
                                "startEmpty": true,
                                "title": "Fill Colors & Goals",
                                "items": [{
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6",
                                            "items": [{
                                                "key": "custom-goals[].goal-line-colors",
                                                "title": "Color",
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
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6",
                                            "items": [{
                                                "key": "custom-goals[].goals",
                                                "title": "Goal",
                                                "onFieldLoad": function (modelValue, form, model) {
                                                    if (!isNaN(modelValue) && model["default-metric-value"] && model["default-metric-value"] != model["display-metric-value"]) {
                                                        if (model["available-units"] && model["is-scaled"] == "false") {
                                                            var from_unit = model["available-units"][model["default-metric-value"]];
                                                            var to_unit = model["available-units"][model["display-metric-value"]];
                                                            if (from_unit !== to_unit) {
                                                                model[form.key[0]][form.key[1]][form.key[2]] = getConversionFunction(from_unit, to_unit)(model[form.key[0]][form.key[1]][form.key[2]])
                                                            }
                                                        }
                                                    }
                                                }
                                            }]
                                        }
                                    ]
                                }]
                            }]
                        }
                    ]
                }]
            },
            {
                title: "Events",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["events"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                {
                                    "key": "event-line-colors",
                                    "items": [{
                                        "key": "event-line-colors[]",
                                        "colorFormat": "hex3"
                                    }]
                                }]
                        }]
                }]
            }
        ]
    }],
    "schema": {
        "required": [],
        "type": "object",
        "title": "Schema",
        "properties": {
            "show-legend": {
                "title": "Show Legend",
                "default": "true",
                "type": "boolean",
                "description": ""
            },
            "legend-position": {
                "title": "Legend Position ",
                "type": "string",
                "default": "bottom",
                "description": "Determines the legend position relative to the graph.",
                "placeholder": " "
            },
            "draw-x1-axis": {
                "title": "Draw X-axis",
                "type": "boolean",
                "default": "true",
                "description": "Determines whether to draw the X-axis. Setting this to false also prevents x-axis ticks from being drawn and reclaims the space for the chart grid/lines."
            },
            "draw-y-axis": {
                "title": "Draw Y-axis",
                "type": "boolean",
                "default": "true",
                "description": "Determines whether to draw the Y-axis. Setting this to false also prevents y-axis ticks from being drawn and reclaims the space for the chart grid/lines."
            },
            "draw-y2-axis": {
                "title": "Draw Y2-axis",
                "type": "string",
                "default": "false",
                "description": "When turned off this prevents the y2-axis from being drawn and reclaims the space for the grid lines."
            },

            "colors-mapping": {
                "title": "Colors",
                "type": "array",
                "default": [],
                "description": "",
                "items": {
                    "type": "object",
                    "properties": {
                        "colors": {
                            "title": "Colors",
                            "type": "string",
                            "format": "color",
                            "default": "#CC5464",
                            "validationMessage": "Invalid Color"
                        },
                        "labels": {
                            "title": "Labels",
                            "type": "string",
                            "default": "Y1"
                        },
                        "unit": {
                            "title": "Units",
                            "type": "string"
                        },
                        "axisSelection": {
                            "title": "Legend Axis",
                            "type": "string",
                            "placeholder": " ",
                            "default": "y"
                        }
                    }
                }
            },

            "custom-goals": {
                "title": "Goals",
                "type": "array",
                "default": [{ "goal-line-colors": "#f0f0f0", "goals": "" }],
                "description": "Color: Color of goal line.<br/>Goal: Y value to draw as horizontal 'goal' line.",
                "items": {
                    "type": "object",
                    "properties": {
                        "goal-line-colors": {
                            "title": "Colors",
                            "type": "string",
                            "format": "color",
                            "validationMessage": "Invalid Color",
                            "default": "#F0F0F0"
                        },
                        "goals": {
                            "title": "Goals",
                            "type": "number",
                            "default": 0
                        }
                    }
                }
            },
            "events": {
                "title": "Events",
                "type": "array",
                "default": ['2010-02-02'],
                "description": "List of x-values to draw as vertical 'event' lines on the chart.",
                "items": {
                    "type": "string"
                }

            },
            "event-line-colors": {
                "title": "Event Line Colors",
                "type": "array",
                "default": ["#ffffff"],
                "description": "List of color values to use for the event line colors.",
                "items": {
                    "format": "color",
                    "type": "string",
                    "validationMessage": "Invalid Color"
                }
            },
            "colors": {
                "title": "Lines' Colors",
                "type": "array",
                "description": "Array containing colors for the series lines.",
                "items": {
                    "format": "color",
                    "type": "string",
                    "validationMessage": "Invalid Color"
                }
            },
            "x1-axis-label-font-size": {
                "title": "X-axis Label Font Size",
                "type": "number",
                "default": 12,
                "description": "Pixel size of the font for the x-axis label.",
                "minimum": 8,
                "maximum": 28
            },
            "y-axis-label-font-size": {
                "title": "Y-axis Label Font Size",
                "type": "number",
                "default": 12,
                "description": "Pixel size of the font for the y-axis label.",
                "minimum": 8,
                "maximum": 28
            },
            "y2-axis-label-font-size": {
                "title": "Y2-axis Label Font Size",
                "type": "number",
                "default": 12,
                "description": "Pixel size of font for the y2-axis label.",
                "minimum": 8,
                "maximum": 28
            },
            "x1-axis-label-width": {
                "title": "Axis Label Width",
                "type": "number",
                "default": 60,
                "description": "Width (in pixels) of the axis label width."
            },
            "y-axis-label-width": {
                "title": "Axis Label Width",
                "type": "number",
                "default": 95,
                "description": "Width (in pixels) of the axis label width. This also controls the width of the y-axis."
            },
            "y2-axis-label-width": {
                "title": "Axis Label Width",
                "type": "number",
                "default": 95,
                "description": "Width (in pixels) of the axis label width. This also controls the width of the y-axis."
            },
            "x1-axis-line-color": {
                "title": "X-axis Line Color",
                "type": "string",
                "default": "#000000",
                "format": "color",
                "description": "",
                "validationMessage": "Invalid Color"
            },
            "y-axis-line-color": {
                "title": "Y-axis Line Color",
                "type": "string",
                "default": "#000000",
                "format": "color",
                "description": "",
                "validationMessage": "Invalid Color"
            },
            "y2-axis-line-color": {
                "title": "Y2-axis Line Color",
                "type": "string",
                "default": "#000000",
                "format": "color",
                "description": "",
                "validationMessage": "Invalid Color"
            },
            "x1-axis-line-width": {
                "title": "X-axis Line Width",
                "type": "number",
                "default": 1,
                "description": "Pixel thickness of the x-axis line.",
                "minimum": 1,
                "maximum": 30
            },
            "y-axis-line-width": {
                "title": "Y-axis Line Width",
                "type": "number",
                "default": 1,
                "description": "Pixel thickness of the y-axis line.",
                "minimum": 1,
                "maximum": 30
            },
            "y2-axis-line-width": {
                "title": "Y2-axis Line Width",
                "type": "number",
                "default": 1,
                "description": "Pixel thickness of the y2-axis line.",
                "minimum": 1,
                "maximum": 30
            },
            "y-axis-include-zero": {
                "title": "Include Zero",
                "type": "string",
                "default": "false",
                "description": "Determines if the y-axis will include zero, typically the lowest value. This can be used to avoid exaggerating the variance in the data."
            },
            "y2-axis-include-zero": {
                "title": "Include Zero",
                "type": "string",
                "default": "false",
                "description": "Determines if the y2-axis will include zero, typically the lowest value. This can be used to avoid exaggerating the variance in the data."
            },
            "y-axis-labels-kmb": {
                "title": "Labels KMB",
                "type": "boolean",
                "default": "false",
                "description": "Show K/M/B for thousands/millions/billions on y-axis."
            },
            "y2-axis-labels-kmb": {
                "title": "Labels KMB",
                "type": "boolean",
                "default": "false",
                "description": "Show K/M/B for thousands/millions/billions on y-axis."
            },
            "show-range-selector": {
                "title": "Show Slider",
                "type": "string",
                "default": "false",
                "description": ""
            },
            "range-selector-alpha": {
                "title": "Alpha",
                "type": "number",
                "default": 0.6,
                "description": "The transparency of the veil that is drawn over the unselected portions of the slider mini plot. A value of 0 represents full transparency and the unselected portions of the mini plot will appear as normal. A value of 1 represents full opacity and the unselected portions of the mini plot will be hidden."
            },
            "range-selector-background-line-width": {
                "title": "Background Line Width",
                "type": "number",
                "default": 1,
                "description": "The width of the lines below and on both sides of the slider mini plot."
            },
            "range-selector-background-stroke-color": {
                "title": "Background Stroke Color",
                "type": "string",
                "default": "#808080",
                "format": "color",
                "description": "The color of the lines below and on both sides of the slider mini plot.",
                "validationMessage": "Invalid Color"
            },
            "range-selector-foreground-line-width": {
                "title": "Foreground Line Width",
                "type": "number",
                "default": 1,
                "description": "The width of the lines in the interactive layer of the slider.",
                "minimum": 1,
                "maximum": 10
            },
            "range-selector-foreground-stroke-color": {
                "title": "Foreground Line Color",
                "type": "string",
                "default": "#000000",
                "format": "color",
                "description": "The color of the lines in the interactive layer of the slider.",
                "validationMessage": "Invalid Color"
            },
            "range-selector-height": {
                "title": "Height",
                "type": "number",
                "default": 40,
                "description": "Pixel height of the slider.",
                "minimum": 10,
                "maximum": 100
            },
            "range-selector-plot-fill-color": {
                "title": "Plot Fill Color",
                "type": "string",
                "default": "#A7B1C4",
                "format": "color",
                "description": "The slider mini plot fill color.",
                "validationMessage": "Invalid Color"
            },
            "range-selector-plot-fill-gradient-color": {
                "title": "Plot Fill Gradient Color",
                "type": "string",
                "default": "#FFFFFF",
                "format": "color",
                "description": "The top color for the slider mini plot fill color gradient.",
                "validationMessage": "Invalid Color"
            },
            "range-selector-plot-line-width": {
                "title": "Plot Line Width",
                "type": "number",
                "default": 1.5,
                "description": "The width of the slider mini plot line."
            },
            "range-selector-plot-stroke-color": {
                "title": "Plot Stroke Color",
                "type": "string",
                "default": "#808FAB",
                "format": "color",
                "description": "The slider mini plot stroke color.",
                "validationMessage": "Invalid Color"
            },
            "x1-draw-grid": {
                "title": "Draw X-axis Grid Lines",
                "type": "string",
                "default": "true",
                "description": ""
            },
            "y-draw-grid": {
                "title": "Draw Y-axis Grid Lines",
                "type": "string",
                "default": "true",
                "description": ""
            },
            "y2-draw-grid": {
                "title": "Draw Y2-axis Grid Lines",
                "type": "string",
                "default": "false",
                "description": ""
            },
            "x1-grid-line-color": {
                "title": "X-axis Grid Line Color",
                "type": "string",
                "default": "#000000",
                "format": "color",
                "description": "",
                "validationMessage": "Invalid Color"
            },
            "y-grid-line-color": {
                "title": "Y-axis Grid Line Color",
                "type": "string",
                "default": "#000000",
                "format": "color",
                "description": "",
                "validationMessage": "Invalid Color"
            },
            "y2-grid-line-color": {
                "title": "Y2-axis Grid Line Color",
                "type": "string",
                "default": "#000000",
                "format": "color",
                "description": "",
                "validationMessage": "Invalid Color"
            },
            "x1-grid-line-width": {
                "title": "X-axis Grid Line Width",
                "type": "number",
                "default": 1,
                "description": "Pixel thickness of the x-axis line.",
                "minimum": 1,
                "maximum": 30
            },
            "y-grid-line-width": {
                "title": "Y-axis Grid Line Width",
                "type": "number",
                "default": 1,
                "description": "Pixel thickness of the y-axis line.",
                "minimum": 1,
                "maximum": 30
            },
            "y2-grid-line-width": {
                "title": "Y2-axis Grid Line Width",
                "type": "number",
                "default": 1,
                "description": "Pixel thickness of the y2-axis line.",
                "minimum": 1,
                "maximum": 30
            },
            "independent-ticks": {
                "title": "Y Axes Alignment",
                "type": "string",
                "default": "independent",
                "description": "This option defines whether the y axes should align their ticks or if they should be independent.",
                "placeholder": " "
            },
            "data": {
                "title": "Data",
                "type": "string",
                "description": "Data series in case of static data.",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "[[\"2009-12-31T22:00:00.000Z\",1,99,1039600.0000000001,1960400],[\"2010-01-01T22:00:00.000Z\",2,98,1078400,1921600]]"
                }
            },
            "x1-axis-label": {
                "title": "X-axis Label",
                "type": "string",
                "default": "",
                "description": "",
                "maxLength": 40
            },
            "y-axis-label": {
                "title": "Y-axis Label",
                "type": "string",
                "default": "",
                "description": "",
                "maxLength": 40
            },
            "y2-axis-label": {
                "title": "Y2-axis Label",
                "type": "string",
                "default": "",
                "description": "",
                "maxLength": 40
            },
            "calculate-function": {
                "title": "Function",
                "type": "string",
                "description": "Function takes the X data element and generate the Y[s] data array/value as functional relation, the function must return single value or array of values.",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "function(x){ return [2*x , x*x ];}"
                }
            },
            "use-functional": {
                "title": "Use Function to generate static data?",
                "type": "boolean",
                "default": "",
                "description": "",
            },
            "functional-data-type": {
                "title": "Function X Data Type",
                "type": "string",
                "default": "scattered",
                "description": "The X data Array type can be scattered values or desicrete range",
            },
            "scattered-xdata": {
                "title": "Scattered Data array",
                "type": "string",
                "default": "",
                "description": "The X data array, Ex [2,4,10,11].",
            },
            "range-min": {
                "title": "X data range min value",
                "type": "string",
                "default": "",
                "description": "",
            },
            "range-max": {
                "title": "X data range max value",
                "type": "string",
                "default": "",
                "description": "",
            },
            "range-step": {
                "title": "X data range step",
                "type": "string",
                "default": "",
                "description": "",
            },
        }
    }
};