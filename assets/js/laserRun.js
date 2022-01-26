if ($(location).attr('href') == LASERRUN) {
	//Fonction pour récupérer les temps de natation des garcçons et le manipuler de manière à créer des séries + calculer les handicap start
	// //Appelée depuis la fonction AjaxCall
	function getStoredBoysTimes(datas) {
		let splitted = splitAthletesByDist(datas);
		for (i in splitted) {
			for (j in splitted) {
				splitted = calculateHandicapStart(splitted);
			}
		}
		generateHTML(splitted, 'boy', 3);
		$('.collapsible').collapsible();
		$('.boySec').focusout(function () {
			let id = $(this)
				.prop('id')
				.replace(/[^0-9.]/g, '');
			ajaxCall(['getAthCatDetails', 3, (x = id)]);
		});
		ajaxCall(['getLRSavedTimes', 2, 1]);
	}
	//Fonction pour récupérer les temps de natation des filles et le manipuler de manière à créer des séries + calculer les handicap start
	// //Appelée depuis la fonction AjaxCall
	function getStoredGirlsTimes(datas) {
		let splitted = splitAthletesByDist(datas);
		for (i in splitted) {
			for (j in splitted) {
				splitted = calculateHandicapStart(splitted);
			}
		}
		generateHTML(splitted, 'girl', 3);
		$('.collapsible').collapsible();
		$('.girlSec').focusout(function () {
			let id = $(this)
				.prop('id')
				.replace(/[^0-9.]/g, '');
			ajaxCall(['getAthCatDetails', 3, (x = id)]);
		});
		ajaxCall(['getLRSavedTimes', 2, 0]);
	}
	// Gestion d'évènement click pour ajouter un garçon et ses données dans la bdd corresondante
	// // A retravailler
	$('#boysHeats').on('click', 'button', function (e) {
		let target = e.target.id;
		let id = target.replace(/[^0-9.]/g, '');
		$('#add_' + id + '').click(function () {
			let athTime = minIntoSec(
				'' +
					$('#minutes_' + id + '').val() +
					' ' +
					$('#seconds_' + id + '').val() +
					''
			);
			let athPoints = $('#lr_points_' + id + '').text();
			let athHeat = $(this).parent().parent().parent().prop('id');
			let athArrival = $('#arrival_' + id + '').val();
			ajaxCall([
				'insertLRAthleteResult',
				2,
				[id, athTime, athPoints, athHeat, athArrival]
			]);
			transformAddButton(id);
			$('.tooltipped').tooltip();
		});
		// $('#edit_' + id + '').click(function () {
		// 	ajaxCall([
		// 		'editAthleteResult',
		// 		1,
		// 		[id, athTime, athHeat, athPoints, arrival, 0, 1]
		// 	]);
		// });
	});
	// Gestion d'évènement click pour ajouter une fille et ses données dans la bdd correspondante
	// // A retravailler
	$('#girlsHeats').on('click', 'button', function (e) {
		let target = e.target.id;
		let id = target.replace(/[^0-9.]/g, '');
		$('#add_' + id + '').click(function () {
			let athTime = minIntoSec(
				'' +
					$('#minutes_' + id + '').val() +
					' ' +
					$('#seconds_' + id + '').val() +
					''
			);
			let athPoints = $('#lr_points_' + id + '').text();
			let athHeat = $(this).parent().parent().parent().prop('id');
			let athArrival = $('#arrival_' + id + '').val();
			ajaxCall([
				'insertLRAthleteResult',
				2,
				[id, athTime, athPoints, athHeat, athArrival]
			]);
			transformAddButton(id);
			$('.tooltipped').tooltip();
		});
		// $('#edit_' + id + '').click(function () {
		// 	ajaxCall([
		// 		'editAthleteResult',
		// 		1,
		// 		[id, athTime, athHeat, athPoints, arrival, 0, 1]
		// 	]);
		// });
	});
	// Fonction pour soustraire le handicap start au temps final réalisé par l'athlète
	function substractHandicap(time, id) {
		let result = ajaxCall(['getAthHandicap', 0, id]);
		if (!result) {
			return parseInt(time);
		} else {
			return parseInt(time) - formatHandicapTime(parseInt(result));
		}
	}
	// Fonction pour mettre en forme le handicap start (enregistré en secondes) en une str dans un format particulier
	function formatHandicapTime(time) {
		let minutes = parseInt(time / 60);
		let seconds = parseInt(time % 60);

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
	}
	// Fonction permettant de séparer les athlètes en fonction des distances de combiné parcourues (800 ou 400m)
	function splitAthletesByDist(datas) {
		let split = new Array([], []);
		for (let i = 0; i < datas.length; i++) {
			if (datas[i].lr_distance == 400) {
				split[0].push(datas[i]);
			} else if (datas[i].lr_distance == 800) {
				split[1].push(datas[i]);
			}
		}
		return split;
	}
	// Fonction permettant de calculer le handicap start de chaque athlète conformément au réglement de la FFPM
	function calculateHandicapStart(datas) {
		for (let i = 0; i < datas.length; i++) {
			for (let j = 0; j < datas[i].length; j++) {
				datas[i][j].lr_handicap = formatHandicapTime(
					Math.abs(parseInt(datas[i][0].points) - parseInt(datas[i][j].points))
				);

				ajaxCall([
					'updateHandicap',
					0,
					[datas[i][j].lr_handicap, datas[i][j].ath_id]
				]);
			}
		}
		return datas;
	}
	// Fonction permettant la saisie et la gestion du temps et des points de chaque athlète
	// cf main.js pour + d'infos sur les fonctions utilisés
	function laserRunTimeHandler(arrayStr, data, id) {
		manipulateTimeInput(
			arrayStr,
			parseInt($('#' + arrayStr[1] + '_' + id + '').val()),
			parseInt($('#' + arrayStr[2] + '_' + id + '').val()),
			id
		);
		calculatePoints(
			parseInt($('#' + arrayStr[1] + '_' + id + '').val() * 60) +
				parseInt($('#' + arrayStr[2] + '_' + id + '').val()),
			id,
			minIntoSec(data.lr_time),
			data,
			arrayStr
		);
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Appel des fonctions

	//Garçons
	ajaxCall(['getSavedTimes', 1, 1]);
	// ajaxCall(['getLRAth', 1, 1]);

	//Filles
	ajaxCall(['getSavedTimes', 1, 0]);
	// ajaxCall(['getLRAth', 1, 0]);
}
