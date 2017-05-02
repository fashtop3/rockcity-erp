@extends('layouts.main')

@section('page-head')
@endsection

@section('section')
    <h3>
        Generate Airtime
    </h3>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Basic Form (jquery.validate)</div>
                <div class="panel-body">
                    <form id="example-form" action="#">
                        <div>
                            <h4>Account
                                <br>
                                <small>Nam egestas, leo eu gravida tincidunt</small>
                            </h4>
                            <fieldset>
                                <label for="userName">User name *</label>
                                <input id="userName" name="userName" type="text" class="form-control required">
                                <label for="password">Password *</label>
                                <input id="password" name="password" type="text" class="form-control required">
                                <label for="confirm">Confirm Password *</label>
                                <input id="confirm" name="confirm" type="text" class="form-control required">
                                <p>(*) Mandatory</p>
                            </fieldset>
                            <h4>Profile
                                <br>
                                <small>Nam egestas, leo eu gravida tincidunt</small>
                            </h4>
                            <fieldset>
                                <label for="name">First name *</label>
                                <input id="name" name="name" type="text" class="form-control required">
                                <label for="surname">Last name *</label>
                                <input id="surname" name="surname" type="text" class="form-control required">
                                <label for="email">Email *</label>
                                <input id="email" name="email" type="text" class="form-control required email">
                                <label for="address">Address</label>
                                <input id="address" name="address" type="text" class="form-control">
                                <p>(*) Mandatory</p>
                            </fieldset>
                            <h4>Hints
                                <br>
                                <small>Nam egestas, leo eu gravida tincidunt</small>
                            </h4>
                            <fieldset>
                                <p class="lead text-center">Almost there!</p>
                            </fieldset>
                            <h4>Finish
                                <br>
                                <small>Nam egestas, leo eu gravida tincidunt</small>
                            </h4>
                            <fieldset>
                                <p class="lead">One last check</p>
                                <div class="checkbox c-checkbox">
                                    <label>
                                        <input type="checkbox" required="required" name="terms">
                                        <span class="fa fa-check"></span>I agree with the Terms and Conditions.</label>
                                </div>
                            </fieldset>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->

    <!-- JQUERY VALIDATE-->
    <script src="/vendor/jquery-validation/dist/jquery.validate.js"></script>
    <!-- JQUERY STEPS-->
    <script src="/vendor/jquery.steps/build/jquery.steps.js"></script>
    <!-- Demo-->
    <script src="/app/js/demo/demo-wizard.js"></script>

@endsection