"use strict";

function ajaxCall(array) {
  var data = [];

  for (var i = 0; i < array.length; i++) {
    data[i] = array[i];
  }

  $.post('handler.php', {
    autoCall: true,
    "function": data[0],
    file: data[1],
    arg: data[2]
  }, function (result) {
    var datas = JSON.parse(result);

    if ($(location).attr('href') == swimming) {
      if (data[0] == 'getAllBoys') {
        displayBoyAthletes(datas);
      } else if (data[0] == 'getAllGirls') {
        displayGirlAthletes(datas);
      } else if (data[0] == 'getSavedTimes') {
        formatTimeEntry(datas);
      } else if (data[0] == 'getAthCatDetails') {
        swimTimeHandler(['boy', 'minutes', 'seconds', 'points', 'ptsPerSec', 'time'], datas, data[2]);
      }
    }

    if ($(location).attr('href') == laserRun) {
      if (data[0] == 'getSavedTimes') {
        getStoredBoysTimes(datas);
      } else if (data[0] == 'getAthCatDetails') {
        laserRunTimeHandler(['boy', 'minutes', 'seconds', 'points', 'lr_points', 'lr_ptsPerSec'], datas, data[2]);
      } else if (data[0] == 'getLRSavedTimes') {
        formatTimeEntry(datas);
      } else if (data[0] == 'getAthHandicap') {}
    }
  });
}

function dynamicMatrix(size) {
  var matrix = [];

  for (var i = 0; i < size; i++) {
    matrix[i] = new Array(size);
  }

  return matrix;
}

function secIntoMin(time) {
  var minutes = parseInt(time / 60);
  var seconds = parseInt(time % 60);

  if (minutes < 10 && seconds > 10) {
    return '0' + minutes + ':' + seconds + '';
  } else if (seconds < 10 && minutes > 10) {
    return '' + minutes + ':0' + seconds + '';
  } else if (minutes < 10 && seconds < 10) {
    return '0' + minutes + ':0' + seconds + '';
  } else {
    return '' + minutes + ':' + seconds + '';
  }
}

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
}

function splitTimeForInputDisplay(str) {
  var minutes = '';
  var seconds = '';

  if (str[0] == '0') {
    minutes = str[1];
  } else {
    minutes = str[0] + str[1];
  }

  if (!str[4]) {
    seconds = str[3];
  } else {
    seconds = str[3] + str[4];
  }

  console.log(minutes, seconds);
  return [minutes, seconds];
}

function manipulateTimeInput(arrayStr, minutes, seconds, id) {
  console.log(seconds);

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
      $('#' + arrayStr[1] + '_' + id + '').val(parseInt(minutes += seconds / 60)).siblings('label').addClass('active');
    } else {
      $('#' + arrayStr[1] + '_' + id + '').val(parseInt(minutes)).siblings('label').addClass('active');
    }
  }

  $('#' + arrayStr[2] + '_' + id + '').val(seconds %= 60).siblings('label').addClass('active');
}

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
}

function formatTimeEntry(datas) {
  var success = 0;

  for (var i = 0; i < datas.length; i++) {
    var time = splitTimeForInputDisplay(secIntoMin(datas[i]['time']));
    console.log(time);
    $('#minutes_' + datas[i]['ath_id'] + '').val(time[0]).siblings('label').addClass('active');
    $('#seconds_' + datas[i]['ath_id'] + '').val(time[1]).siblings('label').addClass('active');
    $('#points_' + datas[i]['ath_id'] + '').html(datas[i]['points']);

    if (datas[i]['arrival']) {
      $('#arrival_' + datas[i]['ath_id'] + '').val(datas[i]['arrival']).siblings('label').addClass('active');
    }

    transformAddButton(datas[i]['ath_id']);
    success++;

    if (success == $('#boysTable_' + i + '_content').children().length - 1 || success == $('#girlsTable_' + i + '_content').children().length - 1) {
      success = 0;
    }
  }
}

function transformAddButton(id) {
  $('#actions_' + id + '').empty();
  $('#actions_' + id + '').append('<td class="center">' + '<button class="btn-floating btn-large waves-effect waves-light blue btn tooltipped editResult" data-position="right" data-tooltip="Modifier"' + 'value="edit_' + id + '" ><i id="edit_' + id + '" class="material-icons edit">edit</i>' + '</td>');
}