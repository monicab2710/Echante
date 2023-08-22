export const getAllProducts = async () => {
  const response = await fetch(`${process.env.ENCHANTE_API_URL}/products`);
  return await response.json();
};

export const getProductById = async (id: number) => {
  const response = await fetch(`${process.env.ENCHANTE_API_URL}/products/${id}`);
  return await response.json();
};

export const getProductsByCategory = async (id: number): Promise<any> => {
  const response = await fetch(`${process.env.ENCHANTE_API_URL}/products/category/${id}`);
  return await response.json();
};
