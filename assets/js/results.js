if ($(location).attr('href') == RESULTS) {
	// Fonction pour calculer les résultats finaux de chaque athlète
	function calculateResults(datas) {
		let sorted = [[]];
		for (let i = 1; i <= Object.keys(datas).length; i++) {
			sorted.push(datas[i]);
			for (let j = 0; j < Object.keys(datas[i]).length; j++) {
				sorted[i][j]['lr_time'] =
					parseInt(datas[i][j]['lr_time']) -
					parseInt(minIntoSec(datas[i][j]['lr_handicap']));
				sorted[i][j]['lr_points'] =
					parseInt(datas[i][j]['lr_points']) +
					parseInt(minIntoSec(datas[i][j]['lr_handicap']));
			}
		}
		console.log(sorted);
		cleanAndSend(sorted);
	}

	// Fonction permettant de retirer les éléments vides, null ou undefined avant de les envoyer dans la bdd
	function cleanAndSend(datas) {
		let cleaned = datas.filter(e => e.length);
		for (let i = 0; i < cleaned.length; i++) {
			for (let j = 0; j < cleaned[i].length; j++) {
				console.log(cleaned);
				ajaxCall([
					'valueChecker',
					4,
					[parseInt(cleaned[i][j]['ath_id']), cleaned]
				]);
			}
		}
		ajaxCall(['getAllAthResult', 4, [1]]);
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Appel des fonctions

	// ajaxCall(['getAllBoysDatas', 4]);
	// ajaxCall(['getAllGirlsDatas', 4]);
	ajaxCall(['getLRSavedResultsByCategories', 1, [1]]);
	ajaxCall(['getLRSavedResultsByCategories', 1, [0]]);

	function formatResultDatas(datas) {
		let size = 0;
		for (let i = 1; i < Object.keys(datas).length; i++) {
			if (Object.keys(datas).length > 1) {
				size++;
			}
		}
		let results = dynamicMatrix(size);
		for (let i = 1; i < Object.keys(datas).length; i++) {
			for (let j = 0; j < Object.keys(datas[i]).length; j++) {
				results[i - 1][j] = datas[i][j];
			}
		}

		const cleaned = results.filter(element => {
			if (Object.keys(element).length !== 0) {
				return true;
			}
			return false;
		});

		console.log(cleaned[1][0].gender);
		console.log(cleaned);
		generateResultsBoard(cleaned, formatGender(cleaned[1][0].gender));
		for (let i = 1; i < Object.keys(cleaned).length; i++) {
			for (let j = 0; j < Object.keys(cleaned[i]).length; j++) {
				// ajaxCall([
				// 	'valueChecker',
				// 	4,
				// 	[parseInt(cleaned[i][j]['ath_id']), cleaned]
				// ]);
			}
		}
	}
}
