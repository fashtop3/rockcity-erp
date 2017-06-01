<fieldset>
    <div class="form-group">
        <div class="col-sm-1">
            <label class="control-label">Challenge</label><br />
        </div>

        <div class="col-md-11">
            <!-- Wysiswyg editor-->
            <div data-role="editor-toolbar" data-target="#challenge-editor" class="btn-toolbar btn-editor">
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
            <textarea id="challengeHtmlText" hidden name="challenge" cols="30" rows="10"></textarea>
            <div id="challengeHtmlTextEditorContent" style="overflow:scroll; height:250px;max-height:250px" class="form-control wysiwyg mt-lg" contenteditable="true"><div style="text-align: left;"></div></div>
        </div>

    </div>
</fieldset>