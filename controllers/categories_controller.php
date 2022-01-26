<?php
// Permet de récupérer tous les ids de toutes les catégories
function getAllCatIds()
{
    $cat = new category();
    return $cat->getAllCatIds();
}
// permet de récupérer les données d'une catégorie
function getCategoryDetails($array)
{
    $cat = new category();
    $cat->setCat_id($array[0]);
    return $cat->getCatDetails();
}
// Permet de récupérer les détails de toutes les catégories
function getAllCatDetails()
{
    $cat = new category();
    return $cat->getAllCatDetails();
}
// Permet de mettre à jour le nom de la catégorie dans la bdd
function updateCatName($array)
{
    $category = new category();
    $category->setCat_id((int)$array[0]);
    $category->setCat_name(htmlspecialchars($array[1]));
    $category->updateCategoryName();
    return $category->getCatDetails();
}
// Permet de mettre à jour la distance de natation dans la bdd
function updateSwimDistance($distance, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->distance = htmlspecialchars($distance);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
// Permet de mettre à jour le temps de natation dans la bdd
function updateSwimTime($time, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->setTime(htmlspecialchars($time));
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
// Permet de mettre à jour les points pour le temps par défaut dans la bdd
function updateSwimPoints($points, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->setPoints(htmlspecialchars($points));
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
// Permet de mettre à jour les points par seconde pour la natation dans la bdd
function updateSwimPtsPerSec($ptsPerSec, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->setPtsPerSec(htmlspecialchars($ptsPerSec));
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
// Permet de mettre à jour la distance de Laser Run dans la bdd
function updateLRDistance($lr_distance, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->setLr_distance(htmlspecialchars($lr_distance));
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
// Permet de mettre à jour le nombre de tours pour la Laser Run dans la bdd
function updateLRTurns($lr_turns, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->setLr_turns(htmlspecialchars($lr_turns));
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
// Permet de mettre à jour le temps par défaut pour le Laser Run dans la bdd
function updateLRTime($lr_time, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->setLr_time(htmlspecialchars($lr_time));
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
// Permet de mettre à jour les point/sec pour le combiné dans la bdd
function updateLRPtsPerSec($lr_ptsPerSec, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->setLr_ptsPerSec(htmlspecialchars($lr_ptsPerSec));
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
// Permet de mettre à jour les points pour le combiné dans la bdd
function updateLRPoints($lr_points, $id)
{
    $category = new category();
    $category->setCat_id((int)$id);
    $category->setLr_points(htmlspecialchars($lr_points));
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
