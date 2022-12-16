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
                
                scope.customGoals =  scope.options.customGoals;
                scope.customEvents = scope.options.customEvents;
                scope.customRanges = scope.options.customRanges;
                
                //delete scope.options.customGoals;
                //delete scope.options.customEvents;
                //delete scope.options.customRanges
                
                
                //delete scope.options.legendPosition;
                
                var graphOptions = Object.assign({}, scope.options) //JSON.parse(JSON.stringify(scope.options));
                delete graphOptions.customGoals;
                delete graphOptions.customEvents;
                delete graphOptions.customRanges
                delete graphOptions.legendPosition;

                var graph = new Dygraph(chartDiv, scope.data, graphOptions);
                
                graph.ready(function() {
                    if(scope.annotations && scope.data)
                    	graph.setAnnotations(scope.annotations);
               });
                
                scope.$watch("annotations", function (newVal, oldVal) {
                    //if(scope.annotations && scope.data)
                    if(scope.annotations)
                    	graph.setAnnotations(scope.annotations);
                    else
                        graph.setAnnotations([]);
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

                scope.$watch("options", function(oldOptions, newOptions){
                    if(newOptions.customGoals) 
                        scope.customGoals = newOptions.customGoals;
                     if(newOptions.customEvents) 
                        scope.customEvents = newOptions.customEvents;
                     if(newOptions.customRanges) 
                        scope.customRanges = newOptions.customRanges;
                     
                    var graphNewOptions = Object.assign({}, newOptions)
					delete graphNewOptions.customGoals;
                	delete graphNewOptions.customEvents;
                	delete graphNewOptions.customRanges;
                    delete graphNewOptions.legendPosition;
                    graph.updateOptions(graphNewOptions);
                }, true);
                
               /** scope.zoomCallback = function(){
                    return;
                };**/
                
				scope.underlayCallback = function(canvas, area, g){
                    
                    
                    
                       //fill the ranges colors
                      var ranges = angular.copy(scope.customRanges)
                     
                    _.forEach(ranges, function(item){
                        var splitDate = moment().valueOf();
                        var axis = 0;
                        if(item.axis && item.axis.toLocaleLowerCase() == "y2") {
                            axis = 1;
                        }
                        
                        var previousItem = item;
                        var coordsMax = g.toDomCoords(splitDate, parseFloat(item.range[1]), axis);
                        var splitXMax = coordsMax[0];
                        var splitYMax = coordsMax[1];
                        canvas.fillStyle = item.color;
                        canvas.globalAlpha = (item.opacity) ? item.opacity : 1.0;
                       
                        var coordsMin = g.toDomCoords(splitDate, parseFloat(item.range[0]), axis);
                        var splitXMin = coordsMin[0];
                        var splitYMin = coordsMin[1];
                        var bottomHeight = splitYMax - splitYMin;
                        
                        //var bottomHeight = area.h - topHeight;
                        canvas.fillRect(area.x, splitYMin, area.w, bottomHeight);  
                        if(item.label) {
                            if (item.labelFont)
                                canvas.font = item.labelFont;
                            if (item.labelColor) {
                                 canvas.fillStyle = item.labelColor;
                                 canvas.globalAlpha = (item.labelOpacity) ? item.labelOpacity : 1.0;
                            }
                            //display label at the end of the goal line
                            canvas.textAlign = "end";
                            canvas.fillText( item.label, area.x + area.w -2, splitY - 2); 
                        }
                    });
                     //fill the goals colors
                      var goals = _.sortBy(angular.copy(scope.customGoals), "goal").reverse(); //To get it in descending order
                     
                    _.forEach(goals, function(item){
                        var splitDate = moment().valueOf();
                        var axis = 0;
                        if(item.axis && item.axis.toLocaleLowerCase() == "y2") {
                            axis = 1;
                        }
                        
                        var previousItem = item;
                        var coords = g.toDomCoords(splitDate, parseFloat(item.goal), axis);
                        var splitX = coords[0];
                        var splitY = coords[1];
                        canvas.fillStyle = item.color;
                        canvas.globalAlpha = (item.opacity) ? item.opacity : 1.0;
                        var topHeight = splitY - area.y;
                        if(!item.size || item.size == 0) {
                            var bottomHeight = area.h - topHeight;
                        	canvas.fillRect(area.x, splitY, area.w, bottomHeight);    
                        } else {
                            canvas.fillRect(area.x, splitY, area.w, item.size); 
                        }
                        if(item.label) {
                            if (item.labelFont)
                                canvas.font = item.labelFont;
                            if (item.labelColor) {
                                 canvas.fillStyle = item.labelColor;
                                 canvas.globalAlpha = (item.labelOpacity) ? item.labelOpacity : 1.0;
                            }
                            //display label at the end of the goal line
                            canvas.textAlign = "end";
                            //canvas.globalCompositeOperation='destination-over';
                            canvas.fillText( item.label, area.x + area.w -2, splitY - 2); 
                            /**if(item.axis && item.axis.toLocaleLowerCase() == "y2") {
                            		canvas.fillText(item.label, (area.w + scope.options.axes.y2.axisLabelWidth), splitY)
                        		} else {
                                    canvas.fillText(item.label, (0 - scope.options.axes.y2.axisLabelWidth), splitY)
                                }**/
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
