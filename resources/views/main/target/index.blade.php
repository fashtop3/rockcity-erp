@extends('layouts.main')

@section('page-head')
        <!-- DATATABLES-->
        <link rel="stylesheet" href="/vendor/datatables-colvis/css/dataTables.colVis.css">
        <link rel="stylesheet" href="/vendor/datatables/media/css/dataTables.bootstrap.css">
        <link rel="stylesheet" href="/vendor/dataTables.fontAwesome/index.css">
@endsection

@section('section')
    <h3>
        Targets
    </h3>

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('admin.target.create') }}">Add Target</a></li>
        </ol>
    </div>

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

                <div class="table-responsive">
                    <table id="users-table" class="table table-striped table-hover">
                        <thead>
                        <tr>

                            <th>Target</th>
                            <th>Start Date</th>
                            <th>Duration(s)</th>
                            <th>Marketer</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($targets as $target)
                        <tr>
                            <td>{{ $target->name }}</td>
                            <td>{{ $target->start_date->toFormattedDateString() }}</td>
                            <td>{{ $target->duration  }}</td>
                            <td>{{ $target->toUser->lastname  }}, {{ $target->toUser->firstname  }}</td>
                            <td>&#8358 {{ number_format($target->amount, 0) }}</td>
                            <td>
                                <a href="{{ route('admin.target.edit', ['id' => $target->id]) }}" class="btn btn-sm btn-warning">
                                    <em class="fa fa-edit"></em>
                                </a>
                                <a href="{{ route('admin.target.destroy', ['id' => $target->id]) }}" type="button" class="btn btn-sm btn-danger delete-target">
                                    <em class="fa fa-trash-o"></em>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>

                    {{ $targets->links() }}
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
            $('body').on('click', 'a.delete-target', function() {
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