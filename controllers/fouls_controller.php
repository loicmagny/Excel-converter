<?php
// Permet d'ajouter une pénalité à un athlète
function addFoulToAth($arg)
{
    $athFouls = new athFouls();
    $athFouls->setAth_id($arg[0]);
    $athFouls->setFouls_id($arg[1]);
    $athFouls->insertAthFouls();
    return $athFouls->getLastEntry();
}
// Permet de récupérer le nombre de pénalité présentes en bdd
function getSwimFouls()
{
    $fouls = new fouls();
    return $fouls->getSwimFouls();
}
// Permet d'afficher les pénalités attribuées à l'athlète
function getAthSwimFoul($arg)
{
    $athFouls = new athFouls();
    $athFouls->setAth_id($arg);
    return $athFouls->getAthSwimFouls();
}
// Permet de retirer une pénalité à un athlète
function removeAthFouls($arg)
{
    $athFouls = new athFouls();
    $athFouls->setId($arg);
    return $athFouls->deleteAthFoul();
}
