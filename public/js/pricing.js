var Pricing = {

    cartTotal:0,
    vat:0,
    discount:0,
    discountAmt:0,
    commission:0,
    commissionAmt:0,
    totalWOComm:0,
    totalWComm:0,
    grandTotal:0,
    promocode: {discount:null, coupon:null},

    init: function (ViewModel) {
        'use strict';

        Pricing.$discountCoupon = $('#discountCoupon');
        Pricing.$commissionCoupon = $('#commissionCoupon');

        Pricing.calculate_prices();
        //Pricing._display_cart_item(ViewModel);
        Pricing.__plug_coupon_input();
    },

    calculate_prices: function() {
        Pricing.cartTotal = ProductSlot.calc_cart_price();
        Pricing.vat = (5/100) * Pricing.cartTotal;
        Pricing.discountAmt = (Pricing.discount/100) * Pricing.cartTotal;
        var cartDiscounted = Pricing.cartTotal - Pricing.discountAmt;
        Pricing.commissionAmt = (Pricing.commission/100)*cartDiscounted;
        Pricing.totalWOComm = (Pricing.cartTotal - (Pricing.discountAmt+Pricing.commissionAmt)) + Pricing.vat;
        Pricing.totalWComm = (Pricing.cartTotal + Pricing.vat) - Pricing.discountAmt;
        Pricing.grandTotal = Pricing.totalWOComm;

        //Todo: update widget
        Pricing.__update_widget();
        Review.__update_widgets();
    },

    __update_widget: function() {
        $('#pricing-initial-amt').prev().html('N'+$('<span>'+Pricing.cartTotal+'</span>').number(true, 2).html());
        $('#pricing-vat').prev().html('N'+$('<span>'+Pricing.vat+'</span>').number(true, 2).html());
        $('#pricing-discount').text('Discount Amount ('+Pricing.discount+'%)').prev().html('N'+$('<span>'+Pricing.discountAmt+'</span>').number(true, 2).html());
        $('#pricing-commission').text('Commission Amount ('+Pricing.commission+'%)').prev().html('N'+$('<span>'+Pricing.commissionAmt+'</span>').number(true, 2).html());
        $('#pricing-wocom').prev().html('N'+$('<span>'+Pricing.totalWOComm+'</span>').number(true, 2).html());
        $('#pricing-wcom').prev().html('N'+$('<span>'+Pricing.totalWComm+'</span>').number(true, 2).html());

        $('input[name=subTotal]').val(Pricing.cartTotal);
        $('input[name=discount]').val(Pricing.discount);
        $('input[name=discountAmt]').val(Pricing.discountAmt);
        $('input[name=commission]').val(Pricing.commission);
        $('input[name=commissionAmt]').val(Pricing.commissionAmt);
        $('input[name=grandTotal]').val(Pricing.grandTotal);
        $('input[name=promocode]').val(JSON.stringify(Pricing.promocode));

    },

    __plug_coupon_input: function () {
        //KCZZ-S5PB
        Pricing.$discountCoupon.blur(function () {
            var code = $(this).val().trim();
            $(this).attr('disabled', true);
            $.ajax({
                url: "/app/api/promocode/reward?action=discount&code="+code,
                context: $(this)
            }).done(function(response) {
                Pricing.discount = response.data;
                Pricing.promocode.discount = code;
                $(this).removeClass('has-error');
                $( this).next().hide();
            }).fail(function() {
                Pricing.discount = 0;
                Pricing.promocode.discount = null;
                $(this).parent().addClass('has-error');
                $( this).next().text('Invalid coupon code').show();
            }).complete(function() {
                $(this).attr('disabled', false);
                Pricing.calculate_prices();
                console.log('Recalculating pricing');
            });
        });

        //M08M-AAD7
        Pricing.$commissionCoupon.blur(function () {
            var code = $(this).val().trim();
            $(this).attr('disabled', true);
            $.ajax({
                url: "/app/api/promocode/reward?action=coupon&code="+code,
                context: $(this)
            }).done(function(response) {
                Pricing.commission = response.data;
                Pricing.promocode.coupon = code;
                $(this).parent().removeClass('has-error');
                $( this).next().hide();
            }).fail(function() {
                Pricing.commission = 0;
                Pricing.promocode.coupon = null;
                $(this).parent().addClass('has-error');
                $( this).next().text('Invalid coupon code').show();
            }).complete(function() {
                $(this).attr('disabled', false);
                Pricing.calculate_prices();
                console.log('Recalculating pricing');
            });

        });
    },

    _display_cart_item: function() {
        AirtimeViewModel.items([]);
        AirtimeViewModel.items(ProductSlot.cart);
    },

    __emptyCart: function() {
        ProductSlot.cart = [];
        Pricing._display_cart_item(AirtimeViewModel);
        AirtimeViewModel.allowEmptyCart(false);
        Pricing.__return_view_to_selection();
    },

    deleteSubscription: function(subIndex, itemObj) {
        ProductSlot.cart[ProductSlot.cart.indexOf(itemObj)].subscriptions.splice(subIndex, 1);
        if(ProductSlot.cart[ProductSlot.cart.indexOf(itemObj)].subscriptions.length == 0) {
            ProductSlot.cart.splice(ProductSlot.cart.indexOf(itemObj), 1);
        }
        AirtimeViewModel.items([]);
        AirtimeViewModel.items(ProductSlot.cart);
        console.log('deleting...from cart');
        Pricing.__return_view_to_selection();
    },

    __return_view_to_selection : function() {
        if (!ProductSlot.cart.length) {
            wizform.steps("setStep", 1);
        }
    }

};