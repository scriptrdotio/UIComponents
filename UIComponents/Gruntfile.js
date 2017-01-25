/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
	  
		// Basic settings and info about our plugins
		pkg: grunt.file.readJSON('package.json'),
	  
	    ngtemplates:  {
		  app:        {
			src:      ['dashboard/frontend/components/chart/chart.html',
					   'dashboard/frontend/components/gauge/gauge.html',
					   'dashboard/frontend/components/grid/grid.html',
					   'dashboard/frontend/components/list/list.html',
					   'dashboard/frontend/components/odometer/odometer.html',
					   'dashboard/frontend/components/speedometer/speedometer.html'],
			dest:      'build/javascript/templates.js',
			options:      {
			  bootstrap:  function(module, script) {
				return 'var templates = (["$templateCache", function($templateCache) {'
				+ script + '}])';
			  },
			  htmlmin: {
				  collapseBooleanAttributes:      true,
				  collapseWhitespace:             true,
				  removeAttributeQuotes:          true,
				  removeComments:                 true, // Only if you don't use comment directives! 
				  removeEmptyAttributes:          true,
				  removeRedundantAttributes:      true,
				  removeScriptTypeAttributes:     true,
				  removeStyleLinkTypeAttributes:  true
				},
				url:    function(url) { return url.replace('dashboard', '/UIComponents/dashboard'); }
			}
		  }
		},
	  
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			app: {
				files: {
					'concat/min-safe/odometer.js': ['dashboard/frontend/components/odometer/odometer.js'],
					'concat/min-safe/speedometer.js': ['dashboard/frontend/components/speedometer/speedometer.js'],
					'concat/min-safe/autocomplete.js': ['dashboard/frontend/components/list/autocomplete.js'],
					'concat/min-safe/grid.js': ['dashboard/frontend/components/grid/grid.js'],
					'concat/min-safe/gauge.js': ['dashboard/frontend/components/gauge/gauge.js'],
					'concat/min-safe/chart.js': ['dashboard/frontend/components/chart/chart.js'],
					'concat/min-safe/httpProvider.js': ['httpProvider.js'],
					'concat/min-safe/wsProvider.js': ['wsProvider.js'],
					'concat/min-safe/angucomplete.js': ['dashboard/frontend/components/list/angucomplete.alt.js'],
					'concat/min-safe/angular.morris.js': ['dashboard/frontend/components/chart/angular.morris.js'],
					'concat/min-safe/templates.js': ['build/javascript/templates.js']
					
				}
			}
		},
		
		urlconcat_css:{
			all: {
				src: [
					'https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css'
					],
				dest: 'concat/min-safe/morris.css'   
			}

		},
		
		urlconcat_1:{
			all: {
				src: [
				      'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
				      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js',
					  'https://cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js',
					  'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies.js'
					],
				dest: 'concat/min-safe/external_resources.js'   
			}

		},
		
		concat:{
			
			basic_and_extras: {
                 files: {
					'build/javascript/directives.js': ['dashboard/frontend/components/gauge/angular.gauge.min.js', 'dashboard/frontend/components/odometer/odometer.min.js', 'dashboard/frontend/components/odometer/angular.odometer.min.js',
					'dashboard/frontend/components/speedometer/angular.metergauge.min.js', 'components/min-safe/angular.morris.js'],
					
					'build/javascript/components.js': ['concat/min-safe/wsProvider.js', 'concat/min-safe/httpProvider.js', 'concat/min-safe/odometer.js', 'concat/min-safe/speedometer.js', 'concat/min-safe/angucomplete.js','concat/min-safe/autocomplete.js', 'concat/min-safe/chart.js', 'concat/min-safe/grid.js', 'concat/min-safe/gauge.js', 'concat/min-safe/templates.js']
				  },				
			},
			
			css: {
				 src: ['dashboard/frontend/components/odometer/odometer.car.css',
					   'dashboard/frontend/examples/grid/grid.css',
					   'dashboard/frontend/examples/chart/chartDemo.css',
					   'concat/min-safe/morris.css'],
				 dest: 'build/css/components.css'
		    }
		},
		
	    uglify:{
			dist: {
				files: {
					'build/javascript/components.min.js': ['build/javascript/components.js'],
					'build/javascript/directives.min.js': ['build/javascript/directives.js'],
					'build/external/external_resources.min.js': ['concat/min-safe/external_resources.js']
				}
			}
		},
		
		cssmin: {
		    css:{
				src: 'build/css/components.css',
				dest: 'build/css/components.min.css'
		    }
		},
		
		urlconcat_2:{
			all: {
				src: [
				      'https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js',
					  'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael-min.js',
				      'https://cdnjs.cloudflare.com/ajax/libs/justgage/1.2.2/justgage.min.js',
					  'https://d3js.org/d3.v4.min.js'					  
					],
				dest: 'build/external/external_directives.min.js'   
			}

		}
				
		
	});


	var fs = require('fs');
	var path = require('path');
	var request = require('request');
	var async = require('async');
	
	grunt.registerMultiTask('urlconcat_css', function() {
	  var done = this.async();
	  var options = this.options({
		separator: '\n',
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

	grunt.registerMultiTask('urlconcat_1', function() {
	  var done = this.async();
	  var options = this.options({
		separator: '\n',
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
	
	grunt.registerMultiTask('urlconcat_2', function() {
	  var done = this.async();
	  var options = this.options({
		separator: '\n',
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
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-angular-templates');
	
	// Run the tasks
	//grunt.registerTask('default', ['ngtemplates']);
    grunt.registerTask('default', ['ngtemplates', 'ngAnnotate', 'urlconcat_css', 'urlconcat_1', 'concat', 'uglify', 'cssmin','urlconcat_2']);

};
