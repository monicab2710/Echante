"use client";
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import Link from "next/link";
import styles from "styles/Home.module.css";
import axiosHe from '@/app/helper/axiosHe';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
import { Console } from 'console';

const MySwal = withReactContent(Swal);

const AdminPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Verificar si estamos en el lado del cliente
    if (typeof window !== 'undefined') {
      // Acceder a sessionStorage solo si estamos en el cliente
      const userToken = sessionStorage.getItem('token');
      setToken(userToken);
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formattedStartDate = moment(startDate).format('DD/MM/YYYY');
    const formattedEndDate = moment(endDate).format('DD/MM/YYYY');

    try {
      const response = await axiosHe.get('/api/v1/reservations/history', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate
        }
      });

      if (response.status === 200) {
        setIsRegistered(true);
        MySwal.fire({
          html: <strong>Estas son las reservas</strong>,
          icon: 'success',
          background: "#008F95",
          color: "#EA7363",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      } else if (response.status === 204) {
        MySwal.fire({
          html: <strong>No hay reservas en este rango de fechas</strong>,
          icon: 'info',
          background: "#008F95",
          color: "#EA7363",
        });
      } else {
        console.log('Error:', response.data);
      }
      setReservations(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Error: ', error.response.data);
        MySwal.fire({
          html: <strong>No hemos podido encontrar las reservas de estas fechas, inténtalo de nuevo</strong>,
          icon: 'error',
        });
      } else {
        console.error('Error:', error);
        MySwal.fire({
          html: (
            <strong>
              Lamentablemente no ha podido registrarse. Por favor inténtalo nuevamente más tarde.
            </strong>
          ),
          icon: 'warning',
        });
        
      }
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
                            onChange={startDate => setStartDate(startDate)}
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
                            onChange={endDate => setEndDate(endDate)}
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

      {reservations && (
        <>
          {reservations.map(reservation => (
            <div className="w-full px-4 mt-8" key={reservation.id}>
              <div className="w-full rounded-lg bg-white/50 p-6 shadow-lg dark:bg-white/50">
                <h4>Reserva número {reservation.id}</h4>
                <p>{reservation.message}</p>
                <p>Usuario: {reservation.emailUser}</p>
                <p>Hora: {reservation.time}</p>
                <p>Personas: {reservation.amountDiners}</p>
                <p>Estatus de la reserva: {reservation.status}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
export default AdminPage;