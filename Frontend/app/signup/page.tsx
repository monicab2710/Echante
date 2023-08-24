"use client";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosHelper from "../helper/axiosHelper";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2';
import { useRouter } from "next/router";

import { useState } from "react";
const validationSchema = Yup.object({
  name: Yup.string().required("Campo requerido")
  .max(20, "tu nombre no deberia tener mas de 20 caracteres")
  .matches(/^[a-zA-Z]+$/, "tu nombre no puede contener números"),
  lastName: Yup.string().required("apellido por favor")
  .max(20, "tu apellido no deberia tener mas de 20 caracteres")
  .matches(/^[a-zA-Z]+$/, "tu apellido no puede contener números"),
  userName: Yup.string().required("Campo requerido")
  .max(20, "tu usuario no deberia tener mas de 20 caracteres"),
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("Campo requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(10, "tu contraseña no debe tener mas de 10 caracteres")
    .matches(/\d/, "La contraseña debe contener al menos un dígito")
    .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .matches(/[@#$%^&*()_+!¡¿?~-]/, "La contraseña debe contener al menos un carácter especial")
    .required("Campo requerido"),
  confirmpassword: Yup.string()
    .min(6, "La contraseña debe tener los mismos caracteres")
    .required("Campo requerido")
    .oneOf([Yup.ref("password"), null], "la contraseña no coincide"),
})

const MySwal = withReactContent(Swal)
const SignupPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (values, actions) => {
   const router = useRouter()
    try {
      const response = await axiosHelper.post('/api/v1/users/auth/signup', {
        name: values.name,
        userName: values.userName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        router.push("/signin");
        setIsRegistered(true);
        MySwal.fire({
          html: <strong>El registro se ha realizado de manera exitosa.</strong>,
          icon: 'success',
          background: "#008F95",
          color: "#EA7363",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        //
      } else {
        console.log('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        html: (
          <strong>
            Lamentablemente no ha podido registrarse. Por favor intente más tarde.
          </strong>
        ),
        icon: 'warning',
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary/[20%] bg-opacity-5 py-10 px-6 dark:bg-primary/[20%] sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-yellow sm:text-3xl">
                  Crea tu cuenta
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  "¡Hazlo en segundos!"
                </p>

                <div className="mb-8 flex items-center justify-center">

                </div>
                <Formik
                  initialValues={formData}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form >
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {" "}
                          Nombre{" "}
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"

                          placeholder="Tu nombre"

                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-dark focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="name"
                          id="name"
                          component="small"
                          className="text-red-500 "
                        />
                      </div>
                      <div className="mb-8">
                        <label
                          htmlFor="userName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {" "}
                          Usuario{" "}
                        </label>
                        <Field
                          type="text"
                          id="userName"
                          name="userName"

                          placeholder=" Tu usuario"

                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-dark focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="userName"
                          id="userName"
                          component="small"
                          className="text-red-500 "
                        />
                      </div>

                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {" "}
                          Apellido{" "}
                        </label>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"

                          placeholder="Escribe tu apellido"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-dark focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="name"
                          id="lastName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {" "}
                          Email{" "}
                        </label>
                        <Field
                          type="email"
                          name="email"

                          placeholder="Tu Email"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-dark focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="email"
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
                          Contraseña{" "}
                        </label>
                        <Field
                          type="password"
                          name="password"

                          placeholder="Tu contraseña"
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
                          Confirma tu contraseña{" "}
                        </label>
                        <Field
                          type="password"
                          name="confirmpassword"
                          id="confirmpassword"

                          placeholder="Confirma tu contraseña"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-dark focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="confirmpassword"
                          component="small"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="mb-8 flex">
                        <label
                          htmlFor="checkboxLabel"
                          className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="checkboxLabel"
                              className="sr-only"
                            />
                            <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
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
                          <span>
                            Al crear una cuenta significa que aceptas los
                            <a
                              href="#0"
                              className="text-primary dark:text-white hover:underline"
                            >
                              {" "}
                              Términos y condiciones{" "}
                            </a>
                            , con nuestra
                            <a
                              href="#0"
                              className="text-primary dark:text-white hover:underline"
                            >
                              {" "}
                              Política de Privacidad{" "}
                            </a>
                          </span>
                        </label>
                      </div>
                      <div className="mb-6">
                        <button disabled={isSubmitting} type="submit"
                          className="flex w-full items-center justify-center rounded-md bg-white py-4 px-9 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                          Registrarse
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <p className="text-center text-base font-medium text-body-color">
                  ¿Ya te registraste? &nbsp;
                  <Link href="/signin" className="text-primary dark:text-white hover:underline">
                    Iniciar sesión
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
      </section>
    </>
  );
};

export default SignupPage;
