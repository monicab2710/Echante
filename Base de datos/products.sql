DROP SCHEMA IF EXISTS `enchante_products`;
CREATE DATABASE  IF NOT EXISTS `enchante_products` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `enchante_products`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: enchante_products
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `url_image` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Desayuno','Empieza el día con auténticos sabores franceses. Deliciosos croissants, crêpes y tartines te esperan, acompañados de café, té y jugos frescos. Un desayuno gourmet que te transportará a las calles de París.','https://img.freepik.com/foto-gratis/cruasanes-olla-mermelada-taza-cafe-lado-mesa-gris_176420-278.jpg?w=740&t=st=1691280233~exp=1691280833~hmac=9a851ce12343537c8c2f7e7ae06c66ebc589488155533d7f389103ebc86c9949'),(2,'Almuerzo','Disfruta de recetas tradicionales en nuestro almuerzo francés. Desde la suculenta Quiche Lorraine hasta el sabroso Coq au Vin, te ofrecemos auténticos platos que deleitarán tu paladar.','https://img.freepik.com/foto-gratis/salmon-plancha-tomates-limon-setas-verduras_141793-760.jpg?w=740&t=st=1691280123~exp=1691280723~hmac=9ec58dce477bcfe025a6dec46ca52e054ebed1e45300fa9306f5492f0b477cd6'),(3,'Cena','Una experiencia gastronómica sofisticada te aguarda en nuestra cena francesa. Deléitate con el tierno Magret de Canard y el tradicional Boeuf Bourguignon, acompañados de una selecta carta de vinos. Vive una velada inolvidable al estilo francés.','https://img.freepik.com/foto-gratis/plato-quesos-copa-vino_141793-634.jpg?w=740&t=st=1691280092~exp=1691280692~hmac=01f6ed6d163e2fd26d9d27cb3c18937b51b6cc71c90e29b4e77e90105ed593f1');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `url_image` text NOT NULL,
  `price` double NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_categorie_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Baguette avec confiture','Deliciosas rebanadas de baguette fresca untada con mantequilla y mermelada.','https://img.freepik.com/foto-gratis/delicioso-desayuno-frances-vista-superior-mermelada_23-2150408526.jpg?w=1380&t=st=1691280747~exp=1691281347~hmac=5e8f98202d6bdc4cb6d2d280430501318977dba8557e3bbe4d710c3d8971984c',3.99,1),(2,'Croissant','Un delicioso pastelito de masa hojaldrada en forma de media luna, crujiente por fuera y tierno por dentro.','https://img.freepik.com/foto-gratis/delicioso-desayuno-frances-croissant_23-2150408547.jpg?w=1380&t=st=1691281096~exp=1691281696~hmac=46a2078ca93a13fedc65180511c2140f7e8cee1758c4282ae10bb37214af771a',4.99,1),(3,'Crêpes avec chocolat','Delgadas y suaves, con chocolate y mix de frutas, además de una pisca de miel para deleitarlos.','https://img.freepik.com/foto-gratis/panqueques-mermelada-fresas-crema-chocolate_141793-819.jpg?w=1380&t=st=1691281269~exp=1691281869~hmac=9f24665919bd3577ea8a06812fdc07ce37cf0d23ac0d4d4e41ce3cd7bbe5d624',5.99,1),(4,'Escargots','Caracoles de tierra cocinados en mantequilla de ajo y perejil.','https://previews.123rf.com/images/fabrikacrimea/fabrikacrimea1807/fabrikacrimea180703093/104813009-caracoles-al-horno-con-mantequilla-de-ajo-y-hierbas-frescas.jpg',9.99,2),(5,'Crêpes salé','Delgadas crêpes rellenas de ingredientes salados: jamón, queso, espinacas, champiñones, entre otros.','https://img.freepik.com/foto-gratis/cocina-frances-desayuno-almuerzo-meriendas-panqueques-huevo-escalfado-queso-feta-jamon-frito-aguacate-tomates-mesa-blanca-vista-superior_2829-19592.jpg?w=1380&t=st=1691281781~exp=1691282381~hmac=c0b71e29fb9657f2eb05dae955bafb4a42c357bd5eafef470282392ebcd7417f',8.99,2),(6,'Béarnaise de filet mignon','Imperdible medallón de lomo con salsa blanca y mix de verduras.','https://img.freepik.com/premium-photo/grilled-beef-fillet-with-bearnaise-sauce_650366-365.jpg?w=1380',9.99,2),(7,'Magret de Canard','Pechuga de pato asada con pimientos, verdeo y mix de hierbas.','https://img.freepik.com/foto-gratis/pechuga-pollo-frita-verduras_140725-4649.jpg?w=740&t=st=1691282082~exp=1691282682~hmac=5e6be320c5806dadb279152bf482d173e9314dde5856e795e7610ebd34cec085',9.99,3),(8,'Soupe de poisson','Una variante de la bouillabaisse que es una sopa de pescado típica de la región de Marsella.','https://img.freepik.com/foto-gratis/sopa-mariscos-acidos-o-tom-yum-seafood_1339-4120.jpg?w=1380&t=st=1691282287~exp=1691282887~hmac=95d0048216dd865422b446a4e2dbc4cafe50361e701af7623d99606a7e671feb',8.99,3),(9,'Tartiflette','Un plato alpino que combina papas, cebolla, tocino y queso reblochon, horneado hasta que el queso se derrita.','https://imag.bonviveur.com/tartiflette-patatas-con-queso-a-la-francesa.webp',8.99,3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-07 22:18:07
