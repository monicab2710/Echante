import { getProductById } from "services/enchante/enchante.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerProductsId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const response = await getProductById(Number(id));
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
