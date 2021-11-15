angular.module('ScrollableTabs', ['mj.scrollingTabs', 'pascalprecht.translate', 'ngMaterial'])
angular
  .module('ScrollableTabs')
  .component("scriptrScrollableTabs", {
    "bindings": {
        "tabs": "<?",
        "onTabAdd": "&?",
        "onTabRemove": "&?", //Returns a promise
        "onTabEdit": "&?",
        "onTabsChanged": "&?",
        "onTabInitialLoad": "&?",
        "isNotEditable": "<?",
        "wrapperClass": "@",
        "defaultTabName": "@",
        "triggerRefresh": "<?",
        "attachDialogsTo": "<?"
    },
    "templateUrl": "/UIComponents/dashboard/frontend/components/scrollableTabs/tabs.html",
    "controller": function($translate, $scope, $timeout, $mdDialog, $q, $element) {

        var self = this;

        this.$onInit = function() {

      	   this.defaultTabName = (this.defaultTabName) ? this.defaultTabName : "Tab";
      	   this.id = $scope.$id;
            if(!self.tabs || self.tabs.length == 0) {
                if(this.isNotEditable) return;
                this._tabs = this.tabs;
                this.last_id = 0;
                this.addTab(); //Create a default tab
            } else {
                this._tabs = this.tabs;
                this.last_id = this._tabs.length;
            }
            
            this.wrapperClass = this.wrapperClass ? this.wrapperClass : (this.isNotEditable ? "col-xs-12" : "col-xs-10 col-md-11");

            this.renderTabs();

        };

        this.addTab = function () {
            var new_tab = {id: this.last_id, title: this.defaultTabName + " " + this.last_id , initialTitle:  this.defaultTabName + " " + this.last_id, content:'Just created ' + this.last_id, loaded: false};
            this._tabs.push(new_tab);
            this.last_id++;
            this.setActive(new_tab.id, new_tab);
            if(typeof self.onTabAdd == "function") this.onTabAdd({tab: new_tab, tabs: this._tabs});
            if(typeof self.onTabsChanged == "function")  this.onTabsChanged({tab: new_tab, tabs: this._tabs, "event": "added"});
        };

        this.renderTabs = function() {
            this.active_tab = _.find(this._tabs, function(tab){
                return tab.active; 
            });

            if(!this.active_tab) { //Set first tab as active
                this.setActive(this._tabs[0].id, this._tabs[0]);
            }

        };

        this.swithToEditMode = function($event, tab){
            if(this.isNotEditable) return;
            tab.currentTitle = tab.title;
            tab.isEditMode = true;
            $timeout(function(){
                $($event.target).siblings('input').focus();
            });
        }

        this.swithToShow = function($event, tab){
            if(this.isNotEditable) return;
            if(typeof self.onTabEdit == "function")
                this.onTabEdit({tab: tab, tabs: this._tabs});
            if(typeof self.onTabsChanged == "function")
                this.onTabsChanged({tab: tab, tabs: this._tabs, "event": "edited"});
            if(tab.title) {
                tab.currentTitle = "";
            } else {
                tab.title = tab.currentTitle;
            }
            tab.isEditMode = false;
        }


        this.showRemoveTabConfirmDlg = function($event, tab) {
            var confirmDialog = $mdDialog.confirm().title("Confirm remove").textContent("Are you sure you want to remove " + tab.title + " tab?").clickOutsideToClose(true).ok("Remove").cancel("Cancel").parent((self.attachDialogsTo) ? self.attachDialogsTo : null /**angular.element(document.querySelector(".scriptrScrollableTabs-"+self.id**/)
              
            $mdDialog.show(confirmDialog).then(function(){
                console.log("Removing tab", $event, tab)
                self.removeTab($event,tab)
            },function(){
                console.log("Cancel Removing tab", $event, tab)
            });
        }

        this.setActive = function(tab_id, tab){
            var setActiveTab = function(tab_id, setLoaded) {
                _.each(self._tabs, function(entry){
                    if(entry.id == tab.id){
                        entry.active = true;
                        if(setLoaded) 
                            entry.loaded = true;
                        self.active_tab = tab;
                    } else {
                        entry.active = false;
                    }
                });
                if(typeof self.onTabsChanged == "function") self.onTabsChanged({tab: self.active_tab, tabs: self._tabs, "event": "activated"});
            }
            if(!tab.loaded && typeof self.onTabInitialLoad == "function") {
                this.onTabInitialLoad({tab: tab, tabs: self._tabs}).then(function(data){
                    console.log("tab initial load success", self.active_tab);
                    setActiveTab(tab_id, tab);
                }, function(err){
                    console.error("tab initial load error", self.active_tab)
                })
            } else {
                setActiveTab(tab_id, tab);
            }
        };


        this.removeTab = function($event, tab){
            $event.stopPropagation();
            
            var removeTab = function(tab) {
                var to_remove = tab;
            	var index_of = self._tabs.indexOf(to_remove);
                if(to_remove.active){
                    var to_active = null;
                    if(index_of!=0){
                        to_active =self._tabs[index_of-1];
                        self._tabs.splice(index_of, 1);
                    } else {
                        self._tabs.splice(index_of, 1);
                        if(self._tabs.length)
                            to_active =self._tabs[0];
                    }
                    self.setActive(to_active.id, to_active);
                } else {
                    self._tabs.splice(index_of, 1);
                    if(typeof self.onTabsChanged == "function") self.onTabsChanged({tab: to_remove, tabs: self._tabs, event: "removed"});
                }
                
            }
            
            if(this.onTabRemove && typeof this.onTabRemove == "function") {
                this.onTabRemove({tab: tab, tabs: this._tabs}).then(
                        function(data, response) {
                            if(data && data.status && data.status == "failure") {
                                console.log("danger", "Could not delete floor. Please try again later");
                                return;
                            } else {
                                removeTab(tab);
                            }
                        },function(err){
                            console.log("failure", err);
                        }
                    );
                } else {
                    removeTab(tab);
                } 
        }
    }
});