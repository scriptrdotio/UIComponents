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
        "data": "Bla Bla",
        "type":"info"
    },
    "box": {
        sizeX: 3,
        sizeY: 2,
        minSizeX: 2,
        minSizeY: 2

    },
    "imgCls": "displaybox-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/display-box.png",
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
                "description": "Text to display.",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "Front door has been unlocked for the past 5 hours."
                }
            },
            "type": {
                "title": "Type",
                "type": "string",

                "description": "Select text theme."
            }
        },
        "required": []
    }
};