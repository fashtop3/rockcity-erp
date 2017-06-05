@extends('layouts.main')

@section('section')
    <h3>
        SUPERVISOR <small>Assessment</small>
    </h3>


    <div class="panel panel-default">
        <div class="panel-heading">
            <small>update supervisor record.</small>
        </div>

        <div class="panel-body helicopter" >

            <form class="form-horizontal" action="{{ route('assessment.edit', [$assessment->id]) }}" method="post" role="form" name="vehicleForm">
                {{ csrf_field() }}
                <div class="panel-body">

                    @include('partials.error')

                    @include('main.assessment.partials.supervisor-form')

                </div>

                <div class="panel-footer" ng-if="!supervisor.preview">
                    <div class="pull-right">
                        <!-- ng-disabled="!assessFormPart1.$invalid"-->
                        <button class="btn btn-primary" id="submit" type="button">Save</button>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </form>
        </div>
    </div>

    @endsection

