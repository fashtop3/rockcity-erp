@extends('layouts.main')

@section('section')
    <h3>
        Assessment
        <small>Staff assessment portal</small>
    </h3>

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('assessment') }}">Records</a></li>
            <li>Edit</li>
        </ol>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>update selected record.</small>
        </div>

        <div class="panel-body helicopter" >

            @if(!isset($disable))
            <form class="form-horizontal" action="{{ route('assessment.edit', [$assessment->id]) }}" method="post" role="form" name="vehicleForm">
            @endif
                {{ csrf_field() }}
                <div class="panel-body">

                    @include('partials.error')

                    <div class="alert alert-warning">
                        @if(isset($assessment))
                            Submission is opened from <strong>{{ $assessment->config->starts }} - {{ $assessment->config->ends }}</strong>
                        @else
                            Submission is opened from <strong>{{ \App\Models\Assessment\AssessmentConfig::where('enable', 1)->first()->starts }} - {{ \App\Models\Assessment\AssessmentConfig::where('enable', 1)->first()->ends }}</strong>
                        @endif
                    </div>
                    @include('main.assessment.partials.form')

                </div>
                @if(!isset($disable))
                <div class="panel-footer text-center">
                    <!--<div class="form-group">-->
                    <!--<div class="col-sm-4 col-sm-offset-2">-->
                    <button class="btn btn-primary" id="submit" type="submit">Save</button>
                    <!--</div>-->
                </div>
            </form>
                @endif
        </div>
    </div>

    @endsection

