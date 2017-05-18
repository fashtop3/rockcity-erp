@extends('layouts.main')

@section('vendor-head')
        <!-- SELECT2-->
<link rel="stylesheet" href="/vendor/select2/dist/css/select2.css">
<link rel="stylesheet" href="/vendor/select2-bootstrap-theme/dist/select2-bootstrap.css">
<link rel="stylesheet" href="/css/jquery-ui.min.css">

<script src="/js/jquery.number.min.js"></script>

<link rel="stylesheet" href="/vendor/jquery-ui/themes/smoothness/theme.css">
<link rel="stylesheet" href="/vendor/jquery-ui/themes/smoothness/jquery-ui.min.css">
<link rel="stylesheet" href="/css/bootstrap-datepicker.min.css">

<style>
    #airtime-wizard .content {
        min-height: 100px;
    }
    #airtime-wizard .content > .body {
        width: 100%;
        height: auto;
        padding: 15px;
        position: relative;
    }
</style>

@endsection

@section('section')
    <h3>
        Generate Airtime
    </h3>
    <div class="row">
        <div class="col-md-12">
            {{--<div class="panel panel-default">--}}
                {{--<div class="panel-heading"></div>--}}
                {{--<div class="panel-body">--}}
                    {{--<form id="airtime-wizard" method="POST" class="form-horizontal" action="{{ route('') }}" novalidate="novalidate">--}}
                        {{--<div id="airtime-slides" role="application" class="wizard clearfix">--}}
                            {{--<div class="steps clearfix"><ul role="tablist">--}}
                                    {{--<li role="tab" class="first current" aria-disabled="false" aria-selected="true">--}}
                                        {{--<a id="airtime-slides-t-0" href="#airtime-slides-h-0" aria-controls="airtime-slides-p-0"><span class="current-info audible">current step: </span><span class="number">1.</span> Client--}}
                                        {{--<br>--}}
                                        {{--<small>Choose client and marketer.</small>--}}
                                    {{--</a></li><li role="tab" class="disabled" aria-disabled="true"><a id="airtime-slides-t-1" href="#airtime-slides-h-1" aria-controls="airtime-slides-p-1"><span class="number">2.</span> Products--}}
                                        {{--<br>--}}
                                        {{--<small>Add products and slots.</small>--}}
                                    {{--</a></li><li role="tab" class="disabled" aria-disabled="true"><a id="airtime-slides-t-2" href="#airtime-slides-h-2" aria-controls="airtime-slides-p-2"><span class="number">3.</span> Remarks--}}
                                        {{--<br>--}}
                                        {{--<small>Add remarks</small>--}}
                                    {{--</a></li><li role="tab" class="disabled last" aria-disabled="true"><a id="airtime-slides-t-3" href="#airtime-slides-h-3" aria-controls="airtime-slides-p-3"><span class="number">4.</span> Review--}}
                                        {{--<br>--}}
                                        {{--<small>Review and confirm your order.</small>--}}
                                    {{--</a></li></ul>--}}
                            {{--</div>--}}

                            {{--<div class="content clearfix">--}}
                                {{--<section class="wizard-body body " id="airtime-slides-p-0" role="tabpanel" aria-labelledby="airtime-slides-h-0" aria-hidden="false">--}}
                                    {{--<!-- START panel-->--}}
                                    {{--<div id="clientPanel" class="panel panel-default">--}}
                                        {{--<div class="panel-heading">Client Details</div>--}}
                                        {{--<!-- .panel-wrapper is the element to be collapsed-->--}}
                                        {{--<div class="panel-wrapper">--}}
                                            {{--<div class="panel-body">--}}
                                                {{--<div class="col-xs-12 col-sm-12">--}}

                                                    {{--<div class="form-group">--}}
                                                        {{--<label class="control-label">Client's Name <abbr class="text-danger" title="required">*</abbr></label>--}}

                                                        {{--<select id="client-data-select" name="client_id" class="form-control data-select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">--}}
                                                            {{--<option></option>--}}
                                                            {{--<option value="48">Dj Speaky Media</option>--}}
                                                            {{--<option value="1">Dynamic drive</option>--}}
                                                            {{--<option value="53">eheruh</option>--}}



                                                        {{--</select><span class="select2 select2-container select2-container--bootstrap" dir="ltr" style="width: inherit;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-client-data-select-container"><span class="select2-selection__rendered" id="select2-client-data-select-container" title=""></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>--}}
                                                    {{--</div>--}}


                                                    {{--<div class="form-group">--}}
                                                        {{--<label class="control-label">Marketer in Charge <abbr class="text-danger" title="required">*</abbr></label>--}}

                                                        {{--<select id="marketer-data-select" name="marketer_id" class="form-control data-select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">--}}
                                                            {{--<option></option>--}}
                                                            {{--<option value="1">Software Developer</option>--}}
                                                            {{--<option value="15">Niran Malaolu</option>--}}
                                                            {{--<option value="14">Bukky Malaolu</option>--}}
                                                        {{--</select><span class="select2 select2-container select2-container--bootstrap" dir="ltr" style="width: inherit;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-marketer-data-select-container"><span class="select2-selection__rendered" id="select2-marketer-data-select-container" title=""></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>--}}
                                                    {{--</div>--}}
                                                {{--</div>--}}
                                            {{--</div>--}}
                                            {{--<!--<div class="panel-footer">Panel Footer</div>-->--}}
                                        {{--</div>--}}
                                    {{--</div>--}}
                                    {{--<!-- END panel-->--}}
                                {{--</section>--}}
                            {{--</div>--}}
                            {{--<div class="actions clearfix">--}}
                                {{--<ul role="menu" aria-label="Pagination">--}}
                                    {{--<li class="disabled" aria-disabled="true">--}}
                                        {{--<button class="btn btn-default" type="submit" role="menuitem">Previous</button></li>--}}
                                    {{--<li aria-hidden="false" aria-disabled="false">--}}
                                        {{--<button class="btn btn-primary" type="submit" role="menuitem">Next</button>--}}
                                    {{--</li><li aria-hidden="true" style="display: none;">--}}
                                        {{--<button class="btn btn-primary" type="submit" role="menuitem">Finish</button></li>--}}
                                {{--</ul>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</form>--}}
                {{--</div>--}}
            {{--</div>--}}


            <div class="panel panel-default">
                <div class="panel-heading"></div>
                <div class="panel-body">
                    <form id="airtime-wizard" class="form-horizontal" action="#">

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

    {{--<script src="/vendor/jquery-ui/ui/datepicker.js" id="uiMin"></script>--}}
    <script src="/js/bootstrap-datepicker.min.js" id="uiMin"></script>

    <!-- Demo-->
    <script type="text/javascript">
        // Forms Demo
        // -----------------------------------



        (function(window, document, $, undefined){

            $(function(){

                // FORM EXAMPLE
                // -----------------------------------
                var form = $("#airtime-wizard");
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
//                    bodyTag: "section.wizard-body",
                    bodyTag: "section.wizard-body",
                    transitionEffect: "slideLeft",
                    onInit: function() {

                        init_slot_dates();

                    },
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
                }).steps("next");

            });


        })(window, document, window.jQuery);



        $(document).ready(function () {
            $(".data-select2").select2({
                theme: "bootstrap",
                width : 'inherit'
            });

        });

    </script>

@endsection