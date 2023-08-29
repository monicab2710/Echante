"use client";

import NewsLatterBox from "./NewsLatterBox";
import axiosHe from "../../app/helper/axiosHe"
import axiosHelper from "@/app/helper/axiosHelper";
import { useEffect, useState } from "react";


const Reserve = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('token');
      const apiUrl = await axiosHelper.post(
        "/api/v1/users/auth/signin",)
      

         const requestBody = {
          email: formData.email,
            password: formData.password,
           };

         const headers = {
         'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          };
      
      try {
        const response = await axiosHe.post(apiUrl, requestBody, { headers });
        setResponse(response.data);
      } catch (error) {
        console.error('Error en la petición POST:', error);
      }
    };

    fetchData();
  }, []);
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
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="title"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Motivo de la reserva:
                      </label>
                      <input
                        type="text"
                        placeholder="Cuéntanos el motivo de tu reserva"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="date"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Fecha:
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow body-color/[60%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
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
                      <input
                        type="time"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
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
                      <input
                        type="number"
                        placeholder="2"
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
                        rows={5}
                        placeholder="Envíanos un mensaje"
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-black dark:text-yellow placeholder-black/[70%] dark:placeholder-yellow/[70%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="rounded-md bg-white py-4 px-9 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      Reservar
                    </button>
                  </div>
                </div>
              </form>
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
