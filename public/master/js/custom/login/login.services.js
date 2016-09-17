/**
 * Created by dfash on 4/29/16.
 */

(function () {
    angular
        .module('app.order')
        .service('loginFactory', ['userFactory', '$resource', '$cookies', '$rootScope', 'baseURL', '$state', '$timeout', '$q',
            function(userFactory, $resource, $cookies, $rootScope, baseURL, $state, $timeout, $q) {

                var vm = this;
                //Removes Listeners before adding them
                //This line will solve the problem for multiple broadcast call
                $rootScope.$$listeners['userIsAuthenticated'] = [];
                this.toState = null;
                this.toParams = null;

                this.getUserStatus = function() {
                    var status = $cookies.get('auth');
                    if (status)
                        return true;

                    return false;
                };

                this.userData = function() {
                    var userObj = angular.fromJson($cookies.get('auth'));
                    return userObj;
                };

                this.authCheck = function() {

                    var deferred = $q.defer();
                    $resource(baseURL + 'auth/check').get(
                        function (response) {
                            $rootScope.auth = response;
                            $cookies.put('auth', JSON.stringify($rootScope.auth));

                            $rootScope.$broadcast('userIsAuthenticated', { any: {} });
                            deferred.resolve(response);
                        },
                        function (response) {
                            deferred.reject(response);
                        }
                    );

                    return deferred.promise;
                };

                /**
                 *  listener
                 */
                $rootScope.$on('userIsAuthenticated', function(event, args) {
                    //var anyThing = args.any;
                    // do what you want to do
                    //userFactory.loadPermissions();
                });

                $rootScope.logout = function() {
                    console.log('logout clicked');
                    $resource(baseURL + 'auth/logout').get(
                        function (response) {
                            //console.log(response);
                            redirect();
                        }
                    );

                };

                this.user = function() {
                    return $resource(baseURL + 'auth', null, {
                        'login': {
                            method:'POST',
                            headers: { 'X-Requested-With' :'XMLHttpRequest' }
                        }
                    });
                };

                this.redirect = function()
                {
                    $cookies.remove('auth');
                    $rootScope.authenticated = false;
                    $state.go('page.login');
                }

            }]);
})();