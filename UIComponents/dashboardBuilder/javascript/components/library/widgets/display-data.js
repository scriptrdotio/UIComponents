const __DISPLAY_DATA__ = {
    "name": "displayData",
    "label": "Display Data",
    "class": "scriptr-displaycount",
    "commonData": true,
    "show": true,
    "defaults": {
        "on-format-data": "return data;",
        //"transport": "wss",
        "boxHeader": false,
        "data": JSON.stringify({"value": 12}),
        "message": "Connected Devices",
        "value-cell-size": "medium",
        "value-background-colors":[{"value":10,"color":"#ef2929"},{"value":20,"color":"#729fcf"},{"value":30,"color":"#8ae234"}]
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
        tabs: [
        	
        {
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
                    "key": "value-cell-size",
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
                        "key": "value-font-family",
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
                        "value-font-size",
                        "value-font-weight",
                    {
                        "key": "value-text-color",
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
                        "key": "value-text-alignement",
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
                        "key": "message-text-alignement",
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



        },
        {
            title: "Background colors",
            items: [
                {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": ["value-background-color"]
                },
                
                {
                            "type": "section",
                            "htmlClass": "col-xs-9",
                            "items": [
                                {
                                    key: "value-background-colors",
                                    startEmpty: true,
                                    items: [{
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-6",
                                                "items": [{
                                                    key: "value-background-colors[].value",
                                                   
                                                }]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-6",
                                                "items": [{
                                                    key: "value-background-colors[].color",
                                                    "colorFormat": "hex",
                                                    
                                                }]
                                            }]
                                    }
                                    ],

                                },
                            ]
                        }
        ]
    },
        ]
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
            "value-cell-size": {
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
            "value-font-family": {
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
            "value-font-size": {
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
            "value-font-weight": {
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
            "value-text-color": {
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
            "value-background-color": {
                "title": "Number Default Backgrount Color",
                "type": "string",
                "description": "Define your widget number background color.",
                "format": "color",
                "default": "#ff8c00",
                "validationMessage": "Invalid Color"
            },
            "value-background-colors": {
                "title": "Number Backgrount Colors",
                "type": "array",
                "description": "Define your widget number background colors.If data not matching any defined color default color will be used.",
               	"items":{
                    "type": "object",
                    "properties": {
                        "value": {
                            "title": "Value",
                            "type": "number"
                        },

                        "color": {
                            "title": "Color",
                            "type": "string",
                            "format": "color",
                        }
                    }
                }
            },
            "message-background-color": {
                "title": "Message Backgrount Color",
                "type": "string",
                "description": "Define your widget message background color.",
                "format": "color",
                "default": "white",
                "validationMessage": "Invalid Color"
            },
            "message-text-alignement": {
                "title": "Message Text Alignment",
                "type": "string",
                "default": "center",
                "placeholder": " ",
                "description": "Define your widget message text alignment."
            },
            "value-text-alignement": {
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
            "border-radius": {
                "title": "Border Radius",
                "type": "string",
                "description": "Define your widget border radius."
            },
            "data": {
                "title": "Data",
                "type": "string",
                "description": "Set the value to display, message also can be set.",
                "codemirrorOptions": {
                    "placeholder": "{\"value\": 20, \"message\": \"Connected Devices\"}"
                }
            }
        },
        "required": []
    }
};