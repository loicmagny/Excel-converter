<?php include 'header.php'; ?>
<h1 class="center">Laser Run</h1>
<main class="wrapper center-align center ">
    <div class="row">
        <div class="col s12">
            <ul class="tabs tabs-fixed-width">
                <li class="tab col s3"><a href="#laserRunBoys" id="boys">Garçon</a></li>
                <li class="tab col s3"><a class="active" href="#laserRunGirls" id="girls">Filles</a></li>
            </ul>
        </div>
        <div id="laserRunBoys" class="col s12">
            <ul class="collapsible expandable" id="boysHeats">
            </ul>
        </div>
        <div id="laserRunGirls" class="col s12">
            <ul class="collapsible expandable" id="girlsHeats">
            </ul>

        </div>
    </div>
</main>
<?php include 'footer.php'; ?>