"use client";
import React from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation'



export default function signOut({user}) {
  const router = useRouter();


    const removeUser = () => {
        sessionStorage.removeItem("user");
        router.push('/')    
    }
    
    return (
        <>

            <Link
                href="/signin"
                className=" py-3 px-7 text-base font-bold text-black hover:text-body-color dark:text-yellow dark:hover:text-body-color  md:block"
            >
                Hola {user.name}
            </Link>
            <div className="mb-6">
                <button onClick={removeUser} className="flex w-full items-center justify-center rounded-md bg-white px-9 py-4 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                    Cerrar sesión
                </button>
            </div>
        </>

    )
}
