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
                "alert":"/UIComponents/dashboard/frontend/components/alert/properties.md",
            	"linedygraph":"/UIComponents/dashboard/frontend/components/dygraphs/properties.md",
                "d3surface":"/UIComponents/dashboard/frontend/components/plotly/3dsurface_properties.md",
                "accelerometer":"/UIComponents/dashboard/frontend/components/accelerometer/properties.md",
                "area":"/UIComponents/dashboard/frontend/components/chart/properties.md",
                "bar":"/UIComponents/dashboard/frontend/components/chart/properties.md",
                "button":"/UIComponents/dashboard/frontend/components/button/properties.md",
                "displayData":"/UIComponents/dashboard/frontend/components/displayCount/properties.md",
                "donut":"/UIComponents/dashboard/frontend/components/chart/properties.md",
                "gauge":"/UIComponents/dashboard/frontend/components/gauge/properties.md",
                "grid":"/UIComponents/dashboard/frontend/components/grid/properties.md",
                "iframe":"/UIComponents/dashboard/frontend/components/IFrame/properties.md",
                "line":"/UIComponents/dashboard/frontend/components/chart/properties.md",
                "map":"/UIComponents/dashboard/frontend/components/map/properties.md",
                "odometer":"/UIComponents/dashboard/frontend/components/odometer/properties.md",
                "slider":"/UIComponents/dashboard/frontend/components/slider/properties.md",
                "progressbar":"/UIComponents/dashboard/frontend/components/progressbar/properties.md",
                "speedometer":"/UIComponents/dashboard/frontend/components/speedometer/properties.md",
                "thermometer":"/UIComponents/dashboard/frontend/components/thermometer/properties.md",
                "toggleSwitch":"/UIComponents/dashboard/frontend/components/toggleSwitch/properties.md",
                "windrose":"/UIComponents/dashboard/frontend/components/plotly/windrose_properties.md",
            }
            
            
        })
;