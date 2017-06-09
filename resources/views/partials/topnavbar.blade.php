<!-- top navbar-->
<header class="topnavbar-wrapper">
    <!-- START Top Navbar-->
    <nav role="navigation" class="navbar topnavbar">
        <!-- START navbar header-->
        <div class="navbar-header">
            <a href="#/" class="navbar-brand">
                <div class="brand-logo">
                    <img src="/app/img/logo.png" alt="App Logo" class="img-responsive">
                </div>
                <div class="brand-logo-collapsed">
                    <img src="/app/img/logo-single.png" alt="App Logo" class="img-responsive">
                </div>
            </a>
        </div>
        <!-- END navbar header-->
        <!-- START Nav wrapper-->
        <div class="nav-wrapper">
            <!-- START Left navbar-->
            <ul class="nav navbar-nav">
                <li>
                    <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->
                    <a href="#" data-trigger-resize="" data-toggle-state="aside-collapsed" class="hidden-xs">
                        <em class="fa fa-navicon"></em>
                    </a>
                    <!-- Button to show/hide the sidebar on mobile. Visible on mobile only.-->
                    <a href="#" data-toggle-state="aside-toggled" data-no-persist="true" class="visible-xs sidebar-toggle">
                        <em class="fa fa-navicon"></em>
                    </a>
                </li>
                <!-- START User avatar toggle-->
                <li>
                    <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->
                    <a id="user-block-toggle" href="#user-block" data-toggle="collapse">
                        <em class="icon-user"></em>
                    </a>
                </li>
                <!-- END User avatar toggle-->
                <!-- START lock screen-->
                <li>
                    <a href="{{ route('logout') }}" title="Logout"
                       onclick="event.preventDefault();
                       document.getElementById('logout-form').submit();">
                        <em class="icon-lock"></em>
                    </a>
                    <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                        {{ csrf_field() }}
                    </form>
                </li>
                <!-- END lock screen-->
            </ul>
            <!-- END Left navbar-->
            <!-- START Right Navbar-->
            <ul class="nav navbar-nav navbar-right">
                <!-- Search icon-->
                {{--<li>--}}
                    {{--<a href="#" data-search-open="">--}}
                        {{--<em class="icon-magnifier"></em>--}}
                    {{--</a>--}}
                {{--</li>--}}
                        <!-- START Alert menu-->
                <li class="dropdown dropdown-list">
                    <a href="#" data-toggle="dropdown">
                        <em class="fa fa-tasks "></em>
                    </a>
                    <!-- START Dropdown menu-->
                    <ul class="dropdown-menu animated flipInX">
                        <li>
                            <!-- START list group-->
                            <div class="list-group">
                                <!-- list item-->
                                <a href="{{ route('promocode.create') }}" class="list-group-item">
                                    <div class="media-box">
                                        <div class="pull-left">
                                            <em class="fa fa-twitter fa-2x text-info"></em>
                                        </div>
                                        <div class="media-box-body clearfix">
                                            <p class="m0">Coupon codes</p>
                                            <p class="m0 text-muted">
                                                <small>Generate coupon codes</small>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <!-- list item-->
                                <a href="{{ route('mail') }}" class="list-group-item">
                                    <div class="media-box">
                                        <div class="pull-left">
                                            <em class="fa fa-envelope fa-2x text-warning"></em>
                                        </div>
                                        <div class="media-box-body clearfix">
                                            <p class="m0">Send e-mails</p>
                                            <p class="m0 text-muted">
                                                <small>Send mail</small>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <!-- list item-->
                                <a href="{{ route('sms') }}" class="list-group-item">
                                    <div class="media-box">
                                        <div class="pull-left">
                                            <em class="fa fa-envelope fa-2x text-warning"></em>
                                        </div>
                                        <div class="media-box-body clearfix">
                                            <p class="m0">Send sms</p>
                                            <p class="m0 text-muted">
                                                <small>Send sms</small>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <!-- END list group-->
                        </li>
                    </ul>
                    <!-- END Dropdown menu-->
                </li>
                <!-- Fullscreen (only desktops)-->
                <li class="visible-lg">
                    <a href="#" data-toggle-fullscreen="">
                        <em class="fa fa-expand"></em>
                    </a>
                </li>

                <!-- END Alert menu-->
                <!-- START Offsidebar button-->
                {{--<li>--}}
                    {{--<a href="#" data-toggle-state="offsidebar-open" data-no-persist="true">--}}
                        {{--<em class="icon-notebook"></em>--}}
                    {{--</a>--}}
                {{--</li>--}}
                <!-- END Offsidebar menu-->
            </ul>
            <!-- END Right Navbar-->
        </div>
        <!-- END Nav wrapper-->
        <!-- START Search form-->
        <form role="search" action="search.html" class="navbar-form">
            <div class="form-group has-feedback">
                <input type="text" placeholder="Type and hit enter ..." class="form-control">
                <div data-search-dismiss="" class="fa fa-times form-control-feedback"></div>
            </div>
            <button type="submit" class="hidden btn btn-default">Submit</button>
        </form>
        <!-- END Search form-->
    </nav>
    <!-- END Top Navbar-->
</header>