"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/Card/productCard";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { MdFactCheck, MdDinnerDining } from "react-icons/md";
import axiosH from "@/app/helper/axiosH";

const DashboardPage = ({ userReservationsCount }) => {
    const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [reservationCount, setReservationCount] = useState(0);

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
    axios
      .get("/api/reservar/count")
      .then((response) => {
        setReservationCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad de reservas:", error);
      });
  }, []);
  useEffect(() => {
    const fetchRecommendedProduct = async () => {
      try {
        const response = await axiosH.get('/products/random');
        setRecommendedProduct(response.data);
      } catch (error) {
        console.error('Error fetching recommended product:', error);
      }
    };

    fetchRecommendedProduct();
  }, []);

  return (
    <section id="hero" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="color flex border border-primary bg-primary/5">
          <aside className="w-1/4 bg-primary py-4">
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
          <main className="w-3/4 p-4">
          <div
                className="mb-5 flex items-center "
                style={{ paddingBottom: "20px" }}
              >
                <MdFactCheck
                  size={32}
                  className="mr-3 text-2xl font-bold text-primary dark:text-body-color sm:text-3xl lg:text-2xl xl:text-3xl"
                />
                <h1 className="text-2xl font-bold text-primary dark:text-body-color sm:text-3xl lg:text-2xl xl:text-3xl ">
                  Resumen
                </h1>
              </div>
            <section id="ReserveCount">
              

              <div className="mb-5 flex items-center text-black">
                <MdFactCheck
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
      <div className="text-success text-2xl font-semibold">
        {userReservationsCount}1
      </div>
      <div className="bg-success-light rounded-full p-2">
        <i className="fas fa-chart-line text-success"></i>
      </div>
    </div>
    <div className="mt-4">
      <div className="text-gray-600 dark:text-gray-400">
        Cantidad de reservas
      </div>
    </div>
  </div>
</div>

            </section>

            <section id="Recommedation">
             
               

              <div className="mt-10  flex items-center text-black">
                <MdDinnerDining
                  size={20}
                  className="mr-3 text-2xl font-bold text-black dark:text-yellow sm:text-3xl lg:text-2xl xl:text-3xl"
                />
                <p className="text-sm! font-light  dark:text-yellow sm:text-3xl lg:text-2xl xl:text-xl">
                  Recomendación del día
                </p>
              </div>

              <ProductCard id={undefined} name={undefined} description={undefined} imageUrl={undefined} price={undefined} />
            </section>

          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
