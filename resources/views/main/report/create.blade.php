@extends('layouts.main')

@section('page-head')
        <!-- SELECT2-->
    <link rel="stylesheet" href="/vendor/select2/dist/css/select2.css">
    <link rel="stylesheet" href="/vendor/select2-bootstrap-theme/dist/select2-bootstrap.css">
@endsection

@section('section')
    <h3>
        Reports
    </h3>

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('report') }}">Reports</a></li>
            <li>Add Report</li>
        </ol>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <small>Add new Report</small>
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

                    <div role="tabpanel">
                            <!-- Nav tabs-->
                            <ul role="tablist" class="nav nav-tabs">
                                <li role="presentation" class="active"><a href="#tasks" aria-controls="tasks" role="tab" data-toggle="tab" aria-expanded="false">Tasks</a>
                                </li>
                                <li role="presentation" class=""><a href="#challenge" aria-controls="challenge" role="tab" data-toggle="tab" aria-expanded="false">Challenge</a>
                                </li>
                                <li role="presentation" class=""><a href="#remittance" aria-controls="remittance" role="tab" data-toggle="tab" aria-expanded="false">Remittance</a>
                                </li>
                                <li role="presentation" class=""><a href="#uploads" aria-controls="uploads" role="tab" data-toggle="tab" aria-expanded="true">Uploads</a>
                                </li>
                            </ul>
                            <!-- Tab panes-->
                            <div class="tab-content">
                                <div id="tasks" role="tabpanel" class="tab-pane active">
                                    @include('main.report.partials.task')
                                </div>
                                <div id="challenge" role="tabpanel" class="tab-pane">
                                    @include('main.report.partials.challenge')
                                </div>
                                <div id="remittance" role="tabpanel" class="tab-pane">
                                    @include('main.report.partials.remittance')
                                </div>
                                <div id="uploads" role="tabpanel" class="tab-pane">
                                    @include('main.report.partials.upload')
                                </div>
                            </div>
                        </div>

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

    <!-- WYSIWYG-->
    <script src="/vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script>
    <script src="/vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js"></script>

    <!-- SELECT2-->
    <script src="/vendor/select2/dist/js/select2.js"></script>

    <script>
        $(function () {
            // WYSIWYG
                // -----------------------------------

            $('.editor').wysiwyg();

            $('#submit').click(function(e) {
                $('#msg').val(($('#editorContent').cleanHtml()));
            });

            $(".data-select2").select2({
                theme: "bootstrap",
                width : '100%'
            });

        });
    </script>

@endsection