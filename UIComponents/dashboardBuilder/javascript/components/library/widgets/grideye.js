const __GRIDEYE__ = {
    "name": "grideye",
    "label": "Grideye",
    "class": "scriptr-grideye",
    "commonData": true,
    "show": true,
    "defaults": {
        "data-format": "grideye",
        "multiple-data-points": "false",
        "on-format-data": "return data;",
        "boxLabel": "Grideye",
        "data" : "[10,30,90,90,30,20,20,10,10,30,90,30,90,30,30,20,20,30,90,30,30,90,30,20,20,30,90,30,20,30,90,30,20,30,90,30,20,30,90,30,20,30,90,30,30,90,30,20,10,30,90,30,90,30,30,10,10,30,90,90,30,20,20,10]"
    },
    "box": {
        "sizeX": 2,
        "sizeY": 4,
        "minSizeX": 2,
        "minSizeY": 2
    },
    "imgCls": "gridye-img",
    "imgSrc": "//img.icons8.com/plasticine/2x/heat-map.png",
    "form": [{
        "type": "tabs",
        "tabs": [{
                "title": "Grid",
                "items": [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["grid-x-count"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["grid-y-count"]
                        }
                    ]
                }]
            },
            {
                "title": "Min/Max",
                "items": [{
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["min-temperature"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["max-temperature"]
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Colors",
                "items": [{
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-8",
                            "items": [{
                                "key": "custom-sectors",
                                "title": "",
                                "items": [{
                                    "key": "custom-sectors.ranges",
                                    "title": "Custom Ranges",
                                    "style": {
                                        "add": "btn-primary btn-sm pull-left"
                                    },
                                    "items": [{
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [

                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-3",
                                                    "items": [{
                                                        "key": "custom-sectors.ranges[].color",
                                                        "title": "color",
                                                        "colorFormat": "hex6"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-4",
                                                    "items": [{
                                                        "key": "custom-sectors.ranges[].lo"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-4",
                                                    "items": [{
                                                        "key": "custom-sectors.ranges[].hi"
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
            }
        ]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "data": {
                "title": "Static data",
                "type": "string",
                "description": "Grideye static values to show",
                "codemirrorOptions": {
                    "placeholder": "[10,20,60,40]"
                }
            },
            "grid-x-count": {
                "title": "Number of Columns",
                "type": "number",
                "default": 8,
                "description": "Number of grid columns"
            },
            "grid-y-count": {
                "title": "Number of Rows",
                "type": "number",
                "default": 8,
                "description": "Number of grid rows"
            },
            "min-temperature": {
                "title": "Grideye min Temperature",
                "type": "number",
                "default": 0,
                "description": "Minimum grideye temperature"
            },
            "max-temperature": {
                "title": "Grideye max Temperature",
                "type": "number",
                "default": 100,
                "description": "Maximum grideye temperature"
            },
            "custom-sectors": {
                "title": "Custom sectors",
                "type": "object",
                "properties": {
                    "ranges": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "color": {
                                    "title": "Sector Color",
                                    "type": "string",
                                    "format": "color"
                                },
                                "lo": {
                                    "type": "number"
                                },
                                "hi": {
                                    "type": "number"
                                }
                            }
                        },
                        "default": [{
                                "color": "#00FF00",
                                "lo": 0,
                                "hi": 25
                            },
                            {
                                "color": "#FFFF00",
                                "lo": 25,
                                "hi": 50
                            },
                            {
                                "color": "#FFA000",
                                "lo": 50,
                                "hi": 75
                            },
                            {
                                "color": "#FF0000",
                                "lo": 75,
                                "hi": 100
                            }
                        ]
                    }
                }
            },
        },
        "required": []
    }
};