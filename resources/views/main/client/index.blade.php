@extends('layouts.main')

@section('page-head')
        <!-- DATATABLES-->
        <link rel="stylesheet" href="/vendor/datatables-colvis/css/dataTables.colVis.css">
        <link rel="stylesheet" href="/vendor/datatables/media/css/dataTables.bootstrap.css">
        <link rel="stylesheet" href="/vendor/dataTables.fontAwesome/index.css">
@endsection

@section('section')
    <h3>
        Clients
    </h3>

    <div class="row">
        <!--<div class="col-xs-12 col-sm-12">-->
        <div class="panel panel-default">
            <div class="panel-body">


                <div class="table-responsive">
                    <table id="users-table" class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Client</th>
                            <th>Contact Person</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($clients as $client)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $client->name }}</td>
                            <td>{{$client->title . '. '. $client->lastname .' ' . $client->firstname}}</td>
                            <td>{{ $client->street_no .' ' . $client->street_name .', '. $client->town }}</td>
                            <td>{{ $client->mobile }}</td>
                            <td>{{ $client->email }}</td>
                            <td>
                                <a href="{{ route('client.edit', ['id' => $client->id]) }}" class="btn btn-sm btn-warning">
                                    <em class="fa fa-edit"></em>
                                </a>
                                <a href="{{ route('client.destroy', ['id' => $client->id]) }}" type="button" class="btn btn-sm btn-danger delete-client">
                                    <em class="fa fa-trash-o"></em>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>

                    {{ $clients->links() }}
                </div>
            </div>
        </div>
        <!--</div>-->
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
            $('body').on('click', 'a.delete-client', function() {
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