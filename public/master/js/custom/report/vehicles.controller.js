/**
 * Created by dfash on 5/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('VehicleController', ['$scope', 'vehicleFactory', '_token',
            function($scope, vehicleFactory, _token) {

                $scope.vehicleForm = {/*'name': '', 'reg': '232', 'engineNo': 324535, 'colour':'err2',*/ '_token': _token.data};

                //console.log(_token);
                $scope.tab = 1;
                $scope.vehicles = [{}];

                //
                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.select = function(setTab) {
                    $scope.tab = setTab;

                };


                $scope.alerts = [];
                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                $scope.submitVehicle = function(form) {

                    if(angular.isDefined($scope.vehicleForm.id))
                    {
                        vehicleFactory.vehicles().update({'id':parseInt($scope.vehicleForm.id)}, $scope.vehicleForm).$promise.then(
                            function () {
                                $scope.alerts[0] = {'type':'success', 'msg':'Vehicle updated successfully'};
                                $scope.vehicleForm = { '_token': _token.data};
                                form.$setPristine();
                            }, function(){
                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );
                    }
                    else {
                        vehicleFactory.vehicles().save($scope.vehicleForm,
                            function () {
                                $scope.alerts[0] = {'type':'success', 'msg':'Vehicle added successfully'};
                                $scope.vehicleForm = {'name': '', 'reg': '', 'engineNo':'', 'colour':'', '_token': _token.data};
                                form.$setPristine();

                                $scope.select(1);
                            },
                            function (response) {
                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );
                    }
                };

            }]);
})();