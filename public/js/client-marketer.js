var ClientMarketer = {

    clients: {selected:null, list:[]},
    marketer: {selected:null, list:[]},

    init: function(clients, marketer) {
        ClientMarketer._$client_elem = $('#client-data-select');
        ClientMarketer._$marketer_elem = $('#marketer-data-select');
        ClientMarketer.clients.list = clients;
        ClientMarketer.marketer.list = marketer;

        ClientMarketer.__monitor();
    },

    __monitor: function() {
        ClientMarketer._$client_elem.change(function () {
            var index = $(this).find(':selected').attr('data-index');
            if (typeof index == 'undefined') {
                ClientMarketer.clients.selected = null;
                return false;
            }

            ClientMarketer.clients.selected = ClientMarketer.clients.list[index];
        });

        ClientMarketer._$marketer_elem.change(function () {
            var index = $(this).find(':selected').attr('data-index');
            if (typeof index == 'undefined') {
                ClientMarketer.marketer.selected = null;
                return false;
            }

            ClientMarketer.marketer.selected = ClientMarketer.marketer.list[index];
        });
    }
};