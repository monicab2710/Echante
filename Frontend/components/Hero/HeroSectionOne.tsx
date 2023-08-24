import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { Product, ProductsAPIResponse } from "types"
import type { GetServerSideProps, NextPage } from "next";
import styles from "styles/Home.module.css";
import SVGImage from "public/images/3685834.svg";

export interface IProductProps {
  products: ProductsAPIResponse;
}

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const HeroSectionOne: NextPage<IProductProps> = ({ products }) => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );
  if (!products) return null;

  const formatPrice: (price: number) => string = (price) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const renderProductCard: (product: Product) => JSX.Element = ({
    id,
    name,
    description,
    imageUrl,
    price,
  }) => (
    <div className={styles.productCard} key={id}>
      <div className={styles.productImage}>
        <Image src={imageUrl} layout="fill" objectFit="cover" alt={name} />
        <div className={styles.productOverlay}>
          <div className={styles.productInfo}>
            <h2>{name}</h2>
            <p className={styles.price}>${formatPrice(price)}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="hero" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2 mt-8">
              <SectionTitle
                title="¡Bienvenido a nuestro sitio de alta cocina francesa! "
                paragraph="Próximamente, una experiencia culinaria única te espera. Aquí encontrarás: "
                mb="44px"
              />

              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0 "
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Un menú exclusivo." />
                    <List text="Reserva en cualquier momento." />
                    <List text="Variedad de vinos selectos." />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Catas y maridajes." />
                    <List text="Chef's Table." />
                    <List text="Eventos privados." />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <Image
                  src="/images/hero/hero-image.png"
                  alt="hero-image"
                  fill
                  className="mx-auto max-w-full lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
      <div className={styles.centeredImage}>
  <Image src={SVGImage}
    alt="svg-image"
    width={700} // Ajusta el ancho deseado en píxeles
    height={700} />
</div>
    </div>
    </section>

    
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
};

export default HeroSectionOne;
