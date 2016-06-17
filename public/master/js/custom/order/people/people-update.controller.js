/**
 * Created by dfash on 6/4/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .controller('PeopleUpdateController', ['$scope', 'toaster', 'userFactory', '$stateParams',
            function($scope, toaster, userFactory, $stateParams){

                $scope.account = {'firstname':'','lastname':'', 'email':'', 'password':'', 'password_confirm':'',
                    'status':0, 'roles':{}, 'permissions':{} };

                $scope.alerts = [];
                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                //returns registered users
                $scope.account = userFactory.getUsers()
                    .get({id: parseInt($stateParams.id)}).$promise.then(
                    function (response) {
                        $scope.account = response;
                        check();
                    },function (response) {
                        $scope.showPeople = false;
                    }
                );

                function check()
                {
                    var roles = angular.copy($scope.account.roles);
                    var permissions = angular.copy($scope.account.permissions);

                    $scope.account.roles = {};
                    $scope.account.permissions = {};

                    angular.forEach(roles, function (value, key) {
                        $scope.account.roles[value.id] = true;
                    });

                    angular.forEach(permissions, function (value, key) {
                        $scope.account.permissions[value.id] = true;
                    });
                }

                $scope.submitUserForm = function() {
                    toaster.pop('wait', 'User', 'Processing your request');

                    validateRolesPerm();

                    userFactory.getUsers().update({'id': parseInt($stateParams.id)}, $scope.account).$promise.then(
                        function(response) {
                            //$scope.account = {'status':0, 'roles':{}, 'permissions':{} };
                            $scope.alerts[0] = {'type':'success', 'msg':'Account successfully updated'};
                            toaster.pop('success', 'User', 'Account updated successfully');
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

                    var roles = angular.copy($scope.account.roles);
                    var permissions = angular.copy($scope.account.permissions);

                    $scope.account.roles = {};
                    $scope.account.permissions = {};

                    angular.forEach(roles, function (value, key) {
                        if (value == true) {
                            this[key] = true;
                        }
                    }, $scope.account.roles);

                    angular.forEach(permissions, function (value, key) {
                        if (value == true) {
                            this[key] = true;
                        }
                    }, $scope.account.permissions);
                }

            }]);
})();
