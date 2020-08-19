const __HEATMAP__ = {
    "name": "heatmap",
    "label": "Heatmap",
    "class": "scriptr-heatmap",
    "commonData": true,
    //"show": true,
    "defaults": {
        "title":"The title of the heatmap",
        "data-format": "heatmap",
        "multiple-data-points": "true",
        "data-type": "raw",
        "color-scale": [[0,"#c64dff"],[1,"#1dbc68"]],
        "mode-bar-buttons-to-remove-wrapper": {
            "toImage": true,
            "tableRotation": true,
            "orbitRotation": true,
            "resetCameraDefault3d": true,
            "resetCameraLastSave3d": true,
            "hoverClosest3d": true,
            "pan3d": true,
            "zoom3d": true
        },
        "color-bar-config" : {
            "thickness":20,
            "ticks":"outside",
            "tickcolor":'#C8CE1B',
            "title":{
                "text":"heatmap",
                "side":"top"
            }
        },
        "hoverinfo":"x+y+z",
        "hoverongaps":false,
        "hoverlabel":{
            "bgcolor":'#C8CE1B',
        },
        "layout-config": {
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
        },
        "show-bar": false,
        "show-mode-bar":false,
        "displaylogo":false,
        "schema-for": "heatmap",
        "color-scale-wrapper": [{"priority":0,"color":"#c64dff"},{"priority":1,"color":"#1dbc68"}],
        "color-scale": [[0,"#c64dff"],[1,"#1dbc68"]],
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
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/wind-rose.svg",
    "form": [{
        type: "tabs",
        tabs: [
            {
                              
                    title: "Format",
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
                                            "key": "color-scale-wrapper",
                                            "title": "Color scale",
                                            "items": [{
                                                "type": "section",
                                                "htmlClass": "row",
                                                "items": [
                                                    {
                                                        "type": "section",
                                                        "htmlClass": "col-xs-6 ",
                                                        "items": [{
                                                            "key": "color-scale-wrapper[].priority",
                                                            onChange: __onColorScaleChange__,
                                                        }]
                                                    },
                                                    {
                                                        "type": "section",
                                                        "htmlClass": "col-xs-6 ",
                                                        "items": [{
                                                            "key": "color-scale-wrapper[].color",
                                                            onChange: __onColorScaleChange__,
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
                                            }]
                                        }

                                    ]
                                }
                                ]
                        },
                        
                        
                                {"type": "section",
                                 "htmlClass": "row",
                                 "items": [
                                     {
                                     "key":"hoverlabel",
                                    "htmlClass": "col-xs-12",
                                         
                                    "title":"Hover Configuration",
                                    "items":[
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-4",
                                            "items": ["hoverlabel.bgcolor"]

                                        }
                                        ]
                                     }
                                     ]
                                },
                                        {
                                         "type": "section",
                                         "htmlClass": "row",
                                        // "items": ["hover-config.hoverinfo"]
                                            "items":[
                                                {
                                                           
                                                    "key":"hoverinfo",
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
                                                    "items": ["hoverongaps"]

                                                }
                                            ]
                                            
                                             },
                                        //
                        

                         {"type": "section",
                                 "htmlClass": "row",
                                 "items": [
                                     {
                                     "key":"color-bar-config",
                                    "htmlClass": "col-xs-12",
                                    "title":"Bar Configuration",
                                    "items":[
                                        {
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [
                                                {
                                                    "key":"show-bar",
                                                    "htmlClass": "col-xs-12",
                                                    "title":"Show Bar"
                                                }
                                            ]
                                        },

                                        
                                        
                                     {
                                         "type": "section",
                                         "htmlClass": "col-xs-4",
                                         "items": ["color-bar-config.thickness"]
                                            
                                             },
                                        {
                                         "type": "section",
                                         "htmlClass": "col-xs-4",
                                            "items":[
                                                  {
                                            "key":"color-bar-config.ticks",
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
                                         "items": ["color-bar-config.tickcolor"]
                                            
                                             },
                                         {
                                         "type": "section",
                                         "htmlClass": "col-xs-4",
                                         "items": ["color-bar-config.title.text"]
                                            
                                             },
                                        
                                         {
                                         "type": "section",
                                         "htmlClass": "col-xs-4",
                                         "items":[
                                                  {
                                            "key":"color-bar-config.title.side",
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
                                     }
                                 ]
                         },
                    ]
            },
                        {
                            title: "Layout",
                            items: [
                                {
                                    "type": "section",
                                    "items": [
                                        {

                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [
                                                { "type": "section",
                                                 "htmlClass": "col-xs-12 col-sm-3",
                                                },
                                                { "type": "section",
                                                 "htmlClass": "col-xs-12 col-sm-6",
                                                 "items":["layout-config.title"]
                                                },
                                                { "type": "section",
                                                 "htmlClass": "col-xs-12 col-sm-3",
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
                                                    "key":"layout-config",
                                                    "htmlClass": "col-xs-12",
                                                    "title":"Xaxis Properties",
                                                    "items": [
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-2",
                                                            "items": ["layout-config.xaxis.title"]

                                                        },
                                                          {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-2",
                                                            "items": ["layout-config.xaxis.tickcolor"]

                                                        },
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-2",
                                                            "items": [
                                                                {
                                                                "key":"layout-config.xaxis.ticks",
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
                                                                    "key":"layout-config.xaxis.side",
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
                                                            "items": ["layout-config.xaxis.dtick"]
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
                                                "key":"layout-config",
                                                "htmlClass": "col-xs-12",
                                                "title":"Yaxis Properties",
                                                "items":[

                                                {
                                                    "type":"section",
                                                    "htmlClass": "col-xs-12 col-sm-2",
                                                    "items": ["layout-config.yaxis.title"]

                                                },
                                                  {
                                                    "type":"section",
                                                    "htmlClass": "col-xs-12 col-sm-2",
                                                    "items": ["layout-config.yaxis.tickcolor"]

                                                },
                                                {
                                                    "type":"section",
                                                    "htmlClass": "col-xs-12 col-sm-2",
                                                    "items": [
                                                        {
                                                        "key":"layout-config.yaxis.ticks",
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
                                                        "key":"layout-config.yaxis.side",
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
                                                    "items": ["layout-config.yaxis.dtick"]

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
                                                    "key":"layout-config",
                                                    "htmlClass": "col-xs-12",
                                                    "title":"Margins",
                                                    "items": [
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-3",
                                                            "items": ["layout-config.margin.l"]

                                                        },
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-3",
                                                            "items": [ "layout-config.margin.r"]

                                                        },
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-3",
                                                            "items": ["layout-config.margin.t"]

                                                        },
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-3",
                                                            "items": ["layout-config.margin.b"]

                                                        }
                                                    ]
                                                }
                                            ]
                                        }

                        ]
            },
            {
                title: "Legend",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [
                                {
                                    key: "show-legend"
                                },
                                {
                                    type: "radios-inline",
                                    key: "legend-type",
                                    condition: "model['show-legend'] == true",
                                    titleMap: [{
                                        value: "hover",
                                        name: "Hover"
                                    }, {
                                        value: "right",
                                        name: "Right"
                                    }]
                                },
                                {
                                    type: "radios-inline",
                                    key: "hide-hover",
                                    condition: "model['show-legend'] ==true && model['legend-type'] =='hover'",
                                    titleMap: [{
                                        value: "auto",
                                        name: "Auto"
                                    }, {
                                        value: "false",
                                        name: "Always"
                                    }]
                                },
                                /** {
                                    key :"legend-date-moment-format",
                                    condition: "model['show-legend'] == true && model['legend-type'] =='right' && model['parse-time'] == true"
                                }**/
                            ]
                        }
                    ]
                }]
            },
            {
                title: "Mode Bar",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12 col-sm-6",
                                "items": [
                                    {
                                        "key": "show-mode-bar"
                                    },
                                    {
                                        "key": "displaylogo",
                                        "condition": "model['show-mode-bar']"
                                    }

                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12 col-sm-6",
                                "items": [
                                    {
                                        "key": "mode-bar-buttons-to-remove-wrapper",
                                        "condition": "model['show-mode-bar']",
                                        "items": [
                                            {
                                                key:"mode-bar-buttons-to-remove-wrapper.toImage",
                                                onChange: __onModeBarButtonsChange__
                                            },{
                                                key:"mode-bar-buttons-to-remove-wrapper.tableRotation",
                                                onChange: __onModeBarButtonsChange__
                                            },{
                                                key:"mode-bar-buttons-to-remove-wrapper.orbitRotation",
                                                onChange: __onModeBarButtonsChange__
                                            },{
                                                key:"mode-bar-buttons-to-remove-wrapper.resetCameraDefault3d",
                                                onChange: __onModeBarButtonsChange__
                                            },{
                                                key:"mode-bar-buttons-to-remove-wrapper.resetCameraLastSave3d",
                                                onChange: __onModeBarButtonsChange__
                                            },{
                                                key:"mode-bar-buttons-to-remove-wrapper.hoverClosest3d",
                                                onChange: __onModeBarButtonsChange__
                                            },{
                                                key:"mode-bar-buttons-to-remove-wrapper.pan3d",
                                                onChange: __onModeBarButtonsChange__
                                            },{
                                                key:"mode-bar-buttons-to-remove-wrapper.zoom3d",
                                                onChange: __onModeBarButtonsChange__
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
            "title": {
                "title": "Title",
                "type": "string",
                "description": "Title shown above the chart",
                "placeholder": " "
            },
            "font-size": {
                "title": "Font Size",
                "type": "number",
                "default": 16,
                "description": "Set the font size of the wind rose (in px)."
            },
            "show-legend": {
                "title": "Show Legend",
                "type": "boolean",
                "default": "true",
                "description": "Set visibility of the legend."
            },
                 "show-bar": {
                "title": "Show Bar",
                "type": "boolean",
                "description": "",
                "placeholder": " "
            },
             "color-scale": {
                "title": "Color Scale",
                "type": "string",
                "description": "Array of colors and order, Ex [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']] . ",
                "placeholder": "[[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']]"
            }, "color-scale-wrapper": {
                "type": "array",
                "default": [],
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
                        "layout-config":{
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
                                "default": "#CC5464"
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
                                "default": "#CC5464"
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
             "color-bar-config":{
                "type":"object",
                "properties":{
                    "thickness":{
                        "title":"Thickness",
                        "type":"number",
                        "description":"Thickness of the bar",
                        "default":20
                    },
                    "ticks":{
                        "title":"Ticks",
                        "type":"string",
                        "description":"Ticks Position of the bar ",
                        "default":"outside"
                    },
                    "tickcolor":{
                        "title":"Tick Color",
                        "type":"string",
                         "format": "color",
                        "description":"Ticks Color of the bar ",
                        "default":"#C8CE1B"
                    },
                    "title":{
                        "title":"Title",
                        "type":"object",
                        "description":"",
                        "properties":{
                            "Text":{
                                "title":"The title of the bar",
                                "type":"string"
                            },
                            "Side":{
                                "title":"Determines the location of color bar's title with respect to the color bar",
                                "type":"string",
                                "description":"Ticks Position of the bar ",
                                "default":"outside"
                            },
                        }
                    }
                }
             },
            "data-format": {
                "type": "hidden",
                "default": "windrose"
            },
            "legend-type": {
                "title": "Legend type",
                "type": "string",
                "default": "hover",
            },
            "hide-hover": {
                "title": "Hover style",
                "default": "auto",
                "type": "string",
                "description": "Set to 'Always' to always show a hover legend. Set to 'Auto' to only show the hover legend when the mouse cursor is over the chart."
            },
            "hover-callback": {
                "title": "Hover callback",
                "type": "string",
                "description": "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
            },
            "show-mode-bar": {
                "title": "Show Mode Bar",
                "type": "boolean",
                "description": "Mode Bar is the set of functional icons shown at the top of the chart.",
                "placeholder": ""
            },
            "hoverlabel":{
                "type":"object",
                "description":"Sets the configuration of the hover labels for this trace",
                "properties":{
                    "bgcolor":{
                        "title": "Background Color",
                        "type": "string",
                        "format": "color",
                        "default": "#C8CE1B"
                    }
                }
            },
            "hoverinfo":{
                "title": "Hover Info ",
                "type": "string",
                "description" : "Determines what information appear on hover",
                "default": "true"
            },
            "hoverongaps":{
                "title": "hoverongaps",
                "type": "boolean",
                "description" : "Determines whether or not gaps are shown or hover"
            },
            "displaylogo": {
                "title": "Display Plotly Logo",
                "type": "boolean",
                "description": "",
                "placeholder": " "
            }, "mode-bar-buttons-to-remove": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "string",
                }
            }, "mode-bar-buttons-to-remove-wrapper": {
                "title": "Buttons To show on the mode bar",
                "type": "object",
                "default": {},
                "properties": {
                    "toImage": {
                        "title": "To Image",
                        "type": "boolean",
                    },
                    "tableRotation": {
                        "title": "Table Rotation",
                        "type": "boolean",
                    },
                    "orbitRotation": {
                        "title": "Orbit Rotation",
                        "type": "boolean",
                    },
                    "resetCameraDefault3d": {
                        "title": "Reset Camera Default 3d",
                        "type": "boolean",
                    },
                    "resetCameraLastSave3d": {
                        "title": "Reset Camera Last Saved 3d",
                        "type": "boolean",
                    },
                    "hoverClosest3d": {
                        "title": "Hover Closest 3d",
                        "type": "boolean",
                    },
                    "pan3d": {
                        "title": "Pan 3d",
                        "type": "boolean",
                    },
                    "zoom3d": {
                        "title": "Zoom 3d",
                        "type": "boolean",

                    },
                }
            },
            "multiple-data-points": {
                "type": "hidden",
                "default": "true"
            }
            
        },
        "required": []
    }
};