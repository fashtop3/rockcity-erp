/**
 * Created by dfash on 7/27/16.
 */

(function () {
    angular
        .module('app.order')
        .directive('reportChallenge', [function () {
            return {
                templateUrl: 'app/directives/rpt-challenge.html',
                replace: true,
                scope: {
                    challengesObject: '='
                }
            };
        }]);
})();