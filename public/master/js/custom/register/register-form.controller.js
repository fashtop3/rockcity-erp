/**
 * Created by dfash on 5/5/16.
 */

(function () {
    'use strict';

    angular
        .module('app.order')
        .controller('RegisterFormController', ['$scope', 'registerFactory', 'loginFactory', '$timeout',
            function($scope, registerFactory, loginFactory, $timeout) {

                $scope.register = {lastname:'', firstname:'', email:'',
                    password:'', password_confirm:'', agreed:false};
                $scope.disabled = false;

                $scope.submitReg = function() {

                    $scope.authMsg = '';

                    $scope.disabled = true;
                    //posts data to the server $scope.register
                    registerFactory.register().save($scope.register,
                        function() {
                            $scope.authMsg = false;
                            $scope.succMsg = "Account created successfully";
                            $scope.register = {lastname:'', firstname:'', email:'',
                                password:'', password_confirm:'', agreed:false};
                            $scope.registerForm.$setPristine();
                            $scope.disabled = false;

                        },
                        function (response) {
                            if(response.status == 403) {

                                $scope.succMsg = false;
                                $scope.disabled = false;
                                $scope.authMsg = "Registration failed. " + response.data;

                            }
                            else {
                                $scope.succMsg = false;
                                $scope.disabled = false;
                                $scope.authMsg = "Server error please try again later..";
                            }
                        }
                    )
                }
            }]);
})();


