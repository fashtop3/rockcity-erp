/**
 * Created by dfash on 4/29/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('ClientController', ['$scope', '$stateParams', 'clientFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, $stateParams, clientFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

                var vm = $scope;

                vm.showClient = false;
                vm.clientMessage = "Loading...";

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                if(angular.isDefined($stateParams.id)) {

                    //get client by id
                    vm.client = clientFactory.getClients().get({id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                        function (response) {
                            vm.client = response;
                            vm.showClient = true;
                        }, function (response) {
                            if(response.status == 403) {
                                vm.clientMessage = "Error: " + response.status + " " + response.statusText;
                            }
                        }
                    )
                }



                activate();

                ////////////////

                function activate() {

                    // Changing data

                    clientFactory.getClients().query().$promise.then(
                        function(response){
                            vm.clients = response;
                            vm.showclient = true;
                        },
                        function(response) {
                            vm.clientMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    );


                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2).notSortable(),
                        DTColumnDefBuilder.newColumnDef(3).notSortable(),
                        DTColumnDefBuilder.newColumnDef(4).notSortable(),
                        DTColumnDefBuilder.newColumnDef(5).notSortable()
                    ];

                    vm.removeClient = removeClient;

                    function removeClient($index)
                    {
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this client?',
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
                                    clientFactory.client().delete({'id':parseInt(vm.clients[$index].id)}).$promise.then(
                                        function () {
                                            vm.clients.splice($index, 1);
                                            vm.alerts[0] = {'type':'success', 'msg':'Client removed successfully'};
                                            SweetAlert.swal('Deleted!', 'Client has been deleted.', 'success');
                                        },
                                        function () {
                                            vm.clientMessage = 'Server error.';
                                            if(response.status == 403) {
                                                vm.clientMessage = "Error: " + response.status + " " + response.statusText;
                                            }
                                            SweetAlert.swal('Cancelled', vm.clientMessage, 'error');
                                        }
                                    );
                                } else {
                                    SweetAlert.swal('Cancelled', 'Client data is safe :)', 'error');
                                }
                            });
                        })();

                    }

                }

            }]);
})();