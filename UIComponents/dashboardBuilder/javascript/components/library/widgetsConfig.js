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
                    __GAUGE__,
                    __SPEEDOMETER__,
                    __THERMOMETER__,
                    __ODOMETER__,
                    __PROGRESSBAR__,
                    __MAP__,
                    __ACCELEROMETER__,
                    __GRID__,
                    __TOGGLE_SWITCH__,
                    __SLIDER__,
                    __BUTTON__,
                    __IFRAME__,
                    __DISPLAY_BOX__,
                    __DISPLAY_DATA__,
                    __METRIC_BOX__,
                    __PLOTLY__

                ]
            }
        }
        )()
    );