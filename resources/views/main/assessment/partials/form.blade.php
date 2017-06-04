@section('vendor-head')
        <!-- SELECT2-->
<link rel="stylesheet" href="/vendor/select2/dist/css/select2.css">
<link rel="stylesheet" href="/vendor/select2-bootstrap-theme/dist/select2-bootstrap.css">
<link rel="stylesheet" href="/css/jquery-ui.min.css">

<!-- datetimepicker-->
<script type="text/javascript" src="/bower_components/moment/min/moment.min.js"></script>
<script type="text/javascript" src="/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
<link rel="stylesheet" href="/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css" />
@endsection

<div class="alert alert-warning" ng-show="showTimeFrame" >
        Submission is opened from <strong>@{{config.starts | date:'MMM d, y'}} - @{{config.ends | date:'MMM d, y'}}</strong>
    </div>

    <div class="pull-right" permission="" permission-only="'supervisor'">
        <button title="Supervise" ng-disabled="!config.assessment.preview" ui-sref="app.admin.assessment-supervise({id: config.assessment.id})" type="button" class="btn btn-sm btn-danger">
            <em class="fa fa-commenting"> Supervise</em>
        </button>
        <br />
    </div>
    <div class="clearfix"></div>

    <h3>
        PART 1
    </h3>

        <div class="row">
            <div class="col-md-12">

                <div class="panel panel-default helicopter">
                    <!--<form novalidate ng-submit="submitAssessment()" name="assessFormPart1" class="form-horizontal" role="form">-->

                    <div class="panel-body">

                        <h4>PERSONAL RECORDS STAFF <small>(To be completed by the staff being assessed)</small></h4>
                        <hr>


                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Period Covered</label>
                                <div class="col-sm-7">
                                    <input type="text" autocomplete="off" value="{{ old('part_one.personal.period_covered') }}" class="form-control" name="part_one[personal][period_covered]"/>
                                </div>
                            </div>
                        </fieldset>


                        <fieldset>
                            <div class="form-group">

                                <label class="col-sm-3 control-label">Date of Confirmation</label>
                                <div class="col-sm-7">
                                    <p class="input-group picker">
                                        <input type="text" value="{{ old('part_one.personal.confirm_date') }}" name="part_one[personal][confirm_date]" class="form-control" />
                                    <span class="input-group-addon">
                                        <em class="fa fa-calendar"></em>
                                    </span>
                                    </p>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">

                                <label class="col-sm-3 control-label">Appraisal date</label>
                                <div class="col-sm-7">
                                    <p class="input-group picker">
                                        <input type="text" name="part_one[personal][appraisal_date]" value="{{ old('part_one.personal.appraisal_date') }}" class="form-control" />
                             <span class="input-group-addon">
                                        <em class="fa fa-calendar"></em>
                                    </span>
                                    </p>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Appraiser's Name/Job title</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" name="part_one[personal][appraisal_name]" value="{{ old('part_one.personal.appraisal_name') }}"/>
                                </div>
                            </div>
                        </fieldset>


                        <div class="row">
                            <p style="padding: 20px;"></p>
                        </div>

                        <h4>Qualifications held <small>(academic, professional or technical)</small></h4>
                        <hr>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">i.</label>
                                <div class="col-sm-5">
                                    <input type="text" name="part_one[qualifications][0][name]" value="{{ old('part_one.qualifications.0.name') }}" class="form-control" />
                                </div>
                                <div class="col-sm-3">
                                    <p class="input-group picker">
                                        <input type="text" required="" name="part_one[qualifications][0][date]" value="{{ old('part_one.qualifications.0.date') }}" class="form-control" />
                              <span class="input-group-addon">
                                     <em class="fa fa-calendar"></em>
                              </span>
                                    </p>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">ii.</label>
                                <div class="col-sm-5">
                                    <input type="text" name="part_one[qualifications][1][name]" value="{{ old('part_one.qualifications.1.name') }}" class="form-control" />
                                </div>
                                <div class="col-sm-3">
                                    <p class="input-group picker">
                                        <input type="text" name="part_one[qualifications][1][date]" value="{{ old('part_one.qualifications.1.date') }}" class="form-control" />
                              <span class="input-group-addon">
                                     <em class="fa fa-calendar"></em>
                              </span>
                                    </p>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">iii.</label>
                                <div class="col-sm-5">
                                    <input type="text" name="part_one[qualifications][2][name]" value="{{ old('part_one.qualifications.2.name') }}" class="form-control" />
                                </div>
                                <div class="col-sm-3">
                                    <p class="input-group picker">
                                        <input type="text" name="part_one[qualifications][2][date]" value="{{ old('part_one.qualifications.2.date') }}" class="form-control" />
                              <span class="input-group-addon">
                                     <em class="fa fa-calendar"></em>
                              </span>
                                    </p>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">iv.</label>
                                <div class="col-sm-5">
                                    <input type="text" name="part_one[qualifications][3][name]" value="{{ old('part_one.qualifications.3.name') }}" class="form-control" />
                                </div>
                                <div class="col-sm-3">
                                    <p class="input-group picker">
                                        <input type="text" name="part_one[qualifications][3][date]" value="{{ old('part_one.qualifications.3.date') }}" class="form-control" />
                              <span class="input-group-addon">
                                     <em class="fa fa-calendar"></em>
                              </span>
                                    </p>
                                </div>
                            </div>
                        </fieldset>

                    </div>
                    <!--</form>-->
                </div>
            </div>
        </div>

        <h3>
            PART 2
        </h3>
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <!--<form class="form-horizontal" name="assessFormPart2" role="form" novalidate>-->

                    <div class="panel-body">
                        <h4>REVIEW OF EMPLOYEE'S JOB GOAL</h4>
                        <hr>

                        <div><small>A. List job goals that were set previously before this assessment period</small></div> <br />

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">i.</label>
                                <div class="col-sm-7">
                                    <input type="text" name="part_two[review][0][text]" value="{{ old('part_two.review.0.text') }}" class="form-control" />
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" name="part_two[review][0][rate]">
                                        <option value="">--choose--</option>
                                        @for($i=1; $i<=100; $i++)
                                            <option value="{{ $i }}" {{ old('part_two.review.0.rate') == $i? 'selected=""':'' }} >{{ $i }}</option>
                                        @endfor
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">ii.</label>
                                <div class="col-sm-7">
                                    <input type="text" name="part_two[review][1][text]" value="{{ old('part_two.review.1.text') }}" class="form-control" />
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" name="part_two[review][1][rate]">
                                        <option value="">--choose--</option>
                                        @for($i=1; $i<=100; $i++)
                                            <option value="{{ $i }}" {{ old('part_two.review.1.rate') == $i? 'selected=""':'' }}>{{ $i }}</option>
                                        @endfor
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">iii.</label>
                                <div class="col-sm-7">
                                    <input type="text" name="part_two[review][2][text]" value="{{ old('part_two.review.2.text') }}" class="form-control" />
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" name="part_two[review][2][rate]">
                                        <option value="">--choose--</option>
                                        @for($i=1; $i<=100; $i++)
                                            <option value="{{ $i }}" {{ old('part_two.review.2.rate') == $i? 'selected=""':'' }}>{{ $i }}</option>
                                        @endfor
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">iv.</label>
                                <div class="col-sm-7">
                                    <input type="text" name="part_two[review][3][text]" value="{{ old('part_two.review.3.text') }}" class="form-control" />
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" name="part_two[review][3][rate]">
                                        <option value="">--choose--</option>
                                        @for($i=1; $i<=100; $i++)
                                            <option value="{{ $i }}" {{ old('part_two.review.3.rate') == $i? 'selected=""':'' }}>{{ $i }}</option>
                                        @endfor
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">v.</label>
                                <div class="col-sm-7">
                                    <input type="text" name="part_two[review][4][text]" value="{{ old('part_two.review.4.text') }}" class="form-control" />
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" name="part_two[review][4][rate]">
                                        <option value="">--choose--</option>
                                        @for($i=1; $i<=100; $i++)
                                            <option value="{{ $i }}" {{ old('part_two.review.4.rate') == $i? 'selected=""':'' }}>{{ $i }}</option>
                                        @endfor
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">vi.</label>
                                <div class="col-sm-7">
                                    <input type="text" name="part_two[review][5][text]" value="{{ old('part_two.review.5.text') }}" class="form-control" />
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" name="part_two[review][5][rate]">
                                        <option value="">--choose--</option>
                                        @for($i=1; $i<=100; $i++)
                                            <option value="{{ $i }}" {{ old('part_two.review.5.rate') == $i? 'selected=""':'' }}>{{ $i }}</option>
                                        @endfor
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">vii.</label>
                                <div class="col-sm-7">
                                    <input type="text" name="part_two[review][6][text]" value="{{ old('part_two.review.6.text') }}" class="form-control" />
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" name="part_two[review][6][rate]">
                                        <option value="">--choose--</option>
                                        @for($i=1; $i<=100; $i++)
                                            <option value="{{ $i }}" {{ old('part_two.review.6.rate') == $i? 'selected=""':'' }}>{{ $i }}</option>
                                        @endfor
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <br />
                        <h4>JOB PERFORMANCE <br /><small>B. Comment on duties performed during the period of this report:</small></h4><br />

                        <fieldset>
                            <p>i. Most successful job accomplishment, satisfactory task and main duties performed since last performance appraisal period</p>
                            <div class="panel">
                                <div class="panel-body">
                                    <textarea name="part_two[performance][accomplishment]" rows="3" class="form-control note-editor note-editor-margin">{{ old('part_two.performance.accomplishment') }}</textarea>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <p>ii. What were the cause, personal or otherwise, to which you ascribed your success or failure</p>
                            <div class="panel">
                                <div class="panel-body">
                                    <textarea name="part_two[performance][cause]" rows="3" class="form-control note-editor note-editor-margin">{{ old('part_two.performance.cause') }}</textarea>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <p>iii. Do you think you need more training or experiences to enable you do your job better? if so, of what kind?</p>
                            <div class="panel">
                                <div class="panel-body">
                                    <textarea name="part_two[performance][experiences]" rows="3" class="form-control note-editor note-editor-margin">{{ old('part_two.performance.experiences') }}</textarea>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <p>iv. Do you think your abilities could be better used in your present job or in another kind of job?</p>
                            <div class="panel">
                                <div class="panel-body">
                                    <textarea name="part_two[performance][ability]" rows="3" class="form-control note-editor note-editor-margin">{{ old('part_two.performance.ability') }}</textarea>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <p>v. During the period of this report, did you have job satisfaction? if not what were the cause?</p>
                            <div class="panel">
                                <div class="panel-body">
                                    <textarea name="part_two[performance][satisfaction]" rows="3" class="form-control note-editor note-editor-margin">{{ old('part_two.performance.satisfaction') }}</textarea>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <p>vi. What are your strength and weaknesses</p>
                            <div class="panel">
                                <div class="panel-body">
                                    <textarea name="part_two[performance][strength]" rows="3" class="form-control note-editor note-editor-margin">{{ old('part_two.performance.strength') }}</textarea>
                                </div>
                            </div>
                        </fieldset>

                    </div>

                    <!--</form>-->
                </div>
            </div>
        </div>


        <h3>
            PART 3
        </h3>
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <!--<form class="form-horizontal" role="form" novalidate>-->

                    <div class="panel-body">
                        <fieldset>
                            <h4>Performance competencies (Skills and behaviours)</h4>
                            <hr>
                            <p><small>A. Please review and consider how you have demonstrated these in your job and how you might improve on these going forward.</small></p> <br />

                            <div class="form-group">
                                <div class="col-sm-12">
                                    <div class="table-responsive">

                                        <table class="table table-bordered">
                                            <tr>
                                                <th class="col-sm-6">
                                                    <h4>Competency Area</h4>
                                                </th>
                                                <th class="col-sm-6"><h4 class="heading">Notes/Comments on competency Areas and suggestions for Improvement</h4></th>
                                            </tr>
                                            <tr>
                                                <td><p><strong>Taking responsibility: </strong><br>Completes assignments in a through, accurate and timely manner that achieves expected outcomes; exhibits concern for the goals and needs of the department and others that depend on services or work products; handles multiple responsibilities in an effective manner uses work time productively.</p></td>
                                                <td><textarea name="part_three[competencies][responsibility]" rows="5" class="form-control note-editor note-editor-margin"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td><p><strong>Customer Focus: </strong><br>Is dedicated to meeting the expectations and requirements of internal and external customers; acts with customers in mind; establishes and maintains effective relationships with customers and gains their trust and respect; goes above and beyond to anticipate customer needs and respond accordingly </p></td>
                                                <td><textarea name="part_three[competencies][focus]" rows="5" class="form-control note-editor note-editor-margin"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td><p><strong>Problem Solving/Creativity: </strong><br>Identifies and analyzes problems: formulates alternative solutions; take or recommend appropriate actions; follows up to ensure problems are solved.</p></td>
                                                <td><textarea name="part_three[competencies][creativity]" rows="5" class="form-control note-editor note-editor-margin"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td><p><strong>Collaboration/Team work: </strong><br> Uses diplomacy and fact to mantain harmonies and effective work relationships with co-workers and constituents; adapt to changing priorities and demands shares information and resources with others to promote positive and collaborative work relationships; supports diversity initiatives by demonstrating respect for all individuals. </p></td>
                                                <td><textarea name="part_three[competencies][collaboration]" rows="5" class="form-control note-editor note-editor-margin"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td><p><strong>Communication/interpersonal Skill: </strong><br>Is able to effectively communicate and to influence others in order to meet organisational goals; shares information openly; relates well to all kinds of people, is able to speak well and write effectively.</p></td>
                                                <td><textarea name="part_three[competencies][communication]" rows="5" class="form-control note-editor note-editor-margin"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td><p><strong>Job specific Knowledge and Skills: </strong><br>Acquires and apply knowledge, skills and experience ro accomplish results</p></td>
                                                <td><textarea name="part_three[competencies][skill]"  rows="5" class="form-control note-editor note-editor-margin"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td><p><strong>Quality: </strong><br>Provides high quality services, processes, programs and products while consistently seeking ways to improve outcomes and enhance service</p></td>
                                                <td><textarea name="part_three[competencies][quality]" rows="5" class="form-control note-editor note-editor-margin"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td><p><strong>Any Additional Information: </strong><br>Provide any information you thing may be relevant to your assessment</p></td>
                                                <td><textarea name="part_three[competencies][additional]" rows="5" class="form-control note-editor note-editor-margin"></textarea></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                    </div> <!-- End page-body -->

                    <!--</form>-->
                </div>
            </div>
        </div>


    @section('page-vendor')
            <!-- =============== PAGE VENDOR SCRIPTS ===============-->

    <!-- WYSIWYG-->
    <script src="/vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script>
    <script src="/vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js"></script>

    <!-- SELECT2-->
    <script src="/vendor/select2/dist/js/select2.js"></script>

    <script>
        $(function () {
            // WYSIWYG
            // -----------------------------------

            $('.picker').datetimepicker({
                format: 'YYYY-MM-DD',
//            'minDate': start,
                'locale': 'en'
            });

            $('.picker').keydown(function(e) {
                if(e.keyCode == 9){
                    return true;
                }
                return false;
            });


        });
    </script>

    @endsection