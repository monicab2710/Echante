import { getAllProducts } from "services/enchante/enchante.service";
import { NextApiRequest, NextApiResponse } from "next";
import { IProductRes } from "types/IProduct.type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  

  try {
    const products: IProductRes = await getAllProducts();

    if (products.code === "InvalidCredentials") {
      res.status(401).json("Credenciales inválidas");
      return;
    }
    if (products.code === 200) {
      res.status(200).json(products);
      return;
    }

    res.status(400).json("Solicitud incorrecta");
  } catch (error) {
    res.status(500).json("Error Interno del Servidor");
  }
}
