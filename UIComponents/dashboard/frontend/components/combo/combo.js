angular.module('Combo', ['ComponentsCommon', 'DataService','gridster']);
angular
    .module('Combo')
    .component(
    'scriptrCombo',
    {
        bindings : {
            "data": "<?",
            "type": "@",
            "icon": "@",
            "transport": "@",
            "api" : "@",
            "msgTag" : "@",
            "httpMethod": "@",
            "apiParams" : "<?",
            "onFormatData" : "&",
            "fetchDataInterval": "@",
            "useWindowParams": "@",
            "serviceTag": "@",
            "gridsterConfig": "<?",
            "mobileBreakPoint": "<?",
            "parentItemSizeX": "<?", //GridsterConfig needs to be same as parent item config for this to work
            "parentItemSizeY": "<?", //GridsterConfig needs to be same as parent item config for this to work
            "groupTitleField": "@",  //var groupTitle = "locationName";
            "groupDataField": "@", //var groupData = "zones";
            "titleWidget": "<?",
            "groupWidget": "<?",
            "groupsCount": "<?",
            "groupItemsCount": "<?",
            "isVertical": "<?",
            "noDataWidget": "<?",
			"resetDataOnConsume": "<?"
        },
        templateUrl:'/UIComponents/dashboard/frontend/components/combo/combo.html',
        controller: function($rootScope, httpClient, wsClient,dataService,$scope,$interval, $window, $element, $timeout) {
            var self = this;
            this.$onInit = function() {
                this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/saepio-vertical/dev/images/occupancy-bg.svg";
                this.dfGridsterOptions = {
                    sparse: false,
                    defaultSizeY: 20,
                    defaultSizeX:20,
                    minRows: 1, // the minimum height of the grid, in rows
                    maxRows: 100,
                    columns: 12, // the width of the grid, in columns
                    colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
                    rowHeight: '/2', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
                    margins: [10, 10], // the pixel distance between each widget
                    defaultSizeX: 2, // the default width of a gridster item, if not specifed
                    defaultSizeY: 1, // the default height of a gridster item, if not specified
                    minColumns: 1, // the minimum columns the grid must have
                    resizable: {
                        enabled: false
                    },
                    draggable: {
                        enabled: false
                    }
                };
                this.calculateGridsterMobileBreakPoint();
                this.gridsterOptions = angular.extend(this.dfGridsterOptions, this.gridsterConfig);
                this.groupsCount = this.groupsCount || 1;
                this.groupItemsCount = this.groupItemsCount || 2;
                this.isVertical = (!this.isVertical) ? false : true;
            }
            
            this.$postLink = function () {
                self.timeoutId = $timeout(self.resize.bind(self), 100);
                angular.element($window).on('resize', self.onResize);
                if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                    initDataService(this.transport);
                } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                    $scope.$watch(function( $scope ) {
                        // wait for the timeout
                        if($scope.$ctrl.data){
                            return $scope.$ctrl.data
                        }
                    },function(newVal, oldVal){
                    	if(JSON.stringify(newVal) != JSON.stringify(oldVal) || !self.hasData){
                            self.consumeData(newVal);
                        }
                    });
                } else { //Listen on update-data event to build data
                    $scope.$on("update-data", function(event, data) {
                        if(data == null) { //typeOf data == 'undefined' || data === null
                            if(self.message == null || self.message == "") {
                                self.noResults = true;
                            } 
                        } else {
                            if(data[self.serviceTag])
                                self.consumeData(data[self.serviceTag]);
                            else if(!self.serviceTag)
                                self.consumeData(data);
                        }  
                    });
                    $scope.$emit("waiting-for-data");
                }
            }
            
            this.calculateGridsterMobileBreakPoint = function() {
                if(document.documentElement.clientWidth <= this.mobileBreakPoint) {
                    this.dfGridsterOptions.mobileModeEnabled = true;
                    this.dfGridsterOptions.mobileBreakPoint = document.documentElement.clientWidth;
                } else {
                    this.dfGridsterOptions.mobileModeEnabled = false;
                }
            }
            
            this.calculateNotificationsDisplay = function() {
                if($element.parent().innerWidth() < 240) {
                    self.usePopover = true;
                } else {
                    self.usePopover = false;
                }
            }   
            
            this.onResize = function() {
                if (self.timeoutId != null) {
                    $timeout.cancel(self.timeoutId);
                }
                self.timeoutId = $timeout(self.resize.bind(self), 100);
            }
            
            this.resize = function() {
                this.calculateNotificationsDisplay();
            }
            
            this.$onDestroy = function() {
                if(self.msgTag){
                    wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                }
                if(self.refreshTimer) {
                    $interval.cancel( self.refreshTimer );
                }
                if (self.timeoutId != null) {
                    $timeout.cancel(self.timeoutId);
                }
                angular.element($window).off('resize', self.onResize);
            }
            
            var initDataService = function(transport) {
                var requestInfo = {
                    "api": self.api,
                    "transport": transport,
                    "msgTag": self.msgTag,
                    "apiParams": self.apiParams,
                    "useWindowParams": self.useWindowParams,
                    "httpMethod": self.httpMethod,
                    "widgetId": $scope.$id
                };
                dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));
                if(self.fetchDataInterval && !self.refreshTimer) {
                    //Assuming this is success
                    self.refreshTimer = $interval(
                        function(){
                            initDataService(self.transport)
                        }, self.fetchDataInterval * 1000);
                }
            }   
            
            this.consumeData = function(data, response) {
                if(data.status && data.status == "failure") {
                    self.noResults = true;
                    self.dataFailureMessage = "Failed to fetch data.";
                    if(self.message) {
                        self.stalledData = true;
                        self.dataFailureMessage = "Failed to update data.";
                    }
                } else {
                    if(typeof self.onFormatData() == "function"){
                        data = self.onFormatData()(data, self, $rootScope);
                    }
                    if(data != null) {
                        if(typeof data == "object" && Array.isArray(data)){
                            if(data.length > 0) {
                                var tmpWidgets = []
                                var col = 0;
                                var row = 0;             
                                if(self.groupsCount > data.length) self.groupsCount = data.length
                                for(var j = 0; j < data.length && j < self.groupsCount; j++) {
                                    var entry =  data[j];
                                    
                                    if(self.titleWidget) {
                                        var titleWdg =  JSON.parse(JSON.stringify(self.titleWidget));
                                        titleWdg["col"] = col;
                                        titleWdg["row"] = row;
                                        if(self.isVertical) {
                                            titleWdg["sizeX"] = self.gridsterOptions.columns;
                                            col = 0;
                                        } else {
                                             titleWdg["sizeX"] = self.gridsterOptions.columns/self.groupsCount; 
                                        }
                                        row = row + titleWdg["sizeY"];

                                        titleWdg["options"]["data"] = "'"+entry[self.groupTitleField]+"'";
                                        tmpWidgets.push(titleWdg);
                                    } 
                                    
                                    var groupData = entry[self.groupDataField];
                                    for(var i = 0; i < groupData.length && i < self.groupItemsCount; i++) {
                                        var wdgData = groupData[i];
                                        var groupWdg = JSON.parse(JSON.stringify(self.groupWidget));
                                        groupWdg["col"] = col;
                                        groupWdg["row"] = row;
                                        if(self.isVertical) {
                                            groupWdg["sizeX"] = self.gridsterOptions.columns/self.groupItemsCount; 
                                            if(i == groupData.length -1 || i == self.groupItemsCount - 1) {
                                                col = 0;
                                                row = row + groupWdg["sizeY"]
                                            } else {
                                                col = col  + groupWdg["sizeX"];
                                            }
                                        } else {
                                            if(!groupWdg.preserveX && (groupWdg["sizeX"] > self.gridsterOptions.columns/self.groupsCount/self.groupItemsCount)) {
                                                groupWdg["sizeX"] = self.gridsterOptions.columns/self.groupsCount/self.groupItemsCount; 
                                            }
                                            if(i == groupData.length -1 || i == self.groupItemsCount - 1) {
                                              row = 0;
                                              if(titleWdg)
                                              	col = titleWdg["col"] + titleWdg["sizeX"]
                                            } else {
                                                col = col  + groupWdg["sizeX"];
                                            }
                                        }
                                        groupWdg["options"]["data"] = wdgData;
                                        tmpWidgets.push(groupWdg);
                                    }
                                }
                                self.widgets = JSON.parse(JSON.stringify(tmpWidgets))
                                console.log("Widgets", self.widgets);
                                self.hasData = true;
                                self.noResults = false;
                                self.stalledData = false;
                            }  else {
                                self.noResults = true;
								if(self.resetDataOnConsume) {
									self.data = null;
									self.stalledData = false;
								}else{
									if(self.data != null  && self.data.length > 0) {
										self.stalledData = true;
									}
								}
                                self.dataFailureMessage = "No data returned.";
                                
                                if(self.noDataWidget) {
                                    self.hasData = true;
                                    self.noResults = false;
                                    self.stalledData = false;
                                    var tmpWidgets = [];
                                    self.widgets = [JSON.parse(JSON.stringify(self.noDataWidget))]
                                }
                                
                            }
                        } else {
                            self.noResults = true;
							if(self.resetDataOnConsume) {
								self.data = null;
								self.stalledData = false;
							}else{
								if(self.data != null  && self.data.length > 0) {
									self.stalledData = true;
								} 
							}
                            self.dataFailureMessage = "Failed to update data, invalid data format.";
                        } 
                    } else {
                        self.noResults = true;
						if(self.resetDataOnConsume) {
							self.data = null;
							self.stalledData = false;
						}else{
							if(self.message != null && self.message != "") {
								self.stalledData = true;
							} 
						}
                        self.dataFailureMessage = "Failed to update data, invalid data format.";
                    }
                }
            }
        }
});

