"use strict";

if ($(location).attr('href') == LASERRUN) {
  //Fonction pour récupérer les temps de natation des garçons et le manipuler de manière à créer des séries + calculer les handicap start
  // //Appelée depuis la fonction AjaxCall
  var getStoredBoysTimes = function getStoredBoysTimes(datas) {
    if (datas.length > 1) {
      var splitted = splitAthletesByDist(datas);

      for (i in splitted) {
        for (j in splitted) {
          splitted = calculateHandicapStart(splitted);
        }
      }

      generateTriathleLaserRunBoard(splitted, 'Boy');
      $('.collapsible').collapsible();
      $('.boySec').focusout(function () {
        var id = $(this).prop('id').replace(/[^0-9.]/g, '');
        ajaxCall(['getAthCatDetails', 3, x = id]);
      });
      ajaxCall(['getLRSavedTimes', 2, 1]);
    }
  };

  var getStoredGirlsTimes = function getStoredGirlsTimes(datas) {
    if (datas.length > 1) {
      var splitted = splitAthletesByDist(datas);

      for (i in splitted) {
        for (j in splitted) {
          splitted = calculateHandicapStart(splitted);
        }
      }

      generateTriathleLaserRunBoard(splitted, 'Girl');
      $('.collapsible').collapsible();
      $('.girlSec').focusout(function () {
        var id = $(this).prop('id').replace(/[^0-9.]/g, '');
        ajaxCall(['getAthCatDetails', 3, x = id]);
      });
      ajaxCall(['getLRSavedTimes', 2, 0]);
    }
  };

  var displayLaserRunAth = function displayLaserRunAth(datas, gender) {
    if (datas.length > 1) {
      // console.log('DATAS', datas);
      if (datas.length > 20) {
        console.log('plus');
        generateLaserRunBoard(splitHeats(datas), gender);
      } else if (datas.length < 20) {
        console.log('moins');
        generateLaserRunBoard(splitHeats(datas), gender);
      }

      $('.collapsible').collapsible();
      $('.boySec').focusout(function () {
        var id = $(this).prop('id').replace(/[^0-9.]/g, '');
        ajaxCall(['getAthCatDetails', 3, x = id]);
      });
      $('.girlSec').focusout(function () {
        var id = $(this).prop('id').replace(/[^0-9.]/g, '');
        ajaxCall(['getAthCatDetails', 3, x = id]);
      });
      ajaxCall(['getLRSavedTimes', 2, 1]);
    }
  };

  var splitHeats = function splitHeats(datas) {
    console.log('datas: ', datas);

    if (datas.length > 20) {
      var size = datas.length;
      var _x = 1;

      for (var _i = 1; _i <= size; _i++) {
        if (size <= 20) {
          break;
        }

        Math.ceil(size /= 2);
        _x++;
      }

      var splitted = dynamicMatrix(_x, Math.ceil(size));
      console.log(splitted);
      console.log('size: ', Math.ceil(size), _x);

      for (var _i2 = 0; _i2 < splitted.length; _i2++) {
        for (var _j = 0; _j < splitted[_i2].length; _j++) {
          if (_j < splitted[_i2.length]) {
            splitted[_i2][_j] = datas[_j];
          } else {
            console.log(_j + splitted[_i2].length * _i2);
            splitted[_i2][_j] = datas[parseInt(_j + splitted[_i2].length * _i2)];
          }
        }
      }

      console.log(splitted);
      return splitted;
    } else {
      var _splitted = dynamicMatrix(1);

      for (var _i3 = 0; _i3 < datas.length; _i3++) {
        _splitted[0][_i3] = datas[_i3];
      }

      console.log(_splitted);
      return _splitted;
    }
  }; //Fonction pour récupérer les temps de natation des filles et le manipuler de manière à créer des séries + calculer les handicap start
  // //Appelée depuis la fonction AjaxCall
  // Gestion d'évènement click pour ajouter un garçon et ses données dans la bdd corresondante
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

    for (var _i4 = 0; _i4 < datas.length; _i4++) {
      if (datas[_i4].lr_distance == 400) {
        split[0].push(datas[_i4]);
      } else if (datas[_i4].lr_distance == 800) {
        split[1].push(datas[_i4]);
      }
    }

    return split;
  }; // Fonction permettant de calculer le handicap start de chaque athlète conformément au réglement de la FFPM


  var calculateHandicapStart = function calculateHandicapStart(datas) {
    for (var _i5 = 0; _i5 < datas.length; _i5++) {
      for (var _j2 = 0; _j2 < datas[_i5].length; _j2++) {
        datas[_i5][_j2].lr_handicap = formatHandicapTime(Math.abs(parseInt(datas[_i5][0].points) - parseInt(datas[_i5][_j2].points)));
        ajaxCall(['updateHandicap', 0, [datas[_i5][_j2].lr_handicap, datas[_i5][_j2].ath_id]]);
      }
    }

    return datas;
  }; // Fonction permettant la saisie et la gestion du temps et des points de chaque athlète
  // cf main.js pour + d'infos sur les fonctions utilisés


  var laserRunTimeHandler = function laserRunTimeHandler(arrayStr, data, id) {
    manipulateTimeInput(arrayStr, parseInt($('#' + arrayStr[1] + '_' + id + '').val()), parseInt($('#' + arrayStr[2] + '_' + id + '').val()), id);
    calculatePoints(parseInt($('#' + arrayStr[1] + '_' + id + '').val() * 60) + parseInt($('#' + arrayStr[2] + '_' + id + '').val()), id, minIntoSec(data.lr_time), data, arrayStr);
  };

  ajaxCall(['countLRAth', 'athletes']);
  $('#boysHeats').on('click', 'button', function (e) {
    var target = e.target.id;
    var func = target.replace(/[0-9]/g, '');
    var id = target.replace(/[^0-9.]/g, '');
    var athTime = minIntoSec('' + $('#minutes_' + id + '').val() + ' ' + $('#seconds_' + id + '').val() + '');
    var athPoints = $('#lr_points_' + id + '').text();
    var athHeat = $(this).parent().parent().parent().prop('id');
    var athArrival = $('#arrival_' + id + '').val();

    if (func == 'add_') {
      ajaxCall(['insertLRAthleteResult', 2, [id, athTime, athPoints, athHeat, athArrival]]);
    } else if (func == 'edit_') {
      ajaxCall(['editAthLaserRunResults', 2, [id, athTime, athPoints, athArrival]]);
    }

    transformAddButton(id);
    $('.tooltipped').tooltip();
  }); // Gestion d'évènement click pour ajouter une fille et ses données dans la bdd correspondante

  $('#girlsHeats').on('click', 'button', function (e) {
    var target = e.target.id;
    var func = target.replace(/[0-9]/g, '');
    var id = target.replace(/[^0-9.]/g, '');
    var athTime = minIntoSec('' + $('#minutes_' + id + '').val() + ' ' + $('#seconds_' + id + '').val() + '');
    var athPoints = $('#lr_points_' + id + '').text();
    var athHeat = $(this).parent().parent().parent().prop('id');
    var athArrival = $('#arrival_' + id + '').val();

    if (func == 'add_') {
      ajaxCall(['insertLRAthleteResult', 2, [id, athTime, athPoints, athHeat, athArrival]]);
    } else if (func == 'edit_') {
      ajaxCall(['editAthLaserRunResults', 2, [id, athTime, athPoints, athArrival]]);
    }

    transformAddButton(id);
    $('.tooltipped').tooltip();
  });
  $('#modalSpace').focusout(function () {
    console.log('focusout');
  }); ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Appel des fonctions
  //Garçons

  ajaxCall(['getSavedTimes', 1, 1]);
  ajaxCall(['getLRAth', 1, 1]); //Filles

  ajaxCall(['getSavedTimes', 1, 0]);
  ajaxCall(['getLRAth', 1, 0]);
}