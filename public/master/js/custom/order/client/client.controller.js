/**
 * Created by dfash on 4/29/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('ClientController', ['$scope', '$stateParams', 'clientFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            function($scope, $stateParams, clientFactory, DTOptionsBuilder, DTColumnDefBuilder) {

                var vm = $scope;

                vm.showClient = false;
                vm.clientMessage = "Loading...";

                if(angular.isDefined($stateParams.id)) {

                    //get client by id
                    vm.client = clientFactory.getClients().get({id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                        function (response) {
                            vm.client = response;
                            vm.showClient = true;
                        }, function (response) {
                            vm.clientMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    )
                };



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
                        //TODO: confirm delete

                        clientFactory.client().delete({'id':parseInt(vm.clients[$index].id)}).$promise.then(
                            function () {

                                clients.clients.splice($index, 1);
                                vm.alerts[0] = {'type':'success', 'msg':'Client removed successfully'};
                            },
                            function () {
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );

                    }

                }

            }]);
})();

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('ClientFormController', [
            '$scope', 'clientFactory', 'toaster', '$stateParams', '$rootScope', '$state', '$timeout',
            function($scope, clientFactory, toaster, $stateParams, $rootScope, $state, $timeout) {

                var vm = $scope;
                
                vm.client = {name:'', address:'', title:'Mr', firstname:'', lastname:'', mobile:'', email:''};

                //this.toaster = {
                //        type:  'success',
                //        title: 'Title',
                //        text:  'Message'
                //    };$stateParams.id

                if($state.$current.name == 'app.client.edit') {

                    vm.client = clientFactory.getClients().get({id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                        function(response) {
                            vm.client = response;
                        }
                    );
                }

                vm.clientSubmit = function() {

                    toaster.pop('wait', 'Client', 'Processing your request');

                    if(vm.client.id) {
                        clientFactory.update().save({'id':vm.client.id}, vm.client,
                            function() {
                                toaster.pop('success', 'Client', 'Data updated.');
                                $timeout(function(){
                                    $state.go('app.client');
                                }, 500);
                            },
                            function () {
                                toaster.pop('error', 'Client', 'Data update Failed.');
                            }
                        );
                    }
                    else
                    {
                        clientFactory.client().save(vm.client,
                            function(){
                                toaster.pop('success', 'Client Registration', 'Registration Successful.');
                                $timeout(function(){
                                    $state.go('app.client');
                                }, 1000);
                            },
                            function() {
                                toaster.pop('error', 'Client Registration', 'Registration Failed.');
                            }
                        );
                    }
                };

            }]);
})();

