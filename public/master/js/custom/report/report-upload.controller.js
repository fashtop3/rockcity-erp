/**
 * Created by dfash on 6/16/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('uploadController', ['$scope', 'Upload', '$timeout', 'reportFactory', function ($scope, Upload, $timeout, reportFactory) {

            $scope.files = reportFactory.files;
            $scope.errorFiles = reportFactory.errorFiles;

            $scope.$watch('files', function(newValue) {
                reportFactory.files = newValue;
            });

            $scope.$watch('errorFiles', function(newValue) {
                reportFactory.errorFiles = newValue;
            });

            $scope.uploadFiles = function (files, errFiles) {
                reportFactory.files = files;
                reportFactory.errorFiles = errFiles;
                angular.forEach(files, function (file) {
                    file.upload = Upload.upload({
                        url: '/api/rep/files',
                        data: {file: file}
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                            reportFactory.appendUpload(file.result);
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        //console.log(evt);
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                });
            };
        }]);

//        .controller('MyCtrl', ['$scope', 'Upload', function ($scope, Upload) {
//            // upload later on reportForm submit or something similar
//            $scope.submitUpload = function() {
//                if ($scope.reportForm.file.$valid && $scope.file) {
//                    $scope.upload($scope.file);
//                }
//            };
//
//            // upload on file select or drop
//            $scope.upload = function (file) {
//                Upload.upload({
//                    url: 'upload/url',
//                    data: {file: file, 'username': $scope.username}
//                }).then(function (resp) {
//                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
//                }, function (resp) {
//                    console.log('Error status: ' + resp.status);
//                }, function (evt) {
//                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//                });
//            };
//            // for multiple files:
////            $scope.uploadFiles = function (files) {
////                if (files && files.length) {
////                    for (var i = 0; i < files.length; i++) {
////                        Upload.upload({..., data: {file: files[i]}, ...})...;
////                }
////                // or send them all together for HTML5 browsers:
////                Upload.upload({..., data: {file: files}, ...})...;
////        }
////}
//}]);


})();