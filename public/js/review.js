
var Review = {

    cartitems: [],

    init: function(ViewModel) {

        Review.$item_container = $('#item-container');
        Review.__monitor();
        Review.__update_widgets();
        Review.__display_cart_item(ViewModel);
        Review.__update_footer();
    },

    __monitor: function() {

    },

    __update_footer: function () {
        var fullname = 'Anonymous';
        if (ClientMarketer.marketer.selected != null) {
            fullname = ClientMarketer.marketer.selected.lastname + ' ' + ClientMarketer.marketer.selected.firstname;
        }
        $('#marketer-in-charge').next().text(fullname);
    },

    __update_widgets: function () {
        //client
        $('em#client-name').text(ClientMarketer.clients.selected.name);
        $('em#client-email').text(ClientMarketer.clients.selected.email || 'null');
        $('em.client-addr').text(ClientMarketer.clients.selected.street_no +' '+ ClientMarketer.clients.selected.street_name +', '+ ClientMarketer.clients.selected.town);
        $('em.client-phone').text(ClientMarketer.clients.selected.mobile);


        //pricing
        $('h5 strong#cartTotals').html('NGN'+$('<span>'+Pricing.cartTotal+'</span>').number(true, 2).html());

        $('h5#discount').text('Discount('+Pricing.discount+'%)');
        $('h5 strong#dsctAmnt').html('NGN'+$('<span>'+Pricing.discountAmt+'</span>').number(true, 2).html());

        $('h5#commission').text('Commission('+Pricing.commission+'%)');
        $('h5 strong#commAmnt').html('NGN'+$('<span>'+Pricing.commissionAmt+'</span>').number(true, 2).html());

        $('h5 strong#vat').html('NGN'+$('<span>'+Pricing.vat+'</span>').number(true, 2).html());
        $('h5 strong#totalWOComm').html('NGN'+$('<span>'+Pricing.grandTotal+'</span>').number(true, 2).html());
    },

    __display_cart_item: function(ViewModel) {
        Review.cartitems = [];
        var cart = ProductSlot.cart;
        for(var cartIndex in cart) {
            var productIndex = cartIndex.slice("index_".length);
            var newItemObj = {
                name: ProductSlot.products[productIndex].name,
                subscriptions: cart[cartIndex],
                subTotal: function () {
                    var total = 0;
                    for(var i = 0; i<cart[cartIndex].length; i++) {
                        total += cart[cartIndex].amount;
                    }
                    return total;
                }()
            };
            Review.cartitems.push(newItemObj);
        }

        ViewModel.items(Review.cartitems);
    }
};