"use client";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select } from '@mui/material';
import { updateUserData } from "@/services/users";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/router"; // Cambio en la importación
import Link from "next/link";
import styles from "styles/Home.module.css";

const AdminPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [backendData, setBackendData] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    // ...

    // Hacer una solicitud al backend para obtener los datos esperando end point
    try {
      const response = await fetch('URL_DE_API');
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.error('Error al obtener datos del backend:', error);
    }

    setSubmitting(false);
  };

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded-md bg-primary/[20%] bg-opacity-5 px-6 py-10 dark:bg-primary/[20%] sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-primary dark:text-yellow sm:text-3xl">
                Bienvenido Administrador
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
              </p>
              <Formik
                initialValues={{
                  startDate: "",
                  endDate: ""
                }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="-mx-4 flex flex-wrap">
                      <div className="w-full px-4 md:w-1/2">
                        <div className="mb-8">
                          <label
                            htmlFor="startDate"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Fecha de inicio:
                          </label>
                          <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                          // ... Otras propiedades
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 md:w-1/2">
                        <div className="mb-8">
                          <label
                            htmlFor="endDate"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Fecha de fin:
                          </label>
                          <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            style={{ backgroundColor: 'blue' }} 
                          // ... Otras propiedades
                          />
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="rounded-md bg-white py-4 px-9 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                        >
                          Buscar
                        </button>
                        {backendData && (
                          <div className="card">
                            <h4>{backendData.titulo}</h4>
                            <p>{backendData.descripcion}</p>
                            {/* Agrega más campos según tus necesidades */}
                          </div>
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;