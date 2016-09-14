///**
// * Created by dfash on 6/1/16.
// */
//
//(function () {
//    angular
//        .module('app.order')
//        .controller('VehicleCreateController', ['$scope', 'vehicleFactory', '_token',
//            function($scope, vehicleFactory, _token) {
//
//
//                $scope.vehicleForm = {/*'name': '', 'reg': '232', 'engineNo': 324535, 'colour':'err2',*/ '_token': ''};//_token.data};
//
//                $scope.alerts = [];
//                $scope.closeAlert = function(index) {
//                    $scope.alerts.splice(index, 1);
//                };
//
//                $scope.submitVehicle = function() {
//                    $scope.vehicleForm = {'name': '', 'reg': '', 'engineNo':'', 'colour':'', '_token': _token.data};
//                    $scope.vForm.$setPristine();
//                    //vehicleFactory.vehicle().save($scope.vehicleForm,
//                    //    function () {
//                    //        $scope.alerts[0] = {'type':'success', 'msg':'Vehicle added successfully'};
//                    //        $scope.vehicleForm = {'name': '', 'reg': '', 'engineNo':'', 'colour':'', '_token': _token.data};
//                    //        $scope.vForm.$setPristine();
//                    //    },
//                    //    function (response) {
//                    //        $scope.alerts[0] = {'type':'danger', 'msg':response.data};
//                    //    }
//                    //);
//                };
//
//            }]);
//})();