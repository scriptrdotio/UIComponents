angular.module('DashboardBuilder').service(
  "scriptrService",
  function(httpClient, $cookies) {
    this.saveScript = function(data, api) {
        return httpClient.post("UIComponents/dashboardBuilder/backend/api/saveDashboard", data)
    }
    
    this.getScript = function(data) {
      return httpClient.post(
        "UIComponents/dashboardBuilder/backend/api/getDashboard", data)
    }
    
    this.loadDashboards = function(data) {
        return httpClient.get(
            "UIComponents/dashboardBuilder/backend/api/loadScripts", {});
    }
    
    this.deleteDashboard = function(data) {
         return httpClient
          .get("UIComponents/dashboardBuilder/backend/api/deleteDashboard", data)
    }
    
     this.renameDashboard = function(data) {
         return httpClient
          .get("UIComponents/dashboardBuilder/backend/api/renameDashboard", data)
    }
    
    this.getToken = function(){
       return $cookies.get("token") || null;
    }
});

angular
  .module('DashboardBuilder')
  .component(
  'dashboard',
  {
    bindings : {
      widgets: "<",
      dashboard: "<",
      treeSearchCriteria: "@",
      iconExpand: "@",
      iconCollapse: "@",
      loadTree: "<?",
      showTree: "<",
      devicesModel: "@"
    },
    templateUrl: '/UIComponents/dashboardBuilder/javascript/components/dashboard.html',
    controller: function($scope, $rootScope, $timeout, $interval, $sce, $window, httpClient, wsClient, $cookies, common, commonAction, widgetsConfig, $uibModal, scriptrService, $route, $routeParams, $q, _, boxStyle, dashboardConfig, dataService) {
        
        $rootScope.isMobileDevice= function(){
            return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
        }
      
      this.wsClient = wsClient;
      var self = this;
      self.acls;  
      self.counter = 0;  
            
      this.$onInit = function() {
        self.showTree = (typeof this.showTree != 'undefined')? this.showTree : true,  
        self.loading = true;  
        self.showPanelMsg = false;  
          
        self.users = [{
          code : "anonymous",
          icon : "fa fa-group"    
        }];
          
        self.onACLChange = function(acls){
            self.acls = acls.join(";");
            var d = $q.defer(); 
            self.saveScript(null, null, true).then(
              function(data, response) {
                  console.log("success");
                  d.resolve(data, response);
              },
              function(err) {
                console.log("reject", err);
                d.reject(err);  
              });
             return d.promise; 
              
        }  
        
        this.urlParams = [];
        this.dashboardSettings = angular.copy(dashboardConfig.settings);
        this.frmGlobalOptions = {
          "destroyStrategy" : "remove",
          "formDefaults": {"feedback": true}
        }
        
        this.initializeDashboard();
        
        this.schema =  angular.copy(dashboardConfig.script.schema)
        this.form =   angular.copy(dashboardConfig.script.form)
        this.model = {}
        
        this.isInIde =  ($routeParams.scriptrIdeRef) ? true :  false;
        
        var scriptName = $routeParams.scriptName;
        if(scriptName) {
          this.openEditor(scriptName);
        } 
        
        this.slickConfig = {
            enabled: true,
            autoplay: true,
            draggable: false,
            autoplaySpeed: 3000,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                }
            }/**,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]**/
        };
        
        //Gidster Wall Options
        this.gridsterOptions = {
          defaultSizeY: 50,
          defaultSizeX:50,
          minRows: 1, // the minimum height of the grid, in rows
          maxRows: 100,
          columns: 10, // the width of the grid, in columns
          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
          rowHeight: '50', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
          margins: [10, 10], // the pixel distance between each widget
          defaultSizeX: 2, // the default width of a gridster item, if not specifed
          defaultSizeY: 1, // the default height of a gridster item, if not specified
          mobileBreakPoint:480, // if the screen is not wider that this, remove the grid layout and stack the items
          minColumns: 1, // the minimum columns the grid must have
          //MFE: overriden in each item widget definition
          //minSizeX: 1, // minimum column width of an item
         // maxSizeX: null, // maximum column width of an item
         // minSizeY: 2, // minumum row height of an item
          //maxSizeY: 2, // maximum row height of an item
          sparse: false,
          resizable: {
            enabled: true,
            handle: '.my-class', // optional selector for resize handle
            start: function(event, uiWidget, $element) {
                $(window).trigger('resize');
            	 //$scope.$broadcast("resize_widget", {wdg: uiWidget, element: $element})
            }, // optional callback fired when resize is started,
            resize: function(event, uiWidget, $element) {
                $(window).trigger('resize');
               //console.log("resize event called:",event, uiWidget, $element);
               // $scope.$broadcast("resize_widget", {wdg: uiWidget, element: $element})
            }, // optional callback fired when item is resized,
            stop: function(event, uiWidget, $element) {
              console.log("End resize:",event, uiWidget, $element);
               $timeout( function(){ $(window).trigger('resize')},100);
             // $scope.$broadcast("resize_widget", {wdg: uiWidget, element: $element})
              self.notifyDashboardChange();
            } //optional callback fired when item is finished resizing 
          },
          draggable: {
            enabled: true, // whether dragging items is supported
            handle: '.drag-box',
            start: function(event, uiWidget, $element) {
                //$(window).trigger('resize');
                setTimeout( function(){ $(window).trigger('resize'); window.dispatchEvent(new Event('resize'));},100);
                //$scope.$broadcast("drag_widget", {wdg: uiWidget, element: $element})
            }, // optional callback fired when drag is started,
            drag: function(event, uiWidget, $element) {
               // $(window).trigger('resize');
                setTimeout( function(){ $(window).trigger('resize'); window.dispatchEvent(new Event('resize'));},100);
                //$scope.$broadcast("drag_widget", {wdg: uiWidget, element: $element})
            }, // optional callback fired when item is moved,
            stop: function(event, uiWidget, $element) {
               //console.log("End drag", event, uiWidget, $element);
                //$(window).trigger('resize');
                setTimeout( function(){ $(window).trigger('resize'); window.dispatchEvent(new Event('resize'));},100);
                 self.notifyDashboardChange();
              //$scope.$broadcast("drag_widget", {wdg: uiWidget, element: $element})
            } // optional callback fired when item is finished dragging
          }
        };
          
        $scope.$watch('self.dashboard.widgets', function(items){
   //console.log("one of the items changed")
}, true);
          
        $scope.$on('gridster-resized', function(event, sizes, gridster) { 
      	  //console.log("gridster-resized");
          $(window).trigger('resize');     
        })
        
        $scope.$on('gridster-item-initialized', function(item) { 
      	  //console.log("gridster-item-initialized");
      	  $(window).trigger('resize');
        })
        

        
        this.widgetsConfig = widgetsConfig.widgets; 
        this.widgetsCommon = common;
        this.widgetsCommonAction = commonAction;
        this.dataLoaded = true;
        
      };
      
      //IDE CODE start
      this.$postLink = function() {
        var self = this;
        this.scriptrIdeRef = $routeParams.scriptrIdeRef;
        angular.element($window).on('message', function(event) {
            var msg = event.originalEvent.data;
            if(msg[0] == "get_editor_save_data-"+self.scriptrIdeRef) {
              	if($window.parent) {
                  $window.parent.postMessage([ "editor_save-" + self.scriptrIdeRef, self.getEditorValue()], "*");
                }
           }	
            if(msg[0] == "set_editor_load_data-"+self.scriptrIdeRef) {
              	self.setEditorValue(JSON.parse(msg[1]))
           }	
            		
        });
        
        if($window.parent) {
           $window.parent.postMessage([ "editor_loaded-" + this.scriptrIdeRef ], "*");
         }
      }
      
      this.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
       
      this.openEditor = function(scriptName){
        this.model = {"scriptName": scriptName};
        var self = this;
        scriptrService.getScript(this.model).then(
          function(data, response) {
            self.postLoadScript(scriptName, data);
          }, function(err) {
            console.error("reject", err);
          });
      }
      
      this.initializeDashboard =  function() {
          
          $scope.$on("waiting-for-data", function() {
              self.consumeData(self.data)
          })
          
          this.dashboard = { widgets: [] };
          if(this.widgets) {
            this.dashboard["widgets"] = this.widgets
          }
      };
        
      this.postLoadScript = function(scriptName, data) {
       	 var userConfigRegex = /\/\*#\*SCRIPTR_PLUGIN\*#\*(.*\n?.*)\*#\*#\*\//;
     	 if(data) {
           var userConfig = data.userConfig;
           var matches = userConfig.match(userConfigRegex);
           if(userConfig && matches) {
             var pluginContent = JSON.parse(matches[1]);
             if(pluginContent && pluginContent.metadata &&  pluginContent.metadata.name == "DashboardBuilder"){
                 
               this.widgets = [];
               var widgets = JSON.parse(pluginContent.metadata.plugindata).wdg;
                _.map(widgets, function(wdg, index) {
                  //MFE: backward compatibility for stored dahsboard where gridst. cols were 5 and row was match
                  if(wdg.schema && wdg.form) {
                      wdg.sizeX = wdg.sizeX * 2;
                      wdg.sizeY = wdg.sizeY * 3;
                      wdg.col = wdg.col * 2;
                      wdg.row = wdg.row * 3;
                  }
                    
                  var widgetDefinition =  _.findWhere(self.widgetsConfig, {name: wdg.name});
                   
                  //MFE: Needs to merge with addWidget, we are repeating logic
                  var form = angular.copy(widgetDefinition.form);
                  var schema =  angular.copy(widgetDefinition.schema);
                  var defaults = angular.copy(widgetDefinition.defaults);

                  if(widgetDefinition.commonActionData){
                      form[0].tabs = angular.copy([commonAction.formTab].concat(form[0].tabs));
                      schema.properties =  merge_options(schema.properties,commonAction.schemaFields); 
                  }
                    
                  if(widgetDefinition.commonData){
                      form[0].tabs = angular.copy([common.formTab].concat(form[0].tabs));
                      schema.properties =  merge_options(schema.properties,common.schemaFields); 
                  }
                    
                   form[0].tabs = angular.copy((form[0].tabs).concat(boxStyle.formTab));
            	   schema.properties = merge_options(schema.properties,boxStyle.schemaFields); 
                   form[0].selectedTabIndex = 0;
                   
                  wdg.form = angular.copy(form);
                  wdg.schema =  angular.copy(schema);
                  self.isManualAdd = false;
                  self.widgets.push(wdg);
               });  
               
               //this.widgets = JSON.parse(pluginContent.metadata.plugindata).wdg; //This needs fixing
               this.urlParams = JSON.parse(pluginContent.metadata.plugindata).urlParams;
               this.dashboardSettings.defaults = JSON.parse(pluginContent.metadata.plugindata).settings;
                 
               this.initDashboardDataService();
                 
               //Generate & apply the custom style
           	   var compiledCss  = generateCustomStyle(this.dashboardSettings.defaults); 
               applyCustomStyle(compiledCss);
                 
               this.dashboard["widgets"] = this.widgets;
               this.isEdit = true;
               this.savedScript = scriptName;
               this.setACLs(data);  
             } else {
               this.showAlert("danger", "Invalid dashboard script. Pass another script.")
               console.error("Invalid dashboard script. Pass another script.")
             }
           } else {
             this.showAlert("danger", "Invalid dashboard script. Pass another script.")
             console.error("Invalid dashboard script. Pass another script.")
           }
         } else {
           this.showAlert("danger", "Invalid dashboard script. Pass another script.")
           console.error("Invalid dashboard script. Pass another script.");
           return;
         }
       console.debug("resolve get script "+scriptName+ " :", data) 
     }
      
      this.clear = function() {
      	var self = this;
         var modalInstance = $uibModal.open({
              animation: true,
              component: 'confirmationModal',
        		  size: 'md',
           	  scope: $scope,
               resolve: {
                 data: function () {
                   return {"title": "Clear Board", "body": "Are you sure you want to empty your dashboard?"};
                 }
               }
             });
             modalInstance.result.then(function (wdgModel) {
               if(wdgModel) {
                  self.clearWidgets();
               } 
             }, function () {
                console.info('modal-component for clearing dashboard update dismissed at: ' + new Date());
             });
			
	  };
	  
	  this.clearWidgets = function() {
		this.dashboard.widgets = [];
        this.notifyDashboardChange();
	  };
      
      this.logout = function() {
        var authorization  = $.scriptr.authorization({loginPage: login.loginTarget});
		  authorization.logout();
	  };
        

      this.addWidget = function(wdg) {
          
          var form = angular.copy(wdg.form);
          var schema =  angular.copy(wdg.schema);
         
          
          if(wdg.commonActionData){
               form[0].tabs = angular.copy([commonAction.formTab].concat(form[0].tabs));
               schema.properties =  merge_options(schema.properties,commonAction.schemaFields); 
           }
          
           if(wdg.commonData){
              form[0].tabs = angular.copy([common.formTab].concat(form[0].tabs))
              schema.properties =  merge_options(schema.properties,common.schemaFields); 
          }
          form[0].tabs = angular.copy((form[0].tabs).concat(boxStyle.formTab));
          schema.properties = merge_options(schema.properties,boxStyle.schemaFields); 
          form[0].selectedTabIndex = 0;
  
          var model = angular.copy(wdg.defaults);
          if(self.dashboardSettings.defaults["transport"]) {
              model["dashboard-data-handler"] = true;
          }
          
          this.dashboard.widgets.push({
            "name": wdg.name,
            "sizeX": (wdg.box && wdg.box.sizeX) ? wdg.box.sizeX : 2,
            "sizeY": (wdg.box && wdg.box.sizeY) ? wdg.box.sizeY : 2,
            "minSizeX": (wdg.box && wdg.box.minSizeX) ? wdg.box.minSizeX : 2, // minimum column width of an item
            "maxSizeX": (wdg.box && wdg.box.maxSizeX) ? wdg.box.maxSizeX : null, // maximum column width of an item
            "minSizeY": (wdg.box && wdg.box.minSizeY) ? wdg.box.minSizeY : 2, // minumum row height of an item
            "maxSizeY": (wdg.box && wdg.box.maxSizeY) ? wdg.box.maxSizeY : null,
            "fitToWidget": (wdg.box && wdg.box.fitToWidget) ? wdg.box.fitToWidget : null,
            "label": wdg.label,
            "type": wdg.class,
            "options": model,
            "schema": schema,
            "form": form
          });
          this.isManualAdd = true;
          this.notifyDashboardChange();
      };
        
        
      
      
      var applyInlineStyle = function (style) {
          var styleElement = angular.element(document.querySelector('#dashboardInlineStyle'));
		  styleElement[0].innerText = style;
      }
      
      var applyPreviewInlineStyle = function (style) {
          var styleElement = angular.element(document.querySelector('#dashboardPreviewInlineStyle'));
		  styleElement[0].innerText = style;
      }
      
      var cleanPreviewInlineStyle = function () {
          var styleElement = angular.element(document.querySelector('#dashboardPreviewInlineStyle'));
		  styleElement[0].innerText = "";
      }
      
      //We need to add a watch for dashboard settings dataService object
      this.cancelDashboardDataService = function() {
           var msgTag = this.dashboardSettings.defaults["msg-tag"];
           console.log("destory dashboard data service", msgTag, $scope.$id);
            if(msgTag){
               wsClient.unsubscribe(msgTag, null, $scope.$id); 
            }
            
            if(self.refreshDataTimer){
                $interval.cancel( self.refreshTimer );
            }
      } 

    this.data = null;
        
    this.consumeData = function(data, response) {
        this.data = data;
        $scope.$broadcast("update-data", data);
    }
     
    this.$onDestroy = function() {
		self.resetDashboardDataService();
    }
    
    this.resetDashboardDataService = function() {
        console.log("destory dashboard data service props", self.dashboardSettings.defaults["msg-tag"], $scope.$id);
        if(self.dashboardSettings.defaults["msg-tag"]){
            wsClient.unsubscribe(self.dashboardSettings.defaults["msg-tag"], null, $scope.$id); 
        }

        if(self.refreshTimer) {
            $interval.cancel( self.refreshTimer );
        }
     }
     
     this.initDashboardDataService = function() {
        if(self.dashboardSettings.defaults["transport"]) {
            
            var requestInfo = {
                    "api": self.dashboardSettings.defaults["api"],
                    "transport": self.dashboardSettings.defaults["transport"],
                    "msgTag": self.dashboardSettings.defaults["msg-tag"],
                    "apiParams": self.dashboardSettings.defaults["api-params"],
                    "useWindowParams": self.dashboardSettings.defaults["use-window-params"],
                    "httpMethod": self.dashboardSettings.defaults["http-method"],
                    "widgetId": $scope.$id
               };
               dataService.scriptrRequest(requestInfo, self.consumeData.bind(self));
                
              if(self.dashboardSettings.defaults["fetch-data-interval"] && !self.refreshTimer) {
                  //Assuming this is success
                  self.refreshTimer = $interval(
                      function(){
                         self.initDashboardDataService()
                      }, self.dashboardSettings.defaults["fetch-data-interval"]  * 1000);
              }
        }
      }

      
     this.setDashboardSettings = function(redirectTarget) {
        var self = this; 
        var previewTheme  = self.dashboardSettings.defaults.theme;
        var savedTheme = self.dashboardSettings.defaults.theme;
          
        var previewInlineStyle = self.dashboardSettings.defaults["inline-style"];
        var savedInlineStyle = self.dashboardSettings.defaults["inline-style"];
        var form = angular.copy(self.dashboardSettings.form);
        var schema = angular.copy(self.dashboardSettings.schema);
        form[0].tabs = angular.copy([common.formTab].concat(form[0].tabs));
        schema.properties =  merge_options(schema.properties,common.schemaFields); 
        
        var modalInstance = $uibModal.open({
              animation: true,
              component: 'modalComponent',
       		  size: 'md',
              resolve: {
                widget: function () {
                  return {
                    "label":  self.dashboardSettings.label,
                    "options": self.dashboardSettings.defaults,
                    "schema": schema,
                    "form": form,
                    "onFormModelChange": function(modelValue, form, model) {
                        if(form.key.join(".") === "theme") {
                            model.style = angular.copy(__defaultsThemeStyles__[modelValue]);
                        }
                       	var compiledCss  = generateCustomStyle(model); 
               			applyPreviewCustomStyle(compiledCss);
                        if(previewTheme != model.theme) {
                            switchThemeCSS(previewTheme, model.theme)
                            previewTheme = model.theme;
                        }
                        
                        if(model["inline-style"]) {
                            applyPreviewInlineStyle(model["inline-style"]);
                        }
                    }
                  } 
                }
              }
            });

          
            modalInstance.result.then(function (dashboardSettingsModel) {
               
              console.log("modal-component dashboard settings data :", dashboardSettingsModel ,"submitted at: " + new Date());
              if(dashboardSettingsModel != "cancel") {
                if(self.dashboardSettings.defaults && self.dashboardSettings.defaults.publishChannel != dashboardSettingsModel.publishChannel){
                    self.wsClient.updatePublishingChannel(dashboardSettingsModel.publishChannel);
                }
                if(self.dashboardSettings.defaults && self.dashboardSettings.defaults.subscribeChannel != dashboardSettingsModel.subscribeChannel){
                  	self.wsClient.updateSubscriptionChannel(dashboardSettingsModel.subscribeChannel);
                } 
                  
                
                self.dashboardSettings.defaults = angular.copy(dashboardSettingsModel);
                  
               //Generate & apply the custom style
           	   var compiledCss  = generateCustomStyle(dashboardSettingsModel); 
               applyCustomStyle(compiledCss);
                  
                if(dashboardSettingsModel["inline-style"]) {
                     applyInlineStyle(dashboardSettingsModel["inline-style"]);
                }
                  
                self.notifyDashboardChange();
              } else {
                  if(previewTheme != savedTheme)
                		switchThemeCSS(previewTheme, savedTheme);
              }
                
              self.resetDashboardDataService()
              self.initDashboardDataService();
                
              cleanPreviewCustomStyle();
              cleanPreviewInlineStyle();
            }, function () {
              cleanPreviewCustomStyle();
              cleanPreviewInlineStyle();   
              if(previewTheme != savedTheme)
                	switchThemeCSS(previewTheme, savedTheme);
              console.log('modal-component dashboard settings dismissed at: ' + new Date());
            });
      };
        
      var generateCustomStyle = function(settings) {
           var template = document.querySelector('#handlebar-customcss-template').innerText;
           return Handlebars.compile(template)(settings); 
      }
      
      var applyCustomStyle = function (compiledCss) {
          var styleElement = angular.element(document.querySelector('#dashboardCustomStyle'));
		  styleElement[0].innerText = compiledCss;
      }
      
      var applyPreviewCustomStyle = function (compiledCss) {
          var styleElement = angular.element(document.querySelector('#dashboardPreviewCustomStyle'));
		  styleElement[0].innerText = compiledCss;
      }
      
      var cleanPreviewCustomStyle = function () {
          var styleElement = angular.element(document.querySelector('#dashboardPreviewCustomStyle'));
		  styleElement[0].innerText = "";
      }
      
      var switchThemeCSS = function(previousTheme, newTheme) {
            var prevTheme = document.getElementsByTagName("link").namedItem(previousTheme);
            var newTheme = document.getElementsByTagName("link").namedItem(newTheme);
            newTheme.disabled = false;
          	prevTheme.disabled = true;
      }
      
      this.saveDashboard = function(form, custom, aclEvent) {
		console.log("Form submit", form)
        var self = this;
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if ((form && form.$valid) || aclEvent) {
          var data = {};
           
          var tmp = angular.copy(this.dashboard.widgets);
          data["items"] = _.map(tmp, function(object, index){return _.omit(object, ["form", "schema"] )});
            
          data["urlParams"] = angular.copy(this.urlParams);
          data["token"] = scriptrService.getToken();

          self.dashboardSettings.defaults.redirectTarget = this.model.scriptName;
            console.log("dashboardSettings",self.dashboardSettings);
          data["dashboardSettings"] = angular.copy(this.dashboardSettings.defaults) //MFE: dashboardSettings channels info info needs to be retrieved from url or cookie
          
          //Generate custom Style to pass for the to save template
          data["compiledCss"] = generateCustomStyle(data["dashboardSettings"])
          
          var template = this.unsafe_tags(document.querySelector('#handlebar-template').innerHTML);
          var unescapedHtml = Handlebars.compile(template)(data);
            
          var scriptData = {}
          scriptData["content"] = unescapedHtml;
          scriptData["scriptName"] =  this.model.scriptName;
          scriptData["pluginData"] = JSON.stringify({"wdg": data["items"], "urlParams": data["urlParams"], "settings": data["dashboardSettings"]});
          if(self.isEdit) {
            scriptData["update"] = true;
          }
          if(self.savedScript) {
            scriptData["previousScriptName"]  = self.savedScript;
          }
          //scriptData["custom"] = this.custom; //TODO MFE: Removed, need to check backend
          scriptData["acls"] = this.acls;  
          var d = $q.defer();  
          scriptrService.saveScript(scriptData).then(
            function(data, response) {
               console.log("resolve", data)
               if(data.status == "failure") {
                  self.showAlert("danger", data.errorDetail);
               } else {
                 self.isEdit = true;
                 self.savedScript = scriptData["scriptName"];
                 self.showAlert("success", "The dashboard has been saved successfully.");
                 d.resolve(data, response);  
               }
               
            }, function(err) {
              self.showAlert("danger", err.data.response.metadata.errorDetail);
              console.log("reject", err.data.response.metadata.errorDetail);
              d.reject(err);  
		  });
          return d.promise;   
          //Save data to scriptr
          console.log();        
        }
      }
     
      this.setACLs = function(data){
          this.acls = data.ACL.execute;
          var array = this.acls.split(";");
          this.users = [];  
          for(var i = 0; i < array.length; i++){
              var obj = {};
              obj["code"] = array[i];
              this.users.push(obj);
          }    
      } 
      
     this.selectBranch = function(branch) {
         console.log("Clicked branch data", branch);
        //Get clicked item Name
        var itemLabel = branch.label
        //Check if it has a ui representation
        
        if(branch[itemLabel] && branch[itemLabel].widget && branch[itemLabel].widget.type) {
          var dmWdg = branch[itemLabel].widget;
          var wdg = _.findWhere(widgetsConfig.widgets, {"name": dmWdg.type});
          console.log("Widget is", wdg);
          
          if(!wdg) {
              wdg = _.findWhere(widgetsConfig.widgets, {"name": widgetsConfig.defaultWidget.name});
          }
          
          var form = angular.copy(wdg.form);
          var schema =  angular.copy(wdg.schema);
         
          if(wdg.commonActionData){
               form[0].tabs = angular.copy([commonAction.formTab].concat(form[0].tabs));
               schema.properties =  merge_options(schema.properties,commonAction.schemaFields); 
           }
            
          if(wdg.commonData){
              form[0].tabs = angular.copy([common.formTab].concat(form[0].tabs));
              schema.properties = merge_options(schema.properties,common.schemaFields); 
          }  
           
            
            form[0].tabs = angular.copy((form[0].tabs).concat(boxStyle.formTab));
            schema.properties = merge_options(schema.properties,boxStyle.schemaFields); 
            form[0].selectedTabIndex = 0;
            
          var defApiParamsCount = 0;
          if(dmWdg["default-api-params"]){
            defApiParamsCount = Object.keys(dmWdg["default-api-params"]).length;
          }

          var defaults = {};
          _.each(dmWdg, function(value, key) {
            defaults[key] = value;
          });

          //MFE: TO REVIEW BIG TIME
          var apiParamsOutput = "{";
          if(dmWdg["api-params-name"]) {
            _.each(dmWdg["api-params-name"], function(item, index) {
              self.urlParams =  self.urlParams.concat([item]);
              apiParamsOutput += "\""+item+"\": vm."+ item + ((index < dmWdg["api-params-name"].length -1 || defApiParamsCount > 0) ? "," : "");
            });
          }

          if(dmWdg["default-api-params"]) {
            var cnt = 0;
            _.each(dmWdg["default-api-params"], function(value, key) {
              self.urlParams =  self.urlParams.concat([key]);
              apiParamsOutput += "\""+key+"\": \""+ value + ((cnt < defApiParamsCount -1) ? "\"," : "\"");
              cnt++;
            });
            apiParamsOutput +="}";
          } else {
            apiParamsOutput +="}";
          }
          console.log("apiParamsOutput",apiParamsOutput )
          // self.urlParams =  self.urlParams.concat(Object.keys(dmWdg["api-params"]));
          defaults["api-params"] =  apiParamsOutput; 
          //, "msg-tag": dmWdg["msg-tag"]}

          self.dashboard.widgets.push({
            "name":  branch.label,
            "sizeX": (wdg.box && wdg.box.sizeX) ? wdg.box.sizeX : 2,
            "sizeY": (wdg.box && wdg.box.sizeY) ? wdg.box.sizeY : 2,
            "minSizeX": (wdg.box && wdg.box.minSizeX) ? wdg.box.minSizeX : 2, // minimum column width of an item
            "maxSizeX": (wdg.box && wdg.box.maxSizeX) ? wdg.box.maxSizeX : null, // maximum column width of an item
            "minSizeY": (wdg.box && wdg.box.minSizeY) ? wdg.box.minSizeY : 2, // minumum row height of an item
            "maxSizeY": (wdg.box && wdg.box.maxSizeY) ? wdg.box.maxSizeY : null,
            "fitToWidget": (wdg.box && wdg.box.fitToWidget) ? wdg.box.fitToWidget : null,
            "label": wdg.label,
            "type": wdg.class,
            "options": angular.extend(angular.copy(wdg.defaults), angular.copy(defaults)),
            "schema": schema,
            "form": form
          });
          self.notifyDashboardChange();
        } else {
          //self.showAlert("warning", "Device model attribute \""+ itemLabel + "\" has a no widget representation.")
          return;
        };
      }
     this.addCustomDashboard = function(){
        this.showDashboard = true;
        self.savedScript = null;
        this.switchStatus = true;
        this.model.scriptName = null;
        self.isEdit = false;
        this.dashboard.widgets = [];
      }
      this.showCustomDashboard = function(scriptName){
        this.showDashboard = true;
        this.scriptName = scriptName;
        this.switchStatus = false;
        this.dashboardScriptName = "/" + this.scriptName;
        this.openEditor(scriptName);
      }
      this.homeCallback = function(data){
        if(data && data.documents){
          self.customDashboards = data.documents;
          if(data.documents.length == 0){
              self.noDashboards = true;
          }else{
              self.noDashboards = false;
          } 
        }else{
          console.log("No data found");
        }
      }
      this.deleteDashboard = function(path){
        console.log(name, path);
        var params = {
          "path" : path,
          "name" : name
        }

        self = this;
        httpClient
          .get("UIComponents/dashboardBuilder/backend/api/deleteDashboard", params)
          .then(
          function(data, response) {
            console.log("success");
      //      self.showMsg("success", "The dashboard has been deleted successfully.");
          },
          function(err) {
       //     self.showMsg("failure", err.data.response.metadata.errorDetail);   
            console
              .log(
              "reject published promise",
              err);
          });
      }
      
      this.deleteDashboardPopUp = function(path, name){
        var modalInstance = $uibModal.open({
               controller: 'PopupCont',
               templateUrl: '/UIComponents/dashboardBuilder/javascript/components/deletePopup.html',
               resolve: {
                   dashboard: function () {
                       return self;
                   },
                   path: function () {
                       return path;
                   },
                   name: function () {
                       return name;
                   }
               }
           });  
      }

      this.renameDashboard = function(newName, path){
          
         var array = path.split("/");
         var oldName = array[array.length - 1]; 
          
         if(oldName != newName) {
             console.log(name, path);
            var params = {
              "path" : path,
              "newName" : newName
            }
            var self = this;
            httpClient
              .get("UIComponents/dashboardBuilder/backend/api/renameDashboard", params)
              .then(
              function(data, response) {
                if(data == "success"){
                    console.log("success");
                    self.showMsg("success", "The dashboard has been renamed successfully.");
                }else{
                    if(data && data.errorDetail){
                        self.showMsg("danger", data.errorDetail);
                    }else{
                        self.showMsg("danger", "An error has occured");
                    }
                }
              },
              function(err) {
                self.showMsg("danger", err.data.response.metadata.errorDetail);
                console
                  .log(
                  "reject published promise",
                  err);
              });
         }
          
      }
      
      this.viewDasboard = function() {
         if(this.savedScript){
              $window.open("/"+this.savedScript); 
         }else{
             self.showAlert("danger", "Please save your dashboard before viewing it");
         }
      };
      
      this.closeAlert = function() {
         this.show = false;
      };
      
      this.showAlert = function(type, content) {
         this.closeAlert();
         this.message = {
           "type": type,
           "content": content
         }
         this.show = true
      }
      
      this.closeMsg = function() {
          this.showPanelMsg = false;
      };

      this.showMsg = function(type, content) {
          this.closeMsg(); 
          this.message = {
              "type": type,
              "content": content
          }
          this.showPanelMsg = true;
      }
      
      this.getEditorValue = function() {
          var data = {};
          data["items"] = angular.copy(this.dashboard.widgets);
          data["urlParams"] = angular.copy(this.urlParams);
          data["dashboardSettings"] = angular.copy(this.dashboardSettings.defaults);
          data["staticdomain"] = $routeParams.staticdomain;
          var template = this.unsafe_tags(document.querySelector('#handlebar-template').innerHTML);
          var unescapedHtml = Handlebars.compile(template)(data);
          var scriptData = {}
          scriptData["content"] = unescapedHtml;
          scriptData["pluginData"] = JSON.stringify({"wdg": data["items"], "urlParams": data["urlParams"], "settings": data["dashboardSettings"]});
          return scriptData;
      };
        

       this.setEditorValue = function(pluginData) {
         if(pluginData) {
             this.widgets = pluginData.wdg; //This needs fixing
             this.urlParams = pluginData.urlParams;
             this.dashboardSettings.defaults = pluginData.settings;
             this.dashboard["widgets"] = this.widgets;
         }
       }
       
       this.notifyDashboardChange = function() {
         if($window.parent) {
             $window.parent.postMessage([ "editor_data_changed-" + this.scriptrIdeRef , this.getEditorValue()], "*");
           }
       }
      //IDEC CODE end 
       
    /**
         * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
         * @param obj1
         * @param obj2
         * @returns obj3 a new object based on obj1 and obj2
         */
       var merge_options = function(obj1,obj2){
           var obj3 = {};
           for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
           for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
           return obj3;
       }
    this.safe_tags= function(str) {
	    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
	};
	
	this.unsafe_tags= function(str) {
		 return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g,">").replace(/&quot;/g,"\"")
	};
    }
  });
