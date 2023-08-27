"use client";
import Image from "next/image";
import styles from "styles/Home.module.css";
import type { GetServerSideProps, NextPage } from "next";
import { Product, ProductsAPIResponse } from "types";
import axiosH from "../../app/helper/axiosH"
import SectionTitle from "../Common/SectionTitle";
import { useEffect, useState } from "react";

const HeroSectionOne = () => {
  const [products, setProducts] = useState([]);
//accediendo a la api 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosH.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);



  const formatPrice = (price) =>
  price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const renderProductCard = ({ id, name, description, imageUrl, price }) => (
  <div className={styles.productCard} key={id}>
    <div className={styles.productImage}>
      <Image src={imageUrl} layout="fill" objectFit="cover" alt={name} />
      <div className={styles.productOverlay}>
        <div className={styles.productInfo}>
          <h2>{name}</h2>
          <p className={styles.price}>${formatPrice(price)}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  </div>
);

return (
  <section id="hero" className="pt-16 md:pt-20 lg:pt-28">
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.heading}>Descubre Nuestros Productos</h1>
        <div className={styles.productsGrid}>
          {products.map(renderProductCard)}
        </div>
      </main>
    </div>
  </section>
);
};

export default HeroSectionOne;




