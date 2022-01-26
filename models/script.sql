-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2021 at 11:44 AM
-- Server version: 10.5.8-MariaDB-log
-- PHP Version: 7.2.19
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
CREATE DATABASE penta;
USE penta;
--
-- Database: `penta`
--
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
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



  --
  -- Table structure for table `fouls`
  --
  CREATE TABLE `fouls` (
    `id` int(11) NOT NULL,
    `label` varchar(255) NOT NULL,
    `type` int(11) NOT NULL,
    `points` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
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
  `heat` int(11) NOT NULL,
  `fouls_id` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
--
-- Table structure for table `results`
--
CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `place` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
--
-- Table structure for table `swimming`
--
CREATE TABLE `swimming` (
  `id` int(11) NOT NULL,
  `time` varchar(100) NOT NULL,
  `points` int(11) NOT NULL,
  `ath_id` int(11) NOT NULL,
  `heat` int(11) NOT NULL,
  `fouls` varchar(100) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
--
-- Indexes for dumped tables
--
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
  ADD KEY `ath_id` (`ath_id`),
  ADD KEY `fouls_id` (`fouls_id`);
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
ADD PRIMARY KEY (`id`),
  ADD KEY `ath_id` (`ath_id`),
  ADD KEY `fouls_id` (`fouls_id`);
--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `athletes`
--
ALTER TABLE `athletes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 32;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fouls`
--
ALTER TABLE `fouls`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `laserrun`
--
ALTER TABLE `laserrun`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `swimming`
--
ALTER TABLE `swimming`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--
--
-- Constraints for table `athletes`
--
ALTER TABLE `athletes`
ADD CONSTRAINT `athletes_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`cat_id`);
--
-- Constraints for table `laserrun`
--
ALTER TABLE `laserrun`
ADD CONSTRAINT `laserrun_ibfk_1` FOREIGN KEY (`ath_id`) REFERENCES `athletes` (`id`),
  ADD CONSTRAINT `laserrun_ibfk_2` FOREIGN KEY (`fouls_id`) REFERENCES `fouls` (`id`);
--
-- Constraints for table `results`
--
ALTER TABLE `results`
ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`ath_id`) REFERENCES `athletes` (`id`);
--
-- Constraints for table `swimming`
--
ALTER TABLE `swimming`
ADD CONSTRAINT `swimming_ibfk_1` FOREIGN KEY (`ath_id`) REFERENCES `athletes` (`id`),
  ADD CONSTRAINT `swimming_ibfk_2` FOREIGN KEY (`fouls_id`) REFERENCES `fouls` (`id`);
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;