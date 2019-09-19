angular
    .module('DashboardBuilder')
    .constant(
        "boxStyle",
        {
            "formTab": {
                title: "Box Properties",
                items: ["box-label",
                    {
                        type: "radios-inline",
                        key: "box-header",
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
                "box-label": {
                    "title": "Box Label",
                    "type": "string",
                    "description": "Define your widget box title.",
                    "maxLength": 40
                },
                "box-header": {
                    "title": "Box Header",
                    "type": "string",
                    "default": "true",
                    "description": "Define your widget box border."
                }
            }


        }
    );
