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
		cleanAndSend(sorted);
	}

	// Fonction permettant de retirer les éléments vides, null ou undefined avant de les envoyer dans la bdd
	function cleanAndSend(datas) {
		let cleaned = datas.filter((e) => e.length);
		for (let i = 0; i < cleaned.length; i++) {
			for (let j = 0; j < cleaned[i].length; j++) {
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
	
	ajaxCall(['getAllBoysDatas', 4]);
	ajaxCall(['getAllGirlsDatas', 4]);
}

