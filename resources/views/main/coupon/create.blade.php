@extends('layouts.main')

@section('vendor-head')


<!-- datetimepicker-->
<script type="text/javascript" src="/bower_components/moment/min/moment.min.js"></script>
<script type="text/javascript" src="/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
<link rel="stylesheet" href="/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css" />
@endsection

@section('section')

    <h3>
        Coupon Code
        <small>Generate and auto download coupon code</small>
    </h3>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>Generated Coupon code will be sent to your mail.</small>
        </div>
        <form novalidate method="POST" action="{{ route('promocode.create') }}" name="formCoupon" class="form-horizontal" role="form">

            {{ csrf_field() }}

            <div class="panel-body">

                @include('partials.error')

                <fieldset>
                    <div class="form-group">
                        <label for="type" class="control-label col-sm-3">Type:<abbr title="required" class="text-danger">*</abbr></label>
                        <div class="col-sm-7">
                            <select name="type" id="type" class="form-control" required="" style="">
                                <option value="">--Choose--</option>
                                <option {{ old('type') == 'DISCOUNT'? 'selected=""':'' }} value="DISCOUNT">Discount</option>
                                <option {{ old('type') == 'COUPON'? 'selected=""':'' }} value="COUPON">Commission</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div class="form-group">
                        <label for="reward" class="control-label col-sm-3">Reward(%):<abbr title="required" class="text-danger">*</abbr></label>
                        <div class="col-sm-7">
                            <select disabled name="reward" id="reward" required="" class="form-control">
                                <option value="">--Choose--</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div class="form-group">
                        <label for="amount" class="control-label col-sm-3">Amount:<abbr title="required" class="text-danger">*</abbr></label>
                        <div class="col-sm-7">
                            <select name="amount" id="amount" class="form-control " required="">
                                <option value="">--Choose--</option>
                                @for($j=1; $j<=50; $j++)
                                    <option {{ old('amount') == $j? 'selected=""':'' }} value="{{ $j }}">{{ $j }}</option>
                                @endfor
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div class="form-group">
                        <label for="quantity" class="control-label col-sm-3">Frequency:<abbr title="required" class="text-danger">*</abbr></label>
                        <div class="col-sm-7">
                            <select name="quantity" id="quantity" class="form-control" required="">
                                <option value="">--Choose--</option>
                                @for($i=1; $i<=5; $i++)
                                    <option {{ old('quantity') == $i? 'selected=""':'' }} value="{{ $i }}">{{ $i }}</option>
                                @endfor
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div class="form-group">
                        <label for="expiry_date" class="control-label col-sm-3">Expiry:</label>
                        <div class="col-sm-7">
                            <p class="input-group picker" id="expiry_date">
                                <input type="text" name="expiry_date" class="form-control" value="{{ old('expiry_date', @$expiry_date) }}" />
                              <span class="input-group-addon">
                                     <em class="fa fa-calendar"></em>
                              </span>
                            </p>
                        </div>
                    </div>
                </fieldset>

            </div>

            <div class="panel-footer">
                <button class="btn btn-primary btn-block" type="submit">Generate</button>
            </div>
        </form>
    </div>

    @endsection

    @section('page-vendor')
            <!-- =============== PAGE VENDOR SCRIPTS ===============-->

    <script>
        $(function () {
            $('select#type').change(function() {
                var reward = $('select#reward');
                reward.attr('disabled', false);
                reward.empty();
                reward.append($('<option>').text('--Choose--'));
                if($(this).val() == "DISCOUNT") {
                    for(var i=1; i<=100; i++){
                        reward.append($('<option>').val(i).text(i+'%'));
                    }
                }
                else if($(this).val() == "COUPON") {
                    for(var j=1; j<=10; j++){
                        reward.append($('<option>').val(j).text(j+'%'));
                    }
                }
            });

            var start = (new Date()).toDateString();
            $('.picker').datetimepicker({
                format: 'YYYY-MM-DD',
//            'minDate': start,
                'locale': 'en'
            });

            $('.picker').keydown(function(e) { if(e.keyCode == 9 || e.keyCode == 8 ) {return true;} return false;});

            $('select#type').trigger('change');
        });
    </script>

@endsection