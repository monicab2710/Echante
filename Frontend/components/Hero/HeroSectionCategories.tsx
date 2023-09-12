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
    <div className="2xl:w-full xl:w-full sm:w-1/2 md:w-1/2 lg:w-1/4" key={id}>
      <div className="relative w-full h-64">
        <Image src={imageUrl} layout="fill" objectFit="cover" alt={title} />
        <div className="absolute bottom-0 left-0 w-full p-1 bg-white bg-opacity-70 text-white text-center">
          <h4 className="mb-2 text-sm sm:text-xl font-medium text-black">{title}</h4>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pt-16 md:pt-20 lg:pt-28 px-4 md:px-8 lg:px-16 xl:px-32 relative">
  <div className="flex flex-row flex-col" style={{ zIndex: 0 }}>
    <div className="w-full h-0 opacity-30" style={{ zIndex: 0 }}>
      <Image
        src="/images/dessert.jpg"
        layout="fill"
        objectFit="cover"
        alt="Imagen"
      />
    </div>
    <div className=" md:w-1/2 2xl:w-full xl:w-full mt-8 md:mt-0" style={{ zIndex: 1 }}>
      <h1 className="2xl:px-10 text-center 2xl:text-3xl 2xl:mb-10 xl:mb-10 xl:text-3xl md:text-3xl lg:text-2xl font-bold text-white">Bienvenido a Enchanté</h1>
      <p className="2xl:w-1/2 2xl:mx-auto 2xl:text-lg xl:w-full xl:text-lg xl:mb-12 text-center  text-sm md:text-base lg:text-sm font-medium text-black dark:text-yellow" >
        ¡Bienvenidos a nuestro encantador restaurante francés! Sumérgete en
        una experiencia culinaria única que te transportará directamente a
        las calles empedradas de París. Nuestro restaurante está dedicado a
        brindarte los auténticos sabores y delicias de la gastronomía francesa.
        Desde exquisitos platos de alta cocina hasta clásicos reconfortantes,
        cada bocado es una obra maestra culinaria cuidadosamente preparada
        por nuestros talentosos chefs. Explora nuestras cuatro
          encantadoras categorías a continuación y déjate llevar
          por una experiencia gastronómica de la cocina francesa tradicional y contemporánea.
      </p>
    </div>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 2xl:pb-10 xl:pb-10 xl:pt-70">
    {categories.map(renderCategories)}
  </div>
</section>

  );
};

export default HeroSectionCategories;
