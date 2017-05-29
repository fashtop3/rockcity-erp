@extends('layouts.main')

@section('vendor-head')
        <!-- SELECT2-->
<link rel="stylesheet" href="/vendor/select2/dist/css/select2.css">
<link rel="stylesheet" href="/vendor/select2-bootstrap-theme/dist/select2-bootstrap.css">
<link rel="stylesheet" href="/css/jquery-ui.min.css">

<script src="/js/jquery.number.min.js"></script>

<link rel="stylesheet" href="/vendor/jquery-ui/themes/smoothness/theme.css">
{{--<link rel="stylesheet" href="/vendor/jquery-ui/themes/smoothness/jquery-ui.min.css">--}}
{{--<link rel="stylesheet" href="/css/bootstrap-datepicker.min.css">--}}

<script type="text/javascript" src="/bower_components/moment/min/moment.min.js"></script>
{{--<script type="text/javascript" src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>--}}
<script type="text/javascript" src="/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
<link rel="stylesheet" href="/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css" />

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

    li{
        list-style: none;
        list-style-type: none;
    }
</style>

@endsection

@section('section')
    <h3>
        Generate Airtime
        {{--pull-right--}}
        <div class="nav navbar-nav navbar-right">
            <li class="dropdown dropdown-list">
                <a href="javascript:void(0)" data-toggle="dropdown">
                    <em class="fa fa-1x fa-shopping-cart text-info"></em>
                    <span  style="font-size: 10px" class="label label-danger" data-bind="text: $root.items().length"></span>
                </a>
                <!-- START Dropdown menu-->
                <ul class="dropdown-menu animated flipInX">
                    <li>
                        <!-- START list group-->
                        <div class="list-group">
                            <!-- list item-->
                            <a href="#" class="list-group-item" data-toggle="modal" data-target="#cartModal">
                                <div class="media-box">
                                    <div class="pull-left">
                                        {{--<em class="fa fa-twitter fa-2x text-info"></em>--}}
                                        <em class="fa fa-money fa-2x text-info"></em>
                                    </div>
                                    <div class="media-box-body clearfix">
                                        <p class="m0"><strong>₦<span id="carttotal-prev"></span></strong></p>
                                        {{--<p class="m0 text-muted">--}}
                                            {{--<small>1 Products</small>--}}
                                        {{--</p>--}}
                                    </div>
                                </div>
                            </a>
                            <!-- list item-->
                            <a href="#" class="list-group-item">
                                <div class="media-box">
                                    <div class="pull-left">
                                        <em class="fa fa-tasks fa-2x text-success"></em>
                                    </div>
                                    <div class="media-box-body clearfix">
                                        <p class="m0"><span data-bind="text: $root.items().length"></span> Products</p>
                                        {{--<p class="m0 text-muted">--}}
                                            {{--<small>You have 10 new emails</small>--}}
                                        {{--</p>--}}
                                    </div>
                                </div>
                            </a>
                            <div class="list-group-item" style="">
                                <button data-bind="enable: allowEmptyCart" id="empty-cart" class="btn btn-sm btn-danger pull-right clearfix" style="">
                                    <small><i class="fa fa-2x fa-trash"></i> Empty</small>
                                </button>
                                <button  data-toggle="modal" data-target="#cartModal" class="btn btn-sm btn-info pull-left" style="">
                                    <small><i class="fa fa-2x fa-opencart"></i> View</small>
                                </button>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <!-- END list group-->
                    </li>
                </ul>
                <!-- END Dropdown menu-->
            </li>
        </div>
        <div class="clearfix"></div>
    </h3>

    <div class="row">
        <div class="col-md-12">

            <div class="panel panel-default">
                <div class="panel-heading"></div>
                <div class="panel-body">

