<?php

class athlete extends database
{
    private $id = 0;
    public $first_name = '';
    public $last_name = '';
    private $club = '';
    private $gender = 0;
    private $cat_id = 0;
    private $type_id = 0;
    private $swimTime = 0;
    private $LR_handicap = '';
    private $tablename = 'athletes';

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
     * Get the value of first_name
     */
    public function getFirst_name()
    {
        return $this->first_name;
    }

    /**
     * Set the value of first_name
     *
     * @return  self
     */
    public function setFirst_name($first_name)
    {
        $this->first_name = $first_name;

        return $this;
    }

    /**
     * Get the value of club
     */
    public function getClub()
    {
        return $this->club;
    }

    /**
     * Set the value of club
     *
     * @return  self
     */
    public function setClub($club)
    {
        $this->club = $club;

        return $this;
    }

    /**
     * Get the value of last_name
     */
    public function getLast_name()
    {
        return $this->last_name;
    }

    /**
     * Set the value of last_name
     *
     * @return  self
     */
    public function setLast_name($last_name)
    {
        $this->last_name = $last_name;

        return $this;
    }

    /**
     * Get the value of gender
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set the value of gender
     *
     * @return  self
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
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
     * Get the value of type_id
     */
    public function getType_id()
    {
        return $this->type_id;
    }

    /**
     * Set the value of type_id
     *
     * @return  self
     */
    public function setType_id($type_id)
    {
        $this->type_id = $type_id;

        return $this;
    }

    /**
     * Get the value of swimTime
     */
    public function getSwimTime()
    {
        return $this->swimTime;
    }

    /**
     * Set the value of swimTime
     *
     * @return  self
     */
    public function setSwimTime($swimTime)
    {
        $this->swimTime = $swimTime;

        return $this;
    }

    /**
     * Get the value of LR_handicap
     */
    public function getLR_handicap()
    {
        return $this->LR_handicap;
    }

    /**
     * Set the value of LR_handicap
     *
     * @return  self
     */
    public function setLR_handicap($LR_handicap)
    {
        $this->LR_handicap = $LR_handicap;

        return $this;
    }
// Méthode pour récupérer unathlète à partir de son id
    public function getSingleAthlete()
    {
        $query = 'SELECT `id`, `first_name`, `last_name`, `club`, `gender`, `cat_id`, `type_id`, `swimTime`, `LR_handicap` FROM ' . $this->tablename . ' WHERE id = :id';
        $singleAth = $this->db->prepare($query);
        $singleAth->bindValue(':id', $this->id, PDO::PARAM_INT);
        if ($singleAth->execute()) {
            $singleAthResult = $singleAth->fetch(PDO::FETCH_ASSOC);
        }
        return $singleAthResult;
    }
// Méthode pour enregistrer un athlète en bdd
    public function createAthlete()
    {
        $query = 'INSERT INTO ' . $this->tablename . '(
            `first_name`,
            `last_name`,
            `club`,
            `gender`,
            `type_id`,
            `cat_id`,
            `swimTime`,
            `LR_handicap`
        )
        VALUES(
        :first_name,
        :last_name,
        :club,
        :gender,
        :type_id,
        :cat_id,
        :swimTime,
        :LR_handicap)';
        $createAthlete = $this->db->prepare($query);
        $createAthlete->bindValue(':first_name', $this->first_name, PDO::PARAM_STR);
        $createAthlete->bindValue(':last_name', $this->last_name, PDO::PARAM_STR);
        $createAthlete->bindValue(':club', $this->club, PDO::PARAM_STR);
        $createAthlete->bindValue(':gender', $this->gender, PDO::PARAM_INT);
        $createAthlete->bindValue(':type_id', $this->type_id, PDO::PARAM_INT);
        $createAthlete->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $createAthlete->bindValue(':swimTime', $this->swimTime, PDO::PARAM_INT);
        $createAthlete->bindValue(':LR_handicap', $this->LR_handicap, PDO::PARAM_STR);
        return $createAthlete->execute();
    }
// Méthode pour récupérer la totalité des athlètes
    public function getAllAthletes()
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id` ORDER BY ath.`type_id` ASC, ath.`last_name` ASC';
        $getAllAthletes = $this->db->query($query);
        if (is_object($getAllAthletes)) {
            $athleteList = $getAllAthletes->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athleteList;
    }
    // Méthode pour récupérer l'ensemble des athlètes en fonction d'un champ trié de manière ascendante
    public function getAllAthletesSortedAsc($field)
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id` ORDER BY ath.`' . $field . '` ASC';
        $getAllAthletes = $this->db->query($query);
        if (is_object($getAllAthletes)) {
            $athleteList = $getAllAthletes->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athleteList;
    }
