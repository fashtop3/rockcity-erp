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


    {{ csrf_field() }}

    <fieldset>
        <div class="form-group">
            <!--<label class=" control-label">Enable</label>-->
            <div class="col-sm-8 col-sm-offset-4">
                <label class="switch switch-lg">
                    <input type="checkbox" name="enable" value="1" {{ old('enable', @$config->enable) == 1? 'checked=""':'' }} />
                    <span></span>
                </label>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <div class="form-group">
            <div class="col-sm-10 col-sm-offset-1">
                <p class="input-group picker">
                    <input type="text" name="starts"  required="" placeholder="Starts" class="form-control" value="{{ old('starts', @$config->starts) }}" />
                                  <span class="input-group-addon">
                                         <em class="fa fa-calendar"></em>
                                  </span>
                </p>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-10 col-sm-offset-1">
                <p class="input-group picker">
                    <input type="text" name="ends" required="" placeholder="Ends" class="form-control" value="{{ old('ends', @$config->ends) }}" />
                                  <span class="input-group-addon">
                                         <em class="fa fa-calendar"></em>
                                  </span>
                </p>
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

            $('.picker').datetimepicker({
                format: 'YYYY-MM-DD',
//            'minDate': start,
                'locale': 'en'
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