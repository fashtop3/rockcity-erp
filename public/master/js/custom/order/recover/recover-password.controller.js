/**
 * Created by dfash on 6/13/16.
 */

(function () {
    'use strict';

    angular
        .module('app.order')
        .controller('RecoverPasswordController', ['$scope', 'userFactory', '$state', '$stateParams',
            function($scope, userFactory, $state, $stateParams) {

                var vm = $scope;

                vm.recover = {email:''};

                vm.disableView = false;

                if($state.is('page.change')) {
                    vm.recover.email = $stateParams.e;
                    vm.recover.token = $stateParams.m;
                }

                vm.submitRecoverForm = function() {
                    vm.showSuccess = false;
                    vm.showError = false;
                    vm.disableView = true;
                    //posts data to the server vm.register
                    userFactory.recover().confirm(vm.recover).$promise.then(
                        function() {
                            vm.disableView = false;
                            vm.showSuccess = true;
                            vm.showError = false;
                            vm.authMsg = "Reset link has been sent to your email.";
                            vm.recover = {email:''};
                            vm.registerForm.$setPristine();
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.showSuccess = false;
                                vm.showError = true;
                                vm.disableView = false;
                                vm.authMsg = response.data;
                            }
                        }
                    )
                };

                vm.submitChangePwd = function() {
                    vm.showSuccess = false;
                    vm.showError = false;
                    vm.disableView = true;
                    userFactory.recover().change(vm.recover).$promise.then(
                        function() {
                            vm.disableView = false;
                            vm.showSuccess = true;
                            vm.showError = false;
                            vm.authMsg = "Password successfully changed.";
                            vm.recover = {};
                            vm.changePwdForm.$setPristine();
                        },
                        function(response) {
                            if(response.status == 403) {
                                vm.showSuccess = false;
                                vm.showError = true;
                                vm.disableView = false;
                                vm.authMsg = response.data;
                            }
                        }
                    );
                }
            }]);
})();