const __BUTTON__ = {
    "name": "button",
    "label": "Button",
    "class": "scriptr-button",
    "commonData": true,
    "commonActionData": true,
    "show": true,
    "defaults": {
        "action-transport": "https",
        "action-api": "UIComponents/dashboard/frontend/examples/button/setButtonLabel",
        "boxLabel": "Button",
        "type": "btn-success",
        "label": "Click",
        "enable-resize": true,
        //"data": "Click", //Put same as label so it doesn't flicker, data overrides label
        "boxHeader": false,
        "dropdata": true
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
        tabs: [ {
                title: "Button behaviour",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": ["label",
                            {
                                "key": "type",
                                "placeholder": " ",
                                "type": 'strapselect',
                                "titleMap": [{
                                    "value": "btn-success",
                                    "name": "Success"
                                }, {
                                    "value": "btn-danger",
                                    "name": "Danger"
                                },
                                             {
                                    "value": "btn-warning",
                                    "name": "Warning"
                                },
                                             {
                                    "value": "btn-info",
                                    "name": "Info"
                                },
                                             {
                                    "value": "btn-primary",
                                    "name": "Primary"
                                }
                             ]
                           }
                        ]
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
            "data": {
                "type": "hidden",
            },
            "dropdata": {
                "type": "boolean",
                "default": true
            },
            "is-disabled": {
                "title": "Disabled",
                "type": "boolean",
                "description": "Check to disbale the Button.",
            },
            "type": {
                "title": "Type",
                "type": "string",
                "description": "Choose the type of the Button."
            },
            "label": {
                "title": "Default label",
                "type": "string",
                "description": "Choose the label of the Button."
            },
            "size": {
                "title": "Size",
                "type": "string",
                "enum": ["small", "medium", "large"],
                "description": "choose the size of the Button."
            }
        },
        "required": []
    }
};