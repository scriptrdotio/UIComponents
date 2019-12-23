angular
    .module('DashboardBuilder')
    .constant(
    "deviceConfig",
    {
        "formTab": {
            title: "Devices",
            items: [
                { 
                    "type" : "section",
                    "htmlClass" : "row",
                    "title" : "Device",
                    "placeholder" : " ",
                    "items" : [{

                        "type" : "section",
                        "htmlClass" : "col-xs-12",
                        "items" : [{
                            key: "device",
                            type: "uiselect",
                            placeholder: " ",
                            options: {
                                closeOnSelect: true,
                                callback: "loadDevices"
                            },
                            "onFieldLoad": "onLoadDevice(modelValue, form, model);",
                            "onChange": "onChangeDevice(modelValue, form, model);"
                        }]
                    }]
                },
            ]
        },
        "schemaFields": {
            "device": {
                "title": "The device id in scriptr",
                "type": "string",
                "description": "Select your device"
            }
        }
    }
);
