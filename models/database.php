<?php
require_once 'config.php';
/*
 * La classe dataBase assure la liaison avec la base de données. 
 * L'attribut $db sera disponible dans ses enfants et contient les informations de connection à la base de données.
 */

class database
{
    protected $db;
    protected function __construct()
    {
        try {
            $this->db = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME . ';charset=utf8', LOGIN, PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
        } catch (Exception $exc) {
            echo $exc->getMessage();
        }
    }
    protected function __destruct()
    {
        $this->db = NULL;
    }
}
