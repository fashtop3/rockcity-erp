@extends('layouts.main')

@section('section')
    <h3>
        Driver's report
    </h3>


    <div class="panel panel-default">
        <div class="panel-heading">
            <small>update selected target.</small>
        </div>

        <div class="panel-body helicopter" >

            <form class="form-horizontal" action="{{ route('report.driver.edit', [$report->id]) }}" method="post" role="form" name="vehicleForm">
                {{ csrf_field() }}
                <div class="panel-body">

                    @include('partials.error')

                    @include('main.report.partials.driver')

                </div>
                <div class="panel-footer text-center">
                    <!--<div class="form-group">-->
                    <!--<div class="col-sm-4 col-sm-offset-2">-->
                    <button {{ @$disabled }} class="btn btn-primary" id="submit" type="submit">Save</button>
                    <!--</div>-->
                </div>
            </form>
        </div>
    </div>

    @endsection

