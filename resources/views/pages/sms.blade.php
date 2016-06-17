@extends('dashboard')

@section('content')

    <header class="page-header">
        <h2>SMS</h2>

        <div class="right-wrapper pull-right">
            <ol class="breadcrumbs">
                <li>
                    <a href="index.html">
                        <i class="fa fa-home"></i>
                    </a>
                </li>
                <li><span>Dashboard</span></li>
            </ol>

            <a class="sidebar-right-toggle" data-open="sidebar-right"><i class="fa fa-chevron-left"></i></a>
        </div>
    </header>

    <!-- start: page -->
    <div class="row">
        <div class="panel">
            <div class="panel-heading">
                <h2 class="panel-title">Send SMS</h2>
            </div>
            <div class="panel-body">
                <div class="col-sm-10 col-sm-push-1">
                    <form action="" method="post" class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="message" class="">SMS Text</label>
                            <textarea class="form-control" name="message" id="message" cols="30" rows="10"></textarea>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-6 col-sm-3">
                                <label class="control-label" for="SMSFrom">From:</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="col-xs-6 col-sm-3">
                                <label class="control-label" for="SMSTo">To:</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-success">Send SMS</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- end: page -->

@stop