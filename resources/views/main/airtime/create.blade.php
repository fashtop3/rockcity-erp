@extends('layouts.main')

@section('page-head')
        <!-- SELECT2-->
        <link rel="stylesheet" href="/vendor/select2/dist/css/select2.css">
        <link rel="stylesheet" href="/vendor/select2-bootstrap-theme/dist/select2-bootstrap.css">
@endsection

@section('section')
    <h3>
        Generate Airtime
    </h3>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Basic Form (jquery.validate)</div>
                <div class="panel-body">
                    <form id="airtime-form" action="#">
                        <div id="airtime-slides">
                            @include('main.airtime.wizards.client-marketer')
                            @include('main.airtime.wizards.products')
                            @include('main.airtime.wizards.remarks')
                            @include('main.airtime.wizards.review')
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->
    <!-- SELECT2-->
    <script src="/vendor/select2/dist/js/select2.js"></script>
    <!-- JQUERY VALIDATE-->
    <script src="/vendor/jquery-validation/dist/jquery.validate.js"></script>
    <!-- JQUERY STEPS-->
    <script src="/vendor/jquery.steps/build/jquery.steps.js"></script>
    <!-- Demo-->
    <script>
        // Forms Demo
        // -----------------------------------


        (function(window, document, $, undefined){

            $(function(){

                // FORM EXAMPLE
                // -----------------------------------
                var form = $("#airtime-form");
                form.validate({
                    errorPlacement: function errorPlacement(error, element) { element.before(error); },
                    rules: {
                        confirm: {
                            equalTo: "#password"
                        }
                    }
                });
                form.children("#airtime-slides").steps({
                    headerTag: "h4.airtime-header",
                    bodyTag: "div.wizard-body",
                    transitionEffect: "slideLeft",
                    onStepChanging: function (event, currentIndex, newIndex)
                    {
                        form.validate().settings.ignore = ":disabled,:hidden";
                        return form.valid();
                    },
                    onFinishing: function (event, currentIndex)
                    {
                        form.validate().settings.ignore = ":disabled";
                        return form.valid();
                    },
                    onFinished: function (event, currentIndex)
                    {
                        alert("Submitted!");

                        // Submit form
                        $(this).submit();
                    }
                });

            });

        })(window, document, window.jQuery);

    </script>

@endsection