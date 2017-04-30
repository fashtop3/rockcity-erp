@extends('layouts.main')

@section('page-head')
        <!-- SELECT2-->
        <link rel="stylesheet" href="/vendor/select2/dist/css/select2.css">
        <link rel="stylesheet" href="/vendor/select2-bootstrap-theme/dist/select2-bootstrap.css">
@endsection

@section('section')
    <div class="content-heading">
        Send Mail
        {{--<small data-localize="dashboard.WELCOME"></small>--}}
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form role="form-horizontal" name="mailoutForm" ng-submit="sendMail()">
                        <div>
                            {{--<uib-alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</uib-alert>--}}
                        </div>
                        <div class="input-group form-group">
                            <span class="input-group-addon text-sm">To:</span>
                            <select id="mail-data-select" class="form-control">
                                <option value="">--Choose--</option>
                                <optgroup label="Alaskan/Hawaiian Time Zone">
                                    <option value="AK">Alaska</option>
                                    <option value="HI">Hawaii</option>
                                </optgroup>
                            </select>

                        </div>

                        <div ng-show="mailbox.mail.cc" class="input-group form-group">
                            <span class="input-group-addon text-sm">CC:</span>
                            <input ng-model="mail.cc" type="text" class="form-control" />
                        </div>
                        <div ng-show="mailbox.mail.bcc" class="input-group form-group">
                            <span class="input-group-addon text-sm">BCC:</span>
                            <input ng-model="mail.bcc" type="text" class="form-control" />
                        </div>
                        <div class="input-group form-group">
                            <span class="input-group-addon text-sm">Subject:</span>
                            <input ng-model="mail.subject" type="text" class="form-control" required/>
                        </div>

                        <div class="row">
                            <!-- START action buttons-->
                            <div class="col-md-2 col-md-push-10">
                                <div class="btn-group btn-group-sm mb pull-right">
                                    <button type="button" ng-class="{'active':mailbox.mail.cc}" ng-click="mailbox.mail.cc = !mailbox.mail.cc" href="#" class="btn btn-default btn-sm">CC</button>
                                    <button type="button" ng-class="{'active':mailbox.mail.bcc}" ng-click="mailbox.mail.bcc = !mailbox.mail.bcc" href="#" class="btn btn-default btn-sm">BCC</button>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <!-- END action buttons  -->
                        </div>

                        <div class="clearfix" style="margin: 20px;"></div>

                        <div class="form-group">
                                    {{--<div class="col-sm-10">--}}
                                        <div data-role="editor-toolbar" data-target="#editor" class="btn-toolbar btn-editor">
                                            <div class="btn-group dropdown">
                                                <a data-toggle="dropdown" title="Font" class="btn btn-default">
                                                    <em class="fa fa-font"></em><b class="caret"></b>
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a href="javascript:void(0)" data-edit="fontName Arial" style="font-family:'Arial'">Arial</a>
                                                    </li>
                                                    <li><a href="javascript:void(0)" data-edit="fontName Sans" style="font-family:'Sans'">Sans</a>
                                                    </li>
                                                    <li><a href="javascript:void(0)" data-edit="fontName Serif" style="font-family:'Serif'">Serif</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="btn-group dropdown">
                                                <a data-toggle="dropdown" title="Font Size" class="btn btn-default">
                                                    <em class="fa fa-text-height"></em>&nbsp;<b class="caret"></b>
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a href="javascript:void(0)" data-edit="fontSize 5" style="font-size:24px">Huge</a>
                                                    </li>
                                                    <li><a href="javascript:void(0)" data-edit="fontSize 3" style="font-size:18px">Normal</a>
                                                    </li>
                                                    <li><a href="javascript:void(0)" data-edit="fontSize 1" style="font-size:14px">Small</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="btn-group">
                                                <a data-edit="bold" data-toggle="tooltip" title="" class="btn btn-default btn-info" data-original-title="Bold (Ctrl/Cmd+B)">
                                                    <em class="fa fa-bold"></em>
                                                </a>
                                                <a data-edit="italic" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Italic (Ctrl/Cmd+I)">
                                                    <em class="fa fa-italic"></em>
                                                </a>
                                                <a data-edit="strikethrough" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Strikethrough">
                                                    <em class="fa fa-strikethrough"></em>
                                                </a>
                                                <a data-edit="underline" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Underline (Ctrl/Cmd+U)">
                                                    <em class="fa fa-underline"></em>
                                                </a>
                                            </div>
                                            <div class="btn-group">
                                                <a data-edit="insertunorderedlist" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Bullet list">
                                                    <em class="fa fa-list-ul"></em>
                                                </a>
                                                <a data-edit="insertorderedlist" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Number list">
                                                    <em class="fa fa-list-ol"></em>
                                                </a>
                                                <a data-edit="outdent" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Reduce indent (Shift+Tab)">
                                                    <em class="fa fa-dedent"></em>
                                                </a>
                                                <a data-edit="indent" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Indent (Tab)">
                                                    <em class="fa fa-indent"></em>
                                                </a>
                                            </div>
                                            <div class="btn-group">
                                                <a data-edit="justifyleft" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Align Left (Ctrl/Cmd+L)">
                                                    <em class="fa fa-align-left"></em>
                                                </a>
                                                <a data-edit="justifycenter" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Center (Ctrl/Cmd+E)">
                                                    <em class="fa fa-align-center"></em>
                                                </a>
                                                <a data-edit="justifyright" data-toggle="tooltip" title="" class="btn btn-default btn-info" data-original-title="Align Right (Ctrl/Cmd+R)">
                                                    <em class="fa fa-align-right"></em>
                                                </a>
                                                <a data-edit="justifyfull" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Justify (Ctrl/Cmd+J)">
                                                    <em class="fa fa-align-justify"></em>
                                                </a>
                                            </div>
                                            <div class="btn-group dropdown">
                                                <a data-toggle="dropdown" title="Hyperlink" class="btn btn-default">
                                                    <em class="fa fa-link"></em>
                                                </a>
                                                <div class="dropdown-menu">
                                                    <div class="input-group ml-xs mr-xs">
                                                        <input id="LinkInput" placeholder="URL" type="text" data-edit="createLink" class="form-control input-sm">
                                                        <div class="input-group-btn">
                                                            <button type="button" class="btn btn-sm btn-default">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a data-edit="unlink" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Remove Hyperlink">
                                                    <em class="fa fa-cut"></em>
                                                </a>
                                            </div>
                                            <div class="btn-group pull-right">
                                                <a data-edit="undo" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Undo (Ctrl/Cmd+Z)">
                                                    <em class="fa fa-undo"></em>
                                                </a>
                                                <a data-edit="redo" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Redo (Ctrl/Cmd+Y)">
                                                    <em class="fa fa-repeat"></em>
                                                </a>
                                            </div>
                                        </div>
                                        <div style="overflow:scroll; height:250px;max-height:250px" class="form-control wysiwyg mt-lg" contenteditable="true"><div style="text-align: left;">hello jhjwgit</div></div>
                                    {{--</div>--}}
                        </div>

                        <br/>
                        <button type="submit" ng-disabled="mailoutForm.$invalid || disabled" class="btn btn-primary btn-sm mb">Send</button>
                            {{--<span ng-if="disabled">{{mailMsg}}</span>--}}
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('page-vendor')
   <!-- =============== PAGE VENDOR SCRIPTS ===============-->

    <!-- WYSIWYG-->
    <script src="/vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script>
    <script src="/vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js"></script>

    <!-- SELECT2-->
    <script src="/vendor/select2/dist/js/select2.js"></script>

    <script type="text/javascript">
        $(document).ready(function() {

            // WYSIWYG
            // -----------------------------------

            $('.wysiwyg').wysiwyg();



            $("#mail-data-select").select2({
                theme: "bootstrap"
            });

        });
    </script>

@endsection