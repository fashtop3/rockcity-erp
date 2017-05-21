var ProductSlot = {

    products: {},
    prog_time: {},
    cart: {},

    init: function (products, progTime) {

        ProductSlot.products = products; // {!!$products !!};
        ProductSlot.prog_time = progTime;// {!! $prog_time !!};
        ProductSlot._slot_table = [];


        /**
         * Product panel section
         */
        ProductSlot._$timeable = $('#timable');
        ProductSlot._$timeable.hide();
        ProductSlot._$price = $('input#price');

        var $tariff_div = $('#tariff-div');
        var $slotPanel = $('#slotPanel');
        $tariff_div.hide();
        $slotPanel.hide();


        $period = $('select#period');
        $duration = ProductSlot._$timeable.find("select#duration");


        //when new product is selected
        $('#product-data-select').change(function () {
            ProductSlot._$timeable.hide();

            $period.trigger('change');
        });


        //when period change
        $period.change(function () {
            var p_index = $('#product-data-select').find(':selected').attr('data-index');
            ProductSlot._$p_selected = ProductSlot.products[p_index];
//            console.log(ProductSlot._$p_selected);
            if (ProductSlot._$p_selected.timeable) {
                ProductSlot._populate_duration(ProductSlot._$p_selected, ProductSlot._$timeable);
                $duration.trigger('change');
            } else {
                var product_price = ProductSlot._$p_selected.prices[0];
                ProductSlot._$price.val(product_price[$period.find(':selected').val()]);
                ProductSlot._$price.number(true, 2);

                $tariff_div.show();
            }
        });

        //when duration change
        $duration.change(function () {
            var $s_duration = $duration.find(':selected');
            var product_price = $s_duration.attr('data-object');
            ProductSlot._$price.attr('data-object', product_price);
            var parsed_price = JSON.parse(product_price);
            ProductSlot._$price.val(parsed_price[$period.find(':selected').val()]);
            ProductSlot._$price.number(true, 2);

            $tariff_div.show();
        });


        $(':radio[name=tariff]').change(function () {
            if ($(this).val() == 'slot') {
                $slotPanel.show();
                $('select#slots').trigger('change');
            }
        });


        /**
         * Slot Panel section
         */

        ProductSlot._$slots_select_no = $('#slots_select_no');
        ProductSlot._$slots = $('select#slots');
        ProductSlot._$slot_price = $('input#slot_price');
        ProductSlot._$isFixable = $('#isfixable');
        ProductSlot._$_slot_table = $('#slot_table tbody');

        var $complete_slot_add = $('#complete_slot_add');
        $complete_slot_add.attr('disabled', true);
        var max_slot = 0, used_slot = 0, max_used_slot = 0;
        var $fix_slot_reset = $('#fix_slot_reset');

        var $refresh_slot_button = $('#refresh_slot_button');
        var $fix_date = $('#fix_date');
        var $fix_time = $('#fix_time');
        var $fixable_slot = $('#fixable_slot');
        var disabled_fix_date = [];
        var __row_slot_selection = {'date': null, 'going': null, 'fixtimes': []};

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

//                var product_price = parseFloat(ProductSlot._$price.val());
//                var no_slots = parseInt(ProductSlot._$slots.find(':selected').val());
//                var total_slot_price = parseFloat(product_price * no_slots);
//
//                ProductSlot._$slot_price.val(total_slot_price);
//                ProductSlot._$slot_price.number(true, 2);
            ProductSlot._calc_slot_price(ProductSlot._slot_table);

            //set time period for premium/regular
            var period = $period.find(':selected').val();
            var start_str = period + '_start';
            var end_str = period + '_end';

//            console.log(prog_time[start_str], prog_time[end_str]);
            $fix_time.data("DateTimePicker").minDate(new Date(ProductSlot.prog_time[start_str]));
            $fix_time.data("DateTimePicker").maxDate(new Date(ProductSlot.prog_time[end_str]));

            ProductSlot._toggle_slot_time_button();
        });

        ProductSlot._$isFixable.click(function () {
            if ($(this).is(':checked')) {
                $fixable_slot.show();
                ProductSlot._toggle_slot_time_button();
                return;
            }
            $fixable_slot.hide();
        });

        var slot_selection = {fixtimes: []};
        $('button#add_fix_time').click(function () {

            ProductSlot._$slots_select_no.attr('disabled', true);
            $('#fix_date_input').attr('disabled', true);

            var date = new Date($('#fix_time').data("DateTimePicker").date());
            var timeStr = date.toLocaleTimeString();
            /*toTimeString();*/
//
            if (slot_selection.fixtimes.indexOf(timeStr) != -1) {
                console.log('Time chosen');
                return;
            }
//
            slot_selection.date = (new Date($('#fix_date').data("DateTimePicker").date())).toDateString();
            slot_selection.going = ProductSlot._$slots_select_no.find(':selected').val();
            slot_selection.fixtimes.push(timeStr);

            __row_slot_selection = JSON.parse(JSON.stringify(slot_selection));

            if (!$('tr#display_slot').is(':visible')) {
                $('tr#display_slot').show();
            }
            $('tr#display_slot td#slot_date').text(slot_selection.date);
            $('tr#display_slot td#slot_going').text(slot_selection.going);
            $('tr#display_slot td#slot_fixes').html($('<p class="help-block"></p>').text(slot_selection.fixtimes.length + ' of ' + slot_selection.going + ' set'));
            $('tr#display_slot td#slot_fixtimes').text(slot_selection.fixtimes.join(', '));
//
            ++add_fix_time_counter;
            if (add_fix_time_counter == slot_selection.going) {
                this.disabled = true;
            }
        });

        ProductSlot._$slots_select_no.change(function () {
            used_slot = $(this).find(':selected').val();
            ProductSlot._toggle_slot_time_button();
        });

        $fix_slot_reset.mouseover(function () {

        });

        $fix_slot_reset.click(function () {
            slot_selection = {fixtimes: []};
            __row_slot_selection = {'fixtimes': []};

            ProductSlot._generate_fix_slot_select(parseInt(max_slot));

            $('#fix_date').data("DateTimePicker").clear();
            $('#fix_time').data("DateTimePicker").clear();

            $('#fix_date_input').attr("disabled", false);
            ProductSlot._$slots_select_no.attr("disabled", false);


            $('tr#display_slot').hide();

            ProductSlot._toggle_slot_time_button();
        });

        $complete_slot_add.click(function () {
            slot_selection = {fixtimes: []};

            __row_slot_selection.date = (new Date($('#fix_date').data("DateTimePicker").date())).toDateString();
            __row_slot_selection.going = ProductSlot._$slots_select_no.find(':selected').val();

            var copyObj = JSON.parse(JSON.stringify(__row_slot_selection));
            ProductSlot._slot_table.push(copyObj);

            ProductSlot._calc_slot_price(ProductSlot._slot_table);

            max_slot -= used_slot;
            ProductSlot._generate_fix_slot_select(parseInt(max_slot));

            disabled_fix_date.push($fix_date.data("DateTimePicker").date());
            $fix_date.data("DateTimePicker").disabledDates(disabled_fix_date);

            $fix_slot_reset.trigger('click');

        });


        $('table#slot_table').on('click', 'a.fix_slot_del', function () {
            var index = $(this).attr('data-index');
            ProductSlot._slot_table.splice(index, 1);
            console.log(index, ProductSlot._slot_table);

            ProductSlot._calc_slot_price(ProductSlot._slot_table);
//                load_slot_table(slot_table);
        });

        $refresh_slot_button.click(function () {
            $('#slot_start_date').data("DateTimePicker").clear();
            $('#slot_end_date').data("DateTimePicker").clear();

            $fix_slot_reset.trigger('click');
            clear_disabled_dates();
            ProductSlot._slot_table = [];
            ProductSlot._calc_slot_price(ProductSlot._slot_table);

            ProductSlot._$slots.val(1).change();
            ProductSlot._$slots.attr('disabled', false);
        });

        $fix_time.datetimepicker()
            .on('dp.change', function (e) {
                ProductSlot._toggle_slot_time_button();
            });

        function clear_disabled_dates() {
            disabled_fix_date = [];
            $('#fix_date').data("DateTimePicker").disabledDates(null);
        }
    },

    _calc_slot_price: function (slots_list) {

        ProductSlot._load_slot_table(ProductSlot._slot_table);

        var total_going = 0;
        var product_price = parseFloat(ProductSlot._$price.val());
        var no_slots = parseInt(ProductSlot._$slots.find(':selected').val());
        var total_slot_price = parseFloat(product_price * no_slots);

        for (var i = 0; i < slots_list.length; i++) {

//                    if(i==0) {
//                        for (var j=0; j<slots_list.length; j++) {
//                            total_going += parseInt(slots_list[i].going);
//                        }
//                        if(total_going > no_slots) {
//                            total_slot_price = parseFloat(product_price * total_going);
//                        }
//                    }

            var fixprice = slots_list[i].fixtimes.length * product_price;
            total_slot_price += ( (parseInt(ProductSlot._$p_selected.surcharge) / 100) * parseFloat(fixprice) );
        }

        ProductSlot._$slot_price.val(total_slot_price);
        ProductSlot._$slot_price.number(true, 2);
    },

    _load_slot_table: function (list) {
        $('tr.slot_data').remove();
        for (var i = 0; i < list.length; i++) {
            console.log(list, list.length);
            var $slot_data = $('<tr></tr>').addClass('slot_data');
            $slot_data.append($('<td width="3%"><a class="fix_slot_del" data-index="' + i + '" href="javascript:void(0)"><em class="fa fa-remove text-danger"></em></a></td>'));
            $slot_data.append($('<td width="27%">' + list[i].date + '</td>'));
            $slot_data.append($('<td id="slot_going" width="5%" class="text-center">' + list[i].going + '</td>'));
            $slot_data.append($('<td id="slot_fixes" width="20%"> ' + list[i].fixtimes.length + ' of ' + list[i].going + ' set</td>'));
            $slot_data.append($('<td id="slot_fixtimes">' + list[i].fixtimes.join(', ') + '</td>'));
            ProductSlot._$_slot_table.append($slot_data);
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
        $duration.empty();
        $.each(p_selected.prices, function (index, price) {
//                   console.log(index, price);
            $duration.append($("<option></option>")
                .attr("data-index", index)
                .attr("data-id", price.id)
                .attr("data-object", JSON.stringify(price))
                .attr("value", price.duration).text(price.duration));
        });
        $duration.find(':first').attr('selected', true);
        $duration.trigger('change');
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
            'minDate': start,
            defaultDate: start
        });

        $('#slot_start_date').datetimepicker()
            .on('dp.change', function (e) {

                $('select#slots').attr('disabled', true);
                $('#slot_end_date').data("DateTimePicker").clear();
                $('#fix_date').data("DateTimePicker").clear();

                if (e.date != null || typeof e.event != 'undefined') {
                    $('#slot_end_date').data("DateTimePicker").minDate(e.date);
                    $('#fix_time').data("DateTimePicker").minDate(e.date);
                }
            });

        $('#slot_end_date').datetimepicker()
            .on('dp.change', function (e) {
                $('#fix_date').data("DateTimePicker").clear();
                if (e.date != null || typeof e.event != 'undefined') {
                    $('#fix_time').data("DateTimePicker").maxDate(e.date);
                }
            });

        $('#fix_date').datetimepicker()
            .on('dp.change', function (e) {
                $('#fix_time').data("DateTimePicker").clear();
            });
    },

    _toggle_slot_time_button: function () {
        var option_val = ProductSlot._$slots_select_no.find(':selected').val();
        var fix_time = $('#fix_date').data("DateTimePicker").date();

        if (option_val > 0 && fix_time) {
            $('#add_fix_time').attr('disabled', false);
            $('#complete_slot_add').attr('disabled', false);
        }
        else {
            $('#add_fix_time').attr('disabled', true);
            $('#complete_slot_add').attr('disabled', true);
        }
    }
};