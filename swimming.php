<?php
include 'header.php';
?>
<main class="container wrapper center-align center">
  <h1 class="center">Natation</h1>
  <div class="row">
    <div class="col s12">
      <ul class="tabs  tabs-fixed-width">
        <li class="tab col s6"><a class="blue-text active tab-link" href="#swimmingBoys" id="boys">Garçons</a></li>
        <li class="tab col s6"><a class="blue-text tab-link" href="#swimmingGirls" id="girls">Filles</a></li>
      </ul>
    </div>
    <div id="swimmingBoys" class="col s12">
      <ul class="collapsible expandable" id="boysHeats">
      </ul>
    </div>
    <div id="swimmingGirls" class="col s12">
      <ul class="collapsible expandable" id="girlsHeats">
      </ul>
    </div>
    <a class="btn-floating tooltipped btn waves-effect waves-light blue" data-position="bottom" data-tooltip="Imprimer"><i class="material-icons">print</i></a>
  </div>
</main>
<?php include 'footer.php'; ?>