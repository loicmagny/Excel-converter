-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 26, 2022 at 12:30 PM
-- Server version: 10.5.8-MariaDB-log
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `penta`
--

-- --------------------------------------------------------

--
-- Table structure for table `athfouls`
--

CREATE TABLE `athfouls` (
  `id` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL,
  `fouls_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `athfouls`
--

INSERT INTO `athfouls` (`id`, `ath_id`, `fouls_id`) VALUES
(7, 1, 1),
(8, 2, 2),
(13, 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `athletes`
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

--
-- Dumping data for table `athletes`
--

INSERT INTO `athletes` (`id`, `first_name`, `last_name`, `club`, `gender`, `cat_id`, `type_id`, `swimTime`, `LR_handicap`) VALUES
(1, 'Julien', 'Quint', 'Noyon Pm', 1, 2, 1, 0, ''),
(2, 'Enzo', 'Esteves', 'Noyon Pm', 1, 2, 1, 0, ''),
(3, 'Yannis', 'Fournier Da Cunha', 'Noyon Pm', 1, 2, 1, 0, ''),
(4, 'Aaron', 'Mvuezolo', 'Noyon Pm', 1, 2, 1, 0, ''),
(5, 'Mouna', 'Lemlih', 'Noyon Pm', 0, 2, 1, 0, ''),
(6, 'Vadim', 'Sauvadet', 'RMA', 1, 1, 1, 30, ''),
(7, 'Gr&eacute;goire', 'Caille', 'Beauvais', 1, 2, 1, 0, ''),
(8, 'Gabriel', 'Caille', 'Beauvais', 1, 3, 1, 86, ''),
(9, 'Solina', 'Legrand', 'Noyon Pm', 0, 3, 1, 83, ''),
(10, 'Gautier', 'Jedrzejewski', 'Noyon Pm', 1, 3, 1, 72, ''),
(11, 'Elsa', 'Miljevic', 'Noyon Pm', 0, 3, 1, 79, ''),
(12, 'Floryane', 'Emporio', 'Noyon Pm', 0, 3, 1, 100, ''),
(13, 'Medhi', 'Legrand', 'NPM', 1, 7, 2, 0, ''),
(14, 'Val&eacute;rie', 'Loisel', 'RMA', 0, 9, 1, 110, ''),
(15, 'Jeremy', 'Quint', 'Decouverte', 1, 4, 1, 0, ''),
(16, 'Jocelyn', 'Laporte', 'Ribeauville', 1, 9, 1, 64, ''),
(17, 'Natalia', 'Sauvadet', 'RMA', 0, 8, 1, 80, ''),
(18, 'Maxime', 'Jebar', 'Us Metro', 1, 7, 1, 0, ''),
(19, 'Thomas', 'Lecomte', 'Beauvais', 1, 5, 1, 230, ''),
(20, 'Margaux', 'Ladant', 'Beauvais', 0, 4, 1, 225, ''),
(21, 'Pierre', 'De Cloetd ', 'Beauvais', 1, 4, 1, 225, ''),
(22, 'Alexandre', 'Quint', 'Découverte', 1, 7, 1, 0, ''),
(23, 'Fran&ccedil;ois', 'Minnaert', 'RMA', 1, 7, 1, 170, ''),
(24, 'Thibaut', 'Dufour ', 'Beauvais', 1, 5, 1, 165, ''),
(25, 'Valentin', 'Grezanle', 'Narbonne', 1, 7, 1, 124, ''),
(26, 'Nastia', 'Sauvadet', 'RMA', 0, 4, 1, 150, ''),
(27, 'Margaux', 'Hamoui', 'RMA', 0, 7, 1, 180, ''),
(28, 'Louann', 'Leparc', 'RMA', 1, 7, 2, 0, ''),
(29, 'Xavier', 'Dennery', 'RMA', 1, 9, 2, 0, ''),
(30, 'Valentino', 'Palmieri', 'Neuilly', 1, 7, 2, 0, ''),
(31, 'Edern', 'Pollet Bourdaloue', 'RMA', 0, 4, 2, 0, ''),
(32, 'Diane', 'Tchissambou', 'NPM', 1, 4, 2, 0, ''),
(33, 'Astrid', 'Soulas', 'RMA', 0, 5, 2, 0, ''),
(34, 'Sybille', 'Bellorgey', 'RMA', 0, 4, 2, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
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
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cat_id`, `cat_name`, `distance`, `time`, `ptsPerSec`, `points`, `lr_distance`, `lr_turns`, `lr_time`, `lr_points`, `lr_ptsPerSec`) VALUES
(1, 'U11', 50, '0 45', 2, 250, 400, 2, '4 0', 500, 1),
(2, 'U13', 50, '0 45', 2, 250, 400, 3, '6 30', 500, 1),
(3, 'U15', 100, '1 20', 2, 250, 400, 4, '7 40', 500, 1),
(4, 'U17', 200, '2 30', 2, 250, 800, 3, '10 30', 500, 1),
(5, 'U19', 200, '2 30', 2, 250, 800, 4, '13 20', 500, 1),
(6, 'U22', 200, '2 30', 2, 250, 800, 4, '13 20', 500, 1),
(7, 'Senior', 200, '2 30', 2, 250, 800, 4, '13 20', 500, 1),
(8, 'Master 40+', 100, '1 20', 2, 250, 400, 4, '7 40', 500, 1),
(9, 'Master 50+', 100, '1 20', 2, 250, 400, 3, '6 30', 500, 1),
(10, 'Master 60', 50, '0 45', 2, 250, 400, 3, '6 30', 500, 1);

