<!doctype html>
<html class="fixed" ng-app="rockcityOrder">
<head>

    <!-- Basic -->
    <meta charset="UTF-8">

    <meta name="keywords" content="Rockcity FM Radio" />
    <meta name="description" content="Rockcity FM Radio - Airtime Order">
    <meta name="author" content="rockcity">

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <!-- Web Fonts  -->
    {{--<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">--}}

    <!-- Vendor CSS -->
    {{--<link href="{{asset('bower_components/bootstrap/dist/css/bootstrap.css')}}" rel="stylesheet">--}}
    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" href="assets/vendor/font-awesome/css/font-awesome.css" />
    <link rel="stylesheet" href="assets/vendor/magnific-popup/magnific-popup.css" />
    <link rel="stylesheet" href="assets/vendor/bootstrap-datepicker/css/datepicker3.css" />

    <!-- Specific Page Vendor CSS -->
    <link rel="stylesheet" href="assets/vendor/jquery-ui/css/ui-lightness/jquery-ui-1.10.4.custom.css" />
    <link rel="stylesheet" href="assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css" />
    <link rel="stylesheet" href="assets/vendor/morris/morris.css" />

    <!-- Theme CSS -->
    <link rel="stylesheet" href="assets/stylesheets/theme.css" />

    <!-- Skin CSS -->
    <link rel="stylesheet" href="assets/stylesheets/skins/default.css" />

    <!-- Theme Custom CSS -->
    <link rel="stylesheet" href="assets/stylesheets/theme-custom.css">

    <!-- Head Libs -->
    <script src="assets/vendor/modernizr/modernizr.js"></script>

    <!-- Skin CSS -->
    <link rel="stylesheet" href="assets/stylesheets/skins/default.css" />


    <!-- my style -->
    <link rel="stylesheet" href="css/mystyle.css" class="stylesheet">

    {{--<link rel="stylesheet" href="bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css">--}}

    <script type="text/javascript">
        var baseURL = "{{url('/')}}/";
    </script>

</head>
<body>

<div ui-view></div>

<!-- Vendor -->

<script src="{{asset('bower_components/jquery/dist/jquery.min.js')}}"></script>

<script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bower_components/moment/min/moment.min.js"></script>
<script type="text/javascript" src="bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>

<script src="{{asset('bower_components/angular/angular.min.js')}}"></script>
<script src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
<script src="{{asset('bower_components/angular-ui-router/release/angular-ui-router.min.js')}}"></script>
<script src="{{asset('bower_components/angular-resource/angular-resource.min.js')}}"></script>
<script src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>

<script src="{{asset('scripts/app.js')}}"></script>
<script src="{{asset('scripts/controllers.js')}}"></script>
<script src="{{asset('scripts/services.js')}}"></script>

{{--<script src="{{asset('scripts/datetimepickerDirective.js')}}"></script>--}}
{{--<script type="text/javascript">--}}
{{--$(function () {--}}
{{--$('#datetimepicker1').datetimepicker({--}}
{{--language: 'en',--}}
{{--useCurrent: false--}}
{{--});--}}
{{--});--}}
{{--</script>--}}
</body>
</body>
</html>