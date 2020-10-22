const __BUBBLECHART__ = {
    "name": "bubbleChart",
    "label": "Bubble Chart",
    "class": "scriptr-bubble-chart",
    "commonData": true,
    "show": true,
    "defaults": {
        "data-format": "bubbleChart",
        "multiple-data-points": "true",
        "data-type": "raw",
        "schema-for": "bubbleChart",
        "type": "bubbleChart",
        "on-format-data": "return data;",
        "boxLabel": "bubbleChart",
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
        "layout-config": {
            "title":"The default of the graph",
            "showlegend":false,
            "margin":{
                "l":140,
                "r":40,
                "b":50,
                "t":80
            },
            "xaxis":{
                "showline": true,
                "showgrid":false,
                "title":"Title of xaxis",
                "linecolor":"rgb(204, 204, 204)",
                "ticks":"outside",
                "autotick": false,
                "dtick": 0,
                "tickcolor":'rgb(102, 102, 102)'
            },
            "yaxis":{
                "showline": true,
                "showgrid":false,
                "title":"Title of yaxis",
                "linecolor":"rgb(204, 204, 204)",
                "ticks":"outside",
                "autotick": false,
                "dtick": 0,
                "tickcolor":'rgb(102, 102, 102)'
                
            },
            "hovermode": 'closest',
            "paper_bgcolor": 'rgb(253, 254, 254)',
            "plot_bgcolor": 'rgb(253, 254, 254)',
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
        "traces-config": [
            {
                "name":"trace0",
                "marker": {
                    "color": "rgb(93, 169, 214)",
                    "opacity": 1,
                    "symbol": "square",
                    "line": {
                        "color": "rgb(120,120,120)",
                        "width": 2
                    }
                },
                "hoverlabel" : {
                    "bgcolor":'#C8CE1B'
                },
            },
            {	
                "name":"trace1",
                "marker": {
                    "sizeref": 2,
                    "color": "rgb(93, 164, 214)"
                },
                "hoverlabel" : {
                    "bgcolor":'#C8CE1B'
                },
            }
                         ],
        "data": '[{"x": [1, 2, 3, 4], "y": [10, 11, 12, 13], "w":[20, 30, 40, 50]},{"x": [1, 2, 3, 4], "y": [14, 15, 16, 17], "w":[10, 20, 30, 40]}]'
    },
    "box": {
        sizeX: 5,
        sizeY: 8,
        minSizeX: 4,
        minSizeY: 4
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/bubble.svg",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Traces",
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
                                    "key": "traces-config[].marker.color",
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
                                              "key": "traces-config[].name",
                                              "title": "Name"

                                          }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "traces-config[].marker.opacity",
                                              "title": "Opacity",

                                          }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "traces-config[].marker.symbol",
                                              "title": "Symbol",

                                          }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "traces-config[].hoverlabel.bgcolor",
                                              "title": "Hoverlabel",
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
                                              "key": "traces-config[].marker.line.color",
                                              "title": "Line Color",

                                          }]
                                      },
                                      {
                                          "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                                  "items": [{
                                                      "key": "traces-config[].marker.line.width",
                                                      "title": "Line Width",

                                                  }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "traces-config[].marker.sizeref",
                                              "title": "Size Ref",

                                          }]
                                      },
                                      {
                                          "type": "section",
                                          "htmlClass": "col-xs-6 col-sm-3",
                                          "items": [{
                                              "key": "traces-config[].marker.sizemode",
                                              "title": "Size Mode",
                                              "type": 'strapselect',
                                                "titleMap": [{
                                                    "value": "area",
                                                    "name": "area"
                                                }, {
                                                    "value": "diameter",
                                                    "name": "diameter"
                                                    }
                                                ]

                                          }]
                                      },
                                     ]
                        }]
                    }]
                }
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
                                     "items":["layout-config.title"]
                                    },
                                    { "type": "section",
                                     "htmlClass": "col-xs-12 col-sm-6",
                                     "items":["layout-config.paper_bgcolor"]
                                    },
                                    { "type": "section",
                                     "htmlClass": "col-xs-12 col-sm-3",
                                     "items":["layout-config.plot_bgcolor"]
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
                                                    "name": "outside"
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
                                            "key":"layout-config.yaxis.ticks",
                                        "type": 'strapselect',
                                        "titleMap": [{
                                            "value": "outside",
                                            "name": "outside"
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
                                            "htmlClass": "row",
                                            "items": [ {
                                                "key":"layout-config.showlegend",
                                                "htmlClass": "col-xs-12",
                                            }
                                                     ]
                                        },
                                   		 {
                                            "type":"section",
                                            "htmlClass": "col-xs-12 col-sm-2",
                                            "key": "layout-config",
                                            "condition":"model['layout-config']['showlegend']",
                                            "items": ["layout-config.legend.font.size"]

                                        },
                                         {
                                            "type":"section",
                                            "htmlClass": "col-xs-12 col-sm-2",
                                            "key": "layout-config",
                                            "condition":"model['layout-config']['showlegend']",
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
                                            "condition":"model['layout-config']['showlegend']",
                                            "items": ["layout-config.legend.y"]

                                        },
                                         {
                                            "type":"section",
                                            "htmlClass": "col-xs-12 col-sm-2",
                                            "key": "layout-config",
                                            "condition":"model['layout-config']['showlegend']",
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
                                            "condition":"model['layout-config']['showlegend']",
                                            "items": ["layout-config.legend.x"]

                                        },
                                         {
                                            "type":"section",
                                            "htmlClass": "col-xs-12 col-sm-2",
                                            "key": "layout-config",
                                            "condition":"model['layout-config']['showlegend']",
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
                                        "condition":"!model.options['staticPlot']",
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
                "description": "data for x axix and y axis to draw the traces",
                "codemirrorOptions": {
                    "placeholder": '[{"x": [1, 2, 3, 4], "y": [10, 11, 12, 13], "w":[20, 30, 40, 50]},{"x": [1, 2, 3, 4], "y": [14, 15, 16, 17], "w":[10, 20, 30, 40]}]'
                }
            },
            "traces-config": {
                "title": "Traces Configuration",
                "type": "array",
                "description": "",
                "items": {
                    "type": "object",
                    "properties": {
                        "marker":{
                            "title":"marker",
                            "type":"object",
                            "description":"",
                            "properties":{
                                "color": {
                                    "title": "Colors",
                                    "type": "string",
                                    "format": "color",
                                    "validationMessage": "Invalid Color",
                                },
                                "name": {
                                    "title": "Name",
                                    "type": "string",
                                    "default": "trace1"
                                },
                                /*"mode": {
                                    "title": "Mode",
                                    "type": "string",
                                },*/
                                "opacity": {
                                    "title": "Opacity",
                                    "type": "string",
                                },
                                "sizemode": {
                                    "title": "Size Mode",
                                    "type": "string",
                                    "default":'area'
                                },
                                "sizeref": {
                                    "title": "Size Ref",
                                    "type": "number",
                                },
                                "symbol": {
                                    "title": "trace symbol",
                                    "type": "string",
                                    "default":"circle",
                                },
                                "line": {
                                    "title":"line",
                                    "type":"object",
                                    "description":"",
                                    "properties":{
                                        "color": {
                                            "title": "color",
                                            "type": "string",
                                            "format": "color",
                                        },
                                         "width": {
                                            "title": "width",
                                            "type": "number",
                                        }
                                    }
                                }
                            }
                        },
                        "hoverlabel":{
                            "type":"object",
                            "properties":{
                                "bgcolor":{
                                    "title": "Background Color",
                                    "type": "string",
                                    "format": "color",
                                    "default": "#C8CE1B"
                                }
                            }
                        },
                    }
                }
            },
            "data-format": {
                "type": "hidden",
                "default": "bubbleCharts"
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
                        "default": {},
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
            "layout-config":{
                "type":"object",
                "properties":{
                    "showlegend":{
                        "title": "Show Legend",
                        "type": "boolean",
                        "default": "true"
                    },
                    "title":{
                        "title":"Title",
                        "type":"string",
                        "description":"Title shown above the chart",
                    },
                    "plot_bgcolor":{
                        "title": "plot bgcolor",
                        "type": "string",
                        "format": "color",
                        "default": "#CC5464"
                    },
                    "paper_bgcolor":{
                        "title": "paper bgcolor",
                        "type": "string",
                        "format": "color",
                        "default": "#CC5464"
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
                                        "placeholder":16,
                                        "description":"size of the legend",
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
                        },
                        
                    
                    },
                    "xaxis":{
                        "title":"Xaxis",
                        "type":"object",
                        "properties":{
                            "title":{
                                "title":"Title of Xaxis",
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
                        }
                    },
                    "yaxis":{
                        "title":"Yaxis",
                        "type":"object",
                        "properties":{
                            "title":{
                                "title":"Title of Yaxis",
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
                        }
                    }
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