{{--                    {{ $prog_time }}--}}
                    <form id="airtime-wizard" class="form-horizontal" action="{{ route('airtime.create') }}" method="POST" enctype="multipart/form-data">
                        {{ csrf_field() }}

                        {{--The name is <span data-bind="text: personName()"></span>--}}


                        <div id="airtime-slides">
                            @include('main.airtime.wizards.client-marketer')
                            @include('main.airtime.wizards.products')
                            @include('main.airtime.wizards.remarks')
                            @include('main.airtime.wizards.review')
                        </div>

                        <!-- Cart container -->
                        <div id="cart" style="display: none">
                            <div class="cart-item" product-index="">
                                <div data-bind="foreach: { data: items, as: 'item' }">
                                    <input type="hidden" name="items[]" data-bind="value: JSON.stringify(item)" />
                                </div>
                            </div>

                            <div id="base">
                                <input type="hidden" name="promocode" />
                                <input type="hidden" name="discount" />
                                <input type="hidden" name="discountAmt" />
                                <input type="hidden" name="commission" />
                                <input type="hidden" name="commissionAmt" />
                                <input type="hidden" name="subTotal" />
                                <input type="hidden" name="grandTotal" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->

    <script type='text/javascript' src='/bower_components/knockout/dist/knockout.js'></script>

    <!-- SELECT2-->
    <script src="/vendor/select2/dist/js/select2.js"></script>
    <!-- JQUERY VALIDATE-->
    <script src="/vendor/jquery-validation/dist/jquery.validate.js"></script>
    <!-- JQUERY STEPS-->
    <script src="/vendor/jquery.steps/build/jquery.steps.js"></script>

    <!-- JQUERY Cookie -->
    <script src="/vendor/jquery-cookie-master/jquery.cookie.js"></script>

    {{--<script src="/vendor/jquery-ui/ui/datepicker.js" id="uiMin"></script>--}}
    {{--<script src="/js/bootstrap-datepicker.min.js" id="uiMin"></script>--}}

    <!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
    <script src="/vendor/jquery-file-upload/jquery.ui.widget.js"></script>
    <!-- The Load Image plugin is included for the preview images and image resizing functionality -->
    <script src="/vendor/jquery-file-upload/load-image.all.min.js"></script>
    <!-- The Canvas to Blob plugin is included for image resizing functionality -->
    <script src="/vendor/jquery-file-upload//canvas-to-blob.min.js"></script>
    <!-- blueimp Gallery script -->
    <script src="/vendor/jquery-file-upload/jquery.blueimp-gallery.min.js"></script>
    <!-- The basic File Upload plugin -->
    <script src="/vendor/jquery-file-upload/jquery.fileupload.js"></script>
    <!-- The main application script -->
    <script src="/vendor/jquery-file-upload/main.js"></script>

    <!-- Demo-->
    <script type="text/javascript">
        // Forms Demo
        // -----------------------------------

        function init_cart_button() {
            $('#empty-cart').click(function() {
                Pricing.__emptyCart();
                console.log('empty clicked');
            });
        }

        (function(window, document, $, undefined){

            $(function(){

                AirtimeViewModel = {
                    items: ko.observableArray([]),
                    cartTotals: ko.observable('0.00'),
                    allowEmptyCart: ko.observable(false),
                    showDeleteButton: ko.observable(true),

                    number: function (val) {
                        return $.number(val, 2);
                    },

                    slotButton: ko.observable(false),
                    bulkButton: ko.observable(false),
                    disableFixableSlots: ko.observable(true),

                    deleteSubscription: function(subIndex, itemObj) {
                        Pricing.deleteSubscription(subIndex, itemObj);
                    }
                };

                AirtimeViewModel.items.subscribe(function() {
                    var sum = 0.00;
                    for(var i = 0; i<AirtimeViewModel.items().length; i++) {
                        sum += AirtimeViewModel.items()[i].subTotal;
                    }

                    $('span#carttotal-prev').text($.number(sum, 2));

                    if(AirtimeViewModel.items().length) {
                        $('button#orderButton').attr('disabled', false);
                    } else {
                        $('button#orderButton').attr('disabled', true);
                    }

                    Pricing.calculate_prices();
                });

                $.fn.steps.setStep = function (step)
                {
                    var currentIndex = $(this).steps('getCurrentIndex');
                    for(var i = 0; i < Math.abs(step - currentIndex); i++){
                        if(step > currentIndex) {
                            $(this).steps('next');
                        }
                        else{
                            $(this).steps('previous');
                        }
                    }
                };

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
//
                        wizform = $(this); //set this to a global var
                        var finishButton = wizform.find('a[href="#finish"]');
                        finishButton.parent().addClass('disabled');

                        init_cart_button();

                        ko.applyBindings(AirtimeViewModel);

                        ClientMarketer.init(clients, marketers);

                        ProductSlot.configSlotDates();
                        ProductSlot.configBulkDates();


                    },
                    onStepChanging: function (event, currentIndex, newIndex)
                    {
                        var wizform = $(this);
                        form.validate().settings.ignore = ":disabled,:hidden";

                        if(newIndex == 1) {
                            AirtimeViewModel.allowEmptyCart(true);
                        }

                        if(newIndex == 2) {
                            if(currentIndex == 1) {
                                if(!ProductSlot.cart.length) {
//                                wizform.steps("setStep", currentIndex);
                                    swal('Oops...', "Your cart is empty!!! Please select a product", 'error');
                                    console.log(event);
                                    return false;
                                }
                            }
                            Pricing.init();
                            AirtimeViewModel.allowEmptyCart(false);
                        }
                        if(newIndex == 3) {
                            Review.init();
                        }
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
                });//.steps("setStep", 3);
            });


        })(window, document, window.jQuery);



        $(document).ready(function () {
            $(".data-select2").select2({
                theme: "bootstrap",
                width : 'inherit'
            });

        });

    </script>

    <!-- Modal Large-->
    <div id="cartModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabelLarge" aria-hidden="true" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 id="myModalLabelLarge" class="modal-title">Your Shopping Cart (<span data-bind="text: $root.items().length"></span> Product(s))</h4>
                </div>
                <div class="modal-body">
                    <div data-bind="template: { name: 'cart-template' }"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
                    {{--<button type="button" class="btn btn-primary">Save changes</button>--}}
                </div>
            </div>
        </div>
    </div>

    <script type="text/html" id="cart-template">
        <div class="row">
            <div class="col-sm-12">
                <div class="list-group">
                    <div id="reviewBindings" data-bind="if: items">
                        <div data-bind="foreach: { data: items, as: 'item' }">
                            <li>
                                <!-- START panel-->
                                <div id="" class="panel panel-default">
                                    <div class="panel-heading" data-bind="text: name" ></div>
                                    <div class="panel-wrapper">
                                        <div class="panel-body">
                                            <div id="item-container" data-bind="foreach: subscriptions">
                                                <div class="list-group" data-bind="if: bulks>0" >
                                                    <div class="list-group-item">
                                                        <div class="table-responsive">
                                                            <table class="wd-wide">
                                                                <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div class="ph">
                                                                            <span class="label label-info pull-right" data-bind="text: period"></span>
                                                                            <h4 class="media-box-heading">BULK <span data-bind="if: file_id != null"><em class="text-primary fa fa-1x fa-file"></em></span></h4>
                                                                            <div class="text-muted text-inverse">
                                                                                <small>
                                                                                    <b>Start: </b> <span data-bind="text: bulk_start_date"></span> &nbsp;&nbsp;
                                                                                    <b>End: </b> <span data-bind="text: bulk_end_date"></span>
                                                                                </small>
                                                                            </div>
                                                                            <div class="text-muted text-inverse">
                                                                                <small><b>Programme: </b> <span data-bind="text: prog_start"></span> -- <span data-bind="text: prog_end"></span> </small>
                                                                            </div>
                                                                            <div class="text-muted text-inverse">
                                                                                <small>
                                                                                    <b>Bulk: </b> <span data-bind="text: bulks"></span> &nbsp;&nbsp;
                                                                                    <span data-bind="if: duration"><b>Duration: </b> <span data-bind="text: duration"></span></span>
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="wd-xs" valign="top">
                                                                        <div data-bind="if: $root.showDeleteButton()" class="ph">
                                                                            <p class="m0 text-muted">
                                                                                <a href="#" data-bind="click: $root.deleteSubscription.bind($data, $index(), item)"><i class="fa fa-lg fa-trash-o"></i></a>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td class="wd-sm">
                                                                        <div class="ph">
                                                                            <!--<p class="m0">Price</p>-->
                                                                            <small class="m0 text-info">
                                                                                ₦<span data-bind="text: $root.number(amount)"></span></small>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="list-group" data-bind="if: slots > 0">
                                                    <div class="list-group-item">
                                                        <div class="table-responsive">
                                                            <table class="wd-wide">
                                                                <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div class="ph">
                                                                            <span class="label label-info pull-right" data-bind="text: period"></span>
                                                                            <h4 class="media-box-heading">SLOT <span data-bind="if: file_id != null"><em class="text-primary fa fa-1x fa-file"></em></span> <small data-bind="if: schedules.length > 0" class="text-muted">(Fixed)</small></h4>
                                                                            <div class="text-muted text-inverse">
                                                                                <small>
                                                                                    <b>Slot date: </b> <span data-bind="text: slot_start_date"></span>
                                                                                    <b> -- </b> <span data-bind="text: slot_end_date"></span>
                                                                                </small>
                                                                            </div>
                                                                            <div class="text-muted text-inverse">
                                                                                <small><b>Programme: </b> <span data-bind="text: prog_start"></span> -- <span data-bind="text: prog_end"></span> </small>
                                                                            </div>
                                                                            <div class="text-muted text-inverse"><small><b>Slot: </b> <span data-bind="text: slots"></span>; &nbsp;&nbsp;
                                                                                    <span data-bind="if: duration"><b>Duration: </b> <span data-bind="text: duration"></span></span>
                                                                                </small></div>
                                                                        </div><br />
                                                                        <div class="table-responsive" data-bind="if: schedules.length > 0">
                                                                            <table class="table table-bordered">
                                                                                <tr>
                                                                                    <th>Date</th>
                                                                                    <th>Slot</th>
                                                                                    <th>Fixed</th>
                                                                                    <th>Time</th>
                                                                                </tr>
                                                                                <tbody data-bind="foreach: { data: schedules, as: 'schedule' }">
                                                                                <tr>
                                                                                    <td> <span data-bind="text: schedule.date"></span></td>
                                                                                    <td><span data-bind="text: schedule.going"></span></td>
                                                                                    <td><span data-bind="text: schedule.fixtimes.length"></span></td>
                                                                                    <td>
                                                                                        <div data-bind="if: schedule.fixtimes.length > 0"><span class="text text-primary"> <small data-bind="text: schedule.fixtimes.join(', ')"></small> </span></div>
                                                                                        <div data-bind="if: schedule.fixtimes.length == 0"><span class="text text-primary"><small> <span data-bind="text: $parent.prog_start"></span> -- <span data-bind="text: $parent.prog_end"></span></small></span></div>
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                    <td class="wd-xs" valign="top">
                                                                        <div class="ph" data-bind="if: $root.showDeleteButton()">
                                                                            <p class="m0 text-muted">
                                                                                <a href="#" data-bind="click: $root.deleteSubscription.bind($data, $index(), item)"><i class="fa fa-lg fa-trash-o"></i></a>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td class="wd-sm" valign="top">
                                                                        <div class="ph">
                                                                            <!--<p class="m0">Price</p>-->
                                                                            <small class="m0 text-info">
                                                                                ₦<span data-bind="text: $root.number(amount)"></span></small>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel-footer">
                                            <div class="list-group-item">
                                                <div class="media-box">
                                                    <div class="pull-left">
                                 <span class="fa-stack">
                                    <em class="fa fa-circle fa-stack-2x text-purple"></em>
                                    <em class="fa fa-money fa-stack-1x fa-inverse text-white"></em>
                                 </span>
                                                    </div>
                                                    <div class="media-box-body clearfix">
                                                        <p class="m0 pull-right text-inverse"> ₦ <span data-bind="text: $root.number(subTotal)"></span>
                                                        </p>
                                                        <div class="media-box-heading pull-left"><span class="text-purple m0">Total Amount: </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- END panel-->
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </script>
@endsection