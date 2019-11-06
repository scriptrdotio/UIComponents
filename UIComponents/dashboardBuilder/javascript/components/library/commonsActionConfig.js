angular
    .module('DashboardBuilder')
    .constant(
        "commonAction",
        {
            "formTab": {
                title: "Action",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "action-transport",
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
                                "key": "action-http-method",
                                "type": 'strapselect',
                                "condition": "model['action-transport'] =='https'",
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
                            "items": [
                                { 
                                    "key":"action-api"
                                }
                            ]
                        }, {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                {
                                    "key": "action-api-params" 
                                }, {
                                    "key": "action-use-window-params" 
                                }]
                        }]
                    }
                ]
            },
            "schemaFields": {
                "action-api": {
                    "title": "Action api",
                    "type": "string",
                    "description": "Name of the scriptr api (script name) used for the widget action call."
                },
                "action-api-params": {
                    "title": "Api params",
                    "type": "string",
                    "description": "A JSON formatted object containing the parameters to be sent to the scriptr action api.",
                    "x-schema-form": {
                        "type": "textarea",
                        "placeholder": "Ex: {'id' : '599865'}"
                    }
                },
                "action-http-method": {
                    "title": "Http method",
                    "type": "string",
                    "description": "Method to be used when calling the scriptr action api over https. Default: GET.",
                    "default": "GET",
                },
                "action-transport": {
                    "title": "Transport",
                    "type": "string",
                    "description": "Protocol used to call the  scriptr action api. Use wss for real time communication whenever your widget needs to update its data live by consuming messages published from scriptr over the subscribe channel defined in settings."
                },
                "action-use-window-params": {
                    "title": "Merge Window Params",
                    "type": "boolean",
                    "default": false,
                    "description": "Merge URL query params with the widget api params."
                }
            }

        }
);