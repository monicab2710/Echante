<h1 style="text-align:center;">Infraestructura - Proyecto Integrador 2</h1>

<div style="text-align:center;">
  <img src="https://cdn-icons-png.flaticon.com/512/3043/3043454.png" height="100" width="100"/>
</div>

## :rocket: Sprint 1

### **Issue #14: Diseño de la red**

![Diseño de la Red](/Infraestructura/Disenno-Red.png)

***

En el contexto de este proyecto, se ha elaborado un diseño de red y arquitectura de infraestructura basado en Amazon Web Services (**AWS**) para una aplicación de un ***Restaurante Francés***. :fork_and_knife:

El objetivo de este diseño es establecer una infraestructura escalable, segura y eficiente que admita la interacción de **Usuarios** desde *diferentes dispositivos* :computer: :iphone: a través de **Internet**. Todos los recursos a utilizar estarán encapsulados en una *región* específica.

En el centro de la arquitectura se encuentra una Virtual Private Cloud (**VPC**). La VPC proporciona un entorno aislado en la nube que permite la creación de una red virtual privada. Esta red virtual asegura que los recursos estén separados y protegidos en su propio espacio exclusivo, al mismo tiempo que puedan interactuar con los servicios y recursos necesarios para el funcionamiento de la aplicación.

La comunicación entre el FrontEnd y el BackEnd se lograría de manera efectiva gracias a la implementación de un **API Gateway**. Actuando como intermediario, el API Gateway facilita la comunicación controlada y optimizada entre los servicios del FrontEnd y las **instancias EC2** que albergarán las API's de BackEnd. Además, para garantizar la rápida y eficiente entrega del contenido estático del FrontEnd, **Amazon S3** y **Amazon CloudFront** se encargan de distribuir y almacenar en caché los archivos, mejorando la velocidad y la experiencia del usuario. Así, se garantiza una experiencia fluida y receptiva para los usuarios, sin comprometer la seguridad ni el rendimiento del sistema.
Además, para garantizar la alta disponibilidad y el rendimiento, un **Load Balancer** se encargaría de distribuir el tráfico de manera equitativa entre las instancias EC2.

El BackEnd en su totalidad se conecta a una instancia **RDS** (*MySQL*). Este enfoque centralizado garantiza la gestión eficaz de los datos y permite un acceso coherente a través de las API's. Las Bases de Datos almacenarán información vital para la aplicación, como los detalles de los usuarios, las reservas y los productos ofrecidos por el Restaurante Francés. (*Alcance del primer Sprint*).

Además de las interacciones entre el FrontEnd y el BackEnd, también se considera el alojamiento de contenido multimedia. Un *Bucket* de Amazon S3 desempeñará el papel de un repositorio para una galería de imágenes. Estas imágenes serán accesibles a través de URL's generadas por Amazon S3. Dichas URL's serán registradas en las Bases de Datos alojadas en la instancia RDS. Esto se debe a que en las diferentes Bases de Datos de las API's, habrían tablas que en sus atributos puedan incluir la URL de una imagen. De esta manera, se logra una conexión efectiva entre los recursos de almacenamiento y la lógica de la aplicación, permitiendo que las imágenes sean accedidas de manera rápida y consistente.

En conclusión, esta arquitectura en AWS destaca por su enfoque en la seguridad, la escalabilidad y la eficiencia; la sinergia entre los servicios crea una infraestructura sólida y una base confiable para el crecimiento y el éxito continuo de la aplicación, proporcionando una experiencia fluida para los usuarios. :rainbow:

