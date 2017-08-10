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
                    </td>
                </tr>


                <tr>
                    <td>

                        <div>
                            <hr />

                            <div>
                                <p style="font-family: sans-serif; font-size: 20px; font-weight: bold; color: darkblue">Please Review Airtime for Order No. <br>{{$schedule->order_no}}  </p>
                            </div>

                            <div style="float: right; margin: 5px 30px">
                                <table border="0" cellspacing="0" cellpadding="5">
                                    {{--<tr>--}}
                                        {{--<td style="text-align: right"><div style="color: black;">Number of Broadcast: </div></td>--}}
                                        {{--<td><strong>{{$schedule->broadcasts}}</strong></td>--}}
                                    {{--</tr>--}}
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
        <p style="font-family: sans-serif; font-size: 8">This is an automated system email. Please do not reply to this email.</p>
        <p align="center"><sup>&copy;</sup>{{date('Y')}} - <a href="http://www.rockcityfmradio.com" _target="blank">Rockcity</a> </p>
    </div>

</div>

</body>
</html>
