import type { NextApiRequest, NextApiResponse } from "next";
import { getProductsByCategory } from "services/products/products.service";

type Data = any | { error: string; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Content-Type", "application/json");

  const {
    query: { id },
  } = req;
  const categoryId = parseInt(id as string);
 

  try {
    const result = await getProductsByCategory (categoryId);

    if (result.code === 200) {
      res.status(200).json(result);
      return;
    }
    res.status(404).json({ error: "No encontrado", message: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error interno del servidor", message: err });
  }
}