-- --------------------------------------------------------

--
-- Table structure for table `fouls`
--

CREATE TABLE `fouls` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fouls`
--

INSERT INTO `fouls` (`id`, `label`, `type`, `points`) VALUES
(1, 'Faux départ', 0, -25),
(2, 'Sortie du bassin', 1, -50),
(3, 'Mauvais contact du pistolet', 2, -75);

-- --------------------------------------------------------

--
-- Table structure for table `laserrun`
--

CREATE TABLE `laserrun` (
  `id` int(11) NOT NULL,
  `time` varchar(100) NOT NULL,
  `points` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL,
  `arrival` int(11) NOT NULL,
  `heat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `place` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `swimming`
--

CREATE TABLE `swimming` (
  `id` int(11) NOT NULL,
  `time` varchar(100) NOT NULL,
  `points` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL,
  `heat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `swimming`
--

INSERT INTO `swimming` (`id`, `time`, `points`, `ath_id`, `heat`) VALUES
(1, '42', 256, 6, 6),
(2, '40', 235, 1, 1),
(3, '38', 214, 2, 2),
(4, '80', 180, 3, 3),
(5, '85', 170, 4, 4),
(6, '90', 160, 7, 7),
(7, '80', 225, 8, 8),
(8, '85', 240, 10, 10),
(9, '90', 230, 16, 16),
(10, '140', 270, 15, 15),
(11, '145', 260, 21, 21),
(12, '150', 250, 19, 19),
(13, '155', 240, 24, 24),
(14, '130', 290, 18, 18),
(15, '135', 280, 22, 22),
(16, '140', 270, 23, 23),
(17, '145', 260, 25, 25),
(18, '45', 250, 6, 6),
(19, '40', 235, 1, 1),
(20, '30', 230, 2, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `athfouls`
--
ALTER TABLE `athfouls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fouls_id` (`fouls_id`),
  ADD KEY `ath_id` (`ath_id`) USING BTREE;

--
-- Indexes for table `athletes`
--
ALTER TABLE `athletes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `fouls`
--
ALTER TABLE `fouls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laserrun`
--
ALTER TABLE `laserrun`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ath_id` (`ath_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ath_id` (`ath_id`);

--
-- Indexes for table `swimming`
--
ALTER TABLE `swimming`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `athfouls`
--
ALTER TABLE `athfouls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `athletes`
--
ALTER TABLE `athletes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `fouls`
--
ALTER TABLE `fouls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `swimming`
--
ALTER TABLE `swimming`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
