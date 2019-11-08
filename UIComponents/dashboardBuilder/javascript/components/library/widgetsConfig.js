angular
    .module('DashboardBuilder')
    .constant(
        "widgetsConfig",
        (function () {
            return {
                "defaultWidget": {
                    "name": "displaybox"
                },
                "widgets": [
					__LINE_DYGRAPH__,
                    __BAR__,
                    __AREA__,
                    __LINE__,
                    __DONUT__,
                    __WINDROSE__,
                    __3DSURFACE__,
                    __GAUGE__,
                    __SPEEDOMETER__,
                    __THERMOMETER__,
                    __ODOMETER__,
                    __PROGRESSBAR__,
                    __MAP__,
                    __ACCELEROMETER__,
                    __GRID__,
                    __ALERT__,
                    __DISPLAY_DATA__,
                    __IFRAME__,
                    __TOGGLE_SWITCH__,
                    __SLIDER__,
                    __BUTTON__
                    //,__METRIC_BOX__
                ]
            }
        }
        )()
    ).constant(
        "widgetsDocs",{
            default:"/README.md",
            widgets:{
                "alert":"/README.md",
            	"linedygraph":"/UIComponents/dashboard/frontend/components/dygraphs/README.md",
                "d3surface":"/UIComponents/dashboard/frontend/components/plotly/README.md",
                "accelerometer":"/README.md",
                "area":"/UIComponents/dashboard/frontend/components/chart/README.md",
                "bar":"/UIComponents/dashboard/frontend/components/chart/README.md",
                "button":"/README.md",
                "displayData":"/UIComponents/dashboard/frontend/components/displayCount/README.md",
                "donut":"/UIComponents/dashboard/frontend/components/chart/README.md",
                "gauge":"/UIComponents/dashboard/frontend/components/gauge/README.md",
                "grid":"/UIComponents/dashboard/frontend/components/grid/README.md",
                "iframe":"/README.md",
                "line":"/UIComponents/dashboard/frontend/components/chart/README.md",
                "map":"/UIComponents/dashboard/frontend/components/map/README.md",
                "metricbox":"/README.md",
                "odometer":"/UIComponents/dashboard/frontend/components/odometer/README.md",
                "slider":"/README.md",
                "progressbar":"/UIComponents/dashboard/frontend/components/progressbar/README.md",
                "speedometer":"/UIComponents/dashboard/frontend/components/speedometer/README.md",
                "thermometer":"/UIComponents/dashboard/frontend/components/thermometer/README.md",
                "toggleSwitch":"/README.md",
                "windrose":"/UIComponents/dashboard/frontend/components/plotly/README.md",
            }
            
            
        })
;