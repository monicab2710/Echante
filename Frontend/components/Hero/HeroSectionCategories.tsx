"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "styles/Categories.module.css";
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

  const renderCategories = ({ id, title, description, imageUrl }) => (
    <div className={styles.categoryCard} key={id}>
      <div className={styles.categoryImage}>
        <Image src={imageUrl} layout="fill" objectFit="cover" alt={title} />
        <div className={styles.categoryInfo}>
          <h3>{title}</h3>
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
        <div className={styles.categoryContainer}>
          {categories.map(renderCategories)}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionCategories;
