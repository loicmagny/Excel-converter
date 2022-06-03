<?php
// require_once '../models/categories_model.php';

$isStarted = false;

if (isset($_POST['action'])) {
    $isStarted = true;
    if ($isStarted) {
        $loader = createAthletes();
        $isStarted = false;
    }
}

function createAthletes()
{
    require_once 'parser.php';
    $xlsx = getExcelFiles();
    for ($i = 0; $i < count($xlsx); $i++) {
        foreach ($xlsx[$i]->rows() as $elt) {
            if ($elt[3] == 'Prenom' || $elt[3] == '') {
                next($elt);
            } else {
                $athlete = new athlete();
                $athlete->setClub(strtoupper(htmlspecialchars($elt[1])));
                $athlete->setLast_name(
                    ucwords(
                        strtolower(ucfirst(
                            htmlentities($elt[2], ENT_QUOTES, 'UTF-8', true)
                        ))
                    )
                );
                $athlete->setFirst_name(
                    ucwords(
                        strtolower(ucfirst(
                            htmlentities($elt[3], ENT_QUOTES, 'UTF-8', true)
                        ))
                    )
                );
                $athlete->setCat_id(
                    formatCat(strtolower(htmlspecialchars($elt[4])))
                );

                $athlete->setGender(
                    formatGender(strtolower(htmlspecialchars($elt[5])))
                );
                $athlete->setType_id(
                    formatType(strtolower(htmlspecialchars($elt[6])))
                );
                $athlete->setSwimTime(formatSwimTime($elt[7]));
                $athlete->setLR_handicap('');
                if ($athlete->createAthlete()) {
                    $insertSucess = true;
                    if ($insertSucess) {
                        $athlete->setClub('');
                        $athlete->setFirst_name('');
                        $athlete->setLast_name('');
                        $athlete->setCat_id(0);
                        $athlete->setGender(0);
                        $athlete->setType_id(0);
                        $athlete->setSwimTime(0);
                        $athlete->setLR_handicap('');
                    }
                }
            }
        }
    }
    return '<script srrc="assets/js/DOM.js" defer></script>';
}

