import { Box, Stack, Typography } from "@mui/material";
import ProductsLayout from "components/Hero/products/products-layout.component";
import Layout from "components/Hero/Layout";
import Loader from "components/loader/loader-component";
import { getProductsByCategory } from "services/products/products.service";
import {
  getCategoryById,
  getAllCategories,
} from "services/enchante/enchante.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICategory, ICategoryRes } from "types/ICategory.type";
import { IProduct } from "types/IProduct.type";

interface Props {
  category: ICategory;
}

const CategoryPage: NextPage<Props> = ({ category }) => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (category) {
      getProductsByCategory(category.id).then((response) => {
        setProducts(response.data?.results);
      });
    }
  }, [category]);

  if (!category) return <Loader />;

  return (
    <Layout>
      <Head>
        <title>{category.title}</title>
        <meta name="description" content={`Categoría ${category.title}`} />
      </Head>
      <Stack
        component="section"
        direction="column"
        alignItems="center"
        px={2}
        sx={{ maxWidth: 1500, margin: "0 auto" }}
      >
        <Box
          component="img"
          alt={category.title}
          src={`${category.imageUrl}`}
          sx={{
            boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
            maxWidth: "100%",
            maxHeight: "80%",
            border: "3px solid #000",
            margin: "20px 0",
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            margin: "20px 0",
            fontWeight: "bold"
          }}
        >
          {category.title}
        </Typography>
        {category.description ? (
          <Typography
            variant="body1"
            component="p"
            sx={{
              margin: "20px 0",
              fontWeight: "bold",
            }}
          >
            {category.description}
          </Typography>
        ) : null}
        {products.length === 0 ? (
          <Loader />
        ) : (
          <Stack
            component="section"
            direction="column"
            alignItems="center"
            sx={{ width: "100%", margin: "20px 0" }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                margin: "20px 0",
                fontWeight: "bold",
              }}
            >
              Other {category.title} productos
            </Typography>

            {products.length > 0 ? (
              <ProductsLayout products={products} />
            ) : (
              <Typography
                variant="body1"
                component="p"
                sx={{
                  margin: "20px 0",
                  fontWeight: "bold",
                }}
              >
                No hay productos en esta categoría
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const response = await getCategoryById(Number(id));

  return {
    props: {
      category: response,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ICategoryRes = await getAllCategories();

  const paths = data.results.map((category: ICategory) => ({
    params: {
      id: category.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default CategoryPage;
