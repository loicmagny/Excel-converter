"use strict";

if ($(location).attr('href') == RESULTS) {
  // Fonction pour calculer les résultats finaux de chaque athlète
  var calculateResults = function calculateResults(datas) {
    var sorted = [[]];

    for (var i = 1; i <= Object.keys(datas).length; i++) {
      sorted.push(datas[i]);

      for (var j = 0; j < Object.keys(datas[i]).length; j++) {
        sorted[i][j]['lr_time'] = parseInt(datas[i][j]['lr_time']) - parseInt(minIntoSec(datas[i][j]['lr_handicap']));
        sorted[i][j]['lr_points'] = parseInt(datas[i][j]['lr_points']) + parseInt(minIntoSec(datas[i][j]['lr_handicap']));
      }
    }

    console.log(sorted);
    cleanAndSend(sorted);
  }; // Fonction permettant de retirer les éléments vides, null ou undefined avant de les envoyer dans la bdd


  var cleanAndSend = function cleanAndSend(datas) {
    var cleaned = datas.filter(function (e) {
      return e.length;
    });

    for (var i = 0; i < cleaned.length; i++) {
      for (var j = 0; j < cleaned[i].length; j++) {
        console.log(cleaned);
        ajaxCall(['valueChecker', 4, [parseInt(cleaned[i][j]['ath_id']), cleaned]]);
      }
    }

    ajaxCall(['getAllAthResult', 4, [1]]);
  }; ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Appel des fonctions
  // ajaxCall(['getAllBoysDatas', 4]);
  // ajaxCall(['getAllGirlsDatas', 4]);


  var formatResultDatas = function formatResultDatas(datas) {
    var size = 0;

    for (var i = 1; i < Object.keys(datas).length; i++) {
      if (Object.keys(datas).length > 1) {
        size++;
      }
    }

    var results = dynamicMatrix(size);

    for (var _i = 1; _i < Object.keys(datas).length; _i++) {
      for (var j = 0; j < Object.keys(datas[_i]).length; j++) {
        results[_i - 1][j] = datas[_i][j];
      }
    }

    var cleaned = results.filter(function (element) {
      if (Object.keys(element).length !== 0) {
        return true;
      }

      return false;
    });
    console.log(cleaned[1][0].gender);
    console.log(cleaned);
    generateResultsBoard(cleaned, formatGender(cleaned[1][0].gender));

    for (var _i2 = 1; _i2 < Object.keys(cleaned).length; _i2++) {
      for (var _j = 0; _j < Object.keys(cleaned[_i2]).length; _j++) {// ajaxCall([
        // 	'valueChecker',
        // 	4,
        // 	[parseInt(cleaned[i][j]['ath_id']), cleaned]
        // ]);
      }
    }
  };

  ajaxCall(['getLRSavedResultsByCategories', 1, [1]]);
  ajaxCall(['getLRSavedResultsByCategories', 1, [0]]);
}