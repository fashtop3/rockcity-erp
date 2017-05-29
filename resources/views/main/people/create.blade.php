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

            <form class="form-horizontal" action="{{ route('admin.people.edit') }}" method="post" role="form" name="userForm" novalidate>
                <div class="panel-body">

                    <fieldset>
                        <div class="form-group">
                            <label class="control-label col-sm-2">First name <abbr class="text-danger" title="First name">*</abbr></label>
                            <div class="col-sm-8">
                                <input type="text" name="firstname" placeholder="Enter First name" autocomplete="off" required="" class="form-control" />
                                <!--<span class="fa fa-tag form-control-feedback text-muted"></span>-->
                                {{--<span ng-show="userForm.firstname.$dirty &amp;&amp; userForm.firstname.$error.required" class="text-danger">This field is required</span>--}}
                                {{--<span ng-show="userForm.firstname.$dirty &amp;&amp; userForm.firstname.$error.pattern" class="text-danger">This field must be a valid name</span>--}}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="control-label col-sm-2">Last name <abbr class="text-danger" title="Last name">*</abbr></label>
                            <div class="col-sm-8">
                                <input type="text" name="lastname" placeholder="Enter Last name" autocomplete="off" required="" class="form-control" />
                                <!--<span class="fa fa-tag form-control-feedback text-muted"></span>-->
                                {{--<span ng-show="userForm.lastname.$dirty &amp;&amp; userForm.lastname.$error.required" class="text-danger">This field is required</span>--}}
                                {{--<span ng-show="userForm.lastname.$dirty &amp;&amp; userForm.lastname.$error.pattern" class="text-danger">This field must be a valid name</span>--}}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div class="form-group">
                            <label class="control-label col-sm-2">Email <abbr class="text-danger" title="Email">*</abbr></label>
                            <div class="col-sm-8">
                                <input type="email" name="email" placeholder="Enter email" autocomplete="off" required=""  class="form-control" />
                                <span class="text-info"><small>Changing this field will affect user access to account please notice.</small></span>
                                <div>
                                    {{--<span ng-show="userForm.email.$dirty &amp;&amp; userForm.email.$error.required" class="text-danger">This field is required</span>--}}
                                    {{--<span ng-show="userForm.email.$dirty &amp;&amp; userForm.email.$error.pattern" class="text-danger">This field must be a valid email address</span>--}}
                                </div>
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

                    <br />
                    <fieldset>
                        <legend>Account Status</legend>
                        <div class="form-group">
                            <label class="col-sm-2 control-label"><small>Select account status</small></label>
                            <div class="col-sm-10">
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
                    <!--<fieldset>-->
                    <!--<legend>Enable Roles</legend>-->
                    <!--<div class="form-group">-->
                    <!--&lt;!&ndash;<label class="col-sm-2 control-label">Select Roles for user.</label>&ndash;&gt;-->
                    <!--<div class="col-sm-12" style="overflow: scroll">-->
                    <!--<table class="table table-bordered table-stripped">-->
                    <!--<tr>-->
                    <!--<th><small><strong>PERMISSIONS</strong></small></th>-->
                    <!--<th ng-repeat="(id, role) in roles"><small><strong>@{{role.name | uppercase}}</strong></small></th>-->
                    <!--</tr>-->
                    <!--<tbody>-->
                    <!--<tr ng-repeat="(pid, permission) in permissions">-->
                    <!--<td class="text-muted"><small>@{{permission.name}}</small></td>-->
                    <!--<td ng-repeat="(rid, role) in roles">-->
                    <!--<div class="checkbox c-checkbox needsclick">-->
                    <!--<label class="needsclick" uib-tooltip="@{{permission.name + ' ('+role.name+')'}}">-->
                    <!--<input type="checkbox"  ng-model="rolePermission[role.id][permission.id]" class="needsclick" />-->
                    <!--<span class="fa fa-check"></span>-->
                    <!--</label>-->
                    <!--</div>-->
                    <!--</td>-->
                    <!--</tr>-->
                    <!--</tbody>-->
                    <!--</table>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</fieldset>-->
                    <fieldset>
                        <legend>Account Roles</legend>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Select roles for user.</label>
                            <div class="col-sm-10">
                                <div class="checkbox c-checkbox needsclick" ng-repeat="(id, role) in roles">
                                    <label class="needsclick">
                                        <input type="checkbox" ng-model="account.roles[role.id]" value="@{{role}}" class="needsclick" />
                                        <span class="fa fa-check"></span>@{{role.name}}</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Permissions</legend>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Select permissions for user.</label>
                            <div class="col-sm-10">
                                <div class="checkbox c-checkbox needsclick" ng-repeat="(id, permission) in permissions">
                                    <label class="needsclick">
                                        <input type="checkbox" ng-model="account.permissions[permission.id]" value="@{{permission}}" class="needsclick" />
                                        <span class="fa fa-check"></span>@{{permission.name}}</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="panel-footer text-center">
                    <!--<div class="form-group">-->
                    <!--<div class="col-sm-4 col-sm-offset-2">-->
                    <button class="btn btn-primary" ng-disabled="userForm.$invalid" type="submit">Save Data</button>
                    <!--</div>-->
                </div>
            </form>
        </div>
    </div>

    @endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->

@endsection