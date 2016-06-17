@extends('pdf')

@section('content')
    <h3 class="text-center">AIRTIME ORDER FORM</h3>
    <hr>

    <table class="table table-bordered">
        <tr>
            <td><p>Date: <span class="text-muted">{{$schedule->created_at}}</span></p></td>
            <td><p>Order No.: <span class="text-muted">{{$schedule->id}}</span></p></td>
        </tr>
    </table>
    <table class="table table-bordered">
        <tr>
            <td><p>Client Name: <span class="text-muted">{{$schedule->client->name}}</span></p></td>
            <td><p><em class="fa fa-home fa-lg"></em> <span class="text-muted">{{$schedule->client->address}}</span></p></td>
            <td><p><em class="fa fa-phone fa-lg"></em> <span class="text-muted">{{$schedule->client->mobile}}</span></p></td>
        </tr>
    </table>
    @foreach($schedule->subscriptions as $subscription)
    <table class="table table-bordered">
        <tr class="bg-info">
            <td><p>Product: <span class="text-danger"><strong>{{$subscription->product->name}}</strong></span></p></td>
            <td><p>Slots: <span class="text-muted"><strong>{{$subscription->detailsCount}}</strong></span></p></td>
        </tr>
        <tr>
            <td width="75%">
                <h4>Details</h4>
                <div>
                    <table class="table">
                        <tr class="bg-info">
                            <th></th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Duration</th>
                            <th>Amount</th>
                            <th>Subcharge</th>
                        </tr>
                        <tbody>
                        @foreach($subscription->details as $detail)
                            <tr>
                                @if($detail->broadcast)
                                    <td>
                                        <span class="label label-danger">Not Fixed</span>
                                    </td>
                                    <td>
                                        {{$detail->bulk_start_date}}
                                    </td>
                                    <td>
                                        {{$detail->bulk_end_date}}
                                    </td>
                                @else
                                    <td>
                                        <span class="label label-success">Fixed</span>
                                    </td>
                                    <td>
                                        {{$detail->trans_date}}
                                    </td>
                                    <td>
                                        ----
                                    </td>
                                @endif
                                    <td>
                                        {{$detail->duration ? $detail->duration : '----'}}
                                    </td>
                                    <td>
                                        {{number_format($detail->amount, 2)}}
                                    </td>
                                    <td>
                                        {{number_format($detail->subChargePrice, 2)}}
                                    </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </td>
            <td><p>Total: <strong>NGN {{ number_format($subscription->totalAmount, 2)}}</strong></p></td>
        </tr>
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