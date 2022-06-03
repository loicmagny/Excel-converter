$(document).ready(function() {
	materializeDOMFunc();
});
// Fonction permettant d'afficher les différents éléments du DOM nécéssaires au bon fonctionnement et à l'affichage correct des données
function generateIndexBoard(data) {
	if (data.length > 1) {
		for (x in data) {
			data[x].swimTime = secIntoMin(data[x].swimTime);
			$('#athBoard').append(
				'<tr id="athBoard_' +
					x +
					'_content">' +
					'<form enctype="multipart/form-data">' +
					'<td class="center" id="actions_' +
					data[x].id +
					'">' +
					'<div class="row">' +
					'<div class="col offset-s2">' +
					'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue " data-position="left" data-tooltip="Modifier" ><i id="editAth_' +
					data[x].id +
					'" class="material-icons editAth">edit</i>' +
					'</div>' +
					'<div class="col s4">' +
					'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red deleteAth" data-position="top" data-tooltip="Supprimer" ><i  id="deleteAth_' +
					data[x].id +
					'" class="material-icons ">delete</i>' +
					'</div>' +
					'</div>' +
					'</td>' +
					'<td class="center athDetails" id="athLastName_' +
					data[x].id +
					'">' +
					data[x].last_name +
					'</td>' +
					'<td class="center athDetails" id="athFirstName_' +
					data[x].id +
					'">' +
					data[x].first_name +
					'</td>' +
					'<td class="center athDetails" id="athClub_' +
					data[x].id +
					'">' +
					data[x].club +
					'</td>' +
					'<td class="center athDetails" id="athGender_' +
					data[x].id +
					'">' +
					data[x].gender +
					'</td>' +
					'<td class="center athDetails" id="athCat_' +
					data[x].id +
					'">' +
					data[x].cat_name +
					'</td>' +
					'<td class="center athDetails" id="athType_' +
					data[x].id +
					'">' +
					data[x].type_id +
					'</td>' +
					'<td class="center athDetails" id="athTime_' +
					data[x].id +
					'">' +
					data[x].swimTime +
					'</td>' +
					'</form>' +
					'</tr>'
			);
		}
	}
}

