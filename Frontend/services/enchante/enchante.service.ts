const ENCHANTE_API_URL = "http://localhost:8081/api";

const fetchApi = async (endpoint: string, urlParams?: string) => {
    const url = `${ENCHANTE_API_URL}/${endpoint}${urlParams ? '?' + urlParams : ''}`;
    const response = await fetch(url);
    return await response.json();
};


export const getProducts = async (offset?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (offset) params.set("offset", `${offset}`);
    if (limit) params.set("limit", `${limit}`);
    return fetchApi("products", params.toString());
}

export const getProduct = async (productId: number) => {
    const data = await fetchApi(`products/${productId}`);
    const results = data.data.results;
    if (results.length > 0) return results[0];
    else return null;
}

export const getCategory = async (categoryId: number) => {
    const data = await fetchApi(`category/${categoryId}`);
    const results = data.data.results;
    if (results.length > 0) return results[0];
    else return null;
}

export const getCategories = async (offset?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (offset) params.set("offset", `${offset}`);
    if (limit) params.set("limit", `${limit}`);
    return fetchApi("categories", params.toString());
  };
  
  export const getProductsByCategoryId = async (
    categoryID: number,
    limit?: number
  ) => {
    const params = new URLSearchParams();
    if (limit) params.set("limit", `${limit}`);
  
    return await fetchApi(`category/${categoryID}/products`, params.toString());
  };