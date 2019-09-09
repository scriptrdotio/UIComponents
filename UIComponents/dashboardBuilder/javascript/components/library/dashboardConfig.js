angular
    .module('DashboardBuilder')
    .constant(
    "dashboardConfig",
    (function() {
        return    {
            "script": {
                "form" : [ {
                    "key" : "scriptName",
                    "notitle" : true,
                    "placeholder" : "Script name"
                } ],
                "schema" : {
                    "type" : "object",
                    "title" : "Schema",
                    "properties" : {
                        "scriptName" : {
                            "type" : "string",
                            "fieldHtmlClass" : "script-name-input"
                        }
                    },
                    "required" : [ "scriptName" ]
                }
            },
            "transport" :  {
    "label": "Configuration",
    "defaults": {
        "publishChannel": "requestChannel",
        "subscribeChannel": "responseChannel"
    },
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Transport Configuration",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": ["publishChannel", "subscribeChannel"]
                            },
                        ]
                    }
                ]
            },
            {
                title: "Box Style",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "fieldset",
                                "htmlClass": "col-xs-12",
                                "title": "Box Style",
                                "key": "style.box",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [{
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-3",
                                            "items": [
                                                {
                                                    "key": "style.box.background-type",
                                                    "type": "strapselect",
                                                    "titleMap": [{
                                                        "value": "solid",
                                                        "name": "Solid"
                                                    }, {
                                                        "value": "gradient",
                                                        "name": "Gradient"
                                                    }]

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-sm-9",
                                            "condition": "model.style ['box'] ['background-type'] === 'solid'",
                                            "items": [
                                                {
                                                    "key": "style.box.background-color",
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

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-sm-9",
                                            "condition": "model.style ['box'] ['background-type'] === 'gradient'",
                                            "items": [
                                                {
                                                    "key": "style.box.background-gradient",


                                                }
                                            ]
                                        },]
                                    },

                                    {
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [{
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-3",
                                            "items": [
                                                {
                                                    "key": "style.box.border",
                                                    "type": "strapselect",
                                                    "titleMap": [{
                                                        "value": "true",
                                                        "name": "True"
                                                    }, {
                                                        "value": "false",
                                                        "name": "False"
                                                    }]


                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-3",
                                            "items": [
                                                {
                                                    "key": "style.box.border-style",
                                                    "type": "strapselect",
                                                    "titleMap": [{
                                                        "value": "dotted",
                                                        "name": "Dotted"
                                                    },
                                                    {
                                                        "value": "dashed",
                                                        "name": "Dashed"
                                                    },
                                                    {
                                                        "value": "solid",
                                                        "name": "Solid"
                                                    },
                                                    {
                                                        "value": "double",
                                                        "name": "Double"
                                                    },
                                                    {
                                                        "value": "inset",
                                                        "name": "Inset"
                                                    },
                                                    {
                                                        "value": "outset",
                                                        "name": "Outset"
                                                    }]

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-2",
                                            "items": [
                                                {
                                                    "key": "style.box.border-color",
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

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-2",
                                            "items": [
                                                {
                                                    "key": "style.box.border-width",
                                                    "type": "number"


                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-2",
                                            "items": [
                                                {
                                                    "key": "style.box.border-radius",
                                                    "type": "number"


                                                }
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
                                                "htmlClass": "col-xs-6 col-sm-3",
                                                "items": [
                                                    {
                                                        "key": "style.box.box-shadow",
                                                        "type": "strapselect",
                                                        "titleMap": [{
                                                            "value": "true",
                                                            "name": "True"
                                                        }, {
                                                            "value": "false",
                                                            "name": "False"
                                                        }]


                                                    }
                                                ]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-6 col-sm-2",
                                                "items": [
                                                    {
                                                        "key": "style.box.box-shadow-color",
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

                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "fieldset",
                                "htmlClass": "col-xs-12",
                                "title": "Box Header Style",
                                "key": "style.box-header",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [{
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-3",
                                            "items": [
                                                {
                                                    "key": "style.box-header.background-type",
                                                    "type": "strapselect",
                                                    "titleMap": [{
                                                        "value": "solid",
                                                        "name": "Solid"
                                                    }, {
                                                        "value": "gradient",
                                                        "name": "Gradient"
                                                    }, {
                                                        "value": "transparent",
                                                        "name": "Transparent"
                                                    }]

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-sm-9",
                                            "condition": "model.style ['box-header'] ['background-type'] === 'solid'",
                                            "items": [
                                                {
                                                    "key": "style.box-header.background-color",
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

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-sm-9",
                                            "condition": "model.style ['box-header'] ['background-type'] === 'gradient'",
                                            "items": [
                                                {
                                                    "key": "style.box-header.background-gradient",


                                                }
                                            ]
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [{
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-3",
                                            "items": [
                                                {
                                                    "key": "style.box-header.border",
                                                    "type": "strapselect",
                                                    "titleMap": [{
                                                        "value": "true",
                                                        "name": "True"
                                                    }, {
                                                        "value": "false",
                                                        "name": "False"
                                                    }]


                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-3",
                                            "items": [
                                                {
                                                    "key": "style.box-header.border-style",
                                                    "type": "strapselect",
                                                    "titleMap": [{
                                                        "value": "dotted",
                                                        "name": "Dotted"
                                                    },
                                                    {
                                                        "value": "dashed",
                                                        "name": "Dashed"
                                                    },
                                                    {
                                                        "value": "solid",
                                                        "name": "Solid"
                                                    },
                                                    {
                                                        "value": "double",
                                                        "name": "Double"
                                                    },
                                                    {
                                                        "value": "inset",
                                                        "name": "Inset"
                                                    },
                                                    {
                                                        "value": "outset",
                                                        "name": "Outset"
                                                    }]

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-2",
                                            "items": [
                                                {
                                                    "key": "style.box-header.border-color",
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

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-2",
                                            "items": [
                                                {
                                                    "key": "style.box-header.border-width",
                                                    "type": "number"


                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-2",
                                            "items": [
                                                {
                                                    "key": "style.box-header.border-radius",
                                                    "type": "number"


                                                }
                                            ]
                                        }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "fieldset",
                                "htmlClass": "col-xs-12",
                                "title": "Box Content Style",
                                "key": "style.box-content",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [{
                                            "type": "section",
                                            "htmlClass": "col-xs-6 col-sm-3",
                                            "items": [
                                                {
                                                    "key": "style.box-content.background-type",
                                                    "type": "strapselect",
                                                    "titleMap": [{
                                                        "value": "solid",
                                                        "name": "Solid"
                                                    }, {
                                                        "value": "gradient",
                                                        "name": "Gradient"
                                                    }, {
                                                        "value": "transparent",
                                                        "name": "Transparent"
                                                    }]

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-sm-9",
                                            "condition": "model.style ['box-content'] ['background-type'] === 'solid'",
                                            "items": [
                                                {
                                                    "key": "style.box-content.background-color",
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

                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-sm-9",
                                            "condition": "model.style ['box-content'] ['background-type'] === 'gradient'",
                                            "items": [
                                                {
                                                    "key": "style.box-content.background-gradient",


                                                }
                                            ]
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-6 col-sm-3",
                                                "items": [
                                                    {
                                                        "key": "style.box-content.border",
                                                        "type": "strapselect",
                                                        "titleMap": [{
                                                            "value": "true",
                                                            "name": "True"
                                                        }, {
                                                            "value": "false",
                                                            "name": "False"
                                                        }]


                                                    }
                                                ]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-6 col-sm-3",
                                                "items": [
                                                    {
                                                        "key": "style.box-content.border-style",
                                                        "type": "strapselect",
                                                        "titleMap": [{
                                                            "value": "dotted",
                                                            "name": "Dotted"
                                                        },
                                                        {
                                                            "value": "dashed",
                                                            "name": "Dashed"
                                                        },
                                                        {
                                                            "value": "solid",
                                                            "name": "Solid"
                                                        },
                                                        {
                                                            "value": "double",
                                                            "name": "Double"
                                                        },
                                                        {
                                                            "value": "inset",
                                                            "name": "Inset"
                                                        },
                                                        {
                                                            "value": "outset",
                                                            "name": "Outset"
                                                        }]

                                                    }
                                                ]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-6 col-sm-2",
                                                "items": [
                                                    {
                                                        "key": "style.box-content.border-color",
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

                                                    }
                                                ]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-6 col-sm-2",
                                                "items": [
                                                    {
                                                        "key": "style.box-content.border-width",
                                                        "type": "number"


                                                    }
                                                ]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-xs-6 col-sm-2",
                                                "items": [
                                                    {
                                                        "key": "style.box-content.border-radius",
                                                        "type": "number"


                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "fieldset",
                                "htmlClass": "col-xs-12",
                                "title": "Box Label Style",
                                "key": "style.box-label",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-2",
                                        "items": [
                                            {
                                                "key": "style.box-label.font-weight",
                                                "type": "strapselect",
                                                "titleMap": [{
                                                    "value": "normal",
                                                    "name": "Normal"
                                                }, {
                                                    "value": "bold",
                                                    "name": "Bold"
                                                }]

                                            }
                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-2",
                                        "items": [
                                            {
                                                "key": "style.box-label.text-align",
                                                "type": "strapselect",
                                                "titleMap": [{
                                                    "value": "left",
                                                    "name": "Left"
                                                }, {
                                                    "value": "center",
                                                    "name": "Center"
                                                }, {
                                                    "value": "right",
                                                    "name": "Right"
                                                }]

                                            }
                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-2",
                                        "items": [
                                            {
                                                "key": "style.box-label.font-size",
                                                "type": "number"

                                            }
                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-2",
                                        "items": [
                                            {
                                                "key": "style.box-label.display",
                                                "type": "strapselect",
                                                "titleMap": [{
                                                    "value": "block",
                                                    "name": "Block"
                                                }, {
                                                    "value": "none",
                                                    "name": "None"
                                                }]

                                            }
                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-sm-2",
                                        "items": [
                                            {
                                                "key": "style.box-label.color",
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

                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "publishChannel": {
                "title": "Publish channel",
                "type": "string",
                "description": "Widgets use the publish channel to publish messages that will be distributed to its subscribers."
            },
            "subscribeChannel": {
                "title": "Subscribe channel",
                "type": "string",
                "description": "Widgets use the subscribe channel to consume the messages published over that channel as a data source."
            },
            // style

            "style": {
                "title": "Style",
                "type": "object",
                "properties": {
                    //".box"
                    "box": {
                        "title": "Box",
                        "type": "object",
                        "properties": {

                            "background-type": {
                                "title": "Background Type",
                                "type": "string",
                                "default": "solid",
                            },
                            "background-color": {
                                "title": "Background Color",
                                "type": "string",
                                "format": "color",
                                "default": "#CC5464",
                                "validationMessage": "Invalid Color",
                            },
                            "background-gradient": {
                                "title": "Background Gradient",
                                "type": "string",
                                "default": "linear-gradient(red, yellow)",
                            },
                            "border": {
                                "title": "Show Border",
                                "type": "string",
                                "default": "true",
                            },
                            "border-color": {
                                "title": "Border Color",
                                "type": "string",
                                "format": "color",
                                "default": "#ccc",
                            },
                            "border-style": {
                                "title": "Border Style",
                                "type": "string",
                                "default": "solid",
                            },
                            "border-width": {
                                "title": "Border width",
                                "type": "number",
                                "default": 1,
                            },
                            "border-radius": {
                                "title": "Border Radius",
                                "type": "number",
                                "default": 3,
                            },
                            "box-shadow": {
                                "title": "Show Box Shadow",
                                "type": "string",
                                "default": "true",
                            },
                            "box-shadow-color": {
                                "title": "Box shadow color",
                                "type": "string",
                                "format": "color",
                                "default": "#ccc",
                            },
                        }

                    },
                    "box-header": {
                        "title": "Box",
                        "type": "object",
                        "properties": {

                            "background-type": {
                                "title": "Background Type",
                                "type": "string",
                                "default": "solid",
                            },
                            "background-color": {
                                "title": "Background Color",
                                "type": "string",
                                "format": "color",
                                "default": "#CC5464",
                                "validationMessage": "Invalid Color",
                            },
                            "background-gradient": {
                                "title": "Background Gradient",
                                "type": "string",
                                "default": "linear-gradient(red, yellow)",
                            },
                            "border": {
                                "title": "Show Border",
                                "type": "string",
                                "default": "true",
                            },
                            "border-color": {
                                "title": "Border Color",
                                "type": "string",
                                "format": "color",
                                "default": "#ccc",
                            },
                            "border-style": {
                                "title": "Border Style",
                                "type": "string",
                                "default": "solid",
                            },
                            "border-width": {
                                "title": "Border width",
                                "type": "number",
                                "default": 1,
                            },
                            "border-radius": {
                                "title": "Border Radius",
                                "type": "number",
                                "default": 3,
                            },
                        }

                    },
                    "box-content": {
                        "title": "Box",
                        "type": "object",
                        "properties": {

                            "background-type": {
                                "title": "Background Type",
                                "type": "string",
                                "default": "solid",
                            },
                            "background-color": {
                                "title": "Background Color",
                                "type": "string",
                                "format": "color",
                                "default": "#CC5464",
                                "validationMessage": "Invalid Color",
                            },
                            "background-gradient": {
                                "title": "Background Gradient",
                                "type": "string",
                                "default": "linear-gradient(red, yellow)",
                            },
                            "border": {
                                "title": "Show Border",
                                "type": "string",
                                "default": "true",
                            },
                            "border-color": {
                                "title": "Border Color",
                                "type": "string",
                                "format": "color",
                                "default": "#ccc",
                            },
                            "border-style": {
                                "title": "Border Style",
                                "type": "string",
                                "default": "solid",
                            },
                            "border-width": {
                                "title": "Border width",
                                "type": "number",
                                "default": 1,
                            },
                            "border-radius": {
                                "title": "Border Radius",
                                "type": "number",
                                "default": 3,
                            },
                        }

                    },
                    "box-label": {
                        "title": "Box",
                        "type": "object",
                        "properties": {

                            "font-weight": {
                                "title": "Font weight",
                                "type": "string",
                                "default": "normal",
                            },
                            "font-size": {
                                "title": "Font size",
                                "type": "number",
                                "default": 0,
                            },
                            "text-align": {
                                "title": "Text Align",
                                "type": "string",
                                "default": "center",
                            },
                            "display": {
                                "title": "Display",
                                "type": "string",
                                "default": "block",
                            },
                            "color": {
                                "title": "Color",
                                "type": "string",
                                "format": "color",
                                "default": "#222",
                                "validationMessage": "Invalid Color",
                            }
                        }

                    },
                }
            }

        },//end style
        "required": ["token", "baseUrl", "publishChannel",
            "subscribeChannel"]
    }
},
        }
    }
)());
