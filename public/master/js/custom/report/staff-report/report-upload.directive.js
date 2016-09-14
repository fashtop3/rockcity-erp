/**
 * Created by dfash on 6/1/16.
 */

(function () {
    angular
        .module('app.order')
        .directive('reportUpload', [function () {
            return {
                templateUrl: 'app/directives/rpt-uploads.html',
                replace: true,
                scope: {
                    uploadsObject: '='
                }
            };
        }]);
})();