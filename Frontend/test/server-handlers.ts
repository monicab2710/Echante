import { rest } from "msw";
import { products } from "./mocks/products";
import { product } from "./mocks/product";
import { category } from "./mocks/category";



const handlers = [
  rest.get("/api/v1/products", async (req, res, ctx) => {
    return res(ctx.json(products));
  }),
  rest.get("/api/v1/products/:id", async (req, res, ctx) => {
    const id = req.params.id;
    if (id === "1") return res(ctx.json(product));
    return res(ctx.json({ data: { results: [] } }));
  }),
  rest.get("/api/v1/categories/:id", async (req, res, ctx) => {
    const id = req.params.id;
    if (id === "1") return res(ctx.json({ data: { results: [category] } }));
    return res(ctx.json({ data: { results: [] } }));
  }),

  rest.get("/api/v1/products/category/:id", async (req, res, ctx) => {
    const id = req.params.id;
    if (id === "1") return res(ctx.json({ data: { results: products } }));
    return res(ctx.json({ data: { results: [] } }));
  }),
];


export { handlers };
