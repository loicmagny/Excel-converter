<?php
require_once 'handler.php';
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="assets/libs/materialize/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>NPM Excel Converter</title>
</head>

<body>
    <header>
        <ul id="slide-out" class="sidenav">
            <li><a href="index.php"><i class="material-icons">home</i>Accueil</a></li>
            <!-- <li><a href="board.php"><i class="material-icons">
                        assignment_ind
                    </i>Tableau des engagés</a></li> -->
            <li><a href="swimming.php"><i class="material-icons">
                        pool
                    </i>Natation</a></li>
            <li><a class="waves-effect waves-light modal-trigger" href="#modalLR"><i class="material-icons">
                        directions_run
                    </i>Laser Run</a></li>
            <li><a href="results.php"><i class="material-icons">
                        assignment
                    </i>Résultats</a></li>
            <li>
                <div class="divider"></div>
            </li>
            <li><a href="options.php"><i class="material-icons">
                        settings
                    </i>Options</a></li>
            <li><a href="help.php"><i class="material-icons">
                        help_outline
                    </i>Aide</a></li>
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger btn-floating btn-large waves-effect waves-light indigo pulse" id="homeBtn"><i class="material-icons">menu</i></a>
        <div id="modalLR" class="modal">
            <div class="modal-content">
                <h4>Attention</h4>
                <p>Avant de poursuivre vers la page Laser Run, assurez vous d'avoir rentrés les résultats de la natation d'abord.</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-red btn-flat red white-text">Annuler</a>
                <a href="laser_run.php" class="modal-close waves-effect waves-green btn-flat blue white-text">Continuer</a>
            </div>
        </div>
    </header>
    <div id="modalSpace"></div>