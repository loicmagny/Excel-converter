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
  <div id="foulsModal_" class="modal modal-fixed-footer">' +
    <div class="modal-content container">
      <h4 class="center">Fautes</h4>
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">
            azertyu
          </span>
          <div class="row">
            <div class="input-field col s12">
              <select id="foulSelect">
                <option value="" disabled selected>Choose your option</option>
              </select>
              <label>Sélectionnez la faute</label>
            </div>
            <div class="row">
              <div>
                Pénalité appliquée : <span id="foulLabel"></span>
              </div>
            </div>
            <div class="row">
              <div>
                Points : <span id="foulPoints"></span>
              </div>
            </div>
            <div class="row">
              <button class="btn waves-effect waves-light green" id="foulSubmit">Valider
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
</main>
<?php include 'footer.php'; ?>