@extends('dashboard')

@section('content')

    <header class="page-header">
        <h2>Roles</h2>

        <div class="right-wrapper pull-right">
            <ol class="breadcrumbs">
                <li>
                    <a href="index.html">
                        <i class="fa fa-home"></i>
                    </a>
                </li>
                <li><span>Role</span></li>
            </ol>

            <a class="sidebar-right-toggle" data-open="sidebar-right"><i class="fa fa-chevron-left"></i></a>
        </div>
    </header>

    <!-- start: page -->
    <div class="row content-container">
        <div class="col-md-6 col-lg-12 col-xl-6">



            <!-- Modal -->
            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <form action="" method="post" class="form-inline">
                            {{--<div class="modal-header">--}}
                                {{--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
                                {{--<h4 class="modal-title" id="myModalLabel">Edit Role</h4>--}}
                            {{--</div>--}}
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="" class="control-label">Role:</label>
                                    <input type="text" class="form-control" name="role" value="Administrator" />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- permission Modal -->
            <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-content">
                            <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Permissons Dialog</h4>
                            </div>
                            <div class="modal-body">

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-body">
                    <form class="form-horizontal" action="" method="post">
                        <table class="table table-bordered table-striped">
                            <thead>
                            <th>NAME</th>
                            <th colspan="3">ACTIONS</th>
                            </thead>
                            <tbody>
                                    @foreach($roles as $role)
                                        <tr>

                                            <td>{{ ucfirst($role->name) }}</td>
                                            <td><a href="#editrole" data-toggle="modal" data-target=".bs-example-modal-sm"><i class="glyphicon glyphicon-pencil"></i> edit role</a></td>
                                            <td><a href="#editpermission" data-toggle="modal" data-target=".bs-example-modal-lg"> <i class="glyphicon glyphicon-edit"></i> edit permissions</a></td>
                                            <td align="center"><input type="checkbox" name="role" value="{{ $role->id }}" /></td>
                                        </tr>
                                    @endforeach
                            </tbody>
                        </table>

                        <button class="btn btn-primary" type="submit">Save Role</button>

                    </form>
                </div>
            </div>

        </div>
    </div>

    <!-- end: page -->

@stop