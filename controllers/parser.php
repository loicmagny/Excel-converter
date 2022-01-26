<?php

$xlsx = 0;
// Traitement après la validation
if (isset($_POST['send']) || isset($_POST['start'])) {

    $xlsx = getExcelFiles();
    $directory = findAllFiles();
    $files = [];
    $j = 0;
    for ($i = 2; $i < count($directory); $i++) {
        $j = $i - 2;
        $files[$j] = $directory[$i];
    }
    $sent = true;
}

// Fonction pour récupérer la totalité des fichiers dans le dossier source
function findAllFiles()
{
    return scandir('assets/uploads');
}

// Permet de récupérer les données du/des fichiers Excel dans le dossier src
function getExcelFiles()
{
    $files = [];
    $data = [];
    $directory = findAllFiles();
    $j = 0;
    for ($i = 2; $i < count($directory); $i++) {
        $j = $i - 2;
        $files[$j] = $directory[$i];
    }
    for ($i = 0; $i < count($files); $i++) {
        if ($xlsx = SimpleXLSX::parse('assets/uploads/' . $files[$i] . '')) {
            $data[$i] = $xlsx;
        } else {
            echo SimpleXLSX::parseError();
        }
    }
    return $data;
}