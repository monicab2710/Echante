import axiosH from "../helper/axiosH"
import React, { useEffect, useState } from "react";
import { createContext } from "react"


export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [errorLogIn, setErrorLogIn] = useState(false);

  const loadData = () => {
    axiosH.get(`/categories`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(error => {
        console.log("Error fetching categories:", error);
      });
  };

  useEffect(loadData, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        categoryId,
        setCategoryId,
        errorLogIn,
        setErrorLogIn,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;