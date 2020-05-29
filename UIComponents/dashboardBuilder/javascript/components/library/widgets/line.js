const __LINE__ = {
    "name": "line",
    "label": "Line Chart",
    "class": "scriptr-chart",
    "commonData": true,
    "show": true,
    "defaults": {
        "data-format": "line",
        "multiple-data-points": "true",
        "type": "line",
        "on-format-data": "return data;",
        "boxLabel": "Line Chart",
        "xkey": "y",
        "yconfig": [{"key": "a", "label": "Series A", "color": "#FCC717"},{"key": "b", "label": "Series B", "color": "#38B9D6"}],
        "data": '[{"y": "2006", "a": 2, "b": 3 }, { "y": "2007", "a": 82, "b": 68 }, { "y": "2009", "a": 70, "b": 99 }, { "y":"2010", "a": 30, "b": 64 }, { "y": "2011", "a": 72, "b":100 }, { "y": "2012", "a": 81, "b": 81 }, { "y": "2013","a": 52, "b": 39 } ]',
        "grid-text-family": "Source Sans Pro"
    },
    "box": {
        sizeX: 4,
        sizeY: 5,
        minSizeX: 2,
        minSizeY: 3
    },
    "imgSrc": "//scriptr-cdn.s3.amazonaws.com/uicomponents/dashboard-builder/images/line-chart.png",
    "form": [{
        type: "tabs",
        tabs: [
            {
                title: "X",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-12",
                        "items": [
                            "xkey",
                            "xlabel-angle",
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6",
                                        "items": [{
                                            key: "parse-time",
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6",
                                        "items": [{
                                            key: "xlabels",
                                            "type": "strapselect",
                                            "titleMap" : [{
                                                "value": "auto",
                                                "name": "auto"
                                            }, {
                                                "value": "decade",
                                                "name": "decade"
                                            }, {
                                                "value": "year",
                                                "name": "year"
                                            }, {
                                                "value": "month",
                                                "name": "month"
                                            }, {
                                                "value": "week",
                                                "name": "week"
                                            }, {
                                                "value": "day",
                                                "name": "day"
                                            }, {
                                                "value": "hour",
                                                "name": "hour"
                                            }, {
                                                "value": "30min",
                                                "name": "30min"
                                            }, {
                                                "value": "15min",
                                                "name": "15min"
                                            }, {
                                                "value": "10min",
                                                "name": "10min"
                                            }, {
                                                "value": "5min",
                                                "name": "5min"
                                            }, {
                                                "value": "minute",
                                                "name": "minute"
                                            }, {
                                                "value": "30sec",
                                                "name": "30sec"
                                            }, {
                                                "value": "15sec",
                                                "name": "15sec"
                                            }, {
                                                "value": "10sec",
                                                "name": "10sec"
                                            }, {
                                                "value": "5sec",
                                                "name": "5sec"
                                            }, {
                                                "value": "second",
                                                "name": "second"
                                            }]
                                        }]
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6",
                                        "items": [{
                                            key :"xdate-moment-format",
                                            condition: "model['parse-time'] == true"
                                        }]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6",
                                        "items": [{
                                            "key": "time-zone",
                                            "placeholder" : "Time Zone",
                                            "type": "strapselect",
                                            "titleMap" : [ 
                                                {
                                                    "value":"UTC",
                                                    "name": "UTC"
                                                },
                                                {
                                                    "value":"America/New_York",
                                                    "name": "USA & Canada, Eastern Time"
                                                },
                                                {
                                                    "value":"America/Indiana/Indianapolis",
                                                    "name": "USA, Indiana (East)"
                                                },
                                                {
                                                    "value":"America/Chicago",
                                                    "name": "USA & Canada, Central Time"
                                                },
                                                {
                                                    "value":"America/Denver",
                                                    "name": "USA & Canada, Mountain Time"
                                                },
                                                {
                                                    "value":"America/Phoenix",
                                                    "name": "USA, Arizona"
                                                },
                                                {
                                                    "value":"America/Los_Angeles",
                                                    "name": "USA & Canada, Pacific Time"
                                                },
                                                {
                                                    "value":"America/Juneau",
                                                    "name": "USA, Alaska"
                                                },
                                                {
                                                    "value":"Pacific/Honolulu",
                                                    "name": "USA, Hawaii"
                                                },
                                                {
                                                    "value":"America/Argentina/Buenos_Aires",
                                                    "name": "Argentina, Buenos Aires"
                                                },
                                                {
                                                    "value":"Asia/Yerevan",
                                                    "name": "Armenia, Yerevan"
                                                },
                                                {
                                                    "value":"Australia/Brisbane",
                                                    "name": "Australia, Brisbane"
                                                },
                                                {
                                                    "value":"Australia/Hobart",
                                                    "name": "Australia, Hobart"
                                                },
                                                {
                                                    "value":"Australia/Melbourne",
                                                    "name": "Australia, Melbourne"
                                                },
                                                {
                                                    "value":"Australia/Perth",
                                                    "name": "Australia, Perth"
                                                },
                                                {
                                                    "value":"Australia/Sydney",
                                                    "name": "Australia, Sydney"
                                                },
                                                {
                                                    "value":"Europe/Vienna",
                                                    "name": "Austria, Vienna"
                                                },
                                                {
                                                    "value":"Asia/Baku",
                                                    "name": "Azerbaijan, Baku"
                                                },
                                                {
                                                    "value":"Atlantic/Azores",
                                                    "name": "Azores"
                                                },
                                                {
                                                    "value":"Asia/Dhaka",
                                                    "name": "Bangladesh, Dhaka"
                                                },
                                                {
                                                    "value":"Europe/Minsk",
                                                    "name": "Belarus, Minsk"
                                                },
                                                {
                                                    "value":"Europe/Brussels",
                                                    "name": "Belgium, Brussels"
                                                },
                                                {
                                                    "value":"America/La_Paz",
                                                    "name": "Bolivia, La Paz"
                                                },
                                                {
                                                    "value":"Europe/Sarajevo",
                                                    "name": "Bosnia & Herzegovina, Sarajevo"
                                                },
                                                {
                                                    "value":"Europe/Sofia",
                                                    "name": "Bulgaria, Sofia"
                                                },
                                                {
                                                    "value":"America/Halifax",
                                                    "name": "Canada, Atlantic Time"
                                                },
                                                {
                                                    "value":"America/Regina",
                                                    "name": "Canada, Saskatchewan"
                                                },
                                                {
                                                    "value":"Atlantic/Cape_Verde",
                                                    "name": "Cape Verde Islands"
                                                },
                                                {
                                                    "value":"America/Guatemala",
                                                    "name": "Central America"
                                                },
                                                {
                                                    "value":"America/Santiago",
                                                    "name": "Chile, Santiago"
                                                },
                                                {
                                                    "value":"Asia/Shanghai",
                                                    "name": "China, Beijing"
                                                },
                                                {
                                                    "value":"Asia/Chongqing",
                                                    "name": "China, Chongqing"
                                                },
                                                {
                                                    "value":"Asia/Hong_Kong",
                                                    "name": "China, Hong Kong"
                                                },
                                                {
                                                    "value":"Asia/Taipei",
                                                    "name": "China, Taipei"
                                                },
                                                {
                                                    "value":"Asia/Urumqi",
                                                    "name": "China, Urumqi"
                                                },
                                                {
                                                    "value":"America/Bogota",
                                                    "name": "Colombia, Bogota"
                                                },
                                                {
                                                    "value":"Europe/Zagreb",
                                                    "name": "Croatia, Zagreb"
                                                },
                                                {
                                                    "value":"Europe/Prague",
                                                    "name": "Czech Republic, Prague"
                                                },
                                                {
                                                    "value":"Europe/Copenhagen",
                                                    "name": "Denmark, Copenhagen"
                                                },
                                                {
                                                    "value":"Africa/Cairo",
                                                    "name": "Egypt, Cairo"
                                                },
                                                {
                                                    "value":"Europe/Tallinn",
                                                    "name": "Estonia, Tallinn"
                                                },
                                                {
                                                    "value":"Pacific/Fiji",
                                                    "name": "Fiji"
                                                },
                                                {
                                                    "value":"Europe/Helsinki",
                                                    "name": "Finland, Helsinki"
                                                },
                                                {
                                                    "value":"Europe/Paris",
                                                    "name": "France, Paris"
                                                },
                                                {
                                                    "value":"Asia/Tbilisi",
                                                    "name": "Georgia, Tbilisi"
                                                },
                                                {
                                                    "value":"Europe/Berlin",
                                                    "name": "Germany, Berlin"
                                                },
                                                {
                                                    "value":"Europe/Athens",
                                                    "name": "Greece, Athens"
                                                },
                                                {
                                                    "value":"America/Godthab",
                                                    "name": "Greenland"
                                                },
                                                {
                                                    "value":"Pacific/Guam",
                                                    "name": "Guam"
                                                },
                                                {
                                                    "value":"America/Guyana",
                                                    "name": "Guyana, Georgetown"
                                                },
                                                {
                                                    "value":"Europe/Budapest",
                                                    "name": "Hungary, Budapest"
                                                },
                                                {
                                                    "value":"Asia/Jakarta",
                                                    "name": "Indonesia, Jakarta"
                                                },
                                                {
                                                    "value":"Asia/Baghdad",
                                                    "name": "Iraq, Baghdad"
                                                },
                                                {
                                                    "value":"Europe/Dublin",
                                                    "name": "Ireland, Dublin"
                                                },
                                                {
                                                    "value":"Asia/Jerusalem",
                                                    "name": "Israel, Jerusalem"
                                                },
                                                {
                                                    "value":"Europe/Rome",
                                                    "name": "Italy, Rome"
                                                },
                                                {
                                                    "value":"Asia/Tokyo",
                                                    "name": "Japan, Tokyo"
                                                },
                                                {
                                                    "value":"Asia/Almaty",
                                                    "name": "Kazakhstan, Almaty"
                                                },
                                                {
                                                    "value":"Africa/Nairobi",
                                                    "name": "Kenya, Nairobi"
                                                },
                                                {
                                                    "value":"Asia/Seoul",
                                                    "name": "Korea, Seoul"
                                                },
                                                {
                                                    "value":"Asia/Kuwait",
                                                    "name": "Kuwait"
                                                },
                                                {
                                                    "value":"Europe/Riga",
                                                    "name": "Latvia, Riga"
                                                },
                                                {
                                                    "value":"Africa/Monrovia",
                                                    "name": "Liberia, Monrovia"
                                                },
                                                {
                                                    "value":"Europe/Vilnius",
                                                    "name": "Lithuania, Vilnius"
                                                },
                                                {
                                                    "value":"Europe/Skopje",
                                                    "name": "Macedonia, Skopje"
                                                },
                                                {
                                                    "value":"Asia/Kuala_Lumpur",
                                                    "name": "Malaysia, Kuala Lumpur"
                                                },
                                                {
                                                    "value":"Pacific/Majuro",
                                                    "name": "Marshall Islands"
                                                },
                                                {
                                                    "value":"America/Chihuahua",
                                                    "name": "Mexico, Chihuahua"
                                                },
                                                {
                                                    "value":"America/Mazatlan",
                                                    "name": "Mexico, Mazatlan"
                                                },
                                                {
                                                    "value":"America/Mexico_City",
                                                    "name": "Mexico, Mexico City"
                                                },
                                                {
                                                    "value":"America/Monterrey",
                                                    "name": "Mexico, Monterrey"
                                                },
                                                {
                                                    "value":"America/Tijuana",
                                                    "name": "Mexico, Tijuana"
                                                },
                                                {
                                                    "value":"Atlantic/South_Georgia",
                                                    "name": "Mid-Atlantic"
                                                },
                                                {
                                                    "value":"Pacific/Midway",
                                                    "name": "Midway Island"
                                                },
                                                {
                                                    "value":"Asia/Ulaanbaatar",
                                                    "name": "Mongolia, Ulaan Bataar"
                                                },
                                                {
                                                    "value":"Africa/Casablanca",
                                                    "name": "Morocco, Casablanca"
                                                },
                                                {
                                                    "value":"Europe/Amsterdam",
                                                    "name": "The Netherlands, Amsterdam"
                                                },
                                                {
                                                    "value":"Pacific/Noumea",
                                                    "name": "New Caledonia"
                                                },
                                                {
                                                    "value":"Pacific/Auckland",
                                                    "name": "New Zealand, Auckland"
                                                },
                                                {
                                                    "value":"Asia/Muscat",
                                                    "name": "Oman, Muscat"
                                                },
                                                {
                                                    "value":"Pacific/Port_Moresby",
                                                    "name": "Papua New Guinea, Port Moresby"
                                                },
                                                {
                                                    "value":"Asia/Karachi",
                                                    "name": "Pakistan, Karachi"
                                                },
                                                {
                                                    "value":"America/Lima",
                                                    "name": "Peru, Lima"
                                                },
                                                {
                                                    "value":"Europe/Warsaw",
                                                    "name": "Poland, Warsaw"
                                                },
                                                {
                                                    "value":"Europe/Lisbon",
                                                    "name": "Portugal, Lisbon"
                                                },
                                                {
                                                    "value":"Europe/Bucharest",
                                                    "name": "Romania, Bucharest"
                                                },
                                                {
                                                    "value":"Asia/Yekaterinburg",
                                                    "name": "Russia, Ekaterinburg"
                                                },
                                                {
                                                    "value":"Asia/Kamchatka",
                                                    "name": "Russia, Kamchatka"
                                                },
                                                {
                                                    "value":"Asia/Magadan",
                                                    "name": "Russia, Magadan"
                                                },
                                                {
                                                    "value":"Europe/Moscow",
                                                    "name": "Russia, Moscow"
                                                },
                                                {
                                                    "value":"Asia/Novosibirsk",
                                                    "name": "Russia, Novosibirsk"
                                                },
                                                {
                                                    "value":"Asia/Vladivostok",
                                                    "name": "Russia, Vladivostok"
                                                },
                                                {
                                                    "value":"Asia/Yakutsk",
                                                    "name": "Russia, Yakutsk"
                                                },
                                                {
                                                    "value":"Pacific/Pago_Pago",
                                                    "name": "Samoa"
                                                },
                                                {
                                                    "value":"Asia/Riyadh",
                                                    "name": "Saudi Arabia, Riyadh"
                                                },
                                                {
                                                    "value":"Europe/Belgrade",
                                                    "name": "Serbia, Belgrade"
                                                },
                                                {
                                                    "value":"Asia/Irkutsk",
                                                    "name": "Siberia, Irkutsk"
                                                },
                                                {
                                                    "value":"Asia/Krasnoyarsk",
                                                    "name": "Siberia, Krasnoyarsk"
                                                },
                                                {
                                                    "value":"Asia/Singapore",
                                                    "name": "Singapore"
                                                },
                                                {
                                                    "value":"Europe/Bratislava",
                                                    "name": "Slovakia, Bratislava"
                                                },
                                                {
                                                    "value":"Europe/Ljubljana",
                                                    "name": "Slovenia, Ljubljana"
                                                },
                                                {
                                                    "value":"Africa/Johannesburg",
                                                    "name": "South Africa, Pretoria"
                                                },
                                                {
                                                    "value":"Europe/Madrid",
                                                    "name": "Spain, Madrid"
                                                },
                                                {
                                                    "value":"Europe/Stockholm",
                                                    "name": "Sweden, Stockholm"
                                                },
                                                {
                                                    "value":"Asia/Bangkok",
                                                    "name": "Thailand, Bangkok"
                                                },
                                                {
                                                    "value":"Pacific/Tongatapu",
                                                    "name": "Tonga, Nuku\'alofa"
                                                },
                                                {
                                                    "value":"Europe/Istanbul",
                                                    "name": "Turkey, Istanbul"
                                                },
                                                {
                                                    "value":"Europe/Kiev",
                                                    "name": "Ukraine, Kyev"
                                                },
                                                {
                                                    "value":"Europe/London",
                                                    "name": "United Kingdom, London"
                                                },
                                                {
                                                    "value":"Asia/Tashkent",
                                                    "name": "Uzbekistan, Tashkent"
                                                },
                                                {
                                                    "value":"America/Caracas",
                                                    "name": "Venezuela, Caracas"
                                                },
                                                {
                                                    "value":"Africa/Algiers",
                                                    "name": "West Central Africa"
                                                },
                                                {
                                                    "value":"Africa/Harare",
                                                    "name": "Zimbabwe, Harare"
                                                },
                                                {
                                                    "value":"Etc/GMT+12",
                                                    "name": "GMT-12:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+11",
                                                    "name": "GMT-11:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+10",
                                                    "name": "GMT-10:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+9",
                                                    "name": "GMT-09:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+8",
                                                    "name": "GMT-08:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+7",
                                                    "name": "GMT-07:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+6",
                                                    "name": "GMT-06:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+5",
                                                    "name": "GMT-05:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+4",
                                                    "name": "GMT-04:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+3",
                                                    "name": "GMT-03:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+2",
                                                    "name": "GMT-02:00"
                                                },
                                                {
                                                    "value":"Etc/GMT+1",
                                                    "name": "GMT-01:00"
                                                },
                                                {
                                                    "value":"Etc/GMT",
                                                    "name": "GMT+00:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-1",
                                                    "name": "GMT+01:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-2",
                                                    "name": "GMT+02:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-3",
                                                    "name": "GMT+03:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-4",
                                                    "name": "GMT+04:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-5",
                                                    "name": "GMT+05:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-6",
                                                    "name": "GMT+06:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-7",
                                                    "name": "GMT+07:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-8",
                                                    "name": "GMT+08:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-9",
                                                    "name": "GMT+09:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-10",
                                                    "name": "GMT+10:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-11",
                                                    "name": "GMT+11:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-12",
                                                    "name": "GMT+12:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-13",
                                                    "name": "GMT+13:00"
                                                },
                                                {
                                                    "value":"Etc/GMT-14",
                                                    "name": "GMT+14:00"
                                                }]
                                        }]
                                    }
                                ]
                            },
                            {
                                key: "_dummy",
                                "htmlClass": "hidden",
                                onFieldLoad: function (modelValue, form, model) { //This is for backward compatibility
                                    //build yconfig
                                    if (!model.yconfig || !model.yconfig.length) {
                                        var ykeys = JSON.parse(model.ykeys);
                                        var ylabels = JSON.parse(model.labels);
                                        var ycolors = model.colors;
                                        if(ykeys == null){
                                            ykeys=[];
                                        }
                                        var keysNum = ykeys.length;
                                        // clean the array
                                        model.yconfig = [];
                                        for (var i = 0; i < keysNum; i++) {
                                            var e = {
                                                key: ykeys[i],
                                                color: ycolors[i],
                                                label: ylabels[i],
                                            };
                                            model.yconfig.push(e);
                                        }
                                    } else {
                                        delete model.colors;
                                        delete model.labels;
                                        delete model.ykeys;
                                    }
                                    //build goals
                                    if (!model.goalsconfig || !model.goalsconfig.length) {
                                        if(model.goals && model.goals.length > 0){
                                            var goalsNum = model.goals.length;
                                            // clean the array
                                            for (var i = 0; i < goalsNum; i++) {
                                                if (model.goals[i]) {
                                                    var e = {
                                                        goal: model.goals[i],
                                                        lineColor: ((model['goal-line-colors'] && model['goal-line-colors'][i]) ? model['goal-line-colors'][i] : null),
                                                    };
                                                    model.goalsconfig.push(e);
                                                }
                                            }
                                        } 
                                    } else {
                                        delete model.goals;
                                        delete model['goal-line-colors'];
                                    }
                                    //build events
                                    if (!model.eventsconfig || !model.eventsconfig.length) {
                                        if(model.events && model.events.length > 0){
                                            var eventsNum = model.events.length;
                                            // clean the array
                                            for (var i = 0; i < eventsNum; i++) {
                                                if (model.events[i]) {
                                                    var e = {
                                                        event: model.events[i],
                                                        //storkeWidth: model['event-stroke-width'],
                                                        lineColor: ((model['event-line-colors'] && model['event-line-colors'][i]) ? model['event-line-colors'][i] : null),
                                                    };
                                                    model.eventsconfig.push(e);
                                                }
                                            }
                                        }
                                    } else {
                                        delete model.events;
                                        delete model['event-line-colors'];
                                    }
                                }
                            }
                        ]
                    }]
                }]
            },
            {
                title: "Y",
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
                                        key: "yconfig",
                                        title: "Y Configuration",
                                        startEmpty: true,
                                        items: [{
                                            "type": "section",
                                            "htmlClass": "row",
                                            "items": [
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-sm-4",
                                                    "items": [{
                                                        key: "yconfig[].key"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-sm-4",
                                                    "items": [{
                                                        key: "yconfig[].label"
                                                    }]
                                                },
                                                {
                                                    "type": "section",
                                                    "htmlClass": "col-sm-4",
                                                    "items": [{
                                                        key: "yconfig[].color",
                                                        "colorFormat": "hex"
                                                    }]
                                                }]
                                        }
                                               ],
                                    },
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    "pre-units",
                                    "ymin"
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-6",
                                "items": [
                                    "post-units", "ymax" // ,"ylabel-format"
                                ]
                            }]
                    }]
            },
            {
                title: "Legend",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [
                                {
                                    key: "show-legend"
                                },
                                {
                                    type: "radios-inline",
                                    key: "legend-type",
                                    condition: "model['show-legend'] == true",
                                    titleMap: [{
                                        value: "hover",
                                        name: "Hover"
                                    }, {
                                        value: "right",
                                        name: "Right"
                                    }]
                                },
                                {
                                    type: "radios-inline",
                                    key: "hide-hover",
                                    condition: "model['show-legend'] ==true && model['legend-type'] =='hover'",
                                    titleMap: [{
                                        value: "auto",
                                        name: "Auto"
                                    }, {
                                        value: "false",
                                        name: "Always"
                                    }]
                                },
                                /** {
                                    key :"legend-date-moment-format",
                                    condition: "model['show-legend'] == true && model['legend-type'] =='right' && model['parse-time'] == true"
                                }**/
                            ]
                        }
                    ]
                }]
            },
            {
                title: "Grid",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                key: "grid",
                            }, {
                                key: "axes",
                            }, {
                                "key": "grid-text-color",
                                "colorFormat": "hex3"
                            }]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [{
                                "key": "grid-text-family",
                                "type": 'strapselect',
                                "titleMap": [{
                                    "value": "Arial",
                                    "name": "Arial"
                                }, {
                                    "value": "Helvetica",
                                    "name": "Helvetica"
                                }, {
                                    "value": "Times New Roman",
                                    "name": "Times New Roman"
                                }, {
                                    "value": "Courier New",
                                    "name": "Courier New"
                                }, {
                                    "value": "Courier",
                                    "name": "Courier"
                                }, {
                                    "value": "Verdana",
                                    "name": "Verdana"
                                }, {
                                    "value": "Georgia",
                                    "name": "Georgia"
                                }, {
                                    "value": "Palatino",
                                    "name": "Palatino"
                                }, {
                                    "value": "Garamond",
                                    "name": "Garamond"
                                }, {
                                    "value": "Bookman",
                                    "name": "Bookman"
                                }, {
                                    "value": "Comic Sans MS",
                                    "name": "Comic Sans MS"
                                }, {
                                    "value": "Trebuchet MS",
                                    "name": "Trebuchet MS"
                                }, {
                                    "value": "Arial Black",
                                    "name": "Arial Black"
                                }, {
                                    "value": "Impact",
                                    "name": "Impact"
                                }, {
                                    "value": "Sans-Serif",
                                    "name": "Sans-Serif"
                                }, {
                                    "value": "Source Sans Pro",
                                    "name": "Source Sans Pro"
                                }]
                            }
                                      ,
                                      {
                                          "key": "grid-text-weight",
                                          "type": 'strapselect',
                                          "titleMap": [{
                                              "value": "normal",
                                              "name": "Normal"
                                          }, {
                                              "value": "bold",
                                              "name": "Bold"
                                          }]
                                      },
                                      "grid-text-size"]
                        }]
                }]
            },
            {
                title: "Lines & Points",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [{
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["line-width", {
                            key: "smooth",
                        }]
                    }, {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": ["point-size", {
                            "key": "point-fill-colors",
                            "items": [{
                                "key": "point-fill-colors[]",
                                "colorFormat": "hex3"
                            }]
                        }, "point-stroke-colors"]
                    }]
                }]
            },
            {
                title: "Goals",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [
                                "goal-stroke-width"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-9",
                            "items": [
                                {
                                    key: "goalsconfig",
                                    title: "Goals Configuration",
                                    startEmpty: true,
                                    items: [{
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-4",
                                                "items": [{
                                                    key: "goalsconfig[].goal"
                                                }]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-4",
                                                "items": [{
                                                    key: "goalsconfig[].lineColor",
                                                    "colorFormat": "hex"
                                                }]
                                            }]
                                    }
                                           ],
                                },
                            ]
                        },]
                }]
            },
            {
                title: "Events",
                items: [{
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [
                                "event-stroke-width"]
                        },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-9",
                            "items": [
                                {
                                    key: "eventsconfig",
                                    title: "Events Configuration",
                                    startEmpty: true,
                                    items: [{
                                        "type": "section",
                                        "htmlClass": "row",
                                        "items": [
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-4",
                                                "items": [{
                                                    key: "eventsconfig[].event"
                                                }]
                                            },
                                            {
                                                "type": "section",
                                                "htmlClass": "col-sm-4",
                                                "items": [{
                                                    key: "eventsconfig[].lineColor",
                                                    "colorFormat": "hex"
                                                }]
                                            }]
                                    }
                                           ],
                                },
                            ]
                        },]
                }]
            }]
    }],
    "schema": {
        "type": "object",
        "title": "Schema",
        "properties": {
            "data": {
                "title": "Data",
                "type": "string",
                "description": "Data series in case of static data.",
                "codemirrorOptions": {
                    "placeholder": "[{ y: '2006', a: 100, b: 90 },{ y: '2007', a: 75,  b: 65 }, { y: '2008', a: 50,  b: 40 }]"
                }
            },
            "xkey": {
                "title": "X key",
                "type": "string",
                "description": "A string containing the name of the attribute that contains date (X) values. Timestamps are accepted in the form of millisecond timestamps (as returned by Date.getTime() or as strings in the following formats: 2012, 2012 Q1, 2012 W1, 2012-02, 2012-02-24, 2012-02-24 15:00, 2012-02-24 15:00:00, 2012-02-24 15:00:00.000. date/time strings can optionally contain a T between the date and time parts, and/or a Z suffix, for compatibility with ISO-8601 dates."
            },
            "ykeys": {
                "title": "Y keys",
                "type": "string",
                "description": "A list of strings containing names of attributes that contain Y values (one for each series of data to be plotted)."
            },
            "labels": {
                "title": "Labels",
                "type": "string",
                "description": "A list of strings containing labels for the data series to be plotted (corresponding to the values in the ykeys option)."
            },
            "colors": {
                "title": "Colors",
                "type": "array",
                "description": "Array containing colors for the series lines/points.",
                "default": ["#CC5464", "#FCC717", "#38B9D6",
                            "#1DBC68", "#E90088"],
                "items": {
                    "format": "color",
                    "type": "string"
                }
            },
            "line-width": {
                "title": "Line width",
                "type": "number",
                "default": 3,
                "description": "Width of the series lines, in pixels."
            },
            "point-size": {
                "title": "Point size",
                "type": "number",
                "default": 4,
                "description": "Diameter of the series points, in pixels."
            },
            "point-fill-colors": {
                "title": "Point fill colors",
                "type": "array",
                "description": "Colors for the series points. By default uses the same values as lineColors.",
                "items": {
                    "format": "color",
                    "type": "string"
                }
            },
            "point-stroke-colors": {
                "title": "Point Stroke Colors",
                "type": "array",
                "default": ["#fff"],
                "description": "Colors for the outlines of the series points. (#ffffff by default).",
                "items": {
                    "format": "color",
                    "type": "string"
                }
            },
            "ymax": {
                "title": "Y maximum value",
                "type": "string",
                "default": 'auto',
                "description": "Max. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the max y-value is at least [num]."
            },
            "ymin": {
                "title": "Y minimum value",
                "type": "string",
                "default": "auto 0",
                "description": "Min. bound for Y-values. Alternatively, set this to 'auto' to compute automatically, or 'auto [num]' to automatically compute and ensure that the min y-value is at most [num]. You can use this to create graphs with false origins."
            },
            "smooth": {
                "title": "Smooth",
                "type": "boolean",
                "default": "true",
                "description": "Set to false to disable line smoothing."
            },
            "show-legend": {
                "title": "Show Legend",
                "type": "boolean",
                "default": "true",
            },
            "legend-type": {
                "title": "Legend type",
                "type": "string",
                "default": "hover",
            },
            "hide-hover": {
                "title": "Hover style",
                "default": "auto",
                "type": "string",
                "description": "Set to 'Always' to always show a hover legend. Set to 'Auto' to only show the hover legend when the mouse cursor is over the chart."
            },
            "hover-callback": {
                "title": "Hover callback",
                "type": "string",
                "description": "Provide a function on this option to generate custom hover legends. The function will be called with the index of the row under the hover legend, the options object passed to the constructor as arguments, a string containing the default generated hover legend content HTML, and an object containing the original data for the row as passed in the data option. hoverCallback: function (index, options, content, row) {return 'sin(' + row.x + ')='+ row.y}"
            },
            "parse-time": {
                "title": "Parse time",
                "type": "boolean",
                "default": false,
                "description": "Set to false to skip time/date parsing for X values, instead treating them as an equally-spaced series."
            },
            "post-units": {
                "title": "Post units",
                "type": "string",
                "description": "Set to a string value (eg: '%') to add a label suffix all y-labels."
            },
            "pre-units": {
                "title": "Pre units",
                "type": "string",
                "description": "Set to a string value (eg: '$') to add a label prefix all y-labels."
            },
            "xlabels": {
                "title": "X labels date interval",
                "type": "string",
                "default": "auto",
                "description": "Sets the x axis labelling interval. By default the interval will be automatically computed.",
            },
            "xlabel-angle": {
                "title": "X label angle",
                "type": "number",
                "default": 0,
                "description": "The angle in degrees from horizontal to draw x-axis labels."
            },
            "xlabel-format": {
                "title": "X label format",
                "type": "string",
                "description": "A function that accepts Date objects and formats them for display as x-axis labels. Overrides the default formatter chosen by the automatic labeller or the xLabels option. function (x) { return x.toString(); }"
            },
            "ylabel-format": {
                "title": "Y label format",
                "type": "string",
                "description": "A function that accepts y-values and formats them for display as y-axis labels. function (y) { return y.toString() + 'km'; }"
            },
            "goal-stroke-width": {
                "title": "Goal stroke width",
                "type": "number",
                "default": 1.0,
                "description": "Width, in pixels, of the goal lines."
            },
            "event-stroke-width": {
                "title": "Event stroke width",
                "type": "number",
                "default": 1.0,
                "description": "Width, in pixels, of the event lines."
            },
            "axes": {
                "title": "Axes",
                "type": "boolean",
                "description": "Set to false to disable drawing the x and y axes.",
                "default": "true"
            },
            "grid": {
                "title": "Grid",
                "type": "boolean",
                "description": "Set to false to disable drawing the horizontal grid lines.",
                "default": "true"
            },
            "grid-text-color": {
                "title": "Grid text color",
                "type": "string",
                "description": "Set the color of the axis labels (default: #888).",
                "format": "color",
                "default": "#888"
            },
            "grid-text-size": {
                "title": "Grid text size",
                "type": "number",
                "description": "Set the point size of the axis labels (default: 12).",
                "default": 12
            },
            "grid-text-family": {
                "title": "Grid text family",
                "type": "string",
                "description": "Set the font family of the axis labels (default: sans-serif).",
                "default": "Source Sans Pro",
            },
            "grid-text-weight": {
                "title": "Grid text weight",
                "type": "string",
                "description": "Set the font weight of the axis labels (default: normal).",
                "default": "normal",
            },
            "date-format": {
                "title": "Date format",
                "type": "string",
                "description": "A function that accepts millisecond timestamps and formats them for display as chart labels. default is function (x) { return new Date(x).toString() }."
            }, 
            /**  "legend-date-moment-format": {
                "title": "Legend Date Format",
                "type": "string",
                "description": "Set a valid MomentJs Date Format",
                 "default": "DD-MM-YYYY HH:mm:ss"
            },**/
            "time-zone": {
                "title" : "Time Zone",
                "type" : "string",
                "description" : "",
                "placeholder" : "Time Zone "
            },
            "xdate-moment-format": {
                "title": "X axis Date Format",
                "type": "string",
                "description": "Set a valid MomentJs Date Format",
                "default": "DD-MM-YYYY HH:mm:ss"
            },
            "yconfig": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "object",
                    "properties": {
                        "key": {
                            "title": "Key",
                            "type": "string"
                        },
                        "label": {
                            "title": "Label",
                            "type": "string"
                        },
                        "color": {
                            "title": "Color",
                            "type": "string",
                            "format": "color",
                        }
                    }
                }
            }, "goalsconfig": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "object",
                    "properties": {
                        "goal": {
                            "title": "goal",
                            "type": "string"
                        },
                        "lineColor": {
                            "title": "Line Color",
                            "type": "string",
                            "format": "color",
                        }
                    }
                }
            }, "eventsconfig": {
                "type": "array",
                "default": [],
                "items": {
                    "type": "object",
                    "properties": {
                        "event": {
                            "title": "event",
                            "type": "string"
                        },
                        "lineColor": {
                            "title": "Line Color",
                            "type": "string",
                            "format": "color",
                        }
                    }
                }
            },
            "_dummy": { //For backward compatibility after introducing the field groups for goals, events, etc..
                "title": "Dummy not used Value",
                "type": "string",
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
        "required": ["xkey", "ykeys"]
    }
};
