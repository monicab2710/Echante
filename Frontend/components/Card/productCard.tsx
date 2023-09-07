import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "styles/Home.module.css";
import axiosH from "@/app/helper/axiosH";

const ProductCard = ({ id, name, description, imageUrl, price }) => {
    const [products, setProducts] = useState([]);
    const [randomProduct, setRandomProduct] = useState(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axiosH.get('/products/random');
          setProducts(response.data);
     
          const randomIndex = Math.floor(Math.random() * response.data.length);
          setRandomProduct(response.data[randomIndex]);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    const formatPrice = (price) =>
      price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
    return (
      <section id="hero" className="pt-5">
        <div className={styles.container}>
          <main className={styles.main}>
            
            {randomProduct && (
              <div className={styles.productCard} key={randomProduct.id}>
                <div className={styles.productImage}>
                  <Image src={randomProduct.imageUrl} layout="fill" objectFit="cover" alt={randomProduct.name} />
                  <div className={styles.productOverlay}>
                    <div className={styles.productInfo}>
                      <h2>{randomProduct.name}</h2>
                      <p className={styles.price}>${formatPrice(randomProduct.price)}</p>
                      <p className={styles.description}>{randomProduct.description}</p>
                     
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>
    );
  };
export default ProductCard;
