@section('vendor-head')
        <!-- SELECT2-->
<link rel="stylesheet" href="/vendor/select2/dist/css/select2.css">
<link rel="stylesheet" href="/vendor/select2-bootstrap-theme/dist/select2-bootstrap.css">
<link rel="stylesheet" href="/css/jquery-ui.min.css">

<!-- datetimepicker-->
<script type="text/javascript" src="/bower_components/moment/min/moment.min.js"></script>
<script type="text/javascript" src="/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
<link rel="stylesheet" href="/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css" />
@endsection

        <fieldset>
            <div class="form-group">
                <label for="vehicle" class="control-label col-sm-4">Vehicle <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 ">
                    {{--<ui-select  ng-model="report.vehicle" id="vehicle" theme="bootstrap" ng-disabled="disabled" required>--}}
                        {{--<ui-select-match name="brand" placeholder="Select report.info...">@{{$select.selected.name}}</ui-select-match>--}}
                        {{--<ui-select-choices  repeat="vehicle in motors | propsFilter: {name: $select.search, reg: $select.search, colour: $select.search}">--}}
                            {{--<div ng-bind-html="vehicle.name | highlight: $select.search"></div>--}}
                            {{--<small><b>Reg No:</b> @{{vehicle.reg}}, <b>Color:</b> @{{vehicle.colour}}</small>--}}
                        {{--</ui-select-choices>--}}
                    {{--</ui-select>--}}
                    {{--<span ng-show="!reportForm.brand.$pristine &amp;&amp; reportForm.brand.$error.required" class="text-danger">This field is required</span>--}}
                    <!--<span ng-show="!reportForm.brand.$pristine &amp;&amp; reportForm.brand.$error.pattern" class="text-danger">This field must be a valid name</span>-->
                    {{--Todo://add html to select2--}}
                    <select {{ @$disabled }} id="marketer-data-select" name="vehicle_id"  class="form-control data-select2" required>
                        <option></option>
                        @foreach(App\Models\Admin\Vehicle::all() as $vehicle)
                            <option {{ old('vehicle_id', @$report->vehicle_id) == $vehicle->id?'selected=""':'' }} data-index="{{ $loop->index }}" value="{{ $vehicle->id }}">{{ $vehicle->name }}; Eng: {{ $vehicle->eng }}; Reg: {{ $vehicle->reg }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="time_inspect" class="control-label col-sm-4">Time of inspection <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.time_inspect')?'has-error':'' }} ">
                    <p class="input-group picker" id="time_inspect">
                        <input {{ @$disabled }} type="text" name="info[time_inspect]"  value="{{ old('info.time_inspect', @$report->info['time_inspect']) }}"  class="form-control"/>
                      <span class="input-group-addon">
                          <em class="icon-clock"></em>
                      </span>
                    </p>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="water_level" class="control-label col-sm-4">Water level <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.water_level')?'has-error':'' }}">
                    <select {{ @$disabled }} class="form-control" name="info[water_level]" id="water_level" required>
                        <option value="">--Select water level--</option>
                        @for($i=0; $i<=100; $i++)
                            <option {{ old('info.water_level', @$report->info['water_level']) == $i ?'selected=""':'' }} value="{{ $i }}">{{ $i }}%</option>
                        @endfor
                    </select>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="oil_level" class="control-label col-sm-4">Oil level <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.oil_level')?'has-error':'' }}">
                    <select {{ @$disabled }} class="form-control" name="info[oil_level]" id="oil_level" required>
                        <option value="">--Select oil level--</option>
                        @for($i=0; $i<=100; $i++)
                            <option {{ old('info.oil_level', @$report->info['oil_level']) == $i ?'selected=""':'' }} value="{{ $i }}">{{ $i }}%</option>
                        @endfor
                    </select>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="fuel_level" class="control-label col-sm-4">Fuel level <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.fuel_level')?'has-error':'' }}">
                    <select {{ @$disabled }} class="form-control" name="info[fuel_level]" id="fuel_level" required>
                        <option value="">--Select fuel level--</option>
                        @foreach(['Empty','Quarter tank', 'Half tank', 'Full tank'] as $key=>$level)
                        <option {{ old('info.fuel_level', @$report->info['fuel_level']) == $level ?'selected=""':'' }}  value="{{ $level }}">{{ $level }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="break_condition" class="control-label col-sm-4">Break condition <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.break_condition')?'has-error':'' }}">
                    <select {{ @$disabled }} class="form-control" name="info[break_condition]" id="break_condition" required>
                        <option value="">--Select break condition--</option>
                        @foreach(['Bad', 'Fair', 'Good'] as $key=>$condition)
                            <option {{ old('info.break_condition', @$report->info['break_condition']) == $condition ?'selected=""':'' }} value="{{ $condition }}">{{ $condition }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="absorber_condition" class="control-label col-sm-4">Absorber condition <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.absorber_condition')?'has-error':'' }}">
                    <select {{ @$disabled }} class="form-control" name="info[absorber_condition]" id="absorber_condition" required>
                        <option value="">--Select absorber condition--</option>
                        @foreach(['Bad', 'Fair', 'Good'] as $key=>$condition)
                            <option {{ old('info.absorber_condition', @$report->info['absorber_condition']) == $condition ?'selected=""':'' }} value="{{ $condition }}">{{ $condition }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="time_washed" class="control-label col-sm-4">Time Washed <abbr class="text-danger" title="required">*</abbr></label>

                <div class="col-sm-7 {{ $errors->has('info.time_washed')?'has-error':'' }}">
                    <p class="input-group picker" id="time_washed">
                        <input {{ @$disabled }} type="text" value="{{ old('info.time_washed', @$report->info['time_washed']) }}" name="info[time_washed]" class="form-control"/>
                      <span class="input-group-addon">
                          <em class="icon-clock"></em>
                      </span>
                    </p>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="passenger" class="control-label col-sm-4">Passenger name <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.passenger')?'has-error':'' }}">
                    <input {{ @$disabled }} class=" form-control" autocomplete="off" type="text" name="info[passenger]" value="{{ old('info.passenger', @$report->info['passenger']) }}" id="passenger" required/>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="destination" class="control-label col-sm-4">Destination <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.destination')?'has-error':'' }}">
                    <input {{ @$disabled }} class=" form-control" autocomplete="off" type="text" name="info[destination]" value="{{ old('info.destination', @$report->info['destination']) }}" id="destination" required/>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="millage_bl" class="control-label col-sm-4">Mileage before leaving office <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.millage_bl')?'has-error':'' }}">
                    <input {{ @$disabled }} class=" form-control" autocomplete="off" type="text" name="info[millage_bl]" value="{{ old('info.millage_bl', @$report->info['millage_bl']) }}" id="millage_bl" required/>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="millage_rt" class="control-label col-sm-4">Mileage on return to office <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.millage_rt')?'has-error':'' }}">
                    <input {{ @$disabled }} class=" form-control" autocomplete="off" type="text" name="info[millage_rt]" value="{{ old('info.millage_rt', @$report->info['millage_rt']) }}" id="millage_rt" required/>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="time_out" class="control-label col-sm-4">Time the vehicle left office <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.time_out')?'has-error':'' }}">
                    <p class="input-group picker" id="time_out">
                        <input {{ @$disabled }} type="text" name="info[time_out]" value="{{ old('info.time_out', @$report->info['time_out']) }}" class="form-control"/>
                      <span class="input-group-addon">
                          <em class="icon-clock"></em>
                      </span>
                    </p>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="time_back" class="control-label col-sm-4">Time the vehicle returned to office <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.time_back')?'has-error':'' }}">
                    <p class="input-group picker" id="time_back">
                        <input {{ @$disabled }} type="text" name="info[time_back]" value="{{ old('info.time_back', @$report->info['time_back']) }}" class="form-control"/>
                      <span class="input-group-addon">
                          <em class="icon-clock"></em>
                      </span>
                    </p>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="fuel_bl" class="control-label col-sm-4">Fuel Gauge before leaving <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.fuel_bl')?'has-error':'' }}">
                    <input {{ @$disabled }} class=" form-control" autocomplete="off" type="text" name="info[fuel_bl]" value="{{ old('info.fuel_bl', @$report->info['fuel_bl']) }}" id="fuel_bl" required/>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <label for="fuel_bk" class="control-label col-sm-4">Fuel Gauge on return <abbr class="text-danger" title="required">*</abbr></label>
                <div class="col-sm-7 {{ $errors->has('info.fuel_bk')?'has-error':'' }}">
                    <input {{ @$disabled }} class=" form-control" autocomplete="off" type="text" name="info[fuel_bk]" id="fuel_bk" value="{{ old('info.fuel_bk', @$report->info['fuel_bk']) }}" required/>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <div class="form-group">
                <div class="col-md-2">
                    <label class="control-label">Further Notes </label>
                </div>

                <div class="col-md-9">
                    <!-- Wysiswyg editor-->
                    <div data-role="editor-toolbar" data-target="#editor" class="btn-toolbar btn-editor">
                        <div class="btn-group dropdown">
                            <a data-toggle="dropdown" title="Font" class="btn btn-default">
                                <em class="fa fa-font"></em><b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:void(0)" data-edit="fontName Arial" style="font-family:'Arial'">Arial</a>
                                </li>
                                <li><a href="javascript:void(0)" data-edit="fontName Sans" style="font-family:'Sans'">Sans</a>
                                </li>
                                <li><a href="javascript:void(0)" data-edit="fontName Serif" style="font-family:'Serif'">Serif</a>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-group dropdown">
                            <a data-toggle="dropdown" title="Font Size" class="btn btn-default">
                                <em class="fa fa-text-height"></em>&nbsp;<b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:void(0)" data-edit="fontSize 5" style="font-size:24px">Huge</a>
                                </li>
                                <li><a href="javascript:void(0)" data-edit="fontSize 3" style="font-size:18px">Normal</a>
                                </li>
                                <li><a href="javascript:void(0)" data-edit="fontSize 1" style="font-size:14px">Small</a>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-group">
                            <a data-edit="bold" data-toggle="tooltip" title="" class="btn btn-default btn-info" data-original-title="Bold (Ctrl/Cmd+B)">
                                <em class="fa fa-bold"></em>
                            </a>
                            <a data-edit="italic" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Italic (Ctrl/Cmd+I)">
                                <em class="fa fa-italic"></em>
                            </a>
                            <a data-edit="strikethrough" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Strikethrough">
                                <em class="fa fa-strikethrough"></em>
                            </a>
                            <a data-edit="underline" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Underline (Ctrl/Cmd+U)">
                                <em class="fa fa-underline"></em>
                            </a>
                        </div>
                        <div class="btn-group">
                            <a data-edit="insertunorderedlist" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Bullet list">
                                <em class="fa fa-list-ul"></em>
                            </a>
                            <a data-edit="insertorderedlist" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Number list">
                                <em class="fa fa-list-ol"></em>
                            </a>
                            <a data-edit="outdent" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Reduce indent (Shift+Tab)">
                                <em class="fa fa-dedent"></em>
                            </a>
                            <a data-edit="indent" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Indent (Tab)">
                                <em class="fa fa-indent"></em>
                            </a>
                        </div>
                        <div class="btn-group">
                            <a data-edit="justifyleft" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Align Left (Ctrl/Cmd+L)">
                                <em class="fa fa-align-left"></em>
                            </a>
                            <a data-edit="justifycenter" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Center (Ctrl/Cmd+E)">
                                <em class="fa fa-align-center"></em>
                            </a>
                            <a data-edit="justifyright" data-toggle="tooltip" title="" class="btn btn-default btn-info" data-original-title="Align Right (Ctrl/Cmd+R)">
                                <em class="fa fa-align-right"></em>
                            </a>
                            <a data-edit="justifyfull" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Justify (Ctrl/Cmd+J)">
                                <em class="fa fa-align-justify"></em>
                            </a>
                        </div>
                        <div class="btn-group dropdown">
                            <a data-toggle="dropdown" title="Hyperlink" class="btn btn-default">
                                <em class="fa fa-link"></em>
                            </a>
                            <div class="dropdown-menu">
                                <div class="input-group ml-xs mr-xs">
                                    <input id="LinkInput" placeholder="URL" type="text" data-edit="createLink" class="form-control input-sm">
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-default">Add</button>
                                    </div>
                                </div>
                            </div>
                            <a data-edit="unlink" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Remove Hyperlink">
                                <em class="fa fa-cut"></em>
                            </a>
                        </div>
                        <div class="btn-group pull-right">
                            <a data-edit="undo" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Undo (Ctrl/Cmd+Z)">
                                <em class="fa fa-undo"></em>
                            </a>
                            <a data-edit="redo" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Redo (Ctrl/Cmd+Y)">
                                <em class="fa fa-repeat"></em>
                            </a>
                        </div>
                    </div>
                    <textarea id="html_text" hidden name="html_text" cols="30" rows="10"></textarea>
                    <div id="EditorContent" {{ @$disabled }} style="overflow:scroll; height:250px;max-height:250px" class="form-control wysiwyg mt-lg" contenteditable="true"><div style="text-align: left;"></div>
                        {!!  old('html_text', @$report->html_text) !!}
                    </div>
                </div>

            </div>
        </fieldset>



    @section('page-vendor')
            <!-- =============== PAGE VENDOR SCRIPTS ===============-->

        <!-- WYSIWYG-->
        <script src="/vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script>
        <script src="/vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js"></script>

        <!-- SELECT2-->
        <script src="/vendor/select2/dist/js/select2.js"></script>

        <script>
            $(function () {
                // WYSIWYG
                // -----------------------------------

                $('#editor').wysiwyg();

                $('#submit').click(function(e) {
                    $('#html_text').val(($('#EditorContent').cleanHtml()));

                    return true;
                });

                $(".data-select2").select2({
                    theme: "bootstrap",
                    width : '100%'
                });

                $('.picker').datetimepicker({
                    format: 'hh:mm',
                });

                $('.picker').keydown(function(e) {
                    if(e.keyCode == 9){
                        return true;
                    }
                    return false;
                });


            });
        </script>

    @endsection