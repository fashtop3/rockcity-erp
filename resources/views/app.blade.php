<!DOCTYPE html>
<html lang="en" data-ng-app="angle">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="@{{app.description}}">
    <meta name="keywords" content="Rockcity ERP">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title data-ng-bind="::pageTitle()">Rockcity FM Radio - Order</title>
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <!-- Bootstrap styles-->
    <link rel="stylesheet" href="{{asset('app/css/bootstrap.css')}}" data-ng-if="!app.layout.isRTL">
    <link rel="stylesheet" href="{{asset('app/css/bootstrap-rtl.css')}}" data-ng-if="app.layout.isRTL">
    <!-- Application styles-->
    <link rel="stylesheet" href="{{asset('app/css/app.css')}}" data-ng-if="!app.layout.isRTL">
    <link rel="stylesheet" href="{{asset('app/css/app-rtl.cs')}}s" data-ng-if="app.layout.isRTL">
    <!-- Themes-->
    <link rel="stylesheet" ng-href="@{{app.layout.theme}}" data-ng-if="app.layout.theme">
    <!--custom css-->
    <link rel="stylesheet" href="{{asset('app/css/custom.css')}}">
</head>

<body data-ng-class="{ 'layout-fixed' : app.layout.isFixed, 'aside-collapsed' : app.layout.isCollapsed, 'layout-boxed' : app.layout.isBoxed, 'layout-fs': app.useFullLayout, 'hidden-footer': app.hiddenFooter, 'layout-h': app.layout.horizontal, 'aside-float': app.layout.isFloat, 'offsidebar-open': app.offsidebarOpen, 'aside-toggled': app.asideToggled}">
<div data-preloader></div>
<div data-ui-view="" data-autoscroll="false" class="wrapper"></div>
<script src="{{asset('app/js/base.js')}}"></script>
<script src="{{asset('app/js/app.js')}}"></script>
</body>

</html>