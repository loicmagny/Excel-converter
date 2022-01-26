<?php

class athFouls extends dataBase
{
    private $id = 0;
    private $ath_id = 0;
    private $fouls_id = 0;
    private $tablename = 'athFouls';

    public function __construct()
    {
        parent::__construct();
    }

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
     * Get the value of fouls_id
     */
    public function getFouls_id()
    {
        return $this->fouls_id;
    }

    /**
     * Set the value of fouls_id
     *
     * @return  self
     */
    public function setFouls_id($fouls_id)
    {
        $this->fouls_id = $fouls_id;

        return $this;
    }
// Méthode d'insertion dans la bdd
    public function insertAthFouls()
    {
        $query = 'INSERT INTO ' . $this->tablename . '(`ath_id`, `fouls_id`) VALUES (:ath_id, :fouls_id)';
        $createAthleteFoulsResult = $this->db->prepare($query);
        $createAthleteFoulsResult->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        $createAthleteFoulsResult->bindValue(':fouls_id', $this->fouls_id, PDO::PARAM_INT);
        $createAthleteFoulsResult->execute();
    }
// Méthode pour lire les fautes d'un athlètes
    public function getAthSwimFouls()
    {
        $query = 'SELECT
        athf.`id`,
        athf.`ath_id`,
        athf.`fouls_id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        fouls.`label`,
        fouls.`type`,
        fouls.`points`
        FROM
        ' . $this->tablename . ' AS athf
        INNER JOIN `athletes` AS ath
        ON
            ath.id = athf.`ath_id`
        INNER JOIN `fouls` AS fouls
        ON
            fouls.`id` = athf.`fouls_id`
        WHERE
            athf.`ath_id` = :ath_id';
        $getAthFoul = $this->db->prepare($query);
        $getAthFoul->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        if ($getAthFoul->execute()) {
            $getAthFoulResult = $getAthFoul->fetchAll(PDO::FETCH_OBJ);
        }
        return $getAthFoulResult;
    }
// Méthode pour lire la dernière entrée en bdd
    public function getLastEntry()
    {
        $query = 'SELECT
        athf.`id`,
        athf.`ath_id`,
        athf.`fouls_id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        fouls.`label`,
        fouls.`type`,
        fouls.`points`
        FROM
        ' . $this->tablename . ' AS athf
        INNER JOIN `athletes` AS ath
        ON
            ath.id = athf.`ath_id`
        INNER JOIN `fouls` AS fouls
        ON
            fouls.`id` = athf.`fouls_id`
        WHERE
            athf.`ath_id` = :ath_id ORDER BY athf.`id` DESC LIMIT 1';
        $getLastEntry = $this->db->prepare($query);
        $getLastEntry->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        if ($getLastEntry->execute()) {
            $getLastEntryResult = $getLastEntry->fetch(PDO::FETCH_OBJ);
        }
        return $getLastEntryResult;
    }

    // Méthode pour supprimer la pénalité d'un athlète
    public function deleteAthFoul()
    {
        $query = 'DELETE FROM ' . $this->tablename . ' WHERE id = :id';
        $deleteAthFoul = $this->db->prepare($query);
        $deleteAthFoul->bindValue(':id', $this->id, PDO::PARAM_INT);
        $deleteAthFoul->execute();
        return $deleteAthFoul;
    }

    public function __destruct()
    {
    }
}