angular
    .module('Combo')
    .component(
     'scriptrTitle',
     {
  
      bindings : {
        "data": "<?",
        "type": "@",
        "icon": "@",
        "transport": "@",
          "api" : "@",
          "msgTag" : "@",
          "httpMethod": "@",
          "apiParams" : "<?",
          "onFormatData" : "&",
          "fetchDataInterval": "@",
          "useWindowParams": "@",
          "serviceTag": "@",
          
          
          "messageFontFamily": "@",            
          "messageFontSize": "@",                      
          "messageFontWeight": "@",         
          "messageTextColor": "@",                   
          "messageBackgroundColor": "@",
          "backgroundColor": "@",
          "messageTextAlignment": "@" ,
          "borderSize": "@",
          "borderRadius": "@",
          "borderColor": "@"   
          
      },
      templateUrl:'/UIComponents/dashboard/frontend/components/combo/comboTitle.html',
      controller: function(httpClient, wsClient,dataService,$scope,$interval, $window, $element, $timeout) {
         var self = this;
          
         this.$onInit = function() {
               this.icon = (this.icon) ? this.icon : "//scriptr-cdn.s3.amazonaws.com/saepio-vertical/dev/images/occupancy-bg.svg";
               this.hasData = (this.message != null && this.message != "") ?  true : false;
             
               this.borderSize = (this.borderSize) ? this.borderSize : "1";
               this.borderRadius = (this.borderRadius) ? this.borderRadius : "0";
               this.borderColor = (this.borderColor) ? this.borderColor : "transparent";
               this.messageFontFamily = (this.messageFontFamily) ? this.messageFontFamily : "Arial";             
               this.messageFontSize = (this.messageFontSize) ? this.messageFontSize : "18";             
               this.messageFontWeight = (this.messageFontWeight) ? this.messageFontWeight : "600";             
               this.messageTextColor = (this.messageTextColor) ? this.messageTextColor : "#686868";             
               this.messageBackgroundColor = (this.messageBackgroundColor) ? this.messageBackgroundColor : "white";  
               this.backgroundColor = (this.backgroundColor) ? this.backgroundColor : "#009ABB";  
               this.messageTextAlignment = (this.messageTextAlignment) ? this.messageTextAlignment : "center";  
      	 }
         
          this.$postLink = function () {
              
            self.timeoutId = $timeout(self.resize.bind(self), 100);
            angular.element($window).on('resize', self.onResize);
            
            if((self.transport == "wss" && (self.api || self.msgTag)) || (self.transport == "https" && self.api)) {//Fetch data from backend
                initDataService(this.transport);
            } else if(self.data != null) { //set datas info when data binding is changed, this allows the user to change the data through a parent controller
                $scope.$watch(function( $scope ) {
                    // wait for the timeout
                    if($scope.$ctrl.data){
                        return $scope.$ctrl.data
                    }
                },function(newVal, oldVal){
                	if(JSON.stringify(newVal) != JSON.stringify(oldVal) || !self.hasData){
                        self.consumeData(newVal);
                    }
                });
            } else { //Listen on update-data event to build data
                 $scope.$on("update-data", function(event, data) {
                     if(data == null) { //typeOf data == 'undefined' || data === null
                          if(self.message == null || self.message == "") {
                              self.noResults = true;
                          } 
                      } else {
                         if(data[self.serviceTag])
                             self.consumeData(data[self.serviceTag]);
                         else
                             self.consumeData(data);
                     }  
                 });

                 $scope.$emit("waiting-for-data");
             }
        }
         
		this.calculateNotificationsDisplay = function() {
            if($element.parent().innerWidth() < 240) {
                self.usePopover = true;
            } else {
                self.usePopover = false;
            }
        }   
        
        this.onResize = function() {
            if (self.timeoutId != null) {
                $timeout.cancel(self.timeoutId);
            }
            self.timeoutId = $timeout(self.resize.bind(self), 100);
        }
        
        this.resize = function() {
            this.calculateNotificationsDisplay();
        }
        
        this.$onDestroy = function() {
            if(self.msgTag){
               wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
            }
            
            if(self.refreshTimer) {
                $interval.cancel( self.refreshTimer );
            }
            
            if (self.timeoutId != null) {
               $timeout.cancel(self.timeoutId);
           }
            
            angular.element($window).off('resize', self.onResize);
        }

        var initDataService = function(transport) {
             var requestInfo = {
                 "api": self.api,
                 "transport": transport,
                 "msgTag": self.msgTag,
                 "apiParams": self.apiParams,
                 "useWindowParams": self.useWindowParams,
                 "httpMethod": self.httpMethod,
                 "widgetId": $scope.$id
             };
            dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));

            if(self.fetchDataInterval && !self.refreshTimer) {
                //Assuming this is success
                self.refreshTimer = $interval(
                    function(){
                        initDataService(self.transport)
                    }, self.fetchDataInterval * 1000);
            }

        }              

        this.consumeData = function(data, response) {
             if(data.status && data.status == "failure") {
                 self.noResults = true;
                 self.dataFailureMessage = "Failed to fetch data.";
                 if(self.message) {
                     self.stalledData = true;
                     self.dataFailureMessage = "Failed to update data.";
                 }
             } else {
                 if(typeof self.onFormatData() == "function"){
                     data = self.onFormatData()(data, self);
                 }
                 if(data != null) {
                     if(typeof data == "object"){  
                         if(data && data.value && typeof data.value != null){
                             self.message = data.value;
                             self.hasData = true;
                             self.noResults = false;
                             self.stalledData = false;
                         }  else {
                             self.noResults = true;
                             if(self.message != null && self.message != "") {
                                 self.stalledData = true;
                             } 
                             self.dataFailureMessage = "Failed to update data, invalid data format.";
                         }
                     } else {
                         self.message = data;
                         self.hasData = true;
                         self.noResults = false;
                         self.stalledData = false;
                     } 
                    
                 } else {
                     self.noResults = true;
                     if(self.message != null && self.message != "") {
                         self.stalledData = true;
                     } 
                     self.dataFailureMessage = "Failed to update data, invalid data format.";
                 }
             }
            
        }
        }
	});


