const __METRIC_BOX__ = {
    "name": "metricbox",
    "label": "Metric Box",
    "class": "scriptr-metricbox",
    "commonData": true,
    "show": true,
    "defaults": {
        "transport": "wss",
        "boxLabel": "Metric Box",
        "msg-tag": "metricbox",
        "value": 10,
        "animation": "count",
        "on-format-data": "return data;",
        "unit": "%",
        "label": "Battery",
        "tag": "battery",
        "on-action-clicked": "return ;",
        "icon": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/metric-box-battery.png",
        "action-icon": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/metric-box-action.png"
    },
    "box": {
        sizeX: 1,
        sizeY: 2,
        minSizeX: 1,
        minSizeY: 2
    },
    "imgCls": "metricbox-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/play.png",
    "form": [{
        type: "tabs",
        tabs: [{
            title: "Metric Box Extras",
            items: ["value", "unit", "label", "icon", "action-icon", "tag",
                {
                    "key": "on-action-clicked",
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
        }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "value": {
                "title": "Static data",
                "type": "string",
                "description": "Set a static value for Metric Box."
            },
            "unit": {
                "title": "Unit",
                "type": "string",
                "default": "",
                "description": "Unit."
            },
            "label": {
                "title": "Label",
                "type": "string",
                "default": "",
                "description": "Label."
            },
            "tag": {
                "title": "Tag",
                "type": "string",
                "default": "",
                "description": "Tag passed to onActionClicked callback function."
            },
            "icon": {
                "title": "Icon URL",
                "type": "string",
                "default": "",
                "description": "Icon URL."
            },
            "on-action-clicked": {
                "title": "OnActionClicked Callback",
                "type": "string",
                "default": "alert(tag)",
                "description": "OnActionClicked Callback called once you click on the top right icon of the widget.",

            },
            "action-icon": {
                "title": "Action Icon URL",
                "type": "string",
                "default": "",
                "description": "Action Icon URL."
            }
        },
        "required": []
    }
};