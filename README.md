# Equipo 02



Primeros pasos con la aplicación Create React <br>
Este proyecto se inició con Create React App .

Guiones disponibles <br>
En el directorio del proyecto, puede ejecutar:<br>
npm run dev

Ejecuta la aplicación en el modo de desarrollo. <br>
Abra http://localhost:3000 para verlo en su navegador.<br>
La página se volverá a cargar cuando realice cambios.<br>

Documentación:<br>
https://es.legacy.reactjs.org/docs/getting-started.html<br><br>

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
https://nextjs.org/docs/getting-started/installation<br><br>

TailwindCss<br>
Instalación manual<br>
Para crear manualmente una nueva aplicación TailwindCss, instale los paquetes necesarios:<br>
npm install -D tailwindcss<br>
npx tailwindcss init<br>
<br><br>
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
<br>
Documentación :<br>
https://tailwindcss.com/docs/installation<br>
<br><br>
Node.js<br>
Instalación Automática<br><br>
Documentación:<br>
https://nodejs.org/es/docs<br>
<br><br><br>

Enchanté<br><br>

Desarrollo Frontend:<br> 
En el apartado de frontend desarrollamos la presetnación para el usuario de la siguiente manera:<br><br> 

SPRINT 1:<br>
En el desarrollo de este sprint el grupo encargado de desarrollar se centró en el diseño responsive en celular,<br>
tablet y pc, para ello se crea la siguiente secuencia: <br> <br>

Se crea la página de inicio <br>
![Alt text](image.png)<br><br>
Se crea la página de reserva <br>
![Alt text](image-1.png)<br>
Se crea el formulario de registro<br>
![Alt text](image-2.png)<br>
Se crea el inicio de sesión <br>
![Alt text](image-3.png)<br>
<br>
Como funcionalidad extra se le agrega la posibilidad al usuario de visualizar la página en modo oscuro o en modo normal,<br>
con un botón de luna en la parte superior derecha de la pantalla. <br>
![Alt text](image-4.png)<br>
