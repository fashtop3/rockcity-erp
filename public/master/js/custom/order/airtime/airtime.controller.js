/**
 * Created by dfash on 5/25/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AirtimeController', ['$scope', '$resource', 'baseURL', '$filter', 'ngTableParams', '$timeout', 'ngTableDataService', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            function($scope, $resource, baseURL, $filter, ngTableParams, $timeout, ngTableDataService, DTOptionsBuilder, DTColumnDefBuilder) {

                var vm = $scope;

                vm.showData = false;
                vm.dataMessage = 'Loading...';

                activate();

                ////////////////

                function activate() {

                    // Changing data

                    $resource(baseURL + 'airtime').query().$promise.then(
                        function (response) {
                            vm.schedules = response;
                        }
                    );


                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(6).notSortable()
                    ];

                }
            }]);
})();