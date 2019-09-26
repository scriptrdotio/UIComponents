const __DONUT__ = {
    "name": "donut",
    "label": "Donut Chart",
    "class": "scriptr-chart",
    "commonData": true,
    "show": true,
    "defaults": {
        "type": "donut",
        "on-format-data": "return data;",
        "boxLabel": "Donut Chart",
        "transport": "wss",
        "data": '[{label: "Drillers", value: 50}, {label: "Cranes",value: 20 }, {label: "Blasters", value: 30 }]',
        "msg-tag": "donut"
    },
    "box": {
        sizeX: 4,
        sizeY: 5,
        minSizeX: 2,
        minSizeY: 3
    },
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/donut-chart.png",
    "form": [{
        type: "tabs",
        tabs: [{
            title: "Donut",
            items: [{
                "type": "section",
                "htmlClass": "row",
                "items": [{
                    "type": "section",
                    "htmlClass": "col-xs-6",
                    "items": ["donut-formatter", {
                        "key": "background-color",
                        "colorFormat": "hex3"
                    }, {
                            "key": "label-color",
                            "colorFormat": "hex3"
                        }]
                }, {
                    "type": "section",
                    "htmlClass": "col-xs-6",
                    "items": [{
                        "key": "colors",
                        "items": [{
                            "key": "colors[]",
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
            "colors": {
                "title": "Colors",
                "type": "array",
                "default": ["#CC5464", "#FCC717", "#38B9D6",
                    "#1DBC68", "#E90088"],
                "description": "An array of strings containing HTML-style hex colors for each of the donut segments. Note: if there are fewer colors than segments, the colors will cycle back to the start of the array when exhausted.",
                "items": {
                    "type": "string",
                    "format": "color"
                }
            },
            "label-color": {
                "title": "Donut Label Color",
                "type": "string",
                "description": "Donut label color.",
                "format": "color",
                "default": "#eeeeee"
            },
            "background-color": {
                "title": "Donut Background Color",
                "type": "string",
                "description": "Donut background color.",
                "format": "color",
                "default": "#ffffff"
            },
            "donut-formatter": {
                "title": "Donut Formatter",
                "type": "string",
                "description": "Can either be a string for a filter name (eg. 'currency') or a reference to a scope function.  The latter is not yet available."
            }
        },
        "required": []
    }
};