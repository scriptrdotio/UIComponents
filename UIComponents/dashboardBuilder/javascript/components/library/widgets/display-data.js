const __DISPLAY_DATA__ = {
    "name": "displayData",
    "label": "Display Data",
    "class": "scriptr-displaycount",
    "commonData": true,
    "show": true,
    "defaults": {
        "on-format-data": "return data;",
        "transport": "wss",
        "data": "12",
        "message": "Connected Devices",
        "fetch-data-interval": 300,
        "number-cell-size": "medium"
    },
    "box": {
        sizeX: 1,
        sizeY: 1,
        minSizeX: 1,
        minSizeY: 1
    },
    "imgCls": "connected-img",
    "imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAlCAYAAADWSWD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MzNkM2FlMS1hYTk2LWIyNGItYmFkMy1lYWZiODRkM2YzODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDY5MEY1QUM1RkU1MTFFNzk3MTJENUY1ODM3OUFFQ0MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDY5MEY1QUI1RkU1MTFFNzk3MTJENUY1ODM3OUFFQ0MiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxMWY2ZjctYTU5Zi00NzRiLTgwOWMtZGQ5ZTNhNTZiMTk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzM2QzYWUxLWFhOTYtYjI0Yi1iYWQzLWVhZmI4NGQzZjM4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmt9N/4AAAHGSURBVHja7JexS8NAFIdbcRBdRBS6KI6iDoqibgVBwaV0cLA4VKGD7SJugpt/gaOTguLuqFURd20HQQu1VFsXsYsOUkWoX+AJZ6gxwYZEuYOPd/fuXfLj8e5yCdZqtYBV6zlOHmKmA+60FxgpT23mzBNWuppsPNgtwUZrhWz30VKfk0VBG5n+DNiHswaJHYOYMq7CsJpxK11ORK/w0I1GKCazC5htk/uL8N+Wh9vtTmyL3VLxg+go5J0Ib/aB6KxpbAi/gDa/Zbps41TxV6bZbCeUwAzdUJ3jNfbTes/KA+EHdU6Vdjui/bARHTctWov+b6J/dXqw2+cxXSb3OYzCFTzDhOJT2yMnyJ4XmU7BLSTkbhyBd5iFTvmqzYkvIjEJWZPyqjziZMu4slYgDcbtLQOLkIRl6WdkzoipyJq4J+XBy29M45J085TOg5FhfNfiK+Hr/W6t5xsRceOYN+igP+i70wNRQ3KHmJTxAGYLdoUdfP0SbsSEZI03p4fyx7EKT8p4DYpwD+vwKnNFia16Klp+j3LKuIApKCGXytyp/iJq0Vq0Fq1Fa9FatP7dstnC3M7c1hNutOio8CfKI+2BLst3fggwAHHJk2PD+/d6AAAAAElFTkSuQmCC",
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