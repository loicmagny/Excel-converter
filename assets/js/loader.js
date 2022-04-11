// Fichier permettant de gérer le chargement des différents fichiers js nécéssaires sans encombrer footer.php

$(document).ready(function() {
	$.getScript('assets/libs/materialize/js/materialize.min.js', function() {
		$.getScript('assets/js/const.js', function() {
			$.getScript('assets/js/DOM.js', function() {
				$.getScript('assets/js/main.js', function() {
					let url = $(location).attr('href');
					console.log(url);
					switch (url) {
						case SWIMMING:
							$.getScript('assets/js/swimming.js', function() {
								console.log('swimming');
							});
							break;
						case LASERRUN:
							$.getScript('assets/js/laserRun.js', function() {
								console.log('laser run');
							});
							break;
						case BOARD:
							$.getScript('assets/js/board.js', function() {
								console.log('board');
							});
							break;
						case OPTIONS:
							$.getScript('assets/js/options.js', function() {
								console.log('options');
							});
							break;
						case RESULTS:
							$.getScript('assets/js/results.js', function() {
								console.log('results');
							});
							break;
						default:
							$.getScript('assets/js/DOM.js', function() {});
							break;
					}
				});
			});
			// $.getScript('assets/js/board.js', function() {});
			// $.getScript('assets/js/results.js', function() {});
			// $.getScript('assets/js/swimming.js', function() {});
			// $.getScript('assets/js/laserRun.js', function() {});
			// $.getScript('assets/js/options.js', function() {});
		});
	});
});
