<?php
// Permet d'insérer le résultat de natation d'un athlète en  bdd
function insertAthleteResult($array)
{
    $result = new swimming();
    $athFouls = new athFouls();
    $athFouls->setAth_id((int) htmlspecialchars($array[1]));
    $result->setTime(htmlspecialchars($array[0]));
    $result->setAth_id((int) htmlspecialchars($array[1]));
    $result->setHeats((int) htmlspecialchars($array[2]));
    $fouls = $athFouls->getAthSwimFouls();
    if (sizeof($fouls) < 1) {
        $result->setPoints($array[3]);
    } else {
        for ($i = 0; $i < sizeof($fouls); $i++) {
            $result->setPoints(($array[3]) + $fouls[$i]->points);
        }
    }
    if ($result->createAthleteResult()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setTime('');
            $result->setAth_id(0);
            $result->setHeats(0);
            $result->setPoints(0);
        }
    }
}
// Permet d'udpate le temps de natation d'un athlète en bdd
function editAthleteTime($array)
{
    $result = new swimming();
    $result->setTime(htmlspecialchars($array[0]));
    $result->setAth_id($array[1]);
    if ($result->updateAthTime()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setTime('');
        }
    }
    return $result->getSavedResults($array[5]);
}
// Permet d'éditer les points gagnés par un athlète lors de l'épreuve de natation
function editAthPoints($array)
{
    $result = new swimming();
    $result->setPoints((int) htmlspecialchars($array[0]));
    $result->setAth_id($array[1]);
    if ($result->updateAthPoints()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setPoints(0);
        }
    }
    return $result->getSavedResults($array[5]);
}

// Permet de récupérer l'ensemble des temps de natation stockés en bdd
function getSavedTimes($gender)
{
    $swimming = new swimming();
    if ($gender == 0 || $gender == 1) {
        return $swimming->getSavedResults($gender);
    } else {
        return false;
    }
}