angular
    .module('Combo')
    .component('comboBox',
    {
        bindings : {
            "widget": "<",
            "counter": "<?"
        },
        templateUrl: '/UIComponents/dashboard/frontend/components/combo/comboBox.html',
        controller: function($translate, $rootScope, $scope, $compile, $element, _, $timeout) {
             var self = this;
            this.$onInit =  function() {
                console.log("Initialize Combo Box")
                $translate.use($rootScope.lang);
               
             /**   $rootScope.mobileBreakPoint = '(max-width: 480px)';
                $rootScope.tabletBreakPoint = '(max-width: 991px)';

                //We need this, to inform the widgets that we have reached the mobile breakpoint to resize based on it
                //Because gridster breakpoint is not the view port size but the gridster div size
                $scope.$on('gridster-mobile-changed', function(event, gridster) { 
                    if(gridster.isMobile) {
                        $rootScope.mobileBreakPoint = '(max-width:'+$(window).innerWidth()+'px)';
                    }
                });
                
                $scope.$on('gridster-item-transition-end', function(item) { 
                    setTimeout( function(){ $(window).trigger('resize'); window.dispatchEvent(new Event('resize'));},100);
                })**/
        
            }
            
            this.$postLink = function () {
                angular.element($element).ready(function() {
                      $timeout(function(){
                         if(self.widget) {
                            self.addWidget(self.widget);
                        }
                    },100)
                })
            }

          
            this.addWidget = function(widget) {
                var self = this;
                this.chart = angular.element(document.createElement(widget.type));
                angular.forEach(widget.options, function(value, key) {
                    if(angular.isArray(value) || angular.isObject(value)){
                        if (value["functionValue"] && value["functionArguments"]) {
                            // we can only pass a function as string in JSON ==> doing a real function
                            this.counter += 1;
                       		var counter = this.counter;
                            var functionName = (widget.name+ key+counter);
                        	self[functionName] = new Function(value.functionArguments, value.functionValue);
                            self.chart.attr(key, ("$ctrl."+functionName));
                        } else {
                            self.chart.attr(key, JSON.stringify(value, function(key, value) {
                              if (typeof value === "function") {
                                return value();
                              }
                              return value;
                            }));
                        }
                    } else if(key == "on-format-data") {
                        if(!this.counter){
                            this.counter = 0; 
                        }
                        this.counter += 1;
                        var counter = this.counter;
                        var functionName = (widget.name+ "FormatData"+counter);
                        self[functionName] = new Function('data', 'self', value);
                        widget["formatFunction"] = functionName;
                        widget["formatFunctionValue"] = value;
                        self.chart.attr("on-format-data", ("$ctrl."+functionName))
                    } else {
                     	self.chart.attr(key, value);
                 	}
                }, this);
                var el = $compile( this.chart )( $scope );
                var boxContent =  angular.element($element.find(".box-content"));
                boxContent.append(el);
            }

            
            
        }
    });