// Permet de récupérer la totalité des athlètes
function getEveryAthletes()
{
    $ath = new athlete();
    $sorted = [];
    $board = $ath->getAllAthletes();
    for ($i = 0; $i < sizeof($board); $i++) {
        $sorted[$i] = $board[$i];
        $sorted[$i]['gender'] = transformGender($board[$i]['gender']);
        $sorted[$i]['type_id'] = transformType($board[$i]['type_id']);
        $sorted[$i]['first_name'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['first_name'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
        $sorted[$i]['last_name'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['last_name'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
        $sorted[$i]['club'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['club'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
    }
    return $sorted;
}
// Permet de récupérer la totalités des athlète triés de manière ascendante en fonction du champ désiré par l'utilisateur
function getEveryAthletesSortedAsc($field)
{
    $ath = new athlete();
    $sorted = [];
    $board = $ath->getAllAthletesSortedAsc($field);
    for ($i = 0; $i < sizeof($board); $i++) {
        $sorted[$i] = $board[$i];
        $sorted[$i]['gender'] = transformGender($board[$i]['gender']);
        $sorted[$i]['type_id'] = transformType($board[$i]['type_id']);
        $sorted[$i]['first_name'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['first_name'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
        $sorted[$i]['last_name'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['last_name'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
        $sorted[$i]['club'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['club'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
    }
    return $sorted;
}
// IDem mais de manière descendante
function getEveryAthletesSortedDesc($field)
{
    $ath = new athlete();
    $sorted = [];
    $board = $ath->getAllAthletesSortedDesc($field);
    for ($i = 0; $i < sizeof($board); $i++) {
        $sorted[$i] = $board[$i];
        $sorted[$i]['gender'] = transformGender($board[$i]['gender']);
        $sorted[$i]['type_id'] = transformType($board[$i]['type_id']);
        $sorted[$i]['first_name'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['first_name'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
        $sorted[$i]['last_name'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['last_name'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
        $sorted[$i]['club'] = ucfirst(
            html_entity_decode(
                $sorted[$i]['club'],
                ENT_QUOTES | ENT_XML1,
                'UTF-8'
            )
        );
    }
    return $sorted;
}

// Passe la donné 'type' d'un int vers une str
function transformType($int)
{
    if ($int == 1) {
        return 'Triathle';
    } elseif ($int == 2) {
        return 'Laser Run';
    }
}
// idem mais pour le genre
function transformGender($int)
{
    if ($int == 0) {
        return 'Femme';
    } elseif ($int == 1) {
        return 'Homme';
    }
}
// Récupère tous les athlètes enregistrés avec un gender à 1
function getAllBoys()
{
    $boys = new athlete();
    $heats = [];
    $heats[0] = $boys->getBoysCat(50);
    $heats[1] = $boys->getBoysCat(100);
    $heats[2] = $boys->getBoysCat(200);
    return $heats;
}
// Idem mais pour les athlètes avec un gender à 0
function getAllGirls()
{
    $girls = new athlete();
    $heats = [];
    $heats[0] = $girls->getGirlsCat(50);
    $heats[1] = $girls->getGirlsCat(100);
    $heats[2] = $girls->getGirlsCat(200);
    return $heats;
}

function editAthData($arg)
{
    $update = new athlete();
    $update->setId((int) $arg[0]);
    $update->setLast_name(ucfirst(ucwords(htmlspecialchars($arg[1]))));
    $update->setFirst_name(ucfirst(ucwords(htmlspecialchars($arg[2]))));
    $update->setClub(ucfirst(ucwords(htmlspecialchars($arg[3]))));
    $update->setGender((int) $arg[4]);
    $update->setCat_id((int) $arg[5]);
    $update->setType_id((int) $arg[6]);
    $update->setSwimTime((int) $arg[7]);
    $update->setLR_handicap(0);
    if ($update->updateFirstName()) {
        $updateFirstNameSuccess = true;
        if ($updateFirstNameSuccess) {
            $update->setFirst_name('');
        }
    }
    if ($update->updateLastName()) {
        $updateLastNameSuccess = true;
        if ($updateLastNameSuccess) {
            $update->setLast_name('');
        }
    }
    if ($update->updateClub()) {
        $updateClubSucces = true;
        if ($updateClubSucces) {
            $update->setClub('');
        }
    }
    if ($update->updateGender()) {
        $updateGenderSucces = true;
        if ($updateGenderSucces) {
            $update->setGender(0);
        }
    }
    if ($update->updateCategory()) {
        $updateCategorySucces = true;
        if ($updateCategorySucces) {
            $update->setCat_id(0);
        }
    }
    if ($update->updateType()) {
        $updateTypeSucces = true;
        if ($updateTypeSucces) {
            $update->setType_id(0);
        }
    }
    if ($update->updateSwimTime()) {
        $updateSwimTimeSucces = true;
        if ($updateSwimTimeSucces) {
            $update->setSwimTime(0);
        }
    }
}

// Permet de mettre à jour le handicap time d'un athlète pour le combiné
function updateHandicap($arg)
{
    $athlete = new athlete();
    $athlete->setLR_handicap($arg[0]);
    $athlete->setId($arg[1]);
    $athlete->updateAthHandicapTime();
    return $athlete->getHandicapTime();
}
// Permet de récupérer le handicap start d'un athlète
function getAthHandicap($arg)
{
    $athlete = new athlete();
    $athlete->setId($arg[0]);
    return $athlete->getHandicapTime();
}
// Permet de récupérer les infos de  la catégorie d'un athlète
function getAthCatDetails($id)
{
    $ath = new athlete();
    return $ath->getAthCatDetailsById($id);
}
// Permet de récupérer un seul athlète
function getSingleAth($arg)
{
    $athlete = new athlete();
    $athlete->setId($arg);
    return $athlete->getSingleAthlete();
}

function countLRAth()
{
    $athlete = new athlete();
    $count = $athlete->countLRAth();
    return  $count;
}
// Permet de récupérer un athlète inscrit pour le Laser Run (type = 2)
function getLRAth($arg)
{
    $athlete = new athlete();
    $athlete->setGender($arg);
    return $athlete->getLaserRunNotTriAth();
}
// Permet de transformer le gender en un int pour l'envoi en bdd
function formatGender($str)
{
    if (
        $str == 'h' ||
        $str == 'homme' ||
        $str == '1' ||
        $str == 'garçon' ||
        $str == 'garcon'
    ) {
        return 1;
    } elseif (
        $str == 'f' ||
        $str == 'femme' ||
        $str == '0' ||
        $str == 'fille'
    ) {
        return 0;
    }
}
// Permet de transformer le type en un int pour l'envoi en bdd
function formatType($str)
{
    if ($str == 'triathle') {
        return 1;
    }
    if ($str == 'laserrun' || $str == 'laser run') {
        return 2;
    }
}
// Permet de transformer la cat en un int pour l'envoi en bdd
function formatCat($str)
{
    switch ($str) {
        case 'u9':
            return 1;
            break;
        case 'u11':
            return 2;
            break;
        case 'u13':
            return 3;
            break;
        case 'u15':
            return 4;
            break;
        case 'u17':
            return 5;
            break;
        case 'u19':
            return 6;
            break;
        case 'u22':
            return 7;
            break;
        case 'm40+':
            return 9;
            break;
        case 'm50+':
            return 10;
            break;
        case 'm60+':
            return 11;
            break;
        default:
            return 8;
            break;
    }
}
// Permet de trier les athlètes par catégorie
function sortAthByCat()
{
    $ath = new athlete();
    $sorted = [];
    $board = [];
    for ($i = 1; $i <= 10; $i++) {
        $ath->setCat_id($i);
        $board[$i] = $ath->selectAthInCat();
    }
    for ($i = 1; $i < count($board); $i++) {
        for ($j = 0; $j < count($board[$i]); $j++) {
            $sorted[$i][$j] = $board[$i][$j];
            $sorted[$i][$j]['gender'] = transformGender(
                $board[$i][$j]['gender']
            );
            $sorted[$i][$j]['type_id'] = transformType(
                $board[$i][$j]['type_id']
            );
        }
    }
    return array_filter($sorted);
}
// Permet de trier les  athlètes par sexe
function sortAthBySex()
{
    $ath = new athlete();
    $sorted = [];
    $board = [];
    for ($i = 0; $i < 2; $i++) {
        $ath->setGender($i);
        $board[$i] = $ath->selectAthBySex();
    }
    for ($i = 0; $i < count($board); $i++) {
        for ($j = 0; $j < count($board[$i]); $j++) {
            $sorted[$i][$j] = $board[$i][$j];
            $sorted[$i][$j]['gender'] = transformGender(
                $board[$i][$j]['gender']
            );
            $sorted[$i][$j]['type_id'] = transformType(
                $board[$i][$j]['type_id']
            );
        }
    }
    return array_filter($sorted);
}
// Permet de trier les athlètes par type de compétition
function sortAthByType()
{
    $ath = new athlete();
    $sorted = [];
    $board = [];
    for ($i = 1; $i < 3; $i++) {
        $ath->setType_id($i);
        $board[$i] = $ath->selectAthByType();
    }
    for ($i = 1; $i <= count($board); $i++) {
        for ($j = 0; $j < count($board[$i]); $j++) {
            $sorted[$i][$j] = $board[$i][$j];
            $sorted[$i][$j]['gender'] = transformGender(
                $board[$i][$j]['gender']
            );
            $sorted[$i][$j]['type_id'] = transformType(
                $board[$i][$j]['type_id']
            );
        }
    }
    return array_filter($sorted);
}
// Permet de chercher un athlète dans la bdd
function searchAth($str)
{
    $ath = new athlete();
    $ath->setFirst_name(ucfirst(htmlspecialchars($str)));
    $ath->setLast_name(ucfirst(ucfirst(htmlspecialchars($str))));
    $ath->setClub(ucfirst(htmlspecialchars($str)));
    $result = $ath->searchForAth();
    $sorted = [];
    for ($i = 0; $i < count($result); $i++) {
        $sorted[$i] = $result[$i];
        $sorted[$i]['gender'] = transformGender($result[$i]['gender']);
        $sorted[$i]['type_id'] = transformType($result[$i]['type_id']);
    }
    // echo '<pre>';
    // echo '</pre>';
    return $sorted;
}
// Permet de supprimer un athlètes de la bdd
function deleteAth($arg)
{
    $athlete = new athlete();
    $athlete->setId($arg);
    return $athlete->removeAth();
}
// Permet de compter le nombre d'athlètes présents en bdd
function athAmountCheck()
{
    $athlete = new athlete();
    return $athlete->checkIfAth();
}

//Permet de transformer les temps d'engagements sur le fichier Excel de strings vers des int ("1:26" -> 86)
function formatSwimTime($str)
{
    $string = preg_replace('/[^0-9.,]+/', '', $str);
    $time = 0;
    if (strlen($string) > 2) {
        $time = (int) $string[0] * 60;
        if (is_numeric($string[1])) {
            $time += (int) '' . $string[1] . $string[2] . '';
        } elseif ($string[1] == '.') {
            $time = (int) $string[0] * 60 + (int) $string[2] * 10;
        } else {
            $time += (int) '' . $string[2] . $string[3] . '';
        }
    } else {
        if ((int) $string > 60) {
            $string = (int) $string % 60;
        }
    }
    return $time;
}

function getLRSavedResultsByCategories($arg)
{
    $athlete = new athlete();
    $athlete->setGender($arg[0]);
    $categories = [];
    for ($i = 1; $i < 11; $i++) {
        $athlete->setCat_id($i);
        $categories[$i] = $athlete->getLRSavedResultsByCategoriesMethod();
    }
    return $categories;
}
