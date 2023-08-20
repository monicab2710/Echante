import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import NextLink from "next/link";
import { IProduct } from "types/IProduct.type";

interface ProductsLayoutProps {
  products: IProduct[];
}

const ProductsLayout: NextPage<ProductsLayoutProps> = ({ products }) => {

  return (
    <Grid container alignItems="stretch" rowSpacing={{ xs: 3, sm: 2, md: 4 }} columnSpacing={{ sm: 2, md: 4 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={product.id} style={{ display: "flex", marginTop: "20px" }}>
          <Card
            variant="outlined"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                height="350"
                image={`${product.imageUrl}`}
                alt={product.name}
                style={{ objectFit: "cover", objectPosition: "left center" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
              </CardContent>
            </Box>
            <CardActions
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  width: "100%",
                  gap: "10px",
                  
                }}
              >
                <NextLink href={`/products/${product.id}`} passHref>
                  <Button variant="contained" color="primary" sx={{ textTransform: "capitalize" }}>
                  Ver detalles
                  </Button>
                </NextLink>
                <NextLink href={`/products/${product.id}`} passHref>
                  <Button variant="contained" color="secondary" sx={{ textTransform: "capitalize" }}>
                    Comprar
                  </Button>
                </NextLink>
              </Box>
             
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsLayout;