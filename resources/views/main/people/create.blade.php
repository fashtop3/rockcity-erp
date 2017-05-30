@extends('layouts.main')

@section('page-head')
@endsection

@section('section')
    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('admin.people') }}">People</a></li>
            <li>Create account</li>
        </ol>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>This web page allows administrators to register new users.</small>
        </div>

        <div class="panel-body helicopter" >

            <form class="form-horizontal" action="{{ route('admin.people.create') }}" method="post" role="form" name="userForm">
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

                    @include('main.people.partials.form')

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