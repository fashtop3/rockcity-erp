@extends('layouts.app')
@section('content')
      <div class="block-center mt-xl wd-xl">
         <!-- START panel-->
         <div class="panel panel-dark panel-flat">
            <div class="panel-heading text-center">
               <a href="#">
                  Rockcity FM Radio
                  {{--<img src="img/logo.png" alt="Image" class="block-center img-rounded">--}}
               </a>
            </div>
            <div class="panel-body helicopter">
               <p class="text-center pv">SIGNUP TO GET INSTANT ACCESS.</p>
               <form role="form" method="POST" novalidate name="registerForm" action="{{ route('register') }}" class="form-validate mb-lg">
                   {{ csrf_field() }}
                  <div class="form-group has-feedback{{ $errors->has('firstname') ? ' has-error' : '' }}">
                     <!--<label class="text-muted">First name <abbr class="text-danger" title="First name">*</abbr></label>-->
                     <input type="text" name="firstname" placeholder="Enter First name" ng-pattern="/^[a-zA-Z]{1,}$/" value="{{ old('firstname') }}" autocomplete="off" required="" autofocus class="form-control" />
                     <span class="fa fa-tag form-control-feedback text-muted"></span>
                      @if ($errors->has('firstname'))
                          <span class="help-block">
                            <strong>{{ $errors->first('firstname') }}</strong>
                        </span>
                      @endif
                     {{--<span ng-show="registerForm.firstname.$dirty &amp;&amp; registerForm.firstname.$error.required" class="text-danger">This field is required</span>--}}
                      {{--<span ng-show="registerForm.firstname.$dirty &amp;&amp; registerForm.firstname.$error.pattern" class="text-danger">This field must be a valid name</span>--}}
                  </div>
                  <div class="form-group has-feedback{{ $errors->has('lastname') ? ' has-error' : '' }}">
                     <!--<label class="text-muted">Last name <abbr class="text-danger" title="Last name">*</abbr></label>-->
                     <input type="text" name="lastname" placeholder="Enter Last name" ng-pattern="/^[a-zA-Z]{1,}$/" value="{{ old('lastname') }}" autocomplete="off" required="" class="form-control" />
                     <span class="fa fa-tag form-control-feedback text-muted"></span>
                      @if ($errors->has('lastname'))
                          <span class="help-block">
                            <strong>{{ $errors->first('lastname') }}</strong>
                        </span>
                      @endif
                     {{--<span ng-show="registerForm.lastname.$dirty &amp;&amp; registerForm.lastname.$error.required" class="text-danger">This field is required</span>--}}
                     {{--<span ng-show="registerForm.lastname.$dirty &amp;&amp; registerForm.lastname.$error.pattern" class="text-danger">This field must be a valid name</span>--}}
                  </div>
                  <div class="form-group has-feedback{{ $errors->has('email') ? ' has-error' : '' }}">
                     <!--<label class="text-muted">Email address <abbr class="text-danger" title="Email">*</abbr></label>-->
                     <input type="email" name="email" placeholder="Enter email" autocomplete="off" value="{{ old('email') }}" ng-pattern="/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i" required="" class="form-control" />
                     <span class="fa fa-envelope form-control-feedback text-muted"></span>
                      @if ($errors->has('email'))
                          <span class="help-block">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                      @endif
                     {{--<span ng-show="registerForm.email.$dirty &amp;&amp; registerForm.email.$error.required" class="text-danger">This field is required</span>--}}
                     {{--<span ng-show="registerForm.email.$dirty &amp;&amp; registerForm.email.$error.pattern" class="text-danger">This field must be a valid email address</span>--}}
                  </div>
                  <div class="form-group has-feedback{{ $errors->has('password') ? ' has-error' : '' }}">
                     <!--<label class="text-muted">Password <abbr class="text-danger" title="Password">*</abbr></label>-->
                     <input id="id-password" placeholder="Enter password" type="password" name="password" ng-pattern="/^[a-zA-Z0-9]{6,10}$/" required="" class="form-control" />
                     <span class="fa fa-lock form-control-feedback text-muted"></span>
                      @if ($errors->has('password'))
                          <span class="help-block">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                      @endif
                     {{--<span ng-show="registerForm.password.$dirty &amp;&amp; registerForm.password.$error.required" class="text-danger">This field is required</span>--}}
                     {{--<span ng-show="registerForm.password.$dirty &amp;&amp; registerForm.password.$error.pattern" class="text-danger">Input should match 'a-zA-Z0-9' and 6-10 length</span>--}}
                  </div>
                  <div class="form-group has-feedback">
                     <!--<label class="text-muted">Retype Password <abbr class="text-danger" title="Confirm password">*</abbr></label>-->
                     <input type="password" placeholder="Confirm password" name="password_confirmation" class="form-control" />
                     <span class="fa fa-lock form-control-feedback text-muted"></span>
                     {{--<span ng-show="registerForm.password_confirm.$dirty &amp;&amp; registerForm.password_confirm.$error.validator" class="text-danger">Password does Not match</span>--}}
                  </div>
                  <div class="clearfix">
                     <div class="checkbox c-checkbox pull-left mt0">
                        <label>
                           <input type="checkbox" required="" name="agreed" />
                           <span class="fa fa-check"></span>I agree with the <a href="#privacy">terms</a>
                        </label>
                     </div>
                  </div>
                  {{--<div ng-show="registerForm.agreed.$dirty &amp;&amp; registerForm.agreed.$error.required" class="text-danger">You must agree the terms</div>--}}
                  <button type="submit" class="btn btn-block btn-primary mt-lg">Create account</button>
               </form>
               {{--<div ng-show="authMsg" class="alert alert-danger text-center">{{authMsg}}</div>--}}
               {{--<div ng-show="succMsg" class="alert alert-success text-center">{{succMsg}}</div>--}}
               <p class="pt-lg text-center">Have an account?</p><a href="{{ route('login') }}" class="btn btn-block btn-default">Signin</a>
            </div>
         </div>
         <!-- END panel-->
      </div>
@endsection