@extends('layouts.main')


@section('section')
    <h3>
        Reports
    </h3>

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('report.driver') }}">Reports</a></li>
            <li>Add Report</li>
        </ol>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>Add new Report</small>
        </div>

        <div class="panel-body helicopter" >

            <form class="form-horizontal" novalidate action="{{ route('report.driver.create') }}" method="post" role="form" name="driverReportForm">
                {{ csrf_field() }}
                <div class="panel-body">

                    {{ $errors->has('vehicle_id') }}

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
                                <li>{{ session('success') }}</li>
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

