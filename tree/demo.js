(function() {
   // console.clear();
'use strict';
angular.module('demoApp', ['ui.tree', 'ui.bootstrap','demoApp.list','demoApp.directives','demoApp.services'])

.controller('MainCtrl', function($scope,$timeout,MyList,HierarchyNodeService) {
  
    //console.log(HierarchyNodeService);
    $scope.baseList = MyList;
    $scope.list = $scope.baseList;   
  
})
.directive('indeterminateCheckbox',function(HierarchyNodeService) {
    return {
        restrict:'A',
        scope: {
          node:'='  
        },
        link: function(scope, element, attr) {
            
            scope.$watch('node',function(nv) {
                
                var flattenedTree = HierarchyNodeService.getAllChildren(scope.node,[]);
                flattenedTree = flattenedTree.map(function(n){ return n.isSelected });
                var initalLength = flattenedTree.length;
                var compactedTree = _.compact(flattenedTree);
                
                var r = compactedTree.length > 0 && compactedTree.length < flattenedTree.length;
                element.prop('indeterminate', r);
                
            },true);
            
        }
    }
})

})();