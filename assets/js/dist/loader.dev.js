"use strict";

// Fichier permettant de gérer le chargement des différents fichiers js nécéssaires sans encombrer footer.php
$(document).ready(function () {
  $.getScript('assets/libs/materialize/js/materialize.min.js', function () {
    $.getScript('assets/js/const.js', function () {
      $.getScript('assets/js/main.js', function () {});
      $.getScript('assets/js/board.js', function () {});
      $.getScript('assets/js/results.js', function () {});
      $.getScript('assets/js/swimming.js', function () {});
      $.getScript('assets/js/laserRun.js', function () {});
      $.getScript('assets/js/options.js', function () {});
      $.getScript('assets/js/DOM.js', function () {});
    });
  });
});