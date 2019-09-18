const __IFRAME__ = {
    "name": "iframe",
    "label": "IFrame",
    "class": "scriptr-iframe",
    "show": true,
    "defaults": {
        "boxLabel": "IFrame"
    },
    "box": {
        sizeX: 1,
        sizeY: 1,
        minSizeX: 1,
        minSizeY: 1
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/iframe.png",
    "form": [{
        type: "tabs",
        tabs: [{
            title: "Data",
            items: ["link"]
        }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "link": {
                "title": "Link or URL",
                "type": "string",
                "description": "Enter Iframe source URL.",
            }
        },
        "required": []
    }
};