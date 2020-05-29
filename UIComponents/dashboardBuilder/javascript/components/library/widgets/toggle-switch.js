const __TOGGLE_SWITCH__ = {
    "name": "toggleSwitch",
    "label": "Toggle Switch",
    "class": "scriptr-toggle-switch",
    "commonData": true,
    "commonActionData": true,
    "show": true,
    "defaults": {
        "boxLabel": "Toggle Switch",
        "knob-label": "Light",
        "on-label": "ON",
        "off-label": "OFF",
        "data":'{"state":false, disabled:false}',
        "on-format-data": "return data;",
        //"transport": "wss",
        //"msg-tag": "toggle",
        "boxHeader": false,
        //"api" : "UIComponents/dashboard/frontend/examples/toggleSwitch/getToggleSwitchVal"
    },
    "box": {
        sizeX: 2,
        sizeY: 1,
        minSizeX: 1,
        minSizeY: 1,
        fitToWidget: true
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/toggle-switch.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Toggle Switch behaviour",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "switch-status",
                                
                            }, "on-label", "size"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "is-disabled",
                                
                            }, "off-label", "type",
                                "knob-label"]
                        }]
                }]
            }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
           "data": {
                "type": "hidden",
           },
           "switch-status": {
                "title": "Default Toggle Switch State",
                "type": "boolean",
                "description": "Set the toggle switch default loaded state."
            },
            "on-label": {
                "title": "ON Label",
                "type": "string",
                "description": "ON Label."
            },
            "off-label": {
                "title": "OFF Label",
                "type": "string",
                "description": "OFF Label"
            },
            "knob-label": {
                "title": "Knob Label",
                "type": "string",
                "description": "Knob Label."
            },
            "is-disabled": {
                "title": "Disabled",
                "type": "boolean",
                "description": "Set to true to disbale the toggle switch.",
            },
            "type": {
                "title": "Type",
                "type": "string",
                "enum": ["switch-default", "switch-danger",
                    "switch-warning", "switch-success",
                    "switch-info", "switch-primary"],
                "placeholder": " ",
                "description": "Choose the type of the Toggle Switch."
            },
            "size": {
                "title": "Size",
                "type": "string",
                "enum": ["switch-mini", "switch-small",
                    "switch-large"],
                "placeholder": " ",
                "description": "choose the size of the toggle switch."
            },
            "api": {
                "title": "Api",
                "type": "string",
                "description": "Name of the api to get data.",
                "x-schema-form": {
                    "placeholder": "UIComponents/dashboard/frontend/examples/grid/getCarsInfo"
                }
            },
            "transport": {
                "title": "Transport",
                "type": "string",
                "enum": ["wss", "https"],
                "description": "Method used to call api (can take 'http' or 'wss')."
            },
            "http-method": {
                "title": "Http method",
                "type": "string",
                "description": "Method to be used when calling the scriptr api over https. Default: GET.",
                "default": "GET",
              
            },
            "msg-tag": {
                "title": "Message Tag",
                "type": "string",
                "description": "Subscribe to socket messages with tag name."
            },
            "api-params": {
                "title": "Api Params",
                "type": "string",
                "description": "Api parameters.",
                "x-schema-form": {
                    "placeholder": "Ex: {'id' : '599865'}"
                }
            },
            "on-format-data": {
                "title": "Format data",
                "default": "return data;",
                "type": "string",
                "description": "Callback function to be called after data is returned from backend."
            },
            "publish-api-params": {
                "title": "Publish Api Params",
                "type": "string",
                "description": "Publish Api parameters.",
                "x-schema-form": {
                    "placeholder": "Ex: {'id' : '599865'}"
                }
            }
        },
        "required": []
    }
};