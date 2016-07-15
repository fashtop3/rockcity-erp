/**
 * Created by dfash on 4/29/16.
 */

(function() {

    'use strict';

    angular
        .module('app.order')
        .controller('AirtimeCreateController',
        function($scope, $cookies, $rootScope, toaster, clientFactory, userFactory, productFactory, airtimeFactory, SweetAlert, $uibModal, $timeout, $state, loginFactory) {

            var vm = $scope;
            //collapse the menu bar
            $rootScope.app.layout.isCollapsed = true;

            vm.tab = 1;
            vm.bulkValid = false;
            vm.slotValid = false;
            vm.cart = [];
            vm.orderButton = undefined;
            vm.btn = {};

            vm.form = {
                price: 0.00,
                period: '',

                no_slots: "0",
                slot_start_date: "",
                slot_end_date: "",
                fixSpotPrice: "",

                broadcast: "0",
                bulk_start_date:'',
                bulk_end_date:'',
                bulkPrice: "",
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
            //TODO: implement this for
            vm.refreshClient = function(search) {
                clientFactory.getClients().query().$promise.then(
                    function (response) {
                        vm.clients = response;
                    }
                );
            };

            vm.slot_start_date = "";
            vm.slot_end_date = "";

            vm.getSlotRange = function(n) {
                return new Array(parseInt(n));
            };

            vm.maxSlotRange = 0;

            vm.maxSlotRangeChange = function() {
                vm.maxSlotRange = angular.copy(vm.form.no_slots);
                vm.form.fixSpotPrice =  parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]) * parseInt(vm.maxSlotRange);
            };

            vm.bulkRangeChanged = function() {
                vm.form.bulkPrice =  parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]) * parseInt(vm.form.broadcast);
            };

            vm.clearBulk = function() {
                vm.form.broadcast = 0;
                vm.form.bulk_start_date = null;
                vm.form.bulk_end_date = null;
                vm.bulkRangeChanged();
            };

            vm.clearSlot = function() {
                vm.form.no_slots = 0;
                vm.form.slot_start_date = null;
                vm.form.slot_end_date = null;
                vm.maxSlotRange = 0;
                vm.fixForDate = {};
                vm.scheduleSlots = [];
                vm.btn.fixslot = false;
                vm.form.fixSpotPrice =  parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]) * parseInt(vm.form.no_slots);
            };

            vm.fixForDate = {};
            vm.scheduleSlots = [];

            //validation for add slot button if all fixed time is set
            vm.checkScheduleSlot = function() {
                var valid = true;
                if(vm.scheduleSlots.length) {
                    for(var i=0; i<vm.scheduleSlots.length; i++) {
                        valid = vm.scheduleSlots[i].tofix == vm.scheduleSlots[i].times.length;
                    }
                }
                return valid;
            };

            //push into table
            vm.pushToSchedule = function() {
                vm.fixForDate.times = [];
                vm.scheduleSlots.push(vm.fixForDate);
                vm.recalculateSlot();
            };

            //recalculate slot if any changes
            vm.recalculateSlot = function() {
                var slot = angular.copy(vm.fixForDate.slot);
                vm.maxSlotRange = parseInt(vm.maxSlotRange) - parseInt(slot);

                vm.fixForDate = {slot:"1"};
            };

            //remove fixed spot from the table
            vm.removeSchedule = function($index) {
                vm.maxSlotRange = parseInt(vm.maxSlotRange) + parseInt(vm.scheduleSlots[$index].slot);
                vm.scheduleSlots.splice($index, 1);

                vm.calcFixedPrice();
            };

            vm.calcFixedPrice = function () {

                vm.form.fixSpotPrice =  parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]) * parseInt(vm.form.no_slots);

                //selected  product price
                var selProdPrice = parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]);

                for(var i = 0; i < vm.scheduleSlots.length; i++) {
                    var schtable = vm.scheduleSlots[i];

                    //cal normal price for tofix slot and remove it from already calculated price
                    var price = parseInt(schtable.tofix) * parseFloat(selProdPrice);

                    vm.form.fixSpotPrice = parseFloat(vm.form.fixSpotPrice) + ( (parseInt(vm.product.selected.surcharge) / 100) * parseFloat(price) );
                }
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

                console.log(airtime);

                toaster.pop('wait', 'Order', 'Processing your request');

                //vm.orderButton = true;
                airtimeFactory.order().save(airtime,
                    function (response) {

                        toaster.pop('success', 'Order', 'Order has been received.');
                        //$timeout(function () {
                        //    $state.go('app.airtime');
                        //}, 500);
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

            //get total price of a product
            vm.calProductSubscription = function(itemIdx) {
                var sum = 0;
                for(var j=0; j<vm.cart[itemIdx].subscriptions.length; j++) {

                    var subObj = vm.cart[itemIdx].subscriptions[j];

                    sum += parseFloat(subObj.amount);// + parseFloat(subObj.subChargePrice);
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
                return parseFloat(vm.form.price);
            };

            vm.addBulk = function() {
                //TODO: do validation here
                if(vm.product.selected == '') return;

                //pick number of broadcast
                //pick bulkstartdate
                //pick bulkenddate

                var data = {
                    broadcast:vm.form.broadcast,
                    bulk_start_date:vm.form.bulk_start_date,
                    bulk_end_date:vm.form.bulk_end_date,
                    period: vm.form.period,
                    amount: parseFloat(vm.form.bulkPrice),
                };

                vm.addItemToCart(); //attempts adding item to cart

                var index = vm.cartItemIndex(vm.product.selected.id);
                //for(var i = 0; i<vm.form.broadcast; i++)
                //{
                vm.cart[index].subscriptions.push(data);
                //}

                vm.calcCartTotalPrice();//recalculate cart price

                vm.clearBulk();

            };

            //on add slot button clicked
            vm.addSlot = function() {
                if(vm.product.selected == '') return;
                if(vm.form.price == 0) return;

                //new item object is created here to the vm
                vm.addItemToCart();

                //pick number if slot
                //pick slot start date
                //pick slot end date
                //pick slot calculated price
                //pick isFixedOrDisplaced
                //pick programmes fixtures (object) schedule

                var data = {
                    slots: vm.form.no_slots,
                    slot_start_date: vm.form.slot_start_date,
                    slot_end_date: vm.form.slot_end_date,
                    isFixedOrDisplaced: vm.btn.fixslot,
                    period: vm.form.period,
                    amount: parseFloat(vm.form.fixSpotPrice),
                    schedule: vm.scheduleSlots
                };
                var index = vm.cartItemIndex(vm.product.selected.id); //item obj created in vm.addItemToCart();
                vm.cart[index].subscriptions.push(data);

                vm.calcCartTotalPrice();

                vm.clearSlot();
            };

            vm.clearScheduleTimes = function (schedule) {
                schedule.times = [];
            };

            vm.minusBroadcast = function(itemIdx, subIdx) {
                if(vm.cart[itemIdx].subscriptions[subIdx].broadcast == 501) return;
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
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period];
                vm.clearSlot();
                vm.clearBulk();
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
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period];
            };

            vm.onPeriodChange = function() {
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period];
            };

            //validate bulk date and time
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

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('SlotStartDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('SlotEndDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {

                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('FixedSlotDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('BulkStartDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('BulkEndDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();


(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('SlotTimeModalCtrl', SlotTimeModalCtrl);

    SlotTimeModalCtrl.$inject = ['$uibModal'];
    function SlotTimeModalCtrl($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            vm.open = function (size, $schedule) {

                var modalInstance = $uibModal.open({
                    templateUrl: '/myModalContent.html',
                    controller: ModalInstanceCtrl,
                    size: size,
                    resolve: {
                        $schedule: function () {
                            return $schedule;
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

            ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$schedule'];
            function ModalInstanceCtrl($scope, $uibModalInstance, $schedule) {

                $scope.scheduleRef = $schedule;

                $scope.getSlotRange = function(n) {
                    return new Array(parseInt(n));
                };

                $scope.ok = function () {
                    $uibModalInstance.close('closed');
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        }
    }

})();
