/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */
      
'use strict';

module.exports = function(grunt) {
	grunt
	      .initConfig({

	         // Basic settings and info about our plugins
	         pkg : grunt.file.readJSON('package.json'),

	         ngtemplates : {
		         app : {
		            src : [
		                  'dashboard/frontend/components/grid/grid.html',
		                  'dashboard/frontend/components/button/button.html',
		                  'layout/frontend/components/header/header.html',
		                  'layout/frontend/components/menu/menu.html'],
		            dest :'build/javascript/uicomponents_templates.js',
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
		            	'concat/min-safe/angular-underscore.js':['dashboardBuilder/lib/schemaForm/angular-underscore.js'],
		            	'concat/min-safe/angular-translate.min.js':['dashboardBuilder/lib/schemaForm/angular-translate.min.js'],
		            	'concat/min-safe/tv4.js':['dashboardBuilder/lib/schemaForm/tv4.js'],
		            	'concat/min-safe/schemaForm.js':['dashboardBuilder/lib/schemaForm/schemaForm.js'],
		            	'concat/min-safe/bootstrapDecorator.js':['dashboardBuilder/lib/schemaForm/bootstrapDecorator.js'],
		            	'concat/min-safe/objectPath.js':['dashboardBuilder/lib/schemaForm/objectPath.js'],
		            	'concat/min-safe/angular-strap.js':['dashboardBuilder/lib/schemaForm/angular-strap.js'],
		            	'concat/min-safe/angular-strap.tpl.min.js':['dashboardBuilder/lib/schemaForm/angular-strap.tpl.min.js'],
		            	'concat/min-safe/select.min.js':['dashboardBuilder/lib/schemaForm/select.min.js'],
		            	'concat/min-safe/angular-schema-form-dynamic-select.js':['dashboardBuilder/lib/schemaForm/angular-schema-form-dynamic-select.js'],
		            	'concat/min-safe/spectrum.js':['dashboardBuilder/lib/schemaForm/spectrum.js'],
		            	'concat/min-safe/ui-codemirror.js':['dashboardBuilder/lib/codemirror/js/mode/ui-codemirror.js'],
		            	'concat/min-safe/schema-form-date-time-picker.min.js':['dashboardBuilder/lib/schemaForm/schema-form-date-time-picker.min.js'],
		               'concat/min-safe/angular-promise-buttons.js':['dashboard/frontend/components/button/angular-promise-buttons.js'],
		               'concat/min-safe/buttons.js':['dashboard/frontend/components/button/button.js'],
		               'concat/min-safe/module.js' : [ 'layout/frontend/components/module.js' ],
		               'concat/min-safe/header.js' : [ 'layout/frontend/components/header/header.js' ],
		               'concat/min-safe/menu.js' : [ 'layout/frontend/components/menu/menu.js' ],
		               'concat/min-safe/grid.js' : [ 'dashboard/frontend/components/grid/grid.js' ],
		               'concat/min-safe/httpProvider.js' : [ 'httpProvider.js' ],
		               'concat/min-safe/wsProvider.js' : [ 'wsProvider.js' ],
		            }
	            }
	         },
	         concat : {
	         	advancedapp_js : {
		            src : [
		            	'concat/min-safe/angular-underscore.js',
		            	'concat/min-safe/angular-translate.min.js',
		            	'concat/min-safe/tv4.js',
		            	'concat/min-safe/schemaForm.js',
		            	'concat/min-safe/bootstrapDecorator.js',
		            	'concat/min-safe/objectPath.js',
		            	'concat/min-safe/angular-strap.js',
		            	'concat/min-safe/angular-strap.tpl.min.js',
		            	'concat/min-safe/select.min.js',
		            	'concat/min-safe/angular-schema-form-dynamic-select.js',
		            	'concat/min-safe/spectrum.js',
		            	'concat/min-safe/ui-codemirror.js',
		            	'concat/min-safe/schema-form-date-time-picker.min.js',
		            	'concat/min-safe/angular-promise-buttons.js',
		            	'concat/min-safe/buttons.js',
		               'concat/min-safe/module.js',
		               'concat/min-safe/header.js',
		               'concat/min-safe/menu.js',
		               'concat/min-safe/grid.js',
		               'concat/min-safe/httpProvider.js',
		               'concat/min-safe/wsProvider.js',
		            ],
		           dest : 'build/javascript/uicomponents_resources.js'
	            },
	            
	            advancedapp_css : {
	               src : [
	               	"layout/frontend/components/header/header.css",
	                  "layout/frontend/components/menu/menu.css", 
	                  "dashboardBuilder/lib/schemaForm/strap.min.css",
	                  "dashboard/frontend/components/grid/grid.css",
	                  "dashboard/frontend/components/button/button.css",
	                  "dashboardBuilder/lib/schemaForm/select.min.css",
                     "dashboardBuilder/lib/schemaForm/schema-form-file.css",
                     "dashboardBuilder/lib/schemaForm/select.min.css"
                      
	              ],
	               dest : 'build/css/uicomponents_resources.css'
	            }

	         },

	         uglify : {
					advancedapp: {
						files: {
							'build/javascript/uicomponents_resources.min.js': ['build/javascript/uicomponents_resources.js']
						}
					}
					
	         },

	         cssmin : {
		         advancedapp: {
						src: 'build/css/uicomponents_resources.css',
						dest:'build/css/uicomponents_resources.min.css'
				   }
	         },

	         clean : {
		         folder : [ 'concat/', 'lib/']
	         }
	      });

	// Load the plugin
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Run the tasks
	//grunt.registerTask('default', ['fetchFromCDN']);
	grunt.registerTask('app', [ 'ngtemplates', 'ngAnnotate', 'concat:advancedapp_js', 'concat:advancedapp_css', 'uglify:advancedapp', 'cssmin:advancedapp']);
};