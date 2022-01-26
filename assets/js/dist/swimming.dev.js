"use strict";

if ($(location).attr('href') == SWIMMING) {
  // Fonction permettant l'affichage des séries de natations garçons
  var displayBoyAthletes = function displayBoyAthletes(datas) {
    var sorted = [];

    for (x in datas) {
      sorted[x] = sortAthletes(datas[x]);
    }

    generateHTML(sorted, 'boy', 2);
    $('.collapsible').collapsible();
    ajaxCall(['getSavedTimes', 1, 1]);
    $('.boySec').focusout(function () {
      var id = $(this).prop('id').replace(/[^0-9.]/g, '');
      ajaxCall(['getAthCatDetails', 'categories', id]);
    });
  }; // Fonction permettant l'affichage des séries de natations filles


  var displayGirlAthletes = function displayGirlAthletes(datas) {
    var sorted = [];

    for (x in datas) {
      sorted[x] = sortAthletes(datas[x]);
    }

    generateHTML(sorted, 'girl', 2);
    $('.collapsible').collapsible();
    ajaxCall(['getSavedTimes', 1, 0]);
    $('.girlSec').focusout(function () {
      var id = $(this).prop('id').replace(/[^0-9.]/g, '');
      ajaxCall(['getAthCatDetails', 'categories', id]);
    });
  }; // Gestionnaire d'évènements pour, au clic, récupérer les infos de l'athlète (Fille ou garçon) de la div afin de les envoyer en bdd


  // $('.addSwimResult').click(function(e) {
  // 	let target = e.target.id;
  // 	let id = target.replace(/[^0-9.]/g, '');
  //
  // 	let athTime =
  // 		parseInt($('#minutes_' + id + '').val() * 60) +
  // 		parseInt($('#seconds_' + id + '').val());
  // 	let athPoints = $('#points_' + id + '').text();
  // 	let athHeat = $(this).parent().parent().parent().prop('id');
  // 	athHeat = athHeat.replace(/[^0-9.]/g, '');
  // 	transformAddButton(id);
  // 	$('.tooltipped').tooltip();
  // 	if ($(this).hasClass('editResult')) {
  // 		ajaxCall(['editAthleteTime', 1, [athTime, id]]);
  // 		ajaxCall(['editAthleteResult', 1, [athPoints, id]]);
  // 	} else {
  // 		// ajaxCall([
  // 		// 	'insertAthleteResult',
  // 		// 	1,
  // 		// 	[athTime, id, athHeat, athPoints, 0, 0]
  // 		// ]);
  // 	}
  // });
  // Fonction pour séparer les athlètes en fonction des distances de natation (50, 100 ou 200m)
  var sortAthletes = function sortAthletes(obj) {
    var heats = dynamicMatrix(Math.ceil(obj.length / 5));
    var j = 0;
    var k = 0;
    var l = 0;

    for (var i = 0; i < obj.length; i++) {
      obj[i].swimTime = parseInt(obj[i].swimTime.replace(/\D/g, ''));

      if (obj[i].swimTime >= 60) {
        obj[i].swimTime = '' + obj[i].swimTime;
      }

      heats[j][k] = obj[i];
      l++;
      k++;

      if (obj.length > 5) {
        if (k == Math.ceil(obj.length / 2) || k == 5) {
          j++;
          l = 0;
          k = 0;
        }
      }
    }

    return heats;
  }; // Fonction permettant la saisie et la gestion du temps et des points de chaque athlète
  // cf main.js pour + d'infos sur les fonctions utilisés


  var swimTimeHandler = function swimTimeHandler(arrayStr, data, id) {
    manipulateTimeInput(arrayStr, parseInt($('#' + arrayStr[1] + '_' + id + '').val()), parseInt($('#' + arrayStr[2] + '_' + id + '').val()), id);
    calculatePoints(parseInt($('#' + arrayStr[1] + '_' + id + '').val()) * 60 + parseInt($('#' + arrayStr[2] + '_' + id + '').val()), id, minIntoSec(data.time), data, arrayStr);
  };

  $('#boysHeats').on('click', 'button', function (e) {
    var target = e.target.id;
    var id = target.replace(/[^0-9.]/g, '');
    var fouls = ajaxCall(['getAthSwimFoul', 5, id]);
    console.log(fouls);
    var athTime = parseInt($('#minutes_' + id + '').val() * 60) + parseInt($('#seconds_' + id + '').val());
    var athPoints = $('#points_' + id + '').text();
    var athHeat = $(this).parent().parent().parent().prop('id');
    athHeat = athHeat.replace(/[^0-9.]/g, '');
    transformAddButton(id);
    $('.tooltipped').tooltip();
    ajaxCall(['insertAthleteResult', 1, [athTime, id, athHeat, athPoints, 0, 1]]);
    M.toast({
      html: 'Résultat sauvegardé'
    }); // $('#edit_' + id + '').click(function () {
    // 	ajaxCall([
    // 		'editAthleteResult',
    // 		1,
    // 		[athTime, id, athHeat, athPoints, 0, 1]
    // 	]);
    // });
  });
  $('#girlsHeats').on('click', 'button', function (e) {
    var target = e.target.id;
    var id = target.replace(/[^0-9.]/g, '');
    var athTime = parseInt($('#minutes_' + id + '').val() * 60) + parseInt($('#seconds_' + id + '').val());
    var athPoints = $('#points_' + id + '').text();
    var athHeat = $(this).parent().parent().parent().prop('id');
    athHeat = athHeat.replace(/[^0-9.]/g, '');
    transformAddButton(id);
    $('.tooltipped').tooltip(); // ajaxCall([
    // 	'insertAthleteResult',
    // 	1,
    // 	[athTime, id, athHeat, athPoints, 0, 0]
    // ]);
    // $('#edit_' + id + '').click(function () {
    // 	ajaxCall([
    // 		'editAthleteResult',
    // 		1,
    // 		[athTime, id, athHeat, athPoints, 0, 1]
    // 	]);
    // });
  });
} ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Appel des fonctions


ajaxCall(['getAllBoys']);
ajaxCall(['getAllGirls']);