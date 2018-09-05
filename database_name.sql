-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: teama
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` mediumtext,
  `owner` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job_owner_idx` (`owner`),
  CONSTRAINT `fk_job_owner` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Estorar espinha','Vou fazer o procedimento X',17),(2,'Teste de tarefa','Primeiro teste fei em rede local de tarefa',12);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_job`
--

DROP TABLE IF EXISTS `user_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_job` (
  `user_id` int(10) DEFAULT NULL,
  `job_id` int(10) unsigned NOT NULL,
  KEY `fk_user_job_idx` (`job_id`),
  KEY `fk_job_user_idx` (`user_id`),
  CONSTRAINT `fk_job_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_job`
--

LOCK TABLES `user_job` WRITE;
/*!40000 ALTER TABLE `user_job` DISABLE KEYS */;
INSERT INTO `user_job` VALUES (17,1),(12,2);
/*!40000 ALTER TABLE `user_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rank` int(11) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`,`createdAt`,`username`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'Thamyres Kemer','jandrey','lucas@jandrey.me','dad3654df2f2470807f4c1e63ba1daa9880d42cf','2018-07-24 01:44:01','2018-07-24 01:44:01',1,NULL),(12,'Lucas Jandrey','luacks','wdev.lucas@gmail.com','dad3654df2f2470807f4c1e63ba1daa9880d42cf','2018-07-24 01:50:27','2018-07-24 01:50:27',1,NULL),(14,NULL,'jandreey','teste@teste.com','6552ec9555b409aa9bb17d8987b5c03cc573672e','2018-07-24 16:15:42','2018-07-24 16:15:42',1,NULL),(17,NULL,'thamyres','thamyres@teste.com','2e6f9b0d5885b6010f9167787445617f553a735f','2018-07-24 23:24:57','2018-07-24 23:24:57',1,NULL),(18,NULL,'asdsdasdasdasda','asdasdasdasd','99baee504a1fe91a07bc66b6900bd39874191889','2018-09-05 00:00:22','2018-09-05 00:00:22',1,NULL),(19,NULL,'fsdasda','dsadadsasd','9cec6682b11f2ded3a8322bfad3b3dc95fffca24','2018-09-05 00:13:53','2018-09-05 00:13:53',1,NULL),(20,NULL,'asdasdasdas','dasdasdas','69c8597d5e079efe633dcd30d5f6091110e005ca','2018-09-05 00:17:48','2018-09-05 00:17:48',1,NULL),(21,NULL,'sadasdasdasdasd','asdasdasda','947dbd612c1ffb2efccc0d2390e1210dffb817d9','2018-09-05 00:18:27','2018-09-05 00:18:27',1,NULL),(22,NULL,'sadasdasd','asdasdasdasda','dea37395c42f20363c8778226995b632269ce7d6','2018-09-05 00:19:21','2018-09-05 00:19:21',1,NULL),(25,NULL,'sdfsdfs','dfsdfsdfs','b0ad0657b0f27063f550397b2ffb4629bff496f9','2018-09-05 00:19:50','2018-09-05 00:19:50',1,NULL),(26,NULL,'asdsdadasd','asdasdasd','00ea1da4192a2030f9ae023de3b3143ed647bbab','2018-09-05 00:23:20','2018-09-05 00:23:20',1,NULL),(31,NULL,'sadasdasdasa','asdasdasdadsasd','b263a7df8ed761390d22ac0864db693d109f9d1a','2018-09-05 00:25:38','2018-09-05 00:25:38',1,NULL),(34,NULL,'saasdasddsdsasd','sdadasdasd','f4b5dcac10a55fb0bd45b5506ccc878c6d75d691','2018-09-05 00:26:50','2018-09-05 00:26:50',1,NULL),(36,NULL,'asdasdasdasda','sdasdasda','947dbd612c1ffb2efccc0d2390e1210dffb817d9','2018-09-05 00:32:01','2018-09-05 00:32:01',1,NULL),(37,NULL,'dfsdfsdfs','dfsdfsfss','f87916c576b2618f4524f27f9da9cda1c7048ea7','2018-09-05 00:33:14','2018-09-05 00:33:14',1,NULL),(40,NULL,'dfsdfsdfsf','dfsdfsfssf','f87916c576b2618f4524f27f9da9cda1c7048ea7','2018-09-05 00:35:27','2018-09-05 00:35:27',1,NULL),(41,NULL,'asdasda','sdasdasd','ea0223057491530d0f6dc5e19f1ab16081fc6767','2018-09-05 00:36:33','2018-09-05 00:36:33',1,NULL),(48,NULL,'asdasdasadasd','sdasdasdasdasd','ea0223057491530d0f6dc5e19f1ab16081fc6767','2018-09-05 00:36:49','2018-09-05 00:36:49',1,NULL),(49,NULL,'asdasdasadasdddd','sdasdasdasdasdsdddd','ea0223057491530d0f6dc5e19f1ab16081fc6767','2018-09-05 00:36:52','2018-09-05 00:36:52',1,NULL),(54,NULL,'sadasdssda','sdasdadasdas','5313ed37916265d4c7ce45736ff8951a1bb97825','2018-09-05 00:52:37','2018-09-05 00:52:37',1,NULL),(55,NULL,'asdasdasd','saasdsaas','f8c9ff51b828fadeeb85771da1790f904be440cb','2018-09-05 00:53:10','2018-09-05 00:53:10',1,NULL),(58,NULL,'sadasdsddd','asdasdaasda','ce4c40b5f75a364236331cc6d6fcb6d96deabd2d','2018-09-05 00:57:32','2018-09-05 00:57:32',1,NULL),(59,NULL,'LucasJandrey','asdasdasdasddasasd','a7b1489a3e5243335f7b1010f868ce54a930913f','2018-09-05 00:58:24','2018-09-05 00:58:24',1,NULL),(60,NULL,'sdsdadsdsadd','lucasjandrey','5a8f70e725742ee64204353e700778b29f81b988','2018-09-05 00:59:10','2018-09-05 00:59:10',1,NULL),(62,NULL,'oaskcoaskcasok','sadddsads','845e008307e9e20cb848c71814096c2ab58f87da','2018-09-05 01:00:39','2018-09-05 01:00:39',1,NULL),(64,NULL,'asddasdasd','asdasdasdaa','7e340d7fdf6981249711280bb4b707d5ae622a80','2018-09-05 01:02:40','2018-09-05 01:02:40',1,NULL),(66,NULL,'ascassacascc','ascascascasca','e20c59d13cc9090c37d6d4ab6b70f19ff75cc820','2018-09-05 01:03:33','2018-09-05 01:03:33',1,NULL),(70,NULL,'asockaosckaso','erbeqrbebqq','f90e8571fe70ad8cb08e246e3f1d66ee51a293a9','2018-09-05 01:05:53','2018-09-05 01:05:53',1,NULL),(72,NULL,'sopkcoakcoaskcoscosack','1231231312','dcdb6256f5bead61e399945cb0f643105e5a5653','2018-09-05 01:06:29','2018-09-05 01:06:29',1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-04 22:27:38
