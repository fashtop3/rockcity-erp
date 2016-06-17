@extends('dashboard')

@section('content')

        <header class="page-header">
            <h2>Mail</h2>

            <div class="right-wrapper pull-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="">
                            <i class="fa fa-home"></i>
                        </a>
                    </li>
                    <li><span>Forms</span></li>
                    <li><span>Basic</span></li>
                </ol>

                <a class="sidebar-right-toggle" data-open="sidebar-right"><i class="fa fa-chevron-left"></i></a>
            </div>
        </header>

        <!-- start: page -->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel">
                    <header class="panel-heading">
                        <h2 class="panel-title">Send Mail</h2>
                    </header>
                    <div class="panel-body">
                        <form action="" method="post" role="form">
                            <div class="form-group col-md-6">
                                <div class="input-group mb-md">
                                    <span class="input-group-addon">
                                        <i class="fa fa-user"></i>
                                    </span>
                                    <input type="text" class="form-control" name="from" placeholder="From">
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <div class="input-group mb-md">
                                    {{--<label for="messageTo">To:</label>--}}
                                        <span class="input-group-addon">
                                            <i class="fa fa-envelope"></i>
                                        </span>
                                    <input type="text" class="form-control" name="email" placeholder="Email">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subject">Subject:</label>
                                <input type="text" class="form-control" name="subject" id="subject">
                            </div>
                            <div class="form-group">
                                <label for="message">Message Body</label>
                                <textarea class="form-control" name="message" id="message" cols="30" rows="10"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-success">Send Mail</button>
                            </div>
                        </form>

                    </div>
                </section>

            </div>
        </div>
        <!-- end: page -->

@stop