@extends('layouts.main')


@section('section')
    <div class="content-heading">
        <!-- START Language list-->
        <div class="pull-right">
            <div class="btn-group">
                <button type="button" data-toggle="dropdown" class="btn btn-default">English</button>
                <ul role="menu" class="dropdown-menu dropdown-menu-right animated fadeInUpShort">
                    <li><a href="#" data-set-lang="en">English</a>
                    </li>
                    <li><a href="#" data-set-lang="es">Spanish</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- END Language list    -->
        Dashboard
        <small data-localize="dashboard.WELCOME"></small>
    </div>
    <div>
        <ol class="breadcrumb">
            <li><a href="#">Dashboard</a></li>
            <li>Profile</li>
        </ol>
    </div>
    <div class="row col-sm-12" autoscroll="false">
        <div class="unwrap">

            <div style="background-image: url('/app/img/profile-bg.png')" class="bg-cover">
                <div class="p-xl text-center text-inverse">
                    {{--                <!--<img src="app/img/user/{{$user->upload.filename}}" alt="Image" class="img-thumbnail img-circle thumb128" />-->--}}
                    <h3 class="m0">{{$user->lastname . ' ' . $user->firstname}}</h3>
                    <!--<p>Lead director</p>-->
                    <p>Welcome to Rockcity FM Radio Portal</p><br/>
                </div>
            </div>
            <div permission permission-only="'approve.airtime'" class="text-center bg-gray-dark p-lg mb-xl">
                <div class="row row-table">
                    <div class="col-xs-4 br">
                        <h3 class="m0">Active</h3>
                        <p class="m0">Status</p>
                    </div>
                    <div class="col-xs-4 br">
                        <!--<h3 class="m0">400</h3>-->
                        <p class="m0"><a ui-sref="app.dashboard.update">
                                <span class="hidden-xs">Update</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div class=" ">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="text-center">
                            <h3 class="mt0">{{$user->lastname . ' ' . $user->firstname}}</h3>
                            <!--<p>Lead director</p>-->
                        </div>
                        <hr/>
                        <ul class="list-unstyled ph-xl">
                            <li>
                                <em class="fa fa-envelope-o fa-fw mr-lg"></em>{{$user->email}}</li>
                            <li>
                                <em class="fa fa-dashboard fa-fw mr-lg"></em>Created: <small>{{$user->created_at->diffForHumans()}}</small></li>
                            <li>
                                <em class="fa fa-dashboard fa-fw mr-lg"></em>Last Modified: <small>{{$user->updated_at->diffForHumans()}}</small></li>
                        </ul>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <a href="#" class="pull-right">
                            <em class="icon-plus text-muted"></em>
                        </a>Contacts</div>
                    <div class="panel-body">
                        <div class="list-group">
                            <!-- START User status-->
                            @foreach($contacts as $contact)
                                <div class="media p mt0 list-group-item">
                         <span class="pull-right">
                            <span class="circle circle-success circle-lg"></span>
                         </span>
                         <span class="pull-left">
                            <!-- Contact avatar-->
                            <em class="media-object img-circle thumb32"></em>
                         </span>
                                    <!-- Contact info-->
                         <span class="media-body">
                            <span class="media-heading">
                               <strong>{{ $contact['name'] }}</strong>
                                <br>
                               <small class="text-muted">{{ $contact['email'] }}</small>
                            </span>
                         </span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->
   <!-- SPARKLINE-->
   <script src="/vendor/sparkline/index.js"></script>
   <!-- FLOT CHART-->
   <script src="/vendor/Flot/jquery.flot.js"></script>
   <script src="/vendor/flot.tooltip/js/jquery.flot.tooltip.min.js"></script>
   <script src="/vendor/Flot/jquery.flot.resize.js"></script>
   <script src="/vendor/Flot/jquery.flot.pie.js"></script>
   <script src="/vendor/Flot/jquery.flot.time.js"></script>
   <script src="/vendor/Flot/jquery.flot.categories.js"></script>
   <script src="/vendor/flot-spline/js/jquery.flot.spline.min.js"></script>
   <!-- CLASSY LOADER-->
   <script src="/vendor/jquery-classyloader/js/jquery.classyloader.min.js"></script>
   <!-- MOMENT JS-->
   <script src="/vendor/moment/min/moment-with-locales.min.js"></script>
   <!-- DEMO-->
   <script src="/app/js/demo/demo-flot.js"></script>
@endsection