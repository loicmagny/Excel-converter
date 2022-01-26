<?php
// Ce fichier gère les appels Ajax
require_once 'models/database.php';
require_once 'models/athletes_model.php';
require_once 'models/categories_model.php';
require_once 'models/swimming_model.php';
require_once 'models/laserRun_model.php';
require_once 'models/results_model.php';
require_once 'models/fouls_model.php';
require_once 'models/athFouls_model.php';
require_once "assets/libs/simplexlsx-master/src/SimpleXLSX.php";
require_once 'controllers/parser.php';
require_once 'controllers/athletes_controller.php';
// Quand l'appel est effectué
if (isset($_POST['autoCall'])) {
// En fonction du second paramètre de Ajax Call on sort le controller nécéssaire
    if (isset($_POST['file'])) {
        if ($_POST['file'] == 0) {
        }
        if ($_POST['file'] == 1) {
            require 'controllers/swimming_controller.php';
        } else if ($_POST['file'] == 2) {
            require 'controllers/laserRun_controller.php';
        } else if ($_POST['file'] == 3) {
            require 'controllers/categories_controller.php';
        } else if ($_POST['file'] == 4) {
            require 'controllers/results_controller.php';
        } else if ($_POST['file'] == 5) {
            require 'controllers/fouls_controller.php';
        }
    }
    // Si il y a un 3ème paramètre dans la fonction AjaxCall
    if (isset($_POST['arg'])) {
        // On concatène le premier paramètre qui correspond au nom de la fonction dans le controller qu'on appelle avec le troisième, 
        // qui est un tableau des paramètres de la fonction php dans le controller qu'on appelle
        echo json_encode($_POST['function']($_POST['arg']));
        // Sinon
    } else {
        // On concatène juste le premier paramètre AjaxCall, soit le nom de la fonction du controller appelé
        echo json_encode($_POST['function']());
    }
    unset($_POST);
    die();
}
