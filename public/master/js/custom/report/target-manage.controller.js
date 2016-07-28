/**
 * Created by dfash on 6/5/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('TargetManageController', ['$scope', 'targetFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, targetFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

                var vm = $scope;

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                activate();

                ////////////////

                vm.startDate = function(date) {
                    return new Date(date);
                };

                function activate() {

                    // Changing data

                    targetFactory.target().query().$promise.then(function(response) {
                        vm.targets = response;
                    });

                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        //DTColumnDefBuilder.newColumnDef(0).notSortable(),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(4),
                        DTColumnDefBuilder.newColumnDef(5).notSortable()
                    ];

                    vm.modifyTarget = modifyTarget;
                    vm.removeTarget = removeTarget;

                    function modifyTarget($index)
                    {
                        vm.target.id = vm.targets[$index].id;
                        vm.target.name = vm.targets[$index].name;
                        vm.target.startDate = new Date(vm.targets[$index].startDate.toString());
                        vm.target.duration = vm.targets[$index].duration;
                        vm.target.user_id = vm.targets[$index].user_id.toString();
                        vm.target.amount = vm.targets[$index].amount;

                        vm.select(1);
                    }

                    function removeTarget($index)
                    {
                        //alert box for clearing cart
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this target?',
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
                                    //Todo: confirm first
                                    targetFactory.getTargets().delete({'id':parseInt(vm.targets[$index].id)}).$promise.then(
                                        function () {
                                            vm.targets.splice($index, 1);
                                            $scope.alerts[0] = {'type':'success', 'msg':'Target deleted successfully'};
                                        }, function(){
                                            $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                        }
                                    );
                                    SweetAlert.swal('Deleted!', 'Selected target has been deleted.', 'success');
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