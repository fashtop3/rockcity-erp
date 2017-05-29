@extends('layouts.pdf')

@section('content')
    <h4 class="text-center">AIRTIME ORDER</h4>
    <hr>

    <table class="table table-bordered">
        <tr>
            <td><p>Date: <span class="text-muted">{{Carbon\Carbon::parse($order->created_at)->toDayDateTimeString()}}</span></p></td>
            <td><p>Order No.: <span class="text-muted">{{$order->order_no}}</span></p></td>
        </tr>
    </table>
    <table class="table table-bordered">
        <tr>
            <td><p>Client Name: <span class="text-muted">{{$order->client->name}}</span></p></td>
            <td><p><em class="fa fa-home fa-lg"></em> <span class="text-muted">{{$order->client->street_no.' '.$order->client->street_name.', '.$order->client->town}}</span></p></td>
            <td><p><em class="fa fa-phone fa-lg"></em> <span class="text-muted">{{$order->client->mobile}}</span></p></td>
        </tr>
    </table>
    @foreach($order->products as $product)
    <table class="table table-bordered">
        <tr class="bg-info">
            <td colspan="2"><p>Product: <span class="text-danger"><strong>{{$product->product->name}}</strong></span></p></td>
            {{--<td><p>Slots: <span class="text-muted"><strong>{{$product->detailsCount}}</strong></span></p></td>--}}
        </tr>
        <tr>
            <td width="75%" colspan="2">
                <?php
                    $prodSubTotal = 0;
                ?>
                @foreach($product->subscriptions as $subscription)
                <?php $prodSubTotal += $subscription->amount;  ?>
                @if(isset($subscription->bulks))
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody>
                                <tr>
                                    <td width="85%" class="table">
                                        <div class="">
                                            <span class="label label-info pull-right">{{$subscription->period}}</span>
                                            <h5 class="media-box-heading">BULK</h5>
                                            <div class="text-muted text-inverse">
                                                <small>
                                                    <b>Start: </b>{{\Carbon\Carbon::parse($subscription->bulk_start_date)->toFormattedDateString()}}; &nbsp;&nbsp;
                                                    <b>End: </b>{{\Carbon\Carbon::parse($subscription->bulk_end_date)->toFormattedDateString()}}
                                                </small>
                                            </div>
                                            <div class="text-muted text-inverse">
                                                <small><b>Broadcast: </b>{{$subscription->bulks}}; &nbsp;&nbsp;
                                            @if(!empty($subscription->duration))
                                                <b>Duration: </b> {{$subscription->duration}}
                                            @endif
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td width="15%">
                                        <div class="ph">
                                            <!--<p class="m0">Price</p>-->
                                            <small class="m0 text-info">
                                                ₦{{ number_format($subscription->amount, 2) }}</small>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    @endif

                    @if(isset($subscription->slots))
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody>
                                <tr>
                                    <td width="85%">
                                        <div class="ph">
                                            <span class="label label-info pull-right">{{$subscription->period}}</span>
                                            <h5 class="media-box-heading">SLOT</h5>
                                            <div><small class="text-muted text-inverse">
                                                <b>Slot date :</b> {{\Carbon\Carbon::parse($subscription->slot_start_date)->toFormattedDateString()}}
                                                <b> -- </b> {{\Carbon\Carbon::parse($subscription->slot_end_date)->toFormattedDateString()}}
                                            </small></div>
                                            <div class="text-muted text-inverse">
                                                <small><b>Programme: </b> {{ $subscription->prog_start }} - {{ $subscription->prog_end }}</small>
                                            </div>
                                            <div><small class="text-muted text-inverse">
                                                <b>Slot: </b> {{ $subscription->slots }};
                                             @if(!empty($subscription->duration))
                                                        &nbsp;&nbsp;<b>Duration: </b> {{ $subscription->duration }}
                                             @endif
                                                </small>
                                            </div>
                                        </div> <br />
                                        @if(count($subscription->schedules))
                                        <div class="table-responsive">
                                            <table class="table table-bordered">
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Slot</th>
                                                    <th>Fixed</th>
                                                    <th>Time</th>
                                                </tr>
                                                @foreach($subscription->schedules as $schedule)
                                                    {{--@for($i = 0; $i<count($slotDetail->schedule); $i++)--}}
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
                                                    {{--@endfor--}}
                                                @endforeach
                                            </table>
                                        </div>
                                        @endif
                                    </td>
                                    <td width="15%" valign="bottom">
                                        <div class="ph">
                                            {{--<!--<p class="m0">Price</p>-->--}}
                                            <small class="m0 text-info">
                                                ₦{{number_format($subscription->amount, 2)}}</small>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    @endif
                @endforeach
            </td>
        </tr>
        <tr><td valign="bottom"><p class="pull-right">Total: <strong>NGN {{ number_format($prodSubTotal, 2)}}</strong></p></td></tr>
    </table>
    @endforeach


    <div class="col-sm-5 pull-right">
        <table class="table table-striped">
            <tr><td>Subtotal:</td><td><strong>NGN {{number_format($order->subTotal, 2)}}</strong></td></tr>
            <tr><td>Discount({{$order->discount}}%):</td><td><strong>NGN {{number_format($order->discountAmt, 2)}}</strong></td></tr>
            <tr><td>Commission({{$order->commission}}%):</td><td><strong>NGN {{number_format($order->commissionAmt, 2)}}</strong></td></tr>
            <tr><td>VAT(5%):</td><td><strong>NGN {{number_format((5/100)*$order->subTotal, 2)}}</strong></td></tr>
            <tr><td>GRAND TOTAL:</td><td><strong>NGN {{number_format($order->grandTotal, 2)}}</strong></td></tr>
        </table>
    </div>

    <div class="clearfix"></div>
    <hr>
    <div class="row">
        <div class="col-sm-12">
            <table class="table table-bordered">
                <tbody>
                <tr>
                    <td class="wd-sm">
                        <div class="ph">
                            <h5 class="media-box-heading">Date</h5>
                            <small class="text-info"><em>Administrator</em></small>
                        </div>
                    </td>
                    <td class="wd-sm">
                        <div class="ph">
                            <h6 class="media-box-heading">Generated by</h6>
                            <small class="text-muted"><em>{{$order->user->lastname}}, {{$order->user->firstname}}</em></small>
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
        </div>
    </div>

@stop