function generateSwimmingBoard(data, gender) {
	if (data.length > 1) {
		let k = 1;
		let l = 1;
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].length; j++) {
				$('#' + gender + 'sHeats').append(
					'<li>' +
						'<div class="collapsible-header heat" id="heat_' +
						l +
						'_' +
						gender +
						's"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>Série ' +
						l +
						' -&nbsp; <span id="' +
						gender +
						'sHeatDistance' +
						l +
						'"> </span></div>' +
						'<div class="collapsible-body" id="heat_' +
						l +
						'_' +
						gender +
						's_content">' +
						'<table id="' +
						gender +
						'sTable_' +
						l +
						'">' +
						'<thead>' +
						'<tr>' +
						'<th class="center">Ligne</th>' +
						'<th class="center">Catégorie</th>' +
						'<th class="center">Nom</th>' +
						'<th class="center">Temps</th>' +
						'<th class="center">Points</th>' +
						'<th class="center" id="actions">Actions</th>' +
						'</tr>' +
						'</thead>' +
						'<tbody id="' +
						gender +
						'sTable_' +
						l +
						'_content">' +
						'</tbody>' +
						'</table>' +
						'</div>' +
						'</li>'
				);
				$('select').formSelect();
				for (let x = 0; x < data[i][j].length; x++) {
					$('#' + gender + 'sTable_' + l + '_content').append(
						'<tr>' +
							'<form class="col s12">' +
							'<td class="center">' +
							'<div class="input-field col s6 offset-s3">' +
							'<input class="center ' +
							gender +
							'Line" id="line' +
							data[i][j][x]['id'] +
							'" name="line' +
							data[i][j][x]['id'] +
							'" type="text" class="validate" value="' +
							k +
							'">' +
							'<label class="active" for="line' +
							data[i][j][x]['id'] +
							'">Ligne</label>' +
							'</div>' +
							'</td>' +
							'<td class="center">' +
							data[i][j][x]['cat_name'] +
							'</td>' +
							'<td class="center">' +
							data[i][j][x]['first_name'] +
							' ' +
							data[i][j][x]['last_name'] +
							'</td>' +
							'<td class="center">' +
							'<div class="input-field col s6">' +
							'<input class="center ' +
							gender +
							'Min" id="minutes_' +
							data[i][j][x]['id'] +
							'" name="minutes_' +
							data[i][j][x]['id'] +
							'" type="text" class="validate">' +
							'<label for="minutes_' +
							data[i][j][x]['id'] +
							'">Minutes</label>' +
							'</div>' +
							'<div class="input-field col s6">' +
							'<input class="center ' +
							gender +
							'Sec" id="seconds_' +
							data[i][j][x]['id'] +
							'" name="seconds_' +
							data[i][j][x]['id'] +
							'" type="text" class="validate">' +
							'<label for="seconds_' +
							data[i][j][x]['id'] +
							'">Secondes</label>' +
							'</div>' +
							'</td>' +
							'<td class="center" id="points_' +
							data[i][j][x]['id'] +
							'">' +
							(parseInt(data[i][j][x]['points'])
								? parseInt(data[i][j][x]['points'])
								: '0') +
							'</td>' +
							'<td class="center" id="actions_' +
							data[i][j][x]['id'] +
							'">' +
							'<div class="row">' +
							'<div class="col offset-s2 s4">' +
							'<a class="btn-floating waves-effect waves-light orange btn tooltipped modal-trigger"  href="#foulsModal_' +
							data[i][j][x]['id'] +
							'"data-position="right" data-tooltip="Pénalités"><i class="material-icons addFouls" id="fouls_' +
							data[i][j][x]['id'] +
							'">flag</i></a>' +
							'</div>' +
							'<div class="col s2">' +
							'<button class="btn-floating waves-effect waves-light green btn tooltipped addSwimResult" data-position="right" data-tooltip="Sauvegarder"' +
							'value="add_' +
							data[i][j][x]['id'] +
							'" ><i id="add_' +
							data[i][j][x]['id'] +
							'" class="material-icons">add</i></button>' +
							'</div>' +
							'</div>' +
							'</td>' +
							'</form>' +
							'</tr>'
					);
					k++;
					$('#modalSpace').append(
						'<div id="foulsModal_' +
							data[i][j][x]['id'] +
							'" class="modal modal-fixed-footer blue-grey darken-1 white-text">' +
							'<div class="modal-content container">' +
							'<h4 class="center">Fautes</h4>' +
							'<div class="card-content ">' +
							'<span class="card-title">' +
							data[i][j][x]['last_name'] +
							' ' +
							data[i][j][x]['first_name'] +
							'</span>' +
							'<div class="row">' +
							'<div class="input-field col s12">' +
							'<select id="foulSelect_' +
							data[i][j][x]['id'] +
							'">' +
							'<option value="" selected disabled>Choose your option</option>' +
							'</select>' +
							'<label>Sélectionnez la faute</label>' +
							'</div>' +
							'<div class="row">' +
							'<div>' +
							'Pénalité appliquée : <span id="foulLabel_' +
							data[i][j][x]['id'] +
							'"></span>' +
							'</div>' +
							'</div>' +
							'<div class="row">' +
							'<div>' +
							'Points : <span id="foulPoints_' +
							data[i][j][x]['id'] +
							'"></span>' +
							'</div>' +
							'</div>' +
							'<div class="row" >' +
							'<div class="collection" id="athFoulsList_' +
							data[i][j][x]['id'] +
							'">' +
							'<span>Liste des Pénalités: </span>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'<div class="modal-footer blue-grey darken-1">' +
							'<div class="row">' +
							'<div class="col s4">' +
							'<button class="btn waves-effect waves-light orange forfeit" id="foulsAbandon_' +
							data[i][j][x]['id'] +
							'">Forfait' +
							'<i class="material-icons right">send</i>' +
							'</button>' +
							'</div>' +
							'<div class="col s4">' +
							'<button class="btn waves-effect waves-light red abandon" id="foulsDelete_' +
							data[i][j][x]['id'] +
							'">Abandon / Disqual°' +
							'<i class="material-icons right">cancel</i>' +
							'</button>' +
							'</div>' +
							'<div class="col s4">' +
							'<a class="btn waves-effect waves-light green validate hover foulValidate" id="foulsValidate_' +
							data[i][j][x]['id'] +
							'">Valider' +
							'<i class="material-icons right foulValidate" id="foulsValidate_' +
							data[i][j][x]['id'] +
							'">send</i>' +
							'</a>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>'
					);
					$('select').formSelect();
				}

				$('#' + gender + 'sHeatDistance' + l + '').html(
					'' + data[i][j][0].distance + 'm'
				);

				k = 1;
				l++;
				$('.modal').modal();
			}
		}
	}
}

