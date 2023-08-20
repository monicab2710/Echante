import { getProducts } from "services/enchante/enchante.service";
import { NextApiRequest, NextApiResponse } from "next";
import { IProductRes } from "types/IProduct.type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { offset, limit } = query;

  try {
    const products: IProductRes = await getProducts(
      Number(offset),
      Number(limit)
    );

    if (products.code === "InvalidCredentials") {
      res.status(401).json("Invalid credentials");
      return;
    }
    if (products.code === 200) {
      res.status(200).json(products);
      return;
    }

    res.status(400).json("Bad request");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}
