@extends('layouts.main')

@section('page-head')
@endsection

@section('section')
    <h3>
        Vehicle
    </h3>

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('admin.vehicle') }}">Vehicles</a></li>
            <li>Add Vehicle</li>
        </ol>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>This view allows administrators to register new vehicle.</small>
        </div>

        <div class="panel-body helicopter" >

            <form class="form-horizontal" action="{{ route('admin.vehicle.create') }}" method="post" role="form" name="vehicleForm">
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

                    @include('main.vehicle.partials.form')

                </div>
                <div class="panel-footer text-center">
                    <!--<div class="form-group">-->
                    <!--<div class="col-sm-4 col-sm-offset-2">-->
                    <button class="btn btn-primary" type="submit">Save Data</button>
                    <!--</div>-->
                </div>
            </form>
        </div>
    </div>

    @endsection

    @section('page-vendor')
            <!-- =============== PAGE VENDOR SCRIPTS ===============-->

@endsection