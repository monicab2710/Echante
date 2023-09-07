"use client";
import Image from "next/image";
import styles from "styles/Home.module.css";
import axiosH from "../../app/helper/axiosH"
import { useEffect, useState } from "react";


const HeroSectionProducts = () => {
  const [products, setProducts] = useState([]);
//accediendo a la api 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosH.get('/products/random');
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
const renderedProducts = products.slice(0, 4).map(renderProductCard);
return (
  <section id="hero" className="pt-16 md:pt-20 lg:pt-28">
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className="mb-3 text-2xl font-bold text-primary dark:text-yellow sm:text-3xl lg:text-2xl xl:text-3xl text-center">Descubre Nuestros Productos</h1>
        <div className={styles.productsGrid}>
          {renderedProducts}
        </div>
      </main>
    </div>
  </section>
);
};

export default HeroSectionProducts;




