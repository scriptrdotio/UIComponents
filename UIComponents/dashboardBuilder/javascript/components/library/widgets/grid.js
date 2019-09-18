const __GRID__ = {
    "name": "grid",
    "label": "Grid",
    "class": "scriptr-grid",
    "show": true,
    "defaults": {
        "columns-definition": '[{headerName: "Name", field: "name"},{headerName: "Model", field: "model"},{headerName: "Price", field: "price"}]',
        "row-data": '[{name: "Toyota", model: "Celica", price: 35000},{name: "Ford", model: "Mondeo", price: 32000},{name: "Porsche", model: "Boxter", price: 72000}]',
        "enable-sorting": "true",
        // "api":'UIComponents/dashboard/frontend/examples/grid/gridAPI',
        "enable-delete-row": 'true',
        "boxLabel": "Grid",
        // "row-model-type":'pagination',
        // "grid-height":"300",
        "fixed-height": "false",
        "enable-add-row": 'true',
        "msg-tag": "grid",
        "on-format-data": "return data;",
        "cell-editable": 'true',
        "enable-client-side-filter": 'true',
        "enable-server-side-filter": 'false',
        "enable-server-side-sorting": 'false',
        "row-model-selection": 'multiple',
        "pagination-page-size": '20',
        "transport": 'https'
    },
    "box": {
        sizeX: 2,
        sizeY: 4,
        minSizeX: 2,
        minSizeY: 2,
    },
    "imgCls": "grid-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/grid.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Data",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": ["transport"]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    {
                                        "key": "msg-tag",
                                        "condition": "model.transport=='wss'"
                                    }]
                            }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["api"]
                        }, {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": ["api-params"]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "key": "columns-definition"
                            }, {
                                "key": "row-data"
                            } // ,"on-format-data"
                            ]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "type": "help",
                                "helpvalue": "<hr>"
                            }]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "type": "help",
                                "helpvalue": "<div class=\"alert alert-info\"><ul><li>Messages published over the subscibe channel need to have the following format in order to be consumed by a widget:<ul><li>{“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”}</li></ul></li><li>A script would publish a message  over the subscribe channel as follow:<ul><li>publish(“responseChannel”, {“id”: “&lt;message tag value&gt;”, “result”: “&lt;static data structure&gt;”});</li></ul></li><li>Whether https or wss transport is used, Sciptr API should return the static data structure for widget initial load:<ul><li>return &lt;static data structure&gt;;</li></ul></li></ul></div>"
                            }]
                        }]
                    }

                ]
            },
            {
                title: "Grid behaviour",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                {
                                    "key": "pagination",
                                    "type": "radios-inline",
                                    titleMap: [
                                        {
                                            value: "true",
                                            name: "True"
                                        },
                                        {
                                            value: "false",
                                            name: "False"
                                        }]
                                }
                            ]
                        }]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    "row-model-selection",
                                    {
                                        "key": "enable-client-side-sorting",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    {
                                        "key": "enable-client-side-filter",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    {
                                        "key": "suppress-filter",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    {
                                        "key": "enable-add-row",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    {
                                        "key": "enable-delete-row",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    {
                                        "key": "cell-editable",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    "pagination-page-size",
                                    {
                                        "key": "enable-server-side-sorting",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    {
                                        "key": "enable-server-side-filter",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    },
                                    {
                                        "key": "enable-col-resize",
                                        "type": "radios-inline",
                                        titleMap: [
                                            {
                                                value: "true",
                                                name: "True"
                                            },
                                            {
                                                value: "false",
                                                name: "False"
                                            }]
                                    }, "add-params",
                                    "delete-params",
                                    "edit-params"]
                            }]
                    }]
            },
            {
                title: "Help",
                items: [{
                    "type": "help",
                    "helpvalue": "<div class=\"alert alert-info\"><h4>The expected params sent from the grid are: <br/> <br/>\"filterColumnName \": The column name where to filter. <br/> <br/> \"resultsPerPage\": Number of row to return from the API.  <br/> <br/>  \"pageNumber\" : Number of the page.<br/> <br/> \"sort\": Sorting direction (asc, desc).<br/> <br/> \"sortType\": numeric or string.<br/> <br/> \"queryFilter\": Criteria value to search for. <br/> <br/> \"queryType\": Query types are startsWith, endsWith, contains, equals and notEquals.  <br/> <br/>  \"sortingColumnName\" : The sorting column name.<br/> <br/> \"action \" : action types are add, edit and delete.<br/> <br/></h4> <pre>The expected returned data structure from a service API is as follows:  <br/> <br/>{\r\n \t\"count\": \"500\",\r\n \t\"documents\": [\r\n \t\t{\r\n \t\t\t\"key\": \"C91918B97B1EAA7A97D8435611452666\",\r\n \t\t\t\"name\": \"Toyota\",\r\n \t\t\t\"model\": \"Celica\",\r\n \t\t\t\"price\": \"35000\"\r\n \t\t},\r\n \t\t{\r\n \t\t\t\"key\": \"DC2BEB691E480C22886AEC708D5A19A5\",\r\n \t\t\t\"name\": \"Ford\",\r\n \t\t\t\"model\": \"Mondeo\",\r\n \t\t\t\"price\": \"32000\"\r\n \t\t}\r\n \t\t]\r\n}</pre></div>"
                }]
            }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "columns-definition": {
                "title": "Columns definition",
                "type": "string",
                "description": "Series of data (Each column in the grid is defined using a column definition).",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "[{'headerName': 'Name', 'field': 'name'}, {'headerName': 'Model', 'field': 'model'}, {'headerName': 'Price', 'field': 'price', 'type': 'numeric'}]"
                }
            },
            "row-data": {
                "title": "Row data",
                "type": "string",
                "description": "You pass static data to the grid.",
                "x-schema-form": {
                    "type": "textarea",
                    "placeholder": "[{'name': 'Golf', 'model': 'GT', 'price' : '10000'}, {'name': 'BMW', 'model': 'Z3', 'price' : '20000'}]"
                }
            },
            "enable-client-side-sorting": {
                "title": "Enable client Side Sorting",
                "type": "string",
                "description": "Turn on client sorting for the grid."
            },
            "enable-server-side-sorting": {
                "title": "Enable Server Side Sorting",
                "type": "string",
                "description": "Turn on server sorting for the grid."
            },
            "enable-client-side-filter": {
                "title": "Enable Client Side Filter",
                "type": "string",
                "description": "Turn on client side filter."
            },
            "enable-server-side-filter": {
                "title": "Enable Server Side Filter",
                "type": "string",
                "description": "Turn on server side filter."
            },
            "enable-add-row": {
                "title": "Enable Add Row",
                "type": "string",
                "description": "Turn on insert row."
            },
            "enable-delete-row": {
                "title": "Enable Delete Row",
                "type": "string",
                "description": "Turn on delete row."
            },
            "cell-editable": {
                "title": "Cell Editable",
                "type": "string",
                "description": "Turn on cell editing."
            },
            "enable-col-resize": {
                "title": "Enable Column Resize",
                "type": "string",
                "description": "Enable column resize."
            },
            "pagination": {
                "title": "Enable Pagination",
                "type": "string",
                "description": "Enable Pagination."
            },
            "row-model-type": {
                "title": "Row Model Type",
                "type": "string",
                "description": "The supported ways are 'virtual' and 'pagination' for only non-static data",
                "default": "pagination",
                "format": 'uiselect',
                "placeholder": " ",
                "items": [{
                    "value": "virtual",
                    "label": "virtual"
                }, {
                    "value": "pagination",
                    "label": "pagination"
                }]

            },
            "row-model-selection": {
                "title": "Row Model Selection",
                "type": "string",
                "description": "Set to either 'single' or 'multiple' in case of backend data.",
                "default": "Source Sans Pro",
                "format": 'uiselect',
                "placeholder": " ",
                "items": [{
                    "value": "single",
                    "label": "single"
                }, {
                    "value": "multiple",
                    "label": "multiple"
                }]
            },
            "pagination-page-size": {
                "title": "Pagination Page Size",
                "type": "string",
                "description": "Number of rows per page."
            },
            "suppress-filter": {
                "title": "Suppress filer",
                "type": "string",
                "description": "Hide column filter."
            },
            "api": {
                "title": "Api",
                "type": "string",
                "description": "Name of the api to get data.",
                "x-schema-form": {
                    "placeholder": "UIComponents/dashboard/frontend/examples/grid/getCarsInfo"
                }
            },
            "on-format-data": {
                "title": "Format Data",
                "type": "string",
                "description": "Callback function to be called after data is returned from backend."
            },
            "transport": {
                "title": "Transport",
                "type": "string",
                "enum": ["wss", "https"],
                "description": "Method used to call api (can take 'http' or 'wss')."
            },
            "msg-tag": {
                "title": "Message Tag",
                "type": "string",
                "description": "Subscribe to socket messages with tag name."
            },
            "api-params": {
                "title": "Api Params",
                "type": "string",
                "description": "Api parameters.",
                "x-schema-form": {
                    "placeholder": "Ex: {'id' : '599865'}"
                }
            },
            "add-params": {
                "title": "on-add API Params",
                "type": "string",
                "description": "On add API params.",
                "x-schema-form": {
                    "placeholder": "Ex: {'id' : '599865'}"
                }
            },
            "delete-params": {
                "title": "on-delete API Params",
                "type": "string",
                "description": "On delete API params.",
                "x-schema-form": {
                    "placeholder": "Ex: {'id' : '599865'}"
                }
            },
            "edit-params": {
                "title": "on-edit API Params",
                "type": "string",
                "description": "On edit API params.",
                "x-schema-form": {
                    "placeholder": "Ex: {'id' : '599865'}"
                }
            }
        },
        "required": ["columns-definition"]
    }
};