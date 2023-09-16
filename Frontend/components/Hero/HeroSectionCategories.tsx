'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosH from "../../app/helper/axiosH";

const HeroSectionCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosH.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategories = ({ id, title, imageUrl }) => (
    <div className="2xl:w-full xl:w-full lg:w-full sm:w-full md:w-full lg:w-1/4" key={id}>
      <div className="relative w-full"> 
        <Image src={imageUrl} layout="responsive" width={19} height={6} objectFit="cover" alt={title} />
        <div className="absolute bottom-0 left-0 aspect-ratio-16/9 w-full p-1 bg-white bg-opacity-70 text-white text-center">
          <h4 className="my-2 text-xl sm:text-xl font-medium text-black">{title}</h4>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pt-20 lg:pt-28 px-4 md:px-8 lg:px-16 xl:px-32 relative">
      <div className="flex flex-row flex-col">
        <div className="w-full h-0 opacity-30" style={{ zIndex: 0 }}>
          <Image
            src="/images/macahero.jpg"
            layout="fill"
            objectFit="cover"
            alt="Imagen"
          />
        </div>
        <div className="2xl:w-full xl:w-full mt-8 md:mt-0" style={{ zIndex: 1 }}>
          <h1 className="2xl:px-10 text-center 2xl:text-3xl xl:mb-10 xl:text-3xl md:text-2xl sm:text-2xl xs:text-2xl xs:mb-4 sm:mb-4 md:mt-10 md:mb-5 lg:text-3xl font-bold text-white">Bienvenido a Enchanté</h1>
          <p className="2xl:w-2/3 2xl:mx-auto 2xl:text-lg xl:w-2/3 xl:mx-auto xl:text-lg lg:w-full 2xl:mx-auto text-center text-sm md:text-base lg:text-lg font-medium text-black dark:text-yellow sm:hidden">
            Sumérgete en una experiencia culinaria única que te transportará directamente a las calles empedradas de París. Nuestro restaurante está dedicado a brindarte los auténticos sabores y delicias de la gastronomía francesa.
          </p>
          <p className="2xl:w-3/4 2xl:mx-auto 2xl:text-lg xl:w-2/3 xl:mx-auto xl:text-lg lg:w-full 2xl:mx-auto text-center text-sm md:text-base lg:text-lg font-medium text-black dark:text-yellow hidden sm:block">
            Sumérgete en una experiencia culinaria única que te transportará directamente a las calles empedradas de París. Nuestro restaurante está dedicado a
            brindarte los auténticos sabores y delicias de la gastronomía francesa.
            Desde exquisitos platos de alta cocina hasta clásicos reconfortantes, cada bocado es una obra maestra culinaria cuidadosamente preparada
            por nuestros talentosos chefs. Explora nuestras cuatro encantadoras categorías a continuación y déjate llevar por una experiencia gastronómica de la cocina francesa tradicional y contemporánea.
          </p>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-4 2xl:pb-10 2xl:pt-8 xl:pt-5 xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 gap-4 xl:pb-10 md:pb-10 md:pt-7 sm:pb-8 sm:pt-4 xs:pb-4 xs:pt-4 lg:pb-10 lg:pt-10">
        {categories.map(renderCategories)}
      </div>
    </section>
  );
};

export default HeroSectionCategories;

