/**
 * Created by dfash on 6/9/16.
 */

(function () {
    angular
        .module('app.core')
        .config(['$urlRouterProvider', function ($urlRouterProvider) {

            // Prevent router from automatic state resolving
            $urlRouterProvider.deferIntercept();

            // Use instead
            $urlRouterProvider.otherwise( function($injector) {
                var $state = $injector.get("$state");
                $state.go('page.login');
            });
        }]);
})();