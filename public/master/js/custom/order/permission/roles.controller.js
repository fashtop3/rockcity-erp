/**
 * Created by dfash on 4/30/16.
 */

/**
 * Created by dfash on 4/29/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('RolesController', ['$scope', '$uibModal', '$stateParams', 'rolesFactory',
            function($scope, $uibModal, $stateParams, permissionFactory) {

                $scope.showRoles = false;
                $scope.roleMessage = 'loading..';
                $scope.roleEdit = false;
                $scope.permissionEdit = false;

                $scope.roles = permissionFactory.roles().query().$promise.then(
                    function(response){
                        $scope.roles = response;
                        $scope.showRoles = true;
                    },
                    function(response) {
                        $scope.showRoles = false;
                        console.log(response);
                    }
                );

                //role modal on edit click
                $scope.editRole = function (size, role) {

                    //console.log($scope.role);
                    var modalInstance = $uibModal.open({
                        templateUrl: '/roleModal.html',
                        controller: RoleModalInstanceCtrl,
                        size: size,
                        resolve: {
                            role: function () {
                                return role;
                            }
                        }
                    });

                    //TODO: button event of the dialog
                    modalInstance.result.then(function (updatedRole) { //on closed
                        console.log('updated: ', updatedRole);
                        //TODO: update database and reload $scope.roles
                        //TODO: Flash message
                    }, function () {
                        //on cancel clicked
                    });

                    //instance of the modal dialog
                    RoleModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'role'];
                    function RoleModalInstanceCtrl($scope, $uibModalInstance, role) {

                        $scope.role = angular.copy(role);
                        $scope.title = angular.copy(role.name);

                        $scope.ok = function () {
                            $uibModalInstance.close($scope.role);
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }

                };

                $scope.editPermission = function (size, role) {

                    var modalInstance = $uibModal.open({
                        templateUrl: '/permissionModal.html',
                        controller: PermissionModalInstanceCtrl,
                        size: size,
                        resolve: {
                            role: function () {
                                return role;
                            }
                        }
                    });

                    //TODO: button event of the dialog
                    modalInstance.result.then(function (updatedPerm) { //on closed
                        //TODO: update database with the new permission
                        //TODO: Flash message
                    }, function () {
                        //on cancel clicked
                    });

                    //instance of the modal dialog
                    PermissionModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance','permissionFactory', 'role'];
                    function PermissionModalInstanceCtrl($scope, $uibModalInstance, rolesFactory, role) {

                        $scope.role = angular.copy(role);
                        $scope.permMessage = 'loading...';
                        $scope.showPermissions = false;

                        $scope.permissions = rolesFactory.roles().query().$promise.then(
                            function(response){
                                $scope.permissions = response;
                                $scope.showPermissions = true;
                            },
                            function(response) {
                                $scope.showPermissions = false;
                                $scope.permMessage  = response.statusText;
                            }
                        );

                        $scope.ok = function () {
                            $uibModalInstance.close('close');
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }

                };


            }]);
})();