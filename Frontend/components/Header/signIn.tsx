import React from 'react'
import Link from "next/link";

export default function signIn() {
    return (
        <>

            <Link
                href="/signin"
                className=" py-3 px-7 text-base font-bold text-black hover:text-body-color dark:text-yellow dark:hover:text-body-color  md:block"
            >
                Ingresar
            </Link>
            <Link
                href="/signup"
                className="ease-in-up hidden rounded-md bg-white py-3 px-8 text-base font-bold text-primary transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
            >
                Registrarse
            </Link>
        </>

    )
}
