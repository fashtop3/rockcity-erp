<h4 class="airtime-header">Review
    <br>
    <small>Review and confirm your order.</small>
</h4>
<section class="wizard-body">
    <div id="confirmation" class="tab-pane" ng-class="{active:isSelected(4)}">

        <br />
        <br />

        <!-- Warinig-->
        <div class="row">
            <div class="col-sm-12">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-warning">
                        <span class="fa-stack">
                         <em class="fa fa-circle fa-stack-2x text-warning"></em>
                         <em class="fa fa-info fa-stack-1x fa-inverse text-white"></em>
                        </span>
                        Please review your order details carefully.</li>
                    <li class="list-group-item list-group-item-warning">
                        <span class="fa-stack">
                         <em class="fa fa-circle fa-stack-2x text-warning"></em>
                         <em class="fa fa-info fa-stack-1x fa-inverse text-white"></em>
                        </span>
                        Once order have been submitted, you can't modify it!</li>
                    <li class="list-group-item list-group-item-warning">
                        <span class="fa-stack">
                         <em class="fa fa-circle fa-stack-2x text-warning"></em>
                         <em class="fa fa-info fa-stack-1x fa-inverse text-white"></em>
                        </span>
                        Order submitted via this portal shall be processed and we will keep you informed about every step through your email address.</li>
                </ul>
            </div>
        </div>
        <br />

        <!-- client Info-->
        <div class="row">
            <div class="col-sm-12">
                <div class="list-group">
                    <li class="list-group-item">
                        <table class="wd-wide">
                            <tbody>
                            <tr>
                                <td class="wd-sm">
                                    <div class="ph">
                                        <h5 class="media-box-heading">Client</h5>
                                        <small class="text-info"><em id="client-name">@{{client.selected.name}}</em></small>
                                    </div>
                                    <br />
                                    <div class="ph">
                                        <h6 class="media-box-heading">Email</h6>
                                        <small class="text-danger" ><em id="client-email">@{{client.selected.email}}</em></small>
                                    </div>
                                    <div class="hidden-sm hidden-md hidden-lg"><br />
                                        <div class="ph">
                                            <h6 class="media-box-heading">Address</h6>
                                            <small class="text-muted"><em class="client-addr">@{{ client.selected.street_no +' '+ client.selected.street_name +', '+ client.selected.town }}</em></small>
                                        </div><br />
                                        <div class="ph">
                                            <h6 class="media-box-heading">Phone</h6>
                                            <small class="text-muted"><em class="client-phone">@{{client.selected.mobile}}</em></small>
                                        </div>
                                    </div>
                                </td>
                                <td class="wd-sm hidden-xs">
                                    <div class="ph">
                                        <h6 class="media-box-heading">Address</h6>
                                        <small class="text-muted"><em class="client-addr">@{{client.selected.street_no +' '+ client.selected.street_name +' '+ client.selected.town}}</em></small>

                                    </div><br />
                                    <div class="ph">
                                        <h6 class="media-box-heading">Phone</h6>
                                        <small class="text-muted"><em class="client-phone">@{{client.selected.mobile}}</em></small>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                </div>

                <!--<table>-->
                <!--<tr>-->
                <!--<td>CLIENT NAME</td>-->
                <!--<td></td>-->
                <!--</tr>-->
                <!--</table>-->
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <div class="list-group">

                    <li ng-if="cart.length" ng-repeat="item in cart track by $index">
                        <!-- START panel-->
                        <div id="product@{{item.id}}" class="panel panel-default">
                            <div ng-class="{'panel-heading-collapsed':false}" class="panel-heading">@{{item.name}}
                                <paneltool tool-collapse="tool-collapse"></paneltool>
                                <!--<paneltool tool-refresh="standard" tool-collapse="tool-collapse" tool-dismiss="tool-dismiss"></paneltool>-->
                            </div>
                            <div uib-collapse="product@{{item.id}}" class="panel-wrapper">
                                <div class="panel-body">
                                    <div ng-repeat="sub in item.subscriptions">
                                        <div class="list-group" ng-if="sub.broadcast && sub.broadcast > 0">
                                            <div class="list-group-item">
                                                <table class="wd-wide table-responsive">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="ph">
                                                                <span class="label label-info pull-right">@{{sub.period}}</span>
                                                                <h4 class="media-box-heading">BULK</h4>
                                                                <div class="text-muted text-inverse">
                                                                    <small>
                                                                        <b>Start: </b> @{{sub.bulk_start_date | date:'MMM d, y h:mm a'}}; &nbsp;&nbsp;
                                                                        <b>End: </b> @{{sub.bulk_end_date | date:'MMM d, y h:mm a'}}
                                                                    </small>
                                                                </div>
                                                                <div class="text-muted text-inverse">
                                                                    <small>
                                                                        <b>Bulk: </b> @{{sub.broadcast}}; &nbsp;&nbsp;
                                                                        <span ng-if="sub.duration"><b>Duration: </b> @{{sub.duration}}</span>
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="wd-sm">
                                                            <div class="ph">
                                                                <!--<p class="m0">Price</p>-->
                                                                <small class="m0 text-info">
                                                                    ₦@{{sub.amount | number:2}}</small>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="list-group" ng-if="!sub.broadcast">
                                            <div class="list-group-item">
                                                <table class="wd-wide table-responsive">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="ph">
                                                                <span class="label label-info pull-right">@{{sub.period}}</span>
                                                                <h4 class="media-box-heading">SLOT <small ng-if="sub.fixedSpot" class="text-muted">(Fixed)</small></h4>
                                                                <div class="text-muted text-inverse">
                                                                    <small>
                                                                        <b>Slot date: </b> @{{sub.slot_start_date | date:'MMM d, y'}}
                                                                        <b> -- </b> @{{sub.slot_end_date | date:'MMM d, y'}}
                                                                    </small>
                                                                </div>
                                                                <div class="text-muted text-inverse">
                                                                    <small><b>Programme: </b> @{{progStartTime(sub.period) | date:'h:mm a'}} - @{{progEndTime(sub.period) | date:'h:mm a'}}</small>
                                                                </div>
                                                                <div class="text-muted text-inverse"><small><b>Slot: </b> @{{sub.slots}}; &nbsp;&nbsp;
                                                                        <span ng-if="sub.duration"><b>Duration: </b> @{{sub.duration}}</span>
                                                                    </small></div>
                                                            </div><br />
                                                            <div class="table-responsive" ng-if="sub.schedule.length">
                                                                <table class="table table-bordered">
                                                                    <tr>
                                                                        <th>Date</th>
                                                                        <th>Slot</th>
                                                                        <th>Fixed</th>
                                                                        <th>Time</th>
                                                                    </tr>
                                                                    <tr ng-repeat="schedule in sub.schedule">
                                                                        <td>@{{schedule.date | date:'MMM d, y'}}</td>
                                                                        <td>@{{schedule.slot}}</td>
                                                                        <td>@{{schedule.tofix}}</td>
                                                                        <td ng-if="schedule.tofix > 0"><span class="text text-primary"><small ng-repeat="t in schedule.times">@{{t | date:'h:mm a'}}, </small></span></td>
                                                                        <td ng-if="!schedule.tofix || schedule.tofix == '0'"><span class="text text-primary"><small>@{{progStartTime(sub.period) | date:'h:mm a'}} - @{{progEndTime(sub.period) | date:'h:mm a'}} </small></span></td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </td>
                                                        <td class="wd-sm" valign="top">
                                                            <div class="ph">
                                                                <!--<p class="m0">Price</p>-->
                                                                <small class="m0 text-info">
                                                                    ₦@{{sub.amount | number:2}}</small>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
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
                                                <p class="m0 pull-right text-inverse"> ₦@{{calProductSubscription(cart.indexOf(item)) | number:2}}
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
                                        <h5 class="media-box-heading"><strong id="cartTotals"></strong></h5>
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
                                        <h5 class="media-box-heading text-muted" id="discount">Discount(@{{form.discount}}%):</h5>
                                    </div>
                                </td>
                                <td class="wd-sm">
                                    <div class="ph text-inverse text-right">
                                        <h5 class="media-box-heading"><strong id="dsctAmnt">NGN @{{dsctAmnt | number:2}}</strong></h5>
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
                                        <h5 class="media-box-heading text-muted" id="commission">Commission(@{{form.commission}}%):</h5>
                                    </div>
                                </td>
                                <td class="wd-sm">
                                    <div class="ph text-inverse text-right">
                                        <h5 class="media-box-heading "><strong id="commAmnt">NGN @{{commAmnt | number:2}}</strong></h5>
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
                                        <h5 class="media-box-heading"><strong id="vat">NGN @{{vat | number:2}}</strong></h5>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li class="list-group-item">
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
                                        <h5 class="media-box-heading"><strong id="totalWOComm">NGN @{{totalWOComm | number:2}}</strong></h5>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-sm-4 col-sm-push-4">
                                            <button class="btn btn-warning" ng-disabled="orderButton" type="submit">Place Order</button>
                                        </div>
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

        <!-- Marketer in charge-->
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
                                        <small class="text-info"><em>Not Signed</em></small>
                                    </div>
                                </td>
                                <td class="wd-sm">
                                    <div class="ph">
                                        <h6 class="media-box-heading" id="marketer-in-charge">Marketer in charge</h6>
                                        <small class="text-muted"><em>@{{marketer.selected.lastname+' '+marketer.selected.firstname }}</em></small>
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

                <!--<table>-->
                <!--<tr>-->
                <!--<td>CLIENT NAME</td>-->
                <!--<td></td>-->
                <!--</tr>-->
                <!--</table>-->
            </div>
        </div>

    </div>
</section>

<script src="/js/review.js"></script>
