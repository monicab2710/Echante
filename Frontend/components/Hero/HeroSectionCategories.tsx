"use client";
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
    <div className="-mx-4 flex flex-wrap justify-center" key={id}>
      <div className="relative block h-[100px] w-[190px]">
        <Image src={imageUrl} layout="fill" objectFit="cover" alt={title} />
        <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-70 text-white text-center">
          <h4 className="mb-2 block text-sm font-medium text-yellow dark:text-yellow sm:text-xl">{title}</h4>
        </div>
      </div>
    </div>
  );

  return (
    <section className="flex pt-16 md:pt-20 lg:pt-28 p-20">
      <div className="w-1/2">
        <Image src="/images/dessert.jpg" width={600} height={400} alt="Imagen" />
      </div>
      <div className="w-1/2">
        <h1 className="mb-3 text-2xl font-bold text-primary dark:text-yellow sm:text-3xl lg:text-2xl xl:text-3xl">Bienvenido a Enchanté</h1>
        <p className="mb-3 text-sm font-medium text-black dark:text-body-color sm:text-base lg:text-sm xl:text-base">
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
        <div className="grid grid-cols-4 gap-x-0 gap-y-2">
          {categories.map(renderCategories)}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionCategories;
