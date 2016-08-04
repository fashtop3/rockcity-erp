/**
 * Created by dfash on 5/18/16.
 */
(function () {
    'use strict';

    angular
        .module('app.order')
        .controller('DashboardController', ['loginFactory', '$scope', '$resource', 'baseURL', 'FileUploader', '_token', 'toaster',
            function(loginFactory, $scope, $resource, baseURL, FileUploader, _token, toaster) {

                var vm = $scope;
                
                vm.alerts = [];

                vm.profile = {_token: _token};

                vm.reset = {_token: _token};

                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };


                $resource(baseURL + 'contacts').query().$promise.then(
                    function (response) {
                        vm.contacts = response;
                    }
                );

                //profile
                vm.profile = loginFactory.userData();

                //uploader object
                vm.uploader = new FileUploader({
                    url: baseURL +'user/'+vm.profile.id+'/upload'
                });

                //upload
                vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };

                //upload
                vm.uploader.onCompleteAll = function() {
                    vm.uploader.clearQueue();
                };


                //submit profile form
                vm.updateProfile = function() {
                    $resource(baseURL + 'user/:id', null, {'update':{method:'PUT'}})
                        .update({'id':vm.profile.id}, vm.profile,
                        function () {
                            vm.alerts[0] = {'type':'success', 'msg':'Profile updated successfully'};
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':'Profile update failed'};
                            }
                        }
                    );

                    //console.log(vm.profile);
                    //vm.uploader.uploadAll();
                };

                vm.updatePassword = function() {
                    $resource(baseURL + 'user/:id?action=password', null, {'update':{method:'PUT'}})
                        .update({'id':vm.profile.id}, vm.reset,
                        function () {
                            vm.alerts[0] = {'type':'success', 'msg':'Profile updated successfully'};
                            toaster.pop('success', 'Sent', 'Reset link has been sent to your mail');
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':'Profile update failed'};                            toaster.pop('success', 'Sent', 'Reset link has been sent to your mail ');
                                toaster.pop('error', 'Error', 'Failed to reset password');
                            }
                            else{
                                toaster.pop('error', 'Error', 'Failed: contact administrator');
                            }
                        }
                    );
                }
            }]);
})();