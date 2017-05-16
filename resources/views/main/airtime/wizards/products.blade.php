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
                {{--{{ $products }}--}}

                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="product" class="control-label">Product <abbr class="text-danger" title="required">*</abbr></label>
                        <select id="product-data-select" name="product_id" class="form-control data-select2" required>
                            <option></option>
                            @foreach($products as $product)
                                <option data-index="{{$loop->index}}" value="{{ $product->id }}">{{ $product->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- product durations-->
                    <div class="form-group">
                        <div class="row">

                            <!-- choose airtime period-->
                            <div class="col-md-5 col-xs-12" >
                                <label for="airtimePeriod" class="control-label">Period <abbr class="text-danger" title="required">*</abbr></label>
                                <select ng-disabled="(form.no_slots > 0) || (form.broadcast > 0) || !product.selected"
                                        name="period" id="period" class="form-control" required>
                                    <option value="premium" >Premium</option>
                                    <option value="regular" >Regular</option>
                                </select>
                            </div>

                            <!-- airtime durations-->
                            <div id="timable" style="display: none" class="col-md-5 col-xs-12">
                                <label for="duration" class="control-label">Duration <abbr class="text-danger" title="required">*</abbr></label>
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
                                <input type="text" class="form-control" style="width:150px;"  name="price" id="price" disabled />
                            </div>
                        </div>
                        <div class="clear-fix"></div>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button type="button" class=" btn btn-default"> <em class="fa fa-refresh"></em> Refresh </button>
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
                                <select ng-disabled="(form.no_slots > 0) || !form.price" name="slots" id="slots" class="form-control">
                                    @for($i = 1; $i<=500; $i++)
                                        <option value="{{$i}}">{{$i}}</option>
                                    @endfor
                                </select>
                                <span class="input-group-btn">
                                     <button type="button" ng-click="clearSlot()" class="btn btn-default">
                                         <em class="fa fa-refresh"></em>
                                     </button>
                                  </span>
                            </p>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-6">
                            <label for="duration" class="control-label">Start date <abbr class="text-danger" title="required">*</abbr></label>
                            <p class="input-group">
                                <input type="text" placeholder="start date" id="slot_start_date" name="slot_start_date"  class="form-control" />
                                      <span class="input-group-btn">
                                         <button type="button" class="btn btn-default">
                                             <em class="fa fa-calendar"></em>
                                         </button>
                                      </span>
                            </p>
                        </div>

                        <div class="col-sm-6">
                            <label for="duration" class="control-label">End date <abbr class="text-danger" title="required">*</abbr></label>
                            <p class="input-group">
                                <input type="text" name="slot_end_date" class="form-control" placeholder="end date" />
                                      <span class="input-group-btn">
                                         <button type="button" class="btn btn-default">
                                             <em class="fa fa-calendar"></em>
                                         </button>
                                      </span>
                            </p>
                        </div>
                    </div>

                    <br />

                <div class="form-group" ng-show="product.selected.fixable">
                    {{--<label class="col-sm-2 control-label">Custom Checkboxes &amp; radios</label>--}}
                    <div class="col-sm-10">
                        <div class="checkbox c-checkbox needsclick">
                            <label class="needsclick">
                                <input type="checkbox" name="isfixable" value="isfixable" class="needsclick">
                                <span class="fa fa-check"></span>Do you want to fix your slot (Fixed rates apply)</label>
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


                    <div ng-if="btn.fixslot">
                        <div class="form-group">
                            <div class="col-sm-6">
                                <p class="input-group">
                                    <input type="text" placeholder="Slot date" name="fix_date" class="form-control" />
                                          <span class="input-group-btn">
                                             <button type="button" class="btn btn-default">
                                                 <em class="fa fa-calendar"></em>
                                             </button>
                                          </span>
                                </p>
                            </div>
                            <div class="col-sm-5">
                                <p class="input-group">
                                    <select class="form-control" name="" id="">
                                        <option value=""></option>
                                    </select>
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-default">
                                            <em class="fa fa-arrow-down"></em>
                                        </button>
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div class="form-group" ng-if="scheduleSlots.length">
                            <!--<div class="table-responsive">-->
                            <table class="table table-bordered">
                                <tr>
                                    <th></th>
                                    <th>Date</th>
                                    <th>Slot</th>
                                    <th>Fix <small>(optional)</small></th>
                                    <th>Time <small>(*when fixed)</small></th>
                                </tr>
                                <tr ng-repeat="schedule in scheduleSlots">
                                    <td width="3%"><a ng-click="removeSchedule($index)" ><em class="fa fa-remove text-danger"></em></a></td>
                                    <td width="27%">@{{schedule.date | date:'d-MMM-y'}}</td>
                                    <td width="5%" class="text-center">@{{schedule.slot}}</td>
                                    <td width="20%">
                                        <div>
                                            <select class="form-control" ng-change="calcFixedPrice()" ng-init="schedule.tofix = '0'" ng-model="schedule.tofix" class="form-control" name="">
                                                <option value="@{{$index + 1}}" ng-repeat="i in getSlotRange(schedule.slot) track by $index">@{{$index + 1}}</option>
                                            </select>
                                        </div>
                                        <p ng-if="tofix" class="help-block">1 0f 6 set</p>
                                    </td>
                                    <td>
                                        <div ng-if="schedule.tofix > 0">

                                            <div ng-controller="SlotTimeModalCtrl as timeMod">
                                                <!-- Modal inline template-->
                                                <script type="text/ng-template" id="/myModalContent.html">
                                                    <div class="modal-header">
                                                        <button type="button" ng-click="cancel()" data-dismiss="modal" aria-hidden="true" class="close">×</button>
                                                        <h4 id="myModalLabel" class="modal-title">Set Slot time</h4>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="text text-primary">
                                                            <span ng-repeat="t in scheduleRef.times">@{{t | date:'h:mm a'}}, </span>
                                                        </div>
                                                        <p class="input-group" ng-repeat="i in getSlotRange(scheduleRef.tofix) track by $index"
                                                           ng-init="box[$index] = true" ng-show="box[$index]">
                                                            <input type="text" placeholder="time" class="form-control col-sm-2" ng-model="scheduleRef.times[$index]" name="time" bs-timepicker data-time-format="HH:mm" data-length="1" data-minute-step="1" data-arrow-behavior="picker">
                                                                <span class="input-group-btn">
                                                                <button ng-disabled="!scheduleRef.times[$index]"  ng-click="box[$index] = false" type="button" class="btn btn-default">
                                                                    <em class="icon-pin"></em>
                                                                </button>
                                                                </span>
                                                        </p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button ng-click="ok()" class="btn btn-primary">OK</button><button ng-click="cancel()" class="btn btn-warning">Cancel</button>
                                                    </div>
                                                </script>

                                                <!-- Danger button with label -->
                                                <button type="button" class="btn btn-labeled" ng-click="timeMod.open('sm', schedule)" ng-class="{'btn-danger':schedule.times.length != schedule.tofix, 'btn-success':schedule.times.length == schedule.tofix}" >
                                                    <span class="btn-label" ng-if="schedule.times.length != schedule.tofix"><i class="fa fa-exclamation"></i></span>
                                                    <span class="btn-label" ng-if="schedule.times.length == schedule.tofix"><i class="fa fa-check"></i></span>
                                                    <em class="icon-clock"></em>
                                                </button>

                                                <button type="button" class="btn btn-warning btn-sm" ng-click="clearScheduleTimes(schedule)"><em class="icon-refresh"></em></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <!--</div>-->
                        </div>
                    </div>
                <!--End Slot config-->

                <!-- display price-->
                <div class="form-group">
                    <div class="pull-right">
                        <div class="col-sm-6">
                            <input type="text" class="form-control" style="width:150px;" name="slot_price" id="slot_price" disabled />
                        </div>
                    </div>
                    <div class="clear-fix"></div>
                </div>
                <!--End: display price-->

            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="col-sm-4">
                        <button type="button" ng-click="addSlot()" ng-disabled="!((form.no_slots > 0) && (form.slot_start_date) && (form.slot_end_date) && checkScheduleSlot())" class="btn btn-info btn-sm">Add Slot</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END panel-->

</section>


<script>

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

    //main function
    $(function () {
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
        $('#product-data-select').change(function() {
            $timeable.hide();

            $period.trigger('change');
        });


        //when period change
        $period.change(function(){
            var p_index = $('#product-data-select').find(':selected').attr('data-index');
            var $p_selected = products[p_index];
            if($p_selected.timeable) {
//                console.log($p_selected);
                populate_duration($p_selected, $timeable);
                $duration.trigger('change');
            } else {
                var product_price = $p_selected.prices[0];
                $price.val(product_price[$period.find(':selected').val()]);
                $price.number( true, 2 );

                $tariff_div.show();
            }
        });

        //when duration change
        $duration.change(function() {
            var $s_duration = $duration.find(':selected');
            var product_price = $s_duration.attr('data-object');
            $price.attr('data-object', product_price);
            var parsed_price = JSON.parse(product_price);
            $price.val(parsed_price[$period.find(':selected').val()]);
            $price.number( true, 2 );

            $tariff_div.show();
        });


        $(':radio[name=tariff]').change(function() {
            if($(this).val() == 'slot') {
                $slotPanel.show();
                $('select#slots').trigger('change');
            }
        });

        function open_slot()
        {

        }

        $('select#slots').change(function() {
            var $slots = $('select#slots');
            var no_slots = $slots.find(':selected').val();
            var total_slot_price = parseFloat(parseFloat($price.val()) * parseInt(no_slots));

            $('input#slot_price').val(total_slot_price);
            $('input#slot_price').number(true, 2);
        });

    });
</script>