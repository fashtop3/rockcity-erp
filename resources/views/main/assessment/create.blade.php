@extends('layouts.main')


@section('section')
    <h3>
        Assessment
        <small>Staff assessment portal</small>
    </h3>

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('assessment') }}">Records</a></li>
            <li>Add Record</li>
        </ol>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>Add new Record</small>
        </div>

        <div class="panel-body helicopter" >

            <form class="form-horizontal" novalidate action="{{ route('assessment.create') }}" method="post" role="form" name="driverReportForm">
                {{ csrf_field() }}
                <div class="panel-body">

                    @include('partials.error')


                        @if($assessment_open)
                            <div class="alert alert-warning">
                                Submission is opened from <strong>{{ $assessment_config->starts }} - {{ $assessment_config->ends }}</strong>
                            </div>

                            @include('main.assessment.partials.form')

                        @else
                            Submission Closed.
                        @endif
                </div>

                <div class="panel-footer text-center">
                    <!--<div class="form-group">-->
                    <!--<div class="col-sm-4 col-sm-offset-2">-->
                    @if($assessment_open)
                        <button class="btn btn-primary" id="submit" type="submit">Save</button>
                    @endif
                    <!--</div>-->
                </div>
            </form>
        </div>
    </div>

    @endsection

