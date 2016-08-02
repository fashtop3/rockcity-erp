/**
 * Created by dfash on 6/19/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('ClientFormController', [
            '$scope', 'clientFactory', 'toaster', '$stateParams', '$rootScope', '$state', '$timeout',
            function($scope, clientFactory, toaster, $stateParams, $rootScope, $state, $timeout) {

                var vm = $scope;
                vm.disableView = false;

                vm.client = {name:'', address:'', title:'Mr', firstname:'', lastname:'', mobile:'', email:''};

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                if($state.is('app.client.edit')) {

                    vm.disableView = false;

                    vm.client = clientFactory.getClients().get({id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                        function(response) {
                            vm.client = response;
                        },
                        function (response) {

                            vm.disableView = true;

                            if(response.status == 403){
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                            else if(response.status == 404){
                                vm.alerts[0] = {'type':'danger', 'msg': "Client not found!."};
                            }
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
                            function (response) {
                                if(response.status == 403) {
                                    vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                    toaster.pop('error', 'Client', 'Data update Failed.');
                                }
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
                            function(response) {
                                if(response.status == 403) {
                                    vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                    toaster.pop('error', 'Client', response.data);
                                }
                            }
                        );
                    }
                };

            }]);
})();

