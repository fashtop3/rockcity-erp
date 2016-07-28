/**
 * Created by dfash on 7/27/16.
 */
(function () {
    angular
        .module('app.order')
        .directive('reportTask', [function () {
            return {
                templateUrl: 'app/directives/rpt-task.html',
                replace: true,
                scope: {
                    tasksObject: '='
                }
            };
        }]);
})();