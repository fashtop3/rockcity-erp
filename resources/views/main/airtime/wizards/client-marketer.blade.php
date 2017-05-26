<h4 class="airtime-header">Client
    <br>
    <small>Choose client and marketer.</small>
</h4>
<section class="wizard-body">
    <!-- START panel-->
    <div id="clientPanel" class="panel panel-default">
        <div class="panel-heading">Client Details
            <a href="#" data-tool="panel-collapse" data-toggle="tooltip" title="" class="pull-right" data-original-title="Collapse Panel">
                <em class="fa fa-minus"></em>
            </a>
        </div>
        <!-- .panel-wrapper is the element to be collapsed-->
        <div class="panel-wrapper collapse in" aria-expanded="true">
            <div class="panel-body">

                {{--<input type="text" data-bind="value: slot_start_date" />--}}

                <div class="col-xs-12 col-sm-12">
                    <div class="form-group">
                        <label class="control-label">Client's Name <abbr class="text-danger" title="required">*</abbr></label>
                        <select id="client-data-select" name="client_id" class="form-control data-select2" required>
                            <option></option>
                            @foreach(auth()->user()->clients()->get() as $client)
                                <option data-index="{{ $loop->index }}" value="{{ $client->id }}">{{ $client->name }}</option>
                            @endforeach
                            {{--<optgroup label="Alaskan/Hawaiian Time Zone">--}}
                                {{--<option value="AK">Alaska </option>--}}
                            {{--</optgroup>--}}
                        </select>
                    </div>

                    {{--permission permission-only="'admin'"--}}
                   @if($user->isRoleAdmin())
                        <div class="form-group">
                            <label class="control-label">Marketer in Charge <abbr class="text-danger" title="required">*</abbr></label>
                            <select id="marketer-data-select" name="marketer_id"  class="form-control data-select2" required>
                                <option></option>
                                @foreach(App\User::marketers() as $marketer)
                                    <option data-index="{{ $loop->index }}" value="{{ $marketer->id }}">{{ $marketer->lastname }} {{ $marketer->firstname }}</option>
                                @endforeach
                            </select>
                        </div>
                   @endif
                </div>
            </div>
            <!--<div class="panel-footer">Panel Footer</div>-->
        </div>
    </div>
    <!-- END panel-->
</section>

<script>
    var clients = {!! auth()->user()->clients()->get() !!};
    @if($user->isRoleAdmin())
        var marketers = {!! App\User::marketers() !!};
    @else
        var marketers = null;
    @endif
</script>

<script src="/js/client-marketer.js"></script>
