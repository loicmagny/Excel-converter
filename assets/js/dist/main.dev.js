"use strict";

// Fonction générale réalisant un appel ajax
// // Prends en paramètre un tableau de paramètres
function ajaxCall(array) {
  var data = []; // Tri des données

  for (var i = 0; i < array.length; i++) {
    data[i] = array[i];
  } //Appel Ajax:
  // - un bool pour signaler l'envoi de l'appel
  // - une str pour le nom de la fonction à appeler
  // - un int, pour déterminer quel controller appeler (1 pour athlete, 2 pour swimming, 3 pour laserrun etc)
  // - un tableau de paramètres pour les fonctions nécessitant des paramètres


  $.post('handler.php', {
    autoCall: true,
    "function": data[0],
    file: data[1],
    arg: data[2]
  }, function (result) {
    // Parse les données en JSON vers quelque chose d'exploitable en Js
    var datas = JSON.parse(result); // Condition pour déterminer la page sur laquelle on se trouve
    // Chaque page, en fonction des noms de fonctions passés en paramètre de l'appel, appelle les fonctions nécéssaires

    if ($(location).attr('href') == BOARD || $(location).attr('href') == INDEX) {
      if (data[0] == 'getEveryAthletes') {
        generateHTML(datas, 0, 1);
      }

      if (data[0] == 'getEveryAthletesSortedAsc') {
        $('#athBoard').empty();
        generateHTML(datas, 0, 1);
      }

      if (data[0] == 'getSingleAth') {
        datas.swimtime = secIntoMin(datas.swimTime);
        displayInputForUpdate(data[2], datas);
      }

      if (data[0] == 'searchAth') {
        generationSearchDisplay(datas, 0);
      }

      if (data[0] == 'sortAthByCat') {
        generationSearchDisplay(datas, 1);
      }

      if (data[0] == 'sortAthBySex') {
        generationSearchDisplay(datas, 2);
      }

      if (data[0] == 'sortAthByType') {
        generationSearchDisplay(datas, 3);
      }

      if (data[0] == 'athAmountCheck') {
        if (datas[0]['COUNT(1)'] == '0') {
          $('#firstStep').show();
          $('#secondStep').hide();
        } else {
          $('#firstStep').hide();
          $('#secondStep').show();
        }
      }
    }

    if ($(location).attr('href') == SWIMMING) {
      if (data[0] == 'getAllBoys') {
        displayBoyAthletes(datas);
      } else if (data[0] == 'getAllGirls') {
        displayGirlAthletes(datas);
      } else if (data[0] == 'getSavedTimes') {
        console.log(datas);
        formatTimeEntry(['minutes_', 'seconds_', 'points_', 'arrival'], datas);
      } else if (data[0] == 'getAthCatDetails') {
        swimTimeHandler(['boy', 'minutes', 'seconds', 'points', 'ptsPerSec', 'time'], datas, data[2]);
      } else if (data[0] == 'getAthPoints') {
        updatePointsDiv(datas);
      } else if (data[0] == 'getSwimFouls') {
        fillFoulModal(datas, data[2]);
      } else if (data[0] == 'getAthSwimFoul') {
        for (var _i = 0; _i < datas.length; _i++) {
          $('#athFoulsList_' + datas[_i].ath_id + '').empty();
          $('#athLabel_' + datas[_i].ath_id + '').append(' ');
          $('#athPoints_' + datas[_i].ath_id + '').append(' ');
          $('#athFoulsList_' + datas[_i].ath_id + '').append('<div class="collection-item blue-grey darken-1 white-text hoverable valign-wrapper">' + datas[_i].label + '<span class="badge white-text">' + datas[_i].points + '</span>' + '<a class=" btn btn-floating waves-effect waves-light waves-red red"><i class="material-icons deleteFouls" id="deleteAthFoul_' + datas[_i].id + '">delete</i></a>' + '</div>');
        }
      } else if (data[0] == 'addFoulToAth') {
        $('#athLabel_' + datas.ath_id + '').append(+' ');
        $('#athPoints_' + datas.ath_id + '').append(+' ');
        $('#athFoulsList_' + datas.ath_id + '').append('<div class="collection-item blue-grey darken-1 white-text hoverable valign-wrapper">' + datas.label + '<span class="badge white-text">' + datas.points + '</span>' + '<a class=" btn-small btn-floating waves-effect waves-light red"><i class="material-icons deleteFouls" id="deleteAthFoul_' + datas.id + '">delete</i></a>' + '</div>');
      } else if (data[0] == 'removeAthFouls') {
        console.log(datas);
        $('#athFoulsList_' + data[2] + '').empty();
      }
    }

    if ($(location).attr('href') == LASERRUN) {
      if (data[0] == 'getSavedTimes') {
        console.log(datas);

        if (data[2] == 0) {
          getStoredGirlsTimes(datas);
        } else if (data[2] == 1) {
          getStoredBoysTimes(datas);
        }
      } else if (data[0] == 'getAthCatDetails') {
        laserRunTimeHandler(['boy', 'minutes', 'seconds', 'lr_points', 'lr_ptsPerSec'], datas, data[2]);
        laserRunTimeHandler(['girl', 'minutes', 'seconds', 'lr_points', 'lr_ptsPerSec'], datas, data[2]);
      } else if (data[0] == 'getLRSavedTimes') {
        formatTimeEntry(['minutes_', 'seconds_', 'lr_points_', 'arrival_'], datas);
      } else if (data[0] == 'getAthHandicap') {}
    }

    if ($(location).attr('href') == RESULTS) {
      if (data[0] == 'getAllBoysDatas') {
        calculateResults(datas);
        datas = 0;
      } else if (data[0] == 'getAllGirlsDatas') {// calculateResults(datas);
      } else if (data[0] == 'valueChecker') {
        if (datas[0]['COUNT(1)'] == '0') {
          for (var _i2 = 0; _i2 < data[2][1].length; _i2++) {
            for (var j = 0; j < data[2][1][_i2].length; j++) {
              ajaxCall(['insertAthResult', 4, [total = parseInt(data[2][1][_i2][j]['lr_points']) + parseInt(data[2][1][_i2][j]['points']), data[2][1][_i2][j]['ath_id'], data[2][1][_i2][j]['time'], data[2][1][_i2][j]['lr_time'], data[2][1][_i2][j]['points'], data[2][1][_i2][j]['lr_points'], data[2][1][_i2][j]['lr_handicap']]]);
            }
          }
        } else if (datas[0]['COUNT(1)'] == '1') {}
      } else if (data[0] == 'getAllAthResult') {
        var cleaned = Object.values(datas).filter(function (e) {
          return e.length;
        });
        generateHTML(cleaned, '' + formatGender(cleaned[0][0]['gender']) + '', 4);

        for (var _i3 = 0; _i3 < Object.keys(cleaned).length; _i3++) {
          for (var _j = 0; _j < Object.keys(cleaned[_i3]).length; _j++) {
            ajaxCall(['editEndPlace', 4, [cleaned[_i3][_j]['ath_id'], _j + 1]]);
          }
        }
      }
    }

    if ($(location).attr('href') == OPTIONS) {
      if (data[0] == 'getAllCatIds') {
        fillCatSelect(datas);
      }

      if (data[0] == 'getCategoryDetails') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateCatNames') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateSwimDistance') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateSwimTime') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateSwimPoints') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateSwimPtsPerSec') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateLRDistance') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateLRTurns') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateLRTime') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateLRPtsPerSec') {
        updateSelect(datas, data[2]);
      }

      if (data[0] == 'updateLRPoints') {
        updateSelect(datas, data[2]);
      }
    }
  });
} // Fonction pour créer un tableau multidimensionnel (utilité à confirmer)


