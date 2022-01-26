<?php

class Results extends database
{
    private $id = 0;
    private $place = 0;
    private $total = 0;
    private $ath_id = 0;
    private $swimTime = 0;
    private $lr_time = 0;
    private $swimPoints = 0;
    private $lr_points = 0;
    private $lr_handicap = '';
    private $tablename = 'results';

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

        return $this;
    }
    public function getPlace()
    {
        return $this->place;
    }

    public function setPlace($place)
    {
        $this->place = $place;

        return $this;
    }
    public function getTotal()
    {
        return $this->total;
    }

    public function setTotal($total)
    {
        $this->total = $total;

        return $this;
    }
    public function getAth_id()
    {
        return $this->ath_id;
    }

    public function setAth_id($ath_id)
    {
        $this->ath_id = $ath_id;

        return $this;
    }
    public function getSwimTime()
    {
        return $this->swimTime;
    }

    public function setSwimTime($swimTime)
    {
        $this->swimTime = $swimTime;

        return $this;
    }
    public function getLr_time()
    {
        return $this->lr_time;
    }

    public function setLr_time($lr_time)
    {
        $this->lr_time = $lr_time;

        return $this;
    }
    public function getSwimPoints()
    {
        return $this->swimPoints;
    }

    public function setSwimPoints($swimPoints)
    {
        $this->swimPoints = $swimPoints;

        return $this;
    }
    public function getLr_points()
    {
        return $this->lr_points;
    }

    public function setLr_points($lr_points)
    {
        $this->lr_points = $lr_points;

        return $this;
    }
    public function getLr_handicap()
    {
        return $this->lr_handicap;
    }

    public function setLr_handicap($lr_handicap)
    {
        $this->lr_handicap = $lr_handicap;

        return $this;
    }
// Méthode pour récupérer les résultats des garçons
    public function getBoysDatas($cat)
    {
        $query = 'SELECT
        ath.`id` AS ath_id,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`gender`,
        ath.`lr_handicap`,
        cat.`cat_name`,
        swi.`time`,
        swi.`heat`,
        swi.`fouls`,
        swi.`points`,
        lr.`time` as lr_time,
        lr.`heat`,
        lr.`fouls_id`,
        lr.`points` AS lr_points,
        lr.`arrival`
        FROM
            athletes AS ath
        INNER JOIN `categories` AS cat
        ON
            ath.`cat_id` = cat.`cat_id`
        INNER JOIN `swimming` AS swi
        ON
            ath.`id` = swi.`ath_id`
        INNER JOIN laserrun AS lr
        ON
            ath.`id` = lr.`ath_id`
        WHERE
            ath.`gender` = 1 AND cat.`cat_id` = ' . $cat . '';
        $boysResult = $this->db->query($query);
        if (is_object($boysResult)) {
            $boysResultList = $boysResult->fetchAll(pdo::FETCH_ASSOC);
        }
        return $boysResultList;
    }
// Idem mais pour les filles
    public function getGirlsDatas($cat)
    {
        $query = 'SELECT
        ath.`id` AS ath_id,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`gender`,
        ath.`lr_handicap`,
        cat.`cat_name`,
        swi.`time`,
        swi.`heat`,
        swi.`fouls`,
        swi.`points`,
        lr.`time` as lr_time,
        lr.`heat`,
        lr.`fouls_id`,
        lr.`points` AS lr_points,
        lr.`arrival`
        FROM
            athletes AS ath
        INNER JOIN `categories` AS cat
        ON
            ath.`cat_id` = cat.`cat_id`
        INNER JOIN `swimming` AS swi
        ON
            ath.`id` = swi.`ath_id`
        INNER JOIN laserrun AS lr
        ON
            ath.`id` = lr.`ath_id`
        WHERE
            ath.`gender` = 0 AND cat.`cat_id` = ' . $cat . '';
        $girlsResults = $this->db->query($query);
        if (is_object($girlsResults)) {
            $girlsResultsList = $girlsResults->fetchAll(pdo::FETCH_ASSOC);
        }
        return $girlsResultsList;
    }
//Méthode pour enregistrer les résultats d'un athlete sur les 2 épreuves
    public function insertGlobalAthResult()
    {
        $query = 'INSERT INTO `results`(`total`, `ath_id`, `swimPoints`, `lr_points`, `swimTime`, `lr_time`, `lr_handicap`) VALUES (:total, :ath_id, :swimPoints, :lr_points, :swimTime, :lr_time, :lr_handicap)';
        $insertGlobalAthResult = $this->db->prepare($query);
        $insertGlobalAthResult->bindValue(':total', $this->total, PDO::PARAM_INT);
        $insertGlobalAthResult->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        $insertGlobalAthResult->bindValue(':swimPoints', $this->swimPoints, PDO::PARAM_INT);
        $insertGlobalAthResult->bindValue(':lr_points', $this->lr_points, PDO::PARAM_INT);
        $insertGlobalAthResult->bindValue(':swimTime', $this->swimTime, PDO::PARAM_INT);
        $insertGlobalAthResult->bindValue(':lr_time', $this->lr_time, PDO::PARAM_INT);
        $insertGlobalAthResult->bindValue(':lr_handicap', $this->lr_handicap, PDO::PARAM_STR);
        return $insertGlobalAthResult->execute();
    }
// Méthode pour récupérer les résultats globaux d'un athlete
    public function getAllAthResults($gender, $cat)
    {
        $query = 'SELECT
        res.`place`,
        res.`total`,
        res.`swimPoints`,
        res.`lr_points`,
        res.`swimTime`,
        res.`lr_time`,
        res.`lr_handicap`,
        ath.`id` AS ath_id,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`type_id`,
        ath.`gender`,
        ath.`lr_handicap`,
        cat.`cat_name`
        FROM
            `results` AS res
        INNER JOIN `athletes` AS ath
        ON
            res.`ath_id` = ath.`id`
        INNER JOIN `categories` AS cat
        ON
            ath.`cat_id` = cat.`cat_id`
        WHERE
            cat.`cat_id` = ' . $cat . ' AND ath.`gender` = ' . $gender . '
        ORDER BY
            `res`.`total`
        DESC';
        $getAthResults = $this->db->query($query);
        if (is_object($getAthResults)) {
            $getAthResultsList = $getAthResults->fetchAll(PDO::FETCH_ASSOC);
        }
        return $getAthResultsList;
    }
// Méthode pour vérifier si le résultat existe déjà
    public function checkIfValueExists()
    {
        $query = 'SELECT
        COUNT(1)
        FROM
        ' . $this->tablename . '
        WHERE
        ath_id = :ath_id';
        $valueExists = $this->db->prepare($query);
        $valueExists->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        if ($valueExists->execute()) {
            $valueExistsResult = $valueExists->fetchAll(PDO::FETCH_ASSOC);
        }
        return $valueExistsResult;
    }
// Méthode pour modifier la place d'un athlete sur les résultats finaux
    public function editPlace()
    {
        $query = 'UPDATE
            `results`
        SET
            `place` = :place
        WHERE
            ath_id = :ath_id';
        $editPlace = $this->db->prepare($query);
        $editPlace->bindValue(':place', $this->place, PDO::PARAM_INT);
        $editPlace->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        return $editPlace->execute();
    }

    public function __destruct()
    {
    }
}
