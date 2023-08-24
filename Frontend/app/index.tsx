import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Product, ProductsAPIResponse } from "../types";
import { useRouter } from "next/router";


export interface IProductProps {
  products:ProductsAPIResponse;
}

const Home: NextPage<IProductProps> = ({products}) => {
  

 
  if (!products) return null;

  const formatPrice: (price: number) => string = (price) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

 

  const renderProductCard: (product: Product) => JSX.Element = ({
    id,
    name,
    description,
    imageUrl,
    price,
    categoryId,
  }) => (
    <div className={styles.card} key={id}>
      <h2>{name}</h2>
      <p>
        <b>Categoría:</b> {categoryId}
        <b className={styles.price}>${formatPrice(price)}</b>
      </p>
      <div className={styles.description}>
        <Image
          src={imageUrl}
          layout="fixed"
          width={100}
          height={130}
          alt={name}
        />
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Productos destacados</h1>
        <div className={styles.grid}>{products.map(renderProductCard)}</div>
      </main>
      <footer className={styles.footer}>
        <span>Powered by</span>
        <span className={styles.logo}>
          <Image
            src="/dh.png"
            alt="Digital House Logo"
            width={30}
            height={30}
          />
        </span>
      </footer>
    </div>
  );
};



export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`http://localhost:8081/api/v1/products`);
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}

export default Home;
