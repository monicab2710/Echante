'use client'
import Image from "next/image";
import { useEffect, useContext } from "react";
import { updateUserData } from "@/services/users"
import { UserContext } from '@/app/providers';
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2';
import React, { useState } from "react"; 




const DashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard"); 

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
const MySwal = withReactContent(Swal)

  let { user, setUser } = useContext(UserContext)
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    userId: 0,
    password: "******"
  });

  const fireSuccess = () => {
    MySwal.fire({
      html: <strong>El registro se ha realizado de manera exitosa.</strong>,
      icon: 'success',
      background: "#008F95",
      color: "#EA7363",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
  }

  const fireError = () => {
    MySwal.fire({
      html: <strong>El registro se ha realizado de manera exitosa.</strong>,
      icon: 'success',
      background: "#008F95",
      color: "#EA7363",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setNewUser({
      ...newUser,
      [event.target.id]: value
    });
  }

  const updateUser = () => {
    updateUserData(newUser, fireSuccess , fireError)
  }

  useEffect(() => {
    setNewUser(user);
  }, [user]);

  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        
      </span>
      {text}
    </p>
  );

  return (
    
    <section id="hero" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="flex">
          <aside className="w-1/4 bg-gray-200 p-4">
            
            <button
              className={`block mb-4 p-2 rounded ${
                activeMenu === "profile" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleMenuClick("profile")}
            >
              Perfil
            </button>
            <button
              className={`block p-2 rounded ${
                activeMenu === "dashboard" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleMenuClick("dashboard")}
            >
              Dashboard
            </button>
          </aside>
          <main className="w-3/4 p-4">

        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4  mt-8 ">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary/[20%] bg-opacity-5 px-6 py-10 dark:bg-primary/[20%] sm:p-[60px]">

                <h1 className="mb-3 text-center text-2xl font-bold text-primary dark:text-yellow sm:text-3xl">Bienvenido a Enchantooo</h1>
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
                  <input
                    type="text"
                    id="name"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    onChange={handleChange}
                    value={(newUser && newUser.name) || ""}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="usuario" className="mb-3 block text-sm font-medium text-dark dark:text-white">Nombre de Usuario</label>
                  <input
                    type="text"
                    id="userName"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    onChange={handleChange}
                    value={(newUser && newUser.userName) || ""}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    onChange={handleChange}
                    value={(newUser && newUser.email) || ""}
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="contrasena" className="mb-3 block text-sm font-medium text-dark dark:text-white">Contraseña</label>
                  <input
                    type="password"
                    id="contrasena"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    value={(newUser && newUser.password) || "*******"}
                    readOnly
                  />
                </div>

                <button onClick={updateUser} className="flex w-full items-center justify-center rounded-md bg-white px-9 py-4 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                  Editar mis datos
                </button>
              </div>
            </div>
          </div>
        </div>
        </main>
    </div>
      </div>
    </section>
    
  );
};

export default DashboardPage;
