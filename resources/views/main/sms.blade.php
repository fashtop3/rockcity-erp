@extends('layouts.main')

@section('page-head')
@endsection

@section('section')
    <h3>
        <!-- START Language list-->
        Send SMS
    </h3>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
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
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->
@endsection