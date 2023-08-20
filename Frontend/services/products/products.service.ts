export const getPaginatedProducts = async (amount: number, page: number) => {
    const offset = amount * (page - 1);
    const params = new URLSearchParams();
  
    if (offset) params.set("offset", `${offset}`);
    if (amount) params.set("limit", `${amount}`);
  
    const paramsString = params.toString();
    const response = await fetch(`/api/v1/products?${paramsString}`);
    return await response.json();
  };
  
  export const getProductById = async (id: number) => {
    const response = await fetch(`/api/v1/products/${id}`);
    return await response.json();
  };
  
  export const getProductsByCategoryId = async (
    id: number,
    limit?: number
  ): Promise<any> => {
    const params = new URLSearchParams();
  
    if (limit) params.set("limit", `${limit}`);
    const paramsToFetch = params.toString();
  
    const response = await fetch(
      `/api/categories/${id}/products?${paramsToFetch || ""}`
    );
  
    return await response.json();
  };
  