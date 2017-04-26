@extends('layouts.main')


@section('section')
    <div class="content-heading">
        <!-- START Language list-->
        <div class="pull-right">
            <div class="btn-group">
                <button type="button" data-toggle="dropdown" class="btn btn-default">English</button>
                <ul role="menu" class="dropdown-menu dropdown-menu-right animated fadeInUpShort">
                    <li><a href="#" data-set-lang="en">English</a>
                    </li>
                    <li><a href="#" data-set-lang="es">Spanish</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- END Language list    -->
        Dashboard
        <small data-localize="dashboard.WELCOME"></small>
    </div>
    <div>
        <ol class="breadcrumb">
            <li><a href="#">Dashboard</a></li>
            <li>Profile</li>
        </ol>
    </div>
    <div class="row col-sm-12">
        <div class="panel panel-default ng-scope">
            <div class="panel-heading">Update Profile</div>
            <form class="form-horizontal" method="POST" action="{{ route('profile', ['id' => $user->id]) }}" novalidate role="form" name="profileForm" >

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

                    <fieldset>
                        <div class="form-group has-feedback">
                            <label class="col-sm-3 control-label">First name <abbr class="text-danger" title="First name">*</abbr></label>
                            <div class="col-sm-8">
                                <input name="firstname" placeholder="Enter First name" value="{{ old('firstname', $user->firstname) }}" ng-pattern="/^[a-zA-Z]{1,}$/" autocomplete="off" ng-model="profile.firstname" required="" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required ng-valid-pattern" type="text">
                                <span class="fa fa-tag form-control-feedback text-muted"></span>
                                {{--<span ng-show="profileForm.firstname.$dirty &amp;&amp; profileForm.firstname.$error.required" class="text-danger ng-hide">This field is required</span>--}}
                                {{--<span ng-show="profileForm.firstname.$dirty &amp;&amp; profileForm.firstname.$error.pattern" class="text-danger ng-hide">This field must be a valid name</span>--}}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div class="form-group has-feedback">
                            <label class="col-sm-3 control-label">Last name <abbr class="text-danger" title="Last name">*</abbr></label>
                            <div class="col-sm-8">
                                <input name="lastname" placeholder="Enter Last name" value="{{ old('lastname', $user->lastname) }}" ng-pattern="/^[a-zA-Z]{1,}$/" autocomplete="off" ng-model="profile.lastname" required="" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required ng-valid-pattern" type="text">
                                <span class="fa fa-tag form-control-feedback text-muted"></span>
                                {{--<span ng-show="profileForm.lastname.$dirty &amp;&amp; profileForm.lastname.$error.required" class="text-danger ng-hide">This field is required</span>--}}
                                {{--<span ng-show="profileForm.lastname.$dirty &amp;&amp; profileForm.lastname.$error.pattern" class="text-danger ng-hide">This field must be a valid name</span>--}}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div class="form-group has-feedback">
                            <label class="col-sm-3 control-label">Email <abbr class="text-danger" title="Email">*</abbr></label>
                            <div class="col-sm-8">
                                <input disabled="disabled" placeholder="Enter email" autocomplete="off" value="{{ old('email', $user->email) }}" ng-model="profile.email" ng-pattern="/^[-a-z0-9~!$%^&amp;*_=+}{\'?]+(\.[-a-z0-9~!$%^&amp;*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-email ng-valid-pattern" type="email">
                                <span class="fa fa-envelope form-control-feedback text-muted"></span>
                                {{--<span ng-show="profileForm.email.$dirty &amp;&amp; profileForm.email.$error.required" class="text-danger ng-hide">This field is required</span>--}}
                                {{--<span ng-show="profileForm.email.$dirty &amp;&amp; profileForm.email.$error.email" class="text-danger ng-hide">This field must be a valid email address</span>--}}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div class="form-group has-feedback">
                            <label class="col-sm-3 control-label">New Password <abbr class="text-danger" title="Password">*</abbr></label>
                            <div class="col-sm-8">
                                <input id="id-password" placeholder="Enter new password" name="new_password" ng-pattern="/^[!\$\@a-zA-Z0-9]{6,16}$/" required="" class="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-pattern" type="password">
                                <span class="fa fa-lock form-control-feedback text-muted"></span>
                                {{--<span ng-show="pwdForm.new_password.$dirty &amp;&amp; pwdForm.new_password.$error.required" class="text-danger ng-hide">This field is required</span>--}}
                                {{--<span ng-show="pwdForm.new_password.$dirty &amp;&amp; pwdForm.new_password.$error.pattern" class="text-danger ng-hide">Input should match '!$@a-zA-Z0-9' and 6-16 length</span>--}}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div class="form-group has-feedback">
                            <label class="col-sm-3 control-label">Confirm Password <abbr class="text-danger" title="Confirm new password">*</abbr></label>
                            <div class="col-sm-8">
                                <input placeholder="Confirm new password" name="new_password_confirmation" class="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-validator" type="password">
                                <span class="fa fa-lock form-control-feedback text-muted"></span>
                                {{--<span ng-show="pwdForm.password_confirm.$dirty &amp;&amp; pwdForm.password_confirm.$error.validator" class="text-danger ng-hide">Password does not match</span>--}}
                            </div>
                        </div>
                    </fieldset>

                        <fieldset>
                            <div class="form-group has-feedback">
                                <label class="col-sm-3 control-label">Old Password <abbr class="text-danger" title="Confirm password">*</abbr></label>
                                <div class="col-sm-8">
                                    <input placeholder="Enter Old password" name="old_password" ng-pattern="/^[!\$\@a-zA-Z0-9]{6,16}$/" class="form-control ng-untouched ng-valid ng-valid-pattern ng-not-empty ng-dirty ng-valid-parse" type="password">
                                    <span class="fa fa-lock form-control-feedback text-muted"></span>
                                    {{--<span ng-show="pwdForm.password.$dirty &amp;&amp; pwdForm.password.$error.pattern" class="text-danger ng-hide">Invalid password!.</span>--}}
                                </div>
                            </div>
                        </fieldset>

                </div>
                <div class="panel-footer">
                    <div class="form-group">
                        <div class="col-sm-8 col-sm-offset-3">
                            <button class="btn btn-primary btn-block" type="submit">Save Data</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->
   <!-- SPARKLINE-->
   <script src="/vendor/sparkline/index.js"></script>
   <!-- FLOT CHART-->
   <script src="/vendor/Flot/jquery.flot.js"></script>
   <script src="/vendor/flot.tooltip/js/jquery.flot.tooltip.min.js"></script>
   <script src="/vendor/Flot/jquery.flot.resize.js"></script>
   <script src="/vendor/Flot/jquery.flot.pie.js"></script>
   <script src="/vendor/Flot/jquery.flot.time.js"></script>
   <script src="/vendor/Flot/jquery.flot.categories.js"></script>
   <script src="/vendor/flot-spline/js/jquery.flot.spline.min.js"></script>
   <!-- CLASSY LOADER-->
   <script src="/vendor/jquery-classyloader/js/jquery.classyloader.min.js"></script>
   <!-- MOMENT JS-->
   <script src="/vendor/moment/min/moment-with-locales.min.js"></script>
   <!-- DEMO-->
   <script src="/app/js/demo/demo-flot.js"></script>
@endsection