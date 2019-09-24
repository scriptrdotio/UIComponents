const __3DSURFACE__ = {
    "name": "3dsurface",
    "label": "3D Surface",
    "class": "scriptr-three-d-surface",
    "commonData": true,
    "show": true,
    "defaults": {
        "transport": "https",
        "api": "UIComponents/dashboard/frontend/examples/plotly/get3dSurfaceData",
        "title": "3D",
        "width": 400,
        "height": 400,
        "xaxis": "Temperature",
        "yaxis": "Humidity",
        "zaxis": "Pressure",
        "show-bar": "true",
        "bar-title": "Pressre",
        "bar-thickness": 20,
        "color-scale": [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']],
    },
    "box": {
        sizeX: 2,
        sizeY: 6,
        minSizeX: 2,
        minSizeY: 4
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/wind-rose.svg",
    "form": [
        {
            type: "tabs",
            tabs: [
                {
                    title: "Format",
                    items: [
                        {
                            "type": "section",
                            "htmlClass": "row",
                            "items": [
                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-12 col-sm-4",
                                    "items": [
                                        "title",
                                        "width",
                                        "height"

                                    ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-12 col-sm-4",
                                    "items": [
                                        "xaxis",
                                        "yaxis",
                                        "zaxis"
                                    ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-12 col-sm-4",
                                    "items": [
                                        "show-bar",
                                        "bar-title",
                                        "bar-thickness"
                                    ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-12",
                                    "items": [
                                        "color-scale",
                                        
                                    ]
                                },
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
            "title": {
                "title": "Title",
                "type": "string",
                "description": "Title shown above the chart",
                "placeholder": " "
            },
            "width": {
                "title": "Width",
                "type": "number",
                "description": "",
                "placeholder": " "
            },
            "height": {
                "title": "Height",
                "type": "number",
                "description": "",
                "placeholder": " "
            },
            "xaxis": {
                "title": "X AXIS Label",
                "type": "string",
                "description": "",
                "placeholder": " "
            },
            "yaxis": {
                "title": "Y AXIS Label",
                "type": "string",
                "description": "",
                "placeholder": " "
            },
            "zaxis": {
                "title": "Z AXIS Label",
                "type": "string",
                "description": "",
                "placeholder": " "
            },
            "show-bar": {
                "title": "Show Bar",
                "type": "boolean",
                "description": "",
                "placeholder": " "
            },
            "bar-title": {
                "title": "Bar Title",
                "type": "string",
                "description": "",
                "placeholder": " "
            },
            "bar-thickness": {
                "title": "Bar Thickness",
                "type": "number",
                "description": "Number between 1 and 30.",
                "placeholder": " "
            }, "color-scale": {
                "title": "Color Scale",
                "type": "string",
                "description": "Array of colors and order, Ex [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']] . ",
                "placeholder": "[[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']]"
            },
        },
        "required": []
    }
};