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
    public function getSwimFouls()
    {
        $query = 'SELECT `id`, `label`, `type`, `points` FROM ' . $this->tablename . ' WHERE `type` = 1 OR `type` = 0';
        $getAllFouls = $this->db->query($query);
        if (is_object($getAllFouls)) {
            $foulsList = $getAllFouls->fetchAll(PDO::FETCH_ASSOC);
        }
        return $foulsList;
    }
// Méthode permettant de récupérer une seule pénalité via son id
    public function getSwimFoulsById()
    {
        $query = 'SELECT `id`, `label`, `type`, `points` FROM ' . $this->tablename . ' WHERE id = :id AND `type` = 1';
        $swimFoul = $this->db->prepare($query);
        $swimFoul->bindValue(':id', $this->id, PDO::PARAM_INT);
        if ($swimFoul->execute()) {
            $swimFoulResult = $swimFoul->fetch(PDO::FETCH_ASSOC);
        }
        return $swimFoulResult;
    }

    function __destruct()
    {
    }
}
