const __ODOMETER__ = {
    "name": "odometer",
    "label": "Odometer",
    "class": "scriptr-odometer",
    "commonData": true,
    "show": true,
    "defaults": {
        "data-format": "odometer",
        "multiple-data-points": "false",
        "boxLabel": "Odometer",
        "data": "200",
        "animation": "count",
        "theme": "car",
        "on-format-data": "return data;",
        "on-clicked": "return arguments;",
        "duration": 1000,
        "size": 2
    },
    "box": {
        sizeX: 2,
        sizeY: 2,
        minSizeX: 1,
        minSizeY: 1
    },
    "imgCls": "odometer-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/odometer.png",
    "form": [{
        type: "tabs",
        tabs: [{
            title: "Odometer behaviour",
            items: [{
                "key": "theme",
                "type": 'strapselect',
                "placeholder": " ",
                "titleMap": [{
                    "value": "default",
                    "name": "Default"
                },
                {
                    "value": "car",
                    "name": "Scriptr"
                },
                {
                    "value": "minimal",
                    "name": "Minimal"
                },
                {
                    "value": "plaza",
                    "name": "Plaza"
                },
                {
                    "value": "slot-machine",
                    "name": "Slot machine"
                },
                {
                    "value": "train-station",
                    "name": "Train station"
                },
                {
                    "value": "digital",
                    "name": "Digital"
                }]
            },
                "duration", "animation", "size", {
                "key": "on-clicked",
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
            "on-clicked": {
                "title": "onClick",
                "default": "return arguments;",
                "type": "string",
                "description": "Callback function to be called after data is returned from backend."
            },
            "data": {
                "title": "Static data",
                "type": "number",
                "description": "Set a static value for Odometer.",
                "codemirrorOptions": {
                    "placeholder": "2020"
                }
            },
            "duration": {
                "title": "Duration",
                "type": "number",
                "description": "Change how long the javascript expects the CSS animation to take."
            },
            "size": {
                "title": "Size",
                "type": "number",
                "default": 2,
                "description": "Odometer size in em. Recommended size between 0 & 5."
            },
            "animation": {
                "title": "Animation",
                "type": "string",
                "description": "Count is a simpler animation method which just increments the value,use it when you're looking for something more subtle."
            },
            "theme": {
                "title": "Theme",
                "type": "string",
                "description": "Select an odometer theme.",
                "default": "car",
            },
            "data-format": {
                "type": "hidden",
                "default": "odometer"
            },
            "multiple-data-points": {
                "type": "hidden",
                "default": "false"
            }
            
        },
        "required": []
    }
};