@extends('pdf')

@section('content')
    <h4 class="text-center">AIRTIME ORDER</h4>
    <hr>

    <table class="table table-bordered">
        <tr>
            <td><p>Date: <span class="text-muted">{{Carbon\Carbon::parse($schedule->created_at)->toDayDateTimeString()}}</span></p></td>
            <td><p>Order No.: <span class="text-muted">{{$schedule->order_no}}</span></p></td>
        </tr>
    </table>
    <table class="table table-bordered">
        <tr>
            <td><p>Client Name: <span class="text-muted">{{$schedule->client->name}}</span></p></td>
            <td><p><em class="fa fa-home fa-lg"></em> <span class="text-muted">{{$schedule->client->street_no.' '.$schedule->client->street_name.', '.$schedule->client->town}}</span></p></td>
            <td><p><em class="fa fa-phone fa-lg"></em> <span class="text-muted">{{$schedule->client->mobile}}</span></p></td>
        </tr>
    </table>
    @foreach($schedule->schProducts as $product)
    <table class="table table-bordered">
        <tr class="bg-info">
            <td colspan="2"><p>Product: <span class="text-danger"><strong>{{$product->product->name}}</strong></span></p></td>
            {{--<td><p>Slots: <span class="text-muted"><strong>{{$product->detailsCount}}</strong></span></p></td>--}}
        </tr>
        <tr>
            <td width="75%" colspan="2">
                @foreach($product->schProductSubs as $productSub)
                    @if(isset($productSub['subscription']['broadcast']))
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody>
                                <tr>
                                    <td width="85%" class="table">
                                        <div class="">
                                            <span class="label label-info pull-right">{{$productSub['subscription']['period']}}</span>
                                            <h5 class="media-box-heading">BULK</h5>
                                            <div class="text-muted text-inverse">
                                                <small>
                                                    <b>Start: </b>{{\Carbon\Carbon::parse($productSub['subscription']['bulk_start_date'])->toFormattedDateString()}}; &nbsp;&nbsp;
                                                    <b>End: </b>{{\Carbon\Carbon::parse($productSub['subscription']['bulk_end_date'])->toFormattedDateString()}}
                                                </small>
                                            </div>
                                            <div class="text-muted text-inverse">
                                                <small><b>Broadcast: </b>{{$productSub['subscription']['broadcast']}}; &nbsp;&nbsp;
                                            @if(!empty($productSub['subscription']['duration']))
                                                <b>Duration: </b> {{$productSub['subscription']['duration']}}
                                            @endif
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td width="15%">
                                        <div class="ph">
                                            <!--<p class="m0">Price</p>-->
                                            <small class="m0 text-info">
                                                ₦{{ number_format($productSub['subscription']['amount'], 2) }}</small>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    @endif

                    @if(isset($productSub['subscription']['slots']))
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody>
                                <tr>
                                    <td width="85%">
                                        <div class="ph">
                                            <span class="label label-info pull-right">{{$productSub['subscription']['period']}}</span>
                                            <h5 class="media-box-heading">SLOT</h5>
                                            <div><small class="text-muted text-inverse">
                                                <b>Slot date :</b> {{\Carbon\Carbon::parse($productSub['subscription']['slot_start_date'])->toFormattedDateString()}}
                                                <b> -- </b> {{\Carbon\Carbon::parse($productSub['subscription']['slot_end_date'])->toFormattedDateString()}}
                                            </small></div>
                                            <?php $period = $productSub['subscription']['period']; ?>
                                            <?php $prog_time_range = Carbon\Carbon::parse($prog_time[$period.'_start'])->format('h:i a') . ' - '. Carbon\Carbon::parse($prog_time[$period.'_end'])->format('h:i a'); ?>
                                            <div><small class="text-muted text-inverse"><b>Programme: </b>{{$prog_time_range}}</small></div>
                                            <div><small class="text-muted text-inverse">
                                                <b>Slot: </b> {{$productSub['subscription']['slots']}};
                                             @if(!empty($productSub['subscription']['duration']))
                                                        &nbsp;&nbsp;<b>Duration: </b> {{$productSub['subscription']['duration']}}
                                             @endif
                                                </small>
                                            </div>
                                        </div> <br />
                                        @if(count($productSub->slotDetails) > 0)
                                        <div class="table-responsive">
                                            <table class="table table-bordered">
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Slot</th>
                                                    <th>Fixed</th>
                                                    <th>Time</th>
                                                </tr>
                                                @foreach($productSub->slotDetails as $slotDetail)
                                                    @for($i = 0; $i<count($slotDetail->schedule); $i++)
                                                    <tr>
                                                        <td>{{Carbon\Carbon::parse($slotDetail->schedule[$i]['date'])->toFormattedDateString()}}</td>
                                                        <td>{{$slotDetail->schedule[$i]['slot']}}</td>
                                                        <td>{{$slotDetail->schedule[$i]['tofix']}}</td>
                                                        @if($slotDetail->schedule[$i]['tofix'])
                                                            <td>
                                                                <span class="text text-primary">
                                                                    @foreach($slotDetail->schedule[$i]['times'] as $time)
                                                                    <small>{{\Carbon\Carbon::parse($time)->format('h:i a')}}, </small>
                                                                    @endforeach
                                                                </span>
                                                            </td>
                                                        @else
                                                            <td>
                                                            <span class="text text-primary">
                                                                <small>{{$prog_time_range}}</small>
                                                            </span>
                                                            </td>
                                                        @endif
                                                    </tr>
                                                    @endfor
                                                @endforeach
                                            </table>
                                        </div>
                                        @endif
                                    </td>
                                    <td width="15%" valign="bottom">
                                        <div class="ph">
                                            {{--<!--<p class="m0">Price</p>-->--}}
                                            <small class="m0 text-info">
                                                ₦{{number_format($productSub['subscription']['amount'], 2)}}</small>
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
        <tr><td valign="bottom"><p class="pull-right">Total: <strong>NGN {{ number_format($product->totals, 2)}}</strong></p></td></tr>
    </table>
    @endforeach


    <div class="col-sm-5 pull-right">
        <table class="table table-striped">
            <tr><td>Subtotal:</td><td><strong>NGN {{number_format($schedule->subTotal, 2)}}</strong></td></tr>
            <tr><td>Discount({{$schedule->discount}}%):</td><td><strong>NGN {{number_format($schedule->discountAmt, 2)}}</strong></td></tr>
            <tr><td>Commission({{$schedule->commission}}%):</td><td><strong>NGN {{number_format($schedule->commissionAmt, 2)}}</strong></td></tr>
            <tr><td>VAT(5%):</td><td><strong>NGN {{number_format((5/100)*$schedule->subTotal, 2)}}</strong></td></tr>
            <tr><td>GRAND TOTAL:</td><td><strong>NGN {{number_format($schedule->grandTotal, 2)}}</strong></td></tr>
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
                            <small class="text-muted"><em>{{$schedule->user->lastname}}, {{$schedule->user->firstname}}</em></small>
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