const __PROGRESSBAR__ = {
    "name": "progressbar",
    "label": "ProgressBar",
    "class": "scriptr-progressbar",
    "commonData": true,
    "show": false,
    "defaults": {
        "transport": "wss",
        "msg-tag": "progressbar",
        //    "api" : "UIComponents/dashboard/frontend/examples/progressBar/getProgressBarVal",
        "value": "20",
        "animate": "true",
        "on-format-data": "return data;",
        "title": "Progress bar",
        "class": "progress-striped active"
    },
    "box": {
        sizeX: 2,
        sizeY: 2,
        minSizeX: 1,
        minSizeY: 1
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/progress-bar.png",
    "form": [{
        type: "tabs",
        tabs: [{
            title: "Progress bar behaviour",
            items: ["stacked", "class", "type", "max", {
                "key": "animate",
                
            }]
        }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "data": {
                "title": "Progressbar Value",
                "type": "number",
                "description": "The current value of progress bar."
            },
            "animate": {
                "title": "Animate",
                "type": "boolean",
                "description": "Whether bars use transitions to achieve the width change."
            },
            "class": {
                "title": "Class",
                "type": "string",
                "description": "Can take 'progress-striped' or 'progress-striped active'"
            },
            "type": {
                "title": "Type",
                "type": "string",
                "description": "Bootstrap style type. Possible values are 'success', 'info', 'warning', and, 'danger' to use Bootstrap's pre-existing styling, or any desired custom suffix."
            },
            "max": {
                "title": "Total number of bars",
                "type": "string",
                "description": "A number that specifies the total value of bars that is required.",
            },
            "stacked": {
                "title": "Stacked",
                "type": "string",
                "description": "Array of objects representing multiple stacked progress bars.",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "[{value : 50, type : 'success', title : 'bar1'},{value : 70, type : 'warning', title : 'bar2'}]"
                }
            }
        },
        "required": []
    }
};