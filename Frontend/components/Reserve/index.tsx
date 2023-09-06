"use client";
import NewsLatterBox from "./NewsLatterBox";
import axiosHe from "../../app/helper/axiosHe"
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import * as yup from 'yup';
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import moment from "moment";
import styles from '../../styles/Categories.module.css';
//const validationSchema = yup.object().shape({
// time: yup
///   .()
//   .min(1900, 'La hora debe ser mayor o igual a las 19:00')
//  .max(2330, 'La hora debe ser menor o igual a las 23:30')
/////  .required('La hora es obligatoria'),
//});
//const router = useRouter()
const MySwal = withReactContent(Swal)
const Reserve = () => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

  const [isRegistered, setIsRegistered] = useState(false);

  const [date, setDate] = useState(new Date());

  const [time, setTime] = useState("");
  const [amountDiners, setAmountDiners] = useState("");
  const [message, setMessage] = useState("");

  const isMondayOrTuesday = (date) => {
    const dayOfWeek = date.getDay(); // 0: domingo, 1: lunes, 2: martes, etc.
    return dayOfWeek === 1 || dayOfWeek === 2; // 1 es lunes, 2 es martes
  };

  const handleDateChange = (date) => {
    if (isMondayOrTuesday(date)) {
      MySwal.fire({
        icon: "error",
        title: "Día no permitido",
        text: "No puedes seleccionar un lunes o martes.",
      });
    } else {
      setDate(date); 
    }
  };


  const handleSubmit = async (values, actions) => {
    const formattedDate = moment(date).format('DD/MM/YYYY');

    const formattedTime = moment(time, 'HH:mm').format('HH:mm');

    try {

      const response = await axiosHe.post(
        "/api/v1/reservations",
        {
          time: formattedTime,
          date: formattedDate,
          amountDiners: amountDiners,
          message: "message"
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        // router.push("/");
        setIsRegistered(true);
        MySwal.fire({
          html: <strong> tu reserva se ha realizado de manera exitosa.</strong>,
          icon: 'success',
          background: "#008F95",
          color: "#EA7363",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      } else {
        console.log('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        html: (
          <strong>
            Lamentablemente no ha podido hacer su reserva. Por favor intente más tarde.
          </strong>
        ),
        icon: 'warning',
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <section id="reserve" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[20%] py-11 px-8 dark:bg-primary/[20%] sm:p-[55px] lg:mb-5 lg:px-8 lg:pb-8 xl:p-[55px] xl:mt-0 lg:mt-0 sm:mt-5 md:mt-8 sm:mt-8 xs:mt-8"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-primary dark:text-body-color sm:text-3xl lg:text-2xl xl:text-3xl">
                Reserva en Enchanté
              </h2>
              <Formik
                initialValues={{
                  amountDiners: "",
                  message: ""
                }}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (

                  <Form >
                    <div className="-mx-4 flex flex-wrap">
                      <div className="w-full px-4 md:w-1/2">
                        <div className="mb-8">
                          <label
                            htmlFor="date"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Fecha:
                          </label>
                          <DatePicker
                            selected={date}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            filterDate= {(date) => !isMondayOrTuesday(date)}
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow body-color/[60%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                          />
                          <ErrorMessage
                            name="date"
                            id="date"
                            component="small"
                            className="text-red-500 "
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 md:w-1/2">
                        <div className="mb-8">
                          <label
                            htmlFor="time"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Hora:
                          </label>
                          <TimePicker
                            onChange={setTime}
                            value={time}
                            format="HH:mm" 
                            minTime="19:00"
                         
                            />                           
                        </div>
                      </div>
                      <div className="w-full px-4 md:w-1/2">
                        <div className="mb-8">
                          <label
                            htmlFor="people"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Personas:
                          </label>
                          <Field
                            type="number"
                            id="amountDiners"
                            value={amountDiners}
                            onChange={(e) => setAmountDiners(e.target.value)}
                            placeholder=""
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base placeholder-black dark:placeholder-yellow shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div className="mb-8">
                          <label
                            htmlFor="message"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Mensaje (Opcional):
                          </label>
                          <textarea
                            name="message"
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            placeholder="Envíanos un mensaje"
                            className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                          ></textarea>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <button disabled={isSubmitting} type="submit"
                          className="rounded-md bg-white py-4 px-9 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                          Reservar
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reserve;
