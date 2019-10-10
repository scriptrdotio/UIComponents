var cachedTemplates = (["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboard.html',
    "<dashboard load-tree=true tree-search-criteria=model.Car devices-model=modules/devicemodels/api/getSensors></dashboard>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboardTemplate.min',
    "<script type=text/x-handlebars-template id=handlebar-template>&lt;html ng-app=&quot;myApp&quot;&gt;\r" +
    "\n" +
    "&lt;head&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "    &lt;link rel=&quot;icon&quot; href=&quot;data:;base64,iVBORw0KGgo=&quot;&gt;\r" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; integrity=&quot;sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u&quot; crossorigin=&quot;anonymous&quot;&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;//use.fontawesome.com/3d61d6959e.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;/UIComponents/build/external/css/dt_components.min.css&quot;&gt;\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    &lt;!-- JQUERY Material  To use jQuery, simply ensure it is loaded before the angular.js file. --&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_jquery_resources.min.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "  \r" +
    "\n" +
    "    &lt;!-- Libraries --&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/dt_external_libraries.min.js&quot;&gt;&lt;/script&gt;	\r" +
    "\n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "  \r" +
    "\n" +
    "    &lt;!-- NG material --&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_1.min.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_2.min.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_3.min.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "  \r" +
    "\n" +
    "    &lt;!-- Directives --&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/directives_1.min.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/directives_2.min.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/ag-grid/12.0.0/ag-grid.js?ignore=notused36&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "  \r" +
    "\n" +
    "    &lt;!-- Components --&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/components.min.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    \r" +
    "\n" +
    "    &lt;!-- Theme --&gt;\r" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;/UIComponents/dashboardBuilder/css/{{dashboardSettings.theme}}.css&quot;&gt;\r" +
    "\n" +
    "    \r" +
    "\n" +
    "\r" +
    "\n" +
    "&lt;/head&gt; \r" +
    "\n" +
    "  \r" +
    "\n" +
    "  \r" +
    "\n" +
    "&lt;style&gt;\r" +
    "\n" +
    "  {{compiledCss}}\r" +
    "\n" +
    "&lt;/style&gt;\r" +
    "\n" +
    "&lt;style&gt;\r" +
    "\n" +
    "  {{dashboardSettings.inline-style}}\r" +
    "\n" +
    "&lt;/style&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "&lt;script&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "(function() {\r" +
    "\n" +
    "	\r" +
    "\n" +
    "  if(&quot;{{{dashboardSettings.requiresLogin}}}&quot; == &quot;Yes&quot;){\r" +
    "\n" +
    "  \r" +
    "\n" +
    "   var scriptName = window.location.pathname.substring(1,window.location.pathname.length )\r" +
    "\n" +
    "   var loginTemplateTarget =&quot;/UIComponents/dashboardBuilder/loginTemplate.html?redirectTarget=&quot;+scriptName+&quot;&amp;anon_token={{{anon_token}}}&quot;\r" +
    "\n" +
    "\r" +
    "\n" +
    "    var authorization  = $.scriptr.authorization(\r" +
    "\n" +
    "        {\r" +
    "\n" +
    "          onTokenValid: function(){ }, \r" +
    "\n" +
    "          loginPage: loginTemplateTarget\r" +
    "\n" +
    "        }\r" +
    "\n" +
    "      );\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  \r" +
    "\n" +
    "   $.urlParam = function(name){\r" +
    "\n" +
    "	     var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);\r" +
    "\n" +
    "	     if (results==null){\r" +
    "\n" +
    "	         return null;\r" +
    "\n" +
    "	     }else{\r" +
    "\n" +
    "	         return results[1] || 0;\r" +
    "\n" +
    "	     }\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	$.getUrlVars = function() {\r" +
    "\n" +
    "		var vars = [], hash;\r" +
    "\n" +
    "		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&amp;');\r" +
    "\n" +
    "		for(var i = 0; i &lt; hashes.length; i++)\r" +
    "\n" +
    "		{\r" +
    "\n" +
    "			hash = hashes[i].split('=');\r" +
    "\n" +
    "			vars.push(hash[0]);\r" +
    "\n" +
    "			vars[hash[0]] = hash[1];\r" +
    "\n" +
    "		}\r" +
    "\n" +
    "		return vars;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    var underscore = angular.module('underscore', []);\r" +
    "\n" +
    "		underscore.factory('_', ['$window', function($window) {		\r" +
    "\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\r" +
    "\n" +
    "	}]);\r" +
    "\n" +
    "    \r" +
    "\n" +
    "\r" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\r" +
    "\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \r" +
    "\n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\r" +
    "\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{dashboardSettings.publishChannel}}}&quot;);\r" +
    "\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{dashboardSettings.subscribeChannel}}}&quot;);\r" +
    "\n" +
    "    }];\r" +
    "\n" +
    "\r" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\r" +
    "\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\r" +
    "\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\r" +
    "\n" +
    "    }]\r" +
    "\n" +
    "\r" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer', 'Thermometer', 'Display', &quot;ngAnimate&quot;, &quot;ngSanitize&quot;, 'Dygraphs', 'DataService', 'Plotly', 'MetricBox', 'Alert'])\r" +
    "\n" +
    "     angular.module('myApp').config(wssConfig);\r" +
    "\n" +
    "     angular.module('myApp').config(httpsConfig);\r" +
    "\n" +
    "     \r" +
    "\n" +
    "     myApp.config(function($interpolateProvider, $locationProvider) {\r" +
    "\n" +
    "        $interpolateProvider.startSymbol('{[{');\r" +
    "\n" +
    "        $interpolateProvider.endSymbol('}]}');\r" +
    "\n" +
    "        $locationProvider.html5Mode({\r" +
    "\n" +
    "          enabled: true,\r" +
    "\n" +
    "          requireBase: false\r" +
    "\n" +
    "        });\r" +
    "\n" +
    "     });\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  \r" +
    "\n" +
    "     myApp.controller('RootCtrl', function($scope, $interpolate, $location) {\r" +
    "\n" +
    "       var vm = this;\r" +
    "\n" +
    "       vm.gridsterOptions = {\r" +
    "\n" +
    "          defaultSizeY: 50,\r" +
    "\n" +
    "          defaultSizeX:50,\r" +
    "\n" +
    "          minRows: 1, // the minimum height of the grid, in rows\r" +
    "\n" +
    "          maxRows: 100,\r" +
    "\n" +
    "          columns: 10, // the width of the grid, in columns\r" +
    "\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\r" +
    "\n" +
    "          rowHeight: '50', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\r" +
    "\n" +
    "          margins: [10, 10], // the pixel distance between each widget\r" +
    "\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\r" +
    "\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\r" +
    "\n" +
    "          mobileBreakPoint:480, // if the screen is not wider that this, remove the grid layout and stack the items\r" +
    "\n" +
    "          minColumns: 1, // the minimum columns the grid must have\r" +
    "\n" +
    "          resizable: {\r" +
    "\n" +
    "            enabled: false\r" +
    "\n" +
    "          },\r" +
    "\n" +
    "          draggable: {\r" +
    "\n" +
    "             enabled: false\r" +
    "\n" +
    "          }\r" +
    "\n" +
    "       };\r" +
    "\n" +
    "       \r" +
    "\n" +
    "        vm.init = function() {\r" +
    "\n" +
    "          {{#each urlParams}}\r" +
    "\n" +
    "           	console.log(&quot;{{this}}&quot;, $location.search()[&quot;{{this}}&quot;])\r" +
    "\n" +
    "            vm.{{this}} = $location.search()[&quot;{{this}}&quot;]\r" +
    "\n" +
    "          {{/each}}\r" +
    "\n" +
    "        }\r" +
    "\n" +
    "        {{#each items}}\r" +
    "\n" +
    "           	{{#if this.formatFunction}}   \r" +
    "\n" +
    "                vm.{{this.formatFunction}} = function(data){\r" +
    "\n" +
    "                  {{{this.formatFunctionValue}}}\r" +
    "\n" +
    "                }\r" +
    "\n" +
    "           	{{/if}} \r" +
    "\n" +
    "        {{/each}}\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        {{#each items}}\r" +
    "\n" +
    "           	{{#if this.functions}}   \r" +
    "\n" +
    "            	{{#each this.functions}}\r" +
    "\n" +
    "                    vm.{{this.name}} = function(arguments){\r" +
    "\n" +
    "                      {{{this.value}}}\r" +
    "\n" +
    "                    }\r" +
    "\n" +
    "                 {{/each}}\r" +
    "\n" +
    "           	{{/if}} \r" +
    "\n" +
    "        {{/each}}\r" +
    "\n" +
    "     });\r" +
    "\n" +
    "        	\r" +
    "\n" +
    "})();\r" +
    "\n" +
    "  \r" +
    "\n" +
    "&lt;/script&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "   &lt;body class=&quot;dashboard-template dashboardTheme &quot;&gt;\r" +
    "\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot; class=&quot;dashboardContainer&quot;&gt; \r" +
    "\n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\r" +
    "\n" +
    "          &lt;ul&gt;\r" +
    "\n" +
    "             {{#each items}}\r" +
    "\n" +
    "                &lt;li class=&quot;myItem&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "						&lt;div class=&quot;box {{#if_eq  this.options.box-header \"false\"}} box-without-header {{/if_eq}}&quot;&gt;\r" +
    "\n" +
    "						  &lt;div class=&quot;box-header&quot;&gt;\r" +
    "\n" +
    "						    &lt;div class=&quot;box-label&quot;&gt;&lt;span tooltip-append-to-body=&quot;true&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot;&gt;{{this.options.boxLabel}}&lt;/span&gt;&lt;/div&gt;\r" +
    "\n" +
    "						  &lt;/div&gt;\r" +
    "\n" +
    "                          &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;\r" +
    "\n" +
    "						  &lt;div class=&quot;box-content&quot;&gt;\r" +
    "\n" +
    "						  		&lt;{{type}}\r" +
    "\n" +
    "                                    {{#buildAttr this.options }}\r" +
    "\n" +
    "                                        {{this}}\r" +
    "\n" +
    "                                    {{/buildAttr}}\r" +
    "\n" +
    "                                    {{#if this.formatFunction}}   \r" +
    "\n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\r" +
    "\n" +
    "                                    {{/if}} \r" +
    "\n" +
    "                           		&gt;\r" +
    "\n" +
    "                                \r" +
    "\n" +
    "                                {{#if this.functions}}   \r" +
    "\n" +
    "                                       {{#each this.functions}}\r" +
    "\n" +
    "                                  			{{this.attribute}}='vm.{{this.name}}'\r" +
    "\n" +
    "                                        {{/each}}\r" +
    "\n" +
    "                                    {{/if}} \r" +
    "\n" +
    "                                   \r" +
    "\n" +
    " \r" +
    "\n" +
    " \r" +
    "\n" +
    "          \r" +
    "\n" +
    " 					{{#if this.options.default-info-window}}\r" +
    "\n" +
    "                                &lt;info-window id=&quot;{{this.options.default-info-window.id}}&quot; template=&quot;{{this.options.default-info-window.template}}&quot; max-width=&quot;{{this.options.default-info-window.max-width}}&quot; max-height=&quot;{{this.options.default-info-window.max-height}}&quot;&gt;\r" +
    "\n" +
    "                                 &lt;/info-window&gt;\r" +
    "\n" +
    "                    {{/if}}\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "       			{{#if this.options.source-info-window}}\r" +
    "\n" +
    "                    	{{#each this.options.source-info-window}}\r" +
    "\n" +
    "                        		 &lt;info-window id=&quot;infoWindowTemplate_{{this.source}}&quot; template=&quot;{{this.template}}&quot; max-width=&quot;{{this.max-width}}&quot; max-height=&quot;{{this.max-height}}&quot;&gt;\r" +
    "\n" +
    "                                 &lt;/info-window&gt;\r" +
    "\n" +
    "                        {{/each}}\r" +
    "\n" +
    "                    {{/if}}\r" +
    "\n" +
    "                                &lt;/{{type}}&gt;\r" +
    "\n" +
    "						  &lt;/div&gt;\r" +
    "\n" +
    "						&lt;/div&gt;\r" +
    "\n" +
    "                &lt;/li&gt;\r" +
    "\n" +
    "             {{/each}}\r" +
    "\n" +
    "          &lt;/ul&gt;\r" +
    "\n" +
    "        &lt;/div&gt;\r" +
    "\n" +
    "      &lt;/div&gt;\r" +
    "\n" +
    "  &lt;/body&gt;  \r" +
    "\n" +
    "&lt;/html&gt;</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/ide/dashboardTemplate_ide.min',
    "<script type=text/x-handlebars-template id=handlebar-template>&lt;html ng-app=&quot;myApp&quot;&gt;\r" +
    "\n" +
    "&lt;head&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "    &lt;link rel=&quot;icon&quot; href=&quot;data:;base64,iVBORw0KGgo=&quot;&gt;\r" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; integrity=&quot;sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u&quot; crossorigin=&quot;anonymous&quot;&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;//use.fontawesome.com/3d61d6959e.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//{{{staticdomain}}}/lib/UIComponents/build/ide/css//components.min.css&quot;&gt;\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "    &lt;script src=&quot;//{{{staticdomain}}}/lib/UIComponents/build/ide/js/template_resources.min.js&quot;&gt;&lt;/script&gt;\r" +
    "\n" +
    "    \r" +
    "\n" +
    "&lt;/head&gt; \r" +
    "\n" +
    "  \r" +
    "\n" +
    "&lt;script&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "(function() {  \r" +
    "\n" +
    "   $.urlParam = function(name){\r" +
    "\n" +
    "	     var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);\r" +
    "\n" +
    "	     if (results==null){\r" +
    "\n" +
    "	         return null;\r" +
    "\n" +
    "	     }else{\r" +
    "\n" +
    "	         return results[1] || 0;\r" +
    "\n" +
    "	     }\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	$.getUrlVars = function() {\r" +
    "\n" +
    "		var vars = [], hash;\r" +
    "\n" +
    "		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&amp;');\r" +
    "\n" +
    "		for(var i = 0; i &lt; hashes.length; i++)\r" +
    "\n" +
    "		{\r" +
    "\n" +
    "			hash = hashes[i].split('=');\r" +
    "\n" +
    "			vars.push(hash[0]);\r" +
    "\n" +
    "			vars[hash[0]] = hash[1];\r" +
    "\n" +
    "		}\r" +
    "\n" +
    "		return vars;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	  \r" +
    "\n" +
    "\r" +
    "\n" +
    "      \r" +
    "\n" +
    "    var underscore = angular.module('underscore', []);\r" +
    "\n" +
    "		underscore.factory('_', ['$window', function($window) {		\r" +
    "\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\r" +
    "\n" +
    "	}]);\r" +
    "\n" +
    "    \r" +
    "\n" +
    "\r" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\r" +
    "\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \r" +
    "\n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\r" +
    "\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{transport.publishChannel}}}&quot;);\r" +
    "\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{transport.subscribeChannel}}}&quot;);\r" +
    "\n" +
    "    }];\r" +
    "\n" +
    "\r" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\r" +
    "\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\r" +
    "\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\r" +
    "\n" +
    "    }]\r" +
    "\n" +
    "\r" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Message', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer', 'Thermometer'])\r" +
    "\n" +
    "     \r" +
    "\n" +
    "     angular.module('myApp').run(cachedTemplates);  \r" +
    "\n" +
    "      \r" +
    "\n" +
    "     angular.module('myApp').config(wssConfig);\r" +
    "\n" +
    "     angular.module('myApp').config(httpsConfig);\r" +
    "\n" +
    "     \r" +
    "\n" +
    "     myApp.config(function($interpolateProvider, $locationProvider) {\r" +
    "\n" +
    "        $interpolateProvider.startSymbol('{[{');\r" +
    "\n" +
    "        $interpolateProvider.endSymbol('}]}');\r" +
    "\n" +
    "        $locationProvider.html5Mode({\r" +
    "\n" +
    "          enabled: true,\r" +
    "\n" +
    "          requireBase: false\r" +
    "\n" +
    "        });\r" +
    "\n" +
    "     });\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  \r" +
    "\n" +
    "     myApp.controller('RootCtrl', function($scope, $interpolate, $location) {\r" +
    "\n" +
    "       var vm = this;\r" +
    "\n" +
    "       vm.gridsterOptions = {\r" +
    "\n" +
    "          pushing: false,\r" +
    "\n" +
    "          \r" +
    "\n" +
    "          minRows: 1, // the minimum height of the grid, in rows\r" +
    "\n" +
    "          maxRows: 100,\r" +
    "\n" +
    "          columns: 5, // the width of the grid, in columns\r" +
    "\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\r" +
    "\n" +
    "          rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\r" +
    "\n" +
    "          margins: [10, 10], // the pixel distance between each widget\r" +
    "\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\r" +
    "\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\r" +
    "\n" +
    "          mobileBreakPoint: 1024, // if the screen is not wider that this, remove the grid layout and stack the items\r" +
    "\n" +
    "          minColumns: 1,\r" +
    "\n" +
    "          resizable: {\r" +
    "\n" +
    "            enabled: false\r" +
    "\n" +
    "          },\r" +
    "\n" +
    "          draggable: {\r" +
    "\n" +
    "             enabled: false\r" +
    "\n" +
    "          }\r" +
    "\n" +
    "       };\r" +
    "\n" +
    "       \r" +
    "\n" +
    "        vm.init = function() {\r" +
    "\n" +
    "          {{#each urlParams}}\r" +
    "\n" +
    "           	console.log(&quot;{{this}}&quot;, $location.search()[&quot;{{this}}&quot;])\r" +
    "\n" +
    "            vm.{{this}} = $location.search()[&quot;{{this}}&quot;]\r" +
    "\n" +
    "          {{/each}}\r" +
    "\n" +
    "        }\r" +
    "\n" +
    "        {{#each items}}\r" +
    "\n" +
    "           	{{#if this.formatFunction}}   \r" +
    "\n" +
    "                vm.{{this.formatFunction}} = function(data){\r" +
    "\n" +
    "                  {{this.formatFunctionValue}}\r" +
    "\n" +
    "                }\r" +
    "\n" +
    "           	{{/if}} \r" +
    "\n" +
    "        {{/each}}\r" +
    "\n" +
    "     });\r" +
    "\n" +
    "        	\r" +
    "\n" +
    "})();\r" +
    "\n" +
    "  \r" +
    "\n" +
    "&lt;/script&gt;\r" +
    "\n" +
    "\r" +
    "\n" +
    "    &lt;body&gt;\r" +
    "\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot;&gt; \r" +
    "\n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\r" +
    "\n" +
    "          &lt;ul&gt;\r" +
    "\n" +
    "             {{#each items}}\r" +
    "\n" +
    "                &lt;li class=&quot;myItem&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\r" +
    "\n" +
    "                    &lt;div class=&quot;box&quot;&gt;\r" +
    "\n" +
    "                        &lt;div class=&quot;box-content&quot;&gt;\r" +
    "\n" +
    "                          &lt;div  style=&quot;height: 30px;&quot; tooltip-placement=&quot;bottom&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot; class=&quot;box-label&quot;&gt;{{this.options.boxLabel}}&lt;/div&gt;\r" +
    "\n" +
    "                          &lt;div  style=&quot;height: calc(100% - 30px)&quot; &gt; &lt;{{type}}\r" +
    "\n" +
    "                           	      {{#buildAttr this.options }}\r" +
    "\n" +
    "                                        {{this}}\r" +
    "\n" +
    "                                  {{/buildAttr}}\r" +
    "\n" +
    "                                  {{#if this.formatFunction}}   \r" +
    "\n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\r" +
    "\n" +
    "                                  {{/if}} \r" +
    "\n" +
    "                           &gt;&lt;/{{type}}&gt; &lt;/div&gt;\r" +
    "\n" +
    "                        &lt;/div&gt;\r" +
    "\n" +
    "                    &lt;/div&gt;\r" +
    "\n" +
    "                &lt;/li&gt;\r" +
    "\n" +
    "             {{/each}}\r" +
    "\n" +
    "          &lt;/ul&gt;\r" +
    "\n" +
    "        &lt;/div&gt;\r" +
    "\n" +
    "      &lt;/div&gt;\r" +
    "\n" +
    "  &lt;/body&gt;  \r" +
    "\n" +
    "&lt;/html&gt;</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboardsList.html',
    "<dashboards-list></dashboards-list>"
  );
}])