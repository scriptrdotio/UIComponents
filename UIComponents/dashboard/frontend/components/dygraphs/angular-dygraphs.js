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
            },
            template: 	'<div class="ng-dygraphs">' +             // Outer div to hold the whole directive
                            '<div class="graph"></div>' + 			  // Div for graph
                        '</div>',                                            // Outer div
						

            link: function (scope, element, attrs) {

                var parent = element.parent();
                var mainDiv = element.children()[0];
                var chartDiv = $(mainDiv).children()[0];
				var graph_initialized = false;
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
                    scope.options.labelsDiv = "legend_"+scope.$id;
                }else {
                    //var legendDiv = document.getElementById("legend_" + scope.$id);
                    $("#legend_" + scope.$id).hide();
                }
                
                scope.options.labelsSeparateLines = true;
                scope.goals = scope.options.goals;
                scope.goalLineColors = scope.options.goalLineColors;
                
                delete scope.options.goals;
                delete scope.options.goalLineColors;
                
                scope.events = scope.options.events;
                scope.eventLineColors = scope.options.eventLineColors;
                
                delete scope.options.events;
                delete scope.options.eventLineColors;
                
                delete scope.options.legendPosition;
                
                

                //scope.options.interactionModel = Dygraph.nonInteractiveModel;   

                var graph = new Dygraph(chartDiv, scope.data, scope.options);
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
                    var goals = angular.copy(scope.goals);
                    if(goals && goals.length > 0){
                        var goalLineColors = angular.copy(scope.goalLineColors);

                        var colorsMapping = {};
                        //map the goals to their corresponding colors in an object before sorting the goals
                        for(var x=0; x<goals.length; x++){
                            if(goalLineColors[x]){
                                colorsMapping[goals[x]] = goalLineColors[x];
                            }
                        }
                        goals.sort(function(a, b){return a - b})
                        for(var x=goals.length-1; x>=0; x--){
                        	var goal = goals[x];
                            if(colorsMapping[goal]){
                                var splitDate = moment().valueOf();
                                var coords = g.toDomCoords(splitDate, goal);
                                // splitX and splitY are the coordinates on the canvas for (2006-11-19, 2.25).
                                var splitX = coords[0];
                                var splitY = coords[1];
                                canvas.fillStyle = colorsMapping[goal];
                                var topHeight = splitY - area.y;
                                var bottomHeight = area.h - topHeight;
                                canvas.fillRect(area.x, splitY, area.w, bottomHeight);    

                            }
                        }
                    }
                    //Fill the events colors   
                    var events = eval(scope.events);
                    if(false){
                        var eventLineColors = eval(scope.eventLineColors);

                        var colorsMapping = {};
                        //map the events to their corresponding colors in an object before sorting the events
                        for(var x=0; x<events.length; x++){
                            if(eventLineColors[x]){
                                colorsMapping[events[x]] = eventLineColors[x];
                            }
                        }
                        events.sort();
                        for(var x=events.length-1; x>=0; x--){
                            if(colorsMapping[events[x]]){
                                
                                canvas.fillStyle = colorsMapping[events[x]];
                                
                                var dayOne = new Date(events[x]);
                                dayOne.setDate(dayOne.getDate() - 0.25);
                                var firstDateTime = dayOne.getTime();
                                
                                var nextDay = new Date(events[x]);
								nextDay.setDate(nextDay.getDate() + 0.25);
                                var nextDateTime = nextDay.getTime();
                                
                                var canvas_left_x = g.toDomXCoord(firstDateTime);
				                var canvas_right_x = g.toDomXCoord(nextDateTime);
                                var canvas_width = canvas_right_x - canvas_left_x;
                                canvas.fillRect(canvas_left_x, area.y, canvas_width, area.h);
                                
                            }
                        }
                    }
					
                };
                /*resize();
                function resize() {
                    graph.resize();
                }*/
            }
        };
    }]);