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
        <div class="panel panel-default" ng-controller="ClientController">
            <div class="panel-body">


                <div class="table-responsive">
                    <table id="users-table" class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Client</th>
                            <th>Contact Person</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {{--<tbody>--}}
                        {{--<tr ng-repeat="client in clients">--}}
                            {{--<td>{{ client.name }}</td>--}}
                            {{--<td>{{client.lastname+' '+client.firstname}}</td>--}}
                            {{--<td>{{ client.street_no +' '+ client.street_name +', '+ client.town }}</td>--}}
                            {{--<td>{{ client.mobile }}</td>--}}
                            {{--<td>{{ client.email }}</td>--}}
                            {{--<td>--}}
                                {{--<a ui-sref="app.client.edit({id: client.id})" class="btn btn-sm btn-warning">--}}
                                    {{--<em class="fa fa-edit"></em>--}}
                                {{--</a>--}}
                                {{--<button type="button" ng-click="removeClient($index)" class="btn btn-sm btn-danger">--}}
                                    {{--<em class="fa fa-trash-o"></em>--}}
                                {{--</button>--}}
                            {{--</td>--}}
                        {{--</tr>--}}
                        {{--</tbody>--}}
                    </table>
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
        $(function () {
            $('#users-table').dataTable({
                serverSide: true,
                processing: true,
                ajax: '/app/client-data',
                columns: [
//                    {data: 'id'},
                    {data: 'name'},
                    {data: function(data) { return data['lastname'] + ' ' + data['firstname']}},
                    {data: function(data) { return data['street_no'] + ' ' + data['street_name'] + ' ' + data['town']}},
                    {data: 'mobile'},
                    {data: 'email'},
//                    {data: 'created_at'},
//                    {data: 'updated_at'},
                    {data: 'action', orderable: false, searchable: false}
                ]
            });

        });
    </script>
@endsection