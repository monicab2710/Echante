"use client";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { updateUserData } from "@/services/users";
import { UserContext } from "@/app/providers";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const [activeMenu, setActiveMenu] = useState("profile");
  const router = useRouter();
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);

    if (menu === "dashboard") {
      router.push("/dashboard");
    }
  };
  const MySwal = withReactContent(Swal);

  let { user, setUser } = useContext(UserContext);
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    userId: 0,
    password: "******",
  });

  const fireSuccess = () => {
    MySwal.fire({
      html: <strong>Tus cambios han sido cambiados de manera exitosa.</strong>,
      icon: "success",
      background: "#008F95",
      color: "#EA7363",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
  };

  const fireError = () => {
    MySwal.fire({
      html: <strong> Ups vuelve a intentarlo,tus cambios no se guardaron.</strong>,
      icon: "error",
      background: "#008F95",
      color: "#EA7363",
      showConfirmButton: false,
      timerProgressBar: true,
      timer:3000,
    });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setNewUser({
      ...newUser,
      [event.target.id]: value,
    });
  };

  const updateUser = () => {
    updateUserData(newUser, fireSuccess, fireError);
  };

  useEffect(() => {
    setNewUser(user);
  }, [user]);

  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary"></span>
      {text}
    </p>
  );

  return (
    <section id="hero" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="color flex border border-primary bg-primary/5">
          <aside className="w-1/4 bg-primary py-4 ">
            <button
              className={`mb-4 block w-full rounded p-2 text-left ${activeMenu === "profile" ? " bg-yellow/20 text-yellow" : ""
                }`}
              onClick={() => handleMenuClick("profile")}
            >
              Perfil
            </button>
            <Link
              href="/dashboard"
              className={`mb-4 block w-full rounded p-2 ${activeMenu === "dashboard"
                  ? "bg-yellow/20 text-black"
                  : "bg-dark/10 text-left text-yellow"
                }`}
            >
              Mis reservas
            </Link>
          </aside>
          <main className="w-3/4 p-4">
            <div className=" pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
              <div className="-mx-4 flex flex-wrap items-center">
                <div className="mt-8 w-full  px-4 ">
                  <div className="mx-auto max-w-[500px] rounded-md bg-primary/[20%] bg-opacity-5 px-6 py-10 dark:bg-primary/[20%] sm:p-[60px]">
                    <h1 className="mb-3 text-center text-2xl font-bold text-primary dark:text-yellow sm:text-3xl">
                      Bienvenido a Enchanté
                    </h1>
                    <br />
                    <div
                      className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                      data-wow-delay=".2s"
                    >
                      <Image
                        src="/usuario/PerfilFinal.png"
                        alt="Usuario"
                        fill
                        className="xl:h-20 xl:w-20 max-w-full rounded-full object-cover shadow-md md:h-40 md:w-40 lg:mr-0"
                      />
                    </div>

                    <h2 className="mb-5 pt-7 text-center text-lg font-regular text-primary dark:text-yellow sm:text-3xl">
                      Perfil de Usuario
                    </h2>
                    <div className="mb-4">
                      <label
                        htmlFor="nombre"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Nombre y Apellido
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:text-yellow dark:placeholder-yellow/[70%] dark:shadow-signUp"
                        onChange={handleChange}
                        value={(newUser && newUser.name) || ""}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="Apellido"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:text-yellow dark:placeholder-yellow/[70%] dark:shadow-signUp"
                        onChange={handleChange}
                        value={(newUser && newUser.lastName) || ""}
                      />
                    </div>



                    <div className="mb-4">
                      <label
                        htmlFor="usuario"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Nombre de Usuario
                      </label>
                      <input
                        type="text"
                        id="userName"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:text-yellow dark:placeholder-yellow/[70%] dark:shadow-signUp"
                        onChange={handleChange}
                        value={(newUser && newUser.userName) || ""}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:text-yellow dark:placeholder-yellow/[70%] dark:shadow-signUp"
                        onChange={handleChange}
                        value={(newUser && newUser.email) || ""}
                      />
                    </div>

                    <div className="mb-8">
                      <label
                        htmlFor="contrasena"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="contrasena"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:text-yellow dark:placeholder-yellow/[70%] dark:shadow-signUp"
                        value={(newUser && newUser.password) || "*******"}
                        readOnly
                      />
                    </div>

                    <button
                      onClick={updateUser}
                      className="flex w-full items-center justify-center rounded-md bg-white px-9 py-4 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    >
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

export default ProfilePage;
