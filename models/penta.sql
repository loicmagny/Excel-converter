-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 03 juin 2022 à 13:16
-- Version du serveur : 10.5.8-MariaDB-log
-- Version de PHP : 8.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `penta`
--

-- --------------------------------------------------------

--
-- Structure de la table `athfouls`
--

CREATE TABLE `athfouls` (
  `id` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL,
  `fouls_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `athletes`
--

CREATE TABLE `athletes` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `club` varchar(255) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `swimTime` int(11) NOT NULL,
  `LR_handicap` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(100) NOT NULL,
  `distance` int(11) NOT NULL,
  `time` varchar(100) NOT NULL,
  `ptsPerSec` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `lr_distance` int(100) NOT NULL,
  `lr_turns` int(100) NOT NULL,
  `lr_time` varchar(100) NOT NULL,
  `lr_points` int(11) NOT NULL,
  `lr_ptsPerSec` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`cat_id`, `cat_name`, `distance`, `time`, `ptsPerSec`, `points`, `lr_distance`, `lr_turns`, `lr_time`, `lr_points`, `lr_ptsPerSec`) VALUES
(1, 'U9', 0, '0', 0, 0, 300, 2, '4 0', 500, 1),
(2, 'U11', 50, '0 45', 2, 250, 400, 2, '4 0', 500, 1),
(3, 'U13', 50, '0 45', 2, 250, 400, 3, '6 30', 500, 1),
(4, 'U15', 100, '1 20', 2, 250, 400, 4, '7 40', 500, 1),
(5, 'U17', 200, '2 30', 2, 250, 800, 3, '10 30', 500, 1),
(6, 'U19', 200, '2 30', 2, 250, 800, 4, '13 20', 500, 1),
(7, 'U22', 200, '2 30', 2, 250, 800, 4, '13 20', 500, 1),
(8, 'Senior', 200, '2 30', 2, 250, 800, 4, '13 20', 500, 1),
(9, 'Master 40+', 100, '1 20', 2, 250, 400, 4, '7 40', 500, 1),
(10, 'Master 50+', 100, '1 20', 2, 250, 400, 3, '6 30', 500, 1),
(11, 'Master 60', 50, '0 45', 2, 250, 400, 3, '6 30', 500, 1);

-- --------------------------------------------------------

--
-- Structure de la table `fouls`
--

CREATE TABLE `fouls` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `seconds` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fouls`
--

INSERT INTO `fouls` (`id`, `label`, `type`, `seconds`) VALUES
(1, 'Contrevenir aux règles d\'habillement', 2, 10),
(2, 'Modifier les dimensions des numéros de dossards', 2, 10),
(3, 'Faux départs', 2, 10),
(4, 'Ne pas placer son pistolet en sécurité sur la table pedant l\'échauffement ou la compétition', 2, 10),
(5, 'Ne pas toucher la table avec le pistolet entre chaque tir', 2, 10),
(6, 'Assistance des entraineurs à l\'échauffement hors zone autorisée', 2, 10),
(7, 'Ne pas garder le pistolet dans sa boite avant la période officielle d\'échauffement', 2, 10),
(8, 'Toucher la table avec une partie du corps', 2, 10),
(9, 'Ne pas avoir les 2 pieds au sol', 2, 10),
(10, 'Ne pas terminer le parcours', 2, 999),
(11, 'Couper volontairement ou non le parcours', 2, 999),
(12, 'Aide extérieure non autorisée', 2, 999),
(13, 'Utiliser un pistolet non contrôlé', 2, 999),
(14, 'Tirer sur une autre cible', 2, 999),
(15, 'Ne pas s\'arrêter dans la zone de pénalité à la demande d\'un officiel', 2, 999),
(16, 'Utiliser un rayon laser constant pendant la compétition ou une communication audio en dehors du temps de préparation et d\'échauffement', 2, 999),
(17, 'Mauvais passage de relais', 2, 999),
(18, 'Partir sur l\'epreuve de course avant la fin du temps réglementaire sans avoir terminé avec succès les séries de tir (avec seulement 4 lumières vertes)', 2, 999),
(19, 'Ajuster ou modifier un pistolet déjà contrôlé', 2, 999),
(20, 'Echanger un pistolet non approuvé au contrôle', 2, 999),
(21, 'Flagrant faux départ', 2, 999),
(22, 'Bousculer, gêner, faire tomber un autre athlète', 2, 999),
(23, 'Partir sur l\'epreuve de course avant la fin du temps réglementaire sans avoir terminé avec succès les séries de tir (avec seulement 3 lumières vertes)', 2, 999);

-- --------------------------------------------------------

--
-- Structure de la table `laserrun`
--

CREATE TABLE `laserrun` (
  `id` int(11) NOT NULL,
  `time` varchar(100) NOT NULL,
  `points` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL,
  `heat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `place` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `swimming`
--

CREATE TABLE `swimming` (
  `id` int(11) NOT NULL,
  `time` varchar(100) NOT NULL,
  `points` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL,
  `heat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `athfouls`
--
ALTER TABLE `athfouls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fouls_id` (`fouls_id`),
  ADD KEY `ath_id` (`ath_id`) USING BTREE;

--
-- Index pour la table `athletes`
--
ALTER TABLE `athletes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Index pour la table `fouls`
--
ALTER TABLE `fouls`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `laserrun`
--
ALTER TABLE `laserrun`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ath_id` (`ath_id`);

--
-- Index pour la table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ath_id` (`ath_id`);

--
-- Index pour la table `swimming`
--
ALTER TABLE `swimming`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `athfouls`
--
ALTER TABLE `athfouls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `athletes`
--
ALTER TABLE `athletes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `fouls`
--
ALTER TABLE `fouls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `laserrun`
--
ALTER TABLE `laserrun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `swimming`
--
ALTER TABLE `swimming`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
