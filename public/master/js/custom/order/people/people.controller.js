/**
 * Created by dfash on 5/21/16.
 */
(function(){
    'use strict';

    angular
        .module('app.order')
        .controller('PeopleController', ['$scope', 'toaster', 'userFactory', 'registerFactory', 'permissionFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
        function($scope, toaster, userFactory, registerFactory, permissionFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert){

            var vm = $scope;

            //vm.search = {'roles': {'name':""}, 'permissions': {'name':""}, status:"0" };

            vm.account = {'firstname':'','lastname':'', 'email':'', 'password':'', 'password_confirm':'',
                'status':0, 'roles':{}, 'permissions':{} };
            vm.showPeople = false;
            vm.showPermissions = false;
            vm.peopleMessage = 'Loading...';

            vm.alerts = [];
            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };
            //return roles from database
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

            ///////////////////

            activate();

            ////////////////

            function activate() {

                // Changing data

                //returns registered users
                userFactory.getUsers()
                    .query().$promise.then(
                    function (response) {
                        vm.people = response;
                        vm.showPeople = true;
                    },function (response) {
                        if(response.status == 403) {
                            vm.showPeople = false;
                            vm.peopleMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    }
                );


                vm.dtOptions = DTOptionsBuilder.newOptions()
                    .withDisplayLength(100)
                    .withPaginationType('full_numbers');

                vm.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(1),
                    DTColumnDefBuilder.newColumnDef(2),
                    DTColumnDefBuilder.newColumnDef(3),
                    DTColumnDefBuilder.newColumnDef(4).notSortable()
                ];

                vm.removeUser = removeUser;

                function removeUser($index)
                {
                    //alert box for clearing cart
                    (function() {
                        SweetAlert.swal({
                            title: 'Are you sure you want to delete this user?',
                            text: 'Your will not be able to recover your selected data back!',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Yes, delete it!',
                            cancelButtonText: 'No, cancel pls!',
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function(isConfirm){
                            if (isConfirm) {
                                userFactory.getUsers().delete({'id':parseInt(vm.people[$index].id)}).$promise.then(
                                    function () {
                                        vm.people.splice($index, 1);
                                        $scope.alerts[0] = {'type':'success', 'msg':'User has been deleted successfully'};
                                        SweetAlert.swal('Deleted!', 'User has been deleted.', 'success');
                                    }, function(response){
                                        vm.clientMessage = 'Server error.';
                                        if(response.status == 403) {
                                            $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                            vm.clientMessage = response.data;
                                        }
                                        SweetAlert.swal('Cancelled', vm.clientMessage, 'error');                                    }
                                );
                            } else {
                                SweetAlert.swal('Cancelled', 'User data is safe :)', 'error');
                            }
                        });
                    })();
                }

            }


            vm.submitUserForm = function() {
                toaster.pop('wait', 'User', 'Processing your request');

                validateRolesPerm();

                registerFactory.register().save(vm.account,
                    function(response) {
                        vm.account = {'status':0, 'roles':{}, 'permissions':{} };
                        vm.alerts[0] = {'type':'success', 'msg':response.data};
                        toaster.pop('success', 'User', 'Account successfully created');
                    },
                    function(response) {
                        if(response.status == 403) {
                            $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            toaster.pop('error', response.statusText, response.data);
                        }
                        else {
                            $scope.alerts[0] = {'type':'danger', 'msg':'Token mismatch... Please refresh'};
                            toaster.pop('error', response.statusText, response.data);
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
