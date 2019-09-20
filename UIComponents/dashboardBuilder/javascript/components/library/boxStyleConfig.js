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
                        key: "boxHeader",
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
                "boxHeader": {
                    "title": "Box Header",
                    "type": "string",
                    "default": "true",
                    "description": "Define your widget box border."
                }
            }


        }
    );
