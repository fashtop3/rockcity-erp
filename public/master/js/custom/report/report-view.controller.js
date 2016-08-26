/**
 * Created by dfash on 7/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('ReportViewController', ['$scope', 'reportFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert', '$state',
            function($scope, reportFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, $state) {
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

                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    // Changing data

                    if($state.is('app.admin.staff-report'))
                    {
                        vm.dtColumnDefs = [
                            DTColumnDefBuilder.newColumnDef(0).notSortable(),
                            DTColumnDefBuilder.newColumnDef(1).notSortable(),
                            DTColumnDefBuilder.newColumnDef(2).notSortable(),
                            DTColumnDefBuilder.newColumnDef(3).notSortable(),
                            DTColumnDefBuilder.newColumnDef(4).notSortable(),
                            DTColumnDefBuilder.newColumnDef(5).notSortable()
                        ];

                        reportFactory.getReports().query().$promise.then(
                            function(response){
                                vm.reports = response;
                            },
                            function(response) {
                                vm.reportMessage = "Error: " + response.status + " " + response.statusText;
                            }
                        );
                    }
                    else
                    {
                        vm.dtColumnDefs = [
                            DTColumnDefBuilder.newColumnDef(0).notSortable(),
                            DTColumnDefBuilder.newColumnDef(1).notSortable(),
                            DTColumnDefBuilder.newColumnDef(2).notSortable(),
                            DTColumnDefBuilder.newColumnDef(3).notSortable(),
                            DTColumnDefBuilder.newColumnDef(4).notSortable()
                        ];

                        reportFactory.report().query().$promise.then(
                            function(response){
                                vm.reports = response;
                            },
                            function(response) {
                                vm.reportMessage = "Error: " + response.status + " " + response.statusText;
                            }
                        );
                    }

                }
            }]);
})();