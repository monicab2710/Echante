"use client";
import React from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/providers';
import { useContext } from 'react';



export default function signOut({currentUser}) {
  const router = useRouter();
  console.log('currentUser', currentUser)

  let { user, setUser } = useContext(UserContext)
  const userObj = currentUser !== null ? JSON.parse(user) : {}
    const removeUser = () => {
        sessionStorage.removeItem("user");
        router.push('/')    
        setUser(null);
    }
    
    return (
        <>

            <p
                className=" py-3 px-7 text-base font-bold text-black dark:text-yellow dark:hover:text-body-color  md:block"
            >
                !Hola! {userObj.name} {userObj.lastName}
            </p>
            <div className="mb-6">
                <button onClick={removeUser} className="flex w-full items-center justify-center rounded-md bg-white px-9 py-4 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                    Cerrar sesión
                </button>
            </div>
        </>

    )
}
