@extends('layouts.main')

@section('page-head')
        <!-- DATATABLES-->
        <link rel="stylesheet" href="/vendor/datatables-colvis/css/dataTables.colVis.css">
        <link rel="stylesheet" href="/vendor/datatables/media/css/dataTables.bootstrap.css">
        <link rel="stylesheet" href="/vendor/dataTables.fontAwesome/index.css">
@endsection

@section('section')
    <h3>
        Admin/Index::Airtime Orders
    </h3>

    <div class="row">
        <!--<div class="col-xs-12 col-sm-12">-->
        <div class="panel panel-default">
            <div class="panel-body">


                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Order No</th>
                            <th>Agent Name</th>
                            <th>Date</th>
                            <th>Approved</th>
                            <th>Recommended</th>
                            <th>Programme</th>
                            <th>Grand Total</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($orders as $order)
                        <tr>
                            <td><a href="{{ route('airtime.show', [$order->id]) }}" class="text-info" >{{ $order->order_no }}</a></td>
                            <td>{{ $order->user->lastname }}, {{ $order->user->firstname }}</td>
                            <td>{{ $order->created_at->toDayDateTimeString() }}</td>
                            <td class="text-center">
                                @if(!$order->alert->approved)
                                    <label class="label label-info">No</label>
                                @elseif($order->alert->approved)
                                    <label class="label label-success">Yes</label>
                                @endif
                            </td>
                            <td class="text-center" >
                                @if(!$order->alert->recommend)
                                    <label class="label label-info">No</label>
                                @elseif($order->alert->approved)
                                    <label class="label label-success">Yes</label>
                                @endif
                            </td>
                            <td class="text-center" >
                                @if(!$order->alert->programme)
                                    <label class="label label-info">No</label>
                                @elseif($order->alert->approved)
                                    <label class="label label-success">Yes</label>
                                @endif
                            </td>
                            <td><strong>N{{ number_format($order->grandTotal, 2) }}</strong></td>
                            <td>
                                <a href="{{ route('airtime.topdf', [$order->id]) }}" target="_blank" class="btn btn-success btn-sm" ><em class="fa fa-file-pdf-o fa-sm"></em></a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>

                    {{ $orders->links() }}
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