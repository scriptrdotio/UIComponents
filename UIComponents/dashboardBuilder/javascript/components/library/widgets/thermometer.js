const __THERMOMETER__ = {
    "name": "thermometer",
    "label": "Thermometer",
    "class": "scriptr-thermometer",
    "commonData": true,
    "show": true,
    "defaults": {
        "transport": "wss",
        "on-format-data": "if(data && data instanceof Array && data[0].value) return data[0].value; else return data;",
        "schema-for": "thermometer",
        "fetch-data-interval": 300, // in seconds
        "data": 20,
        "boxLabel": "Thermometer",
        "boxBorder": true,
        "step": 40,
        "unit": "°C",
        "custom-sectors": [{
            "color": "#005588",
            "lo": 0,
            "hi": 40
        }, {
            "color": "#00953c",
            "lo": 40,
            "hi": 80
        }, {
            "color": "#ce2029",
            "lo": 80,
            "hi": 120
        }]
    },
    "box": {
        sizeX: 1,
        sizeY: 3,
        minSizeX: 1,
        minSizeY: 3,
        maxSizeX: 5
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/thermometer.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Format",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12 col-sm-6",
                            "items": [
                                "unit",
                                {
                                    "key": "out-of-range-color",
                                    "colorFormat": "hex3",
                                    "spectrumOptions": {
                                        showInput: true,
                                        showAlpha: false,
                                        allowEmpty: true,
                                        showPalette: true,
                                        preferredFormat: 'hex3',
                                        palette: [
                                            ['#fce94f', '#fcaf3e',
                                                '#e9b96e'],
                                            ['#8ae234', '#729fcf',
                                                '#ad7fa8'],
                                            ['#ef2929', '#888a85',
                                                '#deface']]
                                    }
                                }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [
                                {
                                    "type": "section",
                                    "htmlClass": "",
                                    "items": ["step"]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "",
                                    "items": [{
                                        "key": "custom-sectors",
                                        "title": "Temperature Level Fill Colors",
                                        "items": [{
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-4",
                                                    "items": [{
                                                        "key": "custom-sectors[].color",
                                                        "colorFormat": "hex3",
                                                        "spectrumOptions": {
                                                            showInput: true,
                                                            showAlpha: false,
                                                            allowEmpty: true,
                                                            showPalette: true,
                                                            preferredFormat: 'hex3',
                                                            palette: [
                                                                [
                                                                    '#fce94f',
                                                                    '#fcaf3e',
                                                                    '#e9b96e'],
                                                                [
                                                                    '#8ae234',
                                                                    '#729fcf',
                                                                    '#ad7fa8'],
                                                                [
                                                                    '#ef2929',
                                                                    '#888a85',
                                                                    '#deface']]
                                                        }
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-4",
                                                    "items": [{
                                                        "key": "custom-sectors[].lo"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-xs-4",
                                                    "items": [{
                                                        "key": "custom-sectors[].hi"
                                                    }]
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
            "data": {
                "title": "Thermometer Value",
                "type": "string",
                "description": "Thermometer Value (0 to 100)"
            },
            "height": {
                "title": "Height",
                "type": "number",
                "description": "Set the height of Thermometer."
            },
            "unit": {
                "title": "Unit",
                "type": "hidden",
                "default": "°C",
                "description": "Set the unit value of Thermometer."
            },
            "out-of-range-color": {
                "title": "Out Of Range Color",
                "type": "string",
                "description": "Set the default color for out of range values (default: #005588).",
                "format": "color",
                "default": "#ffef00",
                "validationMessage": "Invalid Color"
            },
            "custom-sectors": {
                "title": "Custom sectors",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "color": {
                            "title": "Color",
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
            },
            "step": {
                "title": "Interval",
                "type": "number",
                "description": "Set the interval value between ticks."
            }
        },
        "required": []
    }
};