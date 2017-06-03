@extends('layouts.main')

@section('page-head')
@endsection

@section('section')
    <h3>
        Register Client
    </h3>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default helicopter">
                <form novalidate action="{{ route('client.create') }}" method="POST" name="clientForm" class="form-horizontal" role="form">
                    {{ csrf_field() }}
                    <div class="panel-body">

                        @include('partials.error')

                        <h4>Client Details</h4>
                        <hr>

                        @include('main.client.partials.form')

                    </div>

                    <div class="panel-footer">
                        <button class="btn btn-primary btn-block" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->

@endsection