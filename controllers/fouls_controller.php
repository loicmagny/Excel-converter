<?php
// Permet d'ajouter une pénalité à un athlète
function addFoulToAth($arg)
{
    $athFouls = new athFoul();
    $athFouls->setAth_id($arg[0]);
    $athFouls->setFouls_id($arg[1]);
    $athFouls->insertAthFouls();
    $lr = new laserRun();
    $lr->setAth_id($arg[0]);
    $laser = $lr->getAthLrResults();

    $swimming = new swimming();
    $swimming->setAth_id($arg[0]);
    $ath = $swimming->getSwimResult();

    $foul = new Foul();
    $foul->setId($arg[1]);
    $var = $foul->getSingleFoul();
    if (isset($laser)) {
        $time = (int)$laser->time -= (int)$var['seconds'];
        $points = $laser->points -= (int)$var['seconds'];
        if ($time < 0) {
            $time = 0;
        }
        if ($points < 0) {
            $points = 0;
        }
        $lr->setTime($time);
        $lr->setPoints($points);
        $lr->updateAthTime();
    } else if (isset(($ath))) {
        $swimming->setPoints($ath['points'] -= (int)$var['seconds']);
        $swimming->updateAthPoints();
    }
    return $athFouls->getLastEntry();
}

// Permet de récupérer le nombre de pénalité présentes en bdd
function getFouls($arg)
{
    $fouls = new foul();
    $fouls->setType((int)$arg);
    return $fouls->getFouls();
}
// Permet d'afficher les pénalités attribuées à l'athlète
function getAthSwimFoul($arg)
{
    $athFouls = new athFoul();
    $athFouls->setAth_id($arg);
    return $athFouls->getAthSwimFouls();
}
function getAthLRFoulList($arg)
{
    $athFouls = new athFoul();
    $athFouls->setAth_id($arg);
    return $athFouls->getAthLRFouls();
}
// Permet de retirer une pénalité à un athlète
function removeAthFouls($arg)
{
    $athFouls = new athFoul();
    $athFouls->setId((int)$arg[1]);
    $foulType = $athFouls->getFoulsType();
    $athFouls->setFouls_id($foulType->id);

    $lr = new laserRun();
    $lr->setAth_id($arg[0]);
    $laser = $lr->getAthLrResults();

    $swimming = new swimming();
    $swimming->setAth_id($arg[0]);
    $ath = $swimming->getSwimResult();

    $foul = new Foul();
    $foul->setId($foulType->id);
    $var = $foul->getSingleFoul();
    if (isset($laser)) {
        $lr->setTime((int)$laser->time += (int)$var['seconds']);
        $lr->setPoints((int)$laser->time += (int)$var['seconds']);
        $lr->updateAthTime();
    } else if (isset(($ath))) {
        $swimming->setPoints($ath[0]['points'] += (int)$var['seconds']);
        $swimming->updateAthPoints();
    }
    $athFoul = new athFoul();
    $athFoul->setAth_id($arg[0]);
    return [$athFoul->getLastEntry(), $athFouls->deleteAthFoul()];
}
