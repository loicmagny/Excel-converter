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
    $result->setPlace(htmlspecialchars($array[0]));
    $result->setPoints((int)htmlspecialchars($array[1]));
    $result->setAth_id((int)htmlspecialchars($array[2]));
    if ($result->insertGlobalAthResult()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setPlace(htmlspecialchars(0));
            $result->setPoints((int)htmlspecialchars(0));
            $result->setAth_id((int)htmlspecialchars(0));
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
    $result->setAth_id((int)$array[0]);
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

if (isset($_POST['print'])) {
    var_dump('oui');
    createPDF();
}

function createPDF()
{
    $result = new results();
    $resultList = $result->getAllResults();
    echo '<pre>';
    var_dump($resultList);
    echo '</pre>';

    $table = '<table>
    <thead>
      <tr>
      <th class="center">Poste de tir</th>
      <th class="center">Catégorie</th>
      <th class="center">Nom</th>
      <th class="center">Temps</th>
      <th class="center">Points</th>
      <th class="center"></th>
      </tr>
    </thead>

    <tbody>
    
    </tbody>
  </table>';

    $fp = fopen('result.txt', 'a');
    for ($i = 0; $i < sizeof($resultList); $i++) {
        fwrite($fp, $table);
    }
    fclose($fp);
}
