/**
 * Created by dfash on 7/8/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('AssessmentRecordController', ['$scope', 'assessmentService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, assessmentService, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

            var vm = $scope;

            vm.showRecords = false;
            vm.assessMessage = "Loading...";

            vm.alerts = [];
            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };

            //
            assessmentService.getAssessment().query()
                .$promise.then(
                function (response) {
                    vm.records = response;
                    vm.showRecords = true;
                }, function (response) {
                    if(response.status == 403) {
                        vm.assessMessage = "Error: " + response.status + " " + response.statusText;
                    }
                }
            );



            activate();

            ////////////////

            function activate() {

                // Changing data
                vm.dtOptions = DTOptionsBuilder.newOptions()
                    .withDisplayLength(100)
                    .withPaginationType('full_numbers');

                vm.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(0),
                    DTColumnDefBuilder.newColumnDef(1),
                    DTColumnDefBuilder.newColumnDef(2).notSortable()
                ];

                vm.remove = remove;

                function remove($index)
                {
                    //Todo: there is a bug here .... on delete record, the dialog boxes doesn't close
                    (function() {
                        SweetAlert.swal({
                            title: 'Are you sure you want to delete this record?',
                            text: 'Your will not be able to recover your selected data back!',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Yes, delete it!',
                            cancelButtonText: 'No, cancel pls!',
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function(isConfirm){
                            if (isConfirm) {
                                assessmentService.getAssessment().delete({'id':parseInt(vm.records[$index].id)}).$promise.then(
                                    function () {

                                        vm.records.splice($index, 1);
                                        vm.alerts[0] = {'type':'success', 'msg':'Assessment data removed successfully'};
                                    },
                                    function (response) {
                                        if(response.status == 403) {
                                            vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                        }
                                    }
                                );
                            } else {
                                SweetAlert.swal('Cancelled', 'Assessment data is safe :)', 'error');
                            }
                        });
                    })();

                }

            }
        }]);
})();