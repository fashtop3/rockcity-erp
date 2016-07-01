/**
 * Created by dfash on 6/22/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('DriverController', ['$scope', '$rootScope', 'vehicleFactory',
            function($scope, $rootScope, vehicleFactory) {

                //collapse the menu bar
                $rootScope.app.layout.isCollapsed = true;

                var vm = $scope;
                vm.report = {}; // "water_level": "0", "oil_level": "0"};

                activate();
                ////////////////

                vm.motors = vehicleFactory.vehicles().query().$promise.then(
                    function (response) {
                        vm.motors = response;
                    }
                );

                vm.validateInput = function(name, type) {
                    var input = vm.reportForm[name];
                    return (input.$dirty || vm.submitted) && input.$error[type];
                };




                function activate() {
                    vm.report.time_inspect = new Date();
                    vm.report.time_washed = new Date();

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

                vm.submitVehicleReport = function() {
                    vehicleFactory.target().save($scope.target,
                        function () {
                            $scope.alerts[0] = {'type':'success', 'msg':'Target saved successfully'};
                            $scope.target = { '_token': _token.data};
                            form.$setPristine();
                        }, function(){
                            $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                        }
                    );
                }

            }]);
})();