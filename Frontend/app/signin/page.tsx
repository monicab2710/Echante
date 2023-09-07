"use client";
import Link from "next/link";
import axiosHelper from "../helper/axiosHelper";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2';
import { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation'
import jwt_decode from "jwt-decode";
import { UserContext } from "../providers";
import { decoded } from '@/app/helper/global'

interface DecodedData {
  name: string;
  lastName: string;
  email: string;
  userId: number;
}

const SigninPage = () => {

  const MySwal = withReactContent(Swal)
  const Toast = Swal.mixin({
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

  const [showPassword, setPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setPassword(!showPassword)
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const validation = Yup.object({
    email: Yup.string()
      .email("Ingresa un email valido")
      .required("Este campo es requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Este campo es requerido"),
  });

  const initialValues = {
    name: '',
    userName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: ''
  };

  let { setUser } = useContext(UserContext)

  const [responseMessage, setResponseMessage] = useState('');

  const saveUser = async (values) => {

    try {
      const res = await axiosHelper.post(
        "/api/v1/users/auth/signin",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      if (res.status === 200) {
        router.push('/')
        const bearerToken = res.data.token
        const token = bearerToken.split(" ")[1]
        sessionStorage.setItem('token', token);
        const profile = decoded(token);
        const userStorage = JSON.stringify(profile)
        sessionStorage.setItem('user', userStorage);
        setUser(profile);
        Toast.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso.'
        });
      }
    }
    catch (error) {
      if (error.response.status === 400) {
        MySwal.fire({
          html: <strong>El correo electrónico ingresado no se encuentra registrado.</strong>,
          icon: 'error',
        });
      } else {
        MySwal.fire({
          html: <strong>Usuario o contraseña inválidos</strong>,
          icon: 'warning',
        });
        console.error("Contraseña incorrecta: ", error);
      }
    }
  };

  useEffect(() => {
    document.title = `Iniciar Sesion`;
  }, []);

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary/[20%] bg-opacity-5 px-6 py-10 dark:bg-primary/[20%] sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-primary dark:text-yellow sm:text-3xl">
                  Iniciar sesión
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  {/* Inicia sesión para reservar. */}
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validation}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={(values) => {
                    saveUser(values);
                    setIsLoggedIn(true)
                  }}
                >
                  {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Correo electrónico
                        </label>

                        <Field
                          type="email"
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Ingresa tu Email"
                          className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black dark:text-yellow placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:placeholder-yellow/[70%] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="password"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Contraseña
                          </label>
                        <div className="flex relative">
                          <Field
                            type={showPassword ? "text" : "password"}
                            id='password'
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Ingresa tu contraseña"
                            className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black dark:text-yellow placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:placeholder-yellow/[70%] dark:shadow-signUp"
                          />
                          <div className="cursor-pointer flex translate-y-[38%] translate-x-[-175%]" onClick={togglePasswordVisibility}>
                          
                            {showPassword ? (
                              <span className="text-gray-500" role="img" aria-label="Hide-password">
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                  <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                  </g>
                                </svg>
                                
                              </span>
                            ) : (
                              <span className="text-gray-500" role="img" aria-label="Show-password">
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                              </span>
                            )}
                          
                          </div>
                        </div>
                        
                        <ErrorMessage
                          name="password"
                          id="password"
                          component="small"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="mb-8 flex flex-col justify-center sm:flex-row sm:items-center">
                        {/* <div className="mb-4 sm:mb-0">
                          <label
                            htmlFor="checkboxLabel"
                            className="flex cursor-pointer items-center text-sm font-medium text-body-color"
                          >
                            <div className="relative">
                              <Field
                                type="checkbox"
                                id="checkboxLabel"
                                className="sr-only"
                                value={showPassword}
                                onChange={() => setPassword(!showPassword)}
                              />
                              <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                                <span className="opacity-0">
                                  <svg
                                    width="11"
                                    height="8"
                                    viewBox="0 0 11 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                      className="stroke-width-[0.4] fill-[#0D263B] stroke-[#0D263B] dark:fill-[#EA7363] dark:stroke-[#EA7363]"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </div>
                            Mantener mi sesión
                          </label>
                        </div> */}
                        <div>
                          <a
                            href="#0"
                            className="text-sm font-medium text-primary dark:text-white hover:underline"
                          >
                            ¿Olvidaste tu contraseña?
                          </a>
                        </div>
                      </div>
                      <div className="mb-6">
                        <button type="submit" className="flex w-full items-center justify-center rounded-md bg-white px-9 py-4 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                          Iniciar sesión
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <p className="text-center text-base font-medium text-body-color">
                  ¿No tienes una cuenta? &nbsp;
                  <Link href="/signup" className="text-primary dark:text-white hover:underline">
                    Registrarse
                  </Link>
                </p>
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
      </section >
    </>
  );
};

export default SigninPage;