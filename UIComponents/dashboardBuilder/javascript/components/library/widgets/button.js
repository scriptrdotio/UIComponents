const __BUTTON__ = {
    "name": "button",
    "label": "Button",
    "class": "scriptr-button",
    "show": true,
    "defaults": {
        "transport": "https",
        "boxLabel": "Button",
        "type": "btn-success",
        "enable-resize": true,
        "size": "large",
        "label": "Refresh",
        "boxHeader": false
        // ,"api" : "UIComponents/dashboard/frontend/examples/gauge/getGaugeVal"
    },
    "box": {
        sizeX: 1,
        sizeY: 1,
        minSizeX: 1,
        minSizeY: 1,
        "fitToWidget": true
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/button.png",
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
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["api"]
                        }, {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["api-params"]
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
            }, {
                title: "Button behaviour",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["type"]
                    }, {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [{
                            "key": "is-disabled",
                        }]
                    }]
                }]
            }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "is-disabled": {
                "title": "Disabled",
                "type": "boolean",
                "description": "Check to disbale the Button.",
            },
            "type": {
                "title": "Type",
                "type": "string",
                "enum": ["btn-default", "btn-danger",
                    "btn-warning", "btn-success",
                    "btn-info", "btn-primary"],
                "description": "Choose the type of the Button."
            },
            "size": {
                "title": "Size",
                "type": "string",
                "enum": ["small", "large"],
                "description": "choose the size of the Button."
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
            "msg-tag": {
                "title": "Message Tag",
                "type": "string",
                "description": "Subscribe to socket messages with tag name."
            },
            "http-method": {
                "title": "Http method",
                "type": "string",
                "description": "Method to be used when calling the scriptr api over https. Default: GET.",
                "default": "GET",

            },
            "api-params": {
                "title": "Api Params",
                "type": "string",
                "description": "Api parameters.",
                "x-schema-form": {
                    "placeholder": "Ex: {'id' : '599865'}"
                }
            }
        },
        "required": []
    }
};