<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="Rockcity FM Radio Station Ogun state">
    <meta name="keywords" content="Rockcity ERP">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <title>@yield('title', 'Rockcity FM Radio - Rockcity FM Radio Station Ogun state')</title>
    <!-- =============== VENDOR STYLES ===============-->
    <!-- FONT AWESOME-->
    <link rel="stylesheet" href="/vendor/fontawesome/css/font-awesome.min.css">
    <!-- SIMPLE LINE ICONS-->
    <link rel="stylesheet" href="/vendor/simple-line-icons/css/simple-line-icons.css">

    {{--<script src="/vendor/jquery/dist/jquery.js"></script>--}}
    <script src="/vendor/jquery/dist/jquery.js"></script>

    @yield('head')

    <!-- =============== BOOTSTRAP STYLES ===============-->
    <link rel="stylesheet" href="/app/css/bootstrap.css" id="bscss">

    <!-- =============== APP STYLES ===============-->
    <link rel="stylesheet" href="/app/css/app.css" id="maincss">

    <link rel="stylesheet" href="/bower_components/sweetalert2/dist/sweetalert2.min.css">


    @yield('vendor-head')

    <!-- JQUERY-->
</head>

<body>

<div class="wrapper">
    @yield('content')

    @yield('copy-right', View::make("partials.copyright"))

</div>


    <!-- =============== VENDOR SCRIPTS ===============-->
    <!-- MODERNIZR-->
    <script src="/vendor/modernizr/modernizr.custom.js"></script>
    {{--<!-- JQUERY-->--}}
    {{--<script src="/vendor/jquery/dist/jquery.js"></script>--}}
    <!-- BOOTSTRAP-->
    <script src="/vendor/bootstrap/dist/js/bootstrap.js"></script>
    <!-- STORAGE API-->
    <script src="/vendor/jQuery-Storage-API/jquery.storageapi.js"></script>
    <!-- PARSLEY-->
    <script src="/vendor/parsleyjs/dist/parsley.min.js"></script>
    <!-- SWEETALERT2 -->
    <script src="/bower_components/sweetalert2/dist/sweetalert2.min.js"></script>

    @yield('vendor-script')


    <!-- =============== APP SCRIPTS ===============-->
    <script src="/app/js/app.js"></script>

    @yield('script')
</body>

</html>