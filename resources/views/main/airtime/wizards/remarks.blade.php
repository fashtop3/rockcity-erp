<h4 class="airtime-header">Remarks
    <br>
    <small>Add remarks</small>
</h4>
<section class="wizard-body">
    <!-- START panel-->
    <div id="otherPanel" class="panel panel-default">
        <div class="panel-heading">Other Detail</div>
        <!-- .panel-wrapper is the element to be collapsed-->
        <div class="panel-wrapper">
            <div class="panel-body">
                <div class="row"><div class="col-xs-12 col-sm-12">
                        <!--<div class="form-group">-->
                        <!--<label for="remark" class="control-label">Remarks</label>-->
                        <!--<textarea class="form-control" name="remark" id="remark" cols="30" rows="5"></textarea>-->
                        <!--</div>-->
                        <div class="form-group">
                            <label for="discount" class="col-sm-3 control-label">Discount(%)</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="discount" id="discountCoupon" placeholder="Enter Coupon" />
                                <span class="text-danger">@{{discountError}}</span>
                            </div>
                        </div>
                        @if($user->isRoleAdmin() || $user->isRoleExecutiveDirector())
                            <div class="form-group">
                                <label for="commission" class="col-sm-3 control-label">Commission(%)</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="commissionCoupon" name="commission" placeholder="Enter Coupon" />
                                    <span class="text-danger">@{{commissionError}}</span>
                                </div>
                            </div>
                        @endif
                    </div></div>
                <div class="row">
                    <div class="col-md-8 col-md-push-2">
                        <!-- Other details-->
                        <div>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <span class="label label-purple pull-right">N@{{cartTotals | number:2}}</span>
                                    Initial Amount
                                </li>
                                <li class="list-group-item">
                                    <span class="label label-danger pull-right">N@{{vat | number:2}}</span>
                                    Vat(5%)
                                </li>
                                <li class="list-group-item">
                                    <span class="label label-warning pull-right">N@{{dsctAmnt | number:2}}</span>
                                    Discount Amount (@{{form.discount}}%)
                                </li>
                                <li class="list-group-item">
                                    <span class="label label-warning pull-right">N@{{commAmnt | number:2}}</span>
                                    Commission Amount(@{{form.commission}}%)
                                </li>
                                <li class="list-group-item">
                                    <span class="label label-success pull-right">N@{{totalWOComm | number:2}}</span>
                                    Total Without Commission
                                </li>
                                <li class="list-group-item">
                                    <span class="label label-inverse pull-right">N@{{totalWComm | number:2}}</span>
                                    Total With Commission
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <div class="checkbox">
                    <label for="terms">
                        <input type="checkbox" name="terms" id="terms" />
                        I agree to the <a href="/privacy" target="_blank">terms and conditions</a> of Boot Communications Ltd
                    </label>
                </div>
            </div>
        </div>
    </div>
    <!-- END panel-->
</section>

<script src="/js/coupon.js"></script>
