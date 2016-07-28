/**
 * Created by dfash on 7/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('ReportViewController', ['$scope', 'reportFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, reportFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {
                var vm = $scope;
                //collapse the menu bar
                //$rootScope.app.layout.isCollapsed = true;
                vm.reports = {};

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                vm.created = function(date){
                    return new Date(date);
                };

                activate();

                ////////////////

                function activate() {

                    // Changing data

                    reportFactory.report().query().$promise.then(
                        function(response){
                            vm.reports = response;
                        },
                        function(response) {
                            vm.reportMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    );

                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(0).notSortable(),
                        DTColumnDefBuilder.newColumnDef(1).notSortable(),
                        DTColumnDefBuilder.newColumnDef(2).notSortable(),
                        DTColumnDefBuilder.newColumnDef(3).notSortable(),
                        DTColumnDefBuilder.newColumnDef(4).notSortable()
                        //DTColumnDefBuilder.newColumnDef(5).notSortable()
                    ];

                    vm.removeReport = removeReport;

                    function removeReport($index)
                    {
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this report?',
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
                                    //vehicleFactory.driverReport().delete({'id':parseInt(vm.reports[$index].id)}).$promise.then(
                                    //    function () {
                                    //
                                    //        vm.reports.splice($index, 1);
                                    //        vm.alerts[0] = {'type':'success', 'msg':'Report removed successfully'};
                                    //    },
                                    //    function () {
                                    //        if(response.status == 403) {
                                    //            vm.reportMessage = "Error: " + response.status + " " + response.statusText;
                                    //        }
                                    //    }
                                    //);
                                } else {
                                    SweetAlert.swal('Cancelled', 'Report is safe :)', 'error');
                                }
                            });
                        })();

                    }

                }
            }]);
})();