angular
    .module('Combo')
    .component(
    'scriptrPopoverCombo',
    {
        bindings : {
            combo: "<?",
            id: "@",
            popoverComboClass: "@",
            popoverComboPlacement: "@",
            popoverComboTrigger: "@",
            popoverIcon: "@",
            popoverImg: "@"
        },
        templateUrl:'/UIComponents/dashboard/frontend/components/combo/popoverCombo.html',
        controller: function($scope, httpClient, wsClient,dataService,$scope,$interval, $window, $element, $timeout, $compile, $templateCache) {
            
            var self = this;
            this.$onInit = function() {
                 
                 self.comboTemplate =  angular.element(document.createElement("div"));
                 self.comboTemplate.attr("class", (self.popoverComboClass) ? ("popoverComboWrapper " + self.popoverComboClass ) : "popoverComboWrapper ");
                
               self.comboTemplateCombo =  angular.element(document.createElement("scriptr-combo"));
               if(self.combo.type) 
                 	self.comboTemplateCombo.attr("type", "{{$ctrl.combo.type}}");
                 if(self.combo.icon) 
                 	self.comboTemplateCombo.attr("icon", "{{$ctrl.combo.icon}}");
                 if(self.combo.transport) 
                 	self.comboTemplateCombo.attr("transport", "{{$ctrl.combo.transport}}");
                 if(self.combo.api) 
                 	self.comboTemplateCombo.attr("api", "{{$ctrl.combo.api}}");
                 if(self.combo.apiParams) 
                 	self.comboTemplateCombo.attr("api-params", "$ctrl.combo.apiParams");
                if(self.combo.msgTag) 
                 	self.comboTemplateCombo.attr("msg-tag", "{{$ctrl.combo.msgTag}}");
                 if(self.combo.httpMethod) 
                 	self.comboTemplateCombo.attr("http-method", "{{$ctrl.combo.httpMethod}}");
                 if(self.combo.fetchDataInterval) 
                 	self.comboTemplateCombo.attr("fetch-data-interval", "{{$ctrl.combo.fetchDataInterval}}");
                if(self.combo.serviceTag) 
                 	self.comboTemplateCombo.attr("service-tag", "{{$ctrl.combo.serviceTag}}");
                 if(self.combo.useWindowParams) 
                 	self.comboTemplateCombo.attr("use-window-params", "{{$ctrl.combo.useWindowParams}}");
                 if(self.combo.data) 
                 	self.comboTemplateCombo.attr("data", "$ctrl.combo.data");
                 if(self.combo.gridsterConfig) 
                 	self.comboTemplateCombo.attr("gridster-config", "$ctrl.combo.gridsterConfig");
                 if(self.combo.mobileBreakPoint) 
                 	self.comboTemplateCombo.attr("mobile-break-point", "$ctrl.combo.mobileBreakPoint");
                if(self.combo.groupTitleField) 
                 	self.comboTemplateCombo.attr("group-title-field", "{{$ctrl.combo.groupTitleField}}");
                 if(self.combo.groupDataField) 
                 	self.comboTemplateCombo.attr("group-data-field",  "{{$ctrl.combo.groupDataField}}");
                 if(self.combo.titleWidget) 
                 	self.comboTemplateCombo.attr("title-widget", "$ctrl.combo.titleWidget");
                if(self.combo.groupWidget) 
                 	self.comboTemplateCombo.attr("group-widget", "$ctrl.combo.groupWidget");
                 if(self.combo.groupsCount) 
                 	self.comboTemplateCombo.attr("groups-count", "$ctrl.combo.groupsCount");
                 if(self.combo.groupItemsCount) 
                 	self.comboTemplateCombo.attr("group-items-count", "$ctrl.combo.groupItemsCount");
                if(self.combo.isVertical) 
                 	self.comboTemplateCombo.attr("is-vertical", "$ctrl.combo.isVertical");
                 if(self.combo.parentItemSizeX) 
                 	self.comboTemplateCombo.attr("parent-item-size-x", "$ctrl.combo.parentItemSizeX");
                 if(self.combo.parentItemSizeY) 
                 	self.comboTemplateCombo.attr("parent-item-size-y", "$ctrl.combo.parentItemSizeY");
                if(self.combo.noDataWidget) 
                 	self.comboTemplateCombo.attr("no-data-widget", "$ctrl.combo.noDataWidget");
                
                if(angular.isArray(self.combo.onFormatData) || angular.isObject(self.combo.onFormatData)){
                    if (self.combo.onFormatData["functionValue"] && self.combo.onFormatData["functionArguments"]) {
                        // we can only pass a function as string in JSON ==> doing a real function
                        this.counter += 1;
                        var counter = this.counter;
                        var functionName = ("scriptrComboPopoverOnFormatData"+ counter);
                        self[functionName] = new Function(self.combo.onFormatData.functionArguments, self.combo.onFormatData.functionValue);
                        self.comboTemplateCombo.attr("on-format-data", "$ctrl."+functionName);
                    }
                }
               
                 self.comboTemplate.append(self.comboTemplateCombo);
                 self.popoverComboTemplateId = (this.id) ? (this.id + "-" + $scope.$id) : ("popoverCombo-"+$scope.$id);
                 $templateCache.put(self.popoverComboTemplateId, self.comboTemplate[0].outerHTML);
                 self._popoverComboTemplateId = self.popoverComboTemplateId
            }
                
    }	
});