// IDem mais de manière descendante
    public function getAllAthletesSortedDesc($field)
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id` ORDER BY ath.`' . $field . '` DESC';
        $getAllAthletes = $this->db->query($query);
        if (is_object($getAllAthletes)) {
            $athleteList = $getAllAthletes->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athleteList;
    }
// Méthode pour séléctionner un athlète dans une catégorie
    public function selectAthInCat()
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`cat_id` = :cat_id';
        $athInCat = $this->db->prepare($query);
        $athInCat->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        if ($athInCat->execute()) {
            $athInCatResult = $athInCat->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athInCatResult;
    }
    // Méthode pour séléctionner un athlète selon son sexe
    public function selectAthBySex()
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`gender` = :gender';
        $athBySex = $this->db->prepare($query);
        $athBySex->bindValue(':gender', $this->gender, PDO::PARAM_INT);
        if ($athBySex->execute()) {
            $athBySexResult = $athBySex->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athBySexResult;
    }
    // Méthode pour séléctionner un athlète selon le type de compétition auquel il participe
    public function selectAthByType()
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`type_id` = :type_id';
        $athByType = $this->db->prepare($query);
        $athByType->bindValue(':type_id', $this->type_id, PDO::PARAM_INT);
        if ($athByType->execute()) {
            $athByTypeResult = $athByType->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athByTypeResult;
    }
    // Méthode permettant de chercher dans la bdd
    public function searchForAth()
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`last_name` = :last_name OR ath.`first_name` = :first_name OR ath.`club` = :club';
        $searchAth = $this->db->prepare($query);
        $searchAth->bindValue(':last_name', $this->last_name, PDO::PARAM_STR);
        $searchAth->bindValue(':first_name', $this->first_name, PDO::PARAM_STR);
        $searchAth->bindValue(':club', $this->club, PDO::PARAM_STR);
        if ($searchAth->execute()) {
            $searchAthResult = $searchAth->fetchAll(PDO::FETCH_ASSOC);
        }
        return $searchAthResult;
    }
    // Méthode pour récupérer l'handicap start d'un athlète
    public function getHandicapTime()
    {
        $query = 'SELECT `LR_handicap` FROM ' . $this->tablename . ' WHERE id = :id';
        $handicapResult = $this->db->prepare($query);
        $handicapResult->bindValue(':id', $this->id, PDO::PARAM_INT);
        if ($handicapResult->execute()) {
            $handicapResultList = $handicapResult->fetch(PDO::FETCH_OBJ);
        }
        return $handicapResultList;
    }
// Méthode pour récupérer les détails de la catégorie d'un athlète
    public function getAthCatDetailsById($id)
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`,
        `categories`.`time`,
        `categories`.`ptsPerSec`,
        `categories`.`points`,
        `categories`.`lr_points`,
        `categories`.`lr_time`,
        `categories`.`lr_distance`,
        `categories`.`lr_ptsPerSec`
        FROM
        ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE
        id = ' . $id . '';
        $getCatDetails = $this->db->query($query);
        if (is_object($getCatDetails)) {
            $catDetails = $getCatDetails->fetch(PDO::FETCH_ASSOC);
        }
        return $catDetails;
    }
// Methode pour récupérer toutes les filles séparées dans leurs catégories respectives
    public function getGirlsCat($dist)
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`gender` = 0 AND `categories`.`distance` = ' . $dist . ' AND ath.`type_id` = 1';
        $getGirlsCat = $this->db->query($query);
        if (is_object($getGirlsCat)) {
            $girlList = $getGirlsCat->fetchAll(PDO::FETCH_ASSOC);
        }
        return $girlList;
    }
// Idem mais pour les garçons
    public function getBoysCat($dist)
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`gender` = 1 AND `categories`.`distance` = ' . $dist . ' AND ath.`type_id` = 1';
        $getBoysCat = $this->db->query($query);
        if (is_object($getBoysCat)) {
            $boyList = $getBoysCat->fetchAll(PDO::FETCH_ASSOC);
        }
        return $boyList;
    }
// Méthode pour récupérer les résultats totaux d'un athlète
    public function getAthResults()
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`gender`,
        ath.`lr_handicap`,
        swi.`id`,
        swi.`time` AS swimTime,
        swi.`points` + lr.`points` AS points,
        swi.`points` as swimPts,
        lr.`points` as LRPts,
        swi.`heat`,
        swi.`fouls_id`,
        lr.`id`,
        lr.`time` AS lrTime,
        lr.`arrival`,
        lr.`heat`,
        lr.`fouls_id`,
        `categories`.`cat_name`
        FROM
        ' . $this->tablename . ' AS ath
        INNER JOIN `swimming` AS swi
        ON
            ath.`id` = swi.`ath_id`
        INNER JOIN `laserrun` AS lr
        ON
            ath.`id` = lr.`ath_id`
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE
        ath.`gender` = :gender AND ath.`cat_id` = :cat_id';
        $athResult = $this->db->prepare($query);
        $athResult->bindValue(':gender', $this->gender, PDO::PARAM_INT);
        $athResult->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        if ($athResult->execute()) {
            $athResultList = $athResult->fetchAll(PDO::FETCH_OBJ);
        }
        return $athResultList;
    }
