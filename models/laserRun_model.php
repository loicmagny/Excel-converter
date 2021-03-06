<?php

class laserRun extends dataBase
{
    private $id = 0;
    private $time = '';
    private $points = 0;
    private $ath_id = 0;
    private $heats = 0;
    private $fouls = '';
    private $tablename = 'laserrun';

    public function __construct()
    {
        parent::__construct();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Getter et Setter  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

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
     * Get the value of ath_id
     */
    public function getAth_id()
    {
        return $this->ath_id;
    }

    /**
     * Set the value of ath_id
     *
     * @return  self
     */
    public function setAth_id($ath_id)
    {
        $this->ath_id = $ath_id;

        return $this;
    }

    /**
     * Get the value of heats
     */
    public function getHeats()
    {
        return $this->heats;
    }

    /**
     * Set the value of heats
     *
     * @return  self
     */
    public function setHeats($heats)
    {
        $this->heats = $heats;

        return $this;
    }


    /**
     * Get the value of fouls
     */
    public function getFouls()
    {
        return $this->fouls;
    }

    /**
     * Set the value of fouls
     *
     * @return  self
     */
    public function setFouls($fouls)
    {
        $this->fouls = $fouls;

        return $this;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Fin Getter et Setter//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // M??thode permettant d'enregistrer un r??sultat de combin?? dans la bdd
    public function createLRAthleteResult()
    {
        $query = 'INSERT INTO ' . $this->tablename . ' (`time`, `ath_id`, `points`, `heat`) VALUES (:time, :ath_id,:points, :heat)';
        $createLRAthleteResult = $this->db->prepare($query);
        $createLRAthleteResult->bindValue(':time', $this->time, PDO::PARAM_STR);
        $createLRAthleteResult->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        $createLRAthleteResult->bindValue(':points', $this->points, PDO::PARAM_INT);
        $createLRAthleteResult->bindValue(':heat', $this->heats, PDO::PARAM_INT);
        return $createLRAthleteResult->execute();
    }

    // M??thode permettant de r??cup??rer les r??sultats du combin?? stock??s en bdd
    public function getLRSavedResults($gender)
    {
        $query = 'SELECT
        lr.`id`,
        lr.`time`,
        lr.`ath_id`,
        lr.`heat`,
        lr.`points` as points,
        ath.`id` AS ath_id,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`gender`,
        ath.`lr_handicap`,
        cat.`cat_id`,
        cat.`lr_distance`,
        cat.`lr_turns`,
        cat.`lr_time`,
        cat.`cat_name`
        FROM
        ' . $this->tablename . ' AS lr
        INNER JOIN `athletes` AS ath
        ON
            lr.`ath_id` = ath.`id`
        INNER JOIN `categories` AS cat
        ON
            ath.`cat_id` = cat.`cat_id`
        WHERE
            ath.`gender` = ' . $gender . '';
        $getAthletesTime = $this->db->query($query);
        if (is_object($getAthletesTime)) {
            $timeList = $getAthletesTime->fetchAll(PDO::FETCH_OBJ);
        }
        return $timeList;
    }

    public function getAthLrResults()
    {
        $query = 'SELECT
        lr.`id`,
        lr.`time`,
        lr.`ath_id`,
        lr.`heat`,
        lr.`points` as points,
        ath.`id` AS ath_id,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`gender`,
        ath.`lr_handicap`,
        cat.`cat_id`,
        cat.`lr_distance`,
        cat.`lr_turns`,
        cat.`lr_time`,
        cat.`cat_name`
        FROM
        ' . $this->tablename . ' AS lr
        INNER JOIN `athletes` AS ath
        ON
            lr.`ath_id` = ath.`id`
        INNER JOIN `categories` AS cat
        ON
            ath.`cat_id` = cat.`cat_id`
        WHERE
            lr.`ath_id` = :ath_id';
        $getAthLrResults = $this->db->prepare($query);
        $getAthLrResults->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        if ($getAthLrResults->execute()) {
            $getAthLrResultsList = $getAthLrResults->fetch(PDO::FETCH_OBJ);
        }
        return $getAthLrResultsList;
    }


    // M??thode permettant de mettre ?? jour le temps du combin?? d'un athl??te
    public function updateAthTime()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `time`= :time, `points` = :points WHERE `ath_id` = :ath_id';
        $updateAthTime = $this->db->prepare($query);
        $updateAthTime->bindValue(':time', $this->time, PDO::PARAM_STR);
        $updateAthTime->bindValue(':points', $this->points, PDO::PARAM_STR);
        $updateAthTime->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        return $updateAthTime->execute();
    }
    // Idem mais pour les points
    public function updateAthPoints()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `points`= :points WHERE `ath_id` = :ath_id';
        $updateAthPoints = $this->db->prepare($query);
        $updateAthPoints->bindValue(':points', $this->points, PDO::PARAM_INT);
        $updateAthPoints->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        return $updateAthPoints->execute();
    }

    public function __destruct()
    {
    }
}
