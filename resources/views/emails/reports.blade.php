<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="format-detection" content="telephone=no" /> <!-- disable auto telephone linking in iOS -->

    <style type="text/css">
        
    </style>

</head>

<body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style='font-family: "Verdana", "Helvetica Neue", Helvetica, Arial, sans-serif; background-color: #E1E1E1;'>

<div class="container" style="width: 1000px; margin: 5px auto; background: white;">

    <div align="center" style="background-color: orangered; padding: 20px;">
        <div style="float: right; padding: 3px; margin-right: 3px">
            Date: <span style="color:white;">{{$report->created_at->format('Y-m-d H:i:s')}}</span>; ({{$report->created_at->diffForHumans()}})
        </div>
        <div style="clear: both"></div>
        <h3 class="header" style="margin: 10px; text-decoration: underline; color: white; ">Report from Rockcity Platform</h3>
    </div>

    <em style="float: right; margin: 5px; text-decoration: underline">Report Id: {{$report->id}}</em>
    <br />

    <div style="clear:both;"></div>

    <div style="margin-top: 3px; width: 300px">
        <h5 style="margin: 0 0 0 3px; padding: 0; color: orangered">STAFF DETAILS</h5>
        <hr style="border:1px solid lightgrey" />
        <ul style='list-style: none; line-height: 1.5; font-family: "Helvetica Neue Light", "Lucida Grande", "Calibri", "Arial", sans-serif'>
            <li>Name: <span style="color:grey; float: right">{{$report->user->getFullName()}}</span></li>
            <li>Email: <span style="color:grey; float: right">{{$report->user->email}}</span></li>
        </ul>
    </div>
    <br />
    <hr style="border:1px solid lightgrey ;">
    <div class="message" style='padding: 20px 40px; font: 14px "Verdana", "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 1.6;'>

        {{--start tasks--}}
        <div style="margin: 20px 0 5px 0">
            <h3 style="padding: 0; margin: 0; color: orangered">TASKS</h3>
            <hr style="border:1px solid orangered;" />

            @foreach($report->tasks as $task)
                <div style="padding: 5px; margin: 3px; border: 1px solid gainsboro">
                    <div style="color: #033769">Task: <span style="color: green">{{ ++$taskCount }}</span></div>

                    @if($task->completed == 1)
                        <div style="color: #033769">Competed: <span style="color: green">Yes</span></div> <br />
                    @else
                        <div style="color: #033769">Competed: <span style="color: red">No</span></div> <br />
                    @endif

                    <div style="margin: 10px; padding: 5px;">
                        {!! $task->htmlText !!}
                    </div>
                </div>
            @endforeach
        </div>
        {{--end: tasks--}}

        {{--start: challenges--}}

        <div style="margin: 20px 0 5px 0">
            <h3 style="padding: 0; margin: 0; color: orangered">CHALLENGES</h3>
            <hr style="border:1px solid orangered;" />

            @foreach($report->challenges as $challenge)
                <div style="padding: 5px; margin: 3px; border: 1px solid gainsboro">
                    <div style="color: #033769">Challenge: <span style="color: green">{{++$challengeCount}}</span></div> <br />
                    <div style="margin: 10px; padding: 5px;">
                        {!! $challenge->htmlText !!}
                    </div>
                </div>
            @endforeach
        </div>
        {{--end: challenges--}}

        {{--start: Remittances--}}
        <div style="margin: 20px 0 5px 0">
            <h3 style="padding: 0; margin: 0; color: orangered">REMITTANCES</h3>
            <hr style="border:1px solid orangered;" />

            @foreach($report->remittances as $remittance)
                <div style="padding: 5px; margin: 3px; border: 1px solid gainsboro">
                    <table>
                        <tr><td style="text-align: right; background-color: lightgrey"><div style="color: #033769">Target: </div></td>   <td><span style="color: green">{{$remittance->target()->get()->first()->name}}</span></td></tr>
                        <tr><td style="text-align: right; background-color: lightgrey"><div style="color: #033769">Client Name: </div></td>   <td><span style="color: green">{{$remittance->client}}</span></td></tr>
                        <tr><td style="text-align: right; background-color: lightgrey"><div style="color: #033769">Amount: </div></td>   <td><span style="color: green">{{$remittance->amount}}</span></td></tr>
                    </table>
                </div>
            @endforeach
        </div>
        {{--end: remittances--}}

    </div>

    <div class="footer" style="color: white; padding: 1px; background-color: orangered;">
        <p align="center"><sup>&copy;</sup>{{date('Y')}} - <a href="http://wwww.rockcityfmradio.com" _target="blank">Rockcity</a> </p>
    </div>
</div>

</body>
</html>
