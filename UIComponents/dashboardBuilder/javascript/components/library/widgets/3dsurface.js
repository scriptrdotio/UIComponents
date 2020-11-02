const __onRadioButtonChangeForLayout__ = function (modelValue, form, model) {
    if(model['legend-type'] =='form')
        model["layout-config"] = angular.copy(model["layout-config-form"]);
    else if(model['legend-type'] =='json')
        model["layout-config"] = angular.copy(model["json-config"]);
};

const __onRadioButtonChangeForTraces__ = function (modelValue, form, model){
    if( model["traces-config-form"]["colorScaleWrapper"] != null){
        var arr = [];
        model["traces-config-form"]["colorScaleWrapper"].forEach(function (element) {
            var inArr = [];
            inArr[0] = element.priority;
            inArr[1] = element.color;
            arr.push(inArr);
        });
        model["traces-config-form"]["colorscale"] = arr;
    }
    if(model['legend-type'] =='form')
        model["traces-config"] = angular.copy(model["traces-config-form"]);
    else if(model['legend-type'] =='json')
        model["traces-config"] = angular.copy(model["json-config"]);
};

const __onModeBarButtonsChange__ = function (modelValue, form, model) {
    var arr = [];
    var buttons=[
        'zoom3d',
        'pan3d',
        'hoverClosest3d',
        'resetCameraLastSave3d',
        'resetCameraDefault3d',
        'orbitRotation',
        'tableRotation',
        'toImage'
    ];
    var obj = model.options["modeBarButtonsToRemoveWrapper"];
    buttons.forEach(function (element) {
        if (obj.hasOwnProperty(element)) {
            if (!obj[element]) {
                arr.push(element);
            }
        }else{
            arr.push(element);
        }
    });
    model.options["modeBarButtonsToRemove"] = arr;
};
const __3DSURFACE__ = {
    "name": "d3surface",
    "label": "3D Surface",
    "class": "scriptr-three-d-surface",
    "commonData": true,
    "show": true,
    "defaults": {
        "type": "d3surface",
        "data-format": "d3surface",
        "boxLabel": "3D Surface",
        //"transport": "https",
        //"api": "UIComponents/dashboard/frontend/examples/plotly/get3dSurfaceData",
        "data": '{"x":[5,8,9,11,17,18,22,25,29,40,45],"y":[1,4,19,20,22,29,34,50,55,60,70],"z":[[94406,102226,100476,104180,95610,101533,102925,101269,99009,92350,104448],[93445,104218,103759,96438,97964,92475,98259,95060,96552,91771,100263],[92525,103953,103434,100673,92664,92543,90106,90020,91159,92297,98877],[104631,94803,97843,100977,90526,102190,101738,101019,95238,99732,93036],[94836,93296,90879,94323,94635,91338,93995,94928,90520,99140,98669],[103672,103768,102159,102392,99864,93895,95896,97644,93341,96207,98995],[91065,103743,101070,92035,102096,104144,103583,98755,101781,100802,98260],[96269,94443,93042,98596,94341,94682,90108,92787,103789,96213,100077],[92990,90872,103253,92603,92238,100841,99683,90743,97936,103678,102659],[95751,100822,92947,91383,92458,103821,97929,94826,90563,94954,100669],[90740,102921,97082,95820,91951,100666,99549,90632,103519,91803,99903]]}',
       /* "traces-config-form": { 
            "showscale" : true,
            "contours": {
                "z": {
                    "show": true,
                    "usecolormap": true,
                    "highlightcolor": "#38b9d6",
                    "project": { "z": true }
                },
                "x": {
                    "show": false,
                    "usecolormap": true,
                    "highlightcolor": "#c64dff",
                    "project": { "x": false }
                },
                "y": {
                    "show": false,
                    "usecolormap": true,
                    "highlightcolor": "#e90088",
                    "project": { "y": false }
                }
            },
            "colorscale" : [[0,"#c64dff"],[1,"#1dbc68"]],
            "colorScaleWrapper": [{"priority":0,"color":"#c64dff"},{"priority":1,"color":"#1dbc68"}],
            "colorbar" :  {
                "outlinecolor":"#E2E913",
                "bgcolor" :"rgba(0,0,0,0)",
                "ticks":'outside',
                "tickcolor":'#C8CE1B',
                "showticklabels" : true,
                "title":{
                    "text":'',
                    "font":{
                        "family":'Times New Roman',
                        "size":15,
                        "color":'#C8CE1B'
                    },
                    "side":"top"
                },
            },
            "hoverinfo":"x+y+z",
            "hoverongaps" : false,
            "hoverlabel" : {
                "bgcolor":'#C8CE1B'
            },
        },
        "layout-config-form": {
            "title":"The default of the graph",
            "margin":{
                "l":5,
                "r":5,
                "b":5,
                "t":5
            },
            "autosize":false,
            "scene": {
                "xaxis": { "title": "Temperature" },
                "yaxis": { "title":"Humidity" },
                "zaxis": { "title": "Pressure" },
            },
        },*/
        "options" :{
            "displayModeBar": false,
            "modeBarButtonsToRemove":[], 
            "displaylogo": false,
            "modeBarButtonsToRemoveWrapper": {
                "toImage": true,
                "tableRotation": true,
                "orbitRotation": true,
                "resetCameraDefault3d": true,
                "resetCameraLastSave3d": true,
                "hoverClosest3d": true,
                "pan3d": true,
                "zoom3d": true
            },
            "scrollZoom":false,
            "staticPlot":false,
            "editable":false
        },
    },
    "box": {
        sizeX: 5,
        sizeY: 10,
        minSizeX: 4,
        minSizeY: 4
    },
    "imgCls": "",
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/3dSurface.png",
    "form": [
        {
            type: "tabs",
            tabs: [
                {
                    title: "Traces",
                    items: [
                        {
                            "type": "section",
                            "htmlClass": "row",
                            "items": [
                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-12",
                                    "items": [
                                        {
                                            type: "radios-inline",
                                            key: "legend-type",
                                            onChange: __onRadioButtonChangeForTraces__,
                                            titleMap: [{
                                                value: "form",
                                                name: "form"
                                            }, {
                                                value: "json",
                                                name: "json"
                                            }]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "section",
                            "htmlClass": "",
                            "condition": "model['legend-type'] =='json'",
                            "items": [{
                                "type": "textarea",
                                "title": "Traces Configuration",
                                "key":"json-config",
                                onChange: __onRadioButtonChangeForTraces__,
                            }
                                     ]
                        },
                        {
                            "type": "section",
                            "htmlClass": "",
                            "condition": "model['legend-type'] =='form'",
                            "items": [
                                {
                                    "key": "traces-config-form",
                                    "title": "Color scale",
                                    "htmlClass": "",
                                    "items": [{
                                        "type": "section",
                                        "htmlClass": "",
                                        "items": [ {
                                            "type": "section",
                                            "htmlClass": "",
                                            "items": [
                                                {
                                                    "key": "traces-config-form.colorScaleWrapper",
                                                    "htmlClass": "",
                                                    "items": [{
                                                        "type": "section",
                                                        "htmlClass": "row",
                                                        "items": [
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-6 ",
                                                                "items": [{
                                                                    "key": "traces-config-form.colorScaleWrapper[].priority",
                                                                    "onChange": __onRadioButtonChangeForTraces__,
                                                                }]
                                                            },
                                                            {
                                                                "type": "section",
                                                                "htmlClass": "col-xs-6 ",
                                                                "items": [{
                                                                    "key": "traces-config-form.colorScaleWrapper[].color",
                                                                    "onChange": __onRadioButtonChangeForTraces__,
                                                                    "colorFormat": "hex3",
                                                                    "spectrumOptions": {
                                                                        showInput: true,
                                                                        showAlpha: false,
                                                                        allowEmpty: true,
                                                                        showPalette: true,
                                                                        preferredFormat: 'hex3',
                                                                        palette: [['#fce94f', '#fcaf3e', '#e9b96e'],
                                                                                  ['#8ae234', '#729fcf', '#ad7fa8'],
                                                                                  ['#ef2929', '#888a85', '#deface']]
                                                                    }
                                                                }
                                                              ]
                                                            }
                                                        ]
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "section",
                                                  "htmlClass": "row",
                                                  "items": [
                                                   {
                                                     "key":"traces-config-form.hoverlabel",
                                                     "htmlClass": "col-xs-12",
                                                     "title":"Hover Configuration",
                                                     "items":[
                                                         {
                                                          "type": "section",
                                                          "htmlClass": "col-xs-4",
                                                          "items": [
                                                              {
                                                                  "key":"traces-config-form.hoverlabel.bgcolor",
                                                                  "onChange":__onRadioButtonChangeForTraces__
                                                              }
                                                          ]
                                                          },
                                                          {
                                                           "key":"traces-config-form.hoverinfo",
                                                           "onChange":__onRadioButtonChangeForTraces__,
                                                           "htmlClass": "col-xs-4",
                                                           "type": 'strapselect',
                                                           "titleMap": [
                                                               {
                                                                 "value": "all",
                                                                 "name": "all"
                                                               },
                                                               {
                                                                  "value": "none",
                                                                  "name": "none"
                                                               },
                                                               {
                                                                  "value": "skip",
                                                                  "name": "skip"
                                                               },
                                                               {
                                                                  "value": "x",
                                                                  "name": "x"
                                                               },
                                                               {
                                                                  "value": "x+y",
                                                                  "name": "x+y"
                                                               },
                                                               {
                                                                  "value": "x+y+z",
                                                                  "name": "x+y+z"
                                                               },
                                                               {
                                                                  "value": "y+z",
                                                                  "name": "y+z"
                                                               },
                                                               {
                                                                 "value": "z",
                                                                 "name": "z"
                                                               },
                                                               {
                                                                   "value": "y",
                                                                   "name": "y"
                                                               },
                                                               {
                                                                   "value": "x+z",
                                                                   "name": "x+z"
                                                               }
                                                              ]
                                                             },
                                                             {
                                                               "type": "section",
                                                               "htmlClass": "col-xs-4",
                                                               "items": [
                                                                   {
                                                                    "key":"traces-config-form.hoverongaps",
                                                                    "onChange":__onRadioButtonChangeForTraces__
                                                                   }
                                                               ]
                                                             }
                                                           ]
                                                        },
                                                    ]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "row",
                                                    "items": [
                                                        {
                                                                    "key":"traces-config-form.colorbar",
                                                                    "htmlClass": "col-xs-12",
                                                                    "title":"Bar Configuration",
                                                                    "items":[
                                                                        {
                                                                            "type": "section",
                                                                            "htmlClass": "col-xs-4",
                                                                            "items": [
                                                                                {
                                                                                    "key":"traces-config-form.showscale",
                                                                                    "onChange":__onRadioButtonChangeForTraces__
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "section",
                                                                            "htmlClass": "col-xs-4",
                                                                            "items": [
                                                                                {
                                                                                 "key":"traces-config-form.colorbar.thickness",
                                                                                 "onChange":__onRadioButtonChangeForTraces__
                                                                                }
                                                                            ],
                                                                            "condition":"model['traces-config-form']['showscale']"
                                                                        },
                                                                        {
                                                                            "type": "section",
                                                                            "htmlClass": "col-xs-4",
                                                                            "condition":"model['traces-config-form']['showscale']",
                                                                            "items": [
                                                                                {
                                                                                 "key":"traces-config-form.colorbar.tickcolor",
                                                                                 "onChange":__onRadioButtonChangeForTraces__
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "section",
                                                                            "htmlClass": "col-xs-4",
                                                                            "condition":"model['traces-config-form']['showscale']",
                                                                            "items": [
                                                                                {
                                                                                 "key":"traces-config-form.colorbar.title.text",
                                                                                    "onChange":__onRadioButtonChangeForTraces__
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "section",
                                                                            "htmlClass": "col-xs-4",
                                                                            "condition":"model['traces-config-form']['showscale']",
                                                                            "items":[
                                                                                {
                                                                                    "key":"traces-config-form.colorbar.ticks",
                                                                                    "onChange":__onRadioButtonChangeForTraces__,
                                                                                    "type": 'strapselect',
                                                                                    "titleMap": [
                                                                                        {
                                                                                            "value": "outside",
                                                                                            "name": "outide"
                                                                                        }, {
                                                                                            "value": "inside",
                                                                                            "name": "inside"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "section",
                                                                            "htmlClass": "col-xs-4",
                                                                            "condition":"model['traces-config-form']['showscale']",
                                                                            "items":[
                                                                                {
                                                                                    "key":"traces-config-form.colorbar.title.side",
                                                                                    "onChange":__onRadioButtonChangeForTraces__,
                                                                                    "type": 'strapselect',
                                                                                    "titleMap": [{
                                                                                        "value": "top",
                                                                                        "name": "top"
                                                                                    }, {
                                                                                        "value": "bottom",
                                                                                        "name": "bottom"
                                                                                    },
                                                                                                 {
                                                                                                     "value": "left",
                                                                                                     "name": "left"
                                                                                                 },
                                                                                                 {
                                                                                                     "value": "right",
                                                                                                     "name": "right"
                                                                                                 }
                                                                                                ]
                                                                                }
                                                                            ]
                                                                        },
                                                            ]
                                                        },
                                                        {
                                                            "type": "section",
                                                            "htmlClass": "",
                                                            "items": [
                                                                {
                                                                    "key":"traces-config-form.contours",
                                                                    "htmlClass": "col-xs-12",
                                                                    "title":"Contours",
                                                                    "items":[
                                                                        {
                                                                            "type": "section",
                                                                            "title": "X Axis",
                                                                            "htmlClass": "col-xs-4",
                                                                            "items": [
                                                                                {
                                                                                    "key":"traces-config-form.contours.x.show",
                                                                                    "onChange":__onRadioButtonChangeForTraces__,
                                                                                },
                                                                                {
                                                                                    "key": "traces-config-form.contours.x.usecolormap",
                                                                                    "onChange":__onRadioButtonChangeForTraces__,
                                                                                },
                                                                                {
                                                                                    "key": "traces-config-form.contours.x.highlightcolor",
                                                                                    "onChange":__onRadioButtonChangeForTraces__,
                                                                                    "colorFormat": "hex3",
                                                                                    "spectrumOptions": {
                                                                                        showInput: true,
                                                                                        showAlpha: false,
                                                                                        allowEmpty: true,
                                                                                        showPalette: true,
                                                                                        preferredFormat: 'hex3',
                                                                                        palette: [['#fce94f', '#fcaf3e', '#e9b96e'],
                                                                                                  ['#8ae234', '#729fcf', '#ad7fa8'],
                                                                                                  ['#ef2929', '#888a85', '#deface']]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "key":"traces-config-form.contours.x.project.x",
                                                                                    "onChange":__onRadioButtonChangeForTraces__,
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "section",
                                                                            "htmlClass": "col-xs-4",
                                                                            "items": [
                                                                               {
                                                                                   "key":"traces-config-form.contours.y.show",
                                                                                   "onChange":__onRadioButtonChangeForTraces__,
                                                                               },
                                                                               {"key":"traces-config-form.contours.y.usecolormap",
                                                                                "onChange":__onRadioButtonChangeForTraces__,
                                                                               },
                                                                                {
                                                                                    "key": "traces-config-form.contours.y.highlightcolor",
                                                                                    "onChange":__onRadioButtonChangeForTraces__,
                                                                                    "colorFormat": "hex3",
                                                                                    "spectrumOptions": {
                                                                                        showInput: true,
                                                                                        showAlpha: false,
                                                                                        allowEmpty: true,
                                                                                        showPalette: true,
                                                                                        preferredFormat: 'hex3',
                                                                                        palette: [['#fce94f', '#fcaf3e', '#e9b96e'],
                                                                                                  ['#8ae234', '#729fcf', '#ad7fa8'],
                                                                                                  ['#ef2929', '#888a85', '#deface']]
                                                                                    }
                                                                                },
                                                                               { 
                                                                                "key":"traces-config-form.contours.y.project.y",
                                                                                 "onChange":__onRadioButtonChangeForTraces__,
                                                                               }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "section",
                                                                            "htmlClass": "col-xs-4",
                                                                            "items": [
                                                                                {
                                                                                "key":"traces-config-form.contours.z.show",
                                                                                "onChange":__onRadioButtonChangeForTraces__,
                                                                                },
                                                                                {
                                                                               "key":"traces-config-form.contours.z.usecolormap",
                                                                               "onChange":__onRadioButtonChangeForTraces__,
                                                                                },
                                                                                {
                                                                                    "key": "traces-config-form.contours.z.highlightcolor",
                                                                                    "onChange":__onRadioButtonChangeForTraces__,
                                                                                    "colorFormat": "hex3",
                                                                                    "spectrumOptions": {
                                                                                        showInput: true,
                                                                                        showAlpha: false,
                                                                                        allowEmpty: true,
                                                                                        showPalette: true,
                                                                                        preferredFormat: 'hex3',
                                                                                        palette: [['#fce94f', '#fcaf3e', '#e9b96e'],
                                                                                                  ['#8ae234', '#729fcf', '#ad7fa8'],
                                                                                                  ['#ef2929', '#888a85', '#deface']]
                                                                                    }
                                                                                },
                                                                                {
                                                                                "key":"traces-config-form.contours.z.project.z",
                                                                                "onChange":__onRadioButtonChangeForTraces__,
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                            ]
                        }
                        ]
                },
                        {
                            title: "Layout",
                            items: [
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-12",
                                            "items": [
                                                {
                                                    type: "radios-inline",
                                                    key: "legend-type",
                                                    onChange: __onRadioButtonChangeForLayout__,
                                                    titleMap: [{
                                                        value: "form",
                                                        name: "form"
                                                    }, {
                                                        value: "json",
                                                        name: "json"
                                                    }]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "",
                                    "condition": "model['legend-type'] =='json'",
                                    "items": [{
                                        "type": "textarea",
                                        "title": "Layout Configuration",
                                        "key":"json-config",
                                        onChange: __onRadioButtonChangeForLayout__,
                                    }
                                             ]
                                },
                                {
                                    "type": "section",
                                    "htmlClass": "",
                                    "condition": "model['legend-type'] =='form'",
                                    "key":"layout-config-form",
                                    "onChange": __onRadioButtonChangeForLayout__,
                                    "items": [
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-12 col-sm-4",
                                            "items": [
                                                {
                                                    "key":"layout-config-form.title",
                                                    "onChange": __onRadioButtonChangeForLayout__,
                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-12 col-sm-4",
                                            "items": [
                                                {
                                                    "key":"layout-config-form.scene.xaxis.title",
                                                    "onChange": __onRadioButtonChangeForLayout__,
                                                },
                                                {
                                                    "key":"layout-config-form.scene.yaxis.title",
                                                    "onChange": __onRadioButtonChangeForLayout__,
                                                },
                                                {
                                                    "key":"layout-config-form.scene.zaxis.title",
                                                    "onChange": __onRadioButtonChangeForLayout__,
                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-12 col-sm-4",
                                            "items": [
                                                {
                                                    "key":"layout-config-form.autosize",
                                                    "onChange": __onRadioButtonChangeForLayout__,
                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items":[
                                                {
                                                    "key":"layout-config-form",
                                                    "htmlClass": "col-xs-12",
                                                    "title":"Margins",
                                                    "items": [
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-3",
                                                            "items": [
                                                                { 
                                                                    "key":"layout-config-form.margin.l",
                                                                    "onChange": __onRadioButtonChangeForLayout__,
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-3",
                                                            "items": [
                                                                {
                                                                    "key":"layout-config-form.margin.r",
                                                                    "onChange": __onRadioButtonChangeForLayout__,
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-3",
                                                            "items": [{"key":"layout-config-form.margin.t",
                                                                       "onChange": __onRadioButtonChangeForLayout__,}]
                                                        },
                                                        {
                                                            "type":"section",
                                                            "htmlClass": "col-xs-12 col-sm-3",
                                                            "items": [
                                                                {
                                                                    "key":"layout-config-form.margin.b",
                                                                    "onChange": __onRadioButtonChangeForLayout__,
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "Options",
                            items: [
                                {
                                    "type": "section",
                                    "htmlClass": "row",
                                    "items": [
                                        {
                                            "type": "section",
                                            "htmlClass": "col-xs-12 col-sm-6",
                                            "key":"options",
                                            "items": [
                                                {
                                                    "key":"options.displayModeBar"
                                                },
                                                {
                                                    "key": "options.displaylogo",
                                                    "condition": "model.options['displayModeBar']"
                                                },
                                                {
                                                    "key": "options.staticPlot",
                                                },
                                                {
                                                    "key": "options.editable",
                                                },
                                                {
                                                    "key": "options.scrollZoom",
                                                    "condition":"!model.options['staticPlot']",
                                                }
                                            ]
                                        },
                                        {
                                            "type": "section",
                                            "htmlClass": "row",
                                            "key":"options",
                                            "items": [
                                                { 
                                                    "key": "options.modeBarButtonsToRemoveWrapper",
                                                    "condition":"model.options['displayModeBar']",
                                                    "items": [
                                                        {
                                                            key:"options.modeBarButtonsToRemoveWrapper.toImage",
                                                            onChange: __onModeBarButtonsChange__
                                                        },{
                                                            key:"options.modeBarButtonsToRemoveWrapper.tableRotation",
                                                            onChange: __onModeBarButtonsChange__
                                                        },{
                                                            key:"options.modeBarButtonsToRemoveWrapper.orbitRotation",
                                                            onChange: __onModeBarButtonsChange__
                                                        },{
                                                            key:"options.modeBarButtonsToRemoveWrapper.resetCameraDefault3d",
                                                            onChange: __onModeBarButtonsChange__
                                                        },{
                                                            key:"options.modeBarButtonsToRemoveWrapper.resetCameraLastSave3d",
                                                            onChange: __onModeBarButtonsChange__
                                                        },{
                                                            key:"options.modeBarButtonsToRemoveWrapper.hoverClosest3d",
                                                            onChange: __onModeBarButtonsChange__
                                                        },{
                                                            key:"options.modeBarButtonsToRemoveWrapper.pan3d",
                                                            onChange: __onModeBarButtonsChange__
                                                        },{
                                                            key:"options.modeBarButtonsToRemoveWrapper.zoom3d",
                                                            onChange: __onModeBarButtonsChange__
                                                        },
                                                    ]
                                                }
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ],
            "schema": {
                "type": "object",
                "title": "Schema",
                "properties": {
                    "data": { //This is an override of the commonsconfig definition, to provide sample data based on widget type
                        "title": "Data",
                        "type": "string",
                        "description": "Data series in case of static data.",
                        "codemirrorOptions": {
                            "placeholder": '{"x":[5,8,9,11,17,18,22,25,29,40,45],"y":[1,4,19,20,22,29,34,50,55,60,70],"z":[[94406,102226,100476,104180,95610,101533,102925,101269,99009,92350,104448],[93445,104218,103759,96438,97964,92475,98259,95060,96552,91771,100263],[92525,103953,103434,100673,92664,92543,90106,90020,91159,92297,98877],[104631,94803,97843,100977,90526,102190,101738,101019,95238,99732,93036],[94836,93296,90879,94323,94635,91338,93995,94928,90520,99140,98669],[103672,103768,102159,102392,99864,93895,95896,97644,93341,96207,98995],[91065,103743,101070,92035,102096,104144,103583,98755,101781,100802,98260],[96269,94443,93042,98596,94341,94682,90108,92787,103789,96213,100077],[92990,90872,103253,92603,92238,100841,99683,90743,97936,103678,102659],[95751,100822,92947,91383,92458,103821,97929,94826,90563,94954,100669],[90740,102921,97082,95820,91951,100666,99549,90632,103519,91803,99903]]}'
                        }
                    },
                    "layout-config-form":{
                        "type": "object",
                        "properties": {
                            "title":{
                                "title":"Title",
                                "type":"string",
                                "description":"Title shown above the chart",
                            },
                            "autosize":{
                                "title":"autosize",
                                "type":"boolean",
                            },
                            "margin":{
                                "title":"Margin",
                                "type":"object",
                                "description":"",
                                "properties":{
                                    "l":{
                                        "title":"Left Margin",
                                        "type":"number"
                                    },
                                    "r":{
                                        "title":"Right Margin",
                                        "type":"number"
                                    },
                                    "t":{
                                        "title":"Top Margin",
                                        "type":"number"
                                    },
                                    "b":{
                                        "title":"Bottom Margin",
                                        "type":"number"
                                    }
                                }
                            },
                            "scene":{
                                "type":"object",
                                "properties":{
                                    "xaxis":{
                                        "type":"object",
                                        "properties":{
                                            "title":{
                                                "title": "X AXIS Label",
                                                "type": "string",
                                                "description": "",
                                                "placeholder": " "
                                            }
                                        }
                                    },
                                    "yaxis":{
                                        "type":"object",
                                        "properties":{
                                            "title":{
                                                "title": "Y AXIS Label",
                                                "type": "string",
                                                "description": "",
                                                "placeholder": " "
                                            }
                                        }
                                    },
                                    "zaxis":{
                                        "type":"object",
                                        "properties":{
                                            "title":{
                                                "title": "Y AXIS Label",
                                                "type": "string",
                                                "description": "",
                                                "placeholder": " "
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "traces-config-form": {
                        "title": "Traces Configuration",
                        "type": "object",
                        "properties": {
                            "colorScaleWrapper": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "priority": {
                                            "title": "Priority",
                                            "type": "number",
                                            "minimum":0,
                                            "maximum":1
                                        },
                                        "color": {
                                            "title": "Color",
                                            "type": "string",
                                            "format": "color",
                                        }
                                    }
                                }
                            },
                            "contours": {
                                "type": "object",
                                "title": "Contours",
                                "properties": {
                                    "z": {
                                        "title": "Z",
                                        "type": "object",
                                        "properties": {
                                            "show": {
                                                "title": "Show Z Axis Contours",
                                                "type": "boolean",
                                            },
                                            "usecolormap": {
                                                "title": "Use Color Map",
                                                "type": "boolean",
                                            },
                                            "highlightcolor": {
                                                "title": "Highlight Color",
                                                "type": "string",
                                                "format": "color",
                                            },
                                            "project": {
                                                "title": "Project",
                                                "type": "object",
                                                "properties": {
                                                    "z": {
                                                        "title": "Show Z Axis Projection",
                                                        "type": "boolean",
                                                    }
                                                }
                                            },
                                        }
                                    },
                                    "y": {
                                        "title": "Y",
                                        "type": "object",
                                        "properties": {
                                            "show": {
                                                "title": "Show Y Axis Contours",
                                                "type": "boolean",
                                            },
                                            "usecolormap": {
                                                "title": "Use Color Map",
                                                "type": "boolean",
                                            },
                                            "highlightcolor": {
                                                "title": "Highlight Color",
                                                "type": "string",
                                                "format": "color",
                                            },
                                            "project": {
                                                "title": "Project",
                                                "type": "object",
                                                "properties": {
                                                    "y": {
                                                        "title": "Show Y Axis Projection",
                                                        "type": "boolean",
                                                    }
                                                }
                                            },
                                        }
                                    },
                                    "x": {
                                        "title": "X",
                                        "type": "object",
                                        "properties": {
                                            "show": {
                                                "title": "Show X Axis Contours",
                                                "type": "boolean",
                                            },
                                            "usecolormap": {
                                                "title": "Use Color Map",
                                                "type": "boolean",
                                            },
                                            "highlightcolor": {
                                                "title": "Highlight Color",
                                                "type": "string",
                                                "format": "color",
                                            },
                                            "project": {
                                                "title": "Project",
                                                "type": "object",
                                                "properties": {
                                                    "x": {
                                                        "title": "Show X Axis Projection",
                                                        "type": "boolean",
                                                    }
                                                }
                                            },
                                        }
                                    },
                                }
                            },
                            "colorbar":{
                                "type":"object",
                                "properties":{
                                    "thickness":{
                                        "title":"Thickness",
                                        "type":"number",
                                        "description":"Thickness of the bar",
                                        //"default":20
                                    },
                                    "ticks":{
                                        "title":"Ticks",
                                        "type":"string",
                                        "description":"Ticks Position of the bar ",
                                       // "default":"outside"
                                    },
                                    "tickcolor":{
                                        "title":"Tick Color",
                                        "type":"string",
                                        "format": "color",
                                        "description":"Ticks Color of the bar ",
                                       // "default":"#C8CE1B"
                                    },
                                    "title":{
                                        "title":"Title",
                                        "type":"object",
                                        "description":"",
                                        "properties":{
                                            "text":{
                                                "title":"Title",
                                                "type":"string",
                                                "description":"Bar Title",
                                            },
                                            "side":{
                                                "title":"Title's position",
                                                "type":"string",
                                                "description":"Determines the location of color bar's title with respect to the color bar",
                                            },
                                        }
                                    }
                                }
                            },
                            "colorscale": {
                                "title": "Color Scale",
                                "type": "string",
                                "description": "Array of colors and order, Ex [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']] . ",
                               // "placeholder": "[[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']]"
                            },
                            "hoverlabel":{
                                "type":"object",
                                "properties":{
                                    "bgcolor":{
                                        "title": "Background Color",
                                        "type": "string",
                                        "format": "color",
                                        //"default": "#C8CE1B"
                                    }
                                }
                            },
                            "hoverinfo":{
                                "title": "Hover Info ",
                                "type": "string",
                                "description" : "Determines what information appear on hover",
                            },
                            "hoverongaps":{
                                "title": "hoverongaps",
                                "type": "boolean",
                                "description" : "Determines whether or not gaps are shown or hover"
                            },
                            "showscale":{
                                "title": "showscale",
                                "type": "boolean",
                                "description" : "Show Bar"
                            }
                        }
                    },
                    "options":{
                        "type":"object",
                        "properties":{
                            "displayModeBar":{
                                "title": "Show Mode Bar",
                                "type": "boolean",
                                "default": "false",
                                "description": "Mode Bar is the set of functional icons shown at the top of the chart.",
                            },
                            "modeBarButtonsToRemove":{
                                "title":"Mode Bar Buttons To Remove",
                                "type":"array",
                                "default": [],
                                "items": {
                                    "type": "string",
                                }
                            },
                            "displaylogo":{
                                "title": "Display Plotly Logo",
                                "type":"boolean",
                                "description":"Display Plotly Logo on the Modebar",
                            },
                            "staticPlot":{
                                "title": "Static Plot",
                                "type":"boolean",
                                "description":"Making a Static Chart",
                            },
                            "editable":{
                                "title": "Editable Mode",
                                "type":"boolean",
                                "description":"Edit the chart title, axis labels and trace names in the legend.",
                            },
                            "scrollZoom":{
                                "title": "Scroll Zoom",
                                "type":"boolean",
                                "description":"Mousewheel or two-finger scroll zooms the plot",
                            },
                            "modeBarButtonsToRemoveWrapper":{
                                "title": "Buttons To show on the mode bar",
                                "type": "object",
                                "default": {},
                                "properties": {
                                    "toImage": {
                                        "title": "To Image",
                                        "type": "boolean",
                                    },
                                    "tableRotation": {
                                        "title": "Table Rotation",
                                        "type": "boolean",
                                    },
                                    "orbitRotation": {
                                        "title": "Orbit Rotation",
                                        "type": "boolean",
                                    },
                                    "resetCameraDefault3d": {
                                        "title": "Reset Camera Default 3d",
                                        "type": "boolean",
                                    },
                                    "resetCameraLastSave3d": {
                                        "title": "Reset Camera Last Saved 3d",
                                        "type": "boolean",
                                    },
                                    "hoverClosest3d": {
                                        "title": "Hover Closest 3d",
                                        "type": "boolean",
                                    },
                                    "pan3d": {
                                        "title": "Pan 3d",
                                        "type": "boolean",
                                    },
                                    "zoom3d": {
                                        "title": "Zoom 3d",
                                        "type": "boolean",
                                    },
                                },
                            }
                        }
                    },
                    'json-config': {
                        'title': 'Json Configuration',
                        'type': 'string',
                        'x-schema-form': {
                            'type': 'textarea',
                        },
                    },
                    "layout-config": {
                        "type": "hidden",
                    },
                    "legend-type": {
                        "title": "Legend type",
                        "type": "string",
                    },
                    "traces-config": {
                        "type": "hidden",
                    },
                },
                "required": []
            }
        };