function dynamicMatrix(size) {
  var matrix = [];

  for (var i = 0; i < size; i++) {
    matrix[i] = new Array(size);
  }

  return matrix;
} //Transforme le temps de type int vers une string de type MM:SS (60 = '01:00')


function secIntoMin(time) {
  var minutes = parseInt(time / 60);
  var seconds = parseInt(time % 60);

  if (minutes <= 10 && seconds >= 10) {
    return '0' + minutes + ':' + seconds + '';
  } else if (seconds < 10 && minutes > 10) {
    return '' + minutes + ':0' + seconds + '';
  } else if (minutes < 10 && seconds < 10) {
    return '0' + minutes + ':0' + seconds + '';
  } else {
    return '' + minutes + ':' + seconds + '';
  }
} //Transforme le temps en string de type MM:SS en un int ('01:00' = 60)


function minIntoSec(str) {
  var minutes = 0;
  var seconds = 0;

  if (str.length > 4) {
    minutes = str[0] + str[1];
    seconds = str[3] + str[4];
  } else if (str.length == 4) {
    minutes = str[0];
    seconds = str[2] + str[3];
  } else if (str.length < 4) {
    minutes = str[0];
    seconds = str[2] + str[3];
  } else {
    minutes = str[0];
    seconds = str[1];
  }

  return parseInt(minutes) * 60 + parseInt(seconds);
} // Découpe une string de temps type MM:SS en une string de temps type MMSS pour une manipulation ultérieure


function splitTimeForInputDisplay(str) {
  var string = str.replace(/[^0-9.]/g, '');
  return [string[0] + string[1], string[2] + string[3]];
} // Remplit les input de temps et ajoute/enlève des class css


