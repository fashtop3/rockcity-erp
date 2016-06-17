<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>

<head>

</head>

<body style='padding: 0px; margin: 0px; font-family: "Verdana", "Helvetica Neue", Helvetica, Arial, sans-serif;'>

{{--{{$schedule}}--}}
<div class="container" style="width: 1000px; margin: 5px auto; background: white; border: 1px solid orangered">

    {{--<div align="center" style="background-color: orangered; padding: 20px;">--}}
        {{--<div style="float: right; padding: 3px; margin-right: 3px">--}}
            {{--Date: <span style="color:white;">date here</span>; Time: <span style="color:white;">time here</span>--}}
        {{--</div>--}}
        {{--<div style="clear: both"></div>--}}
        {{--<h3 class="header" style="margin: 10px; text-decoration: underline; color: white; ">Airtime Order has been submitted</h3>--}}
    {{--</div>--}}


    <div style='padding: 20px 40px; font: 14px "Verdana", "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 1.6;'>

        <div style="margin: 20px 0 5px 0">
            {{--<h3 style="padding: 0; margin: 0; color: orangered">TASKS</h3>--}}
            <hr style="border:1px solid orangered;" />

            {{--generated: lightgrey--}}
            {{--validated: gold--}}
            {{--recommended: Orange--}}
            {{--approved: lightgreen--}}
            {{--disapproved: RED--}}
            {{--programme: paleturquoise--}}
            <table border="0" width="100%" bgColor="{{$schedule->bg_colour}}" cellspacing="0" style="padding: 5px; margin: 3px;">
                <tr>
                    <td>
                        <div style="color: #033769"><strong>Client:</strong> <span>{{$schedule->client->name}}</span> </div>
                        <div style="color: #033769"><strong>Email:</strong> <span>{{$schedule->client->email}}</span></div>
                        {{--@if($schedule->scheduleAlert->approved == 1)--}}
                            {{--<div style="color: #033769"><strong>Approved:</strong> <span style="color: green">Yes</span></div> <br />--}}
                            {{--<div style="color: black">Airtime Approved By: <span style="color: green">N43,999</span> </div>--}}
                            {{--<div style="color: black">Time Of Approval: <span style="color: green">N43,999</span> </div>--}}
                        {{--@else--}}
                            {{--<div style="color: #033769"><strong>Approved:</strong> <span style="color: red">No</span></div> <br />--}}
                        {{--@endif--}}
                    </td>
                </tr>


                <tr>
                    <td>

                        <div>
                            <hr />



                            <div style="margin: 5px;">
                                @foreach ($schedule->subscriptions as $subscription)
                                    <table border="1" style="margin: 5px 0px" cellpadding="5" cellspacing="0" width="100%">
                                        <tr style="">
                                            <td style="width: 40%" valign="top">
                                                <strong>Product:</strong>
                                                {{$subscription->product->name}}
                                            </td>
                                            <td>
                                                <strong>Number of Broadcasts:</strong> {{count($subscription->details)}}
                                            </td>
                                            <td>
                                                <strong>Product Subtotal:</strong> <span style="text-decoration: underline">N{{number_format($subscription->totalAmount, 2)}}</span>
                                            </td>
                                            <td>
                                                <strong>Subcharge Total:</strong> <span style="text-decoration: underline">N{{number_format($subscription->totalSubChargePrice, 2)}}</span>
                                            </td>
                                        </tr>
                                    </table>
                                @endforeach
                            </div>


                            <div style="float: right; margin: 5px 30px">
                                <table border="0" cellspacing="0" cellpadding="5">
                                    <tr>
                                        <td style="text-align: right"><div style="color: black;">Number of Broadcast: </div></td>
                                        <td><strong>{{$schedule->broadcasts}}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: right"><div style="color: black">Total Amount: </div></td>
                                        <td><strong>N{{number_format($schedule->subTotal, 2)}}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: right"><div style="color: black">Commission: </div></td>
                                        <td><strong>N{{number_format($schedule->commissionAmt, 2)}}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: right"><div style="color: black">VAT: </div></td>
                                        <td><strong>N{{number_format((5/100)*$schedule->subTotal, 2)}}</strong></td>
                                    </tr>
                                    <tr style="font-weight: bold">
                                        <td style="text-align: right"><div style="color: black">Grand Total: </div></td>
                                        <td><span style="text-decoration: underline">N{{number_format($schedule->grandTotal, 2)}}</span></td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: right"><div style="color: black">Mode Of Payment: </div></td>
                                        <td><span>Cash</span></td>
                                    </tr>
                                </table>
                            </div>

                            <div style="clear: both"></div>

                            <div><p>Please Click <a href="http://{{$_SERVER['SERVER_NAME']}}/#/app/airtime/{{$schedule->id}}" target="_blank">Here</a> to view Order!</p></div>

                        </div>

                    </td>
                </tr>
            </table>

        </div>

    </div>

    <div class="footer" style="color: white; padding: 1px; background-color: orangered;">
        <p align="center"><sup>&copy;</sup>{{date('Y')}} - <a href="http://wwww.rockcityfmradio.com" _target="blank">Rockcity</a> </p>
    </div>

</div>

</body>
</html>
