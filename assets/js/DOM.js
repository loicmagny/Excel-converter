$(document).ready(function () {
	materializeDOMFunc();
});
// Fonction permettant d'afficher les différents éléments du DOM nécéssaires au bon fonctionnement et à l'affichage correct des données
// Mode 1 -> Tableau des engagés (board.js)
// Mode 2 -> Tableau des séries de natation (swimming.js)
// Mode 3 -> Tableau des séries de combiné (laserRun.js)
// Mode 4 -> Tableau des résultats (results.js)
function generateHTML(data, gender, mode) {
	if (mode === 1) {
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
				'" class="material-icons deleteAth">delete</i>' +
				'</div>' +
				'</div>' +
				'</td>' +
				'<td class="center" id="athLastName_' +
				data[x].id +
				'">' +
				data[x].last_name +
				'</td>' +
				'<td class="center" id="athFirstName_' +
				data[x].id +
				'">' +
				data[x].first_name +
				'</td>' +
				'<td class="center" id="athClub_' +
				data[x].id +
				'">' +
				data[x].club +
				'</td>' +
				'<td class="center" id="athGender_' +
				data[x].id +
				'">' +
				data[x].gender +
				'</td>' +
				'<td class="center" id="athCat_' +
				data[x].id +
				'">' +
				data[x].cat_name +
				'</td>' +
				'<td class="center" id="athType_' +
				data[x].id +
				'">' +
				data[x].type_id +
				'</td>' +
				'<td class="center" id="athTime_' +
				data[x].id +
				'">' +
				data[x].swimTime +
				'</td>' +
				'</form>' +
				'</tr>'
			);
		}
	} else if (mode == 2) {
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
						(parseInt(data[i][j][x]['points']) ?
							parseInt(data[i][j][x]['points']) :
							'0') +
						'</td>' +
						'<td class="center" id="actions_' +
						data[i][j][x]['id'] +
						'">' +
						'<div class="row">' +
						'<div class="col offset-s2 s4">' +
						'<a class="btn-floating waves-effect waves-light orange btn tooltipped modal-trigger" id="fouls_' +
						data[i][j][x]['id'] +
						'" href="#foulsModal_' +
						data[i][j][x]['id'] +
						'"data-position="right" data-tooltip="Pénalités"><i class="material-icons addFouls">flag</i></a>' +
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
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'<div class="modal-footer blue-grey darken-1">' +
						'<div class="row">' +
						'<div class="col s4">' +
						'<button class="btn waves-effect waves-light orange forfeit" id="foulsValidate_' +
						data[i][j][x]['id'] +
						'">Forfait' +
						'<i class="material-icons right">send</i>' +
						'</button>' +
						'</div>' +
						'<div class="col s4">' +
						'<button class="btn waves-effect waves-light red abandon" id="foulsValidate_' +
						data[i][j][x]['id'] +
						'">Abandon / Disqual°' +
						'<i class="material-icons right">cancel</i>' +
						'</button>' +
						'</div>' +
						'<div class="col s4">' +
						'<button class="btn waves-effect waves-light green validate" id="foulsValidate_' +
						data[i][j][x]['id'] +
						'">Valider' +
						'<i class="material-icons right">send</i>' +
						'</button>' +
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
	} else if (mode == 3) {
		let l = 1;
		let k = 1;
		for (let i = 0; i < data.length; i++) {
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
				'<tbody id="' +
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
				$('#' + gender + 'sTable_' + l + '_content').append(
					'<tr>' +
					'<form class="col s12">' +
					'<td class="center">' +
					'<div class="input-field  col offset-s2 col s7">' +
					'<input class="center ' +
					gender +
					'Line" id="line' +
					data[i][j]['ath_id'] +
					'" name="line' +
					data[i][j]['ath_id'] +
					'" type="text" class="validate" value="' +
					k +
					'">' +
					'<label class="active" for="line' +
					data[i][j]['ath_id'] +
					'">Poste de tir</label>' +
					'</div>' +
					'</td>' +
					'<td class="center">' +
					data[i][j]['cat_name'] +
					'</td>' +
					'<td class="center">' +
					data[i][j]['first_name'] +
					' ' +
					data[i][j]['last_name'] +
					'</td>' +
					'<td class="center">' +
					'<div class="input-field  col offset-s2 col s7">' +
					'<input class="center ' +
					gender +
					'Min" id="minutes_' +
					data[i][j]['ath_id'] +
					'" name="minutes_' +
					data[i][j]['ath_id'] +
					'" type="text" class="validate">' +
					'<label for="minutes_' +
					data[i][j]['ath_id'] +
					'">Minutes</label>' +
					'</div>' +
					'<div class="input-field  col offset-s2 col s7">' +
					'<input class="center ' +
					gender +
					'Sec" id="seconds_' +
					data[i][j]['ath_id'] +
					'" name="seconds_' +
					data[i][j]['ath_id'] +
					'" type="text" class="validate">' +
					'<label for="seconds_' +
					data[i][j]['ath_id'] +
					'">Secondes</label>' +
					'</div>' +
					'</td>' +
					'<td class="center" id="lr_points_' +
					data[i][j]['ath_id'] +
					'">0</td>' +
					'<td class="center" id="handicap_' +
					data[i][j]['ath_id'] +
					'">' +
					data[i][j]['lr_handicap'] +
					'</td>' +
					'<td class="center" id="arrivalInput_' +
					data[i][j]['ath_id'] +
					'">' +
					'<div class="input-field col s8 offset-s3">' +
					'<input class="center ' +
					gender +
					'arrival" id="arrival_' +
					data[i][j]['ath_id'] +
					'" name="arrival_' +
					data[i][j]['ath_id'] +
					'" type="text" class="validate">' +
					'<label for="arrival_' +
					data[i][j]['ath_id'] +
					'">Place d\'arrivée</label>' +
					'</div></td>' +
					'<td class="center" id="actions_' +
					data[i][j]['ath_id'] +
					'">' +
					'<button class="btn-floating btn-large waves-effect waves-light green btn tooltipped addSwimResult" data-position="right" data-tooltip="Ajouter"' +
					'value="add_' +
					data[i][j]['ath_id'] +
					'" ><i id="add_' +
					data[i][j]['ath_id'] +
					'" class="material-icons">add</i>' +
					'</td>' +
					'</form>' +
					'</tr>'
				);
				k++;
			}
			$('#' + gender + 'sHeatDistance' + l + '').html(
				'' + data[i][0]['lr_distance'] + 'm'
			);
			k = 1;
			l++;
		}
	} else if (mode == 4) {
		let l = 1;
		for (let i = 0; i < Object.keys(data).length; i++) {
			$('#' + gender + 'sRes').append(
				'<li>' +
				'<div class="collapsible-header heat" id="heat_' +
				l +
				'_' +
				gender +
				's"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' +
				data[i][0]['cat_name'] +
				' <span id="' +
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
				'<th class="center">Place</th>' +
				'<th class="center">Club</th>' +
				'<th class="center">Nom</th>' +
				'<th class="center">Natation</th>' +
				'<th class="center">Laser Run</th>' +
				'<th class="center">Total</th>' +
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
				'</li>' +
				'</ul>'
			);

			for (let x = 0; x < Object.keys(data[i]).length; x++) {
				$('#' + gender + 'sTable_' + l + '_content').append(
					'<tr>' +
					'<form class="col s12">' +
					'<td class="center">' +
					'<div class="input-field col s6 offset-s3">' +
					'<input class="center ' +
					gender +
					'Spot" id="spot' +
					data[i][x].ath_id +
					'" name="spot' +
					data[i][x].id +
					'" type="text" class="validate" value="' +
					data[i][x].place +
					'">' +
					'<label class="active" for="spot' +
					data[i][x].id +
					'">Place</label>' +
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
					secIntoMin(data[i][x].swimTime) +
					'</div>' +
					'<div class="col s12">' +
					parseInt(data[i][x].swimPoints) +
					'</div>' +
					'</td>' +
					'<td class="center">' +
					'<div class="col s12">' +
					secIntoMin(parseInt(data[i][x].lr_time)) +
					' (' +
					data[i][x].lr_handicap +
					')' +
					'</div>' +
					'<div class="col s12">' +
					parseInt(data[i][x].lr_points) +
					'</div>' +
					'</td>' +
					'<td class="center" id="points_' +
					data[i][x].id +
					'">' +
					parseInt(data[i][x].total) +
					'</td>' +
					'</form>' +
					'</tr>'
				);
				k++;
			}
			k = 1;
			l++;
		}
		$('.collapsible').collapsible();
		$('.tooltipped').tooltip();
	}
	return true;
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
	} else if (mode == 2) {
		$('#board').hide();
		let l = 1;
		for (x in datas) {
			$('#boardArea').append(
				'<ul class="collapsible" id="sexList">' +
				'<li>' +
				'<div class="collapsible-header" id="cat_' +
				datas[x][0].cat_id +
				'"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' +
				datas[x][0].gender +
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
		'<a class="btn-floating waves-effect waves-light orange btn tooltipped addFouls modal-trigger" id="fouls_' +
		id +
		'" href="#foulsModal_' +
		id +
		'"data-position="left" data-tooltip="Pénalités"><i class="material-icons">flag</i></a>' +
		'</div>' +
		'<div class="col  s2">' +
		'<button class="btn-floating btn waves-effect waves-light blue btn tooltipped editResult" data-position="top" data-tooltip="Sauvegarder"' +
		'value="edit_' +
		id +
		'" ><i id="edit_' +
		id +
		'" class="material-icons edit">edit</i>' +
		'</div>' +
		'</div>'
	);
	$('.tooltipped').tooltip();
}

function materializeDOMFunc() {
	// Appel de méthodes propres au framework CSS Materialize
	$('.sidenav').sidenav();
	$('.tooltipped').tooltip();
	$('.tabs').tabs();
	$('.collapsible').collapsible();
	$('select').formSelect();
	$('.modal').modal();
}