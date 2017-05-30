<fieldset>
    <div class="form-group">
        <label for="vehicleName" class="control-label col-sm-4">Vehicle Name</label>
        <div class="col-sm-7">
            <input class=" form-control" autocomplete="off" type="text" name="name" value="{{ old('name', @$vehicle->name) }}" id="vehicleName" required />
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="reg" class="control-label col-sm-4">Registration. No.</label>
        <div class="col-sm-7">
            <input class=" form-control" autocomplete="off" type="text" name="reg" id="reg" value="{{ old('reg', @$vehicle->reg) }}" required />
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="engineNo" class="control-label col-sm-4">Engine No.</label>
        <div class="col-sm-7">
            <input class=" form-control" autocomplete="off" type="text" name="eng" id="engineNo" value="{{ old('eng', @$vehicle->eng) }}" required/>
        </div>
    </div>
</fieldset>

<fieldset>
    <div class="form-group">
        <label for="colour" class="control-label col-sm-4">Vehicle colour.</label>
        <div class="col-sm-7">
            <input class=" form-control" autocomplete="off" type="text" name="colour" id="colour" value="{{ old('colour', @$vehicle->colour) }}" required/>
        </div>
    </div>
</fieldset>