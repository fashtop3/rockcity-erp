@extends('layouts.main')

@section('page-head')
        <!-- DATATABLES-->
        <link rel="stylesheet" href="/vendor/datatables-colvis/css/dataTables.colVis.css">
        <link rel="stylesheet" href="/vendor/datatables/media/css/dataTables.bootstrap.css">
        <link rel="stylesheet" href="/vendor/dataTables.fontAwesome/index.css">
@endsection

@section('section')
    <h3>
        Admin/Index:: Driver's Reports
    </h3>

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <div class="panel panel-default">
            <div class="panel-body">

                @include('partials.error')


                <div class="table-responsive">
                    <table id="users-table" class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Vehicle</th>
                            <th>Created</th>
                            <th>Inspection</th>
                            <th>Destination</th>
                            <th>Notes</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($reports as $report)
                        <tr>
                            <td>{{ strtoupper($report->user->lastname) }}, {{ $report->user->firstname }}</td>
                            <td>{{ $report->vehicle->name }}</td>
                            <td>{{ $report->created_at->toDayDateTimeString() }}</td>
                            <td>{{ $report->info['time_inspect'] }}</td>
                            <td>{{ $report->info['destination'] }}</td>
                            <td>
                                <a href="{{ route('report.driver.show', ['id' => $report->id]) }}" class="">View
                                </a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>

                    {{ $reports->links() }}
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
            $('body').on('click', 'a.delete-report', function() {
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