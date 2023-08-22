import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getAllProducts } from "services/products/products.service";
import ProductsLayout from "components/Hero/products/products-layout.component";
import { IProductRes } from "types/IProduct.type";
import Loader from "components/loader/loader-component";
import Layout from "components/Hero/Layout";
import { products } from "@/test/mocks/products";
import axios from 'axios';

const ENCHANTE_API_URL = "http://localhost:8081/api/v1";

const Index: NextPage = () => {
  const [Products, setProducts] = useState<IProductRes>();

  useEffect(() => {
    getAllProducts().then(
      (data: IProductRes) => {
        setProducts(data);
      }
    );
  }, []);

  if (!Products) return <Loader />;

  return (
    
    <Layout>
  <Head>
    <title>Enchanté</title>
    <meta name="description" content="Restaurante Francés enchanté" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  
  

    <ProductsLayout
      products={
        products?.results !== undefined ? products.results : []
      }
    />
    

</Layout>

  );
};

export async function getStaticProps() {
  const response = await axios.get(`${ENCHANTE_API_URL}/products`);
  const products = response.data;

  return {
    props: {
      products,
    },
  };
}

export default Index;
