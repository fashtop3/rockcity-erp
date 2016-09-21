<!doctype html>
<html class="fixed">
<head>

    <!-- Basic -->
    <meta charset="UTF-8">

    <title>ROCKCITY FM RADIO</title>
    <meta name="keywords" content="HTML5 Admin Template" />
    <meta name="description" content="Rockcity FM Radio">

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />


    <!-- Vendor CSS -->
    <link rel="stylesheet" href="{{asset('assets/vendor/bootstrap/css/bootstrap.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/vendor/font-awesome/css/font-awesome.css')}}" />


</head>
<body>
<section class="body">

        <!--start: header-->
        <header class="jumbotron container-fluid">
            <div class="container">
                <div class="row col-sm-8 col-sm-offset-2">
                    <div class="col-sm-4">
                        <img src="/app/img/rockcity.png" alt="Rockcity Logo" />
                    </div>
                    <div class="col-sm-8">
                        <address>
                            <strong>Rockcity FM Radio.</strong><br>
                            Radio House, Asero, Abeokuta. P.O. Box 3116, Sapon, Abeokuta, Ogun State, Nigeria.<br />
                            <abbr title="Phone">Phone:</abbr> 08022514366, 08033943014, 08172105500, 08092106666, 039-206609, 039-779286 <br />
                            <abbr title="Email">Email:</abbr> info@rockcityfmradio.com, mpo@rockcityfmradio.com <br />
                            <abbr title="website">Web:</abbr> www.rockcityfmradio.com
                        </address>
                    </div>
                </div>
            </div>

        </header>
        <!--end: header-->

        <section class="container">
            <div class="row col-sm-8 col-sm-offset-2">
                @yield('content')
            </div>
        </section>

</section>

</body>
</html>