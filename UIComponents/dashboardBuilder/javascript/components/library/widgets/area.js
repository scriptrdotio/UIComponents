const __AREA__ = {
    "name": "area",
    "label": "Area Chart",
    "class": "scriptr-chart",
    "commonData": true,
    "show": true,
    "defaults": {
        "type": "area",
        "on-format-data": "return data;",
        "boxLabel": "Area Chart",
        "xkey": "y",
        "ykeys": "[\"a\", \"b\"]",
        "labels": "[\"Serie A\", \"Serie B\"]",
        "colors": ["#CC5464", "#38B9D6"],
        "transport": "wss",
        "msg-tag": "chart",
        "grid-text-family": "Source Sans Pro",
        "data": '[{"y":2000,"a":64,"b":82},{"y":2003,"a":53,"b":48},{"y":2004,"a":81,"b":58},{"y":2005,"a":68,"b":72},{"y":2008,"a":52,"b":60},{"y":20011,"a":55,"b":30},{"y":2013,"a":79,"b":40}]'
    },
    "box": {
        sizeX: 2,
        sizeY: 4,
        minSizeX: 1,
        minSizeY: 2
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
                            type: "radios-inline",
                            key: "parse-time",
                            titleMap: [{
                                value: "true",
                                name: "True"
                            }, {
                                value: "false",
                                name: "False"
                            }]
                        }]
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
                                "htmlClass": "col-xs-6",
                                "items": [
                                    "ykeys",
                                    "pre-units",
                                    "ymin",
                                    {
                                        type: "radios-inline",
                                        key: "hide-hover",
                                        titleMap: [{
                                            value: "auto",
                                            name: "Auto"
                                        }, {
                                            value: "false",
                                            name: "Never"
                                        }, {
                                            value: "always",
                                            name: "Always"
                                        }]
                                    }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["labels",
                                    "post-units", "ymax" // ,"ylabel-format"
                                ]
                            }]
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
                                type: "radios-inline",
                                key: "grid",
                                titleMap: [{
                                    value: "true",
                                    name: "True"
                                }, {
                                    value: "false",
                                    name: "False"
                                }]
                            }, {
                                type: "radios-inline",
                                key: "axes",
                                titleMap: [{
                                    value: "true",
                                    name: "True"
                                }, {
                                    value: "false",
                                    name: "False"
                                }]
                            }, {
                                "key": "grid-text-color",
                                "colorFormat": "hex3"
                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["grid-text-family",
                                "grid-text-weight",
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
                            type: "radios-inline",
                            key: "smooth",
                            titleMap: [{
                                value: "true",
                                name: "True"
                            }, {
                                value: "false",
                                name: "False"
                            }]
                        }, {
                                "key": "colors",
                                "items": [{
                                    "key": "colors[]",
                                    "colorFormat": "hex3"
                                }]
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
                            type: "radios-inline",
                            key: "behave-like-line",
                            titleMap: [{
                                value: "true",
                                name: "True"
                            }, {
                                value: "false",
                                name: "False"
                            }]
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
                            "htmlClass": "col-xs-6",
                            "items": ["goals",
                                "goal-stroke-width"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "goal-line-colors",
                                "items": [{
                                    "key": "goal-line-colors[]",
                                    "colorFormat": "hex3"
                                }]
                            }]
                        }]
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
                            "items": ["events",
                                "event-stroke-width"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "event-line-colors",
                                "items": [{
                                    "key": "event-line-colors[]",
                                    "colorFormat": "hex3"
                                }]
                            }]
                        }]
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
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
                }
            },
            "xkey": {
                "title": "X key",
                "type": "string",
                "description": "A string containing the name of the attribute that contains date (X) values. Timestamps are accepted in the form of millisecond timestamps (as returned by Date.getTime() or as strings in the following formats: 2012, 2012 Q1, 2012 W1, 2012-02, 2012-02-24, 2012-02-24 15:00, 2012-02-24 15:00:00, 2012-02-24 15:00:00.000. date/time strings can optionally contain a T between the date and time parts, and/or a Z suffix, for compatibility with ISO-8601 dates."
            },
            "ykeys": {
                "title": "Y keys",
                "type": "string",
                "description": "A list of strings containing names of attributes that contain Y values (one for each series of data to be plotted)."
            },
            "labels": {
                "title": "Labels",
                "type": "string",
                "description": "A list of strings containing labels for the data series to be plotted (corresponding to the values in the ykeys option)."
            },
            "colors": {
                "title": "Colors",
                "type": "array",
                "description": "Array containing colors for the series lines/points.",
                "default": ["#CC5464", "#FCC717", "#38B9D6",
                    "#1DBC68", "#E90088"],
                "items": {
                    "format": "color",
                    "type": "string"
                }
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
                "type": "string",
                "default": "true",
                "description": "Set to false to disable line smoothing."
            },
            "hide-hover": {
                "title": "Hide hover",
                "default": "false",
                "type": "string",
                "description": "Set to Never to always show a hover legend. Set to 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend."
            },
            "hover-callback": {
                "title": "Hover callback",
                "type": "string",
                "description": "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
            },
            "parse-time": {
                "title": "Parse time",
                "type": "string",
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
                "format": 'uiselect',
                "placeholder": " ",
                "items": [{
                    "value": "auto",
                    "label": "auto"
                }, {
                    "value": "decade",
                    "label": "decade"
                }, {
                    "value": "year",
                    "label": "year"
                }, {
                    "value": "month",
                    "label": "month"
                }, {
                    "value": "week",
                    "label": "week"
                }, {
                    "value": "day",
                    "label": "day"
                }, {
                    "value": "hour",
                    "label": "hour"
                }, {
                    "value": "30min",
                    "label": "30min"
                }, {
                    "value": "15min",
                    "label": "15min"
                }, {
                    "value": "10min",
                    "label": "10min"
                }, {
                    "value": "5min",
                    "label": "5min"
                }, {
                    "value": "minute",
                    "label": "minute"
                }, {
                    "value": "30sec",
                    "label": "30sec"
                }, {
                    "value": "15sec",
                    "label": "15sec"
                }, {
                    "value": "10sec",
                    "label": "10sec"
                }, {
                    "value": "5sec",
                    "label": "5sec"
                }, {
                    "value": "second",
                    "label": "second"
                }]
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
            "goals": {
                "title": "Goals",
                "type": "array",
                "description": "A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0]",
                "items": {
                    "type": "number"
                }
            },
            "goal-stroke-width": {
                "title": "Goal stroke width",
                "type": "number",
                "default": 1.0,
                "description": "Width, in pixels, of the goal lines."
            },
            "goal-line-colors": {
                "title": "Goal line colors",
                "type": "array",
                "default": ['#666633', '#999966', '#cc6666',
                    '#663333'],
                "description": "Array of color values to use for the goal line colors. If you list fewer colors here than you have lines in goals, then the values will be cycled.",
                "items": {
                    "format": "color",
                    "type": "string"
                }
            },
            "events": {
                "title": "Events",
                "type": "array",
                "description": "A list of x-values to draw as vertical 'event' lines on the chart. ex: ['2012-01-01', '2012-02-01']",
                "items": {
                    "type": "string"
                }
            },
            "event-stroke-width": {
                "title": "Event stroke width",
                "type": "number",
                "default": 1.0,
                "description": "Width, in pixels, of the event lines."
            },
            "event-line-colors": {
                "title": "Event line colors",
                "type": "array",
                "default": ['#005a04', '#ccffbb', '#3a5f0b',
                    '#005502'],
                "description": "Array of color values to use for the event line colors. If you list fewer colors here than you have lines in events, then the values will be cycled.",
                "items": {
                    "format": "color",
                    "type": "string"
                }
            },
            "axes": {
                "title": "Axes",
                "type": "string",
                "description": "Set to false to disable drawing the x and y axes.",
                "default": "true"
            },
            "grid": {
                "title": "Grid",
                "type": "string",
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
                "format": 'uiselect',
                "placeholder": " ",
                "items": [{
                    "value": "Arial",
                    "label": "Arial"
                }, {
                    "value": "Helvetica",
                    "label": "Helvetica"
                }, {
                    "value": "Times New Roman",
                    "label": "Times New Roman"
                }, {
                    "value": "Courier New",
                    "label": "Courier New"
                }, {
                    "value": "Courier",
                    "label": "Courier"
                }, {
                    "value": "Verdana",
                    "label": "Verdana"
                }, {
                    "value": "Georgia",
                    "label": "Georgia"
                }, {
                    "value": "Palatino",
                    "label": "Palatino"
                }, {
                    "value": "Garamond",
                    "label": "Garamond"
                }, {
                    "value": "Bookman",
                    "label": "Bookman"
                }, {
                    "value": "Comic Sans MS",
                    "label": "Comic Sans MS"
                }, {
                    "value": "Trebuchet MS",
                    "label": "Trebuchet MS"
                }, {
                    "value": "Arial Black",
                    "label": "Arial Black"
                }, {
                    "value": "Impact",
                    "label": "Impact"
                }, {
                    "value": "Sans-Serif",
                    "label": "Sans-Serif"
                }, {
                    "value": "Source Sans Pro",
                    "label": "Source Sans Pro"
                }]
            },
            "grid-text-weight": {
                "title": "Grid text weight",
                "type": "string",
                "description": "Set the font weight of the axis labels (default: normal).",
                "default": "normal",
                "format": 'uiselect',
                "placeholder": " ",
                "items": [{
                    "value": "normal",
                    "label": "Normal"
                }, {
                    "value": "bold",
                    "label": "Bold"
                }]
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
                "type": "string",
                "default": "false",
                "description": "Set to true to overlay the areas on top of each other instead of stacking them."
            },
            "date-format": {
                "title": "Date format",
                "type": "string",
                "description": "A function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }."
            }
        },
        "required": ["xkey", "ykeys"]
    }
};