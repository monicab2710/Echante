# Infraestructura - Proyecto Integrador 2

## Sprint 1

### **Issue #14: Diseño de la red**

![Diseño de la Red](/Infraestructura/Disenno-Red.png)

***

En el contexto de este proyecto, se ha elaborado un diseño de red y arquitectura de infraestructura basado en Amazon Web Services (**AWS**) para una aplicación de un ***Restaurante Francés***. :fork_and_knife:

El objetivo de este diseño es establecer una infraestructura escalable, segura y eficiente que admita la interacción de **Usuarios** desde *diferentes dispositivos* a través de **Internet**. Todos los recursos a utilizar estarán encapsulados en una *región* específica.

En el centro de la arquitectura se encuentra una Virtual Private Cloud (**VPC**). La VPC proporciona un entorno aislado en la nube que permite la creación de una red virtual privada. Esta red virtual asegura que los recursos estén separados y protegidos en su propio espacio exclusivo, al mismo tiempo que puedan interactuar con los servicios y recursos necesarios para el funcionamiento de la aplicación.

La comunicación entre el FrontEnd y el BackEnd se lograría de manera efectiva gracias a la implementación de un **API Gateway**. Actuando como intermediario, el API Gateway facilita la comunicación controlada y optimizada entre los servicios del FrontEnd y las **instancias EC2** que albergarán las API's de BackEnd. Además, para garantizar la rápida y eficiente entrega del contenido estático del FrontEnd, **Amazon S3** y **Amazon CloudFront** se encargan de distribuir y almacenar en caché los archivos, mejorando la velocidad y la experiencia del usuario. Así, se garantiza una experiencia fluida y receptiva para los usuarios, sin comprometer la seguridad ni el rendimiento del sistema.
Además, para garantizar la alta disponibilidad y el rendimiento, un **Load Balancer** se encargaría de distribuir el tráfico de manera equitativa entre las instancias EC2.

El BackEnd en su totalidad se conecta a una instancia **RDS** (*MySQL*). Este enfoque centralizado garantiza la gestión eficaz de los datos y permite un acceso coherente a través de las API's. Las Bases de Datos almacenarán información vital para la aplicación, como los detalles de los usuarios, las reservas y los productos ofrecidos por el Restaurante Francés. (*Alcance del primer Sprint*).

Además de las interacciones entre el FrontEnd y el BackEnd, también se considera el alojamiento de contenido multimedia. Un *Bucket* de Amazon S3 desempeñará el papel de un repositorio para una galería de imágenes. Estas imágenes serán accesibles a través de URL's generadas por Amazon S3. Dichas URL's serán registradas en las Bases de Datos alojadas en la instancia RDS. Esto se debe a que en las diferentes Bases de Datos de las API's, habrían tablas que en sus atributos puedan incluir la URL de una imagen. De esta manera, se logra una conexión efectiva entre los recursos de almacenamiento y la lógica de la aplicación, permitiendo que las imágenes sean accedidas de manera rápida y consistente.

En conclusión, esta arquitectura en AWS destaca por su enfoque en la seguridad, la escalabilidad y la eficiencia; la sinergia entre los servicios crea una infraestructura sólida y una base confiable para el crecimiento y el éxito continuo de la aplicación, proporcionando una experiencia fluida para los usuarios.

> :pushpin: **Herramienta de dibujo y diagramación:**
[VisualParadigm Online](https://online.visual-paradigm.com/diagrams/features/aws-architecture-diagram-tool/)

***

&copy; 2023 **Enchanté**