function manipulateTimeInput(arrayStr, minutes, seconds, id) {
  if (!minutes) {
    minutes = 0;
  }

  if ($('#' + arrayStr[1] + '_' + id + '').is('empty') || minutes == null || minutes == undefined) {
    if (seconds > 60) {
      $('#' + arrayStr[1] + '_' + id + '').val(minutes += 1).siblings('label').addClass('active');
    } else {
      seconds %= 60;
      $('#' + arrayStr[1] + '_' + id + '').val(0).siblings('label').addClass('active');
    }
  } else {
    if (seconds >= 60) {
      $('#' + arrayStr[1] + '_' + id + '').val(parseInt(seconds / 60)).siblings('label').addClass('active', 'blue');
      $('#' + arrayStr[2] + '_' + id + '').val(parseInt(seconds % 60)).siblings('label').addClass('active', 'blue');
    } else {
      $('#' + arrayStr[1] + '_' + id + '').val(parseInt(minutes)).siblings('label').addClass('active');
    }
  }

  $('#' + arrayStr[2] + '_' + id + '').val(seconds %= 60).siblings('label').addClass('active');
} // Effectue le calcul des points en fonction des barèmes contenus dans la bdd categories


function calculatePoints(athTime, id, standard, data, arrayStr) {
  var points = 0;
  var delta = 0;

  if ($.isNumeric(athTime)) {
    if (athTime < standard) {
      while (parseInt(delta) + parseInt(athTime) < standard) {
        delta++;
      }

      points = parseInt(delta) * parseInt(data['' + arrayStr[4] + '']) + parseInt(data['' + arrayStr[3] + '']);

      if ($.isNumeric(points)) {
        $('#' + arrayStr[3] + '_' + id + '').html(points);
      }
    }

    if (athTime > standard) {
      while (parseInt(delta) + parseInt(athTime) > standard) {
        delta--;
      }

      points = parseInt(delta) * parseInt(data['' + arrayStr[4] + '']) + parseInt(data['' + arrayStr[3] + '']);

      if ($.isNumeric(points)) {
        $('#' + arrayStr[3] + '_' + id + '').html(points);
      }
    }

    if (athTime == standard && $.isNumeric(data['' + arrayStr[3] + ''])) {
      $('#' + arrayStr[3] + '_' + id + '').html(data['' + arrayStr[3] + '']);
    }
  }
} // Remplit les input de temps et ajoute/enlève des class css


function formatTimeEntry(arrayStr, datas) {
  var success = 0;

  for (var i = 0; i < datas.length; i++) {
    var time = splitTimeForInputDisplay(secIntoMin(datas[i]['time']));
    $('#' + arrayStr[0] + '' + datas[i]['ath_id'] + '').val(time[0]).siblings('label').addClass('active');
    $('#' + arrayStr[1] + '' + datas[i]['ath_id'] + '').val(time[1]).siblings('label').addClass('active');
    $('#' + arrayStr[2] + '' + datas[i]['ath_id'] + '').html(datas[i]['points']);

    if (datas[i]['arrival']) {
      $('#' + arrayStr[3] + '' + datas[i]['ath_id'] + '').val(datas[i]['arrival']).siblings('label').addClass('active');
    }

    transformAddButton(datas[i]['ath_id']);
    success++;

    if (success == $('#boysTable_' + i + '_content').children().length - 1 || success == $('#girlsTable_' + i + '_content').children().length - 1) {
      success = 0;
    }
  }
} // Permet de formater le genre des athlètes d'un int vers une str


function formatGender(str) {
  if (str == 1) {
    return 'boy';
  } else if (str == 0) {
    return 'girl';
  }
} //Permet de remplir la modale pour les fautes:
// notamment le select + la liste des pénalités pour l'althlete


function fillFoulModal(datas, id) {
  for (x in datas) {
    // $('#foulSelect_' + id + '').empty();
    $('#foulSelect_' + id + '').append('<option value="' + datas[x].points + ' " id="select_' + datas[x].id + '">' + datas[x].label + ' </option>');
    $('select').formSelect();
  }

  $('#foulSelect_' + id + '').change(function () {
    $('#foulLabel_' + id + '').html($('#foulSelect_' + id + ' option:selected').text());
    $('#foulPoints_' + id + '').html($('#foulSelect_' + id + ' option:selected').val());
  });
  $('.collection').on('click', 'a', function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    var id = $(this).children().attr('id').replace(/[^0-9.]/g, '');
    console.log(id);
    ajaxCall(['removeAthFouls', 5, parseInt(id)]);
  });
  $('.modal-footer').on('click', 'button', function (e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    var id = e.target.id.replace(/[^0-9.]/g, '');

    if ($(this).hasClass('validate')) {
      var foul = $('#foulSelect_' + id + ' option:selected').attr('id').replace(/[^0-9.]/g, '');
      ajaxCall(['addFoulToAth', 5, [id, foul]]);
      M.toast({
        html: 'Pénalité sauvegardé'
      });
    } else if ($(this).hasClass('abandon')) {// ajaxCall(['deleteAth', 0, id])
    } else if ($(this).hasClass('forfeit')) {
      console.log(id);
      ajaxCall(['insertAthleteResult', 1, [0, id, 0, 0, 0, 0]]);
      M.toast({
        html: 'Validé'
      });
    }
  });
}

$('.center').on('click', 'a', function () {
  var id = this.id.replace(/[^0-9.]/g, '');
  ajaxCall(['getSwimFouls', 5, id]);
  ajaxCall(['getAthSwimFoul', 5, id]);
});