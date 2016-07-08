/**
 * Created by dfash on 6/22/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('AssessmentController', ['$scope', 'toaster', 'assessmentService', '$state', '$stateParams',
            function($scope, toaster, assessmentService, $state, $stateParams) {

                var vm = $scope;

                $scope.form = {
                    "id": null, "preview": 0,
                    "part_one": { "personal":{ "date_confirm": {"date":'', "opened":false}, "appraisal_date": {"date":'', "opened":false} },
                        "qualifications":[{"date":'', "opened":false},{"date":'', "opened":false},{"date":'', "opened":false},{"date":'', "opened":false}]},
                    "part_two": { "review":[{}], "performance":{}},
                    "part_three": {"competencies":{}},
                    "supervisor": {"preview":0,"attributes":{}, "habit":{}, "leadership":{}}
                };

                //routing from create or from url
                if($state.is('app.assessment.edit')) {
                    assessmentService.getAssessment().get({"id":$stateParams.id}).$promise.then(
                        function (response) {
                            $scope.form = response;

                            checkDataResp();
                        },
                        function() {
                            $state.go('app.assessment.create', {"id":$scope.form.id});
                        }
                    );
                }

                vm.submitPreview = function() {
                    $scope.form.preview = 0;

                    toaster.pop('wait', 'Assessment', 'Processing your request');

                    assessmentService.assessment().save($scope.form,
                        function (response) {

                            $scope.form = response;
                            toaster.pop('success', 'Assessment', 'Data saved.');

                            checkDataResp();

                            $state.go('app.assessment.edit', {"id":$scope.form.id});
                        },
                        function (response) {
                            toaster.pop('error', 'Assessment', 'Data submission Failed.');
                        }
                    );
                };

                //submit form
                vm.submitAssessment = function() {

                    $scope.form.preview = 1;

                    toaster.pop('wait', 'Assessment', 'Processing your request');

                    assessmentService.assessment().save($scope.form,
                        function () {
                            toaster.pop('success', 'Assessment', 'Data submitted for review.');
                            $state.go('app.assessment.view');
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                toaster.pop('error', 'Assessment', 'Data submission Failed.');
                            }
                        }
                    );
                };

                var checkDataResp = function() {
                    if($scope.form.part_two.review.length == 0) {
                        if($scope.form.part_two.review[0].length == 0)
                            $scope.form.part_two.review = [{}];
                    }

                    if($scope.form.part_two.performance.length == 0) {
                        $scope.form.part_two.performance = {};
                    }

                    if($scope.form.part_three.competencies.length == 0) {
                        $scope.form.part_three.competencies = {};
                    }
                };

                //START-DATE functions
                vm.today = function() {
                    vm.dt = new Date();
                };
                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function(date, mode) {
                    return false;
                    //return ( mode === 'day' && ( date.getDay() === 0 /*|| date.getDay() === 6*/ ) );
                };

                vm.toggleMin = function() {
                    vm.minDate = vm.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function($event, dateObj) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    dateObj.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.dateFormat = vm.dateFormats[0];
                //END: Date functions
            }]);
})();