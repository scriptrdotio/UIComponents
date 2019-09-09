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
            "transport" : {
                "label" : "Configuration",
                "defaults" : {
                    "publishChannel" : "requestChannel",
                    "subscribeChannel" : "responseChannel"
                },
                "form" : [ "*" ],
                "schema" : {
                    "type" : "object",
                    "title" : "Schema",
                    "properties" : {
                        "publishChannel" : {
                            "title" : "Publish channel",
                            "type" : "string",
                            "description" : "Widgets use the publish channel to publish messages that will be distributed to its subscribers."
                        },
                        "subscribeChannel" : {
                            "title" : "Subscribe channel",
                            "type" : "string",
                            "description" : "Widgets use the subscribe channel to consume the messages published over that channel as a data source."
                        }
                    },
                    "required" : [ "token", "baseUrl", "publishChannel",
                                  "subscribeChannel" ]
                }
            }
        }
    }
)());
