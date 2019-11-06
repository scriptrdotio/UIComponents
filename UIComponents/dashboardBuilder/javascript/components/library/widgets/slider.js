const __SLIDER__ = {
    "name": "slider",
    "label": "Slider",
    "class": "scriptr-slider",
    "commonData": true,
    "commonActionData": true,
    "show": true,
    "defaults": {
        "transport": "wss",
        "api":"UIComponents/dashboard/frontend/examples/slider/getSliderVal",
        "publish-api" : "UIComponents/dashboard/frontend/examples/slider/publishSliderVal",
        "boxLabel": "Slider",
        "min": 2,
        "enable-resize": true,
        "floor": 0,
        "on-format-data": "return data;",
        "min-limit": 1,
        "max-limit": 9,
        "ceil": 10,
        "step": 1,
        "vertical": false,
        "show-ticks": "true",
        "theme": "scriptr-slider"
    },
    "box": {
        sizeX: 4,
        sizeY: 3,
        minSizeX: 4,
        minSizeY: 1,
       fitToWidget: true
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/slider.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Slider behaviour",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                "min",
                                "floor",
                                "min-limit",
                                "min-range",
                                "step",
                                {
                                    "key": "keyboard-support",
                                    
                                },
                                {
                                    "key": "log-scale",
                                    
                                },
                                {
                                    "key": "is-disabled",
                                    
                                }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                "max",
                                "ceil",
                                "max-limit",
                                "max-range",
                                "precision",
                                {
                                    "key": "right-to-left",
                                    
                                },
                                {
                                    "key": "read-only",
                                    
                                }, "steps-array",]
                        }]
                }]
            },
            {
                title: "Visualization",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                "show-selection-bar-from-value",
                                {
                                    "key": "show-selection-bar",
                                    
                                },
                                {
                                    "key": "show-ticks",
                                    
                                },
                                {
                                    "key": "hide-limit-labels",
                                    
                                }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                "ticks-array",
                                {
                                    "key": "show-selection-bar-end",
                                    
                                },
                                {
                                    "key": "show-ticks-values",
                                    
                                },
                                {
                                    "key": "theme",
                                    "type": "radios-inline",
                                    titleMap: [{
                                        value: "",
                                        name: "Default"
                                    }, {
                                        value: "scriptr-slider",
                                        name: "Scriptr theme"
                                    }]
                                }]
                        }]
                }]
            }, {
                title: "Range",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [{
                            "key": "push-range",
                            
                        }, {
                            "key": "draggable-range",
                            
                        }]
                    }, {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [{
                            "key": "draggable-range-only",
                           
                        }, {
                            "key": "boolean",
                            
                        }]
                    }]
                }]
            }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "min": {
                "title": "Slider 1",
                "type": "number",
                "description": "First Slider Value (defaults to 0)."
            },
            "max": {
                "title": "Slider 2",
                "type": "number",
                "description": "Second Slider Value."
            },
            "floor": {
                "title": "Floor",
                "type": "number",
                "description": "Minimum value for a slider (defaults to 0)."
            },
            "ceil": {
                "title": "Ceil",
                "type": "number",
                "description": "Maximum value for a slider (defaults to rz-slider-modelvalue)."
            },
            "step": {
                "title": "Step",
                "type": "number",
                "description": "Step between each value."
            },
            "precision": {
                "title": "Precision",
                "type": "number",
                "description": "The precision to display values with. The toFixed() is used internally for this."
            },

            "min-limit": {
                "title": "Minimum Limit",
                "type": "number",
                "description": "The minimum value authorized on the slider.",
            },
            "max-limit": {
                "title": "Maximum Limit",
                "type": "number",
                "description": "The maximum value authorized on the slider."
            },
            "min-range": {
                "title": "Minimum Range",
                "type": "number",
                "description": "The minimum range authorized on the slider. Applies to range slider only."
            },
            "max-range": {
                "title": "Maximum range",
                "type": "number",
                "description": "The maximum range authorized on the slider. Applies to range slider only."
            },
            "push-range": {
                "title": "Push Range",
                "type": "boolean",
                "description": "Set to true to have a push behavior. When the min handle goes above the max, the max is moved as well."
            },
            "steps-array": {
                "title": "Steps Array",
                "type": "string",
                "description": "If you want to display a slider with non linear/number steps. Just pass an array with each slider value and that's it; the floor, ceil and step settings of the slider will be computed automatically.They can also be bound to the index of the selected item by setting the bindIndexForStepsArray option to true.",
                "x-schema-form": {
                    "placeholder": "Ex: [{value: 'A'},{value: 10, legend: 'Legend for 10'}, new Date(2016, 7, 12),{value: new Date(2016, 7, 12), legend: 'Legend for 10'} ]"
                }
            },
            "bind-index-for-steps-array": {
                "title": "Bind Index For Steps Array",
                "type": "string",
                "description": "Set to true to bind the index of the selected item to rz-slider-model and rz-slider-high. (This was the default behavior prior to 4.0)."
            },
            "draggable-range": {
                "title": "Draggable Range",
                "type": "boolean",
                "description": "When set to true and using a range slider, the range can be dragged by the selection bar."
            },
            "draggable-range-only": {
                "title": "Draggable Range Only",
                "type": "boolean",
                "description": "Same as draggableRange but the slider range can't be changed."
            },
            "show-selection-bar": {
                "title": "Show Selection Bar",
                "type": "boolean",
                "description": "Set to true to always show the selection bar before the slider handle."
            },
            "show-selection-bar-end": {
                "title": "Show Selection Bar End",
                "type": "boolean",
                "description": "Set to true to always show the selection bar after the slider handle.",
            },
            "show-selection-bar-from-value": {
                "title": "Show Selection Bar From Value",
                "type": "number",
                "description": "Set a number to draw the selection bar between this value and the slider handle."
            },
            "hide-limit-labels": {
                "title": "Hide Limit Labels",
                "type": "boolean",
                "description": "Set to true to hide min / max labels"
            },
            "auto-hide-limit-labels": {
                "title": "Auto Hide Limit Labels",
                "type": "string",
                "description": "Set to false to disable the auto-hiding behavior of the limit labels."
            },
            "read-only": {
                "title": "Read Only",
                "type": "boolean",
                "description": "Set to true to make the slider read-only."
            },
            "is-disabled": {
                "title": "Disabled",
                "type": "boolean",
                "description": "Set to true to disable the slider."
            },
            "interval": {
                "title": "Interval",
                "type": "number",
                "description": "The number of milliseconds to wait between two updates of the slider."
            },
            "show-ticks": {
                "title": "Show Ticks",
                "type": "boolean",
                "description": "Set to true to display a tick for each step of the slider."
            },
            "show-ticks-values": {
                "title": "Show Ticks Values",
                "type": "boolean",
                "description": "Set to true to display a tick and the step value for each step of the slider."
            },
            "ticks-array": {
                "title": "Ticks Array",
                "type": "string",
                "description": "Use to display ticks at specific positions. The array contains the index of the ticks that should be displayed.",
                "x-schema-form": {
                    "placeholder": " [0, 1, 5] "
                }
            },
            "scale": {
                "title": "Scale",
                "type": "number",
                "description": "If you display the slider in an element that uses transform: scale(0.5), set the scale value to 2 so that the slider is rendered properly and the events are handled correctly."
            },
            "enforce-step": {
                "title": "Enforce Step",
                "type": "number",
                "description": "Set to true to force the value to be rounded to the step, even when modified from the outside.. When set to false, if the model values are modified from outside the slider, they are not rounded and can be between two steps."
            },
            "enforce-range": {
                "title": "Enforce Range",
                "type": "string",
                "description": "Set to true to round the Slider 1 and Slider 2 to the slider range even when modified from outside the slider."
            },
            "no-switching": {
                "title": "No Switching",
                "type": "string",
                "description": "Set to true to prevent to user from switching the min and max handles. Applies to range slider only."
            },
            "only-bind-handles": {
                "title": "Only Bind Handles",
                "type": "string",
                "description": "Set to true to only bind events on slider handles."
            },
            "bound-pointer-labels": {
                "title": "Bound Pointer Labels",
                "type": "string",
                "description": "Set to true to keep the slider labels inside the slider bounds."
            },
            "merge-range-labes-if-same": {
                "title": "Merge Range Labels If Same",
                "type": "string",
                "description": "Set to true to merge the range labels if they are the same. For instance, if min and max are 50, the label will be '50 - 50' if mergeRangeLabelsIfSame: false, else '50'."
            },
            "right-to-left": {
                "title": "Right To Left",
                "type": "boolean",
                "description": "Set to true to show graphs right to left."
            },
            "vertical": {
                "title": "Vertical",
                "type": "string",
                "description": "Set to true to display the slider vertically. The slider will take the full height of its parent. Changing this value at runtime is not currently supported."
            },
            "keyboard-support": {
                "title": "Keyboard Support",
                "type": "boolean",
                "description": "Handles are focusable (on click or with tab) and can be modified using keyboard controls.",
            },
            "log-scale": {
                "title": "Log Scale",
                "type": "boolean",
                "description": "Set to true to use a logarithmic scale to display the slider."
            },
            "selection-bar-gradient": {
                "title": "Selection Bar Gradient",
                "type": "string",
                "description": "Use to display the selection bar as a gradient. The given object must contain from and to properties which are colors."
            },
            "aria-label": {
                "title": "Aria Label",
                "type": "string",
                "description": "Use to add a label directly to the slider(s) for accessibility. Adds the aria-label attribute."
            },
            "aria-label-high": {
                "title": "Aria Label High ",
                "type": "string",
                "description": "Use to add a label directly to the slider(s) for accessibility. Adds the aria-label attribute."
            },
            "theme": {
                "title": "Theme",
                "type": "string",
                "description": "Select a theme for your slider from the list of available themes."
            }
        },
        "required": ["ceil"]
    }
};