/**
 * Created by dfash on 10/21/16.
 */

(function() {

    angular
        .module('app.order')
        .controller('AirtimeBulkAttachment', ['$scope', function($scope) {
            $scope.attachment = null;

            $scope.loadstart = function (e, reader, file) {
                console.log('loadstart', file);
            };

            $scope.loading = function() {
                console.log('loading');
            };

            $scope.loadend = function (e, reader, file, fileList, fileObjects, object) {
                console.log('loadend', fileList, fileObjects, object);
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
            }
        }]);

})();