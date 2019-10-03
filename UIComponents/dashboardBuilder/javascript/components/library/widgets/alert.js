const __ALERT__ = {
    "name": "alert",
    "label": "Alert",
    "class": "scriptr-alert",
    "commonData": true,
    "show": true,
    "defaults": {
        "on-format-data": "return data;",
        "transport": "wss",
        "boxLabel": "Alert",
        "msg-tag": "alert",
        "boxHeader": false,
        "data": "{\"data\":\"Contextual Message.\", \"type\": \"INFO\"}",
        "showHeader": "false",
        "type":"info",
        
    },
    "box": {
        sizeX: 4,
        sizeY: 2,
        minSizeX: 1,
        minSizeY: 1,
        "fitToWidget": true

    },
    "imgCls": "alert-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/alert.png",
    "form": [{
        type: "tabs",
        tabs: [{
            title: "Format",
            htmlclass:"row",
            items: [
                {
                    "key": "type",
                    "htmlclass":"col-xs-6",
                    "type": 'strapselect',
                    "placeholder": " ",
                    "titleMap": [{
                        "value": "info",
                        "name": "INFO"
                    }, {
                        "value": "warning",
                        "name": "WARNING"
                    }, {
                        "value": "success",
                        "name": "SUCCESS"
                    }, {
                        "value": "danger",
                        "name": "DANGER"
                    }],
                }
            ]
        }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "data": {
                "title": "Data",
                "type": "string",
                "description": "Alert to display with can be in one of these 2 formats. Message with its type ex: {\"data\":\"Contextual Message.\", \"type\": \"INFO\"} or just the message ex: \"Contextual Message\"",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "Front door has been unlocked for the past 5 hours."
                }
            },
            "type": {
                "title": "Default message theme.",
                "type": "string",

                "description": "Select the default message theme if not provided by data."
            }
        },
        "required": []
    }
};