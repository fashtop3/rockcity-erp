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
        <label for="name" class="control-label col-sm-4">Target Name</label>
        <div class="col-sm-7">
            <input class=" form-control" autocomplete="off" type="text" name="name" value="{{ old('name', @$target->name) }}" id="name" required/>
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label class="control-label col-sm-4">Target start date</label>
        <div class="col-sm-7">
            <p class="input-group" id="start_date">
                <input type="text" name="start_date" required="" class="form-control" value="{{ old('start_date', @$target->start_date) }}" />
                              <span class="input-group-addon">
                                     <em class="fa fa-calendar"></em>
                              </span>
            </p>
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="duration" class="control-label col-sm-4">Duration (in days)</label>
        <div class="col-sm-7">
            <input class=" form-control" type="text" name="duration" id="duration" value="{{ old('duration', @$target->duration) }}" required/>
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="marketer" class="control-label col-sm-4">Marketer</label>
        <div class="col-sm-7">
            <select class=" form-control" name="marketer" id="marketer" required>
                <option value="">--Choose--</option>
                @foreach(App\User::marketers() as $marketer)
                    <option {{ old('marketer', @$target->user_id) == $marketer->id? 'selected=""':'' }} data-index="{{ $loop->index }}" value="{{ $marketer->id }}">{{ $marketer->lastname }} {{ $marketer->firstname }}</option>
                @endforeach
            </select>
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="amount" class="control-label col-sm-4">Amount (NGN)</label>
        <div class="col-sm-7">
            <input class=" form-control" type="text" name="amount" id="amount" value="{{ old('amount', @$target->amount) }}" required />
        </div>
    </div>
</fieldset>


@section('page-vendor')
        <!-- =============== PAGE VENDOR SCRIPTS ===============-->
<!-- SELECT2-->
<script src="/vendor/select2/dist/js/select2.js"></script>

<script>
    $(function () {
        $("#marketer").select2({
            theme: "bootstrap",
            width : '100%'
        });

        var start = (new Date()).toDateString();
        $('#start_date').datetimepicker({
            format: 'YYYY-MM-DD',
//            'minDate': start,
            'locale': 'en'
        });

        $('#start_date').keydown(function(e) { if(e.keyCode == 9) {return true;} return false;});


    });
</script>
@endsection