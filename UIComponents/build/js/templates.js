var cachedTemplates = (["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/UIComponents/dashboard/frontend/components/ACL/ACL.html',
    "<div class=acl-wrapper ng-click=\"$ctrl.showAccessControlList = true\"><span class=acl-btn ng-class=\"($ctrl.users.length == 1 && $ctrl.users[0].code == 'anonymous') ? 'unlocked' : 'locked'\"><a ng-click=$ctrl.openModal() href=javascript:void(0); uib-tooltip={{$ctrl.accessType}} tooltip-placement=right><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAARCAYAAADZsVyDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExOUI1NTNCNDc3MzExRTY4OEY2ODFFOTcxN0Q4QkIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExOUI1NTNDNDc3MzExRTY4OEY2ODFFOTcxN0Q4QkIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTE5QjU1Mzk0NzczMTFFNjg4RjY4MUU5NzE3RDhCQjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTE5QjU1M0E0NzczMTFFNjg4RjY4MUU5NzE3RDhCQjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6vZpebAAAB2UlEQVR42rSUv0sCYRjH37vu0BNNdG2Qk1ocEk53F1tapdnlqECac2hIbkloFOL8F8IlwqUmQZwOsUHBIZMWRSQHFVTyeh55kzc9Ray+8OX96eee93mfVy6TyRBQCOwh2+kDbCQSiR+TAlgHn5LfKQs+Yyf4P4ASKwZP/kkCbQ2aq23koXdkCU6Cn7cER8FPq8CoS7rpiG6MbgBN1uv1fbfbTVRVXQm+Z6JOriu/Vqt1gK3L5bIPBgMVTNLp9LmmaYN+v/+IaRUscmWsq2v4obfdbl9Mp1NpPB7P51Op1N1wOCROp/MN9sgsGGF+2vdbXQjKbreL4E+EdLvd+TyOUYFAwBeLxXaEhSInTCqWVC6X8RQnDofjcBZJKGTG43ETIuR1XTebzSbX6/VIPp+/EhaK3E+hN1YRy7LsbTQaynd0kUiEwEeIJEkkHA7PwHCZ6GsWbDD9V6u6Nk1zz2az7UJ+fZPJRAQQHn221ul0OGzxIzzPGwKTX4MCo7RdfgkejwF+qFartzAM5nI5DoAIJbVabQZWFOWlWCyGBeboGwnTMBqN5uNCocCx66VSScYYODjexk+MeQT4j0hEUXyHlGjYDwaDWqVSOaZFkN0WTJiy1Gn/iF34EmAAsBK5Pr0LIbQAAAAASUVORK5CYII=\" alt=restrictions> <i class=\"fa fa-lock acl-icon-locked red\"></i> <i class=\"fa fa-unlock-alt acl-icon acl-icon-unlocked light-green\"></i></a></span></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/dygraphs/dygraphs.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-if=$ctrl.datas><ng-dygraphs data=$ctrl.datas options=$ctrl.options legend=$ctrl.legend></ng-dygraphs></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/ACL/myModalContent.html',
    "<div class=acl-controls><div class=modal-header><h3 class=modal-title>Access Control List</h3></div><div class=modal-body><div ng-if=$ctrl.show uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')  + ' m10'\" close=$ctrl.closeAlert() dismiss-on-timeout=5000>{{$ctrl.message.content}}</div><h5 class=text-info>List of groups and devices allowed to run the script <a href=javascript:void(0); class=text-primary uib-popover-html=$ctrl.popoverContent popover-placement=right><i class=\"fa fa-question-circle\"></i></a></h5><div ng-show=$ctrl.showMsg class=\"col-xs-12 center-div alert fadeIn animated alert-info\"><div class=\"col-xs-9 pdl0\"><div class=\"mt8 ml10\"><span>Access permission to the \"anonymous\" predefined group allows anyone to serve the file. Adding it to your access control list will automatically remove any other groups or devices. Are you sure you want to continue?</span></div></div><div class=\"col-xs-3 pdr0 text-right\"><button ng-click=$ctrl.removeAnonymousAccess() type=button class=\"btn btn-default btn-sm mr5\">No</button> <button ng-click=$ctrl.addAnonymousAccess() type=button class=\"btn btn-primary btn-sm\">Yes</button></div></div><scriptr-autocomplete id=devicesList placeholder=\"Select a user/group\" pause=400 hide-list=false search-fields=code default-set-object=$ctrl.defaultSetObject selected-object=$ctrl.onSelect title-field=code objects=$ctrl.users clear-selected=true description-field=description image-field=pic list-selected-object=true minlength=0 text-no-results=\"No results\" text-searching=Searching... transport=https on-format-data=$ctrl.callback api=UIComponents/dashboard/frontend/examples/list/getDevices input-class=\"form-control form-control-small\"></scriptr-autocomplete><div class=clearfix></div><div class=\"italic text-muted fnt12 mt10\"><i class=\"fa fa-info-circle\" aria-hidden=true></i><span id=permissionsNote> Note that removing scriptr device from the access control list will prevent you from serving the file from the IDE.</span></div></div><div class=modal-footer><button type=button class=\"btn btn-default\" ng-click=$ctrl.onCancel()>Close</button> <button type=button class=\"btn btn-warning\" ng-click=$ctrl.updateFileACL()>Save changes</button></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/chart/chart.html',
    "<div style=\"position: relative\"><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-if=\"$ctrl.datas.length > 0\"><div ng-if=\"$ctrl.type == 'line'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div style=\"height: 100%; width: 100%\" line-data=$ctrl.datas line-xkey={{$ctrl.xkey}} line-ykeys=$ctrl.ykeys line-labels=$ctrl.labels line-colors=$ctrl.colors line-line-width=$ctrl.lineWidth line-point-size=$ctrl.pointSize line-point-fill-colors=$ctrl.pointFillColors line-point-stroke-colors=$ctrl.pointStrokeColors line-ymax=$ctrl.ymax line-ymin=$ctrl.ymin line-smooth=$ctrl.smooth line-hide-hover=$ctrl.hideHover line-hover-callback=$ctrl.hoverCallback line-parse-time=$ctrl.parseTime line-units=$ctrl.units line-post-units=$ctrl.postUnits line-pre-units=$ctrl.preUnits line-line-date-format=$ctrl.dateFormat(x) line-x-labels=$ctrl.xlabels line-x-label-format=$ctrl.xlabelFormat(x) line-x-label-angle=$ctrl.xlabelAngle line-y-label-format=$ctrl.ylabelFormat(y) line-goals=$ctrl.goals line-goal-stroke-width=$ctrl.goalStrokeWidth line-goal-line-colors=$ctrl.goalLineColors line-events=$ctrl.events line-event-stroke-width=$ctrl.eventStrokeWidth line-event-line-colors=$ctrl.eventLineColors line-continuous-line=$ctrl.continuousLine line-axes=$ctrl.axes line-grid=$ctrl.grid line-grid-text-color=$ctrl.gridTextColor line-grid-text-size=$ctrl.gridTextSize , line-grid-text-family=$ctrl.gridTextFamily line-grid-text-weight=$ctrl.gridTextWeight line-fill-opacity=$ctrl.fillOpacity line-resize=$ctrl.resize line-chart></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'bar'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div style=\"height: 100%; width: 100%\" bar-data=$ctrl.datas bar-x={{$ctrl.xkey}} bar-y=$ctrl.ykeys bar-labels=$ctrl.labels bar-colors=$ctrl.colors bar-resize=$ctrl.resize bar-stacked=$ctrl.stacked bar-hide-hover=$ctrl.hideHover bar-hover-callback=$ctrl.hoverCallback bar-grid=$ctrl.grid bar-grid-text-color=$ctrl.gridTextColor bar-grid-text-size=$ctrl.gridTextSize , bar-grid-text-family=$ctrl.gridTextFamily bar-grid-text-weight=$ctrl.gridTextWeight bar-axes=$ctrl.axes bar-ymax=$ctrl.ymax bar-ymin=$ctrl.ymin bar-goals=$ctrl.goals bar-goal-stroke-width=$ctrl.goalStrokeWidth bar-goal-line-colors=$ctrl.goalLineColors bar-x-label-angle=$ctrl.xlabelAngle bar-y-label-format=$ctrl.ylabelFormat(y) bar-parse-time=$ctrl.parseTime bar-events=$ctrl.events bar-event-stroke-width=$ctrl.eventStrokeWidth bar-event-line-colors=$ctrl.eventLineColors bar-post-units=$ctrl.postUnits bar-pre-units=$ctrl.preUnits bar-chart></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'area'\"><div class=morris-chart-wrapper ng-class=\"($ctrl.showLegend == 'true' && $ctrl.legendType != 'hover') ? 'with-legend' : ' ' \"><div style=\"height: 100%; width: 100%\" area-chart line-colors=$ctrl.colors area-data=$ctrl.datas area-xkey={{$ctrl.xkey}} area-ykeys=$ctrl.ykeys area-labels=$ctrl.labels area-line-width=$ctrl.lineWidth area-point-size=$ctrl.pointSize area-point-fill-colors=$ctrl.pointFillColors area-point-stroke-colors=$ctrl.pointStrokeColors area-ymax=$ctrl.ymax area-ymin=$ctrl.ymin area-smooth=$ctrl.smooth area-hide-hover=$ctrl.hideHover area-hover-callback=\"$ctrl.hoverCallback(index, options, content, row)\" area-parse-time=$ctrl.parseTime area-units=$ctrl.units area-post-units=$ctrl.postUnits area-pre-units=$ctrl.preUnits area-area-date-format=$ctrl.dateFormat(x) area-x-labels=$ctrl.xlabels area-x-label-format=$ctrl.xlabelFormat(x) area-x-label-angle=$ctrl.xlabelAngle area-y-label-format=$ctrl.ylabelFormat(y) area-goals=$ctrl.goals area-goal-stroke-width=$ctrl.goalStrokeWidth area-goal-line-colors=$ctrl.goalLineColors area-events=$ctrl.events area-event-stroke-width=$ctrl.eventStrokeWidth area-event-line-colors=$ctrl.eventLineColors area-continuous-line=$ctrl.continuousLine area-axes=$ctrl.axes area-grid=$ctrl.grid area-grid-text-color=$ctrl.gridTextColor area-grid-text-size=$ctrl.gridTextSize , area-grid-text-family=$ctrl.gridTextFamily area-grid-text-weight=$ctrl.gridTextWeight area-fill-opacity=$ctrl.fillOpacity area-resize=$ctrl.resize area-behave-like-line=$ctrl.behaveLikeLine></div></div><div class=morris-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.legendType != 'hover'\"><div id=date_{{$ctrl.ref}}>{{$ctrl.legendDate}}</div><ul ng-repeat=\"entry in $ctrl.legendStructure\"><li><span><i class=\"fa fa-square\" ng-style=\"{ 'color' : '{{entry.color}}'}\"></i> {{entry.label}}</span> <span ng-style=\"{ 'color' : '{{entry.color}}'}\" id=value_{{$index}}_{{$ctrl.ref}}>{{entry.value}}</span></li></ul></div></div><div ng-if=\"$ctrl.type == 'donut'\" style=\"height: 100%; width: 100%\" donut-data=$ctrl.datas donut-label-color=$ctrl.labelColor donut-background-color=$ctrl.backgroundColor donut-colors=$ctrl.colors donut-formatter=$ctrl.donutFormatter(y,data) donut-resize=$ctrl.resize donut-chart></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/gauge/gauge.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div style=\"width: {{$ctrl.width}}%; height: {{$ctrl.height}}{{$ctrl.heightUnit}}\" class=gauge ng-if=$ctrl.gaugeValue><div value={{$ctrl.gaugeValue}} value-font-color={{$ctrl.valueFontColor}} min={{$ctrl.min}} max={{$ctrl.max}} hide-min-max={{$ctrl.hideMinMax}} hide-value={{$ctrl.hideValue}} show-inner-shadow={{$ctrl.showInnerShadow}} gauge-color={{$ctrl.gaugeColor}} shadow-opacity={{$ctrl.shadowOpacity}} shadow-size={{$ctrl.shadowSize}} custom-sectors={{$ctrl.customSectors}} label={{$ctrl.label}} label-font-color={{$ctrl.labelFontColor}} start-animation-type={{$ctrl.startAnimationType}} refresh-animation-type={{$ctrl.refreshAnimationType}} counter={{$ctrl.counter}} value-font-family={{$ctrl.valueFontFamily}} relative-gauge-size={{$ctrl.relativeGaugeSize}} value-min-font-size={{$ctrl.valueMinFontSize}} label-min-font-size={{$ctrl.labelMinFontSize}} min-label-min-font-size={{$ctrl.minLabelMinFontSize}} max-label-min-font-size={{$ctrl.maxLabelMinFontSize}} gauge-width-scale={{$ctrl.gaugeWidthScale}} shadow-vertical-offset={{$ctrl.shadowVerticalOffset}} level-colors={{$ctrl.levelColors}} no-gradient={{$ctrl.noGradient}} start-animation-time={{$ctrl.startAnimationTime}} refresh-animation-time={{$ctrl.refreshAnimationTime}} donut={{$ctrl.donut}} donut-start-angle={{$ctrl.donutStartAngle}} reverse={{$ctrl.reverse}} decimals={{$ctrl.decimals}} symbol={{$ctrl.symbol}} format-number={{$ctrl.formatNumber}} human-friendly={{$ctrl.humanFriendly}} human-friendly-decimal={{$ctrl.humanFriendlyDecimal}} on-animation-end={{$ctrl.onAnimationEnd}} pointer={{$ctrl.pointer}} justgage></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/grid/grid.html',
    "<div class=filter-bar><div class={{$ctrl.class}}><form><div ng-show=\"$ctrl.enableClientSideFilter && $ctrl.mode == 'normal'\" class=\"form-group col-xs-12 col-sm-6\"><div class=form-group><input class=form-control ng-change=$ctrl.onFilterChanged() ng-model=$ctrl.quickFilterValue placeholder=\"Client filter\"></div></div><div ng-show=\"$ctrl.enableServerSideFilter && $ctrl.mode == 'infinite'\" class=\"form-group col-xs-12 col-sm-6\"><div class=form-group><input class=form-control ng-change=$ctrl.onServerFilterChanged() ng-model=$ctrl.serverFilterText placeholder=\"Server filter\"></div></div><div class=\"col-xs-12 col-sm-6 pull-right text-right\"><button ng-hide={{$ctrl.enableDeleteRow}} ng-click=$ctrl.openConfirmationPopUp() class=\"btn btn-default mt4\" tooltip-placement=left uib-tooltip=\"Delete selected row\"><i class=\"fa fa-close\" aria-hidden=true></i></button> <button ng-hide={{$ctrl.enableAddRow}} ng-click=$ctrl.onAddRow() class=\"btn btn-warning mt4\" tooltip-placement=bottom uib-tooltip=\"Insert row\"><i class=\"fa fa-plus\" aria-hidden=true></i></button></div></form></div></div><div class=col-xs-12 ng-show=$ctrl.showError><div class=alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')\">{{$ctrl.message.content}}</div></div><div class=clearfix></div><div class=col-xs-12><div ag-grid=$ctrl.gridOptions class=ag-bootstrap ng-style=$ctrl.style></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/grid/popup.html',
    "<div class=modal-header><h3 class=modal-title>Delete</h3></div><div class=modal-body>Are you sure you want to delete the selected row(s)?</div><div class=modal-footer><button class=\"btn btn-warning\" type=button ng-click=$ctrl.onCancel()>No</button> <button class=\"btn btn-warning\" type=button ng-click=$ctrl.onSubmit()>Yes</button></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/list/autocomplete.html',
    "<div><span ng-show=$ctrl.showList ng-hide=$ctrl.hideObjects class=script-wrap ng-if=$ctrl.listSelectedObject ng-repeat=\"obj in $ctrl.objects track by $index\"><span style=\"position: relative\"><span class=script-text uib-tooltip={{obj[$ctrl.titleField]}} tooltip-placement=bottom><i class=\"mr5 text-primary {{obj.icon}}\"></i> {{obj[$ctrl.titleField]}}</span> <a ng-if=\"obj[$ctrl.titleField] != 'nobody'\" href=javascript:void(0); ng-click=$ctrl.addObjectToList(obj) uib-tooltip=Remove tooltip-placement=right><i class=\"fa fa-close\"></i></a></span></span><div class=clearfix></div><div class=\"text-center loading\" ng-show=!$ctrl.showList><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><angucomplete-alt ng-show=$ctrl.showList id={{$ctrl.id}} placeholder={{$ctrl.placeholder}} default-set-object=$ctrl.defaultSetObject pause={{$ctrl.pause}} hide-objects=$ctrl.hideObjects list-selected-object=$ctrl.listSelectedObject objects=$ctrl.objects selected-object=$ctrl.selectedObject local-data=$ctrl.localData image-field={{$ctrl.imageField}} search-fields={{$ctrl.searchFields}} title-field={{$ctrl.titleField}} description-field={{$ctrl.descriptionField}} image-field={{$ctrl.imageField}} minlength={{$ctrl.minlength}} input-class={{$ctrl.inputClass}} match-class={{$ctrl.matchClass}} maxlength={{$ctrl.maxlength}} selected-object-data=$ctrl.selectedObjectData input-name={{$ctrl.inputName}} clear-selected={{$ctrl.clearSelected}} override-suggestions={{$ctrl.overrideSuggestions}} field-required=$ctrl.fieldRequired field-required-class={{$ctrl.fieldRequiredClass}} initial-value=$ctrl.initialValue input-changed=$ctrl.inputChanged auto-match=$ctrl.autoMatch focus-in=$ctrl.focusIn focus-out=$ctrl.focusOut disable-input=$ctrl.disableInput focus-first=$ctrl.focusFirst field-tabindex={{$ctrl.fieldTabindex}} text-searching={{$ctrl.textSearching}} text-no-results={{$ctrl.textNoResults}}></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/map/map.html',
    "<div style=\"height: 90%\"><section class=map-wrap ng-if=\"$ctrl.clusteredView == true && $ctrl.showDetailedMap == false\"><ng-map id=\"{{'clustered-'+$ctrl.$wdgid}}\" on-zoom_changed=$ctrl.onClusteredZoomChanged(); single-info-window=true zoom-to-inlude-markers=true center=\"{{$ctrl.mapcenter || $ctrl.defaultCenter}}\" zoom={{$ctrl.clusterZoom}}><drawing-manager ng-if=\"$ctrl.geofenceManager == true\" on-overlaycomplete=$ctrl.onMapOverlayCompleted() drawing-control-options={{$ctrl.drawingOptions}} drawingcontrol={{$ctrl.drawingControl}} drawingmode=null rectangleoptions={{$ctrl.overlaySettings}} polygonoptions={{$ctrl.overlaySettings}} circleoptions={{$ctrl.overlaySettings}}></drawing-manager></ng-map><div class=messages ng-show=\"$ctrl.drawingMessages != null\"><div class=\"alert alert-warning\">{{$ctrl.drawingMessages}}</div></div><div class=heatmap ng-if=\"$ctrl.heatmap == true\"><h5>Enable Heatmap</h5><span><scriptr-toggle-switch resize=false on-switch-change=$ctrl.activateHeatMap switch-status=$ctrl.switchStatus class=\"switch-success switch-small\"></scriptr-toggle-switch></span></div></section><section class=map-wrap ng-if=\"$ctrl.clusteredView == false || $ctrl.showDetailedMap == true\"><ng-map id=\"{{'detailed-'+$ctrl.$wdgid}}\" on-zoom_changed=$ctrl.onDetailedZoomChanged(); single-info-window=true zoom-to-inlude-markers=true center=\"{{$ctrl.mapcenter || $ctrl.defaultcenter}}\" zoom={{$ctrl.detailedmapzoom}}><drawing-manager ng-if=\"$ctrl.geofenceManager == true\" on-overlaycomplete=$ctrl.onMapOverlayCompleted() drawing-control-options={{$ctrl.drawingOptions}} drawingcontrol={{$ctrl.drawingControl}} drawingmode=null rectangleoptions={{$ctrl.overlaySettings}} polygonoptions={{$ctrl.overlaySettings}} circleoptions={{$ctrl.overlaySettings}}></drawing-manager><div><div ng-repeat=\"(key, asset) in $ctrl.displayedAssets\"><shape name=polyline path={{asset.path}} stroke-color={{asset.pathColor}} stroke-opacity={{asset.strokeOpacity}} stroke-width={{asset.strokeWeight}} icons={{asset.pathIcon}}></shape><div ng-repeat=\"marker in asset.markers track by $index\"><div ng-if=\"$ctrl.trackedAsset == null\"><marker position={{marker.position}} title={{marker.display}} animation={{marker.animation}} icon={{marker.icon}} data={{marker.assetKey}} on-click=\"$ctrl.showAssetInfo(event, marker, '{{marker.assetKey}}', '{{marker.tripKey}}', '{{marker.id}}')\"></marker></div><div ng-if=\"$ctrl.trackedAsset !=null\"><marker position={{marker.position}} title={{marker.title}} animation={{marker.animation}} icon={{marker.icon}} clickable=false></marker></div></div></div></div><div ng-if=\"$ctrl.markerInfoWindow == true\"><div ng-transclude></div><info-window id=\"{{'infoWindowTemplate_default_'+$ctrl.$wdgid}}\"><div ng-non-bindable=\"\"><table class=\"table table-bordered\"><thead><tr><th ng-repeat=\"(key, value) in marker.details\">{{key}}</th></tr></thead><tbody><tr><td ng-repeat=\"(key, value) in marker.details\">{{value.value || \"N/A\"}}</td></tr></tbody></table></div></info-window></div></ng-map><div class=messages ng-show=\"$ctrl.drawingMessages != null\"><div class=\"alert alert-warning\">{{$ctrl.drawingMessages}}</div></div><div class=heatmap ng-if=\"$ctrl.heatmap == true\"><h5>Enable Heatmap</h5><span><scriptr-toggle-switch resize=false on-switch-change=$ctrl.activateHeatMap switch-status=$ctrl.switchStatus class=\"switch-success switch-small\"></scriptr-toggle-switch></span></div></section><div><div ng-if=\"$ctrl.geofenceManager == true\" class=drawingmanager-buttons><span><a ng-click=$ctrl.hideShowGeofences() title=\"Hide all geofences\"><i class=fa ng-class='{\"fa-eye-slash\":  $ctrl.geofencesVisible, \"fa-eye\": !$ctrl.geofencesVisible }' aria-hidden=true></i> </a></span><span><a ng-click=$ctrl.clearAllGeofences() title=\"Erase all geofences\"><i class=\"fa fa-eraser\" aria-hidden=true></i></a></span></div><div ng-if=\"$ctrl.geofenceManager == true\" class=drawingmanager-action-buttons><button class=\"btn btn-primary btn-sm btn-block\" ng-click=$ctrl.saveAllGeofences() data-toggle=tooltip title=\"Save all geofences\">Save</button></div></div></div><div class=geofence-menu><a title=\"Configure this widget\" ng-click=$ctrl.editSelectedGeofenceSettings()><i class=\"glyphicon glyphicon-pencil\"></i> </a><a title=\"Remove this widget\" ng-click=$ctrl.removeSelectedGeofence()><i class=\"glyphicon glyphicon-trash\"></i></a></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
    "<div><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-style=$ctrl.style class=thermowrapper ng-if=$ctrl.value><tg-thermometer-vertical value={{$ctrl.value}} unit={{$ctrl.thermoUnit}} percent={{$ctrl.percent}} sectors=$ctrl.sectors ticks=$ctrl.ticks height={{$ctrl.height}} mercury-color=$ctrl.mercuryColor></tg-thermometer-vertical></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/thermometer/tg_thermometer_vertical.html',
    "<div style=\"height: 90%\" class=tg-thermometer style=display:none><div class=draw-a></div><div class=draw-b><div style=\"width: 6px;position: absolute;\n" +
    "            left: 0;\n" +
    "            right: 0;\n" +
    "            width: 10px;\n" +
    "            top: 0;\n" +
    "            margin: auto;\n" +
    "            height: 20px;\n" +
    "            border-radius: 10px 10px 0 0;background-color: {{mercuryColor}}\"></div><div style=\"width: 14px;height: 14px; position: absolute;\n" +
    "            left: 0;\n" +
    "            right: 0;\n" +
    "            top: 0;\n" +
    "            bottom: 0;\n" +
    "            margin: auto;\n" +
    "            width: 24px;\n" +
    "            height: 24px;\n" +
    "            border-radius: 50%; background-color: {{mercuryColor}}\"></div></div><div class=meter><div class=statistics><div class=percent style=\"bottom: calc({{val.percent}}% - 2px)\" ng-repeat=\"val in ticks track by $index\">{{val.tick}}{{unit}}</div></div><div style=\"height: {{percent}}%; background-color: {{mercuryColor}}\" class=mercury><div class=percent-current>{{value}}{{unit}}</div><div class=mask><div class=bg-color style=\"height: calc({{height}}% - 57px); background: {{mercuryColor}}\"></div></div></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/odometer/odometer.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-style=$ctrl.style ng-if=$ctrl.odometerValue><span odometer=$ctrl.odometerValue odometer-options=$ctrl.odometerOptions></span></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/searchBox/searchBox.html',
    "<div class=row><div class=\"col-xs-12 col-md-8\"><input class=\"form-control input-sm\" ng-keyup=\"$event.keyCode == 13 ? $ctrl.onFilterChanged() : null\" ng-model=$ctrl.searchValue placeholder={{$ctrl.searchText}}></div><div class=\"col-xs-12 col-md-4\"><button ng-click=$ctrl.onFilterChanged() class=\"btn btn-primary btn-sm btn-block\">Go</button></div><div ng-show=$ctrl.noResults class=\"col-xs-12 alert\"><span class=\"alert alert-danger col-xs-12\">no results</span></div></div><div><div class=\"text-center loading\" ng-show=$ctrl.searching><i class=\"fa fa-spinner fa-spin fa-2x\"></i></div><abn-tree tree-data=$ctrl.treeData tree-control=$ctrl.treeControl icon-leaf={{$ctrl.iconLeaf}} icon-expand={{$ctrl.iconExpand}} icon-collapse={{$ctrl.iconCollapse}} on-select=$ctrl.onSelect(branch) expand-level=$ctrl.expandLevel initial-selection=$ctrl.initialSelection></abn-tree></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/speedometer/speedometer.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div class=speedometer-wrapper></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/accelerometer/accelerometer.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div class=accelerometer-wrapper ng-if=\"$ctrl.xLine && $ctrl.yLine && $ctrl.angle\"><div class=\"line y\" ng-style=\"{ 'transform' :  $ctrl.yLine, 'border': '1px solid blue' }\"></div><div class=line ng-style=\"{ 'transform':  $ctrl.xLine}\"></div><div class=angle ng-style=\"{ 'transform':  $ctrl.angle }\"></div><div class=guideX></div><div class=guideY></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/button/button.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-style=$ctrl.style ng-if=$ctrl.label><button ng-if=$ctrl.isDisabled disabled class=\"{{$ctrl.class}} is-disabled ui-button\" ng-click=$ctrl.click() promise-btn=$ctrl.successPromise>{{$ctrl.label}}</button> <button ng-if=!$ctrl.isDisabled class=\"{{$ctrl.class}} ui-button\" ng-click=$ctrl.click() promise-btn=$ctrl.successPromise>{{$ctrl.label}}</button></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/slider/slider.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-if=$ctrl.max ng-style=$ctrl.style class=slider><rzslider class={{$ctrl.theme}} rz-slider-model=$ctrl.min rz-slider-high=$ctrl.max rz-slider-options=$ctrl.options></rzslider></div><div ng-if=!$ctrl.max ng-style=$ctrl.style class=slider><rzslider class={{$ctrl.theme}} rz-slider-model=$ctrl.min rz-slider-options=$ctrl.options></rzslider></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/IFrame/IFrame.html',
    "<iframe style=\"height: 90%; width: 100%\" ng-if=$ctrl.link src={{$ctrl.trustSrc($ctrl.link)}} frameborder=0 allowfullscreen></iframe><h3 ng-if=!$ctrl.link>No URL set</h3>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/toggleSwitch/toggle_switch.html',
    "<scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover data-failure-message=$ctrl.data-failure-message action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-click=$ctrl.publishData() ng-style=$ctrl.style ng-if=\"$ctrl.switchStatus === false || $ctrl.switchStatus === true\"><toggle-switch ng-model=$ctrl.switchStatus on-label={{$ctrl.onLabel}} off-label={{$ctrl.offLabel}} knob-label={{$ctrl.knobLabel}} is-disabled=$ctrl.isDisabled class={{$ctrl.class}}></toggle-switch></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/3dsurface.html',
    "<div class=surface><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl.layout></angular-plotly></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/plotly/windrose.html',
    "<div class=wind-rose><scriptr-notifications icon=$ctrl.icon has-data=$ctrl.hasData no-results=$ctrl.noResults stalled-data=$ctrl.stalledData use-popover=$ctrl.usePopover failure-message=$ctrl.dataFailureMessage action-message=$ctrl.actionMessage action-success=$ctrl.actionSuccess></scriptr-notifications><div ng-show=\"$ctrl.transformedData.length > 0\" ng-style=$ctrl.style class=plotly-chart-wrapper ng-class=\"($ctrl.showLegend) ? 'with-legend' : ' ' \"><div class=plotly-chart-dimension><angular-plotly plotly-data=$ctrl.transformedData plotly-options=$ctrl.options plotly-layout=$ctrl.layout></angular-plotly></div></div><div class=plotly-chart-legend ng-if=\"$ctrl.showLegend && $ctrl.transformedData.length > 0\"><ul ng-repeat=\"entry in $ctrl.plotCustomRanges\" style=\"list-style: none\"><li><span><i class=\"fa fa-square\" style=\"color: {{entry.color}}\"></i> {{entry.lo}} - {{entry.hi}} {{$ctrl.speedUnit}}</span></li></ul></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/common/notifications.html',
    "<div class=\"data-notification center\" ng-hide=\"$ctrl.hasData || $ctrl.noResults\"><i class=\"fa fa-spinner fa-spin fa-1x\"></i><div ng-if=!$ctrl.usePopover>Waiting for data</div></div><div class=data-notification ng-if=\"!$ctrl.usePopover && $ctrl.noResults\" ng-class=\"{'center': !$ctrl.stalledData, 'bottom': $ctrl.stalledData}\"><div uib-alert ng-class=\"{'alert-warning': $ctrl.stalledData, 'alert-danger': !$ctrl.stalledData}\"><i class=\"fa fa-exclamation-triangle fa-1x\"></i>{{$ctrl.failureMessage || 'Failed to fetch data or no data available.'}}</div></div><div class=\"data-notification bottom\" ng-if=\"$ctrl.usePopover && $ctrl.noResults\" ng-class=\"{'danger': ($ctrl.noResults && !$ctrl.stalledData), 'warning': $ctrl.stalledData}\" ng-init=\"$ctrl.popClass = (($ctrl.noResults && !$ctrl.stalledData) ? 'data-notification-popup alert alert-danger' : (($ctrl.stalledData) ? 'data-notification-popup alert alert-warning' : 'data-notification-popup alert alert-info'))\"><div uib-popover=\"{{$ctrl.failureMessage || 'Failed to fetch data or no data available.'}}\" popover-placement=\"auto right\" popover-append-to-body=true popover-class={{$ctrl.popClass}} popover-trigger=\"'outsideClick'\"><i class=\"fa fa-exclamation-triangle fa-1x\"></i></div></div><div ng-if=\"$ctrl.actionMessage && $ctrl.usePopover\" class=\"data-notification action alert\" ng-class=\"{'alert-success': $ctrl.actionSuccess, 'alert-danger':  !$ctrl.actionSuccess}\" ng-init=\"$ctrl.popClass = (($ctrl.noResults && !$ctrl.stalledData) ? 'data-notification-popup alert alert-danger' : (($ctrl.actionSuccess) ? 'data-notification-popup alert alert-success' : 'data-notification-popup alert alert-danger'))\"><div uib-popover={{$ctrl.actionMessage}} popover-placement=\"auto top\" popover-append-to-body=true popover-class={{$ctrl.popClass}} popover-trigger=\"'outsideClick'\"><div class=center-icon><i class=\"fa fa-times fa-1x\" ng-if=!$ctrl.actionSuccess></i> <i class=\"fa fa-check fa-1x\" ng-if=$ctrl.actionSuccess></i></div></div></div><div ng-if=\"$ctrl.actionMessage && !$ctrl.usePopover\" class=\"data-notification action\"><div uib-alert ng-class=\"{'alert-success': $ctrl.actionSuccess, 'alert-danger':  !$ctrl.actionSuccess}\">{{$ctrl.actionMessage}}</div></div><div class=greyout ng-hide=$ctrl.hasData><img ng-src={{$ctrl.icon}}></div>"
  );


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
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;/UIComponents/build/css/UIComponents/dt_components.min.css&quot;&gt;\n" +
    "    \n" +
    "    &lt;!-- JQUERY Material  To use jQuery, simply ensure it is loaded before the angular.js file. --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/external_jquery_resources.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "  \n" +
    "    &lt;!-- Libraries --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/dt_external_libraries1.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/dt_external_libraries2.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    \n" +
    "    &lt;!-- Plotly is very huge lib and unpackageable  --&gt;\n" +
    "    &lt;script src=&quot;https://cdn.plot.ly/plotly-latest.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    \n" +
    "    \n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- NG material --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/angular_resources_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/angular_resources_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/angular_resources_3.min.js&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- Directives --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/directives_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/directives_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/ag-grid/12.0.0/ag-grid.js?ignore=notused36&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "\n" +
    "  \n" +
    "    &lt;!-- Components --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/js/UIComponents/Components.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    &lt;!-- Thermometer cusing error , solve it with redefine the widget --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/dashboard/frontend/components/thermometer/thermometer.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "    \n" +
    "    &lt;!-- Theme --&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;/UIComponents/dashboardBuilder/css/{{dashboardSettings.theme}}.css&quot;&gt;\n" +
    "    \n" +
    "\n" +
    "&lt;/head&gt; \n" +
    "  \n" +
    "  \n" +
    "&lt;style&gt;\n" +
    "  {{compiledCss}}\n" +
    "&lt;/style&gt;\n" +
    "&lt;style&gt;\n" +
    "  {{dashboardSettings.inline-style}}\n" +
    "&lt;/style&gt;\n" +
    "\n" +
    "&lt;script&gt;\n" +
    "\n" +
    "(function() {\n" +
    "	\n" +
    "  if(&quot;{{{dashboardSettings.requiresLogin}}}&quot; == &quot;Yes&quot;){\n" +
    "  \n" +
    "   var scriptName = window.location.pathname.substring(1,window.location.pathname.length )\n" +
    "   var loginTemplateTarget =&quot;/UIComponents/dashboardBuilder/loginTemplate.html?redirectTarget=&quot;+scriptName+&quot;&amp;anon_token={{{anon_token}}}&quot;\n" +
    "\n" +
    "    var authorization  = $.scriptr.authorization(\n" +
    "        {\n" +
    "          onTokenValid: function(){ }, \n" +
    "          loginPage: loginTemplateTarget\n" +
    "        }\n" +
    "      );\n" +
    "    }\n" +
    "  \n" +
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
    "    \n" +
    "    var underscore = angular.module('underscore', []);\n" +
    "		underscore.factory('_', ['$window', function($window) {		\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\n" +
    "	}]);\n" +
    "    \n" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{dashboardSettings.publishChannel}}}&quot;);\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{dashboardSettings.subscribeChannel}}}&quot;);\n" +
    "    }];\n" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "    }]\n" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer', 'Thermometer', 'Display', &quot;ngAnimate&quot;, &quot;ngSanitize&quot;, 'Dygraphs', 'DataService', 'Plotly', 'MetricBox', 'Alert'])\n" +
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
    "          defaultSizeY: 50,\n" +
    "          defaultSizeX:50,\n" +
    "          minRows: 1, // the minimum height of the grid, in rows\n" +
    "          maxRows: 100,\n" +
    "          columns: 10, // the width of the grid, in columns\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\n" +
    "          rowHeight: '50', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\n" +
    "          margins: [10, 10], // the pixel distance between each widget\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\n" +
    "          mobileBreakPoint:480, // if the screen is not wider that this, remove the grid layout and stack the items\n" +
    "          minColumns: 1, // the minimum columns the grid must have\n" +
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
    "        \n" +
    "        {{#each items}}\n" +
    "           	{{#if this.functions}}   \n" +
    "            	{{#each this.functions}}\n" +
    "                    vm.{{this.name}} = function(arguments){\n" +
    "                      {{{this.value}}}\n" +
    "                    }\n" +
    "                 {{/each}}\n" +
    "           	{{/if}} \n" +
    "        {{/each}}\n" +
    "     });\n" +
    "        	\n" +
    "})();\n" +
    "  \n" +
    "&lt;/script&gt;\n" +
    "\n" +
    "   &lt;body class=&quot;dashboard-template dashboardTheme &quot;&gt;\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot; class=&quot;dashboardContainer&quot;&gt; \n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\n" +
    "          &lt;ul&gt;\n" +
    "             {{#each items}}\n" +
    "                &lt;li class=&quot;myItem&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\n" +
    "                    \n" +
    "						&lt;div class=&quot;box {{#if_eq  this.options.box-header \"false\"}} box-without-header {{/if_eq}}&quot;&gt;\n" +
    "						  &lt;div class=&quot;box-header&quot;&gt;\n" +
    "						    &lt;div class=&quot;box-label&quot;&gt;&lt;span tooltip-append-to-body=&quot;true&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot;&gt;{{this.options.boxLabel}}&lt;/span&gt;&lt;/div&gt;\n" +
    "						  &lt;/div&gt;\n" +
    "                          &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;\n" +
    "						  &lt;div class=&quot;box-content&quot;&gt;\n" +
    "						  		&lt;{{type}}\n" +
    "                                    {{#buildAttr this.options }}\n" +
    "                                        {{this}}\n" +
    "                                    {{/buildAttr}}\n" +
    "                                    {{#if this.formatFunction}}   \n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\n" +
    "                                    {{/if}} \n" +
    "                           		&gt;\n" +
    "                                \n" +
    "                                {{#if this.functions}}   \n" +
    "                                       {{#each this.functions}}\n" +
    "                                  			{{this.attribute}}='vm.{{this.name}}'\n" +
    "                                        {{/each}}\n" +
    "                                    {{/if}} \n" +
    "                                   \n" +
    " \n" +
    " \n" +
    "          \n" +
    " 					{{#if this.options.default-info-window}}\n" +
    "                                &lt;info-window id=&quot;{{this.options.default-info-window.id}}&quot; template=&quot;{{this.options.default-info-window.template}}&quot; max-width=&quot;{{this.options.default-info-window.max-width}}&quot; max-height=&quot;{{this.options.default-info-window.max-height}}&quot;&gt;\n" +
    "                                 &lt;/info-window&gt;\n" +
    "                    {{/if}}\n" +
    "                    \n" +
    "       			{{#if this.options.source-info-window}}\n" +
    "                    	{{#each this.options.source-info-window}}\n" +
    "                        		 &lt;info-window id=&quot;infoWindowTemplate_{{this.source}}&quot; template=&quot;{{this.template}}&quot; max-width=&quot;{{this.max-width}}&quot; max-height=&quot;{{this.max-height}}&quot;&gt;\n" +
    "                                 &lt;/info-window&gt;\n" +
    "                        {{/each}}\n" +
    "                    {{/if}}\n" +
    "                                &lt;/{{type}}&gt;\n" +
    "						  &lt;/div&gt;\n" +
    "						&lt;/div&gt;\n" +
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