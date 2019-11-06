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
    );