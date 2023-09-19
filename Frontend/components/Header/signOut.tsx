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

            <p
                className=" py-3 px-7 text-base font-bold text-black dark:text-yellow dark:hover:text-body-color  md:block"
            >

                ¡Hola! {user.name} {user.lastName}

            </p>
            <div className="mb-4 mb-md-0">
                <button onClick={removeUser} className="py-3 px-7 text-base font-bold text-black dark:text-yellow dark:hover:text-body-color  md:block">
                    Cerrar sesión
                </button>
            </div>
        </>

    )
}
