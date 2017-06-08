<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default">
            <!--<form class="form-horizontal" role="form" novalidate>-->

            <div class="panel-body">

                <p class="text-info">ASPECT OF PERFORMANCE <small>(To be completed by the supervisor)</small>  </p>
                <p>Job Assessment/General ability <small>(Assess objectively how the staff has performed his/her set tasks)</small></p>

                <fieldset>
                    <p><strong>Personal Attributes</strong></p>
                    <em>A=10, B=8, C=6, D=4, E=2, F=1</em>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <tr>
                                        <th>S/N</th>
                                        <th></th>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                        <th>D</th>
                                        <th>E</th>
                                        <th>F</th>
                                    </tr>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><Strong>Integrity</Strong><br> <em>Maintains high personal standards of integrity</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[integrity]" {{ old('attributes.integrity', @$supervisor->attributes['integrity']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[integrity]" {{ old('attributes.integrity', @$supervisor->attributes['integrity']) == 8? "checked=''":"" }} value="8"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[integrity]" {{ old('attributes.integrity', @$supervisor->attributes['integrity']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[integrity]" {{ old('attributes.integrity', @$supervisor->attributes['integrity']) == 4? "checked=''":"" }} value="4"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[integrity]" {{ old('attributes.integrity', @$supervisor->attributes['integrity']) == 2? "checked=''":"" }} value="2"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[integrity]" {{ old('attributes.integrity', @$supervisor->attributes['integrity']) == 1? "checked=''":"" }} value="1"  />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td><Strong>Interpersonal Relationship</Strong><br> <em>Tactfully establishes and maintains strong/benefitial relationship with others</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[relationship]" {{ old('attributes.relationship', @$supervisor->attributes['relationship']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[relationship]" {{ old('attributes.relationship', @$supervisor->attributes['relationship']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[relationship]" {{ old('attributes.relationship', @$supervisor->attributes['relationship']) == 6? "checked=''":"" }} value="6" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[relationship]" {{ old('attributes.relationship', @$supervisor->attributes['relationship']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[relationship]" {{ old('attributes.relationship', @$supervisor->attributes['relationship']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[relationship]" {{ old('attributes.relationship', @$supervisor->attributes['relationship']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td><Strong>Knowledge of job</Strong><br> <em>Understand what his/her job entails, works effectively and efficiently</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[knowledge]" {{ old('attributes.knowledge', @$supervisor->attributes['knowledge']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[knowledge]" {{ old('attributes.knowledge', @$supervisor->attributes['knowledge']) == 8? "checked=''":"" }}  value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[knowledge]" {{ old('attributes.knowledge', @$supervisor->attributes['knowledge']) == 6? "checked=''":"" }}  value="6" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[knowledge]" {{ old('attributes.knowledge', @$supervisor->attributes['knowledge']) == 4? "checked=''":"" }}  value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[knowledge]" {{ old('attributes.knowledge', @$supervisor->attributes['knowledge']) == 2? "checked=''":"" }}  value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[knowledge]" {{ old('attributes.knowledge', @$supervisor->attributes['knowledge']) == 1? "checked=''":"" }}  value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td><Strong>Communication</Strong><br> <em>Approachable, open to all and communicates effectively</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[communication]" {{ old('attributes.communication', @$supervisor->attributes['communication']) == 10? "checked=''":"" }}  value="10"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[communication]" {{ old('attributes.communication', @$supervisor->attributes['communication']) == 8? "checked=''":"" }} value="8"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[communication]" {{ old('attributes.communication', @$supervisor->attributes['communication']) == 6? "checked=''":"" }} value="6" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[communication]" {{ old('attributes.communication', @$supervisor->attributes['communication']) == 4? "checked=''":"" }} value="4"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[communication]" {{ old('attributes.communication', @$supervisor->attributes['communication']) == 2? "checked=''":"" }} value="2"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[communication]" {{ old('attributes.communication', @$supervisor->attributes['communication']) == 1? "checked=''":"" }} value="1"  />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td><Strong>Initiative</Strong><br> <em>Promptly take action to resolve problems</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[initiative]" {{ old('attributes.initiative', @$supervisor->attributes['initiative']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[initiative]" {{ old('attributes.initiative', @$supervisor->attributes['initiative']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[initiative]" {{ old('attributes.initiative', @$supervisor->attributes['initiative']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[initiative]" {{ old('attributes.initiative', @$supervisor->attributes['initiative']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[initiative]" {{ old('attributes.initiative', @$supervisor->attributes['initiative']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[initiative]" {{ old('attributes.initiative', @$supervisor->attributes['initiative']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td><Strong>Professionalism</Strong><br> <em>Applies professional/technical/administrative or any other acquired knowledge</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[professionalism]" {{ old('attributes.professionalism', @$supervisor->attributes['professionalism']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[professionalism]" {{ old('attributes.professionalism', @$supervisor->attributes['professionalism']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[professionalism]" {{ old('attributes.professionalism', @$supervisor->attributes['professionalism']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[professionalism]" {{ old('attributes.professionalism', @$supervisor->attributes['professionalism']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[professionalism]" {{ old('attributes.professionalism', @$supervisor->attributes['professionalism']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[professionalism]" {{ old('attributes.professionalism', @$supervisor->attributes['professionalism']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td><Strong>Confidentiality</Strong><br> <em>Handles all business information in a professional and confidential manner</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[confidentiality]" {{ old('attributes.confidentiality', @$supervisor->attributes['confidentiality']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[confidentiality]" {{ old('attributes.confidentiality', @$supervisor->attributes['confidentiality']) == 6? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[confidentiality]" {{ old('attributes.confidentiality', @$supervisor->attributes['confidentiality']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[confidentiality]" {{ old('attributes.confidentiality', @$supervisor->attributes['confidentiality']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[confidentiality]" {{ old('attributes.confidentiality', @$supervisor->attributes['confidentiality']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[confidentiality]" {{ old('attributes.confidentiality', @$supervisor->attributes['confidentiality']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td><Strong>Strategic Thinking</Strong><br> <em>Contributes to the business success through new ideas or improved services</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[thinking]" {{ old('attributes.thinking', @$supervisor->attributes['thinking']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[thinking]" {{ old('attributes.thinking', @$supervisor->attributes['thinking']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[thinking]" {{ old('attributes.thinking', @$supervisor->attributes['thinking']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[thinking]" {{ old('attributes.thinking', @$supervisor->attributes['thinking']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[thinking]" {{ old('attributes.thinking', @$supervisor->attributes['thinking']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[thinking]" {{ old('attributes.thinking', @$supervisor->attributes['thinking']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td><Strong>Creativity and Productivity</Strong><br> <em>Regularly introduces new concept/ideas and productive</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[creativity]" {{ old('attributes.creativity', @$supervisor->attributes['creativity']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[creativity]" {{ old('attributes.creativity', @$supervisor->attributes['creativity']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[creativity]" {{ old('attributes.creativity', @$supervisor->attributes['creativity']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[creativity]" {{ old('attributes.creativity', @$supervisor->attributes['creativity']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[creativity]" {{ old('attributes.creativity', @$supervisor->attributes['creativity']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[creativity]" {{ old('attributes.creativity', @$supervisor->attributes['creativity']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td><Strong>Team Spirit</Strong><br> <em>Works efficiently with team members</em></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[team]" {{ old('attributes.team', @$supervisor->attributes['team']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[team]" {{ old('attributes.team', @$supervisor->attributes['team']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[team]" {{ old('attributes.team', @$supervisor->attributes['team']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[team]" {{ old('attributes.team', @$supervisor->attributes['team']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[team]" {{ old('attributes.team', @$supervisor->attributes['team']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="attributes[team]" {{ old('attributes.team', @$supervisor->attributes['team']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><strong>TOTAL</strong></td>
                                        <td>{{ @$supervisor->supervisor->attributes['total']['a'] }}</td>
                                        <td>{{ @$supervisor->supervisor->attributes['total']['b'] }}</td>
                                        <td>{{ @$supervisor->supervisor->attributes['total']['c'] }}</td>
                                        <td>{{ @$supervisor->supervisor->attributes['total']['d'] }}</td>
                                        <td>{{ @$supervisor->supervisor->attributes['total']['e'] }}</td>
                                        <td>{{ @$supervisor->supervisor->attributes['total']['f'] }}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><strong>AVERAGE SCORE(%)</strong></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </fieldset>


                <fieldset>
                    <p><strong>Please justify your gradings</strong></p>
                    <div class="panel">
                        <div class="panel-body">
                            <textarea rows="2" name="attributes[justify]" class="form-control note-editor note-editor-margin">{{ old('attributes.justify', @$supervisor->attributes['justify']) }}</textarea>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <p><strong>Work Habits</strong></p>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <tr>
                                        <th>S/N</th>
                                        <th></th>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                        <th>D</th>
                                        <th>E</th>
                                        <th>F</th>
                                    </tr>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><strong>Dependability</strong><br> Ability to work without close supervision, inspection or compulsion</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[dependability]" {{ old('habit.dependability', @$supervisor->habit['dependability']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[dependability]" {{ old('habit.dependability', @$supervisor->habit['dependability']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[dependability]" {{ old('habit.dependability', @$supervisor->habit['dependability']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[dependability]" {{ old('habit.dependability', @$supervisor->habit['dependability']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[dependability]" {{ old('habit.dependability', @$supervisor->habit['dependability']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[dependability]" {{ old('habit.dependability', @$supervisor->habit['dependability']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Loyalty and Dedication</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[loyalty]" {{ old('habit.loyalty', @$supervisor->habit['loyalty']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[loyalty]" {{ old('habit.loyalty', @$supervisor->habit['loyalty']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[loyalty]" {{ old('habit.loyalty', @$supervisor->habit['loyalty']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[loyalty]" {{ old('habit.loyalty', @$supervisor->habit['loyalty']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[loyalty]" {{ old('habit.loyalty', @$supervisor->habit['loyalty']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[loyalty]" {{ old('habit.loyalty', @$supervisor->habit['loyalty']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Honesty</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[honesty]" {{ old('habit.honesty', @$supervisor->habit['honesty']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[honesty]" {{ old('habit.honesty', @$supervisor->habit['honesty']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[honesty]" {{ old('habit.honesty', @$supervisor->habit['honesty']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[honesty]" {{ old('habit.honesty', @$supervisor->habit['honesty']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[honesty]" {{ old('habit.honesty', @$supervisor->habit['honesty']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[honesty]" {{ old('habit.honesty', @$supervisor->habit['honesty']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Reliability</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[reliability]" {{ old('habit.reliability', @$supervisor->habit['reliability']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[reliability]" {{ old('habit.reliability', @$supervisor->habit['reliability']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[reliability]" {{ old('habit.reliability', @$supervisor->habit['reliability']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[reliability]" {{ old('habit.reliability', @$supervisor->habit['reliability']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[reliability]" {{ old('habit.reliability', @$supervisor->habit['reliability']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[reliability]" {{ old('habit.reliability', @$supervisor->habit['reliability']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Sense of responsibility</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[sense]" {{ old('habit.sense', @$supervisor->habit['sense']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[sense]" {{ old('habit.sense', @$supervisor->habit['sense']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[sense]" {{ old('habit.sense', @$supervisor->habit['sense']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[sense]" {{ old('habit.sense', @$supervisor->habit['sense']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[sense]" {{ old('habit.sense', @$supervisor->habit['sense']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="habit[sense]" {{ old('habit.sense', @$supervisor->habit['sense']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><strong>TOTAL</strong></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><strong>AVERAGE SCORE(%)</strong></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <p><strong>Please justify your gradings</strong></p>
                    <div class="panel">
                        <div class="panel-body">
                            <textarea rows="2" name="habit[justify]" class="form-control note-editor note-editor-margin">{{ old('habit.justify', @$supervisor->habit['justify']) }}</textarea>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <p><strong>Sanctions</strong><br>Has any disciplinary action been taken against th staff during the period covered by this report? YES/NO. if yes give details of sanctions</p>
                    <div class="panel">
                        <div class="panel-body">
                            <textarea  name="habit[sanctions]" rows="3" class="form-control note-editor note-editor-margin">{{ old('habit.sanctions', @$supervisor->habit['sanctions']) }}</textarea>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <p><strong>Rewards</strong><br>Has the staff received any special commendation (Written) during the year for outstanding performance? if YES, give details:</p>
                    <div class="panel">
                        <div class="panel-body">
                            <textarea name="habit[rewards]" rows="3" class="form-control note-editor note-editor-margin">{{ old('habit.rewards', @$supervisor->habit['rewards']) }}</textarea>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <p><strong>Leadership attainment</strong></p>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <tr>
                                        <th>S/N</th>
                                        <th></th>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                        <th>D</th>
                                        <th>E</th>
                                        <th>F</th>
                                    </tr>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Punctuality and attendance at work</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[punctuality]" {{ old('leadership.punctuality', @$supervisor->leadership['punctuality']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[punctuality]" {{ old('leadership.punctuality', @$supervisor->leadership['punctuality']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[punctuality]" {{ old('leadership.punctuality', @$supervisor->leadership['punctuality']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[punctuality]" {{ old('leadership.punctuality', @$supervisor->leadership['punctuality']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[punctuality]" {{ old('leadership.punctuality', @$supervisor->leadership['punctuality']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[punctuality]" {{ old('leadership.punctuality', @$supervisor->leadership['punctuality']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Drive and Decisiveness</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[drive]" {{ old('leadership.drive', @$supervisor->leadership['drive']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[drive]" {{ old('leadership.drive', @$supervisor->leadership['drive']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[drive]" {{ old('leadership.drive', @$supervisor->leadership['drive']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[drive]" {{ old('leadership.drive', @$supervisor->leadership['drive']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[drive]" {{ old('leadership.drive', @$supervisor->leadership['drive']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[drive]" {{ old('leadership.drive', @$supervisor->leadership['drive']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Planning Ability</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[ability]" {{ old('leadership.ability', @$supervisor->leadership['ability']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[ability]" {{ old('leadership.ability', @$supervisor->leadership['ability']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[ability]" {{ old('leadership.ability', @$supervisor->leadership['ability']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[ability]" {{ old('leadership.ability', @$supervisor->leadership['ability']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[ability]" {{ old('leadership.ability', @$supervisor->leadership['ability']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[ability]" {{ old('leadership.ability', @$supervisor->leadership['ability']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Does he/she show good example in terms of punctuality, efficiency and high degree of responsibility in whatever he/she does?</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[example]" {{ old('leadership.example', @$supervisor->leadership['example']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[example]" {{ old('leadership.example', @$supervisor->leadership['example']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[example]" {{ old('leadership.example', @$supervisor->leadership['example']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[example]" {{ old('leadership.example', @$supervisor->leadership['example']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[example]" {{ old('leadership.example', @$supervisor->leadership['example']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[example]" {{ old('leadership.example', @$supervisor->leadership['example']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Does he/she make suggestion for changes/adjust method/procedures that significantly contribute to his her work or that of his/her colleagues</td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[suggestion]" {{ old('leadership.suggestion', @$supervisor->leadership['suggestion']) == 10? "checked=''":"" }} value="10" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[suggestion]" {{ old('leadership.suggestion', @$supervisor->leadership['suggestion']) == 8? "checked=''":"" }} value="8" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[suggestion]" {{ old('leadership.suggestion', @$supervisor->leadership['suggestion']) == 6? "checked=''":"" }} value="6"  />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[suggestion]" {{ old('leadership.suggestion', @$supervisor->leadership['suggestion']) == 4? "checked=''":"" }} value="4" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[suggestion]" {{ old('leadership.suggestion', @$supervisor->leadership['suggestion']) == 2? "checked=''":"" }} value="2" />
                                                <span class="fa fa-check"></span></label></td>
                                        <td><label class="radio-inline c-radio">
                                                <input type="radio"   name="leadership[suggestion]" {{ old('leadership.suggestion', @$supervisor->leadership['suggestion']) == 1? "checked=''":"" }} value="1" />
                                                <span class="fa fa-check"></span></label></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><strong>TOTAL</strong></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><strong>AVERAGE SCORE(%)</strong></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <p><strong>Please justify your gradings</strong></p>
                    <div class="panel">
                        <div class="panel-body">
                            <textarea  rows="2" name="leadership[justify]" class="form-control note-editor note-editor-margin">{{ old('leadership.justify', @$supervisor->leadership['justify']) }}</textarea>
                        </div>
                    </div>
                </fieldset>

            </div> <!-- End page-body -->

    </div>
</div>
