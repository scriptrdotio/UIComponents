angular
  .module('DashboardBuilder')
  .constant("config", {
    script: {
      "form": [{
      "key": "scriptName",
      "notitle": true,
      "placeholder": "Script Name"
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
         "requiresLogin": "No",
         "publishChannel": "requestChannel",
         "subscribeChannel": "responseChannel"
       },
      "form": ["*"],
      "schema": {
       	"type": "object",
		"title": "Schema",
		"properties": {
            "requiresLogin": {
				"title": "Requires Login",
				"type": "string",
                "enum": ["Yes", "No"],
				"description": "Scriptr token."
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
        },
        "required": [
			"token", "baseUrl", "publishChannel", "subscribeChannel"
		]
    }},
    defaultWidget: {
	"name": "message",
    "label": "Display Box",
	"class": "dsp-box",
	"defaults": {
		"transport": "wss",
		"msg-tag": "myMessage",
        "text" : "",
        "type": "info"
	},
    "box": {
       sizeX: 1,
       sizeY: 1,
       minSizeX: 1,
       minSizeY: 1,
       maxSizeY: 1
    }
    },
    widgets :[
      {
        "name": "bar",
        "label": "Bar Chart",
        "class": "scriptr-chart",
        "show": true,
        "defaults": {
            "type": "bar",
            "stacked": "true",
            "xkey": "y",
            "ykeys": "[\"a\", \"b\"]",
            "labels": "[\"Serie A\", \"Serie B\"]",
            "colors": "[\"#7ed38c\", \"#dd7ca7\"]",
            "transport": "wss",
            "msg-tag": "chart",
            "data": '[{"y":"2006","a":88,"b":20},{"y":"2007","a":30,"b":34},{"y":"2008","a":90,"b":42},{"y":"2009","a":89,"b":59},{"y":"2010","a":43,"b":61},{"y":"2011","a":85,"b":69},{"y":"2012","a":29,"b":65}]'
        },
       "box": {
         sizeY: 2,
         sizeX: 2,
         minSizeX: 1,
         minSizeY: 1 //, maxSizeY: 2
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
                   // "on-format-data"
                  ]
                },
                {
                  title: "Dimensions",
                  items:[{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["xkey", "ykeys", "units", "ymin", "ymax"]
                      },
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["goals", "goal-stroke-width", "event-stroke-width", "events"]
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
                        "items": ["grid-text-weight", "grid-text-size", "grid-text-color", "grid-text-family"]
                      },
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [
                            "colors",
                            "goal-line-colors",
                            "event-line-colors"
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
                                          "key": "resize",
                                          "type": "radios-inline",
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
                                 	  }	
                                     
                            		]
                          },
                          {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
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
                              },
                               "hide-hover"/*"hover-callback"*/]
                          }
                       ]
                    }
                  ]
                },
                {
                   title: "Labels",
                   items: [
                        "labels",
                        "xlabel-angle",
                       // "ylabel-format",
                    	"post-units",
                    	"pre-units"
                   ]
                },
                {
                  title: "Box Properties",
                  items: [
                   "boxLabel"
                  ]
                }
              ]
            }
     ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
            "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"data": {
				"title": "Data",
				"type": "string",
				"description": "Data series in case of static data.",
              	"x-schema-form": {
                  "type": "textarea",
                  "placeholder":  "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
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
				"type": "number",
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
				"description": "Set to true to enable automatic resizing when the containing element resizes. (default: false). This has a significant performance impact, so is disabled by default.",
                "default": "true",
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			},
			"transport": {
				"title": "Transport",
				"type": "string",
                "enum": ["wss", "https"],
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
				"type": "number",
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
				"type": "number",
				"description": "Width, in pixels, of the goal lines."
			},
			"goal-line-colors": {
				"title": "Goal Line Colors",
				"type": "string",
				"description": "Array of color values to use for the goal line colors."
			},
			"events": {
				"title": "Events",
				"type": "string",
				"description": "A list of x-values to draw as vertical 'event' lines on the chart. events: ['2012-01-01', '2012-02-01']"
			},
			"event-stroke-width": {
				"title": "Event Stroke Width",
				"type": "number",
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
{	"name": "area",
	"label": "Area Chart",
	"class": "scriptr-chart",
 	"show": true,
	"defaults": {
		"type": "area",
		"xkey": "y",
		"ykeys": "[\"a\", \"b\"]",
		"labels": "[\"Serie A\", \"Serie B\"]",
        "colors": "[\"#CC5464\", \"#38B9D6\"]",
		"transport": "wss",
		"msg-tag": "chart",
        "data": '[{"y":2000,"a":64,"b":82},{"y":2003,"a":53,"b":48},{"y":2004,"a":81,"b":58},{"y":2005,"a":68,"b":72},{"y":2008,"a":52,"b":60},{"y":20011,"a":55,"b":30},{"y":2013,"a":79,"b":40}]'
	},
    "box": {
       sizeX: 2,
       sizeY: 2,
       minSizeX: 1,
       minSizeY: 1 //, maxSizeY: 2
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
	                   //   "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Dimensions",
	                    items:[{
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["xkey", "ykeys", "units", "ymin", "ymax"]
	                        },
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["goals", "goal-stroke-width", "events", "event-stroke-width"]
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
		                          "point-stroke-colors",
	                              "event-line-colors",
                                  "fill-opacity",
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
                                      "key": "resize",
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
		                              key: "smooth",
		                              titleMap: [
		                                { value: "true", name: "True" },
		                                { value: "false", name: "False" }
		                              ]
		                          },
                             //     "date-format",
                              //    "xlabel-format",
                               //   "ylabel-format"
                                  ]
                                 },
                                 {
                                  "type": "section",
                                  "htmlClass": "col-xs-6",
                                  "items": [
                                     {
                                        type: "radios-inline",
                                        key: "continuous-line",
                                        titleMap: [
                                          { value: "true", name: "True" },
                                          { value: "false", name: "False" }
                                        ]
                                     }, /* "hover-callback", */"hide-hover", "behave-like-line"
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
                           		"xlabels",
                            	"xlabel-angle",
		                      	"post-units",
		                      	"pre-units"
		                        ]
	                  },
                      {
                        title: "Box Properties",
                        items: [
                         "boxLabel"
                        ]
                      }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
            "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"data": {
				"title": "Data",
				"type": "string",
				"description": "Data series in case of static data.",
                "x-schema-form": {
                  "type": "textarea",
                  "placeholder":  "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
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
			"line-width": {
				"title": "Line Width",
				"type": "number",
				"description": "Width of the series lines, in pixels."
			},
			"point-size": {
				"title": "Point Size",
				"type": "number",
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
				"type": "number",
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
				"type": "number",
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
				"description": "A list of x-values to draw as vertical 'event' lines on the chart. events: ['2012-01-01', '2012-02-01']"
			},
			"event-stroke-width": {
				"title": "Event Stroke Width",
				"type": "number",
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
				"type": "number",
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
				"type": "number",
				"description": "Change the opacity of the area fill color. Accepts values between 0.0 (for completely transparent) and 1.0 (for completely opaque)."
			},
			"resize": {
				"title": "Resize",
				"type": "string",
                "default" : "true",
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
                "enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": [
			"xkey", "ykeys"
		]
	}
},
   { 
    "name": "line",
	"label": "Line Chart",
	"class": "scriptr-chart",
    "show": true,
	"defaults": {
		"type": "line",
		"xkey": "y",
		"ykeys": "[\"a\", \"b\"]",
		"labels": "[\"Serie A\", \"Serie B\"]",
        "colors": "[ \"#FCC717\", \"#38B9D6\"]",
		"transport": "wss",
		"msg-tag": "chart",
        "data":  '[{"y": 2006, "a": 2, "b": 3 }, { "y": 2007, "a": 82, "b": 68 }, { "y": 2009, "a": 70, "b": 99 }, { "y":2010, "a": 30, "b": 64 }, { "y": 2011, "a": 72, "b":100 }, { "y": 2012, "a": 81, "b": 81 }, { "y": 2013,"a": 52, "b": 39 } ]'
	},
    "box": {
       sizeX: 2,
       sizeY: 2,
       minSizeX: 1,
       minSizeY: 1 //,maxSizeY: 2
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
                    //   "on-format-data"
                  ]
                },
                {
                  title: "Dimensions",
                  items:[{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["xkey", "ykeys", "units", "ymin", "ymax"]
                      },
                      {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["goals", "goal-stroke-width", "events", "event-stroke-width"]
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
                            "point-stroke-colors",
                            "event-line-colors",
                            "fill-opacity",
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
                              "key": "resize",
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
                              key: "smooth",
                              titleMap: [
                                { value: "true", name: "True" },
                                { value: "false", name: "False" }
                              ]
                            },
                            //     "date-format",
                            //    "xlabel-format",
                            //   "ylabel-format"
                          ]
                        },
                        {
                          "type": "section",
                          "htmlClass": "col-xs-6",
                          "items": [
                            {
                              type: "radios-inline",
                              key: "continuous-line",
                              titleMap: [
                                { value: "true", name: "True" },
                                { value: "false", name: "False" }
                              ]
                            }, /* "hover-callback", */"hide-hover", "behave-like-line"
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
                    "xlabels",
                    "xlabel-angle",
                    "post-units",
                    "pre-units"
                  ]
                },
                {
                  title: "Box Properties",
                  items: [
                    "boxLabel"
                  ]
                }
              ]
            }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
             "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"data": {
				"title": "Data",
				"type": "string",
				"description": "Data series in case of static data.",
                "x-schema-form": {
                  "type": "textarea",
                  "placeholder":  "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
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
			"line-width": {
				"title": "Line Width",
				"type": "number",
				"description": "Width of the series lines, in pixels."
			},
			"point-size": {
				"title": "Point Size",
				"type": "number",
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
				"type": "number",
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
				"type": "number",
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
				"description": "A list of x-values to draw as vertical 'event' lines on the chart. events: ['2012-01-01', '2012-02-01']"
			},
			"event-stroke-width": {
				"title": "Event Stroke Width",
				"type": "number",
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
				"type": "number",
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
				"type": "number",
				"description": "Change the opacity of the area fill color. Accepts values between 0.0 (for completely transparent) and 1.0 (for completely opaque)."
			},
			"resize": {
				"title": "Resize",
				"type": "string",
                "default" : "true",
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
                "enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": [
			"xkey", "ykeys", "labels"
		]
	}
},
{
	"name":"donut",
    "label": "Donut Chart",
	"class": "scriptr-chart",
    "show": true,
	"defaults": {
		"type": "donut",
		"transport": "wss",
        "data": '[{label: "Drillers", value: 50}, {label: "Cranes",value: 20 }, {label: "Blasters", value: 30 }]',  
        "msg-tag": "donut",
     	"background-color":"#eee",
        "label-color":"ff0000",
        "parse-time": "false"
	},
   "box": {
       sizeX: 2,
       sizeY: 2,
       minSizeX: 1,
       minSizeY: 1//, maxSizeY: 2
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
	                     // "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Colors",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": ["colors",  "label-color"]
	                        },
	                        {
	                          "type": "section",
	                          "htmlClass": "col-xs-6",
	                          "items": [
	                              "background-color"
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
	                   },
                {
                  title: "Box Properties",
                  items: [
                   "boxLabel"
                  ]
                }
                      ]
                }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
             "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"data": {
				"title": "Data",
				"type": "string",
                "style": "control-label",
				"description": "Data series in case of static data.",
                "x-schema-form": {
                  "style": "control-label",
                  "type": "textarea",
                  "placeholder":  "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
                }
			},
			"colors": {
				"title": "Colors",
				"type": "string",
				"description": "Specify the color of each graph successively."
			},
			"label-color": {
				"title": "Donut Label Color",
				"type": "string",
				"description": "Donut label color."
			},
			"background-color": {
				"title": "Donut Background Color",
				"type": "string",
				"description": "Donut background color."
			},
			"donut-formatter": {
				"title": "Donut Formatter",
				"type": "string",
				"description": "Can either be a string for a filter name (eg. 'currency') or a reference to a scope function."
			},
			"resize": {
				"title": "Resize",
				"type": "string",
                "default" : "true",
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
                "enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "type": "textarea",
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": []
	}
},
{   
  	"name": "gauge",
	"label": "Gauge",
	"class": "scriptr-gauge",
    "show": true,
	"defaults": {
		"transport": "wss",
		"msg-tag": "gauge",
        "width": 100,
        "height-unit": "%",
        "height": 100,
        "gauge-value": 30
	},
  "box": {
       sizeX: 1,
       sizeY: 1,
       minSizeX: 1,
       minSizeY: 1
    },
    "imgCls": "gauge-img",
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
	                     // "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Dimensions",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
		                        {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["width", "gauge-value", "shadow-size"]
		                        },
		                        {
		 	                      "type": "section",
		 	                      "htmlClass": "col-xs-6",
		 	                      "items": ["height", "min", "max"]
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
		                          "items": ["label-font-color", "value-font-color", "custom-sectors"]
		                        },
                                 {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["gauge-color", "shadow-opacity"]
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
			                          "items": [   {
			                                        "key": "hide-min-max",
			                                          "type": "radios-inline",
			                                          titleMap: [
			                                            { value: "true", name: "True" },
			                                            { value: "false", name: "False" }
			                                          ]
			                                        }, 
                                                    {
			                                        "key": "hide-value",
			                                          "type": "radios-inline",
			                                          titleMap: [
			                                            { value: "true", name: "True" },
			                                            { value: "false", name: "False" }
			                                          ]
			                                        },
                                                	{
			                                        "key": "hide-inner-shadow",
			                                          "type": "radios-inline",
			                                          titleMap: [
			                                            { value: "true", name: "True" },
			                                            { value: "false", name: "False" }
			                                          ]
			                                        },
                                              		{
			                                        "key": "show-inner-shadow",
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
			                          "items": ["start-animation-type", "refresh-animation-type", 
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
		                  },
                {
                  title: "Box Properties",
                  items: [
                   "boxLabel"
                  ]
                }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
             "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"gauge-value": {
				"title": "Gauge Value",
				"type": "string",
				"description": "Sets the value of the gauge."
			},
			"custom-sectors": {
				"title": "Custom Sectors",
				"type": "string",
				"description": "Array of objects with color, hi, lo attributes.",
                "x-schema-form": {
              	  "type": "textarea",
                  "placeholder": "Ex: [{color : '#A3CD3B', lo : 0, hi : 25}, { color : '#FF4A43', lo : 25, hi : 100 }]"
                }
			},
			"value-font-color": {
				"title": "Value Font Color",
				"type": "string",
				"description": "Color of the value text."
			},
			"min": {
				"title": "Minimum Value",
				"type": "number",
				"description": "Minimum value."
			},
			"max": {
				"title": "Maximum Value",
				"type": "number",
				"description": "Maximum value."
			},
			"hide-min-max": {
				"title": "Hide min-max",
				"type": "string",
				"description": "Hide min and max values."
			},
			"hide-value": {
				"title": "Hide Value",
				"type": "string",
				"description": "Hide value text."
			},
			"hide-inner-shadow": {
				"title": "Hide inner-shadow",
				"type": "string",
				"description": "Hide inner shadow."
			},
			"gauge-color": {
				"title": "Gauge Color",
				"type": "string",
				"description": "Background color of gauge element."
			},
			"show-inner-shadow": {
				"title": "Show inner-shadow",
				"type": "string",
				"description": "True to display inner shadow."
			},
			"shadow-size": {
				"title": "Shadow Size",
				"type": "string",
				"description": "Inner shadow size."
			},
			"shadow-opacity": {
				"title": "Shadow Opacity",
				"type": "string",
				"description": "Shadow opacity, values 0 ~ 1."
			},
			"label": {
				"title": "Label",
				"type": "string",
				"description": "Text to show below value."
			},
			"label-font-color": {
				"title": "Label Font Color",
				"type": "string",
				"description": "Color of label under the value."
			},
			"start-animation-type": {
				"title": "Start Animation Type",
				"type": "string",
				"description": "Type of initial animation (linear, >, <, <>, bounce)."
			},
			"refresh-animation-type": {
				"title": "Refresh Animation Type",
				"type": "string",
				"description": "Type of refresh animation (linear, >, <, <>, bounce)."
			},
			"counter": {
				"title": "Counter",
				"type": "string",
				"description": "Increase numbers one by one."
			},
          
            "width": {
				"title": "Gauge Width",
				"type": "number",
				"description": "Width as %."
			},
			"height": {
				"title": "Gauge height",
				"type": "number",
				"description": "Height as px."
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
             	"enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": []
	}
},
{
	"name": "speedometer",
    "label": "Speedometer",
	"class": "scriptr-speedometer",
  	"show": true,
	"defaults": {
		"transport": "wss",
		"msg-tag": "speedometer",
		"needle-val": 45,
        "gauge-radius": "70"
	},
   "box": {
       sizeX: 1,
       sizeY: 1,
       minSizeX: 1,
       minSizeY: 1//, maxSizeY: 2
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
                          "needle-val",
	                //      "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Dimensions",
	                    items: [
	                      {
	                      "type": "section",
	                      "htmlClass": "row",
	                      "items": [
		                        {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": ["gauge-radius", "min-value", "max-value"]
		                        },
		                        {
		 	                      "type": "section",
		 	                      "htmlClass": "col-xs-6",
		 	                      "items": ["tick-space-maj-val", "tick-space-min-val"]
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
		                  },
                {
                  title: "Box Properties",
                  items: [
                   "boxLabel"
                  ]
                }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
           "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"gauge-radius": {
				"title": "Gauge Radius",
				"type": "string",
				"description": "Sets the size of the gauge."
			},
			"min-value": {
				"title": "Minimum Value",
				"type": "number",
				"description": "Minimum value to be shown in gauge scale."
			},
			"max-value": {
				"title": "Maximum Value",
				"type": "number",
				"description": "Maximum value to be shown in gauge scale."
			},
			"needle-val": {
				"title": "Needle Value",
				"type": "number",
				"description": "Sets the value of needle to be pointed."
			},
			"tick-space-min-val": {
				"title": "Minor Tick Space Value",
				"type": "number",
				"description": "Space between the major ticks of the gauge."
			},
			"tick-space-maj-val": {
				"title": "Major Tick Space Value",
				"type": "number",
				"description": "Space between the sub ticks of the gauge."
			},
			"gauge-units": {
				"title": "Gauge Units",
				"type": "string",
				"description": "Unit of the values to be shown(ex. Kmph,%)."
			},
			"tick-col-maj": {
				"title": "Tick Major Color",
				"type": "string",
				"description": "Sets color of the major tick."
			},
			"tick-col-min": {
				"title": "Tick Minor Color",
				"type": "string",
				"description": "Sets color of the sub tick."
			},
			"outer-edge-col": {
				"title": "Outer Edge color",
				"type": "string",
				"description": "Sets the color of outer circle of the gauge."
			},
			"pivot-col": {
				"title": "Pivot color",
				"type": "string",
				"description": "Sets color of the pivot."
			},
			"inner-col": {
				"title": "Inner color",
				"type": "string",
				"description": "Sets color of inner body of the gauge."
			},
			"units-label-col": {
				"title": "Units Label Colour",
				"type": "string",
				"description": "Sets color of units label."
			},
			"tick-label-col": {
				"title": "Tick Label Colour",
				"type": "string",
				"description": "Sets color of labels of the ticks."
			},
			"needle-col": {
				"title": "Needle Colour",
				"type": "string",
				"description": "Sets color of the needle."
			},
			"default-fonts": {
				"title": "Default Fonts",
				"type": "string",
				"description": "Sets the default fonts in gauge."
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
              	"enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": []
	}
},
{
	"name": "thermometer",
    "label": "Thermometer",
	"class": "scriptr-thermometer",
  	"show": false,
	"defaults": {
		"transport": "wss",
		"msg-tag": "thermometer",
		"api": "UIComponents/dashboard/frontend/examples/thermometer/getThermometerValue",
        "height": 220,
	},
    "box": {
       sizeX: 1,
       sizeY: 1,
       minSizeX: 1,
       minSizeY: 1,
       maxSizeX: 1,
       maxSizeY: 1
    },
    "imgCls": "",
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzgzODQxMTZGNzg1MTFFNjk0MTBGMzg4MzJCMkQ5QjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzgzODQxMTVGNzg1MTFFNjk0MTBGMzg4MzJCMkQ5QjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoB6+/wAAAIXSURBVHja7JnNK0RRGMbv+I6QLIyIZvgjSInFlPKRyCR2WFiQj60k/wBGEmWyVcNuFjQrC1aytlCiRKFZmRDG8/LcuqahyT3NvVf3rafnfLzn3t/czjm3e8aTTCa1v4bH4/lWj8ViHbA5qAmSCx9DC4FA4NCYZ+aen/dVBQ3gSdhqmrR3KAjwPVtBA9gPO4Py2fVKz6M/QPUAf1QBnaOpiX4DcAgqp0Jsq4RaFd1LGXQN/RyaxRNNiKTMNokqu0HrcQ3Yd73C8rXieyiHzkrkqb4gFqUPtszqjCOgMSUuYL2GH6G508OFdqGzv3s0wrZYHXPK7iFvwDZ393Ch/8tCPOkf9cI6WN2POwH6trig3Zt42WZ5qNAJ0wPAN+nK7kJ0oR0GXZpBTp1toPGaHoaNZJC6yFxroQFRDVtn9R6aT5M2zz6JTYyptfpJT0Fl2tcRWHfFxs4TPGzoD6PtWfqYU6Liu9EsdA/9AHCn8F3Ib+iXcoR9ByljLINuoMsBY/MPi62OfYcpYyyD1se/QL+9sQuZI/FmNfQlXY52jwwLzhj37GtKGWMZdJTeFx8flEOaoPZ1QqqHlIPs60sZYxn0EiQ7Rq7AAO6Oi6+T8rMtypwnjjEVps+nse+OGj5kZb5GOB0kWqABAn9+6OIbMmyXQ3UBX4OKfkiVJzwhwFKx098XsrVNQ12Qj80XnBorAL7Sc81CfwgwAJTrtj6gcXkiAAAAAElFTkSuQmCC",
	 "form": [
	            {
	                type: "tabs",
	                tabs: [
	                  {
	                    title: "Data",
	                    items: [
                          "percent",
	                      "transport",
	                      "msg-tag",
	                      "api",
	                      "api-params",
	                   //   "on-format-data"
	                    ]
	                  },
                      {
                        title: "Box Properties",
                        items: [
                         "height",  {
                                     "key": "size",
                                     "type": "radios-inline",
                                     titleMap: [
                                       { value: "large", name: "large" },
                                       { value: "small", name: "small" }
                                     ]
                                   }
                        ]
                      },
                      {
                        title: "Box Properties",
                        items: [
                         "boxLabel"
                        ]
                      }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
            "percent": {
				"title": "Thermometer Value",
				"type": "string",
				"description": "Thermometer Value (0 to 100)"
			},
			"size": {
				"title": "Thermometer Size",
				"type": "string",
				"description": "Set the size of Thermometer (small)."
			},
			"height": {
				"title": "Height",
				"type": "number",
				"description": "Set the height of Thermometer."
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
                "enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": []
	}
},        
{
	"name": "odometer",
    "label": "Odometer",
	"class": "scriptr-odometer",
  	"show": true,
	"defaults": {
		"transport": "wss",
		"msg-tag": "odometer",
        "animation": "count",
        "duration": "1000",
        "size": "4",
        "odometer-value": 28022017
	},
    "box": {
       sizeX: 2,
       sizeY: 1,
       minSizeX: 1,
       minSizeY: 1,
       maxSizeY: 2
    },
    "imgCls": "odometer-img",
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAAlCAYAAABF7RcQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0MzlBMzQxRTdCNjExRTZCREVBQURCRkE1MTI4QTFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0MzlBMzQyRTdCNjExRTZCREVBQURCRkE1MTI4QTFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQzOUEzM0ZFN0I2MTFFNkJERUFBREJGQTUxMjhBMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQzOUEzNDBFN0I2MTFFNkJERUFBREJGQTUxMjhBMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75PGiuAAAGNUlEQVR42uxbeWwUVRj/bbdb2i6lpaUnUEoPrAWkHBYhCBpvjPGKMWAkROMZE9SoqPEPE0X/gMQrIWokYEwwKonGKK0RQyReGKRQKCAKrQiLtF2uHtuybdfv62M7+2Z3dneOLWwzv2RC38yb2Xnf77vf4AisxXIA6+nIho3LFWfoeMJBZPEfObY8Ln/CUmyikgbjU2wZJA9Sw87ULLelooWj9UDvGWVcfhuQPl4ZL14LjC1RxjtfB7wHNSSfAdz8kXyuYSUw6FfGBzZLl23LshK9p+Wxu0R77ljVNX+XTFQE2GRZie6T8jivRntubrXq3v9iPt4my0qcPaIiazrgcEaem18b/d64Yla8YDMuqqN/JwJp44QJ97QBHfuA9j1AIGBu4UXzgIwJ8jnvIeB8q8mcaho9ez4JMRiHvpHjkBm07xXrdlx8eFoWUHwN4PlZJTuSWd6Vqnv3JICsjDzgimVAyYLI18tuATqPAY3vAV0eY4vOKgVmr6JFqwz/4CfGyRo3BZh2H1AwWz5/fId1ZF04L4Qe+hvV99O5RopJPWLMRNasgKItEL/f0WyxG8wlbVj0hjZRocKuexlwjTWwYlrEjIfCiTKKzEKg9il67zXhRCUCR76Wx+mk3FevpmSjWHigmY8BE2bIc1q2kkUOWGxZrDkpqbJGsOlzJsPuhY/hl6SUtnwp8Ofn+hY7+Tp6TpUFUrtIOj/PMYKh+cxh4MRPwMRFyrmcSmDJusjzO48D/3xvsM6Khq4TQNOHwKwniYTPgNbvZI2oeZDc4K3KuGCOPrJY86qXyQvJmmRQahQ7MgtkojjjYoULVapEoHkTud1S4WGigV1j47sxU3bj2eDJncCPz0U23aPfqlxQvr5nV1NB7nKLvwcuUFH4sTmhHftB8QjN9KwdLwDnjibeuvp9VBC/KaxMCz4v8PsaYQCGOxjxwNeu4SY7w5Q7/nhIdceka5XxX1sou2w3J7RTfwCHvxAegAU4kmAF+e01WtMS4YrHlQkr51rM8yu9Uz29U6/JdpMZuAt1F3oivDhFfAmCM76WBop7uebehy3/768uXd0VGAT+3S6OYCZooqSxNvKyFumsHYZQfruoPYYWSIvZtyGu7CjpYLL2tI6s7DJRYwXBMefYtjjqNip8K+9Wxq0NIxNXkhDWuMEx2cCcp+XWCseKeIrN6SsBZ5oSdA9vGX1SdmWS55hMpuEUjYK+s5eIrNRMUQBn5MsZY0t97HsL58mFavNGssje0UNSsNtTXCcrsvcAcOhT3R7EHFlsEXWr5VqobTewd33sVJDvnb5CGZ9rFUSF9szGqDaxM4uU610nDWvoiICz27nPKqVIKLgbv/BVYP9GJflIKFks7HnPi+o8CG7i7n6Hirz+OArgbNGKCY1581+Jfs+Um8TBaPpA9PUuR3BriWWTmh49A575sFC4tsYEJhhDru8leb+GLWrXuviIGs3gWmrW4+FE+TpEg1vdEpv5SGTrs8Syhoh6kSyqQjnn+YVc3/ujM93Wi+IFsrcZ6qRsEx0UrrsmLQauehTDXXdOzirupBi22WKyIhHl7xb7WJV3Rb6n2yMq9khdkK0PxAjQlLRc/7Yy5i0SLpbjBW+L8BGKYD03nOTMlefwJqCOFlAYKu6Qx9xy2r9JieHsurMoM5y6VJlTegMV71/G7LLoI4vrqFCihtJStzZRwZZPJLJGApxtVt0TfU7VvfKYFcIoWbwhy0SEghve6mSLuyqlNyolC7vMgtqYctIXsxz2VwBRod6qZ49z+lD4PPZGp3bJ5+LYa9NnWf3dIlDqATc0DbdnBuTf8+tsxhp5X7+Jhq/a63Q0ac9tp2slC0NcdpnFZHG80BMzzII/7dq+yvj9I/2+vH8WCq4dtaD+PMFdlKDU3YZG7ZilUjav9lyfN7zuivEZhE2WtUWWyqX2RHHRPbpzApushHLniN7BCIvR/Tpj1oWuTlvKGhgccEsK7u/pRoprcHjsPZCJrFKFhUDAR/KMzEB6TgrFNLeUTHW3d6rSfMmv8v/PCtgsJAdsN5hkZHlsMSQFPByzuEH3Fh1TbXlYof4uF5xpaRSDBtDf16f94QVlHy63GylOJwb9firGfVE+0mih45n/BRgA2iDYoASd98UAAAAASUVORK5CYII=",
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
                          "odometer-value",
	                   //   "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Odometer behaviour",
	                    items: ["duration", "animation", "size"]
	                  },
                {
                  title: "Box Properties",
                  items: [
                   "boxLabel"
                  ]
                }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
             "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"odometer-value": {
				"title": "Odometer Value",
				"type": "number",
				"description": "Set a static value for Odometer."
			},
			"duration": {
				"title": "Duration",
				"type": "number",
				"description": "Change how long the javascript expects the CSS animation to take."
			},
            "size": {
				"title": "Size",
				"type": "number",
				"description": "Odometer size in em. Recommended size between 0 & 5."
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
                "enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": []
	}
},
{
	"name": "progressbar",
    "label": "ProgressBar",
	"class": "scriptr-progressbar",
  	"show": false,
	"defaults": {
		"transport": "wss",
		"msg-tag": "progressbar",
		"api": "UIComponents/dashboard/frontend/examples/progressBar/getProgressBarVal",
        "value": "20",
        "animate": "true",
        "title": "Progress bar",
        "class": "progress-striped active"
	},
    "box": {
       sizeX: 2,
       sizeY: 1,
       minSizeX: 1,
       minSizeY: 1,
       maxSizeY: 1
    },
    "imgCls": "",
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzIwMzYyNENGNzg1MTFFNkEwRUNDNjZDRjJCNDk3Q0YiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzIwMzYyNEJGNzg1MTFFNkEwRUNDNjZDRjJCNDk3Q0YiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnTLjfAAAAHGSURBVHja7JffK0NhGMe3mRWLbBEXLshc0eHOnbh2Q4miSC1kSpblbyBEWpRtRbI7/Aei3LhQfl65k/zI7581NN+3nlOvpzPjzup569Pznn3O8+57zt5zavZkMmnLtOGwZeCQ0BJaQktoCS2hJbSEltBphrM7etCCGgYJ7fMsUMrOfQNXNM8FRczfgweau0HhH/0deEyzvsoQcFDg+iW/UWaC4zhr+ARN5HzgiHl1MQb5SnD8g/dZ+AtQRb4CHDJ/CapVTpXXqe4wTj4xbVdkvx0lxJpGcc4GzcdAg+Y+QBv8KR1P0eKp/ATz76AV/pyOx0GjRf8Z5Ut829P4wECJscBxNEyS70AJMh+C3yTfgzLIfFDznShDzA/Db2s3jK8/Ar9l+SCiwYOyTvvJHHvAT74WJcIWXMaC0+TrUOaZj8HPkq9BWWB+ET5MXv38UYv1Z6zeHtloUPtwBZRr7hY0o+kV3ov5GsjR/C7opS8sQVkFLs3vgAHyqfr7yReQd7Mb1sd2gnoeXHZM1NtjDhSzC3oGNzTPA17m1UU90TwfeJi/Bi+/7Ld6m+jeHOqmBOzyb1xCS2gJLaEltISW0BJaQv+P8SXAADiWmlqqypMfAAAAAElFTkSuQmCC",
	 "form": [
	            {
	                type: "tabs",
	                tabs: [
	                  {
	                    title: "Data",
	                    items: [
                          "value",
	                      "transport",
	                      "msg-tag",
	                      "api",
	                      "api-params",
	                   //   "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Progress bar behaviour",
	                    items: ["stacked", "class", "type", "max", {
                                     "key": "animate",
                                     "type": "radios-inline",
                                     titleMap: [
                                       { value: "true", name: "True" },
                                       { value: "false", name: "False" }
                                     ]
                                   }]
	                  },
                      {
                        title: "Box Properties",
                        items: [
                         "boxLabel"
                        ]
                      }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
            "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"value": {
				"title": "Progressbar Value",
				"type": "number",
				"description": "The current value of progress bar."
			},
			"animate": {
				"title": "Animate",
				"type": "string",
				"description": "Whether bars use transitions to achieve the width change."
			},
            "class": {
				"title": "Class",
				"type": "string",
				"description": "Can take 'progress-striped' or 'progress-striped active'"
			},
			"type": {
				"title": "Type",
				"type": "string",
				"description": "Bootstrap style type. Possible values are 'success', 'info', 'warning', and, 'danger' to use Bootstrap's pre-existing styling, or any desired custom suffix."
			},
            "max": {
                  "title": "Total number of bars",
                  "type": "string",
                  "description": "A number that specifies the total value of bars that is required.",
            },
          	"stacked": {
				"title": "Stacked",
				"type": "string",
				"description": "Array of objects representing multiple stacked progress bars.",
                 "x-schema-form": {
                      "type": "textarea",
                      "placeholder":  "[{value : 50, type : 'success', title : 'bar1'},{value : 70, type : 'warning', title : 'bar2'}]"
                  }
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
                "enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": []
	}
},
{
   "name": "map",
   "label": "Map",
	"class": "scriptr-map",
  	"show": true,
	"defaults": {
	  "transport": "wss",
      "clustered-view":"true",
      "cluster-zoom": 8,
      "assets-data": '{ "253812" : { "550153" : [ { "lat" : {"value": "40.84969"}, "long" :{"value": "-73.94168"}, "speed" : { "value" : "8", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "30", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.3", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2818", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "91", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.99", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "61","description" : "Received Signal Strength Indicator" } }, { "lat" :{"value": "40.84919"}, "long" : {"value": "-73.93897000000001"}, "speed": { "value" : "5", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "57", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.4","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2838", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "94", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.15", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55101"}, "make" : { "value" : "Toyota" }, "model" : { "value" : "Tacoma" },"snr" : { "value" : "9", "description" : "Signal to Noise Ratio" },"rssi" : { "value" : "48", "description" : "Received Signal StrengthIndicator" } }, { "lat" : {"value": "40.848600000000005"}, "long" :{"value": "-73.93648"}, "speed" : { "value" : "9", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "76", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.2", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2465", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "97", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.39", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "69","description" : "Received Signal Strength Indicator" } } ], "source" :"simulator", "order" : [ "550153" ] }, "253815" : { "550191" : [ { "lat": {"value": "40.80913"}, "long" : {"value": "-73.90327"}, "speed" : {"value" : "7", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "56", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.2","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2123", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "100", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.45", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55043"}, "make" : { "value" : "Saab" }, "model" : { "value" : "9-3" }, "snr" :{ "value" : "13", "description" : "Signal to Noise Ratio" }, "rssi" : {"value" : "49", "description" : "Received Signal Strength Indicator" }}, { "lat" : {"value": "40.807500000000004"}, "long" : {"value":"-73.90557000000001"}, "speed" : { "value" : "6", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "16", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.7", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "1946", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "95", "description" :"Engine Temperature" }, "voltage" : { "value" : "12.87", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55043" }, "make" : { "value" : "Saab" },"model" : { "value" : "9-3" }, "snr" : { "value" : "13", "description" :"Signal to Noise Ratio" }, "rssi" : { "value" : "59", "description" :"Received Signal Strength Indicator" } } ], "source" : "simulator","order" : [ "550191" ] } }',
      "sources-info": "{'simulator': {'label': 'Carvoyant'}}",
      "msg-tag": "everyone-main-live"
	 },
    "box": {
       sizeX: 2,
       sizeY: 2,
       minSizeX: 2,
       minSizeY: 2
    },
   "imgCls": "",
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkU0NTdGMTJGMUU1MTFFNkJDRDE5REMyQjEzM0VEQzYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkU0NTdGMTFGMUU1MTFFNkJDRDE5REMyQjEzM0VEQzYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phrv2GYAAAP1SURBVHja7JlrSFRBFMfnqklWW5qP0NK2KCgqo6DACntpRQ8MAwtK+tBLiygiqCiIDAyjD/Uhn5VFH8oUKYuCMiUqS4JKgojIrdQv+SDDtJe72//ocZu97euuXlfBgT9nd+48fvfMzNmZWcVqtQo5KYoi+jr9qYpIgNkDLYZCoG9QFZQ3bEHjLWf11Gw2Rj2hARsIkw9tdVGMoDcDvt1TaD+hb7rgBphSElSEF/SYRTdoQKyESbUbxeFGoYxdJZSgqeria8jbnrYdoKOX99p5x5gh/CJ3/Rv6phvCXLsfH8xy+as+9TTSUpuHQ9fZAXflhacIvwi7gZiH0RnhM2h0boCxASjByxxHgZAEdVaEz6ARCdpg2mwZlp+OC1o67L5BzdEP0sI1Q6NSFjSpD9jv2eZvcwkzqZgxr6X0CC/7HbYU/VdA8501/F+cjilPpwwrd5oD3a1PzLV4QomOpsOkQKdMI0sXwlbYOgpbL/yNJzEMmAGdrcJSlyksX67I1TdObk+ugX3Xk1GXkKNoiR5UeDXrE2DyYC8CvskBaCTMJg5vczi7HiqEXtAC6/b2TdHZXIYeRwthbpOjBqUP5GFoDFQpL2JvQ56RPAedAGAxbDb0Bkrm2LpcNc1olOIw1JewIA/J3u6aIvCyg3QU5TuFyG1BH2XuoF0txGPQTqiGvwcy5FPoK3QZSpTaIK8eJOdjRHbwgqxkD7pKj6FiLYvFlafb0XkBbAHePg52N89XgvfnMo3QOfoZRtlaJ+3sg1ZAoxxFRygNL2fVAu1RyAPQM4jm7ATosBTOKD/TBTB5uwHmgJPHx/H8rdawpClO00KEsvDRpDFu04jdVmXTNDvtTSzVe5cnp208nQSPVCpexjygoQHYxNtUmr/p+P7R27b609MCPx7VMEtgy3vTTr9CI50B8A8+zQwa6FCKONDEwQQtpBg/qKDFEPQQ9BD0wIAOw84x1tvKAf1FCcgpfKCgNJ726ch7wke6EmzEfg8IaEBRTF5Lew3eU6vPfItYZ1GWrtDyfAYNgHEw2yG6oYlWPX5IBwtoFpehsnRtcASi41lDb6DnovNgDFurBth49uoG2thJj6gNOnpno733nFeE8hl81qQ68bzGYtz14+wKoSfRbco16Dw6eyXBvYaZLbqvaelEs4WPYzNV7b+kutB11O9w88IzuA1qz+DqCsERNJ3p0qBpqrLVfBKnG5bnDE175CDV+e8XQdICA2i1F1PLwE5IB3SsR9B0qY6KCh/j6c2TVNOohQ+3BlVbJo4EhYBt6Yu14fU/AXiBKL5KoGuBKPXNFnSHYe97ehOlO7QEH8Bep/9OaP5RiMoH6Ge9QqYz6L8CDAAxBVRygRGqnQAAAABJRU5ErkJggg==",
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
                          "assets-data"
	                   //   "on-format-data"
	                    ]
	                  },
	                 
	                  {
	                    title: "Map behaviour",
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
                                    "key": "clustered-view",
                                    "type": "radios-inline",
                                     titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                   },
                                   "cluster-zoom",
                                   "clustered-zoom-max",
                                   "detailed-zoom-min",
                                ]
                              },
                              {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                  {
                                    "key": "marker-info-window",
                                    "type": "radios-inline",
                                    titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                  },
                                  "focused-marker-zoom",
                                  "path-stroke-opacity",
                                  "path-stroke-weight",
                                  "max-asset-points"
                                ]
                              }
                            ]
                         },
                         {
                            "type": "section",
                            "htmlClass": "row",
                            "items": [
                               {
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": [
                                   
                                  "sources-info", "default-center",
                                ]
                              }
                              
                            ]
                         }
                          
                          
                                 
                                 
                                   
                                    /** "detailed-zoom-min", **/
                                   
                                    /**, "tracked-asset"**/
                                    ]
	                  },
	                 /** {
		                    title: "Geofence behaviour",
		                    items: [ "geofence-manager", "api-geofence", "api-geofence-params", "msg-tag-geofence"]
		               },**/
                      {
                        title: "Box Properties",
                        items: [
                         "boxLabel"
                        ]
                      },
                      {
	                    title: "Help",
	                    items: [
	                     {
                            "type": "help", 
                            "helpvalue": "<div class=\"alert alert-info\"><h4>Map data format is as below, where: <br/> <br/>\"253831\": asset id, <br/> <br/> \"550488\": asset trip id & contains an array  of asset trip points data,  <br/> <br/>  \"order\" : [ \"550488\" ]\r\n   contains the asset's trips order <br/> <br/>and \"source\" : \"simulator\" is the asset source name.  </h4></div> <pre class=\"map-help-settings\">{\"253831\" : {\r\n      \"550488\" : [\r\n            {\r\n               \"lat\" : {\"value\": \"40.859140000000004\"},\r\n               \"long\" : {\"value\": \"-72.67528\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"6\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"57\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"0.9\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"2181\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"104\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"13.38\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"11\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"46\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            },\r\n            {\r\n               \"lat\" : {\"value\": \"40.859790000000004\"},\r\n               \"long\" : {\"value\": \"-72.67344\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"11\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"23\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"1.6\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"1498\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"87\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"13.68\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"10\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"49\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            },\r\n            {\r\n               \"lat\" : {\"value\": \"40.86056000000001\"},\r\n               \"long\" : {\"value\": \"-72.67124000000001\"},\r\n               \"speed\" : {\r\n                  \"value\" : \"15\",\r\n                  \"description\" : \"Maximum Speed Recorded (since the previous reading)\"\r\n               },\r\n               \"fuel\" : {\r\n                  \"value\" : \"32\",\r\n                  \"description\" : \"Percentage of Fuel Remaining\"\r\n               },\r\n               \"fuelRate\" : {\r\n                  \"value\" : \"1.8\",\r\n                  \"description\" : \"Rate of Fuel Consumption\"\r\n               },\r\n               \"rpm\" : {\r\n                  \"value\" : \"1323\",\r\n                  \"description\" : \"Engine Speed\"\r\n               },\r\n               \"coolantTemperature\" : {\r\n                  \"value\" : \"91\",\r\n                  \"description\" : \"Engine Temperature\"\r\n               },\r\n               \"voltage\" : {\r\n                  \"value\" : \"14.30\",\r\n                  \"description\" : \"Battery Voltage\"\r\n               },\r\n               \"status\" : {\r\n\t               \"value\" : \"RUNNING\"\r\n               },\r\n               \"address\" : {},\r\n               \"mileage\" : {\r\n\t               \"value\" : \"54849\"\r\n               },\r\n               \"make\" : {\r\n\t               \"value\" : \"Jeep\"\r\n               },\r\n               \"model\" : {\r\n\t               \"value\" : \"Wrangler\"\r\n               },\r\n               \"snr\" : {\r\n                  \"value\" : \"13\",\r\n                  \"description\" : \"Signal to Noise Ratio\"\r\n               },\r\n               \"rssi\" : {\r\n                  \"value\" : \"57\",\r\n                  \"description\" : \"Received Signal Strength Indicator\"\r\n               }\r\n            } ],\r\n      \"source\" : \"simulator\",\r\n      \"order\" : [ \"550488\" ]\r\n   } }</pre>"
                          }
	                    ]
	                  },
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
         "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
			"clustered-view": {
				"title": "Clustered View",
				"type": "string",
				"description": "Render map with a cluster view for conglomerate markers or not."
			},
			"cluster-zoom": {
				"title": "Cluster Zoom",
				"type": "number",
				"description": "The initial map zoom level when clustered view is true.",
				"default": 3
			},
			"clustered-zoom-max": {
				"title": "Cluster Zoom Max",
				"type": "number",
				"description": "Map max zoom level with a rendered cluster view.",
			   "default": 11
			},
			"focused-marker-zoom": {
				"title": "Focused marker zoom",
				"type": "number",
				"description": "Zoom level when focusing on a single marker. If not set it is equal to detailed map zoom + 3.",
			},
            "detailed-zoom-min": {
				"title": "Detailed map initial zoom",
				"type": "number",
				"description": "Ignored when clustered view true.",
                "default": 0
			},
			"max-asset-points": {
				"title": "Max marker trip points",
				"type": "string",
				"description": "Number of tracked trip points per marker, do not set if infinite.",
				"default": 100
			},
			"marker-info-window": {
				"title": "Show marker info",
				"type": "string",
				"description": "Whether to show an info window on marker click.",
				"default": "true"
			},
			"default-center": {
				"title": "Default Map Center",
				"type": "string",
				"description": "Default map center before marker(s) is/are loaded. String format lat,long.",
				"default": "40.7053111,-74.258188"
			},
         "sources-info": {
                "title": "Sources Info",
                "type": "string",
                "description": "Sources Info.ex: {'stream': {'label': 'Carvoyant', 'url': 'http://icons.iconarchive.com/icons/graphicloads/flat-finance/32/lock-icon.png'}}",
                  "x-schema-form": {
                       "type": "textarea",
                       "placeholder":  "{'stream': {'label': 'Carvoyant', 'url': 'http://icons.iconarchive.com/icons/graphicloads/flat-finance/32/lock-icon.png'}}"
                   }
         },
         "assets-data": {
                "title": "Markers data",
                "type": "string",
                "description": "Static markers data",
                  "x-schema-form": {
                       "type": "textarea",
                       "placeholder":  '{ "253812" : { "550153" : [ { "lat" : {"value": "40.84969"}, "long" :{"value": "-73.94168"}, "speed" : { "value" : "8", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "30", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.3", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2818", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "91", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.99", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "61","description" : "Received Signal Strength Indicator" } }, { "lat" :{"value": "40.84919"}, "long" : {"value": "-73.93897000000001"}, "speed": { "value" : "5", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "57", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.4","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2838", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "94", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.15", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55101"}, "make" : { "value" : "Toyota" }, "model" : { "value" : "Tacoma" },"snr" : { "value" : "9", "description" : "Signal to Noise Ratio" },"rssi" : { "value" : "48", "description" : "Received Signal StrengthIndicator" } }, { "lat" : {"value": "40.848600000000005"}, "long" :{"value": "-73.93648"}, "speed" : { "value" : "9", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "76", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.2", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "2465", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "97", "description" :"Engine Temperature" }, "voltage" : { "value" : "13.39", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55101" }, "make" : { "value" : "Toyota" },"model" : { "value" : "Tacoma" }, "snr" : { "value" : "11","description" : "Signal to Noise Ratio" }, "rssi" : { "value" : "69","description" : "Received Signal Strength Indicator" } } ], "source" :"simulator", "order" : [ "550153" ] }, "253815" : { "550191" : [ { "lat": {"value": "40.80913"}, "long" : {"value": "-73.90327"}, "speed" : {"value" : "7", "description" : "Maximum Speed Recorded (since theprevious reading)" }, "fuel" : { "value" : "56", "description" :"Percentage of Fuel Remaining" }, "fuelRate" : { "value" : "1.2","description" : "Rate of Fuel Consumption" }, "rpm" : { "value" :"2123", "description" : "Engine Speed" }, "coolantTemperature" : {"value" : "100", "description" : "Engine Temperature" }, "voltage" : {"value" : "13.45", "description" : "Battery Voltage" }, "status" : {"value" : "RUNNING" }, "address" : {}, "mileage" : { "value" : "55043"}, "make" : { "value" : "Saab" }, "model" : { "value" : "9-3" }, "snr" :{ "value" : "13", "description" : "Signal to Noise Ratio" }, "rssi" : {"value" : "49", "description" : "Received Signal Strength Indicator" }}, { "lat" : {"value": "40.807500000000004"}, "long" : {"value":"-73.90557000000001"}, "speed" : { "value" : "6", "description" :"Maximum Speed Recorded (since the previous reading)" }, "fuel" : {"value" : "16", "description" : "Percentage of Fuel Remaining" },"fuelRate" : { "value" : "1.7", "description" : "Rate of FuelConsumption" }, "rpm" : { "value" : "1946", "description" : "EngineSpeed" }, "coolantTemperature" : { "value" : "95", "description" :"Engine Temperature" }, "voltage" : { "value" : "12.87", "description" :"Battery Voltage" }, "status" : { "value" : "RUNNING" }, "address" : {},"mileage" : { "value" : "55043" }, "make" : { "value" : "Saab" },"model" : { "value" : "9-3" }, "snr" : { "value" : "13", "description" :"Signal to Noise Ratio" }, "rssi" : { "value" : "59", "description" :"Received Signal Strength Indicator" } } ], "source" : "simulator","order" : [ "550191" ] } }'
                   }
         },
         "path-stroke-opacity":{
         	"title": "Path stroke opacity",
				"type": "number",
				"description": "Default marker trail opacity.",
				"default": 0
					
   		}, 
          "path-stroke-weight": {
            "title": "Path stroke weight",
            "type": "number",
            "description": "Default marker trail stroke weight.",
            "default": 1
          },
       	"api": {
           "title": "Api",
           "type": "string",
           "description": "Api to load map data. ex:  UIComponents/dashboard/frontend/examples/map/locksData"
         },
         "transport": {
            "title": "Transport",
            "type": "string",
            "enum": ["wss"],
            "description": "Method used to call api (can take only 'wss')."
          },
          "msg-tag": {
            "title": "Message Tag",
            "type": "string",
            "description": "Subscribe to socket messages with tag name."
          },
          "api-params": {
            "title": "Api Params",
            "type": "string",
            "description": "Api parameters.",
            "x-schema-form": {
              "placeholder": "Ex: {'id' : '599865'}"
            }
          }
		},
		"required": []
	}
}
/*        
{
	"name": "grid",
    "label": "Grid",
	"class": "scriptr-grid",
  	"show": true,
	"defaults": {
		   "columns-definition" : "[{'headerName': 'Name', 'field': 'name'}, {'headerName': 'Model', 'field': 'model'}, {'headerName': 'Price', 'field': 'price', 'type': 'numeric'}]",
           "row-data": "[{name: 'Toyota', model: 'Celica', price: 35000},{name: 'Ford', model: 'Mondeo', price: 32000},{name: 'Porsche', model: 'Boxter',price: 72000}]",
           "enable-sorting":"true",
        //   "api":'UIComponents/dashboard/frontend/examples/grid/getCarsInfo',
           "enable-delete-row":'true',
      //     "row-model-type":'pagination',
           "grid-height":"300",
           "enable-add-row":'true',
           "on-cell-value-changed-script":'UIComponents/dashboard/frontend/examples/grid/editRow',
           "on-insert-row-script":'UIComponents/dashboard/frontend/examples/grid/addRow',
           "on-delete-row-script":'UIComponents/dashboard/frontend/examples/grid/removeRow',
           "cell-editable":'true',
           "enable-client-side-filter":'true',
           "enable-server-side-filter":'false' ,
           "enable-server-side-sorting":'false',
           "row-model-selection":'multiple',
           "pagination-page-size":'20',
           "transport":'wss'
	},
    "box": {
       sizeX: 2,
       sizeY: 2,
       minSizeX: 2,
       minSizeY: 1,
       maxSizeY: 4
    },
    "imgCls": "grid-img",
	"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAlCAYAAADr2wGRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjcyMDZGOUNFMkQ4MTFFNkFCMDVFNzRFRDY1MTM5NTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjcyMDZGOUJFMkQ4MTFFNkFCMDVFNzRFRDY1MTM5NTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI4MzFBMzJFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI4MzFBMzNFMjNGMTFFNkI3QzZCNjA5NTZDRTlDNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zhsgjAAAA1klEQVR42mK8fPnyf4YhDpgYhgEY9cSoJ0Y9MeqJUU+MegIfYAHiQoZRMAqoAhhl92Q0kKl3wmOXGR9ADKAZBUBKgAwzFgDNeAA1IwFIKZCbJ+rJ9MQCIP4AZYM8IU+GGQeA+AGUDfKE/WgRO+qJUU+MemLUE6OeoEUD8CCZen8gsU8gVVqkgA9I7AujDajh0AB0IFPvCWDj7Qe08WYBpDjIMOMCUiPSgMxGJDhP7CfTE4pI+WAFmQ1AR2gjENwqHm0Ajnpi1BOjnhj1xKgnRj2BAwAEGADGZCnIfk5TtQAAAABJRU5ErkJggg==",
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
                          "columns-definition",
                          "row-data"
	                   //   "on-format-data"
	                    ]
	                  },
	                  {
	                    title: "Grid behaviour", 
	                    items: [
                              {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                  {
                                    "type": "section",
                                    "htmlClass": "col-xs-6",
                                    "items": ["pagination-page-size"]
                                  }
                                ]
                              },
		                      {
		                      "type": "section",
		                      "htmlClass": "row",
		                      "items": [
		                        {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": [
                                    "row-model-type",
                                    {
                                    "key": "enable-add-row",
                                    "type": "radios-inline",
                                    titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                    },
                                    {
                                    "key": "enable-client-side-sorting",
                                    "type": "radios-inline",
                                    titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                  },
                                  {
                                    "key": "enable-client-side-filter",
                                    "type": "radios-inline",
                                    titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                  },
                                  {
                                    "key": "cell-editable",
                                    "type": "radios-inline",
                                    titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                  },
                                 ]
		                        },
                                 {
		                          "type": "section",
		                          "htmlClass": "col-xs-6",
		                          "items": [
                                    "row-model-selection",
                                    {
                                    "key": "enable-delete-row",
                                    "type": "radios-inline",
                                    titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                    },
                                    {
                                    "key": "enable-server-side-sorting",
                                    "type": "radios-inline",
                                    titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                  },
                                    {
                                    "key": "enable-server-side-filter",
                                    "type": "radios-inline",
                                    titleMap: [
                                      { value: "true", name: "True" },
                                      { value: "false", name: "False" }
                                    ]
                                  },
                                   {
                                    "key": "enable-col-resize",
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
                  title: "Box Properties",
                  items: [
                   "boxLabel"
                  ]
                }
	                ]
	              }
	       ],
	"schema": {
		"type": "object",
		"title": "Schema",
		"properties": {
             "boxLabel": {
				"title": "Box Label",
				"type": "string",
				"description": "Define box title"
			},
          "columns-definition": {
            "title": "Columns definition",
            "type": "number",
            "description": "Series of data (Each column in the grid is defined using a column definition).",
            "x-schema-form": {
              "type": "textarea",
              "placeholder":  "[{'headerName': 'Name', 'field': 'name'}, {'headerName': 'Model', 'field': 'model'}, {'headerName': 'Price', 'field': 'price', 'type': 'numeric'}]"
            }
          },
			"row-data": {
				"title": "Row data",
				"type": "number",
				"description": "You pass static data to the grid.",
              "x-schema-form": {
                "type": "textarea",
                "placeholder":  "[{'name': 'Golf', 'model': 'GT', 'price' : '10000'}, {'name': 'BMW', 'model': 'Z3', 'price' : '20000'}]"
              }
			},
            "enable-client-side-sorting": {
				"title": "Enable client Side Sorting",
				"type": "number",
				"description": "Turn on client sorting for the grid."
			},
			"enable-server-side-sorting": {
				"title": "Enable Server Side Sorting",
				"type": "string",
				"description": "Turn on server sorting for the grid."
			},
          	"enable-client-side-filter": {
				"title": "Enable Client Side Filter",
				"type": "string",
				"description": "Turn on client side filter."
			},
          	"enable-server-side-filter": {
				"title": "Enable Server Side Filter",
				"type": "string",
				"description": "Turn on server side filter."
			},
          	"enable-add-row": {
				"title": "Enable Add Row",
				"type": "string",
				"description": "Turn on insert row."
			},
          	"enable-delete-row": {
				"title": "Enable Delete Row",
				"type": "string",
				"description": "Turn on delete row."
			},
          	"cell-editable": {
				"title": "Cell Editable",
				"type": "string",
				"description": "Turn on cell editing."
			},
          	"enable-col-resize": {
				"title": "Enable Column Resize",
				"type": "string",
				"description": "Enable column resize."
			},
            "row-model-type": {
				"title": "Row Model Type",
				"type": "string",
				"description": "The supported ways are 'virtual' and 'pagination' for only non-static data"
			},
            "row-model-selection": {
				"title": "Row Model Selection",
				"type": "string",
				"description": "Set to either 'single' or 'multiple' in case of backend data."
			},
            "pagination-page-size": {
				"title": "Pagination Page Size",
				"type": "string",
				"description": "Number of rows per page."
			},
            "api": {
              "title": "Api",
              "type": "string",
              "description": "Name of the api to get data.",
              "x-schema-form": {
                "placeholder":  "UIComponents/dashboard/frontend/examples/grid/getCarsInfo"
              }
            },
			"on-format-data": {
				"title": "Format Data",
				"type": "string",
				"description": "Callback function to be called after data is returned from backend."
			},
			"transport": {
				"title": "Transport",
				"type": "string",
                "enum": ["wss", "https"],
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
				"description": "Api parameters.",
                "x-schema-form": {
                  "placeholder": "Ex: {'id' : '599865'}"
                }
			}
		},
		"required": []
	}
}      
*/    
]});