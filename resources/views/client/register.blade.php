@extends('dashboard')

@section('content')

    <header class="page-header">
        <h2>Client's Registration</h2>

        <div class="right-wrapper pull-right">
            <ol class="breadcrumbs">
                <li>
                    <a href="index.html">
                        <i class="fa fa-home"></i>
                    </a>
                </li>
                <li><span>Registration</span></li>
            </ol>

            <a class="sidebar-right-toggle" data-open="sidebar-right"><i class="fa fa-chevron-left"></i></a>
        </div>
    </header>

    <!-- start: page -->
    <div class="row row-content content-container">
            <form action="" method="post" class="form-horizontal col-sm-offset-1" role="form">
                <div class="row">
                    <div class="col-xs-12">
                        <h3>Client Details</h3>
                    </div>
                    <div class="col-xs-12 col-sm-10">
                        <div class="form-group">
                            <label for="name" class="col-sm-2 control-label">Client's Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="name" name="name" placeholder="Enter Client's Name" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="address" class="col-sm-2 control-label">Client's Address</label>
                            <div class="col-sm-9">
                                <textarea name="address" id="address" cols="20" rows="3" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <p style="padding: 20px;"></p>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <h3>Contact Person's Details</h3>
                    </div>
                    <div class="col-xs-12 col-sm-10">
                        <div class="form-group">
                            <label for="title" class="col-sm-2 control-label">Title</label>
                            <div class="col-sm-2">
                                <select name="title" id="title" class="form-control">
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="firstName" class="col-sm-2 control-label">First Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="firstname" id="firstname" placeholder="Enter First Name" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="lastName" class="col-sm-2 control-label">Last Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="lastname" id="lastname" placeholder="Enter Last Name" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="mobile" class="col-sm-2 control-label">Phone Number</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control col-sm-5" name="mobile" id="mobile" placeholder="Enter Phone Number" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="control-label col-sm-2">Email</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control col-sm-9" name="email" id="email" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <p style="padding: 20px;"></p>

                    <div class="col-xs-12 col-sm-10">
                        <div class="form-group">
                            <div class="col-sm-10 col-sm-offset-2">
                                <button class="btn btn-primary" type="submit">Save Data</button>
                            </div>
                        </div>
                    </div>
                </div>



            </form>

            <div class="row">
                <p style="padding: 20px;"></p>
            </div>

    </div>

    <!-- end: page -->

@stop