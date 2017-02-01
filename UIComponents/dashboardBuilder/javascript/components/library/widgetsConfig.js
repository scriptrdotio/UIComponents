angular
  .module('DashboardBuilder')
  .constant("config", {
        script: {
      "form": [{
      "key": "scriptName",
      "notitle": true,
      "placeholder": "Script Name*"
    }],
      "schema": {
       	"type": "object",
		"title": "Schema",
		"properties": {
			"scriptName": {
				"type": "string",
                "fieldHtmlClass": "script-name-input"
			}
        },
        "required": [
			"scriptName"
		]
    }},
    transport: {
      "label": "Transport configuration",
      "defaults": {
         "token": "RTg2MTczN0ZDRQ==",
         "publishChannel": "requestChannel",
         "subscribeChannel": "responseChannel",
         "baseUrl": "https://touta.scriptrapps.io/",
       },
      "form": ["*"],
      "schema": {
       	"type": "object",
		"title": "Schema",
		"properties": {
			"token": {
				"title": "Token",
				"type": "string",
				"description": "Scriptr token."
			},
			"baseUrl": {
				"title": "Base url",
				"type": "string",
				"description": "Scriptr base url. ex: https://demo.scriptrapps.io"
			},
			"publishChannel": {
				"title": "Publish Channel",
				"type": "string",
				"description": "Publish Channel"
			},
            "subscribeChannel": {
				"title": "Subscribe Channel",
				"type": "string",
				"description": "Subscribe Channel"
			}
        }
    }},
    widgets :[
      {
        "label": "Bar Chart",
        "class": "scriptr-chart",
        "defaults": {
            "type": "bar",
            "stacked": "true",
            "xkey": "y",
            "ykeys": "[\"a\", \"b\"]",
            "labels": "[\"Serie A\", \"Serie B\"]",
            "transport": "wss",
            "api": "UIComponents/dashboard/frontend/examples/chart/getChartData",
            "msg-tag": "chart"
        },
     "box": {
       sizeY: 2,
       sizeX: 2,
     },
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAlCAYAAADBa/A+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwNzM5ODZDRTIzRjExRTZBNDMxODBDRDVCMkFCNTZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwNzM5ODZERTIzRjExRTZBNDMxODBDRDVCMkFCNTZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjA3Mzk4NkFFMjNGMTFFNkE0MzE4MENENUIyQUI1NkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjA3Mzk4NkJFMjNGMTFFNkE0MzE4MENENUIyQUI1NkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7BUDhKAAABLklEQVR42mJkGCDw+5iYA5Daj08NE8MgBqOOG3UcvQELCbkrAUgp4FFygNXq1YEBcRwQgBxnT0DNgdE0N+o4KqY5YjOOAJASwKPkBzDjvBgQxwFBARDX45E/CMQOo2lu1HEjIrd+fSYo8P8vbj8zMv3nYWB4NTCOe3NWyeDDLSmc8pziH5UZGG4Mg2iFFpr4wBdgofmH2hb//cnKTEy0viegxpHarQ0QeHFUXffNecXRomS0nMMJHm03VPn9iRN3ESHxwYDY8ovqjvvxlpf7+0t+3AZx/RQYWdF6d6UVXgW8Cq9VgNF1YEAc9+WJMF4FHKKfeEZz65BLc8xsf/7jVcH4/xfYF8x/f+FVy/T/B4zGpw5kDsxcgnYPZsBYXl4uMGijlYhWyWiGwAYAAgwAp1xSUMqF7k8AAAAASUVORK5CYII=",
	 "form": [
            {
              type: "tabs",
              tabs: [
                {
                  title: "Data",
                  items: [
                    "transport",
                    "msg-tag",
                    "api",
                    "api-params",
                    "data",
                    "on-format-data"
                  ]
                },
                {
                  title: "Measurements",
                  items:[{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["xkey","ykeys", "goals", "goal-stroke-width", "ymax"]
                      },
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["events", "event-stroke-width", "units", "ymin"]
                      }
                    ]
                  }]
                },
                {
                  title: "Colors and Font",
                  items: [
                    {
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["colors", "grid-text-color", "grid-text-family", "grid-text-size"]
                      },
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [
                            "goal-line-colors",
                            "event-line-colors",
                            "grid-text-weight"
                           ]
                      }
                    ]
                  }
                  ]
                },
                {
                   title: "Chart behaviour",
                   items: [
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [{
                            type: "radios-inline",
                            key: "axes",
                            titleMap: [
                              { value: "true", name: "True" },
                              { value: "false", name: "False" }
                            ]
                          },
                          {
                              "key": "resize",
          					  "type": "radios-inline",
                                titleMap: [
                                  { value: "true", name: "True" },
                                  { value: "false", name: "False" }
                                ]
                          },
                          {
                              type: "radios-inline",
                              key: "hide-hover",
                              titleMap: [
                                { value: "true", name: "True" },
                                { value: "false", name: "False" }
                              ]
                          },
                          {
                            "key": "stacked",
        					  "type": "radios-inline",
                              titleMap: [
                                { value: "true", name: "True" },
                                { value: "false", name: "False" }
                              ]
                        },
                        {
                            type: "radios-inline",
                            key: "grid",
                            titleMap: [
                              { value: "true", name: "True" },
                              { value: "false", name: "False" }
                            ]
                        }
                        ]
                      },
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [
                        {
                            type: "radios-inline",
                            key: "parse-time",
                            titleMap: [
                              { value: "true", name: "True" },
                              { value: "false", name: "False" }
                            ]
                        } ,"xlabel-angle", "hover-callback"]
                      }
                   ]
                },
                {
                   title: "Labels",
                   items: [
                        "labels",
                        "ylabel-format",
                    	"post-units",
                    	"pre-units"
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
				"description": "Data series in case of static data.",
              	"x-schema-form": {
                  "type": "textarea",
                  "placeholder": "data"
                }
			},
			"xkey": {
				"title": "x Key",
				"type": "string",
				"description": "The name of the data record attribute that contains x-values."
			},
			"ykeys": {
				"title": "y Keys",
				"type": "string",
				"description": "A list of names of data record attributes that contain y-values."
			},
			"labels": {
				"title": "Labels",
				"type": "string",
				"description": "Labels for the ykeys -- will be displayed when you hover over the chart."
			},
			"colors": {
				"title": "Colors",
				"type": "string",
				"description": "Specify the color of each graph successively."
			},
			"stacked": {
				"title": "Stacked",
				"type": "string",
				"description": "Set to true to draw bars stacked vertically."
			},
			"hide-hover": {
				"title": "Hide Hover",
				"type": "string",
				"description": "Set to false to always show a hover legend. Set to true or 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend."
			},
			"hover-callback": {
				"title": "Hover Callback",
				"type": "string",
				"description": "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
			},
			"axes": {
				"title": "Axes",
				"type": "string",
				"description": "Set to false to disable drawing the x and y axes."
			},
			"grid": {
				"title": "Grid",
				"type": "string",
				"description": "Set to false to disable drawing the horizontal grid lines."
			},
			"grid-text-color": {
				"title": "Grid Text Color",
				"type": "string",
				"description": "Set the color of the axis labels (default: #888)."
			},
			"grid-text-size": {
				"title": "Grid Text Size",
				"type": "string",
				"description": "Set the point size of the axis labels (default: 12)."
			},
			"grid-text-family": {
				"title": "Grid Text Family",
				"type": "string",
				"description": "Set the font family of the axis labels (default: sans-serif)."
			},
			"grid-text-weight": {
				"title": "Grid Text Weight",
				"type": "string",
				"description": "Set the font weight of the axis labels (default: normal)."
			},
		 	"resize": {
				"title": "Resize",
				"type": "string",
				"description": "Set to true to enable automatic resizing when the containing element resizes. (default: false). This has a significant performance impact, so is disabled by default."
			},
			"parse-time": {
				"title": "Parse Time",
				"type": "string",
				"description": "Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series."
			},
			"api": {
				"title": "Api",
				"type": "string",
				"description": "Name of the api to get data."
			},
			"api-params": {
				"title": "Api Params",
				"type": "string",
				"description": "Api parameters."
			},
			"transport": {
				"title": "Transport",
				"type": "string",
				"description": "Method used to call api (can take 'http' or 'wss')."
			},
			"msg-tag": {
				"title": "Message Tag",
				"type": "string",
				"description": "Subscribe to socket messages with tag name."
			},
			"on-format-data": {
				"title": "Format data",
				"type": "string",
				"description": "Callback function to be called after data is returned from backend.",
              	"x-schema-form": {
                  "type": "textarea",
                  "placeholder": "Enter you format data function"
                }
			},
			"ymax": {
				"title": "y Maximum Value",
				"type": "string",
				"description": "Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]."
			},
			"ymin": {
				"title": "y Minimum Value",
				"type": "string",
				"description": "Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins."
			},
			"units": {
				"title": "Units",
				"type": "string",
				"description": "Width of the series lines, in pixels."
			},
			"post-units": {
				"title": "Post Units",
				"type": "string",
				"description": "Set to a string value (eg: '%') to add a label suffix all y-labels."
			},
			"pre-units": {
				"title": "Pre Units",
				"type": "string",
				"description": "Set to a string value (eg: '$') to add a label prefix all y-labels."
			},
			"xlabel-angle": {
				"title": "x label Angle",
				"type": "string",
				"description": "The angle in degrees from horizontal to draw x-axis labels."
			},
			"ylabel-format": {
				"title": "y label Format",
				"type": "string",
				"description": "A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; }"
			},
			"goals": {
				"title": "Goals",
				"type": "string",
				"description": "A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0]"
			},
			"goal-stroke-width": {
				"title": "Goal Stroke Width",
				"type": "string",
				"description": "Width, in pixels, of the goal lines."
			},
			"goal-line-colors": {
				"title": "Goal Line Colors",
				"type": "string",
				"description": "Array of color values to use for the goal line colors. If you list fewer colors here than you have lines in goals, then the values will be cycled."
			},
			"events": {
				"title": "Events",
				"type": "string",
				"description": "A list of x-values to draw as vertical 'event' lines on the chart. events: ['2012-01-01', '2012-02-01', '2012-03-01']"
			},
			"event-stroke-width": {
				"title": "Event Stroke Width",
				"type": "string",
				"description": "Width, in pixels, of the event lines."
			},
			"event-line-colors": {
				"title": "Event Line Colors",
				"type": "string",
				"description": "Array of color values to use for the event line colors. If you list fewer colors here than you have lines in events, then the values will be cycled."
			}
		},
		"required": [
			"xkey", "ykeys", "labels"
		]
	}
},
{
	"label": "Area Chart",
	"class": "scriptr-chart",
	"defaults": {
		"type": "area",
		"xkey": "y",
		"ykeys": "[\"a\", \"b\"]",
		"labels": "[\"Serie A\", \"Serie B\"]",
		"transport": "wss",
		"api": "UIComponents/dashboard/frontend/examples/chart/getChartData",
		"msg-tag": "chart"
	},
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAlCAYAAADfosCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU0QUJEQTNFMjRDMTFFNjg5OTNGRTg1NTI0MkFENEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU0QUJEQTJFMjRDMTFFNjg5OTNGRTg1NTI0MkFENEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDMzZDNhZTEtYWE5Ni1iMjRiLWJhZDMtZWFmYjg0ZDNmMzgyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pjz0N0QAAALTSURBVHja7JdPiE1RHMfvnXfnNaPMYpSaV/7MmBmNBePPUwYbNYqQYiEbKxoaK4tnIRSSlSiMlOxENiSzUGQhLLyJjSYLjbERIf8m4T2fH7+b2+3d++6976qj7q8+/V73nPO73/M75/zuebZloM26PbQGdxw2TA6OvLENFXgTWqEMxSaDBU7BATJZsQ0WKEt9R9ps0wWKNRkgcBPuVpBA2vOOAQKvQbNfIG2yyovhnZMgcEGCwVUCfvhHAnO45dAhIu0YQWXgHjgG0+ErXIYzBB9rQOBH2EyMu+7y4lbADO1etiMGXYobgWUBXR7CObjCy77FFLiWMY+0TfblKk2CFUkkg9pwR2DYc8iewFFYD9t0w7v2Fi7KhHjxi5gC5V0rffHCRTJoK+4UFPTRZzgEpwn8Q/u043boNuj2DK/qiZXsjkpBpu92fl8KEChLO6BtVl2RDJgr+0wz5dp12EvQyYAJSZxBFbvRV9oko6MwpM/9AiUJRcgF5OuvSDrLLPbBQU/KX6q4GzEOxWzcLtgJM33NfoGduP46H5U/Iuksm/U8LNCGn3ASDhPwS50TPwdE2D36Vr1FGLcFdsNqeA/rPAL7cH0R5l226XxWA7n2QJaGYE9DxEl9lW3RCy36+D5jXgf0X4j7Tvsz3RqSvc6Ii1N2dIZiUpj3wwXZ6CHi5kEP5H3Nks2aIt0Ja+aLnsMYyRwtJ7IHT4RkollPb3fACRQryCTckx8QY8BTpCNbvTqZ16x1hYjz2mNETtSI06o1sC3BF7TsBIhr0ax1abajmiz5RI0PQq0inSyTOuMe3dS5hDGleE9FKNLxMkmwabj5Wk4avWNKNseJ2aE3mVyD8SwpQYt0WdO6pX+C53oXTCPm70wWUv4bITeYJWlejo36t5iJzERmIjOR5llFivm459ta1Vt5miYxK0kFwqv/YbUtu1Qq9ZsuUpZ7LDs4KdgvAQYAsIQCfa7zz00AAAAASUVORK5CYII=",
	 "form": [
	            {
	                type: "tabs",
	                tabs: [
	                  {
	                    title: "Data",
	                    items: [
	                      "transport",
	                      "msg-tag",
	                      "api",
	                      "api-params",
	                      "data",
	                      "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Measurements",
	                    items:[{
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["xkey","ykeys", "xlabels", "goals", "ymin"]
	                        },
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["units", "goal-stroke-width", "events", "event-stroke-width", "ymax"]
	                        }
	                      ]
	                    }]
	                  },
	                  {
	                    title: "Colors and Fonts",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": [
	                                   "colors",
	                                   "goal-line-colors",
	  	                               "point-fill-colors"
	                          ]
	                        },
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": [
                                  "fill-opacity",
		                          "point-stroke-colors",
	                              "event-line-colors",
	                             ]
	                        }
	                      ]
	                    }
	                    ]
	                  },
	                  {
	                     title: "Chart behaviour",
	                     items: [
	                        {
	                          "type": "section",
	                          "htmlClass": "row",
	                          "items": [
                                {
                                  "type": "section",
		                          "htmlClass": "col-xs-6",
                                  "items": [
                                    {
                                      type: "radios-inline",
                                      key: "axes",
                                      titleMap: [
                                        { value: "true", name: "True" },
                                        { value: "false", name: "False" }
                                      ]
                                  },
                                  {
                                        type: "radios-inline",
                                        key: "hide-hover",
                                        titleMap: [
                                          { value: "true", name: "True" },
                                          { value: "false", name: "False" }
                                        ]
                                  },
                                  {
                                      "key": "resize",
                                        "type": "radios-inline",
                                        titleMap: [
                                          { value: "true", name: "True" },
                                          { value: "false", name: "False" }
                                        ]
                                  },
                                  {
		                              type: "radios-inline",
		                              key: "smooth",
		                              titleMap: [
		                                { value: "true", name: "True" },
		                                { value: "false", name: "False" }
		                              ]
		                          },
                                  "date-format",
                                  "xlabel-format",
                                  "xlabel-angle",
                                  "ylabel-format"
                                  ]
                                 },
                                 {
                                  "type": "section",
                                  "htmlClass": "col-xs-6",
                                  "items": [
                                     {
                                      type: "radios-inline",
                                      key: "grid",
                                      titleMap: [
                                        { value: "true", name: "True" },
                                        { value: "false", name: "False" }
                                        ]
                                     },
                                     {
                                      type: "radios-inline",
                                      key: "parse-time",
                                      titleMap: [
                                        { value: "true", name: "True" },
                                        { value: "false", name: "False" }
                                      ]
                                     },
                                     {
                                        type: "radios-inline",
                                        key: "continuous-line",
                                        titleMap: [
                                          { value: "true", name: "True" },
                                          { value: "false", name: "False" }
                                        ]
                                     }, "hover-callback", "behave-like-line"
                                  ]
	                            }
	                     ]
                        }
                      ]
	                  },
	                  {
	                     title: "Labels",
	                     items: [
	                            "labels",
		                      	"post-units",
		                      	"pre-units"
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
				"description": "Data series in case of static data."
			},
			"xkey": {
				"title": "x Key",
				"type": "string",
				"description": "The name of the data record attribute that contains x-values."
			},
			"ykeys": {
				"title": "y Keys",
				"type": "string",
				"description": "A list of names of data record attributes that contain y-values."
			},
			"labels": {
				"title": "Labels",
				"type": "string",
				"description": "Labels for the ykeys -- will be displayed when you hover over the chart."
			},
			"colors": {
				"title": "Colors",
				"type": "string",
				"description": "Specify the color of each graph successively."
			},
			"line-width": {
				"title": "Line Width",
				"type": "string",
				"description": "Width of the series lines, in pixels."
			},
			"point-size": {
				"title": "Point Size",
				"type": "string",
				"description": "Diameter of the series points, in pixels."
			},
			"point-fill-colors": {
				"title": "Point Fill Colors",
				"type": "string",
				"description": "Colors for the series points. By default uses the same values as lineColors."
			},
			"point-stroke-colors": {
				"title": "Point Stroke Colors",
				"type": "string",
				"description": "Colors for the outlines of the series points. (#ffffff by default)."
			},
			"ymax": {
				"title": "y Max",
				"type": "string",
				"description": "Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]."
			},
			"ymin": {
				"title": "y Min",
				"type": "string",
				"description": "Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins."
			},
			"smooth": {
				"title": "Smooth",
				"type": "string",
				"description": "Set to false to disable line smoothing."
			},
			"hide-hover": {
				"title": "Hide Hover",
				"type": "string",
				"description": "Set to false to always show a hover legend. Set to true or 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend."
			},
			"hover-callback": {
				"title": "Hover Callback",
				"type": "string",
				"description": "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
			},
			"parse-time": {
				"title": "Parse Time",
				"type": "string",
				"description": "Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series."
			},
			"units": {
				"title": "Units",
				"type": "string",
				"description": "Width of the series lines, in pixels."
			},
			"post-units": {
				"title": "Post Units",
				"type": "string",
				"description": "Set to a string value (eg: '%') to add a label suffix all y-labels."
			},
			"pre-units": {
				"title": "Pre Units",
				"type": "string",
				"description": ""
			},
			"xlabels": {
				"title": "x Labels",
				"type": "string",
				"description": "Sets the x axis labelling interval. By default the interval will be automatically computed. The following are valid interval strings. 'decade', 'year', 'month', 'week', 'day', 'hour', '30min', '15min', '10min', '5min', 'minute', '30sec', '15sec', '10sec', '5sec', 'second'"
			},
			"xlabel-angle": {
				"title": "x Label Angle",
				"type": "string",
				"description": "The angle in degrees from horizontal to draw x-axis labels."
			},
			"xlabel-format": {
				"title": "x Label Format",
				"type": "string",
				"description": "A function that accepts Date objects and formats them for display as x-axis labels. Overrides the default formatter chosen by the automatic labeller or the xLabels option. function (x) { return x.toString(); }"
			},
			"ylabel-format": {
				"title": "y Label Format",
				"type": "string",
				"description": "A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; }"
			},
			"goals": {
				"title": "Goals",
				"type": "string",
				"description": "A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0]"
			},
			"goal-stroke-width": {
				"title": "Goal Stroke Width",
				"type": "string",
				"description": "Width, in pixels, of the goal lines."
			},
			"goal-line-colors": {
				"title": "Goal Line Colors",
				"type": "string",
				"description": "Array of color values to use for the goal line colors. If you list fewer colors here than you have lines in goals, then the values will be cycled."
			},
			"events": {
				"title": "Events",
				"type": "string",
				"description": "A list of x-values to draw as vertical 'event' lines on the chart. events: ['2012-01-01', '2012-02-01', '2012-03-01']"
			},
			"event-stroke-width": {
				"title": "Event Stroke Width",
				"type": "string",
				"description": "Width, in pixels, of the event lines."
			},
			"event-line-colors": {
				"title": "Event Line Colors",
				"type": "string",
				"description": "Array of color values to use for the event line colors. If you list fewer colors here than you have lines in events, then the values will be cycled."
			},
			"continuous-line": {
				"title": "Continous Line",
				"type": "string",
				"description": "When set to false (the default), all null and undefined values in a data series will be ignored and lines will be drawn spanning them. When set to true, null values will break the line and undefined values will be spanned. Note that in v0.5.0, this setting will be removed and the behaviour will be to break lines at null values."
			},
			"axes": {
				"title": "Axes",
				"type": "string",
				"description": "Set to false to disable drawing the x and y axes."
			},
			"grid": {
				"title": "Grid",
				"type": "string",
				"description": "Set to false to disable drawing the horizontal grid lines."
			},
			"grid-text-color": {
				"title": "Grid Text Color",
				"type": "string",
				"description": "Set the color of the axis labels (default: #888)."
			},
			"grid-text-size": {
				"title": "Grid Text Size",
				"type": "string",
				"description": "Set the point size of the axis labels (default: 12)."
			},
			"grid-text-family": {
				"title": "Grid Text Family",
				"type": "string",
				"description": "Set the font family of the axis labels (default: sans-serif)."
			},
			"grid-text-weight": {
				"title": "Grid Text Weight",
				"type": "string",
				"description": "Set the font weight of the axis labels (default: normal)."
			},
			"fill-opacity": {
				"title": "fill Opacity",
				"type": "string",
				"description": "Change the opacity of the area fill colour. Accepts values between 0.0 (for completely transparent) and 1.0 (for completely opaque)."
			},
			"resize": {
				"title": "Resize",
				"type": "string",
				"description": "Set to true to enable automatic resizing when the containing element resizes. (default: false). This has a significant performance impact, so is disabled by default."
			},
			"behave-like-line": {
				"title": "Behave Like Line",
				"type": "string",
				"description": "Set to true to overlay the areas on top of each other instead of stacking them."
			},
			"date-format": {
				"title": "Date Format",
				"type": "string",
				"description": "A function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }."
			},
			"api": {
				"title": "Api",
				"type": "string",
				"description": "Name of the api to get data."
			},
			"on-format-data": {
				"title": "Format Data",
				"type": "string",
				"description": "Callback function to be called after data is returned from backend."
			},
			"transport": {
				"title": "Transport",
				"type": "string",
				"description": "Method used to call api (can take 'http' or 'wss')."
			},
			"msg-tag": {
				"title": "Message Tag",
				"type": "string",
				"description": "Subscribe to socket messages with tag name."
			},
			"api-params": {
				"title": "Api Params",
				"type": "string",
				"description": "Api parameters."
			}
		},
		"required": [
			"xkey", "ykeys"
		]
	}
},
   {
	"label": "Line Chart",
	"class": "scriptr-chart",
	"defaults": {
		"type": "line",
		"xkey": "y",
		"ykeys": "[\"a\", \"b\"]",
		"labels": "[\"Serie A\", \"Serie B\"]",
		"transport": "wss",
		"api": "UIComponents/dashboard/frontend/examples/chart/getChartData",
		"msg-tag": "chart"
	},
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAlCAYAAADBa/A+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMyODMxQTMyRTIzRjExRTZCN0M2QjYwOTU2Q0U5QzZDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMyODMxQTMzRTIzRjExRTZCN0M2QjYwOTU2Q0U5QzZDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI4MzFBMzBFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI4MzFBMzFFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7pqcU1AAACpElEQVR42uyXS2gUQRCGZ8d4kCQSiGIwHkQFCTm45ObBeEhAMIjxEgQfKMIelICIYdmTj5AETS4KCirk4SOHIHrygSGgkeAheFEUUXwcDSii6xMT16+kRppmZw7Znd0+pOGjumdqp/+tmq7uSeRyOc/VlnBBxIzXV4u5CRvhDnSs8DI/fUeC1AmboAK2wV656Iq4inwZdUXcI6Mvab2ST3G52n61x3jXTgYXfQcWQz2mHX7DRfOeC2lNwSK4QdTeOyOOqC1WcdLO2/fLHTlJZx08JWqTrok7FBa1WMWRsmpNW9j9RsxmyMK1kolj4l7MZ/hIvy3E7aDay6Q0WxJxWhoyWuWr4XS+qAZbVFhK44rcnDVuQMxxK8UirAruE7XnpRTXovYPvA0qP0wjMGml9FzBRyYeuh6zFh7wT79F+C3HSCSWyZaE7zDX5LQxCOtgFp5A0z93z1uFz+y8I8fDO3TCW/CYcWWE+1kVNg4jcoHJH2I2wBndCZrUt1bxCknrAcNPItgc8ie2Y3aCRDaFqP9HbPrf4TDdZ9YxqbJQcTPWuBchayxhNcaqyyDkXcizTsAv7V/C7828xTGppCioU3fhFSQ1vWb96oeVMBX1kiPmOkbey3r6qYK+IRAwhNkH93jYFsZL6Q/DDnU5BV+hWyOSxO9F7B84usomddJGJn2t1+U3XdBnRX4An65i1iQ/4ihzQYc9gTBNTQ6k6vdYP6sqdsEMe+eOSmWHl/m2H223rfFU7N+tRG211rUl0EqUJiJS36YLRj5Qrprlo+jitMCOwVYYZbJd5Tzs+YawTj3miLAvcKTcHxe+sQD6dXuRJuMPTojTY84P43qWlM45IQ4hcrzZrTuArNA93kJbaPG0RDqdrnFVnBz4Prkqznc5rX8FGAAWXa+WqoxqjwAAAABJRU5ErkJggg==",
	 "form": [
	            {
	                type: "tabs",
	                tabs: [
	                  {
	                    title: "Data",
	                    items: [
	                      "transport",
	                      "msg-tag",
	                      "api",
	                      "api-params",
	                      "data",
	                      "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Measurements",
	                    items:[{
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["xkey","ykeys", "xlabels", "goals", "ymin", "ymax"]
	                        },
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["units", "goal-stroke-width", "events", "event-stroke-width"]
	                        }
	                      ]
	                    }]
	                  },
	                  {
	                    title: "Colors and Fonts",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": [
	                                   "colors",
	                                   "goal-line-colors",
	  	                               "point-fill-colors"
	                          ]
	                        },
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": [
                                  "fill-opacity",
		                          "point-stroke-colors",
	                              "event-line-colors",
	                             ]
	                        }
	                      ]
	                    }
	                    ]
	                  },
	                  {
	                     title: "Chart behaviour",
	                     items: [
	                        {
	                          "type": "section",
	                          "htmlClass": "row",
	                          "items": [
                                {
                                  "type": "section",
		                          "htmlClass": "col-xs-6",
                                  "items": [
                                    {
                                      type: "radios-inline",
                                      key: "axes",
                                      titleMap: [
                                        { value: "true", name: "True" },
                                        { value: "false", name: "False" }
                                      ]
                                  },
                                  {
                                        type: "radios-inline",
                                        key: "hide-hover",
                                        titleMap: [
                                          { value: "true", name: "True" },
                                          { value: "false", name: "False" }
                                        ]
                                  },
                                  {
                                      "key": "resize",
                                        "type": "radios-inline",
                                        titleMap: [
                                          { value: "true", name: "True" },
                                          { value: "false", name: "False" }
                                        ]
                                  },
                                  {
		                              type: "radios-inline",
		                              key: "smooth",
		                              titleMap: [
		                                { value: "true", name: "True" },
		                                { value: "false", name: "False" }
		                              ]
		                          },
                                  "date-format",
                                  "xlabel-format",
                                  "xlabel-angle",
                                  "ylabel-format"
                                  ]
                                 },
                                 {
                                  "type": "section",
                                  "htmlClass": "col-xs-6",
                                  "items": [
                                     {
                                      type: "radios-inline",
                                      key: "grid",
                                      titleMap: [
                                        { value: "true", name: "True" },
                                        { value: "false", name: "False" }
                                        ]
                                     },
                                     {
                                      type: "radios-inline",
                                      key: "parse-time",
                                      titleMap: [
                                        { value: "true", name: "True" },
                                        { value: "false", name: "False" }
                                      ]
                                     },
                                     {
                                        type: "radios-inline",
                                        key: "continuous-line",
                                        titleMap: [
                                          { value: "true", name: "True" },
                                          { value: "false", name: "False" }
                                        ]
                                     }, "hover-callback", "behave-like-line"
                                  ]
	                            }
	                     ]
                        }
                      ]
	                  },
	                  {
	                     title: "Labels",
	                     items: [
	                            "labels",
		                      	"post-units",
		                      	"pre-units"
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
				"description": "Data series in case of static data."
			},
			"xkey": {
				"title": "x Key",
				"type": "string",
				"description": "The name of the data record attribute that contains x-values."
			},
			"ykeys": {
				"title": "y Keys",
				"type": "string",
				"description": "A list of names of data record attributes that contain y-values."
			},
			"labels": {
				"title": "Labels",
				"type": "string",
				"description": "Labels for the ykeys -- will be displayed when you hover over the chart."
			},
			"colors": {
				"title": "Colors",
				"type": "string",
				"description": "Specify the color of each graph successively."
			},
			"line-width": {
				"title": "Line Width",
				"type": "string",
				"description": "Width of the series lines, in pixels."
			},
			"point-size": {
				"title": "Point Size",
				"type": "string",
				"description": "Diameter of the series points, in pixels."
			},
			"point-fill-colors": {
				"title": "Point Fill Colors",
				"type": "string",
				"description": "Colors for the series points. By default uses the same values as lineColors."
			},
			"point-stroke-colors": {
				"title": "Point Stroke Colors",
				"type": "string",
				"description": "Colors for the outlines of the series points. (#ffffff by default)."
			},
			"ymax": {
				"title": "y Maximum Value",
				"type": "string",
				"description": "Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]."
			},
			"ymin": {
				"title": "y Minimum Value",
				"type": "string",
				"description": "Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins."
			},
			"smooth": {
				"title": "Smooth",
				"type": "string",
				"description": "Set to false to disable line smoothing."
			},
			"hide-hover": {
				"title": "Hide Hover",
				"type": "string",
				"description": "Set to false to always show a hover legend. Set to true or 'auto' to only show the hover legend when the mouse cursor is over the chart. Set to 'always' to never show a hover legend."
			},
			"hover-callback": {
				"title": "Hover Callback",
				"type": "string",
				"description": "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
			},
			"parse-time": {
				"title": "Parse Time",
				"type": "string",
				"description": "Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series."
			},
			"units": {
				"title": "Units",
				"type": "string",
				"description": "Width of the series lines, in pixels."
			},
			"post-units": {
				"title": "Post Units",
				"type": "string",
				"description": "Set to a string value (eg: '%') to add a label suffix all y-labels."
			},
			"pre-units": {
				"title": "Pre Units",
				"type": "string",
				"description": ""
			},
			"xlabels": {
				"title": "x Labels",
				"type": "string",
				"description": "Sets the x axis labelling interval. By default the interval will be automatically computed. The following are valid interval strings. 'decade', 'year', 'month', 'week', 'day', 'hour', '30min', '15min', '10min', '5min', 'minute', '30sec', '15sec', '10sec', '5sec', 'second'"
			},
			"xlabel-angle": {
				"title": "x Label Angle",
				"type": "string",
				"description": "The angle in degrees from horizontal to draw x-axis labels."
			},
			"xlabel-format": {
				"title": "x Label Format",
				"type": "string",
				"description": "A function that accepts Date objects and formats them for display as x-axis labels. Overrides the default formatter chosen by the automatic labeller or the xLabels option. function (x) { return x.toString(); }"
			},
			"ylabel-format": {
				"title": "y Label Format",
				"type": "string",
				"description": "A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; }"
			},
			"goals": {
				"title": "Goals",
				"type": "string",
				"description": "A list of y-values to draw as horizontal 'goal' lines on the chart. goals: [1.0, -1.0]"
			},
			"goal-stroke-width": {
				"title": "Goal Stroke Width",
				"type": "string",
				"description": "Width, in pixels, of the goal lines."
			},
			"goal-line-colors": {
				"title": "Goal Line Colors",
				"type": "string",
				"description": "Array of color values to use for the goal line colors. If you list fewer colors here than you have lines in goals, then the values will be cycled."
			},
			"events": {
				"title": "Events",
				"type": "string",
				"description": "A list of x-values to draw as vertical 'event' lines on the chart. events: ['2012-01-01', '2012-02-01', '2012-03-01']"
			},
			"event-stroke-width": {
				"title": "Event Stroke Width",
				"type": "string",
				"description": "Width, in pixels, of the event lines."
			},
			"event-line-colors": {
				"title": "Event Line Colors",
				"type": "string",
				"description": "Array of color values to use for the event line colors. If you list fewer colors here than you have lines in events, then the values will be cycled."
			},
			"continuous-line": {
				"title": "Continous Line",
				"type": "string",
				"description": "When set to false (the default), all null and undefined values in a data series will be ignored and lines will be drawn spanning them. When set to true, null values will break the line and undefined values will be spanned. Note that in v0.5.0, this setting will be removed and the behaviour will be to break lines at null values."
			},
			"axes": {
				"title": "Axes",
				"type": "string",
				"description": "Set to false to disable drawing the x and y axes."
			},
			"grid": {
				"title": "Grid",
				"type": "string",
				"description": "Set to false to disable drawing the horizontal grid lines."
			},
			"grid-text-color": {
				"title": "Grid Text Color",
				"type": "string",
				"description": "Set the color of the axis labels (default: #888)."
			},
			"grid-text-size": {
				"title": "Grid Text Size",
				"type": "string",
				"description": "Set the point size of the axis labels (default: 12)."
			},
			"grid-text-family": {
				"title": "Grid Text Family",
				"type": "string",
				"description": "Set the font family of the axis labels (default: sans-serif)."
			},
			"grid-text-weight": {
				"title": "Grid Text Weight",
				"type": "string",
				"description": "Set the font weight of the axis labels (default: normal)."
			},
			"fill-opacity": {
				"title": "Fill Opacity",
				"type": "string",
				"description": "Change the opacity of the area fill colour. Accepts values between 0.0 (for completely transparent) and 1.0 (for completely opaque)."
			},
			"resize": {
				"title": "Resize",
				"type": "string",
				"description": "Set to true to enable automatic resizing when the containing element resizes. (default: false). This has a significant performance impact, so is disabled by default."
			},
			"behave-like-line": {
				"title": "Behave Like Line",
				"type": "string",
				"description": "Set to true to overlay the areas on top of each other instead of stacking them."
			},
			"date-format": {
				"title": "Date Format",
				"type": "string",
				"description": "A function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }."
			},
			"api": {
				"title": "Api",
				"type": "string",
				"description": "Name of the api to get data."
			},
			"on-format-data": {
				"title": "Format Data",
				"type": "string",
				"description": "Callback function to be called after data is returned from backend."
			},
			"transport": {
				"title": "Transport",
				"type": "string",
				"description": "Method used to call api (can take 'http' or 'wss')."
			},
			"msg-tag": {
				"title": "Message Tag",
				"type": "string",
				"description": "Subscribe to socket messages with tag name."
			},
			"api-params": {
				"title": "Api Params",
				"type": "string",
				"description": "Api parameters."
			}
		},
		"required": [
			"xkey", "ykeys", "labels"
		]
	}
},
{
	"label": "Donut Chart",
	"class": "scriptr-chart",
	"defaults": {
		"type": "donut",
		"transport": "wss",
		"msg-tag": "donut",
     	"background-color":"#eee",
        "label-color":"ff0000",
        "parse-time": "false"
	},
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAlCAYAAADBa/A+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTkzNjBBNzJFMkQ2MTFFNkIzQ0Y4MTdBRTNEODBCRUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTkzNjBBNzFFMkQ2MTFFNkIzQ0Y4MTdBRTNEODBCRUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI4MzFBMzJFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI4MzFBMzNFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4tt2jHAAAD40lEQVR42rSYXUgVQRTH773eyjAsTZM+VCjsiwpEKTXJtEgf9C0iCiqi6Is+yMc+1J7qwQKxFPShCCnRIKJMibLMUktDgqwQEiFKQ8yiLM28/Y+ONq67e2b3rgf+nKs7u/vbMzNnzozb5/O53G63ywkbaog4AFcMDUJd0HuoCXoA1XsTu4dVnzXCZQcuoabNA7cCWgqFQjOhsvrg1OPwOQa3fYRKoAJA9qnAeS0A0RdsgfZA6VCIpgkXlUVQHpSNCNMHFAJyyOwGjyIYQb2CqqHtOmBk/YrfGQxdguoAGWXW0MtABcFdhna7nLdEqAWAGYhgi6XIAYy6odECWL8NwDDoEQDjlOEAthDuMbTKwosGbUaQurlar4s9OmCz4KqgJRZfQhOiFnoItUK/LUawHIBeLnKF0BobEejD2HkCbYZi8fdsMatvqyYE6Jj8jwl5DlHLgLtvAahHRKuBJk5j+spBg+ScBHcdWsw87wcUjY/rnZCEARaAC2+hGAWoDugUdMsISAcwVHz4WqZpLuDytHCUv24ovIeWp2xAWZ6dAvAlE8FPUGRAQtewPOaOKDw/B1CH7ICNJFV0F9wuptkCKGV8QiBq0XDJzE2VgDrnb+YF4DO4O0yzTfJsTWca/9TOJD+tWGHmjsNtYBoXIWqfHYSrZZL2MhmOWwnKnVxU0bWUoNtNmsyT4SLNkist0FOw8HebXJsuVyWhJg070aW+KYA7Az01uPaBLZmkyDlurflZVL63GU3AuIr/cMMm5VOYa2qsfmxW6tgXKMIj1fdGFoM8GOgkVfPWfTSM1qlOiHZmcG50OGpU9pvtqnpluCbmYYcdhjuqUFiMw1UzjbPQtckOdWkmXBLT7LUMR+sdtwJcA+BcP8FoX1KquIKMwiGP0WwtYm6gMqcKgCF+gFEJH8E0/TNW8Mrpg+C+MTdSodgCwPWK+90gKdoHxQkBZ3fjK0t79Mr0k3D5isGgsucK7dIQ+QEN1HK4baKSoV6JLSy5SAt9MxTF7WcB1zjprESU6nUKA1a2AXFg8xWaJsr8cE0bemYaAFfDPxdnK3p2D2CZY2clE1YFROAv3A5mUdbaDLFbSxEfFa7Thkqys3gxbRn3GjznlzbFTFqyANgJR/TfHc5tp9EzqQC8id8X9HIprnWwO34A0thIE2ucU0bvKgNguNi5VUnXCgB2VfmsBIBUw8WJPalTNp+2BACh4bMTekFg0Am9xuzhoZgkNBZyxS7erg2Jg8XzIq+yh4fKJ5uAnCMg9zOVs57ViL3uG9UbbB27iiPXJLFji3eNHr9S1g+UIkRj9Z1IIRWAarMaZuL6J8AAXG5blin5AbwAAAAASUVORK5CYII=",
	 "form": [
	            {
	                type: "tabs",
	                tabs: [
	                  {
	                    title: "Data",
	                    items: [
	                      "transport",
	                      "msg-tag",
	                      "api",
	                      "api-params",
	                      "data",
	                      "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Colors and Goals",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["colors",  "donut-label-color"]
	                        },
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": [
	                              "donut-background-color",
	                              "donut-colors"
	                             ]
	                        }
	                      ]
	                    }
	                    ]
	                   },
                       {
	                    title: "Chart behaviour",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": [
                                {
                                  "key": "resize",
                                  "type": "radios-inline",
                                  titleMap: [
                                    { value: "true", name: "True" },
                                    { value: "false", name: "False" }
                                  ]
                                }
                              ]
	                        },
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["donut-formatter"]
	                        }
	                      ]
	                    }
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
				"description": "Data series in case of static data."
			},
			"colors": {
				"title": "Colors",
				"type": "string",
				"description": "Specify the color of each graph successively."
			},
			"donut-label-color": {
				"title": "Donut Label Color",
				"type": "string",
				"description": "Donut label color."
			},
			"donut-background-color": {
				"title": "Donut Background Color",
				"type": "string",
				"description": "Donut background color."
			},
			"donut-colors": {
				"title": "Donut Colors",
				"type": "string",
				"description": "Donut colors."
			},
			"donut-formatter": {
				"title": "Donut Formatter",
				"type": "string",
				"description": "Can either be a string for a filter name (eg. 'currency') or a reference to a scope function."
			},
			"resize": {
				"title": "Resize",
				"type": "string",
				"description": "Set to true to enable automatic resizing when the containing element resizes. (default: false). This has a significant performance impact, so is disabled by default."
			},
			"api": {
				"title": "Api",
				"type": "string",
				"description": "Name of the api to get data."
			},
			"on-format-data": {
				"title": "Format Data",
				"type": "string",
				"description": "Callback function to be called after data is returned from backend."
			},
			"transport": {
				"title": "Transport",
				"type": "string",
				"description": "Method used to call api (can take 'http' or 'wss')."
			},
			"msg-tag": {
				"title": "Message Tag",
				"type": "string",
				"description": "Subscribe to socket messages with tag name."
			},
			"api-params": {
				"title": "Api Params",
				"type": "string",
				"description": "Api parameters."
			}
		},
		"required": []
	}
},
{
	"label": "Gauge",
	"class": "scriptr-gauge",
	"defaults": {
		"transport": "wss",
		"msg-tag": "gauge",
		"api": "UIComponents/dashboard/frontend/examples/gauge/getGaugeVal"
	},
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAlCAYAAADlcn/+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzVERDhERDJFN0I2MTFFNjk4RTNDOTE2MDRFNDhGQjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzVERDhERDFFN0I2MTFFNjk4RTNDOTE2MDRFNDhGQjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmM0MmUzZDAtZTJjNC1iMjQyLWJjZTItYThjYWQ3ZjkxMzAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlCd/HQAAAY7SURBVHja3FprbFRFFL67C6RVKVKtCVpJxVhk2XatBa0/fGIT5CEGw8O0kFaw8VH9YcQqGhSQBg0agqkC1RaRJkBiVOKDtIAvok1FKrXdauMDVMLD2iJYWh7u+p3ut2a83d1u5263207y9czemTt37jfnnDlzbm1GjEtNTU0SRA6QCbiANCAVSAGSTN1PAn8AvwMHgUagAajNzc09Gct522JEziSIe4BpgBuwWxzSCxwAPgJ2gLS6QUsUyLkcYhFQAIzr5/f4GdgEVIC0w4OCKBDkhFgKzAOGxdiyzwPbgFIQ5olLokCQ+JpSYH6sTDpM8QFbZcFA2MG4IAoEjYAooRYlGPFVurh4q0HYuQEjCiSJY64CJhrxXZqAPJB1QHcAuwWSHoGoGwQkGZxjHeccG42iqZUDC43BWd4CiqBdZ/uNKJA0SuIW4BZjcJfPgFkg66+om96z1V+Ngdg1BEiScqt/3WtSokpUzs6mUbu8STu2e0c7jKFTJgMf0kqsEwWSRtDcJn3nS8wCWfVDjKz36Xcta9Qbqrn1M1kdwFHgGOuxMsONlpw5tKkY4tVgbRm2zvq59vYsi7HNbmAv8D3QAud6xrR5SACbDkwAbgamANf2E2HFeH5Zn4kCSW7GSSHVcrytqzHP3ubqw9Yp2lIBbMakfrBwlpTQZDFwSRSJknDhhlBBqS2MX9ofSTCZbuvy5NvbnL2QdRxYJfEXJtIZpbPlhRAP8OiUEiWyRMuzgh13Qvmokkgj7hZfgnOLN9njC304fU34xMPXRYskKRirA1hLU9wQxQj+qYg0CtokWYDmvh5wg2iWZCbz8TLVsfDI0LC7IN6OgjnKQXqCOesQTKNKdbIAJs0SFc6OFUnUsI8hrufGYKUkkIPQGgVtEkfZaCWrkGnr/GCOvX0hJt4+EIERNOtSCSTFMVsYRtbbpSb/zBq11GLqpanBl7hgoEiiZrVCTLeoWTZy0VOjoE2S4z5k6KdvxSdl106d+Fs8hNzQrLHcuXV9lqSV0wI5eFWjFlkgSVQ1P15Iomb9CrHAwhDCxf3BTK/AwqCvg6RqI84KHbyV0KHgf6YHs5vMKFynSDCZDqJ65HYqKytl/KmG/3uefNwUjdtaWFjYaOonZl8EXAX8AqxHn6NK+0MQS7jKZWh7UWm7iBtQJa4vD2KCyfRXukHpjfLdMKBRsyywvioEScMh9hj+j5TFPHY8A3yLttlKv/GG/2Pmc+wjsgHXr2b7bQxaZUF+BFbj2jzlUY8DstOVhdCqtmDbfR/K3arpTdMcRFa9PFgDVleOAZ8CrYx2HwT+BBymib/CF22in2zm6r/M9jmUD8uwrN9HEpNJ1Bo8rzXMPMv5bJ3SzY0dZicm4dYcpALaFO5YskKiXDEVYAO1S0oyX3Q0TbO7L/rIgXklf09HuyTVruDvI2g/xPoYyie5O63t7bjDdJFOccv/S4jN5xj6X2M2h2vEi/nwsm1AtoQOwEw2vUfpUp69n7Je2XWczE1JuQzjBPoeR13IepTEXoDf8oUlEajCc5tDzLVE4x3lmTnyJ1M3uIQ2RZIqEY3dx93nYuAd+izDFOMEgtQTyjUxyXdZXwOsY12uPW34/9ulihvRcprhNyDNHUSrPBaC0Ew7V1Wn7I6w3zkeKQKrfC/wAuv/KP2Gm2T3vdCOnZDLgJuAGUwk7qHPk9TNfJrnYmYrE0mYlTmbi0uIStO8eW8knfCiHcAMQMzoCV5eglWXzOVhk/YYpm38CMcQ8xopJKD+GImTjWSjstBfou1r+qyMENP5QvNd04SoVM2be1VjkJEHqKZ9TKlfyfgn8A9hUyhvV0zRo/o7wIvxrmEYsQy/z1JjpTjowxwmTVVLs+a7pg6zEIi19EKSrOqb4pRRlzDhtLgKNp8SXyIvirZNqIuWrEDdSVPq3lEZYpjLSsZTW/h7H8OK2ZyTBLm1OnMOU1LsRs9/B4ykdMCRn+mlz0/c3RzUlpnM9cjheS5IOKFkLD7nPIooP6F5mcm/Tu4Fnsf955XdrIF+bzvN+aUQYYIk5XS+7iTphgWnIvBNpwHRjnEMEIsYvI2lg/7Ph9HchEzJgd8B3Cn3Bxl2JHfMbepz5JhBAuUQnIFr4Q7nf+u88L8CDAAOWg6lD3k11QAAAABJRU5ErkJggg==",
	 "form": [
	            {
	                type: "tabs",
	                tabs: [
	                  {
	                    title: "Data",
	                    items: [
	                      "transport",
	                      "msg-tag",
	                      "api",
	                      "api-params",
	                      "data",
	                      "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Measurements",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
		                        {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["gauge-value", "shadow-size"]
		                        },
		                        {
		 	                      "type": "section",
		 	                      "htmlClass": "col-xs-6",
		 	                      "items": ["min", "max"]
		 	                    }
	                        ]
	                       }
	                    ]
	                  },
	                  {
		                    title: "Colours",
		                    items: [
		                      {
		                      "type": "section",
		                      "htmlClass": "row",
		                      "items": [
		                        {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["custom-sectors", "value-font-color", "gauge-color", "shadow-opacity", "label-font-color"]
		                        },
                                 {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["gauge-color", "shadow-opacity", "label-font-color"]
		                        }
		                      ]
		                    }
		                    ]
		                  },
		                  {
			                    title: "Gauge behaviour",
			                    items: [
			                      {
			                      "type": "section",
			                      "htmlClass": "row",
			                      "items": [
			                        {
			                          "type": "section",
			                          "htmlClass": "col-xs-6",
			                          "items": ["hide-min-max", "hide-value", "hide-inner-shadow", "show-inner-shadow", "start-animation-type", "refresh-animation-type", 
		                                        {
			                                        "key": "counter",
			                                          "type": "radios-inline",
			                                          titleMap: [
			                                            { value: "true", name: "True" },
			                                            { value: "false", name: "False" }
			                                          ]
			                                        }]
			                        },
                                    {
			                          "type": "section",
			                          "htmlClass": "col-xs-6",
			                          "items": ["show-inner-shadow", "start-animation-type", "refresh-animation-type", 
		                                        {
			                                        "key": "counter",
			                                          "type": "radios-inline",
			                                          titleMap: [
			                                            { value: "true", name: "True" },
			                                            { value: "false", name: "False" }
			                                          ]
			                                        }]
			                        }
			                      ]
			                    }
			                 ]
		                  },
		                  {
			                    title: "Labels",
			                    items: [
			                      {
			                      "type": "section",
			                      "htmlClass": "row",
			                      "items": [
			                        {
			                          "type": "section",
			                          "htmlClass": "col-xs-6",
			                          "items": ["label"]
			                        }
			                      ]
			                    }
			                 ]
		                  }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
			"gauge-value": {
				"title": "Gauge Value",
				"type": "string",
				"description": "Sets the value of the gauge."
			},
			"custom-sectors": {
				"title": "Custom Sectors",
				"type": "string",
				"description": "array of objects with color, hi, lo attributes."
			},
			"value-font-color": {
				"title": "Value Font Color",
				"type": "string",
				"description": "color of the value text."
			},
			"min": {
				"title": "Minimum Value",
				"type": "string",
				"description": "minimum value."
			},
			"max": {
				"title": "Maximum Value",
				"type": "string",
				"description": "maximum value."
			},
			"hide-min-max": {
				"title": "Hide min-max",
				"type": "string",
				"description": "hide min and max values."
			},
			"hide-value": {
				"title": "Hide Value",
				"type": "string",
				"description": "hide value text."
			},
			"hide-inner-shadow": {
				"title": "Hide inner-shadow",
				"type": "string",
				"description": "hide inner shadow."
			},
			"gauge-color": {
				"title": "Gauge Color",
				"type": "string",
				"description": "background color of gauge element."
			},
			"show-inner-shadow": {
				"title": "Show inner-shadow",
				"type": "string",
				"description": "true to display inner shadow."
			},
			"shadow-size": {
				"title": "Shadow Size",
				"type": "string",
				"description": "inner shadow size."
			},
			"shadow-opacity": {
				"title": "Shadow Opacity",
				"type": "string",
				"description": "shadow opacity, values 0 ~ 1."
			},
			"label": {
				"title": "Label",
				"type": "string",
				"description": "text to show below value."
			},
			"label-font-color": {
				"title": "Label Font Color",
				"type": "string",
				"description": "color of label under the value."
			},
			"start-animation-type": {
				"title": "Start Animation Type",
				"type": "string",
				"description": "type of initial animation (linear, >, <, <>, bounce)."
			},
			"refresh-animation-type": {
				"title": "Refresh Animation Type",
				"type": "string",
				"description": "type of refresh animation (linear, >, <, <>, bounce)."
			},
			"counter": {
				"title": "Counter",
				"type": "string",
				"description": "increase numbers one by one."
			},
			"api": {
				"title": "Api",
				"type": "string",
				"description": "Name of the api to get data."
			},
			"on-format-data": {
				"title": "Format Data",
				"type": "string",
				"description": "Callback function to be called after data is returned from backend."
			},
			"transport": {
				"title": "Transport",
				"type": "string",
				"description": "Method used to call api (can take 'http' or 'wss')."
			},
			"msg-tag": {
				"title": "Message Tag",
				"type": "string",
				"description": "Subscribe to socket messages with tag name."
			},
			"api-params": {
				"title": "Api Params",
				"type": "string",
				"description": "Api parameters."
			}
		},
		"required": []
	}
},
{
	"label": "Speedometer",
	"class": "scriptr-speedometer",
	"defaults": {
		"transport": "wss",
		"msg-tag": "speedometer",
		"api": "UIComponents/dashboard/frontend/examples/speedometer/getSpeedometerVal"
	},
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0U0RkEwQjZFN0I3MTFFNjhGMEZBOEREMDEzMkY1NjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0U0RkEwQjVFN0I3MTFFNjhGMEZBOEREMDEzMkY1NjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmM0MmUzZDAtZTJjNC1iMjQyLWJjZTItYThjYWQ3ZjkxMzAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poq6iGcAAAS7SURBVHjazFhpbA1RFJ432qq1VUtUqK1FSGiUJ2jkWZ7YfpTG1ibULvHDnhA/hPhhDz+IJVWaWqKpNhEifRJCEY9KNSpEiiIhllL6qkFT3+FMnd4+rTfz+p6TfDkz584955szZ87cuTbNgrhcrhZQw4CxwFCgP9ADiAB0oAb4DLwEHgP3gCvAXafTWWM2rs0k2SFQC4C5QBcTLt4Cp4EMkL/frKRBNgFqCzBV859cADaDfKFfSYNsJNR2YKmXObVAMXCNdWnrgsL40Bev936PiV5TlZhQBFtfYDAwhrU3H0eADSD/yTJpEB4BdQbopQw9Aw4DJxHolRy4m7woCSoXmD4sJz1P8dcdKhVYBvRWfD4H5sDf7cY46U0QJufXJWHd81Vr5S5247AfnO9QCTcldD3No/nkh/wJoTjXOa7vpDFxBVQWECrMB9pnX8oNv/fQ3uHQmVFWCpnmkx/yR37FEMXL4vj/Xh6YMA/qhDBROlKRoVw8+p44fsQtLAGP3+fWBR/UKgu5RQ6AjzLEnE6lBrQSl85HzMwmM43JlMF0YXoPOIgwnVAAKHq81PbGm0z0eJ6/g/1p7N/B8QxJZz5/J40LOkKdBULY5KH2BoduZR6RTkTAfDOMeV4i+5H17uZ26mET8TjLvLyXBwYzoNKEaYaR4UAKl8o5YToOHgsakMaFo6EK/nTO2v3OiRNXaUESV37+Ps1mWylMiSB+Qy2PrXU1U1mlRR7LGYcXxhEMwhSX4hMPb/xsnOXhUHV1i1aUgx46hd9kKo+1qMNnASBLH5s99FGijvXVPvhi9dCByeISO7J9x8j0EjFQigtnUfMHTgFJvHILhPTgeBS3H3jMJj5i/BdPG7IcBv0OaM8D63E3u8XdxyHLTwJYGvXigd86qF18SsvczpTpkYJwLX8FZXt6Esh69hIvi3lpzHOkzgt4Q4qR5TfafyTMp1iYxhLpeGG4auGxDgBszcRd8orX+ftvyEMLjgcCB5uJuOTVn0hHC8NTC46p8S+n9QIviPwpklc0dQ+jyLU2rhtHwkpfvhYXbMeLUe1DiVB76sMta56ZFSD7Cae/GOP8W9+Ybh7nqLq2HCIvblFRuVSZvw+o9iHeLSadwsHNEifSm//w+tJglffDOPGMG+Gk9blAhYkSMYSIZ5oslQrJw+OwTxBjNZTpcmMboCYqsi0y88lC7V1Wzol4FIinwO9HH3o1lWwdD9fyOW3F8Add+UzG+eHDUKaYJwElID7FgutYcVymK+3E7oc3vcCLjToU/arFms2HOH5ApG8Kg4O3uqzIo7/Yw3hHytcfAhv/hhni1pU67MQbKlbkQyNjESb80b5LV3kfOr7tL6g7CeNii6Qb2966acLfQnFcAr6lxno6QwzMxCOJsfAyurm/q5LHPxS+lEYn3o3SJE+DdKboyaG8yWili6yGSuad0WzOVjK3Ml9kI9Ba7AwcV39sN0FtE+vqMXgUBUH7sXW5BkEVia82bcFtUH9s92u/N7+Nm8nAxIggEW7Ji/8Q8XLvbLBZg7uohFqhNPSDQUp0mrLOp1/Acq87TBg4D3VImKYFibRck+eAl2wU9Vd5LLRBQ91jMpdMMOQor/Ta8ZZCPfkpwABkBJ8fXRbYywAAAABJRU5ErkJggg==",
	 "form": [
	            {
	                type: "tabs",
	                tabs: [
	                  {
	                    title: "Data",
	                    items: [
	                      "transport",
	                      "msg-tag",
	                      "api",
	                      "api-params",
	                      "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Measurements",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
		                        {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["needle-val", "gauge-radius", "min-val"]
		                        },
		                        {
		 	                      "type": "section",
		 	                      "htmlClass": "col-xs-6",
		 	                      "items": ["tick-space-maj-val", "max-val", "tick-space-min-val"]
		 	                    }
	                        ]
	                      }
	                    ]
	                  },
	                  {
		                    title: "Colours",
		                    items: [
		                      {
		                      "type": "section",
		                      "htmlClass": "row",
		                      "items": [
		                        {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["tick-col-maj", "tick-col-min", "outer-edge-col", "needle-col"]
		                        },
                                 {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["inner-col", "units-label-col", "tick-label-col", "pivot-col", "default-fonts"]
		                        }
		                      ]
		                    }
		                    ]
		                  },
		                  {
			                    title: "Labels",
			                    items: [
			                      {
			                      "type": "section",
			                      "htmlClass": "row",
			                      "items": [
			                        {
			                          "type": "section",
			                          "htmlClass": "col-xs-6",
			                          "items": ["gauge-units"]
			                        }
			                      ]
			                    }
			                 ]
		                  }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
			"gauge-radius": {
				"title": "Gauge Radius",
				"type": "string",
				"description": "sets the size of the gauge."
			},
			"min-val": {
				"title": "Minimum Value",
				"type": "string",
				"description": "Minimum value to be shown in gauge scale."
			},
			"max-val": {
				"title": "Maximum Value",
				"type": "string",
				"description": "Maximum value to be shown in gauge scale."
			},
			"needle-val": {
				"title": "Needle Value",
				"type": "string",
				"description": "Sets the value of needle to be pointed."
			},
			"tick-space-min-val": {
				"title": "Tick Space min-val",
				"type": "string",
				"description": "space between the major ticks of the gauge."
			},
			"tick-space-maj-val": {
				"title": "Tick Space maj-val",
				"type": "string",
				"description": "space between the sub ticks of the gauge."
			},
			"gauge-units": {
				"title": "Gauge Units",
				"type": "string",
				"description": "Unit of the values to be shown(ex. Kmph,%)."
			},
			"tick-col-maj": {
				"title": "Tick col-maj",
				"type": "string",
				"description": "sets colour of the major tick."
			},
			"tick-col-min": {
				"title": "Tick col-min",
				"type": "string",
				"description": "sets colour of the sub tick."
			},
			"outer-edge-col": {
				"title": "Outer Edge colour",
				"type": "string",
				"description": "sets the colour of outer circle of the gauge."
			},
			"pivot-col": {
				"title": "Pivot colour",
				"type": "string",
				"description": "sets colour of the pivot."
			},
			"inner-col": {
				"title": "Inner colour",
				"type": "string",
				"description": "sets colour of inner body of the gauge."
			},
			"units-label-col": {
				"title": "Units Label Colour",
				"type": "string",
				"description": "sets colour of units label."
			},
			"tick-label-col": {
				"title": "Tick Label Colour",
				"type": "string",
				"description": "sets colour of labels of the ticks."
			},
			"needle-col": {
				"title": "Needle Colour",
				"type": "string",
				"description": "sets colour of the needle."
			},
			"default-fonts": {
				"title": "Default Fonts",
				"type": "string",
				"description": "sets the default fonts in gauge."
			},
			"api": {
				"title": "Api",
				"type": "string",
				"description": "Name of the api to get data."
			},
			"on-format-data": {
				"title": "Format Data",
				"type": "string",
				"description": "Callback function to be called after data is returned from backend."
			},
			"transport": {
				"title": "Transport",
				"type": "string",
				"description": "Method used to call api (can take 'http' or 'wss')."
			},
			"msg-tag": {
				"title": "Message Tag",
				"type": "string",
				"description": "Subscribe to socket messages with tag name."
			},
			"api-params": {
				"title": "Api Params",
				"type": "string",
				"description": "Api parameters."
			}
		},
		"required": []
	}
},
{
	"label": "Odometer",
	"class": "scriptr-odometer",
	"defaults": {
		"transport": "wss",
		"msg-tag": "odometer",
		"api": "UIComponents/dashboard/frontend/examples/odometer/getOdometerVal",
        "animation": "count",
        "duration": "1000"
	},
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAAlCAYAAABF7RcQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0MzlBMzQxRTdCNjExRTZCREVBQURCRkE1MTI4QTFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0MzlBMzQyRTdCNjExRTZCREVBQURCRkE1MTI4QTFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQzOUEzM0ZFN0I2MTFFNkJERUFBREJGQTUxMjhBMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQzOUEzNDBFN0I2MTFFNkJERUFBREJGQTUxMjhBMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75PGiuAAAGNUlEQVR42uxb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",
	 "form": [
	            {
	                type: "tabs",
	                tabs: [
	                  {
	                    title: "Data",
	                    items: [
                          "odometer-value",
	                      "transport",
	                      "msg-tag",
	                      "api",
	                      "api-params",
	                      "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Gauge behaviour",
	                    items: ["duration", "animation"]
	                  },
	                  {
	                    title: "Theme",
	                    items: ["theme"]
	                  }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
			"odometer-value": {
				"title": "Odometer Value",
				"type": "string",
				"description": "Set a static value for Odometer."
			},
			"theme": {
				"title": "Theme",
				"type": "string",
				"description": "Specify the theme (if you have more than one theme css file on the page)."
			},
			"duration": {
				"title": "Duration",
				"type": "string",
				"description": "Change how long the javascript expects the CSS animation to take."
			},
			"animation": {
				"title": "Animation",
				"type": "string",
				"description": "Count is a simpler animation method which just increments the value,use it when you're looking for something more subtle."
			},
			"api": {
				"title": "Api",
				"type": "string",
				"description": "Name of the api to get data."
			},
			"on-format-data": {
				"title": "Format Data",
				"type": "string",
				"description": "Callback function to be called after data is returned from backend."
			},
			"transport": {
				"title": "Transport",
				"type": "string",
				"description": "Method used to call api (can take 'http' or 'wss')."
			},
			"msg-tag": {
				"title": "Message Tag",
				"type": "string",
				"description": "Subscribe to socket messages with tag name."
			},
			"api-params": {
				"title": "Api Params",
				"type": "string",
				"description": "Api parameters."
			}
		},
		"required": []
	}
}
]});