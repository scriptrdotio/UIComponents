angular
    .module('DashboardBuilder')
    .constant(
        "boxStyle",
        {
            "formTab": {
                title: "Box Properties",
                items: ["boxLabel",
                    {
                        key: "boxHeader",
                       
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
                    "type": "boolean",
                    "default": "true",
                    "description": "Define your widget box border."
                }
            }


        }
    );
