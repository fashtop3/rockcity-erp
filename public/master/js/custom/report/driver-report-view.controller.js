/**
 * Created by dfash on 7/9/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('DriverReportViewCtrl', ['$scope', '$rootScope', 'vehicleFactory', 'SweetAlert', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            function($scope, $rootScope, vehicleFactory, SweetAlert, DTOptionsBuilder, DTColumnDefBuilder) {

                var vm = $scope;
                //collapse the menu bar
                //$rootScope.app.layout.isCollapsed = true;
                vm.reports = {};

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };


                activate();

                ////////////////

                function activate() {

                    // Changing data

                    vehicleFactory.driverReport().query().$promise.then(
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
                        DTColumnDefBuilder.newColumnDef(0),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2),
                        DTColumnDefBuilder.newColumnDef(3),
                        DTColumnDefBuilder.newColumnDef(4).notSortable(),
                        DTColumnDefBuilder.newColumnDef(5).notSortable()
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
                                    vehicleFactory.driverReport().delete({'id':parseInt(vm.reports[$index].id)}).$promise.then(
                                        function () {

                                            vm.reports.splice($index, 1);
                                            vm.alerts[0] = {'type':'success', 'msg':'Report removed successfully'};
                                        },
                                        function () {
                                            if(response.status == 403) {
                                                vm.reportMessage = "Error: " + response.status + " " + response.statusText;
                                            }
                                        }
                                    );
                                } else {
                                    SweetAlert.swal('Cancelled', 'Report is safe :)', 'error');
                                }
                            });
                        })();

                    }

                }

            }]);
})();