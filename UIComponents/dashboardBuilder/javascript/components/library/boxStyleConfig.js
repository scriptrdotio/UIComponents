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
                    "title": "Has Header",
                    "type": "boolean",
                    "default": "true",
                    "description": "Check to display a chart header."
                }
            }


        }
    );
