//Appel Ajax pour récupérer l'ensemble des athlètes
ajaxCall(['getEveryAthletes']);

if ($(location).attr('href') == 'http://localhost/Excel-converter/index.php?') {
	window.location.replace('http://localhost/Excel-converter/index.php');
}

//Gestionnaires d'évènements pour les click sur les checkboxes servant aux recherches
$('#catSort').click(function() {
	if ($('#catSort').is(':checked')) {
		verifyCheckboxesState();
		ajaxCall(['sortAthByCat', 0]);
	} else if (!$('#catSort').is(':checked')) {
		ajaxCall(['getEveryAthletes']);
		verifyCheckboxesState();
		$('.collapsible').remove();
	}
});
$('#sexSort').click(function() {
	if ($('#sexSort').is(':checked')) {
		verifyCheckboxesState();
		console.log('oui oui');
		ajaxCall(['sortAthBySex', 0]);
	} else if (!$('#sexSort').is(':checked')) {
		ajaxCall(['getEveryAthletes']);
		verifyCheckboxesState();
		$('.collapsible').remove();
	}
});
$('#typeSort').click(function() {
	if ($('#typeSort').is(':checked')) {
		verifyCheckboxesState();
		ajaxCall(['sortAthByType', 0]);
	} else if (!$('#typeSort').is(':checked')) {
		ajaxCall(['getEveryAthletes']);
		verifyCheckboxesState();
		$('.collapsible').remove();
	}
});

//Gestionnaires d'évènements pour la saisie dans l'input
$('#athSearch').keyup(function() {
	let string = $('#athSearch').val();
	if (string.length > 0) {
		ajaxCall(['searchAth', 0, string]);
	} else {
		ajaxCall(['getEveryAthletes']);
		window.location.replace('http://localhost/Excel-converter/index.php');
	}
});

// Pour supprimer un athlète
$('#boardArea').on('click', 'button', function(e) {
	let target = e.target.id;
	let id = target.replace(/[^0-9.]/g, '');

	$('#deleteAth_' + id + '').click(function() {
		ajaxCall(['deleteAth', 0, id]);
		M.toast({ html: 'Athlète supprimé' });
		$('#athBoard_' + id + '_content').empty();
	});

	$('#editAth_' + id + '').click(function() {
		ajaxCall(['getSingleAth', 0, id]);
		$('#actions_' + id + '').html(
			'<td class="center" id="actions_' +
				id +
				'">' +
				'<div class="row">' +
				'<div class="col offset-s2">' +
				'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small green" data-position="top" data-tooltip="Ajouter">' +
				'<i id="confirmEditAth_' +
				id +
				'" class="material-icons">add</i>' +
				'</div>' +
				'<div class="col s4">' +
				'    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Annuler" >' +
				'<i id="cancelEditAth_' +
				id +
				'" class="material-icons">clear</i>' +
				'</div>' +
				'</div>' +
				'</td>'
		);
		$('#confirmEditAth_' + id + '').click(function() {
			ajaxCall([
				'editAthData',
				0,
				[
					id,
					$('#lastName_' + id + '').val(),
					$('#firstName_' + id + '').val(),
					$('#club_' + id + '').val(),
					$('#gender_' + id + '').val(),
					$('#category_' + id + '').val(),
					$('#type_' + id + '').val(),
					minIntoSec(
						'' +
							$('#minutes_' + id + '').val() +
							' ' +
							$('#seconds_' + id + '').val()
					)
				]
			]);
		});

		$('#cancelEditAth_' + id + '').click(function() {
			window.location.reload();
		});
	});

	$('.tooltipped').tooltip();
});
//Ajoute une icone de fleche montante/descendante à coté du header concerné
$('#last_name').mouseenter(function() {
	$('#last_name').html('Nom<i class="material-icons">arrow_drop_down</i>');
});
$('#last_name').mouseleave(function() {
	$('#last_name').html('Nom');
});

$('#first_name').mouseenter(function() {
	$('#first_name').html('Prénom<i class="material-icons">arrow_drop_down</i>');
});
$('#first_name').mouseleave(function() {
	$('#first_name').html('Prénom');
});

$('#club').mouseenter(function() {
	$('#club').html('Club<i class="material-icons">arrow_drop_down</i>');
});
$('#club').mouseleave(function() {
	$('#club').html('Club');
});

