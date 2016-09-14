/**
 * Created by dfash on 7/10/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AssessmentLogController', ['$scope', 'assessmentService', '$state', '$stateParams',
            function ($scope, assessmentService, $state, $stateParams) {

                $scope.datetostamp = function(date) {
                    return new Date(date);
                };

                assessmentService.getConfig().get({id: parseInt($stateParams.id)}).$promise.then(
                    function(response){
                        $scope.configs = response;
                    },
                    function(response) {
                        $state.go('app.assessment.config');
                    }
                );

                assessmentService.log().query({"id":parseInt($stateParams.id)}).$promise.then(
                    function(response) {
                        $scope.records = response;
                    },
                    function () {
                        $state.go('app.assessment.config');
                    }
                );
            }
        ]);
})();