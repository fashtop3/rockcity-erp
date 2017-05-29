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

            <form class="form-horizontal" action="{{ route('admin.people.edit', [$user->id]) }}" method="post" role="form" name="userForm">
                <div class="panel-body">

                    <fieldset>
                        <div class="form-group">
                            <label class="control-label col-sm-3">First name <abbr class="text-danger" title="First name">*</abbr></label>
                            <div class="col-sm-8">
                                <input type="text" name="firstname" placeholder="Enter First name" autocomplete="off" required="" value="{{ old('firstname', @$user->firstname) }}" class="form-control" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="control-label col-sm-3">Last name <abbr class="text-danger" title="Last name">*</abbr></label>
                            <div class="col-sm-8">
                                <input type="text" name="lastname" placeholder="Enter Last name" value="{{ old('lastname', @$user->lastname) }}" autocomplete="off" required="" class="form-control" />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div class="form-group">
                            <label class="control-label col-sm-3">Email <abbr class="text-danger" title="Email">*</abbr></label>
                            <div class="col-sm-8">
                                <input type="email" name="email" placeholder="Enter email" autocomplete="off" required="" value="{{ old('email', @$user->email) }}"  class="form-control" />
                                <span class="text-info"><small>Changing this field will affect user access to account please notice.</small></span>
                            </div>
                        </div>
                    </fieldset>


                    <fieldset>
                        <div class="form-group has-feedback">
                            <label class="col-sm-3 control-label">New Password <abbr class="text-danger" title="Password">*</abbr></label>
                            <div class="col-sm-8">
                                <input id="id-password" placeholder="Enter new password" name="new_password" required="" class="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-pattern" type="password">
                                <span class="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div class="form-group has-feedback">
                            <label class="col-sm-3 control-label">Confirm Password <abbr class="text-danger" title="Confirm new password">*</abbr></label>
                            <div class="col-sm-8">
                                <input placeholder="Confirm new password" name="new_password_confirmation" class="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-validator" type="password">
                                <span class="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                        </div>
                    </fieldset>

                    <br />
                    <fieldset>
                        <legend>Account Status</legend>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><small>Select account status</small></label>
                            <div class="col-sm-9">
                                <div class="radio c-radio">
                                    <label>
                                        <input type="radio" name="status" value="0" checked=""/>
                                        <span class="fa fa-circle"></span>Active</label>
                                </div>
                                <div class="radio c-radio">
                                    <label>
                                        <input type="radio" name="status"  value="1" />
                                        <span class="fa fa-circle"></span>Blocked</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div class="row">
                        <div class="col-sm-6">
                            <fieldset>
                                <legend>Account Roles</legend>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Select roles for user.</label>
                                    <div class="col-sm-7">
                                        @foreach(App\Role::all() as $role)
                                            <div class="checkbox c-checkbox needsclick">
                                                <label class="needsclick">
                                                    <input type="checkbox" name="roles[]" value="{{ $role->id }}" {{ old('', $user->hasRole($role->id))? 'checked':'' }} class="needsclick" />
                                                    <span class="fa fa-check"></span>{{ $role->name }}</label>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                        <div class="col-sm-6">
                            <fieldset>
                                <legend>Permissions</legend>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Select permissions for user.</label>
                                    <div class="col-sm-7">
                                        @foreach(App\Permission::all() as $permission)
                                            <div class="checkbox c-checkbox needsclick">
                                                <label class="needsclick">
                                                    <input type="checkbox" name="permissions[]" value="{{$permission->id}}" {{ old('', $user->hasPermission($permission->id))? 'checked':'' }} class="needsclick" />
                                                    <span class="fa fa-check"></span>{{$permission->name}}</label>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

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