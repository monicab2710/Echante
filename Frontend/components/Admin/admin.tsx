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
import axiosHe from '@/app/helper/axiosHe';

const AdminPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [backendData, setBackendData] = useState({
    titulo: "Reserva #",
    descripcion: "Descripción de prueba",
    fecha: "2023-09-30",
    hora: "14:30",
    personas: ""
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // ...

    // Hacer una solicitud al backend para obtener los datos esperando end point
    try {
      const response = await axiosHe.get('/api/v1/reservations');
      console.log(response)
      const data = await response.JSON();
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
                 Administrador de reservas
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
                          />
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full rounded-lg bg-white/50 p-6 shadow-lg dark:bg-white/50">
                  
                          Buscar
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {backendData && (
        <>
        <div className="w-full px-4 mt-8">
          <div className="w-full rounded-lg bg-white/50 p-6 shadow-lg dark:bg-white/50">
            <h4>{backendData.titulo}</h4>
            <p>{backendData.descripcion}</p>
            <p> Fecha: {backendData.fecha}</p>
            <p> Hora: {backendData.hora}</p>
            <p> Personas: {backendData.personas}</p>
          </div>
        </div>
        <div className="w-full px-4 mt-8">
          <div className="w-full rounded-lg bg-white/50 p-6 shadow-lg dark:bg-white/50">
            <h4>{backendData.titulo}</h4>
            <p>{backendData.descripcion}</p>
            <p> Fecha: {backendData.fecha}</p>
            <p> Hora: {backendData.hora}</p>
            <p> Personas: {backendData.personas}</p>
          </div>
        </div>
        </>
      )}
    </section>
  );
};

export default AdminPage;