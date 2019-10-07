angular
    .module('DashboardBuilder')
    .constant(
        "common",
        {
            "formTab": {
                title: "Data",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "transport",
                                "placeholder": " ",
                                "type": 'strapselect',
                                "titleMap": [{
                                    "value": "wss",
                                    "name": "wss"
                                }, {
                                    "value": "https",
                                    "name": "https"
                                }]
                            }]
                        }, {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "msg-tag",
                                "condition": "model.transport=='wss'"
                            }, {
                                "key": "http-method",
                                "condition": "model.transport=='https'",
                                "type": 'strapselect',
                                "placeholder": " ",
                                "titleMap": [{
                                    "value": "GET",
                                    "name": "GET"
                                }]
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
                            "htmlClass": "col-xs-6",
                            "items": ["use-window-params"]
                        }, {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["fetch-interval"]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [
                                {
                                    "key": "data"
                                },
                                {
                                    "key": "on-format-data",
                                    "type": "codemirror",
                                    "codemirrorOptions": {
                                        "value": "return;",
                                        "styleActiveLine": true,
                                        "lineNumbers": true,
                                        "lineWrapping": true,
                                        "autoCloseBrackets": true,
                                        "matchBrackets": true,
                                        "theme": "neo",
                                        "mode": "javascript",
                                        "readOnly": false,
                                        "autoRefresh": true
                                    }
                                }
                            ]
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
            "schemaFields": {
                "api": {
                    "title": "Api",
                    "type": "string",
                    "description": "Name of the scriptr api (script name) responsible for publishing or returning the widget data."
                },
                "api-params": {
                    "title": "Api params",
                    "type": "string",
                    "description": "A JSON formatted object containing the parameters to be sent to the scriptr api.",
                    "x-schema-form": {
                        "type": "textarea",
                        "placeholder": "Ex: {'id' : '599865'}"
                    }
                },
                "http-method": {
                    "title": "Http method",
                    "type": "string",
                    "description": "Method to be used when calling the scriptr api over https. Default: GET.",
                    "default": "GET",
                },
                "transport": {
                    "title": "Transport",
                    "type": "string",
                    "description": "Protocol used to call the  scriptr api. Use wss for real time communication whenever your widget needs to update its data live by consuming messages published from scriptr over the subscribe channel defined in settings."
                },
                "msg-tag": {
                    "title": "Message tag",
                    "type": "string",
                    "description": "The dashboard widgets consume messages published over the subscribe channel defined in dashboard settings. Message tag is an identifier sent as part of the published message. The widget uses it to know which messages to consume or ignore."
                },
                "on-format-data": {
                    "title": "Format data",
                    "default": "return data;",
                    "type": "string",
                    "description": "Callback function to be called after data is returned from backend."
                },"use-window-params": {
                    "title": "Use Window Params",
                    "type": "boolean",
                    "default": false,
                    "description": "This Need some description."
                },"fetch-interval": {
                    "title": "Fetch Interval",
                    "type": "number",
                    "default": 0,
                    "description": "Data update interval value."
                },
            }

        }
);