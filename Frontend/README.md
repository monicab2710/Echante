 
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



## Sprint 3

