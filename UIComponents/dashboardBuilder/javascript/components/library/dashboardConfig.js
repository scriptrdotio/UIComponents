

angular
    .module('DashboardBuilder')
	.constant("GoogleMapsScriptrKey",__GoogleMapsScriptrKey__)
    .constant(
    "dashboardConfig",
    (function() {
        return {
           "script": {
              "form": [
                 {
                    "key": "scriptName",
                    "notitle": true,
                    "placeholder": "Script name"
                 }
              ],
              "schema": {
                 "type": "object",
                 "title": "Schema",
                 "properties": {
                    "scriptName": {
                       "type": "string",
                       "fieldHtmlClass": "script-name-input"
                    }
                 },
                 "required": [
                    "scriptName"
                 ]
              }
           },
           "settings": {
              "label": "Dashboard Configuration",
              "defaults": {
                 "publishChannel": "requestChannel",
                 "subscribeChannel": "responseChannel",
                 "theme": "light",
                 "style": __defaultsThemeStyles__["light"]
              },
              "form": [
                 {
                    "type": "tabs",
                    "selectedTabIndex": 0,
                    "tabs": [
                       {
                          "title": "Channels",
                          "items": [
                             {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                   {
                                      "type": "help",
                                      "helpvalue": "<h5 class='pdr10 pdl10'>Set the communication channels used by the dashboard to send and receive data.<\/h5><hr/>"
                                   },
                                   {
                                      "type": "section",
                                      "htmlClass": "col-xs-12",
                                      "items": [
                                         "publishChannel",
                                         "subscribeChannel"
                                      ]
                                   }
                                ]
                             }
                          ]
                       },
                       {
                          "title": "Theme",
                          "items": [
                             {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                   {
                                      "type": "section",
                                      "htmlClass": "col-xs-12",
                                      "items": [
                                         {
                                            "type": "section",
                                            "items": [
                                               {
                                                  "key": "theme",
                                                  "htmlClass": "",
                                                  "type": "strapselect",
                                                  "placeholder": " ",
                                                  "titleMap": [
                                                     {
                                                        "value": "light",
                                                        "name": "Light"
                                                     },
                                                     {
                                                        "value": "dark",
                                                        "name": "Dark"
                                                     }
                                                  ]
                                               },
                                               {
                                                  "key": "reset",
                                                  "condition": "false",
                                                  "htmlClass": "col-xs-12 col-md-2",
                                                  "type": "button"
                                               }
                                            ]
                                         },
                                         {
                                            "type": "tabs",
                                            "selectedTabIndex": 0,
                                            "htmlClass": "sub-tabs",
                                            "tabs": [
                                               {
                                                  "title": "Dashboard",
                                                  "items": [
                                                     {
                                                        "type": "fieldset",
                                                        "key": "style.box",
                                                        "items": [
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "row",
                                                              "items": [
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "",
                                                                    "items": [
                                                                       {
                                                                          "type": "section",
                                                                          "htmlClass": "col-xs-12 col-sm-6",
                                                                          "items": [
                                                                             {
                                                                                "key": "style.dashboard.background-type",
                                                                                "type": "strapselect",
                                                                                "titleMap": [
                                                                                   {
                                                                                      "value": "solid",
                                                                                      "name": "Solid"
                                                                                   },
                                                                                   {
                                                                                      "value": "gradient",
                                                                                      "name": "Gradient"
                                                                                   },
                                                                                   {
                                                                                      "value": "image",
                                                                                      "name": "Image"
                                                                                   }
                                                                                ]
                                                                             }
                                                                          ]
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "",
                                                                    "items": [
                                                                       {
                                                                          "type": "section",
                                                                          "htmlClass": "col-xs-12 col-sm-6",
                                                                          "condition": "model.style['dashboard'] ['background-type'] === 'solid'",
                                                                          "items": [
                                                                             {
                                                                                "key": "style.dashboard.background-color",
                                                                                "colorFormat": "hex3",
                                                                                "spectrumOptions": {
                                                                                   "showInput": true,
                                                                                   "showAlpha": true,
                                                                                   "allowEmpty": true,
                                                                                   "showPalette": true,
                                                                                   "preferredFormat": "hex3",
                                                                                   "palette": [
                                                                                      [
                                                                                         "#ff",
                                                                                         "##f2f2f2",
                                                                                         "#2c343a"
                                                                                      ],
                                                                                      [
                                                                                         "#000"
                                                                                      ]
                                                                                   ]
                                                                                }
                                                                             }
                                                                          ]
                                                                       },
                                                                       {
                                                                          "type": "section",
                                                                          "htmlClass": "col-xs-12 col-sm-6",
                                                                          "condition": "model.style ['dashboard'] ['background-type'] === 'gradient'",
                                                                          "items": [
                                                                             {
                                                                                "key": "style.dashboard.background-gradient"
                                                                             }
                                                                          ]
                                                                       },
                                                                       {
                                                                          "type": "section",
                                                                          "htmlClass": "col-xs-12 col-sm-6",
                                                                          "condition": "model.style ['dashboard'] ['background-type'] === 'image'",
                                                                          "items": [
                                                                             {
                                                                                "key": "style.dashboard.background-image"
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
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-3",
                                                                    "condition": "model.style ['dashboard'] ['background-type'] === 'image'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.background-position-x",
                                                                          "type": "strapselect",
                                                                          "titleMap": [
                                                                             {
                                                                                "value": "left",
                                                                                "name": "Left"
                                                                             },
                                                                             {
                                                                                "value": "right",
                                                                                "name": "Right"
                                                                             },
                                                                             {
                                                                                "value": "center",
                                                                                "name": "Center"
                                                                             }
                                                                          ]
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-3",
                                                                    "condition": "model.style ['dashboard'] ['background-type'] === 'image'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.background-position-y",
                                                                          "type": "strapselect",
                                                                          "titleMap": [
                                                                             {
                                                                                "value": "top",
                                                                                "name": "Top"
                                                                             },
                                                                             {
                                                                                "value": "bottom",
                                                                                "name": "Bottom"
                                                                             },
                                                                             {
                                                                                "value": "center",
                                                                                "name": "Center"
                                                                             }
                                                                          ]
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-3",
                                                                    "condition": "model.style ['dashboard'] ['background-type'] === 'image'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.background-size",
                                                                          "type": "strapselect",
                                                                          "titleMap": [
                                                                             {
                                                                                "value": "auto",
                                                                                "name": "Auto"
                                                                             },
                                                                             {
                                                                                "value": "cover",
                                                                                "name": "Cover"
                                                                             },
                                                                             {
                                                                                "value": "contain",
                                                                                "name": "Contain"
                                                                             }
                                                                          ]
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-3",
                                                                    "condition": "model.style ['dashboard'] ['background-type'] === 'image'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.background-repeat",
                                                                          "type": "strapselect",
                                                                          "titleMap": [
                                                                             {
                                                                                "value": "repeat-x",
                                                                                "name": "repeat-x"
                                                                             },
                                                                             {
                                                                                "value": "repeat-y",
                                                                                "name": "repeat-y"
                                                                             },
                                                                             {
                                                                                "value": "repeat",
                                                                                "name": "repeat"
                                                                             },
                                                                             {
                                                                                "value": "space",
                                                                                "name": "space"
                                                                             },
                                                                             {
                                                                                "value": "round",
                                                                                "name": "round"
                                                                             },
                                                                             {
                                                                                "value": "no-repeat",
                                                                                "name": "no-repeat"
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
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-4",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.border-radius",
                                                                          "type": "number"
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
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-4",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.border"
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
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-4",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.border-width",
                                                                          "condition": "model.style ['dashboard'] ['border'] === true",
                                                                          "type": "number"
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-4",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.border-style",
                                                                          "condition": "model.style ['dashboard'] ['border'] === true",
                                                                          "type": "strapselect",
                                                                          "titleMap": [
                                                                             {
                                                                                "value": "dotted",
                                                                                "name": "Dotted"
                                                                             },
                                                                             {
                                                                                "value": "dashed",
                                                                                "name": "Dashed"
                                                                             },
                                                                             {
                                                                                "value": "solid",
                                                                                "name": "Solid"
                                                                             },
                                                                             {
                                                                                "value": "double",
                                                                                "name": "Double"
                                                                             },
                                                                             {
                                                                                "value": "inset",
                                                                                "name": "Inset"
                                                                             },
                                                                             {
                                                                                "value": "outset",
                                                                                "name": "Outset"
                                                                             }
                                                                          ]
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-4",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.dashboard.border-color",
                                                                          "condition": "model.style ['dashboard'] ['border'] === true",
                                                                          "colorFormat": "hex3",
                                                                          "spectrumOptions": {
                                                                             "showInput": true,
                                                                             "showAlpha": true,
                                                                             "allowEmpty": true,
                                                                             "showPalette": true,
                                                                             "preferredFormat": "hex3",
                                                                             "palette": [
                                                                                [
                                                                                   "#ff",
                                                                                   "##f2f2f2",
                                                                                   "#2c343a"
                                                                                ],
                                                                                [
                                                                                   "#000"
                                                                                ]
                                                                             ]
                                                                          }
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
                                                  "title": "Box",
                                                  "items": [
                                                     {
                                                        "type": "section",
                                                        "htmlClass": "row",
                                                        "items": [
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "",
                                                              "items": [
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box.background-type",
                                                                          "type": "strapselect",
                                                                          "titleMap": [
                                                                             {
                                                                                "value": "solid",
                                                                                "name": "Solid"
                                                                             },
                                                                             {
                                                                                "value": "gradient",
                                                                                "name": "Gradient"
                                                                             }
                                                                          ]
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "condition": "model.style['box'] ['background-type'] === 'solid'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box.background-color",
                                                                          "colorFormat": "hex3",
                                                                          "spectrumOptions": {
                                                                             "showInput": true,
                                                                             "showAlpha": true,
                                                                             "allowEmpty": true,
                                                                             "showPalette": true,
                                                                             "preferredFormat": "hex3",
                                                                             "palette": [
                                                                                [
                                                                                   "#ff",
                                                                                   "##f2f2f2",
                                                                                   "#2c343a"
                                                                                ],
                                                                                [
                                                                                   "#000"
                                                                                ]
                                                                             ]
                                                                          }
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "condition": "model.style ['box'] ['background-type'] === 'gradient'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box.background-gradient"
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
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-6",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box.box-shadow",
                                                                    "type": "strapselect",
                                                                    "titleMap": [
                                                                       {
                                                                          "value": "true",
                                                                          "name": "Show"
                                                                       },
                                                                       {
                                                                          "value": "false",
                                                                          "name": "Hide"
                                                                       }
                                                                    ]
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-6",
                                                              "condition": "model.style ['box'] ['box-shadow'] === 'true'",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box.box-shadow-color",
                                                                    "colorFormat": "hex3",
                                                                    "spectrumOptions": {
                                                                       "showInput": true,
                                                                       "showAlpha": true,
                                                                       "allowEmpty": true,
                                                                       "showPalette": true,
                                                                       "preferredFormat": "hex3",
                                                                       "palette": [
                                                                          [
                                                                             "#ff",
                                                                             "##f2f2f2",
                                                                             "#2c343a"
                                                                          ],
                                                                          [
                                                                             "#000"
                                                                          ]
                                                                       ]
                                                                    }
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
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box.border-radius",
                                                                    "type": "number"
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
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12",
                                                              "items": [
                                                                 "style.box.border"
                                                              ]
                                                           }
                                                        ]
                                                     },
                                                     {
                                                        "type": "section",
                                                        "htmlClass": "row",
                                                        "items": [
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box.border-width",
                                                                    "condition": "model.style ['box'] ['border'] === true",
                                                                    "type": "number"
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box.border-style",
                                                                    "condition": "model.style ['box'] ['border'] === true",
                                                                    "type": "strapselect",
                                                                    "titleMap": [
                                                                       {
                                                                          "value": "dotted",
                                                                          "name": "Dotted"
                                                                       },
                                                                       {
                                                                          "value": "dashed",
                                                                          "name": "Dashed"
                                                                       },
                                                                       {
                                                                          "value": "solid",
                                                                          "name": "Solid"
                                                                       },
                                                                       {
                                                                          "value": "double",
                                                                          "name": "Double"
                                                                       },
                                                                       {
                                                                          "value": "inset",
                                                                          "name": "Inset"
                                                                       },
                                                                       {
                                                                          "value": "outset",
                                                                          "name": "Outset"
                                                                       }
                                                                    ]
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box.border-color",
                                                                    "condition": "model.style ['box'] ['border'] === true",
                                                                    "colorFormat": "hex3",
                                                                    "spectrumOptions": {
                                                                       "showInput": true,
                                                                       "showAlpha": true,
                                                                       "allowEmpty": true,
                                                                       "showPalette": true,
                                                                       "preferredFormat": "hex3",
                                                                       "palette": [
                                                                          [
                                                                             "#ff",
                                                                             "##f2f2f2",
                                                                             "#2c343a"
                                                                          ],
                                                                          [
                                                                             "#000"
                                                                          ]
                                                                       ]
                                                                    }
                                                                 }
                                                              ]
                                                           }
                                                        ]
                                                     }
                                                  ]
                                               },
                                               {
                                                  "title": "Chart Container",
                                                  "items": [
                                                     {
                                                        "type": "section",
                                                        "htmlClass": "row",
                                                        "items": [
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "",
                                                              "items": [
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box-content.background-type",
                                                                          "type": "strapselect",
                                                                          "titleMap": [
                                                                             {
                                                                                "value": "solid",
                                                                                "name": "Solid"
                                                                             },
                                                                             {
                                                                                "value": "gradient",
                                                                                "name": "Gradient"
                                                                             },
                                                                             {
                                                                                "value": "transparent",
                                                                                "name": "Transparent"
                                                                             }
                                                                          ]
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "condition": "model.style ['box-content'] ['background-type'] === 'solid'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box-content.background-color",
                                                                          "colorFormat": "hex3",
                                                                          "spectrumOptions": {
                                                                             "showInput": true,
                                                                             "showAlpha": true,
                                                                             "allowEmpty": true,
                                                                             "showPalette": true,
                                                                             "preferredFormat": "hex3",
                                                                             "palette": [
                                                                                [
                                                                                   "#ff",
                                                                                   "##f2f2f2",
                                                                                   "#2c343a"
                                                                                ],
                                                                                [
                                                                                   "#000"
                                                                                ]
                                                                             ]
                                                                          }
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "condition": "model.style ['box-content'] ['background-type'] === 'gradient'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box-content.background-gradient"
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
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-content.border-radius",
                                                                    "type": "number"
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
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12",
                                                              "items": [
                                                                 "style.box-content.border"
                                                              ]
                                                           }
                                                        ]
                                                     },
                                                     {
                                                        "type": "section",
                                                        "htmlClass": "row",
                                                        "items": [
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-content.border-width",
                                                                    "condition": "model.style['box-content'] ['border'] === true",
                                                                    "type": "number"
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": [
                                                                 "section",
                                                                 "strapselect"
                                                              ],
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "key": "style.box-content.border-style",
                                                              "condition": "model.style['box-content'] ['border'] === true",
                                                              "titleMap": [
                                                                 {
                                                                    "value": "dotted",
                                                                    "name": "Dotted"
                                                                 },
                                                                 {
                                                                    "value": "dashed",
                                                                    "name": "Dashed"
                                                                 },
                                                                 {
                                                                    "value": "solid",
                                                                    "name": "Solid"
                                                                 },
                                                                 {
                                                                    "value": "double",
                                                                    "name": "Double"
                                                                 },
                                                                 {
                                                                    "value": "inset",
                                                                    "name": "Inset"
                                                                 },
                                                                 {
                                                                    "value": "outset",
                                                                    "name": "Outset"
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-content.border-color",
                                                                    "condition": "model.style ['box-content'] ['border'] === true",
                                                                    "colorFormat": "hex3",
                                                                    "spectrumOptions": {
                                                                       "showInput": true,
                                                                       "showAlpha": true,
                                                                       "allowEmpty": true,
                                                                       "showPalette": true,
                                                                       "preferredFormat": "hex3",
                                                                       "palette": [
                                                                          [
                                                                             "#ff",
                                                                             "##f2f2f2",
                                                                             "#2c343a"
                                                                          ],
                                                                          [
                                                                             "#000"
                                                                          ]
                                                                       ]
                                                                    }
                                                                 }
                                                              ]
                                                           }
                                                        ]
                                                     }
                                                  ]
                                               },
                                               {
                                                  "title": "Header container",
                                                  "items": [
                                                     {
                                                        "type": "section",
                                                        "htmlClass": "row",
                                                        "items": [
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-3",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-label.text-align",
                                                                    "type": "strapselect",
                                                                    "titleMap": [
                                                                       {
                                                                          "value": "left",
                                                                          "name": "Left"
                                                                       },
                                                                       {
                                                                          "value": "center",
                                                                          "name": "Center"
                                                                       },
                                                                       {
                                                                          "value": "right",
                                                                          "name": "Right"
                                                                       }
                                                                    ]
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-3",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-label.font-weight",
                                                                    "type": "strapselect",
                                                                    "titleMap": [
                                                                       {
                                                                          "value": "normal",
                                                                          "name": "Normal"
                                                                       },
                                                                       {
                                                                          "value": "bold",
                                                                          "name": "Bold"
                                                                       }
                                                                    ]
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-3",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-label.font-size",
                                                                    "type": "number"
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-3",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-label.color",
                                                                    "colorFormat": "hex3",
                                                                    "showInput": true,
                                                                    "showAlpha": true,
                                                                    "allowEmpty": true,
                                                                    "showPalette": true,
                                                                    "preferredFormat": "hex3",
                                                                    "palette": [
                                                                       [
                                                                          "#ff",
                                                                          "##f2f2f2",
                                                                          "#2c343a"
                                                                       ],
                                                                       [
                                                                          "#000"
                                                                       ]
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
                                                              "type": "section",
                                                              "htmlClass": "",
                                                              "items": [
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box-header.background-type",
                                                                          "type": "strapselect",
                                                                          "titleMap": [
                                                                             {
                                                                                "value": "solid",
                                                                                "name": "Solid"
                                                                             },
                                                                             {
                                                                                "value": "gradient",
                                                                                "name": "Gradient"
                                                                             },
                                                                             {
                                                                                "value": "transparent",
                                                                                "name": "Transparent"
                                                                             }
                                                                          ]
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "condition": "model.style ['box-header'] ['background-type'] === 'solid'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box-header.background-color",
                                                                          "colorFormat": "hex3",
                                                                          "spectrumOptions": {
                                                                             "showInput": true,
                                                                             "showAlpha": true,
                                                                             "allowEmpty": true,
                                                                             "showPalette": true,
                                                                             "preferredFormat": "hex3",
                                                                             "palette": [
                                                                                [
                                                                                   "#ff",
                                                                                   "##f2f2f2",
                                                                                   "#2c343a"
                                                                                ],
                                                                                [
                                                                                   "#000"
                                                                                ]
                                                                             ]
                                                                          }
                                                                       }
                                                                    ]
                                                                 },
                                                                 {
                                                                    "type": "section",
                                                                    "htmlClass": "col-xs-12 col-sm-6",
                                                                    "condition": "model.style ['box-header'] ['background-type'] === 'gradient'",
                                                                    "items": [
                                                                       {
                                                                          "key": "style.box-header.background-gradient"
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
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-header.border-radius",
                                                                    "type": "number"
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
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-header.border"
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
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-header.border-style",
                                                                    "condition": "model.style ['box-header'] ['border'] === true",
                                                                    "type": "strapselect",
                                                                    "titleMap": [
                                                                       {
                                                                          "value": "dotted",
                                                                          "name": "Dotted"
                                                                       },
                                                                       {
                                                                          "value": "dashed",
                                                                          "name": "Dashed"
                                                                       },
                                                                       {
                                                                          "value": "solid",
                                                                          "name": "Solid"
                                                                       },
                                                                       {
                                                                          "value": "double",
                                                                          "name": "Double"
                                                                       },
                                                                       {
                                                                          "value": "inset",
                                                                          "name": "Inset"
                                                                       },
                                                                       {
                                                                          "value": "outset",
                                                                          "name": "Outset"
                                                                       }
                                                                    ]
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "key": "style.box-header.border-color",
                                                                    "condition": "model.style ['box-header'] ['border'] === true",
                                                                    "colorFormat": "hex3",
                                                                    "spectrumOptions": {
                                                                       "showInput": true,
                                                                       "showAlpha": true,
                                                                       "allowEmpty": true,
                                                                       "showPalette": true,
                                                                       "preferredFormat": "hex3",
                                                                       "palette": [
                                                                          [
                                                                             "#ff",
                                                                             "##f2f2f2",
                                                                             "#2c343a"
                                                                          ],
                                                                          [
                                                                             "#000"
                                                                          ]
                                                                       ]
                                                                    }
                                                                 }
                                                              ]
                                                           },
                                                           {
                                                              "type": "section",
                                                              "htmlClass": "col-xs-12 col-sm-4",
                                                              "items": [
                                                                 {
                                                                    "condition": "model.style ['box-header'] ['border'] === true",
                                                                    "key": "style.box-header.border-width",
                                                                    "type": "number"
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
                             }
                          ]
                       },
                       {
                          "title": "Style",
                          "items": [
                             {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                   {
                                      "type": "section",
                                      "htmlClass": "col-xs-12",
                                      "items": [
                                         {
                                            "key": "inline-style",
                                            "type": "codemirror",
                                            "codemirrorOptions": {
                                               "styleActiveLine": true,
                                               "lineNumbers": true,
                                               "lineWrapping": true,
                                               "autoCloseBrackets": true,
                                               "matchBrackets": true,
                                               "theme": "neo",
                                               "readOnly": false,
                                               "autoRefresh": true,
                                               "mode": "css"
                                            }
                                         }
                                      ]
                                   }
                                ]
                             }
                          ]
                       }
                    ]
                 }
              ],
              "schema": {
                 "type": "object",
                 "title": "Schema",
                 "properties": {
                    "publishChannel": {
                       "title": "Publish channel",
                       "type": "string",
                       "description": "Widgets use the publish channel to publish messages that will be distributed to its subscribers."
                    },
                    "subscribeChannel": {
                       "title": "Subscribe channel",
                       "type": "string",
                       "description": "Widgets use the subscribe channel to consume the messages published over that channel as a data source."
                    }
                    "theme": {
                       "title": "Theme",
                       "type": "string",
                       "description": "Select a dashboard theme. By default, light theme is applied.",
                       "default": "light"
                    },
                    "reset": {
                       "title": "Reset",
                       "type": "string",
                       "description": "",
                       "default": ""
                    },
                    "style": {
                       "title": "Style",
                       "type": "object",
                       "properties": {
                          "dashboard": {
                             "title": "Dashboard",
                             "type": "object",
                             "properties": {
                                "background-type": {
                                   "title": "Background Type",
                                   "type": "string",
                                   "default": "solid"
                                },
                                "background-image": {
                                   "title": "Background Image URL",
                                   "type": "string",
                                   "default": ""
                                },
                                "background-position-x": {
                                   "title": "Position X",
                                   "type": "string",
                                   "default": "center"
                                },
                                "background-position-y": {
                                   "title": "Position Y",
                                   "type": "string",
                                   "default": "center"
                                },
                                "background-size": {
                                   "title": "Background size",
                                   "type": "string",
                                   "default": "cover"
                                },
                                "background-repeat": {
                                   "title": "Repeat",
                                   "type": "string",
                                   "default": "no-repeat"
                                },
                                "background-color": {
                                   "title": "Background Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#FFF",
                                   "validationMessage": "Invalid Color"
                                },
                                "background-gradient": {
                                   "title": "Background Gradient",
                                   "type": "string",
                                   "default": "linear-gradient(45deg, rgba(255,255,255,1) 49%, rgba(192,192,192,1) 100%, rgba(128,128,128,1) 100%);"
                                },
                                "border": {
                                   "title": "Show Border",
                                   "type": "boolean",
                                   "default": false
                                },
                                "border-color": {
                                   "title": "Border Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#DDD"
                                },
                                "border-style": {
                                   "title": "Border Style",
                                   "type": "string",
                                   "default": "solid"
                                },
                                "border-width": {
                                   "title": "Border width",
                                   "type": "number",
                                   "default": 1
                                },
                                "border-radius": {
                                   "title": "Border Radius",
                                   "type": "number",
                                   "default": 0
                                },
                                "box-shadow": {
                                   "title": "Show Box Shadow",
                                   "type": "string",
                                   "default": "true"
                                },
                                "box-shadow-color": {
                                   "title": "Box shadow color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "rgba(51, 51, 51, 0.3)"
                                }
                             }
                          },
                          "box": {
                             "title": "Box",
                             "type": "object",
                             "properties": {
                                "background-type": {
                                   "title": "Background Type",
                                   "type": "string",
                                   "default": "solid"
                                },
                                "background-color": {
                                   "title": "Background Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#FFF",
                                   "validationMessage": "Invalid Color"
                                },
                                "background-gradient": {
                                   "title": "Background Gradient",
                                   "type": "string",
                                   "default": "linear-gradient(45deg, rgba(255,255,255,1) 49%, rgba(192,192,192,1) 100%, rgba(128,128,128,1) 100%);"
                                },
                                "border": {
                                   "title": "Show Border",
                                   "type": "boolean",
                                   "default": false
                                },
                                "border-color": {
                                   "title": "Border Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#DDD"
                                },
                                "border-style": {
                                   "title": "Border Style",
                                   "type": "string",
                                   "default": "solid"
                                },
                                "border-width": {
                                   "title": "Border width",
                                   "type": "number",
                                   "default": 1
                                },
                                "border-radius": {
                                   "title": "Border Radius",
                                   "type": "number",
                                   "default": 0
                                },
                                "box-shadow": {
                                   "title": "Show Box Shadow",
                                   "type": "string",
                                   "default": "true"
                                },
                                "box-shadow-color": {
                                   "title": "Box shadow color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "rgba(51, 51, 51, 0.3)"
                                }
                             }
                          },
                          "box-header": {
                             "title": "Box",
                             "type": "object",
                             "properties": {
                                "background-type": {
                                   "title": "Background Type",
                                   "type": "string",
                                   "default": "solid"
                                },
                                "background-color": {
                                   "title": "Background Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#FFF",
                                   "validationMessage": "Invalid Color"
                                },
                                "background-gradient": {
                                   "title": "Background Gradient",
                                   "type": "string",
                                   "default": "linear-gradient(45deg, rgba(255,255,255,1) 49%, rgba(192,192,192,1) 100%, rgba(128,128,128,1) 100%);"
                                },
                                "border": {
                                   "title": "Show Border",
                                   "type": "boolean",
                                   "default": false
                                },
                                "border-color": {
                                   "title": "Border Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#DDD"
                                },
                                "border-style": {
                                   "title": "Border Style",
                                   "type": "string",
                                   "default": "solid"
                                },
                                "border-width": {
                                   "title": "Border width",
                                   "type": "number",
                                   "default": 1
                                },
                                "border-radius": {
                                   "title": "Border Radius",
                                   "type": "number",
                                   "default": 0
                                }
                             }
                          },
                          "box-content": {
                             "title": "Box",
                             "type": "object",
                             "properties": {
                                "background-type": {
                                   "title": "Background Type",
                                   "type": "string",
                                   "default": "solid"
                                },
                                "background-color": {
                                   "title": "Background Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#FFF",
                                   "validationMessage": "Invalid Color"
                                },
                                "background-gradient": {
                                   "title": "Background Gradient",
                                   "type": "string",
                                   "default": "linear-gradient(45deg, rgba(255,255,255,1) 49%, rgba(192,192,192,1) 100%, rgba(128,128,128,1) 100%);"
                                },
                                "border": {
                                   "title": "Show Border",
                                   "type": "boolean",
                                   "default": false
                                },
                                "border-color": {
                                   "title": "Border Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#DDD"
                                },
                                "border-style": {
                                   "title": "Border Style",
                                   "type": "string",
                                   "default": "solid"
                                },
                                "border-width": {
                                   "title": "Border width (px)",
                                   "type": "number",
                                   "default": 1
                                },
                                "border-radius": {
                                   "title": "Border Radius (px)",
                                   "type": "number",
                                   "default": 0
                                }
                             }
                          },
                          "box-label": {
                             "title": "Box",
                             "type": "object",
                             "properties": {
                                "font-weight": {
                                   "title": "Font weight",
                                   "type": "string",
                                   "default": "normal"
                                },
                                "font-size": {
                                   "title": "Font size",
                                   "type": "number",
                                   "default": 19
                                },
                                "text-align": {
                                   "title": "Text Align",
                                   "type": "string",
                                   "default": "center"
                                },
                                "display": {
                                   "title": "Display",
                                   "type": "string",
                                   "default": "block"
                                },
                                "color": {
                                   "title": "Color",
                                   "type": "string",
                                   "format": "color",
                                   "default": "#000",
                                   "validationMessage": "Invalid Color"
                                }
                             }
                          }
                       }
                    },
                    "inline-style": {
                       "title": "Define your own style",
                       "type": "string",
                       "description": "ex: .dashboardTheme .dashboardContainer {background-color: red;}"
                    }
                 },
                 "required": [
                    "publishChannel",
                    "subscribeChannel"
                 ]
              }
           }
        }
    })());
