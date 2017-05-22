var Pricing = {

    grandTotal:0,
    vat:0,
    discount:0,
    discountAmt:0,
    commission:0,
    commissionAmt:0,
    totalWOComm:0,
    totalWComm:0,

    init: function () {
        'use strict';

        Pricing.$discountCoupon = $('#discountCoupon');
        Pricing.$commissionCoupon = $('#commissionCoupon');

        Pricing.calculate_prices();
        Pricing.__plug_coupon_input();
    },

    calculate_prices: function() {
        Pricing.grandTotal = ProductSlot.calc_cart_price();
        Pricing.vat = (5/100) * Pricing.grandTotal;
        Pricing.discountAmt = (Pricing.discount/100) * Pricing.grandTotal;
        var cartDiscounted = Pricing.grandTotal - Pricing.discountAmt;
        Pricing.commissionAmt = (Pricing.commissionAmt/100)*cartDiscounted;
        Pricing.totalWOComm = (Pricing.grandTotal - (Pricing.discountAmt+Pricing.commissionAmt)) + Pricing.vat;
        Pricing.totalWComm = (Pricing.grandTotal + Pricing.vat) - Pricing.discountAmt;

        //Todo: update widget
    },

    __plug_coupon_input: function () {
        Pricing.$discountCoupon.blur(function () {
            var code = $(this).val();

        });

        Pricing.$commissionCoupon.blur(function () {
            var code = $(this).val();

        });
    }
};