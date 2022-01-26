<?php

class swimming extends dataBase
{
    private $id = 0;
    private $time = '';
    private $ath_id = 0;
    private $heats = 0;
    private $points = 0;
    private $fouls = '';
    private $tablename = 'swimming';

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

    public function getTime()
    {
        return $this->time;
    }

    public function setTime($time)
    {
        $this->time = $time;

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

    public function getHeats()
    {
        return $this->heats;
    }

    public function setHeats($heats)
    {
        $this->heats = $heats;

        return $this;
    }

    public function getPoints()
    {
        return $this->points;
    }

    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }
    public function getFouls()
    {
        return $this->fouls;
    }

    public function setFouls($fouls)
    {
        $this->fouls = $fouls;

        return $this;
    }

    public function createAthleteResult()
    {
        $query = 'INSERT INTO ' . $this->tablename . ' (`time`, `ath_id`, `heat`, `points`) VALUES (:time, :ath_id, :heat, :points)';
        $createAthleteResult = $this->db->prepare($query);
        $createAthleteResult->bindValue(':time', $this->time, PDO::PARAM_STR);
        $createAthleteResult->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        $createAthleteResult->bindValue(':heat', $this->heats, PDO::PARAM_INT);
        $createAthleteResult->bindValue(':points', $this->points, PDO::PARAM_INT);
        return $createAthleteResult->execute();
    }

    public function getSavedResults($gender)
    {
        $query = 'SELECT
        swi.`id`,
        swi.`time`,
        swi.`ath_id`,
        swi.`heat`,
        swi.`points`,
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
        cat.`cat_name`
        FROM
        ' . $this->tablename . ' AS swi
        INNER JOIN `athletes` AS ath
        ON
            swi.`ath_id` = ath.`id`
        INNER JOIN `categories` AS cat
        ON
            ath.`cat_id` = cat.`cat_id`
        WHERE
            ath.`gender` = ' . $gender . ' ORDER BY
            swi.`points` DESC';
        $getAthletesTime = $this->db->query($query);
        if (is_object($getAthletesTime)) {
            $timeList = $getAthletesTime->fetchAll(PDO::FETCH_ASSOC);
        }
        return $timeList;
    }

    //     SELECT
    //     swi.`id`,
    //     swi.`time`,
    //     swi.`heat`,
    //     swi.`fouls_id`,
    //     swi.`points`,
    //     ath.`id` AS ath_id,
    //     ath.`first_name`,
    //     ath.`last_name`,
    //     ath.`club`,
    //     ath.`type_id`,
    //     ath.`gender`,
    //     ath.`lr_handicap`,
    //     cat.`cat_id`,
    //     cat.`lr_distance`,
    //     cat.`lr_turns`,
    //     cat.`cat_name`
    // FROM
    //     swimming AS swi
    // INNER JOIN `athletes` AS ath
    // ON
    //     swi.`ath_id` = ath.`id`
    // INNER JOIN `categories` AS cat
    // ON
    //     ath.`cat_id` = cat.`cat_id`
    // INNER JOIN fouls ON fouls.id = swi.fouls_id
    // WHERE
    //     ath.`gender` = 1
    // ORDER BY
    //     swi.`points`
    // DESC

    public function updateAthTime()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `time`= :time WHERE `ath_id` = :ath_id';
        $updateAthTime = $this->db->prepare($query);
        $updateAthTime->bindValue(':time', $this->time, PDO::PARAM_STR);
        $updateAthTime->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        return $updateAthTime->execute();
    }
    public function updateAthPoints()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `points`= :points WHERE `ath_id` = :ath_id';
        $updateAthPoints = $this->db->prepare($query);
        $updateAthPoints->bindValue(':points', $this->time, PDO::PARAM_INT);
        $updateAthPoints->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        return $updateAthPoints->execute();
    }

    public function __destruct()
    {
    }
}
