<?php

class category extends dataBase
{
    private $cat_id = 0;
    private $cat_name = '';
    private $distance = 0;
    private $time = '';
    private $ptsPerSec = 0;
    private $points = 0;
    private $lr_distance = 0;
    private $lr_turns = 0;
    private $lr_time = '';
    private $lr_points = 0;
    private $lr_ptsPerSec = 0;
    private $tablename = 'categories';

    public function __construct()
    {
        parent::__construct();
    }


    /**
     * Get the value of cat_id
     */
    public function getCat_id()
    {
        return $this->cat_id;
    }

    /**
     * Set the value of cat_id
     *
     * @return  self
     */
    public function setCat_id($cat_id)
    {
        $this->cat_id = $cat_id;

        return $this;
    }

    /**
     * Get the value of cat_name
     */
    public function getCat_name()
    {
        return $this->cat_name;
    }

    /**
     * Set the value of cat_name
     *
     * @return  self
     */
    public function setCat_name($cat_name)
    {
        $this->cat_name = $cat_name;

        return $this;
    }

    /**
     * Get the value of distance
     */
    public function getDistance()
    {
        return $this->distance;
    }

    /**
     * Set the value of distance
     *
     * @return  self
     */
    public function setDistance($distance)
    {
        $this->distance = $distance;

        return $this;
    }

    /**
     * Get the value of time
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set the value of time
     *
     * @return  self
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get the value of ptsPerSec
     */
    public function getPtsPerSec()
    {
        return $this->ptsPerSec;
    }

    /**
     * Set the value of ptsPerSec
     *
     * @return  self
     */
    public function setPtsPerSec($ptsPerSec)
    {
        $this->ptsPerSec = $ptsPerSec;

        return $this;
    }

    /**
     * Get the value of points
     */
    public function getPoints()
    {
        return $this->points;
    }

    /**
     * Set the value of points
     *
     * @return  self
     */
    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }

    /**
     * Get the value of lr_distance
     */
    public function getLr_distance()
    {
        return $this->lr_distance;
    }

    /**
     * Set the value of lr_distance
     *
     * @return  self
     */
    public function setLr_distance($lr_distance)
    {
        $this->lr_distance = $lr_distance;

        return $this;
    }

    /**
     * Get the value of lr_turns
     */
    public function getLr_turns()
    {
        return $this->lr_turns;
    }

    /**
     * Set the value of lr_turns
     *
     * @return  self
     */
    public function setLr_turns($lr_turns)
    {
        $this->lr_turns = $lr_turns;

        return $this;
    }

    /**
     * Get the value of lr_time
     */
    public function getLr_time()
    {
        return $this->lr_time;
    }

    /**
     * Set the value of lr_time
     *
     * @return  self
     */
    public function setLr_time($lr_time)
    {
        $this->lr_time = $lr_time;

        return $this;
    }

    /**
     * Get the value of lr_points
     */
    public function getLr_points()
    {
        return $this->lr_points;
    }

    /**
     * Set the value of lr_points
     *
     * @return  self
     */
    public function setLr_points($lr_points)
    {
        $this->lr_points = $lr_points;

        return $this;
    }

    /**
     * Get the value of lr_ptsPerSec
     */
    public function getLr_ptsPerSec()
    {
        return $this->lr_ptsPerSec;
    }

    /**
     * Set the value of lr_ptsPerSec
     *
     * @return  self
     */
    public function setLr_ptsPerSec($lr_ptsPerSec)
    {
        $this->lr_ptsPerSec = $lr_ptsPerSec;

        return $this;
    }
// Méthode pour récupérer les id et noms des catégories en bdd
    public function getAllCatIds()
    {
        $query = 'SELECT `cat_id`, `cat_name` FROM ' . $this->tablename . '';
        $allCatIds = $this->db->query($query);
        if ($allCatIds->execute()) {
            $allCatIdsResult = $allCatIds->fetchAll();
        }
        return $allCatIdsResult;
    }
// Méthode pour récupérer les détails d'une catégorie
    public function getAllCatDetails()
    {
        $query = 'SELECT `cat_id`, `cat_name`, `distance`, `time`, `ptsPerSec`, `points`, `lr_distance`, `lr_turns`, `lr_time`, `lr_points`, `lr_ptsPerSec` FROM ' . $this->tablename . '';
        $allCatDetails = $this->db->query($query);
        if ($allCatDetails->execute()) {
            $allCatDetailsResult = $allCatDetails->fetchAll();
        }
        return $allCatDetailsResult;
    }
