/**
 * Created by dfash on 5/18/16.
 */
(function () {
    'use strict';

    angular
        .module('app.order')
        .controller('DashboardController', ['loginFactory', '$scope', '$resource', 'baseURL', 'FileUploader', '_token',
            function(loginFactory, $scope, $resource, baseURL, FileUploader, _token) {

                $scope.alerts = [];

                $scope.profile = {_token: _token};

                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };



                $resource(baseURL + 'contacts').query().$promise.then(
                    function (response) {
                        $scope.contacts = response;
                    }
                );

                //profile
                $scope.profile = loginFactory.userData();

                //uploader object
                $scope.uploader = new FileUploader({
                    url: baseURL +'user/'+$scope.profile.id+'/upload'
                });

                //upload
                $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };

                //upload
                $scope.uploader.onCompleteAll = function() {
                    $scope.uploader.clearQueue();
                };


                //submit profile form
                $scope.updateProfile = function() {
                    //TODO: post it to server
                    $resource(baseURL + 'user/:id', null, {'update':{method:'PUT'}})
                        .update({'id':$scope.profile.id}, $scope.profile,
                        function (response) {
                            $scope.alerts[0] = {'type':'success', 'msg':'Profile updated successfully'};
                        },
                        function (response) {
                            $scope.alerts[0] = {'type':'danger', 'msg':'Profile update failed'};
                        }
                    );

                    //console.log($scope.profile);
                    $scope.uploader.uploadAll();
                };

                $scope.updatePassword = function() {
                    //Todo:post it to server
                }
            }]);
})();