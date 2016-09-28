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

                $scope.discountReward = function (discountVar, promocode) {
                    if (code.length >= 8) {

                        $scope.disabled = true;

                        promocodeFactory.getReward().get({'a': 'discount', 'c': code}).then(
                            function (response) {
                                promocode.discount = vm.code;
                                $scope.discountError = false;
                                discountVar = response.data;
                            },
                            function (response) {
                                $scope.discountError = response.data;
                                $scope.disabled = false;
                            }
                        );
                    }
                }

        }]);
})();