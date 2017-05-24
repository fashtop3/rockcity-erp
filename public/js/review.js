var Review = {


    init: function() {

        Review.__monitor();
        Review.__update_widgets();
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
    }
};