function generateLaserRunBoard(data, gender) {
	let l = 1;
	let k = 1;
	for (let i = 1; i < data.length + 1; i++) {
		$('#' + gender + 'sHeats').append(
			'<li>' +
				'<div class="collapsible-header heat" id="heat_' +
				i +
				'_' +
				gender +
				's"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>Série ' +
				i +
				' -&nbsp; <span id="' +
				gender +
				'sHeatDistance' +
				i +
				'"> </span></div>' +
				'<div class="collapsible-body" id="heat_' +
				i +
				'_' +
				gender +
				's_content">' +
				'<table id="' +
				gender +
				'sTable_' +
				i +
				'">' +
				'<thead>' +
				'<tr>' +
				'<th class="center">Poste de tir</th>' +
				'<th class="center">Catégorie</th>' +
				'<th class="center">Nom</th>' +
				'<th class="center">Temps</th>' +
				'<th class="center">Points</th>' +
				'<th class="center" id="actions' +
				'">Actions</th>' +
				'</tr>' +
				'</thead>' +
				'<tbody id="' +
				gender +
				'sTable_' +
				i +
				'_content">' +
				'</tbody>' +
				'</table>' +
				'</div>' +
				'</li>' +
				'</ul>'
		);
	}
	for (let j = 0; j < data.length; j++) {
		for (let m = 0; m < data[j].length; m++) {
			$('#' + gender + 'sTable_' + (j + 1) + '_content').append(
				'<tr>' +
					'<form class="col s12">' +
					'<td class="center">' +
					'<div class="input-field  col offset-s2 col s7">' +
					'<input class="center ' +
					gender +
					'Line" id="line' +
					data[j][m]['id'] +
					'" name="line' +
					data[j][m]['id'] +
					'" type="text" class="validate" value="' +
					k +
					'">' +
					'<label class="active" for="line' +
					data[j][m]['id'] +
					'">Poste de tir</label>' +
					'</div>' +
					'</td>' +
					'<td class="center">' +
					data[j][m]['cat_name'] +
					'</td>' +
					'<td class="center">' +
					data[j][m]['first_name'] +
					' ' +
					data[j][m]['last_name'] +
					'</td>' +
					'<td class="center">' +
					'<div class="input-field  col offset-s2 col s7">' +
					'<input class="center ' +
					gender +
					'Min" id="minutes_' +
					data[j][m]['id'] +
					'" name="minutes_' +
					data[j][m]['id'] +
					'" type="text" class="validate">' +
					'<label for="minutes_' +
					data[j][m]['id'] +
					'">Minutes</label>' +
					'</div>' +
					'<div class="input-field  col offset-s2 col s7">' +
					'<input class="center ' +
					gender +
					'Sec" id="seconds_' +
					data[j][m]['id'] +
					'" name="seconds_' +
					data[j][m]['id'] +
					'" type="text" class="validate">' +
					'<label for="seconds_' +
					data[j][m]['id'] +
					'">Secondes</label>' +
					'</div>' +
					'</td>' +
					'<td class="center" id="lr_points_' +
					data[j][m]['id'] +
					'">0</td>' +
					'<td class="center" id="actions_' +
					data[j][m]['id'] +
					'">' +
					'<div class="row">' +
					'<div class="col offset-s2 s4">' +
					'<a class="btn-floating waves-effect waves-light orange btn tooltipped modal-trigger"  href="#foulsModal_' +
					data[j][m]['id'] +
					'"data-position="right" data-tooltip="Pénalités"><i class="material-icons addFouls" id="fouls_' +
					data[j][m]['id'] +
					'">flag</i></a>' +
					'</div>' +
					'<div class="col s2">' +
					'<button class="btn-floating waves-effect waves-light green btn tooltipped addSwimResult" data-position="right" data-tooltip="Sauvegarder"' +
					'value="add_' +
					data[j][m]['id'] +
					'" ><i id="add_' +
					data[j][m]['id'] +
					'" class="material-icons">add</i></button>' +
					'</div>' +
					'</div>' +
					'</td>' +
					'</form>' +
					'</tr>'
			);
			k++;
			$('#modalSpace').append(
				'<div id="foulsModal_' +
					data[j][m]['id'] +
					'" class="modal modal-fixed-footer blue-grey darken-1 white-text">' +
					'<div class="modal-content container">' +
					'<h4 class="center">Fautes</h4>' +
					'<div class="card-content ">' +
					'<span class="card-title">' +
					data[j][m]['last_name'] +
					' ' +
					data[j][m]['first_name'] +
					'</span>' +
					'<div class="row">' +
					'<div class="input-field col s12">' +
					'<select id="foulSelect_' +
					data[j][m]['id'] +
					'">' +
					'<option value="" selected disabled>Choose your option</option>' +
					'</select>' +
					'<label>Sélectionnez la faute</label>' +
					'</div>' +
					'<div class="row">' +
					'<div>' +
					'Pénalité appliquée : <span id="foulLabel_' +
					data[j][m]['id'] +
					'"></span>' +
					'</div>' +
					'</div>' +
					'<div class="row">' +
					'<div>' +
					'Secondes retirées : <span id="foulPoints_' +
					data[j][m]['id'] +
					'"></span>' +
					'</div>' +
					'</div>' +
					'<div class="row" >' +
					'<div class="collection" id="athFoulsList_' +
					data[j][m]['id'] +
					'">' +
					'<span>Liste des Pénalités: </span>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'<div class="modal-footer blue-grey darken-1">' +
					'<div class="row">' +
					'<div class="col s4">' +
					'<button class="btn waves-effect waves-light orange forfeit" id="foulsAbandon_' +
					data[j][m]['id'] +
					'">Forfait' +
					'<i class="material-icons right">send</i>' +
					'</button>' +
					'</div>' +
					'<div class="col s4">' +
					'<button class="btn waves-effect waves-light red abandon" id="foulsDelete_' +
					data[j][m]['id'] +
					'">Abandon / Disqual°' +
					'<i class="material-icons right">cancel</i>' +
					'</button>' +
					'</div>' +
					'<div class="col s4">' +
					'<a class="btn waves-effect waves-light green validate hover foulValidate" id="foulsValidate_' +
					data[j][m]['id'] +
					'">Valider' +
					'<i class="material-icons right foulValidate" id="foulsValidate_' +
					data[j][m]['id'] +
					'">send</i>' +
					'</a>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>'
			);
		}
		$('#' + gender + 'sHeatDistance' + (j + 1) + '').html(
			'' +
				formatType(data[0][0]['type_id']) +
				' - ' +
				data[j].length +
				' athlètes'
		);
		k = 1;
	}

	l++;
	$('select').formSelect();
	$('.modal').modal();
}