// Méthode qui permet de récupérer les détails d'une catégorie
    public function getCatDetails()
    {
        $query = 'SELECT `cat_id`, `cat_name`, `distance`, `time`, `ptsPerSec`, `points`, `lr_distance`, `lr_turns`, `lr_time`, `lr_points`, `lr_ptsPerSec` FROM ' . $this->tablename . ' WHERE `cat_id` = :cat_id';
        $catDetails = $this->db->prepare($query);
        $catDetails->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        if ($catDetails->execute()) {
            $CatDetailsResult = $catDetails->fetch(PDO::FETCH_OBJ);
        }
        return $CatDetailsResult;
    }
// Méthode qui permet de mettre à jour le nom d'une catégorie
    public function updateCategoryName()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `cat_name` = :cat_name WHERE `cat_id` = :cat_id';
        $editCategoryName = $this->db->prepare($query);
        $editCategoryName->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $editCategoryName->bindValue(':cat_name', $this->cat_name, PDO::PARAM_STR);
        return $editCategoryName->execute();
    }
    // Méthode qui permet de mettre à jour la distance de natation à parcourir d'une catégorie
    public function updateSwimDistance()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `distance` = :distance WHERE `cat_id` = :cat_id';
        $editSwimDistance = $this->db->prepare($query);
        $editSwimDistance->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $editSwimDistance->bindValue(':distance', $this->distance, PDO::PARAM_INT);
        return $editSwimDistance->execute();
    }
    // Méthode qui permet de mettre à jour le temps de natation par défaut d'une catégorie
    public function updateSwimTime()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `time` = :time WHERE `cat_id` = :cat_id';
        $updateSwimTime = $this->db->prepare($query);
        $updateSwimTime->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $updateSwimTime->bindValue(':time', $this->time, PDO::PARAM_STR);
        return $updateSwimTime->execute();
    }
    // Méthode qui permet de mettre à jour les points pour le temps par défaut d'une catégorie
    public function updateSwimPoints()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `points` = :points WHERE `cat_id` = :cat_id';
        $updateSwimPoints = $this->db->prepare($query);
        $updateSwimPoints->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $updateSwimPoints->bindValue(':points', $this->points, PDO::PARAM_INT);
        return $updateSwimPoints->execute();
    }
    // Méthode qui permet de mettre à jour les points par secondes d'une catégorie
    public function updateSwimPtsPerSec()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `ptsPerSec` = :ptsPerSec WHERE `cat_id` = :cat_id';
        $updateSwimPtsPerSec = $this->db->prepare($query);
        $updateSwimPtsPerSec->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $updateSwimPtsPerSec->bindValue(':ptsPerSec', $this->ptsPerSec, PDO::PARAM_INT);
        return $updateSwimPtsPerSec->execute();
    }
    // Méthode qui permet de mettre à jour la distance de Laser Run d'une catégorie
    public function updateLRDistance()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `lr_distance` = :lr_distance WHERE `cat_id` = :cat_id';
        $updateLRDistance = $this->db->prepare($query);
        $updateLRDistance->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $updateLRDistance->bindValue(':lr_distance', $this->lr_distance, PDO::PARAM_INT);
        return $updateLRDistance->execute();
    }
    // Méthode qui permet de mettre à jour les tours à réaliser lors du combiné d'une catégorie
    public function updateLRTurns()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `lr_turns` = :lr_turns WHERE `cat_id` = :cat_id';
        $updateLRTurns = $this->db->prepare($query);
        $updateLRTurns->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $updateLRTurns->bindValue(':lr_turns', $this->lr_turns, PDO::PARAM_INT);
        return $updateLRTurns->execute();
    }
    // Méthode qui permet de mettre à jour le temps par défaut pour le combiné d'une catégorie
    public function updateLRTime()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `lr_time` = :lr_time WHERE `cat_id` = :cat_id';
        $updateLRTime = $this->db->prepare($query);
        $updateLRTime->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $updateLRTime->bindValue(':lr_time', $this->lr_time, PDO::PARAM_STR);
        return $updateLRTime->execute();
    }
    // Méthode qui permet de mettre à jour les points par seconde pour le combiné d'une catégorie
    public function updateLRPtsPerSec()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `ptsPerSec` = :ptsPerSec WHERE `cat_id` = :cat_id';
        $updateLRPtsPerSec = $this->db->prepare($query);
        $updateLRPtsPerSec->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $updateLRPtsPerSec->bindValue(':ptsPerSec', $this->ptsPerSec, PDO::PARAM_INT);
        return $updateLRPtsPerSec->execute();
    }
    // Méthode qui permet de mettre à jour les points par défaut du combiné d'une catégorie
    public function updateLRPoints()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `lr_points` = :lr_points WHERE `cat_id` = :cat_id';
        $updateLRPoints = $this->db->prepare($query);
        $updateLRPoints->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $updateLRPoints->bindValue(':lr_points', $this->lr_points, PDO::PARAM_INT);
        return $updateLRPoints->execute();
    }
    function __destruct()
    {
    }
}

// 