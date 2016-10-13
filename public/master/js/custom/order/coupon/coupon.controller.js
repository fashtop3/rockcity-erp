/**
 * Created by dfash on 9/29/16.
 */

(function () {
   'use strict';

    angular
        .module('app.order')
        .controller('CouponController', ['$scope', 'couponFactory', function($scope, couponFactory) {
            var vm = $scope;
            //vm.types = [{label:'Discount',value:'DISCOUNT'}, {label:'Commission',value:'COUPON'}];
            //vm.typeSelected = vm.types[0];
            vm.couponForm = {type:null, amount:null, 'reward':null, quantity:null, expiry_date:''};
            vm.disabled = false;
            vm.alerts = [];
            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };

            vm.generateCoupon = function() {
                vm.disabled = true;
                couponFactory.code().generate(vm.couponForm,
                    function (response) {
                        vm.couponForm = {};
                        vm.alerts[0] = {'type':'success', 'msg':response.data};
                        vm.disabled = false;
                    },
                    function (response) {
                        vm.alerts[0] = {'type':'danger', 'msg':response.data};
                        vm.disabled = false;
                    }
                )
            };

            vm.getRange = function(n) {
                return new Array(parseInt(n));
            };
        }]);
})();