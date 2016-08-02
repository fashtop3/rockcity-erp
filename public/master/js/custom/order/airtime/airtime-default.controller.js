/**
 * Created by dfash on 5/25/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AirtimeDefaultController', ['$rootScope', '$scope', '$resource', 'baseURL', '$filter', 'ngTableParams', '$timeout', 'ngTableDataService', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            function($rootScope, $scope, $resource, baseURL, $filter, ngTableParams, $timeout, ngTableDataService, DTOptionsBuilder, DTColumnDefBuilder) {

                //collapse the menu bar
                $rootScope.app.layout.isCollapsed = true;

                var vm = $scope;

                vm.showData = false;
                vm.dataMessage = 'Loading...';
                vm.isDisabled = false;


                activate();

                vm.search = function(form) {

                    vm.isDisabled = true;

                    $resource(baseURL + 'airtime?min=:min&max=:max').query({'min': form.min_date.$modelValue, 'max': form.max_date.$modelValue}).$promise.then(
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

                    vm.dateChanged = function(){

                        console.log('clicked');
                        if(vm.max_date <= vm.min_date){
                            vm.max_date = null;
                        }
                    };

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
                        DTColumnDefBuilder.newColumnDef(0),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2),
                        DTColumnDefBuilder.newColumnDef(3),
                        DTColumnDefBuilder.newColumnDef(4),
                        DTColumnDefBuilder.newColumnDef(5),
                        DTColumnDefBuilder.newColumnDef(6),
                        DTColumnDefBuilder.newColumnDef(7).notSortable()
                    ];

                }

            }]);
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('MinDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {

                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('MaxDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {

                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                        vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();