> :pushpin: **Herramienta de dibujo y diagramación:**
[VisualParadigm Online](https://online.visual-paradigm.com/diagrams/features/aws-architecture-diagram-tool/)

***

## :rocket: Sprint 2

### **Issue #36: Crear infraestructura en AWS**

En este sprint, el objetivo principal fue la *creación* y *configuración* de recursos clave en Amazon Web Services (**AWS**) para respaldar las necesidades de infraestructura de nuestro proyecto; por lo que se llevaron a cabo una serie de tareas clave:

- [x] Crear EC2 para el servicio de BackEnd :desktop_computer:

Se crearon tres instancias EC2 para alojar las API's de Enchanté, con sus respectivas **Par de claves**. :closed_lock_with_key:

| Nombre                    | Tipo     | AMI                     | Dirección IPv4 Pública |
| :----:                    | :----:   | :----:                  | :----:                 |
| Enchante-API-Users        | t2.micro | Ubuntu Server 22.04 LTS | 34.229.48.113          |
| Enchante-API-Products     | t2.micro | Ubuntu Server 22.04 LTS | 3.81.126.14            |
| Enchante-API-Reservations | t2.micro | Ubuntu Server 22.04 LTS | 54.91.68.46            |

Respecto a las configuraciones de red utilizadas, dichas instancias se lanzaron en la **VPC predeterminada** para la región y la Subred fue sin preferencias; así mismo, se creo un Grupo de Seguridad "**EnchanteSecurityGroup**", el cual permite el acceso *SSH* y *TCP* para cada una de las APIs. :lock:

***Reglas de Entrada:*** :zap:

| Tipo   | Puerto | Origen    |
| :----: | :----: | :----:    |    
| TCP    | 8081   | 0.0.0.0/0 |
| TCP    | 8082   | 0.0.0.0/0 |
| TCP    | 8087   | 0.0.0.0/0 |
| SSH    | 22     | 0.0.0.0/0 |

Posteriormente, se establece conexión SSH con cada una de las instancias, y se instala **Docker Engine**, siguiendo las instrucciones de la documentación oficial de Docker.

:file_folder: <https://docs.docker.com/engine/install/ubuntu/>

- [x] Conectar a una base de datos MySQL existente :dart:

Se accede a la base de datos RDS a través de **MySQL Workbench** con las credenciales provistas por DH, y se ejecutan los scripts de las bases de datos.

* [`products`](/Base%20de%20datos/products.sql)
* [`reservations`](/Base%20de%20datos/reservation.sql)
* [`users`](/Base%20de%20datos/user.sql)

![Captura](/Infraestructura/Captura.png)

***

- [x] Crear S3 Bucket para almacenar las imágenes de Enchanté :art:

Se crea un Bucket llamado "**enchante-images**", para almacenar las diferentes imágenes de nuestra aplicación. Se establece una política en la configuración del mismo, con el fin de que sus objetos sean **accesibles públicamente**.

***Política de bucket*** :white_check_mark:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::enchante-images/*"
        }
    ]
}
```

Finalmente, se suben las imágenes necesarias, y sus URL's se añaden a la base de datos.

> **P.D.** Los recursos fueron creados en la región de EE.UU. Este (Norte de Virginia) **us-east-1** :earth_americas:

***

## :rocket: Sprint 3

En el tercer sprint de nuestro proyecto, nos centramos en el despliegue manual y la actualización de nuestros servicios en Amazon Web Services (**AWS**). Las tareas realizadas en este sprint fueron las siguientes:

### **Issue #56: Crear EC2 en AWS para el servicio de FrontEnd**

Para brindar a los usuarios un acceso eficiente a la aplicación Enchanté, hemos creado una instancia EC2 en AWS para alojar nuestro servicio de FrontEnd. Esta instancia está configurada con las especificaciones necesarias para garantizar un rendimiento óptimo. :computer:

| Nombre       | Tipo     | AMI                     | Dirección IPv4 Pública |
| :----:       | :----:   | :----:                  | :----:                 |
| Enchante-APP | t2.micro | Ubuntu Server 22.04 LTS | 35.173.255.106         |

Se instala **Docker Engine** y se agrega una nueva regla de entrada a nuestro grupo de seguridad previamente creado.

***Regla de Entrada:*** :zap:

| Tipo   | Puerto | Origen    |
| :----: | :----: | :----:    |    
| TCP    | 3000   | 0.0.0.0/0 |

### **Issue #57: Deploy en AWS**

Para llevar a cabo el despliegue de nuestra aplicación, hemos seguido un proceso minucioso que garantiza la correcta puesta en marcha de los servicios de BackEnd y FrontEnd en las instancias EC2 de AWS, haciendo uso de Docker.

> **P.D.** Tanto las API's del BackEnd como la aplicación del FrontEnd, cuentan con sus respectivos `Dockerfile` :fire:

Por otra parte, en el directorio donde se encuentran el *par de claves* para cada una de nuestras instancias EC2, se ejecuta `chmod 400 "{clave}.pem"` para limitar el acceso de dichos archivos a solo lectura.

- [x] Deploy del código en los servidores web EC2 en AWS :sunglasses:

***BackEnd:***

1. Localmente, con *Maven* se hace `clean` y `package` en cada una de las API's para generar el archivo `.jar`.
2. Se crean los repositorios correspondientes en **Docker Hub**.
3. Desde la terminal, en el directorio donde se encuentra cada `Dockerfile`, se construye cada una de las imágenes con el comando `docker build -t {nombre-imagen} .`
4. Se agrega la tag correspondiente haciendo uso del comando `docker tag {nombre-imagen} {usuario-docker-hub}/{nombre-imagen}`.
5. Se sube cada imagen a su repositorio correspondiente de **Docker Hub**, con el comando `docker push {usuario-docker-hub}/{nombre-imagen}`
6. Se establece conexión *SSH* con cada una de las instancias, a través del siguiente comando: `ssh -i {clave}.pem ubuntu@{IP}`.
7. Estando ya en cada instancia, se ejecuta el contenedor de Docker correspondiente, haciendo uso del comando `sudo docker run -d --name {nombre-contenedor} -p {puerto}:{puerto} {usuario-docker-hub}/{nombre-imagen}`

***FrontEnd:***

1. Se agrega un [`.dockerignore`](/Frontend/.dockerignore) para excluir archivos y directorios durante el proceso de construcción de la imagen Docker, para optimizar el rendimiento y almacenamiento de la misma.
2. Se crea el repositorio correspondiente en **Docker Hub**.
3. Desde la terminal, en el directorio donde se encuentra el `Dockerfile`, se construye la imagen con el comando `docker build -t {nombre-imagen} .`
4. Se agrega la tag correspondiente haciendo uso del comando `docker tag {nombre-imagen} {usuario-docker-hub}/{nombre-imagen}`.
5. Se sube la imagen a su repositorio correspondiente de **Docker Hub**, con el comando `docker push {usuario-docker-hub}/{nombre-imagen}`
6. Se establece conexión *SSH* con la instancia, a través del siguiente comando: `ssh -i {clave}.pem ubuntu@{IP}`.
7. Estando ya en la instancia, se ejecuta el contenedor de Docker correspondiente, haciendo uso del comando `sudo docker run -d --name {nombre-contenedor} -p {puerto}:{puerto} {usuario-docker-hub}/{nombre-imagen}`

> **P.D.** Este proceso es repetitivo a medida que se realicen cambios en el código de nuestro proyecto. Por lo que, cada que se realice un deploy manual, y al conectarse por *SSH* a cada instancia, con el fin de evitar conflictos, se debe detener el contenedor (`sudo docker stop {nombre-contenedor}`), eliminarlo (`sudo docker rm {nombre-contenedor}`), eliminar la imagen (`sudo docker rmi {nombre-imagen}`) y finalmente, correr nuevamente el contenedor -que contiene la última actualización de la imagen construida- (`sudo docker run -d --name {nombre-contenedor} -p {puerto}:{puerto} {usuario-docker-hub}/{nombre-imagen}`).

- [x] Actualizar tablas en la base de datos en AWS :file_folder:

Para mantener nuestros datos actualizados, hemos accedido a la instancia **RDS** de **AWS** a través MySQL Workbench y se ha ejecutado los diferentes scripts `.sql` para actualizar las tablas y relaciones correspondientes.

Con la finalización de estas tareas, hemos logrado una infraestructura completa y funcional en AWS que respalda nuestra aplicación Enchanté. :stars:

***

<div style="text-align:center;">
  <img src="https://cdn-icons-png.flaticon.com/512/4682/4682602.png" height="100" width="100"/>
</div>

&copy; 2023 **Enchanté**