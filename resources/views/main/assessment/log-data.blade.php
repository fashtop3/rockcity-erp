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

    <div>
        <ol class="breadcrumb">
            <li><a href="{{ route('assessment.log') }}">Assessment logs</a></li>
            <li>Data</li>
        </ol>
    </div>

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <div class="panel panel-default">
            <div class="panel-body">

                @include('partials.error')


                <div class="table-responsive">
                    <table id="users-table" class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Date Added</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Remarks</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($assessments as $assessment)
                        <tr>
                            <td>{{  $assessment->created_at->toDayDateTimeString() }}</td>
                            <td><a target="_blank" href="{{ route('assessment.supervise', ['id' => $assessment->id]) }}" >{{ $assessment->user->lastname }}{{ $assessment->user->firstname }}</a></td>
                            <td>{{ $assessment->user->email }}</td>
                            <td>{{ $assessment->supervisor()->count() }}</td>
                            <td>
                                <button title="Download" type="button" class="btn btn-sm btn-primary">
                                    <em class="fa fa-download"></em>
                                </button>
                                <a title="Supervise" href="{{ route('assessment.comment', [$assessment->id]) }}" type="button" class="btn btn-sm btn-danger">
                                    <em class="fa fa-commenting"></em>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>

                    {{ $assessments->links() }}
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