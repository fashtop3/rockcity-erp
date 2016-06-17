/**
 * Created by dfash on 5/25/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AirtimeDefaultController', ['$scope', '$resource', 'baseURL', '$filter', 'ngTableParams', '$timeout', 'ngTableDataService', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            function($scope, $resource, baseURL, $filter, ngTableParams, $timeout, ngTableDataService, DTOptionsBuilder, DTColumnDefBuilder) {

                var vm = $scope;

                vm.showData = false;
                vm.dataMessage = 'Loading...';
                vm.isDisabled = false;


                activate();

                vm.search = function() {

                    vm.isDisabled = true;

                    $resource(baseURL + 'airtime?min=:min&max=:max').query({'min': vm.min_date, 'max': vm.max_date}).$promise.then(
                        function (response) {
                            vm.isDisabled = false;
                            vm.schedules = response;
                        }
                    );
                };

                ////////////////

                function activate() {

                    ////class
                    vm.propClass = function(val) {
                        return val == 1 ? 'label-success' : 'label-info';
                    };

                    /////date
                    vm.today = function() {
                        vm.dt = new Date();
                    };
                    vm.today();

                    vm.clear = function () {
                        vm.dt = null;
                    };

                    // Disable weekend selection
                    vm.disabled = function(date, mode) {
                        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
                    };

                    vm.toggleMin = function() {
                        vm.minDate = vm.minDate ? null : new Date();
                    };
                    vm.toggleMin();

                    vm.dateChanged = function(){
                      if(vm.max_date <= vm.min_date){
                          vm.max_date = null;
                      }
                    };

                    vm.min_open = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        vm.min_opened = true;
                    };

                    vm.max_open = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        vm.max_opened = true;
                    };

                    vm.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };

                    vm.initDate = new Date('2019-10-20');
                    vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                    vm.format = vm.formats[0];


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
                        DTColumnDefBuilder.newColumnDef(7).notSortable()
                    ];

                }

            }]);
})();