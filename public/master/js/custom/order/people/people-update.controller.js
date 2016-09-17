/**
 * Created by dfash on 6/4/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .controller('PeopleUpdateController', ['$scope', 'toaster', 'userFactory', '$stateParams', 'permissionFactory',
            function($scope, toaster, userFactory, $stateParams, permissionFactory){

                var vm = $scope;

                vm.disableView = false;

                vm.account = {'firstname':'','lastname':'', 'email':'', 'password':'', 'password_confirm':'',
                    'status':0, 'roles':{}, 'permissions':{} };

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };


                permissionFactory.getRoles().query().$promise.then(
                    function(response){
                        vm.roles = response;
                    }
                );

                //returns permission from database
                permissionFactory.getPermissions().query().$promise.then(
                    function(response){
                        vm.permissions = response;
                    }
                );

                //returns registered users
                vm.account = userFactory.getUsers()
                    .get({id: parseInt($stateParams.id)}).$promise.then(
                    function (response) {
                        vm.disableView = false;
                        vm.account = response;
                        check();
                    },function (response) {

                        vm.disableView = true;

                        if(response.status == 403){
                            vm.alerts[0] = {'type':'danger', 'msg':response.data};
                        }
                        else if(response.status == 404){
                            vm.alerts[0] = {'type':'danger', 'msg': "User not found!."};
                        }
                    }
                );

                function check()
                {
                    var roles = angular.copy(vm.account.roles);
                    var permissions = angular.copy(vm.account.permissions);

                    vm.account.roles = {};
                    vm.account.permissions = {};

                    angular.forEach(roles, function (value, key) {
                        vm.account.roles[value.id] = true;
                    });

                    angular.forEach(permissions, function (value, key) {
                        vm.account.permissions[value.id] = true;
                    });
                }

                vm.submitUserForm = function() {
                    toaster.pop('wait', 'User', 'Processing your request');
                    validateRolesPerm();

                    userFactory.adminUserUpdate().update({'id': parseInt($stateParams.id)}, vm.account).$promise.then(
                        function() {
                            //vm.account = {'status':0, 'roles':{}, 'permissions':{} };
                            vm.alerts[0] = {'type':'success', 'msg':'Account successfully updated'};
                            toaster.pop('success', 'User', 'Account updated successfully');
                        },
                        function(response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                toaster.pop('error', response.statusText, response.data);
                            }
                            else {
                                vm.alerts[0] = {'type':'danger', 'msg':'Token mismatch... Please refresh'};
                                toaster.pop('error', response.statusText, 'Token mismatch... Please refresh');
                            }

                        }
                    );
                };

                function validateRolesPerm() {

                    var roles = angular.copy(vm.account.roles);
                    var permissions = angular.copy(vm.account.permissions);

                    vm.account.roles = {};
                    vm.account.permissions = {};

                    angular.forEach(roles, function (value, key) {
                        if (value == true) {
                            this[key] = true;
                        }
                    }, vm.account.roles);

                    angular.forEach(permissions, function (value, key) {
                        if (value == true) {
                            this[key] = true;
                        }
                    }, vm.account.permissions);
                }

            }]);
})();
