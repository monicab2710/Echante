"use client";
import Link from "next/link";
import axiosHelper from "../helper/axiosHelper";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation'
import jwt_decode from "jwt-decode";
import { UserContext } from "../providers";
import { useFormik } from 'formik';
const ForgotPasswordPage = () => {

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

  const router = useRouter();

  const validation = Yup.object({
    email: Yup.string()
      .email("Ingresa un email válido")
      .required("Este campo es requerido"),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref('email'), null], 'Los correos deben coincidir')
      .required("Este campo es requerido"),
  });
/* 
  const initialValues = {
    email: '',
    confirmemail: ''
  }; */
  const formik = useFormik({
    initialValues: {
      email: '',
      confirmEmail: ''
  },
    validationSchema: validation,
    onSubmit: (values) => {
      sendEmail(values);

    },
  });

const { setUser } = useContext(UserContext)

  const sendEmail = async (values) => {

    try {
      const res = await axiosHelper.post(
        "/api/v1/users/auth/forgot-password?email=" + values.email,
        /* {
          email: values.email,
          confirmEmail: values.confimEmail,
        }, */
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      if (res.status === 200) {
        router.push('/')

        const userStorage = JSON.stringify(res.data.data);
        sessionStorage.setItem('user', userStorage);
        setUser(userStorage);
        Toast.fire({
          icon: 'success',
          title: '¡Revisa tu correo y sigue los pasos que te enviamos!'
        });
      } else if (res.status === 400) {
        console.log("respuesta", res.data.data);
      }
    }
    catch (error) {
      MySwal.fire({
        html: <strong>Tu usuario no existe. Ingresa los campos correctos.</strong>,
        icon: 'warning',
      });
      console.error("Correo Incorrecto: ", error);
    }

  };
        

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary/[20%] bg-opacity-5 px-6 py-10 dark:bg-primary/[20%] sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-primary dark:text-yellow sm:text-3xl">
                  Recuperar contraseña
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Ingresa tu e-mail para enviarte el proceso de recuparación.
                </p>
                <Formik
                  initialValues={formik.initialValues}
                  validationSchema={validation}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={(values) => {
                    sendEmail(values);
                  }}
                >
                  {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Tu e-mail
                        </label>

                        <Field
                          type="email"
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Ingresa tu e-mail"
                          className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black dark:text-yellow placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:placeholder-yellow/[70%] dark:shadow-signUp"
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
                          Confirma tu e-mail
                        </label>
                        <Field
                          type="email"
                          name="confirmEmail"
                          id="confirmemail"
                          value={values.confirmEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Confirma tu e-mail"
                          className="w-full rounded-md border border-transparent px-6 py-3 text-base text-black dark:text-yellow placeholder-black/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:placeholder-yellow/[70%] dark:shadow-signUp"
                        />
                        <ErrorMessage
                          name="confirmEmail"
                          id="confirmEmail"
                          component="small"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      
                  
                      <div className="mb-6">
                        <button type="submit" className="flex w-full items-center justify-center rounded-md bg-white px-9 py-4 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                          Enviar
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <p className="text-center text-base font-medium text-body-color">
                  
                  <Link href="/signin" className="text-primary dark:text-white hover:underline">
                    Volver al login
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

export default ForgotPasswordPage;
