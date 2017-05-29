@extends('layouts.main')


@section('section')
    <h3>
        Airtime
    </h3>

    <!-- client Info-->
    <div class="row">

        <!--start: manage airitime-->
        <div permission permission-only="['admin', 'executive.director', 'head.marketing', 'head.accounting', 'traffic', 'approve.airtime' , 'validate.airtime', 'recommend.approval', 'programme.airtime']" class="col-sm-12">
            <div class="panel panel-danger">
                {{--<div class="panel-heading">--}}
                    {{--Manage Airtime--}}
                {{--</div>--}}
                {{--<div class="panel-body">--}}
                    {{--<form class="form-horizontal" role="form" name="manageAirtime" novalidate>--}}

                        {{--<div>--}}
                            {{--<uib-alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</uib-alert>--}}
                        {{--</div>--}}


                        {{--<fieldset permission permission-only="['head.marketing','validate.airtime']">--}}
                            {{--<div  class="form-group">--}}
                                {{--<label class="col-sm-2 control-label">Validate</label>--}}
                                {{--<div class="col-sm-6">--}}
                                    {{--<label class="radio-inline c-radio">--}}
                                        {{--<input ng-disabled="schedule.schedule_alert.programme" ng-model="manage.validate" type="radio" name="validate" value="1" />--}}
                                        {{--<span class="fa fa-circle"></span>Yes</label>--}}
                                    {{--<label class="radio-inline c-radio">--}}
                                        {{--<input ng-disabled="schedule.schedule_alert.programme" ng-model="manage.validate" type="radio" name="validate" value="0" />--}}
                                        {{--<span class="fa fa-circle"></span>No</label>--}}
                                {{--</div>--}}
                                {{--<button ng-disabled="schedule.schedule_alert.programme" ng-click="validateSchedule()" name="valButton" class="btn btn-default"><em class="fa fa-save fa-lg"></em></button>--}}
                            {{--</div>--}}
                        {{--</fieldset>--}}

                        {{--<fieldset permission permission-only="['head.accounting','recommend.approval']">--}}
                            {{--<div class="form-group">--}}
                                {{--<label class="col-sm-2 control-label">Recommend</label>--}}
                                {{--<div class="col-sm-6">--}}
                                    {{--<label class="radio-inline c-radio">--}}
                                        {{--<input ng-disabled="schedule.schedule_alert.programme" type="radio" ng-model="manage.recommend" name="recommend" value="1" />--}}
                                        {{--<span class="fa fa-circle"></span>Yes</label>--}}
                                    {{--<label class="radio-inline c-radio">--}}
                                        {{--<input ng-disabled="schedule.schedule_alert.programme" type="radio" ng-model="manage.recommend" name="recommend" value="0" />--}}
                                        {{--<span class="fa fa-circle"></span>No</label>--}}
                                {{--</div>--}}
                                {{--<button ng-disabled="schedule.schedule_alert.programme" ng-click="recommendSchedule()" class="btn btn-default"><em class="fa fa-save fa-lg"></em></button>--}}
                            {{--</div>--}}
                        {{--</fieldset>--}}
                        {{--<fieldset permission permission-only="['admin', 'executive.director', 'approve.airtime']">--}}
                            {{--<div class="form-group">--}}
                                {{--<label class="col-sm-2 control-label">Approve</label>--}}
                                {{--<div class="col-sm-6">--}}
                                    {{--<label class="radio-inline c-radio">--}}
                                        {{--<input ng-disabled="schedule.schedule_alert.programme" type="radio" ng-model="manage.approved" name="approved" value="1" />--}}
                                        {{--<span class="fa fa-circle"></span>Yes</label>--}}
                                    {{--<label class="radio-inline c-radio">--}}
                                        {{--<input ng-disabled="schedule.schedule_alert.programme" type="radio" ng-model="manage.approved" name="approved" value="0" />--}}
                                        {{--<span class="fa fa-circle"></span>No</label>--}}
                                {{--</div>--}}
                                {{--<button ng-disabled="schedule.schedule_alert.programme" ng-click="approveSchedule()" class="btn btn-default"><em class="fa fa-save fa-lg"></em></button>--}}
                            {{--</div>--}}
                        {{--</fieldset>--}}

                        {{--<fieldset permission permission-only="['traffic','programme.airtime']">--}}
                            {{--<div class="form-group">--}}
                                {{--<label class="col-sm-2 control-label">Programme</label>--}}
                                {{--<div class="col-sm-6">--}}
                                    {{--<label class="radio-inline c-radio">--}}
                                        {{--<input ng-disabled="schedule.schedule_alert.programme" type="radio" ng-model="manage.programme" name="programme" value="1" />--}}
                                        {{--<span class="fa fa-circle"></span>Yes</label>--}}
                                    {{--<label class="radio-inline c-radio">--}}
                                        {{--<input ng-disabled="schedule.schedule_alert.programme" type="radio" ng-model="manage.programme" name="programme" value="0" />--}}
                                        {{--<span class="fa fa-circle"></span>No</label>--}}
                                {{--</div>--}}
                                {{--<button ng-disabled="schedule.schedule_alert.programme" ng-click="programmeSchedule()" class="btn btn-default"><em class="fa fa-save fa-lg"></em></button>--}}
                            {{--</div>--}}
                        {{--</fieldset>--}}
                    {{--</form>--}}
                {{--</div>--}}
            </div>
        </div>
        <!-- end: manage airtime-->

        <div class="col-sm-12">
            <div class="list-group">
                <li class="list-group-item">
                    <table class="wd-wide">
                        <tbody>
                        <tr>
                            <td class="wd-sm">
                                <div class="ph">
                                    <h5 class="media-box-heading">Client</h5>
                                    <small class="text-info"><em>{{$order->client->name}}</em></small>
                                </div>
                                <br />
                                <div class="ph">
                                    <h6 class="media-box-heading">Email</h6>
                                    <small class="text-danger"><em>{{$order->client->email}}</em></small>
                                </div>
                                <div class="hidden-sm hidden-md hidden-lg"><br />
                                    <div class="ph">
                                        <h6 class="media-box-heading">Address</h6>
                                        <small class="text-muted"><em>{{ $order->client->street_no .' '. $order->client->street_name .', '. $order->client->town }}</em></small>
                                    </div><br />
                                    <div class="ph">
                                        <h6 class="media-box-heading">Phone</h6>
                                        <small class="text-muted"><em>{{$order->client->mobile}}</em></small>
                                    </div>
                                </div>
                            </td>
                            <td class="wd-sm hidden-xs">
                                <div class="ph">
                                    <h6 class="media-box-heading">Address</h6>
                                    <small class="text-muted"><em>{{ $order->client->street_no .' '. $order->client->street_name .', '. $order->client->town }}</em></small>
                                </div><br />
                                <div class="ph">
                                    <h6 class="media-box-heading">Phone</h6>
                                    <small class="text-muted"><em>{{$order->client->mobile}}</em></small>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
            </div>
        </div>
    </div>


    <!-- cart list items-->
    <div class="row">
        <div class="col-sm-12">
            <div class="list-group">
                @foreach($order->products as $schproduct)
                    <li class="list-group-item">
                        <!-- START panel-->
                        <div class="panel panel-default">
                            <div class="panel-heading">{{$schproduct->product->name}}
                                <paneltool tool-collapse="tool-collapse"></paneltool>
                            </div>
                            <div class="panel-wrapper">
                                <div class="panel-body">
                                    <div class="list-group">
                                        <?php
                                            $prodSubTotal = 0;
                                        ?>
                                        @foreach($schproduct->subscriptions as $subscription)
                                            <?php $prodSubTotal += $subscription->amount;  ?>
                                                {{--{{ dd($subscription) }}--}}
                                            @if(isset($subscription->bulks))
                                                <div class="list-group-item">
                                                    <table class="wd-wide table-responsive">
                                                    <tbody>
                                                    <tr>
                                                        <td class="wd-lg" colspan="2">
                                                            <div class="ph">
                                                                <span class="label label-info pull-right">{{$subscription->period}}</span>
                                                                <h4 class="media-box-heading">BULK</h4>

                                                                <div class="text-muted text-inverse">
                                                                    <small>
                                                                        <b>Start: </b> {{$subscription->bulk_start_date}}; &nbsp;&nbsp;
                                                                        <b>End: </b> {{$subscription->bulk_end_date }}
                                                                    </small>
                                                                </div>
                                                                <div class="text-muted text-inverse">
                                                                    <small><b>Programme: </b> {{ $subscription->prog_start }} - {{ $subscription->prog_end }}</small>
                                                                </div>
                                                                <div class="text-muted text-inverse">
                                                                    <small>
                                                                        <b>Bulk: </b> {{$subscription->bulks}}; &nbsp;&nbsp;
                                                                        @if(isset($subscription->duration))
                                                                            <span><b>Duration: </b> {{$subscription->duration}}</span>
                                                                        @endif
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="wd-sm">
                                                            <div class="ph">
                                                                <!--<p class="m0">Price</p>-->
                                                                <small class="m0 text-info">
                                                                    &#8358 {{ number_format($subscription->amount, 2) }}</small>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </div>
                                            @elseif(isset($subscription->slots))
                                                <div class="list-group-item">
                                                    <table class="wd-wide table-responsive">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="ph">
                                                                    <span class="label label-info pull-right">{{$subscription->period}}</span>
                                                                    <h4 class="media-box-heading">SLOT</h4>
                                                                    <div class="text-muted text-inverse">
                                                                        <small>
                                                                            <b>Slot date: </b> {{$subscription->slot_start_date}}
                                                                            <b> -- </b> {{$subscription->slot_end_date }}
                                                                        </small>
                                                                    </div>
                                                                    <div class="text-muted text-inverse">
                                                                        <small><b>Programme: </b> {{ $subscription->prog_start }} - {{ $subscription->prog_end }}</small>
                                                                    </div>
                                                                    <div class="text-muted text-inverse"><small><b>Slot: </b> {{$subscription->slots}}; &nbsp;&nbsp;
                                                                            @if(isset($subscription->duration))
                                                                                <span><b>Duration: </b> {{ $subscription->duration }}</span>
                                                                            @endif
                                                                        </small></div>
                                                                </div><br />
                                                                @if(count($subscription->schedules))
                                                                    <div class="table-responsive">
                                                                    <table class="table table-bordered">
                                                                        <tr>
                                                                            <th>Date</th>
                                                                            <th>Slot</th>
                                                                            <th>Fixed</th>
                                                                            <th>Time</th>
                                                                        </tr>
                                                                        <tbody>
                                                                        @foreach($subscription->schedules as $schedule)
                                                                            <tr>
                                                                                <td>{{ $schedule->date }}</td>
                                                                                <td>{{$schedule->going}}</td>
                                                                                <td>{{ count($schedule->fixtimes) }}</td>
                                                                                <td>
                                                                                    @if(count($schedule->fixtimes))
                                                                                        <span class="text text-primary"><small>{{ collect($schedule->fixtimes)->implode(', ') }}, </small></span>
                                                                                    @else
                                                                                        <span class="text text-primary"><small>{{ $subscription->prog_start }} - {{ $subscription->prog_end }} </small></span>
                                                                                    @endif
                                                                                </td>
                                                                            </tr>
                                                                        @endforeach
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                @endif
                                                            </td>
                                                            <td class="wd-sm" valign="top">
                                                                <div class="ph">
                                                                    <!--<p class="m0">Price</p>-->
                                                                    <small class="m0 text-info">
                                                                        &#8358 {{ number_format($subscription->amount, 2) }}</small>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            @endif

                                        @endforeach
                                        <br />
                                        <div class="list-group-item">
                                            <div class="media-box">
                                                <div class="pull-left">
                                                <span class="fa-stack">
                                                <em class="fa fa-circle fa-stack-2x text-purple"></em>
                                                <em class="fa fa-money fa-stack-1x fa-inverse text-white"></em>
                                                </span>
                                                </div>
                                                <div class="media-box-body clearfix">
                                                    <p class="m0 pull-right text-inverse"> &#8358 {{ number_format($prodSubTotal, 2) }}
                                                    </p>
                                                    <div class="media-box-heading pull-left"><span class="text-purple m0">Total Amount: </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END panel-->
                    </li>
                @endforeach
            </div>
        </div>
    </div>

    <!-- Grand totals-->
    <div class="row">
        <div class="col-sm-7 col-sm-push-5">
            <div class="list-group">
                <li class="list-group-item" >
                    <table class="wd-wide">
                        <tbody>
                        <tr>
                            <td class="wd-sm">
                                <div class="ph text-inverse">
                                    <h5 class="media-box-heading text-muted">Subtotal:</h5>
                                </div>
                            </td>
                            <td class="wd-sm">
                                <div class="ph text-inverse text-right">
                                    <h5 class="media-box-heading"><strong>NGN {{ number_format($order->subTotal, 2)}}</strong></h5>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li class="list-group-item" >
                    <table class="wd-wide">
                        <tbody>
                        <tr>
                            <td class="wd-sm text-inverse">
                                <div class="ph">
                                    <h5 class="media-box-heading text-muted">Discount({{ $order->discount }}%):</h5>
                                </div>
                            </td>
                            <td class="wd-sm">
                                <div class="ph text-inverse text-right">
                                    <h5 class="media-box-heading"><strong>NGN {{  number_format($order->discountAmt, 2) }}</strong></h5>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li class="list-group-item" >
                    <table class="wd-wide">
                        <tbody>
                        <tr>
                            <td class="wd-sm text-inverse">
                                <div class="ph">
                                    <h5 class="media-box-heading text-muted">Commission({{ $order->commission }}%):</h5>
                                </div>
                            </td>
                            <td class="wd-sm">
                                <div class="ph text-inverse text-right">
                                    <h5 class="media-box-heading "><strong>NGN {{ number_format($order->commissionAmt, 2) }}</strong></h5>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li class="list-group-item" >
                    <table class="wd-wide">
                        <tbody>
                        <tr>
                            <td class="wd-sm">
                                <div class="ph text-inverse">
                                    <h5 class="media-box-heading text-muted">VAT(5%):</h5>
                                </div>
                            </td>
                            <td class="wd-sm">
                                <div class="ph text-inverse text-right">
                                    <h5 class="media-box-heading"><strong>NGN {{ number_format(( (5/100) *  $order->subTotal ), 2) }}</strong></h5>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li class="list-group-item" >
                    <table class="wd-wide">
                        <tbody>
                        <tr>
                            <td class="wd-sm" valign="top">
                                <div class="ph text-inverse">
                                    <h5 class="media-box-heading text-muted">GRAND TOTAL:</h5>
                                </div>
                            </td>
                            <td class="wd-sm">
                                <div class="ph text-warning text-right">
                                    <h5 class="media-box-heading"><strong>NGN {{ number_format($order->grandTotal, 2) }}</strong></h5>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
            </div>
        </div>
    </div>
    <br />

    <!-- Marketer in charrge-->
    <div class="row">
        <div class="col-sm-12">
            <div class="list-group">
                <li class="list-group-item">
                    <table class="wd-wide">
                        <tbody>
                        <tr>
                            <td class="wd-sm">
                                <div class="ph">
                                    <h5 class="media-box-heading">Date</h5>
                                    <small class="text-info"><em>{{  $order->created_at }}</em></small>
                                </div>
                            </td>
                            <td class="wd-sm">
                                <div class="ph">
                                    <h6 class="media-box-heading">Generated by</h6>
                                    <small class="text-muted"><em>{{  $order->user->lastname .' '. $order->user->firstname }}</em></small>
                                </div>
                            </td>
                            <td class="wd-sm">
                                <div class="ph">
                                    <h6 class="media-box-heading">Payment Mode</h6>
                                    <small class="text-muted"><em>Cash</em></small>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
            </div>
        </div>
    </div>

@endsection