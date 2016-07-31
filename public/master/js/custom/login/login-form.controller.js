/**
 * Created by dfash on 4/29/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('LoginFormController', ['$scope', 'loginFactory', '$cookies', '$rootScope', '$state', '_token', '$window',
            function($scope, loginFactory, $cookies, $rootScope, $state, _token, $window) {

                $scope.account = {email:'', password:'', _token: _token.data};

                $scope.authMsg = false;

                $scope.login = function () {

                    $scope.disabled = true;

                    loginFactory.user().login($scope.account).$promise.then(
                        function(response) {

                            $rootScope.auth = response;
                            $cookies.put('auth', JSON.stringify($rootScope.auth));
                            $rootScope.authenticated = true;

                            if(loginFactory.toState){

                                if(loginFactory.toState.name == 'app.unauthorized') {
                                    $state.go('app.dashboard');
                                    return;
                                }

                                $window.history.back();
                                //if(loginFactory.toState.name == 'app.airtime.details'){}
                                //$state.go(loginFactory.toState.name);
                            }
                            else {

                                $state.go('app.dashboard');
                            }

                        },
                        function (response) {
                            $scope.disabled = false;
                            if(response.status == 403) {
                                $scope.authMsg = response.data;
                            }
                            else if(response.status == 422) {
                                $scope.authMsg = 'Username or password not valid';
                            }
                            else {
                                $scope.authMsg = 'Access denied! Try refreshing this page';
                            }
                        }
                    );
                };

                $scope.logout = function() {
                    loginFactory.logout();
                };
            }]);
})();

