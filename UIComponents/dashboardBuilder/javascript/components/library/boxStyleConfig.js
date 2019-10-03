angular
    .module('DashboardBuilder')
    .constant(
        "boxStyle",
        {
            "formTab": {
                title: "Box Properties",
                items: [
                    { 	
                        "key": "boxHeader"
                       
                    },
                    {
                        "condition": "model.boxHeader === true",
                        "key": "boxLabel"
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
                    "title": "Has header title",
                    "type": "boolean",
                    "default": true,
                    "description": "Check to display a chart header title."
                }
            }


        }
    );
