const __GRID__ = {
    "name": "grid",
    "label": "Grid",
    "class": "scriptr-grid",
    "show": true,
    "commonData" :"true",
    "defaults": {
        "data-format": "grid",
        "multiple-data-points": "true",
        "columns-definition": '[{headerName: "Name", field: "name"},{headerName: "Model", field: "model"},{headerName: "Price", field: "price"}]',
        "data": '[{name: "Toyota", model: "Celica", price: 35000},{name: "Ford", model: "Mondeo", price: 32000},{name: "Porsche", model: "Boxter", price: 72000}]',
        "boxLabel": "Grid",
        "row-model-type":'pagination',
        "fixed-height": "false",
        "on-format-data": "return data;",
        "enable-server-side-filter": 'false',
        "enable-server-side-sorting": 'false',
        "pagination-page-size": '20',
        "cell-editable": 'false',
        "editable" : "false",
        "enable-sorting":"false", //Client side sorting
        
        
        "suppress-row-click-selection": "true",
        "suppress-cell-selection":"true"
        
    },
    "box": {
        sizeX: 6,
        sizeY: 6,
        minSizeX: 4,
        minSizeY: 2,
    },
    "imgCls": "grid-img",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/grid.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "Columns",
                items: [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [{
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "key": "columns-definition"
                            }
                            ]
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
                                    "key": "row-model-type",
                                    "placeholder": " ",
                                    "type": 'strapselect',
                                    "titleMap": [
                                        {"value": "infinite",
                                         "name": "infinite"
                                     }, {
                                         "value": "pagination",
                                         "name": "pagination"
                                     }]
                                },
                                {
                                    "condition": "model['api'] && model['api'] != null && model['row-model-type'] == 'pagination'",
                                    "key": "pagination-page-size"
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
                                    {
                                        "key": "pagination",
                                    },
                                    {
                                        "key": "enable-server-side-sorting",
                                       
                                    },
                                    {
                                        "key": "enable-server-side-filter",
                                        
                                    },
                                    {
                                        "key": "enable-col-resize",
                                        
                                    }]
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
            "data": {
                "title": "Data",
                "type": "string",
                "description": "Data series in case of static data.",
                "codemirrorOptions": {
                    "placeholder": "[{'name': 'Golf', 'model': 'GT', 'price' : '10000'}, {'name': 'BMW', 'model': 'Z3', 'price' : '20000'}]"
                }
            },

            "enable-server-side-sorting": {
                "title": "Enable Sorting",
                "type": "boolean",
                "description": "Turn on server sorting for the grid."
            },
            "enable-server-side-filter": {
                "title": "Enable Filter",
                "type": "boolean",
                "description": "Turn on server side filtering."
            },
            "enable-col-resize": {
                "title": "Enable Column Resize",
                "type": "boolean",
                "description": "Enable column resize."
            },
            "pagination": {
                "title": "Enable Pagination",
                "type": "boolean",
                "description": "Enable Pagination."
            },
            "row-model-type": {
                "title": "Row Model Type",
                "type": "string",
                "description": "The supported ways are 'infinite' and 'pagination' for only non-static data",
                "default": "pagination",
            },
            "pagination-page-size": {
                "title": "Pagination Page Size",
                "type": "string",
                "description": "Number of rows per page."
            },
            "suppress-filter": {
                "title": "Suppress filer",
                "type": "boolean",
                "description": "Hide column filter."
            },
            "data-format": {
                "type": "hidden",
                "default": "line"
            },
            "multiple-data-points": {
                "type": "hidden",
                "default": "true"
            }
        },
        "required": ["columns-definition"]
    }
};