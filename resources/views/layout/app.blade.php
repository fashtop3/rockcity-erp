<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="Bootstrap Admin App + jQuery">
    <meta name="keywords" content="app, responsive, jquery, bootstrap, dashboard, admin">
    <title>@yield('title')</title>
    <!-- =============== VENDOR STYLES ===============-->
    <!-- FONT AWESOME-->
    <link rel="stylesheet" href="/vendor/fontawesome/css/font-awesome.min.css">
    <!-- SIMPLE LINE ICONS-->
    <link rel="stylesheet" href="/vendor/simple-line-icons/css/simple-line-icons.css">
    <!-- =============== BOOTSTRAP STYLES ===============-->
    <link rel="stylesheet" href="app/css/bootstrap.css" id="bscss">

    @yield('head')

    <!-- =============== APP STYLES ===============-->
    <link rel="stylesheet" href="app/css/app.css" id="maincss">
</head>

<body>

<div class="wrapper">
    @yield('content')

    @yield('copy-right', View::make("partials.copyright"))

</div>


    <!-- =============== VENDOR SCRIPTS ===============-->
    <!-- MODERNIZR-->
    <script src="/vendor/modernizr/modernizr.custom.js"></script>
    <!-- JQUERY-->
    <script src="/vendor/jquery/dist/jquery.js"></script>
    <!-- BOOTSTRAP-->
    <script src="/vendor/bootstrap/dist/js/bootstrap.js"></script>
    <!-- STORAGE API-->
    <script src="/vendor/jQuery-Storage-API/jquery.storageapi.js"></script>
    <!-- PARSLEY-->
    <script src="/vendor/parsleyjs/dist/parsley.min.js"></script>
    @yield('vendor-script')
    <!-- =============== APP SCRIPTS ===============-->
    <script src="app/js/app.js"></script>

    @yield('script')
</body>

</html>