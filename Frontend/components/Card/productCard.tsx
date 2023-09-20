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
        <div className="relative border border-primary rounded overflow-hidden productCard" key={randomProduct.id}>
          <div className="relative h-96">
            <Image src={randomProduct.imageUrl} layout="fill" objectFit="cover" alt={randomProduct.name} />
            <div className="absolute inset-0 p-4">
             
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,38,59,1) 21%, rgba(255,196,127,0) 50%, rgba(128,33,33,0.35898109243697474) 79%)' }}></div>

              <div className="relative z-10 ">
                <h2 className="text-2xl font-bold text-body-color">{randomProduct.name}</h2>
                <p className="text-lg text-white">${formatPrice(randomProduct.price)}</p>
                <p className="text-lg text-yellow w-1/2">{randomProduct.description}</p>
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
