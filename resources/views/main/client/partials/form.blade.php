
<fieldset>
    <div class="form-group">
        <label for="name" class="col-sm-3 control-label">Client's Name <abbr class="text-danger">*</abbr></label>
        <div class="col-sm-7" ng-class="{'has-error': clientForm.name.$error.required && !clientForm.name.$pristine}">
            <input type="text" autocomplete="off"  class="form-control" id="name" value="{{ old('name', @$client->name) }}" name="name" placeholder="Enter Client's Name" required/>
            {{--<span ng-show="!clientForm.name.$pristine &amp;&amp; clientForm.name.$error.required" class="text-danger">This field is required</span>--}}
            {{--<span ng-show="!clientForm.name.$pristine &amp;&amp; clientForm.name.$error.pattern" class="text-danger">This field must be a valid name</span>--}}
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">

        <label for="name" class="col-sm-3 control-label">Street No. <abbr class="text-danger">*</abbr></label>
        <div class="col-sm-7">
            <input type="text" autocomplete="off" class="form-control" id="street_no" value="{{ old('street_no', @$client->street_no) }}" name="street_no" placeholder="Enter Street number" required/>
            {{--<span ng-show="!clientForm.street_no.$pristine &amp;&amp; clientForm.street_no.$error.required" class="text-danger">This field is required</span>--}}
            {{--<span ng-show="!clientForm.street_no.$pristine &amp;&amp; clientForm.street_no.$error.pattern" class="text-danger">This field must be a valid street number</span>--}}
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">

        <label for="name" class="col-sm-3 control-label">Street Name <abbr class="text-danger">*</abbr></label>
        <div class="col-sm-7">
            <input type="text" autocomplete="off" class="form-control" id="street_name" name="street_name" value="{{ old('street_name', @$client->street_name) }}" placeholder="Enter Street name" required/>
            {{--<span ng-show="!clientForm.street_name.$pristine &amp;&amp; clientForm.street_name.$error.required" class="text-danger">This field is required</span>--}}
            {{--<span ng-show="!clientForm.street_name.$pristine &amp;&amp; clientForm.street_name.$error.pattern" class="text-danger">This field must be a valid street name</span>--}}
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="name" class="col-sm-3 control-label">Town <abbr class="text-danger">*</abbr></label>
        <div class="col-sm-7">
            <input type="text" autocomplete="off" class="form-control" id="town" name="town" value="{{ old('town', @$client->town) }}" placeholder="Enter Town" required/>
            {{--<span ng-show="!clientForm.town.$pristine &amp;&amp; clientForm.town.$error.required" class="text-danger">This field is required</span>--}}
            {{--<span ng-show="!clientForm.town.$pristine &amp;&amp; clientForm.town.$error.pattern" class="text-danger">This field must be a valid town</span>--}}
        </div>
    </div>
</fieldset>


<div class="row">
    <p style="padding: 20px;"></p>
</div>

<h4>Contact Person's Details</h4>
<hr>

<fieldset>
    <div class="form-group">
        <label for="title" class="col-sm-3 control-label">Title <abbr class="text-danger">*</abbr></label>
        <div class="col-sm-7" >
            <select name="title" id="title" class="form-control" required>
                <option value="">--choose--</option>
                <option {{ @$client->title == 'Miss'? 'selected':"" }} value="Miss">Miss.</option>
                <option {{ @$client->title == 'Mr'? 'selected':"" }} value="Mr">Mr.</option>
                <option {{ @$client->title == 'Mrs'? 'selected':"" }} value="Mrs">Mrs.</option>
                <option {{ @$client->title == 'Chief'? 'selected':"" }} value="Chief">Chief.</option>
                <option {{ @$client->title == 'Pastor'? 'selected':"" }} value="Pastor">Pastor.</option>
                <option {{ @$client->title == 'Revd'? 'selected':"" }} value="Revd">Revd.</option>
                <option {{ @$client->title == 'Bishop'? 'selected':"" }} value="Bishop">Bishop.</option>
                <option {{ @$client->title == 'Imam'? 'selected':"" }} value="Imam">Imam.</option>
                <option {{ @$client->title == 'Dr'? 'selected':"" }} value="Dr">Dr.</option>
                <option {{ @$client->title == 'Prof'? 'selected':"" }} value="Prof">Prof.</option>
                <option {{ @$client->title == 'Alhaji'? 'selected':"" }} value="Alhaji">Alhaji.</option>
                <option {{ @$client->title == 'Alhaja'? 'selected':"" }} value="Alhaja">Alhaja.</option>
            </select>
            {{--<span ng-show="!clientForm.title.$pristine &amp;&amp; clientForm.title.$error.required" class="text-danger">This field is required</span>--}}
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="firstName" class="col-sm-3 control-label">First Name <abbr class="text-danger">*</abbr></label>
        <div class="col-sm-7">
            <input type="text" autocomplete="off" class="form-control" value="{{ old('firstname', @$client->firstname) }}" name="firstname" id="firstname" placeholder="Enter First Name" required/>
            {{--<span ng-show="!clientForm.firstname.$pristine &amp;&amp; clientForm.firstname.$error.required" class="text-danger">This field is required</span>--}}
            {{--<span ng-show="!clientForm.firstname.$pristine &amp;&amp; clientForm.firstname.$error.pattern" class="text-danger">This field must be a valid name</span>--}}
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="lastName" class="col-sm-3 control-label">Last Name <abbr class="text-danger">*</abbr></label>
        <div class="col-sm-7">
            <input type="text" autocomplete="off" class="form-control" name="lastname" value="{{ old('lastname', @$client->lastname) }}" id="lastname" placeholder="Enter Last Name" required/>
            {{--<span ng-show="!clientForm.lastname.$pristine &amp;&amp; clientForm.lastname.$error.required" class="text-danger">This field is required</span>--}}
            {{--<span ng-show="!clientForm.lastname.$pristine &amp;&amp; clientForm.lastname.$error.pattern" class="text-danger">This field must be a valid name</span>--}}
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="mobile" class="col-sm-3 control-label">Phone Number <abbr class="text-danger">*</abbr></label>
        <div class="col-sm-7">
            <input type="text" autocomplete="off" class="form-control col-sm-5" name="mobile" value="{{ old('mobile', @$client->mobile) }}" id="mobile" placeholder="Enter Phone Number" required/>
            {{--<span ng-show="!clientForm.mobile.$pristine &amp;&amp; clientForm.mobile.$error.required" class="text-danger">This field is required</span>--}}
            {{--<span ng-show="!clientForm.mobile.$pristine &amp;&amp; clientForm.mobile.$error.pattern" class="text-danger">This field must be a valid mobile number</span>--}}
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="email" class="control-label col-sm-3">Email</label>
        <div class="col-sm-7">
            <input type="text" autocomplete="off"  class="form-control col-sm-9" name="email" value="{{ old('email', @$client->email) }}" id="email" placeholder="Enter email"/>
            {{--<span ng-show="!clientForm.email.$pristine &amp;&amp; clientForm.email.$error.pattern" class="text-danger">This field must be a valid email</span>--}}
        </div>
    </div>
</fieldset>
