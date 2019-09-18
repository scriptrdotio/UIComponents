angular
    .module('DashboardBuilder')
    .constant(
        "boxStyle",
        {
            "formTab": {
                title: "Box Properties",
                items: ["boxLabel",
                    {
                        type: "radios-inline",
                        key: "boxBorder",
                        titleMap: [{
                            value: "true",
                            name: "True"
                        }, {
                            value: "false",
                            name: "False"
                        }]
                    }
                ]
            },

            "schemaFields": {
                "boxLabel": {
                    "title": "Box Label",
                    "type": "string",
                    "description": "Define your widget box title.",
                    "maxLength": 40
                },
                "boxBorder": {
                    "title": "Box Border",
                    "type": "hidden",
                    "default": "true",
                    "description": "Define your widget box border."
                }
            }


        }
    );
