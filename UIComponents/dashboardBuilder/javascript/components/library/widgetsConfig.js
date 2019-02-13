angular
      .module('DashboardBuilder')
      .constant(
            "common",
            {
               "formTab" : {
                  title : "Data",
                  items : [
                        {
                           "type" : "section",
                           "htmlClass" : "row",
                           "items" : [ {
                              "type" : "section",
                              "htmlClass" : "col-xs-6",
                              "items" : [ "transport" ]
                           }, {
                              "type" : "section",
                              "htmlClass" : "col-xs-6",
                              "items" : [ {
                                 "key" : "msg-tag",
                                 "condition" : "model.transport=='wss'"
                              }, {
                                 "key" : "http-method",
                                 "condition" : "model.transport=='https'"
                              } ]
                           } ]
                        },
                        {
                           "type" : "section",
                           "htmlClass" : "row",
                           "items" : [ {
                              "type" : "section",
                              "htmlClass" : "col-xs-6",
                              "items" : [ "api" ]
                           }, {
                              "type" : "section",
                              "htmlClass" : "col-xs-6",
                              "items" : [ "api-params" ]
                           } ]
                        },
                        {
                           "type" : "section",
                           "htmlClass" : "row",
                           "items" : [ {
                              "type" : "section",
                              "htmlClass" : "col-xs-12",
                              "items" : [
                                  {
	                              	"key" : "data"
                              	  },
                                  {
                                      "key" : "on-format-data",
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
                           } ]
                        },
                        {
                           "type" : "section",
                           "htmlClass" : "row",
                           "items" : [ {
                              "type" : "section",
                              "htmlClass" : "col-xs-12",
                              "items" : [ {
                                 "type" : "help",
                                 "helpvalue" : "<hr>"
                              } ]
                           } ]
                        },
                        {
                           "type" : "section",
                           "htmlClass" : "row",
                           "items" : [ {
                              "type" : "section",
                              "htmlClass" : "col-xs-12",
                              "items" : [ {
                                 "type" : "help",
                                 "helpvalue" : "<div class=\"alert alert-info\"><ul><li>Messages published over the subscibe channel need to have the following format in order to be consumed by a widget:<ul><li>{“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”}</li></ul></li><li>A script would publish a message  over the subscribe channel as follow:<ul><li>publish(“responseChannel”, {“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”});</li></ul></li><li>Whether https or wss transport is used, Sciptr API should return the static data structure for widget initial load:<ul><li>return &lt;static data structure&gt;;</li></ul></li></ul></div>"
                              } ]
                           } ]
                        }

                  ]
               },
               "schemaFields" : {
                  "api" : {
                     "title" : "Api",
                     "type" : "string",
                     "description" : "Name of the scriptr api (script name) responsible for publishing or returning the widget data."
                  },
                  "api-params" : {
                     "title" : "Api params",
                     "type" : "string",
                     "description" : "A JSON formatted object containing the parameters to be sent to the scriptr api.",
                     "x-schema-form" : {
                        "type" : "textarea",
                        "placeholder" : "Ex: {'id' : '599865'}"
                     }
                  },
                  "http-method" : {
                     "title" : "Http method",
                     "type" : "string",
                     "description" : "Method to be used when calling the scriptr api over https. Default: GET.",
                     "default" : "GET",
                     "format" : 'uiselect',
                     "placeholder" : " ",
                     "items" : [ {
                        "value" : "GET",
                        "label" : "GET"
                     }]
                  },
                  "transport" : {
                     "title" : "Transport",
                     "type" : "string",
                     "description" : "Protocol used to call the  scriptr api. Use wss for real time communication whenever your widget needs to update its data live by consuming messages published from scriptr over the subscribe channel defined in settings.",
                     "format" : 'uiselect',
                     "placeholder" : " ",
                     "items" : [ {
                        "value" : "wss",
                        "label" : "wss"
                     }, {
                        "value" : "https",
                        "label" : "https"
                     } ]
                  },
                  "msg-tag" : {
                     "title" : "Message tag",
                     "type" : "string",
                     "description" : "The dashboard widgets consume messages published over the subscribe channel defined in dashboard settings. Message tag is an identifier sent as part of the published message. The widget uses it to know which messages to consume or ignore."
                  },
                  "on-format-data" : {
                     "title" : "Format data",
                     "default" : "return data;",
                     "type" : "string",
                     "description" : "Callback function to be called after data is returned from backend."
                  }
               }

            });

angular
      .module('DashboardBuilder')
      .constant(
            "config",
            {
               script : {
                  "form" : [ {
                     "key" : "scriptName",
                     "notitle" : true,
                     "placeholder" : "Script name"
                  } ],
                  "schema" : {
                     "type" : "object",
                     "title" : "Schema",
                     "properties" : {
	                     "scriptName" : {
	                        "type" : "string",
	                        "fieldHtmlClass" : "script-name-input"
	                     }
                     },
                     "required" : [ "scriptName" ]
                  }
               },
               transport : {
                  "label" : "Transport configuration",
                  "defaults" : {
                     "publishChannel" : "requestChannel",
                     "subscribeChannel" : "responseChannel"
                  },
                  "form" : [ "*" ],
                  "schema" : {
                     "type" : "object",
                     "title" : "Schema",
                     "properties" : {
                        "publishChannel" : {
                           "title" : "Publish channel",
                           "type" : "string",
                           "description" : "Widgets use the publish channel to publish messages that will be distributed to its subscribers."
                        },
                        "subscribeChannel" : {
                           "title" : "Subscribe channel",
                           "type" : "string",
                           "description" : "Widgets use the subscribe channel to consume the messages published over that channel as a data source."
                        }
                     },
                     "required" : [ "token", "baseUrl", "publishChannel",
                           "subscribeChannel" ]
                  }
               },
               defaultWidget : {
               	"name" : "displaybox"
               },
               widgets : [
                     {
                        "name" : "bar",
                        "label" : "Bar Chart",
                        "class" : "scriptr-chart",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "type" : "bar",
                           "boxLabel" : "Bar Chart",
                           "stacked" : "true",
                           "xkey" : "y",
                           "ykeys" : "[\"a\", \"b\"]",
                           "labels" : "[\"Serie A\", \"Serie B\"]",
                           "colors" : [ "#7ed38c", "#dd7ca7" ],
                           "transport" : "wss",
                           "on-format-data": "return data;",  
                       //    "api" : "UIComponents/dashboard/frontend/examples/chart/getChartData",
                           "msg-tag" : "chart",
                           "data" : '[{"y":"2006","a":88,"b":20},{"y":"2007","a":30,"b":34},{"y":"2008","a":90,"b":42},{"y":"2009","a":89,"b":59},{"y":"2010","a":43,"b":61},{"y":"2011","a":85,"b":69},{"y":"2012","a":29,"b":65}]',
                           "grid-text-family" : "Source Sans Pro"
                        },
                        "box" : {
                           sizeY : 2,
                           sizeX : 2,
                           minSizeX : 1,
                           minSizeY : 1
                        },
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAlCAYAAADBa/A+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwNzM5ODZDRTIzRjExRTZBNDMxODBDRDVCMkFCNTZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwNzM5ODZERTIzRjExRTZBNDMxODBDRDVCMkFCNTZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjA3Mzk4NkFFMjNGMTFFNkE0MzE4MENENUIyQUI1NkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjA3Mzk4NkJFMjNGMTFFNkE0MzE4MENENUIyQUI1NkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7BUDhKAAABLklEQVR42mJkGCDw+5iYA5Daj08NE8MgBqOOG3UcvQELCbkrAUgp4FFygNXq1YEBcRwQgBxnT0DNgdE0N+o4KqY5YjOOAJASwKPkBzDjvBgQxwFBARDX45E/CMQOo2lu1HEjIrd+fSYo8P8vbj8zMv3nYWB4NTCOe3NWyeDDLSmc8pziH5UZGG4Mg2iFFpr4wBdgofmH2hb//cnKTEy0viegxpHarQ0QeHFUXffNecXRomS0nMMJHm03VPn9iRN3ESHxwYDY8ovqjvvxlpf7+0t+3AZx/RQYWdF6d6UVXgW8Cq9VgNF1YEAc9+WJMF4FHKKfeEZz65BLc8xsf/7jVcH4/xfYF8x/f+FVy/T/B4zGpw5kDsxcgnYPZsBYXl4uMGijlYhWyWiGwAYAAgwAp1xSUMqF7k8AAAAASUVORK5CYII=",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "X",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [ {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-12",
                                          "items" : [ "xkey", "xlabel-angle", {
                                             type : "radios-inline",
                                             key : "parse-time",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          } ]
                                       } ]
                                    } ]
                                 },
                                 {
                                    title : "Y",
                                    items : [

                                    {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "ykeys",
                                                      "pre-units",
                                                      "ymin",
                                                      {
                                                         "key" : "stacked",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      },
                                                      {
                                                         type : "radios-inline",
                                                         key : "hide-hover",
                                                         titleMap : [ {
                                                            value : "auto",
                                                            name : "Auto"
                                                         }, {
                                                            value : "false",
                                                            name : "Never"
                                                         }, {
                                                            value : "always",
                                                            name : "Always"
                                                         } ]
                                                      } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "labels",
                                                      "post-units",
                                                      "ymax",
                                                      {
                                                         "key" : "colors",
                                                         "items" : [ {
                                                            "key" : "colors[]",
                                                            "colorFormat" : "hex3"
                                                         } ]
                                                      } // ,"ylabel-format"
                                                ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Grid",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   type : "radios-inline",
                                                   key : "grid",
                                                   titleMap : [ {
                                                      value : "true",
                                                      name : "True"
                                                   }, {
                                                      value : "false",
                                                      name : "False"
                                                   } ]
                                                }, {
                                                   type : "radios-inline",
                                                   key : "axes",
                                                   titleMap : [ {
                                                      value : "true",
                                                      name : "True"
                                                   }, {
                                                      value : "false",
                                                      name : "False"
                                                   } ]
                                                }, {
                                                   "key" : "grid-text-color",
                                                   "colorFormat" : "hex3"
                                                } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "grid-text-family",
                                                      "grid-text-weight",
                                                      "grid-text-size" ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Goals",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "goals",
                                                      "goal-stroke-width" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      {
                                                         "key" : "goal-line-colors",
                                                         "condition" : "model.goals.length > 0",
                                                         "required" : true
                                                      },
                                                      {
                                                         "key" : "goal-line-colors",
                                                         "condition" : "model.goals.length == 0",
                                                         "required" : false
                                                      } ]
                                             } ]
                                    } ]
                                 }, {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Data",
                                 "type" : "string",
                                 "description" : "Data to plot in case of static data.This is an array of objects, containing x and y attributes as described by the xkey and ykeys options. The order in which you provide the data is the order in which the bars are displayed.",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
                                 }
                              },
                              "xkey" : {
                                 "title" : "X key",
                                 "type" : "string",
                                 "description" : "A string containing the name of the attribute that contains X labels."
                              },
                              "ykeys" : {
                                 "title" : "Y keys",
                                 "type" : "string",
                                 "description" : "A list of strings containing names of attributes that contain Y values (one for each series of data to be plotted)."
                              },
                              "labels" : {
                                 "title" : "Labels",
                                 "type" : "string",
                                 "description" : "A list of strings containing labels for the data series to be plotted (corresponding to the values in the ykeys option)."
                              },
                              "colors" : {
                                 "title" : "Colors",
                                 "type" : "array",
                                 "default" : [ "#CC5464", "#FCC717", "#38B9D6",
                                       "#1DBC68", "#E90088" ],
                                 "description" : "Array containing colors for the series bars.",
                                 "items" : {
                                    "type" : "string",
                                    "format" : "color"
                                 }

                              },
                              "stacked" : {
                                 "title" : "Stacked",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Set to true to draw bars stacked vertically."
                              },
                              "hide-hover" : {
                                 "title" : "Hide hover",
                                 "default" : "false",
                                 "type" : "string",
                                 "description" : "Set to Never to always show a hover legend. Set to 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend."
                              },
                              "hover-callback" : {
                                 "title" : "Hover callback",
                                 "type" : "string",
                                 "description" : "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
                              },
                              "axes" : {
                                 "title" : "Axes",
                                 "type" : "string",
                                 "description" : "Set to false to disable drawing the x and y axes.",
                                 "default" : "true"
                              },
                              "grid" : {
                                 "title" : "Grid",
                                 "type" : "string",
                                 "description" : "Set to false to disable drawing the horizontal grid lines.",
                                 "default" : "true"
                              },
                              "grid-text-color" : {
                                 "title" : "Grid text color",
                                 "type" : "string",
                                 "description" : "Set the color of the axis labels (default: #888).",
                                 "format" : "color",
                                 "default" : "#888"
                              },
                              "grid-text-size" : {
                                 "title" : "Grid text size",
                                 "type" : "number",
                                 "description" : "Set the point size of the axis labels (default: 12).",
                                 "default" : 12
                              },
                              "grid-text-family" : {
                                 "title" : "Grid text family",
                                 "type" : "string",
                                 "description" : "Set the font family of the axis labels (default: sans-serif).",
                                 "default" : "Source Sans Pro",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "Arial",
                                    "label" : "Arial"
                                 }, {
                                    "value" : "Helvetica",
                                    "label" : "Helvetica"
                                 }, {
                                    "value" : "Times New Roman",
                                    "label" : "Times New Roman"
                                 }, {
                                    "value" : "Courier New",
                                    "label" : "Courier New"
                                 }, {
                                    "value" : "Courier",
                                    "label" : "Courier"
                                 }, {
                                    "value" : "Verdana",
                                    "label" : "Verdana"
                                 }, {
                                    "value" : "Georgia",
                                    "label" : "Georgia"
                                 }, {
                                    "value" : "Palatino",
                                    "label" : "Palatino"
                                 }, {
                                    "value" : "Garamond",
                                    "label" : "Garamond"
                                 }, {
                                    "value" : "Bookman",
                                    "label" : "Bookman"
                                 }, {
                                    "value" : "Comic Sans MS",
                                    "label" : "Comic Sans MS"
                                 }, {
                                    "value" : "Trebuchet MS",
                                    "label" : "Trebuchet MS"
                                 }, {
                                    "value" : "Arial Black",
                                    "label" : "Arial Black"
                                 }, {
                                    "value" : "Impact",
                                    "label" : "Impact"
                                 }, {
                                    "value" : "Sans-Serif",
                                    "label" : "Sans-Serif"
                                 }, {
                                    "value" : "Source Sans Pro",
                                    "label" : "Source Sans Pro"
                                 } ]
                              },
                              "grid-text-weight" : {
                                 "title" : "Grid text weight",
                                 "type" : "string",
                                 "description" : "Set the font weight of the axis labels (default: normal).",
                                 "default" : "normal",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "normal",
                                    "label" : "Normal"
                                 }, {
                                    "value" : "bold",
                                    "label" : "Bold"
                                 } ]
                              },
                              "parse-time" : {
                                 "title" : "Parse time",
                                 "type" : "string",
                                 "default" : "true",
                                 "description" : "Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series."
                              },
                              "ymax" : {
                                 "title" : "Y maximum value",
                                 "type" : "string",
                                 "default" : 'auto',
                                 "description" : "Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]."
                              },
                              "ymin" : {
                                 "title" : "Y minimum value",
                                 "type" : "string",
                                 "default" : "auto 0",
                                 "description" : "Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins."
                              },
                              "post-units" : {
                                 "title" : "Post units",
                                 "type" : "string",
                                 "description" : "Set to a string value (eg: '%') to add a label suffix all y-labels."
                              },
                              "pre-units" : {
                                 "title" : "Pre units",
                                 "type" : "string",
                                 "description" : "Set to a string value (eg: '$') to add a label prefix all y-labels."
                              },
                              "xlabel-angle" : {
                                 "title" : "X label angle",
                                 "type" : "number",
                                 "default" : 0,
                                 "description" : "The angle in degrees from horizontal to draw x-axis labels."
                              },
                              "ylabel-format" : {
                                 "title" : "Y label Format",
                                 "type" : "string",
                                 "description" : "A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; }"
                              },
                              "goals" : {
                                 "title" : "Goals",
                                 "type" : "array",
                                 "description" : "A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0]",
                                 "items" : {
	                                 "type" : "number"
                                 }

                              },
                              "goal-stroke-width" : {
                                 "title" : "Goal stroke width",
                                 "type" : "number",
                                 "default" : 1.0,
                                 "description" : "Width, in pixels, of the goal lines."
                              },
                              "goal-line-colors" : {
                                 "title" : "Goal line colors",
                                 "type" : "array",
                                 "default" : [ '#666633', '#999966', '#cc6666',
                                       '#663333' ],
                                 "description" : "Array of color values to use for the goal line colors.",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              }
                           },
                           "required" : [ "xkey", "ykeys", "labels" ]
                        }
                     },
                     {
                        "name" : "area",
                        "label" : "Area Chart",
                        "class" : "scriptr-chart",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "type" : "area",
                           "on-format-data": "return data;",
                           "boxLabel" : "Area Chart",
                           "xkey" : "y",
                           "ykeys" : "[\"a\", \"b\"]",
                           "labels" : "[\"Serie A\", \"Serie B\"]",
                           "colors" : [ "#CC5464", "#38B9D6" ],
                           "transport" : "wss",
                           "msg-tag" : "chart",
                           "grid-text-family" : "Source Sans Pro",
                           "data" : '[{"y":2000,"a":64,"b":82},{"y":2003,"a":53,"b":48},{"y":2004,"a":81,"b":58},{"y":2005,"a":68,"b":72},{"y":2008,"a":52,"b":60},{"y":20011,"a":55,"b":30},{"y":2013,"a":79,"b":40}]'
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 2,
                           minSizeX : 1,
                           minSizeY : 1
                        // , maxSizeY: 2
                        },
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAlCAYAAADfosCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU0QUJEQTNFMjRDMTFFNjg5OTNGRTg1NTI0MkFENEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU0QUJEQTJFMjRDMTFFNjg5OTNGRTg1NTI0MkFENEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDMzZDNhZTEtYWE5Ni1iMjRiLWJhZDMtZWFmYjg0ZDNmMzgyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pjz0N0QAAALTSURBVHja7JdPiE1RHMfvnXfnNaPMYpSaV/7MmBmNBePPUwYbNYqQYiEbKxoaK4tnIRSSlSiMlOxENiSzUGQhLLyJjSYLjbERIf8m4T2fH7+b2+3d++6976qj7q8+/V73nPO73/M75/zuebZloM26PbQGdxw2TA6OvLENFXgTWqEMxSaDBU7BATJZsQ0WKEt9R9ps0wWKNRkgcBPuVpBA2vOOAQKvQbNfIG2yyovhnZMgcEGCwVUCfvhHAnO45dAhIu0YQWXgHjgG0+ErXIYzBB9rQOBH2EyMu+7y4lbADO1etiMGXYobgWUBXR7CObjCy77FFLiWMY+0TfblKk2CFUkkg9pwR2DYc8iewFFYD9t0w7v2Fi7KhHjxi5gC5V0rffHCRTJoK+4UFPTRZzgEpwn8Q/u043boNuj2DK/qiZXsjkpBpu92fl8KEChLO6BtVl2RDJgr+0wz5dp12EvQyYAJSZxBFbvRV9oko6MwpM/9AiUJRcgF5OuvSDrLLPbBQU/KX6q4GzEOxWzcLtgJM33NfoGduP46H5U/Iuksm/U8LNCGn3ASDhPwS50TPwdE2D36Vr1FGLcFdsNqeA/rPAL7cH0R5l226XxWA7n2QJaGYE9DxEl9lW3RCy36+D5jXgf0X4j7Tvsz3RqSvc6Ii1N2dIZiUpj3wwXZ6CHi5kEP5H3Nks2aIt0Ja+aLnsMYyRwtJ7IHT4RkollPb3fACRQryCTckx8QY8BTpCNbvTqZ16x1hYjz2mNETtSI06o1sC3BF7TsBIhr0ax1abajmiz5RI0PQq0inSyTOuMe3dS5hDGleE9FKNLxMkmwabj5Wk4avWNKNseJ2aE3mVyD8SwpQYt0WdO6pX+C53oXTCPm70wWUv4bITeYJWlejo36t5iJzERmIjOR5llFivm459ta1Vt5miYxK0kFwqv/YbUtu1Qq9ZsuUpZ7LDs4KdgvAQYAsIQCfa7zz00AAAAASUVORK5CYII=",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "X",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [ {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-12",
                                          "items" : [ "xkey", "xlabel-angle", {
                                             type : "radios-inline",
                                             key : "parse-time",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          } ]
                                       } ]
                                    } ]
                                 },
                                 {
                                    title : "Y",
                                    items : [

                                    {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "ykeys",
                                                      "pre-units",
                                                      "ymin",
                                                      {
                                                         type : "radios-inline",
                                                         key : "hide-hover",
                                                         titleMap : [ {
                                                            value : "auto",
                                                            name : "Auto"
                                                         }, {
                                                            value : "false",
                                                            name : "Never"
                                                         }, {
                                                            value : "always",
                                                            name : "Always"
                                                         } ]
                                                      } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "labels",
                                                      "post-units", "ymax" // ,"ylabel-format"
                                                ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Grid",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   type : "radios-inline",
                                                   key : "grid",
                                                   titleMap : [ {
                                                      value : "true",
                                                      name : "True"
                                                   }, {
                                                      value : "false",
                                                      name : "False"
                                                   } ]
                                                }, {
                                                   type : "radios-inline",
                                                   key : "axes",
                                                   titleMap : [ {
                                                      value : "true",
                                                      name : "True"
                                                   }, {
                                                      value : "false",
                                                      name : "False"
                                                   } ]
                                                }, {
                                                   "key" : "grid-text-color",
                                                   "colorFormat" : "hex3"
                                                } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "grid-text-family",
                                                      "grid-text-weight",
                                                      "grid-text-size" ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Lines & Points",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [ {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ "line-width", {
                                             type : "radios-inline",
                                             key : "smooth",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          }, {
                                             "key" : "colors",
                                             "items" : [ {
                                                "key" : "colors[]",
                                                "colorFormat" : "hex3"
                                             } ]
                                          } ]
                                       }, {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ "point-size", {
                                             "key" : "point-fill-colors",
                                             "items" : [ {
                                                "key" : "point-fill-colors[]",
                                                "colorFormat" : "hex3"
                                             } ]
                                          }, "point-stroke-colors" ]
                                       } ]
                                    } ]
                                 },
                                 {
                                    title : "Area",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [ {

                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ {
                                             type : "radios-inline",
                                             key : "behave-like-line",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          }, {
                                             "key" : "fill-opacity",
                                             "step" : "0.1"
                                          } ]
                                       }
                                       // "date-format",
                                       // "xlabel-format",
                                       // "ylabel-format"
                                       ]
                                    }, ]
                                 },
                                 {
                                    title : "Goals",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "goals",
                                                      "goal-stroke-width" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   "key" : "goal-line-colors",
                                                   "items" : [ {
                                                      "key" : "goal-line-colors[]",
                                                      "colorFormat" : "hex3"
                                                   } ]
                                                } ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Events",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "events",
                                                      "event-stroke-width" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   "key" : "event-line-colors",
                                                   "items" : [ {
                                                      "key" : "event-line-colors[]",
                                                      "colorFormat" : "hex3"
                                                   } ]
                                                } ]
                                             } ]
                                    } ]
                                 },

                                 {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Data",
                                 "type" : "string",
                                 "description" : "Data series in case of static data.",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
                                 }
                              },
                              "xkey" : {
                                 "title" : "X key",
                                 "type" : "string",
                                 "description" : "A string containing the name of the attribute that contains date (X) values. Timestamps are accepted in the form of millisecond timestamps (as returned by Date.getTime() or as strings in the following formats: 2012, 2012 Q1, 2012 W1, 2012-02, 2012-02-24, 2012-02-24 15:00, 2012-02-24 15:00:00, 2012-02-24 15:00:00.000. date/time strings can optionally contain a T between the date and time parts, and/or a Z suffix, for compatibility with ISO-8601 dates."
                              },
                              "ykeys" : {
                                 "title" : "Y keys",
                                 "type" : "string",
                                 "description" : "A list of strings containing names of attributes that contain Y values (one for each series of data to be plotted)."
                              },
                              "labels" : {
                                 "title" : "Labels",
                                 "type" : "string",
                                 "description" : "A list of strings containing labels for the data series to be plotted (corresponding to the values in the ykeys option)."
                              },
                              "colors" : {
                                 "title" : "Colors",
                                 "type" : "array",
                                 "description" : "Array containing colors for the series lines/points.",
                                 "default" : [ "#CC5464", "#FCC717", "#38B9D6",
                                       "#1DBC68", "#E90088" ],
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "line-width" : {
                                 "title" : "Line width",
                                 "type" : "number",
                                 "default" : 3,
                                 "description" : "Width of the series lines, in pixels."
                              },
                              "point-size" : {
                                 "title" : "Point size",
                                 "type" : "number",
                                 "default" : 4,
                                 "description" : "Diameter of the series points, in pixels."
                              },
                              "point-fill-colors" : {
                                 "title" : "Point fill colors",
                                 "type" : "array",
                                 "description" : "Colors for the series points. By default uses the same values as lineColors.",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "point-stroke-colors" : {
                                 "title" : "Point Stroke Colors",
                                 "type" : "array",
                                 "default" : [ "#fff" ],
                                 "description" : "Colors for the outlines of the series points. (#ffffff by default).",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "ymax" : {
                                 "title" : "Y maximum value",
                                 "type" : "string",
                                 "default" : 'auto',
                                 "description" : "Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]."
                              },
                              "ymin" : {
                                 "title" : "Y minimum value",
                                 "type" : "string",
                                 "default" : "auto 0",
                                 "description" : "Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins."
                              },
                              "smooth" : {
                                 "title" : "Smooth",
                                 "type" : "string",
                                 "default" : "true",
                                 "description" : "Set to false to disable line smoothing."
                              },
                              "hide-hover" : {
                                 "title" : "Hide hover",
                                 "default" : "false",
                                 "type" : "string",
                                 "description" : "Set to Never to always show a hover legend. Set to 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend."
                              },
                              "hover-callback" : {
                                 "title" : "Hover callback",
                                 "type" : "string",
                                 "description" : "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
                              },
                              "parse-time" : {
                                 "title" : "Parse time",
                                 "type" : "string",
                                 "default" : "true",
                                 "description" : "Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series."
                              },
                              "post-units" : {
                                 "title" : "Post units",
                                 "type" : "string",
                                 "description" : "Set to a string value (eg: '%') to add a label suffix all y-labels."
                              },
                              "pre-units" : {
                                 "title" : "Pre units",
                                 "type" : "string",
                                 "description" : "Set to a string value (eg: '$') to add a label prefix all y-labels."
                              },
                              "xlabels" : {
                                 "title" : "X labels",
                                 "type" : "string",
                                 "default" : "auto",
                                 "description" : "Sets the x axis labelling interval. By default the interval will be automatically computed.",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "auto",
                                    "label" : "auto"
                                 }, {
                                    "value" : "decade",
                                    "label" : "decade"
                                 }, {
                                    "value" : "year",
                                    "label" : "year"
                                 }, {
                                    "value" : "month",
                                    "label" : "month"
                                 }, {
                                    "value" : "week",
                                    "label" : "week"
                                 }, {
                                    "value" : "day",
                                    "label" : "day"
                                 }, {
                                    "value" : "hour",
                                    "label" : "hour"
                                 }, {
                                    "value" : "30min",
                                    "label" : "30min"
                                 }, {
                                    "value" : "15min",
                                    "label" : "15min"
                                 }, {
                                    "value" : "10min",
                                    "label" : "10min"
                                 }, {
                                    "value" : "5min",
                                    "label" : "5min"
                                 }, {
                                    "value" : "minute",
                                    "label" : "minute"
                                 }, {
                                    "value" : "30sec",
                                    "label" : "30sec"
                                 }, {
                                    "value" : "15sec",
                                    "label" : "15sec"
                                 }, {
                                    "value" : "10sec",
                                    "label" : "10sec"
                                 }, {
                                    "value" : "5sec",
                                    "label" : "5sec"
                                 }, {
                                    "value" : "second",
                                    "label" : "second"
                                 } ]
                              },
                              "xlabel-angle" : {
                                 "title" : "X label angle",
                                 "type" : "number",
                                 "default" : 0,
                                 "description" : "The angle in degrees from horizontal to draw x-axis labels."
                              },
                              "xlabel-format" : {
                                 "title" : "X label format",
                                 "type" : "string",
                                 "description" : "A function that accepts Date objects and formats them for display as x-axis labels. Overrides the default formatter chosen by the automatic labeller or the xLabels option. function (x) { return x.toString(); }"
                              },
                              "ylabel-format" : {
                                 "title" : "Y label format",
                                 "type" : "string",
                                 "description" : "A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; }"
                              },
                              "goals" : {
                                 "title" : "Goals",
                                 "type" : "array",
                                 "description" : "A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0]",
                                 "items" : {
	                                 "type" : "number"
                                 }
                              },
                              "goal-stroke-width" : {
                                 "title" : "Goal stroke width",
                                 "type" : "number",
                                 "default" : 1.0,
                                 "description" : "Width, in pixels, of the goal lines."
                              },
                              "goal-line-colors" : {
                                 "title" : "Goal line colors",
                                 "type" : "array",
                                 "default" : [ '#666633', '#999966', '#cc6666',
                                       '#663333' ],
                                 "description" : "Array of color values to use for the goal line colors. If you list fewer colors here than you have lines in goals, then the values will be cycled.",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "events" : {
                                 "title" : "Events",
                                 "type" : "array",
                                 "description" : "A list of x-values to draw as vertical 'event' lines on the chart. ex: ['2012-01-01', '2012-02-01']",
                                 "items" : {
	                                 "type" : "string"
                                 }
                              },
                              "event-stroke-width" : {
                                 "title" : "Event stroke width",
                                 "type" : "number",
                                 "default" : 1.0,
                                 "description" : "Width, in pixels, of the event lines."
                              },
                              "event-line-colors" : {
                                 "title" : "Event line colors",
                                 "type" : "array",
                                 "default" : [ '#005a04', '#ccffbb', '#3a5f0b',
                                       '#005502' ],
                                 "description" : "Array of color values to use for the event line colors. If you list fewer colors here than you have lines in events, then the values will be cycled.",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "axes" : {
                                 "title" : "Axes",
                                 "type" : "string",
                                 "description" : "Set to false to disable drawing the x and y axes.",
                                 "default" : "true"
                              },
                              "grid" : {
                                 "title" : "Grid",
                                 "type" : "string",
                                 "description" : "Set to false to disable drawing the horizontal grid lines.",
                                 "default" : "true"
                              },
                              "grid-text-color" : {
                                 "title" : "Grid text color",
                                 "type" : "string",
                                 "description" : "Set the color of the axis labels (default: #888).",
                                 "format" : "color",
                                 "default" : "#888"
                              },
                              "grid-text-size" : {
                                 "title" : "Grid text size",
                                 "type" : "number",
                                 "description" : "Set the point size of the axis labels (default: 12).",
                                 "default" : 12
                              },
                              "grid-text-family" : {
                                 "title" : "Grid text family",
                                 "type" : "string",
                                 "description" : "Set the font family of the axis labels (default: sans-serif).",
                                 "default" : "Source Sans Pro",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "Arial",
                                    "label" : "Arial"
                                 }, {
                                    "value" : "Helvetica",
                                    "label" : "Helvetica"
                                 }, {
                                    "value" : "Times New Roman",
                                    "label" : "Times New Roman"
                                 }, {
                                    "value" : "Courier New",
                                    "label" : "Courier New"
                                 }, {
                                    "value" : "Courier",
                                    "label" : "Courier"
                                 }, {
                                    "value" : "Verdana",
                                    "label" : "Verdana"
                                 }, {
                                    "value" : "Georgia",
                                    "label" : "Georgia"
                                 }, {
                                    "value" : "Palatino",
                                    "label" : "Palatino"
                                 }, {
                                    "value" : "Garamond",
                                    "label" : "Garamond"
                                 }, {
                                    "value" : "Bookman",
                                    "label" : "Bookman"
                                 }, {
                                    "value" : "Comic Sans MS",
                                    "label" : "Comic Sans MS"
                                 }, {
                                    "value" : "Trebuchet MS",
                                    "label" : "Trebuchet MS"
                                 }, {
                                    "value" : "Arial Black",
                                    "label" : "Arial Black"
                                 }, {
                                    "value" : "Impact",
                                    "label" : "Impact"
                                 }, {
                                    "value" : "Sans-Serif",
                                    "label" : "Sans-Serif"
                                 }, {
                                    "value" : "Source Sans Pro",
                                    "label" : "Source Sans Pro"
                                 } ]
                              },
                              "grid-text-weight" : {
                                 "title" : "Grid text weight",
                                 "type" : "string",
                                 "description" : "Set the font weight of the axis labels (default: normal).",
                                 "default" : "normal",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "normal",
                                    "label" : "Normal"
                                 }, {
                                    "value" : "bold",
                                    "label" : "Bold"
                                 } ]
                              },
                              "fill-opacity" : {
                                 "title" : "Fill opacity",
                                 "type" : "number",
                                 "default" : 1,
                                 "description" : "Change the opacity of the area fill color. Accepts values between 0.0 (for completely transparent) and 1.0 (for completely opaque).",
                                 "minimum" : 0,
                                 "maximum" : 1
                              },
                              "behave-like-line" : {
                                 "title" : "Behave like Line",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Set to true to overlay the areas on top of each other instead of stacking them."
                              },
                              "date-format" : {
                                 "title" : "Date format",
                                 "type" : "string",
                                 "description" : "A function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }."
                              }
                           },
                           "required" : [ "xkey", "ykeys" ]
                        }
                     },
                     {
                        "name" : "line",
                        "label" : "Line Chart",
                        "class" : "scriptr-chart",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "type" : "line",
                           "on-format-data": "return data;", 
                           "boxLabel" : "Line Chart",
                           "xkey" : "y",
                           "ykeys" : "[\"a\", \"b\"]",
                           "labels" : "[\"Serie A\", \"Serie B\"]",
                           "colors" : [ "#FCC717", "#38B9D6" ],
                           "transport" : "wss",
                        //   "api" : "UIComponents/dashboard/frontend/examples/chart/getChartData",
                           "msg-tag" : "chart",
                           "data" : '[{"y": 2006, "a": 2, "b": 3 }, { "y": 2007, "a": 82, "b": 68 }, { "y": 2009, "a": 70, "b": 99 }, { "y":2010, "a": 30, "b": 64 }, { "y": 2011, "a": 72, "b":100 }, { "y": 2012, "a": 81, "b": 81 }, { "y": 2013,"a": 52, "b": 39 } ]',
                           "grid-text-family" : "Source Sans Pro"
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 2,
                           minSizeX : 1,
                           minSizeY : 1
                        // ,maxSizeY: 2
                        },
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAlCAYAAADBa/A+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMyODMxQTMyRTIzRjExRTZCN0M2QjYwOTU2Q0U5QzZDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMyODMxQTMzRTIzRjExRTZCN0M2QjYwOTU2Q0U5QzZDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI4MzFBMzBFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI4MzFBMzFFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7pqcU1AAACpElEQVR42uyXS2gUQRCGZ8d4kCQSiGIwHkQFCTm45ObBeEhAMIjxEgQfKMIelICIYdmTj5AETS4KCirk4SOHIHrygSGgkeAheFEUUXwcDSii6xMT16+kRppmZw7Znd0+pOGjumdqp/+tmq7uSeRyOc/VlnBBxIzXV4u5CRvhDnSs8DI/fUeC1AmboAK2wV656Iq4inwZdUXcI6Mvab2ST3G52n61x3jXTgYXfQcWQz2mHX7DRfOeC2lNwSK4QdTeOyOOqC1WcdLO2/fLHTlJZx08JWqTrok7FBa1WMWRsmpNW9j9RsxmyMK1kolj4l7MZ/hIvy3E7aDay6Q0WxJxWhoyWuWr4XS+qAZbVFhK44rcnDVuQMxxK8UirAruE7XnpRTXovYPvA0qP0wjMGml9FzBRyYeuh6zFh7wT79F+C3HSCSWyZaE7zDX5LQxCOtgFp5A0z93z1uFz+y8I8fDO3TCW/CYcWWE+1kVNg4jcoHJH2I2wBndCZrUt1bxCknrAcNPItgc8ie2Y3aCRDaFqP9HbPrf4TDdZ9YxqbJQcTPWuBchayxhNcaqyyDkXcizTsAv7V/C7828xTGppCioU3fhFSQ1vWb96oeVMBX1kiPmOkbey3r6qYK+IRAwhNkH93jYFsZL6Q/DDnU5BV+hWyOSxO9F7B84usomddJGJn2t1+U3XdBnRX4An65i1iQ/4ihzQYc9gTBNTQ6k6vdYP6sqdsEMe+eOSmWHl/m2H223rfFU7N+tRG211rUl0EqUJiJS36YLRj5Qrprlo+jitMCOwVYYZbJd5Tzs+YawTj3miLAvcKTcHxe+sQD6dXuRJuMPTojTY84P43qWlM45IQ4hcrzZrTuArNA93kJbaPG0RDqdrnFVnBz4Prkqznc5rX8FGAAWXa+WqoxqjwAAAABJRU5ErkJggg==",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "X",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [ {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-12",
                                          "items" : [ "xkey", "xlabel-angle", {
                                             type : "radios-inline",
                                             key : "parse-time",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          } ]
                                       } ]
                                    } ]
                                 },
                                 {
                                    title : "Y",
                                    items : [

                                    {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "ykeys",
                                                      "pre-units",
                                                      "ymin",
                                                      {
                                                         type : "radios-inline",
                                                         key : "hide-hover",
                                                         titleMap : [ {
                                                            value : "auto",
                                                            name : "Auto"
                                                         }, {
                                                            value : "false",
                                                            name : "Never"
                                                         }, {
                                                            value : "always",
                                                            name : "Always"
                                                         } ]
                                                      } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "labels",
                                                      "post-units", "ymax" // ,"ylabel-format"
                                                ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Grid",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   type : "radios-inline",
                                                   key : "grid",
                                                   titleMap : [ {
                                                      value : "true",
                                                      name : "True"
                                                   }, {
                                                      value : "false",
                                                      name : "False"
                                                   } ]
                                                }, {
                                                   type : "radios-inline",
                                                   key : "axes",
                                                   titleMap : [ {
                                                      value : "true",
                                                      name : "True"
                                                   }, {
                                                      value : "false",
                                                      name : "False"
                                                   } ]
                                                }, {
                                                   "key" : "grid-text-color",
                                                   "colorFormat" : "hex3"
                                                } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "grid-text-family",
                                                      "grid-text-weight",
                                                      "grid-text-size" ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Lines & Points",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [ {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ "line-width", {
                                             type : "radios-inline",
                                             key : "smooth",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          }, {
                                             "key" : "colors",
                                             "items" : [ {
                                                "key" : "colors[]",
                                                "colorFormat" : "hex3"
                                             } ]
                                          } ]
                                       }, {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ "point-size", {
                                             "key" : "point-fill-colors",
                                             "items" : [ {
                                                "key" : "point-fill-colors[]",
                                                "colorFormat" : "hex3"
                                             } ]
                                          }, "point-stroke-colors" ]
                                       } ]
                                    } ]
                                 },
                                 {
                                    title : "Goals",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "goals",
                                                      "goal-stroke-width" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   "key" : "goal-line-colors",
                                                   "items" : [ {
                                                      "key" : "goal-line-colors[]",
                                                      "colorFormat" : "hex3"
                                                   } ]
                                                } ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Events",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "events",
                                                      "event-stroke-width" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   "key" : "event-line-colors",
                                                   "items" : [ {
                                                      "key" : "event-line-colors[]",
                                                      "colorFormat" : "hex3"
                                                   } ]
                                                } ]
                                             } ]
                                    } ]
                                 }, {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Data",
                                 "type" : "string",
                                 "description" : "Data series in case of static data.",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
                                 }
                              },
                              "xkey" : {
                                 "title" : "X key",
                                 "type" : "string",
                                 "description" : "A string containing the name of the attribute that contains date (X) values. Timestamps are accepted in the form of millisecond timestamps (as returned by Date.getTime() or as strings in the following formats: 2012, 2012 Q1, 2012 W1, 2012-02, 2012-02-24, 2012-02-24 15:00, 2012-02-24 15:00:00, 2012-02-24 15:00:00.000. date/time strings can optionally contain a T between the date and time parts, and/or a Z suffix, for compatibility with ISO-8601 dates."
                              },
                              "ykeys" : {
                                 "title" : "Y keys",
                                 "type" : "string",
                                 "description" : "A list of strings containing names of attributes that contain Y values (one for each series of data to be plotted)."
                              },
                              "labels" : {
                                 "title" : "Labels",
                                 "type" : "string",
                                 "description" : "A list of strings containing labels for the data series to be plotted (corresponding to the values in the ykeys option)."
                              },
                              "colors" : {
                                 "title" : "Colors",
                                 "type" : "array",
                                 "description" : "Array containing colors for the series lines/points.",
                                 "default" : [ "#CC5464", "#FCC717", "#38B9D6",
                                       "#1DBC68", "#E90088" ],
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "line-width" : {
                                 "title" : "Line width",
                                 "type" : "number",
                                 "default" : 3,
                                 "description" : "Width of the series lines, in pixels."
                              },
                              "point-size" : {
                                 "title" : "Point size",
                                 "type" : "number",
                                 "default" : 4,
                                 "description" : "Diameter of the series points, in pixels."
                              },
                              "point-fill-colors" : {
                                 "title" : "Point fill colors",
                                 "type" : "array",
                                 "description" : "Colors for the series points. By default uses the same values as lineColors.",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "point-stroke-colors" : {
                                 "title" : "Point Stroke Colors",
                                 "type" : "array",
                                 "default" : [ "#fff" ],
                                 "description" : "Colors for the outlines of the series points. (#ffffff by default).",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "ymax" : {
                                 "title" : "Y maximum value",
                                 "type" : "string",
                                 "default" : 'auto',
                                 "description" : "Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]."
                              },
                              "ymin" : {
                                 "title" : "Y minimum value",
                                 "type" : "string",
                                 "default" : "auto 0",
                                 "description" : "Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins."
                              },
                              "smooth" : {
                                 "title" : "Smooth",
                                 "type" : "string",
                                 "default" : "true",
                                 "description" : "Set to false to disable line smoothing."
                              },
                              "hide-hover" : {
                                 "title" : "Hide hover",
                                 "default" : "false",
                                 "type" : "string",
                                 "description" : "Set to Never to always show a hover legend. Set to 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend."
                              },
                              "hover-callback" : {
                                 "title" : "Hover callback",
                                 "type" : "string",
                                 "description" : "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
                              },
                              "parse-time" : {
                                 "title" : "Parse time",
                                 "type" : "string",
                                 "default" : "true",
                                 "description" : "Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series."
                              },
                              "post-units" : {
                                 "title" : "Post units",
                                 "type" : "string",
                                 "description" : "Set to a string value (eg: '%') to add a label suffix all y-labels."
                              },
                              "pre-units" : {
                                 "title" : "Pre units",
                                 "type" : "string",
                                 "description" : "Set to a string value (eg: '$') to add a label prefix all y-labels."
                              },
                              "xlabels" : {
                                 "title" : "X labels",
                                 "type" : "string",
                                 "default" : "auto",
                                 "description" : "Sets the x axis labelling interval. By default the interval will be automatically computed.",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "auto",
                                    "label" : "auto"
                                 }, {
                                    "value" : "decade",
                                    "label" : "decade"
                                 }, {
                                    "value" : "year",
                                    "label" : "year"
                                 }, {
                                    "value" : "month",
                                    "label" : "month"
                                 }, {
                                    "value" : "week",
                                    "label" : "week"
                                 }, {
                                    "value" : "day",
                                    "label" : "day"
                                 }, {
                                    "value" : "hour",
                                    "label" : "hour"
                                 }, {
                                    "value" : "30min",
                                    "label" : "30min"
                                 }, {
                                    "value" : "15min",
                                    "label" : "15min"
                                 }, {
                                    "value" : "10min",
                                    "label" : "10min"
                                 }, {
                                    "value" : "5min",
                                    "label" : "5min"
                                 }, {
                                    "value" : "minute",
                                    "label" : "minute"
                                 }, {
                                    "value" : "30sec",
                                    "label" : "30sec"
                                 }, {
                                    "value" : "15sec",
                                    "label" : "15sec"
                                 }, {
                                    "value" : "10sec",
                                    "label" : "10sec"
                                 }, {
                                    "value" : "5sec",
                                    "label" : "5sec"
                                 }, {
                                    "value" : "second",
                                    "label" : "second"
                                 } ]
                              },
                              "xlabel-angle" : {
                                 "title" : "X label angle",
                                 "type" : "number",
                                 "default" : 0,
                                 "description" : "The angle in degrees from horizontal to draw x-axis labels."
                              },
                              "xlabel-format" : {
                                 "title" : "X label format",
                                 "type" : "string",
                                 "description" : "A function that accepts Date objects and formats them for display as x-axis labels. Overrides the default formatter chosen by the automatic labeller or the xLabels option. function (x) { return x.toString(); }"
                              },
                              "ylabel-format" : {
                                 "title" : "Y label format",
                                 "type" : "string",
                                 "description" : "A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; }"
                              },
                              "goals" : {
                                 "title" : "Goals",
                                 "type" : "array",
                                 "description" : "A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0]",
                                 "items" : {
	                                 "type" : "number"
                                 }
                              },
                              "goal-stroke-width" : {
                                 "title" : "Goal stroke width",
                                 "type" : "number",
                                 "default" : 1.0,
                                 "description" : "Width, in pixels, of the goal lines."
                              },
                              "goal-line-colors" : {
                                 "title" : "Goal line colors",
                                 "type" : "array",
                                 "default" : [ '#666633', '#999966', '#cc6666',
                                       '#663333' ],
                                 "description" : "Array of color values to use for the goal line colors. If you list fewer colors here than you have lines in goals, then the values will be cycled.",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "events" : {
                                 "title" : "Events",
                                 "type" : "array",
                                 "description" : "A list of x-values to draw as vertical 'event' lines on the chart. ex: ['2012-01-01', '2012-02-01']",
                                 "items" : {
	                                 "type" : "string"
                                 }
                              },
                              "event-stroke-width" : {
                                 "title" : "Event stroke width",
                                 "type" : "number",
                                 "default" : 1.0,
                                 "description" : "Width, in pixels, of the event lines."
                              },
                              "event-line-colors" : {
                                 "title" : "Event line colors",
                                 "type" : "array",
                                 "default" : [ '#005a04', '#ccffbb', '#3a5f0b',
                                       '#005502' ],
                                 "description" : "Array of color values to use for the event line colors. If you list fewer colors here than you have lines in events, then the values will be cycled.",
                                 "items" : {
                                    "format" : "color",
                                    "type" : "string"
                                 }
                              },
                              "axes" : {
                                 "title" : "Axes",
                                 "type" : "string",
                                 "description" : "Set to false to disable drawing the x and y axes.",
                                 "default" : "true"
                              },
                              "grid" : {
                                 "title" : "Grid",
                                 "type" : "string",
                                 "description" : "Set to false to disable drawing the horizontal grid lines.",
                                 "default" : "true"
                              },
                              "grid-text-color" : {
                                 "title" : "Grid text color",
                                 "type" : "string",
                                 "description" : "Set the color of the axis labels (default: #888).",
                                 "format" : "color",
                                 "default" : "#888"
                              },
                              "grid-text-size" : {
                                 "title" : "Grid text size",
                                 "type" : "number",
                                 "description" : "Set the point size of the axis labels (default: 12).",
                                 "default" : 12
                              },
                              "grid-text-family" : {
                                 "title" : "Grid text family",
                                 "type" : "string",
                                 "description" : "Set the font family of the axis labels (default: sans-serif).",
                                 "default" : "Source Sans Pro",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "Arial",
                                    "label" : "Arial"
                                 }, {
                                    "value" : "Helvetica",
                                    "label" : "Helvetica"
                                 }, {
                                    "value" : "Times New Roman",
                                    "label" : "Times New Roman"
                                 }, {
                                    "value" : "Courier New",
                                    "label" : "Courier New"
                                 }, {
                                    "value" : "Courier",
                                    "label" : "Courier"
                                 }, {
                                    "value" : "Verdana",
                                    "label" : "Verdana"
                                 }, {
                                    "value" : "Georgia",
                                    "label" : "Georgia"
                                 }, {
                                    "value" : "Palatino",
                                    "label" : "Palatino"
                                 }, {
                                    "value" : "Garamond",
                                    "label" : "Garamond"
                                 }, {
                                    "value" : "Bookman",
                                    "label" : "Bookman"
                                 }, {
                                    "value" : "Comic Sans MS",
                                    "label" : "Comic Sans MS"
                                 }, {
                                    "value" : "Trebuchet MS",
                                    "label" : "Trebuchet MS"
                                 }, {
                                    "value" : "Arial Black",
                                    "label" : "Arial Black"
                                 }, {
                                    "value" : "Impact",
                                    "label" : "Impact"
                                 }, {
                                    "value" : "Sans-Serif",
                                    "label" : "Sans-Serif"
                                 }, {
                                    "value" : "Source Sans Pro",
                                    "label" : "Source Sans Pro"
                                 } ]
                              },
                              "grid-text-weight" : {
                                 "title" : "Grid text weight",
                                 "type" : "string",
                                 "description" : "Set the font weight of the axis labels (default: normal).",
                                 "default" : "normal",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "normal",
                                    "label" : "Normal"
                                 }, {
                                    "value" : "bold",
                                    "label" : "Bold"
                                 } ]
                              },
                              "date-format" : {
                                 "title" : "Date format",
                                 "type" : "string",
                                 "description" : "A function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }."
                              }
                           },
                           "required" : [ "xkey", "ykeys" ]
                        }
                     },
                     {
                        "name" : "donut",
                        "label" : "Donut Chart",
                        "class" : "scriptr-chart",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "type" : "donut",
                           "on-format-data": "return data;", 
                           "boxLabel" : "Donut Chart",
                           "transport" : "wss",
                           "data" : '[{label: "Drillers", value: 50}, {label: "Cranes",value: 20 }, {label: "Blasters", value: 30 }]',
                           "msg-tag" : "donut"
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 2,
                           minSizeX : 1,
                           minSizeY : 1
                        },
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAlCAYAAADBa/A+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTkzNjBBNzJFMkQ2MTFFNkIzQ0Y4MTdBRTNEODBCRUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTkzNjBBNzFFMkQ2MTFFNkIzQ0Y4MTdBRTNEODBCRUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI4MzFBMzJFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI4MzFBMzNFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4tt2jHAAAD40lEQVR42rSYXUgVQRTH773eyjAsTZM+VCjsiwpEKTXJtEgf9C0iCiqi6Is+yMc+1J7qwQKxFPShCCnRIKJMibLMUktDgqwQEiFKQ8yiLM28/Y+ONq67e2b3rgf+nKs7u/vbMzNnzozb5/O53G63ywkbaog4AFcMDUJd0HuoCXoA1XsTu4dVnzXCZQcuoabNA7cCWgqFQjOhsvrg1OPwOQa3fYRKoAJA9qnAeS0A0RdsgfZA6VCIpgkXlUVQHpSNCNMHFAJyyOwGjyIYQb2CqqHtOmBk/YrfGQxdguoAGWXW0MtABcFdhna7nLdEqAWAGYhgi6XIAYy6odECWL8NwDDoEQDjlOEAthDuMbTKwosGbUaQurlar4s9OmCz4KqgJRZfQhOiFnoItUK/LUawHIBeLnKF0BobEejD2HkCbYZi8fdsMatvqyYE6Jj8jwl5DlHLgLtvAahHRKuBJk5j+spBg+ScBHcdWsw87wcUjY/rnZCEARaAC2+hGAWoDugUdMsISAcwVHz4WqZpLuDytHCUv24ovIeWp2xAWZ6dAvAlE8FPUGRAQtewPOaOKDw/B1CH7ICNJFV0F9wuptkCKGV8QiBq0XDJzE2VgDrnb+YF4DO4O0yzTfJsTWca/9TOJD+tWGHmjsNtYBoXIWqfHYSrZZL2MhmOWwnKnVxU0bWUoNtNmsyT4SLNkist0FOw8HebXJsuVyWhJg070aW+KYA7Az01uPaBLZmkyDlurflZVL63GU3AuIr/cMMm5VOYa2qsfmxW6tgXKMIj1fdGFoM8GOgkVfPWfTSM1qlOiHZmcG50OGpU9pvtqnpluCbmYYcdhjuqUFiMw1UzjbPQtckOdWkmXBLT7LUMR+sdtwJcA+BcP8FoX1KquIKMwiGP0WwtYm6gMqcKgCF+gFEJH8E0/TNW8Mrpg+C+MTdSodgCwPWK+90gKdoHxQkBZ3fjK0t79Mr0k3D5isGgsucK7dIQ+QEN1HK4baKSoV6JLSy5SAt9MxTF7WcB1zjprESU6nUKA1a2AXFg8xWaJsr8cE0bemYaAFfDPxdnK3p2D2CZY2clE1YFROAv3A5mUdbaDLFbSxEfFa7Thkqys3gxbRn3GjznlzbFTFqyANgJR/TfHc5tp9EzqQC8id8X9HIprnWwO34A0thIE2ucU0bvKgNguNi5VUnXCgB2VfmsBIBUw8WJPalTNp+2BACh4bMTekFg0Am9xuzhoZgkNBZyxS7erg2Jg8XzIq+yh4fKJ5uAnCMg9zOVs57ViL3uG9UbbB27iiPXJLFji3eNHr9S1g+UIkRj9Z1IIRWAarMaZuL6J8AAXG5blin5AbwAAAAASUVORK5CYII=",
                        "form" : [ {
                           type : "tabs",
                           tabs : [ {
                              title : "Donut",
                              items : [ {
                                 "type" : "section",
                                 "htmlClass" : "row",
                                 "items" : [ {
                                    "type" : "section",
                                    "htmlClass" : "col-xs-6",
                                    "items" : [ "donut-formatter", {
                                       "key" : "background-color",
                                       "colorFormat" : "hex3"
                                    }, {
                                       "key" : "label-color",
                                       "colorFormat" : "hex3"
                                    } ]
                                 }, {
                                    "type" : "section",
                                    "htmlClass" : "col-xs-6",
                                    "items" : [ {
                                       "key" : "colors",
                                       "items" : [ {
                                          "key" : "colors[]",
                                          "colorFormat" : "hex3"
                                       } ]
                                    } ]
                                 } ]
                              } ]
                           }, {
                              title : "Box Properties",
                              items : [ "boxLabel" ]
                           } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Data",
                                 "type" : "string",
                                 "description" : "Data series in case of static data.",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
                                 }
                              },
                              "colors" : {
                                 "title" : "Colors",
                                 "type" : "array",
                                 "default" : [ "#CC5464", "#FCC717", "#38B9D6",
                                       "#1DBC68", "#E90088" ],
                                 "description" : "An array of strings containing HTML-style hex colors for each of the donut segments. Note: if there are fewer colors than segments, the colors will cycle back to the start of the array when exhausted.",
                                 "items" : {
                                    "type" : "string",
                                    "format" : "color"
                                 }
                              },
                              "label-color" : {
                                 "title" : "Donut Label Color",
                                 "type" : "string",
                                 "description" : "Donut label color.",
                                 "format" : "color",
                                 "default" : "#eeeeee"
                              },
                              "background-color" : {
                                 "title" : "Donut Background Color",
                                 "type" : "string",
                                 "description" : "Donut background color.",
                                 "format" : "color",
                                 "default" : "#ffffff"
                              },
                              "donut-formatter" : {
                                 "title" : "Donut Formatter",
                                 "type" : "string",
                                 "description" : "Can either be a string for a filter name (eg. 'currency') or a reference to a scope function.  The latter is not yet available."
                              }
                           },
                           "required" : []
                        }
                     },
                     {
                        "name" : "gauge",
                        "label" : "Gauge",
                        "class" : "scriptr-gauge",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "transport" : "wss",
                           "on-format-data": "return data;", 
                           "boxLabel" : "Gauge",
                           "msg-tag" : "gauge",
                        //   "data" : 30,
                           "api" : "UIComponents/dashboard/frontend/examples/gauge/getGaugeVal"
                        },
                        "box" : {
                           sizeX : 1,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1
                        },
                        "imgCls" : "gauge-img",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAlCAYAAADlcn/+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzVERDhERDJFN0I2MTFFNjk4RTNDOTE2MDRFNDhGQjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzVERDhERDFFN0I2MTFFNjk4RTNDOTE2MDRFNDhGQjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmM0MmUzZDAtZTJjNC1iMjQyLWJjZTItYThjYWQ3ZjkxMzAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlCd/HQAAAY7SURBVHja3FprbFRFFL67C6RVKVKtCVpJxVhk2XatBa0/fGIT5CEGw8O0kFaw8VH9YcQqGhSQBg0agqkC1RaRJkBiVOKDtIAvok1FKrXdauMDVMLD2iJYWh7u+p3ut2a83d1u5263207y9czemTt37jfnnDlzbm1GjEtNTU0SRA6QCbiANCAVSAGSTN1PAn8AvwMHgUagAajNzc09Gct522JEziSIe4BpgBuwWxzSCxwAPgJ2gLS6QUsUyLkcYhFQAIzr5/f4GdgEVIC0w4OCKBDkhFgKzAOGxdiyzwPbgFIQ5olLokCQ+JpSYH6sTDpM8QFbZcFA2MG4IAoEjYAooRYlGPFVurh4q0HYuQEjCiSJY64CJhrxXZqAPJB1QHcAuwWSHoGoGwQkGZxjHeccG42iqZUDC43BWd4CiqBdZ/uNKJA0SuIW4BZjcJfPgFkg66+om96z1V+Ngdg1BEiScqt/3WtSokpUzs6mUbu8STu2e0c7jKFTJgMf0kqsEwWSRtDcJn3nS8wCWfVDjKz36Xcta9Qbqrn1M1kdwFHgGOuxMsONlpw5tKkY4tVgbRm2zvq59vYsi7HNbmAv8D3QAud6xrR5SACbDkwAbgamANf2E2HFeH5Zn4kCSW7GSSHVcrytqzHP3ubqw9Yp2lIBbMakfrBwlpTQZDFwSRSJknDhhlBBqS2MX9ofSTCZbuvy5NvbnL2QdRxYJfEXJtIZpbPlhRAP8OiUEiWyRMuzgh13Qvmokkgj7hZfgnOLN9njC304fU34xMPXRYskKRirA1hLU9wQxQj+qYg0CtokWYDmvh5wg2iWZCbz8TLVsfDI0LC7IN6OgjnKQXqCOesQTKNKdbIAJs0SFc6OFUnUsI8hrufGYKUkkIPQGgVtEkfZaCWrkGnr/GCOvX0hJt4+EIERNOtSCSTFMVsYRtbbpSb/zBq11GLqpanBl7hgoEiiZrVCTLeoWTZy0VOjoE2S4z5k6KdvxSdl106d+Fs8hNzQrLHcuXV9lqSV0wI5eFWjFlkgSVQ1P15Iomb9CrHAwhDCxf3BTK/AwqCvg6RqI84KHbyV0KHgf6YHs5vMKFynSDCZDqJ65HYqKytl/KmG/3uefNwUjdtaWFjYaOonZl8EXAX8AqxHn6NK+0MQS7jKZWh7UWm7iBtQJa4vD2KCyfRXukHpjfLdMKBRsyywvioEScMh9hj+j5TFPHY8A3yLttlKv/GG/2Pmc+wjsgHXr2b7bQxaZUF+BFbj2jzlUY8DstOVhdCqtmDbfR/K3arpTdMcRFa9PFgDVleOAZ8CrYx2HwT+BBymib/CF22in2zm6r/M9jmUD8uwrN9HEpNJ1Bo8rzXMPMv5bJ3SzY0dZicm4dYcpALaFO5YskKiXDEVYAO1S0oyX3Q0TbO7L/rIgXklf09HuyTVruDvI2g/xPoYyie5O63t7bjDdJFOccv/S4jN5xj6X2M2h2vEi/nwsm1AtoQOwEw2vUfpUp69n7Je2XWczE1JuQzjBPoeR13IepTEXoDf8oUlEajCc5tDzLVE4x3lmTnyJ1M3uIQ2RZIqEY3dx93nYuAd+izDFOMEgtQTyjUxyXdZXwOsY12uPW34/9ulihvRcprhNyDNHUSrPBaC0Ew7V1Wn7I6w3zkeKQKrfC/wAuv/KP2Gm2T3vdCOnZDLgJuAGUwk7qHPk9TNfJrnYmYrE0mYlTmbi0uIStO8eW8knfCiHcAMQMzoCV5eglWXzOVhk/YYpm38CMcQ8xopJKD+GImTjWSjstBfou1r+qyMENP5QvNd04SoVM2be1VjkJEHqKZ9TKlfyfgn8A9hUyhvV0zRo/o7wIvxrmEYsQy/z1JjpTjowxwmTVVLs+a7pg6zEIi19EKSrOqb4pRRlzDhtLgKNp8SXyIvirZNqIuWrEDdSVPq3lEZYpjLSsZTW/h7H8OK2ZyTBLm1OnMOU1LsRs9/B4ykdMCRn+mlz0/c3RzUlpnM9cjheS5IOKFkLD7nPIooP6F5mcm/Tu4Fnsf955XdrIF+bzvN+aUQYYIk5XS+7iTphgWnIvBNpwHRjnEMEIsYvI2lg/7Ph9HchEzJgd8B3Cn3Bxl2JHfMbepz5JhBAuUQnIFr4Q7nf+u88L8CDAAOWg6lD3k11QAAAABJRU5ErkJggg==",
                        "form" : [ {
                           "type" : "tabs",
                           "tabs" : [
                                 {
                                    "title" : "Format",
                                    "items" : [
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-3",
                                                      "items" : [ "symbol" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-3",
                                                      "items" : [ "value-min-font-size" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-3",
                                                      "items" : [ "value-font-color" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-3",
                                                      "items" : [ {
                                                         "key" : "hide-value",
                                                         "type" : "radios-inline",
                                                         "titleMap" : [ {
                                                            "value" : "true",
                                                            "name" : "True"
                                                         }, {
                                                            "value" : "false",
                                                            "name" : "False"
                                                         } ]
                                                      } ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<hr/>"
                                                } ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-3",
                                                      "items" : [ "label" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-3",
                                                      "items" : [ "label-min-font-size" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-3",
                                                      "items" : [ "label-font-color" ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<hr/>"
                                                } ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "value-font-family" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "gauge-color" ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<hr/>"
                                                } ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   "key" : "format-number",
                                                   "type" : "radios-inline",
                                                   "titleMap" : [ {
                                                      "value" : "true",
                                                      "name" : "True"
                                                   }, {
                                                      "value" : "false",
                                                      "name" : "False"
                                                   } ]
                                                } ]
                                             }, {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "decimals" ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ {
                                                         "key" : "human-friendly",
                                                         "type" : "radios-inline",
                                                         "titleMap" : [ {
                                                            "value" : "true",
                                                            "name" : "True"
                                                         }, {
                                                            "value" : "false",
                                                            "name" : "False"
                                                         } ]
                                                      } ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "human-friendly-decimal" ]
                                                   } ]
                                          } ]
                                 },
                                 {
                                    "title" : "Min/Max",
                                    "items" : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "min",
                                                      "min-label-min-font-size",
                                                      {
                                                         "key" : "hide-min-max",
                                                         "type" : "radios-inline",
                                                         "titleMap" : [ {
                                                            "value" : "true",
                                                            "name" : "True"
                                                         }, {
                                                            "value" : "false",
                                                            "name" : "False"
                                                         } ]
                                                      } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "max",
                                                      "max-label-min-font-size",
                                                      {
                                                         "key" : "reverse",
                                                         "type" : "radios-inline",
                                                         "titleMap" : [ {
                                                            "value" : "true",
                                                            "name" : "True"
                                                         }, {
                                                            "value" : "false",
                                                            "name" : "False"
                                                         } ]
                                                      } ]
                                             } ]
                                    }

                                    ]
                                 },
                                 {
                                    "title" : "Sectors",
                                    "items" : [
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-4",
                                                "items" : [ {
                                                   "key" : "pointer",
                                                   "type" : "radios-inline",
                                                   "titleMap" : [ {
                                                      "value" : "true",
                                                      "name" : "True"
                                                   }, {
                                                      "value" : "false",
                                                      "name" : "False"
                                                   } ]
                                                } ]
                                             }, {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-4",
                                                "items" : [ {
                                                   "key" : "gauge-width-scale",
                                                   "step" : "0.1"
                                                } ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [

                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-4",
                                                      "items" : [ {
                                                         "key" : "donut",
                                                         "type" : "radios-inline",
                                                         "titleMap" : [ {
                                                            "value" : "true",
                                                            "name" : "True"
                                                         }, {
                                                            "value" : "false",
                                                            "name" : "False"
                                                         } ]
                                                      } ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-4",
                                                      "items" : [ "donut-start-angle" ]
                                                   }

                                             ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-4",
                                                      "items" : [ {
                                                         "key" : "no-gradient",
                                                         "type" : "radios-inline",
                                                         "titleMap" : [ {
                                                            "value" : "true",
                                                            "name" : "True"
                                                         }, {
                                                            "value" : "false",
                                                            "name" : "False"
                                                         } ]
                                                      } ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-4",
                                                      "items" : [ {
                                                         "key" : "level-colors",
                                                         "items" : [ {
                                                            "key" : "level-colors[]",
                                                            "colorFormat" : "hex3"
                                                         } ],

                                                         "style" : {
	                                                         "add" : "btn-primary btn-sm pull-left"
                                                         }
                                                      } ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-4",
                                                      "items" : [ {
                                                         "key" : "custom-sectors",
                                                         "title" : "",
                                                         "items" : [ {
                                                            "key" : "custom-sectors.percents",
                                                            "title" : "Custom percent",
                                                            "type" : "radios-inline",
                                                            "titleMap" : [
                                                                  {
                                                                     "value" : "true",
                                                                     "name" : "True"
                                                                  },
                                                                  {
                                                                     "value" : "false",
                                                                     "name" : "False"
                                                                  } ]
                                                         } ]
                                                      } ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-8",
                                                      "items" : [ {
                                                         "key" : "custom-sectors",
                                                         "title" : "",
                                                         "items" : [ {
                                                            "key" : "custom-sectors.ranges",
                                                            "title" : "Custom Ranges",
                                                            "style" : {
	                                                            "add" : "btn-primary btn-sm pull-left"
                                                            },
                                                            "items" : [ {
                                                               "type" : "section",
                                                               "htmlClass" : "row",
                                                               "items" : [

                                                                     {
                                                                        "type" : "section",
                                                                        "htmlClass" : "col-xs-3",
                                                                        "items" : [ {
                                                                           "key" : "custom-sectors.ranges[].color",
                                                                           "title" : "color",
                                                                           "colorFormat" : "hex3"
                                                                        } ]
                                                                     },
                                                                     {
                                                                        "type" : "section",
                                                                        "htmlClass" : "col-xs-4",
                                                                        "items" : [ {
	                                                                        "key" : "custom-sectors.ranges[].lo"
                                                                        } ]
                                                                     },
                                                                     {
                                                                        "type" : "section",
                                                                        "htmlClass" : "col-xs-4",
                                                                        "items" : [ {
	                                                                        "key" : "custom-sectors.ranges[].hi"
                                                                        } ]
                                                                     } ]
                                                            }

                                                            ]
                                                         } ]
                                                      } ]
                                                   } ]
                                          } ]
                                 },
                                 {
                                    "title" : "shadow",
                                    "items" : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-3",
                                                "items" : [ {
                                                   "key" : "show-inner-shadow",
                                                   "type" : "radios-inline",
                                                   "titleMap" : [ {
                                                      "value" : "true",
                                                      "name" : "True"
                                                   }, {
                                                      "value" : "false",
                                                      "name" : "False"
                                                   } ]
                                                } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-3",
                                                "items" : [ "shadow-size" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-3",
                                                "items" : [ {
                                                   "key" : "shadow-opacity",
                                                   "step" : "0.1"
                                                } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-3",
                                                "items" : [ "shadow-vertical-offset" ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    "title" : "Animation",
                                    "items" : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "start-animation-type",
                                                      "refresh-animation-type",
                                                      {
                                                         "key" : "counter",
                                                         "type" : "radios-inline",
                                                         "titleMap" : [ {
                                                            "value" : "true",
                                                            "name" : "True"
                                                         }, {
                                                            "value" : "false",
                                                            "name" : "False"
                                                         } ]
                                                      } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "start-animation-time",
                                                      "refresh-animation-time" ]
                                             } ]
                                    } ]
                                 }, {
                                    "title" : "Box Properties",
                                    "items" : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Static data",
                                 "type" : "number",
                                 "description" : "Gauge static value to show"
                              },
                              "value-font-color" : {
                                 "title" : "Value color",
                                 "type" : "string",
                                 "default" : "#999",
                                 "format" : "color",
                                 "description" : "Color of the gauge value text"
                              },
                              "min" : {
                                 "title" : "Gauge min",
                                 "type" : "number",
                                 "default" : 0,
                                 "description" : "Minimum gauge value."
                              },
                              "max" : {
                                 "title" : "Gauge max",
                                 "type" : "number",
                                 "default" : 100,
                                 "description" : "Maximum gauge value."
                              },

                              "hide-min-max" : {
                                 "title" : "Hide min/max",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Select true to hide min and max values (bool)"
                              },
                              "hide-value" : {
                                 "title" : "Hide value",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Select true to hide gauge value"
                              },

                              "show-inner-shadow" : {
                                 "title" : "Show shadow",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Show gauge inner shadow"
                              },

                              "gauge-color" : {
                                 "title" : "Gauge background",
                                 "type" : "string",
                                 "format" : "color",
                                 "description" : "Background color of gauge."
                              },
                              "custom-sectors" : {
                                 "title" : "Custom sectors",
                                 "type" : "object",
                                 "properties" : {
                                    "percents" : {
                                       "title" : "Percents",
                                       "type" : "string",
                                       "default" : "false",
                                       "description" : "Set to true for to have percent based sectors."
                                    },
                                    "ranges" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {
                                             "color" : {
                                                "title" : "Sector Color",
                                                "type" : "string",
                                                "format" : "color"
                                             },
                                             "lo" : {
	                                             "type" : "number"
                                             },
                                             "hi" : {
	                                             "type" : "number"
                                             }
                                          }
                                       }
                                    }
                                 }
                              },
                              "shadow-size" : {
                                 "title" : "Shadow size",
                                 "type" : "number",
                                 "default" : 5,
                                 "description" : "Gauge inner shadow size."
                              },
                              "shadow-opacity" : {
                                 "title" : "Shadow opacity",
                                 "type" : "number",
                                 "default" : 0.2,
                                 "description" : "Shadow opacity, values 0 ~ 1",
                                 "minimum" : 0,
                                 "maximum" : 1
                              },
                              "label" : {
                                 "title" : "Label",
                                 "type" : "string",
                                 "description" : "Text to show below gauge value."
                              },
                              "label-font-color" : {
                                 "title" : "Label color",
                                 "type" : "string",
                                 "description" : "Color of label under the value",
                                 "format" : "color"
                              },
                              "start-animation-type" : {
                                 "title" : "Start animation",
                                 "type" : "string",
                                 "default" : "linear",
                                 "description" : "Select type of initial animation.",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "linear",
                                    "label" : "linear"
                                 }, {
                                    "value" : ">",
                                    "label" : ">"
                                 }, {
                                    "value" : "<",
                                    "label" : "<"
                                 }, {
                                    "value" : "<>",
                                    "label" : "<>"
                                 }, {
                                    "value" : "bounce",
                                    "label" : "bounce"
                                 } ]
                              },
                              "refresh-animation-type" : {
                                 "title" : "Refresh animation",
                                 "type" : "string",
                                 "default" : "linear",
                                 "description" : "Select type of refresh animation.",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "linear",
                                    "label" : "linear"
                                 }, {
                                    "value" : ">",
                                    "label" : ">"
                                 }, {
                                    "value" : "<",
                                    "label" : "<"
                                 }, {
                                    "value" : "<>",
                                    "label" : "<>"
                                 }, {
                                    "value" : "bounce",
                                    "label" : "bounce"
                                 } ]
                              },

                              "value-font-family" : {
                                 "title" : "Gauge font family",
                                 "type" : "string",
                                 "default" : "Source Sans Pro",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "Arial",
                                    "label" : "Arial"
                                 }, {
                                    "value" : "Helvetica",
                                    "label" : "Helvetica"
                                 }, {
                                    "value" : "Times New Roman",
                                    "label" : "Times New Roman"
                                 }, {
                                    "value" : "Courier New",
                                    "label" : "Courier New"
                                 }, {
                                    "value" : "Courier",
                                    "label" : "Courier"
                                 }, {
                                    "value" : "Verdana",
                                    "label" : "Verdana"
                                 }, {
                                    "value" : "Georgia",
                                    "label" : "Georgia"
                                 }, {
                                    "value" : "Palatino",
                                    "label" : "Palatino"
                                 }, {
                                    "value" : "Garamond",
                                    "label" : "Garamond"
                                 }, {
                                    "value" : "Bookman",
                                    "label" : "Bookman"
                                 }, {
                                    "value" : "Comic Sans MS",
                                    "label" : "Comic Sans MS"
                                 }, {
                                    "value" : "Trebuchet MS",
                                    "label" : "Trebuchet MS"
                                 }, {
                                    "value" : "Arial Black",
                                    "label" : "Arial Black"
                                 }, {
                                    "value" : "Impact",
                                    "label" : "Impact"
                                 }, {
                                    "value" : "Sans-Serif",
                                    "label" : "Sans-Serif"
                                 }, {
                                    "value" : "Source Sans Pro",
                                    "label" : "Source Sans Pro"
                                 } ],
                                 "description" : "Font family of the gauge."
                              },
                              "value-min-font-size" : {
                                 "title" : "Value size",
                                 "type" : "number",
                                 "default" : 12,
                                 "description" : "Minimum font size for the value."
                              },
                              "label-min-font-size" : {
                                 "title" : "Label size",
                                 "type" : "number",
                                 "default" : 12,
                                 "description" : "Minimum font size for the label."
                              },
                              "min-label-min-font-size" : {
                                 "title" : "Min label size",
                                 "type" : "number",
                                 "default" : 12,
                                 "description" : "Minimum font size for the minimum label."
                              },
                              "max-label-min-font-size" : {
                                 "title" : "Max label size",
                                 "type" : "number",
                                 "default" : 12,
                                 "description" : "Minimum font size for the maximum label."
                              },
                              "gauge-width-scale" : {
                                 "title" : "Width scale",
                                 "type" : "number",
                                 "default" : 1,
                                 "description" : "Gauge width scale."
                              },
                              "shadow-vertical-offset" : {
                                 "title" : "Shadow vertical offset",
                                 "type" : "number",
                                 "default" : 3,
                                 "description" : "Defines how much is shadow offset from top."
                              },
                              "level-colors" : {
                                 "title" : "Level colors",
                                 "type" : "array",
                                 "minItems" : 1,
                                 "items" : {
                                    "type" : "string",
                                    "format" : "color"
                                 },
                                 "format" : "color",
                                 "default" : [ "#a9d70b", "#f9c802", "#ff0000" ],
                                 "description" : "Colors of indicator, from lower to upper."
                              },
                              "relative-gauge-size" : {
                                 "title" : "Relative gauge size",
                                 "type" : "string",
                                 "default" : "true",
                                 "description" : "Set to true to use sector-based color change, false to use gradual color change."
                              },
                              "no-gradient" : {
                                 "title" : "No gradient",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Set to true to use sector-based color change, false to use gradual color change."
                              },
                              "start-animation-time" : {
                                 "title" : "Start animation time",
                                 "type" : "number",
                                 "default" : 700,
                                 "description" : "Duration of initial load animation in ms."
                              },
                              "refresh-animation-time" : {
                                 "title" : "Refresh animation time",
                                 "type" : "number",
                                 "default" : 700,
                                 "description" : "Length of refresh animation in ms."
                              },
                              "donut" : {
                                 "title" : "Donut",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Turn the gauge into a full circle donut."
                              },
                              "donut-start-angle" : {
                                 "title" : "Donut start angle",
                                 "type" : "number",
                                 "default" : 90,
                                 "description" : "Angle to start from when in donut mode."
                              },
                              "width" : {
                                 "title" : "Width",
                                 "type" : "number",
                                 "description" : "Gauge width"
                              },
                              "height" : {
                                 "title" : "Height",
                                 "type" : "number",
                                 "description" : "Gauge height."
                              },
                              "reverse" : {
                                 "title" : "Reverse",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Set to trueto swap max and min (with max appearing on the left, min on the right)."
                              },
                              "decimals" : {
                                 "title" : "Decimals",
                                 "type" : "number",
                                 "default" : 0,
                                 "description" : "Quantity of decimal numbers to show."
                              },
                              "symbol" : {
                                 "title" : "Symbol",
                                 "type" : "string",
                                 "description" : "Unit of measure that will be appended to value."
                              },
                              "format-number" : {
                                 "title" : "Format number",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Set to true to format numbers."
                              },
                              "human-friendly" : {
                                 "title" : "Human friendly",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Set to true to show shorthand big numbers (300K instead of 300XXX)."
                              },
                              "human-friendly-decimal" : {
                                 "title" : "Human friendly decimals",
                                 "type" : "number",
                                 "default" : 0,
                                 "description" : "Number of decimal places for our human friendly number to contain."
                              },
                              "pointer" : {
                                 "title" : "Pointer",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Set to true to show value pointer."
                              },

                              "counter" : {
                                 "title" : "Counter",
                                 "type" : "string",
                                 "default" : "false",
                                 "description" : "Set to true to increase numbers one by one."
                              }
                           },
                           "required" : [ "level-colors" ]
                        }
                     },
                     {
                        "name" : "speedometer",
                        "label" : "Speedometer",
                        "class" : "scriptr-speedometer",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "transport" : "wss",
                           "boxLabel" : "Speedometer",
                           "on-format-data": "return data;", 
                           "data" : 45,
                           "msg-tag" : "speedometer"
                     //     ,"api" : "UIComponents/dashboard/frontend/examples/speedometer/getSpeedometerVal"
                        },
                        "box" : {
                           sizeX : 1,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1
                        // , maxSizeY: 2
                        },
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0U0RkEwQjZFN0I3MTFFNjhGMEZBOEREMDEzMkY1NjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0U0RkEwQjVFN0I3MTFFNjhGMEZBOEREMDEzMkY1NjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmM0MmUzZDAtZTJjNC1iMjQyLWJjZTItYThjYWQ3ZjkxMzAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poq6iGcAAAS7SURBVHjazFhpbA1RFJ432qq1VUtUqK1FSGiUJ2jkWZ7YfpTG1ibULvHDnhA/hPhhDz+IJVWaWqKpNhEifRJCEY9KNSpEiiIhllL6qkFT3+FMnd4+rTfz+p6TfDkz584955szZ87cuTbNgrhcrhZQw4CxwFCgP9ADiAB0oAb4DLwEHgP3gCvAXafTWWM2rs0k2SFQC4C5QBcTLt4Cp4EMkL/frKRBNgFqCzBV859cADaDfKFfSYNsJNR2YKmXObVAMXCNdWnrgsL40Bev936PiV5TlZhQBFtfYDAwhrU3H0eADSD/yTJpEB4BdQbopQw9Aw4DJxHolRy4m7woCSoXmD4sJz1P8dcdKhVYBvRWfD4H5sDf7cY46U0QJufXJWHd81Vr5S5247AfnO9QCTcldD3No/nkh/wJoTjXOa7vpDFxBVQWECrMB9pnX8oNv/fQ3uHQmVFWCpnmkx/yR37FEMXL4vj/Xh6YMA/qhDBROlKRoVw8+p44fsQtLAGP3+fWBR/UKgu5RQ6AjzLEnE6lBrQSl85HzMwmM43JlMF0YXoPOIgwnVAAKHq81PbGm0z0eJ6/g/1p7N/B8QxJZz5/J40LOkKdBULY5KH2BoduZR6RTkTAfDOMeV4i+5H17uZ26mET8TjLvLyXBwYzoNKEaYaR4UAKl8o5YToOHgsakMaFo6EK/nTO2v3OiRNXaUESV37+Ps1mWylMiSB+Qy2PrXU1U1mlRR7LGYcXxhEMwhSX4hMPb/xsnOXhUHV1i1aUgx46hd9kKo+1qMNnASBLH5s99FGijvXVPvhi9dCByeISO7J9x8j0EjFQigtnUfMHTgFJvHILhPTgeBS3H3jMJj5i/BdPG7IcBv0OaM8D63E3u8XdxyHLTwJYGvXigd86qF18SsvczpTpkYJwLX8FZXt6Esh69hIvi3lpzHOkzgt4Q4qR5TfafyTMp1iYxhLpeGG4auGxDgBszcRd8orX+ftvyEMLjgcCB5uJuOTVn0hHC8NTC46p8S+n9QIviPwpklc0dQ+jyLU2rhtHwkpfvhYXbMeLUe1DiVB76sMta56ZFSD7Cae/GOP8W9+Ybh7nqLq2HCIvblFRuVSZvw+o9iHeLSadwsHNEifSm//w+tJglffDOPGMG+Gk9blAhYkSMYSIZ5oslQrJw+OwTxBjNZTpcmMboCYqsi0y88lC7V1Wzol4FIinwO9HH3o1lWwdD9fyOW3F8Add+UzG+eHDUKaYJwElID7FgutYcVymK+3E7oc3vcCLjToU/arFms2HOH5ApG8Kg4O3uqzIo7/Yw3hHytcfAhv/hhni1pU67MQbKlbkQyNjESb80b5LV3kfOr7tL6g7CeNii6Qb2966acLfQnFcAr6lxno6QwzMxCOJsfAyurm/q5LHPxS+lEYn3o3SJE+DdKboyaG8yWili6yGSuad0WzOVjK3Ml9kI9Ba7AwcV39sN0FtE+vqMXgUBUH7sXW5BkEVia82bcFtUH9s92u/N7+Nm8nAxIggEW7Ji/8Q8XLvbLBZg7uohFqhNPSDQUp0mrLOp1/Acq87TBg4D3VImKYFibRck+eAl2wU9Vd5LLRBQ91jMpdMMOQor/Ta8ZZCPfkpwABkBJ8fXRbYywAAAABJRU5ErkJggg==",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "min/max",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "min-value",
                                                      "max-value" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "tick-space-maj-val",
                                                      "tick-space-min-val" ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Format",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-4",
                                                "items" : [ "tick-col-maj",
                                                      "outer-edge-col",
                                                      "needle-col",
                                                      "default-fonts" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-4",
                                                "items" : [ "tick-col-min",
                                                      "inner-col",
                                                      "gauge-units" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-4",
                                                "items" : [ "tick-label-col",
                                                      "pivot-col",
                                                      "units-label-col" ]
                                             } ]
                                    } ]
                                 }, {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Static data",
                                 "type" : "number",
                                 "description" : "Sets the value of needle to be pointed."
                              },
                              "min-value" : {
                                 "title" : "Minimum Value",
                                 "type" : "number",
                                 "description" : "Minimum value to be shown in gauge scale.",
                                 "default" : 0
                              },
                              "max-value" : {
                                 "title" : "Maximum Value",
                                 "type" : "number",
                                 "description" : "Maximum value to be shown in gauge scale.",
                                 "default" : 220
                              },

                              "tick-space-min-val" : {
                                 "title" : "Minor Tick Space Value",
                                 "type" : "number",
                                 "description" : "Space between the major ticks of the gauge.",
                                 "default" : 10
                              },
                              "tick-space-maj-val" : {
                                 "title" : "Major Tick Space Value",
                                 "type" : "number",
                                 "description" : "Space between the sub ticks of the gauge.",
                                 "default" : 20
                              },
                              "gauge-units" : {
                                 "title" : "Gauge Units",
                                 "type" : "string",
                                 "description" : "Unit of the values to be shown(ex. Kmph,%)."
                              },
                              "tick-col-maj" : {
                                 "title" : "Tick Major Color",
                                 "type" : "string",
                                 "description" : "Sets color of the major tick.",
                                 "format" : "color",
                                 "default" : "#C64DFF"
                              },
                              "tick-col-min" : {
                                 "title" : "Tick Minor Color",
                                 "type" : "string",
                                 "format" : "color",
                                 "description" : "Sets color of the sub tick.",
                                 "default" : "#999999"
                              },
                              "outer-edge-col" : {
                                 "title" : "Outer Edge color",
                                 "type" : "string",
                                 "description" : "Sets the color of outer circle of the gauge.",
                                 "format" : "color",
                                 "default" : "#f4f4f4"
                              },
                              "pivot-col" : {
                                 "title" : "Pivot color",
                                 "type" : "string",
                                 "description" : "Sets color of the pivot.",
                                 "format" : "color",
                                 "default" : "#434a54"
                              },
                              "inner-col" : {
                                 "title" : "Inner color",
                                 "type" : "string",
                                 "description" : "Sets color of inner body of the gauge.",
                                 "format" : "color",
                                 "default" : "#fff"
                              },
                              "units-label-col" : {
                                 "title" : "Units Label Colour",
                                 "type" : "string",
                                 "description" : "Sets color of units label.",
                                 "format" : "color",
                                 "default" : "#C64DFF"
                              },
                              "tick-label-col" : {
                                 "title" : "Tick Label Colour",
                                 "type" : "string",
                                 "description" : "Sets color of labels of the ticks.",
                                 "format" : "color",
                                 "default" : "#656D78"
                              },
                              "needle-col" : {
                                 "title" : "Needle Colour",
                                 "type" : "string",
                                 "description" : "Sets color of the needle.",
                                 "format" : "color",
                                 "default" : "#C64DFF"
                              },
                              "default-fonts" : {
                                 "title" : "Default Fonts",
                                 "type" : "string",
                                 "description" : "Sets the default fonts in gauge.",
                                 "default" : "Source Sans Pro",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "Arial",
                                    "label" : "Arial"
                                 }, {
                                    "value" : "Helvetica",
                                    "label" : "Helvetica"
                                 }, {
                                    "value" : "Times New Roman",
                                    "label" : "Times New Roman"
                                 }, {
                                    "value" : "Courier New",
                                    "label" : "Courier New"
                                 }, {
                                    "value" : "Courier",
                                    "label" : "Courier"
                                 }, {
                                    "value" : "Verdana",
                                    "label" : "Verdana"
                                 }, {
                                    "value" : "Georgia",
                                    "label" : "Georgia"
                                 }, {
                                    "value" : "Palatino",
                                    "label" : "Palatino"
                                 }, {
                                    "value" : "Garamond",
                                    "label" : "Garamond"
                                 }, {
                                    "value" : "Bookman",
                                    "label" : "Bookman"
                                 }, {
                                    "value" : "Comic Sans MS",
                                    "label" : "Comic Sans MS"
                                 }, {
                                    "value" : "Trebuchet MS",
                                    "label" : "Trebuchet MS"
                                 }, {
                                    "value" : "Arial Black",
                                    "label" : "Arial Black"
                                 }, {
                                    "value" : "Impact",
                                    "label" : "Impact"
                                 }, {
                                    "value" : "Sans-Serif",
                                    "label" : "Sans-Serif"
                                 }, {
                                    "value" : "Source Sans Pro",
                                    "label" : "Source Sans Pro"
                                 } ]
                              }
                           },
                           "required" : []
                        }
                     },
                     {
					    "name" : "thermometer",
                           "label" : "Thermometer",
                           "class" : "scriptr-thermometer",
                           "commonData" : true,
                           "show" : true,
                           "defaults" : {
                              "transport" : "wss",
                              "on-format-data" : "if(data && data instanceof Array && data[0].value) return data[0].value; else return data;",                     
                              "schema-for" : "thermometer",
                              "fetch-data-interval" : 300, // in seconds
                              "data" : 20,
                              "boxLabel" : "Thermometer",
                              "boxBorder" : true,
                              "step" : 40,
                              "unit" : "°C",
                              "custom-sectors" : [ {
                                 "color" : "#005588",
                                 "lo" : 0,
                                 "hi" : 40
                              }, {
                                 "color" : "#00953c",
                                 "lo" : 40,
                                 "hi" : 80
                              }, {
                                 "color" : "#ce2029",
                                 "lo" : 80,
                                 "hi" : 120
                              } ]
                           },
                           "box" : {
                              sizeX : 1,
                              sizeY : 2,
                              minSizeX : 1,
                              minSizeY : 2,
                              maxSizeX : 5
                           },
                           "imgCls" : "",
                           "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzgzODQxMTZGNzg1MTFFNjk0MTBGMzg4MzJCMkQ5QjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzgzODQxMTVGNzg1MTFFNjk0MTBGMzg4MzJCMkQ5QjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoB6+/wAAAIXSURBVHja7JnNK0RRGMbv+I6QLIyIZvgjSInFlPKRyCR2WFiQj60k/wBGEmWyVcNuFjQrC1aytlCiRKFZmRDG8/LcuqahyT3NvVf3rafnfLzn3t/czjm3e8aTTCa1v4bH4/lWj8ViHbA5qAmSCx9DC4FA4NCYZ+aen/dVBQ3gSdhqmrR3KAjwPVtBA9gPO4Py2fVKz6M/QPUAf1QBnaOpiX4DcAgqp0Jsq4RaFd1LGXQN/RyaxRNNiKTMNokqu0HrcQ3Yd73C8rXieyiHzkrkqb4gFqUPtszqjCOgMSUuYL2GH6G508OFdqGzv3s0wrZYHXPK7iFvwDZ393Ch/8tCPOkf9cI6WN2POwH6trig3Zt42WZ5qNAJ0wPAN+nK7kJ0oR0GXZpBTp1toPGaHoaNZJC6yFxroQFRDVtn9R6aT5M2zz6JTYyptfpJT0Fl2tcRWHfFxs4TPGzoD6PtWfqYU6Liu9EsdA/9AHCn8F3Ib+iXcoR9ByljLINuoMsBY/MPi62OfYcpYyyD1se/QL+9sQuZI/FmNfQlXY52jwwLzhj37GtKGWMZdJTeFx8flEOaoPZ1QqqHlIPs60sZYxn0EiQ7Rq7AAO6Oi6+T8rMtypwnjjEVps+nse+OGj5kZb5GOB0kWqABAn9+6OIbMmyXQ3UBX4OKfkiVJzwhwFKx098XsrVNQ12Qj80XnBorAL7Sc81CfwgwAJTrtj6gcXkiAAAAAElFTkSuQmCC",
                           "form" : [ {
                              type : "tabs",
                              tabs : [
                                    {
                                       title : "Format",
                                       items : [ {
                                          "type" : "section",
                                          "htmlClass" : "row",
                                          "items" : [
                                                {
                                                   "type" : "section",
                                                   "htmlClass" : "col-xs-12 col-sm-6",
                                                   "items" : [
                                                         "unit",
                                                         {
                                                            "key" : "out-of-range-color",
                                                            "colorFormat" : "hex3",
                                                            "spectrumOptions" : {
                                                               showInput : true,
                                                               showAlpha : false,
                                                               allowEmpty : true,
                                                               showPalette : true,
                                                               preferredFormat : 'hex3',
                                                               palette : [
                                                                     [ '#fce94f', '#fcaf3e',
                                                                           '#e9b96e' ],
                                                                     [ '#8ae234', '#729fcf',
                                                                           '#ad7fa8' ],
                                                                     [ '#ef2929', '#888a85',
                                                                           '#deface' ] ]
                                                            }
                                                         } ]
                                                },
                                                {
                                                   "type" : "section",
                                                   "htmlClass" : "col-xs-12",
                                                   "items" : [
                                                         {
                                                            "type" : "section",
                                                            "htmlClass" : "",
                                                            "items" : [ "step" ]
                                                         },
                                                         {
                                                            "type" : "section",
                                                            "htmlClass" : "",
                                                            "items" : [ {
                                                               "key" : "custom-sectors",
                                                               "title" : "Temperature Level Fill Colors",
                                                               "items" : [ {
                                                                  "type" : "section",
                                                                  "htmlClass" : "row",
                                                                  "items" : [
                                                                        {
                                                                           "type" : "section",
                                                                           "htmlClass" : "col-xs-4",
                                                                           "items" : [ {
                                                                              "key" : "custom-sectors[].color",
                                                                              "colorFormat" : "hex3",
                                                                              "spectrumOptions" : {
                                                                                 showInput : true,
                                                                                 showAlpha : false,
                                                                                 allowEmpty : true,
                                                                                 showPalette : true,
                                                                                 preferredFormat : 'hex3',
                                                                                 palette : [
                                                                                       [
                                                                                             '#fce94f',
                                                                                             '#fcaf3e',
                                                                                             '#e9b96e' ],
                                                                                       [
                                                                                             '#8ae234',
                                                                                             '#729fcf',
                                                                                             '#ad7fa8' ],
                                                                                       [
                                                                                             '#ef2929',
                                                                                             '#888a85',
                                                                                             '#deface' ] ]
                                                                              }
                                                                           } ]
                                                                        },
                                                                        {
                                                                           "type" : "section",
                                                                           "htmlClass" : "col-xs-4",
                                                                           "items" : [ {
                                                                               "key" : "custom-sectors[].lo"
                                                                           } ]
                                                                        },
                                                                        {
                                                                           "type" : "section",
                                                                           "htmlClass" : "col-xs-4",
                                                                           "items" : [ {
                                                                               "key" : "custom-sectors[].hi"
                                                                           } ]
                                                                        } ]
                                                               } ]
                                                            } ]
                                                         } ]
                                                } ]
                                       } ]
                                    }, {
                                       title : "Box Properties",
                                       items : [ "boxLabel" ]
                                    } ]
                           } ],
                           "schema" : {
                              "type" : "object",
                              "title" : "Schema",
                              "properties" : {
                                 "data" : {
                                    "title" : "Thermometer Value",
                                    "type" : "string",
                                    "description" : "Thermometer Value (0 to 100)"
                                 },
                                 "height" : {
                                    "title" : "Height",
                                    "type" : "number",
                                    "description" : "Set the height of Thermometer."
                                 },
                                 "unit" : {
                                    "title" : "Unit",
                                    "type" : "hidden",
                                    "default" : "°C",
                                    "description" : "Set the unit value of Thermometer."
                                 },
                                 "out-of-range-color" : {
                                    "title" : "Out Of Range Color",
                                    "type" : "string",
                                    "description" : "Set the default color for out of range values (default: #005588).",
                                    "format" : "color",
                                    "default" : "#ffef00",
                                    "validationMessage" : "Invalid Color"
                                 },
                                 "custom-sectors" : {
                                    "title" : "Custom sectors",
                                    "type" : "array",
                                    "items" : {
                                       "type" : "object",
                                       "properties" : {
                                          "color" : {
                                             "title" : "Color",
                                             "type" : "string",
                                             "format" : "color",
                                             "required" : true,
                                             "validationMessage" : "Invalid Color"
                                          },
                                          "lo" : {
                                             "title" : "Low",
                                             "type" : "number",
                                             "required" : true
                                          },
                                          "hi" : {
                                             "title" : "High",
                                             "type" : "number",
                                             "required" : true
                                          }
                                       }
                                    }
                                 },
                                 "step" : {
                                    "title" : "Interval",
                                    "type" : "number",
                                    "description" : "Set the interval value between ticks."
                                 },
                                 "boxLabel" : {
                                    "title" : "Box Label",
                                    "type" : "string",
                                    "description" : "Define your widget box title.",
                                    "maxLength" : 40
                                 },
                                 "boxBorder" : {
                                    "title" : "Box Border",
                                    "type" : "hidden",
                                    "default" : "true",
                                    "description" : "Define your widget box border."
                                 }
                              },
                              "required" : []
                           }
                     },
                     {
                        "name" : "odometer",
                        "label" : "Odometer",
                        "class" : "scriptr-odometer",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "transport" : "wss",
                           "boxLabel" : "Odometer",
                           "msg-tag" : "odometer",
                           "data" : 28022017,
                           // "api" : "UIComponents/dashboard/frontend/examples/odometer/getOdometerVal",
                           "animation" : "count",
                           "on-format-data": "return data;", 
                           "duration" : 1000,
                           "size" : "2"
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1,
                           maxSizeY : 2
                        },
                        "imgCls" : "odometer-img",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAAlCAYAAABF7RcQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0MzlBMzQxRTdCNjExRTZCREVBQURCRkE1MTI4QTFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0MzlBMzQyRTdCNjExRTZCREVBQURCRkE1MTI4QTFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQzOUEzM0ZFN0I2MTFFNkJERUFBREJGQTUxMjhBMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQzOUEzNDBFN0I2MTFFNkJERUFBREJGQTUxMjhBMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75PGiuAAAGNUlEQVR42uxbeWwUVRj/bbdb2i6lpaUnUEoPrAWkHBYhCBpvjPGKMWAkROMZE9SoqPEPE0X/gMQrIWokYEwwKonGKK0RQyReGKRQKCAKrQiLtF2uHtuybdfv62M7+2Z3dneOLWwzv2RC38yb2Xnf77vf4AisxXIA6+nIho3LFWfoeMJBZPEfObY8Ln/CUmyikgbjU2wZJA9Sw87ULLelooWj9UDvGWVcfhuQPl4ZL14LjC1RxjtfB7wHNSSfAdz8kXyuYSUw6FfGBzZLl23LshK9p+Wxu0R77ljVNX+XTFQE2GRZie6T8jivRntubrXq3v9iPt4my0qcPaIiazrgcEaem18b/d64Yla8YDMuqqN/JwJp44QJ97QBHfuA9j1AIGBu4UXzgIwJ8jnvIeB8q8mcaho9ez4JMRiHvpHjkBm07xXrdlx8eFoWUHwN4PlZJTuSWd6Vqnv3JICsjDzgimVAyYLI18tuATqPAY3vAV0eY4vOKgVmr6JFqwz/4CfGyRo3BZh2H1AwWz5/fId1ZF04L4Qe+hvV99O5RopJPWLMRNasgKItEL/f0WyxG8wlbVj0hjZRocKuexlwjTWwYlrEjIfCiTKKzEKg9il67zXhRCUCR76Wx+mk3FevpmSjWHigmY8BE2bIc1q2kkUOWGxZrDkpqbJGsOlzJsPuhY/hl6SUtnwp8Ofn+hY7+Tp6TpUFUrtIOj/PMYKh+cxh4MRPwMRFyrmcSmDJusjzO48D/3xvsM6Khq4TQNOHwKwniYTPgNbvZI2oeZDc4K3KuGCOPrJY86qXyQvJmmRQahQ7MgtkojjjYoULVapEoHkTud1S4WGigV1j47sxU3bj2eDJncCPz0U23aPfqlxQvr5nV1NB7nKLvwcuUFH4sTmhHftB8QjN9KwdLwDnjibeuvp9VBC/KaxMCz4v8PsaYQCGOxjxwNeu4SY7w5Q7/nhIdceka5XxX1sou2w3J7RTfwCHvxAegAU4kmAF+e01WtMS4YrHlQkr51rM8yu9Uz29U6/JdpMZuAt1F3oivDhFfAmCM76WBop7uebehy3/768uXd0VGAT+3S6OYCZooqSxNvKyFumsHYZQfruoPYYWSIvZtyGu7CjpYLL2tI6s7DJRYwXBMefYtjjqNip8K+9Wxq0NIxNXkhDWuMEx2cCcp+XWCseKeIrN6SsBZ5oSdA9vGX1SdmWS55hMpuEUjYK+s5eIrNRMUQBn5MsZY0t97HsL58mFavNGssje0UNSsNtTXCcrsvcAcOhT3R7EHFlsEXWr5VqobTewd33sVJDvnb5CGZ9rFUSF9szGqDaxM4uU610nDWvoiICz27nPKqVIKLgbv/BVYP9GJflIKFks7HnPi+o8CG7i7n6Hirz+OArgbNGKCY1581+Jfs+Um8TBaPpA9PUuR3BriWWTmh49A575sFC4tsYEJhhDru8leb+GLWrXuviIGs3gWmrW4+FE+TpEg1vdEpv5SGTrs8Syhoh6kSyqQjnn+YVc3/ujM93Wi+IFsrcZ6qRsEx0UrrsmLQauehTDXXdOzirupBi22WKyIhHl7xb7WJV3Rb6n2yMq9khdkK0PxAjQlLRc/7Yy5i0SLpbjBW+L8BGKYD03nOTMlefwJqCOFlAYKu6Qx9xy2r9JieHsurMoM5y6VJlTegMV71/G7LLoI4vrqFCihtJStzZRwZZPJLJGApxtVt0TfU7VvfKYFcIoWbwhy0SEghve6mSLuyqlNyolC7vMgtqYctIXsxz2VwBRod6qZ49z+lD4PPZGp3bJ5+LYa9NnWf3dIlDqATc0DbdnBuTf8+tsxhp5X7+Jhq/a63Q0ac9tp2slC0NcdpnFZHG80BMzzII/7dq+yvj9I/2+vH8WCq4dtaD+PMFdlKDU3YZG7ZilUjav9lyfN7zuivEZhE2WtUWWyqX2RHHRPbpzApushHLniN7BCIvR/Tpj1oWuTlvKGhgccEsK7u/pRoprcHjsPZCJrFKFhUDAR/KMzEB6TgrFNLeUTHW3d6rSfMmv8v/PCtgsJAdsN5hkZHlsMSQFPByzuEH3Fh1TbXlYof4uF5xpaRSDBtDf16f94QVlHy63GylOJwb9firGfVE+0mih45n/BRgA2iDYoASd98UAAAAASUVORK5CYII=",
                        "form" : [ {
                           type : "tabs",
                           tabs : [ {
                              title : "Odometer behaviour",
                              items : [ "duration", "animation", "size" ]
                           }, {
                              title : "Box Properties",
                              items : [ "boxLabel" ]
                           } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Static data",
                                 "type" : "number",
                                 "description" : "Set a static value for Odometer."
                              },
                              "duration" : {
                                 "title" : "Duration",
                                 "type" : "number",
                                 "description" : "Change how long the javascript expects the CSS animation to take."
                              },
                              "size" : {
                                 "title" : "Size",
                                 "type" : "number",
                                 "default": 2,
                                 "description" : "Odometer size in em. Recommended size between 0 & 5."
                              },
                              "animation" : {
                                 "title" : "Animation",
                                 "type" : "string",
                                 "description" : "Count is a simpler animation method which just increments the value,use it when you're looking for something more subtle."
                              }
                           },
                           "required" : []
                        }
                     },
                     {
                        "name" : "progressbar",
                        "label" : "ProgressBar",
                        "class" : "scriptr-progressbar",
                        "commonData" : true,
                        "show" : false,
                        "defaults" : {
                           "transport" : "wss",
                           "msg-tag" : "progressbar",
                       //    "api" : "UIComponents/dashboard/frontend/examples/progressBar/getProgressBarVal",
                           "value" : "20",
                           "animate" : "true",
                           "on-format-data": "return data;", 
                           "title" : "Progress bar",
                           "class" : "progress-striped active"
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1,
                           maxSizeY : 1
                        },
                        "imgCls" : "",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzIwMzYyNENGNzg1MTFFNkEwRUNDNjZDRjJCNDk3Q0YiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzIwMzYyNEJGNzg1MTFFNkEwRUNDNjZDRjJCNDk3Q0YiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnTLjfAAAAHGSURBVHja7JffK0NhGMe3mRWLbBEXLshc0eHOnbh2Q4miSC1kSpblbyBEWpRtRbI7/Aei3LhQfl65k/zI7581NN+3nlOvpzPjzup569Pznn3O8+57zt5zavZkMmnLtOGwZeCQ0BJaQktoCS2hJbSEltBphrM7etCCGgYJ7fMsUMrOfQNXNM8FRczfgweau0HhH/0deEyzvsoQcFDg+iW/UWaC4zhr+ARN5HzgiHl1MQb5SnD8g/dZ+AtQRb4CHDJ/CapVTpXXqe4wTj4xbVdkvx0lxJpGcc4GzcdAg+Y+QBv8KR1P0eKp/ATz76AV/pyOx0GjRf8Z5Ut829P4wECJscBxNEyS70AJMh+C3yTfgzLIfFDznShDzA/Db2s3jK8/Ar9l+SCiwYOyTvvJHHvAT74WJcIWXMaC0+TrUOaZj8HPkq9BWWB+ET5MXv38UYv1Z6zeHtloUPtwBZRr7hY0o+kV3ov5GsjR/C7opS8sQVkFLs3vgAHyqfr7yReQd7Mb1sd2gnoeXHZM1NtjDhSzC3oGNzTPA17m1UU90TwfeJi/Bi+/7Ld6m+jeHOqmBOzyb1xCS2gJLaEltISW0BJaQv+P8SXAADiWmlqqypMfAAAAAElFTkSuQmCC",
                        "form" : [ {
                           type : "tabs",
                           tabs : [ {
                              title : "Progress bar behaviour",
                              items : [ "stacked", "class", "type", "max", {
                                 "key" : "animate",
                                 "type" : "radios-inline",
                                 titleMap : [ {
                                    value : "true",
                                    name : "True"
                                 }, {
                                    value : "false",
                                    name : "False"
                                 } ]
                              } ]
                           }, {
                              title : "Box Properties",
                              items : [ "boxLabel" ]
                           } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Progressbar Value",
                                 "type" : "number",
                                 "description" : "The current value of progress bar."
                              },
                              "animate" : {
                                 "title" : "Animate",
                                 "type" : "string",
                                 "description" : "Whether bars use transitions to achieve the width change."
                              },
                              "class" : {
                                 "title" : "Class",
                                 "type" : "string",
                                 "description" : "Can take 'progress-striped' or 'progress-striped active'"
                              },
                              "type" : {
                                 "title" : "Type",
                                 "type" : "string",
                                 "description" : "Bootstrap style type. Possible values are 'success', 'info', 'warning', and, 'danger' to use Bootstrap's pre-existing styling, or any desired custom suffix."
                              },
                              "max" : {
                                 "title" : "Total number of bars",
                                 "type" : "string",
                                 "description" : "A number that specifies the total value of bars that is required.",
                              },
                              "stacked" : {
                                 "title" : "Stacked",
                                 "type" : "string",
                                 "description" : "Array of objects representing multiple stacked progress bars.",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "[{value : 50, type : 'success', title : 'bar1'},{value : 70, type : 'warning', title : 'bar2'}]"
                                 }
                              }
                           },
                           "required" : []
                        }
                     },
                     {
                        "name" : "map",
                        "label" : "Map",
                        "class" : "scriptr-map",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "on-format-data": "return data;", 
                           "transport" : "wss",
                           "boxLabel" : "Map",
                           "clustered-view" : "true",
                           "cluster-zoom" : 8,
                           "heatmap" : "true",
                           "bounce" : "true",
                           "resize" : "false",
                           "data" : '{ "253812" : { "550153" : [ { "lat" : {"value": "40.84969"}, "long" :{"value": "-73.94168"}, "bounce": {"value" : "true"}, "speed" : { "value" : "8", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "30", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.3", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2818", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "91", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.99", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "61","description" : "Received Signal Strength Indicator" } }, { "lat" :{"value": "40.84919"}, "long" : {"value": "-73.93897000000001"}, "speed": { "value" : "5", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "57", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.4","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2838", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "94", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.15", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55101"}, "make" : { "value" : "Toyota" }, "model" : { "value" : "Tacoma" },"snr" : { "value" : "9", "description" : "Signal to Noise Ratio" },"rssi" : { "value" : "48", "description" : "Received Signal StrengthIndicator" } }, { "lat" : {"value": "40.848600000000005"}, "long" :{"value": "-73.93648"}, "speed" : { "value" : "9", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "76", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.2", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2465", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "97", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.39", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "69","description" : "Received Signal Strength Indicator" } } ], "source" :"simulator", "order" : [ "550153" ] }, "253815" : { "550191" : [ { "lat": {"value": "40.80913"}, "long" : {"value": "-73.90327"}, "speed" : {"value" : "7", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "56", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.2","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2123", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "100", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.45", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55043"}, "make" : { "value" : "Saab" }, "model" : { "value" : "9-3" }, "snr" :{ "value" : "13", "description" : "Signal to Noise Ratio" }, "rssi" : {"value" : "49", "description" : "Received Signal Strength Indicator" }}, { "lat" : {"value": "40.807500000000004"}, "long" : {"value":"-73.90557000000001"}, "speed" : { "value" : "6", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "16", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.7", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "1946", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "95", "description" :"Engine Temperature" }, "voltage" : { "value" : "12.87", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55043" }, "make" : { "value" : "Saab" },"model" : { "value" : "9-3" }, "snr" : { "value" : "13", "description" :"Signal to Noise Ratio" }, "rssi" : { "value" : "59", "description" :"Received Signal Strength Indicator" } } ], "source" : "simulator","order" : [ "550191" ] } }',
                           // "api" : "UIComponents/dashboard/frontend/examples/map/simulatorData",
                           "sources-info" : '{"simulator": {"label": "Carvoyant"}}',
                           "msg-tag" : "everyone-main-live"
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 2,
                           minSizeX : 2,
                           minSizeY : 2
                        },
                        "imgCls" : "",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkU0NTdGMTJGMUU1MTFFNkJDRDE5REMyQjEzM0VEQzYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkU0NTdGMTFGMUU1MTFFNkJDRDE5REMyQjEzM0VEQzYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phrv2GYAAAP1SURBVHja7JlrSFRBFMfnqklWW5qP0NK2KCgqo6DACntpRQ8MAwtK+tBLiygiqCiIDAyjD/Uhn5VFH8oUKYuCMiUqS4JKgojIrdQv+SDDtJe72//ocZu97euuXlfBgT9nd+48fvfMzNmZWcVqtQo5KYoi+jr9qYpIgNkDLYZCoG9QFZQ3bEHjLWf11Gw2Rj2hARsIkw9tdVGMoDcDvt1TaD+hb7rgBphSElSEF/SYRTdoQKyESbUbxeFGoYxdJZSgqeria8jbnrYdoKOX99p5x5gh/CJ3/Rv6phvCXLsfH8xy+as+9TTSUpuHQ9fZAXflhacIvwi7gZiH0RnhM2h0boCxASjByxxHgZAEdVaEz6ARCdpg2mwZlp+OC1o67L5BzdEP0sI1Q6NSFjSpD9jv2eZvcwkzqZgxr6X0CC/7HbYU/VdA8501/F+cjilPpwwrd5oD3a1PzLV4QomOpsOkQKdMI0sXwlbYOgpbL/yNJzEMmAGdrcJSlyksX67I1TdObk+ugX3Xk1GXkKNoiR5UeDXrE2DyYC8CvskBaCTMJg5vczi7HiqEXtAC6/b2TdHZXIYeRwthbpOjBqUP5GFoDFQpL2JvQ56RPAedAGAxbDb0Bkrm2LpcNc1olOIw1JewIA/J3u6aIvCyg3QU5TuFyG1BH2XuoF0txGPQTqiGvwcy5FPoK3QZSpTaIK8eJOdjRHbwgqxkD7pKj6FiLYvFlafb0XkBbAHePg52N89XgvfnMo3QOfoZRtlaJ+3sg1ZAoxxFRygNL2fVAu1RyAPQM4jm7ATosBTOKD/TBTB5uwHmgJPHx/H8rdawpClO00KEsvDRpDFu04jdVmXTNDvtTSzVe5cnp208nQSPVCpexjygoQHYxNtUmr/p+P7R27b609MCPx7VMEtgy3vTTr9CI50B8A8+zQwa6FCKONDEwQQtpBg/qKDFEPQQ9BD0wIAOw84x1tvKAf1FCcgpfKCgNJ726ch7wke6EmzEfg8IaEBRTF5Lew3eU6vPfItYZ1GWrtDyfAYNgHEw2yG6oYlWPX5IBwtoFpehsnRtcASi41lDb6DnovNgDFurBth49uoG2thJj6gNOnpno733nFeE8hl81qQ68bzGYtz14+wKoSfRbco16Dw6eyXBvYaZLbqvaelEs4WPYzNV7b+kutB11O9w88IzuA1qz+DqCsERNJ3p0qBpqrLVfBKnG5bnDE175CDV+e8XQdICA2i1F1PLwE5IB3SsR9B0qY6KCh/j6c2TVNOohQ+3BlVbJo4EhYBt6Yu14fU/AXiBKL5KoGuBKPXNFnSHYe97ehOlO7QEH8Bep/9OaP5RiMoH6Ge9QqYz6L8CDAAxBVRygRGqnQAAAABJRU5ErkJggg==",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "Map behaviour",
                                    items : [
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                            {
                                                               "key" : "clustered-view",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "heatmap",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            "cluster-zoom",
                                                            "clustered-zoom-max",
                                                            "detailed-zoom-min", ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                            {
                                                               "key" : "marker-info-window",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "bounce",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            "focused-marker-zoom",
                                                            "path-stroke-opacity",
                                                            "path-stroke-weight",
                                                            "max-asset-points" ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [

                                                "sources-info",
                                                      "default-center", ]
                                             }

                                             ]
                                          }

                                    /** "detailed-zoom-min", * */

                                    /** , "tracked-asset"* */
                                    ]
                                 },
                                 /**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
											 * { title: "Geofence behaviour", items: [ "geofence-manager", "api-geofence", "api-geofence-params", "msg-tag-geofence"] },
											 *********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
                                 {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 },
                                 {
                                    title : "Help",
                                    items : [ {
                                       "type" : "help",
                                       "helpvalue" : "<div class=\"alert alert-info\"><h4>Map data format is as below, where: <br/> <br/>\"253831\": asset id, <br/> <br/> \"550488\": asset trip id & contains an array  of asset trip points data,  <br/> <br/>  \"order\" : [ \"550488\" ]\r\n   contains the asset's trips order <br/> <br/>and \"source\" : \"simulator\" is the asset source name.  </h4></div> <pre class=\"map-help-settings\">{\"253831\" : {\r\n      \"550488\" : [\r\n            {\r\n               \"lat\" : {\"value\": \"40.859140000000004\"},\r\n               \"long\" : {\"value\": \"-72.67528\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"6\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"57\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"0.9\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"2181\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"104\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"13.38\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"11\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"46\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            },\r\n            {\r\n               \"lat\" : {\"value\": \"40.859790000000004\"},\r\n               \"long\" : {\"value\": \"-72.67344\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"11\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"23\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"1.6\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"1498\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"87\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"13.68\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"10\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"49\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            },\r\n            {\r\n               \"lat\" : {\"value\": \"40.86056000000001\"},\r\n               \"long\" : {\"value\": \"-72.67124000000001\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"15\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"32\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"1.8\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"1323\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"91\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"14.30\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"13\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"57\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            } ],\r\n      \"source\" : \"simulator\",\r\n      \"order\" : [ \"550488\" ]\r\n   } }</pre>"
                                    } ]
                                 }, ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "clustered-view" : {
                                 "title" : "Clustered View",
                                 "type" : "string",
                                 "description" : "Render map with a cluster view for conglomerate markers or not."
                              },
                              "cluster-zoom" : {
                                 "title" : "Cluster Zoom",
                                 "type" : "number",
                                 "description" : "The initial map zoom level when clustered view is true.",
                                 "default" : 3
                              },
                              "heatmap" : {
                                 "title" : "Heat Map",
                                 "type" : "string",
                                 "description" : "Enable/disable heat map."
                              },
                              "bounce" : {
                                 "title" : "Bounce",
                                 "type" : "string",
                                 "description" : "Enable/disable bouncing."
                              },
                              "clustered-zoom-max" : {
                                 "title" : "Cluster Zoom Max",
                                 "type" : "number",
                                 "description" : "Map max zoom level with a rendered cluster view.",
                                 "default" : 11
                              },
                              "focused-marker-zoom" : {
                                 "title" : "Focused marker zoom",
                                 "type" : "number",
                                 "description" : "Zoom level when focusing on a single marker. If not set it is equal to detailed map zoom + 3.",
                              },
                              "detailed-zoom-min" : {
                                 "title" : "Detailed map initial zoom",
                                 "type" : "number",
                                 "description" : "Ignored when clustered view true.",
                                 "default" : 0
                              },
                              "max-asset-points" : {
                                 "title" : "Max marker trip points",
                                 "type" : "string",
                                 "description" : "Number of tracked trip points per marker, do not set if infinite.",
                                 "default" : 100
                              },
                              "marker-info-window" : {
                                 "title" : "Show marker info",
                                 "type" : "string",
                                 "description" : "Whether to show an info window on marker click.",
                                 "default" : "true"
                              },
                              "default-center" : {
                                 "title" : "Default Map Center",
                                 "type" : "string",
                                 "description" : "Default map center before marker(s) is/are loaded. String format lat,long.",
                                 "default" : "40.7053111,-74.258188"
                              },
                              "sources-info" : {
                                 "title" : "Sources Info",
                                 "type" : "string",
                                 "description" : "Sources Info.ex: {'stream': {'label': 'Carvoyant', 'url': 'http://icons.iconarchive.com/icons/graphicloads/flat-finance/32/lock-icon.png'}}",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "{'stream': {'label': 'Carvoyant', 'url': 'http://icons.iconarchive.com/icons/graphicloads/flat-finance/32/lock-icon.png'}}"
                                 }
                              },
                              "data" : {
                                 "title" : "Markers data",
                                 "type" : "string",
                                 "description" : "Static markers data",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : '{ "253812" : { "550153" : [ { "lat" : {"value": "40.84969"}, "long" :{"value": "-73.94168"}, "speed" : { "value" : "8", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "30", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.3", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2818", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "91", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.99", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "61","description" : "Received Signal Strength Indicator" } }, { "lat" :{"value": "40.84919"}, "long" : {"value": "-73.93897000000001"}, "speed": { "value" : "5", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "57", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.4","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2838", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "94", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.15", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55101"}, "make" : { "value" : "Toyota" }, "model" : { "value" : "Tacoma" },"snr" : { "value" : "9", "description" : "Signal to Noise Ratio" },"rssi" : { "value" : "48", "description" : "Received Signal StrengthIndicator" } }, { "lat" : {"value": "40.848600000000005"}, "long" :{"value": "-73.93648"}, "speed" : { "value" : "9", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "76", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.2", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2465", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "97", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.39", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "69","description" : "Received Signal Strength Indicator" } } ], "source" :"simulator", "order" : [ "550153" ] }, "253815" : { "550191" : [ { "lat": {"value": "40.80913"}, "long" : {"value": "-73.90327"}, "speed" : {"value" : "7", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "56", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.2","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2123", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "100", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.45", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55043"}, "make" : { "value" : "Saab" }, "model" : { "value" : "9-3" }, "snr" :{ "value" : "13", "description" : "Signal to Noise Ratio" }, "rssi" : {"value" : "49", "description" : "Received Signal Strength Indicator" }}, { "lat" : {"value": "40.807500000000004"}, "long" : {"value":"-73.90557000000001"}, "speed" : { "value" : "6", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "16", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.7", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "1946", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "95", "description" :"Engine Temperature" }, "voltage" : { "value" : "12.87", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55043" }, "make" : { "value" : "Saab" },"model" : { "value" : "9-3" }, "snr" : { "value" : "13", "description" :"Signal to Noise Ratio" }, "rssi" : { "value" : "59", "description" :"Received Signal Strength Indicator" } } ], "source" : "simulator","order" : [ "550191" ] } }'
                                 }
                              },
                              "path-stroke-opacity" : {
                                 "title" : "Path stroke opacity",
                                 "type" : "number",
                                 "description" : "Default marker trail opacity.",
                                 "default" : 0

                              },
                              "path-stroke-weight" : {
                                 "title" : "Path stroke weight",
                                 "type" : "number",
                                 "description" : "Default marker trail stroke weight.",
                                 "default" : 1
                              }
                           },
                           "required" : []
                        }
                     },
                     {
                        "name" : "accelerometer",
                        "label" : "Accelerometer",
                        "class" : "scriptr-accelerometer",
                        "commonData" : true,
                        "show" : true,
                        "defaults" : {
                           "transport" : "wss",
                           "msg-tag" : "accelerometer",
                           "on-format-data": "return data;" 
                      //     ,"api" : "UIComponents/dashboard/frontend/examples/accelerometer/getAccelerometerData"
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 2,
                           minSizeX : 2,
                           minSizeY : 2,
                        },
                        "imgCls" : "",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTI4ODA3MjA1MjlCMTFFNzhFN0Q4OUFFNTNCQjg5MTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTI4ODA3MUY1MjlCMTFFNzhFN0Q4OUFFNTNCQjg5MTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsAn8koAAANsSURBVHja7FjrSxRRHJ2ddd0MAqOHbU8Rkixcem3kqlQilSV+0B4g1caWSYj6ITD8C6QPRSkSZS1thWBphFQWSA9WM7IXK2UUlJW1RUGCkK2ru52f/AyRHuPcO5HghcNhZueec2bm3t/euaZIJKJQM5lMiqz2IG/PWtAtYN3KhtO3ZekOZ1WVcdgmQvv9/llAhjnDuZ6OiemYzsv0iZIQNB5UAOQCi4bmxzybwlwOKufrnoMuATV2u71LxNOkdyIixAxQBbCb5gjQBNwAHoU8F2ZH3gXqEXqLxb3tA84tBzYAWWQFnKGbQfjPeiairtAITObngCnAUeAIAnz6W/VAvzjQAaAU6AV2ol+T4dUDxvtAV4A3QDJMD44M/KdG1wFl1I/7X4VemaETEQa7QCeARiANAV7oGZPc7zwPlUOsKz80hFfQJAKuA9th3CcweVdTWOAy69WwvrzQEKQq4wECQD4C9wsEngaqB14D9ITzWdfDPtKetJveKlCEwF8FqySFJo1caPWyXhHru6WUPNw9/UA19gsMUo1ae8CnFTSdaj18IqLVg8ZfIlBl8L9zFfukyBgem4AQVwwjWyP7ZMkIvQpoxyv7ptW9xRpOfmIJD/EYyiDpt7OfcOgEoFOrucvlKnlsCVf6rGGFmI7H8LQ72U/bRJzfvJ+K/dzRFyyx2FJ7wn2B94M9r7S4pl/8nmIJRqKHj0NWU79v66Q2LX3nmGMTYtUY29NQoPUXP3e/zTy+Y9yup7WUvJegOxhze7UOD9CxEadKvV5vpcaydwq0Bl4LRUseDYskrU+BAi4LqSXpQVUh1hqYWxL7CU/E+4ADT2GyVue0oNqxNKQO8Rj+3knfwX7Coa8BFiDH4KGawz5NMkLfA2gpWWxw6GL2aRMOzeuAw4ATr3CzEWlZ10k+v1t36Fnl0bLUD1TDYKrkwKRXzfoeaUtT3P0ALxvpM7sWRtGSApNOLeu62UfelwsEH/JWwUagDoYxgoGpfx3rFbC+/G9ECJ8FFfJMb4Fxos7A1K+FdQpZ17gdJhicBGUDC4AOBKAP05kaw8bR9dSP+2ez3sRmja5tsXBXtzLgbVCiXHmKGv9z4Si8LSYt9OgNSNDiQV975uDNu+XmDGeFOd3RjHPPEPSjqL4hoUU+bA3dFvsf2kTof9V+CDAAygmYxsVKnggAAAAASUVORK5CYII=",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "Data",
                                    items : [ "transport", "msg-tag", "api",
                                          "api-params", "data",
                                    // "on-format-data"
                                    ]
                                 }, {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "data" : {
                                 "title" : "Data",
                                 "type" : "string",
                                 "description" : "X,Y,Z Value"
                              },
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                           },
                           "required" : []
                        }
                     },
                     {
                        "name" : "grid",
                        "label" : "Grid",
                        "class" : "scriptr-grid",
                        "show" : true,
                        "defaults" : {
                           "columns-definition" : '[{headerName: "Name", field: "name"},{headerName: "Model", field: "model"},{headerName: "Price", field: "price"}]',
                           "row-data" : '[{name: "Toyota", model: "Celica", price: 35000},{name: "Ford", model: "Mondeo", price: 32000},{name: "Porsche", model: "Boxter", price: 72000}]',
                           "enable-sorting" : "true",
                           // "api":'UIComponents/dashboard/frontend/examples/grid/gridAPI',
                           "enable-delete-row" : 'true',
                           "boxLabel" : "Grid",
                           // "row-model-type":'pagination',
                           // "grid-height":"300",
                           "fixed-height" : "false",
                           "enable-add-row" : 'true',
                           "msg-tag" : "grid",
						   "on-format-data": "return data;",	
                           "cell-editable" : 'true',
                           "enable-client-side-filter" : 'true',
                           "enable-server-side-filter" : 'false',
                           "enable-server-side-sorting" : 'false',
                           "row-model-selection" : 'multiple',
                           "pagination-page-size" : '20',
                           "transport" : 'https'
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 2,
                           minSizeX : 2,
                           minSizeY : 1,
                           maxSizeY : 4
                        },
                        "imgCls" : "grid-img",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAlCAYAAADr2wGRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjcyMDZGOUNFMkQ4MTFFNkFCMDVFNzRFRDY1MTM5NTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjcyMDZGOUJFMkQ4MTFFNkFCMDVFNzRFRDY1MTM5NTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI4MzFBMzJFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI4MzFBMzNFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zhsgjAAAA1klEQVR42mK8fPnyf4YhDpgYhgEY9cSoJ0Y9MeqJUU+MegIfYAHiQoZRMAqoAhhl92Q0kKl3wmOXGR9ADKAZBUBKgAwzFgDNeAA1IwFIKZCbJ+rJ9MQCIP4AZYM8IU+GGQeA+AGUDfKE/WgRO+qJUU+MemLUE6OeoEUD8CCZen8gsU8gVVqkgA9I7AujDajh0AB0IFPvCWDj7Qe08WYBpDjIMOMCUiPSgMxGJDhP7CfTE4pI+WAFmQ1AR2gjENwqHm0Ajnpi1BOjnhj1xKgnRj2BAwAEGADGZCnIfk5TtQAAAABJRU5ErkJggg==",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "Data",
                                    items : [
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "transport" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                            {
                                                               "key" : "msg-tag",
                                                               "condition" : "model.transport=='wss'"
                                                            } ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "api" ]
                                             }, {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "api-params" ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
	                                                "key" : "columns-definition"
                                                }, {
	                                                "key" : "row-data"
                                                } // ,"on-format-data"
                                                ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<hr>"
                                                } ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<div class=\"alert alert-info\"><ul><li>Messages published over the subscibe channel need to have the following format in order to be consumed by a widget:<ul><li>{“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”}</li></ul></li><li>A script would publish a message  over the subscribe channel as follow:<ul><li>publish(“responseChannel”, {“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”});</li></ul></li><li>Whether https or wss transport is used, Sciptr API should return the static data structure for widget initial load:<ul><li>return &lt;static data structure&gt;;</li></ul></li></ul></div>"
                                                } ]
                                             } ]
                                          }

                                    ]
                                 },
                                 {
                                    title : "Grid behaviour",
                                    items : [
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ 
                                                          {
                                                               "key" : "pagination",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            }
                                                ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                            "row-model-selection",
                                                            {
                                                               "key" : "enable-client-side-sorting",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "enable-client-side-filter",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "suppress-filter",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "enable-add-row",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "enable-delete-row",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "cell-editable",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            }, ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                            "pagination-page-size",
                                                            {
                                                               "key" : "enable-server-side-sorting",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "enable-server-side-filter",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            },
                                                            {
                                                               "key" : "enable-col-resize",
                                                               "type" : "radios-inline",
                                                               titleMap : [
                                                                     {
                                                                        value : "true",
                                                                        name : "True"
                                                                     },
                                                                     {
                                                                        value : "false",
                                                                        name : "False"
                                                                     } ]
                                                            }, "add-params",
                                                            "delete-params",
                                                            "edit-params" ]
                                                   } ]
                                          } ]
                                 },
                                 {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 },
                                 {
                                    title : "Help",
                                    items : [ {
                                       "type" : "help",
                                       "helpvalue" : "<div class=\"alert alert-info\"><h4>The expected params sent from the grid are: <br/> <br/>\"filterColumnName \": The column name where to filter. <br/> <br/> \"resultsPerPage\": Number of row to return from the API.  <br/> <br/>  \"pageNumber\" : Number of the page.<br/> <br/> \"sort\": Sorting direction (asc, desc).<br/> <br/> \"sortType\": numeric or string.<br/> <br/> \"queryFilter\": Criteria value to search for. <br/> <br/> \"queryType\": Query types are startsWith, endsWith, contains, equals and notEquals.  <br/> <br/>  \"sortingColumnName\" : The sorting column name.<br/> <br/> \"action \" : action types are add, edit and delete.<br/> <br/></h4> <pre>The expected returned data structure from a service API is as follows:  <br/> <br/>{\r\n \t\"count\": \"500\",\r\n \t\"documents\": [\r\n \t\t{\r\n \t\t\t\"key\": \"C91918B97B1EAA7A97D8435611452666\",\r\n \t\t\t\"name\": \"Toyota\",\r\n \t\t\t\"model\": \"Celica\",\r\n \t\t\t\"price\": \"35000\"\r\n \t\t},\r\n \t\t{\r\n \t\t\t\"key\": \"DC2BEB691E480C22886AEC708D5A19A5\",\r\n \t\t\t\"name\": \"Ford\",\r\n \t\t\t\"model\": \"Mondeo\",\r\n \t\t\t\"price\": \"32000\"\r\n \t\t}\r\n \t\t]\r\n}</pre></div>"
                                    } ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "columns-definition" : {
                                 "title" : "Columns definition",
                                 "type" : "string",
                                 "description" : "Series of data (Each column in the grid is defined using a column definition).",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "[{'headerName': 'Name', 'field': 'name'}, {'headerName': 'Model', 'field': 'model'}, {'headerName': 'Price', 'field': 'price', 'type': 'numeric'}]"
                                 }
                              },
                              "row-data" : {
                                 "title" : "Row data",
                                 "type" : "string",
                                 "description" : "You pass static data to the grid.",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "[{'name': 'Golf', 'model': 'GT', 'price' : '10000'}, {'name': 'BMW', 'model': 'Z3', 'price' : '20000'}]"
                                 }
                              },
                              "enable-client-side-sorting" : {
                                 "title" : "Enable client Side Sorting",
                                 "type" : "string",
                                 "description" : "Turn on client sorting for the grid."
                              },
                              "enable-server-side-sorting" : {
                                 "title" : "Enable Server Side Sorting",
                                 "type" : "string",
                                 "description" : "Turn on server sorting for the grid."
                              },
                              "enable-client-side-filter" : {
                                 "title" : "Enable Client Side Filter",
                                 "type" : "string",
                                 "description" : "Turn on client side filter."
                              },
                              "enable-server-side-filter" : {
                                 "title" : "Enable Server Side Filter",
                                 "type" : "string",
                                 "description" : "Turn on server side filter."
                              },
                              "enable-add-row" : {
                                 "title" : "Enable Add Row",
                                 "type" : "string",
                                 "description" : "Turn on insert row."
                              },
                              "enable-delete-row" : {
                                 "title" : "Enable Delete Row",
                                 "type" : "string",
                                 "description" : "Turn on delete row."
                              },
                              "cell-editable" : {
                                 "title" : "Cell Editable",
                                 "type" : "string",
                                 "description" : "Turn on cell editing."
                              },
                              "enable-col-resize" : {
                                 "title" : "Enable Column Resize",
                                 "type" : "string",
                                 "description" : "Enable column resize."
                              },
                              "pagination" : {
                                 "title" : "Enable Pagination",
                                 "type" : "string",
                                 "description" : "Enable Pagination."
                              }, 
                              "row-model-type" : {
                                 "title" : "Row Model Type",
                                 "type" : "string",
                                 "description" : "The supported ways are 'virtual' and 'pagination' for only non-static data",
                                 "default" : "pagination",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "virtual",
                                    "label" : "virtual"
                                 }, {
                                    "value" : "pagination",
                                    "label" : "pagination"
                                 } ]

                              },
                              "row-model-selection" : {
                                 "title" : "Row Model Selection",
                                 "type" : "string",
                                 "description" : "Set to either 'single' or 'multiple' in case of backend data.",
                                 "default" : "Source Sans Pro",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "single",
                                    "label" : "single"
                                 }, {
                                    "value" : "multiple",
                                    "label" : "multiple"
                                 } ]
                              },
                              "pagination-page-size" : {
                                 "title" : "Pagination Page Size",
                                 "type" : "string",
                                 "description" : "Number of rows per page."
                              },
                              "suppress-filter" : {
                                 "title" : "Suppress filer",
                                 "type" : "string",
                                 "description" : "Hide column filter."
                              },
                              "api" : {
                                 "title" : "Api",
                                 "type" : "string",
                                 "description" : "Name of the api to get data.",
                                 "x-schema-form" : {
	                                 "placeholder" : "UIComponents/dashboard/frontend/examples/grid/getCarsInfo"
                                 }
                              },
                              "on-format-data" : {
                                 "title" : "Format Data",
                                 "type" : "string",
                                 "description" : "Callback function to be called after data is returned from backend."
                              },
                              "transport" : {
                                 "title" : "Transport",
                                 "type" : "string",
                                 "enum" : [ "wss", "https" ],
                                 "description" : "Method used to call api (can take 'http' or 'wss')."
                              },
                              "msg-tag" : {
                                 "title" : "Message Tag",
                                 "type" : "string",
                                 "description" : "Subscribe to socket messages with tag name."
                              },
                              "api-params" : {
                                 "title" : "Api Params",
                                 "type" : "string",
                                 "description" : "Api parameters.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              },
                              "add-params" : {
                                 "title" : "on-add API Params",
                                 "type" : "string",
                                 "description" : "On add API params.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              },
                              "delete-params" : {
                                 "title" : "on-delete API Params",
                                 "type" : "string",
                                 "description" : "On delete API params.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              },
                              "edit-params" : {
                                 "title" : "on-edit API Params",
                                 "type" : "string",
                                 "description" : "On edit API params.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              }
                           },
                           "required" : [ "columns-definition" ]
                        }
                     },
                     {
                        "name" : "toggleSwitch",
                        "label" : "Toggle Switch",
                        "class" : "scriptr-toggle-switch",
                        "show" : true,
                        "defaults" : {
                           "boxLabel" : "Toggle Switch",
                           "switch-status" : "false",
                           "knob-label" : "TV",
                           "on-label" : "ON",
                           "off-label" : "OFF",
                           "on-format-data": "return data;", 
                           "on-switch-change" : "vm.onChange",
                           "transport" : "wss",
                           "msg-tag" : "toggle"
                        // ,"api" : "UIComponents/dashboard/frontend/examples/toggleSwitch/getToggleSwitchVal"
                        },
                        "box" : {
                           sizeX : 1,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1,
                           maxSizeY : 1,
                           maxSizeX : 1
                        },
                        "imgCls" : "",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0RCQTE1RUU1MUI2MTFFN0FFNDlEMTM4RTRFODYwMkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0RCQTE1RUQ1MUI2MTFFN0FFNDlEMTM4RTRFODYwMkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk9fI0kAAAIXSURBVHja7Jg/SAJxFMe9H2pDQ4PRDZHU1OZkUIu0OESIbqFLZYtEczTYVEO4CVEOkTmktBnR5BItBW5uTYXpoOTg4NA/7PvgFRJWnnE/Ovo9+PI79E4+9+793vueWrvdtlkthM2CoaAVtIJW0P8IWuv2YalUGsQShkLQFDQikakOFaE8lPN4PK0foQG8jCUBDUNN6BKqQjUJwDo0CvmgIegBWgd4uis0YO1YDqBF6AaKrzVOrm9fGrM4dvNpZahw70+ZegNgcWAJQtvQJJSBVgD/+hn6iIFTgE0AdgvHkS5Pg8xKFtoAfMVkeCeWJBQjcEAvfUBzSRwS8Hxtj9YzflTfBWU7APCi2TUDvn0Gj1KpaLzp7qAGMjyHDF/1ANwJ7pWU8RLkgsYFlwBtujiXhG5w4+yYnWlk94n4mDMsuOCbtOn4BoxGZKwQ0yV0llPuZiHBffiSu4TWZ6/3S8j2M7ffKcGDo9rR1voJt01OEOeIZb1HnadQ+Re/U5bES5x1wXPeN2F3XfDgMBp0TUFCr3bweC8K3pVDu66FaZ50RiNr9ljnCLIfyQsGJWOyjWxvGjRGdO6GhCw72YcQZ06w9VsnY4Js0xroEfx9jFckZDnJxokcX0twD0yzk4qd66tRZHwGx8df1Hibv/Oa7Tsowx2+I/NuUa1tTXt4CXiUUAYDhl4CLPW6pf6AVNAKWkEr6D8dbwIMAG8Y3AV944YCAAAAAElFTkSuQmCC",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "Data",
                                    items : [
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "transport" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                            {
                                                               "key" : "msg-tag",
                                                               "condition" : "model.transport=='wss'"
                                                            },
                                                            {
                                                               "key" : "http-method",
                                                               "condition" : "model.transport=='https'"
                                                            } ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" :  [
                                                          "api",
                                                          {
                                                          "key" : "on-format-data",
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
                                                      }]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "api-params",
                                                            "publish-api-params" ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<hr>"
                                                } ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<div class=\"alert alert-info\"><ul><li>Messages published over the subscibe channel need to have the following format in order to be consumed by a widget:<ul><li>{“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”}</li></ul></li><li>A script would publish a message  over the subscribe channel as follow:<ul><li>publish(“responseChannel”, {“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”});</li></ul></li><li>Whether https or wss transport is used, Sciptr API should return the static data structure for widget initial load:<ul><li>return &lt;static data structure&gt;;</li></ul></li></ul></div>"
                                                } ]
                                             } ]
                                          }

                                    ]
                                 },
                                 {
                                    title : "Toggle Switch behaviour",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   "key" : "switch-status",
                                                   "type" : "radios-inline",
                                                   titleMap : [ {
                                                      value : "true",
                                                      name : "True"
                                                   }, {
                                                      value : "false",
                                                      name : "False"
                                                   } ]
                                                }, "on-label", "size" ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ {
                                                   "key" : "is-disabled",
                                                   "type" : "radios-inline",
                                                   titleMap : [ {
                                                      value : "true",
                                                      name : "True"
                                                   }, {
                                                      value : "false",
                                                      name : "False"
                                                   } ]
                                                }, "off-label", "type",
                                                      "knob-label", ]
                                             } ]
                                    } ]
                                 }, {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "switch-status" : {
                                 "title" : "Toggle Switch Value",
                                 "type" : "string",
                                 "description" : "The current value of toggle switch."
                              },
                              "on-label" : {
                                 "title" : "ON Label",
                                 "type" : "string",
                                 "description" : "ON Label."
                              },
                              "off-label" : {
                                 "title" : "OFF Label",
                                 "type" : "string",
                                 "description" : "OFF Label"
                              },
                              "knob-label" : {
                                 "title" : "Knob Label",
                                 "type" : "string",
                                 "description" : "Knob Label."
                              },
                              "is-disabled" : {
                                 "title" : "Disabled",
                                 "type" : "string",
                                 "description" : "Set to true to disbale the toggle switch.",
                              },
                              "type" : {
                                 "title" : "Type",
                                 "type" : "string",
                                 "enum" : [ "switch-default", "switch-danger",
                                       "switch-warning", "switch-success",
                                       "switch-info", "switch-primary" ],
                                 "description" : "Choose the type of the Toggle Switch."
                              },
                              "size" : {
                                 "title" : "Size",
                                 "type" : "string",
                                 "enum" : [ "switch-mini", "switch-small",
                                       "switch-large" ],
                                 "description" : "choose the size of the toggle switch."
                              },
                              "api" : {
                                 "title" : "Api",
                                 "type" : "string",
                                 "description" : "Name of the api to get data.",
                                 "x-schema-form" : {
	                                 "placeholder" : "UIComponents/dashboard/frontend/examples/grid/getCarsInfo"
                                 }
                              },
                              "transport" : {
                                 "title" : "Transport",
                                 "type" : "string",
                                 "enum" : [ "wss", "https" ],
                                 "description" : "Method used to call api (can take 'http' or 'wss')."
                              },
                              "http-method" : {
                                 "title" : "Http method",
                                 "type" : "string",
                                 "description" : "Method to be used when calling the scriptr api over https. Default: GET.",
                                 "default" : "GET",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                     "value" : "GET",
                                     "label" : "GET"
                                 }, {
                                     "value" : "GET",
                                     "label" : "POST"
                                 } ]
                             },
                              "msg-tag" : {
                                 "title" : "Message Tag",
                                 "type" : "string",
                                 "description" : "Subscribe to socket messages with tag name."
                              },
                              "api-params" : {
                                 "title" : "Api Params",
                                 "type" : "string",
                                 "description" : "Api parameters.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              },
                              "on-format-data" : {
                                   "title" : "Format data",
                                   "default" : "return data;",
                                   "type" : "string",
                                   "description" : "Callback function to be called after data is returned from backend."
                               }, 
                              "publish-api-params" : {
                                 "title" : "Publish Api Params",
                                 "type" : "string",
                                 "description" : "Publish Api parameters.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              }
                           },
                           "required" : []
                        }
                     },
                     {
                        "name" : "slider",
                        "label" : "Slider",
                        "class" : "scriptr-slider",
                        "show" : true,
                        "defaults" : {
                           "transport" : "wss",
                           // "api":"UIComponents/dashboard/frontend/examples/slider/getSliderVal",
                           // "publish-api" : "UIComponents/dashboard/frontend/examples/slider/publishSliderVal",
                           "boxLabel" : "Slider",
                           "min" : 2,
                           "enable-resize": true, 
                           "floor" : 0,
                           "on-format-data": "return data;", 
                           "min-limit" : 1,
                           "max-limit" : 9,
                           "ceil" : 10,
                           "step" : 1,
                           "vertical" : false,
                           "show-ticks" : "true"
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1,
                           maxSizeY : 1
                        },
                        "imgCls" : "",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDRFNDQ5MDQ1MUI3MTFFNzlBMzVDOTRBMkVCQkU2OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDRFNDQ5MDM1MUI3MTFFNzlBMzVDOTRBMkVCQkU2OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhwmJL8AAAHdSURBVHjaYvz//z/DUANMDEMQjDp61NGjjh519KijRx096ugh62hGQgosdlw1BFLNQOwExBxAfA2IpwDxzBMe2gPS2mIh4GB3ILUJiNmQhLWBeDoQmwNx4qAKaaCDOYHUPSCWAPGNhLgZhNlZGI68+szw/e8/mLJAYGhvgHEuXboE8lwFEDsC8X0gbtDT03uEbC5QjR+QygTiv0A8CSi/C01eDEg1AbEGEJ8E4kagmm8ojgYqsgbSLuge2PmFUW3tJ6ZIEDtcXoihQAPsdoabn34wJB6/xwBKF3Ks/6/XiP5bhaTNE4jNkPjvgHgqEMN8qQDE8UjyIGPmAvFTJLEUIJZG4l8B4rVI6veAkscOIOZBD2kOJC9YiiCk1fk4GISAIf725x8GZkYGTaBQPZ6YFALiWgIxnUIgNehAMQyUgEqP/dhUCjAj2MfffIGzQSH9DuhgEBAcmLJnP7XTtB2Q2gLEvFAhUJpuRJIXAFL7gNgQKnQMiN2Aar4iqckBUhOAGBRsP4A4Aii/kegiD0fpAQMLgA7GKD2AlgoCKRNQRgRadgeLPAu05AH5/CRQzT8sauRBKRGIzwPlXw+LcppxtDc+6uhRR486etTRo44edfSoo0cdPerowQEAAgwA9F+Sz6eyRO4AAAAASUVORK5CYII=",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "Data",
                                    items : [
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "transport" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                            {
                                                               "key" : "msg-tag",
                                                               "condition" : "model.transport=='wss'"
                                                            },
                                                            {
                                                               "key" : "http-method",
                                                               "condition" : "model.transport=='https'"
                                                            } ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                          "api",
                                                          {
                                                          "key" : "on-format-data",
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
                                                      }]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "api-params",
                                                            "publish-api-params" ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<hr>"
                                                } ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<div class=\"alert alert-info\"><ul><li>Messages published over the subscibe channel need to have the following format in order to be consumed by a widget:<ul><li>{“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”}</li></ul></li><li>A script would publish a message  over the subscribe channel as follow:<ul><li>publish(“responseChannel”, {“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”});</li></ul></li><li>Whether https or wss transport is used, Sciptr API should return the static data structure for widget initial load:<ul><li>return &lt;static data structure&gt;;</li></ul></li></ul></div>"
                                                } ]
                                             } ]
                                          }

                                    ]
                                 },
                                 {
                                    title : "Slider behaviour",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "min",
                                                      "floor",
                                                      "min-limit",
                                                      "min-range",
                                                      "step",
                                                      {
                                                         "key" : "keyboard-support",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      },
                                                      {
                                                         "key" : "log-scale",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      },
                                                      {
                                                         "key" : "is-disabled",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "max",
                                                      "ceil",
                                                      "max-limit",
                                                      "max-range",
                                                      "precision",
                                                      {
                                                         "key" : "right-to-left",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      },
                                                      {
                                                         "key" : "read-only",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      }, "steps-array", ]
                                             } ]
                                    } ]
                                 },
                                 {
                                    title : "Visualization",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "show-selection-bar-from-value",
                                                      {
                                                         "key" : "show-selection-bar",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      },
                                                      {
                                                         "key" : "show-ticks",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      },
                                                      {
                                                         "key" : "hide-limit-labels",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      } ]
                                             },
                                             {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [
                                                      "ticks-array",
                                                      {
                                                         "key" : "show-selection-bar-end",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      },
                                                      {
                                                         "key" : "show-ticks-values",
                                                         "type" : "radios-inline",
                                                         titleMap : [ {
                                                            value : "true",
                                                            name : "True"
                                                         }, {
                                                            value : "false",
                                                            name : "False"
                                                         } ]
                                                      } ]
                                             } ]
                                    } ]
                                 }, {
                                    title : "Range",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [ {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ {
                                             "key" : "push-range",
                                             "type" : "radios-inline",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          }, {
                                             "key" : "draggable-range",
                                             "type" : "radios-inline",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          } ]
                                       }, {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ {
                                             "key" : "draggable-range-only",
                                             "type" : "radios-inline",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          }, {
                                             "key" : "no-switching",
                                             "type" : "radios-inline",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          } ]
                                       } ]
                                    } ]
                                 }, {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "min" : {
                                 "title" : "Slider 1",
                                 "type" : "number",
                                 "description" : "First Slider Value (defaults to 0)."
                              },
                              "max" : {
                                 "title" : "Slider 2",
                                 "type" : "number",
                                 "description" : "Second Slider Value."
                              },
                              "floor" : {
                                 "title" : "Floor",
                                 "type" : "number",
                                 "description" : "Minimum value for a slider (defaults to 0)."
                              },
                              "ceil" : {
                                 "title" : "Ceil",
                                 "type" : "number",
                                 "description" : "Maximum value for a slider (defaults to rz-slider-modelvalue)."
                              },
                              "step" : {
                                 "title" : "Step",
                                 "type" : "number",
                                 "description" : "Step between each value."
                              },
                              "precision" : {
                                 "title" : "Precision",
                                 "type" : "number",
                                 "description" : "The precision to display values with. The toFixed() is used internally for this."
                              },

                              "min-limit" : {
                                 "title" : "Minimum Limit",
                                 "type" : "number",
                                 "description" : "The minimum value authorized on the slider.",
                              },
                              "max-limit" : {
                                 "title" : "Maximum Limit",
                                 "type" : "number",
                                 "description" : "The maximum value authorized on the slider."
                              },
                              "min-range" : {
                                 "title" : "Minimum Range",
                                 "type" : "number",
                                 "description" : "The minimum range authorized on the slider. Applies to range slider only."
                              },
                              "max-range" : {
                                 "title" : "Maximum range",
                                 "type" : "number",
                                 "description" : "The maximum range authorized on the slider. Applies to range slider only."
                              },
                              "push-range" : {
                                 "title" : "Push Range",
                                 "type" : "string",
                                 "description" : "Set to true to have a push behavior. When the min handle goes above the max, the max is moved as well."
                              },
                              "steps-array" : {
                                 "title" : "Steps Array",
                                 "type" : "string",
                                 "description" : "If you want to display a slider with non linear/number steps. Just pass an array with each slider value and that's it; the floor, ceil and step settings of the slider will be computed automatically.They can also be bound to the index of the selected item by setting the bindIndexForStepsArray option to true.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: [{value: 'A'},{value: 10, legend: 'Legend for 10'}, new Date(2016, 7, 12),{value: new Date(2016, 7, 12), legend: 'Legend for 10'} ]"
                                 }
                              },
                              "bind-index-for-steps-array" : {
                                 "title" : "Bind Index For Steps Array",
                                 "type" : "string",
                                 "description" : "Set to true to bind the index of the selected item to rz-slider-model and rz-slider-high. (This was the default behavior prior to 4.0)."
                              },
                              "draggable-range" : {
                                 "title" : "Draggable Range",
                                 "type" : "string",
                                 "description" : "When set to true and using a range slider, the range can be dragged by the selection bar."
                              },
                              "draggable-range-only" : {
                                 "title" : "Draggable Range Only",
                                 "type" : "string",
                                 "description" : "Same as draggableRange but the slider range can't be changed."
                              },
                              "show-selection-bar" : {
                                 "title" : "Show Selection Bar",
                                 "type" : "string",
                                 "description" : "Set to true to always show the selection bar before the slider handle."
                              },
                              "show-selection-bar-end" : {
                                 "title" : "Show Selection Bar End",
                                 "type" : "string",
                                 "description" : "Set to true to always show the selection bar after the slider handle.",
                              },
                              "show-selection-bar-from-value" : {
                                 "title" : "Show Selection Bar From Value",
                                 "type" : "number",
                                 "description" : "Set a number to draw the selection bar between this value and the slider handle."
                              },
                              "hide-limit-labels" : {
                                 "title" : "Hide Limit Labels",
                                 "type" : "string",
                                 "description" : "Set to true to hide min / max labels"
                              },
                              "auto-hide-limit-labels" : {
                                 "title" : "Auto Hide Limit Labels",
                                 "type" : "string",
                                 "description" : "Set to false to disable the auto-hiding behavior of the limit labels."
                              },
                              "read-only" : {
                                 "title" : "Read Only",
                                 "type" : "string",
                                 "description" : "Set to true to make the slider read-only."
                              },
                              "is-disabled" : {
                                 "title" : "Disabled",
                                 "type" : "string",
                                 "description" : "Set to true to disable the slider."
                              },
                              "interval" : {
                                 "title" : "Interval",
                                 "type" : "number",
                                 "description" : "The number of milliseconds to wait between two updates of the slider."
                              },
                              "show-ticks" : {
                                 "title" : "Show Ticks",
                                 "type" : "string",
                                 "description" : "Set to true to display a tick for each step of the slider."
                              },
                              "show-ticks-values" : {
                                 "title" : "Show Ticks Values",
                                 "type" : "string",
                                 "description" : "Set to true to display a tick and the step value for each step of the slider."
                              },
                              "ticks-array" : {
                                 "title" : "Ticks Array",
                                 "type" : "string",
                                 "description" : "Use to display ticks at specific positions. The array contains the index of the ticks that should be displayed.",
                                 "x-schema-form" : {
	                                 "placeholder" : " [0, 1, 5] "
                                 }
                              },
                              "scale" : {
                                 "title" : "Scale",
                                 "type" : "number",
                                 "description" : "If you display the slider in an element that uses transform: scale(0.5), set the scale value to 2 so that the slider is rendered properly and the events are handled correctly."
                              },
                              "enforce-step" : {
                                 "title" : "Enforce Step",
                                 "type" : "number",
                                 "description" : "Set to true to force the value to be rounded to the step, even when modified from the outside.. When set to false, if the model values are modified from outside the slider, they are not rounded and can be between two steps."
                              },
                              "enforce-range" : {
                                 "title" : "Enforce Range",
                                 "type" : "string",
                                 "description" : "Set to true to round the Slider 1 and Slider 2 to the slider range even when modified from outside the slider."
                              },
                              "no-switching" : {
                                 "title" : "No Switching",
                                 "type" : "string",
                                 "description" : "Set to true to prevent to user from switching the min and max handles. Applies to range slider only."
                              },
                              "only-bind-handles" : {
                                 "title" : "Only Bind Handles",
                                 "type" : "string",
                                 "description" : "Set to true to only bind events on slider handles."
                              },
                              "bound-pointer-labels" : {
                                 "title" : "Bound Pointer Labels",
                                 "type" : "string",
                                 "description" : "Set to true to keep the slider labels inside the slider bounds."
                              },
                              "merge-range-labes-if-same" : {
                                 "title" : "Merge Range Labels If Same",
                                 "type" : "string",
                                 "description" : "Set to true to merge the range labels if they are the same. For instance, if min and max are 50, the label will be '50 - 50' if mergeRangeLabelsIfSame: false, else '50'."
                              },
                              "right-to-left" : {
                                 "title" : "Right To Left",
                                 "type" : "string",
                                 "description" : "Set to true to show graphs right to left."
                              },
                              "vertical" : {
                                 "title" : "Vertical",
                                 "type" : "string",
                                 "description" : "Set to true to display the slider vertically. The slider will take the full height of its parent. Changing this value at runtime is not currently supported."
                              },
                              "keyboard-support" : {
                                 "title" : "Keyboard Support",
                                 "type" : "string",
                                 "description" : "Handles are focusable (on click or with tab) and can be modified using keyboard controls.",
                              },
                              "log-scale" : {
                                 "title" : "Log Scale",
                                 "type" : "string",
                                 "description" : "Set to true to use a logarithmic scale to display the slider."
                              },
                              "selection-bar-gradient" : {
                                 "title" : "Selection Bar Gradient",
                                 "type" : "string",
                                 "description" : "Use to display the selection bar as a gradient. The given object must contain from and to properties which are colors."
                              },
                              "aria-label" : {
                                 "title" : "Aria Label",
                                 "type" : "string",
                                 "description" : "Use to add a label directly to the slider(s) for accessibility. Adds the aria-label attribute."
                              },
                              "aria-label-high" : {
                                 "title" : "Aria Label High ",
                                 "type" : "string",
                                 "description" : "Use to add a label directly to the slider(s) for accessibility. Adds the aria-label attribute."
                              },
                              "api" : {
                                 "title" : "Api",
                                 "type" : "string",
                                 "description" : "Name of the api to get data.",
                                 "x-schema-form" : {
	                                 "placeholder" : "UIComponents/dashboard/frontend/examples/grid/getCarsInfo"
                                 }
                              },
                              "http-method" : {
                                 "title" : "Http method",
                                 "type" : "string",
                                 "description" : "Method to be used when calling the scriptr api over https. Default: GET.",
                                 "default" : "GET",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                     "value" : "GET",
                                     "label" : "GET"
                                 }, {
                                     "value" : "GET",
                                     "label" : "POST"
                                 } ]
                             },
                               "on-format-data" : {
                                   "title" : "Format data",
                                   "default" : "return data;",
                                   "type" : "string",
                                   "description" : "Callback function to be called after data is returned from backend."
                               },
                              "transport" : {
                                 "title" : "Transport",
                                 "type" : "string",
                                 "enum" : [ "wss", "https" ],
                                 "description" : "Method used to call api (can take 'http' or 'wss')."
                              },
                              "msg-tag" : {
                                 "title" : "Message Tag",
                                 "type" : "string",
                                 "description" : "Subscribe to socket messages with tag name."
                              },
                              "api-params" : {
                                 "title" : "Api Params",
                                 "type" : "string",
                                 "description" : "Api parameters.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              },
                              "publish-api-params" : {
                                 "title" : "Publish Api Params",
                                 "type" : "string",
                                 "description" : "Publish Api parameters.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              }
                           },
                           "required" : [ "ceil" ]
                        }
                     },
                     {
                        "name" : "button",
                        "label" : "Button",
                        "class" : "scriptr-button",
                        "show" : true,
                        "defaults" : {
                           "transport" : "https",
                           "boxLabel" : "Button",
                           "type" : "btn-success",
                           "enable-resize": true,  
                           "size" : "small",
                           "label" : "Refresh data"
                        // ,"api" : "UIComponents/dashboard/frontend/examples/gauge/getGaugeVal"
                        },
                        "box" : {
                           sizeX : 1,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1,
                           maxSizeY : 1,
                           maxSizeX : 1
                        },
                        "imgCls" : "",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTM1MEZDOUE1MUI4MTFFNzg0MDZBODMxOUZDNUVGN0IiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTM1MEZDOTk1MUI4MTFFNzg0MDZBODMxOUZDNUVGN0IiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg1w0C8AAAHySURBVHja7Jc9SMNAFMfvbEVRcBVEHYqzOujgILWI4mIHdRArWZSCIE4WcdFVtKOg4CAtVhwEP0AUQbHipIvi4iQIzg5+QimN/yvPEtokSjH1Infw66XpNfzy8u7dheu6ztzWypgLm5JW0kpagubNHUV5PT43gF9CzyQYZdP6Y36kY5IKM/KKmaVHQPKsCJhJc8mluaoeSlpJF9cS4NRt0j4eYd3om8Ea+HCDdIe+xFohfgvC+C5W3RnwIHtOT+QKbYQ9gUUcNoEhcF5Uwc69bkV5Gp8eB6TfQB1kn81+xJNoQTcFQqDC5joZ7D08+ZHedSjS1UCzjFqE3YAxHDaAA5vr7BTu8lj2j2KiiIlT9YvSlZQiy9/lP+ilJ5M2nH8HJ2CyID04d2brgcffh+4QdCGiSYsxQXTb4EjkOsalTMeRaykm4jG4N05IkzYCykHcSrik1QMSGXSrYAARrbUYptHT2MSYHlmW8fXs7Gds3JASfhCmG0tRCbwAezjf+aOS51ROGyTj9AbiA22UNjXiNQrSCRojCsAduMa54F/m9FdbAY1gnoSF3JbIY8iGaMwclb59KSJNkbxE1w6ugMjdVyENhqlG94NZRHnBrnp4S7yrFHVY5OsZxF7oRjRaiQfthM2XcbWfVtJKWkn/e+lPAQYAoEWDWxM/8JkAAAAASUVORK5CYII=",
                        "form" : [ {
                           type : "tabs",
                           tabs : [
                                 {
                                    title : "Data",
                                    items : [
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [ "transport" ]
                                                   },
                                                   {
                                                      "type" : "section",
                                                      "htmlClass" : "col-xs-6",
                                                      "items" : [
                                                            {
                                                               "key" : "msg-tag",
                                                               "condition" : "model.transport=='wss'"
                                                            },
                                                            {
                                                               "key" : "http-method",
                                                               "condition" : "model.transport=='https'"
                                                            } ]
                                                   } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "api" ]
                                             }, {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-6",
                                                "items" : [ "api-params" ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<hr>"
                                                } ]
                                             } ]
                                          },
                                          {
                                             "type" : "section",
                                             "htmlClass" : "row",
                                             "items" : [ {
                                                "type" : "section",
                                                "htmlClass" : "col-xs-12",
                                                "items" : [ {
                                                   "type" : "help",
                                                   "helpvalue" : "<div class=\"alert alert-info\"><ul><li>Messages published over the subscibe channel need to have the following format in order to be consumed by a widget:<ul><li>{“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”}</li></ul></li><li>A script would publish a message  over the subscribe channel as follow:<ul><li>publish(“responseChannel”, {“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”});</li></ul></li><li>Whether https or wss transport is used, Sciptr API should return the static data structure for widget initial load:<ul><li>return &lt;static data structure&gt;;</li></ul></li></ul></div>"
                                                } ]
                                             } ]
                                          }

                                    ]
                                 }, {
                                    title : "Button behaviour",
                                    items : [ {
                                       "type" : "section",
                                       "htmlClass" : "row",
                                       "items" : [ {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ "type", "size" ]
                                       }, {
                                          "type" : "section",
                                          "htmlClass" : "col-xs-6",
                                          "items" : [ {
                                             "key" : "is-disabled",
                                             "type" : "radios-inline",
                                             titleMap : [ {
                                                value : "true",
                                                name : "True"
                                             }, {
                                                value : "false",
                                                name : "False"
                                             } ]
                                          } ]
                                       } ]
                                    } ]
                                 }, {
                                    title : "Box Properties",
                                    items : [ "boxLabel" ]
                                 } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "is-disabled" : {
                                 "title" : "Disabled",
                                 "type" : "string",
                                 "description" : "Set to true to disbale the Button.",
                              },
                              "type" : {
                                 "title" : "Type",
                                 "type" : "string",
                                 "enum" : [ "btn-default", "btn-danger",
                                       "btn-warning", "btn-success",
                                       "btn-info", "btn-primary" ],
                                 "description" : "Choose the type of the Button."
                              },
                              "size" : {
                                 "title" : "Size",
                                 "type" : "string",
                                 "enum" : [ "small", "large" ],
                                 "description" : "choose the size of the Button."
                              },
                              "api" : {
                                 "title" : "Api",
                                 "type" : "string",
                                 "description" : "Name of the api to get data.",
                                 "x-schema-form" : {
	                                 "placeholder" : "UIComponents/dashboard/frontend/examples/grid/getCarsInfo"
                                 }
                              },
                              "transport" : {
                                 "title" : "Transport",
                                 "type" : "string",
                                 "enum" : [ "wss", "https" ],
                                 "description" : "Method used to call api (can take 'http' or 'wss')."
                              },
                              "msg-tag" : {
                                 "title" : "Message Tag",
                                 "type" : "string",
                                 "description" : "Subscribe to socket messages with tag name."
                              },
                               "http-method" : {
                                   "title" : "Http method",
                                   "type" : "string",
                                   "description" : "Method to be used when calling the scriptr api over https. Default: GET.",
                                   "default" : "GET",
                                   "format" : 'uiselect',
                                   "placeholder" : " ",
                                   "items" : [ {
                                       "value" : "GET",
                                       "label" : "GET"
                                   }, {
                                       "value" : "GET",
                                       "label" : "POST"
                                   } ]
                               },
                              "api-params" : {
                                 "title" : "Api Params",
                                 "type" : "string",
                                 "description" : "Api parameters.",
                                 "x-schema-form" : {
	                                 "placeholder" : "Ex: {'id' : '599865'}"
                                 }
                              }
                           },
                           "required" : []
                        }
                     },
                     {
                        "name" : "iframe",
                        "label" : "IFrame",
                        "class" : "scriptr-iframe",
                        "show" : true,
                        "defaults" : {
	                        "boxLabel" : "IFrame"
                        },
                        "box" : {
                           sizeX : 1,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1
                        },
                        "imgCls" : "",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkE2REVDRkM1NEVCMTFFNzg4MjNDNkYyQjhEQjcyNjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkE2REVDRkI1NEVCMTFFNzg4MjNDNkYyQjhEQjcyNjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk48GP8AAAIqSURBVHja7JexS8NQEMaT6CjooAVFxcFJBXGqFaci2kq7uPU/UIeiXVpREVRUcHFqceiqUzep1aGKLSgiTtXVwVE72KGCovV7coX0kaA1qXkpffBxeblL8uNyubwnl0olqTxkWZZGU3dzOFyCeiTrxyO0feUZjFVwqieuk3sGHJXEG/OXUwOx8qSZc0bI5qA96MNC0CZoARoiLl3oXrJbeCWHVqcXpVqEOVBxfQ9FJ/5VkLLQ5FAkG45mnfMOvJo+Afgc1UDvi5zpuiqPVSgrAN84tPFb6Bxa3rkALa+tbsqjAW31h2hWTbbDrEO7+EYe7JJpH8RWjh3ClQcyOgN1a7i8UB66YX4WJwQ0bRoSbLHOnWdLy0kohdL4JH+C4q2DJoAorb9DnNsFsT6bonmI4qJGwRWTgN3I5hMX4oFKZWjyu80AV2oEzMY0dA3fc/mEWeDKH4BnfwJGTCfMCJTkfRrgs/+RaS/ZtE6G1TFJLSddl+ZiawodgM6gILK0oxPDSoOB3eq8LXZdkO4TqDk0slSknwZ7YJgHx5z9ZSdUrU4LOEzX++h+tf8QNcCXVe4xqBU61gBeMQpsqOWpwDPQJoAWVTXKMnzKAS/Sgj5jBNjwz4Ue7KfMFVTQrNXlufACxfmNAJuyygPAC7Uwls0umGFoTSMuDhMXcZXXD71DR7bZBCCbFzAtsLe22rkA+K2x3ar3PaITnUAEPmc10BE7lUdWUM4Kri8BBgC569bhyidDOgAAAABJRU5ErkJggg==",
                        "form" : [ {
                           type : "tabs",
                           tabs : [ {
                              title : "Data",
                              items : [ "link" ]
                           }, {
                              title : "Box Properties",
                              items : [ "boxLabel" ]
                           } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "link" : {
                                 "title" : "Link or URL",
                                 "type" : "string",
                                 "description" : "Enter Iframe source URL.",
                              }
                           },
                           "required" : []
                        }
                     },
                     {
                        "name" : "displaybox",
                        "label" : "Display Box",
                        "class" : "scriptr-displaybox",
                        "commonData" : true,
                        "show" : false,
                        "defaults" : {
                           "on-format-data": "return data;", 
                           "transport" : "wss",
                           "boxLabel" : "Text",
                           "msg-tag" : "text",
                           "data" : "Bla Bla"
                        },
                        "box" : {
                           sizeX : 2,
                           sizeY : 1,
                           minSizeX : 1,
                           minSizeY : 1
                           
                        },
                        "imgCls" : "displaybox-img",
                        "imgSrc" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDY5MEY1QUM1RkU1MTFFNzk3MTJENUY1ODM3OUFFQ0MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDY5MEY1QUI1RkU1MTFFNzk3MTJENUY1ODM3OUFFQ0MiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmt9N/4AAAHGSURBVHja7JexS8NAFIdbcRBdRBS6KI6iDoqibgVBwaV0cLA4VKGD7SJugpt/gaOTguLuqFURd20HQQu1VFsXsYsOUkWoX+AJZ6gxwYZEuYOPd/fuXfLj8e5yCdZqtYBV6zlOHmKmA+60FxgpT23mzBNWuppsPNgtwUZrhWz30VKfk0VBG5n+DNiHswaJHYOYMq7CsJpxK11ORK/w0I1GKCazC5htk/uL8N+Wh9vtTmyL3VLxg+go5J0Ib/aB6KxpbAi/gDa/Zbps41TxV6bZbCeUwAzdUJ3jNfbTes/KA+EHdU6Vdjui/bARHTctWov+b6J/dXqw2+cxXSb3OYzCFTzDhOJT2yMnyJ4XmU7BLSTkbhyBd5iFTvmqzYkvIjEJWZPyqjziZMu4slYgDcbtLQOLkIRl6WdkzoipyJq4J+XBy29M45J085TOg5FhfNfiK+Hr/W6t5xsRceOYN+igP+i70wNRQ3KHmJTxAGYLdoUdfP0SbsSEZI03p4fyx7EKT8p4DYpwD+vwKnNFia16Klp+j3LKuIApKCGXytyp/iJq0Vq0Fq1Fa9FatP7dstnC3M7c1hNutOio8CfKI+2BLst3fggwAHHJk2PD+/d6AAAAAElFTkSuQmCC",
                        "form" : [ {
                           type : "tabs",
                           tabs : [ {
                              title : "Format",
                              items : [ "type" ]
                           }, {
                              title : "Box Properties",
                              items : [ "boxLabel" ]
                           } ]
                        } ],
                        "schema" : {
                           "type" : "object",
                           "title" : "Schema",
                           "properties" : {
                              "boxLabel" : {
                                 "title" : "Box Label",
                                 "type" : "string",
                                 "description" : "Define your widget box title."
                              },
                              "data" : {
                                 "title" : "Data",
                                 "type" : "string",
                                 "description" : "Text to display.",
                                 "x-schema-form" : {
                                    "type" : "textarea",
                                    "placeholder" : "Front door has been unlocked for the past 5 hours."
                                 }
                              },
                              "type" : {
                                 "title" : "Type",
                                 "type" : "string",
                                 "format" : 'uiselect',
                                 "placeholder" : " ",
                                 "items" : [ {
                                    "value" : "info",
                                    "label" : "INFO"
                                 },{
                                    "value" : "warning",
                                    "label" : "WARNING"
                                 },{
                                    "value" : "success",
                                    "label" : "SUCCESS"
                                 },{
                                    "value" : "danger",
                                    "label" : "DANGER"
                                 }],
                                 "description" : "Select text theme."
                              }
                           },
                           "required" : []
                        }
                     }]
            });