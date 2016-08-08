@extends('pdf')

@section('content')
    <h4 class="text-center">AIRTIME ORDER</h4>
    <hr>

    <table class="table table-bordered">
        <tr>
            <td><p>Date: <span class="text-muted">{{$schedule->created_at}}</span></p></td>
            <td><p>Order No.: <span class="text-muted">{{$schedule->order_no}}</span></p></td>
        </tr>
    </table>
    <table class="table table-bordered">
        <tr>
            <td><p>Client Name: <span class="text-muted">{{$schedule->client->name}}</span></p></td>
            <td><p><em class="fa fa-home fa-lg"></em> <span class="text-muted">{{$schedule->client->street_name.' '.$schedule->client->street_no.', '.$schedule->client->town}}</span></p></td>
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
                                            <small class="text-muted text-inverse">
                                                <b>Start :</b> ({{$productSub['subscription']['bulk_start_date']}})
                                                <b>End :</b> ({{$productSub['subscription']['bulk_end_date']}}) <br />
                                                <b>Broadcast: </b> {{$productSub['subscription']['broadcast']}}
                                            </small>
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
                                            <small class="text-muted text-inverse">
                                                <b>Slot date :</b> {{$productSub['subscription']['slot_start_date']}}
                                                <b> -- </b> {{$productSub['subscription']['slot_end_date']}}
                                            </small><br />
                                            <small class="text-muted text-inverse">
                                                <b>Slot :</b> {{$productSub['subscription']['slots']}}
                                            </small>
                                        </div><br />
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
                                                <tr>
                                                    <td>{{$slotDetail->schedule[0]['date']}}</td>
                                                    <td>{{$slotDetail->schedule[0]['slot']}}</td>
                                                    <td>{{$slotDetail->schedule[0]['tofix']}}</td>
                                                    <td>
                                                        <span class="text text-primary">
                                                            @foreach($slotDetail->schedule[0]['times'] as $time)
                                                            <small>{{$time}}, </small>
                                                            @endforeach
                                                        </span>
                                                    </td>
                                                </tr>
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
        <tr><td width="80%"></td><td valign="bottom" width="20%"><p>Total: <strong>NGN {{ number_format($product->totals, 2)}}</strong></p></td></tr>
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
                            <h5 class="media-box-heading">Sales Agent Name/Signature</h5>
                            <small class="text-info"><em>Administrator</em></small>
                        </div>
                    </td>
                    <td class="wd-sm">
                        <div class="ph">
                            <h6 class="media-box-heading">Marketer in charge</h6>
                            <small class="text-muted"><em></em></small>
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