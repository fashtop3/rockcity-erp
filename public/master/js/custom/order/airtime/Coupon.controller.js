/**
 * Created by dfash on 9/28/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('CouponController', ['$scope', 'promocodeFactory',
            function ($scope, promocodeFactory) {
                var vm = $scope;
                $scope.disabled = false;
                $scope.couponError = false;

                $scope.commissionReward = function (commissionVar, promocode) {
                    if (code.length >= 8) {

                        $scope.disabled = true;

                        promocodeFactory.getReward().get({'a': 'discount', 'c': code}).then(
                            function (response) {
                                promocode.coupon = vm.code;
                                $scope.couponError = false;
                                commissionVar = response.data;
                            },
                            function (response) {
                                $scope.couponError = response.data;
                                $scope.disabled = false;
                            }
                        );
                    }
                }

        }]);
})();