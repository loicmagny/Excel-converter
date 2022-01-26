"use strict";

if ($(location).attr('href') == LASERRUN) {
  //Fonction pour récupérer les temps de natation des garcçons et le manipuler de manière à créer des séries + calculer les handicap start
  // //Appelée depuis la fonction AjaxCall
  var getStoredBoysTimes = function getStoredBoysTimes(datas) {
    var splitted = splitAthletesByDist(datas);

    for (i in splitted) {
      for (j in splitted) {
        splitted = calculateHandicapStart(splitted);
      }
    }

    generateHTML(splitted, 'boy', 3);
    $('.collapsible').collapsible();
    $('.boySec').focusout(function () {
      var id = $(this).prop('id').replace(/[^0-9.]/g, '');
      ajaxCall(['getAthCatDetails', 3, x = id]);
    });
    ajaxCall(['getLRSavedTimes', 2, 1]);
  }; //Fonction pour récupérer les temps de natation des filles et le manipuler de manière à créer des séries + calculer les handicap start
  // //Appelée depuis la fonction AjaxCall


  var getStoredGirlsTimes = function getStoredGirlsTimes(datas) {
    var splitted = splitAthletesByDist(datas);

    for (i in splitted) {
      for (j in splitted) {
        splitted = calculateHandicapStart(splitted);
      }
    }

    generateHTML(splitted, 'girl', 3);
    $('.collapsible').collapsible();
    $('.girlSec').focusout(function () {
      var id = $(this).prop('id').replace(/[^0-9.]/g, '');
      ajaxCall(['getAthCatDetails', 3, x = id]);
    });
    ajaxCall(['getLRSavedTimes', 2, 0]);
  }; // Gestion d'évènement click pour ajouter un garçon et ses données dans la bdd corresondante
  // // A retravailler


  // Fonction pour soustraire le handicap start au temps final réalisé par l'athlète
  var substractHandicap = function substractHandicap(time, id) {
    var result = ajaxCall(['getAthHandicap', 0, id]);

    if (!result) {
      return parseInt(time);
    } else {
      return parseInt(time) - formatHandicapTime(parseInt(result));
    }
  }; // Fonction pour mettre en forme le handicap start (enregistré en secondes) en une str dans un format particulier


  var formatHandicapTime = function formatHandicapTime(time) {
    var minutes = parseInt(time / 60);
    var seconds = parseInt(time % 60);

    if (time >= 60) {
      minutes = parseInt(time / 60);

      if (minutes >= 2) {
        minutes = 2;
        seconds = 0;
        return minutes + ':' + seconds + '';
      } else {
        minutes = parseInt(time / 60);
        return minutes + ':' + seconds + '';
      }
    } else {
      return minutes + ':' + seconds + '';
    }
  }; // Fonction permettant de séparer les athlètes en fonction des distances de combiné parcourues (800 ou 400m)


  var splitAthletesByDist = function splitAthletesByDist(datas) {
    var split = new Array([], []);

    for (var _i = 0; _i < datas.length; _i++) {
      if (datas[_i].lr_distance == 400) {
        split[0].push(datas[_i]);
      } else if (datas[_i].lr_distance == 800) {
        split[1].push(datas[_i]);
      }
    }

    return split;
  }; // Fonction permettant de calculer le handicap start de chaque athlète conformément au réglement de la FFPM


  var calculateHandicapStart = function calculateHandicapStart(datas) {
    for (var _i2 = 0; _i2 < datas.length; _i2++) {
      for (var _j = 0; _j < datas[_i2].length; _j++) {
        datas[_i2][_j].lr_handicap = formatHandicapTime(Math.abs(parseInt(datas[_i2][0].points) - parseInt(datas[_i2][_j].points)));
        ajaxCall(['updateHandicap', 0, [datas[_i2][_j].lr_handicap, datas[_i2][_j].ath_id]]);
      }
    }

    return datas;
  }; // Fonction permettant la saisie et la gestion du temps et des points de chaque athlète
  // cf main.js pour + d'infos sur les fonctions utilisés


  var laserRunTimeHandler = function laserRunTimeHandler(arrayStr, data, id) {
    manipulateTimeInput(arrayStr, parseInt($('#' + arrayStr[1] + '_' + id + '').val()), parseInt($('#' + arrayStr[2] + '_' + id + '').val()), id);
    calculatePoints(parseInt($('#' + arrayStr[1] + '_' + id + '').val() * 60) + parseInt($('#' + arrayStr[2] + '_' + id + '').val()), id, minIntoSec(data.lr_time), data, arrayStr);
  }; ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Appel des fonctions
  //Garçons


  $('#boysHeats').on('click', 'button', function (e) {
    var target = e.target.id;
    var id = target.replace(/[^0-9.]/g, '');
    $('#add_' + id + '').click(function () {
      var athTime = minIntoSec('' + $('#minutes_' + id + '').val() + ' ' + $('#seconds_' + id + '').val() + '');
      var athPoints = $('#lr_points_' + id + '').text();
      var athHeat = $(this).parent().parent().parent().prop('id');
      var athArrival = $('#arrival_' + id + '').val();
      ajaxCall(['insertLRAthleteResult', 2, [id, athTime, athPoints, athHeat, athArrival]]);
      transformAddButton(id);
      $('.tooltipped').tooltip();
    }); // $('#edit_' + id + '').click(function () {
    // 	ajaxCall([
    // 		'editAthleteResult',
    // 		1,
    // 		[id, athTime, athHeat, athPoints, arrival, 0, 1]
    // 	]);
    // });
  }); // Gestion d'évènement click pour ajouter une fille et ses données dans la bdd correspondante
  // // A retravailler

  $('#girlsHeats').on('click', 'button', function (e) {
    var target = e.target.id;
    var id = target.replace(/[^0-9.]/g, '');
    $('#add_' + id + '').click(function () {
      var athTime = minIntoSec('' + $('#minutes_' + id + '').val() + ' ' + $('#seconds_' + id + '').val() + '');
      var athPoints = $('#lr_points_' + id + '').text();
      var athHeat = $(this).parent().parent().parent().prop('id');
      var athArrival = $('#arrival_' + id + '').val();
      ajaxCall(['insertLRAthleteResult', 2, [id, athTime, athPoints, athHeat, athArrival]]);
      transformAddButton(id);
      $('.tooltipped').tooltip();
    }); // $('#edit_' + id + '').click(function () {
    // 	ajaxCall([
    // 		'editAthleteResult',
    // 		1,
    // 		[id, athTime, athHeat, athPoints, arrival, 0, 1]
    // 	]);
    // });
  });
  ajaxCall(['getSavedTimes', 1, 1]); // ajaxCall(['getLRAth', 1, 1]);
  //Filles

  ajaxCall(['getSavedTimes', 1, 0]); // ajaxCall(['getLRAth', 1, 0]);
}