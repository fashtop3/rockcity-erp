@extends('layouts.main')

@section('page-head')
@endsection

@section('section')
    <h3>
        Target
    </h3>

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('admin.target') }}">Targets</a></li>
            <li>Add Target</li>
        </ol>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>Add new target</small>
        </div>

        <div class="panel-body helicopter" >

            <form class="form-horizontal" action="{{ route('admin.target.create') }}" method="post" role="form" name="vehicleForm">
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

                    @include('main.target.partials.form')

                </div>
                <div class="panel-footer text-center">
                    <!--<div class="form-group">-->
                    <!--<div class="col-sm-4 col-sm-offset-2">-->
                    <button class="btn btn-primary" type="submit">Save</button>
                    <!--</div>-->
                </div>
            </form>
        </div>
    </div>

    @endsection

    @section('page-vendor')
            <!-- =============== PAGE VENDOR SCRIPTS ===============-->

@endsection