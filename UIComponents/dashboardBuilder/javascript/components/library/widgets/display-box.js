const __DISPLAY_BOX__ = {
    "name": "displaybox",
    "label": "Display Box",
    "class": "scriptr-displaybox",
    "commonData": true,
    "show": false,
    "defaults": {
        "on-format-data": "return data;",
        "transport": "wss",
        "boxLabel": "Text",
        "msg-tag": "text",
        "data": "Bla Bla"
    },
    "box": {
        sizeX: 2,
        sizeY: 1,
        minSizeX: 1,
        minSizeY: 1

    },
    "imgCls": "displaybox-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/display-box.png",
    "form": [{
        type: "tabs",
        tabs: [{
            title: "Format",
            items: ["type"]
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
                "format": 'uiselect',
                "placeholder": " ",
                "items": [{
                    "value": "info",
                    "label": "INFO"
                }, {
                    "value": "warning",
                    "label": "WARNING"
                }, {
                    "value": "success",
                    "label": "SUCCESS"
                }, {
                    "value": "danger",
                    "label": "DANGER"
                }],
                "description": "Select text theme."
            }
        },
        "required": []
    }
};