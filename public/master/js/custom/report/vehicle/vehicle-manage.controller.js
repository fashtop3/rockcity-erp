/**
 * Created by dfash on 6/6/16.
 */

/**
 * Created by dfash on 6/5/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('VehicleManageController', ['$scope', 'vehicleFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, vehicleFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

                var vm = $scope;

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                activate();

                ////////////////

                function activate() {

                    // Changing data

                    vehicleFactory.vehicles().query().$promise.then(function(response) {
                        vm.vehicles = response;
                    });

                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(10)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        //DTColumnDefBuilder.newColumnDef(0).notSortable(),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(4).notSortable()
                    ];

                    vm.modifyVehicle = modifyVehicle;
                    vm.removeVehicle = removeVehicle;

                    function modifyVehicle($index)
                    {
                        /** set object variable from paren controller VehicleController */
                        vm.vehicleForm.id = vm.vehicles[$index].id;
                        vm.vehicleForm.name = vm.vehicles[$index].name;
                        vm.vehicleForm.reg = vm.vehicles[$index].reg;
                        vm.vehicleForm.eng = vm.vehicles[$index].eng;
                        vm.vehicleForm.colour = vm.vehicles[$index].colour;

                        /** call select from the parent controller VehicleController */
                        vm.select(2, update=true);
                    }

                    function removeVehicle($index)
                    {
                        //alert box for clearing cart
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this vehicle?',
                                text: 'Your will not be able to recover your selected items back!',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'No, cancel pls!',
                                closeOnConfirm: false,
                                closeOnCancel: false
                            }, function(isConfirm){
                                if (isConfirm) {
                                    vehicleFactory.vehicles().delete({'id':parseInt(vm.vehicles[$index].id)}).$promise.then(
                                        function () {
                                            vm.vehicles.splice($index, 1);
                                            $scope.alerts[0] = {'type':'success', 'msg':'Vehicle removed successfully'};
                                            SweetAlert.swal('Deleted!', 'Selected vehicle has been deleted.', 'success');
                                        }, function(){
                                            if(response.status == 403) {
                                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                                SweetAlert.swal('Cancelled', response.data, 'error');
                                            }
                                        }
                                    );
                                } else {
                                    SweetAlert.swal('Cancelled', 'Your data is safe :)', 'error');
                                }
                            });
                        })();
                    }

                }
            }
        ]);
})();