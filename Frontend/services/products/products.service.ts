export const getAllProducts = async () => {
  const response = await fetch("/api/v1/products");
  return await response.json();
};

export const getProductById = async (id: number) => {
  const response = await fetch(`/api/v1/products/${id}`);
  return await response.json();
};

export const getProductsByCategory = async (id: number): Promise<any> => {
  const response = await fetch(`/api/categories/${id}/products`);
  return await response.json();
};
