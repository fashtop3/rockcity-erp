<!-- sidebar-->
<aside class="aside">
    <!-- START Sidebar (left)-->
    <div class="aside-inner">
        <nav data-sidebar-anyclick-close="" class="sidebar">
            <!-- START sidebar nav-->
            <ul class="nav">
                <!-- START user info-->
                <li class="has-user-block">
                    <div id="user-block" class="collapse">
                        <div class="item user-block">
                            <!-- User picture-->
                            <div class="user-block-picture">
                                <div class="user-block-status">
                                    <img src="/app/img/user/02.jpg" alt="Avatar" width="60" height="60" class="img-thumbnail img-circle">
                                    <div class="circle circle-success circle-lg"></div>
                                </div>
                            </div>
                            <!-- Name and Job-->
                            <div class="user-block-info">
                                <span class="user-block-name">Hello, Mike</span>
                                <span class="user-block-role">Designer</span>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- END user info-->
                <!-- Iterates over all sidebar items-->
                <li class="nav-heading ">
                    <span data-localize="sidebar.heading.HEADER">Main Navigation</span>
                </li>
                <li class="">
                    <a href="{{ route('dashboard') }}" title="Dashboard">
                        {{--<div class="pull-right label label-info">3</div>--}}
                        <em class="icon-speedometer"></em>
                        <span data-localize="sidebar.nav.DASHBOARD">Dashboard</span>
                    </a>
                </li>
                <li class=" ">
                    <a href="{{ route('mail') }}" title="Send mail">
                        {{--<div class="pull-right label label-success">30</div>--}}
                        <em class="icon-grid"></em>
                        <span data-localize="sidebar.nav.MAIL">Send mail</span>
                    </a>
                </li>
                <li class=" ">
                    <a href="{{ route('sms') }}" title="Send sms">
                        {{--<div class="pull-right label label-success">30</div>--}}
                        <em class="icon-grid"></em>
                        <span data-localize="sidebar.nav.SMS">Send sms</span>
                    </a>
                </li>
                <li class=" ">
                    <a href="#client" title="Clients" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Clients</span>
                    </a>
                    <ul id="client" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">Clients</li>
                        <li class=" ">
                            <a href="{{ route('client.create') }}" title="Horizontal">
                                <span>Register</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="{{ route('client') }}" title="Horizontal">
                                <span>View & Search</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class=" ">
                    <a href="#airtime" title="Layouts" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Airtime</span>
                    </a>
                    <ul id="airtime" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">Airtime</li>
                        <li class=" ">
                            <a href="{{ route('airtime.create') }}" title="Horizontal">
                                <span>Generate</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="{{ route('airtime.orders') }}" title="Horizontal">
                                <span>View Orders</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-heading ">
                    <span data-localize="sidebar.heading.REPORT">Report Navigation</span>
                </li>

                <li class=" ">
                    <a href="#report" title="Report" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Staff's Report</span>
                    </a>
                    <ul id="report" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">Staff's Report</li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>Add new</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>View</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class=" ">
                    <a href="#assessment" title="Report" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Assessment</span>
                    </a>
                    <ul id="assessment" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">Assessment</li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>New form</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>View data</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class=" ">
                    <a href="#driver_rep" title="Report" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Driver's Report</span>
                    </a>
                    <ul id="driver_rep" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">Driver's Report</li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>Add Report</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>View</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="nav-heading ">
                    <span data-localize="sidebar.heading.ADMIN">Admin Section</span>
                </li>

                <li class=" ">
                    <a href="#orders" title="Orders" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Orders</span>
                    </a>
                </li>

                <li class=" ">
                    <a href="#records" title="Records" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Assessment</span>
                    </a>
                    <ul id="records" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">Records</li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>Records</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class=" ">
                    <a href="#admin_report" title="Records" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Reports</span>
                    </a>
                    <ul id="admin_report" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">Reports</li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>Staff's Report</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="#" title="Horizontal">
                                <span>Driver's Report</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class=" ">
                    <a href="#target" title="Target" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Target</span>
                    </a>
                    <ul id="target" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">People</li>
                        <li class=" ">
                            <a href="{{ route('admin.target') }}" title="Manage">
                                <span>Manage</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="{{ route('admin.target.create') }}" title="create">
                                <span>Create</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class=" ">
                    <a href="#vehicle" title="Vehicle" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>Vehicle</span>
                    </a>
                    <ul id="vehicle" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">People</li>
                        <li class=" ">
                            <a href="{{ route('admin.vehicle') }}" title="Manage">
                                <span>Manage</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="{{ route('admin.vehicle.create') }}" title="create">
                                <span>Create</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class=" ">
                    <a href="#people" title="Records" data-toggle="collapse">
                        <em class="icon-layers"></em>
                        <span>People</span>
                    </a>
                    <ul id="people" class="nav sidebar-subnav collapse">
                        <li class="sidebar-subnav-header">People</li>
                        <li class=" ">
                            <a href="{{ route('admin.people') }}" title="View and Search">
                                <span>View and Search</span>
                            </a>
                        </li>
                        <li class=" ">
                            <a href="{{ route('admin.people.create') }}" title="Register">
                                <span>Register</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class=" ">
                    <a href="{{ route('admin.client') }}" title="Clients">
                        <em class="icon-layers"></em>
                        <span>Clients</span>
                    </a>
                </li>
            </ul>
            <!-- END sidebar nav-->
        </nav>
    </div>
    <!-- END Sidebar (left)-->
</aside>