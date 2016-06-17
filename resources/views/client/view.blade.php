@extends('dashboard')

@section('content')

    <header class="page-header">
        <h2>Clients</h2>

        <div class="right-wrapper pull-right">
            <ol class="breadcrumbs">
                <li>
                    <a href="index.html">
                        <i class="fa fa-home"></i>
                    </a>
                </li>
                <li><span>Client</span></li>
            </ol>

            <a class="sidebar-right-toggle" data-open="sidebar-right"><i class="fa fa-chevron-left"></i></a>
        </div>
    </header>

    <!-- start: page -->
    <div class="row content-container">
        <div class="col-md-6 col-lg-12 col-xl-6">

            <div class="panel">
                <div class="panel-body">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <th>Id</th>
                        <th>Client Name</th>
                        <th>Address</th>
                        <th>Contact Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        </thead>
                        <tbody>
                        @foreach($clients as $client)
                        <tr>
                            <td>{{ $client->id }}</td>
                            <td>{{ $client->name }}</td>
                            <td>{{ $client->address }}</td>
                            <td>{{ $client->firstname . ' ' . $client->lastname }}</td>
                            <td>{{ $client->mobile }}</td>
                            <td>{{ $client->email }}</td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    </div>

    <!-- end: page -->

@stop