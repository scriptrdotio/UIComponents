/**
 * dygraph directive for AngularJS
 *
 * Author: Chris Jackson
 *
 * License: MIT
 */
angular.module("angular-dygraphs", [
    'ngSanitize'
])
    .directive('ngDygraphs', ['$window', '$sce', function ($window, $sce) {
        return {
            restrict: 'E',
            scope: { // Isolate scope
                data: '=',
                options: '=',
                seriesVisibility: '=?',
                annotations: '=?'
            },
            template: 	'<div class="ng-dygraphs">' +             // Outer div to hold the whole directive
                              '<div class="graph" ng-class="{\'seriesVisibilityBar\': (seriesVisibility && seriesVisibility.length > 0)}"></div>' + 			  // Div for graph
            '<div class="series-container">' +                      // Div for series visibility
                  '<label ng-repeat="serie in seriesVisibility track by $index" ng-style="serie.colors && {color: serie.colors}"><input type=checkbox  ng-click="toggleSerieVisibility($index, serie)" ng-model="serie.visible" ng-checked="serie.visible">{{serie.labels}}</label>' +
                '</div>' +    
                        '</div>',                                            // Outer div
						

            link: function (scope, element, attrs) {

                var parent = element.parent();
                var mainDiv = element.children()[0];
                var chartDiv = $(mainDiv).children()[0];
				var graph_initialized = false;
                
                scope.toggleSerieVisibility = function toggleSerieVisibility(index, series) {
                    return graph.setVisibility(index, series.visible);
                };

                
               	var annotations = [];
                var legendElement = null;
                
                if (scope.options.showLabelsOnHighlight) {
                     scope.options.labelsDiv = "legend_" + scope.$id;
                    //create legends div
                    div = document.createElement("div");
                    div.id = "legend_" + scope.$id;
                    div.classList.add("dygraphs-legend");
                    mainDiv.appendChild(div);
                    
                    chartDiv.classList.add("with-legend");
                }else {
                    //var legendDiv = document.getElementById("legend_" + scope.$id);
                    $("#legend_" + scope.$id).hide();
                }
                
                scope.options.labelsSeparateLines = true;
                
                //scope.goals = scope.options.goals;
                //scope.goalLineColors = scope.options.goalLineColors;
                
                //delete scope.options.goals;
                //delete scope.options.goalLineColors;
                
                //scope.events = scope.options.events;
                //scope.eventLineColors = scope.options.eventLineColors;
                
                //delete scope.options.events;
                //delete scope.options.eventLineColors;
                
                scope.customGoals = scope.options.customGoals;
                scope.customEvents = scope.options.customEvents;
                
                delete scope.options.customGoals;
                delete scope.options.customEvents
                
                
                delete scope.options.legendPosition;

                var graph = new Dygraph(chartDiv, scope.data, scope.options);
                
                graph.ready(function() {
                    if(scope.annotations && scope.data)
                    	graph.setAnnotations(scope.annotations);
               });
                
                scope.$watch("annotations", function () {
                    if(scope.annotations && scope.data)
                    	graph.setAnnotations(scope.annotations);
                })
               // setTimeout( function(){ 
                //    graph.resize();
                //},1000);
                scope.$watch("data", function () {
                    var options = scope.options;
                    if (options === undefined) {
                        options = {};
                    }
                    options.file = scope.data;
                    options.underlayCallback = scope.underlayCallback;
                    //options.drawCallback = scope.drawCallback;                    
                    options.zoomCallback = scope.zoomCallback;
                    //resize();
                }, true);

                scope.$watch("options", function(newOptions){
                    graph.updateOptions(newOptions);
                    //resize();
                }, true);
                
               /** scope.zoomCallback = function(){
                    return;
                };**/
                
				scope.underlayCallback = function(canvas, area, g){
                    //fill the goals colors
                    var goals = _.sortBy(angular.copy(scope.customGoals), "goal").reverse(); //To get it in descending order
                    _.forEach(goals, function(item){
                        var splitDate = moment().valueOf();
                        var coords = g.toDomCoords(splitDate, item.goal);
                        // splitX and splitY are the coordinates on the canvas for (2006-11-19, 2.25).
                        var splitX = coords[0];
                        var splitY = coords[1];
                        canvas.fillStyle = item.color;
                        var topHeight = splitY - area.y;
                        if(!item.size || item.size == 0) {
                            var bottomHeight = area.h - topHeight;
                        	canvas.fillRect(area.x, splitY, area.w, bottomHeight);    
                        } else {
                            canvas.fillRect(area.x, splitY, area.w, item.size);   
                        }
                        

                    });
                    
                    
                    //Fill the events colors   
                    var events = _.sortBy(angular.copy(scope.customEvents), "event").reverse(); //To get it in descending order;
                     _.forEach(events, function(item){
                         canvas.fillStyle = item.color;
                         var dayOne = moment(item.event).add(-0.25, 'days');
                         var firstDateTime = dayOne.valueOf();

                         var nextDay = moment(item.event).add(0.25, 'days');
                         var nextDateTime = nextDay.valueOf();

                         var canvas_left_x = g.toDomXCoord(firstDateTime);
                         var canvas_right_x = g.toDomXCoord(nextDateTime);
                         var canvas_width = canvas_right_x - canvas_left_x;
                         
                          if(!item.size || item.size == 0) {
                        	canvas.fillRect(canvas_left_x, area.y, canvas_width, area.h);
                        } else {
                            canvas.fillRect(canvas_left_x, area.y, item.size, area.h);   
                        }
                         
                         
                     })
                    
                };
                /*resize();
                function resize() {
                    graph.resize();
                }*/
            }
        };
    }]);