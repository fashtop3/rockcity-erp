/**
 * Created by dfash on 7/27/16.
 */
(function () {
    angular
        .module('app.order')
        .directive('reportRemittance', [function () {
            return {
                templateUrl: 'app/directives/rpt-remittance.html',
                replace: true,
                scope: {
                    remittancesObject: '='
                }
            };
        }]);
})();