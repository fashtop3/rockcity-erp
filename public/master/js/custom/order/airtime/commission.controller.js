/**
 * Created by dfash on 9/28/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('CommissionController', ['$scope', 'promocodeFactory',
            function ($scope, promocodeFactory) {
                var vm = $scope;
                $scope.code = null;
                $scope.disabled = false;
                $scope.commissionError = false;
                $scope.applied = false;

                $scope.commissionReward = function () {
                    if (vm.code.length >= 9) {
                        $scope.disabled = true;
                        promocodeFactory.getReward().get({'a': 'coupon', 'c': vm.code}).$promise.then(
                            function (response) {
                                console.log('applied', response.data);
                                $scope.disabled = false;
                                $scope.commissionError = false;
                                $scope.applied = true;
                                $scope.$emit('commissionPromocodeChanged', {'reward':response.data, 'promocode':vm.code});
                            },
                            function (response) {
                                $scope.commissionError = response.data;
                                $scope.disabled = false;
                                $scope.applied = false;
                                $scope.$emit('commissionPromocodeChanged', {'reward':0, 'promocode':null});
                            }
                        );
                    }
                    $scope.applied = false;
                    $scope.$emit('commissionPromocodeChanged', {'reward':0, 'promocode':null});
                }

        }]);
})();