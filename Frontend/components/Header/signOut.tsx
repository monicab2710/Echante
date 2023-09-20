"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/providers';
import { useContext } from 'react';



export default function SignOut({ currentUser }) {
    const router = useRouter();

    let { user, setUser } = useContext(UserContext)
    const removeUser = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        router.push('/')
        setUser(null);
    }
    return (
        <>

<p className="py-3 mr-2 md:mr-0 md:p-4 p-4 text-base font-bold text-black dark:text-yellow dark:text-body-color lg:hidden">
  ¡Hola {user.name}!
</p>
<p className="py-3 p-4 text-base font-bold text-black dark:text-yellow dark:text-body-color hidden lg:block">
  ¡Hola {user.name} {user.lastName}!
</p>
            <div className="mx-9 lg:mx-4 md:mx-2">
                <button onClick={removeUser} className="flex w-full items-center justify-center rounded-md bg-white mx-2 md:px-2 py-2 px-6 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                    Cerrar sesión
                </button>
            </div>
        </>

    )
}