angular
  .module('DashboardBuilder').component(
  'box',
  {
    require: {
      parent: '^^dashboard'
    },
    bindings : {
      "widget": "<"
    },
    templateUrl: '/UIComponents/dashboardBuilder/javascript/components/box.html',
    controller: function($rootScope,$scope, $compile, $element, $uibModal) {
      
      var boxSelf = this;
        
        boxSelf.isMobile=$rootScope.isMobileDevice();
        
      this.remove = function(widget) {
      	var self = this;
      	
      	var modalInstance = $uibModal.open({
            animation: true,
            component: 'confirmationModal',
      		  size: 'md',
         	  scope: $scope,
             resolve: {
               data: function () {
                 return {"title": "Remove Widget", "body": "Are you sure you want to remove widget from dashboard?"};
               }
             }
           });
           modalInstance.result.then(function (wdgModel) {
             if(wdgModel) {
                self.removeWidget(widget);
             } 
           }, function () {
              console.info('modal-component for removing widget dismissed at: ' + new Date());
           });
      	
      };
      
      this.removeWidget = function(widget) {
        delete this[widget["formatFunction"]];
        this.parent.dashboard.widgets.splice(this.parent.dashboard.widgets.indexOf(widget), 1);
        this.parent.notifyDashboardChange();
      };
      
      this.$onInit =  function() {
         $scope.$on('gridster-item-transition-end', function(item) { 
         	//console.log("gridster-item-transition end");
         //$(window).trigger('resize');
              setTimeout( function(){ $(window).trigger('resize'); window.dispatchEvent(new Event('resize'));},100);
        })
        
        $scope.$on('gridster-item-resized', function(item) {
		 	//console.log("gridster-item-resized");
         	//$(window).trigger('resize');
             setTimeout( function(){ $(window).trigger('resize'); window.dispatchEvent(new Event('resize'));},100);
        })
        var self = this;
        if(this.widget) {
          this.addWidget(this.widget)
        }
        
        $scope.$on("resize_widget", function(event, data) {
          	//console.log("Widget resize", event, data);
          //	$(window).trigger('resize');
             setTimeout( function(){ $(window).trigger('resize'); window.dispatchEvent(new Event('resize'));},100);
            if(self.widget == data.element) {
                if(self.widget.type == "scriptr-grid") {
                    var h = data.wdg.height();
                    data.element.options["grid-height"] = h - 110;
                    self.updateWidget(data.element.options)
                }
            }
            this.boxWidth = $element.width()
            boxSelf.parent.notifyDashboardChange();
        });
        
         $scope.$on("drag_widget", function(event, data) {
		      //console.log("Widget dragged", event, data);
             //$(window).trigger('resize');
              boxSelf.parent.notifyDashboardChange();
        });
        
       /**
        $scope.$on("update_widget", function(event, data) {
          console.log("Widget update", event, data);
          self.updateWidget(event, data)
        })**/
      };
      
      this.openSettings = function() {
        var self = this;
        var modalInstance = $uibModal.open({
              animation: true,
              component: 'modalComponent',
       		  size: 'lg',
          	  scope: $scope,
              resolve: {
                widget: function () {
                  return self.widget;
                }
              }
            });
            modalInstance.result.then(function (wdgModel) {
              if(wdgModel != "cancel") {
                 self.updateWidget(wdgModel)
              } 
            }, function () {
               console.info('modal-component for widget update dismissed at: ' + new Date());
            });
      };
        
      this.addWidget = function(widget) {
        var self = this;
        this.chart = angular.element(document.createElement(widget.type));

        angular.forEach(widget.options, function(value, key) {
         if(angular.isArray(value) || angular.isObject(value)){
             self.chart.attr(key, JSON.stringify(value));
         } else if(key == "on-format-data") {
             if(!this.parent.dashboard.counter){
                this.parent.dashboard.counter = 0; 
             }
             this.parent.dashboard.counter += 1;
             var counter = this.parent.dashboard.counter;
             var functionName = (widget.name+ "FormatData"+counter);
             self[functionName] = new Function('data', 'self', value);
             widget["formatFunction"] = functionName;
             widget["formatFunctionValue"] = value;
          //   delete widget.options["on-format-data"];
             self.chart.attr("on-format-data", ("$ctrl."+functionName))
         } else if(key == "on-action-clicked" || key == "on-clicked") {
             if(!this.parent.dashboard.counter){
                this.parent.dashboard.counter = 0; 
             }
             if(!this.widget.functions) {
                 widget["functions"] = [];
             }
             this.parent.dashboard.counter += 1;
             var counter = this.parent.dashboard.counter;
             var functionName = (widget.name+ (key.replace(/-/g, ''))+counter);
             self[functionName] = new Function('data', value);
             
             widget["functions"].push({"name": functionName, "value": value, "attribute": key});
             self.chart.attr(key, ("vm."+functionName));
         } else {
             self.chart.attr(key, value);
         }
            
            
           if(key == "default-info-window") {
             this.parent.dashboard.counter += 1;
             var counter = this.parent.dashboard.counter;
             var infoElement = angular.element(document.createElement("info-window"));
             infoElement.attr("id", value.id);
             infoElement.attr("template", value.template);
             infoElement.attr("max-width", value["max-width"]);
             infoElement.attr("max-height", value["max-height"]);
             self.chart.append(infoElement)
         }
          if(key == "source-info-window") {
             angular.forEach(value, function(v, k) {
                 var infoElement = angular.element(document.createElement("info-window"));
                 infoElement.attr("id", "infoWindowTemplate_"+v.source);
                 infoElement.attr("template", v.template);
                 infoElement.attr("max-width", v["max-width"]);
                 infoElement.attr("max-height", v["max-height"]);
                 self.chart.append(infoElement)
             });
         }
        }, this);
 
        var el = $compile( this.chart )( $scope );
        var boxContent =  angular.element($element.find(".box-content"));
        boxContent.append(el);
          
         if(self.parent.isManualAdd) {
                    setTimeout(function() {
                        
                        var top_of_element = boxContent.offset().top;
                        var bottom_of_element = boxContent.offset().top + boxContent.outerHeight(true);
                        var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
                        var top_of_screen = $(window).scrollTop();

                        if((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
                            // The element is visible, do nothing
                        }
                        else {
                            // The element is not visible, scroll into it
                            $('body').animate({ scrollTop: (boxContent.offset().top + $(boxContent.children()[0]).outerHeight(true)) }, 100);
                 	 }}, 200);
                }
      };
      
      this.updateWidget =  function(/**event, **/wdgModel) {
        var self = this;

        angular.forEach(wdgModel, function(value, key) {
           if(angular.isArray(value) || angular.isObject(value)){
             self.chart.attr(key, JSON.stringify(value));
         } else if(key == "on-format-data") {
             //var functionName = (self.widget.name+ "FormatData");
             self[self.widget["formatFunction"]] = new Function('data', value);
             self[self.widget["formatFunctionValue"]] = value;
             self.chart.attr("on-format-data", ("$ctrl."+self.widget["formatFunction"]))
         }  else {
             self.chart.attr(key, value);
         }
        }, this);
        
        var mdl = angular.copy(wdgModel);
        
        var _current = this.parent.dashboard.widgets.indexOf(this.widget)
        var _new = angular.copy(this.widget);
        _new["options"] = angular.copy(mdl);
        //this.parent.dashboard.widgets[this.parent.dashboard.widgets.indexOf(this.widget)]["options"] = 
        this.parent.dashboard.widgets.splice(_current, 1, _new);
        this.parent.notifyDashboardChange();
      // $compile( self.chart )( $scope );
          
       
      };
    }
})

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular
  .module('DashboardBuilder')
  .component('modalComponent', 
  {
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    templateUrl: '/UIComponents/dashboardBuilder/javascript/components/myModalContent.html',
    controller: function ($scope) {
        
        var self=this;
      this.$onInit = function () {
          
        this.widget = this.resolve.widget;
        
        $scope.$broadcast('schemaFormRedraw')
       
        this.frmGlobalOptions = {
          "destroyStrategy" : "remove",
          "formDefaults": {"feedback": false}
        }

        if(this.widget) {
            if(this.widget.schema) {
              this.schema =  angular.copy(this.widget.schema)
            } 
            if(this.widget.form) {
               this.form =   angular.copy(this.widget.form)
            }
            
            this.model =  (this.widget.options) ?  angular.copy(this.widget.options) : {}
            
            if(this.widget.onFormModelChange) {
                 this.frmGlobalOptions["formDefaults"].onChange = this.widget.onFormModelChange;
            }
              
          }
      };
            this.highlightTabs = function (formName) {
        let rootEl = $('form[name="' + formName + '"]');
        let tabHeaders = rootEl.find('ul li');
        let tabPanes = rootEl.find('.tab-pane') || [];
        rootEl.find('ul li a span.badge').remove();

        for (let i = 0; i < tabPanes.length; i++) {
            let errorCount = $(tabPanes[i]).find('div.ng-invalid').length;
            if (errorCount > 0) {
                $(tabHeaders[i].childNodes[0]).append('<span class="badge sf-badge-error">' + errorCount + '</span>');
            }
        }
    };
    

      this.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        console.log(this.model);
          
           setTimeout(function() {
          self.highlightTabs(form.$name);
        }, 100);

        // Then we check if the form is valid
        if (form.$valid) {
          //angular.extend(this.widget.options, this.model);
          this.close({$value: this.model});
          //do whatever you need to do with your data.
          //$scope.$emit('update_widget', {"model":  this.model});
          console.log("component_form_parent", this.model)
        } 
      };

      this.onCancel = function (myForm) {
        this.schema = {};
        this.form = {}
        this.model = angular.copy(this.widget.options);
        this.dismiss({$value: 'cancel'});
        console.log("Dissmissed")
      };

    }
});

angular
  .module('DashboardBuilder')
  .component('sidetoolbar', 
  {
  	bindings: {
    },
    templateUrl: '/UIComponents/dashboardBuilder/javascript/components/sideToolbar.html',
    controller: function ($scope, $mdSidenav) {
      this.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
          .then(function () {
            console.debug("close LEFT is done");
          });

      };
    }
});


angular
  .module('DashboardBuilder')
  .component('confirmationModal', 
  {
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    templateUrl: '/UIComponents/dashboardBuilder/javascript/components/confirmation.html',
    controller: function ($scope) {
      this.$onInit = function () {
        this.data = this.resolve.data;
      };

      this.onSubmit = function() {
          this.close({$value: true});
      };
      this.onCancel = function () {
        this.dismiss({$value: false});
      };

    }
});
   