function generateTriathleLaserRunBoard(data, gender) {
	if (data.length > 1) {
		let l = 1;
		let k = 1;
		for (let i = 0; i < data.length; i++) {
			$('#tri' + gender + 'sHeats').append(
				'<li>' +
					'<div class="collapsible-header heat" id="heat_' +
					l +
					'_' +
					gender +
					's"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>Série ' +
					l +
					' -&nbsp; <span id="' +
					gender +
					'sHeatDistance' +
					l +
					'"> </span></div>' +
					'<div class="collapsible-body" id="heat_' +
					l +
					'_' +
					gender +
					's_content">' +
					'<table id="' +
					gender +
					'sTable_' +
					l +
					'">' +
					'<thead>' +
					'<tr>' +
					'<th class="center">Poste de tir</th>' +
					'<th class="center">Catégorie</th>' +
					'<th class="center">Nom</th>' +
					'<th class="center">Temps</th>' +
					'<th class="center">Points</th>' +
					'<th class="center">Handicap Start</th>' +
					'<th class="center">Place `d\'arrivée</th>' +
					'<th class="center" id="actions' +
					'">Actions</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="tri' +
					gender +
					'sTable_' +
					l +
					'_content">' +
					'</tbody>' +
					'</table>' +
					'</div>' +
					'</li>' +
					'</ul>'
			);
			for (let j = 0; j < data[i].length; j++) {
				$('#tri' + gender + 'sTable_' + l + '_content').append(
					'<tr>' +
						'<form class="col s12">' +
						'<td class="center">' +
						'<div class="input-field  col offset-s2 col s7">' +
						'<input class="center ' +
						gender +
						'Line" id="line' +
						data[0][j]['ath_id'] +
						'" name="line' +
						data[0][j]['ath_id'] +
						'" type="text" class="validate" value="' +
						k +
						'">' +
						'<label class="active" for="line' +
						data[0][j]['ath_id'] +
						'">Poste de tir</label>' +
						'</div>' +
						'</td>' +
						'<td class="center">' +
						data[0][j]['cat_name'] +
						'</td>' +
						'<td class="center">' +
						data[0][j]['first_name'] +
						' ' +
						data[0][j]['last_name'] +
						'</td>' +
						'<td class="center">' +
						'<div class="input-field  col offset-s2 col s7">' +
						'<input class="center ' +
						gender +
						'Min" id="minutes_' +
						data[0][j]['ath_id'] +
						'" name="minutes_' +
						data[0][j]['ath_id'] +
						'" type="text" class="validate">' +
						'<label for="minutes_' +
						data[0][j]['ath_id'] +
						'">Minutes</label>' +
						'</div>' +
						'<div class="input-field  col offset-s2 col s7">' +
						'<input class="center ' +
						gender +
						'Sec" id="seconds_' +
						data[0][j]['ath_id'] +
						'" name="seconds_' +
						data[0][j]['ath_id'] +
						'" type="text" class="validate">' +
						'<label for="seconds_' +
						data[0][j]['ath_id'] +
						'">Secondes</label>' +
						'</div>' +
						'</td>' +
						'<td class="center" id="lr_points_' +
						data[0][j]['ath_id'] +
						'">0</td>' +
						'<td class="center" id="handicap_' +
						data[0][j]['ath_id'] +
						'">' +
						data[0][j]['lr_handicap'] +
						'</td>' +
						'<td class="center" id="arrivalInput_' +
						data[0][j]['ath_id'] +
						'">' +
						'<div class="input-field col s8 offset-s3">' +
						'<input class="center ' +
						gender +
						'arrival" id="arrival_' +
						data[0][j]['ath_id'] +
						'" name="arrival_' +
						data[0][j]['ath_id'] +
						'" type="text" class="validate">' +
						'<label for="arrival_' +
						data[0][j]['ath_id'] +
						'">Place d\'arrivée</label>' +
						'</div></td>' +
						'<td class="center" id="actions_' +
						data[0][j]['ath_id'] +
						'">' +
						'<div class="row">' +
						'<div class="col offset-s2 s4">' +
						'<a class="btn-floating waves-effect waves-light orange btn tooltipped modal-trigger" id="fouls_' +
						data[0][j]['ath_id'] +
						'" href="#foulsModal_' +
						data[0][j]['ath_id'] +
						'"data-position="right" data-tooltip="Pénalités"><i class="material-icons addFouls">flag</i></a>' +
						'</div>' +
						'<div class="col s2">' +
						'<button class="btn-floating waves-effect waves-light green btn tooltipped addSwimResult" data-position="right" data-tooltip="Sauvegarder"' +
						'value="add_' +
						data[0][j]['ath_id'] +
						'" ><i id="add_' +
						data[0][j]['ath_id'] +
						'" class="material-icons">add</i></button>' +
						'</div>' +
						'</div>' +
						'</td>' +
						'</form>' +
						'</tr>'
				);
				k++;
				$('#modalSpace').append(
					'<div id="foulsModal_' +
						data[i][j]['id'] +
						'" class="modal modal-fixed-footer blue-grey darken-1 white-text">' +
						'<div class="modal-content container">' +
						'<h4 class="center">Fautes</h4>' +
						'<div class="card-content ">' +
						'<span class="card-title">' +
						data[i][j]['last_name'] +
						' ' +
						data[i][j]['first_name'] +
						'</span>' +
						'<div class="row">' +
						'<div class="input-field col s12">' +
						'<select id="foulSelect_' +
						data[i][j]['id'] +
						'">' +
						'<option value="" selected disabled>Choose your option</option>' +
						'</select>' +
						'<label>Sélectionnez la faute</label>' +
						'</div>' +
						'<div class="row">' +
						'<div>' +
						'Pénalité appliquée : <span id="foulLabel_' +
						data[i][j]['id'] +
						'"></span>' +
						'</div>' +
						'</div>' +
						'<div class="row">' +
						'<div>' +
						'Points : <span id="foulPoints_' +
						data[i][j]['id'] +
						'"></span>' +
						'</div>' +
						'</div>' +
						'<div class="row" >' +
						'<div class="collection" id="athFoulsList_' +
						data[i][j]['id'] +
						'">' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'<div class="modal-footer blue-grey darken-1">' +
						'<div class="row">' +
						'<div class="col s4">' +
						'<button class="btn waves-effect waves-light orange forfeit" id="foulsValidate_' +
						data[i][j]['id'] +
						'">Forfait' +
						'<i class="material-icons right">send</i>' +
						'</button>' +
						'</div>' +
						'<div class="col s4">' +
						'<button class="btn waves-effect waves-light red abandon" id="foulsValidate_' +
						data[i][j]['id'] +
						'">Abandon / Disqual°' +
						'<i class="material-icons right">cancel</i>' +
						'</button>' +
						'</div>' +
						'<div class="col s4">' +
						'<button class="btn waves-effect waves-light green validate" id="foulsValidate_' +
						data[i][j]['id'] +
						'">Valider' +
						'<i class="material-icons right">send</i>' +
						'</button>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>'
				);
			}
			$('#' + gender + 'sHeatDistance' + l + '').html(
				'' +
					data[0][j]['type_id'] +
					data[0][j]['lr_distance'] +
					'm - ' +
					(parseInt(data.length) + parseInt(1)) +
					'personnes'
			);
			k = 1;
			l++;
			$('select').formSelect();
			$('.modal').modal();
		}
	}
}

