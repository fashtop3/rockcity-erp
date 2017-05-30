@section('vendor-head')
        <!-- SELECT2-->
<link rel="stylesheet" href="/vendor/select2/dist/css/select2.css">
<link rel="stylesheet" href="/vendor/select2-bootstrap-theme/dist/select2-bootstrap.css">
<link rel="stylesheet" href="/css/jquery-ui.min.css">
@endsection




@section('page-vendor')
        <!-- =============== PAGE VENDOR SCRIPTS ===============-->
<!-- SELECT2-->
<script src="/vendor/select2/dist/js/select2.js"></script>

<script>
    $(function () {
        $("#marketer").select2({
            theme: "bootstrap",
            width : '100%'
        });



    });
</script>
@endsection