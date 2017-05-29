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
                        <label for="product" class="control-label"
                               data-toggle="tooltip" data-placement="top" title="" data-original-title="Add your tips here">Product
                            <abbr class="text-danger" title="required">*</abbr>
                        </label>
                        <select id="product-data-select" class="form-control data-select2">
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
                                <label for="airtimePeriod" class="control-label"
                                       data-toggle="tooltip" data-placement="top" title="" data-original-title="Add your tips here">Period
                                    <abbr class="text-danger" title="required">*</abbr>
                                </label>
                                <select id="period" class="form-control" required>
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
                                <select id="duration" class="form-control" required>
                                </select>
                                <span class="help-block">Please select a duration. </span>
                            </div>


                        </div>
                    </div>

                    <div class="form-group" style="display: none;" id="tariff-div">
                        {{--<label class="col-sm-2 control-label">Inline radios</label>--}}
                        <div class="col-sm-10">
                            <label class="radio-inline c-radio">
                                <input id="tariff-slot" name="tariff" value="slot" type="radio">
                                <span class="fa fa-circle"></span>Open Slot</label>
                            <label class="radio-inline c-radio">
                                <input id="tariff-bulk" name="tariff" value="bulk" type="radio">
                                <span class="fa fa-circle"></span>Open Bulk</label>
                        </div>
                    </div>

                    <!-- display price-->
                    <div class="form-group">
                        <div class="pull-right">
                            <div class="col-sm-6">
                                <input type="text" class="form-control" style="width:150px;" id="price"
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
    <div id="slotPanel" style="display: none" class="panel panel-default">
        <div class="panel-heading">Slots</div>
        <!-- .panel-wrapper is the element to be collapsed-->
        <div class="panel-wrapper">
            <div class="panel-body">

                <!--Slot configs-->
                <div class="form-group">
                    <div class="col-sm-6">
                        <label for="slots" class="control-label">Slot(s)</label>
                        <p class="input-group">
                            <select id="slots"
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
                    <div class="col-sm-6">
                        <label for="duration" class="control-label">Date<abbr class="text-danger"
                                                                              title="required">*</abbr></label>
                        <div class="input-group input-daterange">
                            <input type="text" placeholder="start date" id="slot_start_date"
                                   class="form-control">
                            <div class="input-group-addon">to</div>
                            <input type="text" placeholder="end date" id="slot_end_date"
                                   class="form-control">
                        </div>
                    </div>
                </div>

                <br/>

                <div class="form-group">
                    {{--<label class="col-sm-2 control-label">Custom Checkboxes &amp; radios</label>--}}
                    <div class="col-sm-10">
                        <div class="checkbox c-checkbox needsclick">
                            <label class="needsclick">
                                <input type="checkbox" id="isfixable" name="isfixable" value="isfixable" class="needsclick">
                                <span class="fa fa-check"></span>Do you want to fix your slot (Fixed rates apply)</label>
                        </div>
                    </div>
                </div>


                <div id="fixable_slot" style="display: none">
                    <div class="form-group">
                        <div class="col-md-3 col-xs-3">
                            <p class="input-group" id="fix_date">
                                <input type="text" id="fix_date_input" placeholder="Slot date"
                                       class="form-control"/>
                                          <span class="input-group-addon">
                                                 <em class="fa fa-calendar"></em>
                                          </span>
                            </p>
                        </div>
                        <div class="col-md-3 col-xs-3">
                            <p class="input-group">
                                <select class="form-control" id="slots_select_no" data-bind="attr: { disabled: disableFixableSlots }">
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
                                <input type="text" id="fix_time_input" placeholder="Slot time" class="form-control"/>
                                          <span class="input-group-addon">
                                              <em class="icon-clock"></em>
                                          </span>

                                    <span class="input-group-btn">
                                        <button type="button" id="add_fix_time" class="btn btn-primary">
                                            <em class="fa fa-plus"></em>
                                        </button>
                                    </span>
                            </p>
                            <span id="time-chosen" class="help-block" style="color:red; display: none">Time chosen</span>
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
                <div style="padding:20px"></div>
                <!--slot Attachment-->
                <div id="slot-attachment">
                    <div class="form-group">
                        <div class="col-sm-8">
                            <p class="input-group">
                                <span id="slot-input-group-btn" class="input-group-addon">
                                    {{--<button class="btn btn-default">--}}
                                        <em class="fa fa-refresh"></em>
                                    {{--</button>--}}
                                  </span>
                            </p>
                            <span class="help-block">Files must not exceed 500KB</span>
                        </div><br />
                        <span class="col-sm-10">Only [zip, rar, 7z, image, audio, video formats are allowed.</span>
                    </div>
                </div>

                <!-- display price-->
                <div class="form-group">
                    {{--<input type="file" name="test" />--}}
                    <div class="pull-right col-md-3">
                        <div class="input-group m-b">
                            <span class="input-group-addon">NGN</span>
                            <input type="text" readonly="" class="form-control" id="slot_price">
                        </div>
                    </div>
                    <div class="clear-fix"></div>
                </div>
                <!--End: display price-->


            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="col-sm-4">
                        <button type="button" data-bind="enable: slotButton" id="add-slot-button" class="btn btn-info btn-sm">Add Slot</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END panel-->

    <!--Bulk Option-->
    <!-- START panel-->
    <div id="bulkPanel" class="panel panel-default" style="display: none">
        <div class="panel-heading">Bulk Option</div>

        <!-- .panel-wrapper is the element to be collapsed-->
        <div class="panel-wrapper">
            <div class="panel-body">
                <div class="col-xs-12 col-sm-12">
                    <!-- if bulk is clicked -->

                    <div class="form-group">
                        <div class="col-sm-7">
                            <label class="control-label">No. of Broadcasts <abbr class="text-danger" title="required">*</abbr></label>
                            <p class="input-group">
                                <select class="form-control" id="bulks">
                                    @for($b = 0; $b<1500; $b++)
                                        <option value="{{$b + 501}}">{{$b + 501}}</option>
                                    @endfor
                                </select>
                                <span class="input-group-btn">
                                         <button type="button" id="refresh_bulk_button" class="btn btn-default">
                                             <em class="fa fa-refresh"></em>
                                         </button>
                                      </span>
                            </p>
                        </div>
                    </div>

                    <!-- Datetime example -->
                    <div class="form-group" id="bulk-date-container">
                        <div class="col-sm-8">
                            <label for="duration" class="control-label">Date<abbr class="text-danger"
                                                                                  title="required">*</abbr></label>
                            <div class="input-group input-daterange">
                                <input type="text" placeholder="start date" id="bulk_start_date"
                                       class="form-control">
                                <div class="input-group-addon">to</div>
                                <input type="text" placeholder="end date" id="bulk_end_date"
                                       class="form-control">
                            </div>
                        </div>
                    </div>

                    <div style="padding:20px"></div>
                    <!--Bulk Attachment-->
                    <div id="bulk-attachment">
                        <div class="form-group">
                            <div class="col-sm-8">
                                <p class="input-group">
                                <span id="bulk-input-group-btn" class="input-group-addon">
                                    {{--<button class="btn btn-default">--}}
                                    <em class="fa fa-refresh"></em>
                                    {{--</button>--}}
                                  </span>
                                </p>
                                <span class="help-block">Files must not exceed 500KB</span>
                            </div>
                            <br />
                            <span class="col-sm-10">Only [zip, rar, 7z, image, audio, video formats are allowed.</span>
                        </div>
                    </div>

                    <!-- display price-->
                    <div class="form-group">
                        <div class="pull-right col-md-3">
                            <div class="input-group m-b">
                                <span class="input-group-addon">NGN</span>
                                <input type="text" readonly="" class="form-control" id="bulk_price">
                            </div>
                        </div>
                        <div class="clear-fix"></div>
                    </div>
                </div>
                <!--End Bulk config-->

            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="col-sm-4">
                        <button id="add-bulk-button" data-bind="enable: bulkButton" type="button" class="btn btn-info btn-sm">Add Bulk</button>
                    </div>
                    <div class="col-sm-7">
                        <span class="help-block"><i class="fa fa-info-circle"></i> Please select airtime duration. </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END panel-->

</section>

<script src="/js/slots.js"></script>


<script>

    $(document).ready(function () {

        ProductSlot.init({!!$products !!}, {!! $prog_time !!});

    });

</script>