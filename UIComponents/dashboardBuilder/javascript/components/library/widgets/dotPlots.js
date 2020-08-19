const __DOTPLOTS__ = {
    "name": "dotPlots",
    "label": "dotPlots",
    "class": "scriptr-dot-plots",
    "commonData": true,
    "show": true,
    "defaults": {
        "data-format": "dotPlots",
        "multiple-data-points": "true",
        "data-type": "raw",
        "schema-for": "dotPlots",
        "type": "dotPlots",
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
        "on-format-data": "return data;",
        "boxLabel": "dotPlots",
        "show-bar": "false",
        "show-legend": "false",
        "layout-config": {
            "title":"The default of the graph",
            "margin":{
                "l":140,
                "r":40,
                "b":50,
                "t":80
            },
            "xaxis":{
                "showline": true,
                "showgrid":false,
                "title":"The title of xaxis",
                "linecolor":"rgb(204, 204, 204)",
                "ticks":"outside",
                "autotick": false,
                "dtick": 10,
                "tickcolor":'rgb(102, 102, 102)'
            },
            "yaxis":{
                "showline": true,
                "showgrid":false,
                "title":"The title of yaxis",
                "linecolor":"rgb(204, 204, 204)",
                "ticks":"outside",
                "autotick": false,
                "dtick": 0,
                "tickcolor":'rgb(102, 102, 102)'
                
            },
            "hovermode": 'closest',
            "legend":{
                "font":{
                    "size":10
                },
                "yanchor":"top",
                "y":0.99,
                "xanchor":"left",
                "x":0.01,
                "orientation":"v"
            }
        },
        "traces-config": [{ "name":"trace1", "color": "rgba(156, 165, 196, 0.95)", "symbol": "circle", "size": 16 }, { "name":"trace1", "color": "rgba(204, 204, 204, 0.95)", "symbol": "circle", "size": 16 }],
        "data": '[{"x": [40, 45.7, 52, 53.6, 54.1, 54.2, 54.5, 54.7, 55.1, 56.6], "y": ["Switzerland (2011)", "Chile (2013)", "Japan (2014)", "United States (2012)", "Slovenia (2014)", "Canada (2011)", "Poland (2010)", "Estonia (2015)", "Luxembourg (2013)", "Portugal (2011)"]},{"x": [49.1, 42, 52.7, 84.3, 51.7, 61.1, 55.3, 64.2, 91.1, 58.9], "y":["Switzerland (2011)", "Chile (2013)", "Japan (2014)", "United States (2012)", "Slovenia (2014)", "Canada (2011)", "Poland (2010)", "Estonia (2015)", "Luxembourg (2013)", "Portugal (2011)"]}]'
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
                items: [{
                    "type": "section",
                    "htmlClass": "",
                    "items": [{
                        "key": "traces-config",
                        "title": "Traces Details",
                        "items": [{
                            "type": "section",
                            "htmlClass": "row",
                            "items": [ {
                                "type": "section",
                                "htmlClass": "col-xs-6 col-sm-3",
                                "items": [{
                                    "key": "traces-config[].color",
                                    "title": "color",
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
                                              "key": "traces-config[].symbol",
                                              "title": "trace symbol",

                                          }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "traces-config[].name",
                                              "title": "Name of the Trace",

                                          }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "traces-config[].size",
                                              "title": "size"
                                          }]
                                      }

                                     ]
                        }]
                    }]
                }
                       ]
            },
                       /* {
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
                           /* ]
                        }
                    ]
                }]
            },*/
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
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": ["layout-config.xaxis.title"]

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items":[
                                                    {
                                                        "key": "layout-config.xaxis.linecolor",
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
                                                    }
                                                ]
                                            },
                                              {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                  "items":[
                                                      {
                                                          "key": "layout-config.xaxis.tickcolor",
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
                                                      }
                                                  ]
                                                       

                                            },
                                            {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
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
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": ["layout-config.xaxis.showline"]

                                            },
                                             {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
                                                "items": ["layout-config.xaxis.showgrid"]

                                            },
                                             {
                                                "type":"section",
                                                "htmlClass": "col-xs-12 col-sm-3",
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
                                        "htmlClass": "col-xs-12 col-sm-3",
                                        "items": ["layout-config.yaxis.title"]

                                    },
                                     {
                                        "type":"section",
                                        "htmlClass": "col-xs-12 col-sm-3",
                                         "items":[
                                             {
                                                 "key": "layout-config.yaxis.linecolor",
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
                                             }
                                         ]
                                             
                                         

                                    },
                                      {
                                        "type":"section",
                                        "htmlClass": "col-xs-12 col-sm-3",
                                          "items":[
                                              {
                                                  "key": "layout-config.yaxis.tickcolor",
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
                                              }
                                               
                                              
                                          ]
                                    },
                                    {
                                        "type":"section",
                                        "htmlClass": "col-xs-12 col-sm-3",
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
                                        "htmlClass": "col-xs-12 col-sm-3",
                                        "items": ["layout-config.yaxis.showline"]

                                    },
                                     {
                                        "type":"section",
                                        "htmlClass": "col-xs-12 col-sm-3",
                                        "items": ["layout-config.yaxis.showgrid"]

                                    },
                                     {
                                        "type":"section",
                                        "htmlClass": "col-xs-12 col-sm-3",
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
                            },
                            
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                    "key":"layout-config",
                                    "htmlClass": "col-xs-12",
                                    "title":"Legend",
                                    "items":[
                                        {
                                            "type":"section",
                                            "htmlClass": "col-xs-12 col-sm-3",
                                            "key": "layout-config",
                                            "items": ["layout-config.legend.font.size"]

                                        },
                                         {
                                            "type":"section",
                                            "htmlClass": "col-xs-12 col-sm-2",
                                            "key": "layout-config",
                                             "items": [
                                                 {
                                                     "key":"layout-config.legend.yanchor",
                                                     "type": 'strapselect',
                                                     "titleMap": [{
                                                         "value": "auto",
                                                         "name": "auto"
                                                     }, {
                                                         "value": "top",
                                                         "name": "top"
                                                     },
                                                     {
                                                        "value": "middle",
                                                        "name": "middle"
                                                     },
                                                     {
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
                                            "key": "layout-config",
                                            "items": ["layout-config.legend.y"]

                                        },
                                         {
                                            "type":"section",
                                            "htmlClass": "col-xs-12 col-sm-2",
                                            "key": "layout-config",
                                            "items": [
                                                {
                                                     "key":"layout-config.legend.xanchor",
                                                     "type": 'strapselect',
                                                     "titleMap": [{
                                                         "value": "auto",
                                                         "name": "auto"
                                                     }, {
                                                         "value": "top",
                                                         "name": "top"
                                                     },
                                                     {
                                                        "value": "middle",
                                                        "name": "middle"
                                                     },
                                                     {
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
                                            "key": "layout-config",
                                            "items": ["layout-config.legend.x"]

                                        },
                                         {
                                            "type":"section",
                                            "htmlClass": "col-xs-12 col-sm-2",
                                            "key": "layout-config",
                                            "items": [
                                                {
                                                     "key":"layout-config.legend.orientation",
                                                     "type": 'strapselect',
                                                     "titleMap": [{
                                                         "value": "v",
                                                         "name": "vertical"
                                                     }, {
                                                         "value": "h",
                                                         "name": "horizontal"
                                                     }
                                                   
                                                                 ]
                                                 }
                                            ]

                                         },
                                  	  ]
                                    }
                                ]
                            }
                ]				
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
                "description": "data for x axix and y axis to draw the traces",
                "codemirrorOptions": {
                    "placeholder": '[{"x": [40, 45.7, 52, 53.6, 54.1, 54.2, 54.5, 54.7, 55.1, 56.6], "y": ["Switzerland (2011)", "Chile (2013)", "Japan (2014)", "United States (2012)", "Slovenia (2014)", "Canada (2011)", "Poland (2010)", "Estonia (2015)", "Luxembourg (2013)", "Portugal (2011)"]},{"x": [49.1, 42, 52.7, 84.3, 51.7, 61.1, 55.3, 64.2, 91.1, 58.9], "y":["Switzerland (2011)", "Chile (2013)", "Japan (2014)", "United States (2012)", "Slovenia (2014)", "Canada (2011)", "Poland (2010)", "Estonia (2015)", "Luxembourg (2013)", "Portugal (2011)"]}]'
                }
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
                "default": "false",
                "description": "Set visibility of the legend."
            },
            "show-mode-bar": {
                "title": "Show Mode Bar",
                "type": "boolean",
                "description": "Mode Bar is the set of functional icons shown at the top of the chart.",
                "placeholder": " "
            },
            "displaylogo": {
                "title": "Display Plotly Logo",
                "type": "boolean",
                "description": "",
                "placeholder": " "
            }, 
            "mode-bar-buttons-to-remove": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "string",
                }
            },
            "traces-config": {
                "title": "Traces Configuration",
                "type": "array",
                "default": [{ "color": "rgba(156, 165, 196, 0.95)", "symbol": "circle", "size": "16" }, { "color": "rgba(204, 204, 204, 0.95)", "symbol": "circle", "size": "16" }],
                "description": "",
                "items": {
                    "type": "object",
                    "properties": {
                        "color": {
                            "title": "Colors",
                            "type": "string",
                            "format": "color",
                            "default": "#CC5464",
                            "validationMessage": "Invalid Color"
                        },
                        "symbol": {
                            "title": "Symbol",
                            "type": "string",
                            "default": "circle"
                        },
                        "Name": {
                            "title": "Name",
                            "type": "string",
                            "default": "trace1"
                        },
                        "size": {
                            "title": "Size",
                            "type": "number",
                            "default":16
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
                    "legend":{
                        "title":"legend",
                        "type":"object",
                        "properties":{
                            "font":{
                                "type":"object",
                                "properties":{
                                    "size":{
                                        "type":"number",
                                        "title":"Size",
                                        "default":16,
                                        "placeholder":16
                                    }
                                }
                            },
                            "yanchor":{
                                "title":"yanchor",
                                "type":"string",
                                "description":"Sets the legend's vertical position anchor",
                            },
                            "y":{
                                "title":"Y",
                                "type":"number",
                                "minimum":-2,
                                "maximum":3,
                                "description":"Sets the y position (in normalized coordinates) of the legend",
                            },
                            "xanchor":{
                                "title":"xanchor",
                                "type":"string",
                                "description":"Sets the legend's horizontal position anchor"
                            },
                            "x":{
                                "title":"X",
                                "type":"number",
                                "minimum":-2,
                                "maximum":3,
                                "description":"Sets the x position (in normalized coordinates) of the legend.",
                            },
                            "orientation":{
                                "title":"Orientation",
                                "type":"string",
                                "description":"Sets the orientation of the legend.",
                                "default":"v"
                            }
                        }
                    
                    },
                    "xaxis":{
                        "title":"Xaxis",
                        "type":"object",
                        "properties":{
                            "title":{
                                "title":"The title of the Xaxis",
                                "type":"string"
                            },
                            "showgrid":{
                                "tilte":"Show Grid",
                                "description":"Determines whether or not grid lines are drawn on xaxis",
                                "type":"boolean"
                            },
                             "ticks":{
                                "tilte":"Ticks",
                                "description":"Determines the position of the ticks on the xaxis",
                                "type":"string"
                            },
                            "showline":{
                                "tilte":"Show Line",
                                "description":"Determines whether the xaxis line is present or not",
                                "type":"boolean"
                            },
                            "dtick":{
                                "tilte":"Distance between ticks",
                                "description":"Sets the step in-between ticks on this axis",
                                "type":"number"
                            },

                            "linecolor":{
                                "title": "Line Color",
                                "type": "string",
                                "format": "color",
                                "default": "#CC5464"
                            },
                            "tickcolor":{
                                "title": "Tick Color",
                                "type": "string",
                                "format": "color",
                                "default": "#CC5464"
                            },
                          /*  "tickfont":{
                                "type":"object",
                                "properties":{
                                    "font":{
                                        "type":"object",
                                         "properties":{
                                             "color":{
                                                 "title": "Tick Color",
                                                 "type": "string",
                                                 "format": "color",
                                                 "default": "#CC5464"
                                             }
                                         }
                                    }
                                }
                            },*/
                            
                        }
                    },
                    "yaxis":{
                        "title":"Yaxis",
                        "type":"object",
                        "properties":{
                            "title":{
                                "title":"The title of the Yaxis",
                                "type":"string"
                            },
                            "showgrid":{
                                "tilte":"Show Grid",
                                "description":"Determines whether or not grid lines are drawn on yaxis",
                                "type":"boolean"
                            },
                            "ticks":{
                                "tilte":"Ticks",
                                "description":"Determines the position of the ticks on the yaxis",
                                "type":"string"
                            },
                            "showline":{
                                "tilte":"Show Line",
                                "description":"Determines whether the xaxis line is present or not",
                                "type":"boolean"
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
                            "linecolor":{
                                "title": "Line Color",
                                "type": "string",
                                "format": "color",
                                "default": "#CC5464"
                            },
                           /* "font":{
                                "type":"object",
                                "properties":{
                                    "color":{
                                        "title": "Title Color",
                                        "type": "string",
                                        "format": "color",
                                        "default": "#CC5464"
                                    }
                                }
                            },*/
                           /* "tickfont":{
                                "type":"object",
                                "properties":{
                                    "font":{
                                        "type":"object",
                                         "properties":{
                                             "color":{
                                                 "title": "Tick Color",
                                                 "type": "string",
                                                 "format": "color",
                                                 "default": "#CC5464"
                                             }
                                         }
                                    }
                                }
                            },*/
                        }
                    }
                }
            },
            "show-legend": {
                "title": "Show Legend",
                "type": "boolean",
                "default": "false",
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
            "data-format": {
                "type": "hidden",
                "default": "dotPlots"
            },
            "show-mode-bar": {
                "title": "Show Mode Bar",
                "type": "boolean",
                "description": "Mode Bar is the set of functional icons shown at the top of the chart.",
                "placeholder": " "
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