@extends('layouts.main')

@section('page-head')
        <!-- DATATABLES-->
        <link rel="stylesheet" href="/vendor/datatables-colvis/css/dataTables.colVis.css">
        <link rel="stylesheet" href="/vendor/datatables/media/css/dataTables.bootstrap.css">
        <link rel="stylesheet" href="/vendor/dataTables.fontAwesome/index.css">
@endsection

@section('section')
    <h3>
        People
    </h3>

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <div class="panel panel-default">
            <div class="panel-body">

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

                    <?php
                        if($user->isRole(\App\User::RegisterStaffRoles)) {
                            $isRole = true;
                        } else {
                            $isRole = true;
                        }
                    ?>

                    <div class="table-responsive">
                    <table id="users-table" class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Created</th>
                            @if($isRole)
                            <th></th>
                            @endif
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($users as $user)
                        <tr>
                            <td>{{ strtoupper($user->lastname). ', '. $user->firstname }}</td>
                            <td>{{ $user->email }}</td>
                            <td><span class="text-{{ $user->status == 0? 'success':'danger' }}">{{ $user->status == 0? 'Active':'Blocked' }}</span></td>
                            <td>{{ $user->created_at->toDayDateTimeString() }}</td>
                            @if($isRole)
                                <td>
                                <a href="{{ route('admin.people.edit', ['id' => $user->id]) }}" class="btn btn-sm btn-warning">
                                    <em class="fa fa-edit"></em>
                                </a>
                                <a href="{{ route('admin.people.destroy', ['id' => $user->id]) }}" type="button" class="btn btn-sm btn-danger delete-user">
                                    <em class="fa fa-trash-o"></em>
                                </a>
                            </td>
                            @endif
                        </tr>
                        @endforeach
                        </tbody>
                    </table>

                    {{ $users->links() }}
                </div>
            </div>
        </div>
        </div>
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->

    <!-- DATATABLES-->
    <script src="/vendor/datatables/media/js/jquery.dataTables.min.js"></script>
    <script src="/vendor/datatables-colvis/js/dataTables.colVis.js"></script>
    <script src="/vendor/datatables/media/js/dataTables.bootstrap.js"></script>
    {{--<script src="/app/js/demo/demo-datatable.js"></script>--}}

    <script>

        $(function() {
            $('body').on('click', 'a.delete-user', function() {
                var ret = false;
                var self = $(this);
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(function () {
//                    swal(
//                            'Deleted!',
//                            'Your file has been deleted.',
//                            'success'
//                    );

                    window.location.href = self.attr('href');
                });

                return false;
            });
        });
//        $(function () {
//            $('#users-table').dataTable({
//                serverSide: true,
//                processing: true,
//                ajax: '/app/client-data',
//                columns: [
////                    {data: 'id'},
//                    {data: 'name'},
//                    {data: function(data) { return data['lastname'] + ' ' + data['firstname']}, orderable: false, searchable: true},
//                    {data: function(data) { return data['street_no'] + ' ' + data['street_name'] + ' ' + data['town']}, orderable: false, searchable: true},
//                    {data: 'mobile', orderable: false, searchable: true},
//                    {data: 'email', orderable: false, searchable: true},
////                    {data: 'created_at'},
////                    {data: 'updated_at'},
//                    {data: 'action', orderable: false, searchable: false}
//                ]
//            });
//
//        });


    </script>
@endsection