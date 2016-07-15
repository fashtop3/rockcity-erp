/**
 * Created by dfash on 7/10/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AssessmentConfigController', ['$scope', '$state', 'assessmentService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function ($scope, $state, assessmentService, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

                var vm = $scope;

                vm.config = {"enable":false, "starts": "", "ends": ""};
                vm.configs = {};

                activate();

                ////////////////

                vm.submitSettings = function () {
                    if(angular.isDefined(vm.config.id)) {
                        assessmentService.getConfig().update({'id':parseInt(vm.config.id)}, vm.config,
                            function(response){
                                $state.reload();
                            },
                            function(response) {
                                if(response.status == 403) {
                                    vm.configsMessage = "Error: " + response.status + " " + response.statusText;
                                }
                            }
                        );
                    }
                    else {
                        assessmentService.getConfig().save(vm.config,
                            function(response){
                                $state.reload();
                            },
                            function(response) {
                                if(response.status == 403) {
                                    vm.configsMessage = "Error: " + response.status + " " + response.statusText;
                                }
                            }
                        );
                    }
                };

                vm.editConfig = function($index) {
                    vm.config.id = vm.configs[$index].id;
                    vm.config.enable = vm.configs[$index].enable == 1 ? true : false;
                    vm.config.starts = new Date(vm.configs[$index].starts);
                    vm.config.ends = new Date(vm.configs[$index].ends);
                };

                vm.isUpdate = function($index) {
                    return vm.config.id == vm.configs[$index].id;
                };


                /////////////

                function activate() {

                    // Changing data

                    assessmentService.getConfig().query().$promise.then(
                        function(response){
                            vm.configs = response;
                        },
                        function(response) {
                            vm.configsMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    );


                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(0).notSortable(),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2),
                        DTColumnDefBuilder.newColumnDef(3).notSortable()
                    ];

                    vm.remove = remove;

                    //TODO: add notification message
                    function remove($index)
                    {
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this Schedule?',
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
                                    assessmentService.getConfig().delete({'id':parseInt(vm.configs[$index].id)}).$promise.then(
                                        function () {
                                            vm.configs.splice($index, 1);
                                            vm.alerts[0] = {'type':'success', 'msg':'Schedule removed successfully'};
                                        },
                                        function () {
                                            if(response.status == 403) {
                                                vm.configMessage = "Error: " + response.status + " " + response.statusText;
                                            }
                                        }
                                    );
                                } else {
                                    SweetAlert.swal('Cancelled', 'Settings is safe :)', 'error');
                                }
                            });
                        })();

                    }

                }

            }]);
})();

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('AssessConfigDatePickerCtrl', AssessConfigDatePickerCtrl);

    function AssessConfigDatePickerCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
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
                //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.open = function($event) {
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
    }
})();

