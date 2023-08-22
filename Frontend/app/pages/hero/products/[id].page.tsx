import { Box, Grid, Stack, Typography } from "@mui/material";
import { getProductById, getAllProducts } from "services/products/products.service";
import Head from "next/head";
import { useRouter } from "next/router";
import { IProduct, IProductRes } from "types/IProduct.type";
import Loader from "components/loader/loader-component";
import ProductDetails from "components/Hero/productDetails/product-details.component";
import Layout from "components/Hero/Layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface Props {
  product: IProduct;
}

const ProductDetailPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  if (router.isFallback === true) {
    return <Loader />;
  }
  return (
    <Layout>
      <Head children={""}>
        <title>{product.name}</title>
        <meta
          name="description"
          content={`Product ${product.name}.${product.description}`}
        />
      </Head>
      <Stack
        component="section"
        maxWidth="xl"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          padding: "100px 20px",
        }}
      >
        <Grid container spacing={4} maxWidth="xl">
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
              }}
            >
            <img
  alt={product.name ? product.name : ""}
  src={`${product.imageUrl}`}
  style={{
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    margin: "auto",
    objectFit: "cover",
    objectPosition: "center",
    width: "100%",
    height: "auto",
    borderRadius: "5px",
    border: "2px solid #F20505",
    
  }}
  onClick={(e) => {
    e.currentTarget.style.transform =
      e.currentTarget.style.transform === "scale(1.1)"
        ? "scale(1)"
        : "scale(1.1)";
  }}
/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                paddingBottom: "30px",
              }}
            >
              
              <Typography gutterBottom variant="h5">
                {product.name}
              </Typography>
              
              <Typography variant="h4"sx={{
                      color: "background.paper",
                    }}>${product.price}</Typography>
            </Box>
            <Box
              sx={{
                paddingBottom: "20px",
              }}
            >
              
            </Box>
            <ProductDetails product={product} />
          </Grid>
        </Grid>
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const response = await getProductById(Number(id));

  return {
    props: {
      product: response,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: IProductRes = await getAllProducts();

  const paths = data.data.results.map((product) => {
    return { params: { id: product.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default ProductDetailPage;
