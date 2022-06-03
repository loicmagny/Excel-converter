<?php
// Permet d'ajouter un résultat de combine (ou Laser Run)
function insertLRAthleteResult($arg)
{
    $result = new laserRun();
    $result->setAth_id((int)htmlspecialchars($arg[0]));
    $result->setTime(htmlspecialchars($arg[1]));
    $result->setPoints((int)htmlspecialchars($arg[2]));
    $result->setHeats((int)htmlspecialchars($arg[3]));
    if ($result->createLRAthleteResult()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setTime('');
            $result->setAth_id(0);
            $result->setHeats(0);
            $result->setPoints(0);
        }
    }
}


function editAthLaserRunResults($arg)
{
    $result = new laserRun();
    $result->setAth_id($arg[0]);
    $result->setTime(htmlspecialchars($arg[1]));
    $result->setPoints((int)htmlspecialchars($arg[2]));
    if ($result->updateAthTime()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setTime('');
        }
    }
}

// Permet de modifier le temps d'un athlète
function editAthleteTime($array)
{
    $result = new laserRun();
    $result->setTime(htmlspecialchars($array[0]));
    $result->setAth_id($array[1]);
    if ($result->updateAthTime()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setTime('');
        }
    }
    // return $result->getLRSavedResults();
}

//Permet de modifier les points d'un athlète pour le combiné
function editAthPoints($array)
{
    $result = new laserRun();

    $result->setAth_id($array[1]);
    if ($result->updateAthPoints()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setPoints(0);
        }
    }
    // return $result->getLRSavedResults($array[]);
}
// Permet de récupérer  la place d'arrivée d'un athlètes
// Permet de récupérer les temps de combiné enregistrés en bdd
function getLRSavedTimes($gender)
{
    $laserRun = new laserRun();
    if ($gender == 0 || $gender == 1) {
        return $laserRun->getLRSavedResults($gender);
    } else {
        return false;
    }
}

