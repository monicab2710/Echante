'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroSectionOne = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Traer productos y categorías desde la API
    axios.get('/api/v1/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    axios.get('/api/v1/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <section>
        <h2>Productos</h2>
        <div>
          {products.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <img src={product.imageUrl} alt={product.name} />
              <p>Precio: {product.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Categorías</h2>
        <div>
          {categories.map(category => (
            <div key={category.id}>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <img src={category.imageUrl} alt={category.title} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSectionOne;
