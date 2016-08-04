/**
 * Created by dfash on 4/29/16.
 */

(function () {
    angular
        .module('app.order')
        .service('loginFactory', ['$resource', '$cookies', '$rootScope', 'baseURL', '$state', 'PermissionStore', 'RoleStore',
            function($resource, $cookies, $rootScope, baseURL, $state, PermissionStore, RoleStore) {

                this.toState = null;
                this.toParams = null;

                this.getUserStatus = function() {
                    var status = $cookies.get('auth');
                    if(status) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };

                this.userData = function() {
                    var userObj = angular.fromJson($cookies.get('auth'));
                    return userObj;
                };

                this.authCheck = function() {
                    $resource(baseURL + 'auth/check').get(
                        function () {},
                        function () {
                            redirect();
                        }
                    );
                };

                $rootScope.logout = function() {
                    $resource(baseURL + 'auth/logout').query(
                        function (response) {
                            redirect();
                        }
                    );

                };

                //$rootScope.logout = function() {
                //    $resource(baseURL + 'auth/logout', null, {
                //        'doLogout': { method: 'GET', headers: { 'X-Requested-With' :'XMLHttpRequest' }} }).doLogout(
                //        function (response) {
                //            redirect();
                //        }
                //    );
                //
                //};

                this.user = function() {
                    return $resource(baseURL + 'auth', null, {
                        'login': {
                            method:'POST',
                            headers: { 'X-Requested-With' :'XMLHttpRequest' }
                        }
                    });
                };

                function redirect()
                {
                    $cookies.remove('auth');

                    $rootScope.authenticated = false;
                    $state.go('page.login');
                }

            }]);
})();