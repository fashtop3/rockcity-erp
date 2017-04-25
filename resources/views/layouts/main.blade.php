@extends('layouts.app')
@section('head')
    {{--<link rel="stylesheet" href="http://127.0.0.1:8001/app/css/custom.css"><link type="text/css" rel="stylesheet" href="vendor/loaders.css/loaders.css"><link type="text/css" rel="stylesheet" href="vendor/spinkit/css/spinkit.css"><link type="text/css" rel="stylesheet" href="vendor/whirl/dist/whirl.css"><script src="vendor/modernizr/modernizr.custom.js" async=""></script><link type="text/css" rel="stylesheet" href="vendor/fontawesome/css/font-awesome.min.css"><link type="text/css" rel="stylesheet" href="vendor/simple-line-icons/css/simple-line-icons.css"><script src="vendor/fastclick/lib/fastclick.js" async=""></script><script src="vendor/angular-file-upload/dist/angular-file-upload.js" async=""></script><script src="vendor/screenfull/dist/screenfull.js" async=""></script><script src="vendor/bootstrap-filestyle/src/bootstrap-filestyle.js" async=""></script><script src="vendor/animo.js/animo.js" async=""></script><script src="vendor/sparkline/index.js" async=""></script>--}}
    {{--<script src="vendor/slimScroll/jquery.slimscroll.min.js" async=""></script>--}}
    {{--<script src="vendor/jquery-classyloader/js/jquery.classyloader.min.js" async=""></script>--}}
    {{--<link type="text/css" rel="stylesheet" href="vendor/angularjs-toaster/toaster.css">--}}
    {{--<script src="vendor/angularjs-toaster/toaster.js" async=""></script>--}}
    {{--<link type="text/css" rel="stylesheet" href="vendor/sweetalert/dist/sweetalert.css">--}}
    {{--<script src="vendor/sweetalert/dist/sweetalert.min.js" async=""></script>--}}
    {{--<script src="vendor/angular-sweetalert/SweetAlert.js" async=""></script>--}}
    {{--<style type="text/css">.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}</style>--}}

    <link rel="stylesheet" href="/vendor/animate.css/animate.min.css">
    <!-- WHIRL (spinners)-->
    <link rel="stylesheet" href="/vendor/whirl/dist/whirl.css">
    <!-- =============== PAGE VENDOR STYLES ===============-->
    <!-- WEATHER ICONS-->
    <link rel="stylesheet" href="/vendor/weather-icons/css/weather-icons.min.css">

    @yield('page-head')

@endsection

@section('content')

    @yield('topnavbar', View::make("partials.topnavbar"))
    @yield('aside', View::make("partials.aside"))
    @yield('offsidebar', View::make("partials.offsidebar"))

    @yield('section')

    @yield('footer', View::make("partials.footer"))
@endsection

@section('vendor-script')
        <!-- MATCHMEDIA POLYFILL-->
    <script src="/vendor/matchMedia/matchMedia.js"></script>
    <!-- JQUERY EASING-->
    <script src="/vendor/jquery.easing/js/jquery.easing.js"></script>
    <!-- ANIMO-->
    <script src="/vendor/animo.js/animo.js"></script>
    <!-- SLIMSCROLL-->
    <script src="/vendor/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- SCREENFULL-->
    <script src="/vendor/screenfull/dist/screenfull.js"></script>
    <!-- LOCALIZE-->
    <script src="/vendor/jquery-localize-i18n/dist/jquery.localize.js"></script>
    <!-- RTL demo-->
    <script src="/app/js/demo/demo-rtl.js"></script>

    @yield('page-vendor')

@endsection

@section('copy-right')
@endsection