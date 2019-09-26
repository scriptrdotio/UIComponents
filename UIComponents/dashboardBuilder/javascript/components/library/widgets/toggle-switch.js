const __TOGGLE_SWITCH__ = {
    "name": "toggleSwitch",
    "label": "Toggle Switch",
    "class": "scriptr-toggle-switch",
    "show": true,
    "defaults": {
        "boxLabel": "Toggle Switch",
        "switch-status": "false",
        "knob-label": "TV",
        "on-label": "ON",
        "off-label": "OFF",
        "on-format-data": "return data;",
        "on-switch-change": "vm.onChange",
        "transport": "wss",
        "msg-tag": "toggle"
        // ,"api" : "UIComponents/dashboard/frontend/examples/toggleSwitch/getToggleSwitchVal"
    },
    "box": {
        sizeX: 1,
        sizeY: 1,
        minSizeX: 1,
        minSizeY: 1,
        maxSizeY: 1,
        maxSizeX: 1
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/toggle-switch.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Data",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["transport"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    {
                                        "key": "msg-tag",
                                        "condition": "model.transport=='wss'"
                                    },
                                    {
                                        "key": "http-method",
                                        "type": 'strapselect',
                                        "placeholder": " ",
                                        "titleMap": [{
                                            "value": "GET",
                                            "name": "GET"
                                        }, {
                                            "value": "POST",
                                            "name": "POST"
                                        }],
                                        "condition": "model.transport=='https'"
                                    }]
                            }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    "api",
                                    {
                                        "key": "on-format-data",
                                        "type": "codemirror",
                                        "codemirrorOptions": {
                                            value: "return",
                                            styleActiveLine: true,
                                            lineNumbers: true,
                                            lineWrapping: true,
                                            autoCloseBrackets: true,
                                            matchBrackets: true,
                                            theme: "neo",
                                            mode: "javascript",
                                            readOnly: false,
                                            autoRefresh: true
                                        }
                                    }]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["api-params",
                                    "publish-api-params"]
                            }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "type": "help",
                                "helpvalue": "<hr>"
                            }]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "type": "help",
                                "helpvalue": "<div class=\"alert alert-info\"><ul><li>Messages published over the subscibe channel need to have the following format in order to be consumed by a widget:<ul><li>{“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”}</li></ul></li><li>A script would publish a message  over the subscribe channel as follow:<ul><li>publish(“responseChannel”, {“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”});</li></ul></li><li>Whether https or wss transport is used, Sciptr API should return the static data structure for widget initial load:<ul><li>return &lt;static data structure&gt;;</li></ul></li></ul></div>"
                            }]
                        }]
                    }

                ]
            },
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
                                "type": "radios-inline",
                                titleMap: [{
                                    value: "true",
                                    name: "True"
                                }, {
                                    value: "false",
                                    name: "False"
                                }]
                            }, "on-label", "size"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "is-disabled",
                                "type": "radios-inline",
                                titleMap: [{
                                    value: "true",
                                    name: "True"
                                }, {
                                    value: "false",
                                    name: "False"
                                }]
                            }, "off-label", "type",
                                "knob-label",]
                        }]
                }]
            }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "switch-status": {
                "title": "Toggle Switch Value",
                "type": "string",
                "description": "The current value of toggle switch."
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
                "type": "string",
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