import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React, { FC, useState } from "react";
import { IProduct } from "types/IProduct.type";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  product: IProduct;
}
export const ProductDetails: FC<Props> = ({ product }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        padding: "30px 0px",
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        data-testid="accordion"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="body1" sx={{ width: "33%", flexShrink: 0 }}>
            Descripción
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {product.description ? product.description : "No hay descripción"}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Categorias
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {product.category.items.length > 0 ? (
            product.category.items.map((category) => (
              <NextLink
                href={`/category/${product.resourceURI.split("/").pop()}`}
                key={product.name}
              >
                <Button
                  fullWidth
                  size="small"
                  color="primary"
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  {category.title}
                </Button>
              </NextLink>
            ))
          ) : (
            <Typography>No hay información de la categoría</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Creators
          </Typography>
        </AccordionSummary>
      </Accordion>
    </Box>
  );
};

export default ProductDetails;
