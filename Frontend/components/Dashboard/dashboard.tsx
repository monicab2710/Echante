"use client";
import { useEffect, useState, useContext } from "react";
import ProductCard from "@/components/Card/productCard";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosHe from "@/app/helper/axiosHe";
import {
  MdFactCheck,
  MdDinnerDining,
  MdCalendarMonth,
  MdOutlineEvent,
} from "react-icons/md";
import axiosH from "@/app/helper/axiosH";
import { UserContext } from "@/app/providers";

const DashboardPage = ({ userReservationsCount }) => {
  const { user } = useContext(UserContext);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [reservationCount, setReservationCount] = useState(0);
  const [hasReservations, setHasReservations] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const router = useRouter();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);

    if (menu === "profile") {
      router.push("/profile");
    }
  };

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const countReservations = async () => {
      try {
        if (user && user.email){
          const response = await axiosHe.get(
            `/api/v1/reservations/my-reservations?email=${user.email}`
          );

        setReservationCount(response.data.length);
        setHasReservations(response.data.length > 0); // Actualiza el estado de hasReservations
      } 
    }catch (error) {
        console.error("Error al obtener la cantidad de reservas:", error);
      }
    };

    countReservations();
  }, [user]);


  useEffect(() => {
    const fetchRecommendedProduct = async () => {
      try {
        const response = await axiosH.get("/products/random");
        setRecommendedProduct(response.data);
      } catch (error) {
        console.error("Error fetching recommended product:", error);
      }
    };
    fetchRecommendedProduct();
  }, []);

  return (
    <section
      id="hero"
      className="2xl:pt-30 pt-40 xs:pt-20 sm:pt-24 md:pt-28 lg:pt-28"
    >
      <div className="container">
        <div className="color flex h-[900px] border border-primary bg-primary/5">
          <aside className="w-1/4 bg-primary py-10">
            <button
              className={`mb-4 block w-full rounded p-2 text-left text-yellow${
                activeMenu === "profile" ? "" : " bg-yellow/5 text-left"
              }`}
              onClick={() => handleMenuClick("profile")}
            >
              Perfil
            </button>
            <Link
              href="/profile"
              className={`mb-4 block w-full rounded p-2 ${
                activeMenu === "dashboard" ? "bg-yellow/20 text-yellow" : ""
              }`}
            >
              Mis reservas
            </Link>
          </aside>
          <main className="w-3/4 p-10">
            <div
              className="flex items-center "
              style={{ paddingBottom: "20px" }}
            >
              <MdFactCheck
                size={24}
                className="mr-3 text-2xl font-bold text-primary dark:text-body-color sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl"
              />
              <h1 className="text-2xl font-bold text-primary dark:text-body-color sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl ">
                Resumen
              </h1>
            </div>

            {hasReservations ? (
              <div>
                <div className="mb-5 flex items-center text-black">
                  <MdCalendarMonth
                    size={20}
                    className="mr-3 text-2xl font-bold text-black dark:text-yellow sm:text-3xl lg:text-2xl xl:text-3xl"
                  />
                  <p className="text-sm! font-light  dark:text-yellow sm:text-3xl lg:text-2xl xl:text-xl">
                    Tus reservas
                  </p>
                </div>
                <div className="mb-6">
                  <div className="w-full rounded-lg bg-white/50 p-6 shadow-lg dark:bg-white/50">
                    <div className="flex items-center justify-between">
                      <div className="dark:text-black text-primary text-2xl font-semibold">
                        {reservationCount}
                      </div>
                      <div className=" rounded-full p-2">
                        <i className="fas fa-chart-line text-success"></i>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-primary dark:text-black">
                        Cantidad de reservas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="items-left flex flex-col text-black">
                <div className="mt-10  flex items-center text-black">
                  <MdOutlineEvent
                    size={22}
                    className="mr-3 text-2xl font-bold text-primary dark:text-body-color sm:text-3xl lg:text-2xl xl:text-3xl"
                  />
                  <p className="text-sm font-medium text-primary dark:text-body-color sm:text-3xl md:text-xl lg:text-xl xl:text-xl">
                    Reserva ahora
                  </p>
                </div>

                <p className="my-2 ml-8 w-2/3 font-light dark:text-yellow sm:text-3xl md:text-base lg:text-base xl:text-base">
                  No tienes reservas registradas en este momento. ¡Haz tu primera reserva ahora y disfruta de nuestra deliciosa cocina francesa!
                </p>
                <ul>
                  <Link
                    href="/reservar"
                    className="text-medium marker-hidden ml-8 mt-5 inline-block rounded-md bg-white px-6 py-2 text-primary hover:bg-opacity-80"
                  >
                    Reservar
                  </Link>
                </ul>
              </div>
            )}

            <section id="Recommedation">
              <div className="mt-10  flex items-center text-black">
                <MdDinnerDining
                  size={20}
                  className="mr-3 text-2xl font-bold text-primary dark:text-body-color sm:text-3xl lg:text-xl xl:text-3xl"
                />
                <p className="text-sm! font-medium text-primary dark:text-body-color sm:text-3xl md:text-xl lg:text-xl xl:text-xl">
                  Recomendación del día
                </p>
              </div>

              <ProductCard
                id={undefined}
                name={undefined}
                description={undefined}
                imageUrl={undefined}
                price={undefined}
              />
            </section>
          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
