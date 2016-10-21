/**
 * Created by dfash on 10/21/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('AirtimeSlotAttachment', ['$scope', function($scope) {
            var vm = $scope;
            $scope.attachment = null;

            vm.clear = function() {
                vm.attachment = null;
                $scope.$emit('clear-slot-attachment');
            };

            $scope.loadstart = function (e, reader, file) {
                console.log('loadstart', file);
            };

            $scope.loading = function() {
                console.log('loading');
            };

            $scope.loadend = function (e, reader, file, fileList, fileObjects, fileObject) {
                console.log('loadend', fileList, fileObjects, fileObject);
                $scope.$emit('slot-attachment-started', {data:fileObject});
            };

            $scope.progress = function(event, reader) {
                var percent = (event.loaded*100)/event.total;
                console.log(percent.toFixed(2)+'%');
            };

            $scope.error = function(error) {
                console.log(error);
            };

            $scope.aborting = function(abort) {
                console.log(abort);
            };
        }]);

})();