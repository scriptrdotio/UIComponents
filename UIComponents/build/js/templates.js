var cachedTemplates = (["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboard.html',
    "<dashboard load-tree=true tree-search-criteria=model.Car devices-model=modules/devicemodels/api/getSensors></dashboard>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboardTemplate.min',
    "<script type=text/x-handlebars-template id=handlebar-template>&lt;html ng-app=&quot;myApp&quot;&gt;\n" +
    "&lt;head&gt;\n" +
    "\n" +
    "    &lt;link rel=&quot;icon&quot; href=&quot;data:;base64,iVBORw0KGgo=&quot;&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; integrity=&quot;sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u&quot; crossorigin=&quot;anonymous&quot;&gt;\n" +
    "    &lt;script src=&quot;//use.fontawesome.com/3d61d6959e.js&quot;&gt;&lt;/script&gt;\n" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;/UIComponents/build/external/css/components.min.css&quot;&gt;\n" +
    "    \n" +
    "    &lt;!-- JQUERY Material  To use jQuery, simply ensure it is loaded before the angular.js file. --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_jquery_resources.min.js&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- Libraries --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_libraries.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- NG material --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_3.min.js&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- Directives --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/directives_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/directives_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/ag-grid/12.0.0/ag-grid.js?ignore=notused36&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- Components --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/components.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "&lt;/head&gt; \n" +
    "  \n" +
    "  \n" +
    "&lt;style&gt;\n" +
    ".box {\n" +
    "	/**border: none!important;**/\n" +
    "}\n" +
    "  \n" +
    "&lt;/style&gt;\n" +
    "&lt;script&gt;\n" +
    "\n" +
    "(function() {\n" +
    "  \n" +
    "   $.urlParam = function(name){\n" +
    "	     var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);\n" +
    "	     if (results==null){\n" +
    "	         return null;\n" +
    "	     }else{\n" +
    "	         return results[1] || 0;\n" +
    "	     }\n" +
    "	}\n" +
    "\n" +
    "	$.getUrlVars = function() {\n" +
    "		var vars = [], hash;\n" +
    "		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&amp;');\n" +
    "		for(var i = 0; i &lt; hashes.length; i++)\n" +
    "		{\n" +
    "			hash = hashes[i].split('=');\n" +
    "			vars.push(hash[0]);\n" +
    "			vars[hash[0]] = hash[1];\n" +
    "		}\n" +
    "		return vars;\n" +
    "	}\n" +
    "      \n" +
    "    var underscore = angular.module('underscore', []);\n" +
    "		underscore.factory('_', ['$window', function($window) {		\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\n" +
    "	}]);\n" +
    "    \n" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{transport.publishChannel}}}&quot;);\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{transport.subscribeChannel}}}&quot;);\n" +
    "    }];\n" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "    }]\n" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Message', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer'])\n" +
    "     \n" +
    "     angular.module('myApp').run(cachedTemplates);  \n" +
    "      \n" +
    "     angular.module('myApp').config(wssConfig);\n" +
    "     angular.module('myApp').config(httpsConfig);\n" +
    "     \n" +
    "     myApp.config(function($interpolateProvider, $locationProvider) {\n" +
    "        $interpolateProvider.startSymbol('{[{');\n" +
    "        $interpolateProvider.endSymbol('}]}');\n" +
    "        $locationProvider.html5Mode({\n" +
    "          enabled: true,\n" +
    "          requireBase: false\n" +
    "        });\n" +
    "     });\n" +
    "  \n" +
    "  \n" +
    "     myApp.controller('RootCtrl', function($scope, $interpolate, $location) {\n" +
    "       var vm = this;\n" +
    "       vm.gridsterOptions = {\n" +
    "          pushing: false,\n" +
    "          \n" +
    "          minRows: 1, // the minimum height of the grid, in rows\n" +
    "          maxRows: 100,\n" +
    "          columns: 5, // the width of the grid, in columns\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\n" +
    "          rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\n" +
    "          margins: [10, 10], // the pixel distance between each widget\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\n" +
    "          mobileBreakPoint: 1024, // if the screen is not wider that this, remove the grid layout and stack the items\n" +
    "          minColumns: 1,\n" +
    "          resizable: {\n" +
    "            enabled: false\n" +
    "          },\n" +
    "          draggable: {\n" +
    "             enabled: false\n" +
    "          }\n" +
    "       };\n" +
    "       \n" +
    "        vm.init = function() {\n" +
    "          {{#each urlParams}}\n" +
    "           	console.log(&quot;{{this}}&quot;, $location.search()[&quot;{{this}}&quot;])\n" +
    "            vm.{{this}} = $location.search()[&quot;{{this}}&quot;]\n" +
    "          {{/each}}\n" +
    "        }\n" +
    "        {{#each items}}\n" +
    "           	{{#if this.formatFunction}}   \n" +
    "                vm.{{this.formatFunction}} = function(data){\n" +
    "                  {{{this.formatFunctionValue}}}\n" +
    "                }\n" +
    "           	{{/if}} \n" +
    "        {{/each}}\n" +
    "     });\n" +
    "        	\n" +
    "})();\n" +
    "  \n" +
    "&lt;/script&gt;\n" +
    "\n" +
    "    &lt;body&gt;\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot;&gt; \n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\n" +
    "          &lt;ul&gt;\n" +
    "             {{#each items}}\n" +
    "                &lt;li class=&quot;myItem&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\n" +
    "                    &lt;div class=&quot;box&quot;&gt;\n" +
    "                        &lt;div class=&quot;box-content&quot;&gt;\n" +
    "                          &lt;div  style=&quot;height: 30px;&quot; tooltip-placement=&quot;bottom&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot; class=&quot;box-label&quot;&gt;{{this.options.boxLabel}}&lt;/div&gt;\n" +
    "                          &lt;div  style=&quot;height: calc(100% - 30px)&quot; &gt; &lt;{{type}}\n" +
    "                           	      {{#buildAttr this.options }}\n" +
    "                                        {{this}}\n" +
    "                                  {{/buildAttr}}\n" +
    "                                  {{#if this.formatFunction}}   \n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\n" +
    "                                  {{/if}} \n" +
    "                           &gt;&lt;/{{type}}&gt; &lt;/div&gt;\n" +
    "                        &lt;/div&gt;\n" +
    "                    &lt;/div&gt;\n" +
    "                &lt;/li&gt;\n" +
    "             {{/each}}\n" +
    "          &lt;/ul&gt;\n" +
    "        &lt;/div&gt;\n" +
    "      &lt;/div&gt;\n" +
    "  &lt;/body&gt;  \n" +
    "&lt;/html&gt;</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/ide/dashboardTemplate_ide.min',
    "<script type=text/x-handlebars-template id=handlebar-template>&lt;html ng-app=&quot;myApp&quot;&gt;\n" +
    "&lt;head&gt;\n" +
    "\n" +
    "    &lt;link rel=&quot;icon&quot; href=&quot;data:;base64,iVBORw0KGgo=&quot;&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; integrity=&quot;sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u&quot; crossorigin=&quot;anonymous&quot;&gt;\n" +
    "    &lt;script src=&quot;//use.fontawesome.com/3d61d6959e.js&quot;&gt;&lt;/script&gt;\n" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//{{{staticdomain}}}/lib/UIComponents/build/ide/css//components.min.css&quot;&gt;\n" +
    "    \n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//{{{staticdomain}}}/lib/UIComponents/build/ide/js/template_resources.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "&lt;/head&gt; \n" +
    "  \n" +
    "&lt;script&gt;\n" +
    "\n" +
    "(function() {  \n" +
    "   $.urlParam = function(name){\n" +
    "	     var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);\n" +
    "	     if (results==null){\n" +
    "	         return null;\n" +
    "	     }else{\n" +
    "	         return results[1] || 0;\n" +
    "	     }\n" +
    "	}\n" +
    "\n" +
    "	$.getUrlVars = function() {\n" +
    "		var vars = [], hash;\n" +
    "		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&amp;');\n" +
    "		for(var i = 0; i &lt; hashes.length; i++)\n" +
    "		{\n" +
    "			hash = hashes[i].split('=');\n" +
    "			vars.push(hash[0]);\n" +
    "			vars[hash[0]] = hash[1];\n" +
    "		}\n" +
    "		return vars;\n" +
    "	}\n" +
    "	  \n" +
    "\n" +
    "      \n" +
    "    var underscore = angular.module('underscore', []);\n" +
    "		underscore.factory('_', ['$window', function($window) {		\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\n" +
    "	}]);\n" +
    "    \n" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{transport.publishChannel}}}&quot;);\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{transport.subscribeChannel}}}&quot;);\n" +
    "    }];\n" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "    }]\n" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Message', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer', 'Thermometer'])\n" +
    "     \n" +
    "     angular.module('myApp').run(cachedTemplates);  \n" +
    "      \n" +
    "     angular.module('myApp').config(wssConfig);\n" +
    "     angular.module('myApp').config(httpsConfig);\n" +
    "     \n" +
    "     myApp.config(function($interpolateProvider, $locationProvider) {\n" +
    "        $interpolateProvider.startSymbol('{[{');\n" +
    "        $interpolateProvider.endSymbol('}]}');\n" +
    "        $locationProvider.html5Mode({\n" +
    "          enabled: true,\n" +
    "          requireBase: false\n" +
    "        });\n" +
    "     });\n" +
    "  \n" +
    "  \n" +
    "     myApp.controller('RootCtrl', function($scope, $interpolate, $location) {\n" +
    "       var vm = this;\n" +
    "       vm.gridsterOptions = {\n" +
    "          pushing: false,\n" +
    "          \n" +
    "          minRows: 1, // the minimum height of the grid, in rows\n" +
    "          maxRows: 100,\n" +
    "          columns: 5, // the width of the grid, in columns\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\n" +
    "          rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\n" +
    "          margins: [10, 10], // the pixel distance between each widget\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\n" +
    "          mobileBreakPoint: 1024, // if the screen is not wider that this, remove the grid layout and stack the items\n" +
    "          minColumns: 1,\n" +
    "          resizable: {\n" +
    "            enabled: false\n" +
    "          },\n" +
    "          draggable: {\n" +
    "             enabled: false\n" +
    "          }\n" +
    "       };\n" +
    "       \n" +
    "        vm.init = function() {\n" +
    "          {{#each urlParams}}\n" +
    "           	console.log(&quot;{{this}}&quot;, $location.search()[&quot;{{this}}&quot;])\n" +
    "            vm.{{this}} = $location.search()[&quot;{{this}}&quot;]\n" +
    "          {{/each}}\n" +
    "        }\n" +
    "        {{#each items}}\n" +
    "           	{{#if this.formatFunction}}   \n" +
    "                vm.{{this.formatFunction}} = function(data){\n" +
    "                  {{this.formatFunctionValue}}\n" +
    "                }\n" +
    "           	{{/if}} \n" +
    "        {{/each}}\n" +
    "     });\n" +
    "        	\n" +
    "})();\n" +
    "  \n" +
    "&lt;/script&gt;\n" +
    "\n" +
    "    &lt;body&gt;\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot;&gt; \n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\n" +
    "          &lt;ul&gt;\n" +
    "             {{#each items}}\n" +
    "                &lt;li class=&quot;myItem&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\n" +
    "                    &lt;div class=&quot;box&quot;&gt;\n" +
    "                        &lt;div class=&quot;box-content&quot;&gt;\n" +
    "                          &lt;div  style=&quot;height: 30px;&quot; tooltip-placement=&quot;bottom&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot; class=&quot;box-label&quot;&gt;{{this.options.boxLabel}}&lt;/div&gt;\n" +
    "                          &lt;div  style=&quot;height: calc(100% - 30px)&quot; &gt; &lt;{{type}}\n" +
    "                           	      {{#buildAttr this.options }}\n" +
    "                                        {{this}}\n" +
    "                                  {{/buildAttr}}\n" +
    "                                  {{#if this.formatFunction}}   \n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\n" +
    "                                  {{/if}} \n" +
    "                           &gt;&lt;/{{type}}&gt; &lt;/div&gt;\n" +
    "                        &lt;/div&gt;\n" +
    "                    &lt;/div&gt;\n" +
    "                &lt;/li&gt;\n" +
    "             {{/each}}\n" +
    "          &lt;/ul&gt;\n" +
    "        &lt;/div&gt;\n" +
    "      &lt;/div&gt;\n" +
    "  &lt;/body&gt;  \n" +
    "&lt;/html&gt;</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboardsList.html',
    "<dashboards-list></dashboards-list>"
  );
}])