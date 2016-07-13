/**
 * Created by dfash on 6/22/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('DriverController', ['$scope', '$rootScope', 'vehicleFactory', '$state', '$stateParams',
            function($scope, $rootScope, vehicleFactory, $state, $stateParams) {

                //collapse the menu bar
                //$rootScope.app.layout.isCollapsed = true;

                var vm = $scope;
                vm.report = { "info":{} }; // "water_level": "0", "oil_level": "0"};

                activate();
                ////////////////

                vm.motors = vehicleFactory.vehicles().query().$promise.then(
                    function (response) {
                        vm.motors = response;
                    }
                );

                vm.validateInput = function(name, type) {
                    var input = vm.reportForm[name];
                    return (!input.$pristine || vm.submitted) && input.$error[type];
                };


                if($state.is('app.driver.editReport')) {

                    if(angular.isDefined($stateParams.id)) {

                        console.log($stateParams.id);
                        vehicleFactory.driverReport().get({'id': parseInt($stateParams.id)}).$promise.then(
                            function (response) {
                                vm.report = response;
                            },
                            function (response) {
                                $state.go('app.driver.viewReport');
                            }
                        );
                    }

                }

                function activate() {
                    //vm.report.info.time_inspect = new Date();
                    //vm.report.info.time_washed = new Date();

                    vm.hstep = 1;
                    vm.mstep = 15;

                    vm.options = {
                        hstep: [1, 2, 3],
                        mstep: [1, 5, 10, 15, 25, 30]
                    };

                    vm.ismeridian = true;
                    vm.toggleMode = function() {
                        vm.ismeridian = ! vm.ismeridian;
                    };

                    vm.update = function() {
                        var d = new Date();
                        d.setHours( 14 );
                        d.setMinutes( 0 );
                        vm.mytime = d;
                    };

                    vm.changed = function () {
                        console.log('Time changed to: ' + vm.mytime);
                    };

                    vm.clear = function() {
                        vm.mytime = null;
                    };
                }

                vm.submitReport = function(form) {

                    vm.report.vehicle_id = vm.report.vehicle.id;

                    //if its edit mode
                    //Todo: add message to the screen
                    if($state.is('app.driver.editReport')) {
                        vehicleFactory.driverReport().update({'id':parseInt($stateParams.id)}, vm.report,
                            function (response) {
                                vm.report = response;
                                $scope.alerts[0] = {'type':'success', 'msg':'Report updated successfully'};
                                form.$setPristine();
                            }, function(response){
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                            }
                        );
                    }
                    else {
                        vehicleFactory.driverReport().report(vm.report,
                            function () {
                                vm.report = { "vehicle":vm.report.vehicle, "info":{} };
                                $scope.alerts[0] = {'type':'success', 'msg':'Report saved successfully'};
                                form.$setPristine();
                            }, function(response){
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                            }
                        );
                    }
                }

            }]);
})();