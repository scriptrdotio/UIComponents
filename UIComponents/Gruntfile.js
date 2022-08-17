
/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function(grunt) {
	
	var sass = require('node-sass');

	grunt
	      .initConfig({

	         // Basic settings and info about our plugins
	         pkg : grunt.file.readJSON('package.json'),

	         fetchFromCDN : {
	            options : {},
	            projJsFiles : {
	               dest : 'lib',

	               fetchUrls : [
	                     // CSS      
	                     'https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.5/angular-material.min.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-xeditable/0.7.0/css/xeditable.min.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-bootstrap-colorpicker/3.0.31/css/colorpicker.min.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angularjs-slider/6.2.2/rzslider.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.27.4/codemirror.min.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.27.4/theme/neo.min.css',
	                     'https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick-theme.css',
	                     
	                     'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.Default.css',
	                     // JS
	                     'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js',
	                     'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
	                     'https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.0/showdown.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.js',

	                     'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.27.4/codemirror.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.27.4/addon/display/placeholder.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.27.4/mode/javascript/javascript.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.21/moment-timezone-with-data.min.js',

	                     'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js',
	                     'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-route.js',
	                     'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-cookies.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-websocket/1.0.9/angular-websocket.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-slick-carousel/3.1.7/angular-slick.min.js',
	                     'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.js',
	                     'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js',
	                     'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js',
	                     'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.5/angular-material.min.js',
	                     'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-114/svg-assets-cache.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-utils/0.1.1/angular-ui-utils.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael-min.js',
	                     'https://d3js.org/d3.v4.min.js',
	                     //'https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/scripts/ng-map.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angularjs-slider/6.2.2/rzslider.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-xeditable/0.7.0/js/xeditable.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.6.4/themes/classic.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.6.4/themes/classic.date.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.6.4/themes/classic.time.css',
	                     'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.6.4/picker.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.6.4/legacy.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.6.4/picker.date.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.6.4/picker.time.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/leaflet.markercluster.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-translate/2.18.2/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/angular-translate-handler-log/2.18.2/angular-translate-handler-log.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.min.js',
	                     'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.min.css'
	               ]
	            }
	         },

	         fetch_ag_grid : {
		         all : {
		            src : [ 'https://cdnjs.cloudflare.com/ajax/libs/ag-grid/12.0.0/ag-grid.js?ignore=notused36' ],
		            dest : 'lib/ag_grid.js'
		         }

	         },

	         ngtemplates : {
		         app : {
		            src : [
		                  'dashboard/frontend/components/ACL/ACL.html',
		                  'dashboard/frontend/components/dygraphs/dygraphs.html',
		                  'dashboard/frontend/components/ACL/myModalContent.html',
		                  'dashboard/frontend/components/chart/chart.html',
		                  'dashboard/frontend/components/gauge/gauge.html',
		                  'dashboard/frontend/components/grid/grid.html',
		                  'dashboard/frontend/components/grid/popup.html',
		                  'dashboard/frontend/components/list/autocomplete.html',
		                  'dashboard/frontend/components/map/map.html',
		                  'dashboard/frontend/components/thermometer/thermometer.html',
		                  'dashboard/frontend/components/thermometer/tg_thermometer_vertical.html',
		                  'dashboard/frontend/components/odometer/odometer.html',
		                  'dashboard/frontend/components/searchBox/searchBox.html',
		                  'dashboard/frontend/components/speedometer/speedometer.html',
		                  'dashboard/frontend/components/message/message.html',
		                  'dashboard/frontend/components/accelerometer/accelerometer.html',
		                  'dashboard/frontend/components/button/button.html',
		                  'dashboard/frontend/components/slider/slider.html',
		                  'dashboard/frontend/components/IFrame/IFrame.html',
		                  'dashboard/frontend/components/toggleSwitch/toggle_switch.html',
		                  'dashboard/frontend/components/plotly/3dsurface.html',
		                  'dashboard/frontend/components/plotly/windrose.html',
		                  'dashboard/frontend/components/plotly/heatmap.html',
		                  'dashboard/frontend/components/plotly/bubbleChart.html',
		                  'dashboard/frontend/components/plotly/scatter.html',
		                  'dashboard/frontend/components/common/notifications.html',
		                  'dashboardBuilder/javascript/components/box.html',
		                  'dashboardBuilder/javascript/components/dashboard.html',
		                  'dashboardBuilder/javascript/components/dashboardsList.html',
		                  'dashboardBuilder/javascript/components/deletePopup.html',
		                  'dashboardBuilder/javascript/components/confirmation.html',
		                  'dashboardBuilder/javascript/components/myModalContent.html',
		                  'layout/frontend/components/header/header.html',
		                  'layout/frontend/components/menu/menu.html',
		                  'layout/frontend/components/collapsibleMenu/collapsibleMenu.html',
		                  'dashboardBuilder/view/dashboard.html',
		                  'dashboardBuilder/view/dashboardTemplate.min',
		                  'dashboardBuilder/ide/dashboardTemplate_ide.min',
		                  'dashboardBuilder/css/customStyleTemplate.css',
		                  'dashboardBuilder/view/dashboardsList.html',
		                  'dashboardBuilder/lib/schemaForm/nwp-file.html',
		                  //'dashboard/frontend/components/grideye/grideye.html',
		                  'dashboard/frontend/components/imagemap/imagemap.html',
		                  'dashboard/frontend/components/displayCount/displayCount.html',
		                  'dashboard/frontend/components/datetimepicker/datetimepicker_directive.html',
		                  'dashboard/frontend/components/combo/combo.html',
		                  'dashboard/frontend/components/combo/comboBox.html',
		                  'dashboard/frontend/components/combo/comboTitle.html',
		                  'dashboard/frontend/components/combo/popoverCombo.html',
		                  'dashboard/frontend/components/scrollableTabs/tabs.html',
		                  'dashboard/frontend/components/datetimerangepicker/datetimerangepicker.html'
		                  ],
		                
		            dest :'build/js/templates.js',
		            options : {
		               bootstrap : function(module, script) {
			               return 'var cachedTemplates = (["$templateCache", function($templateCache) {'
			                     + script + '}])';
		               },
		               htmlmin : {
		                  collapseBooleanAttributes : true,
		                  collapseWhitespace : true,
		                  removeAttributeQuotes : true,
		                  removeComments : true, // Only if you don't use comment directives!
		                  removeEmptyAttributes : true,
		                  removeRedundantAttributes : true,
		                  removeScriptTypeAttributes : true,
		                  removeStyleLinkTypeAttributes : true
		               },
		               url : function(url) {
			               return url.replace('dashboard/',
			                     '/UIComponents/dashboard/').replace(
			                     'dashboardBuilder/',
			                     '/UIComponents/dashboardBuilder/').replace(
			                     'layout/',
			                     '/UIComponents/layout/');
		               }
		            }
		         }
	         },

	         ngAnnotate : {
	            options : {
		            singleQuotes : true
	            },
	            app : {
		            files : {
		               'concat/min-safe/angular_dygraphs.js' : [ 'dashboard/frontend/components/dygraphs/angular-dygraphs.js' ],
		               'concat/min-safe/dygraphs.js' : [ 'dashboard/frontend/components/dygraphs/dygraphs.js' ],
		               'concat/min-safe/angular_plotly.js' : [ 'dashboard/frontend/components/plotly/angular-plotly.js' ],
		               'concat/min-safe/plotly.js' : [ 'dashboard/frontend/components/plotly/plotly.js' ],
		               'concat/min-safe/3dsurface.js' : [ 'dashboard/frontend/components/plotly/3dsurface.js' ],
		               'concat/min-safe/windrose.js' : [ 'dashboard/frontend/components/plotly/windrose.js' ],
		               'concat/min-safe/heatmap.js' : [ 'dashboard/frontend/components/plotly/heatmap.js' ],
		               'concat/min-safe/bubbleChart.js' : [ 'dashboard/frontend/components/plotly/bubbleChart.js' ],
		               'concat/min-safe/scatter.js' : [ 'dashboard/frontend/components/plotly/scatter.js' ],
		               'concat/min-safe/acl.js' : [ 'dashboard/frontend/components/ACL/ACL.js' ],
		               'concat/min-safe/abn_tree_directive.js' : [ 'dashboard/frontend/components/searchBox/abn_tree_directive.js' ],
		               'concat/min-safe/markerClusterer.js' : [ 'dashboard/frontend/components/map/markerClusterer.js' ],
		               'concat/min-safe/ng-map.js' : [ 'dashboard/frontend/components/map/ng-map.js' ],
		               'concat/min-safe/map.js' : [ 'dashboard/frontend/components/map/map.js' ],
		               'concat/min-safe/angucomplete.alt.js' : [ 'dashboard/frontend/components/list/angucomplete.alt.js' ],
		               'concat/min-safe/grid.js' : [ 'dashboard/frontend/components/grid/grid.js' ],
		               'concat/min-safe/autocomplete.js' : [ 'dashboard/frontend/components/list/autocomplete.js' ],
		               'concat/min-safe/odometer.js' : [ 'dashboard/frontend/components/odometer/odometer.js' ],
		               'concat/min-safe/speedometer.js' : [ 'dashboard/frontend/components/speedometer/speedometer.js' ],
		               'concat/min-safe/gauge.js' : [ 'dashboard/frontend/components/gauge/gauge.js' ],
		               'concat/min-safe/chart.js' : [ 'dashboard/frontend/components/chart/chart.js' ],
		               'concat/min-safe/searchBox.js' : [ 'dashboard/frontend/components/searchBox/searchBox.js' ],
		               'concat/min-safe/displayCount.js' : [ 'dashboard/frontend/components/displayCount/displayCount.js' ],
		               'concat/min-safe/httpProvider.js' : [ 'httpProvider.js' ],
		               'concat/min-safe/wsProvider.js' : [ 'wsProvider.js' ],
		               'concat/min-safe/dataService.js' : [ 'dataService.js' ],
		               'concat/min-safe/morris.js' : [ 'dashboard/frontend/components/chart/morris.js' ],
		               'concat/min-safe/angular.morris.js' : [ 'dashboard/frontend/components/chart/angular.morris.js' ],
		               'concat/min-safe/templates.js' : [ 'build/js/templates.js' ],
		               'concat/min-safe/module.js' : [ 'dashboardBuilder/javascript/components/module.js' ],
		               'concat/min-safe/dashboard.js' : [ 'dashboardBuilder/javascript/components/dashboard.js' ],
		               'concat/min-safe/dashboardsList.js' : [ 'dashboardBuilder/javascript/components/dashboardsList.js' ],
		               'concat/min-safe/ngScriptrAlert.js' : [ 'dashboard/frontend/components/alert/ngScriptrAlert.js' ],
		               'concat/min-safe/alert.js' : [ 'dashboard/frontend/components/alert/alert.js' ],
		               'concat/min-safe/toggle_switch.js' : [ 'dashboard/frontend/components/toggleSwitch/toggle_switch.js' ],
		               'concat/min-safe/slider.js' : [ 'dashboard/frontend/components/slider/slider.js' ],
		               'concat/min-safe/button.js' : [ 'dashboard/frontend/components/button/button.js' ],
		               'concat/min-safe/accelerometer.js' : [ 'dashboard/frontend/components/accelerometer/accelerometer.js' ],
		               'concat/min-safe/IFrame.js' : [ 'dashboard/frontend/components/IFrame/IFrame.js' ],
		               'concat/min-safe/angular-underscore.js' : [ 'dashboardBuilder/lib/schemaForm/angular-underscore.js' ],
		               'concat/min-safe/svg-assets-cache.js' : [ 'lib/svg-assets-cache.js' ],
		               'concat/min-safe/angular-ui-utils.min.js' : [ 'lib/angular-ui-utils.min.js' ],
		               'concat/min-safe/spectrum.js' : [ 'dashboardBuilder/lib/schemaForm/spectrum.js' ],
		               'concat/min-safe/angular-spectrum-colorpicker.min.js' : [ 'dashboardBuilder/lib/schemaForm/angular-spectrum-colorpicker.min.js' ],
		               'concat/min-safe/tv4.js' : [ 'dashboardBuilder/lib/schemaForm/tv4.js' ],
		               'concat/min-safe/objectPath.js' : [ 'dashboardBuilder/lib/schemaForm/objectPath.js' ],
		               'concat/min-safe/schemaForm.js' : [ 'dashboardBuilder/lib/schemaForm/schemaForm.js' ],
		               'concat/min-safe/bootstrapDecorator.js' : [ 'dashboardBuilder/lib/schemaForm/bootstrapDecorator.js' ],
		               'concat/min-safe/bootstrap-colorpicker.min.js' : [ 'dashboardBuilder/lib/schemaForm/bootstrap-colorpicker.min.js' ],
		               'concat/min-safe/ng-file-upload.js' : [ 'dashboardBuilder/lib/schemaForm/ng-file-upload.js' ],
		               'concat/min-safe/schema-form-file.js' : [ 'dashboardBuilder/lib/schemaForm/schema-form-file.js' ],
		               'concat/min-safe/bootstrap-picker.js':['dashboardBuilder/lib/schemaForm/bootstrap-picker.js'],		              
		               'concat/min-safe/ui.sortable.js':['dashboardBuilder/lib/schemaForm/ui.sortable.js'],
		               'concat/min-safe/ui-codemirror.js' : [ 'dashboardBuilder/lib/codemirror/js/mode/ui-codemirror.js' ],
		               'concat/min-safe/thermometer_directive.js' : [ 'dashboard/frontend/components/thermometer/thermometer_directive.js' ],
		               'concat/min-safe/thermometer.js' : [ 'dashboard/frontend/components/thermometer/thermometer.js' ],
		               'concat/min-safe/notifications.js' : [ 'dashboard/frontend/components/common/notifications.js' ],
		               'concat/min-safe/markdown.js' : [ 'dashboardBuilder/lib/markdown/markdown-directive.js' ],
		               'concat/min-safe/justgauge.js' : [ 'dashboard/frontend/components/gauge/justgauge.js' ],
		               'concat/min-safe/angular.gauge.min.js' : [ 'dashboard/frontend/components/gauge/angular.gauge.min.js' ],
		               'concat/min-safe/angular.metergauge.min.js' : [ 'dashboard/frontend/components/speedometer/angular.metergauge.min.js'],
		               'concat/min-safe/odometer.min.js' : [ 'dashboard/frontend/components/odometer/odometer.min.js'],
		               'concat/min-safe/angular.odometer.min.js' : [ 'dashboard/frontend/components/odometer/angular.odometer.min.js'],
		               'concat/min-safe/thermometer_directive.js' : [ 'dashboard/frontend/components/thermometer/thermometer_directive.js'],
		               'concat/min-safe/angular-translate.min.js' : [ 'dashboardBuilder/lib/schemaForm/angular-translate.min.js'],
		               'concat/min-safe/select.min.js' : [ 'dashboardBuilder/lib/schemaForm/select.min.js'],
		               'concat/min-safe/angular_toggle_switch.js' : [ 'dashboard/frontend/components/toggleSwitch/angular_toggle_switch.js'],
		               'concat/min-safe/angular-promise-buttons.js' : [ 'dashboard/frontend/components/button/angular-promise-buttons.js'],
		               'concat/min-safe/bootstrap-ui-select.min.js' : [ 'dashboardBuilder/lib/schemaForm/bootstrap-ui-select.min.js'],
		               'concat/min-safe/bootstrap-ui-codemirror.min.js' : [ 'dashboardBuilder/lib/schemaForm/bootstrap-ui-codemirror.min.js'],
		               'concat/min-safe/autorefresh.js' : [ 'dashboardBuilder/lib/schemaForm/autorefresh.js'],
		               'concat/min-safe/angular-strap.js' : [ 'dashboardBuilder/lib/schemaForm/angular-strap.js'],
		               'concat/min-safe/angular-strap.tpl.min.js' : [ 'dashboardBuilder/lib/schemaForm/angular-strap.tpl.min.js'],
		               'concat/min-safe/angular-schema-form-dynamic-select.js' : [ 'dashboardBuilder/lib/schemaForm/angular-schema-form-dynamic-select.js'],
		               'concat/min-safe/markdown-directive.js' : [ 'dashboardBuilder/lib/markdown/markdown-directive.js'],
		               'concat/min-safe/dygraphs-2.1.0.js' : [ 'dashboard/frontend/components/dygraphs/dygraphs-2.1.0.js'],
		               'concat/min-safe/thermometer.js' : [ 'dashboard/frontend/components/thermometer/thermometer.js'],
		               'concat/min-safe/menu.js' : [ 'layout/frontend/components/menu/menu.js'],
		               'concat/min-safe/header.js' : [ 'layout/frontend/components/header/header.js'],
		               'concat/min-safe/collapsibleMenu.js' : [ 'layout/frontend/components/collapsibleMenu/collapsibleMenu.js'],
		               'concat/min-safe/layoutmodule.js' : [ 'layout/frontend/components/module.js'],
		               'concat/min-safe/datetimepicker_directive.js' : [ 'dashboard/frontend/components/datetimepicker/datetimepicker_directive.js'],
		               'concat/min-safe/dateTimeInput.js' : [ 'dashboard/frontend/components/datetimepicker/dateTimeInput.js'],
		               'concat/min-safe/datetimepicker.js' : [ 'dashboard/frontend/components/datetimepicker/datetimepicker.js'],
		               //'concat/min-safe/angular-p5.js' : [ 'dashboard/frontend/components/grideye/angular-p5.js'],
		               //'concat/min-safe/cell.js' : [ 'dashboard/frontend/components/grideye/cell.js'],
		               //'concat/min-safe/grideye.js' : [ 'dashboard/frontend/components/grideye/grideye.js'],
		               'concat/min-safe/leaflet-src.js' : [ 'dashboard/frontend/components/imagemap/leaflet-src.js'],
		               'concat/min-safe/leaflet-heat.js' : [ 'dashboard/frontend/components/imagemap/leaflet-heat.js'],
		               'concat/min-safe/leaflet-draw.js' : [ 'dashboard/frontend/components/imagemap/leaflet-draw.js'],
		               'concat/min-safe/angular-simple-logger.min.js' : [ 'dashboard/frontend/components/imagemap/0.1.7/angular-simple-logger.min.js'],
		               'concat/min-safe/ui-leaflet.js' : [ 'dashboard/frontend/components/imagemap/ui-leaflet.js'],
		               'concat/min-safe/ui-leaflet-layers.min.js' : [ 'dashboard/frontend/components/imagemap/ui-leaflet-layers.min.js'],
		               'concat/min-safe/ui-leaflet-draw.js' : [ 'dashboard/frontend/components/imagemap/ui-leaflet-draw.js'],
		               'concat/min-safe/imagemap.js' : [ 'dashboard/frontend/components/imagemap/imagemap.js'],
		               'concat/min-safe/combo.js' : [ 'dashboard/frontend/components/combo/combo.js'],
		               'concat/min-safe/scrolling-tabs.js' : [ 'dashboard/frontend/components/scrollableTabs/scrolling-tabs.js'],
		               'concat/min-safe/tabs.js' : [ 'dashboard/frontend/components/scrollableTabs/tabs.js'],
		               'concat/min-safe/angular-daterangepicker.js' : [ 'dashboard/frontend/components/datetimerangepicker/angular-daterangepicker.min.js'],
		               'concat/min-safe/datetimerangepicker.js' : [ 'dashboard/frontend/components/datetimerangepicker/datetimerangepicker.js'],
		               'concat/min-safe/loadingOverlay.js' : [ 'dashboard/frontend/components/loadingOverlay/loadingOverlay.min.js'],
		               'concat/min-safe/ngTagsInput.js' : [ 'dashboard/frontend/components/ngTagsInput/ng-tags-input.min.js']
							
		            }
	            }
	         },

	         concat : {
	            dashboard_builder_constants : {
	               src : [
	                     'dashboardBuilder/javascript/components/library/widgets/line-dygraph.js',
	                     'dashboardBuilder/javascript/components/library/widgets/bar.js',
	                     'dashboardBuilder/javascript/components/library/widgets/area.js',
	                     'dashboardBuilder/javascript/components/library/widgets/line.js',
	                     'dashboardBuilder/javascript/components/library/widgets/donut.js',
	                     'dashboardBuilder/javascript/components/library/widgets/gauge.js',
	                     'dashboardBuilder/javascript/components/library/widgets/speedometer.js',
	                     'dashboardBuilder/javascript/components/library/widgets/thermometer.js',
	                     'dashboardBuilder/javascript/components/library/widgets/odometer.js',
	                     'dashboardBuilder/javascript/components/library/widgets/progressbar.js',
	                     'dashboardBuilder/javascript/components/library/widgets/map.js',
	                     'dashboardBuilder/javascript/components/library/widgets/accelerometer.js',
	                     'dashboardBuilder/javascript/components/library/widgets/grid.js',
	                     'dashboardBuilder/javascript/components/library/widgets/toggle-switch.js',
	                     'dashboardBuilder/javascript/components/library/widgets/slider.js',
	                     'dashboardBuilder/javascript/components/library/widgets/button.js',
	                     'dashboardBuilder/javascript/components/library/widgets/iframe.js',
	                     'dashboardBuilder/javascript/components/library/widgets/alert.js',
	                     'dashboardBuilder/javascript/components/library/widgets/display-data.js',
	                     'dashboardBuilder/javascript/components/library/widgets/windrose.js',
	                     'dashboardBuilder/javascript/components/library/widgets/3dsurface.js',
	                     //'dashboardBuilder/javascript/components/library/widgets/grideye.js',
	                     'dashboardBuilder/javascript/components/library/widgets/imagemap.js',
	                     'dashboardBuilder/javascript/components/library/widgets/dotPlots.js',
	                     'dashboardBuilder/javascript/components/library/widgets/heatmap.js',
	                     'dashboardBuilder/javascript/components/library/widgets/bubbleChart.js',
	                     'dashboardBuilder/javascript/components/library/widgets/scatter.js'
	                     
	                     ],
	               dest : 'build/js/dashboard_builder_constants.min.js'
	            },

	            external_jquery_resources : {
	               src : [ 'lib/jquery.min.js', 
	               	     'lib/jquery-ui.min.js',
	                       'lib/jquery.cookie.min.js', 
	                       'lib/bootstrap.min.js',
	                       'lib/slick.min.js',
	                       'concat/min-safe/leaflet-src.js',
	               		  'concat/min-safe/leaflet-heat.js',
	               		  'concat/min-safe/leaflet-draw.js',
	               		  'lib/leaflet.markercluster.js'],
	               dest : 'build/js/external_jquery_resources.min.js'
	            },

	            external_libraries1 : {
	               src : [
	                     'lib/showdown.min.js', 
	                     'lib/underscore-min.js', 
	                     'lib/handlebars.js',
	                     'lib/codemirror.js',  
	                     'lib/placeholder.min.js', 
	                     'lib/javascript.min.js'
	                     ],
	               dest : 'build/js/external_libraries1.min.js'
	            },
	            
	            external_libraries2 : {
	               src : [
	               		 'lib/moment.min.js', 
	               		 'lib/moment-timezone-with-data.min.js'
	               		 ],
	               dest : 'build/js/external_libraries2.min.js'
	            },
	            

	            external_angular_resources_1 : {
	               src : [
	                     'lib/angular.min.js',
	                     'lib/angular-route.js',
	                     'lib/angular-cookies.js',
	                     'lib/angular-websocket.min.js',
	                     'lib/angular-slick.min.js',
	                     'dashboardBuilder/lib/gridster/angular_gridster.min.js',
	                     'lib/angular-animate.js',
	                     'lib/angular-sanitize.js',
	                     'lib/angular-ui-utils.min.js'
	                     ],
	               dest : 'build/js/angular_resources_1.min.js'
	            },

	            external_angular_resources_2 : {
	               src : [
	                     'concat/min-safe/angular-underscore.js',
	                     'concat/min-safe/angular-translate.min.js',
	                     'lib/angular-translate-loader-static-files.js',
	                     'lib/angular-translate-handler-log.js',
	                     'concat/min-safe/select.min.js',
	                     'lib/ui-bootstrap.min.js',
	                     'lib/ui-bootstrap-tpls.min.js',
	                     'lib/angular-messages.min.js',
	                     'lib/angular-aria.min.js' 
	                     ],
	               dest : 'build/js/angular_resources_2.min.js'
	            },

	            external_angular_resources_3 : {
	               src : [ 
	               	   'lib/angular-material.min.js',
	                     'concat/min-safe/svg-assets-cache.js',
	                     'concat/min-safe/markerClusterer.js' ,
	                     //'concat/min-safe/angular-p5.js',
	                     'concat/min-safe/angular-simple-logger.min.js'
	                     ],
	               dest : 'build/js/angular_resources_3.min.js'
	            },

	            directives_1 : {
	               src : [
	                     'lib/raphael-min.js',
	                     'concat/min-safe/morris.js',
	                     'concat/min-safe/angular.morris.js',
	                     'concat/min-safe/justgauge.js',
	                     'concat/min-safe/angular.gauge.min.js',
	                     'lib/d3.v4.min.js',
	                     'concat/min-safe/angular.metergauge.min.js',
	                     'concat/min-safe/odometer.min.js',
	                     'concat/min-safe/angular.odometer.min.js',
	                     'concat/min-safe/abn_tree_directive.js',
	                     'concat/min-safe/thermometer_directive.js',
	                     'concat/min-safe/ng-map.js'
	                     ],
	               dest :'build/js/directives_1.min.js'
	            },

	            directives_2 : {
	               src : [
	                     'concat/min-safe/angucomplete.alt.js',
	                     'concat/min-safe/angular_toggle_switch.js',
	                     'lib/rzslider.min.js',
	                     'concat/min-safe/angular-promise-buttons.js',
	                     'lib/xeditable.js',
	                     'concat/min-safe/spectrum.js',
	                     'concat/min-safe/angular-spectrum-colorpicker.min.js',
	                     'concat/min-safe/tv4.js',
	                     'concat/min-safe/objectPath.js',
	                     'concat/min-safe/ui-codemirror.js',
	                     'concat/min-safe/ui.sortable.js',
	                     'concat/min-safe/schemaForm.js',
	                     'concat/min-safe/bootstrapDecorator.js',
	                     'concat/min-safe/bootstrap-colorpicker.min.js',
	                     'concat/min-safe/ng-file-upload.js',
			               'concat/min-safe/schema-form-file.js',
	                     'concat/min-safe/bootstrap-ui-select.min.js',
	                     'concat/min-safe/bootstrap-ui-codemirror.min.js',
	                     'concat/min-safe/autorefresh.js',
	                     'concat/min-safe/angular-strap.js',
	                     'concat/min-safe/angular-strap.tpl.min.js',
	                     'concat/min-safe/angular-schema-form-dynamic-select.js',
	                     'lib/picker.js',
	                     'lib/legacy.js',
	                     'lib/picker.date.js',
	                     'lib/picker.time.js',
	                     'concat/min-safe/bootstrap-picker.js',
	                     'concat/min-safe/markdown-directive.js',
	                     'concat/min-safe/datetimepicker_directive.js',
	                     'concat/min-safe/ui-leaflet.js',
	                     'concat/min-safe/ui-leaflet-layers.min.js',
	                     'concat/min-safe/ui-leaflet-draw.js',
	                     'lib/daterangepicker.min.js'
	                     ],
	               dest : 'build/js/directives_2.min.js'
	            },

	            components : {
	               src : [
	               		'concat/min-safe/wsProvider.js',
	               		'concat/min-safe/httpProvider.js',
	               		'concat/min-safe/dataService.js',
	                     'concat/min-safe/chart.js',
	                     'concat/min-safe/odometer.js',
	                     'concat/min-safe/speedometer.js',
	                     'concat/min-safe/gauge.js',
	                     'concat/min-safe/ngScriptrAlert.js',
	                     'concat/min-safe/alert.js',
	                     'concat/min-safe/thermometer.js',
	                     'concat/min-safe/map.js',
	                     'concat/min-safe/grid.js',
	                     'concat/min-safe/dygraphs-2.1.0.js',
	                     'concat/min-safe/angular_dygraphs.js',
	                     'concat/min-safe/dygraphs.js',

	                     'concat/min-safe/toggle_switch.js',
	                     'concat/min-safe/slider.js',
	                     'concat/min-safe/button.js',
	                     'concat/min-safe/IFrame.js',
	                     'concat/min-safe/accelerometer.js',
	                     'concat/min-safe/displayCount.js',

	                     'concat/min-safe/angular_plotly.js',
	                     'concat/min-safe/plotly.js',
	                     'concat/min-safe/3dsurface.js',
	                     'concat/min-safe/windrose.js',
	                     'concat/min-safe/heatmap.js',
	                     'concat/min-safe/bubbleChart.js',
	                     'concat/min-safe/scatter.js',
	                     'concat/min-safe/notifications.js',
	                     'concat/min-safe/layoutmodule.js',
	                     'concat/min-safe/header.js', 
	                     'concat/min-safe/menu.js',
	                     'concat/min-safe/collapsibleMenu.js',
	                     'concat/min-safe/datetimepicker.js',
	                     'concat/min-safe/dateTimeInput.js',
	                     'concat/min-safe/imagemap.js',
	                     'concat/min-safe/combo.js',
	                     'concat/min-safe/scrolling-tabs.js',
	                     'concat/min-safe/tabs.js',
	                     'concat/min-safe/angular-daterangepicker.js',
	                     'concat/min-safe/datetimerangepicker.js',
	                     //'concat/min-safe/cell.js',
	                     //'concat/min-safe/grideye.js',
	                     'concat/min-safe/loadingOverlay.js',
	                     'concat/min-safe/ngTagsInput.js'
	                     ],
	               dest : 'build/js/components.min.js'
	            },
	            editor: {
	            	src: [
	            	   'concat/min-safe/module.js',
                     'concat/min-safe/acl.js',
                     'dashboardBuilder/javascript/components/library/commonsConfig.js',
                     'dashboardBuilder/javascript/components/library/commonsActionConfig.js',
                     'dashboardBuilder/javascript/components/library/boxStyleConfig.js',
                     'dashboardBuilder/javascript/components/library/widgetsConfig.js',
                     'dashboardBuilder/javascript/components/library/defaultThemeModel.js',
                     'dashboardBuilder/javascript/components/library/dashboardConfig.js',
                     'concat/min-safe/dashboardsList.js',
                     'concat/min-safe/dashboard.js',
                     'concat/min-safe/searchBox.js',
                     'concat/min-safe/autocomplete.js'
	            	],
	            	dest : 'build/js/editor.min.js'
	            },

	            css : {
	               src : [
	                     'lib/slick.css',
	                     'lib/slick-theme.css',
	                     'lib/morris.css',
	                     'dashboard/frontend/components/chart/chart.css',
	                     'dashboard/frontend/components/searchBox/abn_tree.css',
	                     'dashboardBuilder/lib/gridster/angular_gridster.min.css',
	                     'lib/angular-material.min.css',
	                     'dashboard/frontend/components/odometer/odometer.car.css',
	                     'dashboard/frontend/components/thermometer/style.css',
	                     'lib/xeditable.min.css',
	                     'dashboard/frontend/components/ACL/ACL.css',
	                     'dashboard/frontend/components/gauge/gauge.css',
	                     'dashboard/frontend/components/grid/grid.css',
	                     'dashboard/frontend/components/list/angucomplete.alt.css',
	                     'dashboard/frontend/components/map/map.css',
	                     'dashboard/frontend/components/toggleSwitch/angular_toggle_switch.css',
	                     'dashboardBuilder/lib/schemaForm/select.min.css',
	                     'lib/colorpicker.min.css',
	                     'lib/rzslider.css',
	                     'dashboard/frontend/components/button/button.css',
	                     'dashboard/frontend/components/IFrame/IFrame.css',
	                     'dashboard/frontend/components/accelerometer/accelerometer.css',
	                     'dashboardBuilder/lib/schemaForm/spectrum.css',
	                     'lib/codemirror.min.css', 
	                     'lib/neo.min.css',
	                     'dashboard/frontend/components/dygraphs/dygraphs-2.1.0.css',
	                     'dashboard/frontend/components/displayCount/count.css',
	                     'dashboard/frontend/components/slider/slider.css',
	                     'dashboard/frontend/components/plotly/windrose.css',
	                     'dashboard/frontend/components/common/notifications.css',
	                     'dashboardBuilder/css/markdown.css',
	                     'dashboardBuilder/css/media.css',
	                     'dashboardBuilder/lib/schemaForm/schema-form-file.css',
	                     'layout/frontend/components/header/header.css',
	                     'layout/frontend/components/menu/menu.css',
	                     'layout/frontend/components/collapsibleMenu/collapsibleMenu.css',
	                     'dashboard/frontend/components/datetimepicker/datetimepicker.css',
	                     'lib/classic.css',
	                     'lib/classic.date.css',
	                     'lib/classic.time.css',
	                     'dashboard/frontend/components/imagemap/leaflet.css',
	                     'dashboard/frontend/components/imagemap/leaflet-draw.css',
	                     'lib/MarkerCluster.css',
	                     'lib/MarkerCluster.Default.css',
	                     'dashboard/frontend/components/imagemap/imageMap.css',
	                     'dashboard/frontend/components/combo/combo.css',
	                     'dashboard/frontend/components/scrollableTabs/scrolling-tabs.css',
	                     'lib/daterangepicker.min.css',
	                     'dashboard/frontend/components/alert/alert.css',
	                     'dashboard/frontend/components/ngTagsInput/ng-tags-input.min.css'
	                     ],
	               dest : 'build/css/components.css'
	            }
	         },

	         uglify : {
	            dashboardBuilder : {
		            files : {
		               'build/js/external_jquery_resources.min.js' : [ 'build/js/external_jquery_resources.min.js' ],
		               'build/js/external_libraries1.min.js' : [ 'build/js/external_libraries1.min.js' ],
		               'build/js/external_libraries2.min.js' : [ 'build/js/external_libraries2.min.js' ],
		               'build/js/angular_resources_1.min.js' : [ 'build/js/angular_resources_1.min.js' ],
		               'build/js/angular_resources_2.min.js' : [ 'build/js/angular_resources_2.min.js' ],
		               'build/js/angular_resources_3.min.js' : [ 'build/js/angular_resources_3.min.js' ],
		               'build/js/directives_1.min.js' : [ 'build/js/directives_1.min.js' ],
		               'build/js/directives_2.min.js' : [ 'build/js/directives_2.min.js' ],
		               'build/js/dashboard_builder_constants.min.js' : [ 'build/js/dashboard_builder_constants.min.js' ],
		               'build/js/components.min.js' : [ 'build/js/components.min.js'],
	               	'build/js/editor.min.js' : [ 'build/js/editor.min.js']
		            }
	            }
	         },
	         
	         stripCssComments : {
	         	options: {
	               preserve: false 
	             },
	             dist: {
	                files: {
	                    'build/css/components.css': 'build/css/components.css',
	                    'build/css/light.css': 'dashboardBuilder/css/light.css',
	                    'build/css/dark.css': 'dashboardBuilder/css/dark.css'
	                    
	                }
	            }
	         },
	         cssmin : {
	            components : {
	               src : 'build/css/components.css',
	               dest : 'build/css/components.min.css'
	            },
	            light: {
	            	src : 'build/css/light.css',
	               dest : 'build/css/light.min.css'
	            },
	            dark: {
	            	src : 'build/css/dark.css',
	               dest : 'build/css/dark.min.css'
	            }

	         },

	         clean : {
		         folder : [ 'concat/', 'lib/', 'build/css', 'build/js' ]
	         },

	         less : {
		         production : {
			         files : {
			            'dashboardBuilder/css/light.css' : 'dashboardBuilder/css/light.less',
			            'dashboardBuilder/css/dark.css' : 'dashboardBuilder/css/dark.less'
			         }
		         }
	         },
	         sass: {
	            options: {
	                implementation: sass,
	                sourceMap: true
	            },
	            production: {
	                files: {
	                    '../login/view/css/registration.css': '../login/view/css/registration.scss'
	                }
	            }
	        }
	      });

	var fs = require('fs');
	var path = require('path');
	var request = require('request');
	var async = require('async');

	grunt.registerMultiTask('fetch_ag_grid', function() {
		var done = this.async();
		var options = this.options({
			separator : '\n',
		});
		async.eachSeries(this.files, function(file, next) {
			var out = '';
			async.eachSeries(file.orig.src, function(url, nextUrl) {
				if (grunt.file.exists(url)) {
					// If a file
					grunt.log.writeln('Concatenating ' + url);
					out += grunt.file.read(url) + options.separator;
					nextUrl();
				} else {
					// Otherwise assume a url
					grunt.log.writeln('Downloading ' + url);
					request(url).on('data', function(data) {
						out += data.toString();
					}).on('end', function() {
						out += options.separator;
						nextUrl();
					});
				}
			}, function() {
				grunt.file.write(file.dest, out);
				grunt.log.ok('Wrote ' + file.dest + '.');
				next();
			});
		}, done);
	});

	// Load the plugin
	grunt.loadNpmTasks('grunt-fetch-from-cdn');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-strip-css-comments');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('node-sass');

	// Run the tasks
	grunt.registerTask('buildCss', [ 'less:production' ]);
	
	grunt.registerTask('buildScss', [ 'sass:production' ]);
	grunt.registerTask('dashboardBuilder', [ 
			'clean',
			'fetchFromCDN', 
			'fetch_ag_grid',
	      'ngtemplates', 
	      'ngAnnotate', 
	      'concat:external_jquery_resources',
	      'concat:external_libraries1', 
	      'concat:external_libraries2', 
	      'concat:external_angular_resources_1',
	      'concat:external_angular_resources_2',
	      'concat:external_angular_resources_3', 
	      'concat:directives_1',
	      'concat:directives_2', 
	      'concat:components',
	      'concat:editor',
	      'concat:dashboard_builder_constants', 
	      'less:production', 
	      'concat:css',
	      'uglify:dashboardBuilder', 
	      'stripCssComments',
	      'cssmin:components',
	      'cssmin:light',
	      'cssmin:dark'
	      ]);
	
	grunt.registerTask('UIComponents', [ 
		'fetchFromCDN', 
		'fetch_ag_grid',
      'ngtemplates', 
      'ngAnnotate', 
      'concat:external_jquery_resources',
      'concat:external_libraries1', 
      'concat:external_libraries2', 
      'concat:external_angular_resources_1',
      'concat:external_angular_resources_2',
      'concat:external_angular_resources_3', 
      'concat:directives_1',
      'concat:directives_2', 
      'concat:components',
      'concat:editor',
      'concat:dashboard_builder_constants', 
      'less:production', 
      'concat:css',
      'uglify:dashboardBuilder', 
      'stripCssComments',
      'cssmin:components',
      'cssmin:light',
      'cssmin:dark' ]);

};