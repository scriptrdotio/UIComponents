const __PLOTLY__ = {
    "name": "plotly",
    "label": "Wind Rose",
    "class": "scriptr-plotly",
    "commonData": true,
    "show": true,
    "defaults": {
        "transport": "wss",
        "data-type": "raw",
        "schema-for": "windrose",
        "data-format": "windrose",
        "speed-unit": "km/h",
        "fetch-data-interval": 300, //in seconds
        "on-format-data": "return data;",
        "boxLabel": "Wind Rose",
        "data": '{"data": [{"direction": "E", "speeds": [2, 3, 15, 17]},{"direction": "ESE", "speeds": [24, 8, 4]},{"direction": "SSE", "speeds": [2.5, 7, 16]},{"direction": "S", "speeds": [3, 8, 2, 1, 9, 11]},{"direction": "SSW", "speeds": [13, 3, 7.5, 8]},{"direction": "WSW", "speeds": [21, 14, 9]},{"direction": "W", "speeds": [7, 0, 8, 9, 15, 19, 11]},{"direction": "WNW", "speeds": [4, 17, 21]},{"direction": "NNW", "speeds": [14, 7]},{"direction": "N", "speeds": [20, 0, 5, 9, 7]},{"direction": "NNE", "speeds": [1, 0.5, 6.5]},{"direction": "ENE", "speeds": [3.5, 30, 15]}]}'
    },
    "box": {
        sizeX: 2,
        sizeY: 4,
        minSizeX: 2,
        minSizeY: 4
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/wind-rose.svg",
    "form": [{
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
                                "htmlClass": "col-xs-12 col-sm-6",
                                "items": ["font-size",
                                    {
                                        "key": "show-legend",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12 col-sm-6",
                                "items": ["font-size",
                                    {
                                        "key": "speed-unit",
                                        "type": "string",

                                    }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": [{
                                    "key": "custom-ranges",
                                    "title": "Fill Colors & Ranges",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-4",
                                                "items": [{
                                                    "key": "custom-ranges[].color",
                                                    "title": "Color",
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
                                                "htmlClass": "col-xs-4",
                                                "items": [{
                                                    "key": "custom-ranges[].lo"
                                                }]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-4",
                                                "items": [{
                                                    "key": "custom-ranges[].hi",
                                                }]
                                            }]
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
            "windDirection": {
                "title": "Wind Direction Channel",
                "type": "string",
                "description": "",
                "placeholder": " ",
                "validationMessage": "Required."
            },
            "windSpeed": {
                "title": "Wind Speed Channel",
                "type": "string",
                "description": "",
                "placeholder": " ",
                "validationMessage": "Required."
            },
            "font-size": {
                "title": "Font Size",
                "type": "number",
                "default": 16,
                "description": "Set the font size of the wind rose (in px)."
            },
            "show-legend": {
                "title": "Show Legend",
                "type": "string",
                "default": "true",
                "description": "Set visibility of the legend."
            },

            "speed-unit": {
                "title": "Speed Unit",
                "type": "string",
                "default": "km/h",
                "description": "The Speed unit to be used in the legend."
            },
            "custom-ranges": {
                "title": "Custom Ranges",
                "type": "array",
                "default": [{ "color": "#00476b", "lo": 0, "hi": 2 }, { "color": "#005487", "lo": 2, "hi": 4 }, { "color": "#006699", "lo": 4, "hi": 6 }, { "color": "#0082b5", "lo": 6, "hi": 8 }, { "color": "#0294c1", "lo": 8, "hi": 10 }, { "color": "#06a9ce", "lo": 10, "hi": 20 }],
                "items": {
                    "type": "object",
                    "properties": {
                        "color": {
                            "title": "Sector Color",
                            "type": "string",
                            "format": "color",
                            "required": true,
                            "validationMessage": "Invalid Color"
                        },
                        "lo": {
                            "title": "Low",
                            "type": "number",
                            "required": true
                        },
                        "hi": {
                            "title": "High",
                            "type": "number",
                            "required": true
                        }
                    }
                }
            }
        },
        "required": ["windSpeed", "windDirection"]
    }
};