$('#gender').mouseenter(function() {
	$('#gender').html('Genre<i class="material-icons">arrow_drop_down</i>');
});
$('#gender').mouseleave(function() {
	$('#gender').html('Genre');
});

$('#cat_id').mouseenter(function() {
	$('#cat_id').html('Catégorie<i class="material-icons">arrow_drop_down</i>');
});
$('#cat_id').mouseleave(function() {
	$('#cat_id').html('Catégorie');
});

$('#type_id').mouseenter(function() {
	$('#type_id').html(
		'Compétition<i class="material-icons">arrow_drop_down</i>'
	);
});
$('#type_id').mouseleave(function() {
	$('#type_id').html('Compétition');
});

$('#swimTime').mouseenter(function() {
	$('#swimTime').html(
		'Engagement<i class="material-icons">arrow_drop_down</i>'
	);
});
$('#swimTime').mouseleave(function() {
	$('#swimTime').html('Engagement');
});
//Pour entamer un tri ascendant/descendant en cliquant sur les header de chaque champ du tableau
$('#last_name').click(function(e) {
	ajaxCall(['getEveryAthletesSortedAsc', 0, e.target.id]);
});
$('#first_name').click(function(e) {
	ajaxCall(['getEveryAthletesSortedAsc', 0, e.target.id]);
});
$('#club').click(function(e) {
	ajaxCall(['getEveryAthletesSortedAsc', 0, e.target.id]);
});
$('#gender').click(function(e) {
	ajaxCall(['getEveryAthletesSortedAsc', 0, e.target.id]);
});
$('#cat_id').click(function(e) {
	ajaxCall(['getEveryAthletesSortedAsc', 0, e.target.id]);
});
$('#type_id').click(function(e) {
	ajaxCall(['getEveryAthletesSortedAsc', 0, e.target.id]);
});
$('#swimTime').click(function(e) {
	ajaxCall(['getEveryAthletesSortedAsc', 0, e.target.id]);
});
verifyCheckboxesState();

