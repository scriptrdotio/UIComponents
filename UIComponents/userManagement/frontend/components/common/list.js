angular.module('Generic', [])
  .component('list', {
  bindings: {
    items: '<items',
    searchItem: '<',
    message: '@message',
    onLoad: '&',
    onDelete: '&',
    onUpdate: '&',
    onSelect: '&',
    onAdd: '&'
  },
  templateUrl: "/UIComponents/userManagement/frontend/components/common/list.html",
  controller: function(){
   	this.deleteItem = function(item) {
      this.onDelete({"item": item});
    },
      
    this.updateItem = function(item) {
      this.onUpdate({"item": item});
    }
    
    this.addItem = function() {
      this.onAdd();
    }

    this.loadItems = function(){
      this.onLoad()
    }
    
    this.resetSearchItem = function() {
      this.searchItem = ""
    }
  }
}).component('item', {
  bindings: {
    item:'<item',
    onDelete: '&',
    onUpdate: '&'
  },
  templateUrl: "/UIComponents/userManagement/frontend/components/common/item.html",
  controller: function(){
    this.deleteItem = function(item) {
      this.onDelete({user: item});
    },
      
    this.updateItem = function(item) {
      this.onUpdate(item);
    }
  }
  
})
