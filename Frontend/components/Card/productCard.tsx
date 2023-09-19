import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosH from "@/app/helper/axiosH";

const ProductCard = ({ id, name, description, imageUrl, price }) => {
  const [products, setProducts] = useState([]);
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosH.get('/products/featured');
        setProducts(response.data);

        /* const randomIndex = Math.floor(Math.random() * response.data.length); */
        setRandomProduct(response.data); 
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
      <div className="container mx-auto px-4">
        <main className="main">
          {randomProduct && (
            <div className="relative border border-red-800 rounded overflow-hidden productCard" key={randomProduct.id}>
              <div className="relative h-96">
                <Image src={randomProduct.imageUrl} layout="fill" objectFit="cover" alt={randomProduct.name} />
                <div className="absolute inset-0 bg-red-900 bg-opacity-50 p-4">
                  <div className="text-white">
                    <h2 className="text-xl font-bold">{randomProduct.name}</h2>
                    <p className="text-lg">${formatPrice(randomProduct.price)}</p>
                    <p className="text-sm">{randomProduct.description}</p>
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
