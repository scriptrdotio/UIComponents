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
        "custom-sectors": [{"color": "#CC5464", "lo": 0, "hi": 30}, {"color": "#FCC717", "lo": 30, "hi": 60}, {"color": "#38B9D6", "lo": 60, "hi": 90}]
    },
    "box": {
        sizeX: 2,
        sizeY: 6,
        minSizeX: 2,
        minSizeY: 4
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
                                }]
                        },
                        
                    	{

                        "type": "section",
                        "htmlClass": "col-xs-12",
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
                                            "key": "custom-sectors[].lo",
                                            "title": "Low"
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-4",
                                        "items": [{
                                            "key": "custom-sectors[].hi",
                                            "title": "High",
                                            "notitle": false,
                                        }]
                                    }
                                ]
                            }]
                        }]
                    }
                    
                    
                    
                    ]
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
                "default": "#1DBC68",
                "validationMessage": "Invalid Color"
            },
            "custom-sectors": {
                "title": "Custom sectors",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "color": {
                            "title": "Colors",
                            "type": "string",
                            "format": "color",
                            "default": "#CC5464",
                            "validationMessage": "Invalid Color"
                        },
                        "lo": {
                            "title": "Low",
                            "type": "number",
                        },
                        "hi": {
                            "title": "High",
                            "type": "number"
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