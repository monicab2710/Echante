"use client";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosHelper from "@/app/helper/axiosHelper";
import { log } from "console";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";


const alertPassword = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  background: "#008F95",
  color: "#EA7363",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const validationSchema = Yup.object({
  /* name: Yup.string().required("Campo requerido"),
  lastname: Yup.string().required("apellido por favor"),
  username: Yup.string().required("Campo reuqerido"),
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("Campo requerido"), */
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Campo requerido"),
  confirmpassword: Yup.string()
    .min(6, "La contraseña debe tener los mismos caracteres")
    .required("Campo requerido")
    .oneOf([Yup.ref("password"), null], "la contraseña no coincide"),

})

export const passwordReset = async (values) => {
  const query = window.location.search;
  console.log(query);
  const urlParams = new URLSearchParams(query);
  const token = urlParams.get('token');
  console.log(token);
  try {
    const response = await axiosHelper.post(`/api/v1/users/auth/reset-password`,

      {
        token: token,
        password: values.password,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    if (response.status === 200) {
      alertPassword.fire(
        {
          icon:"success",
          title: "La contraseña se cambio con exito"
        }
      )
    } else if (response.status === 400) {
      alertPassword.fire(
        {
          icon:"warning",
          title: "Lo sentimos no pudimos actualizar tu contraseña"
        }
      )
    }
  }

  catch (error) {
    console.error('Error petición POST', error);
    alertPassword.fire(
      {
        icon:"warning",
        title: "No se pudo cambiar la contraseña"
      }
    )
    
  }

};


/* const handleSubmit = async (values, actions) => {
  // aqui se enviaran los datos al servidor o se guardaran en la base de datos
  alert("¡La recuperación de la contraseña se llevo con éxito!");
  // setSubmitting(false);
  actions.resetForm();
}; */

const RevPassword = () => {
  
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary/[20%] bg-opacity-5 py-10 px-6 dark:bg-primary/[20%] sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-yellow sm:text-3xl">
                  Recuperar Tú Contraseña
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Enchanté
                </p>

                <div className="mb-8 flex items-center justify-center">

                </div>


                <Formik
                  initialValues={{
                    password: "",
                    confirmpassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={passwordReset}
                >
                  {({ isSubmitting }) => (
                    <Form>


                      <div className="mb-8">
                        <label
                          htmlFor="password"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {" "}
                          Coloca tú nueva contraseña{" "}
                        </label>
                        <Field
                          type="password"
                          name="password"
                          
                          placeholder="Tú nueva contraseña"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-dark focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="mb-8">
                        <label
                          htmlFor="password"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {" "}
                          Confirma tú nueva contraseña{" "}
                        </label>
                        <Field
                          type="password"
                          name="confirmpassword"
                          id="confirmpassword"
                          placeholder="Confirma tú nueva contraseña"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-dark focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="confirmpassword"
                          component="small"
                          className="text-red-500 text-sm"
                        />
                      </div>


                      <div className="mb-6">

                        <button disabled={isSubmitting} type="submit"
                          className="flex w-full items-center justify-center rounded-md bg-white py-4 px-9 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                        >
                          Enviar
                        </button>

                      </div>
                    </Form>
                  )}
                </Formik>

              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1C0736" />
                <stop offset="1" stopColor="#1C0736" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1C0736" />
                <stop offset="1" stopColor="#1C0736" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default RevPassword;