function generateResultsBoard(data, gender) {
	if (Object.keys(data).length > 1) {
		let l = 1;
		for (let i = 0; i < Object.keys(data).length; i++) {
			$('#' + gender + 'sRes').append(
				'<li>' +
					'<div class="collapsible-header heat" id="heat_' +
					i +
					'_' +
					gender +
					's"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' +
					data[i][0].cat_name +
					' <span id="' +
					gender +
					'sHeatDistance' +
					i +
					'"> </span></div>' +
					'<div class="collapsible-body" id="heat_' +
					i +
					'_' +
					gender +
					's_content">' +
					'<table id="' +
					gender +
					'sTable_' +
					i +
					'">' +
					'<thead>' +
					'<tr>' +
					'<th class="center">Place</th>' +
					'<th class="center">Club</th>' +
					'<th class="center">Nom</th>' +
					'<th class="center">Laser Run</th>' +
					'<th class="center">Points</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="' +
					gender +
					'sTable_' +
					i +
					'_content">' +
					'</tbody>' +
					'</table>' +
					'</div>' +
					'</li>' +
					'</ul>'
			);

			for (let x = 0; x < Object.keys(data[i]).length; x++) {
				$('#' + gender + 'sTable_' + i + '_content').append(
					'<tr>' +
						'<form class="col s12">' +
						'<td class="center">' +
						'<div class="input-field col s6 offset-s3">' +
						'<span class="active" for="spot' +
						data[i][x].id +
						'">' +
						(x + 1) +
						'</span>' +
						'</div>' +
						'</td>' +
						'<td class="center">' +
						data[i][x].club +
						'</td>' +
						'<td class="center">' +
						data[i][x].first_name +
						' ' +
						data[i][x].last_name +
						'</td>' +
						'<td class="center">' +
						'<div class="col s12">' +
						secIntoMin(parseInt(data[i][x].time)) +
						'</div>' +
						'</td>' +
						'<td class="center" id="points_' +
						data[i][x].id +
						'">' +
						parseInt(data[i][x].points) +
						'</td>' +
						'</form>' +
						'</tr>'
				);
			}
		}
		l++;
	}
	$('.collapsible').collapsible();
	$('.tooltipped').tooltip();
}

