@extends('layouts.main')

@section('page-head')
        <!-- DATATABLES-->
        <link rel="stylesheet" href="/vendor/datatables-colvis/css/dataTables.colVis.css">
        <link rel="stylesheet" href="/vendor/datatables/media/css/dataTables.bootstrap.css">
        <link rel="stylesheet" href="/vendor/dataTables.fontAwesome/index.css">
@endsection

@section('section')
    <h3>
        Settings/Log
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
                            <th>Enable</th>
                            <th>Start</th>
                            <th>Submitted</th>
                            <th>End</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($configs as $config)
                        <tr>
                            <td class="text-center">
                                <div class="checkbox c-checkbox needsclick">
                                    <label class="needsclick">
                                        <input type="checkbox" disabled {{ $config->enable? "checked=''":'' }} class="needsclick" />
                                        <span class="fa fa-check"></span>
                                    </label>
                                </div>
                            </td>
                            <td><a href="{{ route('assessment.log.data', $config->id) }}">{{ $config->starts->toDayDateTimeString() }}</a></td>
                            <td><a href="{{ route('assessment.log.data', $config->id) }}">{{ ($config->assessments()->count()) }}</a></td>
                            <td><a href="{{ route('assessment.log.data', $config->id) }}">{{ $config->ends->toDayDateTimeString() }}</a></td>
                            <td>
                                <a href="{{ route('assessment.log.edit', ['id' => $config->id]) }}" class="btn btn-sm btn-warning">
                                    <em class="fa fa-edit"></em>
                                </a>
                                <a href="{{ route('assessment.log.destroy', ['id' => $config->id]) }}" type="button" class="btn btn-sm btn-danger delete-report">
                                    <em class="fa fa-trash-o"></em>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>

                    {{ $configs->links() }}
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