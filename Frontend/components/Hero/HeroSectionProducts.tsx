"use client";
import Image from "next/image";
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

  const renderProductCard = ({ id, name, description, imageUrl, price }, index) => (
    <div className={`mb-8 ${index % 2 === 0 ? 'flex ' : 'flex flex-row-reverse'}`}  key={id}>
      <div className="relative w-1/2 h-80 " >
        <Image src={imageUrl} layout="fill" objectFit="cover" alt={name}style={{ borderRadius: '10px' }} />
      </div>
      <div className="w-1/2  mx-10">
        <h2 className={`text-2xl font-semibold text-primary ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>{name}</h2>
        <p className={`text-sm dark:text-yellow text-black ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>{description}</p>
        <p className={`text-lg dark:text-white text-dark ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>${formatPrice(price)}</p>
      </div>
    </div>
  );

  const renderedProducts = products.slice(0, 4).map(renderProductCard);

  return (
    <section id="hero" className="pt-16 md:pt-20 lg:pt-28 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="mb-7 text-2xl font-bold text-primary dark:text-yellow sm:text-3xl lg:text-2xl xl:text-3xl text-center">
          Descubre Nuestros Productos
        </h1>
        {renderedProducts}
      </div>
    </section>
  );
};
export default HeroSectionProducts;




