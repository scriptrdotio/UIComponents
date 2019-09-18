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
        // "api" : "UIComponents/dashboard/frontend/examples/metricbox/getMetric BoxVal",
        "animation": "count",
        "on-format-data": "return data;",
        "unit": "%",
        "label": "Battery",
        "tag": "battery",
        "on-action-clicked": "return ;",
        "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAAAAmJLR0QA/4ePzL8AAAEWSURBVHja7ds7EoJAEEVRElyLn6UqiOVq1B3oGxNwIX4yqNLMTB2Q7kLrvs6pPtAzJDNJQgghhPQQ3dsVAAAAAAD4bcB+dliq0i22wZeUm6qQH6euzZ9GYa2m3Rv+8EUarZT6tb9rPyIRY7V1IoR1lxmPWhmFy+x/Gp4vAHWY2O82RbddJnJ3yuwBJ1NAaQ+4mgIu7j+soT0PAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAfRcAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBJwMQWc7QGVKcD+6HHITQFzc8BxGnf8vlPVGif20coKEPLEI0q1NQFs3G7RKFWhut/hCblb+8+1kKmMvU3wpq4qtXC4ekIIIeQv8wCzaILmDABsuwAAAABJRU5ErkJggg==",
        "action-icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAQAAAD41aSMAAAAAmJLR0QA/4ePzL8AAANxSURBVHja7dzNTlNRFMXxm9iYtI74cIqTOjDRN3ECgUcBR8oTdESF+Ao+AANq0sRIhZx9MDZxQI2OgQFYJ7RxcJ2IIdBejHjPOt7zX3tOyv7pXrdNaJYRQgghhBBCCCGEEEIIIYQQQgghhBBCyIRYw1Zs0/bsxMaWV3zGdmx7tumWrRHF8g8euLZ9r/zaJ83Qb9iCdPndml+38ySXfzHn9qJbE62/N+veJL38i3l7cF+w/g8P7TPL/zUD3wz+r98GLP7SfLX5oLef43N1fCdgF/h1Fn593FqwB8/En3ymzdn+XBAA12bZU6YVYP0f7yX6tutPZhjg3bGtsOiCKl4qH2CLNRfMy/IB9lhzwf+A3fIBTlhzwRyVD1D9D5xvM6PyAW54CVnFI//9AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4D98Ab5jTwAQvgDL7Yd7Jfm7QwAu/fxTe/bpLgA6gNxyO7QVAJQAueXxNUJiAPE1QnoAkTVCmgARNUK6AJE0QtIAMTRC6gDyRgBA3AgAiBsBAHEjACBuBADEjQCAuBEAEDcCAOJGAEDcCACIGwEAcSMAIG4EAMSNAIC4EQAQNwIA4kYAQNwIAIgbAQBxIwAgbgQAxI0AwD8F8E8B4AQlCEAJKwF8xz2O9/evOsBfXH0A+CiiAgB8GKcEuN3VB0B89QEQX30AxFcfAPHVB0B89QEQX30AxFcfAPHVB0B89QEQX30AxFcfAPHVB0B89QEQX30AxFcfAPHVB0B89QHgK8ukAHxpnxIghqufLkAkVz9NAL66WAjAl3crX4Df9o9iXX4SALEHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgkwvuklJD2j8gFOWHPBHJUP8J41F8y78gG2WPP0ce3SAdwya54+frF0gF7dvrHoKTO0RoAHMb/BqqdMK8yT8IKds+wJc9qbDfVm5DnrnnD/V4O9G3x9x2+z8Cuz061l4dKfsQFLvzRfbD4LG9+E4Pcc+mYWPv0Z32H5lttOfybTpFtza3aW9pOPXw16+69nf85aNkxy+UNrBXvwLE6v7pdc2/Xs2EaVX/vIjv2ua/vFXj2K5RNCCCGEEEIIIYQQQgghhBBCCCGEEEKiy0+HE82+2OfSFQAAAABJRU5ErkJggg=="
    },
    "box": {
        sizeX: 1,
        sizeY: 1,
        minSizeX: 1,
        minSizeY: 1,
        maxSizeY: 2
    },
    "imgCls": "metricbox-img",
    "imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAAlCAYAAABF7RcQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0MzlBMzQxRTdCNjExRTZCREVBQURCRkE1MTI4QTFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0MzlBMzQyRTdCNjExRTZCREVBQURCRkE1MTI4QTFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQzOUEzM0ZFN0I2MTFFNkJERUFBREJGQTUxMjhBMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQzOUEzNDBFN0I2MTFFNkJERUFBREJGQTUxMjhBMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75PGiuAAAGNUlEQVR42uxb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",
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