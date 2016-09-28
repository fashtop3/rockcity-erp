/**
 * Created by dfash on 9/28/16.
 */
(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('DiscountController', ['$scope', '$timeout', 'promocodeFactory',
            function ($scope, $timeout, promocodeFactory) {
                var vm = $scope;
                $scope.code = null;
                $scope.disabled = false;
                $scope.discountError = false;
                $scope.applied = false;

                $scope.discountReward = function () {
                    if (vm.code.length >= 9) {
                        $scope.disabled = true;
                        promocodeFactory.getReward().get({'a': 'discount', 'c': vm.code}).$promise.then(
                            function (response) {
                                console.log('applied', response.data);
                                $scope.disabled = false;
                                $scope.discountError = false;
                                $scope.applied = true;
                                $scope.$emit('discountPromocodeChanged', {'reward':response.data, 'promocode':vm.code});
                            },
                            function (response) {
                                $scope.discountError = response.data;
                                $scope.disabled = false;
                                $scope.applied = false;
                                $scope.$emit('discountPromocodeChanged', {'reward':0, 'promocode':null});
                            }
                        );
                    }
                    $scope.applied = false;
                    $scope.$emit('discountPromocodeChanged', {'reward':0, 'promocode':null});
                }

        }]);
})();