// Sert à afficher des input après le click sur le bouton modifier
function displayInputForUpdate(id, array) {
	console.log(array.swimTime);
	let time = splitTimeForInputDisplay(array.swimTime);
	console.log(time);
	if (time[1] == undefined) {
		let tmp = time[0];
		time[1] = Math.floor(tmp % 60);
		time[0] = Math.floor(tmp / 60);
	}
	$('#athLastName_' + id + '').html(
		'<div class="input-field col">' +
			'<input id="lastName_' +
			id +
			'" type="text" value="' +
			array.last_name +
			'" class="validate">' +
			'<label class="active" for="lastName_' +
			id +
			'">Nom de famille</label>' +
			'</div>'
	);
	$('#athFirstName_' + id + '').html(
		'<div class="input-field">' +
			'<input id="firstName_' +
			id +
			'" type="text" value="' +
			array.first_name +
			'" class="validate">' +
			'<label class="active" for="firstName_' +
			id +
			'">Prénom</label>' +
			'</div>'
	);
	$('#athClub_' + id + '').html(
		'<div class="input-field">' +
			'<input id="club_' +
			id +
			'" type="text" value="' +
			array.club +
			'" class="validate">' +
			'<label class="active" for="club">Club</label>' +
			'</div>'
	);
	if (array.gender == 1) {
		$('#athGender_' + id + '').html(
			'<div class="input-field col s12">' +
				'<select id="gender_' +
				id +
				'">' +
				'<option value="" disabled>Sexe</option>' +
				'<option value="0">Femme</option>' +
				'<option selected value="1">Homme</option>' +
				'</select>' +
				'<label>Genre</label>' +
				'</div>'
		);
	} else if (array.gender == 0) {
		$('#athGender_' + id + '').html(
			'<div class="input-field col s12">' +
				'<select id="gender_' +
				id +
				'">' +
				'<option value="" disabled >Sexe</option>' +
				'<option selected value="0">Femme</option>' +
				'<option value="1">Homme</option>' +
				'</select>' +
				'<label>Genre</label>' +
				'</div>'
		);
	}
	switch (parseInt(array.cat_id)) {
		case 1:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled Catégorie</option>' +
					'<option selected value="1">U11</option>' +
					'<option value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 2:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled Catégorie</option>' +
					'<option value="1">U11</option>' +
					'<option selected value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 3:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled >Catégorie</option>' +
					'<option  value="1">U11</option>' +
					'<option  value="2">U13</option>' +
					'<option selected value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 4:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled Catégorie</option>' +
					'<option value="1">U11</option>' +
					'<option value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option selected value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 5:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled>Catégorie</option>' +
					'<option value="1">U11</option>' +
					'<option value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option selected value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 6:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled>Catégorie</option>' +
					'<option value="1">U11</option>' +
					'<option value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option selected value="6">U22</option>' +
					'<option  value="7">Senior</option>' +
					'<option  value="8">Master 40+</option>' +
					'<option  value="9">Master 50+</option>' +
					'<option  value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 7:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled >Catégorie</option>' +
					'<option  value="1">U11</option>' +
					'<option  value="2">U13</option>' +
					'<option  value="3">U15</option>' +
					'<option  value="4">U17</option>' +
					'<option  value="5">U19</option>' +
					'<option  value="6">U22</option>' +
					'<option selected value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 8:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled>Catégorie</option>' +
					'<option value="1">U11</option>' +
					'<option value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option selected value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 9:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled>Catégorie</option>' +
					'<option value="1">U11</option>' +
					'<option value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option selected value="9">Master 50+</option>' +
					'<option value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		case 10:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" disabled>Catégorie</option>' +
					'<option value="1">U11</option>' +
					'<option value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option selected value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
		default:
			$('#athCat_' + id + '').html(
				'<div class="input-field col s12">' +
					'<select id="category_' +
					id +
					'">' +
					'<option value="" selected disabled>Catégorie</option>' +
					'<option value="1">U11</option>' +
					'<option value="2">U13</option>' +
					'<option value="3">U15</option>' +
					'<option value="4">U17</option>' +
					'<option value="5">U19</option>' +
					'<option value="6">U22</option>' +
					'<option value="7">Senior</option>' +
					'<option value="8">Master 40+</option>' +
					'<option value="9">Master 50+</option>' +
					'<option  value="10">Master 60+</option>' +
					'</select>' +
					'<label>Catégorie</label>' +
					'</div>'
			);
			break;
	}

	if (array.type_id == 1) {
		$('#athType_' + id + '').html(
			'<div class="input-field col s12">' +
				'<select id="type_' +
				id +
				'">' +
				'<option value="" disabled>Compétition</option>' +
				'<option selected value="1">Triathle</option>' +
				'<option value="2">Laser Run</option>' +
				'</select>' +
				'<label>Type</label>' +
				'</div>'
		);
	} else if (array.type_id == 2) {
		$('#athType_' + id + '').html(
			'<div class="input-field col s12">' +
				'<select id="type_' +
				id +
				'">' +
				'<option value="" disabled>Compétition</option>' +
				'<option value="1">Triathle</option>' +
				'<option selected value="2">Laser Run</option>' +
				'</select>' +
				'<label>Type</label>' +
				'</div>'
		);
	}
	$('#athTime_' + id + '').html(
		'<div class="input-field col s6">' +
			'<input class="athMin" id="minutes_' +
			id +
			'" name="minutes_' +
			id +
			'" type="text" value="' +
			time[0] +
			'" class="validate">' +
			'<label class="active" for="minutes_' +
			id +
			'">Minutes</label>' +
			'</div>' +
			'<div class="input-field col s6">' +
			'<input class="athSec" id="seconds_' +
			id +
			'" name="seconds_' +
			id +
			'" type="text" value="' +
			time[1] +
			'"  class="validate">' +
			'<label class="active" for="seconds_' +
			id +
			'">Secondes</label>' +
			'</div>'
	);
	$('select').formSelect();

	$('#time_' + id + '').siblings('label').addClass('active');
}
// Verifié quelles checkboxes sont cochées
function verifyCheckboxesState() {
	let state = true;
	let i = 0;
	$('.checkboxes').each(function() {
		state = $(this).is(':checked');
		if (state == false) {
			i++;
			if (i == 3) {
				$('#board').show();
			}
		}
	});
}
// Vérifie le nombre d'athlètes en bdd
ajaxCall(['athAmountCheck', 1]);
