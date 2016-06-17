/**
 * Created by dfash on 4/29/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('AirtimeCreateController',
        function($scope, $cookies, toaster, clientFactory, userFactory, productFactory, airtimeFactory, SweetAlert, $uibModal, $timeout, $state, loginFactory) {

            var vm = $scope;

            vm.tab = 1;
            vm.bulkValid = false;
            vm.slotValid = false;
            vm.cart = [];
            vm.orderButton = undefined;


            vm.form = {
                bulk: false,
                price: 0.00,
                broadcast: 1,
                bulk_start_date:'',
                //bulk_start_time:'',
                bulk_end_date:'',
                //bulk_end_time:'',
                fixedSpot: false,
                trans_date:'',
                //trans_time:'',
                subCharge:'0',
                duration: 0,
                period: '',
                discount: '0',
                commission: '0',
                agree: false,
            };

            vm.cartTotals = 0;
            vm.vat = 0;
            vm.dsctAmnt = 0;
            vm.commAmnt = 0;
            vm.totalWOComm = 0;
            vm.totalWComm = 0;

            vm.periods = [{value:'premium', label:'Premium' }, {value:'regular', label:'Regular'}];

            vm.client = {};
            //vm.clients = clientFactory.getClients().query().$promise.then(
            //    function(response) {
            //        vm.clients = response;
            //    },
            //    function () {
            //        vm.clients = [];
            //    }
            //)
            //TODO: implement this for
            vm.refreshClient = function(search) {
                clientFactory.getClients().query().$promise.then(
                    function (response) {
                        vm.clients = response;
                    }
                );
            };

            //submit order
            vm.submitOrder = function () {

                var airtime = {};

                airtime.marketer = vm.marketer.selected;

                airtime.client = vm.client.selected;

                airtime.sub = {
                    'discount':vm.form.discount,
                    'discountAmt':vm.dsctAmnt,
                    'commission': vm.form.commission,
                    'commissionAmt': vm.commAmnt,
                    'subTotal': vm.cartTotals,
                    'vat': vm.vat,
                    'grandTotal': vm.totalWOComm,
                };

                airtime.cart = vm.cart;

                toaster.pop('wait', 'Order', 'Processing your request');

                vm.orderButton = true;
                airtimeFactory.order().save(airtime,
                    function (response) {

                        toaster.pop('success', 'Order', 'Order has been received.');
                        $timeout(function () {
                            $state.go('app.airtime');
                        }, 500);
                    },
                    function (response) {
                        vm.orderButton = false;
                        if(response.status == 403) {
                            toaster.pop('error', 'Order', response.data);
                        }
                        else{
                            toaster.pop('error', 'Order', 'Failed to process order!. please contact the administrator');
                        }
                    }
                );
            };

            vm.updateCartCookie = function() {
                $cookies.put('cart', vm.cart);
            };

            //set default to current user
            vm.marketer = {'selected': loginFactory.userData()};

            userFactory.marketers().query().$promise.then(
                function (response) {
                    vm.marketers = response;
                }
            );

            vm.product = {};
            vm.price = {index:'0'};
            vm.products = productFactory.getProducts().query().$promise.then(
                function (response) {
                    vm.products = response;
                }
            );

            vm.doDiscountCalc = function () {
                vm.vat = (5/100)*vm.cartTotals;
                vm.dsctAmnt = ((vm.form.discount)/100)*vm.cartTotals;
                vm.commAmnt = ((vm.form.commission)/100)*vm.cartTotals;;
                vm.totalWOComm = (vm.cartTotals + vm.vat) - vm.dsctAmnt - vm.commAmnt;
                vm.totalWComm = (vm.cartTotals + vm.vat) - vm.dsctAmnt;
            };

            vm.calProductSubscription = function(itemIdx) {
                var sum = 0;
                for(var j=0; j<vm.cart[itemIdx].subscriptions.length; j++) {

                    var subObj = vm.cart[itemIdx].subscriptions[j];

                    //it is bulk option
                    if(subObj.broadcast > 0) {
                        //do calculations for bulk option
                        sum += parseFloat(subObj.amount) * subObj.broadcast;
                        continue;
                    }
                    //it is add slot and / fixed spot
                    sum += parseFloat(subObj.amount) + parseFloat(subObj.subChargePrice);
                }
                return sum;
            };

            vm.calcCartTotalPrice = function() {
                var sum = 0;
                for(var i=0; i<vm.cart.length; i++) {
                    sum += vm.calProductSubscription(i);
                }
                vm.cartTotals = sum;

                //do discount calculations
                vm.doDiscountCalc();
            };

            vm.deleteCartItem = function(index) {
                delete vm.cart.splice(index,1);
                vm.calcCartTotalPrice();
            };

            vm.deleteSubscription = function(itemIndex, subIndex) {
                vm.cart[itemIndex].subscriptions.splice(subIndex, 1);
                if(vm.cart[itemIndex].subscriptions.length == 0) vm.deleteCartItem(itemIndex);
                vm.calcCartTotalPrice();
            };

            vm.productPrice = function () {
                return ( (vm.form.subCharge/100) * parseFloat(vm.form.price)) + parseFloat(vm.form.price);
            };

            vm.addBulk = function() {
                //TODO: do validation here
                if(vm.product.selected == '') return;

                var bulkSub = {
                    broadcast:vm.form.broadcast,
                    fixedSpot:false,
                    bulk_start_date:vm.form.bulk_start_date,
                    //bulk_start_time:vm.form.bulk_start_time,
                    bulk_end_date:vm.form.bulk_end_date,
                    //bulk_end_time:vm.form.bulk_end_time,
                    trans_date:null,
                    //trans_time:null,
                    duration: null,
                    period: vm.form.period,
                    amount: parseFloat(vm.form.price),
                    subCharge:'0',
                    subChargePrice:0
                };

                vm.addItemToCart(); //attempts adding item to cart

                var index = vm.cartItemIndex(vm.product.selected.id);
                //for(var i = 0; i<vm.form.broadcast; i++)
                //{
                vm.cart[index].subscriptions.push(bulkSub);
                //}

                vm.calcCartTotalPrice();//recalculate cart price

                //reset bulk option field
                vm.form.broadcast = 0;
                vm.form.bulk_start_date = '';
                vm.form.bulk_start_time = '';
                vm.form.bulk_end_date = '';
                vm.form.bulk_end_time = '';

            };

            //on add slot button clicked
            vm.addSlot = function() {
                if(vm.product.selected == '') return;
                if(vm.form.price == 0) return;

                //new item object is created here to the vm
                vm.addItemToCart();

                var slotSub = {
                    fixedSpot:vm.form.fixedSpot,
                    bulk_start_date:null,
                    //bulk_start_time:null,
                    trans_date: vm.form.trans_date,
                    //trans_time: vm.form.trans_time,
                    duration: vm.form.duration,
                    period: vm.form.period,
                    amount: parseFloat(vm.form.price),
                    subCharge:vm.form.subCharge,
                    subChargePrice: ((vm.form.subCharge/100) * parseFloat(vm.form.price))
                };
                var index = vm.cartItemIndex(vm.product.selected.id); //item obj created in vm.addItemToCart();
                vm.cart[index].subscriptions.push(slotSub);

                vm.calcCartTotalPrice();

                //reset Schedule details field
                vm.form.fixedSpot = false;
                vm.form.subCharge = '0';
                vm.form.trans_date = '';
                vm.form.trans_time = '';
                vm.form.duration = 0;

                //vm.updateCartCookie();
            };

            vm.minusBroadcast = function(itemIdx, subIdx) {
                if(vm.cart[itemIdx].subscriptions[subIdx].broadcast == 1) return;
                --vm.cart[itemIdx].subscriptions[subIdx].broadcast;
                vm.calcCartTotalPrice();
            };

            vm.plusBroadcast = function (itemIdx, subIdx) {
                ++vm.cart[itemIdx].subscriptions[subIdx].broadcast;
                vm.calcCartTotalPrice();
            };

            vm.searchCartItem = function(product_id){
                for(var i= 0; i<vm.cart.length; i++){
                    if(vm.cart[i].id == product_id)
                        return true;
                }
                return false;
            };

            vm.cartItemIndex = function(product_id) {
                for(var i= 0; i<vm.cart.length; i++){
                    if(vm.cart[i].id == product_id)
                        return i;
                }
            };

            vm.productChanged = function() {
                vm.price = {index:0};
                vm.form.period = 'premium';
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period]
            };

            vm.addItemToCart = function() {
                var selectedProduct = angular.copy(vm.product.selected);
                //selectedProduct.price = angular.copy(vm.product.selected.prices[vm.price.index]);
                selectedProduct.subscriptions = [];
                //check if product is not existing in the cart
                if (!vm.searchCartItem(selectedProduct.id)) {
                    vm.cart.push(selectedProduct);
                }
            };

            vm.durationChange =  function() {
                vm.form.period = 'premium';
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period]
            };

            vm.onPeriodChange = function() {
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period]
            };

            vm.slotValidate = function() {

                vm.slotValid = false;

                if(vm.form.trans_date && vm.form.duration) {
                    vm.slotValid = true;
                }

                return vm.slotValid;
            };

            vm.bulkValidate = function () {
                vm.bulkValid = false;

                var bsd = new Date(vm.form.bulk_start_date);
                bsd.setHours(0,0,0,0);
                var bed = new Date(vm.form.bulk_end_date);
                bed.setHours(0,0,0,0);

                if(bed < bsd) {
                    //vm.form.bulkEndDate = null;
                }

                var bst = new Date(vm.form.bulk_start_date);
                var bet = new Date(vm.form.bulk_end_date);

                if(bet.getTime() <= bst.getTime()) {
                    vm.form.bulk_end_date = null;
                }

                if(vm.form.bulk_start_date && vm.form.bulk_end_date && vm.form.broadcast > 0)
                {
                    vm.bulkValid = true;
                }

                return vm.bulkValid;
            };

            vm.bulkValidate = function (type) {
                vm.bulkValid = false;

                if(type == 'date') {
                    var bsd = new Date(vm.form.bulk_start_date);
                    bsd.setHours(0,0,0,0);
                    var bed = new Date(vm.form.bulk_end_date);
                    bed.setHours(0,0,0,0);

                    if(bed <= bsd) {
                        vm.form.bulk_end_date = null;
                    }
                }

                if(type == 'time')
                {
                    var bst = new Date(vm.form.bulk_start_date);
                    var bet = new Date(vm.form.bulk_end_date);

                    if(bet.getTime() <= bst.getTime()) {
                        vm.form.bulk_end_date = null;
                    }
                }

                if(vm.form.bulk_start_date && vm.form.bulk_end_date && vm.form.broadcast > 0)
                {
                    vm.bulkValid = true;
                }

                return vm.bulkValid;
            };

            //alert box for clearing cart
            vm.emptyCart = function() {
                SweetAlert.swal({
                    title: 'Are you sure you want to empty your cart?',
                    text: 'Your will not be able to recover your selected items back!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel pls!',
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm){
                    if (isConfirm) {
                        vm.cart = [];
                        vm.calcCartTotalPrice();
                        SweetAlert.swal('Deleted!', 'Your cart is now empty.', 'success');
                    } else {
                        SweetAlert.swal('Cancelled', 'Your item is safe :)', 'error');
                    }
                });
            };

            activateOpenCartModal();

            function activateOpenCartModal() {

                vm.openCart = function (size) {

                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/template/cart.tpl.html',
                        controller: OpenCartModalInstanceCtrl,
                        size: size,
                        resolve: {
                            cart: function () {
                                return vm.cart;
                            },
                            $rootScope: function() {
                                return vm;
                            }
                        },
                        cache: false
                    });

                    var state = $('#modal-state');
                    modalInstance.result.then(function () {
                        state.text('Modal dismissed with OK status');
                    }, function () {
                        state.text('Modal dismissed with Cancel status');
                    });
                };

                // Please note that $uibModalInstance represents a modal window (instance) dependency.
                // It is not the same as the $uibModal service used above.

                OpenCartModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$rootScope', 'cart'];
                function OpenCartModalInstanceCtrl($scope, $uibModalInstance, $rootScope, cart) {

                    var vm = $scope;

                    vm.cart = $rootScope.cart;

                    vm.calProductSubscription = function (itemIdx) {
                        return $rootScope.calProductSubscription(itemIdx);
                    };
                    vm.minusBroadcast = function(itemIdx, subIdx) {
                        $rootScope.minusBroadcast(itemIdx, subIdx);
                    };

                    vm.plusBroadcast = function (itemIdx, subIdx) {
                        $rootScope.plusBroadcast(itemIdx, subIdx);
                    };

                    vm.deleteCartItem = function(idx) {
                        $rootScope.deleteCartItem(idx);
                    };

                    vm.deleteSubscription = function(itemIdx, subIdx) {
                        $rootScope.deleteSubscription(itemIdx, subIdx);
                    };

                    vm.ok = function () {
                        $uibModalInstance.close('closed');
                    };

                    vm.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            }


        });
})();