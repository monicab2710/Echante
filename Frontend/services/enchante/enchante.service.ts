const ENCHANTE_API_URL = "http://localhost:8081/api/v1";

const fetchApi = async (endpoint: string) => {
  const url = `${ENCHANTE_API_URL}/${endpoint}`;
  const response = await fetch(url);
  return await response.json();
};

export const getAllProducts = async () => {
  try {
    const response = await fetchApi("products");

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 500) {
      throw new Error("Error Interno del Servidor");
    } else {
      throw new Error("Respuesta inesperada del servidor");
    }
  } catch (error) {
    throw new Error(`Error al obtener información. ${error.message}`);
  }
};

export const getProductById = async (productId: number) => {
  try {
    const response = await fetchApi(`products/${productId}`);

    if (response.status === 200) {
      const data = await response.json();
      const results = data.data.results;
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } else if (response.status === 404) {
      return null; // Producto no encontrado
    } else if (response.status === 500) {
      throw new Error("Error Interno del Servidor");
    } else {
      throw new Error("Respuesta inesperada del servidor");
    }
  } catch (error) {
    throw new Error(`Error al obtener información ${error.message}`);
  }
};

export const getCategoryById = async (categoryId: number) => {
  try {
    const response = await fetchApi(`categories/${categoryId}`);

    if (response.status === 200) {
      const data = await response.json();
      const results = data.data.results;
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } else if (response.status === 404) {
      return null; // Categoría no encontrada
    } else if (response.status === 500) {
      throw new Error("Error Interno del Servidor");
    } else {
      throw new Error("Respuesta inesperada del servidor");
    }
  } catch (error) {
    throw new Error(`Error al obtener información. ${error.message}`);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await fetchApi("categories");

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 500) {
      throw new Error("Error Interno del Servidor");
    } else {
      throw new Error("Respuesta inesperada del servidor");
    }
  } catch (error) {
    throw new Error(`Error al obtener información. ${error.message}`);
  }
};

export const getProductsByCategory = async (categoryID: number) => {
  try {
    const response = await fetchApi(`categories/${categoryID}/products`);

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      return null; // Categoría no encontrada
    } else if (response.status === 500) {
      throw new Error("Error Interno del Servidor");
    } else {
      throw new Error("Respuesta inesperada del servidor");
    }
  } catch (error) {
    throw new Error(`Error al obtener información. ${error.message}`);
  }
};
