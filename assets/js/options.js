if ($(location).attr('href') == OPTIONS) {
	// Fonction permettant de remplir le select des catégories avec chaque catégories contenues dans la table categories
	function fillCatSelect(datas) {
		for (x in datas) {
			$('#catSelect').append(
				'<option value="' +
					datas[x].cat_id +
					'" id="select_' +
					datas[x].cat_id +
					'">' +
					datas[x].cat_name +
					'</option>'
			);
			$('select').formSelect();
		}
	}
	// Fonction pour mettre le select en cas de modification
	function updateSelect(datas) {
		$('#select_' + datas.cat_id + '').html(
			'<option value="' +
				datas.cat_id +
				'" id="select_' +
				datas.cat_id +
				'">' +
				datas.cat_name +
				'</option>'
		);
		fillOptionsInputs(datas);
	}

	// Gestionnaires d'évènements qui, au changement, sauvegarde les nouvelles données en base de données, écrasant les anciennes
	$('#catSelect').change(function () {
		let id = $('#catSelect').val();
		ajaxCall(['getCategoryDetails', 3, [id]]);
	});
// Update des champs de la table categories en temps réel grâce à l'évènement .change
	$('#cat_name').change(function () {
		let id = $('#catSelect').val();
		let name = $('#cat_name').val();
		ajaxCall(['updateCatName', 3, [id, name]]);
	});
	$('#swimDistance').change(function () {
		let id = $('#catSelect').val();
		let swimDistance = $('#swimDistance').val();
		ajaxCall(['updateSwimDistance', 3, [id, swimDistance]]);
	});
	$('#swimTime').change(function () {
		let id = $('#catSelect').val();
		let swimTime = $('#swimTime').val();
		ajaxCall(['updateSwimTime', 3, [id, swimTime]]);
	});
	$('#swimPoints').change(function () {
		let id = $('#catSelect').val();
		let swimPoints = $('#swimPoints').val();
		ajaxCall(['updateSwimPoints', 3, [id, swimPoints]]);
	});
	$('#swimPtsPerSec').change(function () {
		let id = $('#catSelect').val();
		let swimPtsPerSec = $('#swimPtsPerSec').val();
		ajaxCall(['updateSwimPtsPerSec', 3, [id, swimPtsPerSec]]);
	});
	$('#lr_distance').change(function () {
		let id = $('#catSelect').val();
		let lrDistance = $('#lr_distance').val();
		ajaxCall(['updateLRDistance', 3, [id, lrDistance]]);
	});
	$('#lr_turns').change(function () {
		let id = $('#catSelect').val();
		let lrTurns = $('#lr_turns').val();
		ajaxCall(['updateLRTurns', 3, [id, lrTurns]]);
	});
	$('#lr_time').change(function () {
		let id = $('#catSelect').val();
		let lrTime = $('#lr_time').val();
		ajaxCall(['updateLRTime', 3, [id, lrTime]]);
	});
	$('#lr_ptsPerSec').change(function () {
		let id = $('#catSelect').val();
		let lrPtsPerSec = $('#lr_ptsPerSec').val();
		ajaxCall(['updateLRPtsPerSec', 3, [id, lrPtsPerSec]]);
	});
	$('#lr_points').change(function () {
		let id = $('#catSelect').val();
		let lrPoints = $('#lr_points').val();
		ajaxCall(['updateLRPoints', 3, [id, lrPoints]]);
	});
}

//Fonction pour remplir et mettre en forme les input lorsque la catégorie à modifier est choisie par l'utilisateur
function fillOptionsInputs(array) {
	$('#cat_name').val(array.cat_name).siblings('label').addClass('active');
	$('#swimDistance').val(array.distance).siblings('label').addClass('active');
	$('#swimTime').val(array.time).siblings('label').addClass('active');
	$('#swimPoints').val(array.points).siblings('label').addClass('active');
	$('#swimPtsPerSec').val(array.ptsPerSec).siblings('label').addClass('active');
	$('#lr_distance').val(array.lr_distance).siblings('label').addClass('active');
	$('#lr_turns').val(array.lr_turns).siblings('label').addClass('active');
	$('#lr_time').val(array.lr_time).siblings('label').addClass('active');
	$('#lr_points').val(array.lr_points).siblings('label').addClass('active');
	$('#lr_ptsPerSec')
		.val(array.lr_ptsPerSec)
		.siblings('label')
		.addClass('active');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Appel des fonctions

ajaxCall(['getAllCatIds', 3]);
