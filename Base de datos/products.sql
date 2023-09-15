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
  `image_url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Entrada','Explora nuestras irresistibles entradas que dan inicio a una experiencia culinaria francesa inolvidable. Desde un delicio Soufflé de queso hasta unos frescos Calamares. Cada bocado te acerca a la esencia de la cocina francesa.','https://enchante-images.s3.amazonaws.com/categories/category-1.jpg'),(2,'Plato Principal','Nuestros platillos principales son un viaje a través de los sabores auténticos de Francia. Cada plato es una obra maestra cuidadosamente elaborada para cautivar tus sentidos.','https://enchante-images.s3.amazonaws.com/categories/cat2.jpg'),(3,'Postre','Culmina tu experiencia con nuestros postres que son auténticas obras de arte dulce. Delicadas Crêpes, exquisitas Tartaletas y el irresistible Fondant de chocolate te transportarán al corazón de la pastelería francesa en cada bocado.','https://enchante-images.s3.amazonaws.com/categories/category-3.jpg'),(4,'Bebida','Nuestra selección de bebidas es el compañero perfecto para cada momento en nuestro restaurante francés. Desde el refinado vino tinto que realza los sabores de tus platos, hasta los cócteles inspirados en Francia que elevan la experiencia, cada sorbo es un brindis a la autenticidad culinaria.','https://enchante-images.s3.amazonaws.com/categories/category-4.jpg');
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
  `image_url` text NOT NULL,
  `price` double NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_category_idx` (`category_id`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Bouchées d\'Amour','Mini vol-au-vent rellenos de queso Brie y frutos rojos.','https://enchante-images.s3.amazonaws.com/products/product-1.jpeg',5500,1),(2,'Douceur de l\'Artichaut','Corazones de alcachofa asados con aceite de trufa y parmesano.','https://enchante-images.s3.amazonaws.com/products/product-2.jpg',5690,1),(3,'Soufflé Céleste','Ligero soufflé de queso Gruyère y hierbas provenzales.','https://enchante-images.s3.amazonaws.com/products/product-3.jpg',5300,1),(4,'Rêves de Mer','Ostras frescas servidas sobre hielo con mignonette de chalote y vino blanco.','https://enchante-images.s3.amazonaws.com/products/product-4.jpeg',5000,1),(5,'Petits-Serpents Enchantés','Rollitos de salmón ahumado rellenos de queso crema, aguacate y eneldo.','https://enchante-images.s3.amazonaws.com/products/product-5.jpg',6100,1),(6,'Volcan d\'Épices','Camarones salteados en una mezcla de especias exóticas y hierbas aromáticas.','https://enchante-images.s3.amazonaws.com/products/product-6.jpg',5899,1),(7,'Quiche d\'amour','Una deliciosa tarta salada hecha con huevos, rellena de tomate y queso, todo en una base de masa exquisita.','https://enchante-images.s3.amazonaws.com/products/product-7.jpg',9300,2),(8,'Filete Étoile Brillante','Jugoso filete de res a la plancha con salsa de vino tinto y verduras asadas.','https://enchante-images.s3.amazonaws.com/products/product-8.jpg',10000,2),(9,'Risotto romantique','Risotto cremoso con champignones, rúcula, tomates y queso Parmesano.','https://enchante-images.s3.amazonaws.com/products/product-9.jpg',9000,2),(10,'Amoureux de ratatouille','Ratatouille de verduras asadas con hierbas provenzales y aceite de oliva.','https://enchante-images.s3.amazonaws.com/products/product-10.jpg',9500,2),(11,'Magie des fruits de mer','Mezcla de mariscos en salsa de champagne y azafrán, sobre nido de fideos.','https://enchante-images.s3.amazonaws.com/products/product-11.jpg',10200,2),(12,'Étreinte de Poularde','Pechuga de pollo rellena de espinacas, queso Brie y champignones, en salsa de estragón.','https://enchante-images.s3.amazonaws.com/products/product-12.jpg',9250,2),(13,'Crème Brûlée Étoilée','Crème brûlée con un toque de extracto de vainilla y caramelo dorado.','https://enchante-images.s3.amazonaws.com/products/product-13.jpg',3950,3),(14,'Soufflé de Passion','Soufflé de chocolate oscuro con corazón de frutas de la pasión.','https://enchante-images.s3.amazonaws.com/products/product-14.jpg',3900,3),(15,'Tartelette de Rêve','Tartaleta de frutas mixtas frescas sobre una base de masa crujiente.','https://enchante-images.s3.amazonaws.com/products/product-15.jpg',3850,3),(16,'Mille-Feuille Enchanté','Capas de hojaldre, crema de vainilla y frutas silvestres, con glaseado.','https://enchante-images.s3.amazonaws.com/products/product-16.jpg',4300,3),(17,'Fondant Mystique','Fondant de chocolate caliente con centro líquido y salsa de frambuesa.','https://enchante-images.s3.amazonaws.com/products/product-17.jpg',4000,3),(18,'Crêpes de L\'Amour','Crêpes rellenas de fresas frescas y crema chantilly, espolvoreadas con azúcar glasé.','https://enchante-images.s3.amazonaws.com/products/product-18.jpg',3890,3),(19,'Vins maison','Selección de vinos tintos y blancos de la región francesa, perfectos para compartir.','https://enchante-images.s3.amazonaws.com/products/product-19.jpg',13000,4),(20,'Potion d\'Amour','Cóctel de frutas mixtas con vodka, jugo de arándano y un toque de jengibre.','https://enchante-images.s3.amazonaws.com/products/product-20.jpg',4000,4),(21,'Café Romantique','Café expreso doble con un toque de licor de avellanas, coronado con crema batida.','https://enchante-images.s3.amazonaws.com/products/product-21.jpg',1100,4),(22,'Infusion Magique','Infusión de hierbas provenzales con toques de lavanda y miel.','https://enchante-images.s3.amazonaws.com/products/product-22.jpg',980,4),(23,'Eau de la Source','Agua mineral natural o con gas, servida con rodajas de limón y menta.','https://enchante-images.s3.amazonaws.com/products/product-23.jpg',800,4),(24,'Chocolat Chaud Mystique','Chocolate caliente con un toque de canela y crema batida.','https://enchante-images.s3.amazonaws.com/products/product-24.jpg',1200,4);
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

-- Dump completed on 2023-09-14 21:12:30
