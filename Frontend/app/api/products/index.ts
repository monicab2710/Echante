import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const response = await fetch('http://localhost:8081/api/v1/products');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ statusCode: 500});
    }

    
}
