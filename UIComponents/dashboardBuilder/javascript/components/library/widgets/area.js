const __AREA__ = {
    "name": "area",
    "label": "Area Chart",
    "class": "scriptr-chart",
    "commonData": true,
    "show": true,
    "defaults": {
        "type": "area",
        "data-format": "area",
        "on-format-data": "return data;",
        "boxLabel": "Area Chart",
        "xkey": "y",
        "yconfig": [{"key": "a", "label": "Series A", "color": "#FCC717"},{"key": "b", "label": "Series B", "color": "#38B9D6"}],
        "grid-text-family": "Source Sans Pro",
        "data": '[{"y":"2000","a":64,"b":82},{"y":"2003","a":53,"b":48},{"y":"2004","a":81,"b":58},{"y":"2005","a":68,"b":72},{"y":"2008","a":52,"b":60},{"y":"2011","a":55,"b":30},{"y":"2013","a":79,"b":40}]'
    },
    "box": {
        sizeX: 4,
        sizeY: 5,
        minSizeX: 2,
        minSizeY: 3
    },
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/area-chart.png",
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
                        "items": ["xkey", "xlabel-angle", {
                            key: "parse-time",
                        },
                                  {
                                      key :"xdate-moment-format",
                                      condition: "model['parse-time'] == true"
                                  },
                                  {
                                      key: "_dummy",
                                      "htmlClass": "hidden",
                                      onFieldLoad: function (modelValue, form, model) { //This is for backward compatibility
                                          //build yconfig
                                          if (!model.yconfig || !model.yconfig.length) {
                                              var ykeys = JSON.parse(model.ykeys);
                                              var ylabels = JSON.parse(model.labels);
                                              var ycolors = model.colors;
                                              if(ykeys == null){
                                                  ykeys=[];
                                              }
                                              var keysNum = ykeys.length;
                                              // clean the array
                                              model.yconfig = [];
                                              for (var i = 0; i < keysNum; i++) {
                                                  var e = {
                                                      key: ykeys[i],
                                                      color: ycolors[i],
                                                      label: ylabels[i],
                                                  };
                                                  model.yconfig.push(e);
                                              }
                                          } else {
                                              delete model.colors;
                                              delete model.labels;
                                              delete model.ykeys;
                                          }
                                          //build goals
                                          if (!model.goalsconfig || !model.goalsconfig.length) {
                                              if(model.goals && model.goals.length > 0){
                                                  var goalsNum = model.goals.length;
                                                  // clean the array
                                                  for (var i = 0; i < goalsNum; i++) {
                                                      if (model.goals[i]) {
                                                          var e = {
                                                              goal: model.goals[i],
                                                              lineColor: ((model['goal-line-colors'] && model['goal-line-colors'][i]) ? model['goal-line-colors'][i] : null),
                                                          };
                                                          model.goalsconfig.push(e);
                                                      }
                                                  }
                                              } 
                                          } else {
                                              delete model.goals;
                                              delete model['goal-line-colors'];
                                          }
                                          //build events
                                          if (!model.eventsconfig || !model.eventsconfig.length) {
                                              if(model.events && model.events.length > 0){
                                                  var eventsNum = model.events.length;
                                                  // clean the array
                                                  for (var i = 0; i < eventsNum; i++) {
                                                      if (model.events[i]) {
                                                          var e = {
                                                              event: model.events[i],
                                                              //storkeWidth: model['event-stroke-width'],
                                                              lineColor: ((model['event-line-colors'] && model['event-line-colors'][i]) ? model['event-line-colors'][i] : null),
                                                          };
                                                          model.eventsconfig.push(e);
                                                      }
                                                  }
                                              }
                                          } else {
                                              delete model.events;
                                              delete model['event-line-colors'];
                                          }
                                      }
                                  }
                                 ]
                    }]
                }]
            },
            {
                title: "Y",
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
                                        key: "yconfig",
                                        title: "Y Configuration",
                                        startEmpty: true,
                                        items: [{
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-sm-4",
                                                    "items": [{
                                                        key: "yconfig[].key"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-sm-4",
                                                    "items": [{
                                                        key: "yconfig[].label"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-sm-4",
                                                    "items": [{
                                                        key: "yconfig[].color",
                                                        "colorFormat": "hex"
                                                    }]
                                                }]
                                        }
                                               ],
                                    },
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    "pre-units",
                                    "ymin"
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    "post-units", "ymax" // ,"ylabel-format"
                                ]
                            }]
                    }]
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
                title: "Grid",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                key: "grid",
                            }, {
                                key: "axes",
                            }, {
                                "key": "grid-text-color",
                                "colorFormat": "hex3"
                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                {
                                    "key":"grid-text-family",
                                    "type": 'strapselect',
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
                                ,
                                {
                                    "key":"grid-text-weight",
                                    "type": 'strapselect',
                                    "titleMap": [{
                                        "value": "normal",
                                        "name": "Normal"
                                    }, {
                                        "value": "bold",
                                        "name": "Bold"
                                    }]
                                },
                                "grid-text-size"]
                        }]
                }]
            },
            {
                title: "Lines & Points",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["line-width", {
                            key: "smooth",
                        }]
                    }, {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["point-size", {
                            "key": "point-fill-colors",
                            "items": [{
                                "key": "point-fill-colors[]",
                                "colorFormat": "hex3"
                            }]
                        }, "point-stroke-colors"]
                    }]
                }]
            },
            {
                title: "Area",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [{
                            key: "behave-like-line",
                        }, {
                            "key": "fill-opacity",
                            "step": "0.1"
                        }]
                    }
                              // "date-format",
                              // "xlabel-format",
                              // "ylabel-format"
                             ]
                },]
            },
            {
                title: "Goals",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [
                                "goal-stroke-width"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-9",
                            "items": [
                                {
                                    key: "goalsconfig",
                                    title: "Goals Configuration",
                                    startEmpty: true,
                                    items: [{
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-4",
                                                "items": [{
                                                    key: "goalsconfig[].goal"
                                                }]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-4",
                                                "items": [{
                                                    key: "goalsconfig[].lineColor",
                                                    "colorFormat": "hex"
                                                }]
                                            }]
                                    }
                                           ],
                                },
                            ]
                        },]
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
                            "htmlClass": "col-xs-3",
                            "items": [
                                "event-stroke-width"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-9",
                            "items": [
                                {
                                    key: "eventsconfig",
                                    title: "Events Configuration",
                                    startEmpty: true,
                                    items: [{
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-4",
                                                "items": [{
                                                    key: "eventsconfig[].event"
                                                }]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-4",
                                                "items": [{
                                                    key: "eventsconfig[].lineColor",
                                                    "colorFormat": "hex"
                                                }]
                                            }]
                                    }
                                           ],
                                },
                            ]
                        },]
                }]
            }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "data": {
                "title": "Data",
                "type": "string",
                "description": "Data series in case of static data.",
                "codemirrorOptions": {
                    "placeholder": "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
                }
            },
            "xkey": {
                "title": "X key",
                "type": "string",
                "description": "A string containing the name of the attribute that contains date (X) values. Timestamps are accepted in the form of millisecond timestamps (as returned by Date.getTime() or as strings in the following formats: 2012, 2012 Q1, 2012 W1, 2012-02, 2012-02-24, 2012-02-24 15:00, 2012-02-24 15:00:00, 2012-02-24 15:00:00.000. date/time strings can optionally contain a T between the date and time parts, and/or a Z suffix, for compatibility with ISO-8601 dates."
            },
            "line-width": {
                "title": "Line width",
                "type": "number",
                "default": 3,
                "description": "Width of the series lines, in pixels."
            },
            "point-size": {
                "title": "Point size",
                "type": "number",
                "default": 4,
                "description": "Diameter of the series points, in pixels."
            },
            "point-fill-colors": {
                "title": "Point fill colors",
                "type": "array",
                "description": "Colors for the series points. By default uses the same values as lineColors.",
                "items": {
                    "format": "color",
                    "type": "string"
                }
            },
            "point-stroke-colors": {
                "title": "Point Stroke Colors",
                "type": "array",
                "default": ["#fff"],
                "description": "Colors for the outlines of the series points. (#ffffff by default).",
                "items": {
                    "format": "color",
                    "type": "string"
                }
            },
            "ymax": {
                "title": "Y maximum value",
                "type": "string",
                "default": 'auto',
                "description": "Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]."
            },
            "ymin": {
                "title": "Y minimum value",
                "type": "string",
                "default": "auto 0",
                "description": "Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins."
            },
            "smooth": {
                "title": "Smooth",
                "type": "boolean",
                "default": "true",
                "description": "Set to false to disable line smoothing."
            },
            "show-legend": {
                "title": "Show Legend",
                "type": "boolean",
                "default": "true",
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
            "parse-time": {
                "title": "Parse time",
                "type": "boolean",
                "default": "true",
                "description": "Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series."
            },
            "post-units": {
                "title": "Post units",
                "type": "string",
                "description": "Set to a string value (eg: '%') to add a label suffix all y-labels."
            },
            "pre-units": {
                "title": "Pre units",
                "type": "string",
                "description": "Set to a string value (eg: '$') to add a label prefix all y-labels."
            },
            "xlabels": {
                "title": "X labels",
                "type": "string",
                "default": "auto",
                "description": "Sets the x axis labelling interval. By default the interval will be automatically computed.",
                // "format": 'uiselect',
                // "placeholder": " ",
                // "items": [{
                //     "value": "auto",
                //     "label": "auto"
                // }, {
                //     "value": "decade",
                //     "label": "decade"
                // }, {
                //     "value": "year",
                //     "label": "year"
                // }, {
                //     "value": "month",
                //     "label": "month"
                // }, {
                //     "value": "week",
                //     "label": "week"
                // }, {
                //     "value": "day",
                //     "label": "day"
                // }, {
                //     "value": "hour",
                //     "label": "hour"
                // }, {
                //     "value": "30min",
                //     "label": "30min"
                // }, {
                //     "value": "15min",
                //     "label": "15min"
                // }, {
                //     "value": "10min",
                //     "label": "10min"
                // }, {
                //     "value": "5min",
                //     "label": "5min"
                // }, {
                //     "value": "minute",
                //     "label": "minute"
                // }, {
                //     "value": "30sec",
                //     "label": "30sec"
                // }, {
                //     "value": "15sec",
                //     "label": "15sec"
                // }, {
                //     "value": "10sec",
                //     "label": "10sec"
                // }, {
                //     "value": "5sec",
                //     "label": "5sec"
                // }, {
                //     "value": "second",
                //     "label": "second"
                // }]
            },
            "xlabel-angle": {
                "title": "X label angle",
                "type": "number",
                "default": 0,
                "description": "The angle in degrees from horizontal to draw x-axis labels."
            },
            "xlabel-format": {
                "title": "X label format",
                "type": "string",
                "description": "A function that accepts Date objects and formats them for display as x-axis labels. Overrides the default formatter chosen by the automatic labeller or the xLabels option. function (x) { return x.toString(); }"
            },
            "ylabel-format": {
                "title": "Y label format",
                "type": "string",
                "description": "A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; }"
            },
            "legend-date-moment-format": {
                "title": "Legend Date Format",
                "type": "string",
                "description": "Set a valid MomentJs Date Format",
                "default": "DD-MM-YYYY HH:mm:ss"
            },
            "xdate-moment-format": {
                "title": "X axis Date Format",
                "type": "string",
                "description": "Set a valid MomentJs Date Format",
                "default": "DD-MM-YYYY HH:mm:ss"
            },
            "goal-stroke-width": {
                "title": "Goal stroke width",
                "type": "number",
                "default": 1.0,
                "description": "Width, in pixels, of the goal lines."
            },
            "event-stroke-width": {
                "title": "Event stroke width",
                "type": "number",
                "default": 1.0,
                "description": "Width, in pixels, of the event lines."
            },
            "axes": {
                "title": "Axes",
                "type": "boolean",
                "description": "Set to false to disable drawing the x and y axes.",
                "default": "true"
            },
            "grid": {
                "title": "Grid",
                "type": "boolean",
                "description": "Set to false to disable drawing the horizontal grid lines.",
                "default": "true"
            },
            "grid-text-color": {
                "title": "Grid text color",
                "type": "string",
                "description": "Set the color of the axis labels (default: #888).",
                "format": "color",
                "default": "#888"
            },
            "grid-text-size": {
                "title": "Grid text size",
                "type": "number",
                "description": "Set the point size of the axis labels (default: 12).",
                "default": 12
            },
            "grid-text-family": {
                "title": "Grid text family",
                "type": "string",
                "description": "Set the font family of the axis labels (default: sans-serif).",
                "default": "Source Sans Pro",
                "placeholder": " ",
            },
            "grid-text-weight": {
                "title": "Grid text weight",
                "type": "string",
                "description": "Set the font weight of the axis labels (default: normal).",
                "default": "normal",
                "format": 'uiselect',
                "placeholder": " ",
            },
            "fill-opacity": {
                "title": "Fill opacity",
                "type": "number",
                "default": 1,
                "description": "Change the opacity of the area fill color. Accepts values between 0.0 (for completely transparent) and 1.0 (for completely opaque).",
                "minimum": 0,
                "maximum": 1
            },
            "behave-like-line": {
                "title": "Behave like Line",
                "type": "boolean",
                "default": "false",
                "description": "Set to true to overlay the areas on top of each other instead of stacking them."
            },
            "date-format": {
                "title": "Date format",
                "type": "string",
                "description": "A function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }."
            }, "yconfig": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "object",
                    "properties": {
                        "key": {
                            "title": "Key",
                            "type": "string"
                        },
                        "label": {
                            "title": "Label",
                            "type": "string"
                        },
                        "color": {
                            "title": "Color",
                            "type": "string",
                            "format": "color",
                        }
                    }
                }
            }, "goalsconfig": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "object",
                    "properties": {
                        "goal": {
                            "title": "goal",
                            "type": "string"
                        },
                        "lineColor": {
                            "title": "Line Color",
                            "type": "string",
                            "format": "color",
                        }
                    }
                }
            }, "eventsconfig": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "object",
                    "properties": {
                        "event": {
                            "title": "event",
                            "type": "string"
                        },
                        "lineColor": {
                            "title": "Line Color",
                            "type": "string",
                            "format": "color",
                        }
                    }
                }
            }, "_dummy": {
                "title": "Dummy not used Value",
                "type": "string",
            },
            "data-format": {
                "type": "hidden",
                "default": "area"
            },
            "multiple-data-points": {
                "type": "hidden",
                "default": "true"
            }
        },
        "required": ["xkey", "ykeys"]
    }
};
