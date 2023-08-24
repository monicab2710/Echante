import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { Brand } from '../../types/brand';


const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const ProfilePage = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="hero" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4  mt-8 ">
              

             

             
                <div className="mx-auto max-w-[500px] rounded-md bg-primary/[20%] bg-opacity-5 px-6 py-10 dark:bg-primary/[20%] sm:p-[60px]">

                <h1 className="mb-3 text-center text-2xl font-bold text-primary dark:text-yellow sm:text-3xl">Bienvenido a Enchanté</h1>
             <br />
                <div
               
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0 "
                data-wow-delay=".2s"
              >
                <Image
                  src="/usuario/PerfilFinal.png"
                  alt="Usuario"
                  fill
                  
                  className="mx-auto max-w-full lg:mr-0 rounded-full  w-full h-full object-cover shadow-md"
                />
                
              </div>
              <br />
              <br />
                    <h2 className="mb-3 text-center text-2xl font-bold text-primary dark:text-yellow sm:text-3xl">Perfil de Usuario</h2>
                
                    <div className="mb-4">
                      <label htmlFor="nombre" className="mb-3 block text-sm font-medium text-dark dark:text-white">Nombre y Apellido</label>
                      <p className="mb-3 block text-sm font-medium text-dark dark:text-white" id="nombre">Andres Felipe Fajardo Parra</p>
                    </div>
                
                    <div className="mb-4">
                      <label htmlFor="usuario" className="mb-3 block text-sm font-medium text-dark dark:text-white">Nombre de Usuario</label>
                      <p className="mb-3 block text-sm font-medium text-dark dark:text-white" id="usuario">pipe</p>
                    </div>
                
                    <div className="mb-4">
                      <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">Email</label>
                      <p className="mb-3 block text-sm font-medium text-dark dark:text-white" id="email">pipeparra@gmail.com</p>
                    </div>
                
                    <div className="mb-8">
                      <label htmlFor="contrasena" className="mb-3 block text-sm font-medium text-dark dark:text-white">Contraseña</label>
                      <p className="mb-3 block text-sm font-medium text-dark dark:text-white" id="contrasena">********</p>
                    </div>
                
                    <button className="flex w-full items-center justify-center rounded-md bg-white px-9 py-4 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      Editar mis datos
                    </button>
           

             
               
            
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ProfilePage;
