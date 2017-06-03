@extends('layouts.main')

@section('section')
    <h3>
        Driver's report
    </h3>

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('report.driver') }}">Reports</a></li>
            <li>Edit</li>
        </ol>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>update selected target.</small>
        </div>

        <div class="panel-body helicopter" >

            <form class="form-horizontal" action="{{ route('report.driver.edit', [$report->id]) }}" method="post" role="form" name="vehicleForm">
                {{ csrf_field() }}
                <div class="panel-body">

                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            <ul>
                                <li>{!! session('success') !!}</li>
                            </ul>
                        </div>
                    @endif

                    @if (Session::has('error'))
                        <div class="alert alert-danger">
                            <ul>
                                <li>{{ session('error') }}</li>
                            </ul>
                        </div>
                    @endif

                    @include('main.report.partials.driver')

                </div>
                <div class="panel-footer text-center">
                    <!--<div class="form-group">-->
                    <!--<div class="col-sm-4 col-sm-offset-2">-->
                    <button class="btn btn-primary" id="submit" type="submit">Save</button>
                    <!--</div>-->
                </div>
            </form>
        </div>
    </div>

    @endsection

