/**
 * Created by dfash on 7/8/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('SupervisorController', ['$scope', 'toaster', 'assessmentService', '$state', '$stateParams',
            function($scope, toaster, assessmentService, $state, $stateParams) {

                var vm = this;

                $scope.supervisor = {"preview":0,"attributes":{}, "habit":{}, "leadership":{}};


                //manages for routing
                assessmentService.getAssessment().get({"id":$stateParams.id}).$promise.then(
                    function (response) {
                        console.log($scope.supervisor = response.supervisor);
                        $scope.supervisor = response.supervisor;
                    },
                    function() {
                        $state.go('app.assessment.view');
                    }
                );


                $scope.submitPreview = function() {
                    $scope.supervisor.preview = 0;

                    toaster.pop('wait', 'Assessment', 'Processing your request');


                    //set the function
                    assessmentService.supervisor().save($scope.supervisor,
                        function (response) {

                            $scope.supervisor = response;
                            toaster.pop('success', 'Supervisor', 'Data saved.');

                            checkDataResp();

                        },
                        function (response) {
                            toaster.pop('error', 'Supervisor', 'Data submission Failed.');
                        }
                    );
                };

                //submit form
                $scope.submitComment = function() {

                    $scope.supervisor.preview = 1;

                    toaster.pop('wait', 'Supervisor', 'Processing your request');

                    assessmentService.supervisor().save($scope.supervisor,
                        function () {
                            toaster.pop('success', 'Supervisor', 'Data submitted.');
                            $state.go('app.assessment.view');
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                toaster.pop('error', 'Supervisor', 'Data submission Failed.');
                            }
                        }
                    );
                };

                var checkDataResp = function() {
                    if($scope.supervisor.attributes.length == 0) {
                        $scope.supervisor.attributes = {};
                    }

                    if($scope.supervisor.habit.length == 0) {
                        $scope.supervisor.habbit = {};
                    }

                    if($scope.supervisor.leadership.length == 0) {
                        $scope.supervisor.leadership = {};
                    }
                };

            }]);
})();