<?php
// Permet de récupérer les résultats de chaque catégorie de garçon
function getAllBoysDatas()
{
    $results = new Results;
    $data = [];
    for ($i = 1; $i <= 10; $i++) {
        $data[$i] = $results->getBoysDatas($i);
    }
    return $data;
}
// idem mais pour les filles
function getAllGirlsDatas()
{
    $results = new Results;
    $data = [];
    for ($i = 1; $i <= 10; $i++) {
        $data[$i] = $results->getGirlsDatas($i);
    }
    return $data;
}
// Permet d'ajouter les résultats d'un athlète
function insertAthResult($array)
{
    $result = new Results();
    $result->setTotal(htmlspecialchars($array[0]));
    $result->setAth_id((int)htmlspecialchars($array[1]));
    $result->setSwimTime((int)htmlspecialchars($array[2]));
    $result->setLr_time((int)htmlspecialchars($array[3]));
    $result->setSwimPoints((int)htmlspecialchars($array[4]));
    $result->setLr_points((int)htmlspecialchars($array[5]));
    $result->setLr_handicap(htmlspecialchars($array[6]));
    if ($result->insertGlobalAthResult()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setTotal(htmlspecialchars(0));
            $result->setAth_id((int)htmlspecialchars(0));
            $result->setSwimTime((int)htmlspecialchars(0));
            $result->setLr_time((int)htmlspecialchars(0));
            $result->setSwimPoints((int)htmlspecialchars(0));
            $result->setLr_points((int)htmlspecialchars(0));
            $result->setLr_handicap(htmlspecialchars(''));
        }
    }
}

// Permet de récupérer la totalité des résultats
function getAllAthResult($array)
{
    $result = new Results;
    for ($i = 1; $i <= 10; $i++) {
        $return[$i] = $result->getAllAthResults($array[0], $i);
    }
    return $return;
}
// Permet de vérifier si les valeurs existent dans la bbd results
function valueChecker($array)
{
    $result = new Results;
    $result->setAth_id($array[0]);
    return $result->checkIfValueExists();
}
// Permet de modifier la place d'arrivée d'un athlète
function editEndPlace($array)
{
    $result = new Results;
    $result->setAth_id($array[0]);
    $result->setPlace($array[1]);
    return $result->editPlace();
}