const __IMAGEMAP__ = {
    "name": "imagemap",
    "label": "Imagemap",
    "class": "scriptr-imagemap",
    "commonData": true,
    "show": true,
    "defaults": {
        "data-format": "imagemap",
        "multiple-data-points": "false",
        "on-format-data": "return data;",
        "boxLabel": "Imagemap",
        "data" : "{temperature: 24,pressure: 40,co2: 40}"
    },
    "box": {
        "sizeX": 2,
        "sizeY": 4,
        "minSizeX": 2,
        "minSizeY": 2
    },
    "imgCls": "imagemap-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/imagemap.png",
    "form": [{
        "type": "tabs",
        "tabs": [{
                "title": "Map",
                "items": [{
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["width"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["height"]
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "type": "help",
                                "helpvalue": "<hr/>"
                            }]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["min-zoom"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["max-zoom"]
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "type": "help",
                                "helpvalue": "<hr/>"
                            }]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": ["image-url"]
                        }]
                    }
                ]
            },
            {
                "title": "Markers",
                "items": [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [{
                            "key": "markers-data",
                            "title": "Markers Data",
                            "style": {
                                "add": "btn-primary btn-sm pull-left"
                            },
                            "items": [{
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [{
                                            "type": "section",
                                            "htmlClass": "col-xs-4",
                                            "items": [{
                                                "key": "markers-data[].key",
                                                "title": "Key"
                                            }]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-4",
                                            "items": [{
                                                "key": "markers-data[].group",
                                                "title": "Group (optional)"
                                            }]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-4",
                                            "items": [{
                                                "key": "markers-data[].draggable",
                                                "title": "Draggable"
                                            }]
                                        }
                                    ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [{
                                            "type": "section",
                                            "htmlClass": "col-xs-6",
                                            "items": [{
                                                "key": "markers-data[].lat",
                                                "title": "Latitude"
                                            }]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6",
                                            "items": [{
                                                "key": "markers-data[].lng",
                                                "title": "Longitude"
                                            }]
                                        }
                                    ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [{
                                            "type": "section",
                                            "htmlClass": "col-xs-8",
                                            "items": [{
                                                "key": "markers-data[].icon.url",
                                                "title": "Icon url"
                                            }]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-4",
                                            "items": [{
                                                "key": "markers-data[].icon.unit",
                                                "title": "Unit"
                                            }]
                                        }
                                    ]
                                }

                            ]

                        }]
                    }]
                }]
            }
        ]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "data": {
                "title": "Static data",
                "type": "object",
                "description": "Marker static values to show",
                "codemirrorOptions": {
                    "placeholder": "{temperature: 24, pressure: 10}"
                }
            },
            "min-zoom": {
                "title": "Map minimum zoom",
                "type": "number",
                "default": 0,
                "description": "Minimum map zoom."
            },
            "max-zoom": {
                "title": "Map max zoom",
                "type": "number",
                "default": 4,
                "description": "Maximum map zoom."
            },
            "width": {
                "title": "Map image width",
                "type": "integer",
                "default": 640,
                "description": "Map image width"
            },
            "height": {
                "title": "Map image height",
                "type": "integer",
                "default": 571,
                "description": "Map image height"
            },
            "image-url": {
                "title": "Map image url",
                "type": "string",
                "description": "Map image url"
            },

            "markers-data": {
                "title": "Markers data",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "key": {
                            "title": "Marker key",
                            "type": "string"
                        },
                        "lat": {
                            "title": "Marker latitude",
                            "type": "integer"
                        },
                        "lng": {
                            "title": "Marker longitude",
                            "type": "integer"
                        },
                        "draggable": {
                            "title": "Marker draggable",
                            "type": "boolean",
                            "default": "false"
                        },
                        "group": {
                            "title": "Marker cluster group",
                            "type": "string",
                            "default": ""
                        },
                        "icon": {
                            "title": "Marker icon",
                            "type": "object",
                            "properties": {
                                "url": {
                                    "title": "Marker icon url",
                                    "type": "string"
                                },
                                "unit": {
                                    "title": "Marker data unit",
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};