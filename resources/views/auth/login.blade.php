@extends('layout.app')
   @section('content')
  <div class="block-center mt-xl wd-xl">
     <!-- START panel-->
     <div class="panel panel-dark panel-flat">
        <div class="panel-heading text-center">
           <a href="#">
              Rockcity FM Radio
              {{--<img src="app/img/logo.png" alt="Image" class="block-center img-rounded">--}}
           </a>
        </div>
        <div class="panel-body">
           <p class="text-center pv">SIGN IN TO CONTINUE.</p>
           <form role="form" data-parsley-validate="" novalidate="" class="mb-lg" method="POST" action="{{ route('login') }}">
               {{ csrf_field() }}
              <div class="form-group has-feedback {{ $errors->has('email') ? ' has-error' : '' }}">
                 <input id="exampleInputEmail1" type="email" name="email" placeholder="Enter email" value="{{ old('email') }}" autocomplete="off" required class="form-control">
                 <span class="fa fa-envelope form-control-feedback text-muted"></span>

                  @if ($errors->has('email'))
                      <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                  @endif
              </div>
              <div class="form-group has-feedback {{ $errors->has('password') ? ' has-error' : '' }}">
                 <input id="exampleInputPassword1" name="password" type="password" placeholder="Password" required class="form-control">
                 <span class="fa fa-lock form-control-feedback text-muted"></span>

                  @if ($errors->has('password'))
                      <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                  @endif
              </div>
              <div class="clearfix">
                 <div class="checkbox c-checkbox pull-left mt0">
                    <label>
                       <input type="checkbox" value="" name="remember">
                       <span class="fa fa-check"></span>Remember Me</label>
                 </div>
                 <div class="pull-right"><a href="{{ route('user_recover') }}" class="text-muted">Forgot your password?</a>
                 </div>
              </div>
              <button type="submit" class="btn btn-block btn-primary mt-lg">Login</button>
           </form>
           <p class="pt-lg text-center">Need to Signup?</p><a href="{{ route('register') }}" class="btn btn-block btn-default">Register Now</a>
        </div>
     </div>
     <!-- END panel-->

  </div>
   @endsection