// Fonction permettant de modifier l'affichage du tableau des engagés (board.js) en fonction des checkboxes cochées
function generationSearchDisplay(datas, mode) {
	$('#athBoard').empty();
	if (mode == 0) {
		for (x in datas) {
			$('#athBoard').append(
				'<tr id="athBoard_' +
					x +
					'_content">' +
					'<form enctype="multipart/form-data">' +
					'<td class="center" id="actions_' +
					datas[x].id +
					'">' +
					'<div class="row">' +
					'<div class="col s4">' +
					'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' +
					datas[x].id +
					'" class="material-icons">edit</i>' +
					'</div>' +
					'<div class="col s4">' +
					'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' +
					datas[x].id +
					'" class="material-icons">delete</i>' +
					'</div>' +
					'</div>' +
					'</td>' +
					'<td id="athLastName_' +
					datas[x].id +
					'">' +
					datas[x].last_name +
					'</td>' +
					'<td id="athFirstName_' +
					datas[x].id +
					'">' +
					datas[x].first_name +
					'</td>' +
					'<td id="athClub_' +
					datas[x].id +
					'">' +
					datas[x].club +
					'</td>' +
					'<td id="athGender_' +
					datas[x].id +
					'">' +
					datas[x].gender +
					'</td>' +
					'<td id="athCat_' +
					datas[x].id +
					'">' +
					datas[x].cat_name +
					'</td>' +
					'<td id="athType_' +
					datas[x].id +
					'">' +
					datas[x].type_id +
					'</td>' +
					'<td id="athTime_' +
					datas[x].id +
					'">' +
					secIntoMin(datas[x].swimTime) +
					'</td>' +
					'</form>' +
					'</tr>'
			);
		}
	} else if (mode == 1) {
		$('#board').hide();
		for (x in datas) {
			$('#boardArea').append(
				'<ul class="collapsible" id="catList">' +
					'<li>' +
					'<div class="collapsible-header" id="cat_' +
					datas[x][0].cat_id +
					'"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' +
					datas[x][0].cat_name +
					' - ' +
					datas[x].length +
					' athlètes</div>' +
					'<div class="collapsible-body" id="cat_' +
					datas[x][0].cat_id +
					'">' +
					'<table id="athTable_' +
					datas[x][0].cat_id +
					'">' +
					'<thead>' +
					'<tr>' +
					'<th id="">Actions</th>' +
					'<th id="last_name_1">Nom</th>' +
					'<th id="first_name_1">Prénom</th>' +
					'<th id="club_1">Club</th>' +
					'<th id="gender_1">Genre</th>' +
					'<th id="cat_id_1">Catégorie</th>' +
					'<th id="type_id_1">Compétition</th>' +
					'<th id="swimTime_1">Engagement</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="athTable_' +
					datas[x][0].cat_id +
					'_content">' +
					'</tbody>' +
					'</table>' +
					'</div>' +
					'</li>' +
					'</ul>'
			);
		}

		$('.collapsible').collapsible();

		for (i in datas) {
			for (let j = 0; j < datas[i].length; j++) {
				$('#athTable_' + datas[i][0].cat_id + '_content').append(
					'<tr id="athBoard_' +
						x +
						'_content">' +
						'<form enctype="multipart/form-data">' +
						'<td class="center" id="actions_' +
						datas[i][j].id +
						'">' +
						'<div class="row">' +
						'<div class="col s4">' +
						'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' +
						datas[i][j].id +
						'" class="material-icons">edit</i>' +
						'</div>' +
						'<div class="col s4">' +
						'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' +
						datas[i][j].id +
						'" class="material-icons">delete</i>' +
						'</div>' +
						'</div>' +
						'</td>' +
						'<td id="athLastName_' +
						datas[i][j].id +
						'">' +
						datas[i][j].last_name +
						'</td>' +
						'<td id="athFirstName_' +
						datas[i][j].id +
						'">' +
						datas[i][j].first_name +
						'</td>' +
						'<td id="athClub_' +
						datas[i][j].id +
						'">' +
						datas[i][j].club +
						'</td>' +
						'<td id="athGender_' +
						datas[i][j].id +
						'">' +
						datas[i][j].gender +
						'</td>' +
						'<td id="athCat_' +
						datas[i][j].id +
						'">' +
						datas[i][j].cat_name +
						'</td>' +
						'<td id="athType_' +
						datas[i][j].id +
						'">' +
						datas[i][j].type_id +
						'</td>' +
						'<td id="athTime_' +
						datas[i][j].id +
						'">' +
						secIntoMin(datas[i][j].swimTime) +
						'</td>' +
						'</form>' +
						'</tr>'
				);
			}
		}
	} else if (mode == 2) {
		$('#board').hide();
		let l = 1;
		for (x in datas) {
			$('#boardArea').append(
				'<ul class="collapsible" id="sexList">' +
					'<li>' +
					'<div class="collapsible-header" id="cat_' +
					genderStrtoInt(datas[x][0].gender) +
					'"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' +
					datas[x][0].gender +
					' - ' +
					datas[x].length +
					' athlètes</div>' +
					'<div class="collapsible-body" id="cat_' +
					genderStrtoInt(datas[x][0].gender) +
					'">' +
					'<table id="athTable_' +
					genderStrtoInt(datas[x][0].gender) +
					'">' +
					'<thead>' +
					'<tr>' +
					'<th id="">Actions</th>' +
					'<th id="last_name_2">Nom</th>' +
					'<th id="first_name_2">Prénom</th>' +
					'<th id="club_2">Club</th>' +
					'<th id="gender_2">Genre</th>' +
					'<th id="cat_id_2">Catégorie</th>' +
					'<th id="type_id_2">Compétition</th>' +
					'<th id="swimTime_2">Engagement</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="athTable_' +
					genderStrtoInt(datas[x][0].gender) +
					'_content">' +
					'</tbody>' +
					'</table>' +
					'</div>' +
					'</li>' +
					'</ul>'
			);
			l++;
		}

		$('.collapsible').collapsible();
		for (i in datas) {
			for (let j = 0; j < datas[i].length; j++) {
				$(
					'#athTable_' + genderStrtoInt(datas[i][0].gender) + '_content'
				).append(
					'<tr id="athBoard_' +
						x +
						'_content">' +
						'<form enctype="multipart/form-data">' +
						'<td class="center" id="actions_' +
						datas[i][j].id +
						'">' +
						'<div class="row">' +
						'<div class="col s4">' +
						'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' +
						datas[i][j].id +
						'" class="material-icons">edit</i>' +
						'</div>' +
						'<div class="col s4">' +
						'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' +
						datas[i][j].id +
						'" class="material-icons">delete</i>' +
						'</div>' +
						'</div>' +
						'</td>' +
						'<td id="athLastName_' +
						datas[i][j].id +
						'">' +
						datas[i][j].last_name +
						'</td>' +
						'<td id="athFirstName_' +
						datas[i][j].id +
						'">' +
						datas[i][j].first_name +
						'</td>' +
						'<td id="athClub_' +
						datas[i][j].id +
						'">' +
						datas[i][j].club +
						'</td>' +
						'<td id="athGender_' +
						datas[i][j].id +
						'">' +
						datas[i][j].gender +
						'</td>' +
						'<td id="athCat_' +
						datas[i][j].id +
						'">' +
						datas[i][j].cat_name +
						'</td>' +
						'<td id="athType_' +
						datas[i][j].id +
						'">' +
						datas[i][j].type_id +
						'</td>' +
						'<td id="athTime_' +
						datas[i][j].id +
						'">' +
						secIntoMin(datas[i][j].swimTime) +
						'</td>' +
						'</form>' +
						'</tr>'
				);
			}
		}
	} else if (mode == 3) {
		$('#board').hide();
		let l = 1;
		for (x in datas) {
			$('#boardArea').append(
				'<ul class="collapsible" id="typeList">' +
					'<li>' +
					'<div class="collapsible-header" id="cat_' +
					datas[x][0].cat_id +
					'"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' +
					datas[x][0].type_id +
					' - ' +
					datas[x].length +
					' athlètes</div>' +
					'<div class="collapsible-body" id="cat_' +
					datas[x][0].cat_id +
					'">' +
					'<table id="athTable_' +
					datas[x][0].cat_id +
					'">' +
					'<thead>' +
					'<tr>' +
					'<th id="">Actions</th>' +
					'<th id="last_name_3">Nom</th>' +
					'<th id="first_name_3">Prénom</th>' +
					'<th id="club_3">Club</th>' +
					'<th id="gender_3">Genre</th>' +
					'<th id="cat_id_3">Catégorie</th>' +
					'<th id="type_id_3">Compétition</th>' +
					'<th id="swimTime_3">Engagement</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="athTable_' +
					datas[x][0].cat_id +
					'_content">' +
					'</tbody>' +
					'</table>' +
					'</div>' +
					'</li>' +
					'</ul>'
			);
			l++;
		}

		$('.collapsible').collapsible();

		for (i in datas) {
			for (let j = 0; j < datas[i].length; j++) {
				$('#athTable_' + datas[i][0].cat_id + '_content').append(
					'<tr id="athBoard_' +
						x +
						'_content">' +
						'<form enctype="multipart/form-data">' +
						'<td class="center" id="actions_' +
						datas[i][j].id +
						'">' +
						'<div class="row">' +
						'<div class="col s4">' +
						'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' +
						datas[i][j].id +
						'" class="material-icons">edit</i>' +
						'</div>' +
						'<div class="col s4">' +
						'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' +
						datas[i][j].id +
						'" class="material-icons">delete</i>' +
						'</div>' +
						'</div>' +
						'</td>' +
						'<td id="athLastName_' +
						datas[i][j].id +
						'">' +
						datas[i][j].last_name +
						'</td>' +
						'<td id="athFirstName_' +
						datas[i][j].id +
						'">' +
						datas[i][j].first_name +
						'</td>' +
						'<td id="athClub_' +
						datas[i][j].id +
						'">' +
						datas[i][j].club +
						'</td>' +
						'<td id="athGender_' +
						datas[i][j].id +
						'">' +
						datas[i][j].gender +
						'</td>' +
						'<td id="athCat_' +
						datas[i][j].id +
						'">' +
						datas[i][j].cat_name +
						'</td>' +
						'<td id="athType_' +
						datas[i][j].id +
						'">' +
						datas[i][j].type_id +
						'</td>' +
						'<td id="athTime_' +
						datas[i][j].id +
						'">' +
						secIntoMin(datas[i][j].swimTime) +
						'</td>' +
						'</form>' +
						'</tr>'
				);
			}
		}
	}
}
// Fonction pour annuler la modification d'un athlète dans le tableau des engagés
// Elle retire les inputs et ramène l'affichage à ce qu'il était avant le click sur le bouton de modification
function updateCancel(data) {
	$('#athBoard_' + data.id + '_content').append(
		'<tr id="athBoard_' +
			x +
			'_content">' +
			'<form enctype="multipart/form-data">' +
			'<td class="center" id="actions_' +
			data.id +
			'">' +
			'<div class="row">' +
			'<div class="col s4">' +
			'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' +
			data.id +
			'" class="material-icons">edit</i>' +
			'</div>' +
			'<div class="col s4">' +
			'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' +
			data.id +
			'" class="material-icons">delete</i>' +
			'</div>' +
			'</div>' +
			'</td>' +
			'<td class="center" id="athLastName_' +
			data.id +
			'">' +
			data.last_name +
			'</td>' +
			'<td class="center" id="athFirstName_' +
			data.id +
			'">' +
			data.first_name +
			'</td>' +
			'<td class="center" id="athClub_' +
			data.id +
			'">' +
			data.club +
			'</td>' +
			'<td class="center" id="athGender_' +
			data.id +
			'">' +
			data.gender +
			'</td>' +
			'<td class="center" id="athCat_' +
			data.id +
			'">' +
			data.cat_name +
			'</td>' +
			'<td class="center" id="athType_' +
			data.id +
			'">' +
			data.type_id +
			'</td>' +
			'<td class="center" id="athTime_' +
			data.id +
			'">' +
			data.swimTime +
			'</td>' +
			'</form>' +
			'</tr>'
	);
}

// Transforme les bouton Ajouter vert en bouton Editer bleu
function transformAddButton(id) {
	$('#actions_' + id + '').empty();
	$('#actions_' + id + '').append(
		'<div class="row">' +
			'<div class="col offset-s2 s4">' +
			'<a class="btn-floating waves-effect waves-light orange btn tooltipped modal-trigger"  href="#foulsModal_' +
			id +
			'"data-position="bottom" data-tooltip="Pénalités"><i class="material-icons addFouls" id="fouls_' +
			id +
			'">flag</i></a>' +
			'</div>' +
			'<div class="col s2">' +
			'<button class="btn-floating waves-effect waves-light blue btn tooltipped " data-position="bottom" data-tooltip="Modifier"' +
			'value="edit_' +
			id +
			'" ><i id="edit_' +
			id +
			'" class="material-icons editResult">edit</i></button>' +
			'</div>' +
			'</div>'
	);
	$('.tooltipped').tooltip();
}

// Appel de méthodes propres au framework CSS Materialize
function materializeDOMFunc() {
	$('.sidenav').sidenav();
	$('.tooltipped').tooltip();
	$('.tabs').tabs();
	$('.collapsible').collapsible();
	$('select').formSelect();
	$('.modal').modal();
}
