/**
 * angular-schema-form-nwp-file-upload - Upload file type for Angular Schema Form
 * @version v0.1.5
 * @link https://github.com/saburab/angular-schema-form-nwp-file-upload
 * @license MIT
 */
'use strict';

angular
   .module('schemaForm')
   .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
      function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
         var defaultPatternMsg  = 'Wrong file type. Allowed types are ',
             defaultMaxSizeMsg1 = 'This file is too large. Maximum size allowed is ',
             defaultMaxSizeMsg2 = 'Current file size:',
             defaultMinItemsMsg = 'You have to upload at least one file',
             defaultMaxItemsMsg = 'You can\'t upload more than one file.';

         var nwpSinglefileUpload = function (name, schema, options) {
            if (schema.type === 'array' && schema.format === 'singlefile') {
               if (schema.pattern && schema.pattern.mimeType && !schema.pattern.validationMessage) {
                  schema.pattern.validationMessage = defaultPatternMsg;
               }
               if (schema.maxSize && schema.maxSize.maximum && !schema.maxSize.validationMessage) {
                  schema.maxSize.validationMessage  = defaultMaxSizeMsg1;
                  schema.maxSize.validationMessage2 = defaultMaxSizeMsg2;
               }
               if (schema.minItems && schema.minItems.minimum && !schema.minItems.validationMessage) {
                  schema.minItems.validationMessage = defaultMinItemsMsg;
               }
               if (schema.maxItems && schema.maxItems.maximum && !schema.maxItems.validationMessage) {
                  schema.maxItems.validationMessage = defaultMaxItemsMsg;
               }

               var f                                                  = schemaFormProvider.stdFormObj(name, schema, options);
               f.key                                                  = options.path;
               f.type                                                 = 'nwpFileUpload';
               options.lookup[sfPathProvider.stringify(options.path)] = f;
               return f;
            }
         };

         schemaFormProvider.defaults.array.unshift(nwpSinglefileUpload);

         var nwpMultifileUpload = function (name, schema, options) {
            if (schema.type === 'array' && schema.format === 'multifile') {
               if (schema.pattern && schema.pattern.mimeType && !schema.pattern.validationMessage) {
                  schema.pattern.validationMessage = defaultPatternMsg;
               }
               if (schema.maxSize && schema.maxSize.maximum && !schema.maxSize.validationMessage) {
                  schema.maxSize.validationMessage  = defaultMaxSizeMsg1;
                  schema.maxSize.validationMessage2 = defaultMaxSizeMsg2;
               }
               if (schema.minItems && schema.minItems.minimum && !schema.minItems.validationMessage) {
                  schema.minItems.validationMessage = defaultMinItemsMsg;
               }
               if (schema.maxItems && schema.maxItems.maximum && !schema.maxItems.validationMessage) {
                  schema.maxItems.validationMessage = defaultMaxItemsMsg;
               }

               var f                                                  = schemaFormProvider.stdFormObj(name, schema, options);
               f.key                                                  = options.path;
               f.type                                                 = 'nwpFileUpload';
               options.lookup[sfPathProvider.stringify(options.path)] = f;
               return f;
            }
         };

         schemaFormProvider.defaults.array.unshift(nwpMultifileUpload);

         schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'nwpFileUpload',
            '/UIComponents/dashboardBuilder/lib/schemaForm/nwp-file.html'
         );
      }
   ]);

angular
   .module('ngSchemaFormFile', [
      'ngFileUpload',
      'ngMessages',
      'underscore'
   ])
   .directive('ngSchemaFile', ["_",function (_) {
      return {
         restrict: 'A',
         scope:    true,
         require:  'ngModel',
         link:     function (scope, element, attrs) {
             
             scope.selectFile  = function (files,  invalidFiles) {
               if(invalidFiles) {
                   if(Array.isArray(invalidFiles)) {
                       scope.invalidFiles = invalidFiles;
                   } else {
                       scope.invalidFiles = [invalidFiles];
               	   }
               }
               if(files) {
                 if(Array.isArray(files)) {
                   scope.files = files;
                  } else {
                   scope.files = [files];
               	 }
                 if(files.length == 0) {
                     scope.ngModel.$setViewValue();
                 } else {
                     scope.ngModel.$setViewValue(scope.files);
                 }
                 scope.ngModel.$commitViewValue();
               } 
            };
             
            scope.removeFile  = function (file) { 
                   scope.files = _.filter(scope.ngModel.$viewValue, function(entry){return entry["$$hashKey"] != file.$$hashKey})
                   if(scope.files.length > 0)
                       scope.ngModel.$setViewValue(scope.files);
                   else
                       scope.ngModel.$setViewValue();
                	
                   scope.ngModel.$commitViewValue();
            };
             
            scope.$on('schemaFormValidate', function(){ scope.invalidFiles = [];})
         }
      };
   }]);