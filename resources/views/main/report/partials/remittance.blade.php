<div>
    <fieldset>
        <div class="form-group">
            <label for="target" class="control-label col-sm-4">Target Name</label>
            <div class="col-sm-7">
                <select id="marketer-data-select" name="target_id"  class="form-control data-select2" required>
                    <option></option>
                    @foreach(auth()->user()->myTargets()->get() as $target)
                        <option data-index="{{ $loop->index }}" value="{{ $target->id }}">{{ $target->name }} </option>
                    @endforeach
                </select>
            </div>
        </div>
    </fieldset>

    <fieldset>
        <div class="form-group">
            <label for="client" class="control-label col-sm-4">Client Name (Example - Mediareach, VLBC.)</label>
            <div class="col-sm-7">
                <input class=" form-control" type="text" required name="client" id="client" />
            </div>
        </div>
    </fieldset>

    <fieldset>
        <div class="form-group">
            <label for="amount" class="control-label col-sm-4">Amount (Enter value without commas(,))</label>
            <div class="col-sm-7">
                <input class="form-control" type="text" required name="amount" id="amount" />
            </div>
        </div>
    </fieldset>

       <div class="clearfix"></div>
    <hr class="row" />
</div>