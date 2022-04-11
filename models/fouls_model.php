<?php

class Fouls extends database
{

    private $id = 0;
    private $label = "";
    private $type = 0;
    private $points = '';
    private $tablename = 'fouls';

    public function __construct()
    {
        parent::__construct();
    }
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getLabel()
    {
        return $this->label;
    }

    public function setLabel($label)
    {
        $this->label = $label;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
    }

    public function getPoints()
    {
        return $this->points;
    }

    public function setPoints($points)
    {
        $this->points = $points;
    }
    // Méthode pour récupérer les pénalités stockées en bdd
    public function getFouls()
    {
        $query = 'SELECT
        `id`,
        `label`,
        `type`,
        `points`
    FROM
    ' . $this->tablename . '
    WHERE
        `type` = :type';
        $foul = $this->db->prepare($query);
        $foul->bindValue(':type', $this->type, PDO::PARAM_INT);
        if ($foul->execute()) {
            $foulResult = $foul->fetch(PDO::FETCH_ASSOC);
        }
        return $foulResult;
    }
    // Méthode permettant de récupérer une seule pénalité via son id
    public function getFoulsById()
    {
        $query = 'SELECT `id`, `label`, `type`, `points` FROM ' . $this->tablename . ' WHERE id = :id AND `type` = :type';
        $foulById = $this->db->prepare($query);
        $foulById->bindValue(':id', $this->id, PDO::PARAM_INT);
        $foulById->bindValue(':type', $this->type, PDO::PARAM_INT);
        if ($foulById->execute()) {
            $foulByIdResult = $foulById->fetch(PDO::FETCH_ASSOC);
        }
        return $foulByIdResult;
    }

    function __destruct()
    {
    }
}
