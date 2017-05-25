function Schedule() {
    this.date = null;
    this.going = null;
    this.fixtimes = [];
}

function SlotModel() {
    var self = this;
    self.period = '';
    self.slots = 0;
    self.slot_start_date = null;
    self.slot_end_date = null;
    self.isFixed = false;
    self.schedules = [];
}

var slotModel = new SlotModel();

var ProductSlot = {

    products: {},
    prog_time: {},
    times: {start: new Date(), ends: new Date()},
    slot_file_id: null,
    bulk_file_id: null,
    cart: {},


    init: function (products, progTime) {

        'use strict';

        //if($.cookie('cart') != null) {
        //    ProductSlot.cart = JSON.parse($.cookie('cart'));
        //}

        $.removeCookie('cart', { path: '/' });
        //console.log(ProductSlot.cart);

        ProductSlot.products = products; // {!!$products !!};
        ProductSlot.prog_time = progTime;// {!! $prog_time !!};
        ProductSlot._slot_schedule = [];

        /**
         * Product panel section
         */
        ProductSlot.__product_panel();

        /**
         * Slot/bulk Panel section
         */
        ProductSlot.__slot_panel();
        ProductSlot.__bulk_panel();
    },

    __product_panel: function() {

        'use strict';

        ProductSlot._$timeable = $('#timable');
        ProductSlot._$timeable.hide();
        ProductSlot._$price = $('input#price');

        var $tariff_div = $('#tariff-div');
        var $slotPanel = $('#slotPanel');
        var $bulkPanel = $('#bulkPanel');
        $tariff_div.hide();
        $slotPanel.hide();


        ProductSlot._$period = $('select#period');
        ProductSlot._$duration = ProductSlot._$timeable.find("select#duration");


        //when new product is selected
        $('#product-data-select').change(function () {
            ProductSlot._$timeable.hide();

            ProductSlot._$period.trigger('change');
        });


        //when period change
        ProductSlot._$period.change(function () {
            var p_index = $('#product-data-select').find(':selected').attr('data-index');
            if(p_index == null || p_index == 'undefined') {
                //Todo: refresh all blocks here
                $tariff_div.hide();
                $bulkPanel.hide();
                $slotPanel.hide();
                ProductSlot._$refresh_slot_button.trigger('click');
                ProductSlot._$refresh_bulk_button.trigger('click');
                return;
            }

            ProductSlot._product_index = p_index;
            ProductSlot._$p_selected = ProductSlot.products[p_index];

            console.log(ProductSlot._$p_selected);
            if (ProductSlot._$p_selected.timeable) {
                ProductSlot._populate_duration(ProductSlot._$p_selected, ProductSlot._$timeable);
                ProductSlot._$duration.trigger('change');
            } else {
                var product_price = ProductSlot._$p_selected.prices[0];
                ProductSlot._$price.val(product_price[$(this).val()]);
                ProductSlot._$price.number(true, 2);

                $tariff_div.show();
                //Todo: refresh slot and bulk panel
                ProductSlot._$refresh_slot_button.trigger('click');
                ProductSlot._$refresh_bulk_button.trigger('click');
            }

            if (!ProductSlot._$p_selected.fixable) {
                $('#tariff-bulk').attr('disabled', true);
                $('#tariff-slot').attr('checked', true).change();

            } else {
                $('#tariff-bulk').attr('disabled', false);
                $('#tariff-bulk').attr('checked', false);
                $('#tariff-slot').attr('checked', false);
            }

            ProductSlot.__set_times($(this).val()); //set prog time
            console.log($(this).val());
            slotModel.period = $(this).val();
        });

        //when duration change
        ProductSlot._$duration.change(function () {
            var $s_duration = ProductSlot._$duration.find(':selected');
            var product_price = $s_duration.attr('data-object');
            ProductSlot._$price.attr('data-object', product_price);
            var parsed_price = JSON.parse(product_price);
            ProductSlot._$price.val(parsed_price[ProductSlot._$period.find(':selected').val()]);
            ProductSlot._$price.number(true, 2);

            $tariff_div.show();
            ProductSlot._$refresh_slot_button.trigger('click');
            ProductSlot._$refresh_bulk_button.trigger('click');
        });


        $(':radio[name=tariff]').change(function () {
            if ($(this).val() == 'slot') {

                $bulkPanel.hide();
                ProductSlot.__config_file_inputs('slot');
                $slotPanel.show();
                console.log(ProductSlot.slot_file_id);
                $('select#slots').trigger('change');
                //return;
            }
            else if ($(this).val() == 'bulk'){
                $slotPanel.hide();
                ProductSlot.__config_file_inputs('bulk');
                $bulkPanel.show();
                console.log(ProductSlot.bulk_file_id);
                $('select#bulks').trigger('change');
                //return;
            }

            ProductSlot._$refresh_slot_button.trigger('click');
            ProductSlot._$refresh_bulk_button.trigger('click');
        });
    },

    __slot_panel: function() {

        'use strict';

        ProductSlot._$slots_select_no = $('#slots_select_no');
        ProductSlot._$slots = $('select#slots');
        ProductSlot._$slot_price = $('input#slot_price');
        ProductSlot._$isFixable = $('#isfixable');
        ProductSlot._$_slot_schedule_table = $('#slot_table tbody');
        ProductSlot._$refresh_slot_button = $('#refresh_slot_button');

        var $complete_slot_add = $('#complete_slot_add');
        $complete_slot_add.attr('disabled', true);
        var max_slot = 0, used_slot = 0, max_used_slot = 0;
        var $fix_slot_reset = $('#fix_slot_reset');

        var $fix_date = $('#fix_date');
        var $fix_time = $('#fix_time');
        var $fixable_slot = $('#fixable_slot');
        var disabled_fix_date = [];
        var schedule = new Schedule();
        var add_fix_time_counter = 0;

        $('input#fix_date_input').keydown(function () {
            return false
        });
        $('input#fix_time_input').keydown(function () {
            return false
        });


        ProductSlot._$slots.change(function () {

            $('#add_fix_time').attr("disabled", true);

            max_slot = ProductSlot._$slots.find(':selected').val();
            ProductSlot._$slots_select_no.empty();
            ProductSlot._generate_fix_slot_select(parseInt(max_slot));

            ProductSlot._calc_slot_price(ProductSlot._slot_schedule);

            ProductSlot._toggle_slot_time_button();
            $('span#time-chosen').hide();

            slotModel.slots = parseInt($(this).val());
            ProductSlot.__enable_slot_button();
        });

        ProductSlot._$isFixable.change(function () {
            if ($(this).is(':checked')) {
                ProductSlot.__set_times(ProductSlot._$period.val());
                $fixable_slot.show();
                ProductSlot._toggle_slot_time_button();
                slotModel.isFixed = true;
            } else {
                slotModel.isFixed = false;
                $fixable_slot.hide();
            }
            ProductSlot.__enable_slot_button();
        });

        $('button#add_fix_time').click(function () {
            $('span#time-chosen').hide();

            //ProductSlot._$slots_select_no.attr('disabled', true);
            $('#fix_date_input').attr('disabled', true);

            var date = new Date($('#fix_time').data("DateTimePicker").date());
            date.setSeconds(0);
            var timeStr = date.toLocaleTimeString();
            /*toTimeString();*/
//

            if (schedule.fixtimes.indexOf(timeStr) != -1) {
                $('span#time-chosen').show();
                console.log('Time chosen');
                return;
            }
//
            schedule.date = (new Date($('#fix_date').data("DateTimePicker").date())).toDateString();
            schedule.going = ProductSlot._$slots_select_no.val();
            schedule.fixtimes.push(timeStr);

            //__row_slot_selection = JSON.parse(JSON.stringify(slot_selection));

            if (!$('tr#display_slot').is(':visible')) {
                $('tr#display_slot').show();
            }
            $('tr#display_slot td#slot_date').text(schedule.date);
            $('tr#display_slot td#slot_going').text(schedule.going);
            $('tr#display_slot td#slot_fixes').html($('<p class="help-block"></p>').text(schedule.fixtimes.length + ' of ' + schedule.going + ' set'));
            $('tr#display_slot td#slot_fixtimes').text(schedule.fixtimes.join(', '));
//
            ++add_fix_time_counter;
            //console.log('counter: ', add_fix_time_counter);
            if (add_fix_time_counter >= schedule.going) {
                $(this).attr('disabled', true);
            }
        });

        ProductSlot._$slots_select_no.change(function () {
            used_slot = $(this).val();
            ProductSlot._toggle_slot_time_button();
        });

        $fix_slot_reset.click(function () {
            add_fix_time_counter = 0;
            schedule = new Schedule();

            ProductSlot._generate_fix_slot_select(parseInt(max_slot));

            $('#fix_date').data("DateTimePicker").clear();
            $('#fix_time').data("DateTimePicker").clear();

            $('#fix_date_input').attr("disabled", false);
            //ProductSlot._$slots_select_no.attr("disabled", false);


            $('tr#display_slot').hide();

            ProductSlot._toggle_slot_time_button();
            ProductSlot.__enable_slot_button();
        });

        $complete_slot_add.click(function () {

            schedule.date = (new Date($('#fix_date').data("DateTimePicker").date())).toDateString();
            schedule.going = ProductSlot._$slots_select_no.val();

            //var copyObj = JSON.parse(JSON.stringify(__row_slot_selection));
            //ProductSlot._slot_schedule.push(__row_slot_selection);
            slotModel.schedules.push(schedule);

            ProductSlot._calc_slot_price(slotModel.schedules);

            max_slot -= used_slot;
            ProductSlot._generate_fix_slot_select(parseInt(max_slot));

            disabled_fix_date.push($fix_date.data("DateTimePicker").date());
            $fix_date.data("DateTimePicker").disabledDates(disabled_fix_date);

            $fix_slot_reset.trigger('click');
            $('span#time-chosen').hide();
            ProductSlot.__enable_slot_button();
        });

        $('table#slot_table').on('click', 'a.fix_slot_del', function () {
            var index = $(this).attr('data-index');
            slotModel.schedules.splice(index, 1);
            console.log(index, slotModel.schedules);

            ProductSlot._calc_slot_price(slotModel.schedules);
//                load_slot_table(slot_table);
            ProductSlot.__enable_slot_button();
        });

        ProductSlot._$refresh_slot_button.click(function () {
            add_fix_time_counter = 0;
            slotModel = new SlotModel();
            schedule = new Schedule();
            $('#slot_start_date').data("DateTimePicker").clear();
            $('#slot_end_date').data("DateTimePicker").clear();

            ProductSlot._$isFixable.attr('checked', false).change();
            $fix_slot_reset.trigger('click');
            clear_disabled_dates();
            ProductSlot._calc_slot_price(slotModel.schedules);

            ProductSlot._$slots.val(1).change();
            ProductSlot._$slots.attr('disabled', false);

            ProductSlot.__config_file_inputs('slot');
            ProductSlot._$isFixable.attr("disabled", true);
        });

        $fix_time.datetimepicker()
            .on('dp.change', function (e) {
                ProductSlot._toggle_slot_time_button();
            });

        function clear_disabled_dates() {
            disabled_fix_date = [];
            $('#fix_date').data("DateTimePicker").disabledDates(null);
        }

        ProductSlot.__add_slot(); //call to slot button

    },

    __bulk_panel: function() {

        'use strict';

        ProductSlot._$bulks = $('select#bulks');
        ProductSlot._$bulk_price = $('input#bulk_price');
        ProductSlot._$bulk_start_date = $('#bulk_start_date');
        ProductSlot._$bulk_end_date = $('#bulk_end_date');
        ProductSlot._$refresh_bulk_button = $('#refresh_bulk_button');

        $('#bulk-date-container').attr('disabled', true);



        ProductSlot._$bulks.change(function () {

            var max_bulk = $(this).val();
            ProductSlot._calc_bulk_price();
        });


        ProductSlot._$refresh_bulk_button.click(function () {
            ProductSlot._$bulk_start_date.data("DateTimePicker").clear();
            ProductSlot._$bulk_end_date.data("DateTimePicker").clear();

            ProductSlot._calc_bulk_price();
            ProductSlot.__config_file_inputs('bulk');

            ProductSlot._$bulks.val(501).change();
        });
        ProductSlot.__add_bulk(); //model add bulk button
    },

    _calc_slot_price: function (slots_list) {

        ProductSlot._load_slot_table(slotModel.schedules);

        var product_price = parseFloat(ProductSlot._$price.val());
        var no_slots = parseInt(ProductSlot._$slots.find(':selected').val());
        var total_slot_price = parseFloat(product_price * no_slots);

        for (var i = 0; i < slots_list.length; i++) {
            var fixprice = slots_list[i].fixtimes.length * product_price;
            total_slot_price += ( (parseInt(ProductSlot._$p_selected.surcharge) / 100) * parseFloat(fixprice) );
        }

        ProductSlot._$slot_price.val(total_slot_price);
        ProductSlot._$slot_price.number(true, 2);
    },

    _calc_bulk_price: function () {

        var product_price = parseFloat(ProductSlot._$price.val());
        var no_bulks = parseInt(ProductSlot._$bulks.find(':selected').val());
        var total_bulk_price = parseFloat(product_price * no_bulks);

        ProductSlot._$bulk_price.val(total_bulk_price);
        ProductSlot._$bulk_price.number(true, 2);
    },

    _load_slot_table: function (list) {
        $('tr.slot_data').remove();
        for (var i = 0; i < list.length; i++) {
            //console.log(list, list.length);
            var $slot_data = $('<tr></tr>').addClass('slot_data');
            $slot_data.append($('<td width="3%"><a class="fix_slot_del" data-index="' + i + '" href="javascript:void(0)"><em class="fa fa-remove text-danger"></em></a></td>'));
            $slot_data.append($('<td width="27%">' + list[i].date + '</td>'));
            $slot_data.append($('<td id="slot_going" width="5%" class="text-center">' + list[i].going + '</td>'));
            $slot_data.append($('<td id="slot_fixes" width="20%"> ' + list[i].fixtimes.length + ' of ' + list[i].going + ' set</td>'));
            $slot_data.append($('<td id="slot_fixtimes">' + list[i].fixtimes.join(', ') + '</td>'));
            ProductSlot._$_slot_schedule_table.append($slot_data);
        }
    },

    _generate_fix_slot_select: function (slot) {
        ProductSlot._$slots_select_no.empty();
        ProductSlot._$slots_select_no.append($('<option>---</option>'));
        for (var i = 1; i <= parseInt(slot); i++) {
            ProductSlot._$slots_select_no.append($('<option></option>').val(i).text(i));
        }
    },

    _populate_duration: function (p_selected, timeable) {
        ProductSlot._$duration.empty();
        $.each(p_selected.prices, function (index, price) {
//                   console.log(index, price);
            ProductSlot._$duration.append($("<option></option>")
                .attr("data-index", index)
                .attr("data-id", price.id)
                .attr("data-object", JSON.stringify(price))
                .attr("value", price.duration).text(price.duration));
        });
        ProductSlot._$duration.find(':first').attr('selected', true);
        ProductSlot._$duration.trigger('change');
        timeable.show();
    },

    configSlotDates: function () {

        var start = (new Date()).toDateString();
        $('#slot_start_date').datetimepicker({
            format: 'DD-MM-YYYY',
            'minDate': start,
            'locale': 'en'
        });

        $('#slot_end_date').datetimepicker({
            format: 'DD-MM-YYYY',
            'minDate': start
        });

        $('#fix_date').datetimepicker({
            format: 'DD-MM-YYYY',
            'minDate': start
        });

        $('#fix_time').datetimepicker({
            format: 'HH:mm',
            //'minDate': start
            //maxDate: new Date("Fri May 26 2017 23:59:00 GMT+0100 (WAT)")
        });

        $('#slot_start_date').datetimepicker()
            .on('dp.change', function (e) {

                $('select#slots').attr('disabled', true);
                $('#slot_end_date').data("DateTimePicker").clear();
                $('#fix_date').data("DateTimePicker").clear();

                if (e.date != null || typeof e.event != 'undefined') {
                    slotModel.slot_start_date = (new Date(e.date)).toDateString();
                    $('#slot_end_date').data("DateTimePicker").minDate(e.date);
                    //$('#fix_time').data("DateTimePicker").minDate(e.date);
                    ProductSlot._$isFixable.attr("disabled", false);
                }
            });

        $('#slot_end_date').datetimepicker()
            .on('dp.change', function (e) {
                $('#fix_date').data("DateTimePicker").clear();
                if (e.date != null || typeof e.event != 'undefined') {
                    slotModel.slot_end_date = (new Date(e.date)).toDateString();
                    $('#fix_date').data("DateTimePicker").maxDate(e.date);
                    ProductSlot.__enable_slot_button();
                }
            });

        $('#fix_date').datetimepicker()
            .on('dp.change', function (e) {
                //$('#fix_time').data("DateTimePicker").clear();
                if (e.date != null || typeof e.event != 'undefined') {
                    AirtimeViewModel.disableFixableSlots(false);
                    ProductSlot._toggle_slot_time_button();
                    //$('#fix_time').data("DateTimePicker").maxDate(e.date);
                }
                else {
                    AirtimeViewModel.disableFixableSlots(true);
                }
            });
    },

    __set_times: function (period) {
        var start_str = period + '_start';
        var end_str = period + '_end';

//            console.log(prog_time[start_str], prog_time[end_str]);
        ProductSlot.times.start = new Date(Date.parse(ProductSlot.prog_time[start_str]));
        ProductSlot.times.end = new Date(Date.parse(ProductSlot.prog_time[end_str]));
        //ProductSlot.times.end.setDate(ProductSlot.times.end.getDate() + 1);


        //console.log('Start time: ' + ProductSlot.times.start, 'End time: ' + ProductSlot.times.end);

        $('#fix_time').data("DateTimePicker").clear();
        //
        $('#fix_time').data("DateTimePicker").minDate(new Date(ProductSlot.times.start.toString()));
        $('#fix_time').data("DateTimePicker").maxDate(new Date(ProductSlot.times.end.toString()));


        console.log('Start picker: ' + (new Date($('#fix_time').data("DateTimePicker").minDate())).toLocaleTimeString(),
            'End picker: ' + (new Date($('#fix_time').data("DateTimePicker").maxDate())).toString());

    },

    configBulkDates: function () {

        $('#bulk_end_date').attr('disabled', true);
        $('#bulk_start_date').keypress(function () {
            return false;
        });
        $('#bulk_end_date').keypress(function () {
            return false;
        });

        var start = (new Date()).toDateString();
        $('#bulk_start_date').datetimepicker({
            format: 'DD-MM-YYYY HH:mm',
            'minDate': start,
            'locale': 'en'
        });

        $('#bulk_end_date').datetimepicker({
            format: 'DD-MM-YYYY HH:mm',
            'minDate': start
        });

        $('#bulk_start_date').datetimepicker()
            .on('dp.change', function (e) {
                $('#bulk_end_date').data("DateTimePicker").clear();
                if (e.date != null || typeof e.event != 'undefined') {
                    $('#bulk_end_date').data("DateTimePicker").minDate(e.date);
                    $('#bulk_end_date').attr('disabled', false);
                }
            });

        $('#slot_end_date').datetimepicker()
            .on('dp.change', function (e) {

            });

    },

    _toggle_slot_time_button: function () {
        var option_val = ProductSlot._$slots_select_no.val();
        var fix_date = $('#fix_date').data("DateTimePicker").date();

        if (option_val > 0 && fix_date) {
            $('#add_fix_time').attr('disabled', false);
            $('#complete_slot_add').attr('disabled', false);
        }
        else {
            $('#add_fix_time').attr('disabled', true);
            $('#complete_slot_add').attr('disabled', true);
        }
    },

    _makeid: function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    __init_fileupload: function() {
        'use strict';

        // Initialize the jQuery File Upload widget:
        $('#airtime-wizard').fileupload({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            //url: '//jquery-file-upload.appspot.com/',
            fileInput: $('input.slot-file-input'),
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            replaceFileInput: false,
            maxFileSize: 20000000,// 20MB
            //paramName: "file",
            singleFileUploads: true,
            add: function (e, data) {
                console.log(data);

                //$('input#uplist').remove();

            }
        });
    },

    __config_file_inputs: function(str) {
        var vName = str+'_file_';
        ProductSlot[vName+'id'] = vName+ProductSlot._makeid();

        $('input.'+str+'-file-input').each(function(key) {
            if($(this).val() == '' || $(this).val() == null) {
                $(this).remove();
            } else {
                console.log($(this).val());
                $(this).hide();
            }

            //remove file not added to cart
            if(!$(this).hasClass('added-to-cart')) {
                $(this).remove();
                console.log('removed: not added to cart');
            }
        });

        $('<input class="form-control '+str+'-file-input" type="file"/>')
            .attr('name', ProductSlot[vName+'_id'])
            .attr('id', ProductSlot[vName+'_id'])
            .insertBefore($('div#'+str+'-attachment span#'+str+'-input-group-btn'));

        //initialize file-upload plugin
        ProductSlot.__init_fileupload();
    },

    __add_slot: function(){
        $('#add-slot-button').click(function () {
           //collect all item into cart object array
            if(typeof ProductSlot.cart['index_'+ProductSlot._product_index] == 'undefined') {
                ProductSlot.cart['index_'+ProductSlot._product_index] = [];
            }
            //var cart_item = ProductSlot.cart['index_'+ProductSlot._product_index];

            var duration = null;
            if(ProductSlot._$duration.is(':visible')) {
                duration = ProductSlot._$duration.val();
            }

            var slot_file_id = null;

            if(ProductSlot.slot_file_id != null || ProductSlot.slot_file_id != '') {
                var fileInputElem = $('input#'+ProductSlot.slot_file_id);
                if(!(fileInputElem.val() == '' || fileInputElem.val() == null)) {
                    fileInputElem.addClass('added-to-cart');
                    fileInputElem.hide();
                    slot_file_id = ProductSlot.slot_file_id;
                }
            }


            //var subscription = {
            //slotModel.product = ProductSlot._$p_selected.id;
            //slotModel.period = ProductSlot._$period.val();
            slotModel.duration = duration;
            slotModel.slots = ProductSlot._$slots.val();
            slotModel.slot_file_id =  slot_file_id;
            slotModel.prog_start = ProductSlot.times.start.toLocaleTimeString();
            slotModel.prog_end = ProductSlot.times.end.toLocaleTimeString();
            //slotModel.slot_start_date = $('#slot_start_date').data("DateTimePicker").date();
            //slotModel.slot_end_date = $('#slot_end_date').data("DateTimePicker").date();
            slotModel.amount = parseFloat(ProductSlot._$slot_price.val());
            //slotModel.schedules = JSON.parse(JSON.stringify(ProductSlot._slot_schedule))
            //};

            ProductSlot.cart['index_'+ProductSlot._product_index].push(slotModel);

            //console.log(ProductSlot.cart['index_'+ProductSlot._product_index]);
            console.log(ProductSlot.cart);

            slotModel = new SlotModel(); //ProductSlot._slot_schedule = [];// reset

            //$.removeCookie('cart', { path: '/' });
            //$.cookie('cart', JSON.stringify(ProductSlot.cart), { expires: 7, path: '/' });
            ProductSlot._$refresh_slot_button.trigger('click');
        });
    },

    __add_bulk: function(){
        $('#add-bulk-button').click(function () {
            //collect all item into cart object array

            if(typeof ProductSlot.cart['index_'+ProductSlot._product_index] == 'undefined') {
                ProductSlot.cart['index_'+ProductSlot._product_index] = [];
            }
            //var cart_item = ProductSlot.cart['index_'+ProductSlot._product_index];

            var duration = null;
            if(ProductSlot._$duration.is(':visible')) {
                duration = ProductSlot._$duration.val();
            }
            var bulk_file_id = null;

            if(ProductSlot.bulk_file_id != null || ProductSlot.bulk_file_id != '') {
                var fileInputElem = $('input#'+ProductSlot.bulk_file_id);
                if(!(fileInputElem.val() == '' || fileInputElem.val() == null)) {
                    fileInputElem.addClass('added-to-cart');
                    fileInputElem.hide();
                    bulk_file_id = ProductSlot.bulk_file_id;
                }
            }

            var subscription = {
                product: ProductSlot._$p_selected.id,
                period: ProductSlot._$period.val(),
                duration: duration,
                bulks:ProductSlot._$bulks.val(),
                bulk_file_id: bulk_file_id,
                bulk_start_date: $('#bulk_start_date').data("DateTimePicker").date(),
                bulk_end_date: $('#bulk_end_date').data("DateTimePicker").date(),
                amount: parseFloat(ProductSlot._$bulk_price.val())
            };

            ProductSlot.cart['index_'+ProductSlot._product_index].push(subscription);

            //console.log(ProductSlot.cart['index_'+ProductSlot._product_index]);
            console.log(ProductSlot.cart);

            //$.removeCookie('cart', { path: '/' });
            //$.cookie('cart', JSON.stringify(ProductSlot.cart), { expires: 7, path: '/' });
            ProductSlot._$refresh_bulk_button.trigger('click');
        });
    },

    calc_cart_price: function () {
        var total = 0;
        for(var product in ProductSlot.cart) {
           for(var i=0; i<ProductSlot.cart[product].length; i++) {
               total += parseFloat(ProductSlot.cart[product][i].amount);
           }
        }
        return total;
    },

    __enable_slot_button: function(){
        var model = slotModel;
        var val = (model.slots && model.slot_start_date && model.slot_end_date && !model.isFixed) || (model.isFixed && model.schedules.length > 0);
        AirtimeViewModel.slotButton(val);
    }
};