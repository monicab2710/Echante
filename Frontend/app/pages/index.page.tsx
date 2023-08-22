import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getAllProducts } from "services/products/products.service";
import ProductsLayout from "components/Hero/products/products-layout.component";
import { IProductRes } from "types/IProduct.type";
import Loader from "components/loader/loader-component";
import Layout from "components/Hero/Layout";
import { products } from "@/test/mocks/products";



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
  <Head children={""}>
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
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}

export default Index;