// Méthode pour récupérer les athlètes inscrit pour le Laser Run
    public function getTheRestofAth()
    {
        $query = 'SELECT
        `id`,
        `first_name`,
        `last_name`,
        `club`,
        `gender`,
        `cat_id`,
        `type_id`,
        `swimTime`,
        `LR_handicap`
        FROM
        `athletes`
        WHERE
        `type_id` = 2 AND gender = :gender';
        $restOfAth = $this->db->prepare($query);
        $restOfAth->bindValue(':gender', $this->gender, PDO::PARAM_INT);
        if ($restOfAth->execute()) {
            $restOfAthList = $restOfAth->fetchAll(PDO::FETCH_OBJ);
        }
        return $restOfAthList;
    }
// Méthode pour vérifier si l'athlète existe
    public function checkIfAth()
    {
        $query = 'SELECT
        COUNT(1)
        FROM
        ' . $this->tablename . '';
        $athOrNot = $this->db->query($query);
        if (is_object($athOrNot)) {
            $athOrNotResult = $athOrNot->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athOrNotResult;
    }
// Méthode pour mettre à jour le prénom d'un athlète
    public function updateFirstName()
    {
        $query = 'UPDATE
        ' . $this->tablename . '
        SET
            `first_name`= :first_name
            WHERE id = :id';
        $updateFirstName = $this->db->prepare($query);
        $updateFirstName->bindValue(':id', $this->id, PDO::PARAM_INT);
        $updateFirstName->bindValue(':first_name', $this->first_name, PDO::PARAM_STR);
        return $updateFirstName->execute();
    }
// Méthode pour mettre à jour le nom de famille d'un athlète
    public function updateLastName()
    {
        $query = 'UPDATE
        ' . $this->tablename . '
        SET
            `last_name`= :last_name
            WHERE id = :id';
        $updateLastName = $this->db->prepare($query);
        $updateLastName->bindValue(':id', $this->id, PDO::PARAM_INT);
        $updateLastName->bindValue(':last_name', $this->last_name, PDO::PARAM_STR);
        return $updateLastName->execute();
    }
// Méthode pour mettre à jour le club d'un athlète
    public function updateClub()
    {
        $query = 'UPDATE
        ' . $this->tablename . '
        SET
            `club`= :club
            WHERE id = :id';
        $updateClub = $this->db->prepare($query);
        $updateClub->bindValue(':id', $this->id, PDO::PARAM_INT);
        $updateClub->bindValue(':club', $this->club, PDO::PARAM_STR);
        return $updateClub->execute();
    }
// Méthode pour mettre à jour le sexe d'un athlète
    public function updateGender()
    {
        $query = 'UPDATE
        ' . $this->tablename . '
        SET
            `gender`= :gender
            WHERE id = :id';
        $updateGender = $this->db->prepare($query);
        $updateGender->bindValue(':id', $this->id, PDO::PARAM_INT);
        $updateGender->bindValue(':gender', $this->gender, PDO::PARAM_INT);
        return $updateGender->execute();
    }
// Méthode pour mettre à jour le type de compétition auquel l'athlète s'est inscrit
    public function updateType()
    {
        $query = 'UPDATE
        ' . $this->tablename . '
        SET
            `type_id`= :type_id
            WHERE id = :id';
        $updateType = $this->db->prepare($query);
        $updateType->bindValue(':id', $this->id, PDO::PARAM_INT);
        $updateType->bindValue(':type_id', $this->type_id, PDO::PARAM_INT);
        return $updateType->execute();
    }
// Méthode pour mettre à jour la catégorie d'un athlète
    public function updateCategory()
    {
        $query = 'UPDATE
        ' . $this->tablename . '
        SET
            `cat_id`= :cat_id
            WHERE id = :id';
        $updateCategory = $this->db->prepare($query);
        $updateCategory->bindValue(':id', $this->id, PDO::PARAM_INT);
        $updateCategory->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        return $updateCategory->execute();
    }
// Méthode pour mettre à jour le temps d'engagement d'un athlète
    public function updateSwimTime()
    {
        $query = 'UPDATE
        ' . $this->tablename . '
        SET
            `swimTime`= :swimTime
            WHERE id = :id';
        $updateSwimTime = $this->db->prepare($query);
        $updateSwimTime->bindValue(':id', $this->id, PDO::PARAM_INT);
        $updateSwimTime->bindValue(':swimTime', $this->swimTime, PDO::PARAM_INT);
        return $updateSwimTime->execute();
    }
// Méthode pour mettre à jour le handicap start d'un athlète
    public function updateAthHandicapTime()
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `LR_handicap`= :LR_handicap WHERE id= :id';
        $updateHandicapTime = $this->db->prepare($query);
        $updateHandicapTime->bindValue(':id', $this->id, PDO::PARAM_INT);
        $updateHandicapTime->bindValue(':LR_handicap', $this->LR_handicap, PDO::PARAM_STR);
        return $updateHandicapTime->execute();
    }
// Méthode pour supprimer un athlète
    public function removeAth()
    {
        $query = 'DELETE FROM ' . $this->tablename . ' WHERE id = :id';
        $updateHandicapTime = $this->db->prepare($query);
        $updateHandicapTime->bindValue(':id', $this->id, PDO::PARAM_INT);
        return $updateHandicapTime->execute();
    }

    public function __destruct()
    {
    }
}
