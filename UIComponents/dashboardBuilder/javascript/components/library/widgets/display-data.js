const __DISPLAY_DATA__ = {
    "name": "displayData",
    "label": "Display Data",
    "class": "scriptr-displaycount",
    "commonData": true,
    "show": true,
    "defaults": {
        "on-format-data": "return data;",
        "transport": "wss",
        "boxHeader": false,
        "data": "12",
        "message": "Connected Devices",
        "fetch-data-interval": 300,
        "number-cell-size": "medium"
    },
    "box": {
        sizeX: 3,
        sizeY: 2,
        minSizeX: 1,
        minSizeY: 1,
        "fitToWidget": true
    },
    "imgCls": "display-data-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/displayData.png",
    "form": [{
        type: "tabs",
        tabs: [{
            title: "Format",
            items: ["message",
                {
                    "key": "widget-layout",
                    "notitle": false,
                    "type": "strapselect",
                    "titleMap": [{
                        "value": "horizontal",
                        "name": "Horizontal"
                    }, {
                        "value": "vertical",
                        "name": "Vertical"
                    }]
                },
                "border-size",
                {
                    "key": "border-color",
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
                }, {
                    "key": "number-cell-size",
                    "notitle": false,
                    "type": "strapselect",
                    "titleMap": [{
                        "value": "small",
                        "name": "Small"
                    },
                    {
                        "value": "medium",
                        "name": "Medium"
                    },
                    {
                        "value": "large",
                        "name": "Large"
                    },
                    {
                        "value": "",
                        "name": "no-width"
                    }]
                },
                {
                    "type": "section",
                    "htmlClass": "col-xs-12 col-sm-6 row",
                    "items": [{
                        "key": "number-font-family",
                        "notitle": false,
                        "type": "strapselect",
                        "titleMap": [{
                            "value": "Arial",
                            "name": "Arial"
                        }, {
                            "value": "Helvetica",
                            "name": "Helvetica"
                        }, {
                            "value": "Times New Roman",
                            "name": "Times New Roman"
                        }, {
                            "value": "Courier New",
                            "name": "Courier New"
                        }, {
                            "value": "Courier",
                            "name": "Courier"
                        }, {
                            "value": "Verdana",
                            "name": "Verdana"
                        }, {
                            "value": "Georgia",
                            "name": "Georgia"
                        }, {
                            "value": "Palatino",
                            "name": "Palatino"
                        }, {
                            "value": "Garamond",
                            "label": "Garamond"
                        }, {
                            "value": "Bookman",
                            "label": "Bookman"
                        }, {
                            "value": "Comic Sans MS",
                            "name": "Comic Sans MS"
                        }, {
                            "value": "Trebuchet MS",
                            "name": "Trebuchet MS"
                        }, {
                            "value": "Arial Black",
                            "name": "Arial Black"
                        }, {
                            "value": "Impact",
                            "name": "Impact"
                        }, {
                            "value": "Sans-Serif",
                            "name": "Sans-Serif"
                        }, {
                            "value": "Source Sans Pro",
                            "name": "Source Sans Pro"
                        }]
                    },
                        "number-font-size",
                        "number-font-weight",
                    {
                        "key": "number-text-color",
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
                    },
                    {
                        "key": "number-background-color",
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
                    },
                    {
                        "key": "number-Text-Alignment",
                        "notitle": false,
                        "type": "strapselect",
                        "titleMap": [{
                            "value": "left",
                            "name": "Left"
                        },
                        {
                            "value": "center",
                            "name": "Center"
                        },
                        {
                            "value": "right",
                            "name": "Right"
                        }]
                    }]
                },
                {
                    "type": "section",
                    "htmlClass": "col-xs-12 col-sm-6 row pull-right",
                    "items": [{
                        "key": "message-font-family",
                        "notitle": false,
                        "type": "strapselect",
                        "titleMap": [{
                            "value": "Arial",
                            "name": "Arial"
                        }, {
                            "value": "Helvetica",
                            "name": "Helvetica"
                        }, {
                            "value": "Times New Roman",
                            "name": "Times New Roman"
                        }, {
                            "value": "Courier New",
                            "name": "Courier New"
                        }, {
                            "value": "Courier",
                            "name": "Courier"
                        }, {
                            "value": "Verdana",
                            "name": "Verdana"
                        }, {
                            "value": "Georgia",
                            "name": "Georgia"
                        }, {
                            "value": "Palatino",
                            "name": "Palatino"
                        }, {
                            "value": "Garamond",
                            "name": "Garamond"
                        }, {
                            "value": "Bookman",
                            "name": "Bookman"
                        }, {
                            "value": "Comic Sans MS",
                            "name": "Comic Sans MS"
                        }, {
                            "value": "Trebuchet MS",
                            "name": "Trebuchet MS"
                        }, {
                            "value": "Arial Black",
                            "name": "Arial Black"
                        }, {
                            "value": "Impact",
                            "name": "Impact"
                        }, {
                            "value": "Sans-Serif",
                            "name": "Sans-Serif"
                        }, {
                            "value": "Source Sans Pro",
                            "name": "Source Sans Pro"
                        }]
                    },
                        "message-font-size",
                        "message-font-weight",
                    {
                        "key": "message-text-color",
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
                    },
                    {
                        "key": "message-background-color",
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
                    },
                    {
                        "key": "message-Text-Alignment",
                        "notitle": false,
                        "type": "strapselect",
                        "titleMap": [{
                            "value": "left",
                            "name": "Left"
                        },
                        {
                            "value": "center",
                            "name": "Center"
                        },
                        {
                            "value": "right",
                            "name": "Right"
                        }]
                    }]
                }
            ]



        }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "widget-layout": {
                "title": "Layout",
                "type": "string",
                "default": "horizontal",
                "placeholder": " ",
                "description": "Define your widget's layout."
            },
            "number-cell-size": {
                "title": "Numbers Cell Size",
                "type": "string",
                "default": "medium",
                "placeholder": " ",
                "description": "Define your widget's numbers cell size."
            },
            "message": {
                "title": "Message",
                "type": "string",
                "default": "Items",
                "description": "Define your widget message."
            },
            "number-font-family": {
                "title": "Number Font family",
                "type": "string",
                "description": "Define your widget number font family.",
                "default": "Arial",
                "placeholder": " "
            },
            "message-font-family": {
                "title": "Message Font family",
                "type": "string",
                "description": "Define your widget message font family.",
                "default": "Arial",
                "placeholder": " "
            },
            "number-font-size": {
                "title": "Number Font Size",
                "type": "number",
                "default": 42,
                "description": "Define your widget number font size."
            },
            "message-font-size": {
                "title": "Message Font Size",
                "type": "number",
                "default": 18,
                "description": "Define your widget message font size."
            },
            "number-font-weight": {
                "title": "Number Font Weight",
                "type": "number",
                "default": 600,
                "description": "Define your widget number font weight."
            },
            "message-font-weight": {
                "title": "Message Font Weight",
                "type": "number",
                "default": 600,
                "description": "Define your widget message font weight."
            },
            "number-text-color": {
                "title": "Number Text Color",
                "type": "string",
                "description": "Define your widget number text color.",
                "format": "color",
                "default": "#ffffff",
                "validationMessage": "Invalid Color"
            },
            "message-text-color": {
                "title": "Message Text Color",
                "type": "string",
                "description": "Define your widget message text color.",
                "format": "color",
                "default": "#686868",
                "validationMessage": "Invalid Color"
            },
            "number-background-color": {
                "title": "Number Backgrount Color",
                "type": "string",
                "description": "Define your widget number background color.",
                "format": "color",
                "default": "#ff8c00",
                "validationMessage": "Invalid Color"
            },
            "message-background-color": {
                "title": "Message Backgrount Color",
                "type": "string",
                "description": "Define your widget message background color.",
                "format": "color",
                "default": "white",
                "validationMessage": "Invalid Color"
            },
            "message-Text-Alignment": {
                "title": "Message Text Alignment",
                "type": "string",
                "default": "center",
                "placeholder": " ",
                "description": "Define your widget message text alignment."
            },
            "number-Text-Alignment": {
                "title": "Number Text Alignment",
                "type": "string",
                "default": "center",
                "placeholder": " ",
                "description": "Define your widget number text alignment."
            },
            "border-size": {
                "title": "Border Weight",
                "type": "number",
                "default": 1,
                "description": "Define your widget border weight."
            },
            "border-color": {
                "title": "Border Color",
                "type": "string",
                "description": "Define your widget border color.",
                "format": "color",
                "default": "#d7d7d7",
                "validationMessage": "Invalid Color"
            },
            "data": {
                "title": "Count",
                "type": "string",
                "description": "Count to display."
            }
        },
        "required": []
    }
};