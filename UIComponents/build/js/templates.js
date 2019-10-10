var cachedTemplates = (["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/UIComponents/dashboard/frontend/components/ACL/ACL.html',
    "<div class=acl-wrapper ng-click=\"$ctrl.showAccessControlList = true\"><span class=acl-btn ng-class=\"($ctrl.users.length == 1 && $ctrl.users[0].code == 'anonymous') ? 'unlocked' : 'locked'\"><a ng-click=$ctrl.openModal() href=javascript:void(0); uib-tooltip={{$ctrl.accessType}} tooltip-placement=right><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAARCAYAAADZsVyDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExOUI1NTNCNDc3MzExRTY4OEY2ODFFOTcxN0Q4QkIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExOUI1NTNDNDc3MzExRTY4OEY2ODFFOTcxN0Q4QkIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTE5QjU1Mzk0NzczMTFFNjg4RjY4MUU5NzE3RDhCQjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTE5QjU1M0E0NzczMTFFNjg4RjY4MUU5NzE3RDhCQjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6vZpebAAAB2UlEQVR42rSUv0sCYRjH37vu0BNNdG2Qk1ocEk53F1tapdnlqECac2hIbkloFOL8F8IlwqUmQZwOsUHBIZMWRSQHFVTyeh55kzc9Ray+8OX96eee93mfVy6TyRBQCOwh2+kDbCQSiR+TAlgHn5LfKQs+Yyf4P4ASKwZP/kkCbQ2aq23koXdkCU6Cn7cER8FPq8CoS7rpiG6MbgBN1uv1fbfbTVRVXQm+Z6JOriu/Vqt1gK3L5bIPBgMVTNLp9LmmaYN+v/+IaRUscmWsq2v4obfdbl9Mp1NpPB7P51Op1N1wOCROp/MN9sgsGGF+2vdbXQjKbreL4E+EdLvd+TyOUYFAwBeLxXaEhSInTCqWVC6X8RQnDofjcBZJKGTG43ETIuR1XTebzSbX6/VIPp+/EhaK3E+hN1YRy7LsbTQaynd0kUiEwEeIJEkkHA7PwHCZ6GsWbDD9V6u6Nk1zz2az7UJ+fZPJRAQQHn221ul0OGzxIzzPGwKTX4MCo7RdfgkejwF+qFartzAM5nI5DoAIJbVabQZWFOWlWCyGBeboGwnTMBqN5uNCocCx66VSScYYODjexk+MeQT4j0hEUXyHlGjYDwaDWqVSOaZFkN0WTJiy1Gn/iF34EmAAsBK5Pr0LIbQAAAAASUVORK5CYII=\" alt=restrictions> <i class=\"fa fa-lock acl-icon-locked red\"></i> <i class=\"fa fa-unlock-alt acl-icon acl-icon-unlocked light-green\"></i></a></span></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/dygraphs/dygraphs.html',
    "<div class=\"text-center loading\" ng-hide=$ctrl.datas><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><div class=parent><div class=\"alert alert-danger\" ng-show=$ctrl.noResults>No data to display</div></div><div ng-if=\"$ctrl.datas && !$ctrl.noResults\"><ng-dygraphs data=$ctrl.datas options=$ctrl.options legend=$ctrl.legend></ng-dygraphs></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/ACL/myModalContent.html',
    "<div class=acl-controls><div class=modal-header><h3 class=modal-title>Access Control List</h3></div><div class=modal-body><div ng-if=$ctrl.show uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')  + ' m10'\" close=$ctrl.closeAlert() dismiss-on-timeout=5000>{{$ctrl.message.content}}</div><h5 class=text-info>List of groups and devices allowed to run the script <a href=javascript:void(0); class=text-primary uib-popover-html=$ctrl.popoverContent popover-placement=right><i class=\"fa fa-question-circle\"></i></a></h5><div ng-show=$ctrl.showMsg class=\"col-xs-12 center-div alert fadeIn animated alert-info\"><div class=\"col-xs-9 pdl0\"><div class=\"mt8 ml10\"><span>Access permission to the \"anonymous\" predefined group allows anyone to serve the file. Adding it to your access control list will automatically remove any other groups or devices. Are you sure you want to continue?</span></div></div><div class=\"col-xs-3 pdr0 text-right\"><button ng-click=$ctrl.removeAnonymousAccess() type=button class=\"btn btn-default btn-sm mr5\">No</button> <button ng-click=$ctrl.addAnonymousAccess() type=button class=\"btn btn-primary btn-sm\">Yes</button></div></div><scriptr-autocomplete id=devicesList placeholder=\"Select a user/group\" pause=400 hide-list=false search-fields=code default-set-object=$ctrl.defaultSetObject selected-object=$ctrl.onSelect title-field=code objects=$ctrl.users clear-selected=true description-field=description image-field=pic list-selected-object=true minlength=0 text-no-results=\"No results\" text-searching=Searching... transport=https on-format-data=$ctrl.callback api=UIComponents/dashboard/frontend/examples/list/getDevices input-class=\"form-control form-control-small\"></scriptr-autocomplete><div class=clearfix></div><div class=\"italic text-muted fnt12 mt10\"><i class=\"fa fa-info-circle\" aria-hidden=true></i><span id=permissionsNote> Note that removing scriptr device from the access control list will prevent you from serving the file from the IDE.</span></div></div><div class=modal-footer><button type=button class=\"btn btn-default\" ng-click=$ctrl.onCancel()>Close</button> <button type=button class=\"btn btn-warning\" ng-click=$ctrl.updateFileACL()>Save changes</button></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/chart/chart.html',
    "<div class=\"text-center loading\" ng-hide=$ctrl.datas><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><div class=padder10><div ng-show=$ctrl.noResults class=\"alert alert-danger\">No data to display</div></div><div ng-if=\"$ctrl.datas.length > 0\"><div ng-if=\"$ctrl.type == 'line'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div style=\"height: 85%; width: 100%\" line-data=$ctrl.datas line-xkey={{$ctrl.xkey}} line-ykeys=$ctrl.ykeys line-labels=$ctrl.labels line-colors=$ctrl.colors line-line-width=$ctrl.lineWidth line-point-size=$ctrl.pointSize line-point-fill-colors=$ctrl.pointFillColors line-point-stroke-colors=$ctrl.pointStrokeColors line-ymax=$ctrl.ymax line-ymin=$ctrl.ymin line-smooth=$ctrl.smooth line-hide-hover=$ctrl.hideHover line-hover-callback=$ctrl.hoverCallback line-parse-time=$ctrl.parseTime line-units=$ctrl.units line-post-units=$ctrl.postUnits line-pre-units=$ctrl.preUnits line-line-date-format=$ctrl.dateFormat(x) line-x-labels=$ctrl.xlabels line-x-label-format=$ctrl.xlabelFormat(x) line-x-label-angle=$ctrl.xlabelAngle line-y-label-format=$ctrl.ylabelFormat(y) line-goals=$ctrl.goals line-goal-stroke-width=$ctrl.goalStrokeWidth line-goal-line-colors=$ctrl.goalLineColors line-events=$ctrl.events line-event-stroke-width=$ctrl.eventStrokeWidth line-event-line-colors=$ctrl.eventLineColors line-continuous-line=$ctrl.continuousLine line-axes=$ctrl.axes line-grid=$ctrl.grid line-grid-text-color=$ctrl.gridTextColor line-grid-text-size=$ctrl.gridTextSize , line-grid-text-family=$ctrl.gridTextFamily line-grid-text-weight=$ctrl.gridTextWeight line-fill-opacity=$ctrl.fillOpacity line-resize=$ctrl.resize line-chart></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'bar'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div style=\"height: 85%; width: 100%\" bar-data=$ctrl.datas bar-x={{$ctrl.xkey}} bar-y=$ctrl.ykeys bar-labels=$ctrl.labels bar-colors=$ctrl.colors bar-resize=$ctrl.resize bar-stacked=$ctrl.stacked bar-hide-hover=$ctrl.hideHover bar-hover-callback=$ctrl.hoverCallback bar-grid=$ctrl.grid bar-grid-text-color=$ctrl.gridTextColor bar-grid-text-size=$ctrl.gridTextSize , bar-grid-text-family=$ctrl.gridTextFamily bar-grid-text-weight=$ctrl.gridTextWeight bar-axes=$ctrl.axes bar-ymax=$ctrl.ymax bar-ymin=$ctrl.ymin bar-goals=$ctrl.goals bar-goal-stroke-width=$ctrl.goalStrokeWidth bar-goal-line-colors=$ctrl.goalLineColors bar-x-label-angle=$ctrl.xlabelAngle bar-y-label-format=$ctrl.ylabelFormat(y) bar-parse-time=$ctrl.parseTime bar-events=$ctrl.events bar-event-stroke-width=$ctrl.eventStrokeWidth bar-event-line-colors=$ctrl.eventLineColors bar-post-units=$ctrl.postUnits bar-pre-units=$ctrl.preUnits bar-chart></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'area'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div style=\"height: 85%; width: 100%\" area-chart line-colors=$ctrl.colors area-data=$ctrl.datas area-xkey={{$ctrl.xkey}} area-ykeys=$ctrl.ykeys area-labels=$ctrl.labels area-line-width=$ctrl.lineWidth area-point-size=$ctrl.pointSize area-point-fill-colors=$ctrl.pointFillColors area-point-stroke-colors=$ctrl.pointStrokeColors area-ymax=$ctrl.ymax area-ymin=$ctrl.ymin area-smooth=$ctrl.smooth area-hide-hover=$ctrl.hideHover area-hover-callback=\"$ctrl.hoverCallback(index, options, content, row)\" area-parse-time=$ctrl.parseTime area-units=$ctrl.units area-post-units=$ctrl.postUnits area-pre-units=$ctrl.preUnits area-area-date-format=$ctrl.dateFormat(x) area-x-labels=$ctrl.xlabels area-x-label-format=$ctrl.xlabelFormat(x) area-x-label-angle=$ctrl.xlabelAngle area-y-label-format=$ctrl.ylabelFormat(y) area-goals=$ctrl.goals area-goal-stroke-width=$ctrl.goalStrokeWidth area-goal-line-colors=$ctrl.goalLineColors area-events=$ctrl.events area-event-stroke-width=$ctrl.eventStrokeWidth area-event-line-colors=$ctrl.eventLineColors area-continuous-line=$ctrl.continuousLine area-axes=$ctrl.axes area-grid=$ctrl.grid area-grid-text-color=$ctrl.gridTextColor area-grid-text-size=$ctrl.gridTextSize , area-grid-text-family=$ctrl.gridTextFamily area-grid-text-weight=$ctrl.gridTextWeight area-fill-opacity=$ctrl.fillOpacity area-resize=$ctrl.resize area-behave-like-line=$ctrl.behaveLikeLine></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'donut'\" style=\"height: 85%; width: 100%\" donut-data=$ctrl.datas donut-label-color=$ctrl.labelColor donut-background-color=$ctrl.backgroundColor donut-colors=$ctrl.colors donut-formatter=$ctrl.donutFormatter(y,data) donut-resize=$ctrl.resize donut-chart></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/gauge/gauge.html',
    "<div style=\"width: {{$ctrl.width}}%; height: {{$ctrl.height}}{{$ctrl.heightUnit}};\" class=gauge><div value={{$ctrl.gaugeValue}} value-font-color={{$ctrl.valueFontColor}} min={{$ctrl.min}} max={{$ctrl.max}} hide-min-max={{$ctrl.hideMinMax}} hide-value={{$ctrl.hideValue}} show-inner-shadow={{$ctrl.showInnerShadow}} gauge-color={{$ctrl.gaugeColor}} shadow-opacity={{$ctrl.shadowOpacity}} shadow-size={{$ctrl.shadowSize}} custom-sectors={{$ctrl.customSectors}} label={{$ctrl.label}} label-font-color={{$ctrl.labelFontColor}} start-animation-type={{$ctrl.startAnimationType}} refresh-animation-type={{$ctrl.refreshAnimationType}} counter={{$ctrl.counter}} value-font-family={{$ctrl.valueFontFamily}} relative-gauge-size={{$ctrl.relativeGaugeSize}} value-min-font-size={{$ctrl.valueMinFontSize}} label-min-font-size={{$ctrl.labelMinFontSize}} min-label-min-font-size={{$ctrl.minLabelMinFontSize}} max-label-min-font-size={{$ctrl.maxLabelMinFontSize}} gauge-width-scale={{$ctrl.gaugeWidthScale}} shadow-vertical-offset={{$ctrl.shadowVerticalOffset}} level-colors={{$ctrl.levelColors}} no-gradient={{$ctrl.noGradient}} start-animation-time={{$ctrl.startAnimationTime}} refresh-animation-time={{$ctrl.refreshAnimationTime}} donut={{$ctrl.donut}} donut-start-angle={{$ctrl.donutStartAngle}} reverse={{$ctrl.reverse}} decimals={{$ctrl.decimals}} symbol={{$ctrl.symbol}} format-number={{$ctrl.formatNumber}} human-friendly={{$ctrl.humanFriendly}} human-friendly-decimal={{$ctrl.humanFriendlyDecimal}} on-animation-end={{$ctrl.onAnimationEnd}} pointer={{$ctrl.pointer}} justgage></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/grid/grid.html',
    "<div class=filter-bar><div class={{$ctrl.class}}><form><div ng-show=\"$ctrl.enableClientSideFilter && $ctrl.mode == 'normal'\" class=\"form-group col-xs-12 col-sm-6\"><div class=form-group><input class=form-control ng-change=$ctrl.onFilterChanged() ng-model=$ctrl.quickFilterValue placeholder=\"Client filter\"></div></div><div ng-show=\"$ctrl.enableServerSideFilter && $ctrl.mode == 'infinite'\" class=\"form-group col-xs-12 col-sm-6\"><div class=form-group><input class=form-control ng-change=$ctrl.onServerFilterChanged() ng-model=$ctrl.serverFilterText placeholder=\"Server filter\"></div></div><div class=\"col-xs-12 col-sm-6 pull-right text-right\"><button ng-hide={{$ctrl.enableDeleteRow}} ng-click=$ctrl.openConfirmationPopUp() class=\"btn btn-default mt4\" tooltip-placement=left uib-tooltip=\"Delete selected row\"><i class=\"fa fa-close\" aria-hidden=true></i></button> <button ng-hide={{$ctrl.enableAddRow}} ng-click=$ctrl.onAddRow() class=\"btn btn-warning mt4\" tooltip-placement=bottom uib-tooltip=\"Insert row\"><i class=\"fa fa-plus\" aria-hidden=true></i></button></div></form></div></div><div class=col-xs-12 ng-show=$ctrl.showError><div class=alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')\">{{$ctrl.message.content}}</div></div><div class=clearfix></div><div class=col-xs-12><div ag-grid=$ctrl.gridOptions class=ag-bootstrap ng-style=$ctrl.style></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/grid/popup.html',
    "<div class=modal-header><h3 class=modal-title>Delete</h3></div><div class=modal-body>Are you sure you want to delete the selected row(s)?</div><div class=modal-footer><button class=\"btn btn-warning\" type=button ng-click=$ctrl.onCancel()>No</button> <button class=\"btn btn-warning\" type=button ng-click=$ctrl.onSubmit()>Yes</button></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/list/autocomplete.html',
    "<div><span ng-show=$ctrl.showList ng-hide=$ctrl.hideObjects class=script-wrap ng-if=$ctrl.listSelectedObject ng-repeat=\"obj in $ctrl.objects track by $index\"><span style=\"position: relative;\"><span class=script-text uib-tooltip={{obj[$ctrl.titleField]}} tooltip-placement=bottom><i class=\"mr5 text-primary {{obj.icon}}\"></i> {{obj[$ctrl.titleField]}}</span> <a ng-if=\"obj[$ctrl.titleField] != 'nobody'\" href=javascript:void(0); ng-click=$ctrl.addObjectToList(obj) uib-tooltip=Remove tooltip-placement=right><i class=\"fa fa-close\"></i></a></span></span><div class=clearfix></div><div class=\"text-center loading\" ng-show=!$ctrl.showList><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><angucomplete-alt ng-show=$ctrl.showList id={{$ctrl.id}} placeholder={{$ctrl.placeholder}} default-set-object=$ctrl.defaultSetObject pause={{$ctrl.pause}} hide-objects=$ctrl.hideObjects list-selected-object=$ctrl.listSelectedObject objects=$ctrl.objects selected-object=$ctrl.selectedObject local-data=$ctrl.localData image-field={{$ctrl.imageField}} search-fields={{$ctrl.searchFields}} title-field={{$ctrl.titleField}} description-field={{$ctrl.descriptionField}} image-field={{$ctrl.imageField}} minlength={{$ctrl.minlength}} input-class={{$ctrl.inputClass}} match-class={{$ctrl.matchClass}} maxlength={{$ctrl.maxlength}} selected-object-data=$ctrl.selectedObjectData input-name={{$ctrl.inputName}} clear-selected={{$ctrl.clearSelected}} override-suggestions={{$ctrl.overrideSuggestions}} field-required=$ctrl.fieldRequired field-required-class={{$ctrl.fieldRequiredClass}} initial-value=$ctrl.initialValue input-changed=$ctrl.inputChanged auto-match=$ctrl.autoMatch focus-in=$ctrl.focusIn focus-out=$ctrl.focusOut disable-input=$ctrl.disableInput focus-first=$ctrl.focusFirst field-tabindex={{$ctrl.fieldTabindex}} text-searching={{$ctrl.textSearching}} text-no-results={{$ctrl.textNoResults}}></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/map/map.html',
    "<div style=\"height: 90%;\"> \r" +
    "\n" +
    "    <section class=\"map-wrap\" ng-if=\"$ctrl.clusteredView == true || $ctrl.showDetailedMap == false\">\r" +
    "\n" +
    "        <ng-map id=\"{{'clustered-'+$ctrl.$wdgid}}\" on-zoom_changed=\"$ctrl.onClusteredZoomChanged();\"\r" +
    "\n" +
    "                single-info-window=\"true\" zoom-to-inlude-markers=\"true\"\r" +
    "\n" +
    "                center=\"{{$ctrl.mapcenter || $ctrl.defaultCenter}}\"\r" +
    "\n" +
    "                zoom=\"{{$ctrl.clusterZoom}}\">\r" +
    "\n" +
    "            <!--heatmap-layer ng-if=\"$ctrl.heatmap == true\"></heatmap-layer-->\r" +
    "\n" +
    "        </ng-map>\r" +
    "\n" +
    "          <div  class=\"heatmap\" ng-if=\"$ctrl.heatmap == true\">\r" +
    "\n" +
    "                <h5>Enable Heatmap</h5>\r" +
    "\n" +
    "                  <span>\r" +
    "\n" +
    "                    <scriptr-toggle-switch resize=\"false\" on-switch-change=\"$ctrl.activateHeatMap\" switch-status=\"$ctrl.switchStatus\"class=\"switch-success switch-small\"></scriptr-toggle-switch>\r" +
    "\n" +
    "                  </span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </section>\r" +
    "\n" +
    "	<section class=\"map-wrap\" ng-if=\"$ctrl.clusteredView == false || $ctrl.showDetailedMap == true\">\r" +
    "\n" +
    "		<ng-map id=\"{{'detailed-'+$ctrl.$wdgid}}\" on-zoom_changed=\"$ctrl.onDetailedZoomChanged();\"\r" +
    "\n" +
    "			single-info-window=\"true\" zoom-to-inlude-markers=\"true\"\r" +
    "\n" +
    "			center=\"{{$ctrl.mapcenter || $ctrl.defaultcenter}}\"\r" +
    "\n" +
    "			zoom=\"{{$ctrl.detailedmapzoom}}\">\r" +
    "\n" +
    "            <drawing-manager ng-if=\"$ctrl.geofenceManager == true\"\r" +
    "\n" +
    "                on-overlaycomplete=\"$ctrl.onMapOverlayCompleted()\"\r" +
    "\n" +
    "                drawing-control-options=\"{{$ctrl.drawingOptions}}\"\r" +
    "\n" +
    "                drawingControl=\"{{$ctrl.drawingControl}}\"\r" +
    "\n" +
    "                drawingMode=\"null\"\r" +
    "\n" +
    "                rectangleOptions=\"{{$ctrl.overlaySettings}}\"\r" +
    "\n" +
    "               >\r" +
    "\n" +
    "              </drawing-manager>\r" +
    "\n" +
    "		<div>\r" +
    "\n" +
    "			<div ng-repeat=\"(key, asset) in $ctrl.displayedAssets\">\r" +
    "\n" +
    "				<shape name=\"polyline\" path=\"{{asset.path}}\"\r" +
    "\n" +
    "					stroke-color=\"{{asset.pathColor}}\"\r" +
    "\n" +
    "					stroke-opacity=\"{{asset.strokeOpacity}}\"\r" +
    "\n" +
    "					stroke-width=\"{{asset.strokeWeight}}\" icons=\"{{asset.pathIcon}}\">\r" +
    "\n" +
    "				</shape>\r" +
    "\n" +
    "				<div ng-repeat=\"marker in asset.markers track by $index\">\r" +
    "\n" +
    "					<div ng-if=\"$ctrl.trackedAsset == null\">\r" +
    "\n" +
    "						<marker position=\"{{marker.position}}\" title=\"{{marker.display}}\" animation={{marker.animation}}\r" +
    "\n" +
    "							icon=\"{{marker.icon}}\" data=\"{{marker.assetKey}}\"\r" +
    "\n" +
    "							on-click=\"$ctrl.showAssetInfo(event, marker, '{{marker.assetKey}}', '{{marker.tripKey}}', '{{marker.id}}')\">\r" +
    "\n" +
    "						</marker>\r" +
    "\n" +
    "					</div>\r" +
    "\n" +
    "					<div ng-if=\"$ctrl.trackedAsset !=null\">\r" +
    "\n" +
    "						<marker position=\"{{marker.position}}\" title=\"{{marker.title}}\" animation={{marker.animation}}\r" +
    "\n" +
    "							icon=\"{{marker.icon}}\" clickable=\"false\">\r" +
    "\n" +
    "					</div>\r" +
    "\n" +
    "				</div>\r" +
    "\n" +
    "				<!-- end trip markers loop -->\r" +
    "\n" +
    "			</div>\r" +
    "\n" +
    "		</div>\r" +
    "\n" +
    "        <div ng-if=\"$ctrl.selectedAsset != null && $ctrl.markerInfoWindow == true\"  >\r" +
    "\n" +
    "			<div ng-transclude></div>\r" +
    "\n" +
    "          	<info-window id=\"{{'infoWindowTemplate_default_'+$ctrl.$wdgid}}\">\r" +
    "\n" +
    "              	<div ng-non-bindable=\"\">\r" +
    "\n" +
    "                  <!-- begin table -->\r" +
    "\n" +
    "                  <table class=\"table table-bordered\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                      <tr>\r" +
    "\n" +
    "                        <th ng-repeat=\"(key, value) in marker.details\">{{key}}</th>\r" +
    "\n" +
    "                      </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                      <tr>\r" +
    "\n" +
    "                        <td ng-repeat=\"(key, value) in marker.details\">{{value.value || \"N/A\"}}</td>\r" +
    "\n" +
    "                      </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                  </table>\r" +
    "\n" +
    "               </div>\r" +
    "\n" +
    "          	</info-window>\r" +
    "\n" +
    "		</div>\r" +
    "\n" +
    "        <!--heatmap-layer ng-if=\"$ctrl.heatmap == true\"></heatmap-layer-->     \r" +
    "\n" +
    "		</ng-map>\r" +
    "\n" +
    "          \r" +
    "\n" +
    "        <div  class=\"messages\" ng-show=\"$ctrl.drawingMessages != null\">\r" +
    "\n" +
    "            <div class=\"alert alert-warning\">\r" +
    "\n" +
    "              {{$ctrl.drawingMessages}}\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div  class=\"heatmap\" ng-if=\"$ctrl.heatmap == true\">\r" +
    "\n" +
    "                <h5>Enable Heatmap</h5>\r" +
    "\n" +
    "                  <span>\r" +
    "\n" +
    "                    <scriptr-toggle-switch resize=\"false\" on-switch-change=\"$ctrl.activateHeatMap\" switch-status=\"$ctrl.switchStatus\"class=\"switch-success switch-small\"></scriptr-toggle-switch>\r" +
    "\n" +
    "                  </span>\r" +
    "\n" +
    "        </div>         \r" +
    "\n" +
    "        <div ng-if=\"$ctrl.geofenceManager == true\" class=\"drawingmanager-buttons\">\r" +
    "\n" +
    "            <span>\r" +
    "\n" +
    "              <a ng-click=\"$ctrl.removeGeofence()\" data-toggle=\"tooltip\" title=\"Delete geofence\" data-placement=\"bottom\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a>\r" +
    "\n" +
    "              <a  ng-click=\"$ctrl.saveGeofence()\" data-toggle=\"tooltip\" title=\"Save geofence\" data-placement=\"bottom\"><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></a>\r" +
    "\n" +
    "              <a type=\"button\" data-toggle=\"tooltip\" title=\"Locate geofence\" ng-click=\"$ctrl.focusGeofence()\" data-placement=\"bottom\"><i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i></a>\r" +
    "\n" +
    "              <a type=\"button\" data-toggle=\"tooltip\" title=\"Locate vehicle\" ng-click=\"$ctrl.focusVehicle()\" data-placement=\"bottom\"><i class=\"fa fa-car aria-hidden=\"true\"></i> </a>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "	</section>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/progressBar/progressBar.html',
    "<uib-progressbar ng-if=!$ctrl.stacked value=$ctrl.value title={{$ctrl.title}} max=$ctrl.max animate=$ctrl.animate type={{$ctrl.type}} class={{$ctrl.class}}></uib-progressbar><uib-progress ng-if=$ctrl.stacked class={{$ctrl.class}}><uib-bar ng-repeat=\"bar in $ctrl.stacked track by $index\" value=bar.value title={{bar.title}} type={{bar.type}}>{{bar.value}}%</uib-bar></uib-progress>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
    "<div><div ng-style=$ctrl.style class=thermowrapper><tg-thermometer-vertical value={{$ctrl.value}} unit={{$ctrl.thermoUnit}} percent={{$ctrl.percent}} sectors=$ctrl.sectors ticks=$ctrl.ticks height={{$ctrl.height}} mercury-color=$ctrl.mercuryColor ng-show=!$ctrl.noResults></tg-thermometer-vertical></div><div class=parent><div class=\"alert alert-danger\" ng-show=$ctrl.noResults>No data to display</div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/thermometer/tg_thermometer_vertical.html',
    "<div style=\"height: 90%\" class=tg-thermometer style=display:none><div class=draw-a></div><div class=draw-b><div style=\"width: 6px;position: absolute;\r" +
    "\n" +
    "            left: 0;\r" +
    "\n" +
    "            right: 0;\r" +
    "\n" +
    "            width: 10px;\r" +
    "\n" +
    "            top: 0;\r" +
    "\n" +
    "            margin: auto;\r" +
    "\n" +
    "            height: 20px;\r" +
    "\n" +
    "            border-radius: 10px 10px 0 0;background-color: {{mercuryColor}};\"></div><div style=\"width: 14px;height: 14px; position: absolute;\r" +
    "\n" +
    "            left: 0;\r" +
    "\n" +
    "            right: 0;\r" +
    "\n" +
    "            top: 0;\r" +
    "\n" +
    "            bottom: 0;\r" +
    "\n" +
    "            margin: auto;\r" +
    "\n" +
    "            width: 24px;\r" +
    "\n" +
    "            height: 24px;\r" +
    "\n" +
    "            border-radius: 50%; background-color: {{mercuryColor}};\"></div></div><div class=meter><div class=statistics><div class=percent style=\"bottom: calc({{val.percent}}% - 2px);\" ng-repeat=\"val in ticks track by $index\">{{val.tick}}{{unit}}</div></div><div style=\"height: {{percent}}%; background-color: {{mercuryColor}}\" class=mercury><div class=percent-current>{{value}}{{unit}}</div><div class=mask><div class=bg-color style=\"height: calc({{height}}% - 57px); background: {{mercuryColor}};\"></div></div></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/odometer/odometer.html',
    "<div ng-style=$ctrl.style><span odometer=$ctrl.odometerValue odometer-options=$ctrl.odometerOptions></span></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/searchBox/searchBox.html',
    "<div class=row><div class=\"col-xs-12 col-md-8\"><input class=\"form-control input-sm\" ng-keyup=\"$event.keyCode == 13 ? $ctrl.onFilterChanged() : null\" ng-model=$ctrl.searchValue placeholder={{$ctrl.searchText}}></div><div class=\"col-xs-12 col-md-4\"><button ng-click=$ctrl.onFilterChanged() class=\"btn btn-primary btn-sm btn-block\">Go</button></div><div ng-show=$ctrl.noResults class=\"col-xs-12 alert\"><span class=\"alert alert-danger col-xs-12\">no results</span></div></div><div><div class=\"text-center loading\" ng-show=$ctrl.searching><i class=\"fa fa-spinner fa-spin fa-2x\"></i></div><abn-tree tree-data=$ctrl.treeData tree-control=$ctrl.treeControl icon-leaf={{$ctrl.iconLeaf}} icon-expand={{$ctrl.iconExpand}} icon-collapse={{$ctrl.iconCollapse}} on-select=$ctrl.onSelect(branch) expand-level=$ctrl.expandLevel initial-selection=$ctrl.initialSelection></abn-tree></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/speedometer/speedometer.html',
    "<div class=speedometer-wrapper></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/accelerometer/accelerometer.html',
    "<div class=accelerometer-wrapper><div class=\"line y\" ng-style=\"{ 'transform' :  $ctrl.yLine, 'border': '1px solid blue' }\"></div><div class=line ng-style=\"{ 'transform':  $ctrl.xLine}\"></div><div class=angle ng-style=\"{ 'transform':  $ctrl.angle }\"></div><div class=guideX></div><div class=guideY></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/button/button.html',
    "<div ng-style=$ctrl.style><button ng-if=$ctrl.isDisabled disabled class=\"{{$ctrl.class}} is-disabled ui-button\" ng-click=$ctrl.success() promise-btn=$ctrl.successPromise>{{$ctrl.label}}</button> <button ng-if=!$ctrl.isDisabled class=\"{{$ctrl.class}} ui-button\" ng-click=$ctrl.success() promise-btn=$ctrl.successPromise>{{$ctrl.label}}</button></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/slider/slider.html',
    "<div ng-if=$ctrl.max ng-style=$ctrl.style style=\"display: none;\"><rzslider class={{$ctrl.theme}} rz-slider-model=$ctrl.min rz-slider-high=$ctrl.max rz-slider-options=$ctrl.options></rzslider></div><div ng-if=!$ctrl.max ng-style=$ctrl.style style=\"display: none;\"><rzslider class={{$ctrl.theme}} rz-slider-model=$ctrl.min rz-slider-options=$ctrl.options></rzslider></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/IFrame/IFrame.html',
    "<iframe style=\"height: 90%; width: 100%\" ng-if=$ctrl.link src={{$ctrl.trustSrc($ctrl.link)}} frameborder=0 allowfullscreen></iframe><h3 ng-if=!$ctrl.link>No URL set</h3>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/toggleSwitch/toggle_switch.html',
    "<div ng-click=$ctrl.publishData() ng-style=$ctrl.style><toggle-switch ng-model=$ctrl.switchStatus on-label={{$ctrl.onLabel}} off-label={{$ctrl.offLabel}} knob-label={{$ctrl.knobLabel}} is-disabled=$ctrl.isDisabled class={{$ctrl.class}}></toggle-switch></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/3dsurface.html',
    "<div class=surface><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl.layout></angular-plotly></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/windrose.html',
    "<div class=wind-rose><div class=parent><div class=\"alert alert-danger\" ng-show=$ctrl.noResults>No data to display</div></div><div ng-show=\"$ctrl.transformedData.length > 0\" ng-style=$ctrl.style class=plotly-chart-wrapper ng-class=\"($ctrl.showLegend) ? 'with-legend' : ' ' \"><div class=plotly-chart-dimension><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl.layout></angular-plotly></div></div><div class=plotly-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.transformedData.length > 0\"><ul ng-repeat=\"entry in $ctrl.plotCustomRanges\" style=\"list-style: none\"><li><span><i class=\"fa fa-square\" style=\"color: {{entry.color}}\"></i> {{entry.lo}} - {{entry.hi}} {{$ctrl.speedUnit}}</span></li></ul></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/metricBox/metricBox.html',
    "<div class=metric-box ng-style=\"{ 'border' : '{{$ctrl.borderSize}}px solid {{$ctrl.borderColor}}','background' : '{{$ctrl.backgroundColor}}' }\"><div ng-if=$ctrl.disabled id=disabledOverlay></div><div class=metric-box-head><div class=metric-box-action><img ng-if='$ctrl.actionIcon!=\"\"' ng-click=actionClicked() alt=EI src={{$ctrl.actionIcon}}></div><div class=metric-box-label ng-style=\"{	'font-weight' : '{{$ctrl.labelFontWeight}}', 'font-family' : '{{$ctrl.labelFontFamily}}', 'color' : '{{$ctrl.labelTextColor}}', 'text-align' : '{{$ctrl.labelTextAlignment}}' }\">{{$ctrl.label}}</div></div><div class=metric-box-body><div class=metric-box-value-unit><div class=metric-box-value ng-style=\"{	'font-weight' : '{{$ctrl.valueFontWeight}}', 'font-family' : '{{$ctrl.valueFontFamily}}', 'color' : '{{$ctrl.valueTextColor}}', 'text-align' : '{{$ctrl.valueTextAlignment}}' }\"><div>{{$ctrl.value}}</div></div><div class=metric-box-unit ng-style=\"{ 'font-weight' : '{{$ctrl.unitFontWeight}}', 'font-family' : '{{$ctrl.unitFontFamily}}', 'color' : '{{$ctrl.unitTextColor}}', 'text-align' : '{{$ctrl.unitTextAlignment}}' }\"><div>{{$ctrl.unit}}</div></div></div><div ng-if='$ctrl.icon!=\"\"' class=metric-box-icon><img alt=EI src={{$ctrl.icon}}></div></div></div>"
  );


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