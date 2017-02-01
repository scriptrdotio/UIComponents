(function(){

angular.module('demoApp.services',[])
.service('HierarchyNodeService',function() {

    function lowerCase(str) {
        return str.split(' ').map(function(e){
            return e.toString().toLowerCase();  
        }).join(' ');
    }
    
    function treeSearch(tree, query) {
        if (!tree) {
            return {};
        }

        if (lowerCase(tree.title).indexOf(lowerCase(query)) > -1) {
            tree.match = true;
            return tree;
        }

        var branches = _.reduce(tree.items, function(acc, leaf) {
            var newLeaf = treeSearch(leaf, query);

            if (!_.isEmpty(newLeaf)) {
                acc.push(newLeaf);
            }

            return acc;
        }, []);

        if (_.size(branches) > 0) {
            var trunk = _.omit(tree, 'items');
            trunk.items = branches;
        
            return trunk;
        }
    
        return {};
    }   
    
   function getAllChildren(node,arr) {
       if(!node) return;
        arr.push(node);

        if(node.items) {
            //if the node has children call getSelected for each and concat to array
            node.items.forEach(function(childNode) {
                arr = arr.concat(getAllChildren(childNode,[]))  
            })
        }
        return arr;   
    }    
    

    
    function findParent(node,parent,targetNode,cb) {
        if(_.isEqual(node,targetNode)) {
            cb(parent);
            return;
        }
        
        if(node.items) {
            node.items.forEach(function(item){
                findParent(item,node,targetNode,cb);
            });
        }
    }
            
    
    function getSelected(node,arr) {
        //if(!node) return [];
        //if this node is selected add to array
        if(node.isSelected) {
            arr.push(node);
            return arr;
        }
        
        if(node.items) {
            //if the node has children call getSelected for each and concat to array
            node.items.forEach(function(childNode) {
                arr = arr.concat(getSelected(childNode,[]))  
            })
        }
        return arr;    
    }
    
    function selectChildren(children,val) {

        //set as selected
        children.isSelected = val;
        if(children.items) {
            //recursve to set all children as selected
            children.items.forEach(function(el) {
                selectChildren(el,val);  
            })
        }
    }
    
    function trimLeafs(node,parent) {
        
            if(!node.items) {
                //da end of the road
                delete parent.items;
            } else {
                node.items.forEach(function(item){
                    trimLeafs(item,node);
                })
            }
        
    }
    
    
   return {
       getAllChildren:getAllChildren,
       getSelected:getSelected,
       selectChildren:selectChildren,
       trimLeafs:trimLeafs,
       treeSearch:treeSearch,
       findParent:findParent
   };
   
})
    
}).call(this);