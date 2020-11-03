const __SCATTERPLOTS__ = {
    "name": "scatterPlots",
    "label": "Scatter Plots",
    "class": "scriptr-scatter", 
    "commonData": true,
    "show": true,
    "defaults": {
        "data-format": "scatterPlots",
        "multiple-data-points": "true",
        "data-type": "raw",
        "schema-for": "scatterPlots",
        "type": "scatterPlots",
        "on-format-data": "return data;",
        "boxLabel": "Scatter Plots",
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

        "data": '[{"x": [1, 2, 3, 4, 5], "y": [1, 6, 3, 6, 1], "w":[15, 15, 15, 15,15]},{"x": [1.5, 2.5, 3.5, 4.5, 5.5], "y": [4, 1, 7, 1, 4], "w":[25, 25, 25, 25,25]}]'
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
                        "items": [{
                            "key": "traces-config-form",
                            "title": "Traces Details",
                            "condition": "model['legend-type'] =='form'",
                            onChange: __onRadioButtonChangeForTraces__,
                            "items": [{
                                "type": "section",
                                "htmlClass": "row",
                                "items": [ {
                                    "type": "section",
                                    "htmlClass": "col-xs-6 col-sm-3",
                                    "items": [{
                                        "key": "traces-config-form[].marker.color",
                                        onChange: __onRadioButtonChangeForTraces__,
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
                                                  "key": "traces-config-form[].name",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "Name"

                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].marker.opacity",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "Opacity",

                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].marker.symbol",
                                                  "title": "Symbol",

                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].hoverlabel.bgcolor",
                                                  onChange: __onRadioButtonChangeForTraces__,
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
                                                  "key": "traces-config-form[].marker.line.color",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "Line Color",

                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].marker.line.width",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "Line Width",

                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].marker.sizeref",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "Size Ref",

                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].marker.sizemode",
                                                  onChange: __onRadioButtonChangeForTraces__,
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
                        "items": [{
                            "type": "section",
                            "items": [
                                {

                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [
                                        { "type": "section",
                                         "htmlClass": "col-xs-12 col-sm-3",
                                         "items":[{"key":"layout-config-form.title","onChange": __onRadioButtonChangeForLayout__}]
                                        },
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
                                              "title":"Xaxis Properties",
                                              "items": [
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.xaxis.title","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items":[
                                                          {
                                                              "key": "layout-config-form.xaxis.linecolor",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                              "key": "layout-config-form.xaxis.tickcolor",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                              "key":"layout-config-form.xaxis.ticks",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                      "items": [{"key":"layout-config-form.xaxis.showline","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.xaxis.showgrid","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.xaxis.dtick","onChange": __onRadioButtonChangeForLayout__}]
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
                                                      "items": [{"key":"layout-config-form.yaxis.title","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items":[
                                                          {
                                                              "key": "layout-config-form.yaxis.linecolor",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                              "key": "layout-config-form.yaxis.tickcolor",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                              "key":"layout-config-form.yaxis.ticks",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                      "items": [{"key": "layout-config-form.yaxis.showline","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.yaxis.showgrid","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.yaxis.dtick","onChange": __onRadioButtonChangeForLayout__}]

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
                                                      "items": [{"key":"layout-config-form.margin.l","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.margin.r","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.margin.t","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.margin.b","onChange": __onRadioButtonChangeForLayout__}]

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
                                              "title":"Legend",
                                              "items":[
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "row",
                                                      "items": [ {
                                                          "key":"layout-config-form.showlegend",
                                                          "onChange": __onRadioButtonChangeForLayout__,
                                                          "htmlClass": "col-xs-12",
                                                      }
                                                               ]
                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-2",
                                                      "key": "layout-config-form",
                                                      "condition":"model['layout-config-form']['showlegend']",
                                                      "items": [{"key":"layout-config-form.legend.font.size","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-2",
                                                      "key": "layout-config-form",
                                                      "condition":"model['layout-config-form']['showlegend']",
                                                      "items": [
                                                          {
                                                              "key":"layout-config-form.legend.yanchor",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                      "key": "layout-config-form",
                                                      "condition":"model['layout-config-form']['showlegend']",
                                                      "items": [{"key":"layout-config-form.legend.y","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-2",
                                                      "key": "layout-config-form",
                                                      "condition":"model['layout-config-form']['showlegend']",
                                                      "items": [
                                                          {
                                                              "key":"layout-config-form.legend.xanchor",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                      "key": "layout-config-form",
                                                      "condition":"model['layout-config-form']['showlegend']",
                                                      "items": [{"key":"layout-config-form.legend.x","onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-2",
                                                      "key": "layout-config-form",
                                                      "condition":"model['layout-config-form']['showlegend']",
                                                      "items": [
                                                          {
                                                              "key":"layout-config-form.legend.orientation",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                    "placeholder": '[{"x": [1, 2, 3, 4, 5], "y": [1, 6, 3, 6, 1], "w":[15, 15, 15, 15,15]},{"x": [1.5, 2.5, 3.5, 4.5, 5.5], "y": [4, 1, 7, 1, 4], "w":[25, 25, 25, 25,25]}]'
                }
            },
            "traces-config-form": {
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
                                },
                                "opacity": {
                                    "title": "Opacity",
                                    "type": "string",
                                },
                                "sizemode": {
                                    "title": "Size Mode",
                                    "type": "string",
                                },
                                "sizeref": {
                                    "title": "Size Ref",
                                    "type": "number",
                                },
                                "symbol": {
                                    "title": "trace symbol",
                                    "type": "string",
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
                                }
                            }
                        },
                    }
                }
            },
            "data-format": {
                "type": "hidden",
                "default": "scatterPlots"
            },
            "options":{
                "type":"object",
                "properties":{
                    "displayModeBar":{
                        "title": "Show Mode Bar",
                        "type": "boolean",
                        "description": "Mode Bar is the set of functional icons shown at the top of the chart.",
                    },
                    "modeBarButtonsToRemove":{
                        "title":"Mode Bar Buttons To Remove",
                        "type":"array",
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
            "layout-config-form":{
                "type":"object",
                "properties":{
                    "showlegend":{
                        "title": "Show Legend",
                        "type": "boolean",
                    },
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
                            },
                            "tickcolor":{
                                "title": "Tick Color",
                                "type": "string",
                                "format": "color",
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
                            },
                            "linecolor":{
                                "title": "Line Color",
                                "type": "string",
                                "format": "color",
                            },
                        }
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
                "default":"form"
            },
            "traces-config": {
                "type": "hidden",
            },
            "multiple-data-points": {
                "type": "hidden",
                "default": "true"
            }
        },
        "required": []
    }

};