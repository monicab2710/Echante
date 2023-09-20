"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/providers";
import { useContext } from "react";

export default function SignOut({ currentUser }) {
  const router = useRouter();

  let { user, setUser } = useContext(UserContext);
  const removeUser = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    router.push("/");
    setUser(null);
  };
  return (
    <>
      <p className="mr-2 p-4 py-3 text-base font-bold text-black dark:text-body-color dark:text-yellow md:mr-0 md:p-4 lg:hidden">
        ¡Hola {user.name}!
      </p>
      <p className="hidden p-4 py-3 text-base font-bold text-black dark:text-body-color dark:text-yellow lg:block">
        ¡Hola {user.name} {user.lastName}!
      </p>
      <div className="mx-9 md:mx-2 lg:mx-4">
        <button
          onClick={removeUser}
          className="mx-2 flex w-full items-center justify-center rounded-md bg-white px-6 py-2 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp md:px-2"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
