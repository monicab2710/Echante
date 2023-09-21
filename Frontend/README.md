 
<h1 style="text-align:center;"># Front End - Proyecto Integrador 2</h1>

Enchanté<br>

## Sprint 1

En el apartado de frontend desarrollamos la presentación para el usuario de la siguiente manera:<br>


### **Issue #1: Implementar template general responsive**

En el desarrollo de este sprint el grupo encargado de desarrollar se centró en el diseño responsive en celular,tablet y pc, para ello se crea la siguiente secuencia: <br> 

Primeros pasos con la aplicación Create React <br>
Este proyecto se inició con Create React App .

Guiones disponibles <br>
En el directorio del proyecto, puede ejecutar:<br>
npm run dev

Ejecuta la aplicación en el modo de desarrollo. <br>
Abra http://localhost:3000 para verlo en su navegador.<br>
La página se volverá a cargar cuando realice cambios.<br>

Documentación:<br>
https://es.legacy.reactjs.org/docs/getting-started.html<br>

Se agregaron dependencias como: <br>

Next.js<br>
Instalación manual<br>
Para crear manualmente una nueva aplicación Next.js, instale los paquetes necesarios:<br>
npm install next@latest react@latest react-dom@latest<br>
Paquete.json<br>
{<br>
  "scripts": {<br>
    "dev": "next dev",<br>
    "build": "next build",<br>
    "start": "next start",<br>
    "lint": "next lint"<br>
  }<br>
}<br>
<br>
Documentación:<br>
https://nextjs.org/docs/getting-started/installation<br>

TailwindCss<br>
Instalación manual<br>
Para crear manualmente una nueva aplicación TailwindCss, instale los paquetes necesarios:<br>
npm install -D tailwindcss<br>
npx tailwindcss init<br>
Configura tus rutas de plantilla <br>
Agregue las rutas a todos sus archivos de plantilla en su tailwind.config.jsarchivo.<br>
/** @type {import('tailwindcss').Config} */<br>
module.exports = {<br>
  content: ["./src/**/*.{html,js}"],<br>
  theme: {<br>
    extend: {},<br>
  },<br>
  plugins: [],<br>
}<br>

Documentación :<br>
https://tailwindcss.com/docs/installation<br>

Node.js<br>
Instalación Automática<br><br>
Documentación:<br>
https://nodejs.org/es/docs<br>


Se crea la página de inicio <br>
![Alt text](image.png)<br>

### **Issue #5: Implementar el template de Registro**

Se crea el formulario de registro<br>
![Alt text](image-2.png)<br>

### **Issue #10: Implementar el template de Reserva**

Se crea la página de reserva <br>
![Alt text](image-1.png)<br>

### **Issue #15: **Modo oscuro**

Como funcionalidad extra se le agrega la posibilidad al usuario de visualizar la página en modo oscuro o en modo normal,<br>
con un botón de luna en la parte superior derecha de la pantalla. <br>
![Alt text](image-4.png)<br>

### **Issue #16: **Implementar el template de Login**

Se crea el inicio de sesión <br>
![Alt text](image-3.png)<br>



## Sprint 2

### **Issue #17: **Añadir nuevos elementos al Footer**

Se agregan el apartado de nosotros, menú el cual se puede visualizar en otra página, informacion de contacto, horario del restaurante <br>
![Alt text](image-5.png) <br>

### **Issue #25: **Implementar la integración con la API de Reservas**

Se hacae la integración para el renderizar el contenido de las reservas.  <br>


### **Issue #26: **Implementar la integración con la API de Productos**

Se hacae la integración para el renderizar el contenido de los productos. <br>

### **Issue #28: **Implementar la integración con la API de Usuarios**

Se hacae la integración para el renderizar el perfil de usuarios. <br>

### **Issue #29: **Implementar el template de "Mi Perfil"**

El perfil del usuario se implementa con los datos personales y la fotografia generica <br>

![Alt text](image-6.png) <br>

### **Issue #38: **Agregar página "Nosotros"**

En el footer se agrega el enlace para la página nosotros

![Alt text](image-7.png) <br>

### **Issue #39: **Agregar botón "Menú" en el Footer**

En el footer se agrega el enlace para una siguiente página con el menú en pdf para visualaizar o descargar si asi lo desea el usuario <br>

![Alt text](image-8.png) <br>

## Sprint 3

### **Issue #41: **Crear template HTML tipo email para la recuperación de contraseña**

Con el fin de proporcionar a los usuarios una experiencia coherente y profesional durante el proceso de recuperación de contraseña, es necesario crear un template HTML para los correos electrónicos de recuperación de contraseña. Este template debe ser diseñado tanto para ser visualmente atractivo como para brindar las instrucciones necesarias para que los usuarios puedan restablecer su contraseña de manera segura.<br>

### **Issue #42: **Crear modal para la función "¿Olvidaste tu contraseña?" en la página de inicio de sesión**

El modal será la ventana emergente que se mostrará cuando los usuarios hagan clic en la opción "¿Olvidaste tu contraseña?".<br>

![Alt text](image-9.png)<br>

### **Issue #43: **Conectar modal "¿Olvidaste tu contraseña?" con la API de Usuarios**

Implementar la lógica necesaria para que al ingresar una dirección de correo electrónico y hacer clic en el botón de envío, se inicie el proceso de recuperación de contraseña en la API de Usuarios.<br>

### **Issue #44: **Crear formulario de restablecimiento de contraseña**

Este formulario permitirá a los usuarios ingresar y confirmar su nueva contraseña después de haber iniciado el proceso de recuperación. <br>

![Alt text](image-10.png)

### **Issue #45: **Conectar formulario de restablecimiento de contraseña con la API de Usuarios**

Implementar la lógica necesaria para enviar los datos del formulario a la API, incluyendo la nueva contraseña y cualquier token de seguridad asociado. <br>

### **Issue #47: **Cargar datos del usuario en la página de "Mi Perfil"**



### **Issue #54: **Agregar sección tipo Dashboard a la página de "Mi Perfil"**

## Sprint 4

### **Issue #64: **Agregar funcionalidad al botón "Editar mis datos"**
### **Issue #65: **Agregar sección de "Reporte" para usuario Administrador**
### **Issue #66: **Agregar funcionalidad al botón "Exportar"**
### **Issue #74: **Implementar página de "Términos y condiciones"**
### **Issue #75: **Implementar página de "Política de Privacidad"**


### **Issue #: ****

