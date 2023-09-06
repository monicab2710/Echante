import axiosH from "../helper/axiosH"
import React, { useEffect, useState } from "react";
import { createContext } from "react"


export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [errorLogIn, setErrorLogIn] = useState(false);

  const loadData = () => {
    axiosH.get(`/product`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(error => {
        console.log("Error fetching products:", error);
      });
  };

  useEffect(loadData, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        productId,
        setProductId,
        errorLogIn,
        setErrorLogIn,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;