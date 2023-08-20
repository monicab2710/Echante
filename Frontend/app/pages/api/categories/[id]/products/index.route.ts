import type { NextApiRequest, NextApiResponse } from "next";
import { getProductsByCategoryId } from "services/products/products.service";

type Data = any | { error: string; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Content-Type", "application/json");

  const {
    query: { id, limit },
  } = req;
  const categoryId = parseInt(id as string);
  const limitNumber = parseInt(limit as string);

  try {
    const result = await getProductsByCategoryId (categoryId, limitNumber);

    if (result.code === 200) {
      res.status(200).json(result);
      return;
    }
    res.status(404).json({ error: "Not Found", message: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error", message: err });
  }
}
