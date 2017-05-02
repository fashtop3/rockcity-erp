@extends('layouts.app')
@section('head')
    <link rel="stylesheet" href="/vendor/animate.css/animate.min.css">
    <!-- WHIRL (spinners)-->
    <link rel="stylesheet" href="/vendor/whirl/dist/whirl.css">
    <!-- =============== PAGE VENDOR STYLES ===============-->
    <!-- WEATHER ICONS-->
    <link rel="stylesheet" href="/vendor/weather-icons/css/weather-icons.min.css">

    @yield('page-head')

@endsection

@section('content')

    <!-- Blade for topnavbar -->
    @yield('topnavbar', View::make("partials.topnavbar"))

    <!-- Blade for side menu -->
    @yield('aside', View::make("partials.aside"))
    <!-- Blade for offside menu -->
    @yield('offsidebar', View::make("partials.offsidebar"))
    <!-- Blade for main section -->
    <section>
        <!-- Page content-->
        <div class="content-wrapper">
            <!-- Main section-->
            @yield('section')
        </div>
    </section>

    <!-- Blade for site footer -->
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
    {{--<script src="/app/js/demo/demo-rtl.js"></script>--}}


    <!-- CLASSY LOADER-->
    <script src="/vendor/jquery-classyloader/js/jquery.classyloader.min.js"></script>
    <!-- MOMENT JS-->
    <script src="/vendor/moment/min/moment-with-locales.min.js"></script>

    @yield('page-vendor')

@endsection

@section('copy-right')
@endsection