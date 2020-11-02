const __HEATMAP__ = {
    "name": "heatmap",
    "label": "Heatmap",
    "class": "scriptr-heatmap",
    "commonData": true,
    "defaults": {
        "data-format": "heatmap",
        "multiple-data-points": "true",
        "data-type": "raw",
        "show-numbers":true,
        /*"layout-config-form": {
            "title":"The default of the graph",
            "margin":{
                "l":140,
                "r":40,
                "b":50,
                "t":80
            },
            "xaxis":{
                "showline": false,
                "title":"The title of xaxis",
                "ticks":"outside",
                "dtick": 0,
                "tickcolor":'rgb(102, 102, 102)',
                "side":"bottom"
            },
            "yaxis":{
                "showline": false,
                "title":"The title of yaxis",
                "ticks":"outside",
                "dtick": 0,
                "tickcolor":'rgb(102, 102, 102)',
                "side":"left"
            }
        },*/
        "options" :{
            "displayModeBar": false,
            "modeBarButtonsToRemove":[], 
            "displaylogo": false,
            "modeBarButtonsToRemoveWrapper": {
                "toImage": true,
                "hoverClosestCartesian": true,
                "toggleSpikelines": true,
                "pan2d": true,
                "zoom2d": true,
                "resetScale2d":true,
                "select2d":true,
                "lasso2d":true,
                "hoverCompareCartesian":true,
                "autoScale2d":true,
                "zoomOut2d":true,
                "zoomIn2d":true
            },
            "scrollZoom":false,
            "editable":false,
            "staticPlot":false
        },
        /*"traces-config-form": { 
            "showscale" : true,
            "colorscale" : [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']],
            "colorScaleWrapper": [{"priority":0,"color":"#c64dff"},{"priority":1,"color":"#1dbc68"}],
            "colorbar" :  {
                "outlinecolor":"#E2E913",
                "bgcolor" :"rgba(0,0,0,0)",
                "ticks":'outside',
                "tickcolor":'#C8CE1B',
                "showticklabels" : true,
                "title":{
                    "text":'',
                    "font":{
                        "family":'Times New Roman',
                        "size":15,
                        "color":'#C8CE1B'
                    },
                    "side":"top"
                },
            },
            "hoverinfo":"x+y+z",
            "hoverongaps" : false,
            "hoverlabel" : {
                "bgcolor":'#C8CE1B'
            },
        },*/
        "schema-for": "heatmap",
        "type": "heatmap",
        "data-format": "heatmap",
        "on-format-data": "return data;",
        "boxLabel": "Heatmap",
        "data": '{"x": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "y": ["Morning", "Afternoon", "Evening"], "z":[[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]]}'
    },
    "box": {
        sizeX: 5,
        sizeY: 8,
        minSizeX: 4,
        minSizeY: 4
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/heatMap.svg",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Traces",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": [
                                    {
                                        type: "radios-inline",
                                        key: "legend-type",
                                        onChange: __onRadioButtonChangeForTraces__,
                                        titleMap: [{
                                            value: "form",
                                            name: "form"
                                        }, {
                                            value: "json",
                                            name: "json"
                                        }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "",
                        "condition": "model['legend-type'] =='json'",
                        "items": [{
                            "type": "textarea",
                            "title": "Traces Configuration",
                            "key":"json-config",
                            onChange: __onRadioButtonChangeForTraces__,
                        }
                                 ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "",
                        "condition": "model['legend-type'] =='form'",
                        "items": [
                            {
                                "key": "traces-config-form",
                                "title": "Color scale",
                                "htmlClass": "",
                                "items": [{
                                    "type": "section",
                                    "htmlClass": "",
                                    "items": [ {
                                        "type": "section",
                                        "htmlClass": "",
                                        "items": [
                                            {
                                                "key": "traces-config-form.colorScaleWrapper",
                                                "htmlClass": "",
                                                "items": [{
                                                    "type": "section",
                                                    "htmlClass": "row",
                                                    "items": [
                                                        {
                                                            "type": "section",
                                                            "htmlClass": "col-xs-6 ",
                                                            "items": [{
                                                                "key": "traces-config-form.colorScaleWrapper[].priority",
                                                                onChange: __onRadioButtonChangeForTraces__,
                                                            }]
                                                        },
                                                        {
                                                            "type": "section",
                                                            "htmlClass": "col-xs-6 ",
                                                            "items": [{
                                                                "key": "traces-config-form.colorScaleWrapper[].color",
                                                                onChange: __onRadioButtonChangeForTraces__,
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
                                                    ]
                                                }
                                                         ]
                                            },

                                            {
                                                "type": "section",
                                                "htmlClass": "row",
                                                "items": [
                                                    {
                                                        "key":"traces-config-form.hoverlabel",
                                                        "htmlClass": "col-xs-12",
                                                        "title":"Hover Configuration",
                                                        "items":[
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-4",
                                                                "items": [{"key":"traces-config-form.hoverlabel.bgcolor","onChange":__onRadioButtonChangeForTraces__}]
                                                            },
                                                            {
                                                                "key":"traces-config-form.hoverinfo",
                                                                "onChange":__onRadioButtonChangeForTraces__,
                                                                "htmlClass": "col-xs-4",
                                                                "type": 'strapselect',
                                                                "titleMap": [{
                                                                    "value": "all",
                                                                    "name": "all"
                                                                }, {
                                                                    "value": "none",
                                                                    "name": "none"
                                                                },
                                                                             {
                                                                                 "value": "skip",
                                                                                 "name": "skip"
                                                                             },
                                                                             {
                                                                                 "value": "x",
                                                                                 "name": "x"
                                                                             },
                                                                             {
                                                                                 "value": "x+y",
                                                                                 "name": "x+y"
                                                                             },
                                                                             {
                                                                                 "value": "x+y+z",
                                                                                 "name": "x+y+z"
                                                                             },
                                                                             {
                                                                                 "value": "y+z",
                                                                                 "name": "y+z"
                                                                             },
                                                                             {
                                                                                 "value": "z",
                                                                                 "name": "z"
                                                                             },
                                                                             {
                                                                                 "value": "y",
                                                                                 "name": "y"
                                                                             },
                                                                             {
                                                                                 "value": "x+z",
                                                                                 "name": "x+z"
                                                                             }
                                                                            ]
                                                            },
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-4",
                                                                "items": [{"key":"traces-config-form.hoverongaps","onChange":__onRadioButtonChangeForTraces__}]
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "row",
                                                "items": [
                                                    {
                                                        "key":"traces-config-form.colorbar",
                                                        "htmlClass": "col-xs-12",
                                                        "title":"Bar Configuration",
                                                        "items":[
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-4",
                                                                "items": [{"key":"traces-config-form.showscale","onChange":__onRadioButtonChangeForTraces__}]
                                                            },
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-4",
                                                                "items": [{"key":"traces-config-form.colorbar.thickness","onChange":__onRadioButtonChangeForTraces__}],
                                                                "condition":"model['traces-config-form']['showscale']"
                                                            },
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-4",
                                                                "condition":"model['traces-config-form']['showscale']",
                                                                "items": [{"key":"traces-config-form.colorbar.tickcolor","onChange":__onRadioButtonChangeForTraces__}]
                                                            },
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-4",
                                                                "condition":"model['traces-config-form']['showscale']",
                                                                "items": [{"key":"traces-config-form.colorbar.title.text","onChange":__onRadioButtonChangeForTraces__}]
                                                            },
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-4",
                                                                "condition":"model['traces-config-form']['showscale']",
                                                                "items":[
                                                                    {
                                                                        "key":"traces-config-form.colorbar.ticks",
                                                                        "onChange":__onRadioButtonChangeForTraces__,
                                                                        "type": 'strapselect',
                                                                        "titleMap": [
                                                                            {
                                                                                "value": "outside",
                                                                                "name": "outide"
                                                                            }, {
                                                                                "value": "inside",
                                                                                "name": "inside"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-4",
                                                                "condition":"model['traces-config-form']['showscale']",
                                                                "items":[
                                                                    {
                                                                        "key":"traces-config-form.colorbar.title.side",
                                                                        "onChange":__onRadioButtonChangeForTraces__,
                                                                        "type": 'strapselect',
                                                                        "titleMap": [{
                                                                            "value": "top",
                                                                            "name": "top"
                                                                        }, {
                                                                            "value": "bottom",
                                                                            "name": "bottom"
                                                                        },
                                                                                     {
                                                                                         "value": "left",
                                                                                         "name": "left"
                                                                                     },
                                                                                     {
                                                                                         "value": "right",
                                                                                         "name": "right"
                                                                                     }
                                                                                    ]
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                             ]
                                }
                                         ]
                            }
                        ]
                    }
                ]
            },
            {
                title: "Layout",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": [
                                    {
                                        type: "radios-inline",
                                        key: "legend-type",
                                        onChange: __onRadioButtonChangeForLayout__,
                                        titleMap: [{
                                            value: "form",
                                            name: "form"
                                        }, {
                                            value: "json",
                                            name: "json"
                                        }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "",
                        "condition": "model['legend-type'] =='json'",
                        "items": [{
                            "type": "textarea",
                            "title": "Layout Configuration",
                            "key":"json-config",
                            onChange: __onRadioButtonChangeForLayout__,
                        }
                                 ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "",
                        "condition": "model['legend-type'] =='form'",
                        "key":"layout-config-form",
                        "onChange": __onRadioButtonChangeForLayout__,
                        "items": [
                            {

                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    { "type": "section",
                                     "htmlClass": "col-xs-12 col-sm-3",
                                     "items":["show-numbers"]
                                    },
                                    { "type": "section",
                                     "htmlClass": "col-xs-12 col-sm-6",
                                     "items":[{"key":"layout-config-form.title","onChange":__onRadioButtonChangeForLayout__}]
                                    },
                                    { "type": "section",
                                     "htmlClass": "col-xs-12 col-sm-3",
                                    }
                                ]
                            },

                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "key":"layout-config-form",
                                        "htmlClass": "col-xs-12",
                                        "title":"Xaxis Properties",
                                        "items": [
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": [{"key":"layout-config-form.xaxis.title","onChange":__onRadioButtonChangeForLayout__}]

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-2",
                                                "items": [{"key":"layout-config-form.xaxis.tickcolor","onChange":__onRadioButtonChangeForLayout__}]

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-2",
                                                "items": [
                                                    {
                                                        "key":"layout-config-form.xaxis.ticks",
                                                        "onChange":__onRadioButtonChangeForLayout__,
                                                        "type": 'strapselect',
                                                        "titleMap": [{
                                                            "value": "outside",
                                                            "name": "outide"
                                                        }, {
                                                            "value": "inside",
                                                            "name": "inside"
                                                        }
                                                                    ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-2",
                                                "items": [
                                                    {
                                                        "key":"layout-config-form.xaxis.side",
                                                        "onChange":__onRadioButtonChangeForLayout__,
                                                        "type": 'strapselect',
                                                        "titleMap": [{
                                                            "value": "top",
                                                            "name": "top"
                                                        }, {
                                                            "value": "bottom",
                                                            "name": "bottom"
                                                        }
                                                                    ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-2",
                                                "items": [{"key":"layout-config-form.xaxis.dtick","onChange":__onRadioButtonChangeForLayout__}]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "key":"layout-config-form",
                                        "htmlClass": "col-xs-12",
                                        "title":"Yaxis Properties",
                                        "items":[

                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": [{"key":"layout-config-form.yaxis.title","onChange":__onRadioButtonChangeForLayout__}]

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-2",
                                                "items": [{"key":"layout-config-form.yaxis.tickcolor","onChange":__onRadioButtonChangeForLayout__}]

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-2",
                                                "items": [
                                                    {
                                                        "key":"layout-config-form.yaxis.ticks",
                                                        "onChange":__onRadioButtonChangeForLayout__,
                                                        "type": 'strapselect',
                                                        "titleMap": [{
                                                            "value": "outside",
                                                            "name": "outide"
                                                        }, {
                                                            "value": "inside",
                                                            "name": "inside"
                                                        }
                                                                    ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-2",
                                                "items": [
                                                    {
                                                        "key":"layout-config-form.yaxis.side",
                                                        "onChange":__onRadioButtonChangeForLayout__,
                                                        "type": 'strapselect',
                                                        "titleMap": [{
                                                            "value": "right",
                                                            "name": "right"
                                                        }, {
                                                            "value": "left",
                                                            "name": "left"
                                                        }
                                                                    ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-2",
                                                "items": [{"key":"layout-config-form.yaxis.dtick","onChange":__onRadioButtonChangeForLayout__}]

                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items":[
                                    {
                                        "key":"layout-config-form",
                                        "htmlClass": "col-xs-12",
                                        "title":"Margins",
                                        "items": [
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": [{"key":"layout-config-form.margin.l","onChange":__onRadioButtonChangeForLayout__}]

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": [{"key":"layout-config-form.margin.r","onChange":__onRadioButtonChangeForLayout__}]

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": [{"key":"layout-config-form.margin.t","onChange":__onRadioButtonChangeForLayout__}]

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": [{"key":"layout-config-form.margin.b","onChange":__onRadioButtonChangeForLayout__}]

                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    }
                ]
            },
            {
                title: "Options",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12 col-sm-6",
                                "key":"options",
                                "items": [
                                    {
                                        "key":"options.displayModeBar"
                                    },
                                    {
                                        "key": "options.displaylogo",
                                        "condition": "model.options['displayModeBar']"
                                    },
                                    {
                                        "key": "options.staticPlot",
                                    },
                                    {
                                        "key": "options.editable",
                                    },
                                    {
                                        "key": "options.scrollZoom",
                                    }

                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "key":"options",
                                "items": [
                                    { 
                                        "key": "options.modeBarButtonsToRemoveWrapper",
                                        "condition":"model.options['displayModeBar']",
                                        "items": [
                                            {
                                                key:"options.modeBarButtonsToRemoveWrapper.toImage",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.hoverClosestCartesian",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.toggleSpikelines",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.zoom2d",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.pan2d",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.resetScale2d",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.select2d",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.lasso2d",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.hoverCompareCartesian",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.autoScale2d",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.zoomOut2d",
                                                onChange: __onModeBarButtonChange__
                                            },{
                                                key:"options.modeBarButtonsToRemoveWrapper.zoomIn2d",
                                                onChange: __onModeBarButtonChange__
                                            },

                                        ]

                                    }

                                ]
                            },
                        ]
                    },

                ]
            }

        ]
    }
            ],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "data": {
                "title": "Data",
                "type": "string",
                "description": " data of the heatmap",
                "codemirrorOptions": {
                    "placeholder": '{"x": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "y": ["Morning", "Afternoon", "Evening"], "z":[[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]]}'
                }
            },
            "show-numbers": {
                "title": "Show Numbers",
                "type": "boolean",
                "default": "true",
                "description": "Set visibility of the numbers."
            },
            "traces-config-form": {
                "title": "Traces Configuration",
                "type": "object",
                "properties": {
                    "colorScaleWrapper": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "priority": {
                                    "title": "Priority",
                                    "type": "number",
                                    "minimum":0,
                                    "maximum":1
                                },
                                "color": {
                                    "title": "Color",
                                    "type": "string",
                                    "format": "color",
                                }
                            }
                        }
                    },
                    "colorbar":{
                        "type":"object",
                        "properties":{
                            "thickness":{
                                "title":"Thickness",
                                "type":"number",
                                "description":"Thickness of the bar",
                              //  "default":20
                            },
                            "ticks":{
                                "title":"Ticks",
                                "type":"string",
                                "description":"Ticks Position of the bar ",
                              //  "default":"outside"
                            },
                            "tickcolor":{
                                "title":"Tick Color",
                                "type":"string",
                                "format": "color",
                                "description":"Ticks Color of the bar ",
                            //    "default":"#C8CE1B"
                            },
                            "title":{
                                "title":"Title",
                                "type":"object",
                                "description":"",
                                "properties":{
                                    "text":{
                                        "title":"Title",
                                        "type":"string",
                                        "description":"Bar Title",
                                    },
                                    "side":{
                                        "title":"Title's position",
                                        "type":"string",
                                        "description":"Determines the location of color bar's title with respect to the color bar",
                                    },
                                }
                            }
                        }
                    },
                    "colorscale": {
                        "title": "Color Scale",
                        "type": "string",
                        "description": "Array of colors and order, Ex [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']] . ",
                        "placeholder": "[[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']]"
                    },
                    "hoverlabel":{
                        "type":"object",
                        "properties":{
                            "bgcolor":{
                                "title": "Background Color",
                                "type": "string",
                                "format": "color",
                              //  "default": "#C8CE1B"
                            }
                        }
                    },
                    "hoverinfo":{
                        "title": "Hover Info ",
                        "type": "string",
                        "description" : "Determines what information appear on hover",
                       // "default": "true"
                    },
                    "hoverongaps":{
                        "title": "hoverongaps",
                        "type": "boolean",
                        "description" : "Determines whether or not gaps are shown or hover"
                    },
                    "showscale":{
                        "title": "showscale",
                        "type": "boolean",
                        "description" : "Show Bar"
                    }
                }
            },
            "layout-config-form":{
                "type":"object",
                "properties":{
                    "title":{
                        "title":"Title",
                        "type":"string",
                        "description":"Title shown above the chart",
                    },
                    "margin":{
                        "title":"Margin",
                        "type":"object",
                        "description":"",
                        "properties":{
                            "l":{
                                "title":"Left Margin",
                                "type":"number"
                            },
                            "r":{
                                "title":"Right Margin",
                                "type":"number"
                            },
                            "t":{
                                "title":"Top Margin",
                                "type":"number"
                            },
                            "b":{
                                "title":"Bottom Margin",
                                "type":"number"
                            }
                        }
                    },
                    "xaxis":{
                        "title":"Xaxis",
                        "type":"object",
                        "properties":{
                            "title":{
                                "title":"Title of Xaxis",
                                "type":"string"
                            },
                            "ticks":{
                                "tilte":"Ticks",
                                "description":"Determines the position of the ticks on the xaxis",
                                "type":"string"
                            },
                            "dtick":{
                                "tilte":"Distance between ticks",
                                "description":"Sets the step in-between ticks on this axis",
                                "type":"number"
                            },
                            "tickcolor":{
                                "title": "Tick Color",
                                "type": "string",
                                "format": "color",
                             //   "default": "#CC5464"
                            },
                            "side":{
                                "tilte":"Side",
                                "description":"The position of the x-axis points",
                                "type":"string"
                            },

                        }
                    },
                    "yaxis":{
                        "title":"Xaxis",
                        "type":"object",
                        "properties":{
                            "title":{
                                "title":"Title of Yaxis",
                                "type":"string"
                            },
                            "ticks":{
                                "tilte":"Ticks",
                                "description":"Determines the position of the ticks on the yaxis",
                                "type":"string"
                            },
                            "dtick":{
                                "tilte":"Distance between ticks ",
                                "description":"Sets the step in-between ticks on this axis",
                                "type":"number"
                            },
                            "tickcolor":{
                                "title": "Tick Color",
                                "type": "string",
                                "format": "color",
                              //  "default": "#CC5464"
                            },
                            "side":{
                                "tilte":"Side",
                                "description":"The position of the y-axis points",
                                "type":"string"
                            },
                        }
                    }
                }
            },
            "data-format": {
                "type": "hidden",
            },
            "options":{
                "type":"object",
                "properties":{
                    "displayModeBar":{
                        "title": "Show Mode Bar",
                        "type": "boolean",
                        "default": "false",
                        "description": "Mode Bar is the set of functional icons shown at the top of the chart.",
                    },
                    "modeBarButtonsToRemove":{
                        "title":"Mode Bar Buttons To Remove",
                        "type":"array",
                        "default": [],
                        "items": {
                            "type": "string",
                        }
                    },
                    "displaylogo":{
                        "title": "Display Plotly Logo",
                        "type":"boolean",
                        "description":"Display Plotly Logo on the Modebar",
                    },
                    "staticPlot":{
                        "title": "Static Plot",
                        "type":"boolean",
                        "description":"Making a Static Chart",
                    },
                    "scrollZoom":{
                        "title": "Scroll Zoom",
                        "type":"boolean",
                        "description":"Mousewheel or two-finger scroll zooms the plot",
                    },
                    "editable":{
                        "title": "Editable Mode",
                        "type":"boolean",
                        "description":"Edit the chart title, axis labels and trace names in the legend.",
                    },
                    "modeBarButtonsToRemoveWrapper":{
                        "title": "Buttons To show on the mode bar",
                        "type": "object",
                        //"default": {},
                        "properties": {
                            "toImage": {
                                "title": "To Image",
                                "type": "boolean",
                            },
                            "hoverClosestCartesian": {
                                "title": "Hover Closest Cartesian",
                                "type": "boolean",
                            },
                            "toggleSpikelines": {
                                "title": "Toggle Spike Lines",
                                "type": "boolean",
                            },
                            "resetScale2d": {
                                "title": "Reset Scale 2d",
                                "type": "boolean",
                            },
                            "pan2d": {
                                "title": "Pan 2d",
                                "type": "boolean",
                            },
                            "zoom2d": {
                                "title": "Zoom 2d",
                                "type": "boolean",

                            },
                            "select2d": {
                                "title": "Select 2d",
                                "type": "boolean",

                            },
                            "lasso2d": {
                                "title": "Lasso 2d",
                                "type": "boolean",

                            },
                            "hoverCompareCartesian": {
                                "title": "Hover Compare Cartesian",
                                "type": "boolean",

                            },
                            "autoScale2d": {
                                "title": "Auto Scale 2d",
                                "type": "boolean",

                            },
                            "zoomOut2d": {
                                "title": "zoomOut 2d",
                                "type": "boolean",

                            },
                            "zoomIn2d": {
                                "title": "zoomIn 2d",
                                "type": "boolean",

                            },
                        },
                    }
                }
            },
            'json-config': {
                'title': 'Json Configuration',
                'type': 'string',
                'x-schema-form': {
                    'type': 'textarea',
                },
            },
            "layout-config": {
                "type": "hidden",
            },
            "legend-type": {
                "title": "Legend type",
                "type": "string",
            },
            "traces-config": {
                "type": "hidden",
            },
            "multiple-data-points": {
                "type": "hidden",
               // "default": "true"
            }

        },
        "required": []
    }
};