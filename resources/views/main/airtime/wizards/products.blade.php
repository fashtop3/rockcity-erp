<h4 class="airtime-header">Products
    <br>
    <small>Add products and slots.</small>
</h4>
<section class="wizard-body">

    <!--Product details-->
    <!-- START panel-->
    <div id="productPanel" class="panel panel-default">
        <div class="panel-heading">Product Details</div>
        <!-- .panel-wrapper is the element to be collapsed-->
        <div class="panel-wrapper">
            <div class="panel-body">
                {{--{{ $prog_time }}--}}

                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="product" class="control-label">Product <abbr class="text-danger"
                                                                                 title="required">*</abbr></label>
                        <select id="product-data-select" name="product_id" class="form-control data-select2" required>
                            <option></option>
                            @foreach($products as $product)
                                <option data-index="{{$loop->index}}"
                                        value="{{ $product->id }}">{{ $product->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- product durations-->
                    <div class="form-group">
                        <div class="row">

                            <!-- choose airtime period-->
                            <div class="col-md-5 col-xs-12">
                                <label for="airtimePeriod" class="control-label">Period <abbr class="text-danger"
                                                                                              title="required">*</abbr></label>
                                <select ng-disabled="(form.no_slots > 0) || (form.broadcast > 0) || !product.selected"
                                        name="period" id="period" class="form-control" required>
                                    <option value="premium">Premium</option>
                                    <option value="regular">Regular</option>
                                </select>
                            </div>

                            <!-- airtime durations-->
                            <div id="timable" style="display: none" class="col-md-5 col-xs-12">
                                <label for="duration" class="control-label">Duration <abbr class="text-danger"
                                                                                           title="required">*</abbr></label>
                                <!--Todo: add required if selected product is timeable -->
                                <!--Todo: disable if no_slots > 0) || (form.broadcast > 0 -->
                                <select name="price" id="duration" class="form-control" required>
                                </select>
                                <span class="help-block">Please select a duration. </span>
                            </div>


                        </div>
                    </div>

                    <div class="form-group" style="display: none;" id="tariff-div">
                        {{--<label class="col-sm-2 control-label">Inline radios</label>--}}
                        <div class="col-sm-10">
                            <label class="radio-inline c-radio">
                                <input id="tariff" name="tariff" value="slot" type="radio">
                                <span class="fa fa-circle"></span>Open Slot</label>
                            <label class="radio-inline c-radio">
                                <input id="tariff" name="tariff" value="bulk" type="radio">
                                <span class="fa fa-circle"></span>Open Bulk</label>
                        </div>
                    </div>

                    <!-- display price-->
                    <div class="form-group">
                        <div class="pull-right">
                            <div class="col-sm-6">
                                <input type="text" class="form-control" style="width:150px;" name="price" id="price"
                                       disabled/>
                            </div>
                        </div>
                        <div class="clear-fix"></div>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button type="button" class=" btn btn-default"><em class="fa fa-refresh"></em> Refresh</button>
            </div>
        </div>

    </div>
    <!-- END panel-->

    <!--Schedule Details-->
    <!-- START panel-->
    <div id="slotPanel" style="display: none" class="panel panel-default" ng-class="{whirl:!form.price}">
        <div class="panel-heading">Slots</div>
        <!-- .panel-wrapper is the element to be collapsed-->
        <div class="panel-wrapper">
            <div class="panel-body">

                <!--Slot configs-->
                <div class="form-group">
                    <div class="col-sm-6">
                        <label for="slots" class="control-label">Slot(s)</label>
                        <p class="input-group">
                            <select ng-disabled="(form.no_slots > 0) || !form.price" name="slots" id="slots"
                                    class="form-control">
                                @for($i = 1; $i<=500; $i++)
                                    <option value="{{$i}}">{{$i}}</option>
                                @endfor
                            </select>
                                <span class="input-group-btn">
                                     <button type="button" id="refresh_slot_button" class="btn btn-default">
                                         <em class="fa fa-refresh"></em>
                                     </button>
                                  </span>
                        </p>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-8">
                        <label for="duration" class="control-label">Date<abbr class="text-danger"
                                                                              title="required">*</abbr></label>
                        <div class="input-group input-daterange">
                            <input type="text" placeholder="start date" id="slot_start_date" name="slot_start_date"
                                   class="form-control">
                            <div class="input-group-addon">to</div>
                            <input type="text" placeholder="end date" id="slot_end_date" name="slot_end_date"
                                   class="form-control">
                        </div>
                    </div>

                    {{--<div class="col-sm-6">--}}
                    {{--<label for="duration" class="control-label">Start date <abbr class="text-danger" title="required">*</abbr></label>--}}
                    {{--<p class="input-group" id="slot_start_date">--}}
                    {{--<input type="text" placeholder="start date"  name="slot_start_date"  class="form-control datepicker" />--}}
                    {{--<span class="input-group-addon">--}}
                    {{--<button type="button" class="btn btn-default">--}}
                    {{--<em class="fa fa-calendar"></em>--}}
                    {{--</button>--}}
                    {{--</span>--}}
                    {{--</p>--}}
                    {{--</div>--}}

                    {{--<div class="col-sm-6">--}}
                    {{--<label for="duration" class="control-label">End date <abbr class="text-danger" title="required">*</abbr></label>--}}
                    {{--<p class="input-group" id="slot_end_date">--}}
                    {{--<input type="text" name="slot_end_date" class="form-control" placeholder="end date" />--}}
                    {{--<span class="input-group-addon">--}}
                    {{--<button type="button" class="btn btn-default">--}}
                    {{--<em class="fa fa-calendar"></em>--}}
                    {{--</button>--}}
                    {{--</span>--}}
                    {{--</p>--}}
                    {{--</div>--}}
                </div>

                <br/>

                <div class="form-group">
                    {{--<label class="col-sm-2 control-label">Custom Checkboxes &amp; radios</label>--}}
                    <div class="col-sm-10">
                        <div class="checkbox c-checkbox needsclick">
                            <label class="needsclick">
                                <input type="checkbox" name="isfixable" value="isfixable" class="needsclick">
                                <span class="fa fa-check"></span>Do you want to fix your slot (Fixed rates
                                apply)</label>
                        </div>
                    </div>
                </div>

                {{--<div class="form-group" ng-show="!product.selected.fixable" >--}}
                {{--<div class="checkbox" >--}}
                {{--<label class="text-warning">--}}
                {{--<input type="checkbox" name="isfixable" ng-model="btn.fixslot" /> Programme Displacement (50% charges apply)--}}
                {{--</label>--}}
                {{--</div>--}}
                {{--</div>--}}


                <div id="fixable_slot">
                    <div class="form-group">
                        <div class="col-md-3 col-xs-3">
                            <p class="input-group" id="fix_date">
                                <input type="text" id="fix_date_input" placeholder="Slot date" name="fix_date"
                                       class="form-control"/>
                                          <span class="input-group-addon">
                                                 <em class="fa fa-calendar"></em>
                                          </span>
                            </p>
                        </div>
                        <div class="col-md-3 col-xs-3">
                            <p class="input-group">
                                <select class="form-control" id="slots_select_no">
                                    <option>---</option>
                                </select>
                                    <span class="input-group-btn">
                                        <button type="button" id="fix_slot_reset" class="btn btn-primary">
                                            <em class="fa fa-refresh"></em>
                                        </button>
                                    </span>
                            </p>
                        </div>
                        <div class="col-md-4 col-xs-4">
                            <p class="input-group" id="fix_time">
                                <input type="text" id="fix_time_input" placeholder="Slot time" name="fix_time" class="form-control"/>
                                          <span class="input-group-addon">
                                              <em class="icon-clock"></em>
                                          </span>

                                    <span class="input-group-btn">
                                        <button type="button" id="add_fix_time" class="btn btn-primary">
                                            <em class="fa fa-plus"></em>
                                        </button>
                                    </span>
                            </p>
                        </div>
                        <div class="col-md-1 col-xs-1">
                            <button type="button" id="complete_slot_add" class="btn btn-success">
                                <em class="fa fa-check"></em>
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-12 col-xs-12">
                            <div class="table-responsive">
                                <table id="slot_table" class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Date</th>
                                        <th>Slot</th>
                                        <th>Fix
                                            <small>(optional)</small>
                                        </th>
                                        <th>Time
                                            <small>(*when fixed)</small>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr id="display_slot" class="bg-warning" style="display: none">
                                        <td id="slot_sn" width="3%"></td>
                                        <td id="slot_date" width="27%"></td>
                                        <td id="slot_going" width="5%" class="text-center"></td>
                                        <td id="slot_fixes" width="20%"></td>
                                        <td id="slot_fixtimes"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!--End Slot config-->

                <!-- display price-->
                <div class="form-group">
                    <div class="pull-right col-md-3">
                        <div class="input-group m-b">
                            <span class="input-group-addon">NGN</span>
                            <input type="text" readonly="" class="form-control" name="slot_price" id="slot_price">
                        </div>
                    </div>
                    <div class="clear-fix"></div>
                </div>
                <!--End: display price-->


            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="col-sm-4">
                        <button type="button" ng-click="addSlot()"
                                ng-disabled="!((form.no_slots > 0) && (form.slot_start_date) && (form.slot_end_date) && checkScheduleSlot())"
                                class="btn btn-info btn-sm">Add Slot
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END panel-->

</section>


<script>

    $(document).ready(function () {

        var prog_time = {!! $prog_time !!};
        var $p_selected = null;
        var product_cart = {};
        var slot_table = [];


        /**
         * Product panel section
         */

        function populate_duration($p_selected, $timeable) {
            $duration.empty();
            $.each($p_selected.prices, function (index, price) {
//                   console.log(index, price);
                $duration.append($("<option></option>")
                        .attr("data-index", index)
                        .attr("data-id", price.id)
                        .attr("data-object", JSON.stringify(price))
                        .attr("value", price.duration).text(price.duration));
            });
            $duration.find(':first').attr('selected', true);
            $duration.trigger('change');
            $timeable.show();
        }

        var $timeable = $('#timable');
        var $tariff_div = $('#tariff-div');
        var $slotPanel = $('#slotPanel');
        $timeable.hide();
        $tariff_div.hide();
        $slotPanel.hide();


        $period = $('select#period');
        $duration = $timeable.find("select#duration");
        $price = $('input#price');

        var products = {!! $products !!};

        //when new product is selected
        $('#product-data-select').change(function () {
            $timeable.hide();

            $period.trigger('change');
        });


        //when period change
        $period.change(function () {
            var p_index = $('#product-data-select').find(':selected').attr('data-index');
            $p_selected = products[p_index];
//            console.log($p_selected);
            if ($p_selected.timeable) {
                populate_duration($p_selected, $timeable);
                $duration.trigger('change');
            } else {
                var product_price = $p_selected.prices[0];
                $price.val(product_price[$period.find(':selected').val()]);
                $price.number(true, 2);

                $tariff_div.show();
            }
        });

        //when duration change
        $duration.change(function () {
            var $s_duration = $duration.find(':selected');
            var product_price = $s_duration.attr('data-object');
            $price.attr('data-object', product_price);
            var parsed_price = JSON.parse(product_price);
            $price.val(parsed_price[$period.find(':selected').val()]);
            $price.number(true, 2);

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

        var $complete_slot_add = $('#complete_slot_add');
        $complete_slot_add.attr('disabled', true);
        var max_slot = 0, used_slot = 0, max_used_slot = 0;
        var $fix_slot_reset = $('#fix_slot_reset');
        var $slots = $('select#slots');
        var $slots_select_no = $('#slots_select_no');
        var $refresh_slot_button = $('#refresh_slot_button');
        var $fix_date = $('#fix_date');
        var $fix_time = $('#fix_time');
        var disabled_fix_date = [];
        var $_slot_table = $('#slot_table tbody');
        var __row_slot_selection = {'date': null, 'going': null, 'fixtimes': []};
        var $slot_price = $('input#slot_price');
        var add_fix_time_counter = 0;

        $('input#fix_date_input').keydown(function() {return false});
        $('input#fix_time_input').keydown(function() {return false});


        $slots.change(function () {

            $('#add_fix_time').attr("disabled", true);

            max_slot = $slots.find(':selected').val();
            $slots_select_no.empty();
            generate_fix_slot_select(parseInt(max_slot));

//                var product_price = parseFloat($price.val());
//                var no_slots = parseInt($slots.find(':selected').val());
//                var total_slot_price = parseFloat(product_price * no_slots);
//
//                $slot_price.val(total_slot_price);
//                $slot_price.number(true, 2);
            calc_slot_price(slot_table);

            //set time period for premium/regular
            var period = $period.find(':selected').val();
            var start_str = period + '_start';
            var end_str = period + '_end';

//            console.log(prog_time[start_str], prog_time[end_str]);
            $fix_time.data("DateTimePicker").minDate(new Date(prog_time[start_str]));
            $fix_time.data("DateTimePicker").maxDate(new Date(prog_time[end_str]));

            toggle_slot_time_button();
        });


        function calc_slot_price(slots_list) {

            load_slot_table(slot_table);

            var total_going = 0;
            var product_price = parseFloat($price.val());
            var no_slots = parseInt($slots.find(':selected').val());
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
                total_slot_price += ( (parseInt($p_selected.surcharge) / 100) * parseFloat(fixprice) );
            }

            $slot_price.val(total_slot_price);
            $slot_price.number(true, 2);
        }

        function create_slot_object() {
//                __row_slot_selection.date = (new Date($('#fix_date').data("DateTimePicker").date())).toDateString();
//                __row_slot_selection.going = $slots_select_no.find(':selected').val();
        }

        var slot_selection = {fixtimes: []};
        $('button#add_fix_time').click(function () {

            $slots_select_no.attr('disabled', true);
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
            slot_selection.going = $slots_select_no.find(':selected').val();
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

        $slots_select_no.change(function () {
            used_slot = $(this).find(':selected').val();
            toggle_slot_time_button();
        });

        $fix_slot_reset.mouseover(function () {

        });

        $fix_slot_reset.click(function () {
            slot_selection = {fixtimes: []};
            __row_slot_selection = {'fixtimes': []};

            generate_fix_slot_select(parseInt(max_slot));

            $('#fix_date').data("DateTimePicker").clear();
            $('#fix_time').data("DateTimePicker").clear();

            $('#fix_date_input').attr("disabled", false);
            $slots_select_no.attr("disabled", false);


            $('tr#display_slot').hide();

            toggle_slot_time_button();
        });

        $complete_slot_add.click(function () {
            slot_selection = {fixtimes: []};

            __row_slot_selection.date = (new Date($('#fix_date').data("DateTimePicker").date())).toDateString();
            __row_slot_selection.going = $slots_select_no.find(':selected').val();

            var copyObj = JSON.parse(JSON.stringify(__row_slot_selection));
            slot_table.push(copyObj);

            calc_slot_price(slot_table);

            max_slot -= used_slot;
            generate_fix_slot_select(parseInt(max_slot));

            disabled_fix_date.push($fix_date.data("DateTimePicker").date());
            $fix_date.data("DateTimePicker").disabledDates(disabled_fix_date);

            $fix_slot_reset.trigger('click');

        });

        function load_slot_table(list) {
            $('tr.slot_data').remove();
            for (var i = 0; i < list.length; i++) {
                console.log(list, list.length);
                var $slot_data = $('<tr></tr>').addClass('slot_data');
                $slot_data.append($('<td width="3%"><a class="fix_slot_del" data-index="' + i + '" href="javascript:void(0)"><em class="fa fa-remove text-danger"></em></a></td>'));
                $slot_data.append($('<td width="27%">' + list[i].date + '</td>'));
                $slot_data.append($('<td id="slot_going" width="5%" class="text-center">' + list[i].going + '</td>'));
                $slot_data.append($('<td id="slot_fixes" width="20%"> ' + list[i].fixtimes.length + ' of ' + list[i].going + ' set</td>'));
                $slot_data.append($('<td id="slot_fixtimes">' + list[i].fixtimes.join(', ') + '</td>'));
                $_slot_table.append($slot_data);
            }
        }

        $('table#slot_table').on('click', 'a.fix_slot_del', function () {
            var index = $(this).attr('data-index');
            slot_table.splice(index, 1);
            console.log(index, slot_table);

            calc_slot_price(slot_table);
//                load_slot_table(slot_table);
        });

        $refresh_slot_button.click(function () {
            $('#slot_start_date').data("DateTimePicker").clear();
            $('#slot_end_date').data("DateTimePicker").clear();

            $fix_slot_reset.trigger('click');
            clear_disabled_dates();
            slot_table = [];
            calc_slot_price(slot_table);

            $slots.val(1).change();
            $slots.attr('disabled', false);
        });

        $fix_time.datetimepicker()
                .on('dp.change', function (e) {
                    toggle_slot_time_button();
                });

        function clear_disabled_dates() {
            disabled_fix_date = [];
            $('#fix_date').data("DateTimePicker").disabledDates(null);
        }

        function generate_fix_slot_select(slot) {
            $slots_select_no.empty();
            $slots_select_no.append($('<option>---</option>'));
            for (var i = 1; i <= parseInt(slot); i++) {
                $slots_select_no.append($('<option></option>').val(i).text(i));
            }
        }

        function toggle_slot_time_button() {
            var option_val = $slots_select_no.find(':selected').val();
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

    });


    function init_slot_dates() {

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
    }


</script>