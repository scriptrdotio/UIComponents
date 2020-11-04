const __onModeBarButtonChange__ = function (modelValue, form, model) {
    var arr = [];
    var buttons=[ 
        'toImage',
        'zoom2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d',
        'pan2d',
        'toggleSpikelines',
        'hoverClosestCartesian',
        'hoverCompareCartesian'
    ];
    var obj = model.options["modeBarButtonsToRemoveWrapper"];
    buttons.forEach(function (element) {
        if (obj.hasOwnProperty(element)) {
            if (!obj[element]) {
                arr.push(element);
            }
        }else{
            arr.push(element);
        }
    });
    model.options["modeBarButtonsToRemove"] = arr;
};

const __DOTPLOTS__ = {
    "name": "dotPlots",
    "label": "Dot Plots",
    "class": "scriptr-dot-plots",
    "commonData": true,
    "show": true,
    "defaults": {
        "data-format": "dotPlots",
        "multiple-data-points": "true",
        "data-type": "raw",
        "schema-for": "dotPlots",
        "type": "dotPlots",
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
        "on-format-data": "return data;",
        "boxLabel": "dotPlots",
        /*"layout-config-form": {
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
                            "dtick": 10,
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
                    },*/
        /*"traces-config-form": [{ 
            "name":"trace1",
            "mode": 'markers',
            "marker": {
                "color": "rgba(156, 165, 196, 0.95)",
                "line": {
                    "color": "rgba(156, 165, 196, 1.0)",
                    "width": "1"
                },
                "symbol": "circle", 
                "size": 16
            }
        }, { 
            "name":"trace2", 
            "mode": 'markers',
            "marker": {
                "color": 'rgba(156, 165, 0.95)',
                "line": {
                    "color": 'rgba(156, 165, 196, 1.0)',
                    "width": 1,
                },
                "symbol": "circle", 
                "size": 16 
            }
        }
                              ],*/
        "data": '[{"x": [40, 45.7, 52, 53.6, 54.1, 54.2, 54.5, 54.7, 55.1, 56.6], "y": ["Switzerland (2011)", "Chile (2013)", "Japan (2014)", "United States (2012)", "Slovenia (2014)", "Canada (2011)", "Poland (2010)", "Estonia (2015)", "Luxembourg (2013)", "Portugal (2011)"]},{"x": [49.1, 42, 52.7, 84.3, 51.7, 61.1, 55.3, 64.2, 91.1, 58.9], "y":["Switzerland (2011)", "Chile (2013)", "Japan (2014)", "United States (2012)", "Slovenia (2014)", "Canada (2011)", "Poland (2010)", "Estonia (2015)", "Luxembourg (2013)", "Portugal (2011)"]}]'
    },
    "box": {
        sizeX: 5,
        sizeY: 8,
        minSizeX: 4,
        minSizeY: 4
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/dotplots.svg",
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
                                                  "key": "traces-config-form[].marker.symbol",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "trace symbol",

                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].name",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "Name of the Trace",

                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].marker.size",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "size"
                                              }]
                                          },
                                          { 
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].mode",
                                                  "title": "mode",
                                                  "type": 'strapselect',
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "titleMap": [{
                                                      "value": "lines",
                                                      "name": "lines"
                                                  }, 
                                                               {
                                                                   "value": "markers",
                                                                   "name": "markers"
                                                               },
                                                               {
                                                                   "value": "lines+markers",
                                                                   "name": "lines+markers"
                                                               },
                                                               {
                                                                   "value": "lines+markers+text",
                                                                   "name": "lines+markers+text"
                                                               },
                                                               {
                                                                   "value": "none",
                                                                   "name": "none"
                                                               }

                                                              ]
                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].hoverinfo",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "hoverinfo"
                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].marker.line.color",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "Line Color"
                                              }]
                                          },
                                          {
                                              "type": "section",
                                              "htmlClass": "col-xs-6 col-sm-3",
                                              "items": [{
                                                  "key": "traces-config-form[].marker.line.width",
                                                  onChange: __onRadioButtonChangeForTraces__,
                                                  "title": "Line Width"
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
                            "htmlClass": "row",
                            "items": [
                                { "type": "section",
                                 "htmlClass": "col-xs-12 col-sm-3",
                                 "items":[{ "key":"layout-config-form.title", "onChange": __onRadioButtonChangeForLayout__} ],

                                },
                                { "type": "section",
                                 "htmlClass": "col-xs-12 col-sm-6",
                                 "items":[{ "key":"layout-config-form.paper_bgcolor", "onChange": __onRadioButtonChangeForLayout__}]
                                },
                                { "type": "section",
                                 "htmlClass": "col-xs-12 col-sm-3",
                                 "items":[{ "key":"layout-config-form.plot_bgcolor", "onChange": __onRadioButtonChangeForLayout__}]
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
                                                      "items": [{"key":"layout-config-form.xaxis.title", "onChange": __onRadioButtonChangeForLayout__}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items":[
                                                          {
                                                              "key": "layout-config-form.xaxis.linecolor",
                                                              "colorFormat": "hex3",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                              "colorFormat": "hex3",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                              "type": 'strapselect',
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                      "items": [{"key":"layout-config-form.xaxis.showline", "onChange": __onRadioButtonChangeForLayout__ }]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.xaxis.showgrid", "onChange": __onRadioButtonChangeForLayout__,}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.xaxis.dtick","onChange": __onRadioButtonChangeForLayout__,}]
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
                                                      "items": [{"key":"layout-config-form.yaxis.title","onChange": __onRadioButtonChangeForLayout__,}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items":[
                                                          {
                                                              "key": "layout-config-form.yaxis.linecolor",
                                                              "colorFormat": "hex3",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                              "colorFormat": "hex3",
                                                              "onChange": __onRadioButtonChangeForLayout__,
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
                                                      "items": [{"key":"layout-config-form.yaxis.showline","onChange": __onRadioButtonChangeForLayout__,}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.yaxis.showgrid","onChange": __onRadioButtonChangeForLayout__,}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.yaxis.dtick","onChange": __onRadioButtonChangeForLayout__,}]

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
                                                      "items": [{"key":"layout-config-form.margin.l","onChange": __onRadioButtonChangeForLayout__,}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [ {"key":"layout-config-form.margin.r","onChange": __onRadioButtonChangeForLayout__,}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.margin.t","onChange": __onRadioButtonChangeForLayout__,}]

                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-3",
                                                      "items": [{"key":"layout-config-form.margin.b","onChange": __onRadioButtonChangeForLayout__,}]

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
                                                          "htmlClass": "col-xs-12",
                                                          "onChange": __onRadioButtonChangeForLayout__,
                                                      }
                                                               ]
                                                  },
                                                  {
                                                      "type":"section",
                                                      "htmlClass": "col-xs-12 col-sm-2",
                                                      "key": "layout-config-form",
                                                      "condition":"model['layout-config-form']['showlegend']",
                                                      "items": [{"key":"layout-config-form.legend.font.size","onChange": __onRadioButtonChangeForLayout__,}]

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
                                                      "items": [{"key":"layout-config-form.legend.y","onChange": __onRadioButtonChangeForLayout__,}]

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
                                                      "items": [{"key":"layout-config-form.legend.x","onChange": __onRadioButtonChangeForLayout__,}]

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
            ]
    ,
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
                                "default": true
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
            "traces-config-form": {
                "title": "Traces Configuration",
                "type": "array",
                /*"default": [{ "color": "rgba(156, 165, 196, 0.95)", "symbol": "circle", "size": "16" }, { "color": "rgba(204, 204, 204, 0.95)", "symbol": "circle", "size": "16" }],*/
                "description": "",
                "items": {
                    "type": "object",
                    "properties": {
                        "marker":{
                            "type":"object",
                            "properties":{
                                "color": {
                                    "title": "Colors",
                                    "type": "string",
                                    "format": "color",
                                   // "default": "#CC5464",
                                    "validationMessage": "Invalid Color"
                                },
                                "symbol": {
                                    "title": "Symbol",
                                    "type": "string",
                                  //  "default": "circle"
                                },
                                "size": {
                                    "title": "Size",
                                    "type": "number",
                                 //   "default":16
                                },
                                "line":{
                                    "type":"object",
                                    "properties":{
                                        "color":{
                                            "title": "Colors",
                                            "type": "string",
                                            "format": "color",
                                            "validationMessage": "Invalid Color"
                                        },
                                        "width":{
                                            "title": "Line's Width",
                                            "type": "number",
                                           // "default":1
                                        }
                                    },
                                }
                            }
                        },
                        "Name": {
                            "title": "Name",
                            "type": "string",
                          //  "default": "trace1"
                        },
                        "mode": {
                            "title": "Mode",
                            "type": "string",
                        },
                        "hoverinfo": {
                            "title": "hoverinfo",
                            "type": "string",
                        }
                    }
                }
            },
            "layout-config-form":{
                "type":"object",
                "properties":{
                    "showlegend":{
                        "title": "Show Legend",
                        "type": "boolean",
                        //"default": "false"
                    },
                    "title":{
                        "title":"Title",
                        "type":"string",
                        "description":"Title shown above the chart",
                       // "default": "The title of the graph"
                    },
                    "plot_bgcolor":{
                        "title": "plot bgcolor",
                        "type": "string",
                        "format": "color",
                       // "default": "#CC5464"
                    },
                    "paper_bgcolor":{
                        "title": "paper bgcolor",
                        "type": "string",
                        "format": "color",
                        //"default": "#CC5464"
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
                                       // "default":16,
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
                              //  "default":"v"
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
                                "type":"boolean",
                                "default":true
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
                               // "default": "#CC5464"
                            },
                            "tickcolor":{
                                "title": "Tick Color",
                                "type": "string",
                                "format": "color",
                              //  "default": "#CC5464"
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
                                "type":"boolean",
                                "default":true
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
                              //  "default": "#CC5464"
                            },
                            "linecolor":{
                                "title": "Line Color",
                                "type": "string",
                                "format": "color",
                              //  "default": "#CC5464"
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
            "legend-type": {
                "title": "Legend type",
                "type": "string",
                "default":"form"
            },
            "layout-config": {
                "type": "hidden",
            },
            "traces-config": {
                "type": "hidden",
            },
            "data-format": {
                "type": "hidden",
                "default": "dotPlots"
            },
            "multiple-data-points": {
                "type": "hidden",
                //"default": "true"
            }
        },
        "required": []
    }
};